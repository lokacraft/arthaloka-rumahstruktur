"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  ArrowRight,
  Loader2,
  AlertCircle,
  MailCheck,
  MailX,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter
} from "lucide-react";
import { BsTwitterX } from "react-icons/bs";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Label } from "@/app/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { toast } from "sonner";

interface LayananDiskusiPesanProps {
  namaLayanan: string;
}

interface ContactData {
  whatsAppNumber: string;
  emailAddress: string;
  instagramAccount?: string;
  facebookAccount?: string;
  xAccount?: string;
}

export default function LayananDiskusiPesan({ namaLayanan }: LayananDiskusiPesanProps) {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogStatus, setDialogStatus] = useState<"success" | "error">("success");
  const [dialogMessage, setDialogMessage] = useState("");
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [loadingContact, setLoadingContact] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    judulPesan: "",
    pesan: "",
  });

  // Fetch contact data dari Firebase
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        const q = query(contactsRef, where("isActive", "==", true));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data() as ContactData;
          setContactData(docData);
        }
      } catch (error) {
        console.error("Error fetching contact data:", error);
      } finally {
        setLoadingContact(false);
      }
    };

    fetchContactData();
  }, []);

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

  // Validasi email format
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Nama wajib diisi";
      toast.error("Nama wajib diisi");
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
      toast.error("Email wajib diisi");
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Format email tidak valid";
      toast.error("Format email tidak valid");
    }
    
    if (!formData.judulPesan.trim()) {
      newErrors.judulPesan = "Judul pesan wajib diisi";
      toast.error("Judul pesan wajib diisi");
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

    if (!contactData?.whatsAppNumber) {
      setDialogStatus("error");
      setDialogMessage("Nomor kontak tidak tersedia. Silakan coba lagi nanti.");
      setDialogOpen(true);
      return;
    }

    setLoading(true);

    try {
      // Sanitasi nomor WhatsApp
      let whatsappNumber = contactData.whatsAppNumber.replace(/\D/g, "");
      if (whatsappNumber.startsWith("0")) {
        whatsappNumber = "62" + whatsappNumber.slice(1);
      }

      // Template pesan WhatsApp
      const message = `
*Pertanyaan tentang ${namaLayanan}*

👤 *Nama:* ${formData.name}
📧 *Email:* ${formData.email}
📌 *Judul:* ${formData.judulPesan}

*Pesan:*
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
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          judulPesan: "",
          pesan: "",
        });
      }, 1500);

    } catch (error) {
      console.error("Error:", error);
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

  // Cek validitas URL
  const isValidUrl = (url: string | undefined) => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <>
      <section className="relative w-full min-h-screen bg-[#2f4f4f] font-clash overflow-hidden flex items-center py-12 md:py-16 lg:py-20">
        
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-slate-400/10 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 mx-auto max-w-7xl">
          <div className="grid gap-8 lg:gap-16 xl:gap-20 lg:grid-cols-2 items-start">
            
            {/* KIRI: Informasi Kontak */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="w-full space-y-6 md:space-y-8"
            >
              {/* Header */}
              <div className="space-y-4">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight"
                >
                  Diskusikan Kebutuhan<br/>
                  Proyek Anda Dengan Tim<br/>
                  Kami.
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-slate-200 text-sm md:text-base leading-relaxed"
                >
                  Telepon kami atau tinggalkan pertanyaan di<br/>
                  formulir! Kami akan merespons Anda dalam<br/>
                  24 jam.
                </motion.p>
              </div>

              {/* Contact Information */}
              {loadingContact ? (
                <div className="flex items-center gap-2 text-white">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Memuat informasi kontak...</span>
                </div>
              ) : contactData ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="space-y-4"
                >
                  {/* WhatsApp */}
                  <div className="flex items-center gap-3 text-white">
                    <Phone className="h-5 w-5 text-teal-300" />
                    <span className="text-sm md:text-base">{contactData.whatsAppNumber}</span>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3 text-white">
                    <Mail className="h-5 w-5 text-teal-300" />
                    <span className="text-sm md:text-base break-all">{contactData.emailAddress}</span>
                  </div>
                </motion.div>
              ) : (
                <p className="text-slate-300 text-sm">Informasi kontak tidak tersedia</p>
              )}

              {/* Social Media */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="space-y-3"
              >
                <p className="text-white text-sm md:text-base font-medium">
                  Ikuti Rumah Struktur Engineering di media<br/>sosial:
                </p>
                <div className="flex items-center gap-4">
                  {/* Instagram */}
                  <button
                    onClick={() => contactData?.instagramAccount && isValidUrl(contactData.instagramAccount) && window.open(contactData.instagramAccount, "_blank")}
                    disabled={!isValidUrl(contactData?.instagramAccount)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                      isValidUrl(contactData?.instagramAccount)
                        ? "bg-white/10 hover:bg-white/20 cursor-pointer"
                        : "bg-white/5 cursor-not-allowed opacity-50"
                    }`}
                  >
                    <Instagram className="h-5 w-5 text-white" />
                  </button>

                  {/* Facebook */}
                  <button
                    onClick={() => contactData?.facebookAccount && isValidUrl(contactData.facebookAccount) && window.open(contactData.facebookAccount, "_blank")}
                    disabled={!isValidUrl(contactData?.facebookAccount)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                      isValidUrl(contactData?.facebookAccount)
                        ? "bg-white/10 hover:bg-white/20 cursor-pointer"
                        : "bg-white/5 cursor-not-allowed opacity-50"
                    }`}
                  >
                    <Facebook className="h-5 w-5 text-white" />
                  </button>

                  {/* X (Twitter) */}
                  <button
                    onClick={() => contactData?.xAccount && isValidUrl(contactData.xAccount) && window.open(contactData.xAccount, "_blank")}
                    disabled={!isValidUrl(contactData?.xAccount)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                      isValidUrl(contactData?.xAccount)
                        ? "bg-white/10 hover:bg-white/20 cursor-pointer"
                        : "bg-white/5 cursor-not-allowed opacity-50"
                    }`}
                  >
                    <BsTwitterX className="h-5 w-5 text-white" />
                  </button>
                </div>
              </motion.div>
            </motion.div>

            {/* KANAN: Form */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeIn}
              className="w-full"
            >
              <div className="space-y-4 md:space-y-5">
                
                {/* Nama */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Label htmlFor="name" className="text-white text-sm mb-2 block">
                    Nama
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder=""
                    className={`h-11 md:h-12 bg-transparent border ${errors.name ? 'border-red-400' : 'border-white/40'} text-white placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-white/70 transition-all`}
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <AnimatePresence>
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-400 text-xs mt-1 flex items-center gap-1"
                      >
                        <AlertCircle className="h-3 w-3" />
                        {errors.name}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Label htmlFor="email" className="text-white text-sm mb-2 block">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder=""
                    className={`h-11 md:h-12 bg-transparent border ${errors.email ? 'border-red-400' : 'border-white/40'} text-white placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-white/70 transition-all`}
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-400 text-xs mt-1 flex items-center gap-1"
                      >
                        <AlertCircle className="h-3 w-3" />
                        {errors.email}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Judul Pesan */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <Label htmlFor="judulPesan" className="text-white text-sm mb-2 block">
                    Judul Pesan
                  </Label>
                  <Input
                    id="judulPesan"
                    name="judulPesan"
                    type="text"
                    placeholder=""
                    className={`h-11 md:h-12 bg-transparent border ${errors.judulPesan ? 'border-red-400' : 'border-white/40'} text-white placeholder:text-slate-400 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-white/70 transition-all`}
                    value={formData.judulPesan}
                    onChange={handleChange}
                  />
                  <AnimatePresence>
                    {errors.judulPesan && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-400 text-xs mt-1 flex items-center gap-1"
                      >
                        <AlertCircle className="h-3 w-3" />
                        {errors.judulPesan}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Pesan */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <Label htmlFor="pesan" className="text-white text-sm mb-2 block">
                    Pesan
                  </Label>
                  <Textarea
                    id="pesan"
                    name="pesan"
                    placeholder=""
                    rows={5}
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
                  transition={{ duration: 0.5, delay: 0.8 }}
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