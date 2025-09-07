"use client";

import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "../ui/carousel";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Testimoni = {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

export default function TestimonialCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimoni[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    api.on("select", onSelect);
    onSelect();
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const snapshot = await getDocs(collection(db, "testimoni"));
        const data: Testimoni[] = [];
        snapshot.forEach((doc) => {
          const docData = doc.data();
          data.push({
            id: doc.id,
            quote: docData.komentar || "",
            name: docData.nama || "",
            role: docData.profesi || "",
            avatar: docData.fotoProfil || "",
          });
        });
        setTestimonials(data);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <div className="py-12 px-4 sm:px-6 md:px-10 lg:mx-[15vh] bg-[#2F4F4F] rounded-lg sm:rounded-2xl lg:rounded-4xl font-clash">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start">
        {/* Kiri: Judul */}
        <div className="text-white ml-4 sm:ml-6 md:ml-10">
          <h2
            className="
              font-medium leading-tight
              text-[28px] sm:text-[38px] md:text-[46px] lg:text-[54px]
            "
          >
            Pendapat Mereka <br /> Tentang Kami
          </h2>
        </div>

        {/* Kanan: Carousel */}
        <div className="lg:col-span-2 relative">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setApi}
          >
            <CarouselContent className="-ml-4 sm:-ml-5 md:-ml-6">
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <CarouselItem
                      key={i}
                      className="pl-4 sm:pl-5 md:pl-6 basis-full sm:basis-2/3 md:basis-1/2 lg:basis-1/3 select-none"
                    >
                      <TestimonialSkeleton />
                    </CarouselItem>
                  ))
                : testimonials.map((t) => (
                    <CarouselItem
                      key={t.id}
                      className="pl-4 sm:pl-5 md:pl-6 basis-full sm:basis-2/3 md:basis-1/2 lg:basis-1/3 select-none"
                    >
                      <div
                        className="
                          bg-[#EAEAEA] rounded-2xl shadow-md flex flex-col p-6 sm:p-8 md:p-9 lg:p-10
                          h-[280px] sm:h-[340px] md:h-[400px] lg:h-[440px]
                        "
                      >
                        {/* Komentar */}
                        <p
                          className="
                            text-black font-medium leading-snug
                            text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px]
                            flex-grow 
                          "
                        >
                          “{t.quote}”
                        </p>

                        {/* Footer */}
                        <div className="flex items-center gap-3 mt-4 sm:mt-6 flex-none">
                          <Image
                            src={t.avatar}
                            alt={t.name}
                            width={40}
                            height={40}
                            className="rounded-full object-cover w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12"
                          />
                          <div className="leading-tight">
                            <p className="text-black font-medium text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px]">
                              {t.name}
                            </p>
                            <p className="text-black/47 text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px]">
                              {t.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
            </CarouselContent>
          </Carousel>

          {/* Tombol Navigasi */}
          <div className="flex gap-4 sm:gap-6 md:gap-8 mt-8 sm:mt-10 justify-end">
            <button
              onClick={() => api?.scrollPrev()}
              disabled={!canScrollPrev}
              className="
                flex items-center justify-center rounded-full border-2 sm:border-[3px] border-[#EAEAEA] text-[#EAEAEA] 
                hover:bg-[#EAEAEA] hover:text-[#0E4F56] transition disabled:opacity-40
                w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16
              "
            >
              <FiArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
            </button>
            <button
              onClick={() => api?.scrollNext()}
              disabled={!canScrollNext}
              className="
                flex items-center justify-center rounded-full border-2 sm:border-[3px] border-[#EAEAEA] text-[#EAEAEA] 
                hover:bg-[#EAEAEA] hover:text-[#0E4F56] transition disabled:opacity-40
                w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16
              "
            >
              <FiArrowRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------ Skeleton Card ------------ */
function TestimonialSkeleton() {
  return (
    <div
      className="
        bg-[#EAEAEA] rounded-2xl shadow-md flex flex-col p-6 sm:p-8 md:p-9 lg:p-10
        h-[280px] sm:h-[340px] md:h-[400px] lg:h-[440px]
        relative overflow-hidden
      "
    >
      {/* Quote shimmer */}
      <div className="space-y-3 flex-grow">
        <div className="h-5 sm:h-6 w-5/6 bg-neutral-300 rounded overflow-hidden relative">
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-300 bg-[length:200%_100%]" />
        </div>
        <div className="h-5 sm:h-6 w-4/6 bg-neutral-300 rounded overflow-hidden relative">
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-300 bg-[length:200%_100%]" />
        </div>
        <div className="h-5 sm:h-6 w-3/6 bg-neutral-300 rounded overflow-hidden relative">
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-300 bg-[length:200%_100%]" />
        </div>
      </div>

      {/* Footer shimmer */}
      <div className="flex items-center gap-3 mt-6">
        <div className="rounded-full bg-neutral-300 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 relative overflow-hidden">
          <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-300 bg-[length:200%_100%] rounded-full" />
        </div>
        <div className="space-y-2 flex-1">
          <div className="h-4 sm:h-5 w-1/2 bg-neutral-300 rounded relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-300 bg-[length:200%_100%]" />
          </div>
          <div className="h-3 sm:h-4 w-1/3 bg-neutral-300 rounded relative overflow-hidden">
            <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-neutral-300 via-neutral-100 to-neutral-300 bg-[length:200%_100%]" />
          </div>
        </div>
      </div>
    </div>
  );
}
