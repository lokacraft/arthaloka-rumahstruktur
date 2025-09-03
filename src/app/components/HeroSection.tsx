"use client";

import React, { ReactNode } from "react";
import Image from "next/image";

interface HeroSectionProps {
  title: ReactNode;
  description: ReactNode;
  images: { src: string; alt: string; className?: string }[];
  whatsappLink?: string;
}

export default function HeroSection({
  title,
  description,
  images,
  whatsappLink = "https://wa.me/6281234567890",
}: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-b from-[#EAEAEA] p-[15vh] to-[#008080]/30 font-clash h-[100vh]">
      <div className="flex flex-row relative mx-auto items-center justify-between px-6">
        {/* Bagian kiri */}
        <div className=" w-[70%] z-40 h-full">
          <h1 className="text-[84px] font-medium leading-none mb-4">{title}</h1>
          <p className="text-black text-[32px] font-normal leading-tight mb-6">
            {description}
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border text-[32px] border-black rounded-2xl px-6 py-1 transition font-instrument"
          >
            Whatsapp Kami Sekarang
          </a>
        </div>

        {/* Bagian kanan - gambar bertumpuk */}
        <div className="relative flex flex-col items-center justify-center w-[40%] md:items-start">
          {images.slice(0, 3).map((img, idx) => (
            <div
              key={idx}
              className={`absolute overflow-hidden rounded-xl ${
                idx === 0
                  ? "top-0 left-0"
                  : idx === 1
                  ? "top-[130px] left-[170px] z-20"
                  : "top-[290px] left-[35px] z-10"
              } ${img.className || ""}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={260}
                height={200}
                className="object-cover rounded-xl"
              />
            </div>
          ))}
          {/* Spacer untuk kasih tinggi agar container tidak collapse */}
          <div className="h-[480px] w-full"></div>
        </div>
      </div>
    </section>
  );
}
