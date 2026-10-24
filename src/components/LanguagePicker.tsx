import { useState } from "react";
import { Icon } from "./Icons";
import { LANGUAGES } from "../i18n/languages";
import { useI18n } from "../i18n";
import { useStore } from "../lib/store";

/* Language selection offering the two supported interface languages
   (English and Kannada). Voice availability is shown honestly so we never
   over-claim dialect/voice. */
export function LanguagePicker({ open, onClose, onDone }: { open: boolean; onClose: () => void; onDone?: () => void }) {
  const { t } = useI18n();
  const { state, setLanguage } = useStore();
  const [chosen, setChosen] = useState(state.language);

  if (!open) return null;

  const confirm = () => {
    if (chosen) setLanguage(chosen);
    onClose();
    onDone?.();
  };

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label={t("chooseLanguage")}>
      <div className="sheet sheet--center">
        <div className="sheet__head">
          <Icon name="globe" />
          <strong className="grow">{t("chooseLanguage")}</strong>
          <button className="iconbtn" onClick={onClose} aria-label={t("close")}><Icon name="close" /></button>
        </div>
        <div className="sheet__body">
          <p className="hint">{t("chooseLanguageSub")}</p>
          <div className="opt-grid">
            {LANGUAGES.map((l) => (
              <button key={l.code} className="opt" aria-pressed={chosen === l.code} onClick={() => setChosen(l.code)}>
                <span className="card__title" lang={l.locale} dir={l.rtl ? "rtl" : "ltr"}>{l.native}</span>
                <span className="hint">{l.english}</span>
                <span className="tag" style={{ marginTop: 4 }}>
                  {l.voice.tts || l.voice.stt ? t("voiceReady") : t("textOnly")}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="sheet__foot">
          <button className="btn btn--block btn--lg" onClick={confirm} disabled={!chosen}>
            {t("save")} · {LANGUAGES.find((l) => l.code === chosen)?.english ?? ""}
          </button>
        </div>
      </div>
    </div>
  );
}
