"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, ChevronRight, ChevronUp } from "lucide-react";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  const layanan = [
    "Hitung Struktur",
    "Analisis Geoteknik",
    "Soil Investigation",
    "Analisis Perkuatan Bangunan",
    "Analisis Geometrik Jalan Raya",
    "Mekanikal, Elektrikal & Plumping",
  ];

  return (
    <nav className="sticky top-0 z-20 w-full border-b-2 border-[#008080] font-instrument text-[24px] text-black/70 bg-[#EAEAEA]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
        {/* Logo */}
        <div className="text-xl font-bold">LOGO</div>

        {/* Menu */}
        <ul className="flex items-center space-x-11">
          <li>
            <Link href="/" className="text-black/70 hover:text-[#008080]">
              Home
            </Link>
          </li>

          {/* Dropdown Layanan */}
          <li className="relative">
            <button
              onClick={() => setOpen(!open)}
              onBlur={() => setTimeout(() => setOpen(false), 150)}
              className="flex items-center text-black/70 hover:text-[#008080]"
            >
              Layanan
              {open ? (
                <ChevronUp size={24} className="ml-2 mt-1" />
              ) : (
                <ChevronDown size={24} className="ml-2 mt-1" />
              )}
            </button>

            {open && (
              <div className="absolute left-0 mt-10 w-[28rem] rounded-xl shadow-lg bg-[#EAEAEA]">
                <ul className="flex flex-col p-4 space-y-3">
                  {layanan.map((item, i) => (
                    <li key={i}>
                      <Link
                        href={`/layanan/${i}`}
                        className="flex items-center text-[24px] transition-all duration-300 justify-between rounded-md px-2 py-1 text-black/70 hover:bg-[#008080]/20"
                      >
                        {item}
                        <ChevronRight size={24} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>

          <li>
            <Link
              href="/tentang-kami"
              className="text-black/70 hover:text-[#008080]"
            >
              Tentang Kami
            </Link>
          </li>
          <li>
            <Link href="/kontak" className="text-black/70 hover:text-[#008080]">
              Kontak
            </Link>
          </li>
          <li>
            <Link
              href="/portfolio"
              className="text-black/70 hover:text-[#008080]"
            >
              Portfolio
            </Link>
          </li>
          <li>
            <Link href="/blog" className="text-black/70 hover:text-[#008080]">
              Blog
            </Link>
          </li>
        </ul>

        {/* Tombol Contact Us */}
        <button className="rounded-lg border border-teal-600 px-4 py-1 text-black hover:text-[#008080] hover:bg-teal-50">
          Contact Us
        </button>
      </div>
    </nav>
  );
}
