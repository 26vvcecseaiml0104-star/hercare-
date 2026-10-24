import { Icon } from "../components/Icons";
import { PageTitle } from "../components/Shared";
import { useI18n } from "../i18n";
import { dl } from "../i18n/data-labels";
import { useRouter } from "../lib/router";
import { EMERGENCY } from "../data/helplines";
import { requestOpenAI } from "../lib/events";

export default function Safety() {
  const { t, code } = useI18n();
  const { navigate } = useRouter();

  return (
    <div className="wrap">
      <PageTitle title={`🛡️ ${t("safetyTitle")}`} sub={`“${t("safetyLead")}”`} back="/home" />

      {/* A. Emergency Help — accessible without login */}
      <div className="card card--pad-lg" style={{ marginBottom: 14 }}>
        <h2 style={{ marginTop: 0 }}>{t("emergencyHelp")}</h2>
        <p className="muted">{t("safetyEmergencyIntro")}</p>
        <div className="stack">
          {EMERGENCY.map((h) => (
            <a key={h.number} className="btn btn--danger btn--lg btn--block" href={`tel:${h.number}`} style={{ justifyContent: "space-between" }}>
              <span><strong>{dl(code, h.name)}</strong><br /><small style={{ color: "#fff", opacity: 0.9 }}>{dl(code, h.description)}</small></span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><Icon name="phone" /> {h.number}</span>
            </a>
          ))}
        </div>
        <p className="hint" style={{ marginTop: 8 }}>{t("safetyAvailabilityNote")}</p>
      </div>

      {/* B. Report Harassment */}
      <div className="card" style={{ marginBottom: 14 }}>
        <div className="row between">
          <div>
            <h3 style={{ margin: 0 }}><Icon name="edit" style={{ width: 20, height: 20, verticalAlign: "-4px" }} /> {t("reportHarassment")}</h3>
            <p className="muted" style={{ margin: "6px 0 0" }}>{t("safetyReportDesc")}</p>
          </div>
        </div>
        <div className="note note--danger" style={{ margin: "10px 0" }}>{t("emergencyNote")}</div>
        <button className="btn btn--ghost btn--block" onClick={() => navigate("/safety/report")}>{t("reportHarassment")} <Icon name="chevronRight" /></button>
      </div>

      {/* C. AI Support Assistant */}
      <div className="card" style={{ marginBottom: 14 }}>
        <h3 style={{ marginTop: 0 }}><Icon name="sparkles" style={{ width: 20, height: 20, verticalAlign: "-4px" }} /> {t("aiAssistant")}</h3>
        <p className="muted">{t("safetyAiDesc")}</p>
        <button className="btn btn--block" onClick={requestOpenAI}><Icon name="sparkles" /> {t("talkToAssistant")}</button>
      </div>

      {/* D. Nearby Help */}
      <div className="card" style={{ marginBottom: 14 }}>
        <h3 style={{ marginTop: 0 }}><Icon name="pin" style={{ width: 20, height: 20, verticalAlign: "-4px" }} /> {t("nearbyHelp")}</h3>
        <p className="muted">{t("safetyNearbyDesc")}</p>
        <button className="btn btn--outline btn--block" onClick={() => navigate("/safety/nearby")}>{t("nearbyHelp")} <Icon name="chevronRight" /></button>
      </div>

      {/* E. Evidence & Safety Guide */}
      <details className="card" style={{ marginBottom: 14 }}>
        <summary className="card__title" style={{ cursor: "pointer" }}>{t("evidenceGuide")}</summary>
        <div style={{ marginTop: 10 }}>
          <div className="note note--warn" style={{ marginBottom: 10 }}>
            {t("evidenceFirst")}
          </div>
          <ul className="list-reset">
            <li><Icon name="check" /> {t("evidence1")}</li>
            <li><Icon name="alert" /> {t("evidence2")}</li>
            <li><Icon name="eye" /> {t("evidence3")}</li>
          </ul>
        </div>
      </details>

      {/* F. Multilingual voice */}
      <div className="note note--info" style={{ marginBottom: 14 }}>
        <Icon name="mic" style={{ width: 18, height: 18, verticalAlign: "-3px" }} /> {t("safetyVoiceNote")}
      </div>

      {/* G. Quick exit note */}
      <div className="card center">
        <p className="muted" style={{ margin: 0 }}>{t("quickExitNote")}</p>
      </div>
    </div>
  );
}
