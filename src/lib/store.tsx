import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";

/* ---------------------------------------------------------------------------
   Client-side persistent store (localStorage).

   PRODUCTION NOTE: In the real deployment this maps to a PostgreSQL schema
   with strict server-side authorization (see docs/integrations.md). Sensitive
   records (wellness journal, incident reports, health trackers) must live
   server-side, encrypted at rest, and never in localStorage. This client store
   exists only to make the app functional in dev/demo mode without a backend.
   ------------------------------------------------------------------------- */

export type User = {
  name: string;
  phone: string;
  verified: boolean;
  createdAt: string;
};

export type PeriodLog = { start: string; end?: string; symptoms?: string[] };

export type JournalDay = {
  date: string; // yyyy-mm-dd
  status: "sober" | "lapse";
  note?: string;
  cravings?: string[];
};

export type AppState = {
  user: User | null;
  language: string; // language code, "" until chosen
  savedFacilities: string[];
  periodLogs: PeriodLog[];
  journal: JournalDay[];
  journalPin: string | null;
  savingsDaily: number; // previous daily spend estimate (₹)
  infantLogs: { feeding: string[]; sleep: string[]; growth: string[]; vax: string[] };
  triageLog: { date: string; level: string; symptoms: string[] }[];
};

const STORAGE_KEY = "hercare+state:v1";

const DEFAULT_STATE: AppState = {
  user: null,
  language: "",
  savedFacilities: [],
  periodLogs: [],
  journal: [],
  journalPin: null,
  savingsDaily: 0,
  infantLogs: { feeding: [], sleep: [], growth: [], vax: [] },
  triageLog: [],
};

function load(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STATE;
  }
}

type StoreCtx = {
  state: AppState;
  setUser: (u: User | null) => void;
  setLanguage: (l: string) => void;
  toggleSaved: (id: string) => void;
  setJournalPin: (pin: string) => void;
  upsertJournalDay: (day: JournalDay) => void;
  addPeriodLog: (log: PeriodLog) => void;
  removePeriodLog: (index: number) => void;
  setSavingsDaily: (v: number) => void;
  addInfantLog: (kind: keyof AppState["infantLogs"], entry: string) => void;
  logTriage: (entry: AppState["triageLog"][number]) => void;
  logout: () => void;
};

const Ctx = createContext<StoreCtx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage may be unavailable in private mode — non-fatal */
    }
  }, [state]);

  const setUser = useCallback((user: User | null) => setState((s) => ({ ...s, user })), []);
  const setLanguage = useCallback((language: string) => setState((s) => ({ ...s, language })), []);

  const toggleSaved = useCallback(
    (id: string) =>
      setState((s) => ({
        ...s,
        savedFacilities: s.savedFacilities.includes(id)
          ? s.savedFacilities.filter((x) => x !== id)
          : [...s.savedFacilities, id],
      })),
    [],
  );

  const setJournalPin = useCallback((journalPin: string) => setState((s) => ({ ...s, journalPin })), []);

  const upsertJournalDay = useCallback(
    (day: JournalDay) =>
      setState((s) => {
        const rest = s.journal.filter((d) => d.date !== day.date);
        return { ...s, journal: [...rest, day].sort((a, b) => a.date.localeCompare(b.date)) };
      }),
    [],
  );

  const addPeriodLog = useCallback(
    (log: PeriodLog) => setState((s) => ({ ...s, periodLogs: [...s.periodLogs, log] })),
    [],
  );
  const removePeriodLog = useCallback(
    (index: number) =>
      setState((s) => ({ ...s, periodLogs: s.periodLogs.filter((_, i) => i !== index) })),
    [],
  );

  const setSavingsDaily = useCallback(
    (savingsDaily: number) => setState((s) => ({ ...s, savingsDaily })),
    [],
  );

  const addInfantLog = useCallback(
    (kind: keyof AppState["infantLogs"], entry: string) =>
      setState((s) => ({
        ...s,
        infantLogs: { ...s.infantLogs, [kind]: [...s.infantLogs[kind], entry] },
      })),
    [],
  );

  const logTriage = useCallback(
    (entry: AppState["triageLog"][number]) =>
      setState((s) => ({ ...s, triageLog: [...s.triageLog, entry] })),
    [],
  );

  const logout = useCallback(
    () => setState((s) => ({ ...DEFAULT_STATE, language: s.language })),
    [],
  );

  const value = useMemo<StoreCtx>(
    () => ({
      state,
      setUser,
      setLanguage,
      toggleSaved,
      setJournalPin,
      upsertJournalDay,
      addPeriodLog,
      removePeriodLog,
      setSavingsDaily,
      addInfantLog,
      logTriage,
      logout,
    }),
    [state, setUser, setLanguage, toggleSaved, setJournalPin, upsertJournalDay, addPeriodLog, removePeriodLog, setSavingsDaily, addInfantLog, logTriage, logout],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): StoreCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}

export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}
