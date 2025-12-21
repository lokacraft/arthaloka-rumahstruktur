"use client";

import React, {useState, useEffect} from "react";
import Image from "next/image";
import call from "/public/icons/telpon.png";
import email from "/public/icons/email.png";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import Logo from "../../../public/images/logoFooter.png"
interface ContactData {
  whatsAppNumber: string;
  emailAddress: string;
  instagramAccount?: string;
  facebookAccount?: string;
  xAccount?: string;
}

const Footer = () => {
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [loadingContact, setLoadingContact] = useState(true);
  
useEffect(() => {
    const fetchContactData = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        const q = query(contactsRef, where("isActive", "==", true));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data() as ContactData;
          setContactData(docData);
        }
      } catch (error) {
        console.error("Error fetching contact data:", error);
      } finally {
        setLoadingContact(false);
      }
    };

    fetchContactData();
  }, []);


  const numberFormatter = (number: string)  => {
    if (contactData) {
      let whatsappNumber = contactData.whatsAppNumber.replace(/\D/g, "");
            if (whatsappNumber.startsWith("0")) {
              whatsappNumber = "62" + whatsappNumber.slice(1);
            }
      return whatsappNumber;
    }

  }

  return (
    <div className="w-full relative bg-[#008080] font-clash text-white">
      {/* ========== DESKTOP (lg & xl) ========== */}
      <div className="hidden lg:flex flex-col p-[12vh]">
        <div className="flex flex-row space-x-[5rem] w-full justify-start items-start">
          {/* ALAMAT */}
          <div className="flex flex-col gap-2 text-left justify-start items-start">
            <h2 className="text-[32px] font-semibold">Alamat</h2>
            <p className="text-[20px] font-normal leading-relaxed">
              Jl. R.A.A Martanegara No. 56,
              <br />
              Kel. Turangga, Kec. Lengkong, <br />
              Kota Bandung
            </p>
          </div>
          {/* INFORMASI */}
          <div className="flex flex-col text-left gap-2 items-start">
            <h2 className="text-[32px] font-semibold">Informasi</h2>
            <a href="" className="hover:underline text-[20px] font-normal">
              Tentang Kami
            </a>
            <a href="" className="hover:underline text-[20px] font-normal">
              Hubungi Kami
            </a>
            <a href="" className="hover:underline text-[20px] font-normal">
              Portofolio
            </a>
          </div>
          {/* LAYANAN */}
          <div className="flex flex-col text-left gap-2 items-start">
            <h2 className="text-[32px] font-semibold">Layanan</h2>
            <a href="" className="hover:underline text-[20px] font-normal">
              Jasa Hitung Struktur
            </a>
            <a href="" className="hover:underline text-[20px] font-normal">
              Jasa Analisis Geoteknik
            </a>
            <a href="" className="hover:underline text-[20px] font-normal">
              Jasa Soil Investigation
            </a>
            <a href="" className="hover:underline text-[20px] font-normal">
              Analisis Perkuatan Struktur
            </a>
            <a href="" className="hover:underline text-[20px] font-normal">
              Mekanikal, Elektrikal, dan Plumbing
            </a>
            <a href="" className="hover:underline text-[20px] font-normal">
              Analisis Geometrik Jalan Raya
            </a>
          </div>
          {/* DUKUNGAN */}
          <div className="flex flex-col text-left gap-2 items-start">
            <h2 className="text-[32px] font-semibold">Dukungan</h2>
            <a href="" className="hover:underline text-[20px] font-normal">
              Blog
            </a>
            <a href="" className="hover:underline text-[20px] font-normal">
              FAQ
            </a>
            <a href="" className="hover:underline text-[20px] font-normal">
              Kebijakan Privasi
            </a>
          </div>
        </div>

        {/* KONTAK */}
        {contactData && (
          <div className="flex flex-row w-full gap-10 mt-[8rem] items-center justify-between">
            <div className="flex flex-row gap-10">
              <Link target="_blank" href={`https://wa.me/${numberFormatter(contactData.whatsAppNumber)}`} className="flex flex-row gap-3 items-center">
                <Image src={call} alt="" width={20} height={20} />
                <p className="text-[20px] font-normal">+{contactData.whatsAppNumber}</p>
              </Link>
              <Link target="_blank" href={`mailto:${contactData.emailAddress}`} className="flex flex-row gap-3 items-center">
                <Image src={email} alt="" width={20} height={20} />
                <p className="text-[20px] font-normal">
                  {contactData.emailAddress}
                </p>
              </Link>
            </div>
            {/* LOGO */}
            <div className="text-xl font-bold">
              <Image src={Logo} alt="Rumah Struktur Logo" width={1500} height={750} className="w-[150px]" />
            </div>
          </div>
        )}
      </div>

      {/* ========== MOBILE & TABLET (md, sm, xs) ========== */}
      <div className="flex lg:hidden flex-col p-[4vh] gap-10">
        {/* LOGO */}
        <div className="flex justify-start">
          <Image src={Logo} alt="Rumah Struktur Logo" width={1500} height={750} className="w-[150px]" />
          {/* placeholder logo */}
        </div>
        <div className="flex flex-row w-full justify-between gap-20 items-start">
          {/* ALAMAT */}
          <div className="flex flex-col gap-2 text-left">
            <h2 className="text-[24px] font-semibold">Alamat</h2>
            <p className="text-[18px] font-normal leading-relaxed">
              Jl. R.A.A Martanegara No. 56,
              <br />
              Kel. Turangga, Kec. Lengkong, <br />
              Kota Bandung
            </p>
          </div>
          {/* INFORMASI */}
          <div className="flex flex-col gap-2 text-left w-[40%]">
            <h2 className="text-[24px] font-semibold">Informasi</h2>
            <a href="" className="hover:underline text-[18px] font-normal">
              Tentang Kami
            </a>
            <a href="" className="hover:underline text-[18px] font-normal">
              Hubungi Kami
            </a>
            <a href="" className="hover:underline text-[18px] font-normal">
              Portofolio
            </a>
          </div>
        </div>

        <div className="flex flex-row w-full justify-between gap-20 items-start">
          {/* LAYANAN */}
          <div className="flex flex-col gap-2 text-left">
            <h2 className="text-[24px] font-semibold">Layanan</h2>
            <a href="" className="hover:underline text-[18px] font-normal">
              Jasa Hitung Struktur
            </a>
            <a href="" className="hover:underline text-[18px] font-normal">
              Jasa Analisis Geoteknik
            </a>
            <a href="" className="hover:underline text-[18px] font-normal">
              Jasa Soil Investigation
            </a>
            <a href="" className="hover:underline text-[18px] font-normal">
              Analisis Perkuatan Struktur
            </a>
            <a href="" className="hover:underline text-[18px] font-normal">
              Mekanikal, Elektrikal, dan Plumbing
            </a>
            <a href="" className="hover:underline text-[18px] font-normal">
              Analisis Geometrik Jalan Raya
            </a>
          </div>

          {/* DUKUNGAN */}
          <div className="flex flex-col gap-2 text-left w-[40%]">
            <h2 className="text-[24px] font-semibold">Dukungan</h2>
            <a href="" className="hover:underline text-[18px] font-normal">
              Blog
            </a>
            <a href="" className="hover:underline text-[18px] font-normal">
              FAQ
            </a>
            <a href="" className="hover:underline text-[18px] font-normal">
              Kebijakan Privasi
            </a>
          </div>
        </div>

        {/* KONTAK */}
        {contactData && (
          <div className="flex flex-col gap-4 mt-6">
            <Link target="_blank" href={`https://wa.me/${numberFormatter(contactData.whatsAppNumber)}`} className="flex flex-row gap-3 items-center">
                <Image src={call} alt="" width={20} height={20} />
                <p className="text-[20px] font-normal">+{contactData.whatsAppNumber}</p>
              </Link>
              <Link target="_blank" href={`mailto:${contactData.emailAddress}`} className="flex flex-row gap-3 items-center">
                <Image src={email} alt="" width={20} height={20} />
                <p className="text-[20px] font-normal">
                  {contactData.emailAddress}
                </p>
              </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Footer;
