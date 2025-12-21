"use client";

import React, { useCallback, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import { IconCloudUpload, IconX } from "@tabler/icons-react";
import Image from "next/image";
import { toast } from "sonner";
import { getSignedUploadUrl } from "@/actions/upload"; // Import Server Action

interface ImageDropzoneProps {
  value: string | string[];
  onChange: (url: string | string[]) => void;
  multiple?: boolean;
  label?: string;
  aspectRatio?: string;
}

export function ImageDropzone({
  value,
  onChange,
  multiple = false,
  label = "Upload Gambar",
  aspectRatio = "aspect-square",
}: ImageDropzoneProps) {
  const [uploading, setUploading] = useState(false);

  // Helper untuk preview
  const previews = Array.isArray(value) ? value : value ? [value] : [];

  const onDrop = useCallback(
    async (acceptedFiles: FileWithPath[]) => {
      if (acceptedFiles.length === 0) return;

      setUploading(true);
      const uploadedUrls: string[] = [];

      // Proses upload parallel
      await Promise.all(
        acceptedFiles.map(async (file) => {
          try {
            // 1. Minta Presigned URL dari Server Action
            const session = await getSignedUploadUrl(file.name, file.type);
            
            if (!session.success || !session.signedUrl || !session.publicUrl) {
              throw new Error(session.error || "Gagal inisialisasi upload");
            }

            // 2. Upload LANGSUNG ke Cloudflare R2 menggunakan PUT
            const uploadRes = await fetch(session.signedUrl, {
              method: "PUT",
              body: file,
              headers: {
                "Content-Type": file.type,
              },
            });

            if (!uploadRes.ok) {
              throw new Error("Gagal mengunggah ke storage");
            }

            // 3. Simpan URL publik
            uploadedUrls.push(session.publicUrl);
            
          } catch (err: any) {
            console.error(err);
            toast.error(`Gagal upload ${file.name}: ${err.message}`);
          }
        })
      );

      setUploading(false);

      // Update state parent
      if (uploadedUrls.length > 0) {
        if (multiple) {
          onChange([...(value as string[]), ...uploadedUrls]);
        } else {
          onChange(uploadedUrls[0]);
        }
        toast.success("Gambar berhasil diunggah!");
      }
    },
    [multiple, onChange, value]
  );

  const removeImage = (indexToRemove: number) => {
    if (multiple && Array.isArray(value)) {
      const newValue = value.filter((_, idx) => idx !== indexToRemove);
      onChange(newValue);
    } else {
      onChange("");
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".png", ".jpg", ".webp", "jfif"] },
    multiple,
    disabled: uploading || (!multiple && previews.length > 0),
  });

  return (
    <div className="space-y-3">
      <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </span>

      {/* Drop Area */}
      {(!previews.length || multiple) && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors hover:border-primary/50 hover:bg-accent/50 ${
            isDragActive ? "border-primary bg-accent" : "border-muted-foreground/25"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            {uploading ? (
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <p className="text-xs animate-pulse">Mengunggah ke Cloudflare...</p>
              </div>
            ) : (
              <>
                <IconCloudUpload className="h-8 w-8" />
                <p className="text-xs">
                  {isDragActive
                    ? "Lepaskan file di sini"
                    : multiple
                    ? "Drag & drop beberapa gambar atau klik"
                    : "Drag & drop gambar banner atau klik"}
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Preview Grid */}
      {previews.length > 0 && (
        <div className={`grid grid-cols-3 gap-4 mt-4`}>
          {previews.map((url, idx) => (
            <div
              key={idx}
              className={`relative group rounded-md overflow-hidden border bg-gray-100 ${aspectRatio}`}
            >
              <Image
                src={url}
                alt="Preview"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <IconX className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}