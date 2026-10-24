import type { MouseEvent } from "react";
import { Icon } from "./Icons";
import type { IconName } from "./Icons";
import { useRouter } from "../lib/router";
import { useI18n } from "../i18n";

const ITEMS: { to: string; icon: IconName; key: "navHome" | "navDoctor" | "navDashboard" | "navSafety" | "navProfile" }[] = [
  { to: "/home", icon: "home", key: "navHome" },
  { to: "/doctor", icon: "stethoscope", key: "navDoctor" },
  { to: "/dashboard", icon: "dashboard", key: "navDashboard" },
  { to: "/safety", icon: "shield", key: "navSafety" },
  { to: "/profile", icon: "user", key: "navProfile" },
];

export function BottomNav() {
  const { t } = useI18n();
  const { path, navigate } = useRouter();
  const root = "/" + (path.split("/").filter(Boolean)[0] ?? "");

  const go = (to: string) => (e: MouseEvent) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <nav className="bnav" aria-label={t("navPrimary")}>
      {ITEMS.map((item) => {
        const active = root === item.to;
        return (
          <a
            key={item.to}
            href={`#${item.to}`}
            className="bnav__item"
            aria-current={active ? "page" : undefined}
            onClick={go(item.to)}
          >
            <Icon name={item.icon} />
            <span>{t(item.key)}</span>
          </a>
        );
      })}
    </nav>
  );
}
