"use client";

import React, { ReactNode, useState } from "react";
import Image from "next/image";
import { useContact } from "@/contexts/ContactContext";

interface HeroImage {
  src: string;
  alt: string;
  classNameDesktop?: string;
  classNameMobile?: string;
  zIndex?: number;
}

interface HeroSectionProps {
  title: ReactNode;
  description: ReactNode;
  images: HeroImage[];
  whatsappLink?: string;
  leftWidth?: string; // contoh "60%"
  rightWidth?: string; // contoh "40%"
  leftOffset?: { x?: string; y?: string };
  rightOffset?: { x?: string; y?: string };
  zIndexLeft?: number;
}

export default function HeroSection({
  title,
  description,
  images,
  whatsappLink = "https://wa.me/6281234567890",
  // leftWidth = "60%",
  // rightWidth = "40%",
  // leftOffset = { x: "0px", y: "0px" },
  // rightOffset = { x: "0px", y: "0px" },
  // zIndexLeft = 40,
}: HeroSectionProps) {
  const [loadedCount, setLoadedCount] = useState(0);
  const allLoaded = loadedCount >= Math.min(images.length, 3);
  const { contactData, isLoading } = useContact();

  return (
    <section className="bg-gradient-to-b from-[#EAEAEA] to-[#008080]/30 font-clash h-full min-h-[100vh] px-[4vh] xl:px-[15vh] relative">
      {/* Loader skeleton */}
      {!allLoaded && (
        <div className="absolute inset-0 flex flex-col lg:flex-row-reverse items-center justify-between gap-10 animate-pulse px-[4vh] lg:px-[15vh]">
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
        className={`transition-opacity duration-700 relative ${
          allLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col lg:flex-row-reverse relative mx-auto items-start min-h-[80vh] lg:h-full w-full my-[15vh] justify-between gap-10">
          {/* Bagian kanan (gambar) */}
          <div
            className="w-full lg:w-[40%] flex flex-col items-center justify-center"
          >
            {/* Desktop */}
            <div className="hidden lg:block relative w-full h-[480px]">
              {images.slice(0, 3).map((img, idx) => (
                <div
                  key={idx}
                  className={`absolute w-[260px] h-[260px] rounded-xl ${
                    idx === 0
                      ? "top-0 left-0"
                      : idx === 1
                      ? "top-[130px] left-[170px] z-20"
                      : "top-[290px] left-[35px] z-10"
                  } ${img.classNameDesktop || ""}`}
                  style={{ zIndex: img.zIndex }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover rounded-xl flex-1"
                    // sizes="(min-width: 768px) 260px, 100vw"
                    priority={idx === 0}
                    onLoad={() => setLoadedCount((c) => c + 1)}
                  />
                </div>
              ))}
            </div>

            {/* Mobile */}
            <div className="lg:hidden relative mx-auto w-[320px] h-[220px] sm:w-[380px] sm:h-[250px]">
              {images.slice(0, 3).map((img, idx) => (
                <div
                  key={idx}
                  className={`absolute w-[180px] h-[180px] rounded-xl
                  ${
                    idx === 0
                      ? "top-[80px] left-[0px] z-10"
                      : idx === 1
                      ? "top-[10px] left-[100px] z-20"
                      : "top-[80px] left-[210px] z-0"
                  }
                  ${img.classNameMobile || ""}`}
                  style={{ zIndex: img.zIndex }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover rounded-xl"
                    // sizes="(max-width: 640px) 140px, 100vw"
                    priority={idx === 0}
                    onLoad={() => setLoadedCount((c) => c + 1)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bagian kiri (teks) */}
          <div
            className="absolute flex-1 bottom-1 lg:top-0 lg:left-0 lg:w-[70%] z-40 h-fit text-left lg:mt-20 xl:mt-8"
          >
            <h1 className="text-3xl md:text-4xl lg:text-6xl 2xl:text-6xl font-medium leading-none mb-4">
              {title}
            </h1>
            <p className="text-black text-md md:text-xl 2xl:text-2xl font-normal leading-tight mb-6 lg:w-[80%]">
              {description}
            </p>
            {contactData && !isLoading ? (
            <a
              href={`https://wa.me/${contactData.whatsAppNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border text-lg md:text-xl 2xl:text-2xl border-black rounded-2xl px-6 py-1 transition font-instrument"
            >
              Whatsapp Kami Sekarang
            </a>

            ) : (
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border text-lg md:text-xl 2xl:text-2xl border-black rounded-2xl px-6 py-1 transition font-instrument"
            >
              Whatsapp Kami Sekarang
            </a>

            )}
          </div>
        </div>
      </div>
    </section>
  );
}
