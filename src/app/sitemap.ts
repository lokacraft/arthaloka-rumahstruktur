import { MetadataRoute } from "next";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Ambil slug dari collection blogs
  const blogSnapshot = await getDocs(collection(db, "blogs"));
  const blogUrls: MetadataRoute.Sitemap = blogSnapshot.docs.map((doc) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${doc.data().slug}`,
  }));

  // Ambil slug dari collection portofolio
  const portofolioSnapshot = await getDocs(collection(db, "portofolio"));
  const portofolioUrls: MetadataRoute.Sitemap = portofolioSnapshot.docs.map(
    (doc) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/portofolio/${doc.data().slug}`,
    })
  );

  return [
    // URL statis
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/landingpage` },
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/layanan/jasa-hitung-struktur` },
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/layanan/analisis-geoteknik` },
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/layanan/soil-investigation` },
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/layanan/perkuatan-bangunan` },
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/layanan/geometrik-jalan-raya` },
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/layanan/mekanikal-elektrikal-plumbing` },
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/tentang-kami` },
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/kontak` },
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/portofolio` },
    { url: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs` },
    // Tambahkan URL blog dinamis
    ...blogUrls,
    ...portofolioUrls
  ];
}
