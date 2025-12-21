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
    <section className="w-full p-[4vh] lg:p-[15vh] font-clash mt-20 xl:mt-0">
      <div className="container mx-auto px-4 md:px-6">
        {/* Title */}
        <h2 className="text-black text-[28px] md:text-[36px] lg:text-[50px] font-medium leading-tight text-center mb-10 md:mb-16 lg:mb-20">
          {title}
        </h2>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 w-full h-full relative">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-start justify-start text-left rounded-xl h-full gap-3 p-4 md:p-6 lg:p-8 bg-[#008080]/10"
            >
              {/* Icon */}
              <div className="h-[36px] md:h-[42px] lg:h-[48px] w-[36px] md:w-[42px] lg:w-[48px] relative mb-4">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Title */}
              <h3 className="text-[#008080] font-medium leading-none text-[20px] xl:text-[30px] mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-black font-light leading-tight text-md md:text-lg 2xl:text-xl">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
