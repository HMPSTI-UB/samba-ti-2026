"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { makeQueryClient } from "./query-client";

type Props = {
  children: ReactNode;
};

export default function QueryProvider({ children }: Props) {
  const [queryClient] = useState(makeQueryClient);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
