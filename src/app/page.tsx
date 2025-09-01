import Hero from "./components/home/Hero";
import Projek from "./components/home/Projek";
import CardLayanan from "./components/home/CardLayanan";
import TestimonialCarousel from "./components/home/TestimonialCarousel";
import PartnerShowcase from "./components/home/PartnerShowcase";
import ArtikelCarousel from "./components/home/ArtikelCarousel";

export default function Home() {
  return (
    <div className="relative">
    
    <Hero />
    <Projek />
    <CardLayanan />
    <TestimonialCarousel />
    <PartnerShowcase />
    <ArtikelCarousel />
    </div>
  );
}
