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
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            {field.label}
            {field.isRequired && <span className="text-destructive ml-0.5">*</span>}
          </label>

          {field.type === "text" && (
            <input
              value={values[field.key] ?? ""}
              onChange={(e) => onChange(field.key, e.target.value)}
              placeholder={field.placeholder || field.label}
              className="w-full h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cosmic-purple/20 focus:border-cosmic-purple"
            />
          )}

          {field.type === "textarea" && (
            <textarea
              value={values[field.key] ?? ""}
              onChange={(e) => onChange(field.key, e.target.value)}
              placeholder={field.placeholder || field.label}
              rows={4}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cosmic-purple/20 focus:border-cosmic-purple resize-none"
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
