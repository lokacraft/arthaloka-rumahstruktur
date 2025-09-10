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

export const metadata: Metadata = {
  title: {
    default : "Rumah Struktur",
    template : "Rumah Struktur - %s"
  },
  description:
    "Rumah Struktur menyediakan layanan konstruksi, arsitektur, dan desain bangunan dengan kualitas terbaik. Solusi pembangunan rumah, renovasi, hingga perencanaan struktur untuk hunian dan komersial.",
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
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
