import type { Metadata } from "next";
import { ReactNode } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

interface PortofolioData {
  id: string;
  slug: string;
  title: string;
  description: string;
  tipePekerjaan: string;
  pekerjaan: string;
  lokasi: string;
  fotoPortofolio: string;
  fotoDokumentasi?: string[];
}

// build-safe generateMetadata tanpa mendeklarasikan tipe params manual
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const slug = params.slug;

  try {
    const q = query(collection(db, "portofolio"), where("slug", "==", slug));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docData = snapshot.docs[0].data() as PortofolioData;

      return {
        title: {
          absolute: `Portofolio - ${docData.title}`,
        },
        description:
          docData.description.replace(/<[^>]+>/g, "").slice(0, 150) + "...",
        openGraph: {
          title: `${docData.title} | Rumah Struktur`,
          description:
            docData.description.replace(/<[^>]+>/g, "").slice(0, 200) + "...",
          images: [
            {
              url: docData.fotoPortofolio,
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title: `${docData.title} | Rumah Struktur`,
          description:
            docData.description.replace(/<[^>]+>/g, "").slice(0, 200) + "...",
          images: [docData.fotoPortofolio],
        },
      };
    }
  } catch (err) {
    console.error("Error generating metadata:", err);
  }

  // fallback jika data tidak ditemukan
  return {
    title: "Portofolio | Rumah Struktur",
    description:
      "Temukan hasil karya Rumah Struktur: mulai dari konstruksi, analisis struktur, geoteknik, soil investigation, hingga teknologi bangunan.",
  };
}

// RootLayout minimal
export default function RootLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
