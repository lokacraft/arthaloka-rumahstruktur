import hero from "/public/landing/hero.png"
import Hero from "../../components/home/Hero";
import Projek from "../../components/home/Projek";
import CardLayanan from "../../components/home/CardLayanan";
import TestimonialCarousel from "../../components/home/TestimonialCarousel";
import PartnerShowcase from "../../components/PartnerShowcase";
import ArtikelCarousel from "../../components/home/ArtikelCarousel";
import BottomBannerHomePage from "@/app/components/home/BottomBannerHomePage";
import ContactFormHomePage from "@/app/components/home/ContactFormHomePage";

export default function Home() {
  return (
    <div className="relative">
      <Hero />
      <Projek />
      <CardLayanan />
      <TestimonialCarousel />
      <PartnerShowcase />
      <ArtikelCarousel />
      <BottomBannerHomePage />
      <ContactFormHomePage />
    </div>
  );
}
