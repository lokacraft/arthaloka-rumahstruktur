"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  ArrowRight,
  Loader2,
  Headphones,
  Heart,
  Ruler,
  AlertCircle,
  MailCheck,
  MailX
} from "lucide-react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { toast } from "sonner";

export default function HomeDiskusiPesan() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogStatus, setDialogStatus] = useState<"success" | "error">("success");
  const [dialogMessage, setDialogMessage] = useState("");

  const [formData, setFormData] = useState({
    nama: "",
    lokasiProyek: "",
    namaProyek: "",
    tipeProyek: "",
    pesan: "",
  });

  const projectTypes = [
    "Soil Investigation",
    "Perkuatan Bangunan",
    "Mekanikal Elektrikal Plumbing",
    "Jasa Hitung Struktur",
    "Geometrik Jalan Raya",
    "Analisis Geoteknik",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, tipeProyek: value }));
    if (errors.tipeProyek) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.tipeProyek;
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.nama.trim()) {
      newErrors.nama = "Nama wajib diisi";
      toast.error("Nama wajib diisi");
    }
    
    if (!formData.lokasiProyek.trim()) {
      newErrors.lokasiProyek = "Lokasi proyek wajib diisi";
      toast.error("Lokasi proyek wajib diisi");
    }
    
    if (!formData.namaProyek.trim()) {
      newErrors.namaProyek = "Nama proyek wajib diisi";
      toast.error("Nama proyek wajib diisi");
    }
    
    if (!formData.tipeProyek) {
      newErrors.tipeProyek = "Tipe proyek wajib dipilih";
      toast.error("Tipe proyek wajib dipilih");
    }
    
    if (!formData.pesan.trim()) {
      newErrors.pesan = "Pesan wajib diisi";
      toast.error("Pesan wajib diisi");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Query Firebase untuk mendapatkan nomor WhatsApp aktif
      const contactsRef = collection(db, "contacts");
      const q = query(contactsRef, where("isActive", "==", true));
      const querySnapshot = await getDocs(q);

      let whatsappNumber = "";

      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();
        whatsappNumber = docData.whatsAppNumber;
      } else {
        console.warn("Nomor WhatsApp aktif tidak ditemukan di database.");
        setDialogStatus("error");
        setDialogMessage("Nomor kontak tidak tersedia saat ini. Silakan coba lagi nanti.");
        setDialogOpen(true);
        setLoading(false);
        return;
      }

      // Sanitasi nomor WhatsApp
      whatsappNumber = whatsappNumber.replace(/\D/g, "");
      if (whatsappNumber.startsWith("0")) {
        whatsappNumber = "62" + whatsappNumber.slice(1);
      }

      // Template pesan WhatsApp
      const message = `
*Halo Rumah Struktur, Saya ingin diskusi mengenai proyek.*

 *Nama:* ${formData.nama}
 *Lokasi:* ${formData.lokasiProyek}
 *Proyek:* ${formData.namaProyek}
 *Tipe:* ${formData.tipeProyek}

*Pesan Detail:*
${formData.pesan}
      `.trim();

      const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
      
      // Show success dialog
      setDialogStatus("success");
      setDialogMessage("Pesan Anda berhasil disiapkan! Anda akan diarahkan ke WhatsApp.");
      setDialogOpen(true);
      
      toast.success("Pesan berhasil disiapkan!");
      
      setTimeout(() => {
        window.open(waUrl, "_blank");
        
        // Reset form setelah berhasil
        setFormData({
          nama: "",
          lokasiProyek: "",
          namaProyek: "",
          tipeProyek: "",
          pesan: "",
        });
      }, 1500);

    } catch (error) {
      console.error("Gagal mengambil kontak:", error);
      setDialogStatus("error");
      setDialogMessage("Terjadi kesalahan sistem. Silakan coba lagi nanti.");
      setDialogOpen(true);
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  // Variants dengan type yang benar
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const valueProps = [
    {
      icon: Headphones,
      title: "Konsultasi Gratis",
      description: "Punya ide proyek? Mendiskusikan kebutuhan teknis Anda bersama tim ahli kami, tanpa biaya."
    },
    {
      icon: Heart,
      title: "Dukungan Penuh",
      description: "Tim kami berdedikasi penuh untuk mendukung setiap fase dari proyek Anda."
    },
    {
      icon: Ruler,
      title: "Presisi & Akurasi",
      description: "Dengan perhitungan yang presisi, kami memastikan hasil akhir proyek sesuai standar tertinggi dan ekspektasi Anda."
    }
  ];

  return (
    <>
      <section className="relative w-full min-h-screen bg-[#2f4f4f] font-clash overflow-hidden flex items-center py-12 md:py-16 lg:py-20">
        
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 mx-auto max-w-7xl">
          <div className="grid gap-8 lg:gap-16 xl:gap-20 lg:grid-cols-2 items-start">
            
            {/* KIRI: Form Section */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="w-full"
            >
              {/* Header */}
              <div className="mb-6 md:mb-8">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-semibold text-white mb-3 md:mb-4 leading-tight"
                >
                  Diskusikan Kebutuhan<br className="hidden sm:block"/>Proyek Anda
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-slate-200 text-sm md:text-base leading-relaxed"
                >
                  Isi formulir di bawah ini dan tim ahli kami akan segera
                  menghubungi Anda kembali maksimal dalam 24 jam.
                </motion.p>
              </div>

              {/* Form */}
              <div className="space-y-4 md:space-y-5">
                
                {/* Nama */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Label htmlFor="nama" className="text-white text-sm mb-2 block">
                    Nama
                  </Label>
                  <Input
                    id="nama"
                    name="nama"
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    className={`h-11 md:h-12 bg-transparent border ${errors.nama ? 'border-red-400' : 'border-white/40'} text-white placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-white/70 transition-all`}
                    value={formData.nama}
                    onChange={handleChange}
                  />
                  <AnimatePresence>
                    {errors.nama && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-400 text-xs mt-1 flex items-center gap-1"
                      >
                        <AlertCircle className="h-3 w-3" />
                        {errors.nama}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Lokasi Proyek */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Label htmlFor="lokasiProyek" className="text-white text-sm mb-2 block">
                    Lokasi Proyek
                  </Label>
                  <Input
                    id="lokasiProyek"
                    name="lokasiProyek"
                    type="text"
                    placeholder="Contoh: Jakarta Selatan"
                    className={`h-11 md:h-12 bg-transparent border ${errors.lokasiProyek ? 'border-red-400' : 'border-white/40'} text-white placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-white/70 transition-all`}
                    value={formData.lokasiProyek}
                    onChange={handleChange}
                  />
                  <AnimatePresence>
                    {errors.lokasiProyek && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-400 text-xs mt-1 flex items-center gap-1"
                      >
                        <AlertCircle className="h-3 w-3" />
                        {errors.lokasiProyek}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Nama Proyek */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Label htmlFor="namaProyek" className="text-white text-sm mb-2 block">
                    Nama Proyek
                  </Label>
                  <Input
                    id="namaProyek"
                    name="namaProyek"
                    type="text"
                    placeholder="Contoh: Pembangunan Gedung Kantor"
                    className={`h-11 md:h-12 bg-transparent border ${errors.namaProyek ? 'border-red-400' : 'border-white/40'} text-white placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-white/70 transition-all`}
                    value={formData.namaProyek}
                    onChange={handleChange}
                  />
                  <AnimatePresence>
                    {errors.namaProyek && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-400 text-xs mt-1 flex items-center gap-1"
                      >
                        <AlertCircle className="h-3 w-3" />
                        {errors.namaProyek}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Tipe Proyek */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <Label className="text-white text-sm mb-2 block">
                    Tipe Proyek
                  </Label>
                  <Select value={formData.tipeProyek} onValueChange={handleSelectChange}>
                    <SelectTrigger className={`h-11 md:h-12 bg-transparent border ${errors.tipeProyek ? 'border-red-400' : 'border-white/40'} text-white focus:ring-0 focus:ring-offset-0 focus:border-white/70 transition-all [&>span]:text-slate-400 data-[state=open]:border-white/70`}>
                      <SelectValue placeholder="Pilih tipe proyek" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#3d5a5c] border-white/20 text-white">
                      {projectTypes.map((type) => (
                        <SelectItem 
                          key={type} 
                          value={type}
                          className="focus:bg-white/10 focus:text-white cursor-pointer"
                        >
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <AnimatePresence>
                    {errors.tipeProyek && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-400 text-xs mt-1 flex items-center gap-1"
                      >
                        <AlertCircle className="h-3 w-3" />
                        {errors.tipeProyek}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Pesan */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <Label htmlFor="pesan" className="text-white text-sm mb-2 block">
                    Pesan
                  </Label>
                  <Textarea
                    id="pesan"
                    name="pesan"
                    placeholder="Jelaskan kebutuhan proyek Anda..."
                    rows={4}
                    className={`bg-transparent border ${errors.pesan ? 'border-red-400' : 'border-white/40'} text-white placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-white/70 transition-all resize-none`}
                    value={formData.pesan}
                    onChange={handleChange}
                  />
                  <AnimatePresence>
                    {errors.pesan && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-400 text-xs mt-1 flex items-center gap-1"
                      >
                        <AlertCircle className="h-3 w-3" />
                        {errors.pesan}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <Button 
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full sm:w-auto h-11 md:h-12 px-6 md:px-8 bg-[#4db8ae] hover:bg-[#45a89f] text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg shadow-teal-900/20"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Memproses...
                      </>
                    ) : (
                      <>
                        Kirim Pesan
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </motion.div>

              </div>
            </motion.div>

            {/* KANAN: Value Propositions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full space-y-4 md:space-y-6 lg:pt-16 xl:pt-32"
            >
              {valueProps.map((prop, index) => {
                const Icon = prop.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5,
                      delay: 0.3 + (index * 0.1),
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 }
                    }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-5 md:p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex items-start gap-4">
                      <motion.div 
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="flex-shrink-0 w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center group-hover:bg-[#4db8ae]/20 transition-colors"
                      >
                        <Icon className="h-6 w-6 text-[#4db8ae]" />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-bold text-base md:text-lg mb-2">
                          {prop.title}
                        </h3>
                        <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                          {prop.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

          </div>
        </div>
      </section>

      {/* Dialog Success/Error */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900">
          <DialogHeader>
            <div className="flex flex-col items-center text-center space-y-4">
              {dialogStatus === "success" ? (
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <MailCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
              ) : (
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                  <MailX className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
              )}
              <DialogTitle className="text-xl font-bold">
                {dialogStatus === "success" ? "Pesan Berhasil!" : "Pesan Gagal"}
              </DialogTitle>
              <DialogDescription className="text-center">
                {dialogMessage}
              </DialogDescription>
            </div>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button
              onClick={() => setDialogOpen(false)}
              className={`${
                dialogStatus === "success"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              } text-white`}
            >
              Tutup
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}