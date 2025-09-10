"use client";

import { useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/app/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import Image from "next/image";
import emailgagal from "/public/icons/emailgagal.png";

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
  message?: string;
}

export default function SuccessDialog({
  open,
  onClose,
  message = "Pesan berhasil dikirim!",
}: SuccessDialogProps) {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (open) {
      if (isMobile) {
        toast.success(message);
        onClose();
      } else {
        const timer = setTimeout(() => {
          onClose();
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [open, isMobile, message, onClose]);

  return (
    <AnimatePresence>
      {open && !isMobile && (
        <Dialog open={open} onOpenChange={onClose}>
          <DialogTitle className="hidden">
            Gagal : Email tidak terkirim
          </DialogTitle>
          <DialogContent className="p-8 border-0 font-clash shadow-none max-w-[30%] min-h-[50%]">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-6 w-full h-full rounded-lg flex flex-col items-center justify-center gap-6 text-center relative"
            >
              <h1 className="text-3xl font-medium">Pesan Tidak Terkirim!</h1>
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-full min-h-[60%] flex p-2 relative"
              >
                <Image
                  src={emailgagal}
                  alt="Email Gagal"
                  fill
                  className="object-contain w-[90%] h-[50%] justify-self-center items-center"
                />
              </motion.div>
              <p className="font-normal text-xl w-[70%]">
                Lengkapi form kirim pesan agar pesan anda bisa sampai ke kami!
              </p>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
