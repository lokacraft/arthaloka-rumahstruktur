"use client";

import React, { ReactNode } from "react";
import Image from "next/image";

interface HeroSectionProps {
  title: ReactNode;
  description: ReactNode;
  images: {
    src: string;
    alt: string;
    /** Posisi/kelas khusus untuk desktop (≥ md) */
    classNameDesktop?: string;
    /** Posisi/kelas khusus untuk mobile (≤ sm) */
    classNameMobile?: string;
  }[];
  whatsappLink?: string;
}

export default function HeroSection({
  title,
  description,
  images,
  whatsappLink = "https://wa.me/6281234567890",
}: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-b from-[#EAEAEA] to-[#008080]/30 font-clash h-auto min-h-[90vh] max-h-[100vh] px-[4vh] py-[10vh] lg:p-[15vh]">
      {/* Mobile: image di atas, text di bawah; Desktop: text kiri, image kanan */}
      <div className="flex flex-col lg:flex-row-reverse relative mx-auto items-center justify-between gap-10">

        {/* BAGIAN GAMBAR */}
        <div className="w-full lg:w-[40%] flex flex-col items-center justify-center">
          {/* Desktop (≥ md): collage bertumpuk dengan posisi absolut */}
          <div className="hidden lg:block relative w-full h-[480px]">
            {images.slice(0, 3).map((img, idx) => (
              <div
                key={idx}
                /* 
                  FIX: beri ukuran tetap di wrapper + pakai Image fill
                  -> mencegah gambar "shrink" saat viewport berubah.
                */
                className={`absolute w-[260px] h-[260px] rounded-xl
                ${
                  idx === 0
                    ? "top-0 left-0"
                    : idx === 1
                    ? "top-[130px] left-[170px] z-20"
                    : "top-[290px] left-[35px] z-10"
                } ${img.classNameDesktop || ""}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover rounded-xl"
                  sizes="(min-width: 768px) 260px, 100vw"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>

          {/* Mobile (≤ sm): collage di TENGAH, container relative + ukuran eksplisit */}
          <div
            className="
              lg:hidden relative mx-auto
              w-[320px] h-[220px]
              sm:w-[380px] sm:h-[250px]
              mt-10
            "
          >
            {images.slice(0, 3).map((img, idx) => (
              <div
                key={idx}
                /* 
                  tetap absolute tapi POSISI & UKURAN KHUSUS MOBILE
                  supaya tata letak mobile bisa beda dari desktop.
                */
                className={`
                  absolute w-[180px] h-[180px] rounded-xl
                  ${
                    idx === 0
                      ? "top-[80px] left-[10px] z-10"
                      : idx === 1
                      ? "top-[10px] left-[120px] z-20"
                      : "top-[80px] left-[230px] z-0"
                  }
                  ${img.classNameMobile || ""}
                `}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 640px) 140px, 100vw"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* BAGIAN TEKS */}
        <div className="w-full lg:w-[60%] z-40 h-full text-left mt-8 md:mt-0">
          <h1 className="text-[40px] sm:text-[48px] md:text-[64px] lg:text-[84px] font-medium leading-none mb-4">
            {title}
          </h1>
          <p className="text-black text-[16px] sm:text-[20px] md:text-[24px] lg:text-[32px] font-normal leading-tight mb-6">
            {description}
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border text-[16px] sm:text-[20px] md:text-[24px] lg:text-[32px] border-black rounded-2xl px-6 py-1 transition font-instrument"
          >
            Whatsapp Kami Sekarang
          </a>
        </div>
      </div>
    </section>
  );
}
