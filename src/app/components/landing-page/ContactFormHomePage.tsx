"use client";

// import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import konsultasi from "../../../../public/contactform/konsultasi.png";
import dukungan from "../../../../public/contactform/dukungan.png";
import presisi from "../../../../public/contactform/presisi.png";
import { FormData } from "@/types/mail-form";
import formDataSchema from "@/utils/validation/mail-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorDialog from "../ErrorDialog";
import SuccessDialog from "../SuccessDialog";
import { useState } from "react";

export default function ContactFormHomePage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting},
  } = useForm<FormData>({
    resolver: zodResolver(formDataSchema),
  });

  const onSubmit = async (formData: FormData) => {
    const res = await fetch("/api/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    // const result = await res.json();
    if (res.ok){
      setShowSuccess(true)
      reset()
    }else{
      setShowError(true)
    }
  };

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

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
          onSubmit={handleSubmit(onSubmit)}
          className="order-2 lg:order-1 space-y-4 w-full lg:w-[50%]"
        >
          <label className="text-[18px] sm:text-[20px] lg:text-[22px] font-light">
            Nama
          </label>
          <div>
            <input
              type="text"
              placeholder="Masukkan Nama Anda"
              {...register("nama")}
              aria-label="Masukkan Nama Anda"
              className="w-full border border-white bg-transparent rounded-md px-3 py-2 mt-2 focus:outline-none"
              required
              autoComplete="given-name"
            />
            {errors.nama && (
              <span className="text-red-500">{errors.nama.message}</span>
            )}
          </div>
          <label className="text-[18px] sm:text-[20px] lg:text-[22px] font-light">
            Email
          </label>
          <div>
            <input
              type="email"
              placeholder="Masukkan Email Anda"
              {...register("email")}
              aria-label="Masukkan Email"
              className="w-full border border-white bg-transparent rounded-md px-3 py-2 mt-2 focus:outline-none"
              required
              autoComplete="on"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <label className="text-[18px] sm:text-[20px] lg:text-[22px] font-light">
            Judul / Subjek Pesan
          </label>
          <div>
            <input
              type="text"
              placeholder="Masukkan Subjek Pesan"
              aria-label="Masukkan Judul Pesan"
              {...register("judul")}
              className="w-full border border-white bg-transparent rounded-md px-3 py-2 mt-2 focus:outline-none"
              autoComplete="on"
            />
            {errors.judul && (
              <span className="text-red-500">{errors.judul.message}</span>
            )}
          </div>
          <label className="text-[18px] sm:text-[20px] lg:text-[22px] font-light">
            Pesan
          </label>
          <div>
            <textarea
              placeholder="Masukkan Pesan Anda"
              {...register("pesan")}
              aria-label="Masukkan Pesan"
              rows={4}
              className="w-full min-h-[200px] border border-white bg-transparent rounded-md px-3 py-2 mt-2 focus:outline-none"
              required
            />
            {errors.pesan && (
              <span className="text-red-500">{errors.pesan.message}</span>
            )}
          </div>

          <button
            type="submit"
            aria-label="Kirim Pesan"
            className="bg-[#EAEAEA] cursor-pointer text-[#008080] font-instrument text-[24px] sm:text-[28px] lg:text-[32px] px-8 py-2 rounded-2xl hover:bg-[#008080] hover:text-[#EAEAEA] transition-all duration-300"
          >
            {isSubmitting ? "Mengirim Pesan..." : "Kirim Pesan →"}
          </button>
        </form>
      </div>
      <SuccessDialog open={showSuccess} onClose={() => setShowSuccess(false)} />
      <ErrorDialog open={showError} onClose={() => setShowError(false)} />
    </div>
  );
}
