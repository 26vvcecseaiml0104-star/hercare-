import { Icon } from "../components/Icons";
import { PageTitle } from "../components/Shared";
import { AudioButton } from "../components/AudioButton";
import { useI18n } from "../i18n";
import { useRouter, segments } from "../lib/router";
import { getArticle, localizedArticle } from "../data/articles";

export default function Article({ path }: { path: string }) {
  const { t, code } = useI18n();
  const { navigate } = useRouter();
  const id = segments(path)[2];
  const a = getArticle(id);

  if (!a) {
    return (
      <div className="wrap">
        <PageTitle title={t("notFound")} back="/awareness" />
        <p className="muted">{t("articleLoadError")}</p>
      </div>
    );
  }

  const body = localizedArticle(a, code);
  const spoken = `${body.title}. ${body.summary} ${body.points.join(". ")} ${t("whenToSeek")}: ${body.seekCare}`;

  return (
    <div className="wrap">
      <PageTitle title={body.title} back="/awareness" />
      <div className="card card--pad-lg">
        <div className="row between" style={{ marginBottom: 12 }}>
          <span className="emoji-lg" aria-hidden="true">{a.emoji}</span>
          <AudioButton text={spoken} label={t("listenAgain")} />
        </div>
        <p style={{ fontSize: "1.08rem" }}>{body.summary}</p>
        <hr className="divider" />
        <h3>{t("practicalSteps")}</h3>
        <ul className="list-reset">
          {body.points.map((p, i) => (
            <li key={i}><Icon name="check" /> <span>{p}</span></li>
          ))}
        </ul>

        <div className="note note--warn" style={{ marginTop: 14 }}>
          <strong><Icon name="alert" style={{ width: 18, height: 18, verticalAlign: "-3px" }} /> {t("whenToSeek")}</strong>
          <p style={{ margin: "6px 0 0" }}>{body.seekCare}</p>
        </div>
      </div>

      <div className="note note--info" style={{ marginTop: 14 }}>
        {t("eduDisclaimer")}
      </div>

      <button className="btn btn--lg btn--block" style={{ marginTop: 14 }} onClick={() => navigate("/doctor")}>
        <Icon name="stethoscope" /> {t("findDoctor")}
      </button>
    </div>
  );
}
