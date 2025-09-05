"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ArrowUpRight,
  ArrowDownRight,
  CornerUpLeft,
} from "lucide-react";
import Image from "next/image";

export default function NavBar() {
  const [open, setOpen] = useState(false); // dropdown desktop
  const [menuOpen, setMenuOpen] = useState(false); // hamburger
  const [layananOpen, setLayananOpen] = useState(false); // dropdown mobile
  const pathname = usePathname();

  const layanan = [
    { title: "Hitung Struktur", href: "/layanan/jasa-hitung-struktur" },
    { title: "Analisis Geoteknik", href: "/layanan/analisis-geoteknik" },
    { title: "Soil Investigation", href: "/layanan/soil-investigation" },
    {
      title: "Analisis Perkuatan Bangunan",
      href: "/layanan/perkuatan-bangunan",
    },
    {
      title: "Analisis Geometrik Jalan Raya",
      href: "/layanan/geometrik-jalan-raya",
    },
    {
      title: "Mekanikal, Elektrikal & Plumping",
      href: "/layanan/mekanikal-elektrikal-plumbing",
    },
  ];

  const getLinkClass = (href: string) => {
    const isActive = pathname === href || pathname.startsWith(href + "/");
    return `transition-colors ${
      isActive ? "text-[#008080]" : "text-black/70 hover:text-[#008080]"
    }`;
  };

  return (
    <div className="w-full">
      {/* ========== DESKTOP NAVBAR (md ke atas) ========== */}
      <div className="hidden md:flex justify-center items-center w-full">
        <div className="fixed top-5 w-[90%] z-60 flex items-center justify-between py-4 rounded-2xl xl:gap-26 lg:gap-24 md:gap-4 sm:gap-12 shadow-2xl px-6 font-instrument text-black/70 bg-[#FAFAFA] text-[18px] md:text-[8px] lg:text-[14px] xl:text-[24px]">
          {/* Logo */}
          <div className="text-xl font-bold">LOGO</div>

          {/* Menu */}
          <ul className="flex items-center space-x-10 lg:space-x-14">
            <li>
              <Link
                href="/landingpage"
                className={getLinkClass("/landingpage")}
              >
                Home
              </Link>
            </li>

            {/* Dropdown Layanan */}
            <li className="relative">
              <button
                onClick={() => setOpen(!open)}
                onBlur={() => setTimeout(() => setOpen(false), 150)}
                className="flex items-center hover:text-[#008080]"
              >
                Layanan
                {open ? (
                  <ChevronUp size={22} className="ml-1" />
                ) : (
                  <ChevronDown size={22} className="ml-1" />
                )}
              </button>

              {open && (
                <div className="absolute left-0 mt-10 w-[26rem] rounded-xl shadow-lg bg-[#EAEAEA]">
                  <ul className="flex flex-col p-4 space-y-3">
                    {layanan.map((item, i) => (
                      <li key={i}>
                        <Link
                          href={item.href}
                          className={`flex items-center justify-between rounded-md px-2 py-1 transition-all duration-300 ${
                            pathname === item.href
                              ? "text-[#008080] bg-[#008080]/10"
                              : "text-black/70 hover:bg-[#008080]/20"
                          }`}
                        >
                          {item.title}
                          <ChevronRight size={20} />
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
                className={getLinkClass("/tentang-kami")}
              >
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link href="/kontak" className={getLinkClass("/kontak")}>
                Kontak
              </Link>
            </li>
            <li>
              <Link href="/portofolio" className={getLinkClass("/portofolio")}>
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/blogs" className={getLinkClass("/blogs")}>
                Blog
              </Link>
            </li>
          </ul>

          {/* Tombol Contact Us */}
          <button className="rounded-lg border border-teal-600 px-4 py-1 hover:text-[#008080] hover:bg-teal-50">
            Contact Us
          </button>
        </div>
      </div>

      {/* ========== MOBILE NAVBAR (sm ke bawah) ========== */}
      <div className="md:hidden flex items-center justify-center w-full">
        <div className=" fixed top-5 rounded-lg w-[90%] bg-[#FAFAFA] z-50">
          <div className="flex items-center justify-between px-4 py-3 text-black">
            {/* Logo */}
            <div className="text-xl font-bold">LOGO</div>
            {/* Hamburger */}
            <button onClick={() => setMenuOpen(true)}>
              <Image
                src="/icons/hamburger.png"
                alt="menu"
                width={32}
                height={32}
              />
            </button>
          </div>

          {/* Overlay menu */}
          <div
            className={`fixed top-0 right-0 h-full w-[90%] max-w-sm flex flex-col justify-center items-center bg-[#008080] rounded-l-4xl shadow-lg transform transition-transform duration-300 ease-in-out ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Close button */}
            <div className="flex w-full justify-end px-4 py-4 mr-3 mb-5">
              <button onClick={() => setMenuOpen(false)}>
                <CornerUpLeft size={28} className="text-white" />
              </button>
            </div>

            {/* Menu items */}
            <nav className="flex flex-col justify-between w-full gap-2 px-6 font-instrument">
              <Link
                href="/"
                className="flex border-b-2 border-[#FAFAFA] justify-between  items-center text-3xl py-2 text-[#FAFAFA] hover:text-white"
              >
                Home <ArrowUpRight size={24} />
              </Link>

              {/* Dropdown Layanan */}
              <button
                onClick={() => setLayananOpen(!layananOpen)}
                className="flex border-b-2 border-[#FAFAFA] justify-between items-center w-full text-3xl py-2 text-[#FAFAFA] hover:text-white transition"
              >
                Layanan
                <ArrowUpRight
                  size={24}
                  className={`transform transition-transform duration-300 ${
                    layananOpen ? "rotate-90" : ""
                  }`}
                />
              </button>
              {layananOpen && (
                <div className="pl-4 flex flex-col gap-1">
                  {layanan.map((item, i) => (
                    <Link
                      key={i}
                      href={item.href}
                      className="flex justify-between border-b-1 border-[#FAFAFA] items-center text-base py-1 text-[#FAFAFA] hover:text-white"
                    >
                      {item.title}
                      <ArrowDownRight size={18} />
                    </Link>
                  ))}
                </div>
              )}

              <Link
                href="/tentang-kami"
                className="flex justify-between border-b-2 border-[#FAFAFA] items-center text-3xl py-2 text-[#FAFAFA] hover:text-white"
              >
                Tentang Kami <ArrowUpRight size={24} />
              </Link>
              <Link
                href="/kontak"
                className="flex justify-between border-b-2 border-[#FAFAFA] items-center text-3xl py-2 text-[#FAFAFA] hover:text-white"
              >
                Kontak <ArrowUpRight size={24} />
              </Link>
              <Link
                href="/portofolio"
                className="flex justify-between border-b-2 border-[#FAFAFA] items-center text-3xl py-2 text-[#FAFAFA] hover:text-white"
              >
                Portfolio <ArrowUpRight size={24} />
              </Link>
              <Link
                href="/blogs"
                className="flex justify-between border-b-2 border-[#FAFAFA] items-center text-3xl py-2 text-[#FAFAFA] hover:text-white"
              >
                Blog <ArrowUpRight size={24} />
              </Link>

              {/* Contact Button */}
              <button className="mt-4 rounded-lg bg-[#FAFAFA] text-[#008080] w-fit font-normal px-4 py-2 hover:bg-gray-100">
                Contact Us
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
