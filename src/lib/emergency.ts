/* ---------------------------------------------------------------------------
   Emergency red-flag detection.

   These are conservative, keyword-based clinical rules that run *alongside*
   the AI assistant — the AI must never be the only safeguard. When any
   red-flag pattern matches, the app immediately surfaces CALL EMERGENCY NOW
   and simple safety instructions, and stops routine advice.

   The list below mirrors the red flags named in the HerCare+ spec. All
   wording is for guidance only and does not constitute a diagnosis.
   ------------------------------------------------------------------------- */

export type RedFlag = { pattern: RegExp; label: string };

export const RED_FLAGS: RedFlag[] = [
  { pattern: /severe (pregnancy )?(bleed|hemorrhag)|heavy bleeding|soaking pads|bleeding in pregnancy/i, label: "Severe pregnancy / heavy bleeding" },
  { pattern: /chest pain|heart attack/i, label: "Sudden chest pain" },
  { pattern: /can'?t breathe|cant breathe|severe (breathing|breath) (difficulty|trouble)|not breathing|gasping/i, label: "Severe breathing difficulty" },
  { pattern: /faint(ing|ed)?|unconscious|lost consciousness|passed out|not responding/i, label: "Loss of consciousness" },
  { pattern: /stroke|face droop|slurred speech|weakness on one side|numb on one side/i, label: "Stroke-like symptoms" },
  { pattern: /uncontrollable bleeding|spurting blood|deep wound|severe bleeding/i, label: "Severe / uncontrolled bleeding" },
  { pattern: /suicide|kill myself|end my life|want to die|self.harm/i, label: "Suicidal thoughts / self-harm" },
  { pattern: /convulsion|seizure|fit(s)?\b|eclampt|very high bp in pregnancy/i, label: "Seizure / eclampsia" },
];

export type RedFlagHit = { matched: boolean; flags: string[] };

export function detectRedFlag(text: string): RedFlagHit {
  const flags = RED_FLAGS.filter((f) => f.pattern.test(text)).map((f) => f.label);
  return { matched: flags.length > 0, flags };
}

/** India emergency numbers. 112 is the pan-India Emergency Response Support System. */
export const EMERGENCY_NUMBER = "112";
