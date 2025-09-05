"use client";

import React, { ReactNode } from "react";

interface TeamMember {
  name: string;
  role: string;
}

interface TeamSectionProps {
  title: ReactNode;
  members: TeamMember[];
}

export default function TeamSection({ title, members }: TeamSectionProps) {
  return (
    <section className="w-full h-full p-[4vh] lg:p-[15vh] font-clash">
      {/* Judul */}
      <h2 className="text-center text-3xl md:text-[36px] lg:text-[50px] font-medium mb-8 lg:mb-12">
        {title}
      </h2>

      {/* Layout responsif */}
      <div className="flex flex-col gap-6 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:gap-8 w-full mx-auto">
        {members.map((member, idx) => (
          <div
            key={idx}
            className="bg-[#008080] text-[#FAFAFA] rounded-3xl p-6 md:p-8 lg:p-10 flex flex-col leading-tight justify-end h-[280px] md:h-[320px] lg:h-[400px]"
          >
            <h3 className="text-[22px] lg:text-[36px] font-medium">
              {member.name}
            </h3>
            <p className="text-[18px] lg:text-[24px] font-light">
              {member.role}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
