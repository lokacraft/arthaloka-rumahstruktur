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

// Dummy data (bisa diganti Firestore / API)
const testimonials = [
  {
    id: "1",
    quote:
      "Mereka selalu tepat waktu, detail, dan sangat responsif terhadap pertanyaan dan kebutuhan kami sebagai pengembang.",
    name: "Rina",
    role: "Project Manager",
    avatar: "/avatars/rina.png",
  },
  {
    id: "2",
    quote:
      "Mereka tidak hanya memberikan perhitungan struktur yang akurat, tetapi juga memberikan saran dan solusi yang sangat membantu.",
    name: "Andi Setiawan",
    role: "Developer Project",
    avatar: "/avatars/andi.png",
  },
  {
    id: "3",
    quote:
      "Mereka selalu memberikan layanan yang luar biasa dan hasil yang memuaskan.",
    name: "Agus",
    role: "Konstruksi",
    avatar: "/avatars/agus.png",
  },
  {
    id: "4",
    quote:
      "Mereka selalu tepat waktu, detail, dan sangat responsif terhadap pertanyaan dan kebutuhan kami sebagai pengembang.",
    name: "Rina",
    role: "Project Manager",
    avatar: "/avatars/rina.png",
  },
  {
    id: "5",
    quote:
      "Mereka tidak hanya memberikan perhitungan struktur yang akurat, tetapi juga memberikan saran dan solusi yang sangat membantu.",
    name: "Andi Setiawan",
    role: "Developer Project",
    avatar: "/avatars/andi.png",
  },
  {
    id: "6",
    quote:
      "Mereka selalu memberikan layanan yang luar biasa dan hasil yang memuaskan.",
    name: "Agus",
    role: "Konstruksi",
    avatar: "/avatars/agus.png",
  },
];

export default function TestimonialCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

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

  return (
    <div className=" py-18 px-8 lg:mx-[15vh] bg-[#2F4F4F] rounded-4xl font-clash">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Kiri: Judul */}
        <div className="text-white ml-10">
          <h2 className="text-[54px] font-medium leading-tight">
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
            <CarouselContent className="-ml-6">
              {testimonials.map((t) => (
                <CarouselItem
                  key={t.id}
                  className="pl-6 md:basis-1/2 lg:basis-1/3 select-none"
                >
                  <div className="bg-[#EAEAEA] h-[400px] rounded-2xl p-10 flex flex-col justify-between shadow-md">
                    <p className="text-black font-medium text-[28px] leading-tight">
                      “{t.quote}”
                    </p>
                    <div className="flex items-center gap-3 mt-6">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                      <div className="leading-tight">
                        <p className="text-black text-[24px] font-medium">{t.name}</p>
                        <p className="text-black/47 text-[16px]">{t.role}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Tombol Navigasi */}
          <div className="flex gap-8 mt-10 justify-end">
            <button
              onClick={() => api?.scrollPrev()}
              disabled={!canScrollPrev}
              className="w-16 h-16 flex items-center justify-center rounded-full border-3 border-[#EAEAEA] text-[#EAEAEA] hover:bg-[#EAEAEA] hover:text-[#0E4F56] transition disabled:opacity-40"
            >
              <FiArrowLeft size={32} />
            </button>
            <button
              onClick={() => api?.scrollNext()}
              disabled={!canScrollNext}
              className="w-16 h-16 flex items-center justify-center rounded-full border-3 border-[#EAEAEA] text-[#EAEAEA] hover:bg-[#EAEAEA] hover:text-[#0E4F56] transition disabled:opacity-40"
            >
              <FiArrowRight size={32}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
