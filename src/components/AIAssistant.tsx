import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icons";
import { useI18n } from "../i18n";
import type { StringKey } from "../i18n";
import { findLanguage } from "../i18n/languages";
import { dl } from "../i18n/data-labels";
import { searchArticles, localizedArticle } from "../data/articles";
import { HELPLINES } from "../data/helplines";
import { detectRedFlag, EMERGENCY_NUMBER } from "../lib/emergency";
import { speak, startDictation, sttSupported, ttsSupported } from "../lib/speech";
import { telHref } from "../lib/links";
import { useRouter } from "../lib/router";

/* ---------------------------------------------------------------------------
   AI Support Assistant.

   This prototype uses a transparent, deterministic rule + retrieval responder
   (red-flag rules, article and helpline matching). It is NOT a live LLM. A
   production deployment connects an LLM through a secure backend as documented
   in docs/integrations.md — while the clinically-reviewed red-flag rules here
   ALWAYS run alongside and take priority. The assistant never diagnoses, never
   claims to be a lawyer/dispatcher, and never contacts third parties.
   ------------------------------------------------------------------------- */

type Msg = { id: number; role: "ai" | "user" | "alert"; text: string; links?: { label: string; to: string }[] };

function buildReply(query: string, t: (key: StringKey) => string, code: string): { text: string; links: Msg["links"] } {
  const q = query.toLowerCase();
  const arts = searchArticles(query).slice(0, 2);
  if (/(doctor|hospital|clinic|phc|nearest|specialist)/.test(q)) {
    return {
      text: t("aiDoctorReply"),
      links: [{ label: t("aiDoctorLink"), to: "/doctor" }],
    };
  }
  if (/(safe|safety|harass|abuse|danger|help me)/.test(q)) {
    return {
      text: t("aiSafetyReply"),
      links: [{ label: t("aiSafetyLink"), to: "/safety" }],
    };
  }
  if (/(period|menstr|cycle)/.test(q)) {
    return { text: t("aiPeriodReply"), links: [{ label: t("aiPeriodLink"), to: "/dashboard/periods" }] };
  }
  if (/(pregnan|mother|baby|newborn|infant)/.test(q)) {
    return { text: t("aiPregReply"), links: [{ label: t("aiPregLink"), to: "/dashboard/pregnancy" }] };
  }
  if (/(drink|smok|addict|recover|craving|quit)/.test(q)) {
    return { text: t("aiRecoveryReply"), links: [{ label: t("aiRecoveryLink"), to: "/journal" }] };
  }
  if (arts.length > 0) {
    const body = localizedArticle(arts[0], code);
    return {
      text: `${t("aiFoundLabel")} “${body.title}”: ${body.summary} ${t("aiWhenToSee")} ${body.seekCare}`,
      links: arts.map((a) => {
        const b = localizedArticle(a, code);
        return { label: `${t("aiReadLabel")} ${b.title}`, to: `/awareness/article/${a.id}` };
      }),
    };
  }
  const hl = HELPLINES.find((h) => q.includes(h.name.toLowerCase().split(" ")[0]));
  if (hl) return { text: `${t("aiHelplineReply")} ${dl(code, hl.name)} ${t("aiHelplineOn")} ${hl.number}. ${dl(code, hl.description)}`, links: [] };

  return {
    text: t("aiFallback"),
    links: [],
  };
}

export function AIAssistant({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, code } = useI18n();
  const lang = findLanguage(code);
  const { navigate } = useRouter();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const [typing, setTyping] = useState(false);
  const idRef = useRef(0);
  const bodyRef = useRef<HTMLDivElement>(null);
  const canStt = sttSupported() && lang.voice.stt;

  useEffect(() => {
    if (open && msgs.length === 0) {
      setMsgs([
        {
          id: ++idRef.current,
          role: "ai",
          text: t("aiGreeting"),
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, msgs.length]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  if (!open) return null;

  const respond = (text: string) => {
    const userMsg: Msg = { id: ++idRef.current, role: "user", text };
    setMsgs((m) => [...m, userMsg]);
    const hit = detectRedFlag(text);
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      if (hit.matched) {
        const alert: Msg = {
          id: ++idRef.current,
          role: "alert",
          text: `${t("aiEmergencyDetected")} (${hit.flags.map((f) => dl(code, f)).join(", ")})`,
        };
        setMsgs((m) => [...m, alert]);
        if (ttsSupported()) speak(t("aiEmergencySpeak"), lang.locale);
        return;
      }
      const r = buildReply(text, t, code);
      const ai: Msg = { id: ++idRef.current, role: "ai", text: r.text, links: r.links };
      setMsgs((m) => [...m, ai]);
      if (ttsSupported() && lang.voice.tts) speak(r.text, lang.locale);
    }, 650);
  };

  const send = () => {
    const v = input.trim();
    if (!v) return;
    setInput("");
    respond(v);
  };

  const listen = () => {
    if (!canStt || listening) return;
    setListening(true);
    startDictation(lang.locale, {
      onResult: (text) => setInput((prev) => (prev ? prev + " " : "") + text),
      onError: () => setListening(false),
      onEnd: () => setListening(false),
    });
  };

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label={t("aiAssistant")}>
      <div className="sheet">
        <div className="sheet__head">
          <span className="ai-btn" style={{ boxShadow: "none" }}><Icon name="sparkles" /> AI</span>
          <div className="grow">
            <strong>{t("aiAssistant")}</strong>
            <div className="hint">{t("aiSupportNote")}</div>
          </div>
          <button className="iconbtn" onClick={onClose} aria-label={t("close")}>
            <Icon name="close" />
          </button>
        </div>

        <div className="sheet__body chat" ref={bodyRef}>
          {msgs.map((m) =>
            m.role === "alert" ? (
              <div key={m.id} className="bubble bubble--alert">
                <p><Icon name="alert" /> {m.text}</p>
                <a className="btn btn--danger btn--block" href={telHref(EMERGENCY_NUMBER)}>
                  <Icon name="phone" /> {t("aiCallEmergency")} · {EMERGENCY_NUMBER}
                </a>
                <p className="hint" style={{ marginTop: 8 }}>
                  {t("aiWaitingNote")}
                </p>
              </div>
            ) : (
              <div key={m.id} className={m.role === "ai" ? "bubble bubble--ai" : "bubble bubble--user"}>
                {m.text}
                {m.links && m.links.length > 0 && (
                  <div className="stack" style={{ marginTop: 8 }}>
                    {m.links.map((l) => (
                      <button
                        key={l.to}
                        className="btn btn--soft"
                        onClick={() => {
                          onClose();
                          navigate(l.to);
                        }}
                      >
                        {l.label} <Icon name="chevronRight" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ),
          )}
          {typing && (
            <div className="bubble bubble--ai">
              <span className="typing"><span></span><span></span><span></span></span>
            </div>
          )}
        </div>

        <div className="sheet__foot">
          <div className="search">
            <input
              className="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder={t("aiPlaceholder")}
              aria-label={t("aiMessage")}
            />
            {canStt && (
              <button className="iconbtn" onClick={listen} aria-label={t("listen")} aria-pressed={listening} style={listening ? { color: "var(--danger)" } : undefined}>
                <Icon name="mic" />
              </button>
            )}
            <button className="btn" onClick={send} aria-label={t("aiSend")}>
              <Icon name="chevronRight" />
            </button>
          </div>
          {listening && <div className="mic-live" style={{ marginTop: 8 }}><span className="pulse" /> {t("aiListening")}</div>}
          {!canStt && <small className="faint">{t("aiVoiceUnavailable")}</small>}
        </div>
      </div>
    </div>
  );
}
