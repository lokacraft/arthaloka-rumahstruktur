import type { Metadata } from "next";
import BottomBanner from "@/app/components/BottomBanner";
import ContactForm from "@/app/components/ContactForm";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Layanan Rumah Struktur",
  description: "Rumah Struktur menawarkan layanan profesional meliputi hitung struktur, analisis geoteknik, soil investigation, perkuatan bangunan, analisis geometrik jalan raya, dan layanan mekanikal, elektrikal, dan plumbing (MEP) dengan harga terjangkau serta pelayanan cepat dan profesional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
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
      <ContactForm />
    </>
  );
}
