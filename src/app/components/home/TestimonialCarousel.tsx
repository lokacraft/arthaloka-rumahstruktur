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
              {testimonials.map((t) => (
                <CarouselItem
                  key={t.id}
                  className="pl-4 sm:pl-5 md:pl-6 basis-full sm:basis-2/3 md:basis-1/2 lg:basis-1/3 select-none"
                >
                  <div
                    className="
                      bg-[#EAEAEA] rounded-2xl shadow-md flex flex-col justify-between
                      h-[240px] sm:h-[300px] md:h-[360px] lg:h-[400px]
                      p-6 sm:p-8 md:p-9 lg:p-10
                    "
                  >
                    <p
                      className="
                        text-black font-medium leading-snug
                        text-[16px] sm:text-[20px] md:text-[24px] lg:text-[28px]
                      "
                    >
                      “{t.quote}”
                    </p>
                    <div className="flex items-center gap-3 mt-4 sm:mt-6">
                      <Image
                        src={t.avatar}
                        alt={t.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 lg:w-12 lg:h-12"
                      />
                      <div className="leading-tight">
                        <p
                          className="
                            text-black font-medium
                            text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px]
                          "
                        >
                          {t.name}
                        </p>
                        <p
                          className="
                            text-black/47
                            text-[12px] sm:text-[14px] md:text-[15px] lg:text-[16px]
                          "
                        >
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
              <FiArrowLeft
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
              />
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
              <FiArrowRight
                className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
