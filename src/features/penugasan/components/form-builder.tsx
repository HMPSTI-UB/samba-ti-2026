"use client";

import { Plus, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Select } from "@/components/ui/select";
import type { FormField } from "@/features/penugasan/types";

type Props = {
  fields: FormField[];
  onChange: (fields: FormField[]) => void;
};

export default function FormBuilder({ fields, onChange }: Props) {
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
    const copy = [...fields];
    [copy[index], copy[to]] = [copy[to], copy[index]];
    onChange(copy);
  }

  function updateField(index: number, patch: Partial<FormField>) {
    onChange(fields.map((f, i) => (i === index ? { ...f, ...patch } : f)));
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-muted-text">Form Fields</label>
        <button
          type="button"
          onClick={addField}
          className="flex items-center gap-1.5 text-xs font-medium text-electric-blue hover:text-electric-blue/80 transition-colors"
        >
          <Plus size={14} />
          Tambah Field
        </button>
      </div>

      {fields.length === 0 && (
        <p className="text-xs text-muted-text/60 italic py-2">
          Belum ada field. Klik &quot;Tambah Field&quot; untuk mulai.
        </p>
      )}

      <div className="space-y-2">
        {fields.map((field, index) => (
          <div
            key={field.key}
            className="rounded-lg border border-white/10 bg-midnight-navy p-3 space-y-3"
          >
            <div className="flex items-start gap-2">
              <div className="flex flex-col gap-0.5 pt-0.5">
                <button type="button" onClick={() => moveField(index, "up")} disabled={index === 0} className="text-muted-text hover:text-soft-white disabled:opacity-30">
                  <ChevronUp size={12} />
                </button>
                <button type="button" onClick={() => moveField(index, "down")} disabled={index === fields.length - 1} className="text-muted-text hover:text-soft-white disabled:opacity-30">
                  <ChevronDown size={12} />
                </button>
              </div>

              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 min-w-0">
                    <input
                      value={field.label}
                      onChange={(e) => updateField(index, { label: e.target.value })}
                      placeholder="Label field"
                      className="w-full h-8 rounded-md border border-white/10 bg-white/[0.06] px-2.5 text-sm text-soft-white placeholder:text-muted-text/50 focus:outline-none focus:ring-1 focus:ring-electric-blue"
                    />
                  </div>
                  <Select
                    variant="dark"
                    items={[
                      { value: "text", label: "Text" },
                      { value: "textarea", label: "Textarea" },
                    ]}
                    value={field.type}
                    onValueChange={(val) => updateField(index, { type: val as "text" | "textarea" })}
                    className="h-8 w-24 text-xs px-2"
                  />
                  <Checkbox
                    label="Wajib"
                    id={`required-${field.key}`}
                    checked={field.isRequired}
                    onCheckedChange={(checked) => updateField(index, { isRequired: checked === true })}
                  />
                  <button
                    type="button"
                    onClick={() => removeField(index)}
                    className="p-1 rounded text-muted-text hover:text-destructive transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

                <input
                  value={field.placeholder}
                  onChange={(e) => updateField(index, { placeholder: e.target.value })}
                  placeholder="Placeholder (opsional)"
                  className="w-full h-8 rounded-md border border-white/10 bg-white/[0.06] px-2.5 text-xs text-soft-white placeholder:text-muted-text/50 focus:outline-none focus:ring-1 focus:ring-electric-blue"
                />

                <div className="mt-2">
                  {field.type === "text" ? (
                    <div className="h-8 rounded-md border border-white/10 bg-white/[0.04] px-2.5 flex items-center text-xs text-muted-text/50">
                      {field.label || "Preview input teks"}
                    </div>
                  ) : (
                    <div className="h-16 rounded-md border border-white/10 bg-white/[0.04] p-2.5 text-xs text-muted-text/50">
                      {field.label || "Preview textarea"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
