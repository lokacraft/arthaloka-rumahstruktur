"use client";

import Image from "next/image";

const logos = [
  { src: "/partnerships/logos/wika.png", alt: "WIKA" },
  { src: "/partnerships/logos/gojek.png", alt: "Gojek" },
  { src: "/partnerships/logos/buhler.png", alt: "Buhler" },
  { src: "/partnerships/logos/sentosa.png", alt: "RS Sentosa" },
  { src: "/partnerships/logos/kcic.png", alt: "KCIC" },
  { src: "/partnerships/logos/mitrakiara.png", alt: "Mitra Kiara" },
  { src: "/partnerships/logos/lawfirm.png", alt: "DSW Law Firm" },
  { src: "/partnerships/logos/wismakeiai.png", alt: "Wisma Keiai" },
  { src: "/partnerships/logos/sig.png", alt: "SIG" },
  { src: "/partnerships/logos/varley.png", alt: "Varley" },
  { src: "/partnerships/logos/mastrotto.png", alt: "Mastrotto" },
  { src: "/partnerships/logos/ban.png", alt: "Buwana Artha Nusantara" },
];

export default function PartnerShowcase() {
  return (
    <section className="py-12 px-6 md:px-12 md:mx-[15vh] mx-[10vh] font-clash my-[15vh] md:my-[20vh] lg:my-[25vh]">
      {/* Heading */}
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[54px] font-medium text-black leading-tight">
          Nama-Nama <span className="text-[#008080]">Besar</span> yang Telah{" "}
          <br className="hidden sm:block" />
          Memilih <span className="text-[#008080]">Jasa</span> Kami
        </h2>
      </div>

      {/* Grid Logo */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 justify-center items-center mx-auto">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center border-[1.5px] border-[#008080] rounded-2xl sm:rounded-3xl w-[140px] h-[80px] sm:w-[160px] sm:h-[100px] md:w-[180px] md:h-[150px] lg:w-[200px] lg:h-[180px] xl:w-[280px] xl:h-[200px] mx-auto relative p-4 sm:p-6 md:p-8"
          >
            <div className="w-full h-full flex justify-center items-center relative">
              <Image
                src={logo.src}
                alt={logo.alt}
                layout="fill"
                quality={100}
                className="object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
