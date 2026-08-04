"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Cluster } from "@/features/clusters/types";

type Props = {
  onClose: () => void;
  cluster: Cluster;
  onSave: (clusterId: string, whatsappGroupLink: string | null) => void;
  isPending?: boolean;
};

export default function EditWhatsappDialog({ onClose, cluster, onSave, isPending }: Props) {
  const [link, setLink] = useState(cluster?.whatsappGroupLink ?? "");

  function handleSave() {
    onSave(cluster.id, link.trim() || null);
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent title="Link Grup WhatsApp" description={`Atur link grup WhatsApp ${cluster?.name ?? ""}`}>
        <div className="space-y-4">
          <Input
            label="Link Grup WhatsApp"
            placeholder="https://chat.whatsapp.com/..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <p className="text-xs text-muted-text">
            Link akan ditampilkan kepada anggota cluster. Kosongkan untuk menghapus link.
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-white/10 mt-4">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isPending}>
            Batal
          </Button>
          <Button type="button" variant="primary" onClick={handleSave} disabled={isPending} loading={isPending}>
            Simpan
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
