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
    image: '/images/project1.png', // ganti sesuai aset kamu
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

interface PortofolioCardProps {
  cardWidth?: string;
  cardHeight?: string;
  imageBoxHeight?: string;
}

const PortofolioCard: React.FC<PortofolioCardProps> = ({
  cardWidth = 'w-[380px]',
  cardHeight = 'h-[460px]',
  imageBoxHeight = 'h-[200px]',
}) => {
  return (
    <section className="font-clash p-[15vh]">
      {/* Heading */}
      <h2 className="text-5xl font-medium text-center mb-25">
        Jelajahi Proyek Kami
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {dummyProjects.map((project) => (
          <div
            key={project.id}
            className={`${cardWidth} ${cardHeight} bg-[#203E3E]/10 rounded-2xl p-8 flex flex-col`}
          >
            {/* Image Box */}
            <div className={`relative w-full ${imageBoxHeight} mb-4`}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-contain rounded-xl border border-gray-200"
              />
            </div>

            {/* Title */}
            <h3 className="text-[#2F4F4F] text-[2.375rem] leading-none font-medium mb-2 mx-3">
              {project.title}
            </h3>

            {/* Tag */}
            <span className="inline-block w-fit font-instrument text-[#008080] mx-3 text-sm border border-[#008080] rounded-full px-3 py-1 mt-auto">
              {project.tag}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortofolioCard;
