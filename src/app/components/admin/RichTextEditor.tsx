"use client";

import React, { useState, useCallback } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import ImageExtension from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import LinkExtension from "@tiptap/extension-link";
import { 
  Bold, Italic, List, ListOrdered, Heading1, Heading2, Heading3, Quote, ImageIcon, Undo, Redo, Link as LinkIcon, Unlink 
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { ImageDropzone } from "./ImageDropzone";
import Image from "next/image";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
}

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  // 1. Definisikan SEMUA Hooks di bagian paling atas
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState<string>("");
  const [imageTitle, setImageTitle] = useState("");

  // --- Handlers Link (Hook) ---
  const setLink = useCallback(() => {
    if (!editor) return; // Guard clause jika editor null saat fungsi dijalankan

    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL:', previousUrl);

    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  // --- Handlers Image (Bukan Hook, fungsi biasa) ---
  const handleImageUpload = (url: string | string[]) => {
    const imageUrl = Array.isArray(url) ? url[0] : url;
    setTempImageUrl(imageUrl);
  };

  const insertImageToEditor = () => {
    if (tempImageUrl && editor) {
      editor.chain().focus().setImage({ 
        src: tempImageUrl, 
        alt: imageTitle, 
        title: imageTitle 
      }).run();
      
      setIsImageDialogOpen(false);
      setTempImageUrl("");
      setImageTitle("");
    }
  };

  const resetImageDialog = (open: boolean) => {
    setIsImageDialogOpen(open);
    if (!open) {
      setTempImageUrl("");
      setImageTitle("");
    }
  };

  // 2. BARU lakukan pengecekan conditional return di sini (setelah semua hooks)
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b bg-gray-50 p-2 flex flex-wrap gap-1 sticky top-0 z-10 rounded-t-md">
      {/* --- Text Formatting --- */}
      <Button
        variant="ghost" size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-gray-200 text-black" : "text-gray-600"}
        title="Bold" type="button"
      >
        <Bold className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost" size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-gray-200 text-black" : "text-gray-600"}
        title="Italic" type="button"
      >
        <Italic className="w-4 h-4" />
      </Button>

      {/* --- Links --- */}
      <Button
        variant="ghost" size="sm"
        onClick={setLink}
        className={editor.isActive("link") ? "bg-gray-200 text-blue-600" : "text-gray-600"}
        title="Add Link" type="button"
      >
        <LinkIcon className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost" size="sm"
        onClick={() => editor.chain().focus().unsetLink().run()}
        disabled={!editor.isActive("link")}
        className="text-gray-600 disabled:opacity-30"
        title="Remove Link" type="button"
      >
        <Unlink className="w-4 h-4" />
      </Button>
      
      <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

      {/* --- Headings --- */}
      <Button
        variant="ghost" size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "bg-gray-200 text-black" : "text-gray-600"}
        title="Heading 1" type="button"
      >
        <Heading1 className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost" size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "bg-gray-200 text-black" : "text-gray-600"}
        title="Heading 2" type="button"
      >
        <Heading2 className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost" size="sm"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "bg-gray-200 text-black" : "text-gray-600"}
        title="Heading 3" type="button"
      >
        <Heading3 className="w-4 h-4" />
      </Button>

      <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

      {/* --- Lists & Quote --- */}
      <Button
        variant="ghost" size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "bg-gray-200 text-black" : "text-gray-600"}
        title="Bullet List" type="button"
      >
        <List className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost" size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "bg-gray-200 text-black" : "text-gray-600"}
        title="Ordered List" type="button"
      >
        <ListOrdered className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost" size="sm"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "bg-gray-200 text-black" : "text-gray-600"}
        title="Blockquote" type="button"
      >
        <Quote className="w-4 h-4" />
      </Button>

      <div className="w-px h-6 bg-gray-300 mx-1 self-center" />

      {/* --- Image Upload Dialog --- */}
      <Dialog open={isImageDialogOpen} onOpenChange={resetImageDialog}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" type="button" title="Insert Image" className="text-gray-600">
            <ImageIcon className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Sisipkan Gambar</DialogTitle>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            {!tempImageUrl ? (
                <ImageDropzone 
                    value="" 
                    onChange={handleImageUpload} 
                    label="Upload Gambar Artikel"
                    aspectRatio="aspect-video"
                />
            ) : (
                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                    <div className="relative aspect-video w-full rounded-md overflow-hidden border">
                        <Image src={tempImageUrl} alt="Preview" fill className="object-cover" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="imgTitle">Judul Gambar / Caption</Label>
                        <Input 
                            id="imgTitle"
                            value={imageTitle}
                            onChange={(e) => setImageTitle(e.target.value)}
                            placeholder="Contoh: Gambar 1.1 Proses Penyamakan..."
                            autoFocus
                        />
                        <p className="text-xs text-muted-foreground">Teks ini akan muncul sebagai keterangan gambar (caption).</p>
                    </div>
                </div>
            )}
          </div>

          <DialogFooter>
             {tempImageUrl ? (
                 <div className="flex gap-2 w-full justify-end">
                     <Button variant="outline" onClick={() => setTempImageUrl("")} type="button">Ganti Gambar</Button>
                     <Button onClick={insertImageToEditor} type="button">Sisipkan ke Artikel</Button>
                 </div>
             ) : (
                <Button variant="outline" onClick={() => setIsImageDialogOpen(false)} type="button">Batal</Button>
             )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex-1" /> 
      
      {/* --- Undo / Redo --- */}
      <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().undo().run()} type="button" className="text-gray-600">
        <Undo className="w-4 h-4" />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().redo().run()} type="button" className="text-gray-600">
        <Redo className="w-4 h-4" />
      </Button>
    </div>
  );
};

export const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageExtension.configure({
        inline: true,
        allowBase64: true,
        HTMLAttributes: {
          class: 'rounded-lg border border-gray-200 shadow-sm my-6 max-w-full h-auto mx-auto block',
        },
      }),
      LinkExtension.configure({
        openOnClick: false,
        HTMLAttributes: {
            class: 'text-blue-600 underline cursor-pointer hover:text-blue-800',
        },
      }),
      Placeholder.configure({
        placeholder: 'Mulai tulis cerita inspiratif Anda di sini...',
        emptyEditorClass: 'is-editor-empty before:content-[attr(data-placeholder)] before:text-gray-400 before:float-left before:pointer-events-none',
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: `
          min-h-[400px] p-6 focus:outline-none
          [&_h1]:text-4xl [&_h1]:font-extrabold [&_h1]:mb-4 [&_h1]:mt-6 [&_h1]:leading-tight
          [&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:mt-5 [&_h2]:leading-snug
          [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4
          [&_p]:mb-4 [&_p]:leading-relaxed [&_p]:text-gray-700
          [&_a]:text-blue-600 [&_a]:underline [&_a]:font-medium
          [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4
          [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4
          [&_li]:mb-1
          [&_blockquote]:border-l-4 [&_blockquote]:border-primary/50 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600 [&_blockquote]:my-6
          [&_strong]:font-bold [&_em]:italic
          [&_img]:transition-opacity [&_img]:duration-300
        `.replace(/\s+/g, " ").trim(), 
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false, 
  });

  return (
    <div className="border rounded-md overflow-hidden bg-white shadow-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <MenuBar editor={editor} />
      <div className="max-h-[600px] overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};