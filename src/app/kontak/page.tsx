import heroImage from "/public/kontak/hero.png";
import Hero from "../components/Hero";
export default function Kontak() {
  return (
    <div className="relative">
      <Hero
        imageSrc={heroImage}
        title={
          <>
            <span className="text-[#008080]">Halo!</span> Apa yang Bisa Kami
            Bantu?
          </>
        }
        description={
          <>
            Jangan ragu untuk bertanya atau diskusikan kebutuhan proyek <br />
            Anda dengan kami!
          </>
        }
        buttonLink=""
        buttonText="Whatsapp kami Sekarang!"
      />
    </div>
  );
}
