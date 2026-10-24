import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode, MouseEvent } from "react";

/* ---------------------------------------------------------------------------
   Minimal hash-based router. Chosen over a dependency to keep the bundle
   lean and the offline experience predictable for low-bandwidth users.
   Routes look like:  #/home  #/doctor/fac-001  #/journal
   ------------------------------------------------------------------------- */

type RouterCtx = {
  path: string;
  navigate: (to: string, opts?: { replace?: boolean }) => void;
};

const Ctx = createContext<RouterCtx | null>(null);

function currentPath(): string {
  const h = window.location.hash.replace(/^#/, "");
  return h || "/";
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState<string>(currentPath());

  useEffect(() => {
    const onHash = () => setPath(currentPath());
    window.addEventListener("hashchange", onHash);
    if (!window.location.hash) window.location.replace("#/");
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = useCallback((to: string, opts?: { replace?: boolean }) => {
    const target = to.startsWith("/") ? to : `/${to}`;
    if (opts?.replace) {
      window.location.replace(`#${target}`);
      setPath(target);
    } else {
      window.location.hash = target;
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const value = useMemo(() => ({ path, navigate }), [path, navigate]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useRouter(): RouterCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useRouter must be used within RouterProvider");
  return ctx;
}

/** Parse "/doctor/fac-001" -> [ "doctor", "fac-001" ] */
export function segments(path: string): string[] {
  return path.split("?")[0].split("/").filter(Boolean);
}

export function Link({
  to,
  children,
  className,
  onClick,
  ariaLabel,
}: {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  const { navigate } = useRouter();
  const handle = (e: MouseEvent) => {
    e.preventDefault();
    onClick?.();
    navigate(to);
  };
  return (
    <a href={`#${to}`} className={className} onClick={handle} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
