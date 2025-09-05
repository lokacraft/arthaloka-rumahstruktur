"use client";

import React, { ReactNode } from "react";
import Image from "next/image";

interface FondasiItem {
  src: string;
  alt: string;
  title: ReactNode;
  description: ReactNode;
  iconSize?: number; // agar ukuran ikon fleksibel
}

interface FondasiKerjaProps {
  title: ReactNode;
  items: FondasiItem[];
}

export default function FondasiKerja({ title, items }: FondasiKerjaProps) {
  return (
    <section
      className="
        w-full flex flex-col justify-center items-center font-clash 
        p-[4vh] lg:p-[15vh]
      "
    >
      {/* Title */}
      <h2
        className="
          text-black font-medium leading-tight text-center mb-10 sm:mb-14 md:mb-16 lg:mb-20
          text-[26px] sm:text-[32px] md:text-[42px] lg:text-[54px]
        "
      >
        {title}
      </h2>

      {/* Grid items */}
      <div
        className="
          grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 
          gap-6 sm:gap-8 md:gap-10 w-full
        "
      >
        {items.map((item, idx) => (
          <div
            key={idx}
            className="
              flex flex-col items-center justify-start text-left rounded-xl 
              gap-4 sm:gap-5 md:gap-6 p-5 sm:p-6 md:p-8
            "
          >
            {/* Icon */}
            <div
              className="
                relative mb-4
                w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[60px] md:h-[60px] lg:w-[88px] lg:h-[88px]
              "
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-contain"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col justify-start text-center">
              <h3
                className="
                  text-[#008080] font-medium leading-none mb-2 
                  text-[20px] sm:text-[22px]  lg:text-[30px]
                "
              >
                {item.title}
              </h3>
              <p
                className="
                  text-black font-light leading-snug
                  text-[18px]  lg:text-[24px]
                "
              >
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
