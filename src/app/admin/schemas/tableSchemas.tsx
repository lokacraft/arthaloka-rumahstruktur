/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, FileEdit, Trash2 } from "lucide-react";
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
          Preview
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

// Helper untuk menampilkan banyak gambar di dalam dialog (scrollable)
const ViewImageArrayDialog = ({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) => {
  const [loading, setLoading] = useState(true);

  if (!images || images.length === 0) return <div>No Images</div>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Open All Images
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogTitle className="hidden" />
        <div className="flex flex-col gap-6 py-4">
          {images.map((src, i) => (
            <div key={i} className="relative aspect-video w-full">
              {loading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-neutral-50 dark:bg-neutral-900">
                  <div className="w-10 h-10 border-4 border-neutral-400 border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    Loading konten...
                  </p>
                </div>
              )}
              <Image
                src={src}
                alt={`${alt} - ${i + 1}`}
                fill
                className="object-contain"
                onLoadingComplete={() => setLoading(false)}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://via.placeholder.com/400x300?text=Image+Not+Found";
                }}
              />
            </div>
          ))}
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
        <DropdownMenuItem onClick={() => onEdit(item)} className="justify-between">
          Edit <FileEdit className="stroke-1 text-black" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => onDelete(item)}
          className="text-red-600 justify-between"
        >
          Delete
          <Trash2 className="stroke-1 text-red-600"/>
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
    header: "Gambar",
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
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => <div>{row.getValue("slug") || "-"}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <ViewTextDialog
        title={row.getValue("title")}
        content={row.getValue("description")}
      />
    ),
  },
  {
    accessorKey: "tipePekerjaan",
    header: "Tipe Pekerjaan",
    cell: ({ row }) => <div>{row.getValue("tipePekerjaan") || "-"}</div>,
  },
  {
    accessorKey: "pekerjaan",
    header: "Pekerjaan",
    cell: ({ row }) => <div>{row.getValue("pekerjaan") || "-"}</div>,
  },
  {
    accessorKey: "lokasi",
    header: "Lokasi",
    cell: ({ row }) => <div>{row.getValue("lokasi") || "-"}</div>,
  },
  {
    accessorKey: "fotoPortofolio",
    header: "Thumbnail",
    cell: ({ row }) => {
      const fileName = row.getValue("fotoPortofolio") as string;
      return <ViewImageDialog src={fileName} alt={row.getValue("title")} />;
    },
  },
  {
    accessorKey: "fotoDokumentasi",
    header: "Additional Images",
    cell: ({ row }) => {
      const imgs = row.getValue("fotoDokumentasi") as string[] | undefined;
      if (!imgs || imgs.length === 0) return "-";
      return (
        <div className="flex gap-2">
          <ViewImageArrayDialog images={imgs} alt="Foto Dokumentasi" />
        </div>
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

//table kategori portofolio
const getPortofolioCategoryColumns = (
  onEdit: (item: Item) => void,
  onDelete: (item: Item) => void
): ColumnDef<Item>[] => [
  {
    accessorKey: "name",
    header: "Nama Kategori",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <ActionsCell item={row.original} onEdit={onEdit} onDelete={onDelete} />
    ),
  },
];

//table engineer
const getTeamColumns = (
  onEdit: (item: Item) => void,
  onDelete: (item: Item) => void
): ColumnDef<Item>[] => [
  {
    accessorKey: "imageUrl",
    header: "Avatar",
    cell: ({ row }) => {
      const fileName = row.getValue("imageUrl") as string;
      return (
        <ViewImageDialog src={fileName} alt={row.getValue("name")} />
      );
    },
  },
  {
    accessorKey: "name",
    header: "Nama",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "layananId",
    header: "Kategori Layanan",
  },
  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => (
      <ActionsCell item={row.original} onEdit={onEdit} onDelete={onDelete} />
    ),
  },
];

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
  portofolioCategory: getPortofolioCategoryColumns,
  testimoni: getTestimoniColumns,
  teams: getTeamColumns,
};

// Fungsi utama untuk mendapatkan kolom yang benar
export function getColumnsForCategory(category: string) {
  return columnsFunctionsMap[category] || null;
}
