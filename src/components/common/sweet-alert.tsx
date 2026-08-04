"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type Props = {
  open: boolean;
  onClose: () => void;
  type: "success" | "error";
  title?: string;
  message?: string;
  okLabel?: string;
  onOk?: () => void;
  duration?: number;
};

const DEFAULT_DURATION = 3000;
const TICK = 100;

const CONFIG = {
  success: {
    image: "/assets/success.png",
    alt: "Sukses",
    title: "Sukses",
    button: "primary",
    titleClass: "text-emerald-400",
    barClass: "bg-emerald-400",
  },
  error: {
    image: "/assets/error.png",
    alt: "Gagal",
    title: "Gagal",
    button: "destructive",
    titleClass: "text-red-400",
    barClass: "bg-red-400",
  },
} as const;

export default function SweetAlert({ open, onClose, ...rest }: Props) {
  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="max-w-sm">
        <AlertContent onClose={onClose} {...rest} />
      </DialogContent>
    </Dialog>
  );
}

function AlertContent({
  type,
  title,
  message,
  okLabel = "OK",
  onOk,
  onClose,
  duration = DEFAULT_DURATION,
}: Omit<Props, "open">) {
  const cfg = CONFIG[type];
  const autoClose = duration > 0;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!autoClose) return;
    const id = setInterval(() => {
      setProgress((p) => Math.min(1, p + TICK / duration));
    }, TICK);
    return () => clearInterval(id);
  }, [autoClose, duration]);

  useEffect(() => {
    if (autoClose && progress >= 1) {
      onClose();
    }
  }, [autoClose, progress, onClose]);

  function handleOk() {
    onOk?.();
    onClose();
  }

  return (
    <div className="flex flex-col items-center gap-4 py-2 text-center">
      <Image
        src={cfg.image}
        alt={cfg.alt}
        width={144}
        height={144}
        className="h-36 w-36 object-contain"
      />
      <h3 className={cn("text-xl font-bold", cfg.titleClass)}>{title ?? cfg.title}</h3>
      {message && (
        <p className="text-sm text-muted-text whitespace-pre-wrap">{message}</p>
      )}
      {autoClose && (
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className={cn("h-full rounded-full transition-[width] duration-100 ease-linear", cfg.barClass)}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      )}
      <Button type="button" variant={cfg.button} className="mt-1 w-full" onClick={handleOk}>
        {okLabel}
      </Button>
    </div>
  );
}
