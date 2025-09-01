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
    <section className="py-12 mx-[15vh] font-clash my-[25vh]">
      <div className="text-center mb-16">
        <h2 className="text-[54px] md:text-[54px] font-medium text-black leading-tight">
          Nama-Nama <span className="text-[#008080]">Besar</span> yang Telah{" "}
          <br />
          Memilih <span className="text-[#008080]">Jasa</span> Kami
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mx-auto">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center border-[1.5px] border-[#008080] rounded-3xl w-[300px] h-[200px] mx-auto relative p-8"
          >
            <div className="w-full h-full flex justify-center items-center relative">
              <Image
                src={logo.src}
                alt={logo.alt}
                // width={150}
                // height={80}
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
