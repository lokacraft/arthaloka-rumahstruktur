"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { 
  PencilRuler, 
  ShieldCheck, 
  Clock, 
  Users, 
  HardHat, 
  CircleDollarSign,
  Award, 
  UserRound,
  ClipboardList,
  HeartHandshake,
  Banknote
} from "lucide-react";

// --- Data Keunggulan (5 Kartu Sesuai Gambar Referensi) ---
// Saya menyesuaikan ikon dan konten agar relevan dengan "Rumah Struktur"
const keunggulanData = [
  {
    id: 1,
    title: "Desain Presisi & Estetik",
    description:
      "Konsultan Struktur resmi yang sudah berbadan hukum (PT)",
    icon: Award,
    color: "text-[#008080]", 
  },
  {
    id: 2,
    title: "Material Standar SNI",
    description:
      "Tim Tenaga Ahli yang Profesional dan Bersertifikat di bidangnya",
    icon: UserRound,
    color: "text-[#008080]",
  },
  {
    id: 3,
    title: "Tepat Waktu & Anggaran",
    description:
      "Berpengalaman Dengan lebih dari 300 Proyek diselesaikan selama lebih dari 7 Tahun",
    icon: ClipboardList,
    color: "text-[#008080]",
  },
  {
    id: 4,
    title: "Tim Ahli Bersertifikat",
    description:
      "Pelayanan Maksimal, Berpengalaman membantu meloloskan klien sampai tahap PBG",
    icon: HeartHandshake,
    color: "text-[#008080]",
  },
  {
    id: 5,
    title: "Garansi Konstruksi",
    description:
      "Harga Perencanaan yang Flexible dan Kompetiitf",
    icon: Banknote, // Ikon Award/Jaminan
    color: "text-[#008080]",
  },
];

// --- Definisi Varian Animasi (Joyful & Bouncy) ---

// 1. Container: Mengatur urutan muncul anak-anaknya
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Jeda antar kartu lebih cepat agar terasa lincah
      delayChildren: 0.2,
    },
  },
};

// 2. Card Entrance: Muncul dengan efek membal (spring) yang kuat
const cardVariants: Variants = {
  hidden: { y: 50, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10, // Damping rendah = lebih membal
      mass: 1,
    },
  },
};

// 3. Icon Hover: Bergoyang dan membesar saat di-hover
const iconHoverVariants: Variants = {
  initial: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.2,
    rotate: [0, -10, 10, -5, 5, 0], // Efek goyang (shake)
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const HomeKeunggulanKami = () => {
  return (
    <section className="w-full py-20 md:py-32 font-clash overflow-hidden">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-gray-900 tracking-tight">
              Keunggulan <span className="text-[#008080]">Kami</span>
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            className="h-1.5 w-24 bg-[#008080] mx-auto mt-6 rounded-full"
          />
        </div>

        {/* Grid Cards Section */}
        {/* Menggunakan grid-cols-1 (mobile), grid-cols-2 (tablet), dan grid-cols-3 (desktop) dengan centering */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-center"
        >
          {keunggulanData.map((item, index) => (
            <motion.div
              key={item.id}
              variants={cardVariants}
              whileHover="hover" // Trigger state 'hover' untuk semua anak
              initial="initial"
              // Tambahkan logic agar item ke-4 dan ke-5 di tengah pada layar besar jika baris kedua tidak penuh
              className={`
                group relative flex flex-col items-start p-8 rounded-[2rem] 
                bg-[#008080]/10 border border-gray-100 shadow-sm 
                hover:shadow-2xl hover:border-[#008080]/30 hover:-translate-y-2
                transition-all duration-300 z-10 h-full
                ${index >= 3 ? 'lg:col-span-1 lg:last:col-start-auto' : ''} 
              `}
              >
              {/* Background Dekoratif saat Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-[2rem] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon Wrapper dengan warna dinamis */}
              <motion.div 
                variants={iconHoverVariants}
                className={`mb-6 p-4 rounded-2xl ${item.color} border shadow-sm group-hover:shadow-md transition-shadow`}
              >
                <item.icon strokeWidth={2} className="w-8 h-8" />
              </motion.div>

              

              {/* Description */}
              <p className="text-gray-600 leading-relaxed text-base md:text-xl font-medium group-hover:text-[#008080] transition-discrete">
                {item.description}
              </p>

              {/* Dekorasi Garis Bawah */}
              <div className="absolute bottom-0 left-8 right-8 h-1 rounded-t-full overflow-hidden">
                 <div className="h-full w-0 bg-[#008080] group-hover:w-full transition-all duration-500 ease-out" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* --- Tambahan: Dekorasi Bawah --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 text-sm font-medium italic">
            &apos;Membangun Kepercayaan, Satu Struktur Sekaligus.&apos;
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default HomeKeunggulanKami;