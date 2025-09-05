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
    <>
      {children}
      <BottomBanner
        title={
          <>
            <span className="text-[#008080]">Ratusan Proyek </span>Swasta <br />
            & Pemerintah Telah{" "}
            <span className="text-[#008080]">Mempercayakan </span>
            <br />
            Strukturnya Pada Kami
          </>
        }
        description={
          <>
            Jangan tunda kesuksesan proyek Anda. <br />
            Wujudkan struktur yang kokoh dan <br />
            efisien bersama kami sekarang.
          </>
        }
        buttonHref="/kontak"
        buttonText="Mulai Proyek Anda"
      />
      <ContactForm />
    </>
  );
}
