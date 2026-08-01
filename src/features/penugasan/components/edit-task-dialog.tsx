"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import DateTimePicker from "@/components/ui/date-time-picker";
import FormBuilder from "./form-builder";
import type { Task, CampaignLetter, FormField, UpdateTaskInput } from "@/features/penugasan/types";
import { CAMPAIGN_LETTERS } from "@/features/penugasan/types";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task | null;
  onSubmit: (data: UpdateTaskInput) => void;
  isPending?: boolean;
};

export default function EditTaskDialog({ open, onOpenChange, task, onSubmit, isPending }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [letter, setLetter] = useState<CampaignLetter>("Z");
  const [termsConditions, setTermsConditions] = useState("");
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [deadline, setDeadline] = useState<Date | undefined>();
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setLetter(task.letter);
      setTermsConditions(task.termsConditions ?? "");
      setFormFields(task.formFields ?? []);
      setDeadline(new Date(task.deadline));
    }
  }, [task]);

  function reset() {
    setTitle("");
    setDescription("");
    setLetter("Z");
    setTermsConditions("");
    setFormFields([]);
    setDeadline(undefined);
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
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit() {
    if (!validate() || !task) return;

    onSubmit({
      id: task.id,
      title: title.trim(),
      description: description.trim(),
      letter,
      termsConditions: termsConditions.trim() || undefined,
      formFields,
      deadline: deadline!.toISOString(),
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent title="Edit Tugas" description="Edit tugas yang sudah ada">
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
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-white/10 mt-4">
          <Button type="button" variant="ghost" onClick={() => handleOpenChange(false)} disabled={isPending}>
            Batal
          </Button>
          <Button type="button" variant="primary" onClick={handleSubmit} loading={isPending} disabled={isPending}>
            Simpan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
