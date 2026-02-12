"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowUpRight } from "lucide-react";

type Partnership = {
  logoPartner: string;
  namaPartner: string;
};

export default function PartnerShowcase() {
  const [logos, setLogos] = useState<Partnership[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPartnerships = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "partnerships"));
        const data: Partnership[] = [];
        querySnapshot.forEach((doc) => {
          const docData = doc.data();
          data.push({
            logoPartner: docData.logoPartner || "",
            namaPartner: docData.namaPartner || "",
          });
        });
        setLogos(data);
      } catch (err) {
        console.error("Error fetching partnerships:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPartnerships();
  }, []);

  return (
    <section className="py-12 px-6 md:px-12 lg:mx-[15vh] mx-[4vh] font-clash my-[15vh] md:my-[20vh] lg:my-[25vh]">
      {/* Heading */}
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[54px] font-medium text-black leading-tight">
          Beberapa <span className="text-[#008080]">Klien</span> yang Sudah{" "}
          <br className="hidden sm:block" />
          Memakai <span className="text-[#008080]">Jasa</span> Kami
        </h2>
      </div>

      {/* Grid Logo */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 justify-center items-center w-fit mx-auto">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <LogoSkeleton key={i} />)
          : logos.map((logo, index) => <LogoCard key={index} logo={logo} />)}
      </div>
      <div className="mt-5 lg:mt-12 w-fit mx-auto">
        <Link href="/portofolio">
                <Button variant="outline" className="lg:text-xl rounded-full px-6 border-[#008080] text-[#008080] hover:bg-[#008080] hover:text-white transition-all duration-300 cursor-pointer">
                  Daftar Lengkap Klien Kami <ArrowUpRight className="ml-2 w-4 h-4" />
                </Button>
        </Link>

      </div>
    </section>
  );
}

/* ------------ Logo Card ------------ */
function LogoCard({ logo }: { logo: Partnership }) {
  const [loaded, setLoaded] = useState(false);

  const src = logo.logoPartner?.trim()
    ? logo.logoPartner
    : "https://via.placeholder.com/200x120?text=No+Logo";

  return (
    <div className="flex items-center justify-center border-[1.5px] border-[#008080] rounded-2xl sm:rounded-3xl min-w-[80px] min-h-[40px] w-[140px] h-[80px] sm:w-[160px] sm:h-[100px] md:w-[180px] md:h-[150px] lg:w-[200px] lg:h-[180px] xl:w-[280px] xl:h-[200px] mx-auto relative p-4 sm:p-6 md:p-8 overflow-hidden">
      {/* Loader shimmer per logo */}
      {!loaded && (
        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-300 bg-[length:200%_100%] rounded-2xl" />
      )}

      {/* Gambar */}
      <div className="w-full h-full flex justify-center items-center relative">
        <Image
          src={src}
          alt={logo.namaPartner || "Partner Logo"}
          fill
          className={`object-contain transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
}

/* ------------ Logo Skeleton (Responsive & Shimmer) ------------ */
function LogoSkeleton() {
  return (
    <div className="flex items-center justify-center border-[1.5px] border-[#008080] rounded-2xl sm:rounded-3xl min-w-[80px] min-h-[40px] w-[140px] h-[80px] sm:w-[160px] sm:h-[100px] md:w-[180px] md:h-[150px] lg:w-[200px] lg:h-[180px] xl:w-[280px] xl:h-[200px] mx-auto relative overflow-hidden">
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-300 bg-[length:200%_100%] rounded-2xl" />
    </div>
  );
}
