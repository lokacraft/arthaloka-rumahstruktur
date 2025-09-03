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
    <section className=" w-full p-[15vh] flex flex-col justify-center items-center font-clash">
      {/* Title */}
      <h2 className="text-black text-[32px] md:text-[54px] font-medium leading-tight text-center mb-20">
        {title}
      </h2>

      {/* Grid items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-between text-left rounded-xl gap-5 p-8 "
          >
            <div className="h-[88px] relative w-[88px] mb-4">
              <Image
                src={item.src}
                alt={item.alt}
                layout="fill"
                className="mb-4 object-contain"
              />
            </div>
            <div className=" flex flex-col justify-start text-center h-[60%]">
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
