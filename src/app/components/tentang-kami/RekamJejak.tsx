import React from "react";

const RekamJejak = () => {
  return (
    <section className="w-full flex justify-center py-20 font-clash">
      <div className="max-w-7xl w-full px-6">
        <div className="rounded-3xl p-10 bg-[#008080]/10 shadow-md">
          {/* Header */}
          <div className="w-full text-center text-[50px] font-medium">
            <h1>Rekam Jejak yang Terbukti</h1>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black text-center">
            <div className="flex flex-col justify-between items-center py-6 px-4">
              <h3 className="text-[4rem] font-normal text-[#008080] leading-none">
                8+ <br />
                Tahun
              </h3>
              <p className="mt-3 text-[27px] font-normal leading-none text-black">
                Pengalaman di industri <br />
                rekayasa sipil & geoteknik.
              </p>
            </div>
            <div className="flex flex-col justify-between items-center py-6 px-4">
              <h3 className="text-[4rem] font-normal text-[#008080] leading-none">
                100+
              </h3>
              <p className="mt-3 text-[27px] font-normal leading-none text-black">
                Klien dari berbagai <br />
                sektor telah kami layani.
              </p>
            </div>
            <div className="flex flex-col justify-between items-center py-6 px-4">
              <h3 className="text-[4rem] font-normal text-[#008080] leading-none">
                SKA <br />
                Certified
              </h3>
              <p className="mt-3 text-[27px] font-normal leading-none text-black">
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
