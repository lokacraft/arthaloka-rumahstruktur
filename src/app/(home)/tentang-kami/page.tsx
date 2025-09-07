import Hero from "../../components/Hero";
import heroImage from "/public/tentang-kami/hero.png";
import RekamJejak from "@/app/components/tentang-kami/RekamJejak";
import FondasiKerja from "@/app/components/tentang-kami/FondasiKerja";
import TeamSection from "@/app/components/tentang-kami/TeamSection";
import MengapaMemilihSection from "@/app/components/MengapaMemilihSection";
import BottomBanner from "@/app/components/BottomBanner";
import ContactForm from "@/app/components/ContactForm";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Tentang Kami - Rumah Struktur adalah tim profesional yang sudah berpengalaman menangani banyak klien di bidang teknik sipil yang berfokus pada layanan hitung struktur, analisis geoteknik, soil investigation, analisis perkuatan bangunan, analisis geometrik jalan raya, serta perencanaan mekanikal, elektrikal, dan plumbing (MEP). Dengan pengalaman dan komitmen pada ketepatan serta kecepatan pelayanan, Rumah Struktur hadir untuk memberikan solusi teknik sipil yang terjangkau, inovatif, dan terpercaya bagi setiap kebutuhan pembangunan Anda.",
};

export default function TentangKami() {
  const members = [
    { name: "Yasir Nadem", role: "Arsitek Muda" },
    { name: "Retna Ayu Kirana", role: "Ahli Teknik Jalan" },
    { name: "Ani Mulyani, ST", role: "Ahli Teknik Bangunan Gedung" },
  ];
  return (
    <div className="relative">
      <Hero
        imageSrc={heroImage}
        title={
          <>
            <span className="text-[#008080]">Mitra</span> Rekayasa <br />
            <span className="text-[#008080]">Terpercaya</span> untuk <br />
            Kesuksesan <span className="text-[#008080]">Proyek</span> Anda
          </>
        }
        description={
          <>
            Rumah Struktur Engineering adalah perusahaan konsultan <br />
            rekayasa sipil berbadan hukum resmi (PT) yang berdedikasi untuk{" "}
            <br />
            menyediakan solusi struktur dan geoteknik yang aman, efisien, dan{" "}
            <br />
            andal di seluruh Indonesia.
          </>
        }
        buttonLink=""
        buttonText="Whatsapp Kami Sekarang!"
      />
      <RekamJejak />
      <FondasiKerja
        title={<>Fondasi Kerja Kami</>}
        items={[
          {
            src: "/icons/handheart.png",
            alt: "Teknologi Terdepan",
            title: "Profesionalisme",
            description:
              "Kami menjunjung tinggi nilai-nilai profesionalisme dalam melayani klien, memastikan setiap proyek ditangani dengan standar tertinggi.",
            iconSize: 68,
          },
          {
            src: "/icons/puzzle.png",
            alt: "Efisiensi Biaya & Material",
            title: "Integritas",
            description:
              "Kami mampu menghasilkan analisis yang akurat, tepat, dan dapat dipertanggungjawabkan sesuai dengan harapan klien.",
            iconSize: 68,
          },
          {
            src: "/icons/klien.png",
            alt: "Keamanan & Kepatuhan SNI",
            title: "Kepuasan Klien",
            description:
              "Komitmen kami adalah kepuasan Anda. Kami selalu berfokus pada pemahaman mendalam tentang kebutuhan klien sebelum memulai setiap proyek.",
            iconSize: 68,
          },
        ]}
      />
      <TeamSection
        title={
          <>
            Didukung oleh Tim <br />
            Engineer Profesional
          </>
        }
        members={members}
      />
      <MengapaMemilihSection
        title={
          <>
            Mengapa <span className="text-[#008080]">Memilih</span> Rumah <br />
            Struktur Engineering?
          </>
        }
        items={[
          {
            src: "/icons/check.png",
            alt: "Down Payment",
            title: "Down Payment Mulai dari 0%",
            description:
              "Penawaran khusus DP 0% berlaku bagi klien yang merencanakan DED dan dapat menerbitkan Purchase Order (PO) atau SPK.",
          },

          {
            src: "/icons/money.png",
            alt: "Harga Kompetitif",
            title: "Harga Kompetitif",
            description:
              "Harga kami fleksibel dan akan selalu disesuaikan dengan kebutuhan serta skala proyek perhitungan struktur Anda.",
          },
          {
            src: "/icons/star.png",
            alt: "Konsultasi Gratis",
            title: "Konsultasi Gratis",
            description:
              "Kami menyediakan sesi konsultasi gratis secara online melalui berbagai platform, seperti WA, video call, telepon, ataupun email.",
          },
          {
            src: "/icons/sertifikat.png",
            alt: "Konsultasi Gratis",
            title: "Engineer Bersertifikat",
            description:
              "Tim kami didukung oleh para engineer profesional yang berpengalaman lebih dari 8 tahun dan memiliki sertifikasi keahlian (SKA).",
          },
          {
            src: "/icons/crown.png",
            alt: "Konsultasi Gratis",
            title: "Hasil Berkualitas",
            description:
              "Hasil akhir berupa laporan lengkap (analisis, desain, gambar, dan RAB) yang berkualitas dan dijamin sesuai Standar Nasional Indonesia (SNI).",
          },
          {
            src: "/icons/call.png",
            alt: "Konsultasi Gratis",
            title: "Selalu Siap Dihubungi",
            description:
              "Tim kami siap dihubungi kapan pun (24/7) untuk memberikan pelayanan dan dukungan terbaik bagi semua klien kami.",
          },
        ]}
      />
      <BottomBanner
        title={
          <>
            Siap Berkolaborasi <br />
            dengan Kami?
          </>
        }
        description={
          <>
            Diskusikan bagaimana keahlian kami <br />dapat membantu kesuksesan proyek <br />
            Anda. Hubungi kami untuk memulai <br />konsultasi.
          </>
        }
        buttonHref="/kontak"
        buttonText="Hubungi Kami Sekarang!"
      />
      <ContactForm />
    </div>
  );
}
