import type { ReactNode, SVGProps } from "react";

/* ---------------------------------------------------------------------------
   Inline SVG icon set (Lucide-style, stroke-based, currentColor). Kept in-repo
   to avoid a runtime dependency and keep assets lightweight for slow networks.
   ------------------------------------------------------------------------- */

export type IconName =
  | "home"
  | "stethoscope"
  | "dashboard"
  | "shield"
  | "user"
  | "mic"
  | "search"
  | "globe"
  | "sparkles"
  | "heart"
  | "phone"
  | "pin"
  | "share"
  | "whatsapp"
  | "message"
  | "close"
  | "volume"
  | "chevronRight"
  | "arrowLeft"
  | "check"
  | "calendar"
  | "leaf"
  | "stone"
  | "siren"
  | "lock"
  | "eye"
  | "logout"
  | "plus"
  | "building"
  | "edit"
  | "external"
  | "info"
  | "alert"
  | "moon";

const PATHS: Record<IconName, ReactNode> = {
  home: <path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" />,
  stethoscope: (
    <>
      <path d="M6 3v5a4 4 0 0 0 8 0V3" />
      <path d="M10 12v3a5 5 0 0 0 10 0v-1" />
      <circle cx="20" cy="11" r="2" />
    </>
  ),
  dashboard: (
    <>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="11" width="7" height="10" rx="1.5" />
      <rect x="3" y="15" width="7" height="6" rx="1.5" />
    </>
  ),
  shield: <path d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z" />,
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-4 5-5 8-5s6.5 1 8 5" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3v6M9 6h6M6 13l1.2 3L10 17l-2.8 1L6 21l-1.2-3L2 17l2.8-1z" />
      <path d="M17 12l.8 2.2L20 15l-2.2.8L17 18l-.8-2.2L14 15l2.2-.8z" />
    </>
  ),
  heart: <path d="M12 20s-7-4.5-9.2-8.2C1.2 8.6 2.7 5 6.2 5c2 0 3 1.2 3.8 2.4C10.8 6.2 11.8 5 13.8 5c3.5 0 5 3.6 3.4 6.8C19 15.5 12 20 12 20z" />,
  phone: <path d="M6 3l3 5-2 2c1 3 3 5 6 6l2-2 5 3v3c0 1-1 2-2 2C10 21 3 14 3 5c0-1 1-2 2-2z" />,
  pin: (
    <>
      <path d="M12 21c4-5 7-8 7-12a7 7 0 1 0-14 0c0 4 3 7 7 12z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  share: <path d="M12 3v12M8 7l4-4 4 4M5 14v5h14v-5" />,
  whatsapp: <path d="M3 21l1.6-4A8 8 0 1 1 7 19.4zM9 8c0 4 3 7 7 7l1-1-2-1-1 1c-1 0-3-2-3-3l1-1-1-2z" />,
  message: <path d="M4 5h16v11H8l-4 4z" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  volume: <path d="M4 9v6h4l5 4V5L8 9zM17 8a5 5 0 0 1 0 8" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  arrowLeft: <path d="M20 12H4m6-6-6 6 6 6" />,
  check: <path d="m5 12 5 5 9-11" />,
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 3v4M16 3v4" />
    </>
  ),
  leaf: <path d="M4 20C4 12 10 5 20 5c0 10-7 15-14 15-1 0-2 0-2 0zM8 16c2-3 4-4 7-5" />,
  stone: <path d="M7 6h10l3 6-4 7H8L4 12z" />,
  siren: (
    <>
      <path d="M7 18v-5a5 5 0 0 1 10 0v5M4 21h16M12 3V2M5 8 4 7M19 8l1-1" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  logout: <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 17l-5-5 5-5M5 12h11" />,
  plus: <path d="M12 5v14M5 12h14" />,
  building: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h6v6" />
    </>
  ),
  edit: <path d="M4 20h4L20 8l-4-4L4 16zM14 6l4 4" />,
  external: <path d="M14 4h6v6M20 4l-8 8M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
  alert: <path d="M12 3 2 20h20zM12 10v4M12 17h.01" />,
  moon: <path d="M20 14a8 8 0 1 1-9-11 7 7 0 0 0 9 11z" />,
};

export function Icon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {PATHS[name]}
    </svg>
  );
}
