"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Interface untuk Contact Data
export interface ContactData {
  whatsAppNumber: string;
  ctaWhatsAppMessage: string | "Halo! Saya ingin bertanya tentang layanan Rumah Struktur.";
  emailAddress: string;
  instagramAccount?: string;
  facebookAccount?: string;
  xAccount?: string;
  address?: string;
  isActive: boolean;
}

// Interface untuk Context
interface ContactContextType {
  contactData: ContactData | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

// Buat Context
const ContactContext = createContext<ContactContextType | undefined>(undefined);

// Provider Component
export function ContactProvider({ children }: { children: ReactNode }) {
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContactData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const contactsRef = collection(db, "contacts");
      const q = query(contactsRef, where("isActive", "==", true));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data() as ContactData;
        setContactData(docData);
      } else {
        setError("No active contact found");
        setContactData(null);
      }
    } catch (err) {
      console.error("Error fetching contact data:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch contact data");
      setContactData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContactData();
  }, []);

  const refetch = async () => {
    await fetchContactData();
  };

  return (
    <ContactContext.Provider value={{ contactData, isLoading, error, refetch }}>
      {children}
    </ContactContext.Provider>
  );
}

// Custom Hook untuk menggunakan Contact Context
export function useContact() {
  const context = useContext(ContactContext);
  
  if (context === undefined) {
    throw new Error("useContact must be used within a ContactProvider");
  }
  
  return context;
}

// Helper function untuk sanitasi nomor WhatsApp
export function sanitizeWhatsAppNumber(number: string): string {
  let sanitized = number.replace(/\D/g, "");
  if (sanitized.startsWith("0")) {
    sanitized = "62" + sanitized.slice(1);
  }
  return sanitized;
}

// Helper function untuk validasi URL
export function isValidUrl(url: string | undefined): boolean {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}