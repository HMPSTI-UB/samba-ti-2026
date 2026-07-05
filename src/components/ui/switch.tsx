import { forwardRef } from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/cn";

type SwitchProps = {
  label?: string;
} & React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>;

const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, label, id, ...props }, ref) => {
    const switchId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex items-center gap-2.5">
        <SwitchPrimitive.Root
          ref={ref}
          id={switchId}
          className={cn(
            "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border border-border-glow bg-transparent transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-1 focus-visible:ring-offset-deep-space disabled:cursor-not-allowed disabled:opacity-40",
            "data-[state=checked]:bg-primary data-[state=unchecked]:bg-white/10",
            className,
          )}
          {...props}
        >
          <SwitchPrimitive.Thumb
            className={cn(
              "pointer-events-none block h-3.5 w-3.5 rounded-full bg-soft-white shadow-lg transition-transform duration-200",
              "data-[state=checked]:translate-x-[18px] data-[state=unchecked]:translate-x-0.5",
            )}
          />
        </SwitchPrimitive.Root>
        {label && (
          <label
            htmlFor={switchId}
            className="text-sm text-soft-white cursor-pointer select-none"
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);

Switch.displayName = "Switch";

export { Switch };
export type { SwitchProps };
