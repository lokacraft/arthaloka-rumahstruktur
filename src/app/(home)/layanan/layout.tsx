import type { Metadata } from "next";
import {
  clashGrotesk,
  instrumentSans,
  geistMono,
  geistSans,
} from "../../../lib/fonts";
import BottomBanner from "@/app/components/BottomBanner";
import ContactForm from "@/app/components/ContactForm";
import "../../globals.css";

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
        {children}
        <BottomBanner />
        <ContactForm />
      </body>
    </html>
  );
}
