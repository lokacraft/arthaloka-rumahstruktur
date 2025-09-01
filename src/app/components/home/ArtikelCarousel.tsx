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
    <section className="font-clash flex justify-center items-center flex-col m-[15vh]">
      {/* Judul */}
      <h2 className="text-[54px] font-medium mb-12">
        <span className="text-[#008080]">Artikel</span> Terbaru
      </h2>

      {/* Carousel */}

      <div className="flex gap-6 overflow-x-auto scrollbar-hide px-4 border-none">
        {artikelList.map((artikel) => (
          <div
            key={artikel.id}
            className="min-w-[320px] max-w-[380px] flex-shrink-0 rounded-2xl overflow-hidden"
          >
            <Link href={artikel.slug}>
              <div className="relative w-full h-54 rounded-lg bg-emerald-300 mb-4">
                <Image
                  src={artikel.image}
                  alt={artikel.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <div className="p-4">
                {/* Kategori */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {artikel.category.map((cat, i) => (
                    <span
                      key={i}
                      className="text-[14px] px-4 border-[1.5px] border-[#008080] text-[#008080] rounded-md font-instrument"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Judul */}
                <h3 className="text-[22px] font-medium mb-2 leading-none">
                  {artikel.title}
                </h3>
                <div className="flex flex-row w-full justify-between items-center mt-8">
                    {/* Author */}
                  <div className="flex flex-row  gap-2 justify-start items-center w-full h-full">
                    <div className="rounded-full size-3 bg-[#008080]" />
                    <p className="text-[18px]  font-medium">{artikel.author}</p>
                  </div>

                  {/* Tanggal */}
                  <p className="text-[18px] w-full text-black font-light justify-end flex items-center">
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
