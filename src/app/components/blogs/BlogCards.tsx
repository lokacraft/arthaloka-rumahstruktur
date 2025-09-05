'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import arrowleft from '/icons/DoubleArrowLeft'
// import arrowright from '/icons/DoubleArrowRight'

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
      ? 'Jasa Struktur – Jasa Perhitungan Struktur Indonesia'
      : i % 3 === 1
      ? 'Memahami Perbedaan dan Pilihan Terbaik Untuk Anda'
      : 'Tantangan dan Peluang di Bidang Teknik Sipil',
  slug: `/artikel/${i + 1}`,
  image: '/artikel/artikel1.png', // ganti dengan aset nyata
  category:
    i % 3 === 0
      ? ['Jasa Struktur']
      : i % 3 === 1
      ? ['Jasa Perhitungan']
      : ['Perkuatan Bangunan'],
  author: 'Superadmin',
  date: '20 Mei 2025',
}));

// jumlah artikel per halaman
const ITEMS_PER_PAGE = 9;

// kategori tab
const categories = ['Semua', 'Jasa Struktur', 'Jasa Perhitungan', 'Perkuatan Bangunan'];

export default function BlogCards() {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('Semua');

  // filter berdasarkan kategori
  const filteredArticles =
    activeCategory === 'Semua'
      ? dummyArticles
      : dummyArticles.filter((a) => a.category.includes(activeCategory));

  // hitung total halaman
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);

  // data untuk halaman aktif
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedArticles = filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <section className="w-full p-[15vh] h-full font-clash">
      {/* Tabs kategori */}
      <div className="flex flex-wrap gap-6 justify-start mb-10 font-instrument text-4xl">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setCurrentPage(1);
            }}
            className={`px-6 py-2 rounded-2xl border-2 ${
              activeCategory === cat
                ? 'bg-[#008080] text-white border-[#008080]'
                : 'text-[#008080] border-[#008080] hover:bg-[#008080]/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid artikel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {displayedArticles.map((artikel) => (
          <div
            key={artikel.id}
            className="min-w-[320px] max-w-[380px] flex-shrink-0 rounded-2xl overflow-hidden"
          >
            <Link href={artikel.slug}>
              <div className="relative w-full h-54 rounded-2xl bg-emerald-300 mb-4">
                <Image
                  src={artikel.image}
                  alt={artikel.title}
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>

              <div className="p-4">
                {/* Kategori */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {artikel.category.map((cat, i) => (
                    <span
                      key={i}
                      className="text-[14px] px-4 border-[1px] border-[#008080] text-[#008080] rounded-sm font-instrument"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Judul */}
                <h3 className="text-[22px] font-medium mb-2 leading-none">
                  {artikel.title}
                </h3>

                {/* Author & tanggal */}
                <div className="flex flex-row w-full justify-between items-center mt-8">
                  <div className="flex flex-row gap-2 items-center">
                    <div className="rounded-full size-3 bg-[#008080]" />
                    <p className="text-[18px] font-medium">{artikel.author}</p>
                  </div>
                  <p className="text-[18px] text-black font-light">{artikel.date}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 mt-10">
        {/* Prev */}
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 hover:bg-[#008080]/70 bg-[#008080]/50 size-10 rounded-sm disabled:opacity-20"
        >
          <Image
          src="/icons/DoubleArrowLeft.png"
          alt=''
          width={20}
          height={20}
          />
        </button>

        {/* Numbered Pages */}
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded-sm text-[20px] size-10 ${
              currentPage === i + 1
                ? 'bg-[#008080] text-[#FAFAFA] border-[#008080]'
                : 'hover:bg-[#008080] hover:text-[#FAFAFA] bg-[#008080]/10 text-[#008080]'
            }`}
          >
            {i + 1}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 hover:bg-[#008080]/70 bg-[#008080]/50 size-10 rounded-sm disabled:opacity-40"
        >
          <Image
          src="/icons/DoubleArrowRight.png"
          alt=''
          width={18}
          height={18}
          />
        </button>
      </div>
    </section>
  );
}
