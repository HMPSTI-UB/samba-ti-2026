"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import { Mark, mergeAttributes } from "@tiptap/core";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { uploadFileToS3 } from "@/lib/api/upload";
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
  Image as ImageIcon,
  Upload,
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

const AlignableImage = Image.extend({
  inline: false,
  group: "block",
  draggable: true,
  addAttributes() {
    return {
      ...this.parent?.(),
      dataAlign: {
        default: "left",
        parseHTML: (element) => element.getAttribute("data-align") || "left",
      },
      width: {
        default: "50",
        parseHTML: (element) => element.getAttribute("data-width") || "50",
      },
    };
  },
  renderHTML({ HTMLAttributes }) {
    const { dataAlign, width, ...rest } = HTMLAttributes;
    const align = dataAlign ?? "left";
    const w = width ?? "50";
    const margin =
      align === "center"
        ? "margin-left:auto;margin-right:auto;"
        : align === "right"
          ? "margin-left:auto;margin-right:0;"
          : "margin-right:auto;";
    return [
      "img",
      mergeAttributes(rest, {
        "data-align": align,
        "data-width": w,
        style: `display:block;${margin}width:${w}%;max-width:100%;height:auto;`,
      }),
    ];
  },
  parseHTML() {
    return [{ tag: "img[src]" }];
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
  const [imageOpen, setImageOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageWidth, setImageWidth] = useState("50");
  const [uploading, setUploading] = useState(false);
  const [imageError, setImageError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      AlignableImage,
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
          "[&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_img]:my-2",
          "[&_img[data-align='center']]:block [&_img[data-align='center']]:mx-auto",
          "[&_img[data-align='right']]:block [&_img[data-align='right']]:ml-auto",
          "[&_img[data-align='left']]:block [&_img[data-align='left']]:mr-auto",
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

  function openImageDialog() {
    setImageUrl("");
    setImageWidth("50");
    setImageError("");
    setImageOpen(true);
  }

  async function handleImageFile(file: File) {
    if (!file.type.startsWith("image/")) {
      setImageError("File harus berupa gambar");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setImageError("Ukuran gambar maksimal 5MB");
      return;
    }
    setUploading(true);
    setImageError("");
    try {
      const { publicUrl } = await uploadFileToS3(file, "content");
      editor
        .chain()
        .focus()
        .setImage({ src: publicUrl })
        .updateAttributes("image", { width: imageWidth, dataAlign: "left" })
        .run();
      setImageOpen(false);
    } catch (err) {
      setImageError(err instanceof Error ? err.message : "Gagal mengunggah gambar");
    } finally {
      setUploading(false);
    }
  }

  function applyImageUrl() {
    const url = imageUrl.trim();
    if (url === "") {
      setImageError("URL gambar tidak boleh kosong");
      return;
    }
    editor
      .chain()
      .focus()
      .setImage({ src: url })
      .updateAttributes("image", { width: imageWidth, dataAlign: "left" })
      .run();
    setImageOpen(false);
  }

  function handleResizeImage(width: string) {
    editor.chain().focus().updateAttributes("image", { width }).run();
  }

  function handleAlign(value: string) {
    if (editor.isActive("image")) {
      editor.chain().focus().updateAttributes("image", { dataAlign: value }).run();
    } else {
      editor.chain().focus().setTextAlign(value).run();
    }
  }

  function isAlignActive(value: string): boolean {
    if (editor.isActive("image")) {
      return editor.getAttributes("image").dataAlign === value;
    }
    return editor.isActive({ textAlign: value });
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
                onClick={() => handleAlign(value)}
                className={cn(
                  "p-1.5 rounded hover:bg-white/10 text-muted-text hover:text-soft-white transition-colors",
                  isAlignActive(value) && "bg-white/10 text-electric-blue",
                )}
                title={label}
              >
                <Icon size={16} />
              </button>
            ))}
            <div className="h-4 w-[1px] bg-white/10 mx-1" />
            <button
              type="button"
              onClick={openImageDialog}
              className={cn(
                "p-1.5 rounded hover:bg-white/10 text-muted-text hover:text-soft-white transition-colors",
                editor.isActive("image") && "bg-white/10 text-electric-blue",
              )}
              title="Sisipkan gambar"
            >
              <ImageIcon size={16} />
            </button>
            {editor.isActive("image") && (
              <>
                <div className="h-4 w-[1px] bg-white/10 mx-1" />
                {["25", "50", "75", "100"].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => handleResizeImage(w)}
                    className={cn(
                      "px-1.5 py-1 rounded text-xs font-medium hover:bg-white/10 text-muted-text hover:text-soft-white transition-colors",
                      editor.getAttributes("image").width === w && "bg-white/10 text-electric-blue",
                    )}
                    title={`Lebar ${w}%`}
                  >
                    {w}%
                  </button>
                ))}
              </>
            )}
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

      <Dialog open={imageOpen} onOpenChange={setImageOpen}>
        <DialogContent title="Sisipkan Gambar" description="Unggah dari perangkat atau tempel URL gambar.">
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3 rounded-lg border border-dashed border-white/20 p-4">
              <div>
                <p className="text-sm font-medium text-soft-white">Upload dari perangkat</p>
                <p className="text-xs text-muted-text">JPG, PNG, WebP, GIF — maks. 5MB</p>
              </div>
              <Button
                type="button"
                variant="primary"
                size="sm"
                loading={uploading}
                disabled={uploading}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload size={14} />
                {uploading ? "Mengunggah..." : "Pilih File"}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleImageFile(f);
                  e.target.value = "";
                }}
              />
            </div>

            <div className="w-40">
              <Select
                label="Ukuran"
                items={[
                  { value: "25", label: "Kecil (25%)" },
                  { value: "50", label: "Sedang (50%)" },
                  { value: "75", label: "Besar (75%)" },
                  { value: "100", label: "Penuh (100%)" },
                ]}
                value={imageWidth}
                onValueChange={setImageWidth}
              />
            </div>

            <div className="flex items-end gap-3">
              <div className="flex-1">
                <Input
                  label="Atau URL gambar"
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      applyImageUrl();
                    }
                  }}
                />
              </div>
              <Button type="button" variant="outline" onClick={applyImageUrl} disabled={uploading}>
                Sisipkan
              </Button>
            </div>

            {imageError && <p className="text-xs text-destructive">{imageError}</p>}

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="ghost" onClick={() => setImageOpen(false)}>
                Batal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
