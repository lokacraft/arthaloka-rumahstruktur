/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/app/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { DatePicker } from "@/app/components/ui/date-picker";
import { Timestamp } from "firebase/firestore";
import TiptapEditor from "@/app/components/admin/TiptapEditor";
import { showToast } from "@/app/components/ui/sonner";
import { CheckCircle, XCircle, ImagePlus, Trash2, Eye } from "lucide-react";
import Image from "next/image";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/app/components/ui/select";

interface ItemData {
  id?: string;
  [key: string]: any;
}

interface ItemFormProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave: (item: ItemData) => void;
  category: string;
  initialData?: ItemData | null;
  editData?: { imageKey?: string }; // tambahkan prop editData
}

type FieldType =
  | "text"
  | "number"
  | "textarea"
  | "date"
  | "url"
  | "boolean"
  | "tags"
  | "image"
  | "imageArray"
  | "tiptap";

interface FieldSchema {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
}

// --- SKEMA BARU YANG SUDAH DISESUAIKAN DENGAN COLUMNS.TSX ANDA ---
const categorySchemas: Record<string, FieldSchema[]> = {
  partnerships: [
    {
      name: "namaPartner",
      label: "Nama Partner",
      type: "text",
      placeholder: "Nama Partner...",
    },
    { name: "logoPartner", label: "Logo Partner", type: "image" },
  ],
  portofolio: [
    {
      name: "title",
      label: "Title",
      type: "text",
      placeholder: "Judul Portofolio...",
    },
    {
      name: "slug",
      label: "Slug",
      type: "text",
      placeholder: "slug-portofolio...",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Deskripsi portofolio...",
    },
    {
      name: "tipePekerjaan",
      label: "Tipe Pekerjaan",
      type: "text",
      placeholder: "Contoh: Arsitektur, Konstruksi",
    },
    {
      name: "pekerjaan",
      label: "Pekerjaan",
      type: "text",
      placeholder: "Jenis pekerjaan...",
    },
    {
      name: "lokasi",
      label: "Lokasi",
      type: "text",
      placeholder: "Lokasi proyek...",
    },
    {
      name: "tag",
      label: "Tags (pisahkan koma)",
      type: "tags",
      placeholder: "Konstruksi, Hitung Struktur",
    },
    {
      name: "fotoPortofolio",
      label: "Foto Thumbnail",
      type: "image",
    },
    {
      name: "fotoDokumentasi",
      label: "Foto Dokumentasi",
      type: "imageArray", // untuk multiple images
    },
  ],
  testimoni: [
    {
      name: "nama",
      label: "Nama",
      type: "text",
      placeholder: "Nama...",
    },
    {
      name: "profesi",
      label: "Profesi",
      type: "text",
      placeholder: "Profesi User...",
    },
    {
      name: "komentar",
      label: "Komentar",
      type: "textarea",
      placeholder: "Komentar User...",
    },
    { name: "fotoProfil", label: "Foto User", type: "image" },
  ],
  blogs: [
    {
      name: "title",
      label: "Title",
      type: "text",
      placeholder: "Judul artikel...",
    },
    {
      name: "author",
      label: "Author",
      type: "text",
      placeholder: "Nama penulis...",
    },
    {
      name: "tanggal",
      label: "Tanggal",
      type: "date",
    },
    {
      name: "tag",
      label: "Tags (pisahkan koma / tekan Enter)",
      type: "tags",
      placeholder: "Konstruksi, Hitung Struktur",
    },
    { name: "slug", label: "Slug", type: "text" },
    {
      name: "ringkasan",
      label: "Ringkasan",
      type: "textarea",
      placeholder: "Ringkasan singkat artikel...",
    },
    {
      name: "isiBlog",
      label: "Isi Blog",
      type: "tiptap",
      placeholder: "",
    },
    {
      name: "fotoBlog",
      label: "Foto Cover Blog",
      type: "image",
    },
  ],
};

export const ItemForm = ({
  isOpen,
  onOpenChange,
  onSave,
  category,
  initialData,
  editData,
}: ItemFormProps) => {
  const [formData, setFormData] = useState<ItemData>({});
  const [isDragging, setIsDragging] = React.useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({});
    }
  }, [initialData, isOpen]);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true); // mulai loader

    try {
      // ambil schema untuk kategori ini
      const schema = categorySchemas[category] || [];
      const payload: Record<string, any> = {};

      for (const field of schema) {
        const val = formData[field.name];

        switch (field.type) {
          case "tags":
            payload[field.name] = Array.isArray(val)
              ? val
              : val
              ? String(val)
                  .split(",")
                  .map((s: string) => s.trim())
              : [];
            break;

          case "boolean":
            payload[field.name] = val === true;
            break;

          case "date":
            if (val instanceof Timestamp) {
              payload[field.name] = val;
            } else if (val instanceof Date) {
              payload[field.name] = Timestamp.fromDate(val);
            } else {
              payload[field.name] = null;
            }
            break;

            function getKeyFromUrl(url: string | undefined) {
              if (!url) return undefined;
              return url.split("/").pop(); // ambil bagian terakhir dari URL
            }

          case "imageArray":
            if (Array.isArray(val)) {
              const urls: string[] = [];

              for (const fileOrUrl of val) {
                if (fileOrUrl instanceof File) {
                  // Upload baru
                  const newKey = `${Date.now()}-${fileOrUrl.name}`;
                  const formDataUpload = new FormData();
                  formDataUpload.append("file", fileOrUrl);
                  formDataUpload.append("key", newKey);

                  const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formDataUpload,
                  });

                  if (!res.ok) throw new Error("Upload gagal");

                  const data = await res.json();
                  urls.push(data.url);
                } else if (typeof fileOrUrl === "string") {
                  // sudah berupa url → biarkan
                  urls.push(fileOrUrl);
                }
              }

              payload[field.name] = urls;
            } else {
              payload[field.name] = [];
            }
            break;

          case "image":
            if (val instanceof File) {
              if (isEditMode) {
                const oldKey =
                  editData?.imageKey ||
                  getKeyFromUrl(initialData?.[field.name]);

                const newKey = `${Date.now()}-${val.name}`;

                const formDataUpload = new FormData();
                formDataUpload.append("file", val);
                formDataUpload.append("key", newKey);

                if (oldKey) {
                  formDataUpload.append("oldKey", oldKey);
                }

                const res = await fetch("/api/upload", {
                  method: "PUT",
                  body: formDataUpload,
                });

                if (!res.ok)
                  throw new Error("Gagal mengganti file di Cloudflare");

                const data = await res.json();
                payload[field.name] = data.url; // update URL di Firebase
                if (!oldKey) {
                  // kalau key tidak tersedia, upload baru saja
                  const formDataUpload = new FormData();
                  formDataUpload.append("file", val);

                  const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formDataUpload,
                  });

                  if (!res.ok) throw new Error("Upload gagal");

                  const data = await res.json();
                  payload[field.name] = data.url;
                }
              } else {
                // --- UPLOAD BARU ---
                const formDataUpload = new FormData();
                formDataUpload.append("file", val);

                const res = await fetch("/api/upload", {
                  method: "POST",
                  body: formDataUpload,
                });

                if (!res.ok) throw new Error("Upload gagal");

                const data = await res.json();
                payload[field.name] = data.url;
              }
            } else {
              payload[field.name] = val || "";
            }
            break;

          default:
            payload[field.name] = val ?? "";
        }
      }

      // kalau edit, sertakan id
      if (isEditMode && formData.id) {
        payload.id = formData.id;
      }

      // langsung kirim ke parent (TablePage → firebaseApi)
      await onSave(payload);

      showToast("Data berhasil disimpan!", "success", <CheckCircle />);

      // tutup dialog
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      alert(`Error saving ${category}`);
      showToast("Gagal menyimpan data!", "error", <XCircle />);
    } finally {
      setIsSaving(false); // hentikan loader
    }
  };

  const fields = categorySchemas[category] || [];
  const isEditMode = !!initialData;

  const renderField = (field: FieldSchema) => {
    const value = formData[field.name];

    switch (field.type) {
      case "boolean": // <-- KASUS BARU UNTUK DROPDOWN BOOLEAN
        return (
          <Select
            value={value === true ? "true" : value === false ? "false" : ""}
            onValueChange={(val) => handleChange(field.name, val === "true")}
          >
            <SelectTrigger id={field.name} className="col-span-3">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">True</SelectItem>
              <SelectItem value="false">False</SelectItem>
            </SelectContent>
          </Select>
        );

      case "date":
        return (
          <DatePicker
            date={value ? (value as Timestamp).toDate() : undefined}
            setDate={(date) =>
              handleChange(field.name, date ? Timestamp.fromDate(date) : null)
            }
          />
        );
      case "textarea":
        return (
          <Textarea
            id={field.name}
            name={field.name}
            value={value || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="col-span-3"
            rows={4}
          />
        );
      case "number":
        return (
          <Input
            id={field.name}
            name={field.name}
            type="number"
            value={value || ""}
            onChange={(e) => handleChange(field.name, e.target.valueAsNumber)}
            placeholder={field.placeholder}
            className="col-span-3"
          />
        );

      case "tags": {
        return (
          <div className="col-span-3">
            <div className="flex flex-wrap gap-2 items-center border rounded p-2">
              {/* Render tag yang sudah ada */}
              {(Array.isArray(value) ? value : []).map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-[#008080]/20 text-[#121212] px-2 py-1 rounded-lg text-sm font-normal"
                >
                  {tag}
                </span>
              ))}

              {/* Input untuk tag baru */}
              <input
                type="text"
                id={field.name}
                defaultValue=""
                onKeyDown={(e) => {
                  const input = e.currentTarget;
                  const val = input.value;

                  // Jika tekan Backspace saat input kosong → ambil tag terakhir
                  if (e.key === "Backspace" && val === "") {
                    const currentTags = Array.isArray(value) ? [...value] : [];
                    if (currentTags.length > 0) {
                      const lastTag = currentTags.pop()!;
                      handleChange(field.name, currentTags);
                      input.value = lastTag; // masukkan kembali tag terakhir ke input
                      e.preventDefault();
                    }
                    return;
                  }

                  // Jika tekan Enter atau ketik koma → pecah tag
                  if (val.includes(",") || e.key === "Enter") {
                    const newTags = val
                      .split(",")
                      .map((t) => t.trim())
                      .filter((t) => t.length > 0);
                    if (newTags.length > 0) {
                      handleChange(field.name, [
                        ...(Array.isArray(value) ? value : []),
                        ...newTags,
                      ]);
                    }
                    input.value = ""; // reset input
                    e.preventDefault();
                  }
                }}
                placeholder={field.placeholder}
                className="flex-1 px-2 py-1 focus:outline-none"
              />
            </div>
          </div>
        );
      }

      case "tiptap":
        return (
          <div className="col-span-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  {value ? "Edit Isi Blog" : "Tulis Isi Blog"}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle>Editor Isi Blog</DialogTitle>
                </DialogHeader>
                <div className="h-[400px] overflow-y-auto">
                  <TiptapEditor
                    value={value || ""}
                    onChange={(val) => handleChange(field.name, val)}
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      onClick={() => {
                        // simpan value terakhir ke state sebelum tutup
                        handleChange(field.name, value || "");
                      }}
                    >
                      Simpan & Tutup
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        );

      case "image": {
        const fileOrString = value as File | string | undefined;
        const previewUrl =
          typeof fileOrString === "string"
            ? `${fileOrString}`
            : fileOrString
            ? URL.createObjectURL(fileOrString)
            : "";

        const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          setIsDragging(false);
          const file = e.dataTransfer.files?.[0];
          if (file) handleChange(field.name, file);
        };

        const onBrowseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const f = e.target.files?.[0];
          if (f) handleChange(field.name, f);
        };

        const prevent = (e: React.DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          setIsDragging(true);
        };

        const handleDragLeave = () => setIsDragging(false);

        const handleRemove = () => handleChange(field.name, undefined);

        return (
          <div className="col-span-3">
            <div
              onDrop={onDrop}
              onDragOver={prevent}
              onDragEnter={prevent}
              onDragLeave={handleDragLeave}
              className={`w-full border-2 border-dashed rounded-xl p-4 text-center transition relative overflow-hidden
          ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"} 
        `}
            >
              {!previewUrl ? (
                <>
                  <p className="text-sm text-muted-foreground">
                    Drag & drop gambar ke sini, atau
                  </p>
                  <div className="mt-2">
                    <input
                      id={field.name}
                      type="file"
                      accept="image/*"
                      onChange={onBrowseChange}
                      className="hidden"
                    />
                    <label htmlFor={field.name}>
                      <span className="inline-flex items-center px-4 py-2 rounded-lg border cursor-pointer">
                        Upload file
                      </span>
                    </label>
                  </div>
                  {isDragging && (
                    <div className="absolute inset-0 bg-blue-100/50 flex items-center justify-center pointer-events-none">
                      <p className="text-blue-600 font-semibold">
                        Drop file di sini
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="relative">
                  {/* Preview image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt="preview"
                    className="w-full max-h-60 object-contain rounded-md"
                  />
                  {/* Tombol hapus */}
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-sm rounded hover:bg-red-700"
                  >
                    Hapus
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      }

      case "imageArray": {
        const files = Array.isArray(value) ? value : [];

        const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          setIsDragging(false);
          const newFiles = Array.from(e.dataTransfer.files);
          if (newFiles.length > 0) {
            handleChange(field.name, [...files, ...newFiles]);
          }
        };

        const onBrowseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const newFiles = e.target.files ? Array.from(e.target.files) : [];
          if (newFiles.length > 0) {
            handleChange(field.name, [...files, ...newFiles]);
          }
        };

        const prevent = (e: React.DragEvent<HTMLDivElement>) => {
          e.preventDefault();
          setIsDragging(true);
        };

        const handleDragLeave = () => setIsDragging(false);

        const handleRemove = (index: number) => {
          const updated = [...files];
          updated.splice(index, 1);
          handleChange(field.name, updated);
        };

        return (
          <div className="col-span-3">
            <div
              onDrop={onDrop}
              onDragOver={prevent}
              onDragEnter={prevent}
              onDragLeave={handleDragLeave}
              className={`w-full border-2 border-dashed rounded-xl p-4 text-center transition relative overflow-hidden
          ${isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"} 
        `}
            >
              <p className="text-sm text-muted-foreground">
                Drag & drop gambar ke sini, atau klik untuk pilih file
              </p>
              <div className="mt-2">
                <input
                  id={field.name}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={onBrowseChange}
                  className="hidden"
                />
                <label htmlFor={field.name}>
                  <span className="inline-flex items-center px-4 py-2 rounded-lg border cursor-pointer">
                    Browse file
                  </span>
                </label>
              </div>

              {/* Daftar file yang sudah ditambahkan */}
              <div className="mt-4 space-y-2 text-left">
                {files.map((f, idx) => {
                  const name = f instanceof File ? f.name : f.split("/").pop();
                  const imgUrl = f instanceof File ? URL.createObjectURL(f) : f;

                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded-md relative group"
                    >
                      <div className="flex flex-row justify-center items-center gap-3">
                        <ImagePlus
                          className="stroke-1"
                          aria-label="Image File"
                        />
                        <span className="truncate text-sm">{name}</span>
                      </div>

                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition ml-2">
                        {/* Tombol Lihat */}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <button
                                    type="button"
                                    className="text-blue-600 hover:text-blue-800"
                                  >
                                    <Eye className="stroke-1" />
                                  </button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-xl">
                                  <div className="relative w-full aspect-video">
                                    <Image
                                      src={imgUrl}
                                      alt={name || "Preview"}
                                      fill
                                      className="object-contain rounded-lg"
                                    />
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Lihat gambar</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        {/* Tombol Hapus */}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                onClick={() => handleRemove(idx)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="stroke-1" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Hapus gambar</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      }

      default: // 'text', 'url'
        return (
          <Input
            id={field.name}
            name={field.name}
            type={field.type === "url" ? "url" : "text"}
            value={value || ""}
            onChange={(e) => handleChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className="col-span-3"
          />
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault(); // cegah close saat klik backdrop
        }}
        className="sm:max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit" : "Tambah"} Data {category.replace("1", "")}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          id="item-form"
          className="grid gap-4 py-4"
        >
          {fields.map((field) => (
            <div
              key={field.name}
              className="grid grid-cols-4 items-center gap-4"
            >
              <Label htmlFor={field.name} className="text-left">
                {field.label}
              </Label>
              {renderField(field)}
            </div>
          ))}
        </form>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="submit" form="item-form" disabled={isSaving}>
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-t-transparent border-gray-700 rounded-full animate-spin"></div>
            ) : (
              "Save changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
