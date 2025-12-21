"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/app/components/ui/select";
import { toast } from "sonner";
import { ImageDropzone } from "./ImageDropzone";
import { RichTextEditor } from "./RichTextEditor";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

// --- TIPE DATA BLOG ---
export interface BlogPost {
  id?: string;
  title: string;
  slug: string; // Field Slug
  subtitle: string;
  category: string;
  
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  
  readTime: string;
  heroImage: string;
  content: string;
  
  likes: number;
  createdAt?: any;
  updatedAt?: any;
}

interface BlogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (blog: BlogPost) => Promise<void>;
  initialData?: BlogPost | null;
}

// Helper untuk membuat slug dasar
const createSlug = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Hapus karakter non-alphanumeric
    .replace(/[\s_-]+/g, "-") // Ganti spasi/underscore dengan dash
    .replace(/^-+|-+$/g, ""); // Hapus dash di awal/akhir
};

export function BlogDialog({
  open,
  onOpenChange,
  onSave,
  initialData,
}: BlogDialogProps) {
  // State Form
  const [formData, setFormData] = useState<BlogPost>({
    title: "", slug: "", subtitle: "", category: "",
    authorName: "", authorRole: "", authorAvatar: "",
    readTime: "", heroImage: "", content: "",
    likes: 0
  });

  const [categories, setCategories] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);
    const [portfolioCategories, setPortfolioCategories] = useState<{id: string, name: string}[]>([]);

  // Fetch Kategori
  useEffect(() => {
    const fetchCats = async () => {
      try {
        const snap = await getDocs(collection(db, "potofolioCategory"));
        setCategories(snap.docs.map(doc => doc.data().name));
      } catch (e) { console.error(e); }
    };
    fetchCats();
  }, []);

  // Setup Form Data
  useEffect(() => {
    if (initialData && open) {
      setFormData(initialData);
      setIsSlugManuallyEdited(true); // Jika edit, slug dianggap sudah fix
    } else if (open) {
      setFormData({
        title: "", slug: "", subtitle: "", category: "",
        authorName: "Admin Rumah Struktur",
        authorRole: "Editor",
        authorAvatar: "",
        readTime: "5 min read",
        heroImage: "",
        content: "",
        likes: 0
      });
      setIsSlugManuallyEdited(false);
    }
  }, [initialData, open]);

  // Handler Judul -> Slug Otomatis
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setFormData(prev => ({
      ...prev,
      title: newTitle,
      // Update slug otomatis hanya jika user belum mengedit slug secara manual
      slug: isSlugManuallyEdited ? prev.slug : createSlug(newTitle)
    }));
  };

  // Handler Slug Manual
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, slug: createSlug(e.target.value) }));
    setIsSlugManuallyEdited(true);
  };

  // Fungsi Cek Unik Slug (Recursive / Loop check)
  const generateUniqueSlug = async (baseSlug: string, currentId?: string) => {
    let uniqueSlug = baseSlug;
    let counter = 1;
    let isUnique = false;

    while (!isUnique) {
      // Cek apakah slug ini sudah ada di database
      const q = query(
        collection(db, "blogs"), 
        where("slug", "==", uniqueSlug),
        limit(1)
      );
      const snap = await getDocs(q);

      // Jika tidak ada hasil, berarti unik
      // ATAU jika hasil yang ditemukan adalah dokumen yang sedang kita edit sendiri
      if (snap.empty || (currentId && snap.docs[0].id === currentId)) {
        isUnique = true;
      } else {
        // Jika ada duplikat, tambahkan counter dan coba lagi (misal: judul-1, judul-2)
        uniqueSlug = `${baseSlug}-${counter}`;
        counter++;
      }
    }
    return uniqueSlug;
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content || !formData.heroImage || !formData.slug) {
      toast.error("Judul, Slug, Konten, dan Gambar Utama wajib diisi.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      // 1. Pastikan Slug Unik sebelum menyimpan
      const finalSlug = await generateUniqueSlug(formData.slug, initialData?.id);
      
      // 2. Simpan dengan slug yang sudah dipastikan unik
      await onSave({
        ...formData,
        slug: finalSlug
      });

      setIsSubmitting(false);
      onOpenChange(false);
    } catch (error) {
      console.error("Error saving blog:", error);
      toast.error("Gagal menyimpan. Terjadi kesalahan saat memvalidasi slug.");
      setIsSubmitting(false);
    }
  };
  useEffect(() => {
    const fetchCats = async () => {
      const q = query(collection(db, "portofolioCategory"));
      const snapshot = await getDocs(q);
      setPortfolioCategories(snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name })));
    };
    fetchCats();
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] h-[95vh] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>{initialData ? "Edit Artikel Blog" : "Tulis Artikel Baru"}</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-1 px-6 py-4 h-[80%]">
          <div className="space-y-6">
            
            {/* 1. Header Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Judul Artikel</Label>
                    <Input value={formData.title} onChange={handleTitleChange} placeholder="Judul yang menarik..." />
                </div>
                <div className="space-y-2">
                    <Label>Slug (URL)</Label>
                    <div className="relative">
                      <Input 
                        value={formData.slug} 
                        onChange={handleSlugChange} 
                        placeholder="judul-artikel-anda" 
                        className="pl-16" 
                      />
                      <span className="absolute left-3 top-2.5 text-xs text-muted-foreground font-mono">/blog/</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground">Slug akan di-generate otomatis dari judul, namun bisa diedit.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Kategori</Label>
                    <Select value={formData.category} onValueChange={val => setFormData({...formData, category: val})}>
                        <SelectTrigger><SelectValue placeholder="Pilih Kategori" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Berita">Berita</SelectItem>
                            <SelectItem value="Edukasi">Edukasi</SelectItem>
                            <SelectItem value="Event">Event</SelectItem>
                            <SelectItem value="Soil Investigation">Soil Investigation</SelectItem>
                                            <SelectItem value="Perkuatan Bangunan">Perkuatan Bangunan</SelectItem>
                                            <SelectItem value="Mekanikal Elektrikal Plumbing">Mekanikal Elektrikal Plumbing</SelectItem>
                                            <SelectItem value="Jasa Hitung Struktur">Jasa Hitung Struktur</SelectItem>
                                            <SelectItem value="Geometrik Jalan Raya">Geometrik Jalan Raya</SelectItem>
                                            <SelectItem value="Analisis Geoteknik">Analisis Geoteknik</SelectItem>
                            {/* Render kategori dari DB jika ada */}
                            {portfolioCategories.map((c, idx) => <SelectItem key={idx} value={c.name}>{c.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                   <Label>Estimasi Baca</Label>
                   <Input value={formData.readTime} onChange={e => setFormData({...formData, readTime: e.target.value})} placeholder="5 min read" />
                </div>
            </div>

            <div className="space-y-2">
                <Label>Sub-Judul (Ringkasan)</Label>
                <Textarea value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} rows={2} placeholder="Deskripsi singkat artikel..." />
            </div>

            {/* 2. Hero Image */}
            <div className="space-y-2">
                <Label>Gambar Utama (Hero Image)</Label>
                <ImageDropzone 
                    value={formData.heroImage} 
                    onChange={url => setFormData({...formData, heroImage: url as string})}
                    label="Upload Banner Artikel"
                    aspectRatio="aspect-[21/9]"
                />
            </div>

            {/* 3. Editor Konten */}
            <div className="space-y-2">
                <Label>Konten Artikel</Label>
                <RichTextEditor 
                    value={formData.content} 
                    onChange={(html) => setFormData({...formData, content: html})}
                />
            </div>

            {/* 4. Info Penulis & Avatar Dropzone */}
            <div className="p-4 bg-gray-50 rounded-lg border space-y-4">
                <Label className="text-base font-semibold">Informasi Penulis</Label>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                    {/* Avatar Upload (Menggunakan ImageDropzone) */}
                    <div className="space-y-2 md:col-span-1">
                        <Label className="text-xs">Foto Profil Penulis</Label>
                        <div className="w-32 mx-auto md:w-full">
                           <ImageDropzone 
                              value={formData.authorAvatar}
                              onChange={url => setFormData({...formData, authorAvatar: url as string})}
                              label="Upload Foto"
                              aspectRatio="aspect-square"
                           />
                        </div>
                    </div>

                    {/* Detail Penulis */}
                    <div className="md:col-span-3 space-y-4">
                        <div className="space-y-2">
                            <Label className="text-xs">Nama Penulis</Label>
                            <Input value={formData.authorName} onChange={e => setFormData({...formData, authorName: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-xs">Role / Jabatan</Label>
                            <Input value={formData.authorRole} onChange={e => setFormData({...formData, authorRole: e.target.value})} />
                        </div>
                    </div>
                </div>
            </div>

          </div>
        </ScrollArea>

        <DialogFooter className="px-6 py-4 border-t bg-gray-50">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>Batal</Button>
          <Button onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? "Menyimpan..." : "Publikasikan Artikel"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}