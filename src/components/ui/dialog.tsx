import { forwardRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cn } from "@/lib/cn";

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogClose = DialogPrimitive.Close;

type DialogContentProps = {
  title?: string;
  description?: string;
} & React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>;

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, title, description, children, ...props }, ref) => {
    return (
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          )}
        />
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl border border-border-glow bg-card-bg p-6 shadow-2xl backdrop-blur-2xl",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
            className,
          )}
          {...props}
        >
          {title && (
            <DialogPrimitive.Title className="text-lg font-bold text-soft-white font-heading">
              {title}
            </DialogPrimitive.Title>
          )}
          {description && (
            <DialogPrimitive.Description className="mt-1.5 text-sm text-muted-text">
              {description}
            </DialogPrimitive.Description>
          )}
          <div className="mt-4">{children}</div>
          <DialogPrimitive.Close
            className={cn(
              "absolute right-4 top-4 rounded-full p-1 text-muted-text transition-colors hover:text-soft-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue",
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
