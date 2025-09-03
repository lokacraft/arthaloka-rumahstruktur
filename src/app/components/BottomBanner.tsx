import React from "react";
import Link from "next/link";
const BottomBanner = () => {
  return (
    <div className="w-full px-[15vh] py-[10vh] bg-[#2F4F4F]/20 font-clash">
      <div className="flex flex-row justify-between items-center w-full h-full relative ">
        {/* Teks Kanan */}
        <div className="text-left w-[54%] ">
          <h1 className="text-[54px] leading-tight font-medium">
            <span className="text-[#008080]">Ratusan Proyek </span>Swasta <br />
            & Pemerintah Telah{" "}
            <span className="text-[#008080]">Mempercayakan </span>
            <br />
            Strukturnya Pada Kami
          </h1>
        </div>
        {/* Teks Kiri */}
        <div className="text-left w-[47%] flex flex-col justify-between gap-y-8  h-full items-start">
          <p className="text-[34px] text-black leading-tight">
            Jangan tunda kesuksesan proyek Anda. <br />
            Wujudkan struktur yang kokoh dan <br />
            efisien bersama kami sekarang.
          </p>
          <Link href="" className="font-instrument font-light text-[34px] mt-8 text-center bg-[#008080] text-[#EAEAEA] px-4 py-1 rounded-2xl w-fit h-fit">
                Mulai Proyek Anda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
