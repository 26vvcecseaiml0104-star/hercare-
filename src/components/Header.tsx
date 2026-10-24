import { useState } from "react";
import type { FormEvent } from "react";
import { Icon } from "./Icons";
import { Link, useRouter } from "../lib/router";
import { useI18n } from "../i18n";
import { findLanguage } from "../i18n/languages";
import { LanguagePicker } from "./LanguagePicker";
import { startDictation, sttSupported, ttsSupported } from "../lib/speech";
import { useStore } from "../lib/store";

export function Header({ onOpenAI }: { onOpenAI: () => void }) {
  const { t, code } = useI18n();
  const { state } = useStore();
  const { navigate } = useRouter();
  const lang = findLanguage(code);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [q, setQ] = useState("");
  const [listening, setListening] = useState(false);
  const canStt = sttSupported() && lang.voice.stt;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    if (term) navigate(`/search/${encodeURIComponent(term)}`);
  };

  const listen = () => {
    if (!canStt) return;
    setListening(true);
    startDictation(lang.locale, {
      onResult: (text) => {
        setQ(text);
        if (text.trim()) navigate(`/search/${encodeURIComponent(text.trim())}`);
      },
      onError: () => setListening(false),
      onEnd: () => setListening(false),
    });
  };

  return (
    <header className="hdr">
      <Link to="/home" className="brand" ariaLabel={`${t("appName")} — ${t("tagline")}`}>
        <span className="brand__mark"><img src="/logo.png" alt="" aria-hidden="true" /></span>
        <span>{t("appName")}</span>
      </Link>

      <div className="hdr__spacer" />

      {state.user && (
        <form className="search grow" onSubmit={submit} style={{ maxWidth: 320 }} role="search">
          <input
            className="input"
            style={{ padding: "8px 12px", minHeight: 44 }}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("search")}
            aria-label={t("search")}
            inputMode="search"
          />
          <button type="button" className="iconbtn" onClick={listen} aria-pressed={listening} aria-label={t("listen")} title={canStt ? t("speak") : t("aiVoiceUnavailable")} style={!canStt ? { opacity: 0.4 } : listening ? { color: "var(--danger)" } : undefined}>
            <Icon name="mic" />
          </button>
        </form>
      )}

      <button className="iconbtn lang-pill" onClick={() => setPickerOpen(true)} aria-label={t("chooseLanguage")}>
        <Icon name="globe" />
        <span style={{ fontSize: "0.8rem", marginLeft: 2 }}>{code.toUpperCase()}</span>
      </button>

      <button className="ai-btn" onClick={onOpenAI} aria-label={`${t("aiAssistant")} (${lang.voice.tts && ttsSupported() ? t("voiceReady") : t("textOnly")})`}>
        <Icon name="sparkles" /> <span className="nowrap">AI</span>
      </button>

      <LanguagePicker open={pickerOpen} onClose={() => setPickerOpen(false)} />
    </header>
  );
}
