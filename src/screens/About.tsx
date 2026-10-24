import { Icon } from "../components/Icons";
import { PageTitle } from "../components/Shared";
import { AudioButton } from "../components/AudioButton";
import { useI18n } from "../i18n";

export default function About() {
  const { t } = useI18n();
  const steps = [
    t("aboutStep1"),
    t("aboutStep2"),
    t("aboutStep3"),
    t("aboutStep4"),
    t("aboutStep5"),
    t("aboutStep6"),
    t("aboutStep7"),
    t("aboutStep8"),
    t("aboutStep9"),
  ];

  return (
    <div className="wrap">
      <PageTitle title={t("aboutApp")} sub={t("aboutAppSub")} back="/home" />
      <div className="card card--pad-lg">
        <div className="row between">
          <p className="muted" style={{ margin: 0 }}>{t("followSteps")}</p>
          <AudioButton text={steps.map((s, i) => `${t("stepWord")} ${i + 1}. ${s}`).join(". ")} label={t("playSteps")} />
        </div>
        <hr className="divider" />
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={i}>
              <span style={{ fontWeight: 600 }}>{s}</span>
            </li>
          ))}
        </ol>
      </div>
      <p className="hint" style={{ marginTop: 12 }}>
        <Icon name="info" style={{ width: 16, height: 16, verticalAlign: "-2px" }} /> {t("aboutVoiceNote")}
      </p>
    </div>
  );
}
