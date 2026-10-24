import { useState } from "react";
import { Icon } from "../components/Icons";
import { PageTitle, EmergencyCall } from "../components/Shared";
import { AudioButton } from "../components/AudioButton";
import { useI18n } from "../i18n";
import { useStore } from "../lib/store";

function stamp() {
  return new Date().toLocaleString([], { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" });
}

export default function Pregnancy() {
  const { t } = useI18n();
  const { state, addInfantLog } = useStore();
  const [growth, setGrowth] = useState("");
  const [iron, setIron] = useState(false);
  const [appt, setAppt] = useState<string[]>([]);
  const [newAppt, setNewAppt] = useState("");

  return (
    <div className="wrap">
      <PageTitle title={`🤰 ${t("pregnancy")}`} sub={t("pregnancySub")} back="/dashboard" />

      <details className="card" style={{ marginBottom: 12 }} open>
        <summary className="card__title" style={{ cursor: "pointer" }}>A. {t("pregPostTitle")}</summary>
        <div style={{ marginTop: 10 }}>
          <p className="muted">{t("pregPostBody")}</p>
          <ul className="list-reset">
            <li><Icon name="check" /> {t("pregWatch")}</li>
            <li><Icon name="heart" /> {t("pregPpd")}</li>
          </ul>
          <AudioButton text={t("pregSpoken")} label={t("listenAgain")} />
        </div>
      </details>

      <details className="card" style={{ marginBottom: 12 }}>
        <summary className="card__title" style={{ cursor: "pointer" }}>B. {t("pregTrackerTitle")}</summary>
        <div style={{ marginTop: 10 }}>
          <div className="chips" style={{ marginBottom: 12 }}>
            <button className="chip" aria-pressed={iron} onClick={() => setIron(!iron)}>💊 {t("ironTaken")}</button>
          </div>
          <div className="search">
            <input className="input" value={newAppt} onChange={(e) => setNewAppt(e.target.value)} placeholder={t("nextApptPlaceholder")} aria-label={t("appointmentAria")} />
            <button className="btn btn--soft" onClick={() => { if (newAppt.trim()) { setAppt((a) => [...a, newAppt.trim()]); setNewAppt(""); } }} aria-label={t("addAria")}><Icon name="plus" /></button>
          </div>
          {appt.length > 0 && (
            <ul className="list-reset" style={{ marginTop: 10 }}>
              {appt.map((a, i) => <li key={i}><Icon name="calendar" /> <span className="grow">{a}</span></li>)}
            </ul>
          )}
        </div>
      </details>

      <details className="card" style={{ marginBottom: 12 }} open>
        <summary className="card__title" style={{ cursor: "pointer" }}>C. {t("infantTitle")}</summary>
        <div style={{ marginTop: 10 }}>
          <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <button className="btn btn--soft" onClick={() => addInfantLog("feeding", `${t("feedWord")} · ${stamp()}`)}><Icon name="plus" /> {t("feeding")}</button>
            <button className="btn btn--soft" onClick={() => addInfantLog("sleep", `${t("sleep")} · ${stamp()}`)}><Icon name="moon" /> {t("sleep")}</button>
          </div>

          <div className="search" style={{ marginTop: 12 }}>
            <input className="input" value={growth} onChange={(e) => setGrowth(e.target.value)} inputMode="decimal" placeholder={t("weightPlaceholder")} aria-label={t("growthAria")} />
            <button className="btn btn--soft" onClick={() => { if (growth.trim()) { addInfantLog("growth", `${growth} kg · ${stamp()}`); setGrowth(""); } }}>{t("logBtn")}</button>
          </div>

          <p className="field" style={{ marginTop: 14 }}>{t("vaccinationField")}</p>
          <div className="chips">
            {["BCG", "OPV", "Pentavalent", "PCV", "Measles-RV", "JE"].map((v) => {
              const done = state.infantLogs.vax.includes(v);
              return (
                <button key={v} className="chip" aria-pressed={done} onClick={() => addInfantLog("vax", v)}>
                  {done ? "✓ " : ""}{v}
                </button>
              );
            })}
          </div>
          <p className="hint" style={{ marginTop: 8 }}>{t("vaxConfirmNote")}</p>

          <div className="note note--info" style={{ marginTop: 10 }}>
            <strong>{t("urgentBaby")}</strong> {t("urgentBabyBody")}
          </div>
        </div>
      </details>

      <div className="note note--danger" style={{ marginBottom: 12 }}>
        <strong>{t("urgentPregnancy")}</strong> {t("urgentPregnancyBody")}
      </div>
      <EmergencyCall label={`${t("emergencyHelp")} · 112`} />
    </div>
  );
}
