import React from "react";

const RekamJejak = () => {
  return (
    <section
      className="
        w-full flex justify-center 
        py-10 sm:py-14 md:py-16 lg:py-20 
        font-clash
      "
    >
      <div className="max-w-7xl w-full px-4 sm:px-5 md:px-6">
        <div
          className="
            rounded-2xl sm:rounded-2xl md:rounded-3xl 
            p-6 sm:p-8 md:p-10 
            bg-[#008080]/10 shadow-md
          "
        >
          {/* Header */}
          <div
            className="
              w-full text-center font-medium
              text-[36px] sm:text-[42px] md:text-[46px] lg:text-[50px]
            "
          >
            <h1>Rekam Jejak yang Terbukti</h1>
          </div>

          {/* Stats */}
          <div
            className="
              mt-10 sm:mt-12 md:mt-14 lg:mt-16 
              grid grid-cols-1 md:grid-cols-3 
              divide-y md:divide-y-0 md:divide-x divide-black 
              text-center
            "
          >
            {/* Stat 1 */}
            <div className="flex flex-col justify-between items-center py-6 px-3 sm:px-4">
              <h3
                className="
                  text-[3rem] lg:text-[4rem] 
                  font-normal text-[#008080] leading-none
                "
              >
                8+ <br />
                Tahun
              </h3>
              <p
                className="
                  mt-3 font-normal leading-snug text-black
                  text-[24px] lg:text-[27px]
                "
              >
                Pengalaman di industri <br />
                rekayasa sipil & geoteknik.
              </p>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col justify-between items-center py-6 px-3 sm:px-4">
              <h3
                className="
                  text-[3rem] lg:text-[4rem]  
                  font-normal text-[#008080] leading-none
                "
              >
                100+
              </h3>
              <p
                className="
                  mt-3 font-normal leading-snug text-black
                  text-[24px] lg:text-[27px]
                "
              >
                Klien dari berbagai <br />
                sektor telah kami layani.
              </p>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col justify-between items-center py-6 px-3 sm:px-4">
              <h3
                className="
                  text-[3rem] lg:text-[4rem]  
                  font-normal text-[#008080] leading-none
                "
              >
                SKA <br />
                Certified
              </h3>
              <p
                className="
                  mt-3 font-normal leading-snug text-black
                  text-[24px] lg:text-[27px]
                "
              >
                Klien dari berbagai <br />
                sektor telah kami layani.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RekamJejak;
