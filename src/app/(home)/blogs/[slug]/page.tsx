import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, Timestamp } from "firebase/firestore";
import BlogContent from "./BlogContent";

interface BlogDetail {
  id: string;
  slug: string;
  title: string;
  author: string;
  tanggal: string;
  tags: string[];
  fotoBlog: string;
  isiBlog: string;
}

// generateStaticParams untuk SEO
export async function generateStaticParams() {
  const snapshot = await getDocs(collection(db, "blogs"));
  return snapshot.docs.map((doc) => ({ slug: doc.data().slug as string }));
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const q = query(collection(db, "blogs"), where("slug", "==", slug));
  const snapshot = await getDocs(q);

  if (snapshot.empty) return <p>Blog tidak ditemukan</p>;

  const docData = snapshot.docs[0].data();

  
  let tanggalStr = "";
  if (docData.tanggal instanceof Timestamp) {
    tanggalStr = docData.tanggal.toDate().toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } else if (typeof docData.tanggal === "string") {
    tanggalStr = docData.tanggal;
  }

  const blog: BlogDetail = {
    id: snapshot.docs[0].id,
    slug: docData.slug,
    title: docData.title,
    author: docData.author,
    tanggal: tanggalStr,
    tags: docData.tag || [],
    fotoBlog: docData.fotoBlog,
    isiBlog: docData.isiBlog,
  };

  return <BlogContent blog={blog} />;
}
