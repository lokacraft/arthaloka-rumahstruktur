"use client";

import React, { ReactNode, useState } from "react";
import Image from "next/image";

interface HeroSectionProps {
  title: ReactNode;
  description: ReactNode;
  images: {
    src: string;
    alt: string;
    classNameDesktop?: string;
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
  const [loadedCount, setLoadedCount] = useState(0);

  const allLoaded = loadedCount >= Math.min(images.length, 3);

  return (
    <section className="bg-gradient-to-b from-[#EAEAEA] to-[#008080]/30 font-clash h-auto min-h-[90vh] max-h-[100vh] px-[4vh] py-[10vh] lg:p-[15vh] relative overflow-hidden">
      {/* Skeleton Loader */}
      {!allLoaded && (
        <div className="absolute inset-0 flex flex-col lg:flex-row-reverse items-center justify-between gap-10 py-[10vh] animate-pulse px-[4vh] lg:px-[15vh]">
          {/* Skeleton gambar */}
          <div className="w-full lg:w-[40%] flex items-center justify-center">
            {/* Desktop */}
            <div className="hidden lg:block relative w-full h-[480px]">
              <div className="absolute w-[220px] h-[220px] bg-gray-300 rounded-xl top-2 left-2 rotate-70" />
              <div className="absolute w-[220px] h-[220px] bg-gray-300 rounded-xl top-[150px] left-[170px] rotate-20 z-20" />
              <div className="absolute w-[220px] h-[220px] bg-gray-300 rounded-xl top-[320px] left-[25px] rotate-20 z-10" />
            </div>

            {/* Mobile */}
            <div className="lg:hidden relative mx-auto w-[320px] h-[220px] sm:w-[380px] sm:h-[250px] mt-12">
              <div className="absolute w-[180px] h-[180px] bg-gray-300 rounded-xl top-[80px] left-[5px] rotate-75 z-10" />
              <div className="absolute w-[180px] h-[180px] bg-gray-300 rounded-xl top-[10px] left-[120px] rotate-10 z-20" />
              <div className="absolute w-[180px] h-[180px] bg-gray-300 rounded-xl top-[80px] left-[230px] rotate-25 z-0" />
            </div>
          </div>

          {/* Skeleton teks */}
          <div className="w-full lg:w-[60%] flex flex-col gap-4">
            <div className="bg-gray-300 rounded w-[80%] h-[40px] sm:h-[48px] md:h-[64px] lg:h-[84px]" />
            <div className="bg-gray-300 rounded w-[60%] h-[40px] sm:h-[48px] md:h-[64px] lg:h-[84px]" />
            <div className="bg-gray-300 rounded w-[90%] h-[16px] sm:h-[20px] md:h-[24px] lg:h-[32px]" />
            <div className="bg-gray-300 rounded w-[70%] h-[16px] sm:h-[20px] md:h-[24px] lg:h-[32px]" />
            <div className="bg-gray-300 rounded-lg w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] h-[36px] sm:h-[44px] md:h-[52px] lg:h-[60px]" />
          </div>
        </div>
      )}

      {/* Konten Asli */}
      <div
        className={`transition-opacity duration-700 ${
          allLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col lg:flex-row-reverse relative mx-auto items-center justify-between gap-10">
          {/* BAGIAN GAMBAR */}
          <div className="w-full lg:w-[40%] flex flex-col items-center justify-center">
            {/* Desktop */}
            <div className="hidden lg:block relative w-full h-[480px]">
              {images.slice(0, 3).map((img, idx) => (
                <div
                  key={idx}
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
                    onLoad={() => setLoadedCount((c) => c + 1)}
                  />
                </div>
              ))}
            </div>

            {/* Mobile */}
            <div className="lg:hidden relative mx-auto w-[320px] h-[220px] sm:w-[380px] sm:h-[250px] mt-10">
              {images.slice(0, 3).map((img, idx) => (
                <div
                  key={idx}
                  className={`absolute w-[180px] h-[180px] rounded-xl
                  ${
                    idx === 0
                      ? "top-[80px] left-[10px] z-10"
                      : idx === 1
                      ? "top-[10px] left-[120px] z-20"
                      : "top-[80px] left-[230px] z-0"
                  }
                  ${img.classNameMobile || ""}`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover rounded-xl"
                    sizes="(max-width: 640px) 140px, 100vw"
                    priority={idx === 0}
                    onLoad={() => setLoadedCount((c) => c + 1)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* BAGIAN TEKS */}
          <div className="w-full lg:w-[60%] z-40 h-full text-left mt-8 md:mt-0">
            <h1 className="text-3xl md:text-4xl lg:text-6xl 2xl:text-6xl font-medium leading-none mb-4">
              {title}
            </h1>
            <p className="text-black text-md md:text-xl 2xl:text-2xl font-normal leading-tight mb-6">
              {description}
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border text-lg md:text-xl 2xl:text-2xl border-black rounded-2xl px-6 py-1 transition font-instrument"
            >
              Whatsapp Kami Sekarang
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
