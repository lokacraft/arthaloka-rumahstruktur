import React from "react";

const Hero = () => {
  return (
    <div className="flex flex-col my-[20vh] mx-auto  justify-center items-center font-clash">
      <h1 className="text-black leading-none font-[500] text-[82px] text-center ">
        Rumah Struktur Engineering: <br />
        Konsultan{" "}
        <span className="text-[#008080]">
          Perencana
          <br />
          Perhitungan{" "}
        </span>
        Struktur
      </h1>
      <p className="text-center font-normal text-[30px] mt-10 text-black leading-tight">
        Wujudkan proyek impian Anda bersama tim ahli kami, mulai dari <br />
        perencanaan sipil hingga analisis struktur mendetail.
      </p>
      <div className="px-6 py-1 border border-[#2F4F4F] rounded-2xl mt-10">
        <a href="" className="text-black text-[30px] font-normal text-center font-instrument">
          Whatsapp Kami Sekarang
        </a>
      </div>
    </div>
  );
};

export default Hero;
