import type { ReactNode } from "react";
import { Icon } from "./Icons";
import { Link, useRouter } from "../lib/router";
import { useI18n } from "../i18n";
import { dl } from "../i18n/data-labels";
import { useOnline } from "../lib/hooks";
import { useStore } from "../lib/store";
import type { Facility } from "../data/doctors";
import { feeLabel, SAMPLE_NOTE } from "../data/doctors";
import { telHref, mapsHref } from "../lib/links";
import { EMERGENCY_NUMBER } from "../lib/emergency";

export function OfflineBanner() {
  const online = useOnline();
  const { t } = useI18n();
  if (online) return null;
  return (
    <div className="offline" role="status">
      <Icon name="info" style={{ width: 16, height: 16, verticalAlign: "-3px" }} /> {t("offline")}
    </div>
  );
}

export function PageTitle({ title, sub, back }: { title: string; sub?: string; back?: string }) {
  const { t } = useI18n();
  return (
    <div style={{ marginBottom: 12 }}>
      {back && (
        <Link to={back} className="row tight muted" aria-label={t("back")}>
          <Icon name="arrowLeft" style={{ width: 20, height: 20 }} /> <span className="hint">{back === "/home" ? t("navHome") : t("back")}</span>
        </Link>
      )}
      <h1 style={{ marginTop: 8 }}>{title}</h1>
      {sub && <p className="muted">{sub}</p>}
    </div>
  );
}

export function EmergencyCall({ label, number = EMERGENCY_NUMBER }: { label?: string; number?: string }) {
  const { t } = useI18n();
  return (
    <a className="btn btn--danger btn--lg btn--block" href={`tel:${number}`}>
      <Icon name="phone" /> {label ?? `${t("callNow")} · ${number}`}
    </a>
  );
}

function TypeBadge({ f }: { f: Facility }) {
  const { code } = useI18n();
  const gov = f.type.toLowerCase().includes("government") || f.type.includes("PHC") || f.type.includes("CHC");
  return <span className={`badge ${gov ? "badge--gov" : "badge--private"}`}>{dl(code, f.type)}</span>;
}

export function FacilityCard({ f }: { f: Facility }) {
  const { t, code } = useI18n();
  const { state, toggleSaved } = useStore();
  const { navigate } = useRouter();
  const saved = state.savedFacilities.includes(f.id);
  const fee = feeLabel(f.fee, code);

  return (
    <div className="card">
      <div className="facility">
        <div className="facility__photo">
          {/* Neutral placeholder when no verified photograph exists (spec: never fake photos) */}
          <Icon name="building" />
        </div>
        <div className="facility__body">
          <div className="row between" style={{ alignItems: "flex-start" }}>
            <h3 style={{ marginBottom: 4 }}>{f.name}</h3>
          </div>
          <div className="row tight" style={{ marginBottom: 6 }}>
            <TypeBadge f={f} />
            {f.femaleDoctor && <span className="badge badge--fee">{t("femaleDoctorBadge")}</span>}
            <span className={`badge badge--${fee.kind === "free" ? "free" : fee.kind === "fee" ? "fee" : "unknown"}`}>{fee.text}</span>
            <span className="badge badge--demo" title={SAMPLE_NOTE}>{t("demoLabel")}</span>
          </div>
          <p className="meta"><Icon name="pin" /> {f.address}, {f.village}, {f.block}, {f.district}</p>
          <p className="meta"><Icon name="phone" /> {f.phone} · {dl(code, f.hours)}</p>
          <p className="meta"><Icon name="globe" /> {f.languages.join(", ")}</p>
          <p className="meta"><Icon name="check" /> {t("lastVerified")}: {f.verifiedAt}</p>
        </div>
      </div>

      <div className="facility__actions">
        <a className="btn btn--call" href={telHref(f.phone)}><Icon name="phone" /> {t("callNow")}</a>
        <a className="btn btn--outline" href={mapsHref(`${f.name} ${f.mapQuery}`)} target="_blank" rel="noopener noreferrer">
          <Icon name="pin" /> {t("directions")}
        </a>
        <button className="btn btn--soft" onClick={() => toggleSaved(f.id)} aria-pressed={saved}>
          <Icon name={saved ? "check" : "heart"} /> {saved ? t("saved") : t("saveFacility")}
        </button>
        <button className="btn btn--ghost" onClick={() => navigate(`/doctor/${f.id}`)}>
          {t("seeAll")} <Icon name="chevronRight" />
        </button>
      </div>
    </div>
  );
}

export function Section({ children }: { children: ReactNode }) {
  return <div className="card" style={{ marginBottom: 14 }}>{children}</div>;
}
