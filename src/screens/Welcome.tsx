import { useState } from "react";
import { Icon } from "../components/Icons";
import { OnboardingLanguageBar } from "../components/OnboardingLanguageBar";
import { useRouter } from "../lib/router";
import { useI18n } from "../i18n";
import { isValidIndianMobile, normalizePhone } from "../lib/otp";
import { issueOtp } from "../lib/otp";
import type { OtpState } from "../lib/otp";

/* Welcome + registration: only name and phone are requested (spec §2). */
export default function Welcome() {
  const { t } = useI18n();
  const { navigate } = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState("");

  const submit = () => {
    if (name.trim().length < 2) {
      setErr(t("errName"));
      return;
    }
    if (!isValidIndianMobile(phone)) {
      setErr(t("errPhone"));
      return;
    }
    const digits = normalizePhone(phone);
    // Dev-mode: mint the OTP and stash pending registration in sessionStorage.
    const otp: OtpState = issueOtp();
    sessionStorage.setItem("hercare+pending", JSON.stringify({ name: name.trim(), phone: digits, otp }));
    navigate("/otp");
  };

  return (
    <div className="wrap" style={{ maxWidth: 520, marginInline: "auto", paddingTop: 24 }}>
      <OnboardingLanguageBar />
      <div className="hero-welcome fade-in">
        <span className="brand__mark"><img src="/logo.png" alt="" aria-hidden="true" /></span>
        <h1>{t("welcomeTitle")}</h1>
        <p className="muted">{t("tagline")}</p>
        <p className="hint">{t("welcomeSub")}</p>
      </div>

      <div className="card card--pad-lg rise">
        <div className="field-group">
          <label className="field" htmlFor="name">{t("yourName")}</label>
          <input id="name" className="input" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </div>
        <div className="field-group">
          <label className="field" htmlFor="phone">{t("yourPhone")}</label>
          <input
            id="phone"
            className="input"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="+91 ····· ·····"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        {err && <p className="err" role="alert">{err}</p>}
        <button className="btn btn--lg btn--block" onClick={submit} style={{ marginTop: 8 }}>
          {t("continue")} <Icon name="chevronRight" />
        </button>
        <p className="hint" style={{ marginTop: 14 }}>
          <Icon name="lock" style={{ width: 16, height: 16, verticalAlign: "-2px" }} /> {t("registerHelp")}
        </p>
      </div>

      <div className="note note--warn" style={{ marginTop: 14 }}>
        <Icon name="info" style={{ width: 16, height: 16, verticalAlign: "-2px" }} /> {t("devModeBanner")}
      </div>

      <div className="center hint" style={{ marginTop: 18 }}>
        {t("emergencyAlways")}{" "}
        <a href="tel:112" className="nowrap"><Icon name="phone" style={{ width: 14, height: 14, verticalAlign: "-1px" }} /> 112</a>
      </div>
    </div>
  );
}
