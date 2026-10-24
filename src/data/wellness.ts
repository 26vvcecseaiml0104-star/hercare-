/* ---------------------------------------------------------------------------
   Daily Wellness Journal content (recovery support).

   Anonymous stories are clearly-labelled SAMPLES for demonstration. In
   production they must be real, consented, anonymized and moderated — never
   fabricated. Voices for affirmations use licensed/consented recordings; the
   browser TTS here is only a development convenience.
   ------------------------------------------------------------------------- */

export const CRAVING_OPTIONS = [
  { id: "cravings", emoji: "🔥", label: "Cravings" },
  { id: "anxiety", emoji: "😟", label: "Anxiety" },
  { id: "headache", emoji: "🤕", label: "Headache" },
  { id: "pain", emoji: "🦴", label: "Body pain" },
  { id: "sleep", emoji: "🌙", label: "Sleep problems" },
  { id: "mood", emoji: "🎭", label: "Mood changes" },
  { id: "other", emoji: "➕", label: "Other symptoms" },
];

export const AFFIRMATIONS = [
  { en: "One day at a time. I am enough.", hi: "एक-एक दिन। मैं काफ़ी हूँ।", kn: "ಒಂದೊಂದು ದಿನ. ನಾನು ಸಾಕು." },
  { en: "I deserve care, rest and kindness.", hi: "मुझे देखभाल, आराम और दयालुता के हक़दार हूँ।", kn: "ನನಗೆ ಆರೈಕೆ, ವಿಶ್ರಾಂತಿ ಮತ್ತು ದಯೆ ಸಿಗಬೇಕು." },
  { en: "Asking for help is brave.", hi: "मदद माँगना बहादुरी है।", kn: "ಸಹಾಯ ಕೇಳುವುದು ಧೈರ್ಯ." },
  { en: "A hard day is not the end of my story.", hi: "कठिन दिन मेरी कहानी का अंत नहीं है।", kn: "ಕಠಿಣ ದಿನ ನನ್ನ ಕಥೆಯ ಕೊನೆ ಅಲ್ಲ." },
  { en: "I am rebuilding, one small step at a time.", hi: "मैं छोटे-छोटे कदमों से फिर बन रही हूँ।", kn: "ಸಣ್ಣ ಸಣ್ಣ ಹೆಜ್ಜೆಗಳಿಂದ ನಾನು ಮತ್ತೆ ಬಲಗೊಳ್ಳುತ್ತಿದ್ದೇನೆ." },
];

export type Guide = { emoji: string; title: string; body: string };

export const WITHDRAWAL_GUIDES: Guide[] = [
  { emoji: "💧", title: "Hydration", body: "Sip safe water through the day, especially if you sweat a lot or feel weak." },
  { emoji: "🍲", title: "Nutrition", body: "Small regular meals with local protein, greens and fruit steady your energy and mood." },
  { emoji: "🫆", title: "Emotional coping", body: "Slow breathing, a short walk, and talking to one trusted person reduce the urge to use." },
  { emoji: "🏥", title: "When to seek medical help", body: "Some withdrawal needs a doctor." },
];

export const WITHDRAWAL_SAFETY_WARNING =
  "Do not attempt unsupervised detox. Withdrawal from alcohol and benzodiazepines (some sleeping/anxiety medicines) can be life-threatening and may need medically supervised treatment. Seek a qualified facility or call 112 / 104.";

export type Story = { initials: string; age: number; place: string; text: string };

export const SAMPLE_STORIES: Story[] = [
  {
    initials: "R.",
    age: 34,
    place: "Sample — peri-urban Maharashtra",
    text: "I started by telling one friend. The journal helped me see green days grow. Relapsing did not erase my progress — I began again.",
  },
  {
    initials: "S.",
    age: 41,
    place: "Sample — rural Telangana",
    text: "The savings number made it real. I used that money for my daughter's books. Recovery gave our home some calm.",
  },
];
