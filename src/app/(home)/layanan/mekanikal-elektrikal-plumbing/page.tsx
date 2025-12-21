import HeroSection from "@/app/components/HeroSection";
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
    absolute: "Layanan - Mekanikal, Elektrikal, dan Plumbing",
  },
  description:
    "Rumah Struktur menyediakan layanan Mekanikal, Elektrikal, dan Plumbing (MEP) yang terintegrasi untuk mendukung kebutuhan sistem utilitas bangunan. Dengan tim ahli berpengalaman, kami memastikan setiap instalasi dirancang efisien, aman, dan sesuai standar teknis, sehingga bangunan Anda lebih fungsional, nyaman, dan hemat biaya operasional.",
};

export default function Home() {
  return (
    <div>
      <HeroSection
        title={
          <>
            Mekanikal, Elektrikal, <br />
            dan Plumbing
          </>
        }
        description={
          <>
            Kami menyediakan layanan desain Mekanikal, Elektrikal, dan Plumbing
            (MEP) yang terintegrasi untuk memastikan gedung Anda nyaman, aman,
            dan beroperasi dengan efisiensi energi yang optimal.
          </>
        }
        images={[
          { src: "/images/img1.png", alt: "Pekerja konstruksi" },
          { src: "/images/img2.png", alt: "Struktur bangunan" },
          { src: "/images/img3.png", alt: "Diskusi tim" },
        ]}
        whatsappLink="https://wa.me/6281234567890"
      />
      <InfoSection
        title={
          <>
            Apa Itu Rekayasa <br />
            MEP?
          </>
        }
        description={
          <>
            Mekanikal, Elektrikal, dan Plumbing (MEP) adalah tiga disiplin ilmu
            teknik yang <br />
            merancang sistem inti sebuah bangunan. Anggap saja ini sebagai
            sistem saraf, <br />
            peredaran darah, dan pernapasan sebuah gedung. Desain MEP yang{" "}
            <br />
            terintegrasi sejak awal adalah kunci untuk mencegah bentrokan
            instalasi <br />
            (clash), menghemat biaya, dan memastikan semua sistem bekerja secara{" "}
            <br />
            harmonis dan efisien.
          </>
        }
      />
      <TeknologiSection
        title={
          <>
            Solusi Desain yang <br />
            Komprehensif
          </>
        }
        items={[
          {
            src: "/icons/integrasi.png",
            alt: "Teknologi Terdepan",
            title: "Desain Terintegrasi & Efisien",
            description:
              "Kami memastikan semua sistem (M, E, & P) dirancang secara terkoordinasi untuk menghindari bentrokan di lapangan dan mengoptimalkan efisiensi energi.",
            iconSize: 68,
          },
          {
            src: "/icons/legalitas.png",
            alt: "Efisiensi Biaya & Material",
            title: "Jaminan Legalitas & Standar",
            description:
              "Kami adalah perusahaan PT berbadan hukum resmi. Kualitas pekerjaan kami selalu optimal sesuai Standar Nasional Indonesia dan dapat dipertanggungjawabkan.",
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
            Solusi Desain yang <br />
            Komprehensif
          </>
        }
        items={[
          "Merancang sistem sirkulasi udara dan proteksi kebakaran yang andal",
          "Merancang jaringan daya listrik yang aman dan efisien untuk semua kebutuhan bangunan.",
          "Merancang sistem perpipaan untuk distribusi air bersih dan pembuangan air kotor yang higienis.",
        ]}
      />
      {/* team */}
      <TimSection layananId="Mekanikal Elekrikal Plumbing" />
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
      <LayananDiskusiPesan namaLayanan="Mekanikal Elektrik Plumbing" />
    </div>
  );
}
