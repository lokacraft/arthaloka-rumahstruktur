"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  DraftingCompass,
  ClipboardCheck,
  HardHat,
  Wrench,
  MessagesSquare,
  Settings,
  PencilLine,
  ChartNetwork,
  Sprout,
  FileChartColumnIncreasing,
} from "lucide-react";
import Link from "next/link";
import { TbRoad } from "react-icons/tb";

// --- Data Layanan ---
const layananData = [
  {
    id: 1,
    url: "/layanan/jasa-hitung-struktur",
    title: "Jasa audit struktur dan penyelidikan tanah",
    description:
      "",
    icon: PencilLine,
    color: "text-[#008080]",
  },
  {
    id: 2,
    url: "/layanan/jasa-hitung-struktur",
    title: "Jasa perencanaan struktur pendukung konstruksi dan struktur sementara",
    description:
      "",
    icon: ChartNetwork,
    color: "text-[#008080]",
  },
  {
    id: 3,
    url: "/layanan/jasa-hitung-struktur",
    title: "Jasa perencanaan struktur hunian",
    description:
      "Supervisi ketat di lapangan untuk memastikan pelaksanaan konstruksi sesuai dengan gambar desain dan spesifikasi teknis.",
    icon: Sprout,
    color: "text-[#008080]",
  },
  {
    id: 4,
    url: "/layanan/jasa-hitung-struktur",
    title: "Jasa perencanaan struktur fasilitas umum",
    description:
      "Solusi teknis (retrofitting) untuk memperbaiki kerusakan struktur atau meningkatkan kapasitas beban bangunan lama.",
    icon: Sprout,
    color: "text-[#008080]",
  },
  {
    id: 5,
    url: "/layanan/jasa-hitung-struktur",
    title: "Jasa perencanaan struktur industri",
    description:
      "Layanan konsultasi ahli untuk memecahkan masalah sipil, sengketa konstruksi, atau kajian kelayakan proyek.",
    icon: FileChartColumnIncreasing,
    color: "text-[#008080]",
  },
  {
    id: 6,
    url: "/layanan/geometrik-jalan-raya",
    title: "Jasa perencanaan infrastruktur",
    description:
      "Pemodelan Informasi Bangunan (3D) untuk visualisasi yang akurat, deteksi konflik, dan efisiensi estimasi material.",
    icon: Settings,
    color: "text-[#008080]",
  },
  {
    id: 7,
    url: "/layanan/analisis-geoteknik",
    title: "Jasa perencanaan geoteknik",
    description:
      "Pemodelan Informasi Bangunan (3D) untuk visualisasi yang akurat, deteksi konflik, dan efisiensi estimasi material.",
    icon: TbRoad,
    color: "text-[#008080]",
  },
  {
    id: 8,
    url: "/layanan/soil-investigation",
    title: "Jasa perencanaan struktur kawasan industri pertambangan",
    description:
      "Pemodelan Informasi Bangunan (3D) untuk visualisasi yang akurat, deteksi konflik, dan efisiensi estimasi material.",
    icon: TbRoad,
    color: "text-[#008080]",
  },
];

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

const HomeCakupanLayanan = () => {
  return (
    <section className="w-full py-20 md:py-32 font-clash overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900 tracking-tight"
          >
            Cakupan <span className="text-[#008080]">Layanan{" "}</span>Kami
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 100 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="h-1.5 bg-[#008080] mx-auto mt-6 rounded-full"
          />
        </div>

        {/* Grid Layanan */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {layananData.map((item) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
              className="group relative bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-start justify-between overflow-hidden"
            >
              <div className="flex-1">
                  {/* Icon Box */}
                  <div className={`p-4 rounded-2xl mb-6 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-8 h-8" strokeWidth={2} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#008080] transition-colors">
                  {item.title}
                  </h3>
              </div>
              <div className="w-full flex">
                  <Link href={item.url} className="text-gray-900 text-sm px-4 py-1 rounded-full bg-transparent group-hover:bg-[#008080] group-hover:text-white transition-all duration-200 border-2 border-[#008080]">
                        Cek Detail
                  </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeCakupanLayanan;