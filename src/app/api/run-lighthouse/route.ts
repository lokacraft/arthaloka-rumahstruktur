/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';

interface SEOResult {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  audits: Record<string, any>;
  url: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const targetUrl: string =
      (body.url as string) || process.env.NEXT_PUBLIC_BASE_URL || 'https://arthaloka-rumahstruktur.vercel.app';

    // Validasi URL
    try {
      new URL(targetUrl);
    } catch (err) {
      return NextResponse.json(
        { error: 'Invalid URL provided' },
        { status: 400 }
      );
    }

    // Dapatkan API key dari environment variable
    // Anda bisa mendapatkan API key gratis di: https://developers.google.com/speed/docs/insights/v5/get-started
    const apiKey = process.env.PAGESPEED_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { 
          error: 'PageSpeed API key not configured',
          help: 'Please set PAGESPEED_API_KEY environment variable. Get your free API key at https://developers.google.com/speed/docs/insights/v5/get-started'
        },
        { status: 500 }
      );
    }

    // Call PageSpeed Insights API
    const categories = ['performance', 'accessibility', 'best-practices', 'seo', 'pwa'];
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(targetUrl)}&key=${apiKey}&category=${categories.join('&category=')}`;
    
    console.log('Calling PageSpeed Insights API for:', targetUrl);
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'PageSpeed API request failed');
    }
    
    const data = await response.json();
    
    if (!data.lighthouseResult) {
      throw new Error('No Lighthouse results returned from PageSpeed API');
    }
    
    const result = data.lighthouseResult;
    
    // Extract audits
    const audits: Record<string, any> = {};
    if (result.audits) {
      Object.entries(result.audits).forEach(([key, value]: [string, any]) => {
        if (value.score !== null && value.score !== undefined) {
          audits[key] = {
            description: value.title || key,
            advice: value.description || '',
            score: value.score,
            displayValue: value.displayValue || '',
            scoreDisplayMode: value.scoreDisplayMode || 'numeric'
          };
        }
      });
    }
    
    // Format hasil sesuai dengan struktur yang diharapkan
    const seoResult: SEOResult = {
      performance: Math.round((result.categories?.performance?.score || 0) * 100),
      accessibility: Math.round((result.categories?.accessibility?.score || 0) * 100),
      bestPractices: Math.round((result.categories?.['best-practices']?.score || 0) * 100),
      seo: Math.round((result.categories?.seo?.score || 0) * 100),
      audits,
      url: targetUrl,
      timestamp: new Date().toISOString()
    };
    
    console.log('PageSpeed Insights analysis completed successfully');
    return NextResponse.json(seoResult);
    
  } catch (err: any) {
    console.error('PageSpeed API Error:', err);
    return NextResponse.json(
      { 
        error: err.message || 'Failed to analyze website',
        details: process.env.NODE_ENV === 'development' ? err.stack : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'PageSpeed Insights API is ready. Use POST method to run analysis.',
    apiKeyConfigured: !!process.env.PAGESPEED_API_KEY,
    example: {
      method: 'POST',
      body: {
        url: 'https://arthaloka-rumahstruktur.vercel.app' // optional
      }
    },
    help: !process.env.PAGESPEED_API_KEY 
      ? 'Get your free API key at https://developers.google.com/speed/docs/insights/v5/get-started' 
      : undefined
  });
}