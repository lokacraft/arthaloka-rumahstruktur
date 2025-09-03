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
    <section className="bg-[#008080]/10 w-full p-[15vh] flex flex-col justify-center items-center font-clash">
      {/* Title */}
      <h2 className="text-black text-[32px] md:text-[50px] font-medium leading-tight text-center mb-20">
        {title}
      </h2>

      {/* Grid items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-start justify-between text-left rounded-xl gap-5 p-8 "
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={item.iconSize || 48}
              height={item.iconSize || 48}
              className="mb-1"
            />
            <div className=" flex flex-col justify-start h-[60%]">
              <h3 className="text-[#008080]  w-full font-medium leading-none text-[30px] mb-2">
                {item.title}
              </h3>
              <p className="text-black text-[24px] font-light leading-tight">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
