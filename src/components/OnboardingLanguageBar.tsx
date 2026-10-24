import { useState } from "react";
import { Icon } from "./Icons";
import { LanguagePicker } from "./LanguagePicker";
import { useStore } from "../lib/store";
import { findLanguage } from "../i18n/languages";

/* Language selector shown on the onboarding screens so the reader picks their
   language at the very start. The choice is saved to the store and applied
   across the entire app (UI + voice + text direction) from that point on. */
export function OnboardingLanguageBar() {
  const { state } = useStore();
  const [open, setOpen] = useState(false);
  const lang = findLanguage(state.language || "en");
  return (
    <div className="onboard-lang">
      <button className="chip chip--lang" onClick={() => setOpen(true)} aria-haspopup="dialog">
        <Icon name="globe" />
        <span lang={lang.locale} dir={lang.rtl ? "rtl" : "ltr"}>{lang.native}</span>
        <span className="chip__en">· {lang.english}</span>
      </button>
      <LanguagePicker open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
