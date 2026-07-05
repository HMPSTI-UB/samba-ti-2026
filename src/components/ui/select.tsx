import { forwardRef } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cn } from "@/lib/cn";

type SelectItem = {
  value: string;
  label: string;
};

type SelectProps = {
  items: SelectItem[];
  placeholder?: string;
  label?: string;
  error?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
};

const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    { items, placeholder = "Pilih...", label, error, className, ...props },
    ref,
  ) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-muted-text">
            {label}
          </label>
        )}
        <SelectPrimitive.Root {...props}>
          <SelectPrimitive.Trigger
            ref={ref}
            className={cn(
              "flex h-10 w-full items-center justify-between rounded-lg border bg-transparent px-3 py-2 text-sm text-soft-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-1 focus-visible:ring-offset-deep-space disabled:cursor-not-allowed disabled:opacity-40",
              error
                ? "border-destructive"
                : "border-border-glow hover:border-electric-blue/50",
              className,
            )}
          >
            <SelectPrimitive.Value placeholder={placeholder} />
            <SelectPrimitive.Icon>
              <svg
                className="h-4 w-4 text-muted-text"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>

          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              position="popper"
              sideOffset={4}
              className={cn(
                "z-50 min-w-[8rem] overflow-hidden rounded-lg border border-border-glow bg-midnight-navy p-1 shadow-xl backdrop-blur-xl",
                "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
              )}
            >
              <SelectPrimitive.Viewport className="max-h-60">
                {items.map((item) => (
                  <SelectPrimitive.Item
                    key={item.value}
                    value={item.value}
                    className={cn(
                      "relative flex cursor-default select-none items-center rounded-md px-3 py-2 text-sm text-soft-white outline-none transition-colors",
                      "data-[highlighted]:bg-white/10 data-[state=checked]:text-electric-blue",
                    )}
                  >
                    <SelectPrimitive.ItemText>
                      {item.label}
                    </SelectPrimitive.ItemText>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export { Select };
export type { SelectProps, SelectItem };
