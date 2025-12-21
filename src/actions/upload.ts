"use server";

import { r2 } from "@/lib/r2"; // Gunakan konfigurasi r2 yang sudah ada
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "crypto";

export async function getSignedUploadUrl(fileName: string, fileType: string) {
  try {
    // Buat nama file unik
    const uniqueId = randomUUID().substring(0, 8);
    const sanitizedFileName = fileName.replace(/\s/g, "_");
    const key = `${Date.now()}_${uniqueId}_${sanitizedFileName}`;

    // Siapkan perintah upload
    const command = new PutObjectCommand({
      Bucket: process.env.CF_R2_BUCKET,
      Key: key,
      ContentType: fileType,
    });

    // Dapatkan URL yang sudah ditandatangani (berlaku 60 detik)
    const signedUrl = await getSignedUrl(r2, command, { expiresIn: 60 });
    
    // URL publik untuk mengakses file nanti
    const publicUrl = `${process.env.CF_R2_PUBLIC_URL}/${key}`;

    return { success: true, signedUrl, publicUrl };
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return { success: false, error: "Gagal membuat sesi upload" };
  }
}