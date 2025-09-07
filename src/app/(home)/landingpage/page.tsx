import Hero from "../../components/landing-page/Hero";
import Projek from "../../components/landing-page/Projek";
import CardLayanan from "../../components/landing-page/CardLayanan";
import TestimonialCarousel from "../../components/landing-page/TestimonialCarousel";
import PartnerShowcase from "../../components/PartnerShowcase";
import ArtikelCarousel from "../../components/landing-page/ArtikelCarousel";
import BottomBannerHomePage from "@/app/components/landing-page/BottomBannerHomePage";
import ContactFormHomePage from "@/app/components/landing-page/ContactFormHomePage";

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
