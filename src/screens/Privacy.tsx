import { useState } from "react";
import { Icon } from "../components/Icons";
import { PageTitle } from "../components/Shared";
import { useToast } from "../components/Toast";
import { useI18n } from "../i18n";
import { useRouter } from "../lib/router";

export default function Privacy() {
  const { t } = useI18n();
  const { navigate } = useRouter();
  const { push } = useToast();
  const [confirming, setConfirming] = useState(false);

  const clearAll = () => {
    try {
      localStorage.removeItem("hercare+state:v1");
      sessionStorage.clear();
    } catch {
      /* ignore */
    }
    push(t("clearToast"), "ok");
    window.setTimeout(() => window.location.reload(), 700);
  };

  return (
    <div className="wrap" style={{ maxWidth: 640, marginInline: "auto" }}>
      <PageTitle title={`🔒 ${t("profilePrivacy")}`} back="/profile" />

      <div className="card card--pad-lg" style={{ marginBottom: 14 }}>
        <h2 style={{ marginTop: 0 }}>{t("whatCollect")}</h2>
        <ul className="list-reset">
          <li><Icon name="user" /> <span>{t("collectName")}</span></li>
          <li><Icon name="globe" /> <span>{t("collectLang")}</span></li>
          <li><Icon name="heart" /> <span>{t("collectHealth")}</span></li>
        </ul>
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <h3 style={{ marginTop: 0 }}>{t("yourControls")}</h3>
        <ul className="list-reset">
          <li><Icon name="check" /> <span>{t("controlOptional")}</span></li>
          <li><Icon name="lock" /> <span>{t("controlPin")}</span></li>
          <li><Icon name="eye" /> <span>{t("controlEmergency")}</span></li>
        </ul>
      </div>

      <div className="note note--info" style={{ marginBottom: 14 }}>
        {t("devBuildNote")}
      </div>

      {!confirming ? (
        <button className="btn btn--danger btn--block" onClick={() => setConfirming(true)}>
          <Icon name="close" /> {t("clearAllData")}
        </button>
      ) : (
        <div className="card center">
          <p className="muted">{t("clearConfirm")}</p>
          <div className="row center">
            <button className="btn btn--outline" onClick={() => setConfirming(false)}>{t("cancel")}</button>
            <button className="btn btn--danger" onClick={clearAll}>{t("clearYes")}</button>
          </div>
        </div>
      )}

      <button className="btn btn--soft btn--block" style={{ marginTop: 14 }} onClick={() => navigate("/profile")}>
        {t("navProfile")} <Icon name="chevronRight" />
      </button>
    </div>
  );
}
