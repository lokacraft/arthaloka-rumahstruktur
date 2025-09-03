import HeroSection from "@/app/components/HeroSection";
import InfoSection from "@/app/components/InfoSection";
import TeknologiSection from "@/app/components/TeknologiSection";
import ListSection from "@/app/components/ListSection";
import MengapaMemilihSection from "@/app/components/MengapaMemilihSection";
import PartnerShowcase from "@/app/components/PartnerShowcase";

export default function Home() {
  return (
    <div>
      <HeroSection
        title={
          <>
            Jasa <span className="text-[#008080]">Hitung</span>
            <br /> Struktur
          </>
        }
        description={
          <>
            PT Rumah Struktur Engineering siap membantu mewujudkan impian Anda
            dalam membangun proyek yang berkualitas dan aman.
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
            Tahap Krusial dalam <br />
            Perencanaan <br />
            Bangunan
          </>
        }
        description={
          <>
            Kesalahan kecil dalam perhitungan dapat berakibat fatal,
            membahayakan <br />
            nyawa, dan menyebabkan kerugian finansial yang besar. Analisis
            profesional <br />
            memastikan setiap elemen bangunan dirancang untuk menahan beban{" "}
            <br />
            secara aman dan efisien.
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
            title: "Teknologi Terdepan",
            description:
              "Kami menggunakan software seperti ETABS, SAP2000, MIDAS & SAFE untuk analisa dan perhitungan yang presisi.",
            iconSize: 68,
          },
          {
            src: "/icons/gir.png",
            alt: "Efisiensi Biaya & Material",
            title: "Efisiensi Biaya & Material",
            description:
              "Desain struktur yang optimal dapat menghemat biaya material dan konstruksi tanpa mengorbankan kualitas.",
            iconSize: 68,
          },
          {
            src: "/icons/tameng.png",
            alt: "Keamanan & Kepatuhan SNI",
            title: "Keamanan & Kepatuhan SNI",
            description:
              "Kami memastikan desain bangunan Anda aman dan memenuhi semua standar serta peraturan yang berlaku (SNI).",
            iconSize: 68,
          },
        ]}
      />
      <ListSection
        title={
          <>
            Cakupan <span className="text-[#008080]">Proyek</span> Kami
          </>
        }
        items={[
          "Gedung & Rumah",
          "Hotel & Gudang",
          "Jembatan & Terowongan",
          "Dermaga & Bandara",
          "Perencanaan Struktur Baja",
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
