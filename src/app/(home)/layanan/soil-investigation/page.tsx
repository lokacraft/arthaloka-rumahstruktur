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
    absolute: "Layanan - Soil Investigation",
  },
  description:
    "Rumah Struktur menawarkan layanan soil investigation (penyelidikan tanah) untuk memastikan kondisi tanah yang menjadi dasar konstruksi dapat diketahui dengan jelas dan akurat. Melalui pengujian lapangan dan laboratorium, kami memberikan data penting mengenai karakteristik tanah, daya dukung, serta potensi masalah geoteknik yang mungkin timbul. Layanan ini membantu klien mendapatkan perencanaan pondasi yang tepat, efisien, dan aman sehingga proyek dapat berjalan lancar dan minim risiko.",
};

export default function Home() {
  return (
    <div>
      <HeroSection
        title={
          <>
            Penyelidikan <span className="text-[#008080]">Tanah</span>
            <br />
          </>
        }
        description={
          <>
            Langkah pertama untuk fondasi yang aman adalah data yang tepat. Kami
            menyediakan layanan investigasi tanah (soil test) yang komprehensif
            untuk memberikan data faktual yang Anda butuhkan untuk perencanaan
            desain.
          </>
        }
        images={[
          { src: "/images/img1.png", alt: "Pekerja konstruksi" },
          { src: "/images/img2.png", alt: "Struktur bangunan" },
          { src: "/images/img3.png", alt: "Diskusi tim" },
        ]}
        whatsappLink="https://wa.me/6281234567890"
      />
      {/* team */}
      <TimSection layananId="Soil Investigation" />
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
            Anda tidak bisa merancang struktur untuk kondisi yang tidak Anda
            ketahui. <br />
            Investigasi tanah adalah proses pengumpulan data lapangan untuk{" "}
            <br />
            mengidentifikasi jenis, sifat, dan karakteristik lapisan tanah di
            lokasi proyek. <br />
            Tanpa data ini, desain fondasi hanya akan berdasarkan asumsi yang
            berisiko tinggi. <br /> <br />
            Investigasi yang akurat adalah fondasi dari semua analisis geoteknik
            dan desain struktur yang akan mengikuti.
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
            title: "Proses Mendalam & Berbasis Teknologi",
            description:
              "Kami berfokus pada pemahaman mendalam tentang kebutuhan klien sebelum memulai, dan mengandalkan perangkat lunak terkemuka seperti GeoStudio, Plaxis, dan AutoCAD untuk memastikan keakuratan hasil.",
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
            src: "/icons/graph.png",
            alt: "Keamanan & Kepatuhan SNI",
            title: "Mitigasi Risiko & Efisiensi Proyek",
            description:
              "Dengan memahami karakteristik tanah secara mendalam, kami membantu Anda merencanakan proyek dengan lebih efisien, menghindari risiko, dan menjamin keberhasilan proyek Anda.",
            iconSize: 68,
          },
        ]}
      />
      <ListSection
        title={
          <>
            Data Faktual yang <br />
            Anda Dapatkan
          </>
        }
        items={[
          "Laporan Log Pengeboran (Boring Log)",
          "Grafik Hasil Uji Sondir (CPT)",
          "Data Nilai N-SPT dari Pengujian",
          "Laporan Hasil Pengujian Laboratorium",
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
      <LayananDiskusiPesan namaLayanan="Soil Investigation" />
    </div>
  );
}
