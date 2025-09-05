"use client";

import React, { ReactNode } from "react";

interface ListSectionProps {
  title: ReactNode;
  items: string[];
}

export default function ListSection({ title, items }: ListSectionProps) {
  return (
    <section className="font-clash p-[4vh] lg:p-[15vh]">
      <div className="container lg:px-6 flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-10">
        {/* Title */}
        <h2 className="leading-none mb-6 lg:mb-8 w-full lg:w-[50%] text-[28px] sm:text-[36px] lg:text-[50px] font-medium text-left">
          {title}
        </h2>

        {/* List */}
        <ul className="w-full lg:w-[48%] space-y-8 lg:space-y-12 relative text-black">
          {items.map((item, idx) => (
            <li key={idx}>
              {/* Custom Bullet */}
              <div className="w-full flex flex-row justify-start gap-4 px-2 leading-none items-center">
                <div className="">
                  <div className="size-4 lg:size-5 rounded-full bg-[#008080]" />
                </div>
                <div className="ml-6 lg:ml-8 text-[20px] sm:text-[24px] lg:text-[38px] font-medium">
                  {item}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
