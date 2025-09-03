"use client";

import React, { ReactNode } from "react";
import Image from "next/image";

interface CardItem {
  src: string;
  alt: string;
  title: ReactNode;
  description: ReactNode;
}

interface MengapaMemilihSectionProps {
  title: ReactNode;
  items: CardItem[];
}

export default function MengapaMemilihSection({
  title,
  items,
}: MengapaMemilihSectionProps) {
  return (
    <section className="w-full p-[15vh] font-clash">
      <div className="container mx-auto px-6">
        {/* Title */}
        <h2 className="text-black text-[32px] md:text-[50px] font-medium leading-tight text-center mb-20">
          {title}
        </h2>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full h-full relative ">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start justify-start text-left rounded-xl h-full gap-3 p-8 bg-[#008080]/10"
            >
              <div className="h-[48px] relative w-[48px] mb-4">
                <Image
                  src={item.src}
                  alt={item.alt}
                  layout="fill"
                  className="mb-4 object-contain"
                />
              </div>
              
                <h3 className="text-[#008080] font-medium leading-none text-[30px] mb-2">
                  {item.title}
                </h3>
                <p className="text-black text-[24px] font-light leading-tight">
                  {item.description}
                </p>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
