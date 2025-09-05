"use client";

import React from "react";
import Image from "next/image";
import call from "/public/icons/telpon.png";
import email from "/public/icons/email.png";

const Footer = () => {
  return (
    <div className="w-full relative bg-[#008080] font-clash text-white">
      {/* ========== DESKTOP (lg & xl) ========== */}
      <div className="hidden lg:flex flex-col p-[12vh]">
        <div className="flex flex-row space-x-[5rem] w-full justify-start items-start">
          {/* ALAMAT */}
          <div className="flex flex-col gap-2 text-left justify-start items-start">
            <h2 className="text-[32px] font-semibold">Alamat</h2>
            <p className="text-[20px] font-normal leading-relaxed">
              Jl. R.A.A Martanegara No. 56,
              <br />
              Kel. Turangga, Kec. Lengkong, <br />
              Kota Bandung
            </p>
          </div>
          {/* INFORMASI */}
          <div className="flex flex-col text-left gap-2 items-start">
            <h2 className="text-[32px] font-semibold">Informasi</h2>
            <a href="" className="hover:underline text-[20px] font-normal">
              Tentang Kami
            </a>
            <a href="" className="hover:underline text-[20px] font-normal">
              Hubungi Kami
            </a>
            <a href="" className="hover:underline text-[20px] font-normal">
              Portofolio
            </a>
          </div>
          {/* LAYANAN */}
          <div className="flex flex-col text-left gap-2 items-start">
            <h2 className="text-[32px] font-semibold">Layanan</h2>
            <a href="" className="hover:underline text-[20px] font-normal">
              Jasa Hitung Struktur
            </a>
            <a href="" className="hover:underline text-[20px] font-normal">
              Jasa Analisis Geoteknik
            </a>
            <a href="" className="hover:underline text-[20px] font-normal">
              Jasa Soil Investigation
            </a>
            <a href="" className="hover:underline text-[20px] font-normal">
              Analisis Perkuatan Struktur
            </a>
            <a href="" className="hover:underline text-[20px] font-normal">
              Mekanikal, Elektrikal, dan Plumbing
            </a>
            <a href="" className="hover:underline text-[20px] font-normal">
              Analisis Geometrik Jalan Raya
            </a>
          </div>
          {/* DUKUNGAN */}
          <div className="flex flex-col text-left gap-2 items-start">
            <h2 className="text-[32px] font-semibold">Dukungan</h2>
            <a href="" className="hover:underline text-[20px] font-normal">
              Blog
            </a>
            <a href="" className="hover:underline text-[20px] font-normal">
              FAQ
            </a>
            <a href="" className="hover:underline text-[20px] font-normal">
              Kebijakan Privasi
            </a>
          </div>
        </div>

        {/* KONTAK */}
        <div className="flex flex-row w-full gap-10 mt-[8rem] items-center justify-between">
          <div className="flex flex-row gap-10">
            <div className="flex flex-row gap-3 items-center">
              <Image src={call} alt="" width={20} height={20} />
              <p className="text-[20px] font-normal">+62 895 322 351 532</p>
            </div>
            <div className="flex flex-row gap-3 items-center">
              <Image src={email} alt="" width={20} height={20} />
              <p className="text-[20px] font-normal">
                contact@rumahstruktur.co.id
              </p>
            </div>
          </div>
          {/* LOGO */}
          <div className="text-xl font-bold">LOGO</div>
        </div>
      </div>

      {/* ========== MOBILE & TABLET (md, sm, xs) ========== */}
      <div className="flex lg:hidden flex-col p-[4vh] gap-10">
        {/* LOGO */}
        <div className="flex justify-start">
          <div className="w-[80px] h-[40px] bg-gray-300" />{" "}
          {/* placeholder logo */}
        </div>
        <div className="flex flex-row w-full justify-between gap-20 items-start">
          {/* ALAMAT */}
          <div className="flex flex-col gap-2 text-left">
            <h2 className="text-[24px] font-semibold">Alamat</h2>
            <p className="text-[18px] font-normal leading-relaxed">
              Jl. R.A.A Martanegara No. 56,
              <br />
              Kel. Turangga, Kec. Lengkong, <br />
              Kota Bandung
            </p>
          </div>
          {/* INFORMASI */}
          <div className="flex flex-col gap-2 text-left w-[40%]">
            <h2 className="text-[24px] font-semibold">Informasi</h2>
            <a href="" className="hover:underline text-[18px] font-normal">
              Tentang Kami
            </a>
            <a href="" className="hover:underline text-[18px] font-normal">
              Hubungi Kami
            </a>
            <a href="" className="hover:underline text-[18px] font-normal">
              Portofolio
            </a>
          </div>
        </div>

        <div className="flex flex-row w-full justify-between gap-20 items-start">
          {/* LAYANAN */}
          <div className="flex flex-col gap-2 text-left">
            <h2 className="text-[24px] font-semibold">Layanan</h2>
            <a href="" className="hover:underline text-[18px] font-normal">
              Jasa Hitung Struktur
            </a>
            <a href="" className="hover:underline text-[18px] font-normal">
              Jasa Analisis Geoteknik
            </a>
            <a href="" className="hover:underline text-[18px] font-normal">
              Jasa Soil Investigation
            </a>
            <a href="" className="hover:underline text-[18px] font-normal">
              Analisis Perkuatan Struktur
            </a>
            <a href="" className="hover:underline text-[18px] font-normal">
              Mekanikal, Elektrikal, dan Plumbing
            </a>
            <a href="" className="hover:underline text-[18px] font-normal">
              Analisis Geometrik Jalan Raya
            </a>
          </div>

          {/* DUKUNGAN */}
          <div className="flex flex-col gap-2 text-left w-[40%]">
            <h2 className="text-[24px] font-semibold">Dukungan</h2>
            <a href="" className="hover:underline text-[18px] font-normal">
              Blog
            </a>
            <a href="" className="hover:underline text-[18px] font-normal">
              FAQ
            </a>
            <a href="" className="hover:underline text-[18px] font-normal">
              Kebijakan Privasi
            </a>
          </div>
        </div>

        {/* KONTAK */}
        <div className="flex flex-col gap-4 mt-6">
          <div className="flex flex-row gap-3 items-center">
            <Image src={call} alt="" width={18} height={18} />
            <p className="text-[18px] font-normal">+62 895 322 351 532</p>
          </div>
          <div className="flex flex-row gap-3 items-center">
            <Image src={email} alt="" width={18} height={18} />
            <p className="text-[18px] font-normal">
              contact@rumahstruktur.co.id
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
