import { PageTitle } from "../components/Shared";
import { Icon } from "../components/Icons";
import { useI18n } from "../i18n";
import { useRouter } from "../lib/router";

export default function Dashboard() {
  const { t } = useI18n();
  const { navigate } = useRouter();

  const cards = [
    { to: "/dashboard/periods", emoji: "🌸", title: t("periods"), sub: t("periodsSub"), cls: "block--doctor" },
    { to: "/dashboard/pregnancy", emoji: "🤰", title: t("pregnancy"), sub: t("pregnancySub"), cls: "block--aware" },
    { to: "/dashboard/elder", emoji: "👵", title: t("elder"), sub: t("elderSub"), cls: "block--about" },
  ];

  return (
    <div className="wrap">
      <PageTitle title={t("dashboardTitle")} sub={t("tagline")} />
      <div className="blocks">
        {cards.map((c) => (
          <button key={c.to} className={`block ${c.cls}`} onClick={() => navigate(c.to)}>
            <span className="block__emoji" aria-hidden="true">{c.emoji}</span>
            <span>
              <span className="block__title">{c.title}</span>
              <br />
              <span className="block__sub">{c.sub}</span>
            </span>
            <Icon name="chevronRight" style={{ position: "absolute", right: 18, bottom: 18, width: 22, height: 22 }} />
          </button>
        ))}
      </div>
      <p className="hint" style={{ marginTop: 14 }}>
        <Icon name="lock" style={{ width: 15, height: 15, verticalAlign: "-2px" }} /> {t("dashboardFootnote")}
      </p>
    </div>
  );
}
