"use client";

import { useState } from "react";
import Image from "next/image";
import konsultasi from "../../../../public/contactform/konsultasi.png";
import dukungan from "../../../../public/contactform/dukungan.png";
import presisi from "../../../../public/contactform/presisi.png";

export default function ContactFormHomePage() {
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
    <div className="flex flex-col lg:flex-col p-[8vh] sm:p-[6vh] bg-[#2F4F4F] font-clash gap-y-10 w-full items-start text-left text-white">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row w-full relative justify-start items-start lg:items-center gap-6">
        <h2 className="text-[32px] sm:text-[38px] lg:text-[44px] font-medium leading-tight lg:w-[40%]">
          Diskusikan Kebutuhan <br />
          Proyek Anda
        </h2>
        <p className="text-[20px] sm:text-[24px] lg:text-[28px] font-light leading-tight">
          Isi formulir di bawah ini dan tim ahli kami akan segera <br />
          menghubungi Anda kembali, maksimal dalam 24 jam.
        </p>
      </div>

      {/* Form & Info Section */}
      <div className="w-full text-white flex flex-col lg:flex-row gap-12 mt-10">
        {/* Info Section (naik ke atas saat small) */}
        <div className="order-1 lg:order-2 flex flex-col justify-start space-y-12 items-start lg:items-center mt-0 w-full lg:w-[50%]">
          {/* Konsultasi */}
          <div className="flex flex-row justify-start items-center gap-6 sm:gap-10">
            <div className="size-12 sm:size-16 relative">
              <Image
                src={konsultasi}
                alt="konsultasi gratis"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-[22px] sm:text-[28px] lg:text-[32px] font-medium leading-tight">
                Konsultasi Gratis
              </h1>
              <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal leading-tight">
                Punya ide proyek? Mari diskusikan kebutuhan <br />
                teknis Anda bersama tim ahli kami, tanpa biaya.
              </p>
            </div>
          </div>

          {/* Dukungan */}
          <div className="flex flex-row justify-start items-center gap-6 sm:gap-10">
            <div className="size-12 sm:size-16 relative">
              <Image
                src={dukungan}
                alt="dukungan penuh"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-[22px] sm:text-[28px] lg:text-[32px] font-medium leading-tight">
                Dukungan Penuh
              </h1>
              <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal leading-tight">
                Kami selalu siap membantu Anda di setiap tahap <br />
                proyek hingga selesai.
              </p>
            </div>
          </div>

          {/* Presisi */}
          <div className="flex flex-row justify-start items-center gap-6 sm:gap-10">
            <div className="size-12 sm:size-16 relative">
              <Image
                src={presisi}
                alt="presisi tinggi"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-[22px] sm:text-[28px] lg:text-[32px] font-medium leading-tight">
                Presisi Tinggi
              </h1>
              <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal leading-tight">
                Setiap detail dikerjakan dengan standar terbaik <br />
                demi hasil yang akurat dan optimal.
              </p>
            </div>
          </div>
        </div>

        {/* Form (turun ke bawah saat small) */}
        <form
          onSubmit={handleSubmit}
          className="order-2 lg:order-1 space-y-4 w-full lg:w-[50%]"
        >
          <label className="text-[18px] sm:text-[20px] lg:text-[22px] font-light">
            Nama
          </label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            className="w-full border border-white bg-transparent rounded-md px-3 py-2 mt-2 focus:outline-none"
            required
          />
          <label className="text-[18px] sm:text-[20px] lg:text-[22px] font-light">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-white bg-transparent rounded-md px-3 py-2 mt-2 focus:outline-none"
            required
          />
          <label className="text-[18px] sm:text-[20px] lg:text-[22px] font-light">
            Judul Pesan
          </label>
          <input
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleChange}
            className="w-full border border-white bg-transparent rounded-md px-3 py-2 mt-2 focus:outline-none"
          />
          <label className="text-[18px] sm:text-[20px] lg:text-[22px] font-light">
            Pesan
          </label>
          <textarea
            name="pesan"
            value={formData.pesan}
            onChange={handleChange}
            rows={4}
            className="w-full min-h-[200px] border border-white bg-transparent rounded-md px-3 py-2 mt-2 focus:outline-none"
            required
          />

          <button
            type="submit"
            className="bg-[#EAEAEA] text-[#008080] font-instrument text-[24px] sm:text-[28px] lg:text-[32px] px-8 py-2 rounded-2xl hover:bg-[#008080] hover:text-[#EAEAEA] transition-all duration-300"
          >
            Kirim Pesan →
          </button>
        </form>
      </div>
    </div>
  );
}
