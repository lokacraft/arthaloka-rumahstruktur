'use client';
import Image from 'next/image';

type Project = {
  id: number;
  title: string;
  tag: string;
  image: string;
};

const dummyProjects: Project[] = [
  {
    id: 1,
    title: 'Pembangunan Gudang Logistik',
    tag: 'Hitung Struktur',
    image: '/images/project1.png',
  },
  {
    id: 2,
    title: 'Perkuatan Jembatan',
    tag: 'Hitung Struktur',
    image: '/images/project2.png',
  },
  {
    id: 3,
    title: 'Pembangunan Gudang Logistik, Cikarang',
    tag: 'Hitung Struktur',
    image: '/images/project3.png',
  },
  {
    id: 4,
    title: 'Pembangunan Gudang Logistik',
    tag: 'Hitung Struktur',
    image: '/images/project1.png',
  },
  {
    id: 5,
    title: 'Perkuatan Jembatan',
    tag: 'Hitung Struktur',
    image: '/images/project2.png',
  },
  {
    id: 6,
    title: 'Pembangunan Gudang Logistik, Cikarang',
    tag: 'Hitung Struktur',
    image: '/images/project3.png',
  },
];

export default function PortofolioCard() {
  return (
    <section className="font-clash w-full h-full relative p-[4vh] lg:p-[15vh]">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-center mb-12 lg:mb-20">
        Jelajahi Proyek Kami
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full h-full mx-auto justify-center items-center justify-items-center">
        {dummyProjects.map((project) => (
          <div
            key={project.id}
            className="
           
              w-[100%] h-[100%] 
              bg-[#203E3E]/10 rounded-2xl p-6 lg:p-8 flex flex-col justify-start
            "
          >
            {/* Image Box */}
            <div className="relative w-full h-[160px] sm:h-[180px] md:h-[190px] xl:h-[200px] mb-4">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-contain rounded-xl border bg-white border-gray-200"
              />
            </div>

            {/* Title */}
            <h3 className="text-[#2F4F4F] text-xl  xl:text-[2.375rem] leading-tight font-medium mb-2 mx-2 lg:mx-3">
              {project.title}
            </h3>

            {/* Tag */}
            <span className="inline-block w-fit font-instrument text-[#008080] mx-2 lg:mx-3 text-xs sm:text-sm border border-[#008080] rounded-full px-3 py-1 mt-auto">
              {project.tag}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
