"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import DateTimePicker from "@/components/ui/date-time-picker";
import FormBuilder from "./form-builder";
import type { FormField, CreateTaskInput, CampaignLetter } from "@/features/penugasan/types";
import { CAMPAIGN_LETTERS } from "@/features/penugasan/types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateTaskInput) => void;
  isPending?: boolean;
};

export default function CreateTaskDialog({ open, onOpenChange, onSubmit, isPending }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [termsConditions, setTermsConditions] = useState("");
  const [letter, setLetter] = useState<CampaignLetter>("Z");
  const [deadline, setDeadline] = useState<Date | undefined>();
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function reset() {
    setTitle("");
    setDescription("");
    setTermsConditions("");
    setLetter("Z");
    setDeadline(undefined);
    setFormFields([]);
    setErrors({});
  }

  function handleOpenChange(open: boolean) {
    if (!open) reset();
    onOpenChange(open);
  }

  function validate(): boolean {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = "Judul wajib diisi";
    if (!description.trim()) errs.description = "Deskripsi wajib diisi";
    if (!deadline) errs.deadline = "Deadline wajib diisi";
    else if (deadline < new Date()) errs.deadline = "Deadline harus di masa depan";

    if (formFields.length === 0) {
      errs.formFields = "Minimal 1 field";
    } else {
      formFields.forEach((f, i) => {
        if (!f.label.trim()) errs[`field_${i}`] = `Label field ke-${i + 1} wajib diisi`;
      });
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit() {
    if (!validate()) return;

    const cleanedFields = formFields.map((f) => ({
      ...f,
      label: f.label.trim(),
    }));

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      termsConditions: termsConditions.trim(),
      formFields: cleanedFields,
      letter,
      deadline: deadline!.toISOString(),
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent title="Buat Tugas Baru" description="Buat tugas dengan form dinamis untuk MABA" variant="light">
        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
          <Input label="Judul Tugas" placeholder="Contoh: Cerita Pengalaman PKKMB" value={title} onChange={(e) => setTitle(e.target.value)} error={errors.title} />
          <Input label="Deskripsi" placeholder="Penjelasan tugas" value={description} onChange={(e) => setDescription(e.target.value)} error={errors.description} />
          <Input label="Syarat & Ketentuan (opsional)" placeholder="Syarat dan ketentuan pengerjaan" value={termsConditions} onChange={(e) => setTermsConditions(e.target.value)} />
          <Select
            label="Campaign Letter"
            items={CAMPAIGN_LETTERS.map((l) => ({ value: l, label: `Letter ${l}` }))}
            value={letter}
            onValueChange={(v) => setLetter(v as CampaignLetter)}
            placeholder="Pilih letter"
          />
          <DateTimePicker label="Deadline" value={deadline} onChange={setDeadline} error={errors.deadline} />

          <FormBuilder fields={formFields} onChange={setFormFields} />
          {errors.formFields && <p className="text-xs text-destructive">{errors.formFields}</p>}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 mt-4">
          <Button type="button" variant="ghost" onClick={() => handleOpenChange(false)} disabled={isPending}>
            Batal
          </Button>
          <Button type="button" variant="primary" onClick={handleSubmit} loading={isPending} disabled={isPending}>
            Buat Tugas
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
