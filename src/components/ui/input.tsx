import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type InputProps = {
  label?: string;
  error?: string;
  helperText?: string;
  rightIcon?: ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, rightIcon, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-white"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "flex h-10 w-full rounded-lg border bg-transparent px-3 py-2 text-sm text-soft-white placeholder:text-muted-text transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-1 focus-visible:ring-offset-deep-space disabled:cursor-not-allowed disabled:opacity-40",
              rightIcon && "pr-10",
              error
                ? "border-destructive focus-visible:ring-destructive"
                : "border-white/80 hover:border-white",
              className,
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-text">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-destructive">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-xs text-muted-text">{helperText}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
export type { InputProps };
