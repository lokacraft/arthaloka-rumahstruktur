"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import call from "../../../public/icons/telpon.png";
import email from "../../../public/icons/email.png";
import instagram from "../../../public/icons/instagram.png";
import facebook from "../../../public/icons/facebook.png";
import twitter from "../../../public/icons/twitter.png";
import { FormData } from "@/types/mail-form";
import formDataSchema from "@/utils/validation/mail-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorDialog from "./ErrorDialog";
import SuccessDialog from "./SuccessDialog";
import { useForm } from "react-hook-form";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
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
    if (res.ok) {
      setShowSuccess(true);
      reset();
    } else {
      setShowError(true);
    }
  };

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  return (
    <div className="flex md:flex-row flex-col p-[4vh] lg:p-[15vh] bg-[#2F4F4F] font-clash gap-y-10 md:gap-x-[5vw] w-full items-start text-white">
      {/* BAGIAN KIRI */}
      <div className="flex flex-col w-full md:w-[55%] justify-start items-start gap-y-6 md:gap-y-8">
        <h2 className="text-[28px] lg:text-[44px] w-full font-medium leading-tight text-left">
          Diskusikan Kebutuhan <br />
          Proyek Anda Dengan Tim <br />
          Kami
        </h2>

        <p className="text-left text-[18px] lg:text-[28px] leading-snug md:leading-tight font-normal w-full">
          Telepon kami atau tinggalkan pertanyaan di formulir. Kami akan
          merespons Anda dalam 24 jam.
        </p>

        <div className="w-full space-y-4 md:space-y-6">
          <div className="flex flex-row w-full gap-3 md:gap-4 items-center">
            <Image src={call} alt="call" width={20} height={20} />
            <p className="text-[16px] lg:text-[20px] font-light">
              +62 895 322 351 532
            </p>
          </div>
          <div className="flex flex-row w-full gap-3 md:gap-4 items-center">
            <Image src={email} alt="email" width={20} height={20} />
            <p className="text-[16px] lg:text-[20px] font-light">
              contact@rumahstruktur.co.id
            </p>
          </div>
        </div>

        <p className="text-left text-[18px] lg:text-[28px] leading-snug md:leading-tight font-medium w-full">
          Ikuti Rumah Struktur Engineering di media sosial:
        </p>

        <div className="w-full flex flex-row gap-4 lg:gap-5 items-center">
          <Link href="https://www.instagram.com" aria-label="Visit Instagram">
            <Image
              src={instagram}
              alt="instagram"
              width={28}
              height={28}
              className="lg:w-[40px] lg:h-[40px]"
            />
          </Link>
          <Link href="https://www.facebook.com" aria-label="Visit Facebook">
            <Image
              src={facebook}
              alt="facebook"
              width={28}
              height={28}
              className="lg:w-[40px] lg:h-[40px]"
            />
          </Link>
          <Link href="https://www.x.com" aria-label="Visit X / Twitter">
            <Image
              src={twitter}
              alt="twitter"
              width={28}
              height={28}
              className="lg:w-[40px] lg:h-[40px]"
            />
          </Link>
        </div>
      </div>

      {/* BAGIAN KANAN */}
      <div className="w-full md:w-[60%] text-white">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-3 md:space-y-4"
        >
          <label className="text-[18px] md:text-[22px] font-light">Nama</label>
          <div>
            <input
              type="text"
              placeholder="Masukkan Nama Anda"
              {...register("nama")}
              aria-label="Masukkan Nama Anda"
              className="w-full border border-white bg-transparent rounded-md px-3 py-2 mt-1 md:mt-2 focus:outline-none"
              required
              autoComplete="given-name"
            />
            {errors.nama && (
              <span className="text-red-500">{errors.nama.message}</span>
            )}
          </div>

          <label className="text-[18px] md:text-[22px] font-light">Email</label>
          <div>
            <input
              type="email"
              placeholder="Masukkan Email Anda"
              {...register("email")}
              aria-label="Masukkan Email"
              className="w-full border border-white bg-transparent rounded-md px-3 py-2 mt-1 md:mt-2 focus:outline-none"
              required
              autoComplete="on"
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>

          <label className="text-[18px] md:text-[22px] font-light">
            Judul / Subjek Pesan
          </label>
          <div>
            <input
              type="text"
              placeholder="Masukkan Subjek Pesan"
              aria-label="Masukkan Judul Pesan"
              {...register("judul")}
              className="w-full border border-white bg-transparent rounded-md px-3 py-2 mt-1 md:mt-2 focus:outline-none"
            />
            {errors.judul && (
              <span className="text-red-500">{errors.judul.message}</span>
            )}
          </div>

          <label className="text-[18px] md:text-[22px] font-light">Pesan</label>
          <div>
            <textarea
              placeholder="Masukkan Pesan Anda"
              {...register("pesan")}
              aria-label="Masukkan Pesan"
              rows={4}
              className="w-full min-h-[100px] lg:min-h-[250px] border border-white bg-transparent rounded-md px-3 py-2 mt-1 md:mt-2 focus:outline-none"
              required
            />
            {errors.pesan && (
              <span className="text-red-500">{errors.pesan.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="bg-[#EAEAEA] text-[#008080] font-instrument text-[22px] lg:text-[32px] px-6 md:px-8 py-1 rounded-lg lg:rounded-2xl hover:bg-[#008080] hover:text-[#EAEAEA] transition-all duration-300"
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
