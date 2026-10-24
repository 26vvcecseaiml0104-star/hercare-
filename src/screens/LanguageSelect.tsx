import { useState } from "react";
import { Icon } from "../components/Icons";
import { useRouter } from "../lib/router";
import { useI18n } from "../i18n";
import { useStore } from "../lib/store";
import { LANGUAGES } from "../i18n/languages";

/* First-run language preference screen (spec §3). Supported languages for this
   deployment (English and Kannada), with native scripts and honest voice
   badges. */
export default function LanguageSelect() {
  const { t } = useI18n();
  const { state, setLanguage } = useStore();
  const { navigate } = useRouter();
  const [chosen, setChosen] = useState(state.language);

  return (
    <div className="wrap" style={{ maxWidth: 620, marginInline: "auto", paddingTop: 12 }}>
      <div className="center">
        <span className="emoji-lg">🌐</span>
        <h1>{t("chooseLanguage")}</h1>
        <p className="muted">{t("chooseLanguageSub")}</p>
      </div>

      <div className="opt-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
        {LANGUAGES.map((l) => (
          <button key={l.code} className="opt" aria-pressed={chosen === l.code} onClick={() => setChosen(l.code)}>
            <span className="card__title" lang={l.locale} dir={l.rtl ? "rtl" : "ltr"} style={{ fontSize: "1.2rem" }}>{l.native}</span>
            <span className="hint">{l.english}</span>
            <span className="tag" style={{ marginTop: 4 }}>
              {l.voice.tts || l.voice.stt ? `🎙 ${t("voiceReady")}` : t("textOnly")}
            </span>
          </button>
        ))}
      </div>

      <div style={{ height: 16 }} />
      <button
        className="btn btn--lg btn--block"
        disabled={!chosen}
        onClick={() => {
          if (chosen) setLanguage(chosen);
          navigate("/home", { replace: true });
        }}
      >
        {t("continue")} <Icon name="chevronRight" />
      </button>
      <p className="center hint" style={{ marginTop: 10 }}>{t("changeAnytime")}</p>
    </div>
  );
}
