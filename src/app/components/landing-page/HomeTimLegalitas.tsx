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
    title: "Sertifikat Badan Usaha (SBU)",
    number: "12345.6789.000",
    description: "Jasa Pelaksana Konstruksi",
  },
  {
    id: 2,
    title: "Izin Usaha Jasa Konstruksi (IUJK)",
    number: "556/001/IUJK/2023",
    description: "Izin Operasional Resmi",
  },
  {
    id: 3,
    title: "Nomor Induk Berusaha (NIB)",
    number: "9120101821234",
    description: "Terdaftar Resmi di OSS",
  },
  {
    id: 4,
    title: "Sertifikat ISO 9001:2015",
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
        {teams.length > 0 && (
        <div className="mb-24">
          <div className="text-center mb-16 space-y-4">
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-3xl md:text-5xl font-medium text-gray-900 tracking-tight"
            >
              Didukung oleh Tim Engineer Profesional
            </motion.h2>
          </div>

          {loading ? (
            // Skeleton Loading
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-[400px] rounded-3xl overflow-hidden bg-white border border-gray-100">
                  <Skeleton className="w-full h-full" />
                </div>
              ))}
            </div>
          ) : teams.length > 0 ? (
            // Data Real
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {teams.map((member) => (
                <motion.div key={member.id} variants={itemUpVariants}>
                  <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group bg-white rounded-3xl">
                    {/* Foto Profil dengan Efek Zoom */}
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-200">
                      {member.imageUrl ? (
                        <Image
                          src={member.imageUrl}
                          alt={member.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                          sizes="(max-width: 768px) 100vw, 25vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500">
                          No Image
                        </div>
                      )}
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                      
                      {/* Info di atas gambar */}
                      <div className="absolute bottom-0 left-0 w-full p-6 text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="mb-2">
                           <Badge className="bg-[#008080] hover:bg-[#006666] border-0 text-white text-[10px] px-2 py-0.5">
                              Professional Team
                           </Badge>
                        </div>
                        <h3 className="text-xl font-medium leading-tight mb-1">
                          {member.name}
                        </h3>
                        <p className="text-sm text-gray-300 font-medium">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-20 text-gray-500 border-2 border-dashed border-gray-200 rounded-[2rem]">
              Belum ada data tim yang ditampilkan.
            </div>
          )}
        </div>
        )}
        

        {/* ================= BAGIAN 2: LEGALITAS ================= */}
        <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-gray-100 shadow-xl relative overflow-hidden">
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
                    <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
                        <FileBadge className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-gray-700 tracking-wide uppercase">
                            Legalitas & Sertifikasi
                        </span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-medium text-gray-900 leading-tight">
                        Partner Terpercaya & <br className="hidden md:block" />
                        <span className="text-[#008080]">Berbadan Hukum Resmi</span>
                    </h2>
                    <p className="text-gray-500 text-lg leading-relaxed">
                        Kami menjamin keamanan proyek Anda dengan legalitas perusahaan yang lengkap dan transparan.
                    </p>
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
                            <div className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-lg hover:border-[#008080]/20 transition-all duration-300 group">
                                <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 group-hover:bg-[#008080] transition-colors duration-300">
                                    <CheckCircle className="w-6 h-6 text-[#008080] group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 text-lg group-hover:text-[#008080] transition-colors">
                                        {doc.title}
                                    </h4>
                                    {/* <p className="text-sm font-mono text-gray-500 mt-1 mb-2 bg-white px-2 py-0.5 rounded inline-block border">
                                        {doc.number}
                                    </p> */}
                                    <p className="text-sm text-gray-500">
                                        {doc.description}
                                    </p>
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