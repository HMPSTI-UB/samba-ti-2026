"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";
import { cn } from "@/lib/cn";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Undo,
  Redo,
  Heading1,
  Heading2,
} from "lucide-react";

type Props = {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
};

export default function RichTextEditor({ value, onChange, placeholder = "Mulai menulis...", label, error }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-invert prose-sm focus:outline-none min-h-[150px] max-h-[300px] overflow-y-auto w-full px-3 py-2 text-sm text-soft-white",
        ),
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-white">{label}</label>}

      <div
        className={cn(
          "rounded-lg border bg-transparent overflow-hidden transition-colors duration-200 focus-within:ring-2 focus-within:ring-electric-blue focus-within:ring-offset-1 focus-within:ring-offset-deep-space",
          error ? "border-destructive focus-within:ring-destructive" : "border-white/10 hover:border-white/20",
        )}
      >
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-1 border-b border-white/10 bg-white/[0.02] p-1.5">
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={cn(
              "p-1.5 rounded hover:bg-white/10 text-muted-text hover:text-soft-white transition-colors",
              editor.isActive("bold") && "bg-white/10 text-electric-blue",
            )}
            title="Tebal"
          >
            <Bold size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={cn(
              "p-1.5 rounded hover:bg-white/10 text-muted-text hover:text-soft-white transition-colors",
              editor.isActive("italic") && "bg-white/10 text-electric-blue",
            )}
            title="Miring"
          >
            <Italic size={16} />
          </button>
          <div className="h-4 w-[1px] bg-white/10 mx-1" />
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={cn(
              "p-1.5 rounded hover:bg-white/10 text-muted-text hover:text-soft-white transition-colors",
              editor.isActive("heading", { level: 1 }) && "bg-white/10 text-electric-blue",
            )}
            title="Heading 1"
          >
            <Heading1 size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={cn(
              "p-1.5 rounded hover:bg-white/10 text-muted-text hover:text-soft-white transition-colors",
              editor.isActive("heading", { level: 2 }) && "bg-white/10 text-electric-blue",
            )}
            title="Heading 2"
          >
            <Heading2 size={16} />
          </button>
          <div className="h-4 w-[1px] bg-white/10 mx-1" />
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={cn(
              "p-1.5 rounded hover:bg-white/10 text-muted-text hover:text-soft-white transition-colors",
              editor.isActive("bulletList") && "bg-white/10 text-electric-blue",
            )}
            title="Bullet List"
          >
            <List size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={cn(
              "p-1.5 rounded hover:bg-white/10 text-muted-text hover:text-soft-white transition-colors",
              editor.isActive("orderedList") && "bg-white/10 text-electric-blue",
            )}
            title="Numbered List"
          >
            <ListOrdered size={16} />
          </button>
          <div className="h-4 w-[1px] bg-white/10 mx-1 ml-auto" />
          <button
            type="button"
            onClick={() => editor.chain().focus().undo().run()}
            className="p-1.5 rounded hover:bg-white/10 text-muted-text hover:text-soft-white transition-colors disabled:opacity-30"
            disabled={!editor.can().undo()}
            title="Undo"
          >
            <Undo size={16} />
          </button>
          <button
            type="button"
            onClick={() => editor.chain().focus().redo().run()}
            className="p-1.5 rounded hover:bg-white/10 text-muted-text hover:text-soft-white transition-colors disabled:opacity-30"
            disabled={!editor.can().redo()}
            title="Redo"
          >
            <Redo size={16} />
          </button>
        </div>

        {/* Content Area */}
        <EditorContent editor={editor} />
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
