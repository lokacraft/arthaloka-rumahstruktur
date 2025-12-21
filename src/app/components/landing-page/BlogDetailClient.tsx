"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useScroll, useSpring } from "framer-motion";
import parse, { DOMNode, Element, domToReact } from "html-react-parser"; // Import domToReact langsung
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Separator } from "@/app/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";
import {
  Heart,
  Share2,
  Clock,
  ArrowLeft,
  LogIn
} from "lucide-react";
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc, 
  increment, 
  serverTimestamp,
  limit 
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";

// --- Interface Blog Post ---
export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  publishedAt: string;
  readTime: string;
  likes: number;
  heroImage: string;
  content: string;
}

interface BlogDetailClientProps {
  post: BlogPost;
}

export default function BlogDetailClient({ post }: BlogDetailClientProps) {
  const router = useRouter();

  // State Interaksi
  const [isLiked, setIsLiked] = useState(false);
  const [likeDocId, setLikeDocId] = useState<string | null>(null);
  const [currentLikes, setCurrentLikes] = useState(post.likes);
  const [isLiking, setIsLiking] = useState(false);
  
  // State Dialog Login
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  // --- Scroll Progress Bar ---
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });



  // --- 3. Handler Share ---
  const handleShare = async () => {
    const url = window.location.href;
    const shareData = {
      title: post.title,
      text: post.subtitle || "Baca artikel menarik ini di Manding!",
      url: url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        toast.success("Link berhasil dibagikan!");
      } catch (err) {
        // User cancel sharing
      }
    } else {
      navigator.clipboard.writeText(url);
      toast.success("Link disalin ke clipboard!");
    }
  };

  // --- 4. Custom HTML Parser ---
  const parseContent = (html: string) => {
    return parse(html, {
      replace: (domNode) => {
        if (domNode instanceof Element) {
          // Helper untuk children
          // @ts-ignore - Bypass type check karena html-react-parser types kadang tricky
          const children = domToReact(domNode.children);

          // Ganti <h1>
          if (domNode.name === "h1") {
            return <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4 text-gray-900">{children}</h1>;
          }
          // Ganti <h2>
          if (domNode.name === "h2") {
            return <h2 className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-gray-900">{children}</h2>;
          }
          // Ganti <h3>
          if (domNode.name === "h3") {
            return <h3 className="text-xl md:text-2xl font-semibold mt-6 mb-3 text-gray-800">{children}</h3>;
          }
          // Ganti <p>
          if (domNode.name === "p") {
            return <div className="text-lg leading-relaxed text-gray-700 mb-6 font-serif">{children}</div>;
          }
          // Ganti <ul>
          if (domNode.name === "ul") {
            return <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700 font-serif">{children}</ul>;
          }
          // Ganti <ol>
          if (domNode.name === "ol") {
            return <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-700 font-serif">{children}</ol>;
          }
          // Ganti <blockquote>
          if (domNode.name === "blockquote") {
            return (
              <blockquote className="border-l-4 border-[#2f4f4f] pl-6 py-2 my-8 italic text-xl text-gray-600 bg-gray-50 rounded-r-lg">
                {children}
              </blockquote>
            );
          }
          
          // REVISI: Ganti <img> dengan <Image /> dan tampilkan Caption
          if (domNode.name === "img" && domNode.attribs.src) {
            const caption = domNode.attribs.title || domNode.attribs.alt;
            
            return (
              <figure className="my-8 flex flex-col items-center">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-100 shadow-md">
                  <Image 
                    src={domNode.attribs.src} 
                    alt={domNode.attribs.alt || "Blog image"} 
                    fill 
                    className="object-cover"
                  />
                </div>
                {/* Tampilkan Caption jika ada */}
                {caption && (
                   <figcaption className="mt-3 text-center text-sm text-gray-500 italic font-sans max-w-2xl mx-auto">
                     {caption}
                   </figcaption>
                )}
              </figure>
            );
          }
          
          // Handle <a> links styling
          if (domNode.name === "a") {
             return (
                 <a {...domNode.attribs} className="text-blue-600 underline font-medium hover:text-blue-800 transition-colors">
                     {children}
                 </a>
             )
          }
        }
      }
    });
  };

  return (
    <main className="min-h-screen font-clash">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#2f4f4f] origin-left z-50"
        style={{ scaleX }}
      />

      {/* --- CONTENT WRAPPER --- */}
      <article className="max-w-4xl mx-auto px-5 py-10 md:py-20 mt-20">
        
        {/* Breadcrumb */}
        <div className="mb-8">
            <Link href="/blogs" className="inline-flex items-center text-sm text-gray-500 hover:text-[#2f4f4f] transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali ke Beranda
            </Link>
        </div>

        {/* --- HEADER ARTIKEL --- */}
        <header className="mb-10 text-center md:text-left">
          <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
             <Badge variant="secondary" className="text-white bg-[#2f4f4f]">
                {post.category}
             </Badge>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4 md:mb-6">
            {post.title}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-500 font-light mb-8 leading-relaxed">
            {post.subtitle}
          </p>

          {/* Author & Meta */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-y border-gray-100 py-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                <AvatarImage src={post.authorAvatar} alt={post.authorName} />
                <AvatarFallback>{post.authorName?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-left">
                <p className="font-bold text-gray-900">{post.authorName}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{post.authorRole}</span>
                  <span>•</span>
                  <span>{post.publishedAt}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3"/> {post.readTime}</span>
                </div>
              </div>
            </div>

            {/* Social Actions */}
            <div className="flex items-center gap-2">
                <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gray-500 hover:text-[#2f4f4f]"
                    onClick={handleShare}
                >
                    <Share2 className="w-5 h-5 mr-2" /> Share
                </Button>
            </div>
          </div>
        </header>

        {/* --- HERO IMAGE --- */}
        <div className="relative w-full aspect-video md:aspect-21/9 rounded-xl overflow-hidden mb-12 shadow-lg">
            <Image 
                src={post.heroImage} 
                alt={post.title} 
                fill 
                className="object-cover"
                priority
            />
        </div>

        {/* --- BODY ARTIKEL (PARSED HTML) --- */}
        <div className="max-w-3xl mx-auto">
            {parseContent(post.content)}
        </div>

        {/* --- FOOTER ARTIKEL --- */}
        <div className="max-w-3xl mx-auto mt-12 pt-8 border-t border-gray-200">
             <div className="flex justify-center">
                 <p className="text-gray-500 italic">Terima kasih sudah membaca!</p>
             </div>
        </div>

      </article>

    </main>
  );
}