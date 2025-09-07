import Hero from "../../components/Hero";
import heroImage from "/public/portofolio/hero.png";
import PortofolioCard from "@/app/components/portofolio/PortofolioCard";
import PartnerShowcase from "@/app/components/PartnerShowcase";
import BottomBanner from "@/app/components/BottomBanner";
import ContactForm from "@/app/components/ContactForm";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portofolio Projek",
  description:
    "Portofolio Rumah Struktur menampilkan berbagai hasil proyek terbaik kami, mulai dari perhitungan struktur bangunan, analisis geoteknik, soil investigation, hingga desain mekanikal, elektrikal, dan plumbing (MEP). Setiap proyek mencerminkan komitmen kami dalam memberikan solusi teknik sipil yang akurat, efisien, dan terpercaya. Dengan portofolio ini, Rumah Struktur membuktikan pengalaman dan kualitas layanan dalam mendukung pembangunan infrastruktur dengan standar tinggi.",
};

export default function Portofolio() {
  return (
    <div className="relative">
      <Hero
        imageSrc={heroImage}
        title={
          <>
            <span className="text-[#008080]">Galeri</span> Solusi{" "}
            <span className="text-[#008080]">Rekayasa</span> <br />
            Kami
          </>
        }
        description={
          <>
            Jelajahi bagaimana kami menerapkan keahlian teknis dan <br />
            pendekatan inovatif untuk membantu mewujudkan berbagai proyek <br />
            klien kami di seluruh Indonesia. Setiap proyek adalah cerita tentang{" "}
            <br />
            tantangan yang diatasi dan kesuksesan yang dibangun.
          </>
        }
        buttonLink=""
        buttonText="Whatsapp Kami Sekarang!"
      />
      <PortofolioCard />
      <PartnerShowcase />
      <BottomBanner
        title={
          <>
            Siap Berkolaborasi <br />
            dengan Kami?
          </>
        }
        description={
          <>
            Diskusikan bagaimana keahlian kami <br />
            dapat membantu kesuksesan proyek <br />
            Anda. Hubungi kami untuk memulai <br />
            konsultasi.
          </>
        }
        buttonHref="/kontak"
        buttonText="Hubungi Kami Sekarang!"
      />
      <ContactForm />
    </div>
  );
}
