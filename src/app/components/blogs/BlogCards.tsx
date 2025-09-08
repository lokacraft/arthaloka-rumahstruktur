/* eslint-disable jsx-a11y/role-supports-aria-props */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
// import Link from "next/link";
import { useRouter } from "next/navigation"; // untuk Next.js 13 App Router
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Artikel = {
  id: string;
  slug: string;
  title: string;
  image: string;
  category: string[];
  author: string;
  date: string;
};

const ITEMS_PER_PAGE = 9;
const categories = ["Semua", "Jasa Struktur", "Jasa Perhitungan", "Perkuatan Bangunan"];

export default function BlogCards() {
  const [articles, setArticles] = useState<Artikel[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [loadingPage, setLoadingPage] = useState(false); // loader saat navigasi
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("Semua");

  const router = useRouter();

  // Fetch data dari Firebase
  useEffect(() => {
    const fetchArticles = async () => {
      setLoadingData(true);
      try {
        const snapshot = await getDocs(collection(db, "blogs"));
        const data: Artikel[] = snapshot.docs.map((doc) => {
          const docData = doc.data();
          let dateStr = "";
          if (docData.tanggal instanceof Timestamp) {
            dateStr = docData.tanggal.toDate().toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });
          } else if (typeof docData.tanggal === "string") {
            dateStr = docData.tanggal;
          }
          return {
            id: doc.id,
            slug: docData.slug || `/artikel/${doc.id}`,
            image: docData.fotoBlog || "/placeholder.png",
            title: docData.title || "",
            author: docData.author || "",
            date: dateStr,
            category: docData.tag || [],
          };
        });
        setArticles(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoadingData(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles =
    activeCategory === "Semua"
      ? articles
      : articles.filter((a) => a.category.includes(activeCategory));

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedArticles = filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // fungsi navigasi dengan loader
  const handleNavigate = (slug: string) => {
    setLoadingPage(true);
    router.push(`/blogs/${slug}`);
  };

  return (
    <section className="w-full h-full font-clash p-[4vh] lg:p-[15vh] relative">
      {/* Loader Overlay */}
      {loadingPage && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center backdrop-blur-md bg-black/30">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white text-lg font-medium animate-pulse">Memuat Halaman Artikel</p>
        </div>
      )}

      {/* Tabs kategori */}
      <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 justify-start mb-8 lg:mb-10 font-instrument text-lg sm:text-2xl md:text-3xl lg:text-4xl">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setCurrentPage(1);
            }}
            className={`px-4 sm:px-5 md:px-6 py-1 sm:py-2 rounded-xl sm:rounded-2xl border-2 transition ${
              activeCategory === cat
                ? "bg-[#008080] text-white border-[#008080]"
                : "text-[#008080] border-[#008080] hover:bg-[#008080]/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid Artikel */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 w-full h-full relative justify-items-center">
        {loadingData
          ? Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => <BlogCardSkeleton key={i} />)
          : displayedArticles.map((artikel) => (
              <BlogCard key={artikel.id} artikel={artikel} onNavigate={handleNavigate} />
            ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 sm:gap-3 mt-8 lg:mt-10">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          aria-label="Previous Page"
          className="flex items-center justify-center hover:bg-[#008080]/70 bg-[#008080]/50 size-8 sm:size-10 rounded-sm disabled:opacity-20"
        >
          <Image src="/icons/DoubleArrowLeft.png" alt="" width={16} height={16} />
        </button>

        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            aria-level={i}
            className={`flex items-center justify-center border rounded-sm text-[14px] sm:text-[16px] md:text-[18px] size-8 sm:size-10 ${
              currentPage === i + 1
                ? "bg-[#008080] text-[#FAFAFA] border-[#008080]"
                : "hover:bg-[#008080] hover:text-[#FAFAFA] bg-[#008080]/10 text-[#008080]"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          aria-label="Next Page"
          className="flex items-center justify-center hover:bg-[#008080]/70 bg-[#008080]/50 size-8 sm:size-10 rounded-sm disabled:opacity-40"
        >
          <Image src="/icons/DoubleArrowRight.png" alt="" width={16} height={16} />
        </button>
      </div>
    </section>
  );
}

/* ------------ BlogCard ------------ */
function BlogCard({
  artikel,
  onNavigate,
}: {
  artikel: Artikel;
  onNavigate: (slug: string) => void;
}) {
  return (
    <div
      onClick={() => onNavigate(artikel.slug)}
      className="w-full h-full flex-shrink-0 rounded-2xl overflow-hidden relative hover:scale-105 transition-transform border cursor-pointer"
    >
      <div className="relative w-full h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px] rounded-2xl mb-4">
        <Image src={artikel.image} alt={artikel.title} fill className="object-cover rounded-2xl" />
      </div>

      <div className="p-3 sm:p-4 h-[40%]">
        <div className="flex flex-wrap gap-2 mb-2 sm:mb-3">
          {artikel.category.map((cat, i) => (
            <span
              key={i}
              className="text-[12px] sm:text-[14px] px-2 sm:px-4 border border-[#008080] text-[#008080] rounded-sm font-instrument"
            >
              {cat}
            </span>
          ))}
        </div>

        <h3 className="text-[16px] md:text-[20px] xl:text-[22px] font-medium mb-2 leading-snug">
          {artikel.title}
        </h3>

        <div className="flex flex-row w-full justify-between items-center mt-6 sm:mt-8">
          <div className="flex flex-row gap-2 items-center">
            <div className="rounded-full size-2 sm:size-3 bg-[#008080]" />
            <p className="text-[14px] sm:text-[16px] xl:text-[18px] font-medium">{artikel.author}</p>
          </div>
          <p className="text-[14px] sm:text-[16px] xl:text-[18px] text-black font-light">{artikel.date}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------ Skeleton Loader ------------ */
function BlogCardSkeleton() {
  return (
    <div className="w-full h-full flex-shrink-0 rounded-2xl overflow-hidden border border-neutral-300 hover:shadow-md transition-transform scale-100">
      <div className="relative w-full h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px] bg-neutral-300 animate-pulse" />
      <div className="p-3 sm:p-4 h-[40%] space-y-2">
        <div className="flex flex-wrap gap-2 mb-2 sm:mb-3">
          <div className="h-5 w-16 rounded bg-neutral-300 animate-pulse" />
          <div className="h-5 w-20 rounded bg-neutral-300 animate-pulse" />
        </div>
        <div className="h-6 sm:h-7 md:h-8 w-3/4 rounded bg-neutral-300 animate-pulse" />
        <div className="h-6 sm:h-7 md:h-8 w-1/2 rounded bg-neutral-300 animate-pulse" />
        <div className="flex justify-between items-center mt-6">
          <div className="h-5 sm:h-6 w-24 rounded bg-neutral-300 animate-pulse" />
          <div className="h-5 sm:h-6 w-16 rounded bg-neutral-300 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
