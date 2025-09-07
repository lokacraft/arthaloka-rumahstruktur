/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Metadata } from "next";
import { ReactNode } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

interface BlogData {
  title: string;
  isiBlog: string;
  fotoBlog: string;
  ringkasan: string;
  slug: string;
}

// build-safe generateMetadata tanpa mendeklarasikan tipe params manual
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const slug = params.slug;

  try {
    const q = query(collection(db, "blogs"), where("slug", "==", slug));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docData = snapshot.docs[0].data() as BlogData;

      return {
        title: `Blog Post - ${docData.title}`,
        description:
          docData.ringkasan.replace(/<[^>]+>/g, "").slice(0, 150) + "...",
        openGraph: {
          title: `${docData.title} | Rumah Struktur`,
          description:
            docData.ringkasan.replace(/<[^>]+>/g, "").slice(0, 200) + "...",
          images: [docData.fotoBlog],
        },
        twitter: {
          card: "summary_large_image",
          title: `${docData.title} | Rumah Struktur`,
          description:
            docData.ringkasan.replace(/<[^>]+>/g, "").slice(0, 200) + "...",
          images: [docData.fotoBlog],
        },
      };
    }
  } catch (err) {
    console.error("Error generating metadata:", err);
  }

  // fallback jika data tidak ditemukan
  return {
    title: "Blog | Rumah Struktur",
    description:
      "Temukan artikel menarik seputar konstruksi, analisis struktur, geoteknik, soil investigation, hingga teknologi bangunan hanya di Rumah Struktur.",
  };
}

// RootLayout minimal
export default function RootLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
