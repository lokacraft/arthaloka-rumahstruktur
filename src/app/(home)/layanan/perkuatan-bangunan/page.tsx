import HeroSection from "@/app/components/perkuatan-bangunan/HeroSection";
import InfoSection from "@/app/components/InfoSection";
import TeknologiSection from "@/app/components/TeknologiSection";
import ListSection from "@/app/components/ListSection";
import MengapaMemilihSection from "@/app/components/MengapaMemilihSection";
import PartnerShowcase from "@/app/components/PartnerShowcase";
import { Metadata } from "next";
import TimSection from "@/app/components/TimSection";
import LayananDiskusiPesan from "@/app/components/landing-page/LayananDiskusiPesan";
import BottomBanner from "@/app/components/BottomBanner";

export const metadata: Metadata = {
  title: {
    absolute: "Layanan - Perkuatan Bangunan",
  },
  description:
    "Rumah Struktur menyediakan layanan perkuatan bangunan untuk menjaga dan meningkatkan kekuatan serta stabilitas konstruksi yang sudah ada. Dengan metode analisis menyeluruh dan teknologi terkini, tim kami mampu memberikan solusi tepat bagi bangunan yang mengalami penurunan kualitas, keretakan, atau membutuhkan adaptasi terhadap beban baru. Layanan ini membantu memastikan bangunan tetap aman, kokoh, dan berumur panjang, tanpa harus melakukan renovasi total.",
};

export default function Home() {
  return (
    <div>
      <HeroSection
        title={
          <>
            Analisis{" "}
            <span className="text-[#008080]">
              Perkuatan <br />
              Bangunan
            </span>{" "}
            dan Analisis <br />
            <span className="text-[#008080]">Struktur Temporary</span>
          </>
        }
        description={
          <>
            Kami menyediakan analisis perkuatan untuk meningkatkan kekuatan dan
            memperpanjang umur bangunan Anda, serta desain struktur temporary
            untuk memastikan proses konstruksi berjalan aman dan efisien.
          </>
        }
        images={[
          { src: "/images/img1.png", alt: "Pekerja konstruksi" },
          { src: "/images/img2.png", alt: "Struktur bangunan" },
          { src: "/images/img3.png", alt: "Diskusi tim" },
        ]}
        whatsappLink="https://wa.me/6281234567890"
        // leftWidth="80%"
        // rightWidth="40%"
      />
      {/* team */}
            <TimSection layananId="Mekanikal Elekrikal Plumbing" />
      <InfoSection
        title={
          <>
            Mengapa Investigasi <br />
            Tanah Wajib <br />
            Dilakukan?
          </>
        }
        description={
          <>
            Seiring waktu, bangunan mungkin membutuhkan peningkatan kekuatan
            akibat <br />
            perubahan fungsi, penambahan beban, atau penyesuaian terhadap
            standar <br />
            baru. Kami menganalisis kondisi struktur eksisting dan merancang
            solusi <br />
            perkuatan yang paling efektif dan efisien.
          </>
        }
      />
      <TeknologiSection
        title={
          <>
            Keahlian dan Teknologi <br />
            yang Terjamin
          </>
        }
        items={[
          {
            src: "/icons/legalitas.png",
            alt: "Teknologi Terdepan",
            title: "Jaminan Legalitas & Profesionalisme",
            description:
              "Kami adalah perusahaan PT (Perseroan Terbatas) konsultan yang berbadan hukum resmi, memberikan Anda jaminan dan keamanan dalam bekerja sama.",
            iconSize: 68,
          },
          {
            src: "/icons/check.png",
            alt: "Efisiensi Biaya & Material",
            title: "Analisis Akurat & Berkualitas",
            description:
              "Kami mampu menghasilkan analisis yang akurat, tepat dan optimal, sesuai dengan Standar Nasional Indonesia dan dapat dipertanggungjawabkan.",
            iconSize: 68,
          },
          {
            src: "/icons/klien.png",
            alt: "Keamanan & Kepatuhan SNI",
            title: "Fokus Pada Tujuan Klien",
            description:
              "Kami hadir untuk membantu memberikan pelayanan dan hasil terbaik dengan mengutamakan tercapainya tujuan klien terlebih dahulu.",
            iconSize: 68,
          },
        ]}
      />
      <ListSection
        title={
          <>
            Struktur Temporary <br />
            yang Kami Tangani
          </>
        }
        items={[
          "Desain Perancah (Scaffolding)",
          "Struktur Penopang (Shoring & Formwork)",
          "Dinding Penahan Galian Tanah",
          "Struktur Pendukung untuk Alat Berat",
        ]}
      />
      {/* team */}
      <TimSection layananId="Perkuatan Bangunan" />
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
      <PartnerShowcase />
      <BottomBanner
        title={
          <>
            <span className="text-[#008080]">Ratusan Proyek </span>Swasta <br />
            & Pemerintah Telah{" "}
            <span className="text-[#008080]">Mempercayakan </span>
            <br />
            Strukturnya Pada Kami
          </>
        }
        description={
          <>
            Jangan tunda kesuksesan proyek Anda. <br />
            Wujudkan struktur yang kokoh dan <br />
            efisien bersama kami sekarang.
          </>
        }
        buttonHref="/kontak"
        buttonText="Mulai Proyek Anda"
      />
      <LayananDiskusiPesan namaLayanan="Perkuatan Bangunan" />
    </div>
  );
}
