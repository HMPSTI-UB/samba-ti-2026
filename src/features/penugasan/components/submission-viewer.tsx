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
  PENDING: "bg-amber-500/10 text-amber-400",
  ACCEPTED: "bg-emerald-500/10 text-emerald-400",
  REJECTED: "bg-red-500/10 text-red-400",
};

type Props = {
  submissions: Submission[];
  onReview: (submission: Submission, status: "ACCEPTED" | "REJECTED", feedback: string) => void;
  isPending?: boolean;
  fieldTypes?: Record<string, string>;
};

export default function SubmissionViewer({ submissions, onReview, isPending, fieldTypes }: Props) {
  const [selected, setSelected] = useState<Submission | null>(null);
  const [feedback, setFeedback] = useState("");

  function handleReview(status: "ACCEPTED" | "REJECTED") {
    if (!selected) return;
    onReview(selected, status, feedback);
    setSelected(null);
    setFeedback("");
  }

  if (submissions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Eye size={32} className="text-muted-text mb-3" />
        <p className="text-sm text-muted-text">Belum ada submission</p>
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
              <TD className="font-medium text-soft-white">{sub.mabaName}</TD>
              <TD>
                <span className={cn("inline-block rounded-full px-2.5 py-0.5 text-xs font-medium", statusColors[sub.status])}>
                  {sub.status === "PENDING" ? "Menunggu" : sub.status === "ACCEPTED" ? "Diterima" : "Ditolak"}
                </span>
              </TD>
              <TD className="text-sm text-muted-text">
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
        <DialogContent title="Detail Submission" description={selected?.mabaName ?? ""}>
          {selected && (
            <div className="space-y-4">
              <div className="space-y-3">
                {Object.entries(selected.submissionData ?? {}).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-xs font-medium text-muted-text mb-1">{key}</label>
                    {fieldTypes?.[key] === "link" && value ? (
                      <a
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex max-w-full items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-electric-blue underline break-all hover:bg-white/10"
                      >
                        {value}
                      </a>
                    ) : (
                      <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-soft-white whitespace-pre-wrap break-words">
                        {value || <span className="text-muted-text">—</span>}
                      </div>
                    )}
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
