import Hero from "../../components/portofolio/Hero";
import PortofolioCard from "@/app/components/portofolio/PortofolioCard";
import PartnerShowcase from "@/app/components/PartnerShowcase";
import BottomBanner from "@/app/components/BottomBanner";
import ContactForm from "@/app/components/ContactForm";

export default function Portofolio() {
  return (
    <div className="relative">
      <Hero />
      <PortofolioCard />
      <PartnerShowcase />
      <BottomBanner />
      <ContactForm />
    </div>
  );
}
