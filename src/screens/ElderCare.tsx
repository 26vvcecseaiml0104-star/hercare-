import { useState } from "react";
import { Icon } from "../components/Icons";
import { PageTitle, EmergencyCall } from "../components/Shared";
import { AudioButton } from "../components/AudioButton";
import { useI18n } from "../i18n";
import { dl } from "../i18n/data-labels";
import { useRouter } from "../lib/router";
import { SYMPTOMS, triage } from "../lib/triage";
import type { TriageLevel } from "../lib/triage";
import { useStore, todayISO } from "../lib/store";

const LEVEL: Record<TriageLevel, { title: string; body: string }> = {
  green: { title: "GREEN — General Self-Care", body: "Rest, fluids and simple home care are usually fine. Watch for any change or worsening." },
  yellow: { title: "YELLOW — Contact a Doctor or Health Worker", body: "Please arrange a timely check-up with a doctor, ANM or health worker for these symptoms." },
  red: { title: "RED — Seek Emergency Care Now", body: "This may be an emergency. Get help immediately — do not wait." },
};

export default function ElderCare() {
  const { t, code } = useI18n();
  const { navigate } = useRouter();
  const { logTriage } = useStore();
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<TriageLevel | null>(null);

  const toggle = (id: string) =>
    setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const check = () => {
    const r = triage(selected);
    setResult(r.level);
    logTriage({ date: todayISO(), level: r.level, symptoms: selected });
    if (r.level === "red") return t("triageSpokenRed");
    return dl(code, LEVEL[r.level].body);
  };

  return (
    <div className="wrap">
      <PageTitle title={`👵 ${t("elder")}`} sub={t("elderSub")} back="/dashboard" />

      <div className="card card--pad-lg" style={{ marginBottom: 14 }}>
        <p className="muted">{t("elderIntro")}</p>
        <div className="opt-grid">
          {SYMPTOMS.map((s) => (
            <button key={s.id} className="opt" aria-pressed={selected.includes(s.id)} onClick={() => toggle(s.id)}>
              <span className="opt__emoji" aria-hidden="true">{s.emoji}</span>
              <span>{dl(code, s.label)}</span>
            </button>
          ))}
        </div>
        <button className="btn btn--lg btn--block" style={{ marginTop: 14 }} onClick={check}>
          <Icon name="check" /> {t("checkNextSteps")}
        </button>
      </div>

      {result && (
        <div className={`triage triage--${result}`} style={{ marginBottom: 14 }} role="status">
          <h2 style={{ color: "#fff" }}>{dl(code, LEVEL[result].title)}</h2>
          <p style={{ marginBottom: result === "red" ? 12 : 0 }}>{dl(code, LEVEL[result].body)}</p>
          <div className="row" style={{ marginTop: 10 }}>
            <AudioButton text={`${dl(code, LEVEL[result].title)}. ${dl(code, LEVEL[result].body)}`} label={t("readAloud")} />
          </div>
        </div>
      )}

      {result === "red" ? (
        <EmergencyCall label={`${t("callNow")} ${t("emergencyHelp")} · 112`} />
      ) : (
        <button className="btn btn--sage btn--block" onClick={() => navigate("/doctor")}>
          <Icon name="stethoscope" /> {t("findDoctor")}
        </button>
      )}

      <p className="hint" style={{ marginTop: 12 }}>
        {t("elderFootnote")}
      </p>
    </div>
  );
}
