/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import Image from "next/image";
import "../../../app/components/admin/tiptap.css";
import { useState } from "react";

// Tipe data umum untuk props, bisa diperluas jika perlu
type Item = any;

const numberingColumn: ColumnDef<Item> = {
  id: "numbering",
  header: "No", // Header sesuai permintaan
  cell: ({ row }) => {
    // row.index memberikan indeks baris dari keseluruhan data (sebelum di-filter/sort)
    return <div className="text-muted-foreground">{row.index + 1}</div>;
  },
  enableSorting: false,
  enableHiding: false,
};

// Helper untuk menampilkan teks panjang di dalam dialog
const ViewTextDialog = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  if (typeof content !== "string" || content.length <= 50) {
    // Tampilkan teks biasa jika pendek
    return (
      <div className="text-sm text-muted-foreground">{content || "-"}</div>
    );
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="p-0 h-auto text-left text-blue-600 hover:underline"
        >
          Read full text
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <p className="py-4 text-sm text-muted-foreground whitespace-pre-wrap">
          {content}
        </p>
      </DialogContent>
    </Dialog>
  );
};

const ViewHtmlDialog = ({ title, html }: { title: string; html: string }) => {
  if (!html) return <div className="text-sm text-muted-foreground">-</div>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="p-0 h-auto text-left text-blue-600 hover:underline"
        >
          Preview Konten
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90%] overflow-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div
          className="tiptap prose prose-sm max-w-none dark:prose-invert py-4 overflow-scroll"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </DialogContent>
    </Dialog>
  );
};

// Helper untuk menampilkan gambar di dalam dialog
const ViewImageDialog = ({ src, alt }: { src: string; alt: string }) => {
  const [loading, setLoading] = useState(true);
  if (!src) return <div>No Image</div>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Open Image
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogTitle className="hidden" />
        <div className="relative aspect-video w-full mt-4">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-neutral-50 dark:bg-neutral-900">
              {/* Loader (CSS spinning circle) */}
              <div className="w-10 h-10 border-4 border-neutral-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Loading konten...
              </p>
            </div>
          )}
          <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            onLoadingComplete={() => setLoading(false)}
            // fallback sementara jika image gagal load
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/400x300?text=Image+Not+Found";
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Komponen terpisah untuk sel Actions (Edit/Delete)
const ActionsCell: React.FC<{
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
}> = ({ item, onEdit, onDelete }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="hidden">Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => onEdit(item)}>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => onDelete(item)}
          className="text-red-600"
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// --- DEFINISI KOLOM UNTUK SETIAP KATEGORI ---

// tabel partnerships
const getPartnershipsColumns = (
  onEdit: (item: Item) => void,
  onDelete: (item: Item) => void
): ColumnDef<Item>[] => [
  { accessorKey: "namaPartner", header: "Partner Name" },
  {
    accessorKey: "logoPartner",
    header: "Image",
    cell: ({ row }) => {
      const fileName = row.getValue("logoPartner") as string;
      return (
        <ViewImageDialog src={fileName} alt={row.getValue("namaPartner")} />
      );
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <ActionsCell item={row.original} onEdit={onEdit} onDelete={onDelete} />
    ),
  },
];

// tabel produk
const getTestimoniColumns = (
  onEdit: (item: Item) => void,
  onDelete: (item: Item) => void
): ColumnDef<Item>[] => [
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "profesi",
    header: "Profesi",
  },
  {
    accessorKey: "komentar",
    header: "Komentar",
    cell: ({ row }) => (
      <ViewTextDialog
        title={row.getValue("nama")}
        content={row.getValue("komentar")}
      />
    ),
  },
  {
    accessorKey: "fotoProfil",
    header: "Image",
    cell: ({ row }) => {
      const fileName = row.getValue("fotoProfil") as string;
      return <ViewImageDialog src={fileName} alt={row.getValue("nama")} />;
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <ActionsCell item={row.original} onEdit={onEdit} onDelete={onDelete} />
    ),
  },
];

// tabel achievements
const getPortofolioColumns = (
  onEdit: (item: Item) => void,
  onDelete: (item: Item) => void
): ColumnDef<Item>[] => [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "tag",
    header: "Tags",
    cell: ({ row }) => {
      const arr = row.getValue("tag") as string[] | string | undefined;
      if (!arr) return "-";
      if (Array.isArray(arr)) return <div>{arr.join(", ")}</div>;
      return <div>{String(arr)}</div>;
    },
  },
  {
    accessorKey: "fotoPortofolio",
    header: "Image",
    cell: ({ row }) => {
      const fileName = row.getValue("fotoPortofolio") as string;
      return <ViewImageDialog src={fileName} alt={row.getValue("title")} />;
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <ActionsCell item={row.original} onEdit={onEdit} onDelete={onDelete} />
    ),
  },
];

// tabel projek
// ganti fungsi getProjectsColumns dengan yang ini
const getBlogsColumns = (
  onEdit: (item: any) => void,
  onDelete: (item: any) => void
): ColumnDef<any>[] => [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "author",
    header: "Penulis",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "tag",
    header: "Tag Blog",
    cell: ({ row }) => {
      const arr = row.getValue("tag") as string[] | string | undefined;
      if (!arr) return "-";
      if (Array.isArray(arr)) return <div>{arr.join(", ")}</div>;
      return <div>{String(arr)}</div>;
    },
  },
  {
    accessorKey: "ringkasan",
    header: "Ringkasan",
    cell: ({ row }) => (
      <ViewTextDialog
        title={row.getValue("title")}
        content={row.getValue("ringkasan")}
      />
    ),
  },
  {
    accessorKey: "isiBlog",
    header: "Konten Blog",
    cell: ({ row }) => (
      <ViewHtmlDialog
        title={row.getValue("title")}
        html={row.getValue("isiBlog")}
      />
    ),
  },
  {
    accessorKey: "fotoBlog",
    header: "Image",
    cell: ({ row }) => {
      const fileName = row.getValue("fotoBlog") as string;
      return <ViewImageDialog src={fileName} alt={row.getValue("title")} />;
    },
  },
  {
    accessorKey: "tanggal",
    header: "Tanggal Publikasi",
    cell: ({ row }) => {
      const date = row.getValue("tanggal") as any;
      if (date && typeof date.toDate === "function") {
        return (
          <div>
            {date.toDate().toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        );
      }
      return <div>-</div>;
    },
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <ActionsCell item={row.original} onEdit={onEdit} onDelete={onDelete} />
    ),
  },
];

// Peta untuk menghubungkan nama kategori dari URL ke definisi kolomnya
const columnsFunctionsMap: Record<
  string,
  (
    onEdit: (item: Item) => void,
    onDelete: (item: Item) => void
  ) => ColumnDef<Item>[]
> = {
  partnerships: getPartnershipsColumns,
  blogs: getBlogsColumns,
  portofolio: getPortofolioColumns,
  testimoni: getTestimoniColumns,
};

// Fungsi utama untuk mendapatkan kolom yang benar
export function getColumnsForCategory(category: string) {
  return columnsFunctionsMap[category] || null;
}
