"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Blog {
  id: string;
  slug: string;
  fotoBlog: string;
  title: string;
  author: string;
  tanggal: string;
  tags: string[];
}

export default function ArtikelCarousel() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const snapshot = await getDocs(collection(db, "blogs"));
        const data: Blog[] = snapshot.docs.map((doc) => {
          const docData = doc.data();

          let tanggalStr = "";
          if (docData.tanggal instanceof Timestamp) {
            const date = docData.tanggal.toDate();
            tanggalStr = date.toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            });
          } else if (typeof docData.tanggal === "string") {
            tanggalStr = docData.tanggal;
          }

          return {
            id: doc.id,
            slug: docData.slug || "",
            fotoBlog: docData.fotoBlog || "",
            title: docData.title || "",
            author: docData.author || "",
            tanggal: tanggalStr,
            tags: docData.tag || [],
          };
        });

        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className="font-clash flex flex-col justify-center items-center m-[4vh] md:m-[7vh] lg:m-[15vh]">
      {/* Judul */}
      <h2 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[54px] font-medium mb-8 md:mb-12 text-center">
        <span className="text-[#008080]">Artikel</span> Terbaru
      </h2>

      {/* Grid Artikel */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full px-4 md:px-8">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))
          : blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
      </div>
    </section>
  );
}

/* ------------ Kartu Artikel ------------ */
function BlogCard({ blog }: { blog: Blog }) {
  return (
    <div className="rounded-2xl overflow-hidden hover:shadow-xl hover:scale-105 transition">
      <Link href={`/blogs/${blog.slug}`}>
        {/* Gambar */}
        <div className="relative w-full h-[200px] sm:h-[240px] md:h-[260px] lg:h-[280px] rounded-lg bg-emerald-300 mb-4">
          <Image
            src={blog.fotoBlog}
            alt={blog.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="p-4 md:p-6">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {blog.tags.map((tag, i) => (
              <span
                key={i}
                className="text-[12px] sm:text-[13px] md:text-[14px] px-3 py-0.5 border-[1.5px] border-[#008080] text-[#008080] rounded-md font-instrument"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Judul */}
          <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-medium mb-3 leading-snug">
            {blog.title}
          </h3>

          {/* Author + Date */}
          <div className="flex flex-row w-full justify-between items-center mt-6">
            <div className="flex flex-row gap-2 items-center">
              <div className="rounded-full size-2.5 sm:size-3 bg-[#008080]" />
              <p className="text-[14px] sm:text-[16px] md:text-[18px] font-medium">
                {blog.author}
              </p>
            </div>
            <p className="text-[14px] sm:text-[16px] md:text-[18px] text-black font-light">
              {blog.tanggal}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

/* ------------ Skeleton Loader (Responsive & Kontras) ------------ */
function BlogCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-neutral-300 hover:shadow-md transition">
      {/* Gambar shimmer */}
      <div className="relative w-full h-[200px] sm:h-[240px] md:h-[260px] lg:h-[280px] bg-neutral-300 overflow-hidden">
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-300 bg-[length:200%_100%]" />
      </div>

      {/* Konten shimmer */}
      <div className="p-4 md:p-6 space-y-3">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="h-5 w-16 rounded bg-neutral-300 relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-300 bg-[length:200%_100%]" />
          </div>
          <div className="h-5 w-20 rounded bg-neutral-300 relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-300 bg-[length:200%_100%]" />
          </div>
        </div>

        {/* Judul */}
        <div className="h-6 sm:h-7 md:h-8 w-3/4 rounded bg-neutral-300 relative overflow-hidden">
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-300 bg-[length:200%_100%]" />
        </div>
        <div className="h-6 sm:h-7 md:h-8 w-1/2 rounded bg-neutral-300 relative overflow-hidden">
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-300 bg-[length:200%_100%]" />
        </div>

        {/* Author + Date */}
        <div className="flex justify-between items-center mt-6">
          <div className="h-5 sm:h-6 w-24 rounded bg-neutral-300 relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-300 bg-[length:200%_100%]" />
          </div>
          <div className="h-5 sm:h-6 w-16 rounded bg-neutral-300 relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-300 bg-[length:200%_100%]" />
          </div>
        </div>
      </div>
    </div>
  );
}
