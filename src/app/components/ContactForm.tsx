"use client";

import { useState } from "react";
import Image from "next/image";

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
    <div className="flex flex-col p-[15vh] bg-[#2F4F4F] gap-10 items-start font-clash">
      <div className="flex flex-row justify-start gap-x-[10vw] w-full items-start text-left text-white">
        <h2 className="text-[48px] font-medium leading-tight">
          Diskusikan Kebutuhan <br />
          Proyek Anda
        </h2>
        <p className="text-[28px] font-light mt-4 leading-tight">
          Isi formulir di bawah ini dan tim ahli kami akan segera <br />
          menghubungi Anda kembali, maksimal dalam 24 jam.
        </p>
      </div>
      <div className="flex flex-row gap-x-[5vw]">
        {/* Bagian Kiri */}
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
              className="w-full border border-white bg-transparent rounded-md px-3 py-2 mt-2 focus:outline-none"
              required
            />

            <button
              type="submit"
              className="bg-[#EAEAEA] relative text-[#008080] text-[32px] px-8 py-1 rounded-2xl hover:bg-[#008080] hover:text-[#EAEAEA] transition-all duration-300"
            >
              Kirim Pesan →
            </button>
          </form>
        </div>

        {/* Bagian Kanan */}
        <div className="flex flex-col gap-y-16 w-[49%] ">
          <div className="flex justify-start items-center gap-8  relative">
            <div className="h-full flex justify-center items-center w-[12%] relative ">
              <Image
                src="/contactform/konsultasi.png"
                alt="Konsultasi Gratis"
                layout="fill"
                className="object-contain"
              />
            </div>
            <div className="w-[79%]">
              <h3 className="font-medium text-[32px] text-white ">
                Konsultasi Gratis
              </h3>
              <p className="text-[20px] font-light text-white text-justify">
                Punya ide proyek? Mari kita diskusikan kebutuhan Anda bersama
                tim ahli kami, tanpa biaya.
              </p>
            </div>
          </div>

          <div className="flex justify-start items-center gap-8  relative">
            <div className="h-full flex justify-center items-center w-[12%] relative ">
              <Image
                src="/contactform/dukungan.png"
                alt="Konsultasi Gratis"
                layout="fill"
                className="object-contain"
              />
            </div>
            <div className="w-[79%]">
              <h3 className="font-medium text-[32px] text-white ">
                Dukungan Penuh
              </h3>
              <p className="text-[20px] font-light text-white text-justify">
                Tim kami berdedikasi penuh untuk mendukung setiap kebutuhan
                proyek Anda.
              </p>
            </div>
          </div>

          <div className="flex justify-start items-center gap-8  relative">
            <div className="h-full flex justify-center items-center w-[12%] relative ">
              <Image
                src="/contactform/presisi.png"
                alt="Konsultasi Gratis"
                layout="fill"
                className="object-contain"
              />
            </div>
            <div className="w-[79%]">
              <h3 className="font-medium text-[32px] text-white ">
                Presisi & Akurasi
              </h3>
              <p className="text-[20px] font-light text-white text-justify">
                Dengan perhitungan yang presisi, kami memastikan hasil akhir
                proyek sesuai standar tertinggi dan ekspektasi Anda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
