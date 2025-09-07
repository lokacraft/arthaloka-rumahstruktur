import HeroSection from "@/app/components/HeroSection";
import InfoSection from "@/app/components/InfoSection";
import TeknologiSection from "@/app/components/TeknologiSection";
import ListSection from "@/app/components/ListSection";
import MengapaMemilihSection from "@/app/components/MengapaMemilihSection";
import PartnerShowcase from "@/app/components/PartnerShowcase";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Layanan - Analisis Geoteknik",
  },
  description:
    "Rumah Struktur menyediakan layanan analisis geoteknik untuk proyek konstruksi. Kami menjamin perhitungan tanah dan fondasi yang presisi, didukung tim ahli berpengalaman, pelayanan cepat, serta harga terjangkau.",
};

export default function Home() {
  return (
    <div>
      <HeroSection
        title={
          <>
            Analisis <br />
            <span className="text-[#008080]">Geoteknik</span>
          </>
        }
        description={
          <>
            Identifikasi risiko dan pahami kondisi tanah di lokasi proyek Anda
            dengan analisis geoteknik yang akurat. Kami memastikan desain
            pondasi Anda aman, stabil, dan efisien dari segi biaya.
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
            Mengapa Analisis <br />
            Geoteknik Adalah <br />
            Investasi Krusial?
          </>
        }
        description={
          <>
            Analisis geoteknik adalah penyelidikan ilmiah terhadap kondisi bawah{" "}
            <br />
            permukaan tanah untuk memahami karakteristik dan perilakunya. <br />
            Mengabaikan tahap ini dapat menyebabkan masalah serius di kemudian
            hari.
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
            src: "/icons/lampu.png",
            alt: "Teknologi Terdepan",
            title: "Menggunakan Teknologi Terdepan",
            description:
              "Kami mengaplikasikan perangkat lunak terkemuka, seperti Plaxis, GeoStudio, ArcGIS, Q-GIS, AutoCAD, dan perangkat lunak lain yang relevan",
            iconSize: 68,
          },
          {
            src: "/icons/check.png",
            alt: "Efisiensi Biaya & Material",
            title: "Hasil Akurat & Terpercaya",
            description:
              "Kami mampu menghasilkan perhitungan geoteknik yang akurat, tepat waktu, aman, dan sesuai dengan ekspektasi klien.",
            iconSize: 68,
          },
          {
            src: "/icons/heart.png",
            alt: "Keamanan & Kepatuhan SNI",
            title: "Layanan Fleksibel & Nasional",
            description:
              "Klien dapat berkonsultasi secara gratis. Layanan kami mencakup seluruh wilayah Indonesia.",
            iconSize: 68,
          },
        ]}
      />
      <ListSection
        title={
          <>
            Laporan{" "}
            <span className="text-[#008080]">
              Investigasi <br />
              Tanah
            </span>{" "}
            yang <span className="text-[#008080]">Lengkap</span>
          </>
        }
        items={[
          "Laporan Hasil Uji Laboratorium & Lapangan",
          "Peta Sebaran Titik Bor dan Sondir",
          "Analisis Daya Dukung Tanah (Bearing Capacity)",
          "Rekomendasi Tipe dan Kedalaman Fondasi",
          "Analisis Potensi Penurunan (Settlement)",
          "Rekomendasi Perbaikan Tanah (jika diperlukan)",
        ]}
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
      <PartnerShowcase />
    </div>
  );
}
