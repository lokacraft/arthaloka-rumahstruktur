"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Switch } from "@/app/components/ui/switch"; // Pastikan Anda sudah install switch: npx shadcn@latest add switch
import { toast } from "sonner";
import { AtSign, Instagram, Phone, Youtube, Smartphone, Mail } from "lucide-react";
import { BsFacebook, BsTwitterX } from "react-icons/bs";

// Tipe Data Kontak
export interface ContactData {
  id?: string;
  emailAddress: string;
  instagramAccount: string; // URL atau Username
  whatsAppNumber: string; // Nomor (e.g., 62812...)
  facebookAccount?: string; // URL Channel
  xAccount?: string; // Opsional
  isActive: boolean;
  createdAt?: any;
  updatedAt?: any;
}

interface ContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: ContactData) => Promise<void>;
  initialData?: ContactData | null;
}

export function ContactDialog({
  open,
  onOpenChange,
  onSave,
  initialData,
}: ContactDialogProps) {
  const [formData, setFormData] = useState<ContactData>({
    emailAddress: "",
    instagramAccount: "",
    whatsAppNumber: "",
    facebookAccount: "",
    xAccount: "",
    isActive: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset/Set Form Data
  useEffect(() => {
    if (initialData && open) {
      setFormData(initialData);
    } else if (open) {
      setFormData({
        emailAddress: "",
        instagramAccount: "",
        whatsAppNumber: "",
        facebookAccount: "",
        xAccount: "",
        isActive: false,
      });
    }
  }, [initialData, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, isActive: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi Sederhana
    if (!formData.emailAddress || !formData.whatsAppNumber) {
      toast.error("EmailAddress dan WhatsApp wajib diisi.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(formData);
      toast.success(initialData ? "Kontak diperbarui" : "Kontak ditambahkan");
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast.error("Gagal menyimpan kontak");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Kontak" : "Tambah Kontak Baru"}</DialogTitle>
          <DialogDescription>
            Masukkan detail kontak perusahaan. Aktifkan "Status Aktif" untuk menampilkannya di website.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="py-4 space-y-5">
          {/* EmailAddress */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2"><Mail className="w-4 h-4" /> Email Resmi</Label>
            <Input name="emailAddress" type="email" value={formData.emailAddress} onChange={handleChange} placeholder="info@rumahstruktur.com" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {/* WhatsApp */}
            <div className="space-y-2">
                <Label className="flex items-center gap-2"><Smartphone className="w-4 h-4" /> No. WhatsApp</Label>
                <Input name="whatsAppNumber" type="tel" value={formData.whatsAppNumber} onChange={handleChange} placeholder="628xx..." />
                <p className="text-[10px] text-muted-foreground">Gunakan format internasional (62...)</p>
            </div>

            {/* Telepon Kantor (Opsional) */}
            <div className="space-y-2">
                <Label className="flex items-center gap-2"><BsFacebook className="w-4 h-4" /> Facebook (opsional)</Label>
                <Input name="facebookAccount" type="text" value={formData.facebookAccount} onChange={handleChange} placeholder="(0274) ..." />
            </div>
          </div>

          {/* Social Media */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label className="flex items-center gap-2"><Instagram className="w-4 h-4" /> Link Instagram</Label>
                <Input name="instagramAccount" value={formData.instagramAccount} onChange={handleChange} placeholder="https://instagramAccount.com/..." />
            </div>
            <div className="space-y-2">
                <Label className="flex items-center gap-2"><BsTwitterX className="w-4 h-4" /> Link X/Twitter (Opsional)</Label>
                <Input name="xAccount" value={formData.xAccount} onChange={handleChange} placeholder="https://x.com/..." />
            </div>
          </div>

          {/* Status Switch */}
          <div className="flex items-center justify-between rounded-lg border p-4 bg-gray-50">
            <div className="space-y-0.5">
              <Label className="text-base">Status Aktif</Label>
              <p className="text-sm text-muted-foreground">
                Jika diaktifkan, kontak ini akan menggantikan kontak aktif sebelumnya.
              </p>
            </div>
            <Switch
              checked={formData.isActive}
              onCheckedChange={handleSwitchChange}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>Batal</Button>
            <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Menyimpan..." : "Simpan"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}