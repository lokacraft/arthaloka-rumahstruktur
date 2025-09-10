// src/app/api/sendEmail/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// === CONFIG TRANSPORTER ===
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USERNAME, // email admin / pengirim default
    pass: process.env.SMTP_PASSWORD, // app password gmail
  },
});

export async function POST(req: Request) {
  try {
    const { nama, email, judul, pesan } = await req.json();

    if (!nama || !email || !judul || !pesan) {
      return NextResponse.json(
        { error: "Semua field wajib diisi." },
        { status: 400 }
      );
    }

    // === EMAIL 1: Kirim ke Admin ===
    await transporter.sendMail({
      from: `"${nama}" <${process.env.SMTP_USERNAME}>`, // tampil di email admin
      to: process.env.MAIL_RECEIVER_ADDRESS, // inbox admin
      replyTo: email, // jika admin klik "balas", akan ke email user
      subject: `Pesan baru dari ${nama}: ${judul}`,
      html: `
        <h3>Ada pesan baru dari website:</h3>
        <p><b>Nama:</b> ${nama}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Judul:</b> ${judul}</p>
        <p><b>Pesan:</b><br/>${pesan}</p>
      `,
    });

    // === EMAIL 2: Konfirmasi ke User ===
    await transporter.sendMail({
      from: `"Rumah Struktur" <${process.env.SMTP_USERNAME}>`,
      to: email, // inbox user
      subject: "Konfirmasi: Pesan Anda sudah kami terima",
      html: `
        <p>Halo <b>${nama}</b>,</p>
        <p>Terima kasih sudah menghubungi kami. Berikut salinan pesan Anda:</p>
        <blockquote>${pesan}</blockquote>
        <p>Tim kami akan segera membalas dalam 24 jam.</p>
        <hr/>
        <small>Email ini dikirim otomatis, jangan balas langsung ke alamat ini.</small>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error sending email:", err);
    return NextResponse.json(
      { error: "Gagal mengirim email" },
      { status: 500 }
    );
  }
}
