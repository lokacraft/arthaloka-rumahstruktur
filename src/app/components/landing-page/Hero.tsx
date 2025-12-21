"use client";

import React, { useState } from "react";
import Image from "next/image";
import hero from "/public/landing/hero.png";
import { useContact } from "@/contexts/ContactContext";
import Link from "next/link";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { contactData, isLoading } = useContact();


  return (
    <div className="relative w-full h-[100vh] mb-[5rem] flex flex-col z-0 mx-auto justify-center md:items-center items-start md:p-[15vh] p-[5vh] font-clash overflow-hidden text-white">
      {/* Background Image */}
      <Image
        src={hero}
        alt="background"
        fill
        className="object-cover object-center justify-center items-center -z-10"
        onLoad={() => setIsLoaded(true)}
      />

      {/* Skeleton Loader (ngikut ukuran & responsif text/button asli) */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col justify-center items-start md:items-center md:p-[15vh] p-[5vh] gap-6 animate-pulse">
          {/* Skeleton Heading */}
          <div className="bg-gray-300 rounded w-[80%] h-[40px] sm:h-[44px] md:h-[54px] lg:h-[72px] xl:h-[82px]" />
          <div className="bg-gray-300 rounded w-[70%] h-[40px] sm:h-[44px] md:h-[54px] lg:h-[72px] xl:h-[82px]" />

          {/* Skeleton Paragraph */}
          <div className="mt-6 flex flex-col gap-2 w-full md:items-center">
            <div className="bg-gray-300 rounded w-[80%] h-[12px] sm:h-[16px] md:h-[20px] lg:h-[26px] xl:h-[30px]" />
            <div className="bg-gray-300 rounded w-[70%] h-[12px] sm:h-[16px] md:h-[20px] lg:h-[26px] xl:h-[30px]" />
          </div>

          {/* Skeleton Button */}
          <div className="bg-gray-300 rounded-lg w-[180px] sm:w-[220px] md:w-[260px] lg:w-[280px] xl:w-[300px] h-[40px] sm:h-[48px] md:h-[56px] lg:h-[60px] xl:h-[64px] mt-8" />
        </div>
      )}

      {/* Content tampil setelah image selesai load */}
      <div
        className={`transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Heading */}
        <h1
          className="
          leading-none font-[500] md:text-center text-left
          text-3xl md:text-4xl lg:text-5xl 2xl:text-5xl
        "
        >
          Rumah Struktur Engineering: <br />
          Konsultan{" "}
          <span className="text-[#008080]">
            Perencana
            <br />
            Perhitungan{" "}
          </span>
          Struktur
        </h1>

        {/* Paragraph */}
        <p
          className="
          md:text-center sm:text-left font-normal mt-10 leading-tight
          text-md md:text-xl 2xl:text-2xl
        "
        >
          Wujudkan proyek impian Anda bersama tim ahli kami, mulai dari <br />
          perencanaan sipil hingga analisis struktur mendetail.
        </p>

        {/* Button */}
        <div className="px-6 py-1 w-fit md:justify-self-center border border-[#FAFAFA] md:rounded-2xl rounded-lg mt-10">
          {contactData && !isLoading ? (
          <Link
            href={`https://wa.me/${contactData.whatsAppNumber}`}
            className="
            font-instrument font-normal text-center
            text-lg md:text-xl 2xl:text-2xl
          "
          >
            Whatsapp Kami Sekarang!
          </Link>

          ) : (
          <Link
            href={`#`}
            className="
            font-instrument font-normal text-center
            text-lg md:text-xl 2xl:text-2xl
          "
          >
            Whatsapp Kami Sekarang!
          </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
