/* ---------------------------------------------------------------------------
   DEMO / SAMPLE facility directory.

   ⚠️  NONE of these records are real providers. Names, photographs, fees,
   phone numbers and languages are invented for demonstrating the interface.
   They are always rendered with a visible "Sample data" badge and must never
   be presented as genuine. In production this data is imported from a
   verified, admin-curated database with a `verifiedAt` date and photo rights.
   ------------------------------------------------------------------------- */

import { dl } from "../i18n/data-labels";

export type Fee = { kind: "free" } | { kind: "amount"; rupees: number } | { kind: "unknown" };

export type FacilityType =
  | "Government hospital"
  | "Private hospital"
  | "Private clinic"
  | "Primary health centre (PHC)"
  | "Community health centre (CHC)"
  | "Counsellor"
  | "Rehabilitation centre"
  | "NGO"
  | "Legal aid";

export type Specialty =
  | "Gynecologist"
  | "Obstetrician"
  | "General physician"
  | "Pediatrician"
  | "Mental health professional"
  | "Addiction recovery"
  | "General";

export type Facility = {
  id: string;
  name: string;
  type: FacilityType;
  specialties: Specialty[];
  femaleDoctor: boolean;
  state: string;
  district: string;
  block: string;
  village: string;
  address: string;
  phone: string; // sample number
  fee: Fee;
  hours: string;
  services: string[];
  languages: string[];
  hasPhoto: boolean; // false -> neutral placeholder
  verifiedAt: string;
  mapQuery: string;
  womenWard?: boolean;
  tags: string[]; // e.g. "nearby-help", "rehab"
};

export const SAMPLE_NOTE =
  "Demonstration record — invented data shown only to demonstrate the interface. Never a real provider.";

export const FACILITIES: Facility[] = [
  {
    id: "fac-001",
    name: "Sample District Women's Hospital",
    type: "Government hospital",
    specialties: ["Gynecologist", "Obstetrician", "Pediatrician"],
    femaleDoctor: true,
    state: "Maharashtra",
    district: "Pune",
    block: "Haveli",
    village: "Wakad",
    address: "Sample Road, Wakad (demo address)",
    phone: "00000000000",
    fee: { kind: "free" },
    hours: "Open 24 hours (sample)",
    services: ["Antenatal care", "Delivery", "Family planning", "Emergency care"],
    languages: ["Marathi", "Hindi", "English"],
    hasPhoto: false,
    verifiedAt: "2026-01-15",
    mapQuery: "Wakad Pune",
    womenWard: true,
    tags: ["nearby-help"],
  },
  {
    id: "fac-002",
    name: "Demo City Women's Health Clinic",
    type: "Private clinic",
    specialties: ["Gynecologist"],
    femaleDoctor: true,
    state: "Telangana",
    district: "Hyderabad",
    block: "Serilingampally",
    village: "Kukatpally",
    address: "Sample Street, Kukatpally (demo address)",
    phone: "00000000000",
    fee: { kind: "amount", rupees: 500 },
    hours: "Mon–Sat, 9:00–18:00 (sample)",
    services: ["Consultation", "Ultrasound", "Screening"],
    languages: ["Telugu", "Hindi", "English"],
    hasPhoto: false,
    verifiedAt: "2025-11-02",
    mapQuery: "Kukatpally Hyderabad",
    tags: [],
  },
  {
    id: "fac-003",
    name: "Model Primary Health Centre (Sample)",
    type: "Primary health centre (PHC)",
    specialties: ["General physician", "Obstetrician"],
    femaleDoctor: false,
    state: "Tamil Nadu",
    district: "Coimbatore",
    block: "Valparai",
    village: "Attur",
    address: "Panchayat Road, Attur (demo address)",
    phone: "00000000000",
    fee: { kind: "free" },
    hours: "Mon–Fri, 8:00–16:00 (sample)",
    services: ["Check-ups", "Vaccination", "Antenatal care", "Anemia screening"],
    languages: ["Tamil", "English"],
    hasPhoto: false,
    verifiedAt: "2025-09-20",
    mapQuery: "Attur Coimbatore",
    tags: ["nearby-help"],
  },
  {
    id: "fac-004",
    name: "Demo Mental Health & Counselling Centre",
    type: "Counsellor",
    specialties: ["Mental health professional"],
    femaleDoctor: true,
    state: "Karnataka",
    district: "Bengaluru Urban",
    block: "Bengaluru North",
    village: "Yelahanka",
    address: "Sample Lane, Yelahanka (demo address)",
    phone: "00000000000",
    fee: { kind: "unknown" },
    hours: "By appointment (sample)",
    services: ["Counselling", "Crisis support", "Family therapy"],
    languages: ["Kannada", "Hindi", "English"],
    hasPhoto: false,
    verifiedAt: "2025-12-10",
    mapQuery: "Yelahanka Bengaluru",
    tags: ["nearby-help", "rehab"],
  },
  {
    id: "fac-005",
    name: "Sample Women's Rehabilitation Home",
    type: "Rehabilitation centre",
    specialties: ["Addiction recovery"],
    femaleDoctor: true,
    state: "Gujarat",
    district: "Ahmedabad",
    block: "Daskroi",
    village: "Bopal",
    address: "Sample Ashram Road, Bopal (demo address)",
    phone: "00000000000",
    fee: { kind: "unknown" },
    hours: "Residential (sample)",
    services: ["De-addiction", "Counselling", "Vocational training", "Women-only ward"],
    languages: ["Gujarati", "Hindi"],
    hasPhoto: false,
    verifiedAt: "2025-10-05",
    mapQuery: "Bopal Ahmedabad",
    womenWard: true,
    tags: ["rehab"],
  },
  {
    id: "fac-006",
    name: "Demo Community Health Centre",
    type: "Community health centre (CHC)",
    specialties: ["General physician", "Pediatrician", "Gynecologist"],
    femaleDoctor: true,
    state: "West Bengal",
    district: "Howrah",
    block: "Uluberia",
    village: "Sankrail",
    address: "Sample Main Road, Sankrail (demo address)",
    phone: "00000000000",
    fee: { kind: "free" },
    hours: "Mon–Sat, 8:00–20:00 (sample)",
    services: ["Emergency", "Antenatal care", "Child vaccination", "Family planning"],
    languages: ["Bengali", "Hindi", "English"],
    hasPhoto: false,
    verifiedAt: "2025-08-30",
    mapQuery: "Sankrail Howrah",
    tags: ["nearby-help"],
  },
  {
    id: "fac-007",
    name: "Demo NGO Women's Support Centre",
    type: "NGO",
    specialties: ["General"],
    femaleDoctor: false,
    state: "Delhi",
    district: "New Delhi",
    block: "Chanakyapuri",
    village: "Vasant Vihar",
    address: "Sample Block, Vasant Vihar (demo address)",
    phone: "00000000000",
    fee: { kind: "free" },
    hours: "Mon–Fri, 10:00–18:00 (sample)",
    services: ["Counselling", "Legal referral", "Shelter referral", "Helpline"],
    languages: ["Hindi", "English", "Punjabi"],
    hasPhoto: false,
    verifiedAt: "2025-11-25",
    mapQuery: "Vasant Vihar New Delhi",
    tags: ["nearby-help"],
  },
  {
    id: "fac-008",
    name: "Sample Maternity & Child Hospital",
    type: "Private hospital",
    specialties: ["Obstetrician", "Gynecologist", "Pediatrician"],
    femaleDoctor: true,
    state: "Kerala",
    district: "Ernakulam",
    block: "Kochi",
    village: "Kaloor",
    address: "Sample Street, Kaloor, Kochi (demo address)",
    phone: "00000000000",
    fee: { kind: "amount", rupees: 800 },
    hours: "Open 24 hours (sample)",
    services: ["Delivery", "NICU", "Antenatal care", "Gynecological surgery"],
    languages: ["Malayalam", "English", "Hindi"],
    hasPhoto: false,
    verifiedAt: "2026-01-02",
    mapQuery: "Kaloor Kochi",
    tags: [],
  },
];

export function facilitiesByTag(tag: string): Facility[] {
  return FACILITIES.filter((f) => f.tags.includes(tag));
}

export function getFacility(id: string): Facility | undefined {
  return FACILITIES.find((f) => f.id === id);
}

/** Distinct location values used to power the manual (no-GPS) search selects. */
function unique(values: string[]): string[] {
  return Array.from(new Set(values)).sort();
}
export const STATES = unique(FACILITIES.map((f) => f.state));
export function districtsFor(state: string): string[] {
  return unique(FACILITIES.filter((f) => f.state === state).map((f) => f.district));
}
export function blocksFor(state: string, district: string): string[] {
  return unique(
    FACILITIES.filter((f) => f.state === state && f.district === district).map((f) => f.block),
  );
}
export function villagesFor(state: string, district: string, block: string): string[] {
  return unique(
    FACILITIES
      .filter((f) => f.state === state && f.district === district && f.block === block)
      .map((f) => f.village),
  );
}

export function feeLabel(fee: Fee, code = "en"): { text: string; kind: "free" | "fee" | "unknown" } {
  if (fee.kind === "free") return { text: dl(code, "Free (confirmed)"), kind: "free" };
  if (fee.kind === "amount") return { text: `₹${fee.rupees} ${dl(code, "per visit")}`, kind: "fee" };
  return { text: dl(code, "Fee not verified"), kind: "unknown" };
}
