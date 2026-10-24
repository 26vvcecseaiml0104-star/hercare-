/* ---------------------------------------------------------------------------
   OTP verification — DEVELOPMENT MODE.

   SECURITY: This module simulates the OTP lifecycle so the registration flow
   is testable without an SMS gateway. It is explicitly NOT real authentication.
   In production:
     - OTP must be generated and verified SERVER-SIDE only.
     - Delivered through a trusted SMS provider (MSG91 / Twilio / AWS SNS).
     - The plaintext code must never reach the browser.
   See docs/integrations.md for the drop-in server contract.
   ------------------------------------------------------------------------- */

export type OtpState = {
  code: string;
  expiresAt: number;
  attempts: number;
  lastSentAt: number;
};

export const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes
export const RESEND_COOLDOWN_MS = 30 * 1000; // 30 seconds
export const MAX_ATTEMPTS = 5;

function randomSixDigits(): string {
  // Web Crypto for non-guessable codes (still dev-only; server owns real codes).
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return String(arr[0] % 1_000_000).padStart(6, "0");
}

export function issueOtp(): OtpState {
  return {
    code: randomSixDigits(),
    expiresAt: Date.now() + OTP_TTL_MS,
    attempts: 0,
    lastSentAt: Date.now(),
  };
}

export type VerifyResult =
  | { ok: true }
  | { ok: false; reason: "expired" | "attempts" | "invalid" };

export function verifyOtp(state: OtpState, input: string): { result: VerifyResult; state: OtpState } {
  if (Date.now() > state.expiresAt) return { result: { ok: false, reason: "expired" }, state };
  if (state.attempts >= MAX_ATTEMPTS) return { result: { ok: false, reason: "attempts" }, state };
  if (input === state.code) return { result: { ok: true }, state };
  const next = { ...state, attempts: state.attempts + 1 };
  return { result: { ok: false, reason: "invalid" }, state: next };
}

export function canResend(state: OtpState): boolean {
  return Date.now() - state.lastSentAt >= RESEND_COOLDOWN_MS;
}

/** Validate an Indian mobile number (10 digits, optional +91). */
export function normalizePhone(raw: string): string {
  const digits = raw.replace(/[^\d]/g, "").replace(/^91/, "");
  return digits;
}

export function isValidIndianMobile(raw: string): boolean {
  const d = normalizePhone(raw);
  return /^[6-9]\d{9}$/.test(d);
}
