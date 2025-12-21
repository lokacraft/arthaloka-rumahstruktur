"use client";

import React, { useState, useEffect } from "react";
import {
  collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import { Button } from "@/app/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Badge } from "@/app/components/ui/badge";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/app/components/ui/alert-dialog";
import { IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";
import Image from "next/image";
import { BlogDialog, BlogPost } from "@/app/components/admin/BlogDialog";
import { format } from "date-fns";

interface FirestoreBlog extends BlogPost {
  id: string;
}

export default function ManageBlogPage() {
  const [blogs, setBlogs] = useState<FirestoreBlog[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Dialog States
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // 1. Fetch Data Realtime
  useEffect(() => {
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ 
        id: doc.id, 
        ...doc.data() 
      })) as FirestoreBlog[];
      setBlogs(data);
      setLoading(false);
    }, (err) => {
      console.error(err);
      toast.error("Gagal memuat artikel blog");
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 2. CRUD Handlers
  const handleSave = async (data: BlogPost) => {
    try {
      if (selectedBlog?.id) {
        // Update
        await updateDoc(doc(db, "blogs", selectedBlog.id), { 
            ...data, 
            updatedAt: serverTimestamp() 
        });
        toast.success("Artikel berhasil diperbarui");
      } else {
        // Create
        await addDoc(collection(db, "blogs"), { 
            ...data, 
            createdAt: serverTimestamp(), 
            updatedAt: serverTimestamp(), 
            likes: 0 // Initial likes
        });
        toast.success("Artikel berhasil diterbitkan");
      }
    } catch (e) {
      console.error(e);
      toast.error("Gagal menyimpan artikel");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteDoc(doc(db, "blogs", deleteId));
      toast.success("Artikel dihapus");
      setDeleteId(null);
    } catch (e) {
      toast.error("Gagal menghapus artikel");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Blog & Artikel</h1>
          <p className="text-muted-foreground">Buat dan kelola konten artikel untuk pengunjung.</p>
        </div>
        <Button onClick={() => { setSelectedBlog(null); setIsDialogOpen(true); }}>
          <IconPlus className="mr-2 h-4 w-4" /> Tulis Artikel Baru
        </Button>
      </div>

      <div className="rounded-md border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Cover</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Penulis</TableHead>
              <TableHead>Tanggal</TableHead>
              <TableHead>Likes</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={7} className="h-24 text-center">Loading...</TableCell></TableRow>
            ) : blogs.length === 0 ? (
              <TableRow><TableCell colSpan={7} className="h-32 text-center text-muted-foreground">Belum ada artikel.</TableCell></TableRow>
            ) : (
              blogs.map(item => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="relative w-12 h-12 rounded overflow-hidden bg-gray-100 border">
                      {item.heroImage && <Image src={item.heroImage} alt={item.title} fill className="object-cover" />}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium max-w-[250px] truncate" title={item.title}>{item.title}</TableCell>
                  <TableCell><Badge variant="outline">{item.category}</Badge></TableCell>
                  <TableCell className="text-sm">{item.authorName}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {item.createdAt?.toDate().toLocaleDateString('id-ID') || "-"}
                  </TableCell>
                  <TableCell>{item.likes || 0}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="icon" onClick={() => { setSelectedBlog(item); setIsDialogOpen(true); }}>
                        <IconEdit size={16} />
                      </Button>
                      
                      <AlertDialog open={deleteId === item.id} onOpenChange={(open) => !open && setDeleteId(null)}>
                        <AlertDialogTrigger asChild><Button variant="destructive" size="icon" onClick={() => setDeleteId(item.id)}><IconTrash size={16}/></Button></AlertDialogTrigger>
                        <AlertDialogContent>
                           <AlertDialogHeader><AlertDialogTitle>Hapus Artikel?</AlertDialogTitle><AlertDialogDescription>Artikel ini akan dihapus permanen.</AlertDialogDescription></AlertDialogHeader>
                           <AlertDialogFooter>
                             <AlertDialogCancel>Batal</AlertDialogCancel>
                             <AlertDialogAction className="bg-red-600" onClick={handleDelete}>Hapus</AlertDialogAction>
                           </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <BlogDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        onSave={handleSave} 
        initialData={selectedBlog} 
      />
    </div>
  );
}