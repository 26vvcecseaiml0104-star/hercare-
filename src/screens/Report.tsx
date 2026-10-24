import { useState } from "react";
import { Icon } from "../components/Icons";
import { PageTitle, EmergencyCall } from "../components/Shared";
import { useI18n } from "../i18n";

export default function Report() {
  const { t } = useI18n();
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [method, setMethod] = useState("Call");
  const [anonymous, setAnonymous] = useState(true);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="wrap">
        <PageTitle title={t("reportHarassment")} back="/safety" />
        <div className="card card--pad-lg center">
          <span className="emoji-lg">✅</span>
          <h2>{t("receivedTitle")}</h2>
          <p className="muted">
            {t("reportReceivedBody")}
          </p>
          <div className="note note--danger" style={{ textAlign: "start", marginTop: 12 }}>{t("emergencyNote")}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="wrap" style={{ maxWidth: 620, marginInline: "auto" }}>
      <PageTitle title={t("reportHarassment")} back="/safety" />

      <div className="note note--danger" style={{ marginBottom: 14 }}>
        <Icon name="alert" style={{ width: 16, height: 16, verticalAlign: "-2px" }} /> {t("emergencyNote")}
      </div>

      <div className="card card--pad-lg">
        <div className="chips" style={{ marginBottom: 12 }}>
          <button className="chip" aria-pressed={anonymous} onClick={() => setAnonymous(!anonymous)}>
            <Icon name={anonymous ? "eye" : "user"} style={{ width: 16, height: 16 }} /> {anonymous ? t("anonSubmit") : t("includeContact")}
          </button>
        </div>

        <div className="field-group">
          <label className="field" htmlFor="cat">{t("incidentCategory")}</label>
          <select id="cat" className="select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">{t("chooseEllipse")}</option>
            <option value="Harassment">{t("catHarassment")}</option>
            <option value="Domestic violence">{t("catDomestic")}</option>
            <option value="Stalking">{t("catStalking")}</option>
            <option value="Workplace">{t("catWorkplace")}</option>
            <option value="Online">{t("catOnline")}</option>
            <option value="Other">{t("catOtherReport")}</option>
          </select>
        </div>

        <div className="field-group">
          <label className="field" htmlFor="desc">{t("whatHappened")} ({t("optional")})</label>
          <textarea id="desc" className="textarea" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder={t("reportDescPlaceholder")} />
        </div>

        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <div className="field-group">
            <label className="field" htmlFor="date">{t("dateLabel")} ({t("optional")})</label>
            <input id="date" type="date" className="input" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="field-group">
            <label className="field" htmlFor="loc">{t("locationLabel")} ({t("optional")})</label>
            <input id="loc" className="input" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
        </div>

        {!anonymous && (
          <div className="field-group">
            <label className="field" htmlFor="contact">{t("contactInfo")}</label>
            <input id="contact" className="input" value={contact} onChange={(e) => setContact(e.target.value)} inputMode="tel" />
            <label className="field" style={{ marginTop: 10 }} htmlFor="method">{t("preferredMethod")}</label>
            <select id="method" className="select" value={method} onChange={(e) => setMethod(e.target.value)}>
              <option value="Call">{t("reportMethodCall")}</option>
              <option value="SMS">{t("sms")}</option>
              <option value="WhatsApp">{t("whatsapp")}</option>
            </select>
          </div>
        )}

        <div className="note note--info" style={{ marginBottom: 12 }}>
          {t("reportPrivacyNote")}
        </div>

        <button className="btn btn--lg btn--block" onClick={() => setSent(true)}>
          <Icon name="check" /> {t("submitReport")}
        </button>
      </div>

      <div style={{ height: 14 }} />
      <EmergencyCall label={`${t("emergencyHelp")} · 112`} />
    </div>
  );
}
