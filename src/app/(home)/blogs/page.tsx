import HighlightBlog from "@/app/components/blogs/HighlightBlog";
import BlogCards from "@/app/components/blogs/BlogCards";
import BottomBanner from "@/app/components/BottomBanner";
import ContactForm from "@/app/components/ContactForm";

export default function Blogs() {
  return (
    <div className="relative">
      <HighlightBlog />
      <BlogCards />
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
      <ContactForm />
    </div>
  );
}
