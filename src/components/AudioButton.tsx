import { useState } from "react";
import { Icon } from "./Icons";
import { useI18n } from "../i18n";
import { findLanguage } from "../i18n/languages";
import { speak, stopSpeaking, ttsSupported } from "../lib/speech";

/* Read-aloud button. Honest about capability: it disables when neither the
   device nor the selected language is expected to have a voice, and explains
   why so we never falsely claim audio support (spec §3). */
export function AudioButton({ text, label }: { text: string; label?: string }) {
  const { t, code, locale } = useI18n();
  const [playing, setPlaying] = useState(false);
  const lang = findLanguage(code);
  const available = ttsSupported() && (lang.voice.tts || code === "en");

  if (!available) {
    return (
      <button className="btn btn--outline" disabled title={t("audioOffNote")}>
        <Icon name="volume" /> {label ?? t("audioWord")} · {t("offWord")}
      </button>
    );
  }

  const toggle = () => {
    if (playing) {
      stopSpeaking();
      setPlaying(false);
    } else {
      speak(text, locale);
      setPlaying(true);
      window.setTimeout(() => setPlaying(false), Math.min(30000, 150 * text.length));
    }
  };

  return (
    <button className="btn btn--soft audio-btn" onClick={toggle} aria-pressed={playing}>
      <Icon name={playing ? "close" : "volume"} />
      {playing ? t("stopAudio") : label ?? t("listenWord")}
    </button>
  );
}
