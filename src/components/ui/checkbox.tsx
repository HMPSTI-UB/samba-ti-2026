import { forwardRef } from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@/lib/cn";

type CheckboxProps = {
  label?: string;
  error?: string;
} & React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>;

const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const checkboxId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2.5">
          <CheckboxPrimitive.Root
            ref={ref}
            id={checkboxId}
            className={cn(
              "flex h-4 w-4 shrink-0 items-center justify-center rounded border border-border-glow bg-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-1 focus-visible:ring-offset-deep-space disabled:cursor-not-allowed disabled:opacity-40",
              "data-[state=checked]:bg-primary data-[state=checked]:border-primary",
              error && "border-destructive",
              className,
            )}
            {...props}
          >
            <CheckboxPrimitive.Indicator className="flex items-center justify-center text-white">
              <svg
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </CheckboxPrimitive.Indicator>
          </CheckboxPrimitive.Root>
          {label && (
            <label
              htmlFor={checkboxId}
              className="text-sm text-soft-white cursor-pointer select-none"
            >
              {label}
            </label>
          )}
        </div>
        {error && <p className="text-xs text-destructive pl-6">{error}</p>}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
export type { CheckboxProps };
