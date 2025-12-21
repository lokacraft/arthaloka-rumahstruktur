"use client";

import React, { ReactNode } from "react";
import Image from "next/image";

interface TeknologiItem {
  src: string;
  alt: string;
  title: ReactNode;
  description: ReactNode;
  iconSize?: number; // agar ukuran ikon fleksibel
}

interface TeknologiSectionProps {
  title: ReactNode;
  items: TeknologiItem[];
}

export default function TeknologiSection({
  title,
  items,
}: TeknologiSectionProps) {
  return (
    <section className="bg-[#008080]/10 w-full px-[4vh] py-[8vh] lg:p-[15vh] flex flex-col md:justify-center justify-start md:items-center items-start font-clash">
      {/* Title */}
      <h2 className="text-black text-left md:text-center text-[22px] sm:text-[28px] md:text-[40px] lg:text-[50px] font-medium leading-tight mb-10 md:mb-20">
        {title}
      </h2>

      {/* Grid items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 w-full">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-start justify-between text-left rounded-xl gap-2 md:gap-3 lg:gap-5 md:p-8"
          >
            <div className="md:w-[48px] md:h-[48px] xl:w-[58px] lg:h-[58px] w-[34px] h-[34px] relative">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="mb-1 object-contain"
              />
            </div>
            <div className="flex flex-col justify-start h-[60%]">
              <h3 className="text-[#008080] h-20 font-medium leading-none text-[20px] sm:text-[26px] xl:text-[30px] mb-2">
                {item.title}
              </h3>
              <p className="text-black text-md md:text-lg 2xl:text-xl font-light leading-tight">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
