import type { Metadata } from "next";
import { ReactNode } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

interface BlogData {
  title: string;
  content: string;
  heroImage: string;
  subtitle: string;
  slug: string;
}

// build-safe generateMetadata tanpa mendeklarasikan tipe params manual
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = await params;

  try {
    const q = query(collection(db, "blogs"), where("slug", "==", slug));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docData = snapshot.docs[0].data() as BlogData;

      return {
        title: {
          absolute: `Blog Post - ${docData.title}`,
        },
        description:
          docData.subtitle.replace(/<[^>]+>/g, "").slice(0, 150) + "...",
        openGraph: {
          title: `${docData.title} | Rumah Struktur`,
          description:
            docData.subtitle.replace(/<[^>]+>/g, "").slice(0, 200) + "...",
          images: [
            {
              url: docData.heroImage,
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title: `${docData.title} | Rumah Struktur`,
          description:
            docData.subtitle.replace(/<[^>]+>/g, "").slice(0, 200) + "...",
          images: [docData.heroImage],
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
