import { useState } from "react";
import { Icon } from "../components/Icons";
import { PageTitle, EmergencyCall } from "../components/Shared";
import { useI18n } from "../i18n";
import { dl } from "../i18n/data-labels";
import { useRouter, segments } from "../lib/router";
import { getFacility, feeLabel, SAMPLE_NOTE } from "../data/doctors";
import { useStore } from "../lib/store";
import { telHref, mapsHref, smsHref, whatsappHref, facilityShareText } from "../lib/links";

export default function DoctorDetails({ path }: { path: string }) {
  const { t, code } = useI18n();
  const { navigate } = useRouter();
  const { state, toggleSaved } = useStore();
  const f = getFacility(segments(path)[1] ?? "");
  const [share, setShare] = useState<null | "whatsapp" | "sms">(null);
  const [message, setMessage] = useState("");

  if (!f) {
    return (
      <div className="wrap">
        <PageTitle title={t("notFound")} back="/doctor" />
        <p className="muted">{t("facilityLoadError")}</p>
      </div>
    );
  }

  const saved = state.savedFacilities.includes(f.id);
  const fee = feeLabel(f.fee, code);
  const shareText = facilityShareText(f);

  const openShare = (kind: "whatsapp" | "sms") => {
    setMessage(shareText);
    setShare(kind);
  };

  return (
    <div className="wrap">
      <PageTitle title={f.name} sub={dl(code, f.type)} back="/doctor" />

      <div className="badge badge--demo" style={{ marginBottom: 12 }} title={SAMPLE_NOTE}>{t("demoLabel")} — {t("demoNeverReal")}</div>

      <div className="card card--pad-lg" style={{ marginBottom: 14 }}>
        <div className="facility__photo" style={{ width: "100%", height: 150, marginBottom: 14 }}>
          <Icon name="building" style={{ width: 60, height: 60 }} />
        </div>
        <div className="row tight" style={{ marginBottom: 10 }}>
          {f.femaleDoctor && <span className="badge badge--fee">{t("femaleAvailable")}</span>}
          <span className={`badge badge--${fee.kind === "free" ? "free" : fee.kind === "fee" ? "fee" : "unknown"}`}>{fee.text}</span>
          {f.womenWard && <span className="badge badge--verified">{t("womenWard")}</span>}
        </div>

        <ul className="list-reset">
          <li><Icon name="pin" /> <span>{f.address}, {f.village}, {f.block}, {f.district}, {f.state}</span></li>
          <li><Icon name="stethoscope" /> <span><strong>{t("specialtiesLabel")}:</strong> {f.specialties.map((s) => dl(code, s)).join(", ")}</span></li>
          <li><Icon name="calendar" /> <span><strong>{t("availability")}:</strong> {dl(code, f.hours)}</span></li>
          <li><Icon name="phone" /> <span><strong>{t("phoneLabel")}:</strong> {f.phone}</span></li>
          <li><Icon name="globe" /> <span><strong>{t("languagesSpoken")}:</strong> {f.languages.join(", ")}</span></li>
          <li><Icon name="check" /> <span><strong>{t("lastVerified")}:</strong> {f.verifiedAt}</span></li>
        </ul>

        <h3 style={{ marginTop: 16 }}>{t("servicesLabel")}</h3>
        <div className="pill-list">
          {f.services.map((s) => <span key={s} className="tag">{dl(code, s)}</span>)}
        </div>
      </div>

      <div className="stack">
        <a className="btn btn--call btn--lg btn--block" href={telHref(f.phone)}><Icon name="phone" /> {t("callNow")}</a>
        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <a className="btn btn--outline" href={mapsHref(`${f.name} ${f.mapQuery}`)} target="_blank" rel="noopener noreferrer"><Icon name="pin" /> {t("directions")}</a>
          <button className="btn btn--soft" onClick={() => toggleSaved(f.id)} aria-pressed={saved}>
            <Icon name={saved ? "check" : "heart"} /> {saved ? t("saved") : t("saveFacility")}
          </button>
          <button className="btn btn--ghost" onClick={() => openShare("whatsapp")}><Icon name="whatsapp" /> {t("whatsapp")}</button>
          <button className="btn btn--ghost" onClick={() => openShare("sms")}><Icon name="message" /> {t("sms")}</button>
        </div>
        <p className="hint center">{t("shareReviewNote")}</p>
      </div>

      {share && (
        <div className="overlay" role="dialog" aria-modal="true" aria-label={`${t("share")} — ${t("whatsapp")}/${t("sms")}`}>
          <div className="sheet sheet--center">
            <div className="sheet__head">
              <Icon name={share === "whatsapp" ? "whatsapp" : "message"} />
              <strong className="grow">{t("reviewBeforeSend")}</strong>
              <button className="iconbtn" onClick={() => setShare(null)} aria-label={t("close")}><Icon name="close" /></button>
            </div>
            <div className="sheet__body">
              <textarea className="textarea" value={message} onChange={(e) => setMessage(e.target.value)} aria-label={t("aiMessage")} />
              <p className="hint">{t("toWord")}: {f.phone}. {t("neverShareAuto")}</p>
            </div>
            <div className="sheet__foot">
              <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
                <button className="btn btn--outline" onClick={() => setShare(null)}>{t("cancel")}</button>
                <a
                  className="btn"
                  href={share === "whatsapp" ? whatsappHref(f.phone, message) : smsHref(f.phone, message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShare(null)}
                >
                  <Icon name="check" /> {t("openWord")} {share === "whatsapp" ? t("whatsapp") : t("sms")}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ height: 16 }} />
      <EmergencyCall label={`${t("emergencyHelp")} · 112`} />
      <button className="btn btn--outline btn--block" style={{ marginTop: 10 }} onClick={() => navigate("/dashboard/periods")}>
        {t("periods")} <Icon name="chevronRight" />
      </button>
    </div>
  );
}
