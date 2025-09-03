"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import call from "../../../public/icons/telpon.png";
import email from "../../../public/icons/email.png";
import instagram from "../../../public/icons/instagram.png";
import facebook from "../../../public/icons/facebook.png";
import twitter from "../../../public/icons/twitter.png";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    judul: "",
    pesan: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Kirim data ke API route Anda, misalnya ke /api/contact
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Pesan berhasil dikirim!");
        setFormData({ nama: "", email: "", judul: "", pesan: "" });
      } else {
        alert("Gagal mengirim pesan.");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan.");
    }
  };

  return (
    <div className="flex flex-row p-[15vh] bg-[#2F4F4F] font-clash justify-start gap-x-[5vw] w-full items-start text-left text-white">
      <div className="flex flex-col w-[58%] relative justify-start items-center gap-y-8">
        <h2 className="text-[44px] w-full font-medium leading-tight">
          Diskusikan Kebutuhan <br />
          Proyek Anda Dengan Tim <br />
          Kami
        </h2>
        {/* Bagian Kiri */}

        <p className="text-left text-[28px] leading-tight font-normal w-full">
          Telepon kami atau tinggalkan pertanyaan di <br />
          formulir. Kami akan merespons Anda dalam <br />
          24 jam.
        </p>
        <div className="w-full space-y-6">
          <div className="flex flex-row w-full gap-4 justify-start items-center">
            <Image src={call} alt="call" width={20} height={20} />
            <p className="text-[20px] font-light">+62 895 322 351 532</p>
          </div>
          <div className="flex flex-row w-full gap-4 justify-start items-center">
            <Image src={email} alt="email" width={20} height={20} />
            <p className="text-[20px] font-light">
              contact@rumahstruktur.co.id
            </p>
          </div>
        </div>
        <p className="text-left text-[28px] leading-tight font-medium w-full">
          Ikuti Rumah Struktur Engineering di media sosial:
        </p>
        <div className="w-full flex flex-row gap-5 justify-start items-center">
          <Link href="/">
            <Image src={instagram} alt="instagram" width={40} height={40} />
          </Link>
          <Link href="/">
            <Image src={facebook} alt="facebook" width={40} height={40} />
          </Link>
          <Link href="/">
            <Image src={twitter} alt="twitter" width={40} height={40} />
          </Link>
        </div>
      </div>
      {/* BAGIAN KANAN */}
      <div className="w-[60%] text-white">
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="text-[22px] font-light">Nama</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="w-full border border-white bg-transparent rounded-md px-3 py-2 mt-2 focus:outline-none"
            required
          />
          <label className="text-[22px] pb-4 font-light">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-white bg-transparent rounded-md px-3 py-2 mt-2 focus:outline-none"
            required
          />
          <label className="text-[22px] pb-4 font-light">Judul Pesan</label>
          <input
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            className="w-full border border-white bg-transparent rounded-md px-3 py-2 mt-2 focus:outline-none"
          />
          <label className="text-[22px] pb-4 font-light">Pesan</label>
          <textarea
            name="pesan"
            value={formData.pesan}
            onChange={handleChange}
            rows={4}
            className="w-full min-h-[250px] border border-white bg-transparent rounded-md px-3 py-2 mt-2 focus:outline-none"
            required
          />

          <button
            type="submit"
            className="bg-[#EAEAEA] relative text-[#008080] font-instrument text-[32px] px-8 py-1 rounded-2xl hover:bg-[#008080] hover:text-[#EAEAEA] transition-all duration-300"
          >
            Kirim Pesan →
          </button>
        </form>
      </div>
    </div>
  );
}
