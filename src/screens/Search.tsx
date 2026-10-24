import { Icon } from "../components/Icons";
import { PageTitle, FacilityCard } from "../components/Shared";
import { useI18n } from "../i18n";
import { dl } from "../i18n/data-labels";
import { useRouter, segments } from "../lib/router";
import { FACILITIES } from "../data/doctors";
import { searchArticles, localizedArticle } from "../data/articles";
import { HELPLINES } from "../data/helplines";

export default function Search({ path }: { path: string }) {
  const { t, code } = useI18n();
  const { navigate } = useRouter();
  const raw = segments(path)[1] ?? "";
  const q = decodeURIComponent(raw);
  const needle = q.toLowerCase();

  const facilities = FACILITIES.filter(
    (f) =>
      [f.name, f.district, f.state, f.village, f.block, f.type, ...f.specialties, ...f.languages, ...f.services]
        .join(" ")
        .toLowerCase()
        .includes(needle),
  );
  const articles = searchArticles(q);
  const lines = HELPLINES.filter((h) => `${h.name} ${h.number} ${h.description}`.toLowerCase().includes(needle));

  const nothing = !facilities.length && !articles.length && !lines.length;

  return (
    <div className="wrap">
      <PageTitle title={`${t("search")}: “${q}”`} back="/home" />

      {/(emergency|danger|help|safe|rape|abuse)/.test(needle) && (
        <a href="tel:112" className="btn btn--danger btn--block" style={{ marginBottom: 14 }}>
          <Icon name="siren" /> {t("emergencyHelp")} · 112
        </a>
      )}

      {nothing ? (
        <div className="card center">
          <span className="emoji-lg">🔎</span>
          <p className="muted">{t("searchNoMatch")}</p>
        </div>
      ) : (
        <>
          {articles.length > 0 && (
            <section style={{ marginBottom: 20 }}>
              <h2 className="section-title">📚 {t("awareness")}</h2>
              <div className="stack">
                {articles.map((a) => (
                  <button key={a.id} className="card card--tap" onClick={() => navigate(`/awareness/article/${a.id}`)}>
                    <div className="row tight">
                      <span className="emoji-lg" style={{ fontSize: "1.5rem" }}>{a.emoji}</span>
                      <div>
                        <div className="card__title">{localizedArticle(a, code).title}</div>
                        <p className="muted" style={{ margin: 0 }}>{localizedArticle(a, code).summary}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          {facilities.length > 0 && (
            <section style={{ marginBottom: 20 }}>
              <h2 className="section-title">🩺 {t("findDoctor")}</h2>
              <div className="stack">
                {facilities.map((f) => (
                  <FacilityCard key={f.id} f={f} />
                ))}
              </div>
            </section>
          )}

          {lines.length > 0 && (
            <section>
              <h2 className="section-title">☎️ {t("helplinesHeading")}</h2>
              <div className="stack">
                {lines.map((h) => (
                  <div key={h.number} className="card">
                    <div className="row between">
                      <div>
                        <strong>{dl(code, h.name)}</strong>
                        <p className="muted" style={{ margin: 0 }}>{dl(code, h.description)}</p>
                      </div>
                      <a className="btn btn--call" href={`tel:${h.number}`}><Icon name="phone" /> {h.number}</a>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
