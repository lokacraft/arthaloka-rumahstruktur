import type { Metadata } from "next";
import {
  clashGrotesk,
  instrumentSans,
  geistMono,
  geistSans,
} from "../../lib/fonts";
import NavBar from "../components/NavBar";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import "../globals.css";
import ContactDiskusiPesan from "../components/landing-page/ContactDiskusiPesan";

export const metadata: Metadata = {
  title: "Kontak",
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
        <ContactDiskusiPesan />
        <Footer />
      </body>
    </html>
  );
}
