"use client";

import { Toaster as SonnerToaster } from "sonner";

type ToasterProps = React.ComponentProps<typeof SonnerToaster>;

function Toaster({ ...props }: ToasterProps) {
  return (
    <SonnerToaster
      theme="dark"
      toastOptions={{
        unstyled: false,
        classNames: {
          toast:
            "bg-card-bg text-soft-white border shadow-xl backdrop-blur-xl border-l-4 border-border-glow",
          title: "text-sm font-semibold",
          description: "text-xs text-muted-text",
          icon: "h-4 w-4",
          actionButton:
            "bg-primary text-white rounded-full px-4 text-xs font-semibold h-7 border-none",
          cancelButton:
            "bg-transparent text-muted-text rounded-full border border-border-glow px-4 text-xs h-7",
          error: "!border-l-destructive",
          success: "!border-l-electric-blue",
          warning: "!border-l-supernova-orange",
          info: "!border-l-cosmic-purple",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
