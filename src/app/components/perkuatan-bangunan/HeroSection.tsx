"use client";

import React, { ReactNode } from "react";
import Image from "next/image";

interface HeroImage {
  src: string;
  alt: string;
  className?: string;
  zIndex?: number; // kontrol z-index tiap gambar
}

interface HeroSectionProps {
  title: ReactNode;
  description: ReactNode;
  images: HeroImage[];
  whatsappLink?: string;
  leftWidth?: string; // contoh "60%"
  rightWidth?: string; // contoh "40%"
  leftOffset?: { x?: string; y?: string }; // contoh { x: "50px", y: "-20px" }
  rightOffset?: { x?: string; y?: string }; // contoh { x: "50px", y: "-20px" }
  zIndexLeft?: number; // kontrol z-index teks
}

export default function HeroSection({
  title,
  description,
  images,
  whatsappLink = "https://wa.me/6281234567890",
  leftWidth = "70%",
  rightWidth = "40%",
  leftOffset = { x: "0px", y: "0px" },
  rightOffset = { x: "0px", y: "0px" },
  zIndexLeft = 40,
}: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-b from-[#EAEAEA] to-[#008080]/30 font-clash h-[100vh] relative flex justify-center items-center pb-[15vh]">
      <div className="relative flex justify-center items-center w-full max-w-[1200px] px-6">
        {/* Bagian kiri (absolute, overlap) */}
        <div
          className="absolute text-left -translate-x-[120px] translate-y-[50px]"
          style={{
            width: leftWidth,
            transform: `translate(${leftOffset.x}, ${leftOffset.y})`,
            zIndex: zIndexLeft,
          }}
        >
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

        {/* Bagian kanan (gambar bertumpuk) */}
        <div
          className="relative flex flex-col items-center justify-center translate-x-[450px]"
          style={{ width: rightWidth ,transform: `translate(${rightOffset.x}, ${rightOffset.y})`,}}
        >
          {images.slice(0, 3).map((img, idx) => (
            <div
              key={idx}
              className={`absolute overflow-hidden rounded-xl ${
                img.className || ""
              }`}
              style={{
                zIndex: img.zIndex ?? (idx === 1 ? 20 : idx === 2 ? 10 : 0), // default seperti sebelumnya
                top: idx === 0 ? "0px" : idx === 1 ? "130px" : "290px",
                left: idx === 0 ? "0px" : idx === 1 ? "170px" : "35px",
              }}
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
          {/* Spacer biar tinggi container stabil */}
          <div className="h-[480px] w-full"></div>
        </div>
      </div>
    </section>
  );
}
