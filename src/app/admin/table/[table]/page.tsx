/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// import { AppSidebar } from "@/app/components/app-sidebar";
import { DataTable } from "@/app/components/data-table";
// import { SidebarInset, SidebarProvider } from "@/app/components/ui/sidebar";
// import { SiteHeader } from "@/app/components/site-header";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { showToast } from "@/app/components/ui/sonner";
import PageLoader from "@/app/components/Loader/PageLoader";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  getAllData,
  createData,
  updateData,
  deleteData,
} from "@/app/api/firebaseApi";
import { getColumnsForCategory } from "../../schemas/tableSchemas";
import { ItemForm } from "../../schemas/itemFormSchemas";
import { Button } from "@/app/components/ui/button";

export default function TablePage() {
  const params = useParams();
  const table = params.table as string;
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editData, setEditData] = useState<any | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState<any>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = (item: any) => {
    setDeletingItem(item);
    setDeleteDialogOpen(true);
  };
  // ambil columns generator dari schema
  const columnsGenerator = getColumnsForCategory(table);

  // handle edit
  const handleEdit = (item: any) => {
    const imageUrl: string | undefined =
      item.fotoProfil ||
      item.logoPartner ||
      item.fotoPortofolio ||
      item.fotoBlog;

      
    let imageKey: string | undefined;

    if (imageUrl) {
      const urlObj = new URL(imageUrl);
      imageKey = urlObj.pathname.split("/").pop(); // ambil key file
    }

    setEditData({
      ...item,
      imageKey,
      // imageKey: imageKey || "",
    });

    setIsFormOpen(true);
  };

  // handle delete
  const handleDelete = async () => {
    if (!deletingItem) return;

    setIsDeleting(true);

    try {
      const item = deletingItem;

      const imageUrl: string | undefined =
        item.fotoProfil ||
        item.logoPartner ||
        item.fotoPortofolio ||
        item.fotoBlog;

      if (imageUrl) {
        const urlObj = new URL(imageUrl);
        const key = urlObj.pathname.split("/").pop();
        if (key) {
          const res = await fetch(`/api/upload?key=${key}`, {
            method: "DELETE",
          });
          if (!res.ok) throw new Error("Gagal menghapus file dari server");
        }
      }

      await deleteData(table, item.id);

      const refreshed = await getAllData(table);
      setData(refreshed);

      setDeleteDialogOpen(false);
      showToast("Data berhasil dihapus!", "success");
    } catch (err) {
      console.error("Error deleting:", err);
      showToast("Gagal menghapus data!", "error");
    } finally {
      setIsDeleting(false);
      setDeletingItem(null);
    }
  };

  // generate kolom dari schema
  const columns = columnsGenerator
    ? columnsGenerator(handleEdit, confirmDelete)
    : [];

  // fetch data awal
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const result = await getAllData(table);
      setData(result);
      setLoading(false);
    }
    if (table) fetchData();
  }, [table]);

  if (loading) return <PageLoader />;

  if (!columnsGenerator) {
    return (
      <p className="p-6">
        Schema untuk tabel <strong>{table}</strong> belum didefinisikan.
      </p>
    );
  }

  return (
    <>
      {/* DataTable */}
      <DataTable
        data={data}
        columns={columns}
        onAdd={() => {
          setEditData(null); // form kosong
          setIsFormOpen(true);
        }}
      />

      {/* ItemForm untuk Add/Edit */}
      <ItemForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSave={async (item) => {
          try {
            if (item.id) {
              // update
              await updateData(table, item.id, item);
            } else {
              // create
              await createData(table, item);
            }

            // refresh data setelah simpan
            const refreshed = await getAllData(table);
            setData(refreshed);
            setEditData(null);
          } catch (err) {
            console.error("Error saving:", err);
          } finally {
            setIsFormOpen(false);
          }
        }}
        category={table}
        initialData={editData}
      />
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <p>Apakah Anda yakin ingin menghapus data ini?</p>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Menghapus..." : "Hapus"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
