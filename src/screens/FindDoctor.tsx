import { useMemo, useState } from "react";
import { Icon } from "../components/Icons";
import { PageTitle, FacilityCard, OfflineBanner } from "../components/Shared";
import { useI18n } from "../i18n";
import { dl } from "../i18n/data-labels";
import {
  FACILITIES,
  STATES,
  districtsFor,
  blocksFor,
  villagesFor,
} from "../data/doctors";
import type { Specialty } from "../data/doctors";
import { useToast } from "../components/Toast";

const SPECIALTIES: (Specialty | "All")[] = [
  "All",
  "Gynecologist",
  "Obstetrician",
  "General physician",
  "Pediatrician",
  "Mental health professional",
  "Addiction recovery",
];

export default function FindDoctor() {
  const { t, code } = useI18n();
  const { push } = useToast();
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [block, setBlock] = useState("");
  const [village, setVillage] = useState("");
  const [specialty, setSpecialty] = useState<Specialty | "All">("All");
  const [text, setText] = useState("");
  const [gov, setGov] = useState(false);
  const [privateOnly, setPrivateOnly] = useState(false);
  const [female, setFemale] = useState(false);
  const [useGps, setUseGps] = useState(false);

  const results = useMemo(() => {
    return FACILITIES.filter((f) => {
      if (state && f.state !== state) return false;
      if (district && f.district !== district) return false;
      if (block && f.block !== block) return false;
      if (village && f.village !== village) return false;
      if (specialty !== "All" && !f.specialties.includes(specialty)) return false;
      if (gov && !/government|PHC|CHC/i.test(f.type)) return false;
      if (privateOnly && !/private/i.test(f.type)) return false;
      if (female && !f.femaleDoctor) return false;
      if (text.trim() && !f.name.toLowerCase().includes(text.trim().toLowerCase())) return false;
      return true;
    });
  }, [state, district, block, village, specialty, gov, privateOnly, female, text]);

  const enableGps = () => {
    setUseGps(true);
    if (!("geolocation" in navigator)) {
      push(t("gpsNotAvailable"), "warn");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      () => push(t("gpsFound"), "ok"),
      () => push(t("gpsFail"), "warn"),
    );
  };

  return (
    <div className="wrap">
      <OfflineBanner />
      <PageTitle title={t("findDoctor")} sub={t("findDoctorSub")} back="/home" />

      <div className="note note--demo note--info" style={{ marginBottom: 14 }}>
        <Icon name="info" style={{ width: 16, height: 16, verticalAlign: "-2px" }} /> {t("demoNote")}
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <button
          className={`btn ${useGps ? "btn--sage" : "btn--ghost"} btn--block`}
          onClick={enableGps}
          aria-pressed={useGps}
        >
          <Icon name="pin" /> {useGps ? t("useGpsOn") : t("useGpsOff")}
        </button>
        <p className="hint" style={{ margin: "8px 0 0" }}>{t("manualSearchNote")}</p>
      </div>

      <div className="card" style={{ marginBottom: 14 }}>
        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
          <select className="select" value={state} onChange={(e) => { setState(e.target.value); setDistrict(""); setBlock(""); setVillage(""); }} aria-label={t("state")}>
            <option value="">{t("allLabel")} {t("state")}</option>
            {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="select" value={district} onChange={(e) => { setDistrict(e.target.value); setBlock(""); setVillage(""); }} disabled={!state} aria-label={t("district")}>
            <option value="">{t("allLabel")} {t("district")}</option>
            {districtsFor(state).map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
          <select className="select" value={block} onChange={(e) => { setBlock(e.target.value); setVillage(""); }} disabled={!district} aria-label={t("block")}>
            <option value="">{t("allLabel")} {t("block")}</option>
            {blocksFor(state, district).map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
          <select className="select" value={village} onChange={(e) => setVillage(e.target.value)} disabled={!block} aria-label={t("village")}>
            <option value="">{t("allLabel")} {t("village")}</option>
            {villagesFor(state, district, block).map((v) => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>

        <div className="field-group" style={{ marginTop: 12 }}>
          <label className="field" htmlFor="spec">{t("specialty")}</label>
          <select id="spec" className="select" value={specialty} onChange={(e) => setSpecialty(e.target.value as Specialty | "All")}>
            {SPECIALTIES.map((s) => <option key={s} value={s}>{s === "All" ? t("specAny") : dl(code, s)}</option>)}
          </select>
        </div>

        <div className="field-group">
          <label className="field" htmlFor="dn">{t("doctorName")} / {t("clinicWord")} ({t("optional")})</label>
          <input id="dn" className="input" value={text} onChange={(e) => setText(e.target.value)} placeholder={t("startTypingName")} />
        </div>

        <div className="chips">
          <button className="chip" aria-pressed={gov} onClick={() => { setGov(!gov); if (!gov) setPrivateOnly(false); }}>🏛 {t("filterGov")}</button>
          <button className="chip" aria-pressed={privateOnly} onClick={() => { setPrivateOnly(!privateOnly); if (!privateOnly) setGov(false); }}>🏥 {t("filterPrivate")}</button>
          <button className="chip" aria-pressed={female} onClick={() => setFemale(!female)}>♀ {t("filterFemale")}</button>
          <button className="chip" aria-pressed={specialty === "Gynecologist"} onClick={() => setSpecialty(specialty === "Gynecologist" ? "All" : "Gynecologist")}>{t("filterGyn")}</button>
          <button className="chip" aria-pressed={specialty === "Obstetrician"} onClick={() => setSpecialty(specialty === "Obstetrician" ? "All" : "Obstetrician")}>{t("filterObs")}</button>
          <button className="chip" aria-pressed={specialty === "Mental health professional"} onClick={() => setSpecialty(specialty === "Mental health professional" ? "All" : "Mental health professional")}>{t("filterMental")}</button>
          <button className="chip" aria-pressed={specialty === "Addiction recovery"} onClick={() => setSpecialty(specialty === "Addiction recovery" ? "All" : "Addiction recovery")}>{t("filterAddiction")}</button>
        </div>
      </div>

      <div className="row between" style={{ margin: "4px 2px 12px" }}>
        <strong>{results.length} {t("resultsWord")}</strong>
        <span className="hint">{t("sampleDirNote")}</span>
      </div>

      {results.length === 0 ? (
        <div className="card center">
          <span className="emoji-lg">🔍</span>
          <p className="muted">{t("noMatchDoctors")}</p>
        </div>
      ) : (
        <div className="stack">
          {results.map((f) => <FacilityCard key={f.id} f={f} />)}
        </div>
      )}
    </div>
  );
}
