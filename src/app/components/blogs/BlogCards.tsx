"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// tipe data artikel
type Artikel = {
  id: number;
  title: string;
  slug: string;
  image: string;
  category: string[];
  author: string;
  date: string;
};

// dummy data
const dummyArticles: Artikel[] = Array.from({ length: 30 }).map((_, i) => ({
  id: i + 1,
  title:
    i % 3 === 0
      ? "Jasa Struktur – Jasa Perhitungan Struktur Indonesia"
      : i % 3 === 1
      ? "Memahami Perbedaan dan Pilihan Terbaik Untuk Anda"
      : "Tantangan dan Peluang di Bidang Teknik Sipil",
  slug: `/artikel/${i + 1}`,
  image: "/artikel/artikel1.png",
  category:
    i % 3 === 0
      ? ["Jasa Struktur"]
      : i % 3 === 1
      ? ["Jasa Perhitungan"]
      : ["Perkuatan Bangunan"],
  author: "Superadmin",
  date: "20 Mei 2025",
}));

const ITEMS_PER_PAGE = 9;
const categories = [
  "Semua",
  "Jasa Struktur",
  "Jasa Perhitungan",
  "Perkuatan Bangunan",
];

export default function BlogCards() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState("Semua");

  const filteredArticles =
    activeCategory === "Semua"
      ? dummyArticles
      : dummyArticles.filter((a) => a.category.includes(activeCategory));

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedArticles = filteredArticles.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <section className="w-full h-full font-clash p-[4vh] lg:p-[15vh]">
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

      {/* Grid artikel */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 w-full h-full relative justify-items-center">
        {displayedArticles.map((artikel) => (
          <div
            key={artikel.id}
            className="w-full h-full flex-shrink-0 rounded-2xl overflow-hidden relative"
          >
            <Link href={artikel.slug}>
              <div className="relative w-full h-[160px] sm:h-[180px] md:h-[200px] lg:h-[220px] rounded-2xl mb-4">
                <Image
                  src={artikel.image}
                  alt={artikel.title}
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>

              <div className="p-3 sm:p-4 h-[40%]">
                {/* Kategori */}
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

                {/* Judul */}
                <h3 className="text-[16px]  md:text-[20px] xl:text-[22px] font-medium mb-2 leading-snug">
                  {artikel.title}
                </h3>

                {/* Author & tanggal */}
                <div className="flex flex-row w-full justify-between items-center mt-6 sm:mt-8">
                  <div className="flex flex-row gap-2 items-center">
                    <div className="rounded-full size-2 sm:size-3 bg-[#008080]" />
                    <p className="text-[14px] sm:text-[16px] xl:text-[18px] font-medium">
                      {artikel.author}
                    </p>
                  </div>
                  <p className="text-[14px] sm:text-[16px] xl:text-[18px] text-black font-light">
                    {artikel.date}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 sm:gap-3 mt-8 lg:mt-10">
        {/* Prev */}
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="flex items-center justify-center hover:bg-[#008080]/70 bg-[#008080]/50 size-8 sm:size-10 rounded-sm disabled:opacity-20"
        >
          <Image
            src="/icons/DoubleArrowLeft.png"
            alt=""
            width={16}
            height={16}
          />
        </button>

        {/* Numbered Pages */}
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`flex items-center justify-center border rounded-sm text-[14px] sm:text-[16px] md:text-[18px] size-8 sm:size-10 ${
              currentPage === i + 1
                ? "bg-[#008080] text-[#FAFAFA] border-[#008080]"
                : "hover:bg-[#008080] hover:text-[#FAFAFA] bg-[#008080]/10 text-[#008080]"
            }`}
          >
            {i + 1}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center hover:bg-[#008080]/70 bg-[#008080]/50 size-8 sm:size-10 rounded-sm disabled:opacity-40"
        >
          <Image
            src="/icons/DoubleArrowRight.png"
            alt=""
            width={16}
            height={16}
          />
        </button>
      </div>
    </section>
  );
}
