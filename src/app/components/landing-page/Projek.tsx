"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useTransform, Variants } from "framer-motion"; // 1. Tambahkan import Variants

// --- Helper Component: CountUp Animation ---
const CountUp = ({ to, duration = 2 }: { to: number; duration?: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });
  
  // Menggunakan spring untuk animasi angka yang smooth
  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  // Transformasi nilai spring menjadi string angka bulat
  const displayValue = useTransform(springValue, (current) => Math.round(current));

  useEffect(() => {
    if (inView) {
      springValue.set(to);
    }
  }, [inView, to, springValue]);

  return (
    <span ref={ref}>
      <motion.span>{displayValue}</motion.span>
    </span>
  );
};

// --- Variabel Animasi ---
// 2. Berikan tipe eksplisit ': Variants'
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Efek muncul berurutan
      delayChildren: 0.2,
    },
  },
};

// 3. Berikan tipe eksplisit ': Variants'
const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
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

const HomeProject = () => {
  return (
    <section className="w-full flex justify-center py-20 md:py-32 font-clash">
      <div className="max-w-7xl w-full px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative rounded-[2.5rem] p-8 md:p-16 bg-gradient-to-br from-[#F5F5F5] via-[#E8F1F2] to-[#D0E8E8] shadow-xl overflow-hidden border border-white/50"
        >
          {/* Elemen Dekoratif Background (Optional) */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#008080]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#008080]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

          {/* Header */}
          <div className="relative z-10 grid grid-cols-1 place-items-center mb-16 md:mb-24">
            <motion.div variants={itemVariants} className="text-center max-w-4xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight text-gray-900 tracking-tight">
                <span className="text-[#008080] inline-block relative">
                  100+ Proyek
                  {/* Garis bawah dekoratif */}
                  <motion.span 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="absolute bottom-1 left-0 h-1 md:h-2 bg-[#008080]/20 w-full rounded-full"
                  />
                </span>{" "}
                Sukses <br className="hidden sm:block" />
                Telah Kami Kerjakan
              </h2>
              <p className="mt-6 text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                Pengalaman bertahun-tahun dalam membangun struktur yang kokoh dan estetis untuk masa depan.
              </p>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-0 md:gap-x-8">
            
            {/* Stat 1 */}
            <motion.div variants={itemVariants} className="flex flex-col items-center justify-center relative group">
              <h3 className="text-6xl sm:text-7xl lg:text-8xl font-medium text-[#008080] flex items-baseline">
                <CountUp to={60} />
                <span className="text-4xl sm:text-5xl ml-1">+</span>
              </h3>
              <div className="mt-4 text-center">
                <p className="text-lg md:text-xl font-medium text-gray-900">Klien Puas</p>
                <p className="text-sm md:text-base text-gray-500 mt-1">Periode 2018-2019</p>
              </div>
              {/* Divider Mobile Only */}
              <div className="md:hidden w-16 h-[1px] bg-gray-300 mt-8" />
            </motion.div>

            {/* Stat 2 */}
            <motion.div variants={itemVariants} className="flex flex-col items-center justify-center relative group">
              {/* Divider Desktop (Left) */}
              <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-24 bg-gray-300" />
              
              <h3 className="text-6xl sm:text-7xl lg:text-8xl font-medium text-[#008080] flex items-baseline">
                <CountUp to={50} />
                <span className="text-4xl sm:text-5xl ml-1">+</span>
              </h3>
              <div className="mt-4 text-center">
                <p className="text-lg md:text-xl font-medium text-gray-900">Proyek Besar</p>
                <p className="text-sm md:text-base text-gray-500 mt-1">Periode 2020-2021</p>
              </div>

              {/* Divider Desktop (Right) */}
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-24 bg-gray-300" />
              {/* Divider Mobile Only */}
              <div className="md:hidden w-16 h-[1px] bg-gray-300 mt-8" />
            </motion.div>

            {/* Stat 3 */}
            <motion.div variants={itemVariants} className="flex flex-col items-center justify-center relative group">
              <h3 className="text-6xl sm:text-7xl lg:text-8xl font-medium text-[#008080] flex items-baseline">
                <CountUp to={50} />
                <span className="text-4xl sm:text-5xl ml-1">+</span>
              </h3>
              <div className="mt-4 text-center">
                <p className="text-lg md:text-xl font-medium text-gray-900">Klien Baru</p>
                <p className="text-sm md:text-base text-gray-500 mt-1">Periode 2022-2023</p>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeProject;