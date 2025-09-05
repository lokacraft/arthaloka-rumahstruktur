import React from "react";
import Link from "next/link";

const BottomBannerHomePage = () => {
  return (
    <div className="w-full px-6 sm:px-10 md:px-[10vh] lg:px-[15vh] py-12 md:py-[10vh] bg-gradient-to-r from-[#EAEAEA] to-[#008080]/40 font-clash">
      <div className="flex flex-col lg:flex-row lg:justify-between justify-center items-start lg:items-center w-full h-full gap-2 xl:gap-0 lg:gap-5">
        {/* Kiri: Judul */}
        <div className="text-left w-full lg:w-[54%]">
          <h1 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[46px] xl:text-[54px] leading-tight font-medium">
            <span className="text-[#008080]">Ratusan Proyek </span>Swasta <br />
            & Pemerintah Telah{" "}
            <span className="text-[#008080]">Mempercayakan </span>
            <br />
            Strukturnya Pada Kami
          </h1>
        </div>

        {/* Kanan: Deskripsi + Tombol */}
        <div className="text-left w-full lg:w-[47%] flex flex-col gap-y-6 md:gap-y-8 items-start mt-6 lg:mt-0">
          <p className="text-[18px] sm:text-[22px] md:text-[28px] lg:text-[30px] xl:text-[34px] text-black leading-tight">
            Jangan tunda kesuksesan proyek Anda. <br />
            Wujudkan struktur yang kokoh dan <br />
            efisien bersama kami sekarang.
          </p>
          <Link
            href=""
            className="font-instrument font-light text-[16px] sm:text-[20px] md:text-[26px] lg:text-[34px] text-center bg-[#008080] text-[#EAEAEA] px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl w-fit"
          >
            Mulai Proyek Anda
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BottomBannerHomePage;
