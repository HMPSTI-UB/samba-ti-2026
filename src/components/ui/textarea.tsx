import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type TextareaProps = {
  label?: string;
  error?: string;
  helperText?: string;
  rightIcon?: ReactNode;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, rightIcon, ...props }, ref) => {
    const textareaId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-white">
            {label}
          </label>
        )}
        <div className="relative">
          <textarea
            ref={ref}
            id={textareaId}
            className={cn(
              "flex min-h-[96px] w-full resize-y rounded-lg border bg-transparent px-3 py-2 text-sm text-soft-white placeholder:text-muted-text transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-1 focus-visible:ring-offset-deep-space disabled:cursor-not-allowed disabled:opacity-40",
              rightIcon && "pr-10",
              error
                ? "border-destructive focus-visible:ring-destructive"
                : "border-white/80 hover:border-white",
              className,
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${textareaId}-error` : undefined}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-3 text-muted-text">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p id={`${textareaId}-error`} className="text-xs text-destructive">
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

Textarea.displayName = "Textarea";

export { Textarea };
export type { TextareaProps };
