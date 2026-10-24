import { useRouter } from "../lib/router";
import { useI18n } from "../i18n";

/* Neutral destination for the quick-exit control. Looks like an ordinary
   informational page. Honest caveat included in small print. */
export default function Neutral() {
  const { t } = useI18n();
  const { navigate } = useRouter();
  return (
    <div className="neutral">
      <div style={{ maxWidth: 420 }}>
        <div className="neutral__weather">☀️ 29°</div>
        <h2 style={{ color: "#2b3a67", marginTop: 6 }}>{t("weatherToday")}</h2>
        <p style={{ color: "#5a6b8c" }}>{t("weatherDesc")}</p>
        <hr style={{ border: 0, borderTop: "1px solid #e6e6e6", margin: "20px 0" }} />
        <button
          onClick={() => navigate("/home")}
          style={{ background: "none", border: 0, color: "#9aa4b2", fontSize: "0.8rem", cursor: "pointer", textDecoration: "underline" }}
        >
          {t("returnBtn")}
        </button>
        <p style={{ color: "#b6bcc6", fontSize: "0.72rem", marginTop: 16 }}>
          {t("neutralCaveat")}
        </p>
      </div>
    </div>
  );
}
