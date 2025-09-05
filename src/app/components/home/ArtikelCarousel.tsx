"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";

interface Artikel {
  id: number;
  slug: string;
  image: string;
  title: string;
  author: string;
  date: string;
  category: string[];
}

const artikelList: Artikel[] = [
  {
    id: 1,
    slug: "/",
    image: "/artikel/artikel1.png",
    title: "Jasa Struktur – Jasa Perhitungan Struktur Indonesia",
    author: "Superadmin",
    date: "29 Agustus 2023",
    category: ["Konstruksi", "Struktur"],
  },
  {
    id: 2,
    slug: "/",
    image: "/artikel/artikel2.png",
    title: "Memahami Perhitungan dan Pilihan Terbaik Untuk di Ambil",
    author: "Superadmin",
    date: "2 September 2023",
    category: ["Teknik", "Tips"],
  },
  {
    id: 3,
    slug: "/",
    image: "/artikel/artikel1.png",
    title: "Tantangan dan Peluang di Bidang Teknik Sipil",
    author: "Superadmin",
    date: "10 September 2023",
    category: ["Teknik Sipil", "Peluang"],
  },
];

export default function ArtikelCarousel() {
  return (
    <section className="font-clash flex flex-col justify-center items-center m-[4vh] md:m-[7vh] lg:m-[15vh]">
      {/* Judul */}
      <h2 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[54px] font-medium mb-8 md:mb-12 text-center">
        <span className="text-[#008080]">Artikel</span> Terbaru
      </h2>

      {/* Grid Artikel */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full px-4 md:px-8">
        {artikelList.map((artikel) => (
          <div
            key={artikel.id}
            className="rounded-2xl overflow-hidden hover:shadow-md transition"
          >
            <Link href={artikel.slug}>
              {/* Gambar */}
              <div className="relative w-full h-[200px] sm:h-[240px] md:h-[260px] lg:h-[280px] rounded-lg bg-emerald-300 mb-4">
                <Image
                  src={artikel.image}
                  alt={artikel.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <div className="p-4 md:p-6">
                {/* Kategori */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {artikel.category.map((cat, i) => (
                    <span
                      key={i}
                      className="text-[12px] sm:text-[13px] md:text-[14px] px-3 py-0.5 border-[1.5px] border-[#008080] text-[#008080] rounded-md font-instrument"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Judul */}
                <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-medium mb-3 leading-snug">
                  {artikel.title}
                </h3>

                {/* Author + Date */}
                <div className="flex flex-row w-full justify-between items-center mt-6">
                  <div className="flex flex-row gap-2 items-center">
                    <div className="rounded-full size-2.5 sm:size-3 bg-[#008080]" />
                    <p className="text-[14px] sm:text-[16px] md:text-[18px] font-medium">
                      {artikel.author}
                    </p>
                  </div>
                  <p className="text-[14px] sm:text-[16px] md:text-[18px] text-black font-light">
                    {artikel.date}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
