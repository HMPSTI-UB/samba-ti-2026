"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

type DateTimePickerProps = {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  label?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
};

export default function DateTimePicker({
  value,
  onChange,
  label,
  error,
  placeholder = "Pilih tanggal & jam",
  disabled,
}: DateTimePickerProps) {
  const [open, setOpen] = useState(false);
  const [timeValue, setTimeValue] = useState(value ? format(value, "HH:mm") : "");
  const [pos, setPos] = useState({ bottom: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const [tmpDate, setTmpDate] = useState<Date | undefined>(value);

  useEffect(() => {
    if (value) setTimeValue(format(value, "HH:mm"));
  }, [value]);

  useEffect(() => {
    if (!open) return;
    const popupEl = popupRef.current;
    const triggerEl = triggerRef.current;
    if (!popupEl || !triggerEl) return;

    function handlePointerDown(e: PointerEvent) {
      if (!popupEl || !triggerEl) return;
      if (popupEl.contains(e.target as Node)) return;
      if (triggerEl.contains(e.target as Node)) return;
      setOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  const openPopup = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setPos({ bottom: window.innerHeight - rect.top + 4, left: rect.left });
    setTmpDate(value);
    setTimeValue(value ? format(value, "HH:mm") : "");
    setOpen(true);
  }, [value]);

  function handleConfirm() {
    if (!tmpDate) return;
    const [h, m] = timeValue ? timeValue.split(":").map(Number) : [23, 59];
    const merged = new Date(tmpDate);
    merged.setHours(h || 23, m || 59, 0, 0);
    onChange(merged);
    setOpen(false);
  }

  return (
    <div className="flex flex-col gap-1.5" ref={triggerRef}>
      {label && (
        <label className="text-sm font-medium text-muted-text">{label}</label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={openPopup}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-lg border bg-transparent px-3 py-2 text-sm transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-1 focus-visible:ring-offset-deep-space",
          disabled && "cursor-not-allowed opacity-40",
          error
            ? "border-destructive"
            : "border-border-glow hover:border-electric-blue/50",
        )}
      >
        <span className={value ? "text-soft-white" : "text-muted-text"}>
          {value ? format(value, "d MMM yyyy, HH:mm") : placeholder}
        </span>
        <Calendar size={16} className="text-muted-text shrink-0" />
      </button>

      {open && (
        <div
          ref={popupRef}
          className="fixed z-[9999] w-fit min-w-[220px] rounded-xl border border-white/10 bg-midnight-navy p-2 shadow-2xl"
          style={{ bottom: pos.bottom, left: pos.left }}
        >
          <DayPicker
            mode="single"
            selected={tmpDate}
            onSelect={(day) => setTmpDate(day)}
            className="m-0"
            components={{
              Chevron: () => <></>,
              PreviousMonthButton: (props: any) => (
                <button type="button" {...props}>
                  <ChevronLeft size={14} className="text-soft-white" />
                </button>
              ),
              NextMonthButton: (props: any) => (
                <button type="button" {...props}>
                  <ChevronRight size={14} className="text-soft-white" />
                </button>
              ),
            } as any}
            classNames={{
              month: "text-soft-white text-sm",
              month_caption: "text-center mb-1.5",
              caption_label: "text-xs font-semibold text-soft-white",
              nav: "flex items-center justify-center gap-4 mb-1",
              button_previous: "w-6 h-6 rounded hover:bg-white/10 flex items-center justify-center transition-colors",
              button_next: "w-6 h-6 rounded hover:bg-white/10 flex items-center justify-center transition-colors",
              month_grid: "border-collapse",
              weekdays: "text-[10px] font-medium text-muted-text uppercase",
              weekday: "w-7 h-6 text-center",
              day: "w-7 h-6 rounded text-[11px] text-soft-white hover:bg-white/10 transition-colors",
              day_button: "w-full h-full flex items-center justify-center",
              selected: "bg-electric-blue text-white hover:bg-electric-blue",
              today: "font-semibold text-electric-blue",
              disabled: "opacity-30 pointer-events-none",
              outside: "text-muted-text/40",
            }}
          />

          <div className="flex items-center gap-1.5 pt-1.5 border-t border-white/10">
            <Clock size={12} className="text-muted-text shrink-0" />
            <input
              type="time"
              value={timeValue}
              onChange={(e) => setTimeValue(e.target.value)}
              className="flex-1 h-6 rounded border border-white/10 bg-white/[0.06] px-1.5 text-[10px] text-soft-white focus:outline-none focus:ring-1 focus:ring-electric-blue"
            />
            <button
              type="button"
              onClick={handleConfirm}
              className="px-2 h-6 rounded bg-electric-blue text-white text-[10px] font-medium hover:bg-electric-blue/80 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
