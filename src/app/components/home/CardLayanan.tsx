"use client";

import type React from "react";
import Link from "next/link";
// import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import ArrowRight from "/public/layanan/icons/ArrowRight.png";

interface Product {
  id: string;
  name: string;
  subtitle?: string;
  description: string;
  icon: string;
}

const products: Product[] = [
  {
    id: "struktur",
    name: "Jasa Hitung Struktur",
    description:
      "Melayani hitung struktur gedung, rumah, jembatan, bandara, dermaga & bangunan lainnya.",
    icon: "/layanan/icons/icon1.png",
  },
  {
    id: "geoteknik",
    name: "Jasa Analisis Geoteknik",
    description:
      "Meneliti stabilitas tanah, kondisi bawah permukaan, dinding penahan tanah, pondasi, hingga penelitian risiko.",
    icon: "/layanan/icons/icon2.png",
  },
  {
    id: "soil",
    name: "Jasa Soil Investigation",
    description:
      "Melayani jasa soil test/soil investigasi (Boring & Sondir) untuk seluruh wilayah Indonesia.",
    icon: "/layanan/icons/icon3.png",
  },

  {
    id: "analisis",
    name: "Analisis Perkuatan Bangunan & Audit Struktur",
    description:
      "Jasa analisis perkuatan bangunan dan audit struktur temporary.",
    icon: "/layanan/icons/icon4.png",
  },
  {
    id: "mekanikal",
    name: "Mekanikal, Elektrikal, dan Plumbing",
    description:
      "Berkualitas tinggi dan efisien untuk bangunan baru maupun renovasi.",
    icon: "/layanan/icons/icon5.png",
  },
  {
    id: "jalan raya",
    name: "Analisis Geometrik Jalan Raya",
    description:
      "Analisis andalalin, perencanaan geometrik jalan, dan perkerasan jalan.",
    icon: "/layanan/icons/icon6.png",
  },
];

const CardLayanan = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      container.scrollLeft += e.deltaY;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full py-12 pl-[8vw] font-clash">
      <div className="flex flex-row justify-between items-center w-full pr-[8vw]">
        <h1 className="text-[#151515] text-[54px] my-8 font-medium">
          Cakupan <span className="text-[#008080]">Layanan</span> Kami
        </h1>
        <Image src={ArrowRight} alt="arrow" />
      </div>
      <div className="mx-auto relative">
        {/* Horizontal Scrollable Carousel */}
        <div
          ref={scrollContainerRef}
          className={`overflow-x-auto pb-4 ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex w-full h-full gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-col flex-shrink-0 p-6 mt-5 bg-white w-[550px] h-[350px] justify-start flex rounded-2xl relative select-none"
              >
                {/* Icon */}
                <div className=" w-full h-fit">
                  <div className="w-12 h-12 relative">
                    <Image
                      src={product.icon}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Title & Desc */}
                <div className="flex flex-col gap-y-1">
                  <h3 className="text-[38px] font-medium text-black mt-10 leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-black text-[26px] font-light leading-tight">
                    {product.description}
                  </p>
                </div>
                {/* Button */}
                <Link
                  href="/product"
                  className="mt-4 px-6 w-fit font-normal text-lg font-instrument border border-[#008080] text-black rounded-full hover:bg-[#008080] hover:text-white transition-all duration-300"
                >
                  Cek Detail
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Link href="">
        <h1 className="text-white text-[32px] my-10 font-normal font-instrument w-fit px-6 py-2 rounded-2xl bg-[#008080]">
          Mulai Proyek Anda
        </h1>
      </Link>
    </div>
  );
};

export default CardLayanan;
