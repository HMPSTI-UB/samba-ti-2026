"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import { Mark, mergeAttributes } from "@tiptap/core";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Undo,
  Redo,
  Heading1,
  Heading2,
  Link as LinkIcon,
  Highlighter,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  IndentIncrease,
  IndentDecrease,
} from "lucide-react";

const IndentMark = Mark.create({
  name: "indent",
  addAttributes() {
    return {
      level: {
        default: 1,
      },
    };
  },
  renderHTML({ HTMLAttributes }) {
    const level = Number(HTMLAttributes.level ?? 1);
    const px = Math.min(level * 20, 80);
    return ["span", mergeAttributes(HTMLAttributes, { style: `padding-left:${px}px; display:inline-block;` }), 0];
  },
  parseHTML() {
    return [
      {
        style: "padding-left",
      },
    ];
  },
});

type Props = {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
};

export default function RichTextEditor({ value, onChange, placeholder = "Mulai menulis...", label, error }: Props) {
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

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
      Link.configure({
        openOnClick: false,
        autolink: true,
      }),
      Highlight.configure({ multicolor: false }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      IndentMark,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: cn(
          "prose prose-invert prose-sm focus:outline-none min-h-[150px] max-h-[300px] overflow-y-auto overflow-x-hidden w-full px-3 py-2 text-sm text-soft-white break-words",
          "[&_*]:break-words [&_p]:whitespace-pre-wrap [&_h1]:whitespace-pre-wrap [&_h2]:whitespace-pre-wrap",
          "[&_a]:text-electric-blue [&_a]:underline",
          "[&_ul]:list-disc [&_ul]:pl-5",
          "[&_ol]:list-decimal [&_ol]:pl-5",
          "[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-white",
          "[&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white",
          "[&_blockquote]:border-l-4 [&_blockquote]:border-electric-blue [&_blockquote]:pl-3 [&_blockquote]:italic",
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

  function openLinkDialog() {
    setLinkUrl(editor.getAttributes("link").href ?? "");
    setLinkOpen(true);
  }

  function applyLink() {
    const url = linkUrl.trim();
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
    setLinkOpen(false);
  }

  const alignButtons = [
    { icon: AlignLeft, label: "Rata kiri", value: "left" },
    { icon: AlignCenter, label: "Rata tengah", value: "center" },
    { icon: AlignRight, label: "Rata kanan", value: "right" },
    { icon: AlignJustify, label: "Rata penuh", value: "justify" },
  ];

  return (
    <>
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
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={cn(
                "p-1.5 rounded hover:bg-white/10 text-muted-text hover:text-soft-white transition-colors",
                editor.isActive("underline") && "bg-white/10 text-electric-blue",
              )}
              title="Garis bawah"
            >
              <UnderlineIcon size={16} />
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
            <div className="h-4 w-[1px] bg-white/10 mx-1" />
            {alignButtons.map(({ icon: Icon, label, value }) => (
              <button
                key={value}
                type="button"
                onClick={() => editor.chain().focus().setTextAlign(value).run()}
                className={cn(
                  "p-1.5 rounded hover:bg-white/10 text-muted-text hover:text-soft-white transition-colors",
                  editor.isActive({ textAlign: value }) && "bg-white/10 text-electric-blue",
                )}
                title={label}
              >
                <Icon size={16} />
              </button>
            ))}
            <div className="h-4 w-[1px] bg-white/10 mx-1" />
            <button
              type="button"
              onClick={() => {
                if (editor.isActive("indent")) {
                  editor.chain().focus().unsetMark("indent").run();
                } else {
                  editor.chain().focus().setMark("indent", { level: 1 }).run();
                }
              }}
              className={cn(
                "p-1.5 rounded hover:bg-white/10 text-muted-text hover:text-soft-white transition-colors",
                editor.isActive("indent") && "bg-white/10 text-electric-blue",
              )}
              title="Indentasi"
            >
              <IndentIncrease size={16} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().unsetMark("indent").run()}
              className={cn(
                "p-1.5 rounded hover:bg-white/10 text-muted-text hover:text-soft-white transition-colors",
                editor.isActive("indent") && "bg-white/10 text-electric-blue",
              )}
              title="Hapus indentasi"
            >
              <IndentDecrease size={16} />
            </button>
            <div className="h-4 w-[1px] bg-white/10 mx-1" />
            <button
              type="button"
              onClick={openLinkDialog}
              className={cn(
                "p-1.5 rounded hover:bg-white/10 text-muted-text hover:text-soft-white transition-colors",
                editor.isActive("link") && "bg-white/10 text-electric-blue",
              )}
              title="Sisipkan link"
            >
              <LinkIcon size={16} />
            </button>
            <button
              type="button"
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className={cn(
                "p-1.5 rounded hover:bg-white/10 text-muted-text hover:text-soft-white transition-colors",
                editor.isActive("highlight") && "bg-white/10 text-electric-blue",
              )}
              title="Sorot teks"
            >
              <Highlighter size={16} />
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

      <Dialog open={linkOpen} onOpenChange={setLinkOpen}>
        <DialogContent title="Sisipkan Link" description="Masukkan URL tujuan untuk teks yang dipilih.">
          <div className="space-y-4">
            <Input
              label="URL"
              placeholder="https://..."
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  applyLink();
                }
              }}
            />
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="ghost" onClick={() => setLinkOpen(false)}>
                Batal
              </Button>
              <Button type="button" variant="primary" onClick={applyLink}>
                {linkUrl.trim() === "" ? "Hapus Link" : "Simpan"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
