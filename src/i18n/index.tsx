import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import type { ReactNode } from "react";
import { useStore } from "../lib/store";
import { stopSpeaking } from "../lib/speech";
import { findLanguage, resolveLanguageCode } from "./languages";
import type { StringKey } from "./translations";
import { en, translations } from "./translations";

type I18nCtx = {
  t: (key: StringKey) => string;
  code: string;
  locale: string;
  dir: "ltr" | "rtl";
};

const Ctx = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const { state } = useStore();
  const code = resolveLanguageCode(state.language);
  const lang = findLanguage(code);
  const dict = translations[code] ?? en;

  // When the reader switches language, stop any speech still playing in the
  // previous one so audio never continues in the wrong language.
  const prevCode = useRef(code);
  useEffect(() => {
    if (prevCode.current !== code) {
      stopSpeaking();
      prevCode.current = code;
    }
  }, [code]);

  const value = useMemo<I18nCtx>(
    () => ({
      code,
      locale: lang.locale,
      dir: lang.rtl ? "rtl" : "ltr",
      t: (key: StringKey) => dict[key] ?? en[key] ?? key,
    }),
    // dict / lang change only when code changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [code],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n(): I18nCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export type { StringKey };
