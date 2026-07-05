"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

const variants = [
  "primary",
  "secondary",
  "accent",
  "ghost",
  "outline",
  "destructive",
] as const;
const sizes = ["sm", "md", "lg"] as const;

const selectItems = [
  { value: "nebula", label: "NEBULA" },
  { value: "fusion", label: "FUSION" },
  { value: "supernova", label: "SUPERNOVA" },
  { value: "zenith", label: "ZENITH" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-bold text-soft-white font-heading tracking-wider">
        {title}
      </h2>
      <div className="rounded-xl border border-border-glow bg-card-bg p-6 backdrop-blur-sm">
        {children}
      </div>
    </section>
  );
}

export default function DesignSystemPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [smallDialogOpen, setSmallDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownChecked, setDropdownChecked] = useState(false);

  return (
    <div className="min-h-screen bg-deep-space p-8">
      <div className="mx-auto max-w-4xl space-y-10">
        <header className="space-y-2">
          <h1 className="text-2xl font-bold text-soft-white font-heading tracking-wider">
            Design System
          </h1>
          <p className="text-sm text-muted-text">
            Component gallery — all variants and states
          </p>
        </header>

        <Section title="Colors">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { name: "Primary", var: "bg-primary", hex: "#7C3AED" },
              { name: "Secondary", var: "bg-secondary", hex: "#38BDF8" },
              { name: "Accent", var: "bg-accent", hex: "#FB923C" },
              { name: "Destructive", var: "bg-destructive", hex: "#EF4444" },
              { name: "Deep Space", var: "bg-deep-space", hex: "#050816" },
              { name: "Midnight Navy", var: "bg-midnight-navy", hex: "#0B1026" },
              { name: "Cosmic Purple", var: "bg-cosmic-purple", hex: "#7C3AED" },
              { name: "Electric Blue", var: "bg-electric-blue", hex: "#38BDF8" },
              { name: "Star Gold", var: "bg-star-gold", hex: "#FACC15" },
              { name: "Supernova Orange", var: "bg-supernova-orange", hex: "#FB923C" },
              { name: "Soft White", var: "bg-soft-white", hex: "#F8FAFC" },
              { name: "Muted Text", var: "bg-muted-text", hex: "#94A3B8" },
              { name: "Primary Hover", var: "bg-primary-hover", hex: "#6D28D9" },
              { name: "Secondary Hover", var: "bg-secondary-hover", hex: "#0EA5E9" },
              { name: "Accent Hover", var: "bg-accent-hover", hex: "#F97316" },
              { name: "Destructive Hover", var: "bg-destructive-hover", hex: "#DC2626" },
            ].map((c) => (
              <div key={c.name} className="flex items-center gap-3">
                <div className={`h-10 w-10 shrink-0 rounded-lg ${c.var} shadow-lg`} />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-soft-white truncate">{c.name}</p>
                  <p className="text-[10px] text-muted-text">{c.hex}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Typography">
          <div className="space-y-5">
            <div>
              <p className="mb-1 text-xs tracking-widest text-muted-text uppercase">Display / Hero</p>
              <div className="space-y-1">
                <h1 className="text-4xl font-bold text-soft-white font-heading tracking-wide">
                  Orbitron Bold H1 — The Future Is Ours
                </h1>
                <p className="text-xs text-muted-text">
                  font-heading · text-4xl · font-bold · tracking-wide
                </p>
              </div>
            </div>
            <div className="h-px bg-border-glow" />
            <div>
              <p className="mb-1 text-xs tracking-widest text-muted-text uppercase">Section Headers</p>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-soft-white font-heading tracking-wider">
                  Orbitron Bold H2 — Explore Beyond Limits
                </h2>
                <p className="text-xs text-muted-text">
                  font-heading · text-2xl · font-bold · tracking-wider
                </p>
              </div>
            </div>
            <div className="h-px bg-border-glow" />
            <div>
              <p className="mb-1 text-xs tracking-widest text-muted-text uppercase">Sub-section Headers</p>
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-soft-white font-heading tracking-wider">
                  Orbitron SemiBold H3 — Built for Visionaries
                </h3>
                <p className="text-xs text-muted-text">
                  font-heading · text-xl · font-semibold · tracking-wider
                </p>
              </div>
            </div>
            <div className="h-px bg-border-glow" />
            <div>
              <p className="mb-1 text-xs tracking-widest text-muted-text uppercase">Body Text</p>
              <div className="space-y-1">
                <p className="text-base text-soft-white font-body leading-relaxed">
                  Montserrat Regular body text — used for paragraphs, descriptions, and long-form
                  content. SAMBA TI 2026 adalah acara orientasi untuk mahasiswa baru Teknologi
                  Informasi Universitas Brawijaya dengan tema &ldquo;Zealous Evolution of New IT Heroes&rdquo;.
                </p>
                <p className="text-xs text-muted-text">
                  font-body · text-base · font-normal · leading-relaxed
                </p>
              </div>
            </div>
            <div className="h-px bg-border-glow" />
            <div>
              <p className="mb-1 text-xs tracking-widest text-muted-text uppercase">Text Sizes</p>
              <div className="space-y-2">
                {[
                  { size: "xs", text: "text-xs — Small labels, captions, metadata" },
                  { size: "sm", text: "text-sm — Body small, input text, descriptions" },
                  { size: "base", text: "text-base — Default body text" },
                  { size: "lg", text: "text-lg — Lead paragraphs, emphasized content" },
                  { size: "xl", text: "text-xl — Sub-headers (H3)" },
                  { size: "2xl", text: "text-2xl — Section headers (H2)" },
                  { size: "3xl", text: "text-3xl — Large section headers" },
                  { size: "4xl", text: "text-4xl — Hero / Display (H1)" },
                ].map(({ size, text }) => (
                  <div key={size} className="flex items-baseline gap-3">
                    <code className="w-10 text-[10px] text-muted-text shrink-0">{size}</code>
                    <p className={`text-${size} text-soft-white font-body`}>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section title="Button">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-3">
              {variants.map((v) => (
                <Button key={v} variant={v}>
                  {v}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap items-end gap-3">
              {sizes.map((s) => (
                <Button key={s} variant="primary" size={s}>
                  {s}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" loading>
                Loading
              </Button>
              <Button variant="primary" disabled>
                Disabled
              </Button>
              <Button variant="outline" disabled>
                Disabled
              </Button>
            </div>
            <div className="flex flex-wrap gap-3">
              {variants.map((v) => (
                <a key={v} href="#demo">
                  <Button variant={v}>{v} link</Button>
                </a>
              ))}
            </div>
          </div>
        </Section>

        <Section title="Input">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Default" placeholder="Masukkan teks..." />
            <Input
              label="With Error"
              placeholder="Email"
              error="Email tidak valid"
            />
            <Input
              label="Helper Text"
              placeholder="Ketik sesuatu..."
              helperText="Minimal 8 karakter"
            />
            <Input label="Disabled" placeholder="Tidak bisa diisi" disabled />
          </div>
        </Section>

        <Section title="Select">
          <div className="grid gap-4 sm:grid-cols-2">
            <Select
              label="Pilih Phase"
              items={selectItems}
              placeholder="Pilih phase..."
            />
            <Select
              label="With Error"
              items={selectItems}
              placeholder="Pilih phase..."
              error="Wajib dipilih"
            />
            <Select
              label="Disabled"
              items={selectItems}
              placeholder="Tidak tersedia"
              disabled
            />
          </div>
        </Section>

        <Section title="Checkbox">
          <div className="space-y-3">
            <Checkbox label="Default checkbox" />
            <Checkbox label="Checked" defaultChecked />
            <Checkbox label="With error" error="Harus disetujui" />
            <Checkbox label="Disabled" disabled />
          </div>
        </Section>

        <Section title="Switch">
          <div className="space-y-3">
            <Switch label="Default toggle" />
            <Switch label="Active" defaultChecked />
            <Switch label="Disabled" disabled />
          </div>
        </Section>

        <Section title="Dialog">
          <div className="flex gap-3">
            <Button variant="primary" onClick={() => setDialogOpen(true)}>
              Open Dialog
            </Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogContent title="Konfirmasi" description="Apakah kamu yakin ingin melanjutkan?">
                <p className="text-sm text-muted-text">
                  Tindakan ini tidak dapat dibatalkan. Data yang sudah diproses akan
                  tersimpan secara permanen.
                </p>
                <div className="mt-4 flex justify-end gap-3">
                  <Button variant="ghost" onClick={() => setDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button variant="destructive" onClick={() => setDialogOpen(false)}>
                    Hapus
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline" onClick={() => setSmallDialogOpen(true)}>
              Small Dialog
            </Button>
            <Dialog open={smallDialogOpen} onOpenChange={setSmallDialogOpen}>
              <DialogContent title="Info">
                <p className="text-sm text-muted-text">
                  Dialog tanpa deskripsi dengan konten minimal.
                </p>
              </DialogContent>
            </Dialog>
          </div>
        </Section>

        <Section title="Dropdown Menu">
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setDropdownOpen(true)}>
              Open Menu
            </Button>
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setDropdownOpen(false)}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDropdownOpen(false)}>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDropdownOpen(false)}>Help</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={dropdownChecked}
                  onCheckedChange={setDropdownChecked}
                >
                  Show details
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive" onClick={() => setDropdownOpen(false)}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </Section>

        <Section title="Toast">
          <div className="flex flex-wrap gap-2">
            <Button variant="primary" onClick={() => toast.success("Berhasil", { description: "Data berhasil disimpan" })}>
              Success
            </Button>
            <Button variant="destructive" onClick={() => toast.error("Gagal", { description: "Terjadi kesalahan server" })}>
              Error
            </Button>
            <Button variant="accent" onClick={() => toast.warning("Perhatian", { description: "Data akan kedaluwarsa" })}>
              Warning
            </Button>
            <Button
              variant="outline"
              className="border-cosmic-purple/60 hover:border-cosmic-purple hover:text-cosmic-purple"
              onClick={() => toast.info("Info", { description: "Fitur ini akan tersedia" })}
            >
              Info
            </Button>
            <Button variant="ghost" onClick={() => toast("Toast biasa", { description: "Tanpa ikon" })}>
              Default
            </Button>
            <Button variant="secondary" onClick={() => toast.loading("Memproses...")}>
              Loading
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                toast.promise(
                  new Promise((resolve) => setTimeout(resolve, 2000)),
                  {
                    loading: "Menyimpan...",
                    success: "Tersimpan!",
                    error: "Gagal menyimpan",
                  },
                )
              }
            >
              Promise
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                toast("Hapus data?", {
                  description: "Tindakan ini tidak dapat dibatalkan",
                  action: { label: "Hapus", onClick: () => toast.success("Data dihapus") },
                  cancel: { label: "Batal", onClick: () => toast.info("Dibatalkan") },
                })
              }
            >
              With Action
            </Button>
          </div>
        </Section>
      </div>
    </div>
  );
}
