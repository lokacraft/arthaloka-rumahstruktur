import type { Metadata } from "next";
import {
  clashGrotesk,
  instrumentSans,
  geistMono,
  geistSans,
} from "../../lib/fonts";
import NavBar from "../components/NavBar";
import BottomBanner from "../components/BottomBanner";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import "../globals.css";

export const metadata: Metadata = {
  title: "Rumah Struktur",
  description: "",
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
        <NavBar />
        {children}
        <BottomBanner />
        <ContactForm />
        <Footer />
      </body>
    </html>
  );
}
