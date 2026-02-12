import type { Metadata } from "next";
import {
  clashGrotesk,
  instrumentSans,
  geistMono,
  geistSans,
} from "../../lib/fonts";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../globals.css";
import CTAWhatsAppButton from "../components/landing-page/CTAWhatsAppButton";
import { ContactProvider } from "@/contexts/ContactContext";

export const metadata: Metadata = {
  title: {
    default : "konsultanstrukturengineering",
    template : "konsultanstrukturengineering - %s"
  },
  description:
    "konsultanstrukturengineering menyediakan layanan konstruksi, arsitektur, dan desain bangunan dengan kualitas terbaik. Solusi pembangunan rumah, renovasi, hingga perencanaan struktur untuk hunian dan komersial.",
  twitter : {
    card: "summary_large_image"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${clashGrotesk.variable} ${instrumentSans.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-[#EAEAEA]">
      <ContactProvider>
        <NavBar />
        {children}
        <Footer />
        <CTAWhatsAppButton />
      </ContactProvider>
      </body>
    </html>
  );
}
