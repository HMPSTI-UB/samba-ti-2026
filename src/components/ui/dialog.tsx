import { forwardRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/cn";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;

type DialogContentProps = {
  title?: string;
  description?: string;
  variant?: "dark" | "light";
} & React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>;

const variantClasses = {
  dark: {
    overlay: "bg-black/60",
    content: "bg-card-bg border-border-glow text-soft-white",
    title: "text-soft-white",
    description: "text-muted-text",
    close: "text-muted-text hover:text-soft-white",
  },
  light: {
    overlay: "bg-black/30",
    content: "bg-white border-slate-200 text-slate-900",
    title: "text-slate-900",
    description: "text-slate-500",
    close: "text-slate-400 hover:text-slate-700",
  },
} as const;

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, title, description, variant = "dark", children, ...props }, ref) => {
    const v = variantClasses[variant];
    return (
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 backdrop-blur-sm",
            v.overlay,
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          )}
        />
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border p-6 shadow-2xl backdrop-blur-2xl",
            v.content,
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            className,
          )}
          {...props}
        >
          {title && (
            <DialogPrimitive.Title className={cn("text-lg font-bold font-heading", v.title)}>
              {title}
            </DialogPrimitive.Title>
          )}
          {description && (
            <DialogPrimitive.Description className={cn("mt-1.5 text-sm", v.description)}>
              {description}
            </DialogPrimitive.Description>
          )}
          <div className="mt-4">{children}</div>
          <DialogPrimitive.Close
            className={cn(
              "absolute right-4 top-4 rounded-full p-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue",
              v.close,
            )}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    );
  },
);

DialogContent.displayName = "DialogContent";

export { Dialog, DialogTrigger, DialogContent, DialogClose };
