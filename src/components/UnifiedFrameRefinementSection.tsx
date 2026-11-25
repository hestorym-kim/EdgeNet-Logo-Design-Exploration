import React, { useState } from "react";
import { Download, Sparkles } from "lucide-react";
import { BRAND_COLORS, BRAND_INFO, Language } from "../data/concepts";
import {
  REFINEMENT_SPECS,
  REFINEMENT_UI,
  RefinementId,
} from "../data/refinements";
import { EdgeNetWordmark } from "./EdgeNetLogos";
import { RefinedConceptSymbol } from "./RefinedUnifiedFrameLogos";
import { downloadSvgFile, svgStringToPngBase64 } from "../utils/exportBoard";
import {
  buildRefinementComparisonSvg,
  buildStandaloneRefinedSvg,
  downloadRefinementComparisonPng,
  ORIGINAL_UNIFIED_FRAME_SVG,
} from "../utils/exportRefinementBoard";

interface UnifiedFrameRefinementSectionProps {
  lang: Language;
  showGrid: boolean;
  onSendToStudio: (dataUrl: string, base64: string, label: string) => void;
}

export const UnifiedFrameRefinementSection: React.FC<
  UnifiedFrameRefinementSectionProps
> = ({ lang, showGrid, onSendToStudio }) => {
  const ui = REFINEMENT_UI[lang];
  const [isExportingBoard, setIsExportingBoard] = useState(false);

  const handleExportComparisonPng = async () => {
    if (isExportingBoard) return;
    setIsExportingBoard(true);
    try {
      await downloadRefinementComparisonPng(lang);
    } finally {
      setIsExportingBoard(false);
    }
  };

  const handleExportComparisonSvg = () => {
    const svg = buildRefinementComparisonSvg(lang);
    downloadSvgFile(`edgenet-unified-frame-comparison-board-16x9-${lang}.svg`, svg);
  };

  const handleDownloadRefinedAsset = (
    id: RefinementId,
    filenameBase: string,
    variant: "color" | "monochrome"
  ) => {
    const svg = buildStandaloneRefinedSvg(id, variant);
    const filename =
      variant === "color"
        ? `${filenameBase}.svg`
        : `${filenameBase}-monochrome.svg`;
    downloadSvgFile(filename, svg);
  };

  const handleOpenRefinedInStudio = async (id: RefinementId, label: string) => {
    const svg = buildStandaloneRefinedSvg(id, "color");
    const { dataUrl, base64 } = await svgStringToPngBase64(svg, 1024, 1024);
    onSendToStudio(dataUrl, base64, label);
  };

  return (
    <section
      id="refinement"
      aria-labelledby="refinement-section-title"
      className="w-full space-y-6"
    >
      {/* Section Header + Unchanged Original SVG Reference */}
      <div className="bg-white border border-[#D8E2EC] rounded-sm p-6 lg:px-8 lg:py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-2xl">
          <div className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-[#147DAB]">
            {ui.sectionKicker}
          </div>
          <h2
            id="refinement-section-title"
            className="font-display text-2xl font-semibold tracking-tight text-[#101E35]"
          >
            {ui.sectionTitle}
          </h2>
          <p className="text-sm leading-relaxed text-[#303B49]">
            {ui.sectionLead}
          </p>
        </div>

        {/* Unchanged Reference SVG Card + Board Export Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
          <div className="flex items-center gap-3.5 px-4 py-3 bg-[#F8FAFC] border border-[#E8EEF4] rounded-md">
            <div className="w-12 h-12 bg-white border border-[#E8EEF4] rounded flex items-center justify-center shrink-0 p-1">
              <img
                src="/assets/aistudio/edgenet-unified-frame-color_8d06e926.svg"
                alt={ui.originalRefTitle}
                referrerPolicy="no-referrer"
                className="w-10 h-10 object-contain"
              />
            </div>
            <div className="min-w-0">
              <div className="font-display text-xs font-semibold text-[#101E35]">
                {ui.originalRefTitle}
              </div>
              <div className="text-[11px] text-[#303B49] mt-0.5">
                {ui.originalRefSubtitle}
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                downloadSvgFile(
                  "edgenet-unified-frame-original-reference.svg",
                  ORIGINAL_UNIFIED_FRAME_SVG
                )
              }
              className="ml-2 inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-[#101E35] bg-white border border-[#E8EEF4] hover:border-[#147DAB] rounded transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#147DAB]"
            >
              <Download className="w-3 h-3 text-[#147DAB]" />
              {ui.downloadOriginalSvg}
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleExportComparisonPng}
              disabled={isExportingBoard}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#101E35] hover:bg-[#147DAB] disabled:opacity-60 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#147DAB]"
            >
              <Download className="w-3.5 h-3.5" />
              {ui.exportComparisonPng}
            </button>
            <button
              type="button"
              onClick={handleExportComparisonSvg}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium text-[#101E35] bg-white border border-[#D8E2EC] hover:border-[#147DAB] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#147DAB]"
            >
              <Download className="w-3.5 h-3.5 text-[#147DAB]" />
              {ui.exportComparisonSvg}
            </button>
          </div>
        </div>
      </div>

      {/* 16:9 Landscape Comparison Board */}
      <div
        aria-label={ui.boardHeading}
        className="w-full bg-white border border-[#D8E2EC] shadow-[0_20px_60px_-24px_rgba(16,30,53,0.16)] rounded-sm overflow-hidden flex flex-col lg:aspect-[16/9]"
      >
        {/* Board Header Strip */}
        <div className="px-6 lg:px-10 py-3.5 bg-[#F8FAFC] border-b border-[#E8EEF4] flex flex-wrap items-center justify-between gap-4 shrink-0">
          <h3 className="font-display text-base lg:text-lg font-semibold tracking-tight text-[#101E35]">
            {ui.boardHeading}
          </h3>
          <div className="flex items-center gap-2.5 text-xs text-[#303B49]">
            <span className="font-medium text-[#101E35]">
              {BRAND_INFO.presentingCompany}
            </span>
            <span className="text-[#303B49]/40" aria-hidden="true">
              ·
            </span>
            <span>{BRAND_INFO.descriptor[lang]}</span>
          </div>
        </div>

        {/* Three Side-by-Side Refinement Columns */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-[#E8EEF4]">
          {REFINEMENT_SPECS.map((spec) => {
            const loc = spec[lang];
            return (
              <article
                key={spec.id}
                className="p-5 lg:px-7 lg:py-5 flex flex-col justify-between gap-3 bg-white"
              >
                {/* Version Title */}
                <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#E8EEF4]">
                  <h4 className="font-display text-xs font-semibold tracking-[0.1em] uppercase text-[#147DAB]">
                    {loc.fullTitle}
                  </h4>
                  <span className="text-[11px] text-[#303B49] truncate">
                    {loc.subtitle}
                  </span>
                </div>

                {/* Large Primary Symbol + Wordmark Lockup */}
                <div className="bg-[#F8FAFC] border border-[#E8EEF4] rounded-md px-4 py-4 flex flex-col items-center justify-center gap-3">
                  <RefinedConceptSymbol
                    refinementId={spec.id}
                    variant="color"
                    showGrid={showGrid}
                    className="w-[100px] h-[100px] xl:w-[116px] xl:h-[116px]"
                  />
                  <div className="flex items-center gap-2.5 pt-2.5 border-t border-[#E8EEF4]">
                    <RefinedConceptSymbol
                      refinementId={spec.id}
                      variant="color"
                      size={24}
                    />
                    <EdgeNetWordmark size="md" />
                  </div>
                </div>

                {/* Design Rationale */}
                <div className="space-y-1">
                  <div className="font-display text-[10px] font-semibold uppercase tracking-[0.09em] text-[#101E35]">
                    {ui.rationaleLabel}
                  </div>
                  <p className="text-[12.5px] leading-[1.5] text-[#303B49]">
                    {loc.designRationale}
                  </p>
                </div>

                {/* Main Geometry Improvements */}
                <div className="space-y-1">
                  <div className="font-display text-[10px] font-semibold uppercase tracking-[0.09em] text-[#101E35]">
                    {ui.improvementsLabel}
                  </div>
                  <ul className="space-y-1 text-[12px] text-[#303B49]">
                    {loc.geometryImprovements.map((imp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="font-mono text-[10px] text-[#147DAB] mt-0.5 tabular-nums">
                          0{i + 1}
                        </span>
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Monochrome + Small Size & Dark Background Previews */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <div className="bg-[#F7F9FC] border border-[#E8EEF4] rounded-md px-3 py-2.5 flex flex-col justify-between gap-2">
                    <span className="text-[10px] font-display font-semibold uppercase tracking-[0.09em] text-[#303B49]">
                      {ui.monochromeLabel}
                    </span>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <RefinedConceptSymbol
                          refinementId={spec.id}
                          variant="monochrome"
                          size={22}
                        />
                        <EdgeNetWordmark size="sm" />
                      </div>
                      <div className="flex items-center gap-1.5" title="16px / 24px">
                        <RefinedConceptSymbol
                          refinementId={spec.id}
                          variant="monochrome"
                          size={16}
                        />
                        <RefinedConceptSymbol
                          refinementId={spec.id}
                          variant="monochrome"
                          size={24}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#101E35] rounded-md px-3 py-2.5 flex flex-col justify-between gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-display font-semibold uppercase tracking-[0.09em] text-[#9FB0C4]">
                        {ui.darkSurfaceLabel}
                      </span>
                      <span className="w-3 h-[2px] bg-[#3F8F6B]" aria-hidden="true" />
                    </div>
                    <div className="flex items-center gap-2">
                      <RefinedConceptSymbol
                        refinementId={spec.id}
                        variant="dark"
                        size={22}
                      />
                      <EdgeNetWordmark dark size="sm" />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Restrained Dark Navy Footer */}
        <footer className="bg-[#101E35] text-white px-6 lg:px-10 py-3.5 border-t border-[#1C2E4B] shrink-0">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-0.5 shrink-0">
              <div className="font-display text-sm font-semibold tracking-tight text-white">
                {BRAND_INFO.presentingCompany}
              </div>
              <div className="text-xs text-[#B5C4D6]">
                {BRAND_INFO.descriptor[lang]}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {BRAND_COLORS.map((swatch) => (
                <div key={swatch.hex} className="flex items-center gap-2">
                  <span
                    className={`w-4 h-4 rounded-[3px] shrink-0 ${
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
                    <div className="font-mono text-[10.5px] text-[#E8EEF4] tabular-nums">
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

      {/* Design Validation Matrix: 16px/24px/36px, Hardware Engraving & Vector Deliverables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {REFINEMENT_SPECS.map((spec) => {
          const loc = spec[lang];
          return (
            <div
              key={spec.id}
              className="bg-white border border-[#D8E2EC] rounded-sm p-5 space-y-5 flex flex-col justify-between"
            >
              {/* Small-size 16px, 24px, 36px Icon Application */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-display text-xs font-semibold text-[#101E35]">
                    {loc.versionTag} · {ui.smallScaleLabel}
                  </span>
                  <span className="font-mono text-[11px] text-[#303B49] tabular-nums">
                    16 · 24 · 36 px
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[16, 24, 36].map((px) => (
                    <div
                      key={px}
                      className="bg-[#F8FAFC] border border-[#E8EEF4] rounded py-3 flex flex-col items-center justify-center gap-2"
                    >
                      <div className="h-10 flex items-center justify-center">
                        <RefinedConceptSymbol
                          refinementId={spec.id}
                          variant="color"
                          size={px}
                        />
                      </div>
                      <span className="font-mono text-[10px] text-[#303B49] tabular-nums">
                        {px}px
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Physical Hardware Engraving Preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-display text-xs font-semibold text-[#101E35]">
                    {ui.engravingLabel}
                  </span>
                  <span className="text-[11px] text-[#303B49]">
                    {ui.engravingSpec}
                  </span>
                </div>
                <div
                  className="rounded-md px-5 py-4 border border-[#303B49] flex items-center justify-between"
                  style={{
                    background:
                      "linear-gradient(135deg, #25303F 0%, #1B2432 52%, #131B27 100%)",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <RefinedConceptSymbol
                      refinementId={spec.id}
                      variant="engraved"
                      size={38}
                    />
                    <div>
                      <span className="font-display text-lg font-semibold tracking-[-0.02em] text-[#D2DCE6] select-none">
                        EdgeNet
                      </span>
                      <div className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-[#8A9BB0]">
                        NODE-X4 · UNIFRAME
                      </div>
                    </div>
                  </div>
                  <div className="font-mono text-[10px] text-[#8A9BB0] tabular-nums">
                    REV 03.{spec.letter}
                  </div>
                </div>
              </div>

              {/* Editable Vector SVG Downloads & Studio Trigger */}
              <div className="pt-3 border-t border-[#E8EEF4] space-y-2.5">
                <div className="font-mono text-[11px] text-[#303B49] truncate">
                  {spec.filenameBase}.svg
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      handleDownloadRefinedAsset(
                        spec.id,
                        spec.filenameBase,
                        "color"
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#101E35] bg-[#F8FAFC] border border-[#E8EEF4] hover:border-[#147DAB] rounded transition-colors whitespace-nowrap shrink-0"
                  >
                    <Download className="w-3.5 h-3.5 text-[#147DAB]" />
                    {ui.downloadColor}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleDownloadRefinedAsset(
                        spec.id,
                        spec.filenameBase,
                        "monochrome"
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#101E35] bg-[#F8FAFC] border border-[#E8EEF4] hover:border-[#101E35] rounded transition-colors whitespace-nowrap shrink-0"
                  >
                    <Download className="w-3.5 h-3.5 text-[#303B49]" />
                    {ui.downloadMono}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleOpenRefinedInStudio(spec.id, loc.fullTitle)
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-[#101E35] hover:bg-[#147DAB] rounded transition-colors whitespace-nowrap shrink-0 ml-auto"
                  >
                    <Sparkles className="w-3 h-3" />
                    {ui.mockupBtn}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Summary (Strengths & Trade-offs — No Winner Declared) */}
      <div className="bg-white border border-[#D8E2EC] rounded-sm p-6 lg:px-8 lg:py-6 space-y-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 pb-4 border-b border-[#E8EEF4]">
          <div>
            <h3 className="font-display text-base font-semibold text-[#101E35]">
              {ui.summaryTitle}
            </h3>
            <p className="text-xs text-[#303B49] mt-1">{ui.summaryNote}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REFINEMENT_SPECS.map((spec) => {
            const loc = spec[lang];
            return (
              <div key={spec.id} className="space-y-3">
                <div className="font-display text-xs font-semibold text-[#147DAB] uppercase tracking-[0.08em]">
                  {loc.fullTitle}
                </div>
                <div className="space-y-1">
                  <div className="text-[11px] font-semibold text-[#101E35]">
                    {ui.strengthsLabel}
                  </div>
                  <p className="text-xs leading-relaxed text-[#303B49]">
                    {loc.strengths}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="text-[11px] font-semibold text-[#101E35]">
                    {ui.tradeOffsLabel}
                  </div>
                  <p className="text-xs leading-relaxed text-[#303B49]">
                    {loc.tradeOffs}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
