'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type Artikel = {
  id: string;
  title: string;
  slug: string;
  image: string;
  category: string[];
  author: string;
  date: string;
};

export default function HighlightBlog() {
  const [artikel, setArtikel] = useState<Artikel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomArticle = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, 'blogs'));
        const data: Artikel[] = snapshot.docs.map((doc) => {
          const docData = doc.data();
          let dateStr = '';
          if (docData.tanggal instanceof Timestamp) {
            dateStr = docData.tanggal.toDate().toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            });
          } else if (typeof docData.tanggal === 'string') {
            dateStr = docData.tanggal;
          }
          return {
            id: doc.id,
            slug: docData.slug || `/artikel/${doc.id}`,
            image: docData.heroImage || '/placeholder.png',
            title: docData.title || '',
            author: docData.authorName || '',
            date: dateStr,
            category: docData.category || [],
          };
        });

        if (data.length > 0) {
          const random = data[Math.floor(Math.random() * data.length)];
          setArtikel(random);
        }
      } catch (err) {
        console.error('Error fetching highlight blog:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRandomArticle();
  }, []);

  return (
    <section className="lg:px-[15vh] px-[4vh] pt-[25vh] w-full h-full font-clash">
      {/* Heading selalu tampil */}
      <h2 className="lg:text-[82px] md:text-[62px] text-[42px] text-left font-medium mb-6">Blog</h2>

      {/* Konten highlight */}
      {loading ? <HighlightSkeleton /> : artikel && <HighlightContent artikel={artikel} />}
    </section>
  );
}

/* ------------ Konten Highlight ------------ */
function HighlightContent({ artikel }: { artikel: Artikel }) {
  return (
    <Link
      href={artikel.slug}
      className="flex flex-col md:flex-row lg:gap-6 gap-2 items-start"
    >
      {/* Gambar */}
      <div className="relative w-full min-w-[200px] min-h-[220px] max-h-[280px] justify-center items-center flex-1 rounded-2xl overflow-hidden">
        <Image
          src={artikel.image}
          alt={artikel.title}
          fill
          className="object-cover object-center rounded-2xl flex-1"
        />
      </div>

      {/* Konten */}
      <div className="flex flex-col justify-center flex-1 m-5">
        {/* Kategori */}
        <div className="flex flex-wrap gap-2 mb-3">
            <span
              className="lg:text-md text-sm px-4 border border-[#008080] text-[#008080] rounded-md font-instrument"
            >
              {artikel.category}
            </span>
        </div>

        {/* Judul */}
        <h3 className="xl:text-4xl md:text-3xl text-2xl font-medium mb-4 leading-tight">{artikel.title}</h3>

        {/* Tanggal & Author */}
        <div className="flex flex-row gap-6 items-center lg:text-xl md:text-md font-light">
          <p className='text-[14px] sm:text-[16px] xl:text-[18px] text-black font-light'>{artikel.date}</p>
          <div className="flex flex-row gap-2 items-center font-medium">
            <div className="rounded-full lg:size-3 size-2 bg-[#008080] lg:text-[20px] text-[14px]" />
            {artikel.author}
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ------------ Skeleton Loader ------------ */
function HighlightSkeleton() {
  return (
    <div className="flex flex-col md:flex-row gap-6 items-start bg-transparent animate-pulse">
      {/* Gambar */}
      <div className="relative w-full md:w-[500px] h-[280px] md:h-[250px] rounded-2xl overflow-hidden bg-neutral-300" />

      {/* Konten */}
      <div className="flex flex-col justify-center flex-1 m-5 space-y-4">
        {/* Kategori */}
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="h-6 w-24 rounded bg-neutral-300" />
          <div className="h-6 w-20 rounded bg-neutral-300" />
        </div>

        {/* Judul */}
        <div className="h-[60px] md:h-[70px] w-3/4 bg-neutral-300 rounded" />

        {/* Tanggal & Author */}
        <div className="flex flex-row gap-6 items-center text-[20px]">
          <div className="h-5 w-20 bg-neutral-300 rounded" />
          <div className="flex flex-row gap-2 items-center">
            <div className="rounded-full size-3 bg-neutral-300 w-6 h-6" />
            <div className="h-5 w-16 bg-neutral-300 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
