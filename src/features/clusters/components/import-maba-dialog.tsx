"use client";

import { useState, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, Download, CheckCircle, XCircle, AlertTriangle, FileText, Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";
import { useSweetAlert } from "@/components/common/sweet-alert-provider";
import { ApiError } from "@/lib/api/errors";
import { useImportMaba, useExistingNims } from "@/features/clusters/hooks/use-import-maba";
import type { ImportMabaResult } from "@/features/clusters/api/import";

type CsvPreviewRow = {
  name: string;
  nim: string;
  email: string;
  gender: string;
  duplicate: boolean;
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function parseCsvPreview(text: string): { rows: CsvPreviewRow[]; errors: string[] } {
  const lines = text.split("\n").filter((l) => l.trim());
  if (lines.length < 2) return { rows: [], errors: ["CSV kosong atau hanya baris header"] };

  const header = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
  const nameIdx = header.findIndex((h) => h.toLowerCase().includes("nama"));
  const nimIdx = header.findIndex((h) => h.toLowerCase().includes("nim"));
  const emailIdx = header.findIndex((h) => h.toLowerCase().includes("email"));
  const genderIdx = header.findIndex((h) => h.toLowerCase().includes("jenis kelamin"));

  if (nameIdx === -1 || nimIdx === -1 || emailIdx === -1) {
    return { rows: [], errors: ["Kolom Nama lengkap, NIM, atau Email pribadi tidak ditemukan"] };
  }

  const rows: CsvPreviewRow[] = [];
  const errors: string[] = [];
  const seenNims = new Set<string>();

  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].split(",").map((c) => c.trim().replace(/^"|"$/g, ""));
    const name = cols[nameIdx] ?? "";
    const nim = (cols[nimIdx] ?? "").replace(/["'`]/g, "");
    const email = cols[emailIdx] ?? "";
    const gender = genderIdx !== -1 ? (cols[genderIdx] ?? "") : "";

    if (!name && !nim && !email) continue;
    if (!name) { errors.push(`Baris ${i + 1}: Nama kosong`); continue; }
    if (!/^\d{15}$/.test(nim)) { errors.push(`Baris ${i + 1}: NIM "${nim}" tidak valid`); continue; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { errors.push(`Baris ${i + 1}: Email "${email}" tidak valid`); continue; }

    const duplicate = seenNims.has(nim);
    seenNims.add(nim);
    rows.push({ name, nim, email, gender, duplicate });
  }

  return { rows, errors };
}

function genderLabel(raw: string): string {
  const n = raw.trim().toLowerCase();
  if (!n) return "-";
  if (n.includes("perempuan") || n === "p" || n === "female" || n === "wanita" || n === "cewek") return "Perempuan";
  if (n.includes("laki") || n === "l" || n === "male" || n === "pria" || n === "cowok") return "Laki-laki";
  return raw;
}

function downloadCsv(users: ImportMabaResult["users"], filename: string) {
  const BOM = "\uFEFF";
  const header = "Nama,NIM,Email,Password,Gender";
  const rows = users.map((u) =>
    [u.name, u.nim, u.email, u.password, u.gender ?? ""].map((v) => `"${v.replace(/"/g, '""')}"`).join(","),
  );
  const blob = new Blob([BOM + header + "\n" + rows.join("\n")], { type: "text/csv;charset=utf-8;bom" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ImportMabaDialog({ open, onOpenChange }: Props) {
  const [step, setStep] = useState<"upload" | "preview" | "result">("upload");
  const [file, setFile] = useState<File | null>(null);
  const [previewRows, setPreviewRows] = useState<CsvPreviewRow[]>([]);
  const [previewErrors, setPreviewErrors] = useState<string[]>([]);
  const [result, setResult] = useState<ImportMabaResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const importMutation = useImportMaba();
  const { existingNims, isLoading: nimsLoading } = useExistingNims(open);
  const { error: alertError } = useSweetAlert();
  const [dragOver, setDragOver] = useState(false);

  function reset() {
    setStep("upload");
    setFile(null);
    setPreviewRows([]);
    setPreviewErrors([]);
    setResult(null);
  }

  function handleOpenChange(v: boolean) {
    if (!v) reset();
    onOpenChange(v);
  }

  function handleFile(file: File) {
    if (!file.name.endsWith(".csv")) {
      setPreviewErrors(["File harus berformat .csv"]);
      return;
    }
    setFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const { rows, errors } = parseCsvPreview(text);
      setPreviewRows(rows);
      setPreviewErrors(errors);
      setStep("preview");
    };
    reader.readAsText(file);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }

  function handleImport() {
    const rows = previewRows
      .filter((r) => !r.duplicate && !existingNims.has(r.nim))
      .map((r) => ({ name: r.name, nim: r.nim, email: r.email, gender: r.gender }));
    if (rows.length === 0) return;
    importMutation.mutate(rows, {
      onSuccess: (res) => {
        setResult(res.data ?? res as unknown as ImportMabaResult);
        setStep("result");
      },
      onError: (err) => {
        alertError(err instanceof ApiError ? err.message : "Gagal mengimpor data");
      },
    });
  }

  const isPending = importMutation.isPending;
  const newRows = previewRows.filter((r) => !r.duplicate && !existingNims.has(r.nim));
  const inFileDupCount = previewRows.filter((r) => r.duplicate).length;
  const inDbCount = previewRows.filter((r) => !r.duplicate && existingNims.has(r.nim)).length;
  const importableCount = newRows.length;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent title="Import MABA" className={cn(step === "preview" && "max-w-2xl")}>
        {step === "upload" && (
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            className={cn(
              "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 cursor-pointer transition-colors",
              dragOver ? "border-electric-blue bg-electric-blue/5" : "border-white/20 hover:border-white/40",
            )}
          >
            <Upload size={32} className="text-muted-text" />
            <div className="text-center">
              <p className="text-sm font-medium text-soft-white">Klik atau taruh file CSV di sini</p>
              <p className="text-xs text-muted-text mt-1">Format: Nama lengkap, NIM, Email pribadi, Jenis Kelamin</p>
            </div>
            <input
              ref={inputRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
            />
          </div>
        )}

        {step === "preview" && (
          <div className="space-y-4">
            {nimsLoading ? (
              <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
                <Loader2 size={24} className="animate-spin text-electric-blue" />
                <p className="text-sm text-muted-text">Mengecek NIM ke database...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-text">
                    <strong className="text-soft-white">{importableCount}</strong> data baru akan di-import
                    {inFileDupCount > 0 && (
                      <span className="text-amber-400">, {inFileDupCount} duplikat dalam file dilewati</span>
                    )}
                    {inDbCount > 0 && (
                      <span className="text-sky-400">, {inDbCount} sudah terdaftar di database (disembunyikan)</span>
                    )}
                    {file && <span className="ml-1">dari <FileText size={14} className="inline" /> {file.name}</span>}
                  </p>
                </div>

                {previewErrors.length > 0 && (
                  <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
                    <p className="text-xs font-medium text-amber-300 mb-1">Peringatan ({previewErrors.length})</p>
                    <ul className="space-y-0.5">
                      {previewErrors.map((e, i) => (
                        <li key={i} className="text-xs text-amber-400">{e}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="max-h-60 overflow-y-auto rounded-lg border border-white/10">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-white/5 text-left text-muted-text">
                        <th className="px-3 py-2 font-medium">#</th>
                        <th className="px-3 py-2 font-medium">Nama</th>
                        <th className="px-3 py-2 font-medium">NIM</th>
                        <th className="px-3 py-2 font-medium">Email</th>
                        <th className="px-3 py-2 font-medium">Gender</th>
                        <th className="px-3 py-2 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {newRows.slice(0, 50).map((row, i) => (
                        <tr key={i} className="hover:bg-white/5">
                          <td className="px-3 py-2 text-muted-text">{i + 1}</td>
                          <td className="px-3 py-2 font-medium text-soft-white">{row.name}</td>
                          <td className="px-3 py-2 text-muted-text">{row.nim}</td>
                          <td className="px-3 py-2 text-muted-text">{row.email}</td>
                          <td className="px-3 py-2">
                            <span className={cn(
                              "inline-block rounded-full px-2 py-0.5 text-xs font-medium",
                              genderLabel(row.gender) === "Perempuan"
                                ? "bg-pink-500/10 text-pink-400"
                                : genderLabel(row.gender) === "Laki-laki"
                                  ? "bg-blue-500/10 text-blue-400"
                                  : "bg-white/10 text-muted-text",
                            )}>
                              {genderLabel(row.gender)}
                            </span>
                          </td>
                          <td className="px-3 py-2">
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
                              <CheckCircle size={10} />
                              Akan di-import
                            </span>
                          </td>
                        </tr>
                      ))}
                      {newRows.length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-3 py-8 text-center text-muted-text italic">
                            Tidak ada data baru untuk di-import
                          </td>
                        </tr>
                      )}
                      {newRows.length > 50 && (
                        <tr>
                          <td colSpan={6} className="px-3 py-2 text-center text-muted-text italic">
                            ... dan {newRows.length - 50} lainnya
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <Button type="button" variant="ghost" onClick={() => setStep("upload")} disabled={isPending}>
                    Ganti File
                  </Button>
                  <Button type="button" variant="primary" onClick={handleImport} loading={isPending} disabled={isPending || importableCount === 0}>
                    Import {importableCount} Data
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {step === "result" && result && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 rounded-xl border p-4">
              {result.created > 0 ? (
                <CheckCircle size={28} className="text-emerald-500 shrink-0" />
              ) : (
                <XCircle size={28} className="text-red-500 shrink-0" />
              )}
              <div>
                <p className="text-sm font-medium text-soft-white">
                  {result.created > 0 ? "Import berhasil!" : "Import gagal"}
                </p>
                <p className="text-xs text-muted-text mt-0.5">
                  {result.created} berhasil dibuat
                  {result.skipped > 0 && `, ${result.skipped} dilewati (NIM sudah terdaftar)`}
                </p>
              </div>
            </div>

            {result.errors.length > 0 && (
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
                <p className="text-xs font-medium text-amber-300 mb-1">
                  <AlertTriangle size={12} className="inline mr-1" />
                  {result.errors.length} data tidak bisa di-import
                </p>
                <ul className="space-y-0.5 max-h-24 overflow-y-auto">
                  {result.errors.map((e, i) => (
                    <li key={i} className="text-xs text-amber-400">Baris {e.row}: {e.reason}</li>
                  ))}
                </ul>
              </div>
            )}

            {result.users.length > 0 && (
              <div className="rounded-lg border border-white/10 p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-medium text-muted-text">
                    {result.users.length} akun dibuat — <span className="text-amber-400">simpan password ini!</span>
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => downloadCsv(result.users, `maba-passwords-${Date.now()}.csv`)}
                    className="gap-1.5 text-xs"
                  >
                    <Download size={12} />
                    Download CSV
                  </Button>
                </div>
                <div className="max-h-40 overflow-y-auto rounded border border-white/10">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-white/5 text-left text-muted-text">
                        <th className="px-2 py-1.5 font-medium">Nama</th>
                        <th className="px-2 py-1.5 font-medium">NIM</th>
                        <th className="px-2 py-1.5 font-medium">Password</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {result.users.map((u, i) => (
                        <tr key={i} className="hover:bg-white/5">
                          <td className="px-2 py-1.5 text-soft-white">{u.name}</td>
                          <td className="px-2 py-1.5 text-muted-text">{u.nim}</td>
                          <td className="px-2 py-1.5 font-mono text-soft-white">{u.password}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <Button type="button" variant="primary" onClick={() => handleOpenChange(false)}>
                Selesai
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
