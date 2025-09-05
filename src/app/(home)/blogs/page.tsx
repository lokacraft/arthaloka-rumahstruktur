import HighlightBlog from "@/app/components/blogs/HighlightBlog";
import BlogCards from "@/app/components/blogs/BlogCards";
import BottomBanner from "@/app/components/BottomBanner";
import ContactForm from "@/app/components/ContactForm";

export default function Blogs() {
  return (
    <div className="relative">
      <HighlightBlog />
      <BlogCards />
      <BottomBanner />
      <ContactForm />
    </div>
  );
}
