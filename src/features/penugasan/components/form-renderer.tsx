"use client";

import type { FormField } from "@/features/penugasan/types";

type Props = {
  fields: FormField[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  errors: Record<string, string>;
};

export default function FormRenderer({ fields, values, onChange, errors }: Props) {
  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <div key={field.key}>
          <label className="block text-sm font-medium text-soft-white mb-1.5">
            {field.label}
            {field.isRequired && <span className="text-destructive ml-0.5">*</span>}
          </label>

          {field.type === "text" && (
            <input
              value={values[field.key] ?? ""}
              onChange={(e) => onChange(field.key, e.target.value)}
              placeholder={field.placeholder || field.label}
              className="w-full h-10 rounded-lg border border-white/10 bg-transparent px-3 text-sm text-soft-white placeholder:text-muted-text focus:outline-none focus:ring-2 focus:ring-electric-blue/30 focus:border-electric-blue/50"
            />
          )}

          {field.type === "textarea" && (
            <textarea
              value={values[field.key] ?? ""}
              onChange={(e) => onChange(field.key, e.target.value)}
              placeholder={field.placeholder || field.label}
              rows={4}
              className="w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-sm text-soft-white placeholder:text-muted-text focus:outline-none focus:ring-2 focus:ring-electric-blue/30 focus:border-electric-blue/50 resize-none"
            />
          )}

          {field.type === "link" && (
            <input
              type="url"
              inputMode="url"
              value={values[field.key] ?? ""}
              onChange={(e) => onChange(field.key, e.target.value)}
              placeholder={field.placeholder || "https://..."}
              className="w-full h-10 rounded-lg border border-white/10 bg-transparent px-3 text-sm text-soft-white placeholder:text-muted-text focus:outline-none focus:ring-2 focus:ring-electric-blue/30 focus:border-electric-blue/50"
            />
          )}

          {errors[field.key] && (
            <p className="text-xs text-destructive mt-1">{errors[field.key]}</p>
          )}
        </div>
      ))}
    </div>
  );
}
