/* ---------------------------------------------------------------------------
   Data-label localization.

   Enumerated values that live in the data files (facility types, specialties,
   services, opening hours, triage levels/symptoms, craving chips, withdrawal
   guides, helpline descriptions and sample stories) are keyed by their English
   source string and carry Hindi + Kannada here. `dl(code, english)` returns the
   reader's language, falling back to the English source so nothing renders
   blank. Facility names, phone numbers, addresses, spoken-language names and
   medical/technical terms (PHC/CHC, NICU, HPV, VIA, Pap, MCP, ANM/AWW, IMR,
   Tele-MANAS, NGO, 112) stay in their standard form.
   ------------------------------------------------------------------------- */

type Entry = { hi: string; kn: string };

const MAP: Record<string, Entry> = {
  // ---- Facility types ----
  "Government hospital": {
    hi: "सरकारी अस्पताल",
    kn: "ಸರ್ಕಾರಿ ಆಸ್ಪತ್ರೆ",
  },
  "Private hospital": {
    hi: "निजी अस्पताल",
    kn: "ಖಾಸಗಿ ಆಸ್ಪತ್ರೆ",
  },
  "Private clinic": {
    hi: "निजी क्लिनिक",
    kn: "ಖಾಸಗಿ ಕ್ಲಿನಿಕ್",
  },
  "Primary health centre (PHC)": {
    hi: "प्राथमिक स्वास्थ्य केंद्र (पीएचसी)",
    kn: "ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರ (ಪಿಎಚ್‌ಸಿ)",
  },
  "Community health centre (CHC)": {
    hi: "सामुदायिक स्वास्थ्य केंद्र (सीएचसी)",
    kn: "ಸಮುದಾಯ ಆರೋಗ್ಯ ಕೇಂದ್ರ (ಚಿಎಚ್‌ಸಿ)",
  },
  Counsellor: {
    hi: "काउंसलर",
    kn: "ಸಲಹೆಗಾರ",
  },
  "Rehabilitation centre": {
    hi: "पुनर्वास केंद्र",
    kn: "ಪುನರ್ವಸತಿ ಕೇಂದ್ರ",
  },
  NGO: {
    hi: "स्वयंसेवी संस्था (NGO)",
    kn: "ಸ್ವಯಂಸೇವಾ ಸಂಸ್ಥೆ (NGO)",
  },
  "Legal aid": {
    hi: "कानूनी सहायता",
    kn: "ಕಾನೂನು ಸಹಾಯ",
  },

  // ---- Specialties ----
  Gynecologist: {
    hi: "स्त्री रोग विशेषज्ञ",
    kn: "ಸ್ತ್ರೀರೋಗ ತಜ್ಞ",
  },
  Obstetrician: {
    hi: "प्रसूति विशेषज्ञ",
    kn: "ಪ್ರಸೂತಿ ತಜ್ಞ",
  },
  "General physician": {
    hi: "सामान्य चिकित्सक",
    kn: "ಸಾಮಾನ್ಯ ವೈದ್ಯ",
  },
  Pediatrician: {
    hi: "बाल रोग विशेषज्ञ",
    kn: "ಮಕ್ಕಳ ರೋಗ ತಜ್ಞ",
  },
  "Mental health professional": {
    hi: "मानसिक स्वास्थ्य पेशेवर",
    kn: "ಮಾನಸಿಕ ಆರೋಗ್ಯ ತಜ್ಞ",
  },
  "Addiction recovery": {
    hi: "नशा मुक्ति पुनर्प्राप्ति",
    kn: "ವ್ಯಸನ ಮುಕ್ತಿ",
  },
  General: {
    hi: "सामान्य",
    kn: "ಸಾಮಾನ್ಯ",
  },

  // ---- Services ----
  "Antenatal care": {
    hi: "गर्पूर्व देखभाल",
    kn: "ಗರ್ಭಪೂರ್ವ ಆರೈಕೆ",
  },
  Delivery: {
    hi: "प्रसव/डिलीवरी",
    kn: "ಪ್ರಸವ",
  },
  "Family planning": {
    hi: "परिवार नियोजन",
    kn: "ಕುಟುಂಬ ಯೋಜನೆ",
  },
  "Emergency care": {
    hi: "आपातकालीन देखभाल",
    kn: "ತುರ್ತು ಆರೈಕೆ",
  },
  Emergency: {
    hi: "आपातकाल",
    kn: "ತುರ್ತು",
  },
  Consultation: {
    hi: "परामर्श",
    kn: "ಸಮಾಲೋಚನೆ",
  },
  Ultrasound: {
    hi: "अल्ट्रासाउंड",
    kn: "ಅಲ್ಟ್ರಾಸೌಂಡ್",
  },
  Screening: {
    hi: "जांच/स्क्रीनिंग",
    kn: "ಪರೀಕ್ಷೆ (ಸ್ಕ್ರೀನಿಂಗ್)",
  },
  "Check-ups": {
    hi: "जाँचें",
    kn: "ಪರೀಕ್ಷೆಗಳು",
  },
  Vaccination: {
    hi: "टीकाकरण",
    kn: "ಲಸಿಕೆ",
  },
  "Anemia screening": {
    hi: "एनीमिया जांच",
    kn: "ರಕ್ತಹೀನತೆ ಪರೀಕ್ಷೆ",
  },
  Counselling: {
    hi: "काउंसलिंग",
    kn: "ಸಲಹೆ",
  },
  "Crisis support": {
    hi: "संकट सहायता",
    kn: "ಬಿಕ್ಕಟ್ಟಿನ ಬೆಂಬಲ",
  },
  "Family therapy": {
    hi: "पारिवारिक थेरेपी",
    kn: "ಕೌಟುಂಬಿಕ ಚಿಕಿತ್ಸೆ",
  },
  "De-addiction": {
    hi: "नशा मुक्ति",
    kn: "ವ್ಯಸನ ನಿವಾರಣೆ",
  },
  "Vocational training": {
    hi: "व्यावसायिक प्रशिक्षण",
    kn: "ವೃತ್ತಿ ಪರಿಶೀಲನೆ ತರಬೇತಿ",
  },
  "Women-only ward": {
    hi: "केवल महिला वार्ड",
    kn: "ಮಹಿಳೆಯರಿಗೆ ಮಾತ್ರ ವಾರ್ಡ್",
  },
  "Child vaccination": {
    hi: "शिशु टीकाकरण",
    kn: "ಮಗುವಿನ ಲಸಿಕೆ",
  },
  "Legal referral": {
    hi: "कानूनी रेफरल",
    kn: "ಕಾನೂನು ರೆಫರಲ್",
  },
  "Shelter referral": {
    hi: "आश्रय रेफरल",
    kn: "ಆಶ್ರಯ ರೆಫರಲ್",
  },
  Helpline: {
    hi: "हेल्पलाइन",
    kn: "ಹೆಲ್ಪ್‌ಲೈನ್",
  },
  NICU: {
    hi: "NICU (नवजात गहन देखभाल)",
    kn: "NICU (ನವಜಾತ ನಿಗದಿತ ಆರೈಕೆ)",
  },
  "Gynecological surgery": {
    hi: "स्त्री रोग शल्यक्रिया",
    kn: "ಸ್ತ್ರೀರೋಗ ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ",
  },

  // ---- Opening hours ----
  "Open 24 hours (sample)": {
    hi: "24 घंटे खुला (नमूना)",
    kn: "24 ಗಂಟೆ ತೆರೆದಿರುತ್ತದೆ (ಮಾದರಿ)",
  },
  "Mon–Sat, 9:00–18:00 (sample)": {
    hi: "सोम–शनि, 9:00–18:00 (नमूना)",
    kn: "ಸೋಮ–ಶನಿ, 9:00–18:00 (ಮಾದರಿ)",
  },
  "Mon–Fri, 8:00–16:00 (sample)": {
    hi: "सोम–शुक्र, 8:00–16:00 (नमूना)",
    kn: "ಸೋಮ–ಶುಕ್ರ, 8:00–16:00 (ಮಾದರಿ)",
  },
  "Mon–Sat, 8:00–20:00 (sample)": {
    hi: "सोम–शनि, 8:00–20:00 (नमूना)",
    kn: "ಸೋಮ–ಶನಿ, 8:00–20:00 (ಮಾದರಿ)",
  },
  "Mon–Fri, 10:00–18:00 (sample)": {
    hi: "सोम–शुक्र, 10:00–18:00 (नमूना)",
    kn: "ಸೋಮ–ಶುಕ್ರ, 10:00–18:00 (ಮಾದರಿ)",
  },
  "By appointment (sample)": {
    hi: "अपॉइंटमेंट पर (नमूना)",
    kn: "ಅಪಾಯಿಂಟ್‌ಮೆಂಟ್ ಮೇರೆಗೆ (ಮಾದರಿ)",
  },
  "Residential (sample)": {
    hi: "आवासीय (नमूना)",
    kn: "ವಾಸದೊಂದಿಗೆ (ಮಾದರಿ)",
  },

  // ---- Fees ----
  "Free (confirmed)": {
    hi: "निःशुल्क (सत्यापित)",
    kn: "ಉಚಿತ (ದೃಢೀಕೃತ)",
  },
  "Fee not verified": {
    hi: "फ़ीस सत्यापित नहीं",
    kn: "ಶುಲ್ಕ ಪರಿಶೀಲಿಸಿಲ್ಲ",
  },
  "per visit": {
    hi: "प्रति मुलाक़ात",
    kn: "ಪ್ರತಿ ಭೇಟಿ",
  },

  // ---- Triage symptoms ----
  "Blurry vision": {
    hi: "धुंधला दिखना",
    kn: "ಮಂಜುಗಾಣಿಕೆ",
  },
  "Joint pain": {
    hi: "जोड़ों में दर्द",
    kn: "ಕೀಲು ನೋವು",
  },
  Dizziness: {
    hi: "चक्कर",
    kn: "ತಲೆಸುತ್ತು",
  },
  Fever: {
    hi: "बुखार",
    kn: "ಜ್ವರ",
  },
  Weakness: {
    hi: "कमज़ोरी",
    kn: "ದೌರ್ಬಲ್ಯ",
  },
  Headache: {
    hi: "सिरदर्द",
    kn: "ತಲೆನೋವು",
  },
  "Breathing difficulty": {
    hi: "सांस लेने में कठिनाई",
    kn: "ಉಸಿರಾಟದ ತೊಂದರೆ",
  },
  "Chest pain": {
    hi: "छाती में दर्द",
    kn: "ಎದೆಯ ನೋವು",
  },
  "Bleeding that won't stop": {
    hi: "रुकने नहीं वाला रक्तस्राव",
    kn: "ನಿಲ್ಲದ ರಕ್ತಸ್ರಾವ",
  },
  "Fainted / not responding": {
    hi: "बेहोश / प्रतिक्रिया नहीं",
    kn: "ಮೂರ್ಛೆ / ಸ್ಪಂದಿಸದಿರುವುದು",
  },
  Other: {
    hi: "अन्य",
    kn: "ಇತರೆ",
  },

  // ---- Period symptom chips ----
  Cramps: {
    hi: "पेट में मरोड़",
    kn: "ಹೊಟ್ಟೆಯಲ್ಲಿ ಸೆಳೆತ",
  },
  Mood: {
    hi: "मूड में बदलाव",
    kn: "ಮನೋಸ್ಥಿತಿಯ ಬದಲಾವಣೆ",
  },
  Fatigue: {
    hi: "थकान",
    kn: "ಆಯಾಸ",
  },
  None: {
    hi: "कोई नहीं",
    kn: "ಯಾವುದೂ ಇಲ್ಲ",
  },

  // ---- Triage levels (title — body) ----
  "GREEN — General Self-Care": {
    hi: "हरा — सामान्य घरेलू देखभाल",
    kn: "ಹಸಿರು — ಸಾಮಾನ್ಯ ಸ್ವ-ಆರೈಕೆ",
  },
  "Rest, fluids and simple home care are usually fine. Watch for any change or worsening.": {
    hi: "आराम, तरल पदार्थ और सरल घरेलू देखभाल आमतौर पर ठीक रहती है। किसी भी बदलाव या बिगड़ने पर नज़र रखें।",
    kn: "ವಿಶ್ರಾಂತಿ, ದ್ರವ ಮತ್ತು ಸರಳ ನೆಲೆಯ ಆರೈಕೆ ಸಾಮಾನ್ಯವಾಗಿ ಸಾಕು. ಯಾವುದೇ ಬದಲಾವಣೆ ಅಥವಾ ಹೆಚ್ಚುವ ಸ್ಥಿತಿಯನ್ನು ಗಮನಿಸಿ.",
  },
  "YELLOW — Contact a Doctor or Health Worker": {
    hi: "पीला — डॉक्टर या स्वास्थ्य कर्मी से मिलें",
    kn: "ಹಳದಿ — ವೈದ್ಯರು ಅಥವಾ ಆರೋಗ್ಯ ಕಾರ್ಯಕರ್ತರನ್ನು ಸಂಪರ್ಕಿಸಿ",
  },
  "Please arrange a timely check-up with a doctor, ANM or health worker for these symptoms.": {
    hi: "इन लक्षणों के लिए कृपया डॉक्टर, ANM या स्वास्थ्य कर्मी से समय पर जाँच कराएं।",
    kn: "ಈ ಲಕ್ಷಣಗಳಿಗಾಗಿ ದಯವಿಟ್ಟು ವೈದ್ಯರು, ANM ಅಥವಾ ಆರೋಗ್ಯ ಕಾರ್ಯಕರ್ತರಿಂದ ಕಾಲೋಚಿತ ಪರೀಕ್ಷೆ ಮಾಡಿಸಿ.",
  },
  "RED — Seek Emergency Care Now": {
    hi: "लाल — तुरंत आपात देखभाल लें",
    kn: "ಕೆಂಪು — ಈಗಲೇ ತುರ್ತು ಆರೈಕೆ ಪಡೆಯಿರಿ",
  },
  "This may be an emergency. Get help immediately — do not wait.": {
    hi: "यह आपातकाल हो सकता है। तुरंत सहायता लें — इंतज़ार न करें।",
    kn: "ಇದು ತುರ್ತು ಆಗಿರಬಹುದು. ತಕ್ಷಣ ಸಹಾಯ ಪಡೆಯಿರಿ — ಕಾಯಬೇಡಿ.",
  },

  // ---- Craving chips ----
  Cravings: {
    hi: "लालसा",
    kn: "ಆಸೆಗಳು",
  },
  Anxiety: {
    hi: "चिंता",
    kn: "ಆತಂಕ",
  },
  "Body pain": {
    hi: "शरीर में दर्द",
    kn: "ದೇಹ ನೋವು",
  },
  "Sleep problems": {
    hi: "नींद की समस्याएं",
    kn: "ನಿದ್ದೆ ಸಮಸ್ಯೆಗಳು",
  },
  "Mood changes": {
    hi: "मूड में बदलाव",
    kn: "ಮನೋಸ್ಥಿತಿ ಬದಲಾವಣೆ",
  },
  "Other symptoms": {
    hi: "अन्य लक्षण",
    kn: "ಇತರೆ ಲಕ್ಷಣಗಳು",
  },

  // ---- Withdrawal guides (title + body) ----
  Hydration: {
    hi: "जलपान",
    kn: "ನೀರಿನಂಶ",
  },
  "Sip safe water through the day, especially if you sweat a lot or feel weak.": {
    hi: "दिनभर सुरक्षित पानी घुंट-घुंटकर पिएं, ख़ासकर यदि आपको ज़्यादा पसीना आ रहा हो या कमज़ोरी लगे।",
    kn: "ದಿನಪೂರ್ತಿ ಸುರಕ್ಷಿತ ನೀರನ್ನು ಸಣ್ಣ ಸಣ್ಣ ಕುಡಿತಗಳಲ್ಲಿ ಕುಡಿಯಿರಿ, ವಿಶೇಷವಾಗಿ ಹೆಚ್ಚು ಬೆವರಿದರೆ ಅಥವಾ ದೌರ್ಬಲ್ಯವಿದ್ದರೆ.",
  },
  Nutrition: {
    hi: "पोषण",
    kn: "ಪೋಷಣೆ",
  },
  "Small regular meals with local protein, greens and fruit steady your energy and mood.": {
    hi: "स्थानीय प्रोटीन, हरी सब्ज़ियाँ और फल वाला नियमित छोटा भोजन आपकी ऊर्जा और मूड स्थिर रखता है।",
    kn: "ಸ್ಥಳೀಯ ಪ್ರೋಟೀನ್, ಹಸಿರು ಮತ್ತು ಹಣ್ಣುಗಳೊಂದಿಗೆ ನಿಯಮಿತ ಸಣ್ಣ ಊಟಗಳು ನಿಮ್ಮ ಶಕ್ತಿ ಮತ್ತು ಮನಸ್ಥಿತಿಯನ್ನು ಸ್ಥಿರವಾಗಿಡುತ್ತವೆ.",
  },
  "Emotional coping": {
    hi: "भावनात्मक सामना",
    kn: "ಭಾವನಾತ್ಮಕ ನಿರ್ವಹಣೆ",
  },
  "Slow breathing, a short walk, and talking to one trusted person reduce the urge to use.": {
    hi: "धीमी सांस, थोड़ी सैर, और भरोसे के एक व्यक्ति से बात करने से उपयोग की इच्छा कम होती है।",
    kn: "ನಿಧಾನ ಉಸಿರಾಟ, ಸಂಕ್ಷಿಪ್ತ ನಡಿಗೆ, ಮತ್ತು ನಂಬಿಕೆಯೊಬ್ಬರೊಂದಿಗೆ ಮಾತನಾಡುವುದು ಬಳಸುವ ಕೋರಿಕೆಯನ್ನು ಕಮ್ಮಿ ಮಾಡುತ್ತದೆ.",
  },
  "When to seek medical help": {
    hi: "कब चिकित्सा सहायता लें",
    kn: "ಯಾವಾಗ ವೈದ್ಯಕೀಯ ಸಹಾಯ ಪಡೆಯಬೇಕು",
  },
  "Some withdrawal needs a doctor.": {
    hi: "कुछ नशा-छुड़ाव (डिटॉक्स) में डॉक्टर की ज़रूरत होती है।",
    kn: "ಕೆಲವು ಸಂದರ್ಭಗಳಲ್ಲಿ ವೈದ್ಯರ ಸಹಾಯ ಬೇಕಾಗಬಹುದು.",
  },
  "Do not attempt unsupervised detox. Withdrawal from alcohol and benzodiazepines (some sleeping/anxiety medicines) can be life-threatening and may need medically supervised treatment. Seek a qualified facility or call 112 / 104.": {
    hi: "बिगरख देखरेख में डिटॉक्स न आज़माएं। शराब और बेंजोडायज़ेपाइन (कुछ नींद/चिंता की दवाइयों) के नशा-छुड़ाव जानलेवा हो सकता है और चिकित्सकीय निगरानी वाले इलाज की ज़रूरत पड़ सकती है। अर्ह सुविधा से मिलें या 112 / 104 पर कॉल करें।",
    kn: "ನಿಗದಿತ ಮೇಲ್ವಿಚಾರಣೆ ಇಲ್ಲದೆ ಡಿಟಾಕ್ಸ್ ಪ್ರಯತ್ನಿಸಬೇಡಿ. ಆಲ್ಕೋಹಾಲ್ ಮತ್ತು ಬೆನ್ಜೋಡಯಾಜೆಪೈನ್ (ಕೆಲವು ನಿದ್ದೆ/ಆತಂಕ ಔಷಧಗಳು) ವಿಶ್ರಾಂತಿ ಪ್ರಾಣಘಾತಕ ಆಗಬಹುದು ಮತ್ತು ವೈದ್ಯಕೀಯ ಮೇಲ್ವಿಚಾರಿತ ಚಿಕಿತ್ಸೆ ಬೇಕಾಗಬಹುದು. ಅರ್ಹ ಸೌಲಭ್ಯವನ್ನು ಭೇಟಿಯಾಗಿ ಅಥವಾ 112 / 104 ಕರೆ ಮಾಡಿ.",
  },

  // ---- Sample stories ----
  "Sample — peri-urban Maharashtra": {
    hi: "नमूना — उपनगरीय महाराष्ट्र",
    kn: "ಮಾದರಿ — ನಗರಪ್ರದೇಶ ಮಹಾರಾಷ್ಟ್ರ",
  },
  "I started by telling one friend. The journal helped me see green days grow. Relapsing did not erase my progress — I began again.": {
    hi: "मैंने एक मित्र को बताकर शुरुआत की। जर्नल ने मुझे हरे दिन बढ़ते देखने में मदद की। दोबारा फिसलने से मेरी प्रगति मिटी नहीं — मैंने फिर शुरू किया।",
    kn: "ಒಬ್ಬ ಸ್ನೇಹಿತರನ್ನು ತಿಳಿಸುವ ಮೂಲಕ ನಾನು ಪ್ರಾರಂಭಿಸಿದೆ. ದಿನಚರಿಯು ಹಸಿರು ದಿನಗಳು ಹೆಚ್ಚುವುದನ್ನು ಕಾಣಲು ಸಹಾಯ ಮಾಡಿತು. ಮತ್ತೆ ಜಾರಿದರೂ ನನ್ನ ಪ್ರಗತಿ ಅಳಿಸಲಿಲ್ಲ — ನಾನು ಪುನಃ ಪ್ರಾರಂಭಿಸಿದೆ.",
  },
  "Sample — rural Telangana": {
    hi: "नमूना — ग्रामीण तेलंगाना",
    kn: "ಮಾದರಿ — ಗ್ರಾಮೀಣ ತೆಲಂಗಾಣ",
  },
  "The savings number made it real. I used that money for my daughter's books. Recovery gave our home some calm.": {
    hi: "बचत की राशि इसे अक्षरशः महसूस कराती है। मैंने वह पैसा अपनी बेटी की किताबों पर लगाया। रिकवरी ने हमारे घर को कुछ शांति दी।",
    kn: "ಉಳಿತಾಯದ ಮೊತ್ತವು ಇದನ್ನು ನಿಜವಾಗಿಸಿತು. ಆ ಹಣವನ್ನು ನಾನು ನನ್ನ ಮಗಳ ಪುಸ್ತಕಗಳಿಗೆ ಬಳಸಿದೆ. ಮರುಗಂಟು ನಮ್ಮ ಮನೆಗೆ ಸ್ವಲ್ಪ ಶಾಂತಿ ಕೊಟ್ಟಿತು.",
  },

  // ---- Helpline names + descriptions + notes ----
  "Emergency (ERSS)": {
    hi: "आपातकाल (ERSS)",
    kn: "ತುರ್ತು (ERSS)",
  },
  "Police, fire and medical emergency — all of India.": {
    hi: "पुलिस, अग्नि और चिकित्सा आपातकाल — पूरा भारत।",
    kn: "ಪೊಲೀಸ್, ಬೆಂಕಿ ಮತ್ತು ವೈದ್ಯಕೀಯ ತುರ್ತು — ಇಡೀ ಭಾರತ.",
  },
  "Women Helpline": {
    hi: "महिला हेल्पलाइन",
    kn: "ಮಹಿಳಾ ಹೆಲ್ಪ್‌ಲೈನ್",
  },
  "Helpline for women in distress.": {
    hi: "मुसीबत में थी महिलाओं के लिए हेल्पलाइन।",
    kn: "ಸಂಕಟದಲ್ಲಿರುವ ಮಹಿಳೆಯರಿಗಾಗಿ ಹೆಲ್ಪ್‌ಲೈನ್.",
  },
  "Child Helpline": {
    hi: "बाल हेल्पलाइन",
    kn: "ಮಕ್ಕಳ ಹೆಲ್ಪ್‌ಲೈನ್",
  },
  "For child-related emergencies and protection.": {
    hi: "बच्चों से जुड़े आपातकाल और संरक्षण के लिए।",
    kn: "ಮಕ್ಕಳಿಗೆ ಸಂಬಂಧಿಸಿದ ತುರ್ತು ಮತ್ತು ಸಂರಕ್ಷಣೆಗಾಗಿ.",
  },
  "Health Helpline": {
    hi: "स्वास्थ्य हेल्पलाइन",
    kn: "ಆರೋಗ್ಯ ಹೆಲ್ಪ್‌ಲೈನ್",
  },
  "Free medical advice and health information.": {
    hi: "मुफ़्त चिकित्सा सलाह और स्वास्थ्य जानकारी।",
    kn: "ಉಚಿತ ವೈದ್ಯಕೀಯ ಸಲಹೆ ಮತ್ತು ಆರೋಗ್ಯ ಮಾಹಿತಿ.",
  },
  "Tele-MANAS (Mental Health)": {
    hi: "Tele-MANAS (मानसिक स्वास्थ्य)",
    kn: "Tele-MANAS (ಮಾನಸಿಕ ಆರೋಗ್ಯ)",
  },
  "Free, confidential mental-health support, 24×7, many languages.": {
    hi: "मुफ़्त, गोपनीय मानसिक स्वास्थ्य सहायता, 24×7, अनेक भाषाओं में।",
    kn: "ಉಚಿತ, ಗೋಪನೀಯ ಮಾನಸಿಕ ಆರೋಗ್ಯ ಬೆಂಬಲ, 24×7, ಅನೇಕ ಭಾಷೆಗಳಲ್ಲಿ.",
  },
  "iCall Psychosocial Helpline": {
    hi: "iCall मनोसामाजिक हेल्पलाइन",
    kn: "iCall ಮನೋಸಾಮಾಜಿಕ ಹೆಲ್ಪ್‌ಲೈನ್",
  },
  "Email/phone counselling support (Mon–Sat).": {
    hi: "ईमेल/फ़ोन काउंसलिंग सहायता (सोम–शनि)।",
    kn: "ಇಮೇಲ್/ಫೋನ್ ಸಲಹೆ ಬೆಂಬಲ (ಸೋಮ–ಶನಿ).",
  },
  "Umeeda / Women Helpline": {
    hi: "उमीदा / महिला हेल्पलाइन",
    kn: "ಉಮೀದಾ / ಮಹಿಳಾ ಹೆಲ್ಪ್‌ಲೈನ್",
  },
  "Women in difficult circumstances — assistance and referral.": {
    hi: "कठिन परिस्थितियों में महिलाएं — सहायता और रेफरल।",
    kn: "ಕಠಿಣ ಪರಿಸ್ಥಿತಿಯ ಮಹಿಳೆಯರು — ಸಹಾಯ ಮತ್ತು ರೆಫರಲ್.",
  },
  "State-level availability may vary.": {
    hi: "राज्य-स्तर की उपलब्धता भिन्न हो सकती है।",
    kn: "ರಾಜ್ಯಮಟ್ಟದ ಲಭ್ಯತೆ ಬದಲಾಗಬಹುದು.",
  },
  "Availability varies by state.": {
    hi: "उपलब्धता राज्य अनुसार भिन्न होती है।",
    kn: "ಲಭ್ಯತೆ ರಾಜ್ಯಾನುಸಾರ ಬದಲಾಗುತ್ತದೆ.",
  },

  // ---- Emergency red-flag labels ----
  "Severe pregnancy / heavy bleeding": {
    hi: "गर्भावस्था में गंभीर / तेज़ रक्तस्राव",
    kn: "ಗರ್ಭಧಾರಣೆಯಲ್ಲಿ ಗಂಭೀರ / ಹೆಚ್ಚು ರಕ್ತಸ್ರಾವ",
  },
  "Sudden chest pain": {
    hi: "अचानक सीने में दर्द",
    kn: "ಸಡನೇ ಎದೆಯ ನೋವು",
  },
  "Severe breathing difficulty": {
    hi: "गंभीर सांस लेने में कठिनाई",
    kn: "ಗಂಭೀರ ಉಸಿರಾಟದ ತೊಂದರೆ",
  },
  "Loss of consciousness": {
    hi: "बेहोशी / होश खोना",
    kn: "ಪ್ರಜ್ಞೆ ಕಳೆದುಕೊಳ್ಳುವುದು",
  },
  "Stroke-like symptoms": {
    hi: "स्ट्रोक जैसे लक्षण",
    kn: "ಮಾರವಾತದ ಲಕ್ಷಣಗಳು",
  },
  "Severe / uncontrolled bleeding": {
    hi: "गंभीर / अनियंत्रित रक्तस्राव",
    kn: "ಗಂಭೀರ / ನಿಯಂತ್ರಣವಿಲ್ಲದ ರಕ್ತಸ್ರಾವ",
  },
  "Suicidal thoughts / self-harm": {
    hi: "आत्महत्या के विचार / आत्म-क्षति",
    kn: "ಆತ್ಮಹತ್ಯಾ ಯೋಚನೆಗಳು / ಆತ್ಮಹಿಂಸೆ",
  },
  "Seizure / eclampsia": {
    hi: "मिर्गी जैसा दौरा / इक्लाम्प्सिया",
    kn: "ಸವೆಯಾಟ / eclampsia",
  },
};

/** Localize an enumerated data string. Falls back to the English source. */
export function dl(code: string, english: string): string {
  const entry = MAP[english];
  if (!entry) return english;
  return code === "hi" ? entry.hi : code === "kn" ? entry.kn : english;
}
