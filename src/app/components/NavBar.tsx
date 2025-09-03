"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, ChevronRight, ChevronUp } from "lucide-react";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // sekarang tiap item punya title & href
  const layanan = [
    { title: "Hitung Struktur", href: "/layanan/jasa-hitung-struktur" },
    { title: "Analisis Geoteknik", href: "/layanan/analisis-geoteknik" },
    { title: "Soil Investigation", href: "/layanan/soil-investigation" },
    { title: "Analisis Perkuatan Bangunan", href: "/layanan/perkuatan-bangunan" },
    { title: "Analisis Geometrik Jalan Raya", href: "/layanan/geometrik-jalan-raya" },
    { title: "Mekanikal, Elektrikal & Plumping", href: "/layanan/mekanikal-elektrikal-plumbing" },
  ];

  // helper untuk kasih warna active link
  const getLinkClass = (href: string) => {
    const isActive = pathname === href || pathname.startsWith(href + "/");
    return `transition-colors ${
      isActive ? "text-[#008080]" : "text-black/70 hover:text-[#008080]"
    }`;
  };

  return (
    <div className="sticky top-5 z-60 flex items-center justify-between px-6 py-4 rounded-2xl shadow-2xl mx-[12vh] font-instrument text-[24px] text-black/70 bg-[#FAFAFA]">
      {/* Logo */}
      <div className="text-xl font-bold">LOGO</div>

      {/* Menu */}
      <ul className="flex items-center space-x-11">
        <li>
          <Link href="/landingpage" className={getLinkClass("/landingpage")}>
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
                      href={item.href}
                      className={`flex items-center text-[24px] justify-between rounded-md px-2 py-1 transition-all duration-300 ${
                        pathname === item.href
                          ? "text-[#008080] bg-[#008080]/10"
                          : "text-black/70 hover:bg-[#008080]/20"
                      }`}
                    >
                      {item.title}
                      <ChevronRight size={24} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>

        <li>
          <Link href="/tentang-kami" className={getLinkClass("/tentang-kami")}>
            Tentang Kami
          </Link>
        </li>
        <li>
          <Link href="/kontak" className={getLinkClass("/kontak")}>
            Kontak
          </Link>
        </li>
        <li>
          <Link href="/portfolio" className={getLinkClass("/portfolio")}>
            Portfolio
          </Link>
        </li>
        <li>
          <Link href="/blog" className={getLinkClass("/blog")}>
            Blog
          </Link>
        </li>
      </ul>

      {/* Tombol Contact Us */}
      <button className="rounded-lg border border-teal-600 px-4 py-1 text-black hover:text-[#008080] hover:bg-teal-50">
        Contact Us
      </button>
    </div>
  );
}
