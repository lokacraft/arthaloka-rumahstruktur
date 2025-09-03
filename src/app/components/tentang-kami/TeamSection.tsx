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
    <section className="w-full h-full p-[15vh] font-clash">
      {/* Judul */}
      <h2 className="text-center text-3xl md:text-[50px] font-medium mb-12">
        {title}
      </h2>

      {/* Grid anggota tim */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mx-auto">
        {members.map((member, idx) => (
          <div
            key={idx}
            className="bg-[#008080] text-[#FAFAFA] rounded-3xl p-10 flex flex-col leading-tight justify-end h-[400px]"
          >
            <h3 className="text-[36px] font-medium">{member.name}</h3>
            <p className="text-[24px] font-light">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
