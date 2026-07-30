"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Cluster, ClusterFormValues } from "@/features/clusters/types";

const clusterFormSchema = z.object({
  name: z.string().min(1, "Nama cluster wajib diisi"),
  whatsappGroupLink: z.string().url("Format URL tidak valid").optional().or(z.literal("")),
});

type FormData = z.infer<typeof clusterFormSchema>;

function toSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingCluster?: Cluster | null;
  onSubmit: (data: ClusterFormValues) => void;
  isPending?: boolean;
};

export default function ClusterFormDialog({ open, onOpenChange, editingCluster, onSubmit, isPending }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(clusterFormSchema),
    defaultValues: { name: "", whatsappGroupLink: "" },
  });

  const nameValue = watch("name");

  useEffect(() => {
    if (open) {
      if (editingCluster) {
        reset({
          name: editingCluster.name,
          whatsappGroupLink: editingCluster.whatsappGroupLink ?? "",
        });
      } else {
        reset({ name: "", whatsappGroupLink: "" });
      }
    }
  }, [open, editingCluster, reset]);

  function handleFormSubmit(data: FormData) {
    onSubmit({
      name: data.name,
      slug: toSlug(data.name),
      whatsappGroupLink: data.whatsappGroupLink || undefined,
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent title={editingCluster ? "Edit Cluster" : "Buat Cluster Baru"} variant="light">
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <Input
            label="Nama Cluster"
            placeholder="Contoh: Cluster A"
            error={errors.name?.message}
            {...register("name")}
          />
          <p className="-mt-3 text-xs text-slate-400">
            Slug: <span className="font-mono">{toSlug(nameValue) || "-"}</span>
          </p>
          <Input label="Link Grup WhatsApp (opsional)" placeholder="https://chat.whatsapp.com/..." error={errors.whatsappGroupLink?.message} {...register("whatsappGroupLink")} />
          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} disabled={isPending}>
              Batal
            </Button>
            <Button type="submit" variant="primary" loading={isPending} disabled={isPending}>
              {editingCluster ? "Simpan" : "Buat"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
