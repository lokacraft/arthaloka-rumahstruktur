"use client";

import React, { ReactNode } from "react";

interface ListSectionProps {
  title: ReactNode;
  items: string[];
}

export default function ListSection({ title, items }: ListSectionProps) {
  return (
    <section className="p-[15vh] font-clash">
      <div className="container mx-auto px-6 flex flex-row justify-between items-start gap-10">
        {/* Title */}
        <h2 className="text-[50px] font-medium mb-8 w-[50%] leading-none">
          {title}
        </h2>

        {/* List */}
        <ul className="space-y-12 relative text-black w-[48%]">
          {items.map((item, idx) => (
            <li key={idx} className="">
              {/* Custom Bullet */}
              <div className="w-full flex flex-row justify-start gap-4 px-2 leading-none items-center">
                <div className="">
                  <div className="size-5 rounded-full bg-[#008080]" />
                </div>
                <div className=" text-[38px] font-medium ml-8">{item}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
