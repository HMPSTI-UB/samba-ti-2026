"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useCreateTask } from "@/features/penugasan/hooks/use-tasks";
import FormBuilder from "@/features/penugasan/components/form-builder";
import type { FormField } from "@/features/penugasan/types";
import RichTextEditor from "@/components/ui/rich-text-editor";
import { useSweetAlert } from "@/components/common/sweet-alert-provider";

export default function CreateTaskPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [termsConditions, setTermsConditions] = useState<string[]>([]);
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("DRAFT");
  const [deadline, setDeadline] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const createMutation = useCreateTask();
  const alert = useSweetAlert();

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = "Judul wajib diisi";
    if (!description.trim()) errs.description = "Deskripsi wajib diisi";
    if (!deadline) errs.deadline = "Deadline wajib diisi";
    else if (new Date(deadline) <= new Date()) errs.deadline = "Deadline harus di masa depan";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      title: title.trim(),
      description,
      termsConditions,
      formFields: formFields.map((f) => ({
        key: f.key,
        label: f.label,
        type: f.type,
        isRequired: f.isRequired,
        placeholder: f.placeholder,
      })),
      status,
      deadline: new Date(deadline).toISOString(),
    };

    createMutation.mutate(payload, {
      onSuccess: () => {
        alert.success("Tugas berhasil dibuat");
        router.push("/dashboard/tugas");
      },
      onError: (err: Error) => alert.error(err.message),
    });
  }

  function addTermsCondition() {
    if (!termsConditions.includes("")) {
      setTermsConditions([...termsConditions, ""]);
    }
  }

  function removeTermsCondition(idx: number) {
    setTermsConditions(termsConditions.filter((_, i) => i !== idx));
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center gap-4">
          <Button type="button" variant="ghost" onClick={() => window.history.back()}>
            <ArrowLeft size={18} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-soft-white">Buat Tugas Baru</h1>
            <p className="text-sm text-muted-text">Isi form di bawah untuk membuat tugas baru</p>
          </div>
        </div>

      <div className="space-y-4">
        <Input
          label="Judul Tugas"
          placeholder="Contoh: Cerita Pengalaman PKKMB"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={errors.title}
        />

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Deskripsi</label>
          <RichTextEditor
            value={description}
            onChange={setDescription}
            placeholder="Tulis deskripsi tugas di sini..."
            error={errors.description}
          />
          {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Prasyarat</label>
          <div className="space-y-2">
            {termsConditions.map((condition, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  value={condition}
                  onChange={(e) => {
                    const newTerms = [...termsConditions];
                    newTerms[idx] = e.target.value;
                    setTermsConditions(newTerms);
                  }}
                  placeholder="Prasyarat ke-..."
                  className="flex-1 h-10 rounded-md border border-white/10 bg-white/[0.06] px-3 text-sm text-soft-white placeholder:text-muted-text/50 focus:outline-none focus:ring-1 focus:ring-electric-blue"
                />
                <button
                  type="button"
                  onClick={() => removeTermsCondition(idx)}
                  className="p-2 rounded text-muted-text hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Hapus prasyarat"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addTermsCondition}
              className="flex items-center gap-1.5 text-xs font-medium text-electric-blue hover:text-electric-blue/80 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              Tambah Prasyarat
            </button>
          </div>
        </div>

        <FormBuilder
          fields={formFields}
          onChange={setFormFields}
        />

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Status</label>
          <Select
            items={[
              { value: "DRAFT", label: "Draft" },
              { value: "PUBLISHED", label: "Terbit" },
            ]}
            value={status}
            onValueChange={(val) => setStatus(val as "DRAFT" | "PUBLISHED")}
            placeholder="Pilih status"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Deadline</label>
          <input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full h-10 rounded-md border border-white/10 bg-white/[0.06] px-3 text-sm text-soft-white placeholder:text-muted-text/50 focus:outline-none focus:ring-1 focus:ring-electric-blue"
          />
          {errors.deadline && <p className="text-xs text-destructive">{errors.deadline}</p>}
        </div>
      </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
          <Button type="button" variant="ghost" onClick={() => router.back()}>
            Batal
          </Button>
          <Button type="submit" variant="primary" loading={createMutation.isPending} disabled={createMutation.isPending}>
            <Save size={16} className="mr-1.5" />
            Simpan Tugas
          </Button>
        </div>
      </form>
    </div>
  );
}