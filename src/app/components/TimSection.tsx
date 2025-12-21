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
interface TimSectionProps {
  layananId?: string; // Opsional, default: "show-landing"
}



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

const TimSection = ({ layananId = "show-landing" }: TimSectionProps) => {
  const [teams, setTeams] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Fetch Data Team ---
  useEffect(() => {
    const q = query(
      collection(db, "teams"),
      where("layananId", "==", layananId)
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
  if(teams.length <= 0) {
      return ""
  }
  return (
    <section className="w-full py-20 md:py-32 font-clash overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          ) : ""
          }
        </div>
      </div>
    </section>
  );
};

export default TimSection;