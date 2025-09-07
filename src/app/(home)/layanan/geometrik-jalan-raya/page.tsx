import HeroSection from "@/app/components/HeroSection";
import InfoSection from "@/app/components/InfoSection";
import TeknologiSection from "@/app/components/TeknologiSection";
import ListSection from "@/app/components/ListSection";
import MengapaMemilihSection from "@/app/components/MengapaMemilihSection";
import PartnerShowcase from "@/app/components/PartnerShowcase";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Layanan - Geometrik Jalan Raya",
  },
  description:
    "Rumah Struktur menyediakan layanan analisis geometrik jalan raya untuk mendukung perencanaan dan pembangunan infrastruktur transportasi. Kami menjamin desain jalan yang presisi, aman, dan efisien, didukung tim ahli berpengalaman, pelayanan cepat, serta harga terjangkau.",
};

export default function Home() {
  return (
    <div>
      <HeroSection
        title={
          <>
            <span className="text-[#008080]">Analisis</span> Geometrik <br />
            Jalan Raya
          </>
        }
        description={
          <>
            Kami menyediakan layanan perencanaan geometrik dan perkerasan jalan
            yang komprehensif untuk memastikan infrastruktur Anda memenuhi
            standar keselamatan, efisiensi, dan durabilitas tertinggi.
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
            Solusi Terintegrasi <br />
            untuk Desain Jalan <br />
            Raya
          </>
        }
        description={
          <>
            Perencanaan geometrik adalah seni merancang tata letak fisik jalan
            untuk <br />
            menjamin keselamatan, efisiensi lalu lintas, dan kenyamanan
            pengendara. <br />
            Setiap tikungan, tanjakan, dan persimpangan kami rancang dengan{" "}
            <br />
            perhitungan yang presisi sesuai standar yang berlaku.
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
            Metodologi Desain <br />
            Kami:
          </>
        }
        items={[
          "Analisis Lalu Lintas",
          "Desain Perkerasan Lentur (Flexible Pavement)",
          "Desain Perkerasan Kaku (Rigid Pavement)",
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
