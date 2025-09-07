import React from "react";

const Projek = () => {
  return (
    <section className="w-full flex justify-center py-20 font-clash">
      <div className="max-w-7xl w-full px-6">
        <div className="rounded-3xl p-10 bg-gradient-to-b from-[#EAEAEA] to-[#008080]/40 shadow-md">
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:items-start items-center">
            <div>
              <h2
                className="
                  text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px]
                  font-medium leading-snug text-black text-center md:text-left
                "
              >
                <span className="text-[#008080]">100+ Proyek</span> Sukses <br />
                Dikerjakan
              </h2>
            </div>
            <p
              className="
                hidden md:flex
                text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px]
                text-black leading-tight font-normal mt-4
              "
            >
              Dengan rekam jejak lebih dari 100 proyek sukses, kami telah
              membuktikan komitmen dan keahlian kami dalam memberikan solusi
              rekayasa struktur yang aman, efisien, dan andal untuk setiap klien.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black text-center">
            <div className="py-6 px-4">
              <h3
                className="
                  text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem]
                  font-normal text-[#008080]
                "
              >
                60+
              </h3>
              <p
                className="
                  mt-3
                  text-[20px] sm:text-[26px] md:text-[32px] lg:text-[38px]
                  font-normal leading-none text-black
                "
              >
                Klien di tahun <br /> 2018-2019
              </p>
            </div>
            <div className="py-6 px-4">
              <h3
                className="
                  text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem]
                  font-normal text-[#008080]
                "
              >
                50+
              </h3>
              <p
                className="
                  mt-3
                  text-[20px] sm:text-[26px] md:text-[32px] lg:text-[38px]
                  font-normal leading-none text-black
                "
              >
                Klien di tahun <br /> 2020-2021
              </p>
            </div>
            <div className="py-6 px-4">
              <h3
                className="
                  text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem]
                  font-normal text-[#008080]
                "
              >
                50+
              </h3>
              <p
                className="
                  mt-3
                  text-[20px] sm:text-[26px] md:text-[32px] lg:text-[38px]
                  font-normal leading-none text-black
                "
              >
                Klien di tahun <br /> 2022-2023
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projek;
