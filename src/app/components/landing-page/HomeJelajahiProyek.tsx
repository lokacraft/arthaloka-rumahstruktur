"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { collection, query, where, limit, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Sesuaikan path firebase Anda
import { Card, CardContent, CardFooter } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Skeleton } from "@/app/components/ui/skeleton";
import { ArrowUpRight, HardHat } from "lucide-react";

// --- Tipe Data Portfolio ---
interface PortfolioItem {
  id: string;
  title: string;
  fotoPortofolio: string; // URL Gambar
  tipePekerjaan: string; // Kategori/Tipe
  slug: string;
  isProjectFeatured: boolean;
}

// --- Variabel Animasi ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Efek muncul berurutan
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { y: 50, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 14,
    },
  },
};

const HomeJelajahiProyek = () => {
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Data Realtime
  useEffect(() => {
    const q = query(
      collection(db, "portofolio"),
      where("isProjectFeatured", "==", true),
      limit(3)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as PortfolioItem[];
      
      setProjects(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching projects:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="w-full py-20 md:py-32 font-clash overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header Section --- */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-gray-200 shadow-sm mb-4">
              <HardHat className="w-4 h-4 text-[#008080]" />
              <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Portofolio Unggulan</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-medium text-gray-900 leading-tight">
            Beberapa Proyek{" "}<span className="">Pilihan Kami</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link href="/portofolio">
              <Button variant="outline" className="rounded-full px-6 border-[#008080] text-[#008080] hover:bg-[#008080] hover:text-white transition-all duration-300 cursor-pointer">
                Lihat Semua Proyek <ArrowUpRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* --- Grid Proyek --- */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-[2rem] overflow-hidden bg-white h-[400px] border border-gray-100">
                    <Skeleton className="w-full h-[250px]" />
                    <div className="p-6 space-y-3">
                        <Skeleton className="w-1/3 h-6 rounded-full" />
                        <Skeleton className="w-3/4 h-8" />
                    </div>
                </div>
             ))}
          </div>
        ) : projects.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {projects.map((project) => (
                <motion.div key={project.id} variants={cardVariants}>
                  <Link href={`/portofolio/${project.slug}`} className="block h-full group cursor-pointer">
                    <Card className="h-full border-0 shadow-sm hover:shadow-2xl transition-all duration-500 rounded-[2rem] overflow-hidden bg-white flex flex-col">
                      
                      {/* Image Container */}
                      <div className="relative w-full aspect-[4/3] overflow-hidden">
                        {project.fotoPortofolio ? (
                            <Image
                            src={project.fotoPortofolio}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
                        )}
                        
                        {/* Overlay Gradient on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Floating Action Button */}
                        <div className="absolute bottom-4 right-4 translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 delay-100">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#008080] shadow-lg">
                                <ArrowUpRight className="w-6 h-6" />
                            </div>
                        </div>
                      </div>

                      {/* Content */}
                      <CardContent className="p-6 md:p-8 flex-1 flex flex-col justify-between relative bg-white z-10">
                         <div className="space-y-3">
                            <Badge variant="secondary" className="bg-[#008080]/10 text-[#008080] hover:bg-[#008080]/20 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider w-fit">
                                {project.tipePekerjaan || "Konstruksi"}
                            </Badge>
                            <h3 className="text-xl md:text-2xl font-medium text-gray-900 group-hover:text-[#008080] transition-colors leading-snug line-clamp-2">
                                {project.title}
                            </h3>
                         </div>
                      </CardContent>

                      {/* Decorative Line */}
                      <CardFooter className="p-0">
                         <div className="h-1.5 w-0 bg-[#008080] group-hover:w-full transition-all duration-500 ease-out" />
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center py-20 border-2 border-dashed border-gray-300 rounded-[2rem]"
          >
            <p className="text-gray-500 text-lg">Belum ada proyek unggulan yang ditampilkan.</p>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default HomeJelajahiProyek;