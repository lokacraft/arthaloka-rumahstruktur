"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/app/components/ui/button";
import { ArrowRight } from "lucide-react";
import Banner from "../../../../public/landing/bottomBanner.png"

const HomeSecondBanner = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Hook untuk efek parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Background bergerak vertikal (Y axis) lebih lambat dari scroll
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "10%"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden flex items-center mt-20"
    >
      {/* --- PARALLAX BACKGROUND --- */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[140%] -top-[20%] z-0"
      >
        <Image
          src={Banner} // Pastikan gambar ini ada di folder public/images
          alt="banner"
          width={1950}
      height={800}
          className="object-cover"
          priority={false}
        />
        {/* Gradient Overlay untuk keterbacaan teks */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </motion.div>

      {/* --- KONTEN --- */}
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="max-w-[80%] text-white space-y-6 flex items-center justify-center mx-auto"> 

          {/* Deskripsi */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-gray-200 text-base text-center md:text-lg lg:text-2xl leading-relaxed w-full"
          >
            &apos;Diluar Sana Khususnya di Internet dan Google, Banyak sekali yang menawarkan mengenai perihal jasa hitung struktur, Namun kita harus berhati hati dengan hal tersebut, Konsultan Struktur terbaik yang bisa dipercaya, Data dari tim tenaga ahli yang berkualitas dengan kantor, legalitas, serta pengalaman yang sudah jelas&apos;
          </motion.p>

        </div>
      </div>
    </section>
  );
};

export default HomeSecondBanner;