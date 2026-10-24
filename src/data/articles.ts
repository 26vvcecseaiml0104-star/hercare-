/* ---------------------------------------------------------------------------
   Health-education articles.

   Content is written for plain-language readability and reviewed against
   reputable public-health guidance (WHO, MoHFW / NHM, ICMR). Each article
   carries a full Hindi (`hi`) and Kannada (`kn`) body so selecting a language
   localizes the entire lesson — title, summary, practical steps and the
   "seek care" guidance. `localizedArticle` returns the reader's language body
   (falling back to the English source). Medical terms, programme names and
   phone numbers stay in their standard form.

   Every article: simple explanation, practical safe advice, and "see a health
   professional" guidance. Illustrations use neutral emoji/placeholder icons.
   ------------------------------------------------------------------------- */

export type Category = "lifecycle" | "preventive" | "wellness" | "myth";

export type LocalBody = {
  title: string;
  summary: string;
  points: string[];
  seekCare: string;
};

export type Article = {
  id: string;
  category: Category;
  emoji: string;
  title: string;
  summary: string;
  points: string[];
  seekCare: string;
  hi?: LocalBody;
  kn?: LocalBody;
};

/** Category keys resolve through the UI dictionary so labels localize too. */
export const CATEGORY_LABEL: Record<Category, string> = {
  lifecycle: "Lifecycle Care",
  preventive: "Preventative Health",
  wellness: "General Wellness",
  myth: "Myth-Busters",
};

/** Translation key for a category label (localized via the UI dictionary). */
export const CATEGORY_KEY: Record<Category, "catLifecycle" | "catPreventive" | "catWellness" | "catMyth"> = {
  lifecycle: "catLifecycle",
  preventive: "catPreventive",
  wellness: "catWellness",
  myth: "catMyth",
};

export const ARTICLES: Article[] = [
  {
    id: "art-mens",
    category: "lifecycle",
    emoji: "🌸",
    title: "Menstrual hygiene",
    summary:
      "Changing and cleaning your menstrual protection regularly helps prevent infection and keeps you comfortable.",
    points: [
      "Use a clean pad, cloth or cup; change every 4–6 hours (more if heavy).",
      "If using cloth, wash with soap, dry fully in sunlight, and store clean.",
      "Bathe and gently wash the outside area daily; you do not need special soaps.",
      "Track your cycle so you can notice what is normal for you.",
    ],
    seekCare:
      "See a health worker if you have very heavy bleeding, severe pain that stops daily life, a foul smell, or a cycle that suddenly changes.",
    hi: {
      title: "मासिक धर्म स्वच्छता",
      summary: "अपनी सैनिटरी सुरक्षा को नियमित रूप से बदलना और साफ़ रखना संक्रमण रोकता है और आपको आराम देता है।",
      points: [
        "साफ़ पैड, कपड़ा या कप प्रयोग करें; हर 4–6 घंटे में बदलें (ज़्यादा रक्तस्राव हो तो और अक्सर)।",
        "कपड़ा इस्तेमाल करें तो साबुन से धोएं, धूप में पूरी तरह सुखाएं, और साफ़ रखकर स्टोर करें।",
        "रोज़ नहाएं और बाहरी क्षेत्र को हल्के से धोएं; विशेष साबुन की ज़रूरत नहीं है।",
        "अपने चक्र को ट्रैक करें ताकि आप पहचान सकें कि आपके लिए सामान्य क्या है।",
      ],
      seekCare: "बहुत ज़्यादा रक्तस्राव, दैनिक काम रोकने वाला तीव्र दर्द, बदबू, या अचानक बदलते चक्र पर स्वास्थ्य कर्मी से मिलें।",
    },
    kn: {
      title: "ಮಾಸಿಕ ನೈರ್ಮಲ್ಯ",
      summary: "ನಿಮ್ಮ ಮಾಸಿಕ ರಕ್ಷಣೆಯನ್ನು ನಿಯಮಿತವಾಗಿ ಬದಲಾಯಿಸಿ ಮತ್ತು ಸ್ವಚ್ಛವಾಗಿಟ್ಟುಕೊಳ್ಳುವುದು ಸೋಂಕನ್ನು ತಡೆಯುತ್ತದೆ ಮತ್ತು ನಿದ್ದೆಯನ್ನು ಕೊಡುತ್ತದೆ.",
      points: [
        "ಸ್ವಚ್ಛ ಪ್ಯಾಡ್, ಬಟ್ಟೆ ಅಥವಾ ಕಪ್ ಬಳಸಿ; ಪ್ರತಿ 4–6 ಗಂಟೆಗೆ ಬದಲಾಯಿಸಿ (ಹೆಚ್ಚು ಸ್ರವಿಸಿದರೆ ಹೆಚ್ಚಾಗಿ).",
        "ಬಟ್ಟೆ ಬಳಸಿದರೆ, ಸಾಬೂನಿನಿಂದ ತೊಳೆಯಿರಿ, ಬೇಸಿಗೆಯಲ್ಲಿ ಸಂಪೂರ್ಣ ಒಣಗಿಸಿ, ಸ್ವಚ್ಛವಾಗಿ ಸಂಗ್ರಹಿಸಿ.",
        "ಪ್ರತಿದಿನ ಸ್ನಾನ ಮಾಡಿ ಮತ್ತು ಹೊರಭಾಗವನ್ನು ಮೃದುವಾಗಿ ತೊಳೆಯಿರಿ; ವಿಶೇಷ ಸಾಬೂನುಗಳ ಅಗತ್ಯವಿಲ್ಲ.",
        "ನಿಮ್ಮ ಚಕ್ರವನ್ನು ವಾಚಿರಿ, ನಿಮಗೆ ಸಾಮಾನ್ಯವೇನು ಎಂದು ಗುರುತಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತದೆ.",
      ],
      seekCare: "ಅತಿ ಹೆಚ್ಚು ರಕ್ತಸ್ರಾವ, ದೈನಂದಿನ ಜೀವನವನ್ನು ನಿಲ್ಲಿಸುವ ತೀವ್ರ ನೋವು, ದುರ್ಗಂಧ, ಅಥವಾ ಅಚಾನಕ್ಕಾಗಿ ಬದಲಾದ ಚಕ್ರ ಇದ್ದರೆ ಆರೋಗ್ಯ ಕಾರ್ಯಕರ್ತರನ್ನು ಭೇಟಿಯಾಗಿ.",
    },
  },
  {
    id: "art-preg-milestones",
    category: "lifecycle",
    emoji: "🤰",
    title: "Pregnancy milestones",
    summary:
      "Regular antenatal check-ups protect both mother and baby. Keep your Mother and Child Protection (MCP) card up to date.",
    points: [
      "Register early and attend at least 4–6 antenatal visits.",
      "Take iron–folic acid and other supplements as your worker advises.",
      "Learn the danger signs of pregnancy now, before you need them.",
      "Plan a safe delivery place and transport ahead of time.",
    ],
    seekCare:
      "Get urgent care for bleeding, severe headache with blurred vision, swelling of face/hands, reduced baby movement, or leaking fluid.",
    hi: {
      title: "गर्भावस्था के चरण",
      summary: "नियमित गर्पूर्व जाँच माँ और शिशु दोनों की रक्षा करती है। अपना माता एवं शिशु संरक्षण (MCP) कार्ड अद्यतन रखें।",
      points: [
        "जल्दी पंजीकरण करें और कम से कम 4–6 गर्पूर्व भेंटें करें।",
        "आपके स्वास्थ्य कर्मी की सलाह अनुसार आयरन–फ़ोलिक अम्ल और अन्य सप्लीमेंट लें।",
        "गर्भावस्था के ख़तरे के संकेत अब ही जान लें, ज़रूरत से पहले।",
        "सुरक्षित डिलीवरी का स्थान और परिवहन पहले से तय करें।",
      ],
      seekCare: "रक्तस्राव, धुंधली दृष्टि वाले तीव्र सिरदर्द, चेहरे/हाथों की सूजन, शिशु की हलचल कम होना, या तरल रिसने पर तुरंत देखभाल लें।",
    },
    kn: {
      title: "ಗರ್ಭಧಾರಣೆಯ ಹಂತಗಳು",
      summary: "ನಿಯಮಿತ ಗರ್ಭಪೂರ್ವ ಪರೀಕ್ಷೆಗಳು ತಾಯಿ ಮತ್ತು ಮಗು ಇಬ್ಬರನ್ನೂ ರಕ್ಷಿಸುತ್ತವೆ. ನಿಮ್ಮ ತಾಯಿ ಮತ್ತು ಶಿಶು ಸಂರಕ್ಷಣೆ (MCP) ಕಾರ್ಡ್ ಅನ್ನು ನವೀಕರಿಸಿ ಇಟ್ಟುಕೊಳ್ಳಿ.",
      points: [
        "ಬೇಗ ನೋಂದಾಯಿಸಿ ಮತ್ತು ಕನಿಷ್ಠ 4–6 ಗರ್ಭಪೂರ್ವ ಭೇಟಿಗಳನ್ನು ಮಾಡಿ.",
        "ನಿಮ್ಮ ಆರೋಗ್ಯ ಕಾರ್ಯಕರ್ತರು ಸೂಚಿಸಿದಂತೆ ಕಬ್ವಿನ್–ಫೋಲಿಕ್ ಆಮ್ಲ ಮತ್ತು ಇತರ ಪೋಷಕಾಂಶಗಳನ್ನು ಸೇವಿಸಿ.",
        "ಗರ್ಭಧಾರಣೆಯ ಅಪಾಯ ಸಂಕೇತಗಳನ್ನು ಈಗಲೇ, ಬೇಡಿಕೆ ಬರುವ ಮೊದಲು ಕಲಿಯಿರಿ.",
        "ಪ್ರಸವದ ಸ್ಥಳ ಮತ್ತು ಬರುವ ದಾರಿಯನ್ನು ಮೊದಲೇ ಯೋಜಿಸಿ.",
      ],
      seekCare: "ರಕ್ತಸ್ರಾವ, ಧುಂದಾದ ನೋಟದೊಂದಿಗೆ ತೀವ್ರ ತಲೆನೋವು, ಮುಖ/ಕೈಗಳ ಊತ, ಮಗುವಿನ ಚಲನೆ ಕಮ್ಮಿಯಾಗುವುದು, ಅಥವಾ ದ್ರವ ಸೋರಿಕೆಯಾದರೆ ತಕ್ಷಣ ಆರೈಕೆ ಪಡೆಯಿರಿ.",
    },
  },
  {
    id: "art-anc",
    category: "lifecycle",
    emoji: "🩺",
    title: "Antenatal care & safe delivery",
    summary: "Skilled care during pregnancy and birth greatly reduces risks for mother and baby.",
    points: [
      "Deliver with a skilled birth attendant, ideally at a health facility.",
      "Follow your facility's birth-preparedness plan.",
      "Keep taking supplements and attending post-delivery visits.",
    ],
    seekCare: "Call emergency help (112) for convulsions, heavy bleeding or a stalled/troubled labour.",
    hi: {
      title: "गर्पूर्व देखभाल और सुरक्षित डिलीवरी",
      summary: "गर्भावस्था और प्रसव के दौरान कुशल देखभाल माँ और शिशु दोनों के जोखिम बहुत घटाती है।",
      points: [
        "कुशल प्रसव सहायिका के साथ, संभवतः स्वास्थ्य सुविधा में ही डिलीवरी करें।",
        "अपनी सुविधा की प्रसव-पूर्व तैयारी योजना का पालन करें।",
        "सप्लीमेंट लेते रहें और डिलीवरी के बाद की भेंटें भी करें।",
      ],
      seekCare: "मिर्गी जैसी दौड़, भारी रक्तस्राव, या रुकी/समस्यापूर्ण प्रसव पर आपात सहायता (112) पर कॉल करें।",
    },
    kn: {
      title: "ಗರ್ಭಪೂರ್ವ ಆರೈಕೆ ಮತ್ತು ಸುರಕ್ಷಿತ ಪ್ರಸವ",
      summary: "ಗರ್ಭಧಾರಣೆ ಮತ್ತು ಪ್ರಸವದ ಸಮಯದಲ್ಲಿ ಕೌಶಲ್ಯಪೂರ್ಣ ಆರೈಕೆ ತಾಯಿ ಮತ್ತು ಮಗುವಿನ ಅಪಾಯಗಳನ್ನು ಗಣನೀಯವಾಗಿ ಕಮ್ಮಿ ಮಾಡುತ್ತದೆ.",
      points: [
        "ಕೌಶಲ್ಯ ಪಡೆದ ಪ್ರಸವ ಸಹಾಯಕರೊಂದಿಗೆ, ಸಾಧ್ಯವಿದ್ದಷ್ಟು ಆರೋಗ್ಯ ಸೌಲಭ್ಯದಲ್ಲೇ ಪ್ರಸವ ಮಾಡಿ.",
        "ನಿಮ್ಮ ಸೌಲಭ್ಯದ ಪ್ರಸವ-ಸಿದ್ಧತಾ ಯೋಜನೆಯನ್ನು ಅನುಸರಿಸಿ.",
        "ಪೋಷಕಾಂಶಗಳನ್ನು ಸೇವಿಸುತ್ತಲೇ ಪ್ರಸವಾನಂತರದ ಭೇಟಿಗಳಿಗೂ ಹೋಗಿ.",
      ],
      seekCare: "ಮೂರ್ಛೆ ರೋಗ (ಕನ್‌ವಲ್ಷನ್), ಭಾರಿ ರಕ್ತಸ್ರಾವ, ಅಥವಾ ನಿಂತ/ಸಮಸ್ಯೆ ಇರುವ ಪ್ರಸವದ ಸಂದರ್ಭದಲ್ಲಿ ತುರ್ತು ಸಹಾಯ (112) ಕರೆ ಮಾಡಿ.",
    },
  },
  {
    id: "art-postpartum",
    category: "lifecycle",
    emoji: "🌿",
    title: "Postpartum recovery",
    summary: "The weeks after birth are for healing, feeding and resting — for the mother too, not only the baby.",
    points: [
      "Rest when you can; accept help with household work.",
      "Eat extra nutritious meals and drink enough fluids, especially if breastfeeding.",
      "Watch for fever, severe pain, unusual bleeding or low mood.",
    ],
    seekCare:
      "See a worker for fever, foul bleeding, a painful breast, or feeling hopeless or unable to care for your baby (possible postpartum depression).",
    hi: {
      title: "प्रसवोत्तर रिकवरी",
      summary: "जन्म के बाद के सप्ताह उपचार, पोषण और आराम के लिए हैं — केवल शिशु के लिए नहीं, माँ के लिए भी।",
      points: [
        "जब कर सकें आराम करें; घर के कामों में मदद स्वीकार करें।",
        "अतिरिक्त पौष्टिक भोजन करें और पर्याप्त तरल पिएं, विशेषकर यदि स्तनपान करा रही हों।",
        "बुखार, तीव्र दर्द, असामान्य रक्तस्राव या उदासी पर नज़र रखें।",
      ],
      seekCare: "बुखार, बदबूदार रक्तस्राव, दर्दभरी स्तन, या निराशा/शिशु की देखभाल न कर पाने पर कर्मी से मिलें (संभव प्रसवोत्तर अवसाद)।",
    },
    kn: {
      title: "ಪ್ರಸವಾನಂತರದ ಚೇತರಿಕೆ",
      summary: "ಜನ್ಮಾನಂತರದ ವಾರಗಳು ಗಾಯಮುಕ್ತಿ, ಪೋಷಣೆ ಮತ್ತು ವಿಶ್ರಾಂತಿಗಾಗಿ — ಕೇವಲ ಮಗುವಿಗೆ ಮಾತ್ರವಲ್ಲ, ತಾಯಿಗೂ ಕೂಡ.",
      points: [
        "ಸಾಧ್ಯವಾದಷ್ಟು ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ; ಬೇರೆಗಳ ಕೆಲಸದಲ್ಲಿ ಸಹಾಯ ಸ್ವೀಕರಿಸಿ.",
        "ಹೆಚ್ಚುವರಿ ಪೋಷಕಾಹಾರ ಸೇವಿಸಿ ಮತ್ತು ಸಾಕಷ್ಟು ದ್ರವ ಕುಡಿಯಿರಿ, ವಿಶೇಷವಾಗಿ ಎದೆಹಾಲು ಕೊಡುತ್ತಿದ್ದರೆ.",
        "ಜ್ವರ, ತೀವ್ರ ನೋವು, ಅಸಾಮಾನ್ಯ ರಕ್ತಸ್ರಾವ ಅಥವಾ ನಮ್ಮೆ ಕಮ್ಮಿ ಇದೆ ಎಂದು ಗಮನಿಸಿ.",
      ],
      seekCare: "ಜ್ವರ, ದುರ್ಗಂಧಯುಕ್ತ ರಕ್ತಸ್ರಾವ, ನೋವಿನ ಎದೆ, ಅಥವಾ ನಿರಾಶೆ/ಮಗುವನ್ನು ನೋಡಿಕೊಳ್ಳಲಾಗದ ಸ್ಥಿತಿಯಲ್ಲಿ ಕಾರ್ಯಕರ್ತರನ್ನು ಭೇಟಿಯಾಗಿ (ಸಾಧ್ಯ ಪ್ರಸವಾನಂತರದ ಖಿನ್ನತೆ).",
    },
  },
  {
    id: "art-menopause",
    category: "lifecycle",
    emoji: "🍃",
    title: "Menopause",
    summary: "Periods naturally stop around the 40s–50s. Many women feel well; some need support.",
    points: [
      "Hot flashes, sleep changes and mood shifts are common and can be managed.",
      "Keep moving, strength-train, and protect bone health with calcium and vitamin D.",
      "Continue screening for breast and cervical health.",
    ],
    seekCare: "Talk to a doctor about bleeding after menopause, severe symptoms, or mood changes.",
    hi: {
      title: "रजोनिवृत्ति",
      summary: "क़रीब 40–50 वर्षों में मासिक धर्म स्वाभाविक रूप से बंद हो जाता है। कई महिलाँ स्वस्थ रहती हैं; कुछें सहायता चाहिए।",
      points: [
        "हॉट फ़्लैश, नींद में बदलाव और मूड बदलना आम हैं और इन्हें संभाला जा सकता है।",
        "शारीरिक गतिविधि जारी रखें, ताक़त का व्यायाम करें, और कैल्शियम व विटामिन D से हड्डी स्वास्थ्य बचाएं।",
        "स्तन और गर्भाशेय ग्रीवा स्वास्थ्य की जाँच जारी रखें।",
      ],
      seekCare: "रजोनिवृत्ति के बाद रक्तस्राव, तीव्र लक्षण, या मूड बदलाव के बारे में डॉक्टर से बात करें।",
    },
    kn: {
      title: "ರಜೋನಿವೃತ್ತಿ",
      summary: "ಸುಮಾರು 40–50 ವರ್ಷಗಳಲ್ಲಿ ಮಾಸಿಕ ಸ್ವಾಭಾವಿಕವಾಗಿ ನಿಲ್ಲುತ್ತದೆ. ಅನೇಕ ಮಹಿಳೆಯರು ಚೆನ್ನಾಗಿರುತ್ತಾರೆ; ಕೆಲವರಿಗೆ ಬೆಂಬಲ ಬೇಕು.",
      points: [
        "ಬೇಜಾರಿನ ಬೆವರು (ಹಾಟ್ ಫ್ಲಾಶ್), ನಿದ್ದೆ ಬದಲಾವಣೆ ಮತ್ತು ಮೂಡ್ ಬದಲು ಸಾಮಾನ್ಯ, ಇವನ್ನು ನಿರ್ವಹಿಸಬಹುದು.",
        "ಚಲನೆಯನ್ನು ಮುಂದುವರಿಸಿ, ಸ್ನಾಯು ಬಲದ ವ್ಯಾಯಾಮ ಮಾಡಿ, ಮತ್ತು ಕ್ಯಾಲ್ಸಿಯಂ ಹಾಗೂ ವಿಟಮಿನ್ D ಜೊತೆ ಮೂಳೆ ಆರೋಗ್ಯ ಕಾಪಾಡಿ.",
        "ಎದೆ ಮತ್ತು ಗರ್ಭಾಶಯ ಕುತ್ತಿಗೆ ಆರೋಗ್ಯ ಪರೀಕ್ಷೆಯನ್ನು ಮುಂದುವರಿಸಿ.",
      ],
      seekCare: "ರಜೋನಿವೃತ್ತಿಯ ನಂತರ ರಕ್ತಸ್ರಾವ, ತೀವ್ರ ಲಕ್ಷಣಗಳು, ಅಥವಾ ಮೂಡ್ ಬದಲಾವಣೆಗಳ ಬಗ್ಗೆ ವೈದ್ಯರೊಂದಿಗೆ ಮಾತನಾಡಿ.",
    },
  },
  {
    id: "art-anemia",
    category: "preventive",
    emoji: "🩸",
    title: "Preventing anemia",
    summary: "Anemia (low hemoglobin) is common in Indian women and makes you tired and weak. It can be prevented and treated.",
    points: [
      "Eat iron-rich foods: green leafy vegetables, dal/beans, jaggery, dates, meat/eggs where eaten.",
      "Add lemon/tomato (vitamin C) to help absorb iron; avoid tea with meals.",
      "Take weekly iron–folic acid tablets as advised by your health worker.",
      "Get your hemoglobin checked periodically.",
    ],
    seekCare: "See a worker if you are very tired, breathless, dizzy, or pale.",
    hi: {
      title: "एनीमिया से बचाव",
      summary: "एनीमिया (कम हिमोग्लोबिन) भारतीय महिलाओं में आम है और थकान व कमज़ोरी देता है। इससे रोका जा सकता है और इसका इलाज भी है।",
      points: [
        "आयरन-समृद्ध भोजन करें: हरी पत्तेदार सब्ज़ियाँ, दाल/फलियाँ, गुड़, खजूर, जहाँ खाते हों माँस/अंडे।",
        "आयरन सोखने में मदद के लिए नींबू/टमाटर (विटामिन C) जोड़ें; भोजन के साथ चाय से बचें।",
        "अपने स्वास्थ्य कर्मी की सलाह अनुसार साप्ताहिक आयरन–फ़ोलिक अम्ल गोलियाँ लें।",
        "समय-समय पर अपना हिमोग्लोबिन जाँच कराएं।",
      ],
      seekCare: "बहुत थकान, सांस फूलना, चक्कर, या पीलापन हो तो कर्मी से मिलें।",
    },
    kn: {
      title: "ರಕ್ತಹೀನತೆಯನ್ನು ತಡೆಯುವುದು",
      summary: "ರಕ್ತಹೀನತೆ (ಕಮ್ಮಿ ಹಿಮೋಗ್ಲೋಬಿನ್) ಭಾರತೀಯ ಮಹಿಳೆಯರಲ್ಲಿ ಸಾಮಾನ್ಯ, ಇದು ಸುಸ್ತು ಮತ್ತು ದೌರ್ಬಲ್ಯ ಕೊಡುತ್ತದೆ. ಇದನ್ನು ತಡೆಯಬಹುದು ಮತ್ತು ಗುಣಪಡಿಸಬಹುದು.",
      points: [
        "ಕಬ್ವಿನ್ ಹೆಚ್ಚಿರುವ ಆಹಾರ ಸೇವಿಸಿ: ಹಸಿರು ಎಲೆಕೋಸು, ಬೇಳೆ, ಬೆಲ್ಲ, ಖೇಜೂರು, ಮತ್ತು ತಿನ್ನುವವರಿಗೆ ಮಾಂಸ/ಮೊಟ್ಟೆ.",
        "ಕಬ್ವಿನ್ ಹೀರಿಕೊಳ್ಳಲು ನಿಂಬೆ/ಟೊಮೇಟೊ (ವಿಟಮಿನ್ C) ಸೇರಿಸಿ; ಊಟದ ಜೊತೆ ಚಹಾ ತಪ್ಪಿಸಿ.",
        "ನಿಮ್ಮ ಆರೋಗ್ಯ ಕಾರ್ಯಕರ್ತರು ಸೂಚಿಸಿದಂತೆ ವಾರಕ್ಕೊಮ್ಮೆ ಕಬ್ವಿನ್–ಫೋಲಿಕ್ ಆಮ್ಲ ಮಾತ್ರೆ ಸೇವಿಸಿ.",
        "ಕಾಲಕಾಲಕ್ಕೆ ನಿಮ್ಮ ಹಿಮೋಗ್ಲೋಬಿನ್ ಪರೀಕ್ಷಿಸಿಕೊಳ್ಳಿ.",
      ],
      seekCare: "ಅತಿ ಸುಸ್ತು, ಉಸಿರಾಟ ತೊಂದರೆ, ತಲೆಸುತ್ತು, ಅಥವಾ ಬಣ್ಣಬಿತ್ತಾಗಿದ್ದರೆ ಕಾರ್ಯಕರ್ತರನ್ನು ಭೇಟಿಯಾಗಿ.",
    },
  },
  {
    id: "art-nutrition",
    category: "preventive",
    emoji: "🥗",
    title: "Nutrition from local crops",
    summary: "Balanced meals can be built from affordable, locally grown foods.",
    points: [
      "Fill half the plate with vegetables, a quarter with dal/grain, a quarter with local protein.",
      "Use millets, seasonal greens, groundnut, and locally available fruit.",
      "Small, frequent meals help during pregnancy and anemia.",
    ],
    seekCare: "Ask a health worker about diet in pregnancy, diabetes or thyroid conditions.",
    hi: {
      title: "स्थानीय फ़सलों से पोषण",
      summary: "संतुलित भोजन सस्ते, स्थानीय रूप से उगाए खाद्य पदार्थों से बनाया जा सकता है।",
      points: [
        "थाली का आधा हिस्सा सब्ज़ियों से, एक चौथाई दाल/अनाज से, एक चौथाई स्थानीय प्रोटीन से भरें।",
        "मिलेट (जड़ाई अनाज), मौसमी हरी सब्ज़ियाँ, मूंगफली, और स्थानीय फल इस्तेमाल करें।",
        "गर्भावस्था और एनीमिया में छोटे-छोटे बार-बार भोजन मदद करते हैं।",
      ],
      seekCare: "गर्भावस्था, मधुमेह या थायरॉइड में आहार के बारे में स्वास्थ्य कर्मी से पूछें।",
    },
    kn: {
      title: "ಸ್ಥಳೀಯ ಬೆಳೆಗಳಿಂದ ಪೋಷಣೆ",
      summary: "ಅಗ್ಗ ಮತ್ತು ಸ್ಥಳೀಯವಾಗಿ ಬೆಳೆಯುವ ಆಹಾರಗಳಿಂದ ಸಮತೋಲಿತ ಊಟವನ್ನು ರಚಿಸಬಹುದು.",
      points: [
        "ತಟ್ಟೆಯ ಅರ್ಧ ಭಾಗ ತರಕಾರಿ, ಒಂದು ಕಾಲು ಭಾಗ ಬೇಳೆ/ಧಾನ್ಯ, ಒಂದು ಕಾಲು ಭಾಗ ಸ್ಥಳೀಯ ಪ್ರೋಟೀನ್‌ನಿಂದ ತುಂಬಿಸಿ.",
        "ಸಿಂಹಪುಲ್ಲ (ಮಿಲೆಟ್), ಕಾಲಮಾನದ ಹಸಿರು, ಕಡಲೆಕಾಯಿ, ಮತ್ತು ಸ್ಥಳೀಯ ಹಣ್ಣುಗಳನ್ನು ಬಳಸಿ.",
        "ಗರ್ಭಧಾರಣೆ ಮತ್ತು ರಕ್ತಹೀನತೆಯಲ್ಲಿ ಸಣ್ಣಪುಟ್ಟ, ಆಗಾಗ ಊಟಗಳು ಸಹಾಯ ಮಾಡುತ್ತವೆ.",
      ],
      seekCare: "ಗರ್ಭಧಾರಣೆ, ಮಧುಮೇಹ ಅಥವಾ ಥೈರಾಯ್ಡ್ ಸ್ಥಿತಿಯಲ್ಲಿ ಆಹಾರ ಕುರಿತು ಆರೋಗ್ಯ ಕಾರ್ಯಕರ್ತರನ್ನು ಕೇಳಿ.",
    },
  },
  {
    id: "art-breast",
    category: "preventive",
    emoji: "🔍",
    title: "Breast self-awareness",
    summary: "Knowing your normal breast makes it easier to notice a change early.",
    points: [
      "Once a month, look and feel your breasts for any new lump, skin change, or discharge.",
      "Early checking is not a diagnosis — it helps you know when to get it looked at.",
    ],
    seekCare: "See a doctor for a new lump, nipple discharge, skin dimpling, or persistent pain.",
    hi: {
      title: "स्तन स्व-जागरूकता",
      summary: "अपने सामान्य स्तन को जानना बदलाव को जल्दी पहचानना आसान बनाता है।",
      points: [
        "महीने में एक बार, अपने स्तन को देखें और छूकर किसी नई गांठ, त्वचा बदलाव, या रिसाव के लिए जांचें।",
        "जल्दी जांच निदान नहीं है — यह कब देखने जाना है यह समझने में मदद करती है।",
      ],
      seekCare: "नई गांठ, निप्पल से रिसाव, त्वचा धंसना, या लगातार दर्द होने पर डॉक्टर से मिलें।",
    },
    kn: {
      title: "ಎದೆ ಸ್ವ-ಅರಿವು",
      summary: "ನಿಮ್ಮ ಸಾಮಾನ್ಯ ಎದೆಯನ್ನು ತಿಳಿದಿರುವುದು ಬದಲಾವಣೆಯನ್ನು ಬೇಗ ಗುರುತಿಸಲು ಸುಲಭಗೊಳಿಸುತ್ತದೆ.",
      points: [
        "ತಿಂಗಳಿಗೆ ಒಮ್ಮೆ, ನಿಮ್ಮ ಎದೆಗಳನ್ನು ನೋಡಿ ಮತ್ತು ಮುಟ್ಟಿ ಯಾವುದೇ ಹೊಸ ಗಂಟ, ಚರ್ಮದ ಬದಲಾವಣೆ, ಅಥವಾ ಸ್ರಾವ ಇದೆಯೇ ಪರೀಕ್ಷಿಸಿ.",
        "ಬೇಗ ಪರೀಕ್ಷೆ ರೋಗನಿರ್ಣಯ ಅಲ್ಲ — ಯಾವಾಗ ತೋರಿಸಬೇಕೆಂದು ತಿಳಿಯಲು ಇದು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
      ],
      seekCare: "ಹೊಸ ಗಂಟ, nipple ಸ್ರಾವ, ಚರ್ಮ ಗುಳ್ಳೆ, ಅಥವಾ ನಿರಂತರ ನೋವಿದ್ದರೆ ವೈದ್ಯರನ್ನು ಭೇಟಿಯಾಗಿ.",
    },
  },
  {
    id: "art-cervical",
    category: "preventive",
    emoji: "🛡️",
    title: "Cervical cancer screening",
    summary: "Cervical cancer is highly preventable when caught early through screening.",
    points: [
      "Ask your district programme about VIA / Pap / HPV screening or self-sampling.",
      "The HPV vaccine is offered in many government programmes — check local age and schedule.",
    ],
    seekCare: "Report unusual bleeding after sex or between periods to a health professional.",
    hi: {
      title: "गर्भाशेय ग्रीवा कैंसर जांच",
      summary: "जांच के जल्दी पकड़े जाने पर गर्भाशेय ग्रीवा कैंसर बहुत हद तक रोका जा सकता है।",
      points: [
        "अपने ज़िला कार्यक्रम से VIA / Pap / HPV जांच या स्व-नमूना के बारे में पूछें।",
        "HPV टीका कई सरकारी कार्यक्रमों में मिलता है — स्थानीय आयु और अनुसूची जांचें।",
      ],
      seekCare: "सहवास के बाद या दो मासिक के बीच असामान्य रक्तस्राव की सूचना स्वास्थ्य पेशेवर को दें।",
    },
    kn: {
      title: "ಗರ್ಭಾಶಯ ಕುತ್ತಿಗೆ ಕ್ಯಾನ್ಸರ್ ಪರೀಕ್ಷೆ",
      summary: "ಪರೀಕ್ಷೆಯ ಮೂಲಕ ಬೇಗ ಪತ್ತೆಹಚ್ಚಿದರೆ ಗರ್ಭಾಶಯ ಕುತ್ತಿಗೆ ಕ್ಯಾನ್ಸರ್ ಅನ್ನು ಹೆಚ್ಚಿನ ಮಟ್ಟದಲ್ಲಿ ತಡೆಯಬಹುದು.",
      points: [
        "ನಿಮ್ಮ ಜಿಲ್ಲಾ ಕಾರ್ಯಕ್ರಮದ VIA / Pap / HPV ಪರೀಕ್ಷೆ ಅಥವಾ ಸ್ವ-ಮಾದರಿ ಬಗ್ಗೆ ಕೇಳಿ.",
        "HPV ಲಸಿಕೆ ಅನೇಕ ಸರ್ಕಾರಿ ಕಾರ್ಯಕ್ರಮಗಳಲ್ಲಿ ನೀಡಲಾಗುತ್ತದೆ — ಸ್ಥಳೀಯ ವಯಸ್ಸು ಮತ್ತು ವೇಳಾಪಟ್ಟಿ ಪರಿಶೀಲಿಸಿ.",
      ],
      seekCare: "ಸಹವಾಸದ ನಂತರ ಅಥವಾ ಮಾಸಿಕಗಳ ನಡುವೆ ಅಸಾಮಾನ್ಯ ರಕ್ತಸ್ರಾವ ಆದರೆ ಆರೋಗ್ಯ ತಜ್ಞರಿಗೆ ತಿಳಿಸಿ.",
    },
  },
  {
    id: "art-mental",
    category: "wellness",
    emoji: "🧠",
    title: "Mental health & stress",
    summary: "Your mind matters as much as your body. Stress, low mood and anxiety are common and treatable.",
    points: [
      "Talk to someone you trust; move your body; rest and breathe.",
      "Free confidential support is available (Tele-MANAS 14416).",
    ],
    seekCare: "Seek urgent help for self-harm thoughts — call 14416 or 112. You deserve support.",
    hi: {
      title: "मानसिक स्वास्थ्य और तनाव",
      summary: "आपका मन उतना ही ज़रूरी है जितना आपका शरीर। तनाव, उदासी और चिंता आम हैं और इनका इलाज है।",
      points: [
        "जिस पर भरोसा हो उससे बात करें; शरीर को चलाएं; आराम करें और सांस लें।",
        "मुफ़्त गोपनीय सहायता उपलब्ध है (Tele-MANAS 14416)।",
      ],
      seekCare: "आत्म-हानि की सोच पर तुरंत सहायता लें — 14416 या 112 पर कॉल करें। आप सहायता के योग्य हैं।",
    },
    kn: {
      title: "ಮಾನಸಿಕ ಆರೋಗ್ಯ ಮತ್ತು ಒತ್ತಡ",
      summary: "ನಿಮ್ಮ ಮನಸ್ಸು ನಿಮ್ಮ ದೇಹದಷ್ಟೇ ಮುಖ್ಯ. ಒತ್ತಡ, ನಮ್ಮೆ ಕಮ್ಮಿ ಮತ್ತು ಆತಂಕ ಸಾಮಾನ್ಯ ಮತ್ತು ಗುಣಪಡಿಸಬಹುದಾದದ್ದು.",
      points: [
        "ನಂಬಿಕೆಯ ವ್ಯಕ್ತಿಯೊಂದಿಗೆ ಮಾತನಾಡಿ; ದೇಹವನ್ನು ಚಲಿಸಿ; ವಿಶ್ರಾಂತಿ ಮತ್ತು ಉಸಿರಾಟ ಮಾಡಿ.",
        "ಉಚಿತ ಗೋಪನೀಯ ಬೆಂಬಲ ಲಭ್ಯವಿದೆ (Tele-MANAS 14416).",
      ],
      seekCare: "ಸ್ವ-ಹಾನಿ ಚಿಂತನೆಗಳಿಗೆ ತಕ್ಷಣ ಸಹಾಯ ಪಡೆಯಿರಿ — 14416 ಅಥವಾ 112 ಕರೆ ಮಾಡಿ. ನೀವು ಬೆಂಬಲಕ್ಕೆ ಅರ್ಹರು.",
    },
  },
  {
    id: "art-hygiene",
    category: "wellness",
    emoji: "💧",
    title: "Hydration, hygiene & infection prevention",
    summary: "Simple daily habits prevent many infections.",
    points: [
      "Drink safe water through the day; use clean toilets and handwashing.",
      "Wash hands before eating and after the toilet; keep wounds clean and covered.",
    ],
    seekCare: "Get care for persistent diarrhea, fever, burning urination, or a wound that is not healing.",
    hi: {
      title: "जल, स्वच्छता और संक्रमण रोकथाम",
      summary: "सरल दैनिक आदतें कई संक्रमण रोकती हैं।",
      points: [
        "दिनभर सुरक्षित पानी पिएं; साफ़ शौचालय और हाथ धोना इस्तेमाल करें।",
        "खाने से पहले और शौच के बाद हाथ धोएं; घाव को साफ़ और ढँककर रखें।",
      ],
      seekCare: "लगातार दस्त, बुखार, पेशाब में जलन, या न भरने वाले घाव पर देखभाल लें।",
    },
    kn: {
      title: "ನೀರು, ನೈರ್ಮಲ್ಯ ಮತ್ತು ಸೋಂಕು ತಡೆಗಟ್ಟುವಿಕೆ",
      summary: "ಸರಳ ದೈನಂದಿನ ಅಭ್ಯಾಸಗಳು ಅನೇಕ ಸೋಂಕುಗಳನ್ನು ತಡೆಯುತ್ತವೆ.",
      points: [
        "ದಿನಪೂರ್ತಿ ಸುರಕ್ಷಿತ ನೀರು ಕುಡಿಯಿರಿ; ಸ್ವಚ್ಛ ಶೌಚಾಲಯ ಮತ್ತು ಕೈತೊಳೆಯುವಿಕೆ ಬಳಸಿ.",
        "ಊಟಕ್ಕೆ ಮೊದಲು ಮತ್ತು ಶೌಚಾನಂತರ ಕೈ ತೊಳೆಯಿರಿ; ಗಾಯವನ್ನು ಸ್ವಚ್ಛವಾಗಿ ಮುಚ್ಚಿ ಇಟ್ಟುಕೊಳ್ಳಿ.",
      ],
      seekCare: "ನಿರಂತರ ಬದ್ಧಕೋಶ, ಜ್ವರ, ಮೂತ್ರದಲ್ಲಿ ಸುಳ್ಳು, ಅಥವಾ ಗುಣಗೊಳ್ಳದ ಗಾಯಕ್ಕೆ ಆರೈಕೆ ಪಡೆಯಿರಿ.",
    },
  },
  {
    id: "art-myth-period",
    category: "myth",
    emoji: "❌",
    title: "Myth: periods are 'dirty'",
    summary: "Menstruation is normal and healthy — not dirt or a disease.",
    points: [
      "You may bathe, wash hair, cook, pray and work during your period — no health rule forbids it.",
      "Isolation and food restrictions are traditions, not medical needs; rest and eat normally.",
    ],
    seekCare: "Track your cycle; see a worker only for genuinely unusual pain or bleeding.",
    hi: {
      title: "भ्रम: मासिक 'गंदा' होता है",
      summary: "मासिक धर्म सामान्य और स्वस्थ है — गंदगी या बीमारी नहीं।",
      points: [
        "मासिक के दौरान आप नहा सकती हैं, बाल धो सकती हैं, खाना बना सकती हैं, प्रार्थना और काम कर सकती हैं — कोई स्वास्थ्य नियम मना नहीं करता।",
        "अलगाव और भोजन प्रतिबंध परंपराएँ हैं, चिकित्सकीय ज़रूरत नहीं; सामान्य रूप से आराम करें और खाएं।",
      ],
      seekCare: "अपना चक्र ट्रैक करें; वास्तव में असामान्य दर्द या रक्तस्राव पर ही कर्मी से मिलें।",
    },
    kn: {
      title: "ಭ್ರಮೆ: ಮಾಸಿಕ 'ಕೊಳಕು' ಎಂದು",
      summary: "ರಜೋಧರ್ಮ ಸಾಮಾನ್ಯ ಮತ್ತು ಆರೋಗ್ಯಕರ — ಕೊಳಕು ಅಥವಾ ಕಾಯಿಲೆ ಅಲ್ಲ.",
      points: [
        "ಮಾಸಿಕದ ಸಮಯದಲ್ಲಿ ನೀವು ಸ್ನಾನ ಮಾಡಬಹುದು, ಕೆಸರು ತೊಳೆಯಬಹುದು, ಅಡುಗೆ ಮಾಡಬಹುದು, ಪ್ರಾರ್ಥನೆ ಮತ್ತು ಕೆಲಸ ಮಾಡಬಹುದು — ಯಾವ ಆರೋಗ್ಯ ನಿಯಮವೂ ತಡೆಯುವುದಿಲ್ಲ.",
        "ಪ್ರತ್ಯೇಕತೆ ಮತ್ತು ಆಹಾರ ನಿರ್ಬಂಧಗಳು ಪರಂಪರೆಗಳೇ ಹೊರತು ವೈದ್ಯಕೀಯ ಅಗತ್ಯಗಳಲ್ಲ; ಸಾಮಾನ್ಯವಾಗಿ ವಿಶ್ರಾಂತಿ ಮತ್ತು ಊಟ ಮಾಡಿ.",
      ],
      seekCare: "ನಿಮ್ಮ ಚಕ್ರವನ್ನು ವಾಚಿರಿ; ನಿಜವಾಗಿಯೂ ಅಸಾಮಾನ್ಯ ನೋವು ಅಥವಾ ರಕ್ತಸ್ರಾವಕ್ಕೆ ಮಾತ್ರ ಕಾರ್ಯಕರ್ತರನ್ನು ಭೇಟಿಯಾಗಿ.",
    },
  },
  {
    id: "art-myth-fertility",
    category: "myth",
    emoji: "❌",
    title: "Myth: baby-girl 'problems' are the woman's fault",
    summary: "The sex of a child is a biological matter and is not anyone's 'fault'. Infertility has many causes affecting women and men alike.",
    points: [
      "Blaming or abandoning a woman for not having a son is harmful and untrue.",
      "Both partners should be checked before any treatment.",
    ],
    seekCare: "Consult a qualified doctor — avoid unproven remedies that delay real care.",
    hi: {
      title: "भ्रम: बेटी की 'समस्याएँ' महिला की गलती हैं",
      summary: "शिशु का लिंग एक जैविक विषय है और यह किसी की 'गलती' नहीं। बांझपन के कई कारण हैं जो महिला और पुरुष दोनों को प्रभावित करते हैं।",
      points: [
        "बेटा न होने के लिए महिला को दोष देना या त्यागना हानिकारक और असत्य है।",
        "किसी भी इलाज से पहले दोनों साझेदारों की जांच होनी चाहिए।",
      ],
      seekCare: "अर्ह डॉक्टर से सलाह लें — अप्रमाणित नुस्खों से दूर रहें जो असली देखभाल में देरी करते हैं।",
    },
    kn: {
      title: "ಭ್ರಮೆ: ಹೆಣ್ಣುಮಗುವಿನ 'ಸಮಸ್ಯೆಗಳು' ಮಹಿಳೆಯ ತಪ್ಪು ಎಂದು",
      summary: "ಮಗುವಿನ ಲಿಂಗ ಒಂದು ಜೀವಶಾಸ್ತ್ರದ ವಿಷಯ, ಇದು ಯಾರದೂ ತಪ್ಪು ಅಲ್ಲ. ಮಗು ಕೊರತೆಗೆ ಅನೇಕ ಕಾರಣಗಳಿವೆ, ಅವು ಮಹಿಳೆ ಮತ್ತು ಪುರುಷ ಇಬ್ಬರನ್ನೂ ಸೇರುತ್ತವೆ.",
      points: [
        "ಗಂಡಮಗು ಇಲ್ಲ ಎಂಬುದಕ್ಕೆ ಮಹಿಳೆಯನ್ನು ದೂಷಿಸುವುದು ಅಥವಾ ತಿರಸ್ಕರಿಸುವುದು ಹಾನಿಕಾರಕ ಮತ್ತು ಸುಳ್ಳು.",
        "ಯಾವುದೇ ಚಿಕಿತ್ಸೆಗೆ ಮೊದಲು ಇಬ್ಬರು ಸಂಗಾತಿಗಳನ್ನೂ ಪರೀಕ್ಷಿಸಬೇಕು.",
      ],
      seekCare: "ಅರ್ಹತೆ ಪಡೆದ ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ — ನಿಜವಾದ ಆರೈಕೆಯನ್ನು ತಡೆಯುವ ಅಮಾನ್ಯ ಪರಿಹಾರಗಳಿಂದ ದೂರವಿರಿ.",
    },
  },
  {
    id: "art-myth-remedy",
    category: "myth",
    emoji: "⚠️",
    title: "Traditional remedies: know the risks",
    summary: "Some home remedies are helpful and safe; others can harm, especially in pregnancy or for infants.",
    points: [
      "Do not give honey or sugar water to babies under 6 months; only breast milk/expressed milk.",
      "Avoid strong herbal concoctions in pregnancy unless a qualified person approves.",
      "Respect cultural knowledge while checking safety with a health worker.",
    ],
    seekCare: "Ask a professional before using any remedy for a child, pregnancy, or a lasting illness.",
    hi: {
      title: "पारंपरिक नुस्खे: जोखिम जानें",
      summary: "कुछ घरेलू नुस्खे मददगार और सुरक्षित हैं; कुछ नुकसान कर सकते हैं, विशेषकर गर्भावस्था में या शिशुओं को।",
      points: [
        "6 महीने से कम के शिशुओं को शहद या चीनी का पानी न दें; केवल माँ का दूध/निचोड़ा हुआ दूध।",
        "गर्भावस्था में प्रबल जड़ी-बूटी मिश्रण से बचें, सिवाय अर्ह व्यक्ति की मंज़ूरी के।",
        "सांस्कृतिक ज्ञान का सम्मान करें, पर स्वास्थ्य कर्मी के साथ सुरक्षा जांचें।",
      ],
      seekCare: "बच्चे, गर्भावस्था, या लंबे रोग के लिए कोई नुस्खा इस्तेमाल करने से पहले पेशेवर से पूछें।",
    },
    kn: {
      title: "ಪಾರಂಪರಿಕ ಪರಿಹಾರಗಳು: ಅಪಾಯಗಳನ್ನು ತಿಳಿಯಿರಿ",
      summary: "ಕೆಲವು ನಾಟಿ ಪರಿಹಾರಗಳು ಸಹಾಯಕ ಮತ್ತು ಸುರಕ್ಷಿತ; ಇನ್ನು ಕೆಲವು ಹಾನಿ ಮಾಡಬಹುದು, ವಿಶೇಷವಾಗಿ ಗರ್ಭಧಾರಣೆಯಲ್ಲಿ ಅಥವಾ ಶಿಶುಗಳಿಗೆ.",
      points: [
        "6 ತಿಂಗಳೊಳಗಿನ ಶಿಶುಗಳಿಗೆ ಜೇನುತುಪ್ಪ ಅಥವಾ ಸಕ್ಕರೆ ನೀರು ಕೊಡಬೇಡಿ; ಕೇವಲ ಎದೆಹಾಲು/ಹಾಲಿಸಿದ ಹಾಲು.",
        "ಗರ್ಭಧಾರಣೆಯಲ್ಲಿ ಪ್ರಬಲ ಔಷಧೀಯ ಕಷಾಯಗಳಿಂದ ದೂರವಿರಿ, ಅರ್ಹತೆ ಪಡೆದವರು ಒಪ್ಪಿದರೆ ಹೊರತು.",
        "ಸಾಂಸ್ಕೃತಿಕ ಜ್ಞಾನವನ್ನು ಗೌರವಿಸಿ, ಆದರೆ ಆರೋಗ್ಯ ಕಾರ್ಯಕರ್ತರ ಜೊತೆ ಸುರಕ್ಷತೆ ಪರಿಶೀಲಿಸಿ.",
      ],
      seekCare: "ಮಗು, ಗರ್ಭಧಾರಣೆ, ಅಥವಾ ದೀರ್ಘ ಕಾಯಿಲೆಗೆ ಯಾವುದೇ ಪರಿಹಾರ ಬಳಸುವ ಮೊದಲು ತಜ್ಞರನ್ನು ಕೇಳಿ.",
    },
  },
];

export function articlesByCategory(cat: Category): Article[] {
  return ARTICLES.filter((a) => a.category === cat);
}

export function getArticle(id: string): Article | undefined {
  return ARTICLES.find((a) => a.id === id);
}

/** Returns the article's body in the reader's language, falling back to English. */
export function localizedArticle(a: Article, code: string): LocalBody {
  const body = code === "hi" ? a.hi : code === "kn" ? a.kn : undefined;
  return body ?? { title: a.title, summary: a.summary, points: a.points, seekCare: a.seekCare };
}

export function searchArticles(q: string): Article[] {
  const needle = q.trim().toLowerCase();
  if (!needle) return [];
  return ARTICLES.filter((a) => {
    const haystack = [
      a.title, a.summary, a.points.join(" "),
      a.hi?.title, a.hi?.summary, a.hi?.points.join(" "),
      a.kn?.title, a.kn?.summary, a.kn?.points.join(" "),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(needle);
  });
}
