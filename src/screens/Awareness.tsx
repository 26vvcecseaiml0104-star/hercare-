import { PageTitle } from "../components/Shared";
import { AudioButton } from "../components/AudioButton";
import { Icon } from "../components/Icons";
import { useI18n } from "../i18n";
import { useRouter } from "../lib/router";
import { localizedArticle, CATEGORY_KEY, articlesByCategory } from "../data/articles";
import type { Category } from "../data/articles";

const ORDER: Category[] = ["lifecycle", "preventive", "wellness", "myth"];
const CAT_EMOJI: Record<Category, string> = { lifecycle: "🌷", preventive: "🛡️", wellness: "🧘", myth: "❌" };

export default function Awareness() {
  const { t, code } = useI18n();
  const { navigate } = useRouter();

  return (
    <div className="wrap">
      <PageTitle title={t("awareness")} sub={t("awarenessSub")} back="/home" />
      <div className="note note--info" style={{ marginBottom: 14 }}>
        {t("demoLabel")}: {t("awareDemoNote")}
      </div>

      {ORDER.map((cat) => (
        <section key={cat} style={{ marginBottom: 22 }}>
          <h2 className="section-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span aria-hidden="true">{CAT_EMOJI[cat]}</span> {t(CATEGORY_KEY[cat])}
          </h2>
          <div className="stack">
            {articlesByCategory(cat).map((a) => {
              const body = localizedArticle(a, code);
              return (
                <div key={a.id} className="card">
                  <div className="row between" style={{ alignItems: "flex-start" }}>
                    <span className="emoji-lg" style={{ fontSize: "1.5rem" }} aria-hidden="true">{a.emoji}</span>
                    <div style={{ flex: 1, marginInline: 10 }}>
                      <div className="card__title">{body.title}</div>
                      <p className="muted" style={{ margin: "4px 0 0" }}>{body.summary}</p>
                    </div>
                    <AudioButton text={body.summary} label="🔊" />
                  </div>
                  <button className="btn btn--soft btn--block" style={{ marginTop: 10 }} onClick={() => navigate(`/awareness/article/${a.id}`)}>
                    {t("seeAll")} <Icon name="chevronRight" />
                  </button>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
