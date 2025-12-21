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
      
    </>
  );
}
