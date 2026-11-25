import { useEffect, useState } from "react";
import {
  Download,
  Globe,
  Grid,
  Image as ImageIcon,
  Maximize2,
  Moon,
  Sun,
} from "lucide-react";
import {
  BRAND_COLORS,
  BRAND_INFO,
  Language,
  LOGO_CONCEPTS,
  LogoConcept,
  UI_COPY,
} from "./data/concepts";
import { REFINEMENT_UI } from "./data/refinements";
import { ConceptSymbol, EdgeNetWordmark } from "./components/EdgeNetLogos";
import { ConceptInspectorModal } from "./components/ConceptInspectorModal";
import { ImageStudioModal } from "./components/ImageStudioModal";
import { UnifiedFrameRefinementSection } from "./components/UnifiedFrameRefinementSection";
import {
  buildFullBoardSvg,
  downloadBoardAsPng,
  downloadSvgFile,
} from "./utils/exportBoard";
import { downloadRefinementComparisonPng } from "./utils/exportRefinementBoard";

type ThemeMode = "light" | "dark";

const LANG_STORAGE_KEY = "edgenet_board_lang";
const THEME_STORAGE_KEY = "edgenet_board_theme";

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === "ko" || saved === "en") return saved;
      if (
        typeof navigator !== "undefined" &&
        navigator.language.toLowerCase().startsWith("ko")
      ) {
        return "ko";
      }
    } catch {
      // Ignore storage access restrictions
    }
    return "en";
  });

  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
      if (saved === "dark" || saved === "light") return saved;
      if (
        typeof window !== "undefined" &&
        window.matchMedia?.("(prefers-color-scheme: dark)").matches
      ) {
        return "dark";
      }
    } catch {
      // Ignore storage access restrictions
    }
    return "light";
  });

  const [showGrid, setShowGrid] = useState(false);
  const [inspectedConcept, setInspectedConcept] = useState<LogoConcept | null>(null);
  const [studioOpen, setStudioOpen] = useState(false);
  const [studioInitialSource, setStudioInitialSource] = useState<{
    dataUrl: string;
    base64: string;
    label: string;
  } | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const isDark = theme === "dark";

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // Ignore storage access restrictions
    }
  }, [lang]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage access restrictions
    }
  }, [theme, isDark]);

  const copy = UI_COPY[lang];
  const refUi = REFINEMENT_UI[lang];

  const handleExportPrimaryComparisonPng = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      await downloadRefinementComparisonPng(lang);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportOriginalPng = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      await downloadBoardAsPng(lang);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportOriginalSvg = () => {
    const svg = buildFullBoardSvg(lang);
    downloadSvgFile(`EdgeNet-Logo-Exploration-Board-16x9-${lang}.svg`, svg);
  };

  const handleSendToStudio = (dataUrl: string, base64: string, label: string) => {
    setInspectedConcept(null);
    setStudioInitialSource({ dataUrl, base64, label });
    setStudioOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#E8EEF4]/60 dark:bg-[#091220] text-[#101E35] dark:text-[#E8EEF4] flex flex-col transition-colors duration-200">
      {/* Top Bar Contract: 3 clean single-row zones */}
      <header className="w-full bg-white dark:bg-[#101E35] border-b border-[#E8EEF4] dark:border-[#1E2F4A] sticky top-0 z-30 transition-colors duration-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 md:gap-8">
          {/* Zone 1: Brand Title */}
          <a
            href="#refinement"
            className="font-display text-base font-semibold tracking-tight text-[#101E35] dark:text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#147DAB] rounded"
          >
            {BRAND_INFO.presentingCompany}
          </a>

          {/* Zone 2: Clean Navigation, Controls, Theme & Bilingual Switcher */}
          <nav
            aria-label={copy.navAria}
            className="flex items-center gap-4 md:gap-6 text-sm font-medium text-[#303B49] dark:text-[#A8B8CD] overflow-x-auto"
          >
            <a
              href="#refinement"
              className="py-1 border-b-2 border-transparent hover:text-[#101E35] dark:hover:text-white hover:border-[#147DAB] transition-colors whitespace-nowrap shrink-0"
            >
              {refUi.navRefinement}
            </a>

            <a
              href="#exploration"
              className="py-1 border-b-2 border-transparent hover:text-[#101E35] dark:hover:text-white hover:border-[#147DAB] transition-colors whitespace-nowrap shrink-0"
            >
              {refUi.navOriginal}
            </a>

            <button
              type="button"
              onClick={() => setShowGrid((prev) => !prev)}
              aria-pressed={showGrid}
              className={`inline-flex items-center gap-1.5 py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#147DAB] ${
                showGrid
                  ? "border-[#147DAB] text-[#101E35] dark:text-white"
                  : "border-transparent hover:text-[#101E35] dark:hover:text-white"
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              {copy.constructionGrid}
            </button>

            <button
              type="button"
              onClick={() => {
                setStudioInitialSource(null);
                setStudioOpen(true);
              }}
              className="inline-flex items-center gap-1.5 py-1 border-b-2 border-transparent hover:text-[#101E35] dark:hover:text-white transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#147DAB]"
            >
              <ImageIcon className="w-3.5 h-3.5 text-[#147DAB] dark:text-[#4AB0DA]" />
              {copy.imageStudio}
            </button>

            {/* Light / Dark Mode Switcher */}
            <div
              role="group"
              aria-label={lang === "ko" ? "테마 모드 선택" : "Color Theme Selection"}
              className="inline-flex items-center gap-0.5 p-0.5 bg-[#F4F7FA] dark:bg-[#16253E] border border-[#E8EEF4] dark:border-[#243858] rounded-md shrink-0"
            >
              <button
                type="button"
                onClick={() => setTheme("light")}
                aria-pressed={!isDark}
                aria-label={lang === "ko" ? "라이트 모드" : "Light Mode"}
                className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#147DAB] ${
                  !isDark
                    ? "bg-white text-[#101E35] shadow-xs"
                    : "text-[#A8B8CD] hover:text-white"
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">{lang === "ko" ? "라이트" : "Light"}</span>
              </button>
              <button
                type="button"
                onClick={() => setTheme("dark")}
                aria-pressed={isDark}
                aria-label={lang === "ko" ? "다크 모드" : "Dark Mode"}
                className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#147DAB] ${
                  isDark
                    ? "bg-[#101E35] text-white shadow-xs ring-1 ring-white/15"
                    : "text-[#303B49] hover:text-[#101E35]"
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">{lang === "ko" ? "다크" : "Dark"}</span>
              </button>
            </div>

            {/* Segmented Language Switcher (EN / 한국어) */}
            <div
              role="group"
              aria-label={copy.langAria}
              className="inline-flex items-center gap-0.5 p-0.5 bg-[#F4F7FA] dark:bg-[#16253E] border border-[#E8EEF4] dark:border-[#243858] rounded-md shrink-0"
            >
              <Globe
                className="w-3.5 h-3.5 text-[#303B49] dark:text-[#A8B8CD] ml-1.5 mr-1 shrink-0 hidden sm:block"
                aria-hidden="true"
              />
              <button
                type="button"
                onClick={() => setLang("en")}
                aria-pressed={lang === "en"}
                className={`px-2 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#147DAB] ${
                  lang === "en"
                    ? "bg-white dark:bg-[#101E35] text-[#101E35] dark:text-white shadow-xs"
                    : "text-[#303B49] dark:text-[#A8B8CD] hover:text-[#101E35] dark:hover:text-white"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang("ko")}
                aria-pressed={lang === "ko"}
                className={`px-2 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#147DAB] ${
                  lang === "ko"
                    ? "bg-white dark:bg-[#101E35] text-[#101E35] dark:text-white shadow-xs"
                    : "text-[#303B49] dark:text-[#A8B8CD] hover:text-[#101E35] dark:hover:text-white"
                }`}
              >
                한국어
              </button>
            </div>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handleExportPrimaryComparisonPng}
              disabled={isExporting}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#101E35] dark:bg-[#147DAB] hover:bg-[#147DAB] dark:hover:bg-[#1B92C7] disabled:opacity-60 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#147DAB]"
            >
              <Download className="w-3.5 h-3.5" />
              {isExporting ? copy.exporting : copy.exportPng}
            </button>
          </div>
        </div>
      </header>

      {/* Main Presentation Container */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 space-y-14">
        {/* NEW SECTION: Unified Frame Refinement (Versions A, B, C + Validation + 3D Rack + Editable SVG Deliverables) */}
        <UnifiedFrameRefinementSection
          lang={lang}
          isDark={isDark}
          showGrid={showGrid}
          onSendToStudio={handleSendToStudio}
        />

        {/* PRESERVED SECTION: Original 3-Concept Exploration Board */}
        <section
          id="exploration"
          aria-label={copy.boardAria}
          className="w-full space-y-4 pt-6 border-t border-[#D8E2EC] dark:border-[#1E2F4A]"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-[#303B49] dark:text-[#A8B8CD]">
                {BRAND_INFO.presentingCompany}
              </div>
              <h2 className="font-display text-lg font-semibold text-[#101E35] dark:text-white mt-0.5">
                {BRAND_INFO.boardTitle[lang]}
              </h2>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleExportOriginalSvg}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#101E35] dark:text-[#E8EEF4] bg-white dark:bg-[#101D32] border border-[#D8E2EC] dark:border-[#243858] hover:border-[#147DAB] rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <Download className="w-3.5 h-3.5 text-[#147DAB]" />
                {copy.boardSvg}
              </button>
              <button
                type="button"
                onClick={handleExportOriginalPng}
                disabled={isExporting}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#101E35] dark:bg-[#147DAB] hover:bg-[#147DAB] dark:hover:bg-[#1B92C7] disabled:opacity-60 rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <Download className="w-3.5 h-3.5" />
                {copy.exportPng}
              </button>
            </div>
          </div>

          <div className="w-full bg-white dark:bg-[#0F1B2E] border border-[#D8E2EC] dark:border-[#213350] shadow-[0_20px_60px_-24px_rgba(16,30,53,0.16)] rounded-sm overflow-hidden flex flex-col lg:aspect-[16/9] transition-colors duration-200">
            {/* Board Header Strip */}
            <div className="px-6 lg:px-10 py-4 bg-[#F8FAFC] dark:bg-[#0C1626] border-b border-[#E8EEF4] dark:border-[#1E2F4A] flex flex-wrap items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <span className="font-display text-base lg:text-lg font-semibold tracking-tight text-[#101E35] dark:text-white">
                  {BRAND_INFO.boardTitle[lang]}
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#303B49] dark:text-[#A8B8CD]">
                <span className="font-medium text-[#101E35] dark:text-white">
                  {BRAND_INFO.presentingCompany}
                </span>
                <span className="text-[#303B49]/40 dark:text-white/25" aria-hidden="true">
                  ·
                </span>
                <span>{BRAND_INFO.descriptor[lang]}</span>
              </div>
            </div>

            {/* Three Equally Sized Vertical Concept Columns */}
            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[#E8EEF4] dark:divide-[#1E2F4A]">
              {LOGO_CONCEPTS.map((concept) => {
                const localized = concept[lang];
                return (
                  <article
                    key={concept.id}
                    className="p-6 lg:px-8 lg:py-6 flex flex-col justify-between gap-4 bg-white dark:bg-[#0F1B2E] group transition-colors duration-200"
                  >
                    {/* 1. Concept Number & Name */}
                    <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#E8EEF4] dark:border-[#1E2F4A]">
                      <h3 className="font-display text-xs font-semibold tracking-[0.1em] uppercase text-[#147DAB] dark:text-[#4AB0DA]">
                        {localized.fullTitle}
                      </h3>
                      <button
                        type="button"
                        onClick={() => setInspectedConcept(concept)}
                        aria-label={`${copy.inspect} ${localized.fullTitle}`}
                        className="inline-flex items-center gap-1 text-[11px] font-medium text-[#303B49] dark:text-[#A8B8CD] hover:text-[#147DAB] dark:hover:text-white transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#147DAB] rounded px-1.5 py-0.5"
                      >
                        <Maximize2 className="w-3 h-3" />
                        {copy.inspect}
                      </button>
                    </div>

                    {/* 2. Large Primary Logo Symbol + 3. EdgeNet Wordmark Lockup */}
                    <div
                      onClick={() => setInspectedConcept(concept)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setInspectedConcept(concept);
                        }
                      }}
                      aria-label={`${copy.inspect} ${localized.name}`}
                      className="flex-1 min-h-[190px] bg-[#F8FAFC] dark:bg-[#14233B] border border-[#E8EEF4] dark:border-[#223554] group-hover:border-[#147DAB]/50 rounded-md px-5 py-5 flex flex-col items-center justify-center gap-4 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#147DAB]"
                    >
                      <ConceptSymbol
                        conceptId={concept.id}
                        variant={isDark ? "dark" : "color"}
                        showGrid={showGrid}
                        className="w-[116px] h-[116px] xl:w-[132px] xl:h-[132px]"
                      />

                      <div className="flex items-center gap-3 pt-3 border-t border-[#E8EEF4]/90 dark:border-[#223554]">
                        <ConceptSymbol
                          conceptId={concept.id}
                          variant={isDark ? "dark" : "color"}
                          size={26}
                        />
                        <EdgeNetWordmark dark={isDark} size="md" />
                      </div>
                    </div>

                    {/* 4. Short Strategic Meaning */}
                    <p className="text-[13px] leading-[1.6] text-[#303B49] dark:text-[#B5C4D6]">
                      {localized.strategicMeaning}
                    </p>

                    {/* 5. Small Monochrome Variation & 6. Small Dark-Background Application Preview */}
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="bg-[#F7F9FC] border border-[#E8EEF4] rounded-md px-3.5 py-3 flex flex-col justify-between gap-2.5">
                        <span className="text-[10px] font-display font-semibold uppercase tracking-[0.09em] text-[#303B49]">
                          {copy.monochrome}
                        </span>
                        <div className="flex items-center gap-2 py-1">
                          <ConceptSymbol
                            conceptId={concept.id}
                            variant="monochrome"
                            size={24}
                          />
                          <EdgeNetWordmark size="sm" />
                        </div>
                      </div>

                      <div className="bg-[#101E35] dark:bg-[#08101E] border border-[#101E35] dark:border-[#1E2F4A] rounded-md px-3.5 py-3 flex flex-col justify-between gap-2.5 relative overflow-hidden">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-display font-semibold uppercase tracking-[0.09em] text-[#9FB0C4]">
                            {copy.darkSurface}
                          </span>
                          <span
                            className="w-3 h-[2px] bg-[#3F8F6B]"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="flex items-center gap-2 py-1">
                          <ConceptSymbol
                            conceptId={concept.id}
                            variant="dark"
                            size={24}
                          />
                          <EdgeNetWordmark dark size="sm" />
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Restrained Dark Navy Footer Area */}
            <footer className="bg-[#101E35] dark:bg-[#091221] text-white px-6 lg:px-10 py-4 border-t border-[#1C2E4B] shrink-0">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div className="space-y-0.5 shrink-0">
                  <div className="font-display text-sm font-semibold tracking-tight text-white">
                    {BRAND_INFO.presentingCompany}
                  </div>
                  <div className="text-xs text-[#B5C4D6]">
                    {BRAND_INFO.descriptor[lang]}
                  </div>
                </div>

                <div
                  aria-label={copy.paletteAria}
                  className="flex flex-wrap items-center gap-4 lg:gap-5"
                >
                  {BRAND_COLORS.map((swatch) => (
                    <div key={swatch.hex} className="flex items-center gap-2">
                      <span
                        className={`w-5 h-5 rounded-[3px] shrink-0 ${
                          swatch.hex === "#101E35"
                            ? "border border-[#303B49]"
                            : swatch.isLight
                            ? "border border-[#303B49]/40"
                            : ""
                        }`}
                        style={{ backgroundColor: swatch.hex }}
                        aria-hidden="true"
                      />
                      <div className="leading-tight">
                        <div className="font-mono text-[11px] text-[#E8EEF4] tabular-nums">
                          {swatch.hex}
                        </div>
                        <div className="text-[10px] text-[#9FB0C4]">
                          {swatch.name[lang]}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-xs text-[#9FB0C4] lg:text-right shrink-0">
                  {BRAND_INFO.boardNote[lang]}
                </div>
              </div>
            </footer>
          </div>
        </section>
      </main>

      {/* Concept Inspection & Vector Download Modal */}
      <ConceptInspectorModal
        concept={inspectedConcept}
        lang={lang}
        isDark={isDark}
        onClose={() => setInspectedConcept(null)}
        onSendToStudio={handleSendToStudio}
      />

      {/* Gemini Nano Banana 2.1 Create & Edit Image Studio Modal */}
      <ImageStudioModal
        isOpen={studioOpen}
        lang={lang}
        onClose={() => setStudioOpen(false)}
        initialSourceImage={studioInitialSource}
      />
    </div>
  );
}
