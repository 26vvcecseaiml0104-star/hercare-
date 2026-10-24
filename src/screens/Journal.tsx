import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "../components/Icons";
import { PageTitle, FacilityCard } from "../components/Shared";
import { AudioButton } from "../components/AudioButton";
import { useToast } from "../components/Toast";
import { useI18n } from "../i18n";
import { dl } from "../i18n/data-labels";
import { useRouter } from "../lib/router";
import { useStore, todayISO } from "../lib/store";
import type { JournalDay } from "../lib/store";
import { facilitiesByTag } from "../data/doctors";
import { HELPLINES } from "../data/helplines";
import {
  AFFIRMATIONS,
  CRAVING_OPTIONS,
  SAMPLE_STORIES,
  WITHDRAWAL_GUIDES,
  WITHDRAWAL_SAFETY_WARNING,
} from "../data/wellness";
import { telHref } from "../lib/links";

const INACTIVITY_LOCK_MS = 60_000;

/* ------------------------------- PIN gate ------------------------------- */
function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const { t } = useI18n();
  const { state, setJournalPin } = useStore();
  const isSetup = !state.journalPin;
  const [pin, setPin] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");

  const submit = () => {
    if (!/^\d{4}$/.test(pin)) return setErr(t("pinEnter4"));
    if (isSetup) {
      if (pin !== confirm) return setErr(t("pinMatch"));
      setJournalPin(pin);
      onUnlock();
      return;
    }
    if (pin === state.journalPin) onUnlock();
    else setErr(t("pinWrong"));
  };

  return (
    <div className="wrap" style={{ maxWidth: 460, marginInline: "auto", paddingTop: 24 }}>
      <div className="card card--pad-lg center rise">
        <span className="emoji-lg">🔒</span>
        <h1>{isSetup ? t("pinSetTitle") : t("pinEnterTitle")}</h1>
        <p className="muted">{t("pinPrivateNote")}</p>
        <div className="field-group" style={{ marginTop: 12 }}>
          <input className="input kbd" style={{ textAlign: "center", fontSize: "1.4rem", letterSpacing: "0.5em" }} inputMode="numeric" maxLength={4} value={pin} onChange={(e) => { setErr(""); setPin(e.target.value.replace(/\D/g, "")); }} placeholder="••••" aria-label="PIN" />
        </div>
        {isSetup && (
          <div className="field-group">
            <input className="input kbd" style={{ textAlign: "center", fontSize: "1.4rem", letterSpacing: "0.5em" }} inputMode="numeric" maxLength={4} value={confirm} onChange={(e) => { setErr(""); setConfirm(e.target.value.replace(/\D/g, "")); }} placeholder="•••• repeat" aria-label={t("pinRepeatAria")} />
          </div>
        )}
        {err && <p className="err" role="alert">{err}</p>}
        <button className="btn btn--lg btn--block" onClick={submit}>{isSetup ? t("pinCreate") : t("pinUnlock")}</button>
        <p className="hint" style={{ marginTop: 10 }}>
          {t("pinServerNote")}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------- Calendar ------------------------------- */
function Calendar({ journal }: { journal: JournalDay[] }) {
  const { t } = useI18n();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const byDate = useMemo(() => Object.fromEntries(journal.map((j) => [j.date, j])), [journal]);
  const monthName = now.toLocaleString(undefined, { month: "long", year: "numeric" });
  const cells: (number | null)[] = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];

  const key = (d: number) => `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  return (
    <div>
      <p className="muted" style={{ margin: "0 0 8px" }}>{monthName}</p>
      <div className="cal" style={{ marginBottom: 6 }}>
        {(["jdSu", "jdMo", "jdTu", "jdWe", "jdTh", "jdFr", "jdSa"] as const).map((d, i) => <span key={i} className="cal__dow">{t(d)}</span>)}
      </div>
      <div className="cal">
        {cells.map((d, i) => {
          if (d === null) return <span key={`e${i}`} className="cal__cell cal__cell--empty" />;
          const entry = byDate[key(d)];
          const cls = entry ? (entry.status === "sober" ? "cal__cell--sober" : "cal__cell--lapse") : "";
          return (
            <span key={d} className={`cal__cell ${cls}`} title={entry ? `${entry.status}${entry.note ? `: ${entry.note}` : ""}` : undefined}>
              {d}
              {entry?.status === "sober" && <span aria-hidden="true"> 🌿</span>}
              {entry?.status === "lapse" && <span aria-hidden="true"> ·</span>}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------- SOS modal ------------------------------ */
function SosModal({ onClose }: { onClose: () => void }) {
  const { t, code } = useI18n();
  const [secs, setSecs] = useState(120);
  const [running, setRunning] = useState(false);
  const support = HELPLINES.filter((h) => h.kind !== "emergency");

  useEffect(() => {
    if (!running) return;
    const iv = window.setInterval(() => setSecs((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => window.clearInterval(iv);
  }, [running]);

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label={t("sosTitle")}>
      <div className="sheet sheet--center">
        <div className="sheet__head">
          <Icon name="siren" style={{ color: "var(--danger)" }} />
          <strong className="grow">{t("sosTitle")}</strong>
          <button className="iconbtn" onClick={onClose} aria-label={t("close")}><Icon name="close" /></button>
        </div>
        <div className="sheet__body">
          <p className="muted">{t("sosIntro")}</p>
          <div className="card center" style={{ marginBottom: 12 }}>
            <div style={{ fontSize: "2rem", fontWeight: 800 }} className="kbd">
              {String(Math.floor(secs / 60)).padStart(1, "0")}:{String(secs % 60).padStart(2, "0")}
            </div>
            <p className="hint">{t("sosBreathe")}</p>
            <div className="row center">
              <button className="btn btn--sage" onClick={() => setRunning((r) => !r)}>{running ? t("sosPause") : t("sosStart")}</button>
              <AudioButton text={t("sosBreathSpoken")} label={t("sosGuide")} />
            </div>
          </div>
          <p className="field">{t("callForSupport")}</p>
          <div className="stack">
            {support.map((h) => (
              <a key={h.number} className="btn btn--outline btn--block" href={telHref(h.number)}>
                <Icon name="phone" /> {dl(code, h.name)} · {h.number}
              </a>
            ))}
          </div>
          <div className="note note--danger" style={{ marginTop: 12 }}>{dl(code, WITHDRAWAL_SAFETY_WARNING)}</div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- Journal -------------------------------- */
export default function Journal() {
  const { t, code: langCode } = useI18n();
  const { navigate } = useRouter();
  const { state, upsertJournalDay, setSavingsDaily } = useStore();
  const { push } = useToast();
  const [unlocked, setUnlocked] = useState(false);
  const [sos, setSos] = useState(false);
  const [note, setNote] = useState("");
  const [todayCravings, setTodayCravings] = useState<string[]>([]);
  const lockTimer = useRef<number | undefined>(undefined);

  const armLock = () => {
    if (lockTimer.current) window.clearTimeout(lockTimer.current);
    lockTimer.current = window.setTimeout(() => {
      setUnlocked(false);
      push(t("journalLockedToast"), "info");
    }, INACTIVITY_LOCK_MS);
  };

  useEffect(() => {
    if (!unlocked) return;
    armLock();
    const bump = () => armLock();
    window.addEventListener("click", bump);
    window.addEventListener("keydown", bump);
    return () => {
      window.removeEventListener("click", bump);
      window.removeEventListener("keydown", bump);
      if (lockTimer.current) window.clearTimeout(lockTimer.current);
    };
  }, [unlocked]);

  const today = state.journal.find((j) => j.date === todayISO());
  const affirmation = AFFIRMATIONS[new Date().getDate() % AFFIRMATIONS.length];

  const consecutiveSober = (() => {
    let n = 0;
    const d = new Date();
    // count back from today while days are marked sober
    for (let guard = 0; guard < 400; guard++) {
      const k = d.toISOString().slice(0, 10);
      const e = state.journal.find((j) => j.date === k);
      if (e?.status === "sober") {
        n++;
        d.setDate(d.getDate() - 1);
      } else {
        break;
      }
    }
    return n;
  })();

  const savings = Math.round(state.savingsDaily * consecutiveSober);
  const rehab = facilitiesByTag("rehab");

  if (!unlocked) return <PinGate onUnlock={() => setUnlocked(true)} />;

  const mark = (status: "sober" | "lapse") => {
    upsertJournalDay({ date: todayISO(), status, note: note || undefined, cravings: todayCravings.length ? todayCravings : undefined });
    setNote("");
    setTodayCravings([]);
    push(status === "sober" ? t("greenLeafToast") : t("difficultDayToast"), status === "sober" ? "ok" : "info");
  };

  return (
    <div className="wrap">
      <PageTitle title={`🌱 ${t("addictions")}`} sub={t("addictionsSub")} back="/home" />
      <div className="note note--info" style={{ marginBottom: 14 }}>
        <Icon name="lock" style={{ width: 16, height: 16, verticalAlign: "-2px" }} /> {t("journalLockNote")}
      </div>

      <button className="btn btn--danger btn--lg btn--block" style={{ marginBottom: 14 }} onClick={() => setSos(true)}>
        <Icon name="siren" /> {t("sosTitle")}
      </button>

      <div className="card card--pad-lg" style={{ marginBottom: 14 }}>
        <h3 style={{ marginTop: 0 }}>{t("journalToday")}</h3>
        <p className="hint">{t("journalTodayHint")}</p>
        <div className="opt-grid" style={{ marginBottom: 12 }}>
          <button className="opt" onClick={() => mark("sober")} aria-pressed={today?.status === "sober"}>
            <span className="opt__emoji">🌿</span><span>{t("soberDay")}</span>
          </button>
          <button className="opt" onClick={() => mark("lapse")} aria-pressed={today?.status === "lapse"}>
            <span className="opt__emoji">🪨</span><span>{t("difficultDay")}</span>
          </button>
        </div>

        <p className="field">{t("cravingsField")} ({t("optional")})</p>
        <div className="chips" style={{ marginBottom: 10 }}>
          {CRAVING_OPTIONS.map((c) => (
            <button key={c.id} className="chip" aria-pressed={todayCravings.includes(c.id)} onClick={() => setTodayCravings((cur) => cur.includes(c.id) ? cur.filter((x) => x !== c.id) : [...cur, c.id])}>
              {c.emoji} {dl(langCode, c.label)}
            </button>
          ))}
        </div>
        <textarea className="textarea" style={{ minHeight: 70 }} value={note} onChange={(e) => setNote(e.target.value)} placeholder={t("privateNotePlaceholder")} aria-label={t("privateNoteAria")} />
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <div className="row between" style={{ marginBottom: 10 }}>
          <h3 style={{ margin: 0 }}>{t("recoveryCalendar")}</h3>
          <span className="badge badge--verified">🌿 {consecutiveSober} {consecutiveSober === 1 ? t("dayWord") : t("daysWord")} {t("streakWord")}</span>
        </div>
        <Calendar journal={state.journal} />
        <p className="hint" style={{ marginTop: 8 }}>{t("calendarLegend")}</p>
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <h3 style={{ marginTop: 0 }}>{t("savingsTitle")}</h3>
        <div className="search">
          <input className="input" inputMode="numeric" value={state.savingsDaily || ""} onChange={(e) => setSavingsDaily(Number(e.target.value.replace(/\D/g, "")) || 0)} placeholder={t("earlierSpendPlaceholder")} aria-label={t("prevSpendAria")} />
          <span className="nowrap muted">₹ {t("perDayWord")}</span>
        </div>
        {state.savingsDaily > 0 && (
          <p style={{ marginTop: 10 }}>{t("savedIntro")} <strong>₹{savings.toLocaleString("en-IN")}</strong> {t("savedOver")} {consecutiveSober}-{t("dayWord")} {t("savedStreakEnd")}</p>
        )}
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <div className="row between">
          <div>
            <h3 style={{ margin: 0 }}>{t("dailyAffirmation")}</h3>
            <p className="muted" style={{ margin: "6px 0 0" }}>{affirmation[langCode as keyof typeof affirmation] ?? affirmation.en}</p>
          </div>
          <AudioButton text={(affirmation[langCode as keyof typeof affirmation] ?? affirmation.en) as string} label="🔊" />
        </div>
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <h3 style={{ marginTop: 0 }}>{t("withdrawalGuidesTitle")}</h3>
        <ul className="list-reset">
          {WITHDRAWAL_GUIDES.map((g) => (
            <li key={g.title}><span style={{ fontSize: "1.3rem" }}>{g.emoji}</span> <span><strong>{dl(langCode, g.title)}.</strong> {dl(langCode, g.body)}</span></li>
          ))}
        </ul>
        <div className="note note--danger" style={{ marginTop: 10 }}>{dl(langCode, WITHDRAWAL_SAFETY_WARNING)}</div>
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <h3 style={{ marginTop: 0 }}>{t("recoveryStoriesTitle")}</h3>
        <div className="badge badge--demo" style={{ marginBottom: 8 }}>{t("sampleConsentStories")}</div>
        {SAMPLE_STORIES.map((s) => (
          <blockquote key={s.initials} style={{ margin: "0 0 12px", padding: "10px 14px", borderInlineStart: "4px solid var(--rose-300)", background: "var(--cream-2)", borderRadius: 8 }}>
            <p style={{ margin: 0 }}>“{dl(langCode, s.text)}”</p>
            <footer className="hint">— {s.initials}, {s.age}, {dl(langCode, s.place)}</footer>
          </blockquote>
        ))}
      </div>

      <div style={{ marginBottom: 14 }}>
        <h3 className="section-title">{t("rehabDirectory")}</h3>
        <div className="stack">{rehab.map((f) => <FacilityCard key={f.id} f={f} />)}</div>
      </div>

      {sos && <SosModal onClose={() => setSos(false)} />}

      <button className="btn btn--outline btn--block" onClick={() => navigate("/neutral", { replace: true })}>
        <Icon name="close" /> {t("quickExit")}
      </button>
      <p className="hint" style={{ marginTop: 6 }}>{t("quickExitJournalNote")}</p>
    </div>
  );
}
