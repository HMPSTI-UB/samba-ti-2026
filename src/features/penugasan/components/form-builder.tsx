"use client";

import {
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  GripVertical,
  Type,
  AlignLeft,
  Link2,
} from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Checkbox } from "@/components/ui/checkbox";
import { Select } from "@/components/ui/select";
import { cn } from "@/lib/cn";
import type { FormField } from "@/features/penugasan/types";

type Props = {
  fields: FormField[];
  onChange: (fields: FormField[]) => void;
};

const TYPE_ICONS = {
  text: <Type size={15} />,
  textarea: <AlignLeft size={15} />,
  link: <Link2 size={15} />,
} as const;

const TYPE_LABELS = {
  text: "Text",
  textarea: "Textarea",
  link: "Link",
} as const;

function SortableFieldRow({
  field,
  index,
  total,
  onRemove,
  onMove,
  onUpdate,
}: {
  field: FormField;
  index: number;
  total: number;
  onRemove: () => void;
  onMove: (direction: "up" | "down") => void;
  onUpdate: (patch: Partial<FormField>) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: field.key });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={cn(
        "rounded-xl border bg-white/[0.05] p-4 transition-colors focus-within:border-electric-blue/60",
        isDragging
          ? "border-electric-blue shadow-[0_0_20px_rgba(56,189,248,0.3)] opacity-90"
          : "border-white/15 hover:border-white/30",
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex flex-col items-center gap-1">
          <button
            type="button"
            {...attributes}
            {...listeners}
            className="cursor-grab touch-none rounded-lg p-1 text-muted-text transition-colors hover:bg-white/10 hover:text-white active:cursor-grabbing"
            title="Geser untuk mengurutkan"
          >
            <GripVertical size={18} />
          </button>
          <span className="text-[10px] font-bold text-white/40">{index + 1}</span>
          <div className="flex flex-col items-center rounded-lg bg-white/5 py-0.5">
            <button
              type="button"
              onClick={() => onMove("up")}
              disabled={index === 0}
              className="rounded p-0.5 text-muted-text transition-colors hover:text-white disabled:opacity-25"
              title="Naikkan"
            >
              <ChevronUp size={14} />
            </button>
            <button
              type="button"
              onClick={() => onMove("down")}
              disabled={index === total - 1}
              className="rounded p-0.5 text-muted-text transition-colors hover:text-white disabled:opacity-25"
              title="Turunkan"
            >
              <ChevronDown size={14} />
            </button>
          </div>
        </div>

        <div className="flex-1 min-w-0 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5 rounded-md bg-white/10 px-2 py-1 text-xs font-semibold text-white/80">
              {TYPE_ICONS[field.type]}
              {TYPE_LABELS[field.type]}
            </div>
            <button
              type="button"
              onClick={onRemove}
              className="rounded-lg p-1.5 text-muted-text transition-colors hover:bg-red-500/15 hover:text-red-400"
              title="Hapus field"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/70">Label Field</label>
            <input
              value={field.label}
              onChange={(e) => onUpdate({ label: e.target.value })}
              placeholder="cth. Nama Lengkap"
              className="h-10 w-full rounded-lg border border-white/20 bg-white/[0.08] px-3 text-sm text-white placeholder:text-muted-text/70 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/70">Placeholder (opsional)</label>
            <input
              value={field.placeholder}
              onChange={(e) => onUpdate({ placeholder: e.target.value })}
              placeholder="cth. Masukkan nama lengkap kamu"
              className="h-10 w-full rounded-lg border border-white/20 bg-white/[0.08] px-3 text-sm text-white placeholder:text-muted-text/70 focus:outline-none focus:border-electric-blue focus:ring-1 focus:ring-electric-blue"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Select
              variant="dark"
              items={[
                { value: "text", label: "Text" },
                { value: "textarea", label: "Textarea" },
                { value: "link", label: "Link" },
              ]}
              value={field.type}
              onValueChange={(val) => onUpdate({ type: val as FormField["type"] })}
              className="h-10 w-32 text-sm"
            />
            <Checkbox
              label="Wajib diisi"
              id={`required-${field.key}`}
              checked={field.isRequired}
              onCheckedChange={(checked) => onUpdate({ isRequired: checked === true })}
            />
          </div>

          <div className="rounded-lg border border-white/10 bg-black/20 p-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-white/40">
              Preview
            </p>
            <div className="mb-1.5 flex items-center gap-1 text-sm text-white">
              {field.label || <span className="text-muted-text italic">Label field</span>}
              {field.isRequired && <span className="text-red-400">*</span>}
            </div>
            {field.type === "text" ? (
              <div className="h-9 rounded-md border border-white/15 bg-white/[0.06] px-3 flex items-center text-sm text-muted-text">
                {field.placeholder || "Preview input teks"}
              </div>
            ) : field.type === "link" ? (
              <div className="h-9 rounded-md border border-white/15 bg-white/[0.06] px-3 flex items-center gap-2 text-sm text-muted-text">
                <Link2 size={14} className="text-electric-blue" />
                {field.placeholder || "https://..."}
              </div>
            ) : (
              <div className="min-h-16 rounded-md border border-white/15 bg-white/[0.06] p-3 text-sm text-muted-text">
                {field.placeholder || "Preview textarea"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FormBuilder({ fields, onChange }: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );

  function addField() {
    const key = `field_${Date.now()}`;
    onChange([...fields, { key, label: "", type: "text", isRequired: false, placeholder: "" }]);
  }

  function removeField(index: number) {
    onChange(fields.filter((_, i) => i !== index));
  }

  function moveField(index: number, direction: "up" | "down") {
    const to = direction === "up" ? index - 1 : index + 1;
    if (to < 0 || to >= fields.length) return;
    onChange(arrayMove(fields, index, to));
  }

  function updateField(index: number, patch: Partial<FormField>) {
    onChange(fields.map((f, i) => (i === index ? { ...f, ...patch } : f)));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const from = fields.findIndex((f) => f.key === active.id);
    const to = fields.findIndex((f) => f.key === over.id);
    if (from === -1 || to === -1) return;
    onChange(arrayMove(fields, from, to));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <label className="text-sm font-semibold text-white">Form Fields</label>
          {fields.length > 0 && (
            <span className="rounded-full bg-electric-blue/15 px-2 py-0.5 text-xs font-semibold text-electric-blue">
              {fields.length}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={addField}
          className="inline-flex items-center gap-1.5 rounded-lg bg-electric-blue/15 px-3 py-1.5 text-xs font-semibold text-electric-blue transition-colors hover:bg-electric-blue/25"
        >
          <Plus size={14} />
          Tambah Field
        </button>
      </div>

      {fields.length === 0 && (
        <button
          type="button"
          onClick={addField}
          className="w-full rounded-xl border border-dashed border-white/25 bg-white/[0.03] py-8 text-sm text-muted-text transition-colors hover:border-electric-blue/50 hover:bg-electric-blue/5 hover:text-electric-blue"
        >
          Belum ada field. Klik di sini untuk menambahkan.
        </button>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={fields.map((f) => f.key)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {fields.map((field, index) => (
              <SortableFieldRow
                key={field.key}
                field={field}
                index={index}
                total={fields.length}
                onRemove={() => removeField(index)}
                onMove={(direction) => moveField(index, direction)}
                onUpdate={(patch) => updateField(index, patch)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
