# HerCare+ — External Service Integration Guide

This prototype runs fully in the browser with a **clearly-labelled
development mode** for anything that needs a real backend or paid credentials
(SMS OTP, AI, database, maps, speech). Nothing unconfigured is presented as
operational. This document describes each integration point and how to wire a
production implementation.

> Security rule: **never put private API keys in frontend code.** All services
> below are reached through a server you control. Keep secrets in environment
> variables on the server.

---

## 1. Authentication & SMS OTP (spec §2)

**Dev mode today:** [`src/lib/otp.ts`](../src/lib/otp.ts) mints and verifies a
6-digit code in the browser. The code is shown on screen and the flow enforces
expiry (5 min), a 30-second resend cooldown and a 5-attempt lockout. This is
**not** real authentication.

**Production contract** (server-owned):

| Endpoint | Method | Purpose |
| --- | --- | --- |
| `POST /api/auth/otp/request` | body `{ phone }` | Generate OTP server-side, store hashed, rate-limit per number/IP, send via SMS provider. |
| `POST /api/auth/otp/verify` | body `{ phone, code }` | Verify, then issue a secure session token (httpOnly cookie / short-lived JWT + refresh). |
| `POST /api/auth/otp/resend` | body `{ phone }` | Re-send if cooldown passed. |

Rules server-side: bcrypt/HMAC-hash the code, max 5 attempts, single-use,
5-minute TTL, per-number and per-IP throttling, lockout + CAPTCHA on abuse.

**Supported SMS providers:** MSG91, Twilio Verify, AWS SNS, Termii.
Set on the server:

```
SMS_PROVIDER=msg91            # twilio | sns | msg91
MSG91_AUTH_KEY=…              # never in the client bundle
MSG91_TEMPLATE_ID=…
# or
TWILIO_ACCOUNT_SID=…
TWILIO_AUTH_TOKEN=…
TWILIO_VERIFY_SERVICE_SID=…
```

---

## 2. Database (spec §10, §11)

Recommended: **PostgreSQL**. Sensitive health records are separated from the
public facility directory and encrypted at rest with strict server-side
authorization.

Models required by the spec (suggested tables):

- `users`, `auth_sessions`
- `language_preferences`
- `facilities` (name, type, address, state/district/block/village, hours, photo, photo_rights, verified_at)
- `facility_phones`, `facility_languages`, `facility_services`
- `doctors`, `specialties`, `doctor_qualifications`, `doctor_languages`
- `consultation_fees` (amount, currency, verified, verified_at)
- `verification_history` (admin corrections)
- `articles`, `article_translations`
- `period_logs`, `pregnancy_records`, `infant_logs`, `health_measurements`
- `wellness_journal_entries`, `recovery_logs` (PIN-gated, encrypted)
- `helplines`, `support_facilities`
- `incident_reports` (write-only for the reporter, access-controlled)
- `content_reviews`

A migration + seed tool imports **verified** facility records with
`verified_at` dates; the UI always shows that date and never fabricates data.

---

## 3. AI Health Assistant (spec §7, §5-C)

**Dev mode today:** [`src/components/AIAssistant.tsx`](../src/components/AIAssistant.tsx)
uses a transparent rule + retrieval responder (red-flag regex rules, article and
helpline matching). It is **not** a live LLM and never diagnoses.

**Production contract:**

| Endpoint | Method | Notes |
| --- | --- | --- |
| `POST /api/assistant/chat` | body `{ message, language, history }` | Server calls the LLM with a medically-reviewed system prompt; returns text + suggested resources. Keys stay server-side. |

Guardrails (must be enforced in code, not only in the prompt):

- The clinically-reviewed **red-flag rules**
  ([`src/lib/emergency.ts`](../src/lib/emergency.ts)) run on **every** user
  message and **always take priority** over the model. The AI is never the only
  emergency safeguard.
- On a red-flag: stop routine advice, show **CALL EMERGENCY NOW** (tel:112), give
  simple safety steps — do not delay to collect more information.
- Never claim to be a lawyer, dispatcher or replacement for human support; never
  contact family/third parties without explicit user action or disclosed legal
  requirement.

```
AI_PROVIDER=openai            # anthropic | azure | local
AI_API_KEY=…                  # server-side only
AI_MODEL=…
```

---

## 4. Voice — speech-to-text & text-to-speech (spec §8, §3, §5-F)

**Dev mode today:** [`src/lib/speech.ts`](../src/lib/speech.ts) wraps the
browser **Web Speech API**. Support and language coverage vary by device; the UI
enables/disables the mic and audio **honestly** and never claims support a
device lacks (see the voice flags in [`src/i18n/languages.ts`](../src/i18n/languages.ts)).

**Production options for full 22-language / dialect coverage:**

- **Bhashini** (Government of India AI mission) — Indian languages STT/TTS/translation.
- Google Cloud Speech-to-Text / Text-to-Speech, Azure Speech, AI4Bharat models.
- Only request the microphone after the user taps it; never record continuously
  in the background.

```
SPEECH_PROVIDER=bhashini      # google | azure
BHASHINI_API_KEY=…            # server-side proxy recommended
```

---

## 5. Maps / directions (spec §3-block3, §5-D)

Cards link to Google Maps by search query (no key required) and support optional
GPS discovery with user permission; **manual state → district → block → village
selection always works without GPS or internet**. For a native map/autocomplete
experience use Mapbox/Google Maps SDK with a server-proxied key:

```
MAPS_PROVIDER=mapbox
MAPBOX_ACCESS_TOKEN=…         # proxied / restricted; never a raw client key
```

---

## 6. Offline & low-bandwidth (spec §9)

- Cache essential interface resources and selected **non-sensitive** facility
  details; show a **last-updated date** and a clear offline indicator
  ([`src/lib/hooks.ts`](../src/lib/hooks.ts) `useOnline` + `OfflineBanner`).
- Live availability/fees are never presented as current while offline.
- Consider adding a service worker (`vite-plugin-pwa`) for installable, cached
  operation.

---

## 7. Sharing — WhatsApp / SMS (spec §9)

Actions use native links (`tel:`, `sms:`, `https://wa.me/`) built in
[`src/lib/links.ts`](../src/lib/links.ts). The user **reviews the message before
it is sent** and sensitive health information is never auto-shared.

---

## 8. Compliance & privacy (spec §11)

HTTPS, secure session handling, rate limiting, encryption of sensitive data,
input validation, access control, retention/deletion policies, privacy-conscious
logging (no recovery data in analytics/logs), consent and clear privacy
information. Comply with the **DPDP Act 2023 (India)** and applicable healthcare
data rules. Emergency help remains accessible without login.

---

## Running the app

```
npm install        # (this prototype has no third-party runtime deps)
npm run dev        # start Vite dev server
npm run build      # type-check + production build to dist/
```

The app opens on the registration screen; use the on-screen **dev OTP code** to
continue. Sample doctors/facilities are always labelled **"Sample data"** and are
never shown as real providers.
