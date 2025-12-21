import Hero from "../../components/landing-page/Hero";
import HomeProject from "../../components/landing-page/Projek";
import CardLayanan from "../../components/landing-page/CardLayanan";
import TestimonialCarousel from "../../components/landing-page/TestimonialCarousel";
import PartnerShowcase from "../../components/PartnerShowcase";
import ArtikelCarousel from "../../components/landing-page/ArtikelCarousel";
import BottomBannerHomePage from "@/app/components/landing-page/BottomBannerHomePage";
import ContactFormHomePage from "@/app/components/landing-page/ContactFormHomePage";
import { Metadata } from "next";
import HomeKeunggulanKami from "@/app/components/landing-page/HomeKeunggulanKami";
import HomeTeamLegalitas from "@/app/components/landing-page/HomeTimLegalitas";
import HomeCakupanLayanan from "@/app/components/landing-page/HomeCakupanLayanan";
import HomeJelajahiProyek from "@/app/components/landing-page/HomeJelajahiProyek";
import HomeSecondBanner from "@/app/components/landing-page/HomeSecondBanner";
import HomeDiskusiPesan from "@/app/components/landing-page/HomeDiskusiPesan";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Rumah Struktur melayani hitung struktur, analisis geoteknik, soil investigation, analisis perkuatan bangunan, analisis geometrik jalan raya, serta layanan MEP (mekanikal, elektrikal, plumbing). Harga terjangkau, pelayanan cepat, dan hasil profesional.",
};

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <HomeProject />
      <HomeKeunggulanKami />
      <HomeTeamLegalitas />
      <HomeCakupanLayanan />
      <HomeJelajahiProyek />
      <TestimonialCarousel />
      <ArtikelCarousel />
      <HomeSecondBanner />
      <HomeDiskusiPesan />
    </div>
  );
}
