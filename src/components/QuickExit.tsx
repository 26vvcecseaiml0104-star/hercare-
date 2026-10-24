import { useRouter } from "../lib/router";
import { useI18n } from "../i18n";
import { Icon } from "./Icons";

/* Persistent quick-exit for sensitive pages. Navigates to a neutral screen with
   no confirmation dialog. Honest note: it does NOT erase browser history or
   guarantee invisibility — that caveat is stated on the neutral screen and in
   the safety guide. */
export function QuickExit() {
  const { t } = useI18n();
  const { navigate } = useRouter();
  return (
    <button
      className="quick-exit"
      onClick={() => navigate("/neutral", { replace: true })}
      aria-label={t("quickExitAria")}
    >
      <Icon name="close" /> {t("exitLabel")}
    </button>
  );
}
