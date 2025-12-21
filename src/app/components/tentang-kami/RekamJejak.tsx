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

const RekamJejak = () => {
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-gray-900 tracking-tight flex flex-col gap-y-3 justify-center text-center">
                <span className="text-gray-900 inline-block relative">
                Rekam Jejak yang Terbukti
                  {/* Garis bawah dekoratif */}
                </span>
              </h2>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-0 md:gap-x-8">
            
            {/* Stat 1 */}
            <motion.div variants={itemVariants} className="flex flex-col items-center justify-center relative group">
            <div className="h-30 flex flex-col items-center justify-center">
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-[#008080] flex items-baseline">
                <CountUp to={8} />
                <span className="text-4xl sm:text-5xl ml-1">+</span>
              </h3>
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-[#008080] flex items-baseline">
                Tahun
              </h3>
            </div>
              <div className="mt-4 text-center">
                <p className="text-lg md:text-xl font-medium text-gray-900">Pengalaman di industri rekayasa sipil & geoteknik.</p>
              </div>
              {/* Divider Mobile Only */}
              <div className="md:hidden w-16 h-[1px] bg-gray-300 mt-8" />
            </motion.div>

            {/* Stat 2 */}
            <motion.div variants={itemVariants} className="flex flex-col items-center justify-center relative group">
              {/* Divider Desktop (Left) */}
              <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-24 bg-gray-300" />
              <div className="h-30 flex flex-col items-center justify-center gap-y-3">
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-[#008080] flex items-baseline">
                  <CountUp to={100} />
                  <span className="text-4xl sm:text-5xl ml-1">+</span>
                </h3>
              </div>
              <div className="mt-4 text-center">
                <p className="text-lg md:text-xl font-medium text-gray-900">Klien dari berbagai sektor telah kami layani.</p>
              </div>

              {/* Divider Desktop (Right) */}
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-24 bg-gray-300" />
              {/* Divider Mobile Only */}
              <div className="md:hidden w-16 h-[1px] bg-gray-300 mt-8" />
            </motion.div>

            {/* Stat 3 */}
            <motion.div variants={itemVariants} className="flex flex-col items-center justify-center relative group">
              <h3 className="h-30 text-4xl sm:text-5xl lg:text-6xl font-medium text-[#008080] flex items-baseline justify-center text-center">
                SKA Certified
              </h3>
              <div className="mt-4 text-center">
                <p className="text-lg md:text-xl font-medium text-gray-900">Klien dari berbagai sektor telah kami layani.</p>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RekamJejak;