"use client";

import React, { useState } from "react";
import Image from "next/image";
import ArrowLeft from "/public/icons/ArrowLeft.png";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProjectDetailProps {
  project: {
    id: string;
    slug: string;
    title: string;
    description: string;
    tipePekerjaan: string;
    pekerjaan: string;
    lokasi: string;
    fotoPortofolio: string;
    fotoDokumentasi?: string[];
  };
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // gabungkan fotoPortofolio utama + fotoDokumentasi
  const images = [project.fotoPortofolio, ...(project.fotoDokumentasi || [])];
  const [activeIndex, setActiveIndex] = useState(0);

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleBack = () => {
    setLoading(true);
    router.push("/portofolio");
  };

  return (
    <section className="px-6 md:p-[4vh] lg:p-[15vh] font-clash my-12 md:my-16 text-black">
      {/* Loader overlay */}
      {loading && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center backdrop-blur-md bg-black/30">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white text-lg font-medium animate-pulse">
            Memuat Halaman...
          </p>
        </div>
      )}

      {/* Back button */}
      <button
        onClick={handleBack}
        className="flex flex-row justify-start items-center space-x-6 mb-10 px-6 md:px-[4vh] lg:px-[15vh]"
      >
        <Image src={ArrowLeft} alt="Arrow Left" />
        <p className="text-[20px] sm:text-[28px] lg:text-[34px] font-medium">
          Kembali ke Portfolio
        </p>
      </button>

      {/* Carousel */}
      <div className="flex flex-col gap-10">
        <div className="w-full relative">
          {/* Gambar utama */}
          <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px]">
            <Image
              src={images[activeIndex]}
              alt={project.title}
              fill
              className="object-cover rounded-lg"
            />

            {/* Tombol navigasi */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/70 text-black rounded-full p-2 sm:p-3"
                >
                  <ChevronLeft className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white/70 text-black rounded-full p-2 sm:p-3"
                >
                  <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail */}
          {images.length > 1 && (
            <div className="flex flex-row justify-start gap-4 mt-4 overflow-x-auto">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`relative w-20 h-16 sm:w-28 sm:h-20 md:w-32 md:h-24 lg:w-72 lg:h-52 rounded-md overflow-hidden border-2 ${
                    activeIndex === i ? "border-black" : "border-transparent"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                  {/* Overlay putih tipis kalau bukan aktif */}
                  {activeIndex !== i && (
                    <div className="absolute inset-0 bg-white/60" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Proyek */}
      <div className="flex flex-col w-full items-start justify-between mt-10">
        <div className="flex items-start flex-col">
          <h1 className="text-[26px] sm:text-[34px] lg:text-[44px] font-medium mb-6">
            {project.title}
          </h1>
          <div className="flex flex-col md:flex-row w-full justify-start gap-8 md:gap-16 items-start">
            <p className="text-[16px] sm:text-[18px] lg:text-[20px] text-justify font-light leading-relaxed md:w-[70%]">
              {project.description}
            </p>

            {/* Detail Proyek */}
            <div className="w-full md:w-[30%] flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <h2 className="text-[18px] sm:text-[22px] lg:text-[26px] font-semibold">
                  Detail Proyek
                </h2>
                <div className="h-[2px] w-full bg-black" />
              </div>
              <p className="text-[16px] flex font-medium flex-col">
                <span className="font-normal text-muted-foreground">
                  Tipe Pekerjaan:
                </span>{" "}
                {project.tipePekerjaan || "-"}
              </p>
              <p className="text-[16px] flex font-medium flex-col">
                <span className="font-normal text-muted-foreground">
                  Pekerjaan:
                </span>{" "}
                {project.pekerjaan || "-"}
              </p>
              <p className="text-[16px] flex font-medium flex-col">
                <span className="font-normal text-muted-foreground">
                  Lokasi:
                </span>{" "}
                {project.lokasi || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
