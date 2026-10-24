/* Supported interface languages for this deployment: English and Kannada only.
   native: name written in its own script.
   locale: BCP-47 tag used for speech + html lang/dir.
   voice: HONEST capability flags — do not overstate. `stt`/`tts` reflect
   typical browser/Bhashini coverage; the UI disables mic/audio when a device
   reports no support, and these flags surface that expectation to users. */

export type Language = {
  code: string;
  english: string;
  native: string;
  locale: string;
  rtl?: boolean;
  voice: { stt: boolean; tts: boolean };
};

export const LANGUAGES: Language[] = [
  { code: "en", english: "English", native: "English", locale: "en-IN", voice: { stt: true, tts: true } },
  { code: "kn", english: "Kannada", native: "ಕನ್ನಡ (Kannada)", locale: "kn-IN", voice: { stt: true, tts: true } },
];

export const DEFAULT_LANGUAGE_CODE = "en";

/* Clamp any stored/unknown code to a supported option so removed languages
   (e.g. an old "ta" left in localStorage) never render an unavailable UI. */
export function resolveLanguageCode(code: string | null | undefined): string {
  return code && LANGUAGES.some((l) => l.code === code) ? code : DEFAULT_LANGUAGE_CODE;
}

export function findLanguage(code: string): Language {
  return (
    LANGUAGES.find((l) => l.code === code) ??
    LANGUAGES.find((l) => l.code === DEFAULT_LANGUAGE_CODE) ??
    LANGUAGES[0]
  );
}
