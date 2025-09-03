import React from "react";
import Image from "next/image";
import hero from "/public/landing/hero.png";

const Hero = () => {
  return (
    <div className="relative w-full h-[100vh] -translate-y-20 flex flex-col z-0 mx-auto justify-center items-center font-clash overflow-hidden text-white">
      <Image
        src={hero}
        alt="background"
        fill
        className="object-cover object-center -z-10"
        priority
      />
      <h1 className=" leading-none font-[500] text-[82px] text-center ">
        Rumah Struktur Engineering: <br />
        Konsultan{" "}
        <span className="text-[#008080]">
          Perencana
          <br />
          Perhitungan{" "}
        </span>
        Struktur
      </h1>
      <p className="text-center font-normal text-[30px] mt-10  leading-tight">
        Wujudkan proyek impian Anda bersama tim ahli kami, mulai dari <br />
        perencanaan sipil hingga analisis struktur mendetail.
      </p>
      <div className="px-6 py-1 border border-[#FAFAFA] rounded-2xl mt-10">
        <a
          href=""
          className=" text-[30px] font-normal text-center font-instrument"
        >
          Whatsapp Kami Sekarang
        </a>
      </div>
    </div>
  );
};

export default Hero;
