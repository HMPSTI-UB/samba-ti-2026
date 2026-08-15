"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useTask, useUpdateTask, useDeleteTask } from "@/features/penugasan/hooks/use-tasks";
import FormBuilder from "@/features/penugasan/components/form-builder";
import type { FormField } from "@/features/penugasan/types";
import DeleteTaskDialog from "@/features/penugasan/components/delete-task-dialog";
import RichTextEditor from "@/components/ui/rich-text-editor";
import { useSweetAlert } from "@/components/common/sweet-alert-provider";

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [termsConditions, setTermsConditions] = useState<string[]>([]);
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [status, setStatus] = useState<"DRAFT" | "PUBLISHED">("DRAFT");
  const [deadline, setDeadline] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [deleteOpen, setDeleteOpen] = useState(false);

  const { data: taskRes } = useTask(id);
  const updateMutation = useUpdateTask();
  const deleteMutation = useDeleteTask();
  const alert = useSweetAlert();

  const task = taskRes?.data;

  useEffect(() => {
    if (task) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTitle(task.title);
      setDescription(task.description);
      setTermsConditions(task.termsConditions ?? []);
      setFormFields(task.formFields ?? []);
      setStatus(task.status === "DRAFT" || task.status === "PUBLISHED" ? task.status : "DRAFT");
      setDeadline(task.deadline ? task.deadline.slice(0, 16) : "");
    }
  }, [task]);

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
      id,
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
      status: status === "DRAFT" || status === "PUBLISHED" ? status : "DRAFT",
      deadline: new Date(deadline).toISOString(),
    };

    updateMutation.mutate(payload, {
      onSuccess: () => {
        alert.success("Tugas berhasil diupdate");
        router.push("/dashboard/tugas");
      },
      onError: (err: Error) => alert.error(err.message),
    });
  }

  function handleDelete() {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        alert.success("Tugas berhasil dihapus");
        router.push("/dashboard/tugas");
      },
      onError: (err: Error) => alert.error(err.message),
    });
  }

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-electric-blue/30 border-t-electric-blue" />
        </div>
        <p className="text-muted-text mt-4">Memuat data tugas...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center gap-4">
          <Button type="button" variant="ghost" onClick={() => router.back()}>
            <ArrowLeft size={18} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-soft-white">Edit Tugas</h1>
            <p className="text-sm text-muted-text">Perbarui informasi tugas</p>
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
                  onClick={() => {
                    const newTerms = termsConditions.filter((_, i) => i !== idx);
                    setTermsConditions(newTerms);
                  }}
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
              onClick={() => setTermsConditions([...termsConditions, ""])}
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
          <Button type="button" variant="destructive" onClick={() => setDeleteOpen(true)}>
            Hapus Tugas
          </Button>
          <Button type="button" variant="ghost" onClick={() => router.back()}>
            Batal
          </Button>
          <Button type="submit" variant="primary" loading={updateMutation.isPending} disabled={updateMutation.isPending}>
            Simpan Perubahan
          </Button>
        </div>
      </form>

      <DeleteTaskDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        task={task}
        onConfirm={handleDelete}
        isPending={deleteMutation.isPending}
      />
    </div>
  );
}