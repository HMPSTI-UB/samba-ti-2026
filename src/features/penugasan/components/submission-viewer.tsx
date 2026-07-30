"use client";

import { useState } from "react";
import { Table, THead, TBody, TR, TH, TD } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/cn";
import { Eye, CheckCircle, XCircle } from "lucide-react";
import type { Submission } from "@/features/penugasan/types";

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-50 text-amber-700",
  ACCEPTED: "bg-emerald-50 text-emerald-700",
  REJECTED: "bg-red-50 text-red-700",
};

type Props = {
  submissions: Submission[];
  onReview: (id: string, status: "ACCEPTED" | "REJECTED", feedback: string) => void;
  isPending?: boolean;
};

export default function SubmissionViewer({ submissions, onReview, isPending }: Props) {
  const [selected, setSelected] = useState<Submission | null>(null);
  const [feedback, setFeedback] = useState("");

  function handleReview(status: "ACCEPTED" | "REJECTED") {
    if (!selected) return;
    onReview(selected.id, status, feedback);
    setSelected(null);
    setFeedback("");
  }

  if (submissions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Eye size={32} className="text-slate-400 mb-3" />
        <p className="text-sm text-slate-500">Belum ada submission</p>
      </div>
    );
  }

  return (
    <>
      <Table>
        <THead>
          <TR>
            <TH>MABA</TH>
            <TH>Status</TH>
            <TH>Dikumpulkan</TH>
            <TH></TH>
          </TR>
        </THead>
        <TBody>
          {submissions.map((sub) => (
            <TR key={sub.id}>
              <TD className="font-medium text-slate-900">{sub.mabaName}</TD>
              <TD>
                <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-xs font-medium", statusColors[sub.status])}>
                  {sub.status === "PENDING" ? "Menunggu" : sub.status === "ACCEPTED" ? "Diterima" : "Ditolak"}
                </span>
              </TD>
              <TD className="text-sm text-slate-500">
                {new Date(sub.submittedAt).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TD>
              <TD>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => { setSelected(sub); setFeedback(sub.feedback ?? ""); }}
                  className="text-xs gap-1.5"
                >
                  <Eye size={14} />
                  Detail
                </Button>
              </TD>
            </TR>
          ))}
        </TBody>
      </Table>

      <Dialog open={!!selected} onOpenChange={(open) => { if (!open) { setSelected(null); setFeedback(""); } }}>
        <DialogContent title="Detail Submission" description={selected?.mabaName ?? ""} variant="light">
          {selected && (
            <div className="space-y-4">
              <div className="space-y-3">
                {Object.entries(selected.data).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-slate-500 mb-1">{key}</label>
                    <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900">
                      {value || <span className="text-slate-400">—</span>}
                    </div>
                  </div>
                ))}
              </div>

              <Input
                label="Feedback"
                placeholder="Masukkan feedback untuk MABA"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleReview("REJECTED")}
                  disabled={isPending}
                  className="gap-1.5"
                >
                  <XCircle size={14} />
                  Tolak
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleReview("ACCEPTED")}
                  disabled={isPending}
                  className="gap-1.5"
                >
                  <CheckCircle size={14} />
                  Terima
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
