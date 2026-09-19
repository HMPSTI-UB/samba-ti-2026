"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAddClusterOverride } from "@/features/clusters/hooks/use-clusters";
import { useSweetAlert } from "@/components/common/sweet-alert-provider";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export function ClusterOverrideForm({ clusterId }: { clusterId: string }) {
  const [open, setOpen] = useState(false);
  const [deductionPoints, setDeductionPoints] = useState("");
  const [reason, setReason] = useState("");
  const addOverride = useAddClusterOverride();
  const alert = useSweetAlert();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deductionPoints || isNaN(Number(deductionPoints)) || Number(deductionPoints) <= 0) {
      alert.error("Poin deduksi harus lebih dari 0");
      return;
    }
    if (!reason) {
      alert.error("Alasan harus diisi");
      return;
    }

    addOverride.mutate(
      { clusterId, deductionPoints: Number(deductionPoints), reason },
      {
        onSuccess: () => {
          alert.success("Override berhasil ditambahkan");
          setOpen(false);
          setDeductionPoints("");
          setReason("");
        },
        onError: (err: Error & { response?: { data?: { message?: string } } }) => {
          alert.error(err.response?.data?.message || "Gagal menambahkan override");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">Kurangi Skor (Override)</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-soft-white">Tambah Deduksi Skor Cluster</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="deductionPoints" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Jumlah Pengurangan Poin</label>
            <Input
              id="deductionPoints"
              type="number"
              min="1"
              value={deductionPoints}
              onChange={(e) => setDeductionPoints(e.target.value)}
              placeholder="Contoh: 10"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="reason" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Alasan Deduksi</label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Tuliskan alasan pengurangan nilai..."
              required
            />
          </div>
          <Button type="submit" disabled={addOverride.isPending} className="w-full">
            {addOverride.isPending ? "Menyimpan..." : "Simpan Deduksi"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
