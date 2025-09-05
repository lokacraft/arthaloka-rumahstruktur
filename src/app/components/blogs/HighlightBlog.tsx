'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
const dummyArticles: Artikel[] = [
  {
    id: 1,
    title: 'Jasa Struktur – Jasa Perhitungan Struktur Indonesia',
    slug: '/artikel/1',
    image: '/artikel/artikel1.png',
    category: ['Jasa Perhitungan', 'Jasa Struktur'],
    author: 'Superadmin',
    date: '20 Feb 2025',
  },
  {
    id: 2,
    title: 'Memahami Perbedaan dan Pilihan Terbaik Untuk Anda',
    slug: '/artikel/2',
    image: '/artikel/artikel1.png',
    category: ['Jasa Perhitungan'],
    author: 'Superadmin',
    date: '18 Feb 2025',
  },
  {
    id: 3,
    title: 'Tantangan dan Peluang di Bidang Teknik Sipil',
    slug: '/artikel/3',
    image: '/artikel/artikel2.png',
    category: ['Perkuatan Bangunan'],
    author: 'Superadmin',
    date: '15 Feb 2025',
  },
];

export default function HighlightBlog() {
  const [artikel, setArtikel] = useState<Artikel | null>(null);

  // pilih artikel random saat komponen pertama kali mount
  useEffect(() => {
    const random = dummyArticles[Math.floor(Math.random() * dummyArticles.length)];
    setArtikel(random);
  }, []);

  if (!artikel) return null;

  return (
    <section className="px-[15vh] pt-[25vh] w-full h-full font-clash">
      <h2 className="text-[82px] text-left font-medium mb-6">Blog</h2>

      <Link
        href={artikel.slug}
        className="flex flex-col md:flex-row gap-6 items-start bg-transparent"
      >
        {/* Gambar */}
        <div className="relative w-full md:w-[500px] h-[280px] md:h-[250px] rounded-2xl overflow-hidden flex-shrink-0">
          <Image
            src={artikel.image}
            alt={artikel.title}
            fill
            className="object-cover rounded-2xl"
          />
        </div>

        {/* Konten */}
        <div className="flex flex-col justify-center flex-1 m-5">
          {/* Kategori */}
          <div className="flex flex-wrap gap-2 mb-3">
            {artikel.category.map((cat, i) => (
              <span
                key={i}
                className="text-[14px] px-4 border border-[#008080] text-[#008080] rounded-md font-instrument"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Judul */}
          <h3 className="text-[48px] font-medium mb-4 leading-tight">
            {artikel.title}
          </h3>

          {/* Tanggal & Author */}
          <div className="flex flex-row gap-6 items-center text-[20px] font-light">
            <p>{artikel.date}</p>
            <div className="flex flex-row gap-2 items-center font-medium">
              <div className="rounded-full size-3 bg-[#008080] text-[20px]" />
              {artikel.author}
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
