"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  ArrowUpRight,
  ArrowDownRight,
  CornerUpLeft,
} from "lucide-react";
import Image from "next/image";
import Logo from "../../../public/images/logoMain.png"

export default function NavBar() {
  const [open, setOpen] = useState(false); // dropdown desktop
  const [menuOpen, setMenuOpen] = useState(false); // hamburger
  const [layananOpen, setLayananOpen] = useState(false); // dropdown mobile
  const [loading, setLoading] = useState(false); // loader overlay
  const pathname = usePathname();
  const router = useRouter();

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

  // fungsi navigasi dengan loader
  const handleNavigation = (href: string) => {
    if (href === pathname) {
      setLoading(false);
      router.push(href);
    } else {
      setLoading(true);
      setMenuOpen(false);
      router.push(href);
    }
  };

  // hilangkan loader setelah halaman berpindah
  useEffect(() => {
    setLoading(false);
  }, [pathname]);

  return (
    <div className="w-full">
      {/* Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center backdrop-blur-md bg-black/30">
          <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-white text-lg font-medium animate-pulse">
            Memuat Halaman...
          </p>
        </div>
      )}

      {/* ========== DESKTOP NAVBAR (lg & xl) ========== */}
      <div className="hidden lg:flex justify-center items-center w-full">
        <div
          className="fixed top-5 w-[90%] z-60 flex items-center justify-between py-4 rounded-2xl xl:gap-26 lg:gap-24 md:gap-8 sm:gap-12 shadow-2xl px-6 font-instrument text-black/70 bg-[#FAFAFA] 
          text-md  xl:text-lg"
        >
          {/* Logo */}
          <Link href="/" className="text-xl font-bold cursor-pointer">
            <Image
            src={Logo}
            alt="logo"
            width={1200}
            height={900}
            className="w-[140px]"
            />
          </Link>

          {/* Menu */}
          <ul className="flex items-center space-x-8 lg:space-x-12 xl:space-x-14">
            <li>
              <Link href="/landingpage">
                <button
                  onClick={() => handleNavigation("/landingpage")}
                  className={`cursor-pointer ${getLinkClass("/landingpage")}`}
                  aria-label="Home"
                >
                  Home
                </button>
              </Link>
            </li>

            {/* Dropdown Layanan */}
            <li className="relative">
              <button
                onClick={() => setOpen(!open)}
                onBlur={() => setTimeout(() => setOpen(false), 500)}
                className="flex items-center hover:text-[#008080] cursor-pointer"
                aria-label="Layanan"
              >
                Layanan
                {open ? (
                  <ChevronUp
                    size={20}
                    className="ml-1"
                    aria-label="Tutup Menu Dropdown Layanan"
                  />
                ) : (
                  <ChevronDown
                    size={20}
                    className="ml-1"
                    aria-label="Buka Menu Dropdown Layanan"
                  />
                )}
              </button>

              {open && (
                <div className="z-50 absolute left-0 mt-8 w-[26rem] rounded-xl shadow-lg bg-[#EAEAEA]">
                  <ul className="flex flex-col p-4 space-y-2">
                    {layanan.map((item, i) => (
                      <li key={i}>
                        <Link href={item.href} 
                          onClick={() => handleNavigation(item.href)}
                         // aria-label={item.title}
                         className={`flex w-full cursor-pointer items-center justify-between rounded-md px-2 py-2 transition-all duration-300 ${
                          pathname === item.href
                            ? "text-[#008080] bg-[#008080]/10"
                            : "text-black/70 hover:bg-[#008080]/20"
                        }`}
                        >
                         
                            {item.title}
                            <ChevronRight size={18} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            <li>
              <button
                onClick={() => handleNavigation("/tentang-kami")}
                className={`cursor-pointer ${getLinkClass("/tentang-kami")}`}
                aria-label="Tentang Kami"
              >
                Tentang Kami
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("/portofolio")}
                className={`cursor-pointer ${getLinkClass("/portofolio")}`}
                aria-label="Portofolio"
              >
                Portfolio
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("/blogs")}
                className={`cursor-pointer ${getLinkClass("/blogs")}`}
                aria-label="Blog"
              >
                Blog
              </button>
            </li>
          </ul>

          {/* Tombol Contact Us */}
          <button
            onClick={() => handleNavigation("/kontak")}
            className="cursor-pointer rounded-lg border border-teal-600 px-4 py-1 hover:text-[#008080] hover:bg-teal-50"
            aria-label="Contact Us"
          >
            Contact Us
          </button>
        </div>
      </div>

      {/* ========== MOBILE NAVBAR (sm & md ke bawah) ========== */}
      <div className="lg:hidden flex items-center justify-center w-full">
        <div className="fixed top-5 rounded-lg w-[92%] bg-[#FAFAFA] z-50 shadow-md">
          <div className="flex items-center justify-between px-4 py-2 text-black">
            {/* Logo */}
            <div className="text-lg font-bold">
            <Image
            src={Logo}
            alt="logo"
            width={2000}
            height={1200}
            quality={100}
            priority
            className="w-[120px]"
            />
            </div>
            {/* Hamburger */}
            <button onClick={() => setMenuOpen(true)} aria-label="Buka Navbar">
              <Image
                src="/icons/hamburger.png"
                alt="menu"
                width={28}
                height={28}
              />
            </button>
          </div>

          {/* Overlay menu */}
          <div
            className={`fixed top-0 right-0 h-full w-[85%] max-w-sm flex flex-col justify-center items-center bg-[#008080] rounded-l-2xl shadow-lg transform transition-transform duration-300 ease-in-out ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Close button */}
            <div className="flex w-full justify-end px-4 py-3">
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Tutup Navbar"
              >
                <CornerUpLeft size={26} className="text-white" />
              </button>
            </div>

            {/* Menu items */}
            <nav className="flex flex-col justify-between w-full gap-2 px-6 font-instrument">
              <button
                onClick={() => handleNavigation("/")}
                aria-label="Home"
                className="flex border-b border-[#FAFAFA] justify-between items-center text-xl py-2 text-[#FAFAFA] hover:text-white"
              >
                Home <ArrowUpRight size={20} />
              </button>

              {/* Dropdown Layanan */}
              <button
                onClick={() => setLayananOpen(!layananOpen)}
                aria-label="Layanan"
                className="flex border-b border-[#FAFAFA] justify-between items-center w-full text-xl py-2 text-[#FAFAFA] hover:text-white"
              >
                Layanan
                <ArrowUpRight
                  size={20}
                  className={`transform transition-transform duration-300 ${
                    layananOpen ? "rotate-90" : ""
                  }`}
                  aria-label="Buka Menu Layanan"
                />
              </button>
              {layananOpen && (
                <div className="pl-4 flex flex-col gap-1">
                  {layanan.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => handleNavigation(item.href)}
                      aria-label={item.title}
                      className="flex justify-between border-b border-[#FAFAFA]/50 items-center text-base py-2 text-[#FAFAFA] hover:text-white"
                    >
                      {item.title}
                      <ArrowDownRight size={16} />
                    </button>
                  ))}
                </div>
              )}

              <button
                onClick={() => handleNavigation("/tentang-kami")}
                aria-label="Tentang Kami"
                className="flex justify-between border-b border-[#FAFAFA] items-center text-xl py-2 text-[#FAFAFA] hover:text-white"
              >
                Tentang Kami <ArrowUpRight size={20} />
              </button>
              <button
                onClick={() => handleNavigation("/portofolio")}
                aria-label="Portofolio"
                className="flex justify-between border-b border-[#FAFAFA] items-center text-xl py-2 text-[#FAFAFA] hover:text-white"
              >
                Portfolio <ArrowUpRight size={20} />
              </button>
              <button
                onClick={() => handleNavigation("/blogs")}
                aria-label="Blog"
                className="flex justify-between border-b border-[#FAFAFA] items-center text-xl py-2 text-[#FAFAFA] hover:text-white"
              >
                Blog <ArrowUpRight size={20} />
              </button>

              {/* Contact Button */}
              <button
                onClick={() => handleNavigation("/kontak")}
                aria-label="Contact Us"
                className="mt-4 rounded-lg bg-[#FAFAFA] text-[#008080] text-base px-4 py-2 hover:bg-gray-100"
              >
                Contact Us
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
