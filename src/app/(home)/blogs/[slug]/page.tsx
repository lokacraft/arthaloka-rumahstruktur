"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import RekomendasiArtikel from "../../../components/blogs/RekomendasiArtikel";
import ArrowLeft from "/public/icons/ArrowLeft.png";

import "./BlogPage.css"; // import CSS module
import Link from "next/link";

interface BlogDetail {
  id: string;
  slug: string;
  title: string;
  author: string;
  tanggal: string;
  tags: string[];
  fotoBlog: string;
  isiBlog: string;
}

export default function BlogPage() {
  const params = useParams();
  const slug = params.slug;
  const [blog, setBlog] = useState<BlogDetail | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const q = query(collection(db, "blogs"), where("slug", "==", slug));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const docData = snapshot.docs[0].data();

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

          setBlog({
            id: snapshot.docs[0].id,
            slug: docData.slug,
            title: docData.title,
            author: docData.author,
            tanggal: tanggalStr,
            tags: docData.tag || [], // pastikan field ini sesuai Firestore
            fotoBlog: docData.fotoBlog,
            isiBlog: docData.isiBlog,
          });
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };
    fetchBlog();
  }, [slug]);

  if (!blog) return <p>Loading...</p>;

  return (
    <section className="px-6 md:p-[4vh] lg:p-[15vh] font-clash my-12 md:my-16 text-black">
      <Link
        href="/blogs"
        className="flex flex-row justify-start items-center space-x-6 mb-20 px-6 md:px-[4vh] lg:px-[15vh]"
      >
        <Image src={ArrowLeft} alt="Arrow Left" />
        <p className="text-[28px] lg:text-[44px] font-medium">
          Kembali ke Blog
        </p>
      </Link>
      {/* Tanggal + Author */}
      <div className="flex justify-start xl:gap-6 text-black mb-4 text-[14px] lg:text-[20px] px-6 md:px-[4vh] lg:px-[15vh]">
        <span>{blog.tanggal}</span>
        <div className="flex flex-row gap-2 justify-center items-center">
          <div className="rounded-full size-2.5 sm:size-3 bg-[#008080]" />
          <span className="font-medium">{blog.author}</span>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[54px] font-medium mb-4  w-[70%] px-6 md:px-[4vh] lg:px-[15vh]">
        {blog.title}
      </h1>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-6 px-6 md:px-[4vh] lg:px-[15vh]">
        {blog.tags.map((tag, i) => (
          <span
            key={i}
            className="text-[12px] sm:text-[13px] md:text-[14px] px-3 py-1 border-[1.5px] border-[#008080] text-[#008080] rounded-md font-instrument"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Foto Blog */}
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] mb-6">
        <Image
          src={blog.fotoBlog}
          alt={blog.title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Isi Blog */}
      <div
        className="blogContent ml-10 md:ml-[7vh] lg:ml-[20vh] w-[70%] justify-self-end mt-24"
        dangerouslySetInnerHTML={{ __html: blog.isiBlog }}
      />
      <div className="w-full  flex justify-center items-center relative">
        {/* Rekomendasi Blog */}
        <RekomendasiArtikel />
      </div>
    </section>
  );
}
