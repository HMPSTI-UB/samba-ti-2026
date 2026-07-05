import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/cn";

const variantStyles = {
  primary:
    "bg-primary text-white hover:bg-primary-hover shadow-lg shadow-primary/30",
  secondary:
    "bg-secondary text-white hover:bg-secondary-hover shadow-lg shadow-secondary/30",
  accent:
    "bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/30",
  ghost: "bg-transparent text-soft-white hover:bg-white/10",
  outline:
    "border border-border-glow bg-transparent text-soft-white hover:bg-white/5",
  destructive:
    "bg-destructive text-white hover:bg-destructive-hover shadow-lg shadow-destructive/30",
};

const sizeStyles = {
  sm: "h-8 px-3 text-sm gap-1.5",
  md: "h-10 px-5 text-sm gap-2",
  lg: "h-12 px-7 text-base gap-2.5",
};

type ButtonProps = {
  variant?: keyof typeof variantStyles;
  size?: keyof typeof sizeStyles;
  asChild?: boolean;
  loading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild && !loading ? Slot : "button";

    return (
      <Comp
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:ring-offset-2 focus-visible:ring-offset-deep-space disabled:pointer-events-none disabled:opacity-40",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      >
        {loading && (
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </Comp>
    );
  },
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
