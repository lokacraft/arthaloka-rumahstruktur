import React from "react";
import { notFound } from "next/navigation";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import BlogDetailClient, { BlogPost } from "@/app/components/landing-page/BlogDetailClient";
import { Metadata } from "next";

// Fungsi Fetch Data
async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    // 1. Coba cari berdasarkan field 'slug'
    const q = query(collection(db, "blogs"), where("slug", "==", slug), limit(1));
    const snapshot = await getDocs(q);

    // 2. Fallback: Jika tidak ditemukan, coba cari berdasarkan ID (jika slug yang dikirim sebenarnya adalah ID)
    if (snapshot.empty) {
       // Opsional: Implementasi pencarian by ID jika diperlukan
       // const docRef = doc(db, "blogs", slug); ...
    }

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    const data = doc.data();

    // Format Data
    return {
      id: doc.id,
      title: data.title,
      subtitle: data.subtitle || "",
      category: data.category || "Umum",
      authorName: data.authorName || "Admin",
      authorRole: data.authorRole || "Editor",
      authorAvatar: data.authorAvatar || "",
      publishedAt: data.createdAt?.toDate().toLocaleDateString('id-ID', { 
        day: 'numeric', month: 'long', year: 'numeric' 
      }) || "Baru saja",
      readTime: data.readTime || "3 min read",
      likes: data.likes || 0,
      heroImage: data.heroImage || "/images/placeholder.jpg",
      content: data.content || "",
    };

  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

// Generate Metadata untuk SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return { title: "Artikel Tidak Ditemukan - RumahStruktur" };
  }

  return {
    title: `${post.title} - Blog RumahStruktur`,
    description: post.subtitle || post.content.substring(0, 150),
    openGraph: {
      images: [post.heroImage],
    },
  };
}

// Komponen Halaman Utama
export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <BlogDetailClient post={post} />
  );
}