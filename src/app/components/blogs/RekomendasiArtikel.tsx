"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase"; // sesuaikan path

interface Blog {
  id: string;
  slug: string;
  fotoBlog: string;
  title: string;
  author: string;
  tanggal: string;
  tags: string[];
}

export default function RekomendasiArtikel() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const snapshot = await getDocs(collection(db, "blogs"));
        const data: Blog[] = snapshot.docs.map((doc) => {
          const docData = doc.data();

          // Parsing tanggal Firebase Timestamp menjadi string
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
            fotoBlog: docData.fotoBlog || "", // pastikan property ini sama dengan di Firestore
            title: docData.title || "",
            author: docData.author || "",
            tanggal: tanggalStr,
            tags: docData.tag || [],
          };
        });

        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className="font-clash flex flex-col justify-center w-full h-full items-center mt-20">

      {/* Grid Artikel */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full px-4 md:px-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="rounded-2xl overflow-hidden hover:shadow-xl hover:scale-105 transition duration-300 "
          >
            <Link href={`/blogs/${blog.slug}`}>
              {/* Gambar */}
              <div className="relative w-full h-[200px] sm:h-[240px] md:h-[260px] lg:h-[280px] rounded-lg lg:rounded-2xl mb-4">
                <Image
                  src={blog.fotoBlog}
                  alt={blog.title}
                  fill
                  className="object-cover lg:rounded-2xl rounded-lg"
                />
              </div>

              <div className="p-4 md:p-6">
                {/* Kategori */}
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
        ))}
      </div>
    </section>
  );
}
