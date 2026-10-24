/* ---------------------------------------------------------------------------
   National helplines (India). These are publicly published, well-known numbers
   and are safe to display. State-level availability can vary — the notes say so.
   ------------------------------------------------------------------------- */

export type Helpline = {
  number: string;
  name: string;
  description: string;
  kind: "emergency" | "support" | "health";
  note?: string;
};

export const HELPLINES: Helpline[] = [
  { number: "112", name: "Emergency (ERSS)", description: "Police, fire and medical emergency — all of India.", kind: "emergency" },
  { number: "181", name: "Women Helpline", description: "Helpline for women in distress.", kind: "emergency", note: "State-level availability may vary." },
  { number: "1098", name: "Child Helpline", description: "For child-related emergencies and protection.", kind: "emergency" },
  { number: "104", name: "Health Helpline", description: "Free medical advice and health information.", kind: "health" },
  { number: "14416", name: "Tele-MANAS (Mental Health)", description: "Free, confidential mental-health support, 24×7, many languages.", kind: "support" },
  { number: "9152987821", name: "iCall Psychosocial Helpline", description: "Email/phone counselling support (Mon–Sat).", kind: "support" },
  { number: "1091", name: "Umeeda / Women Helpline", description: "Women in difficult circumstances — assistance and referral.", kind: "support", note: "Availability varies by state." },
];

export const EMERGENCY = HELPLINES.filter((h) => h.kind === "emergency");
