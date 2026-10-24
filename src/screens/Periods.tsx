import { useState } from "react";
import { Icon } from "../components/Icons";
import { PageTitle } from "../components/Shared";
import { AudioButton } from "../components/AudioButton";
import { useI18n } from "../i18n";
import { dl } from "../i18n/data-labels";
import { useRouter } from "../lib/router";
import { useStore, todayISO } from "../lib/store";

const SYMPTOM_CHOICES = ["Cramps", "Headache", "Mood", "Fatigue", "None"];

export default function Periods() {
  const { t, code } = useI18n();
  const { navigate } = useRouter();
  const { state, addPeriodLog, removePeriodLog } = useStore();
  const [symptoms, setSymptoms] = useState<string[]>([]);

  const toggleSymptom = (s: string) =>
    setSymptoms((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  const logToday = () => {
    addPeriodLog({ start: todayISO(), symptoms });
    setSymptoms([]);
  };

  const estimate = (() => {
    if (state.periodLogs.length < 2) return null;
    const starts = state.periodLogs.map((p) => new Date(p.start).getTime());
    const gaps: number[] = [];
    for (let i = 1; i < starts.length; i++) gaps.push(Math.round((starts[i] - starts[i - 1]) / 86400000));
    const avg = Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length);
    const next = new Date(starts[starts.length - 1] + avg * 86400000);
    return { avg, next: next.toLocaleDateString() };
  })();

  return (
    <div className="wrap">
      <PageTitle title={`🌸 ${t("periods")}`} sub={t("periodsSub")} back="/dashboard" />

      <div className="card card--pad-lg" style={{ marginBottom: 14 }}>
        <button className="btn btn--lg btn--block" onClick={logToday}>
          <Icon name="plus" /> {t("logToday")}
        </button>
        <p className="field" style={{ marginTop: 14 }}>{t("symptomsField")} ({t("optional")})</p>
        <div className="chips">
          {SYMPTOM_CHOICES.map((s) => (
            <button key={s} className="chip" aria-pressed={symptoms.includes(s)} onClick={() => toggleSymptom(s)}>{dl(code, s)}</button>
          ))}
        </div>
      </div>

      {estimate && (
        <div className="note note--info" style={{ marginBottom: 14 }}>
          <Icon name="calendar" style={{ width: 18, height: 18, verticalAlign: "-3px" }} /> {t("estNextPeriod")} <strong>{estimate.next}</strong> ({t("estBasedOn")} ~{estimate.avg}-{t("estCycleDay")}). {t("estOnlyEstimate")}
        </div>
      )}

      <div className="card" style={{ marginBottom: 14 }}>
        <div className="row between">
          <h3 style={{ margin: 0 }}>{t("yourTimeline")}</h3>
          <AudioButton text={t("periodsHygieneSpoken")} label={t("listenAgain")} />
        </div>
        {state.periodLogs.length === 0 ? (
          <p className="muted" style={{ marginTop: 8 }}>{t("noEntries")}</p>
        ) : (
          <>
            <div className="timeline" style={{ marginTop: 10 }} aria-hidden="true">
              {state.periodLogs.slice(-30).map((p, i) => (
                <span key={i} className="timeline__dot timeline__dot--on" title={p.start} />
              ))}
            </div>
            <ul className="list-reset" style={{ marginTop: 10 }}>
              {state.periodLogs.slice().reverse().map((p, rev) => {
                const index = state.periodLogs.length - 1 - rev;
                return (
                  <li key={p.start + index}>
                    <Icon name="heart" />
                    <span className="grow">{p.start}{p.symptoms?.length ? ` · ${p.symptoms.map((x) => dl(code, x)).join(", ")}` : ""}</span>
                    <button className="iconbtn" onClick={() => removePeriodLog(index)} aria-label={t("deleteEntryAria")}><Icon name="close" /></button>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>

      <div className="note note--warn">
        <strong>{t("seeWorkerIf")}</strong> {t("periodWarnBody")}
      </div>
      <button className="btn btn--outline btn--block" style={{ marginTop: 12 }} onClick={() => navigate("/awareness/article/art-mens")}>
        🌸 {t("hygieneGuideBtn")} <Icon name="chevronRight" />
      </button>
    </div>
  );
}
