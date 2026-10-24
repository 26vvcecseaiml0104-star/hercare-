import { useState } from "react";
import { Icon } from "../components/Icons";
import { PageTitle, FacilityCard } from "../components/Shared";
import { LanguagePicker } from "../components/LanguagePicker";
import { useI18n } from "../i18n";
import { useStore } from "../lib/store";
import { useRouter } from "../lib/router";
import { getFacility } from "../data/doctors";
import { findLanguage } from "../i18n/languages";

export default function Profile() {
  const { t, code } = useI18n();
  const { state, logout } = useStore();
  const { navigate } = useRouter();
  const [picker, setPicker] = useState(false);
  const lang = findLanguage(code);

  const saved = state.savedFacilities.map(getFacility).filter((f): f is NonNullable<typeof f> => Boolean(f));

  return (
    <div className="wrap">
      <PageTitle title={`👤 ${t("navProfile")}`} back="/home" />

      <div className="card card--pad-lg" style={{ marginBottom: 14 }}>
        <div className="row" style={{ gap: 14 }}>
          <span className="emoji-lg">🌸</span>
          <div className="grow">
            <h2 style={{ margin: 0 }}>{state.user?.name ?? t("guestName")}</h2>
            <p className="muted" style={{ margin: "2px 0 0" }}>+91 {state.user?.phone ?? "—"}</p>
            {state.user?.verified && <span className="badge badge--verified" style={{ marginTop: 6 }}>✓ {t("phoneVerified")}</span>}
          </div>
        </div>
      </div>

      <div className="stack">
        <button className="card card--tap" onClick={() => setPicker(true)}>
          <div className="row between">
            <span className="row tight"><Icon name="globe" /> <strong>{t("profileLanguage")}</strong></span>
            <span className="muted">{lang.native} <Icon name="chevronRight" style={{ width: 18, height: 18, verticalAlign: "-3px" }} /></span>
          </div>
        </button>

        <button className="card card--tap" onClick={() => navigate("/privacy")}>
          <div className="row between">
            <span className="row tight"><Icon name="lock" /> <strong>{t("profilePrivacy")}</strong></span>
            <Icon name="chevronRight" style={{ width: 18, height: 18 }} />
          </div>
        </button>

        <button className="card card--tap" onClick={() => navigate("/journal")}>
          <div className="row between">
            <span className="row tight"><Icon name="leaf" /> <strong>{t("addictions")}</strong></span>
            <span className="muted">{t("pinProtected")}</span>
          </div>
        </button>
      </div>

      <h3 className="section-title">{t("savedFacilities")}</h3>
      {saved.length === 0 ? (
        <p className="muted">{t("noneSaved")}</p>
      ) : (
        <div className="stack">{saved.map((f) => <FacilityCard key={f.id} f={f} />)}</div>
      )}

      <button
        className="btn btn--danger btn--block"
        style={{ marginTop: 20 }}
        onClick={() => {
          logout();
          navigate("/welcome", { replace: true });
        }}
      >
        <Icon name="logout" /> {t("logOut")}
      </button>
      <p className="hint center" style={{ marginTop: 10 }}>{t("logoutNote")}</p>

      <LanguagePicker open={picker} onClose={() => setPicker(false)} />
    </div>
  );
}
