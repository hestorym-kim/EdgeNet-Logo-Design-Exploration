import React from "react";
import { ArrowRightLeft } from "lucide-react";
import { Language } from "../data/concepts";
import { REFINEMENT_UI } from "../data/refinements";

export type RackFinish = "black" | "titanium" | "slate";

export interface RackFinishOption {
  id: RackFinish;
  cssClass: "rack-metal-brushed-black" | "rack-metal-titanium" | "rack-metal-slate";
  swatchClass: string;
  activeBtnClass: string;
}

export const RACK_FINISH_OPTIONS: RackFinishOption[] = [
  {
    id: "black",
    cssClass: "rack-metal-brushed-black",
    swatchClass: "bg-[#1B1E24] border border-white/25",
    activeBtnClass: "bg-[#14171D] text-white shadow-xs",
  },
  {
    id: "titanium",
    cssClass: "rack-metal-titanium",
    swatchClass: "bg-[#C3CDD7] border border-[#303B49]/30",
    activeBtnClass: "bg-white text-[#101E35] shadow-xs",
  },
  {
    id: "slate",
    cssClass: "rack-metal-slate",
    swatchClass: "bg-[#232E3E] border border-white/20",
    activeBtnClass: "bg-[#101E35] text-white shadow-xs",
  },
];

interface RackFinishSwitcherProps {
  finish: RackFinish;
  onChange: (nextFinish: RackFinish) => void;
  lang: Language;
}

export const RackFinishSwitcher: React.FC<RackFinishSwitcherProps> = ({
  finish,
  onChange,
  lang,
}) => {
  const ui = REFINEMENT_UI[lang];

  const getLabel = (id: RackFinish) => {
    if (id === "black") return ui.rackFinishBlack;
    if (id === "titanium") return ui.rackFinishTitanium;
    return ui.rackFinishSlate;
  };

  const handleCycleNext = () => {
    const currentIndex = RACK_FINISH_OPTIONS.findIndex((opt) => opt.id === finish);
    const nextIndex = (currentIndex + 1) % RACK_FINISH_OPTIONS.length;
    onChange(RACK_FINISH_OPTIONS[nextIndex].id);
  };

  return (
    <div className="inline-flex items-center gap-1.5">
      <div
        role="group"
        aria-label={lang === "ko" ? "메탈 마감 전환" : "Metallic Finish Switcher"}
        className="inline-flex items-center gap-1 p-1 bg-[#E8EEF4]/70 rounded-lg"
      >
        {RACK_FINISH_OPTIONS.map((opt) => {
          const isActive = finish === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              aria-pressed={isActive}
              title={`.${opt.cssClass}`}
              className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#147DAB] ${
                isActive ? opt.activeBtnClass : "text-[#303B49] hover:text-[#101E35]"
              }`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-[2px] shrink-0 ${opt.swatchClass}`}
                aria-hidden="true"
              />
              {getLabel(opt.id)}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleCycleNext}
        aria-label={lang === "ko" ? "다음 마감으로 전환" : "Cycle to next rack finish"}
        title={lang === "ko" ? "다음 마감 비교 전환" : "Cycle next finish"}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#101E35] bg-white border border-[#D8E2EC] hover:border-[#147DAB] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#147DAB]"
      >
        <ArrowRightLeft className="w-3.5 h-3.5 text-[#147DAB]" />
        {lang === "ko" ? "마감 비교" : "Compare"}
      </button>
    </div>
  );
};
