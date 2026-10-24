/* Conservative triage logic for the symptom questionnaire (Elder / Whole
   Health). It NEVER diagnoses and NEVER lets a low-risk result override a
   possible emergency symptom. Colour is never the only signal — text always
   accompanies it, and any red-flag symptom forces the RED path. */

export type TriageLevel = "green" | "yellow" | "red";

export const SYMPTOMS: { id: string; emoji: string; label: string }[] = [
  { id: "vision", emoji: "👀", label: "Blurry vision" },
  { id: "joint", emoji: "🦵", label: "Joint pain" },
  { id: "dizzy", emoji: "😵", label: "Dizziness" },
  { id: "fever", emoji: "🌡️", label: "Fever" },
  { id: "weak", emoji: "🥱", label: "Weakness" },
  { id: "headache", emoji: "🤕", label: "Headache" },
  { id: "breath", emoji: "🫁", label: "Breathing difficulty" },
  { id: "chest", emoji: "❤️", label: "Chest pain" },
  { id: "bleed", emoji: "🩸", label: "Bleeding that won't stop" },
  { id: "fainting", emoji: "😴", label: "Fainted / not responding" },
  { id: "other", emoji: "➕", label: "Other" },
];

// Emergency symptoms always take priority.
const RED = new Set(["breath", "chest", "bleed", "fainting"]);
// Symptoms that warrant a timely professional assessment.
const YELLOW = new Set(["fever", "dizzy", "vision", "weak", "headache"]);

export function triage(selected: string[]): { level: TriageLevel; reasons: string[] } {
  if (selected.some((s) => RED.has(s))) return { level: "red", reasons: ["A possible emergency symptom is selected"] };
  const yellows = selected.filter((s) => YELLOW.has(s));
  if (yellows.length >= 2) return { level: "yellow", reasons: ["Several symptoms together"] };
  if (yellows.length === 1) return { level: "yellow", reasons: ["A symptom to check with a health worker"] };
  if (selected.some((s) => s === "joint")) return { level: "green", reasons: ["Likely self-care, watch for changes"] };
  if (selected.length === 0) return { level: "green", reasons: [] };
  return { level: "green", reasons: ["General self-care guidance"] };
}
