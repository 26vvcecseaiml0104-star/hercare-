import { useEffect, useState } from "react";
import { RouterProvider, useRouter, segments } from "./lib/router";
import { StoreProvider, useStore } from "./lib/store";
import { I18nProvider, useI18n } from "./i18n";
import { ToastProvider } from "./components/Toast";
import { Header } from "./components/Header";
import { BottomNav } from "./components/BottomNav";
import { QuickExit } from "./components/QuickExit";
import { AIAssistant } from "./components/AIAssistant";
import { findLanguage } from "./i18n/languages";
import { onOpenAIRequest } from "./lib/events";

import Welcome from "./screens/Welcome";
import OtpVerify from "./screens/OtpVerify";
import LanguageSelect from "./screens/LanguageSelect";
import Neutral from "./screens/Neutral";
import Home from "./screens/Home";
import About from "./screens/About";
import Awareness from "./screens/Awareness";
import Article from "./screens/Article";
import Search from "./screens/Search";
import FindDoctor from "./screens/FindDoctor";
import DoctorDetails from "./screens/DoctorDetails";
import Dashboard from "./screens/Dashboard";
import Periods from "./screens/Periods";
import Pregnancy from "./screens/Pregnancy";
import ElderCare from "./screens/ElderCare";
import Journal from "./screens/Journal";
import Safety from "./screens/Safety";
import Report from "./screens/Report";
import Nearby from "./screens/Nearby";
import Profile from "./screens/Profile";
import Privacy from "./screens/Privacy";

/* Routes that never require the header/bottom-nav chrome (standalone). */
const CHROMELESS = new Set(["neutral"]);

/* Sensitive pages that must always show the floating quick-exit control. */
const SENSITIVE = new Set(["safety", "journal", "dashboard"]);

function renderRoute(path: string) {
  const seg = segments(path);
  const root = seg[0] ?? "";
  switch (root) {
    case "":
    case "home":
      return <Home />;
    case "about":
      return <About />;
    case "awareness":
      return seg[1] === "article" ? <Article path={path} /> : <Awareness />;
    case "search":
      return <Search path={path} />;
    case "doctor":
      return seg[1] ? <DoctorDetails path={path} /> : <FindDoctor />;
    case "dashboard":
      if (seg[1] === "periods") return <Periods />;
      if (seg[1] === "pregnancy") return <Pregnancy />;
      if (seg[1] === "elder") return <ElderCare />;
      return <Dashboard />;
    case "journal":
      return <Journal />;
    case "safety":
      if (seg[1] === "report") return <Report />;
      if (seg[1] === "nearby") return <Nearby />;
      return <Safety />;
    case "profile":
      return <Profile />;
    case "privacy":
      return <Privacy />;
    default:
      return <Home />;
  }
}

function Shell() {
  const { path, navigate } = useRouter();
  const { state } = useStore();
  const { t, code } = useI18n();
  const [aiOpen, setAiOpen] = useState(false);

  const root = (segments(path)[0] ?? "").toLowerCase();

  // Global assistant open request (e.g. from the Safety screen).
  useEffect(() => onOpenAIRequest(() => setAiOpen(true)), []);

  // Language / direction on the document element.
  useEffect(() => {
    const lang = findLanguage(code);
    document.documentElement.lang = lang.code;
    document.documentElement.dir = lang.rtl ? "rtl" : "ltr";
  }, [code]);

  // Auth + onboarding gating.
  const hasUser = Boolean(state.user?.verified);
  useEffect(() => {
    if (CHROMELESS.has(root)) return;
    if (!hasUser && root !== "welcome" && root !== "otp") {
      navigate("/welcome", { replace: true });
    } else if (hasUser && !state.language && root !== "language") {
      navigate("/language", { replace: true });
    }
  }, [hasUser, state.language, root, navigate]);

  // Standalone chromeless pages.
  if (root === "neutral") return <Neutral />;

  // Onboarding screens (no app chrome).
  if (!hasUser && (root === "welcome" || root === "otp")) {
    return (
      <>
        <main className="content">{root === "welcome" ? <Welcome /> : <OtpVerify />}</main>
        <AIAssistant open={aiOpen} onClose={() => setAiOpen(false)} />
      </>
    );
  }
  if (hasUser && !state.language) {
    return <main className="content"><LanguageSelect /></main>;
  }

  const showQuickExit = SENSITIVE.has(root);

  return (
    <>
      <a href="#main" className="skip-link">{t("skipToContent")}</a>
      <Header onOpenAI={() => setAiOpen(true)} />
      <main className="content" id="main">
        {renderRoute(path)}
      </main>
      <BottomNav />
      {showQuickExit && <QuickExit />}
      <AIAssistant open={aiOpen} onClose={() => setAiOpen(false)} />
    </>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <I18nProvider>
        <ToastProvider>
          <RouterProvider>
            <div className="app">
              <Shell />
            </div>
          </RouterProvider>
        </ToastProvider>
      </I18nProvider>
    </StoreProvider>
  );
}
