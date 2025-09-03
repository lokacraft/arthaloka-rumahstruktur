import React from "react";
import Image from "next/image";
import hero from "/public/kontak/hero.png";

const Hero = () => {
  return (
    <div className="relative w-full h-[100vh] text-left p-[15vh]  flex flex-col z-0 mx-auto justify-center items-start font-clash overflow-hidden text-white">
      <Image
        src={hero}
        alt="background"
        fill
        className="object-cover object-center -z-10"
        priority
      />
      <h1 className=" leading-none font-[500] text-[82px] text-left mt-[10vh]">
        <span className="text-[#008080]">Halo!</span> Apa yang Bisa Kami <br />
        Bantu?
      </h1>
      <p className="text-left font-normal text-[30px] mt-10 text-[#FAFAFA] leading-tight">
        Jangan ragu untuk bertanya atau diskusikan kebutuhan proyek <br />
        Anda dengan kami!
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
