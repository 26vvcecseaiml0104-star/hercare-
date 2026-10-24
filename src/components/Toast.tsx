import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

type Variant = "info" | "ok" | "warn";
type Toast = { id: number; text: string; variant: Variant };

const Ctx = createContext<{ push: (text: string, variant?: Variant) => void } | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const push = useCallback((text: string, variant: Variant = "info") => {
    const id = ++idRef.current;
    setToasts((t) => [...t, { id, text, variant }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);

  const value = useMemo(() => ({ push }), [push]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <div className="toasts" role="status" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast${t.variant === "ok" ? " toast--ok" : t.variant === "warn" ? " toast--warn" : ""}`}>
            {t.text}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useToast must be within ToastProvider");
  return ctx;
}
