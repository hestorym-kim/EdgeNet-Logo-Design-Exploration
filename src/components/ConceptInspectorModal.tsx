import React, { useEffect } from "react";
import { Download, X, Sparkles } from "lucide-react";
import { ConceptId, LogoConcept } from "../data/concepts";
import { ConceptSymbol, EdgeNetWordmark } from "./EdgeNetLogos";
import {
  buildStandaloneSymbolSvg,
  downloadSvgFile,
  svgStringToPngBase64,
} from "../utils/exportBoard";

interface ConceptInspectorModalProps {
  concept: LogoConcept | null;
  onClose: () => void;
  onSendToStudio: (dataUrl: string, base64: string, label: string) => void;
}

export const ConceptInspectorModal: React.FC<ConceptInspectorModalProps> = ({
  concept,
  onClose,
  onSendToStudio,
}) => {
  useEffect(() => {
    if (!concept) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [concept, onClose]);

  if (!concept) return null;

  const handleDownloadSvg = (variant: "color" | "monochrome") => {
    const svg = buildStandaloneSymbolSvg(concept.id, variant);
    downloadSvgFile(`edgenet-${concept.id}-${variant}.svg`, svg);
  };

  const handleOpenInStudio = async (id: ConceptId) => {
    const svg = buildStandaloneSymbolSvg(id, "color");
    const { dataUrl, base64 } = await svgStringToPngBase64(svg, 1024, 1024);
    onSendToStudio(dataUrl, base64, `${concept.fullTitle} (Primary Mark)`);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#101E35]/60 backdrop-blur-[2px] p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inspector-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl bg-white border border-[#E8EEF4] rounded-xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8EEF4] bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <span className="font-display text-xs font-semibold tracking-[0.12em] uppercase text-[#147DAB]">
              {concept.fullTitle}
            </span>
            <span className="text-[#303B49]/40" aria-hidden="true">·</span>
            <span className="text-xs text-[#303B49]">Scale & Engraving Inspection</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close concept inspection modal"
            className="p-2 text-[#303B49] hover:text-[#101E35] hover:bg-[#E8EEF4]/60 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#147DAB]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8">
          {/* Primary Lockup + Optical Scale Strip */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-5 bg-[#F8FAFC] border border-[#E8EEF4] rounded-lg p-6 flex flex-col items-center justify-center gap-4">
              <ConceptSymbol conceptId={concept.id} variant="color" size={136} />
              <div className="flex items-center gap-3 pt-2 border-t border-[#E8EEF4] w-full justify-center">
                <ConceptSymbol conceptId={concept.id} variant="color" size={30} />
                <EdgeNetWordmark size="md" />
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
              <div>
                <h2 id="inspector-title" className="font-display text-xl font-semibold text-[#101E35]">
                  {concept.name}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-[#303B49]">
                  {concept.designRationale}
                </p>
              </div>

              {/* Scale Legibility Matrix */}
              <div className="border border-[#E8EEF4] rounded-lg p-4 bg-white">
                <div className="text-xs font-medium text-[#303B49] mb-3">
                  Optical Scale Legibility
                </div>
                <div className="grid grid-cols-4 gap-3 items-end">
                  <div className="flex flex-col items-center gap-2 py-2 border-r border-[#E8EEF4]">
                    <div className="h-12 flex items-center justify-center">
                      <ConceptSymbol conceptId={concept.id} variant="color" size={16} />
                    </div>
                    <span className="font-mono text-[11px] text-[#303B49] tabular-nums">16px</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 py-2 border-r border-[#E8EEF4]">
                    <div className="h-12 flex items-center justify-center">
                      <ConceptSymbol conceptId={concept.id} variant="color" size={24} />
                    </div>
                    <span className="font-mono text-[11px] text-[#303B49] tabular-nums">24px</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 py-2 border-r border-[#E8EEF4]">
                    <div className="h-12 flex items-center justify-center">
                      <ConceptSymbol conceptId={concept.id} variant="color" size={36} />
                    </div>
                    <span className="font-mono text-[11px] text-[#303B49] tabular-nums">36px</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 py-2 bg-[#101E35] rounded-md">
                    <div className="h-12 flex items-center justify-center">
                      <ConceptSymbol conceptId={concept.id} variant="dark" size={36} />
                    </div>
                    <span className="font-mono text-[11px] text-[#E8EEF4] tabular-nums">Chassis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Geometry Specifications & Deployment Contexts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-[#E8EEF4]">
            <div>
              <h3 className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-[#101E35] mb-3">
                Construction Specifications
              </h3>
              <ul className="space-y-2 text-sm text-[#303B49]">
                {concept.geometrySpecs.map((spec, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="font-mono text-xs text-[#147DAB] mt-0.5 tabular-nums">
                      0{i + 1}
                    </span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display text-xs font-semibold uppercase tracking-[0.1em] text-[#101E35] mb-3">
                Primary Deployment Surfaces
              </h3>
              <ul className="space-y-2 text-sm text-[#303B49]">
                {concept.applicationContexts.map((ctx, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#3F8F6B] mt-2 shrink-0" />
                    <span>{ctx}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-[#E8EEF4] bg-[#F8FAFC]">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => handleDownloadSvg("color")}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#101E35] bg-white border border-[#E8EEF4] hover:border-[#147DAB] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#147DAB]"
            >
              <Download className="w-3.5 h-3.5 text-[#147DAB]" />
              Download Color SVG
            </button>
            <button
              type="button"
              onClick={() => handleDownloadSvg("monochrome")}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#101E35] bg-white border border-[#E8EEF4] hover:border-[#101E35] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#147DAB]"
            >
              <Download className="w-3.5 h-3.5 text-[#303B49]" />
              Download Monochrome SVG
            </button>
          </div>

          <button
            type="button"
            onClick={() => handleOpenInStudio(concept.id)}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#101E35] hover:bg-[#147DAB] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#147DAB]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Mockup in Image Studio
          </button>
        </div>
      </div>
    </div>
  );
};
