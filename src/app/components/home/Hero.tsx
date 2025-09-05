import React from "react";
import Image from "next/image";
import hero from "/public/landing/hero.png";

const Hero = () => {
  return (
    <div className="relative w-full h-[100vh] mb-[5rem] flex flex-col z-0 mx-auto justify-center md:items-center items-start md:p-[15vh] p-[5vh] font-clash overflow-hidden text-white">
      <Image
        src={hero}
        alt="background"
        fill
        className="object-cover object-center justify-center items-center -z-10"
        priority
      />
      {/* Heading */}
      <h1
        className="
          leading-none font-[500] md:text-center text-left
          text-[40px] sm:text-[44px] md:text-[54px] lg:text-[72px] xl:text-[82px]
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
          text-[12px] sm:text-[16px] md:text-[20px] lg:text-[26px] xl:text-[30px]
        "
      >
        Wujudkan proyek impian Anda bersama tim ahli kami, mulai dari <br />
        perencanaan sipil hingga analisis struktur mendetail.
      </p>

      {/* Button */}
      <div className="px-6 py-1 border border-[#FAFAFA] md:rounded-2xl rounded-lg mt-10">
        <a
          href=""
          className="
            font-instrument font-normal text-center
            text-[14px] sm:text-[20px] md:text-[24px] lg:text-[26px] xl:text-[30px]
          "
        >
          Whatsapp Kami Sekarang!
        </a>
      </div>
    </div>
  );
};

export default Hero;
