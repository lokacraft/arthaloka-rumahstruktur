// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.CF_R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CF_R2_SECRET_ACCESS_KEY!,
  },
});

// --- UPLOAD FILE ---
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const key = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;

    await client.send(
      new PutObjectCommand({
        Bucket: process.env.CF_R2_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: file.type || "application/octet-stream",
      })
    );

    const publicUrl = `${process.env.CF_R2_PUBLIC_URL}/${key}`;

    return NextResponse.json({ url: publicUrl, key });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

// --- EDIT / REPLACE FILE ---
export async function PUT(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const key = formData.get("key") as string | null;
    const oldKey = formData.get("oldKey") as string | null;

    if (!file || !key) return NextResponse.json({ error: "File and key are required" }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (oldKey) {
      try {
        await client.send(
          new DeleteObjectCommand({
            Bucket: process.env.CF_R2_BUCKET!,
            Key: oldKey,
          })
        );
        console.log(`Old file deleted: ${oldKey}`);
      } catch (err) {
        console.warn(`Failed to delete old file: ${oldKey}`, err);
      }
    }

    // Replace existing file (sama key)
    await client.send(
      new PutObjectCommand({
        Bucket: process.env.CF_R2_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: file.type || "application/octet-stream",
      })
    );

    const publicUrl = `${process.env.CF_R2_PUBLIC_URL}/${key}`;
    return NextResponse.json({ url: publicUrl, key });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Edit failed" }, { status: 500 });
  }
}

// --- DELETE FILE ---
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");
    if (!key) return NextResponse.json({ error: "Key is required" }, { status: 400 });

    await client.send(
      new DeleteObjectCommand({
        Bucket: process.env.CF_R2_BUCKET,
        Key: key,
      })
    );

    return NextResponse.json({ message: "File deleted successfully", key });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
