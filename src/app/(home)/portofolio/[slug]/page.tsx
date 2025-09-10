import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProjectDetail from "./ProjectDetail";

interface ProjectDetailType {
  id: string;
  slug: string;
  title: string;
  description: string;
  tipePekerjaan: string;
  pekerjaan: string;
  lokasi: string;
  fotoPortofolio: string;
  fotoDokumentasi: string[];
}

export async function generateStaticParams() {
  const snapshot = await getDocs(collection(db, "portofolio"));

  return snapshot.docs
    .map((doc) => {
      const data = doc.data();
      if (!data.slug || typeof data.slug !== "string") return null; // filter
      return { slug: data.slug };
    })
    .filter(Boolean) as { slug: string }[];
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const q = query(collection(db, "portofolio"), where("slug", "==", slug));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return <div className="p-10">Proyek tidak ditemukan.</div>;
  }

  const projectData = snapshot.docs[0].data();

  const project: ProjectDetailType = {
    id: snapshot.docs[0].id,
    slug: projectData.slug || "",
    title: projectData.title || "",
    description: projectData.description || "",
    tipePekerjaan: projectData.tipePekerjaan || "",
    pekerjaan: projectData.pekerjaan || "",
    lokasi: projectData.lokasi || "",
    fotoPortofolio: projectData.fotoPortofolio || "",
    fotoDokumentasi: projectData.fotoDokumentasi || [],
  };

  return <ProjectDetail project={project} />;
}
