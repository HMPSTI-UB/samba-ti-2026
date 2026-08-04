"use client";

import { createContext, useCallback, useContext, useState } from "react";
import SweetAlert from "./sweet-alert";

type AlertType = "success" | "error";
type AlertState = { type: AlertType; title?: string; message?: string };

type SweetAlertContextValue = {
  success: (message?: string, title?: string) => void;
  error: (message?: string, title?: string) => void;
};

const SUCCESS_DURATION = 3000;
const ERROR_DURATION = 5000;

const SweetAlertContext = createContext<SweetAlertContextValue | null>(null);

export default function SweetAlertProvider({ children }: { children: React.ReactNode }) {
  const [alert, setAlert] = useState<AlertState | null>(null);

  const success = useCallback((message?: string, title?: string) => {
    setAlert({ type: "success", title, message });
  }, []);

  const error = useCallback((message?: string, title?: string) => {
    setAlert({ type: "error", title, message });
  }, []);

  return (
    <SweetAlertContext.Provider value={{ success, error }}>
      {children}
      <SweetAlert
        open={alert !== null}
        onClose={() => setAlert(null)}
        type={alert?.type ?? "success"}
        title={alert?.title}
        message={alert?.message}
        duration={alert?.type === "error" ? ERROR_DURATION : SUCCESS_DURATION}
      />
    </SweetAlertContext.Provider>
  );
}

export function useSweetAlert(): SweetAlertContextValue {
  const ctx = useContext(SweetAlertContext);
  if (!ctx) throw new Error("useSweetAlert must be used within SweetAlertProvider");
  return ctx;
}
