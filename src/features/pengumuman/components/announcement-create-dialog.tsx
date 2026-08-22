"use client";

import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import RichTextEditor from "@/components/ui/rich-text-editor";
import type { AnnouncementRow } from "@/features/pengumuman/types";

const announcementSchema = z.object({
  title: z.string().min(3, "Minimal 3 karakter").max(255, "Maksimal 255 karakter"),
  desc: z.string().min(1, "Deskripsi tidak boleh kosong"),
  targetType: z.enum(["ALL", "SPV", "MABA"]),
});

type FormData = z.infer<typeof announcementSchema>;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingAnnouncement?: AnnouncementRow | null;
  onSubmit: (data: FormData) => void;
  isPending?: boolean;
};

export default function AnnouncementCreateDialog({
  open,
  onOpenChange,
  editingAnnouncement,
  onSubmit,
  isPending,
}: Props) {
  const isEditing = !!editingAnnouncement;

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(announcementSchema),
    defaultValues: { title: "", desc: "", targetType: "ALL" },
  });

  useEffect(() => {
    if (!open) return;
    if (editingAnnouncement) {
      reset({
        title: editingAnnouncement.title,
        desc: editingAnnouncement.desc,
        targetType: editingAnnouncement.targetType,
      });
    } else {
      reset({ title: "", desc: "", targetType: "ALL" });
    }
  }, [open, editingAnnouncement, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        title={isEditing ? "Edit Pengumuman" : "Buat Pengumuman"}
        description={isEditing ? "Perbarui isi pengumuman" : "Kirim pengumuman ke peserta"}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Judul" placeholder="Judul pengumuman" error={errors.title?.message} {...register("title")} />

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-soft-white">Isi Pengumuman</label>
            <Controller
              name="desc"
              control={control}
              render={({ field }) => (
                <RichTextEditor
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Tulis isi pengumuman di sini..."
                />
              )}
            />
            {errors.desc && <p className="text-xs text-destructive">{errors.desc.message}</p>}
          </div>

          <Controller
            name="targetType"
            control={control}
            render={({ field }) => (
              <Select
                label="Target"
                items={[
                  { value: "ALL", label: "Semua" },
                  { value: "SPV", label: "SPV" },
                  { value: "MABA", label: "MABA" },
                ]}
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={isPending}>
              Batal
            </Button>
            <Button type="submit" variant="primary" loading={isPending} disabled={isPending}>
              {isEditing ? "Simpan Perubahan" : "Kirim"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}