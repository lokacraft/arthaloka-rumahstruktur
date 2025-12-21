"use client";

import React, { useState, useEffect } from "react";
import {
  collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, writeBatch, where, getDocs
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/app/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
import { Badge } from "@/app/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/app/components/ui/alert-dialog";
import { IconEdit, IconTrash, IconPlus, IconPhone, IconBrandWhatsapp, IconBrandInstagram } from "@tabler/icons-react";
import { ContactDialog, ContactData } from "@/app/components/admin/ContactDialog";

interface FirestoreContact extends ContactData {
  id: string;
}

export default function ManageContactPage() {

  const [contacts, setContacts] = useState<FirestoreContact[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Dialog States
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<ContactData | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // --- 1. FETCH DATA ---
  useEffect(() => {
    const q = query(collection(db, "contacts"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as FirestoreContact[];
      setContacts(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // --- 2. LOGIKA SIMPAN (Single Active Contact) ---
  const handleSave = async (data: ContactData) => {
    const batch = writeBatch(db);

    try {
      // JIKA SET AKTIF: Nonaktifkan semua kontak lain terlebih dahulu
      if (data.isActive) {
        const activeQuery = query(collection(db, "contacts"), where("isActive", "==", true));
        const activeSnap = await getDocs(activeQuery);
        
        activeSnap.forEach((docSnap) => {
          // Jangan matikan diri sendiri jika sedang edit
          if (docSnap.id !== selectedContact?.id) {
             const ref = doc(db, "contacts", docSnap.id);
             batch.update(ref, { isActive: false });
          }
        });
      }

      if (selectedContact?.id) {
        // UPDATE
        const docRef = doc(db, "contacts", selectedContact.id);
        batch.update(docRef, { ...data, updatedAt: serverTimestamp() });
        await batch.commit();
        toast.success("Kontak diperbarui.");
      } else {
        // CREATE (Batch create agak beda, jadi kita commit dulu yang update, lalu addDoc)
        await batch.commit(); 
        await addDoc(collection(db, "contacts"), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
        toast.success("Kontak baru ditambahkan.");
      }
    } catch (e) {
      console.error(e);
      toast.error("Gagal menyimpan kontak.");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteDoc(doc(db, "contacts", deleteId));
      toast.success("Kontak dihapus.");
      setDeleteId(null);
    } catch (e) {
      toast.error("Gagal menghapus.");
    }
  };

  // Filter Data untuk Tab
  const activeContact = contacts.find(c => c.isActive);

  // Render Table Helper
  const renderTable = (data: FirestoreContact[]) => (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>WhatsApp</TableHead>
            <TableHead>Instagram</TableHead>
            <TableHead>Facebook</TableHead>
            <TableHead>X Platform(Twitter)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow><TableCell colSpan={5} className="h-24 text-center">Tidak ada data.</TableCell></TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.emailAddress}</TableCell>
                <TableCell>{item.whatsAppNumber}</TableCell>
                <TableCell className="max-w-[150px] truncate">{item.instagramAccount}</TableCell>
                <TableCell className="max-w-[150px] truncate">{item.facebookAccount}</TableCell>
                <TableCell className="max-w-[150px] truncate">{item.xAccount}</TableCell>
                <TableCell>
                  {item.isActive ? <Badge className="bg-green-600">Aktif</Badge> : <Badge variant="outline">Non-Aktif</Badge>}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => { setSelectedContact(item); setIsDialogOpen(true); }}>
                      <IconEdit size={16} />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => setDeleteId(item.id)}>
                      <IconTrash size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );

  if ( loading) return <div className="p-8 text-center">Memuat...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Manajemen Kontak</h1>
          <p className="text-muted-foreground">Kelola informasi kontak yang tampil di website.</p>
        </div>
        <Button onClick={() => { setSelectedContact(null); setIsDialogOpen(true); }}>
          <IconPlus className="mr-2 h-4 w-4" /> Tambah Kontak
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">Semua Kontak</TabsTrigger>
          <TabsTrigger value="active">Kontak Aktif</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Daftar Semua Kontak</CardTitle>
              <CardDescription>Riwayat semua data kontak yang pernah dibuat.</CardDescription>
            </CardHeader>
            <CardContent>{renderTable(contacts)}</CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Kontak Aktif Saat Ini</CardTitle>
              <CardDescription>Informasi ini yang sedang ditampilkan kepada pengunjung.</CardDescription>
            </CardHeader>
            <CardContent>
              {activeContact ? (
                <div className="grid grid-cols-1 md:grid-cols-1">
                   <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                      <div className="flex items-center gap-2 mb-4">
                        <Badge className="bg-green-600">Sedang Tayang</Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                          <div className="flex justify-between border-b pb-2">
                             <span className="text-gray-500">Email:</span>
                             <span className="font-medium">{activeContact.emailAddress}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                             <span className="text-gray-500">WhatsApp:</span>
                             <span className="font-medium">{activeContact.whatsAppNumber}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                             <span className="text-gray-500">Facebook:</span>
                             <span className="font-medium">{activeContact.facebookAccount || "-"}</span>
                          </div>
                           <div className="flex justify-between border-b pb-2">
                             <span className="text-gray-500">Instagram:</span>
                             <span className="font-medium truncate max-w-[200px]">{activeContact.instagramAccount}</span>
                          </div>
                           <div className="flex justify-between border-b pb-2">
                             <span className="text-gray-500">X Platform:</span>
                             <span className="font-medium truncate max-w-[200px]">{activeContact.xAccount}</span>
                          </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                         <Button size="sm" variant="outline" onClick={() => { setSelectedContact(activeContact); setIsDialogOpen(true); }}>
                            Edit Kontak Ini
                         </Button>
                      </div>
                   </div>
                   
                   {/* Preview Card Sederhana */}
                   {/* <div className="flex flex-col gap-4 justify-center items-center p-8 border rounded-lg bg-gray-900 text-white text-center">
                      <p>Preview Tampilan Footer (Sederhana)</p>
                      <div className="flex gap-4">
                          <IconBrandInstagram className="w-6 h-6" />
                          <IconBrandWhatsapp className="w-6 h-6" />
                          <IconPhone className="w-6 h-6" />
                      </div>
                      <p className="text-sm text-gray-300">{activeContact.email}</p>
                   </div> */}
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground border-2 border-dashed rounded-lg">
                  Belum ada kontak yang diaktifkan. Silakan edit salah satu kontak di tab "Semua Kontak" dan aktifkan.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ContactDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        onSave={handleSave} 
        initialData={selectedContact} 
      />

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
           <AlertDialogHeader><AlertDialogTitle>Hapus Kontak?</AlertDialogTitle><AlertDialogDescription>Data akan dihapus permanen.</AlertDialogDescription></AlertDialogHeader>
           <AlertDialogFooter>
             <AlertDialogCancel>Batal</AlertDialogCancel>
             <AlertDialogAction className="bg-red-600" onClick={handleDelete}>Hapus</AlertDialogAction>
           </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}