import heroImage from "/public/kontak/hero.png";
import Hero from "../components/Hero";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Kontak | Hubungi Kami"
  },
  description:
    "Hubungi Kami - Rumah Struktur adalah tim profesional yang sudah berpengalaman menangani banyak klien di bidang teknik sipil yang berfokus pada layanan hitung struktur, analisis geoteknik, soil investigation, analisis perkuatan bangunan, analisis geometrik jalan raya, serta perencanaan mekanikal, elektrikal, dan plumbing (MEP). Dengan pengalaman dan komitmen pada ketepatan serta kecepatan pelayanan, Rumah Struktur hadir untuk memberikan solusi teknik sipil yang terjangkau, inovatif, dan terpercaya bagi setiap kebutuhan pembangunan Anda.",
};

export default function Kontak() {
  return (
    <div className="relative">
      <Hero
        imageSrc={heroImage}
        title={
          <>
            <span className="text-[#008080]">Halo!</span> Apa yang Bisa Kami
            Bantu?
          </>
        }
        description={
          <>
            Jangan ragu untuk bertanya atau diskusikan kebutuhan proyek <br />
            Anda dengan kami!
          </>
        }
        buttonLink=""
        buttonText="Whatsapp kami Sekarang!"
      />
    </div>
  );
}
