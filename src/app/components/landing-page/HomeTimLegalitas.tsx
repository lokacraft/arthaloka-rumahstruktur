"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { CheckCircle, FileBadge, HardHat, Ruler } from "lucide-react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Skeleton } from "@/app/components/ui/skeleton";
import { useContact } from "@/contexts/ContactContext";
import Link from "next/link";
import SertifikatTenagaAhli from "./SertifikatTenagaAhli";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  layananId: string;
}
interface HomeTeamLegalitasProps {
  layananId?: string; // Opsional, default: "show-landing"
}

// --- Data Dummy Legalitas ---
const legalitasData = [
  {
    id: 1,
    title: "Akta Perusahaan",
    number: "12345.6789.000",
    description: "Jasa Pelaksana Konstruksi",
  },
  {
    id: 2,
    title: "SIUP/SIUJK",
    number: "556/001/IUJK/2023",
    description: "Izin Operasional Resmi",
  },
  {
    id: 3,
    title: "Sertifikat Badan Usaha",
    number: "9120101821234",
    description: "Terdaftar Resmi di OSS",
  },
  {
    id: 4,
    title: "Bukti Lapor SPT Tahunan Terakhir",
    number: "ISO-2023-001",
    description: "Manajemen Mutu Internasional",
  },
];

// --- Variabel Animasi ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemUpVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const itemScaleVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const HomeTeamLegalitas = ({ layananId = "show-landing" }: HomeTeamLegalitasProps) => {
  const [teams, setTeams] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const { contactData, isLoading } = useContact();

  // --- Fetch Data Team ---
  useEffect(() => {
    const q = query(
      collection(db, "teams"),
      where("layananId", "==", "show-landing")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as TeamMember[];
      setTeams(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching teams:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  return (
    <section className="w-full py-20 md:py-32 font-clash overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================= BAGIAN 1: TEAM ENGINEER ================= */}
        <SertifikatTenagaAhli />
        
        {/* Header Section */}
                <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
                  <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900 tracking-tight"
                  >
                    Dokumen <span className="text-[#008080]">Legalitas{" "}</span> Perusahaan
                  </motion.h2>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: 100 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="h-1.5 bg-[#008080] mx-auto mt-6 rounded-full"
                  />
                  <motion.p 
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-gray-500 text-lg leading-relaxed mt-5">
                    Kami menjamin keamanan proyek Anda dengan legalitas perusahaan yang lengkap dan transparan dengan dokumen legalitas sebagai berikut:
                    </motion.p>
                </div>
        {/* ================= BAGIAN 2: LEGALITAS ================= */}
        <div className="mt-5 bg-white rounded-[3rem] p-8 md:p-12 border border-gray-100 shadow-xl relative overflow-hidden">
            {/* Dekorasi Background */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gray-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 -z-10" />

            <div className="flex flex-col lg:flex-row gap-12 lg:items-center">
                {/* Header Legalitas (Kiri) */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="lg:w-1/3 space-y-6"
                >
                    {/* <h2 className="text-3xl md:text-4xl font-medium text-gray-900 leading-tight">
                        Partner Terpercaya & <br className="hidden md:block" />
                        <span className="text-[#008080]">Berbadan Hukum Resmi</span>
                        <span className="text-[#008080]">Dokumen Legalitas Perusahaan</span>
                    </h2> */}
                    {/* <p className="text-gray-500 text-lg leading-relaxed">
                        Kami menjamin keamanan proyek Anda dengan legalitas perusahaan yang lengkap dan transparan.
                    </p> */}
                    <p className="text-gray-500 text-lg leading-relaxed">
                    Untuk permintaan data legalitas perusahaan bisa menghubungi langsung ke kami via no kontak kami.
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
                </motion.div>

                {/* Grid Dokumen (Kanan) */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {legalitasData.map((doc) => (
                        <motion.div key={doc.id} variants={itemScaleVariants}>
                            <div className="flex items-center gap-4 p-5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-lg hover:border-[#008080]/20 transition-all duration-300 group">
                                <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 group-hover:bg-[#008080] transition-colors duration-300">
                                    <CheckCircle className="w-6 h-6 text-[#008080] group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 text-lg group-hover:text-[#008080] transition-colors">
                                        {doc.title}
                                    </h4>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default HomeTeamLegalitas;