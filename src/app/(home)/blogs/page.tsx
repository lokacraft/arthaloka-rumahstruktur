import HighlightBlog from "@/app/components/blogs/HighlightBlog";
import BlogCards from "@/app/components/blogs/BlogCards";
import BottomBanner from "@/app/components/BottomBanner";
import ContactForm from "@/app/components/ContactForm";

import { Metadata } from "next";
import ContactDiskusiPesan from "@/app/components/landing-page/ContactDiskusiPesan";
import BlogList from "@/app/components/landing-page/BlogList";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Blog Rumah Struktur menghadirkan artikel dan wawasan terbaru seputar dunia konstruksi, teknik sipil, arsitektur, hingga teknologi bangunan. Melalui konten yang informatif dan mudah dipahami, kami berbagi pengetahuan mengenai hitung struktur, analisis geoteknik, soil investigation, perkuatan bangunan, geometrik jalan raya, serta MEP (mekanikal, elektrikal, plumbing). Halaman blog ini dirancang dengan tampilan card yang rapi, responsif, dan memudahkan pembaca menemukan topik yang relevan sesuai kebutuhan mereka.",
};

export default function Blogs() {
  return (
    <div className="relative">
      <HighlightBlog />
      <BlogList />
      {/* <BlogCards /> */}
      <BottomBanner
        title={
          <>
            Siap Berkolaborasi <br />
            dengan Kami?
          </>
        }
        description={
          <>
            Diskusikan bagaimana keahlian kami <br />
            dapat membantu kesuksesan proyek <br />
            Anda. Hubungi kami untuk memulai <br />
            konsultasi.
          </>
        }
        buttonHref="/kontak"
        buttonText="Hubungi Kami Sekarang!"
      />
      <ContactDiskusiPesan />
    </div>
  );
}
