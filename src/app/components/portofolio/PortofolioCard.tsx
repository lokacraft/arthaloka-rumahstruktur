"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

type Project = {
  id: string;
  title: string;
  tag: string;
  fotoPortofolio: string;
};

export default function PortofolioCard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snapshot = await getDocs(collection(db, "portofolio"));
        const data: Project[] = snapshot.docs.map((doc) => {
          const docData = doc.data();
          return {
            id: doc.id,
            title: docData.title || "",
            tag: docData.tag || "",
            fotoPortofolio: docData.fotoPortofolio || "",
          };
        });
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="font-clash w-full h-full relative p-[4vh] lg:p-[15vh]">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-center mb-12 lg:mb-20">
        Jelajahi Proyek Kami
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full h-full mx-auto justify-center items-center justify-items-center">
        {loading
          ? // Skeleton Cards
            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : projects.map((project) => (
              <Link
                key={project.id}
                href="" // sementara kosong
                className="w-full h-full"
              >
                <div
                  className="
                    w-[100%] h-[100%] 
                    bg-[#203E3E]/10 rounded-2xl p-6 lg:p-8 flex flex-col justify-start
                    transform transition duration-300 hover:scale-105
                  "
                >
                  {/* Image Box */}
                  <div className="relative w-full h-[160px] sm:h-[180px] md:h-[190px] xl:h-[200px] mb-4">
                    <Image
                      src={
                        project.fotoPortofolio?.trim()
                          ? project.fotoPortofolio
                          : "https://via.placeholder.com/400x300?text=No+Image"
                      }
                      alt={project.title}
                      fill
                      className="object-cover rounded-xl"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-[#2F4F4F] text-xl xl:text-[2.375rem] leading-tight font-medium mb-2 mx-2 lg:mx-3">
                    {project.title}
                  </h3>

                  {/* Tag */}
                  <span className="inline-block w-fit font-instrument text-[#008080] mx-2 lg:mx-3 text-xs sm:text-sm border border-[#008080] rounded-full px-3 py-1 mt-auto">
                    {project.tag}
                  </span>
                </div>
              </Link>
            ))}
      </div>
    </section>
  );
}

// Skeleton Card -> mengikuti persis ukuran card asli
function SkeletonCard() {
  return (
    <div
      className="
        w-[100%] h-[100%] 
        bg-[#203E3E]/10 rounded-2xl p-6 lg:p-8 flex flex-col justify-start animate-pulse
      "
    >
      {/* Image Box Skeleton */}
      <div className="w-full h-[160px] sm:h-[180px] md:h-[190px] xl:h-[200px] mb-4 bg-neutral-200 rounded-xl" />

      {/* Title Skeleton */}
      <div className="h-6 sm:h-7 md:h-8 w-3/4 bg-neutral-200 rounded-md mb-2 mx-2 lg:mx-3" />

      {/* Tag Skeleton */}
      <div className="h-5 w-1/3 bg-neutral-200 rounded-full mx-2 lg:mx-3 mt-auto" />
    </div>
  );
}
