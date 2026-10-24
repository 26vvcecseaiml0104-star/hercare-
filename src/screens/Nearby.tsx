import { Icon } from "../components/Icons";
import { PageTitle, FacilityCard } from "../components/Shared";
import { useI18n } from "../i18n";
import { dl } from "../i18n/data-labels";
import { facilitiesByTag } from "../data/doctors";
import { HELPLINES } from "../data/helplines";
import { telHref } from "../lib/links";

export default function Nearby() {
  const { t, code } = useI18n();
  const nearby = facilitiesByTag("nearby-help");

  return (
    <div className="wrap">
      <PageTitle title={`📍 ${t("nearbyHelp")}`} sub={t("safetyNearbyDesc")} back="/safety" />

      <div className="note note--info" style={{ marginBottom: 14 }}>
        {t("nearbyDemoIntro")} <strong>{t("demoLabel")}</strong>. {t("nearbyDemoOutro")}
      </div>

      <section style={{ marginBottom: 20 }}>
        <div className="stack">
          {nearby.map((f) => <FacilityCard key={f.id} f={f} />)}
        </div>
      </section>

      <h3 className="section-title">{t("helplinesHeading")} ({t("demoLabel")}: {t("realPublicNumbers")})</h3>
      <div className="stack">
        {HELPLINES.map((h) => (
          <div key={h.number} className="card">
            <div className="row between">
              <div>
                <strong>{dl(code, h.name)}</strong>
                <p className="muted" style={{ margin: "2px 0 0" }}>{dl(code, h.description)}</p>
                {h.note && <p className="hint" style={{ margin: "2px 0 0" }}>{dl(code, h.note)}</p>}
              </div>
              <a className="btn btn--call" href={telHref(h.number)}><Icon name="phone" /> {h.number}</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
