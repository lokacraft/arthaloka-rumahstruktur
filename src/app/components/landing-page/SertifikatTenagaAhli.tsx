"use client"
import React, { ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import ImageTenagaAhli from "../../../../public/landing/ImageTenagaAhli.jpeg"
import { useContact } from "@/contexts/ContactContext";
import Link from "next/link";

export default function SertifikatTenagaAhli() {
  const { contactData, isLoading } = useContact();
      // --- Variabel Animasi ---
const containerVariants: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1, // Jeda antar kartu muncul
          delayChildren: 0.2,
        },
      },
    };
    
    const cardVariants: Variants = {
      hidden: { y: 40, opacity: 0, scale: 0.9 },
      visible: {
        y: 0,
        opacity: 1,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 120,
          damping: 12, // Memberikan efek membal halus
        },
      },
    };
  return (
      <div className="w-full flex-col items-center gap-y-5 p-[4vh] lg:p-[15vh]">
            {/* header */}
            {/* Header Section */}
        <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900 tracking-tight"
          >
            Tenaga  <span className="text-[#008080]">Ahli{" "}</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1.5 bg-[#008080] mx-auto mt-6 rounded-full"
          />
        </div>
    <div className="w-full  relative flex flex-col md:flex-row justify-start items-start md:items-center gap-6 md:gap-10 font-clash">
      {/* gambar */}
      <div className="w-full md:w-[60%] lg:w-[40%] h-full flex justify-center items-start">
            <Image src={ImageTenagaAhli} alt="sertifikasi tenaga ahli" width={1000} height={1000} className="w-[160px] lg:w-[220px]" />
      </div>

      {/* Description */}
      <div className="w-full md:w-[60%] h-full mt-2 md:mt-4 flex flex-col gap-y-4 justify-start items-start">
        <p className="text-md md:text-lg 2xl:text-xl font-normal leading-tight text-left">
        Untuk Kebutuhan Tenaga Ahli Lain Sesuai yang Sesuai dengan Proyek anda, seperti tenaga ahli geoteknik, Mekanikal, elektrikal, Plumbing, dll bisa menghubungi whatsapp dibawah ini.

        </p>
        {/* Button */}
        <div className="px-6 py-1 w-fit md:justify-self-center border border-[#008080] md:rounded-2xl rounded-lg mt-10">
          {contactData && !isLoading ? (
          <Link
            href={`https://wa.me/${contactData.whatsAppNumber}?text=${encodeURIComponent(contactData.ctaWhatsAppMessage)}`}
            target="_blank"
            className="
            font-instrument font-normal text-center
            text-lg md:text-xl
          "
          >
            Whatsapp Kami Sekarang!
          </Link>

          ) : (
          <Link
            href={`#`}
            className="
            font-instrument font-normal text-center
            text-lg md:text-xl
          "
          >
            Whatsapp Kami Sekarang!
          </Link>
          )}
        </div>
      </div>
    </div>
      </div>
  );
}
