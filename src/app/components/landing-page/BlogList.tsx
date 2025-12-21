"use client";

import React, { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/app/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/components/ui/pagination";
import { Badge } from "@/app/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/app/components/ui/avatar";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Sesuaikan path
import { Skeleton } from "@/app/components/ui/skeleton";

// --- Tipe Data ---
interface BlogPost {
  id: string;
  title: string;
  category: string; 
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  heroImage: string; 
  slug: string; // Pastikan slug ada di dokumen Firestore (atau generate dari title)
  createdAt: any;
}

// --- Variabel Animasi ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const BlogList = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  // Fetch Data Firestore (Realtime)
  useEffect(() => {
    // Mengambil semua blog, diurutkan dari terbaru
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        const blogData = doc.data();
        return {
          id: doc.id,
          title: blogData.title,
          category: blogData.category || "Umum",
          authorName: blogData.authorName || "Admin",
          authorRole: blogData.authorRole || "Editor",
          authorAvatar: blogData.authorAvatar || "",
          heroImage: blogData.heroImage || "/images/placeholder.jpg",
          // Generate slug sederhana jika tidak ada di DB
          slug: blogData.slug || blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          createdAt: blogData.createdAt
        };
      }) as BlogPost[];
      
      setBlogs(data);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching blogs:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // --- Logika Pagination ---
  const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE);
  
  const currentBlogs = blogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll ke atas section saat ganti halaman (opsional)
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="w-full py-16 md:py-24 font-clash">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header Section */}
        <div className="mb-12">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-medium text-gray-900 mb-2"
          >
            Terbaru
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="h-1 bg-[#2f4f4f] rounded-full"
          />
        </div>

        {/* Blog Grid */}
        {loading ? (
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-[350px] flex flex-col gap-4">
                   <Skeleton className="w-full h-[200px] rounded-2xl" />
                   <Skeleton className="w-3/4 h-6" />
                   <div className="mt-auto flex justify-between">
                     <Skeleton className="w-1/3 h-8" />
                     <Skeleton className="w-1/4 h-6" />
                   </div>
                </div>
              ))}
           </div>
        ) : currentBlogs.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible" // Menggunakan animate agar re-trigger saat halaman berubah
            key={currentPage} // Kunci ini penting agar animasi ulang saat ganti halaman
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            <AnimatePresence mode="wait">
              {currentBlogs.map((post) => (
                <motion.div key={post.id} variants={itemVariants} className="h-full">
                  <Link href={`/blogs/${post.slug}`} className="block h-full group">
                    <Card className="h-full border-0 bg-white shadow-none hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col group-hover:-translate-y-1 rounded-2xl">
                      
                      {/* Gambar Thumbnail */}
                      <div className="relative w-full aspect-video overflow-hidden rounded-2xl mb-4 bg-gray-100">
                        <Image
                          src={post.heroImage}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>

                      {/* Konten */}
                      <CardHeader className=" mb-3 space-y-2 px-3">
                        <CardTitle className="text-lg font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-[#2f4f4f] transition-colors">
                          {post.title}
                        </CardTitle>
                      </CardHeader>

                      <CardFooter className=" mt-auto flex items-center justify-between px-3 pb-2">
                        {/* Author Info */}
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border border-gray-200">
                            <AvatarImage src={post.authorAvatar} alt={post.authorName} />
                            <AvatarFallback className="bg-gray-100 text-xs text-gray-500 font-bold">
                                {post.authorName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                             <span className="text-xs font-bold text-gray-700 leading-none">
                                {post.authorName}
                             </span>
                             <span className="text-[10px] text-gray-500 leading-none mt-1">
                                {post.createdAt?.toDate().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                             </span>
                          </div>
                        </div>

                        {/* Category Badge */}
                        <Badge 
                          className="bg-[#2f4f4f] hover:bg-[#2f4f4f] text-white px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                        >
                          {post.category}
                        </Badge>
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
           <div className="text-center py-20 text-gray-500 italic">Belum ada artikel blog.</div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
            <div className="flex justify-center">
                <Pagination>
                <PaginationContent>
                    <PaginationItem>
                    <PaginationPrevious 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); if(currentPage > 1) handlePageChange(currentPage - 1); }}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : "hover:text-[#A0522D]"} 
                    />
                    </PaginationItem>
                    
                    {/* Render Page Numbers Dinamis */}
                    {[...Array(totalPages)].map((_, index) => {
                        const pageNumber = index + 1;
                        return (
                            <PaginationItem key={pageNumber}>
                                <PaginationLink 
                                    href="#" 
                                    isActive={currentPage === pageNumber}
                                    onClick={(e) => { e.preventDefault(); handlePageChange(pageNumber); }}
                                    className={currentPage === pageNumber 
                                        ? "bg-[#A0522D] text-white hover:bg-[#8B4513] hover:text-white rounded-full w-8 h-8" 
                                        : "hover:text-[#A0522D] rounded-full w-8 h-8"
                                    }
                                >
                                    {pageNumber}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    })}

                    <PaginationItem>
                    <PaginationNext 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); if(currentPage < totalPages) handlePageChange(currentPage + 1); }}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : "hover:text-[#A0522D]"} 
                    />
                    </PaginationItem>
                </PaginationContent>
                </Pagination>
            </div>
        )}

      </div>
    </section>
  );
};

export default BlogList;