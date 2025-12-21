"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, ArrowRight, Loader2 } from "lucide-react";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function CTAWhatsAppButton() {
  const [whatsappNumber, setWhatsappNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Fetch WhatsApp number dari Firebase
  useEffect(() => {
    const fetchWhatsAppNumber = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        const q = query(contactsRef, where("isActive", "==", true));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          let number = docData.whatsAppNumber;
          
          // Sanitasi nomor
          number = number.replace(/\D/g, "");
          if (number.startsWith("0")) {
            number = "62" + number.slice(1);
          }
          
          setWhatsappNumber(number);
        }
      } catch (error) {
        console.error("Error fetching WhatsApp number:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWhatsAppNumber();
  }, []);

  const handleClick = () => {
    if (!whatsappNumber) return;
    
    const message = "Halo! Saya ingin bertanya tentang layanan Rumah Struktur.";
    const waUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank");
  };

  if (isLoading || !whatsappNumber) {
    return null;
  }

  return (
    <motion.div
      className="fixed right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 z-50"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      {/* Tooltip/Label */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.8 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap"
          >
            <div className="bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200 relative z-40">
              <p className="text-sm font-semibold text-gray-800">Chat via WhatsApp</p>
              {/* Arrow pointer */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
                <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[8px] border-l-white"></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative group cursor-pointer"
      >
        {/* Pulse Animation Background */}
        <motion.div
          className="absolute inset-0 bg-green-500 rounded-full"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Button Container */}
        <motion.div
          className="relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br cursor-pointer from-green-400 to-green-600 rounded-full shadow-2xl flex items-center justify-center overflow-hidden"
          animate={isHovered ? {
            boxShadow: [
              "0 10px 40px rgba(34, 197, 94, 0.4)",
              "0 15px 50px rgba(34, 197, 94, 0.6)",
              "0 10px 40px rgba(34, 197, 94, 0.4)",
            ],
          } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {/* WhatsApp Icon with Animation */}
          <AnimatePresence mode="wait">
            {!isPressed ? (
              <motion.div
                key="whatsapp-icon"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
              >
                <AiOutlineWhatsApp className="w-7 h-7 md:w-8 md:h-8 text-white" fill="currentColor" />
              </motion.div>
            ) : (
              <motion.div
                key="arrow-icon"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
              >
                <ArrowRight className="w-7 h-7 md:w-8 md:h-8 text-white z-30" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sparkle Effects on Hover */}
          <AnimatePresence>
            {isHovered && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full"
                    initial={{
                      x: 0,
                      y: 0,
                      scale: 0,
                      opacity: 1,
                    }}
                    animate={{
                      x: Math.cos((i * Math.PI * 2) / 6) * 30,
                      y: Math.sin((i * Math.PI * 2) / 6) * 30,
                      scale: [0, 1, 0],
                      opacity: [1, 1, 0],
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Hover Ring Effect */}
        <motion.div
          className="absolute inset-0 border-2 border-green-400 rounded-full"
          initial={{ scale: 1, opacity: 0 }}
          animate={isHovered ? {
            scale: [1, 1.2, 1.4],
            opacity: [0.6, 0.3, 0],
          } : {
            scale: 1,
            opacity: 0,
          }}
          transition={{
            duration: 1.5,
            repeat: isHovered ? Infinity : 0,
            ease: "easeOut",
          }}
        />
      </motion.button>

      {/* Floating Arrows on Hover */}
      <AnimatePresence>
        {isHovered && (
          <>
            <motion.div
              initial={{ opacity: 0, x: -20, y: -10 }}
              animate={{ 
                opacity: [0, 1, 0],
                x: [-20, -35, -50],
                y: -10,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute right-full top-1/2 -translate-y-1/2"
            >
              <ArrowRight className="w-5 h-5 text-green-500" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20, y: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                x: [-20, -35, -50],
                y: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.2,
              }}
              className="absolute right-full top-1/2 -translate-y-1/2"
            >
              <ArrowRight className="w-5 h-5 text-green-500" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20, y: 10 }}
              animate={{ 
                opacity: [0, 1, 0],
                x: [-20, -35, -50],
                y: 10,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.4,
              }}
              className="absolute right-full top-1/2 -translate-y-1/2"
            >
              <ArrowRight className="w-5 h-5 text-green-500" />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}