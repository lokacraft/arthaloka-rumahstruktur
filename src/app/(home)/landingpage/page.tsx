import Hero from "../../components/landing-page/Hero";
import Projek from "../../components/landing-page/Projek";
import CardLayanan from "../../components/landing-page/CardLayanan";
import TestimonialCarousel from "../../components/landing-page/TestimonialCarousel";
import PartnerShowcase from "../../components/PartnerShowcase";
import ArtikelCarousel from "../../components/landing-page/ArtikelCarousel";
import BottomBannerHomePage from "@/app/components/landing-page/BottomBannerHomePage";
import ContactFormHomePage from "@/app/components/landing-page/ContactFormHomePage";
import { Metadata } from "next";
// import nodemailer from "nodemailer";
// import { FormData } from "@/types/mail-form";
// import { success } from "zod";
// import { error } from "console";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Rumah Struktur melayani hitung struktur, analisis geoteknik, soil investigation, analisis perkuatan bangunan, analisis geometrik jalan raya, serta layanan MEP (mekanikal, elektrikal, plumbing). Harga terjangkau, pelayanan cepat, dan hasil profesional.",
};

export default function Home() {
  // const sendMail = async (formData: FormData) => {
  //   'use server'

  //   try {
  //     const transporter = nodemailer.createTransport({
  //       service: "gmail",
  //       auth: {
  //         user: process.env.SMTP_USERNAME,
  //         pass: process.env.SMTP_PASSWORD,
  //       },
  //     });
  //     const mailOptions = {
  //       from: formData.email,
  //       to: process.env.MAIL_RECEIVER_ADDRESS,
  //       subject: formData.judul,
  //       text: formData.pesan,
  //       html: '',
  //     };
  //     await transporter.sendMail(mailOptions);
  //     return {
  //       success: true,
  //       error: null,
  //     };
  //   } catch (error) {
  //     return {
  //       success: false,
  //       error: "Terjadi Eror",
  //     };
  //   }
  // };

  return (
    <div className="relative">
      <Hero />
      <Projek />
      <CardLayanan />
      <TestimonialCarousel />
      <PartnerShowcase />
      <ArtikelCarousel />
      <BottomBannerHomePage />
      <ContactFormHomePage />
    </div>
  );
}
