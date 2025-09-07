"use client";

import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import HardBreak from "@tiptap/extension-hard-break";

import {
  Bold,
  Italic,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  ListOrdered,
  List,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo,
  Redo,
} from "lucide-react";

import { Button } from "@/app/components/ui/button";
import "./tiptap.css";

interface TiptapEditorProps {
  value: string;
  onChange: (content: string) => void;
}

export default function TiptapEditor({ value, onChange }: TiptapEditorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] }, // kita pakai H1-H3 saja biar rapi
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      HorizontalRule,
      HardBreak,
    ],
    content: value || "",
    immediatelyRender: false, // 👈 fix SSR hydration
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!mounted || !editor) return null;

  return (
    <div className="border rounded-md p-2 space-y-2">
      {/* --- Toolbar --- */}
      <div className="flex flex-wrap gap-1 border-b pb-2 mb-2 z-10 sticky top-0 bg-white">
        <Button
          size="sm"
          variant={editor.isActive("bold") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant={editor.isActive("italic") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant={editor.isActive("strike") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
        {/* <Button
          size="sm"
          variant={editor.isActive("code") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleCode().run()}
        >
          <Code className="h-4 w-4" />
        </Button> */}

        {/* Headings */}
        <Button
          size="sm"
          variant={
            editor.isActive("heading", { level: 1 }) ? "default" : "outline"
          }
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant={
            editor.isActive("heading", { level: 2 }) ? "default" : "outline"
          }
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant={
            editor.isActive("heading", { level: 3 }) ? "default" : "outline"
          }
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3 className="h-4 w-4" />
        </Button>

        {/* Lists */}
        <Button
          size="sm"
          variant={editor.isActive("bulletList") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant={editor.isActive("orderedList") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        {/* <Button
          size="sm"
          variant={editor.isActive("taskList") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleTaskList().run()}
        >
          <ListChecks className="h-4 w-4" />
        </Button> */}

        {/* Blockquote, CodeBlock, HR */}
        {/* <Button
          size="sm"
          variant={editor.isActive("blockquote") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant={editor.isActive("codeBlock") ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <Code2 className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus className="h-4 w-4" />
        </Button> */}

        {/* Alignment */}
        <Button
          size="sm"
          variant={
            editor.isActive({ textAlign: "left" }) ? "default" : "outline"
          }
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant={
            editor.isActive({ textAlign: "center" }) ? "default" : "outline"
          }
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant={
            editor.isActive({ textAlign: "right" }) ? "default" : "outline"
          }
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant={
            editor.isActive({ textAlign: "justify" }) ? "default" : "outline"
          }
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        >
          <AlignJustify className="h-4 w-4" />
        </Button>

        {/* Undo Redo */}
        <Button
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          <Undo className="h-4 w-4" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          <Redo className="h-4 w-4" />
        </Button>
      </div>

      {/* --- Editor Content --- */}
      <EditorContent editor={editor} className="tiptap" />
    </div>
  );
}
