/* ---------------------------------------------------------------------------
   Speech helpers wrapping the browser Web Speech API.

   Text-to-speech (SpeechSynthesis) and speech recognition
   (SpeechRecognition / webkitSpeechRecognition) have variable support and
   language coverage across browsers/devices. Everything here degrades
   gracefully: callers get an "unavailable" signal and fall back to text.

   PRODUCTION: For languages/dialects the browser can't cover, route to a
   cloud STT/TTS provider (Google Cloud STT/TTS, Azure, or Bhashini for
   Indian languages). Never claim voice support a device does not have —
   `speechSupports()` is used in the UI to enable/disable mic/audio honestly.
   ------------------------------------------------------------------------- */

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  maxAlternatives: number;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((e: { error?: string }) => void) | null;
  onend: (() => void) | null;
};

type SpeechRecognitionCtor = new () => SpeechRecognitionLike;

function getCtor(): SpeechRecognitionCtor | null {
  const w = window as unknown as {
    SpeechRecognition?: SpeechRecognitionCtor;
    webkitSpeechRecognition?: SpeechRecognitionCtor;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function sttSupported(): boolean {
  return getCtor() !== null;
}

export function ttsSupported(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

/* --------------------------------------------------------------------------
   Voice cache. Browsers load the installed synthesis voices ASYNCHRONOUSLY —
   getVoices() is frequently empty on the first synchronous call, which makes
   speak() silently fall back to a default (often English) voice even though a
   matching one exists. We prime the cache and refresh on `voiceschanged` so
   the correct per-language voice is available the moment the user taps Listen.
   -------------------------------------------------------------------------- */
let voiceCache: SpeechSynthesisVoice[] = [];

function refreshVoices(): SpeechSynthesisVoice[] {
  if (!ttsSupported()) return [];
  const v = window.speechSynthesis.getVoices();
  if (v && v.length) voiceCache = v;
  return voiceCache;
}

if (typeof window !== "undefined" && ttsSupported()) {
  refreshVoices();
  try {
    window.speechSynthesis.addEventListener("voiceschanged", refreshVoices);
  } catch {
    /* older engines expose onvoiceschanged only */
    window.speechSynthesis.onvoiceschanged = refreshVoices;
  }
}

function allVoices(): SpeechSynthesisVoice[] {
  if (!voiceCache.length) refreshVoices();
  return voiceCache;
}

function norm(s: string): string {
  return s.toLowerCase().replace(/_/g, "-");
}

/** Best voice for a BCP-47 tag: exact tag → same language in that region →
   same language anywhere. Returns null when the device truly has no match. */
export function pickVoice(langTag: string): SpeechSynthesisVoice | null {
  const voices = allVoices();
  if (!voices.length) return null;
  const want = norm(langTag);
  const wantLang = want.split("-")[0];
  const wantRegion = want.split("-")[1];
  const langOf = (v: SpeechSynthesisVoice) => norm(v.lang).split("-")[0];
  const regionOf = (v: SpeechSynthesisVoice) => norm(v.lang).split("-")[1];
  return (
    voices.find((v) => norm(v.lang) === want) ||
    (wantRegion
      ? voices.find((v) => langOf(v) === wantLang && regionOf(v) === wantRegion)
      : undefined) ||
    voices.find((v) => langOf(v) === wantLang) ||
    null
  );
}

/** True only when a real voice exists for the tag — used to keep audio honest. */
export function hasTtsVoice(langTag: string): boolean {
  return pickVoice(langTag) !== null;
}

/** Rough check whether a BCP-47 voice exists for the language prefix. */
export function speechSupports(langTag: string): { stt: boolean; tts: boolean } {
  return { stt: sttSupported(), tts: ttsSupported() && hasTtsVoice(langTag) };
}

export function speak(text: string, langTag = "en-IN"): void {
  if (!ttsSupported()) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = langTag;
    const voice = pickVoice(langTag);
    if (voice) u.voice = voice;
    u.rate = 0.95;
    window.speechSynthesis.speak(u);
  } catch {
    /* ignore */
  }
}

export function stopSpeaking(): void {
  if (ttsSupported()) window.speechSynthesis.cancel();
}

/** One-shot dictation. Returns recognized text via onResult. */
export function startDictation(
  langTag: string,
  handlers: {
    onResult: (text: string) => void;
    onError: (msg: string) => void;
    onEnd: () => void;
  },
): (() => void) | null {
  const Ctor = getCtor();
  if (!Ctor) {
    handlers.onError("unsupported");
    return null;
  }
  const rec = new Ctor();
  rec.lang = langTag;
  rec.interimResults = false;
  rec.continuous = false;
  rec.maxAlternatives = 1;
  rec.onresult = (e) => {
    const t = e.results?.[0]?.[0]?.transcript ?? "";
    handlers.onResult(t.trim());
  };
  rec.onerror = (e) => handlers.onError(e.error || "error");
  rec.onend = () => handlers.onEnd();
  try {
    rec.start();
  } catch {
    handlers.onError("start-failed");
  }
  return () => {
    try {
      rec.stop();
    } catch {
      /* ignore */
    }
  };
}
