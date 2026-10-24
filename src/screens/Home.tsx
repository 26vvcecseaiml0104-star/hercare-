import { Icon } from "../components/Icons";
import { useRouter } from "../lib/router";
import { useI18n } from "../i18n";
import { useStore } from "../lib/store";
import { OfflineBanner } from "../components/Shared";

export default function Home() {
  const { t } = useI18n();
  const { state } = useStore();
  const { navigate } = useRouter();

  const blocks = [
    { to: "/about", cls: "block--about", emoji: "ℹ️", title: t("aboutApp"), sub: t("aboutAppSub") },
    { to: "/awareness", cls: "block--aware", emoji: "📚", title: t("awareness"), sub: t("awarenessSub") },
    { to: "/doctor", cls: "block--doctor block--primary", emoji: "🩺", title: t("findDoctor"), sub: t("findDoctorSub"), primary: true },
    { to: "/journal", cls: "block--addict", emoji: "🌱", title: t("addictions"), sub: t("addictionsSub") },
    { to: "/safety", cls: "block--safety", emoji: "🛡️", title: t("safety"), sub: t("safetySub") },
  ];

  return (
    <div className="wrap">
      <OfflineBanner />
      <div className="row between" style={{ margin: "6px 0 16px" }}>
        <div>
          <h1 style={{ marginBottom: 2 }}>
            {state.user ? `👋 ${state.user.name}` : t("welcomeTitle")}
          </h1>
          <p className="muted" style={{ margin: 0 }}>{t("tagline")}</p>
        </div>
      </div>

      <a
        href="tel:112"
        className="btn btn--danger btn--block"
        style={{ marginBottom: 16, textDecoration: "none" }}
      >
        <Icon name="siren" /> {t("emergencyHelp")} · 112
      </a>

      <div className="blocks">
        {blocks.map((b) => (
          <button key={b.to} className={`block ${b.cls}`} onClick={() => navigate(b.to)}>
            {b.primary && <span className="badge badge--verified" style={{ position: "absolute", top: 14, right: 14 }}>★ {t("primaryFeature")}</span>}
            <span className="block__emoji" aria-hidden="true">{b.emoji}</span>
            <span>
              <span className="block__title">{b.title}</span>
              <br />
              <span className="block__sub">{b.sub}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
