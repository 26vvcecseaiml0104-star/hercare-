import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { Icon } from "../components/Icons";
import { OnboardingLanguageBar } from "../components/OnboardingLanguageBar";
import { useRouter } from "../lib/router";
import { useI18n } from "../i18n";
import { useStore } from "../lib/store";
import {
  canResend,
  issueOtp,
  MAX_ATTEMPTS,
  verifyOtp,
} from "../lib/otp";
import type { OtpState } from "../lib/otp";

type Pending = { name: string; phone: string; otp: OtpState };

export default function OtpVerify() {
  const { t } = useI18n();
  const { navigate } = useRouter();
  const { state, setUser } = useStore();

  const raw = sessionStorage.getItem("hercare+pending");
  const [pending, setPending] = useState<Pending | null>(raw ? (JSON.parse(raw) as Pending) : null);
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [err, setErr] = useState("");
  const [secondsLeft, setSecondsLeft] = useState(30);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!pending) navigate("/welcome", { replace: true });
  }, [pending, navigate]);

  // Resend cooldown ticker + OTP expiry ticker
  useEffect(() => {
    if (!pending) return;
    const iv = window.setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
      if (Date.now() > pending.otp.expiresAt) {
        setErr(t("otpExpired"));
      }
    }, 1000);
    return () => window.clearInterval(iv);
  }, [pending, t]);

  if (!pending) return null;

  const setDigit = (i: number, v: string) => {
    const clean = v.replace(/\D/g, "").slice(-1);
    setErr("");
    setDigits((d) => {
      const next = [...d];
      next[i] = clean;
      return next;
    });
    if (clean && i < 5) refs.current[i + 1]?.focus();
  };

  const onKey = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
  };

  const doVerify = () => {
    const input = digits.join("");
    if (input.length !== 6) {
      setErr(t("errOtpDigits"));
      return;
    }
    const { result, state: otpState } = verifyOtp(pending.otp, input);
    if (!result.ok) {
      setPending({ ...pending, otp: otpState });
      sessionStorage.setItem("hercare+pending", JSON.stringify({ ...pending, otp: otpState }));
      setErr(
        result.reason === "expired"
          ? t("otpExpired")
          : result.reason === "attempts"
            ? t("otpTooMany")
            : t("otpWrong"),
      );
      return;
    }
    // Success: create account + establish (dev) session.
    setUser({ name: pending.name, phone: pending.phone, verified: true, createdAt: new Date().toISOString() });
    sessionStorage.removeItem("hercare+pending");
    // If a language was already chosen on the Welcome screen, go straight to the
    // app; otherwise show the language step. The choice then applies everywhere.
    navigate(state.language ? "/home" : "/language", { replace: true });
  };

  const resend = () => {
    const otp = issueOtp();
    const np = { ...pending, otp };
    setPending(np);
    sessionStorage.setItem("hercare+pending", JSON.stringify(np));
    setDigits(["", "", "", "", "", ""]);
    setSecondsLeft(30);
    setErr("");
    refs.current[0]?.focus();
  };

  const expired = Date.now() > pending.otp.expiresAt;
  const blocked = pending.otp.attempts >= MAX_ATTEMPTS;

  return (
    <div className="wrap" style={{ maxWidth: 520, marginInline: "auto", paddingTop: 16 }}>
      <OnboardingLanguageBar />
      <PageBack to="/welcome" />
      <div className="card card--pad-lg rise">
        <h1>{t("enterOtp")}</h1>
        <p className="muted">
          {t("sentTo")} <strong>+91 {pending.phone}</strong>
        </p>

        <div className="note note--warn" style={{ margin: "10px 0" }}>
          <Icon name="info" style={{ width: 16, height: 16, verticalAlign: "-2px" }} /> {t("devCodeLabel")}{" "}
          <strong className="kbd">{pending.otp.code}</strong>
        </div>

        <div className="otp-row">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className="otp-box"
              inputMode="numeric"
              autoComplete={i === 0 ? "one-time-code" : "off"}
              maxLength={1}
              value={d}
              disabled={expired || blocked}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={(e) => onKey(i, e)}
              aria-label={`${t("digitLabel")} ${i + 1}`}
            />
          ))}
        </div>

        {err && <p className="err" role="alert">{err}</p>}

        <button className="btn btn--lg btn--block" onClick={doVerify} disabled={expired || blocked}>
          {t("verify")} <Icon name="check" />
        </button>

        <div className="row between" style={{ marginTop: 14 }}>
          <button className="btn btn--ghost" onClick={resend} disabled={!canResend(pending.otp)}>
            {canResend(pending.otp) ? t("resendOtp") : `${t("resendIn")} ${secondsLeft}s`}
          </button>
          <button className="btn btn--outline" onClick={() => navigate("/welcome")}>
            <Icon name="edit" /> {t("editNumber")}
          </button>
        </div>
        {blocked && <p className="err" role="alert">{t("otpTooMany")}</p>}
      </div>

      <div className="center hint" style={{ marginTop: 16 }}>
        {t("devModeNote")}
      </div>
    </div>
  );
}

function PageBack({ to }: { to: string }) {
  const { t } = useI18n();
  const { navigate } = useRouter();
  return (
    <button className="btn btn--outline" onClick={() => navigate(to)} style={{ marginBottom: 10 }}>
      <Icon name="arrowLeft" /> {t("back")}
    </button>
  );
}
