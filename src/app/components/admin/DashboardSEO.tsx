/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/app/components/ui/chart";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/app/components/ui/dialog";
import {
  TrendingUp,
  Globe,
  Clock,
  AlertCircle,
  CheckCircle,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/app/components/ui/badge";

interface AuditPoint {
  description: string;
  advice?: string;
  score?: number | null;
  scoreDisplayMode?: string;
}

interface SEOResult {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
  audits: Record<string, AuditPoint>;
  url: string;
  timestamp: string;
}

export default function DashboardSEO() {
  const [seoResult, setSeoResult] = useState<SEOResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState<{
    key: string;
    audit: AuditPoint;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const handleAnalyze = async () => {
    setLoading(true);
    setErrorMsg(null);
    setProgress(0);

    // Simulate progress for better UX
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 10;
      });
    }, 500);

    try {
      const response = await fetch("/api/run-lighthouse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          `API Error (${response.status}): ${
            errorData.error || response.statusText || "Unknown error occurred"
          }`
        );
      }

      const data: SEOResult = await response.json();
      setProgress(100);
      setTimeout(() => {
        setSeoResult(data);
        setProgress(0);
      }, 500);
    } catch (err: any) {
      console.error("Analysis error:", err);
      setErrorMsg(err.message || "Failed to analyze website");
      setProgress(0);
    } finally {
      clearInterval(progressInterval);
      setLoading(false);
    }
  };

  // Data untuk Charts - menampilkan 0 jika belum ada data
  const chartData = seoResult
    ? [
        { category: "Performance", score: seoResult.performance },
        { category: "Accessibility", score: seoResult.accessibility },
        { category: "Best Practices", score: seoResult.bestPractices },
        { category: "SEO", score: seoResult.seo },
      ]
    : [
        { category: "Performance", score: 0 },
        { category: "Accessibility", score: 0 },
        { category: "Best Practices", score: 0 },
        { category: "SEO", score: 0 },
      ];

  const barChartData = chartData;

  const chartConfig = {
    score: { label: "Score", color: "hsl(var(--primary))" },
  } satisfies ChartConfig;

  // Function untuk mendapatkan warna berdasarkan score
  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 90) return "default" as const; // green
    if (score >= 50) return "secondary" as const; // yellow
    return "destructive" as const; // red
  };

  // Filter audits berdasarkan score untuk menampilkan yang penting
  const getImportantAudits = () => {
    if (!seoResult) return [];

    return Object.entries(seoResult.audits)
      .filter(
        ([_, audit]) => typeof audit.score === "number" && audit.score < 1
      )
      .slice(0, 10); // Ambil 10 teratas
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                SEO Dashboard
              </CardTitle>
              <CardDescription className="mt-1">
                Menganalisa Performa SEO website menggunakan Lighthouse
              </CardDescription>
            </div>
            {seoResult && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatTimestamp(seoResult.timestamp)}
              </Badge>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Action Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleAnalyze}
              disabled={loading}
              size="lg"
              className="min-w-[200px]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing... {progress > 0 && `${Math.round(progress)}%`}
                </>
              ) : (
                "Mulai Analisis SEO"
              )}
            </Button>
          </div>

          {/* Progress Bar */}
          {loading && progress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* Error message */}
          {errorMsg && (
            <div className="flex items-center gap-2 p-4 border border-red-200 bg-red-50 rounded-lg">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <p className="text-red-600 font-medium">Error: {errorMsg}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Score Overview - Always visible */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {chartData.map((item) => (
          <Card key={item.category}>
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div
                className={`text-3xl font-bold ${
                  seoResult ? getScoreColor(item.score) : "text-gray-400"
                }`}
              >
                {item.score}
              </div>
              <Badge
                variant={
                  seoResult ? getScoreBadgeVariant(item.score) : "secondary"
                }
                className="mt-2"
              >
                {item.category}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts - Always visible */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>
              {seoResult
                ? "Radar chart showing all metrics"
                : "Radar chart will show metrics after analysis"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[300px]"
            >
              <RadarChart data={chartData}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <PolarAngleAxis dataKey="category" />
                <PolarGrid />
                <Radar
                  dataKey="score"
                  fillOpacity={0.6}
                  fill={seoResult ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                  stroke={
                    seoResult ? "hsl(var(--primary))" : "hsl(var(--muted))"
                  }
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </RadarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Scores</CardTitle>
            <CardDescription>
              {seoResult
                ? "Bar chart comparison"
                : "Bar chart will show detailed comparison after analysis"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <XAxis
                    dataKey="category"
                    tick={{ fontSize: 12 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis domain={[0, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="score"
                    fill={
                      seoResult ? "hsl(var(--primary))" : "hsl(var(--muted))"
                    }
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* URL Info - Only show after analysis */}
      {seoResult && (
        <Card>
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span className="font-medium">Analyzed URL:</span>
              <a
                href={seoResult.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                {seoResult.url}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Analysis completed
            </div>
          </CardContent>
        </Card>
      )}

      {/* Audit Details - Always visible */}
      <Card>
        <CardHeader>
          <CardTitle>Areas for Improvement</CardTitle>
          <CardDescription>
            {seoResult
              ? "Audit points that need attention (showing failed audits)"
              : "Audit details will appear here after running analysis"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {seoResult ? (
            getImportantAudits().length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {getImportantAudits().map(([key, audit]) => (
                  <div
                    key={key}
                    className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => setSelectedAudit({ key, audit })}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-2">
                          {audit.description || key}
                        </h4>
                        {typeof audit.score === "number" && (
                          <Badge
                            variant={
                              audit.score >= 0.9 ? "default" : "destructive"
                            }
                            className="mt-2"
                          >
                            Score: {Math.round(audit.score * 100)}
                          </Badge>
                        )}
                      </div>
                      <AlertCircle className="h-4 w-4 text-red-500 mt-1 ml-2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <p className="text-green-600 font-medium">
                  Great! No critical issues found.
                </p>
              </div>
            )
          ) : (
            <div className="text-center py-12">
              <Globe className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 font-medium mb-2">
                Tidak ada data audit yang tersedia
              </p>
              <p className="text-gray-400 text-sm">
                Klik Tombol &quot;Mulai Analisis SEO&quot; diatas untuk
                mendapatkan hasil audit
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog untuk audit detail - Always available */}
      <Dialog
        open={!!selectedAudit}
        onOpenChange={() => setSelectedAudit(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Audit Details</DialogTitle>
            <DialogDescription>{selectedAudit?.key}</DialogDescription>
          </DialogHeader>
          {selectedAudit && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm">{selectedAudit.audit.description}</p>
              </div>

              {selectedAudit.audit.advice && (
                <div className="p-4 bg-blue-50 border-l-4 border-blue-400">
                  <h4 className="font-medium text-blue-800 mb-2">
                    Recommendations:
                  </h4>
                  <p className="text-sm text-blue-700">
                    {selectedAudit.audit.advice}
                  </p>
                </div>
              )}

              {typeof selectedAudit.audit.score === "number" && (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <span className="font-medium">Score:</span>
                  <Badge
                    variant={
                      selectedAudit.audit.score >= 0.9
                        ? "default"
                        : "destructive"
                    }
                  >
                    {Math.round(selectedAudit.audit.score * 100)}/100
                  </Badge>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Footer - Only show after analysis */}
      {seoResult && (
        <Card>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 leading-none font-medium">
              SEO analysis completed successfully
              <TrendingUp className="h-4 w-4" />
            </div>
            <p className="text-muted-foreground text-center">
              This analysis was performed using Google Cloud. Scores are
              based on lab data and may not reflect real user experience.
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
