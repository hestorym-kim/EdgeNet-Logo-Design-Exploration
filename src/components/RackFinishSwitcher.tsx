import React from "react";
import { ArrowRightLeft } from "lucide-react";
import { Language } from "../data/concepts";
import { REFINEMENT_UI } from "../data/refinements";

export type RackFinish =
  | "rack-metal-brushed-black"
  | "rack-metal-titanium"
  | "rack-metal-slate";

export interface RackFinishOption {
  cssClass: RackFinish;
  swatchClass: string;
  activeBtnClass: string;
}

export const RACK_FINISH_OPTIONS: RackFinishOption[] = [
  {
    cssClass: "rack-metal-brushed-black",
    swatchClass: "bg-[#1B1E24] border border-white/25",
    activeBtnClass: "bg-[#14171D] text-white shadow-xs dark:ring-1 dark:ring-white/20",
  },
  {
    cssClass: "rack-metal-titanium",
    swatchClass: "bg-[#C3CDD7] border border-[#303B49]/30",
    activeBtnClass: "bg-white text-[#101E35] shadow-xs",
  },
  {
    cssClass: "rack-metal-slate",
    swatchClass: "bg-[#232E3E] border border-white/20",
    activeBtnClass: "bg-[#101E35] dark:bg-[#147DAB] text-white shadow-xs",
  },
];

interface RackFinishSwitcherProps {
  rackFinish: RackFinish;
  onChange: (nextFinish: RackFinish) => void;
  lang: Language;
}

export const RackFinishSwitcher: React.FC<RackFinishSwitcherProps> = ({
  rackFinish,
  onChange,
  lang,
}) => {
  const ui = REFINEMENT_UI[lang];

  const getLabel = (cssClass: RackFinish) => {
    if (cssClass === "rack-metal-brushed-black") return ui.rackFinishBlack;
    if (cssClass === "rack-metal-titanium") return ui.rackFinishTitanium;
    return ui.rackFinishSlate;
  };

  const handleCycleNext = () => {
    const currentIndex = RACK_FINISH_OPTIONS.findIndex(
      (opt) => opt.cssClass === rackFinish
    );
    const nextIndex = (currentIndex + 1) % RACK_FINISH_OPTIONS.length;
    onChange(RACK_FINISH_OPTIONS[nextIndex].cssClass);
  };

  return (
    <div className="inline-flex items-center gap-1.5">
      <div
        role="group"
        aria-label={lang === "ko" ? "메탈 마감 전환" : "Metallic Finish Switcher"}
        className="inline-flex items-center gap-1 p-1 bg-[#E8EEF4]/70 dark:bg-[#16253E] rounded-lg"
      >
        {RACK_FINISH_OPTIONS.map((opt) => {
          const isActive = rackFinish === opt.cssClass;
          return (
            <button
              key={opt.cssClass}
              type="button"
              onClick={() => onChange(opt.cssClass)}
              aria-pressed={isActive}
              title={`.${opt.cssClass}`}
              className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#147DAB] ${
                isActive
                  ? opt.activeBtnClass
                  : "text-[#303B49] dark:text-[#A8B8CD] hover:text-[#101E35] dark:hover:text-white"
              }`}
            >
              <span
                className={`w-2.5 h-2.5 rounded-[2px] shrink-0 ${opt.swatchClass}`}
                aria-hidden="true"
              />
              {getLabel(opt.cssClass)}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleCycleNext}
        aria-label={lang === "ko" ? "다음 마감으로 전환" : "Cycle to next rack finish"}
        title={lang === "ko" ? "다음 마감 비교 전환" : "Cycle next finish"}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#101E35] dark:text-[#E8EEF4] bg-white dark:bg-[#16253E] border border-[#D8E2EC] dark:border-[#2A3F61] hover:border-[#147DAB] rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#147DAB]"
      >
        <ArrowRightLeft className="w-3.5 h-3.5 text-[#147DAB]" />
        {lang === "ko" ? "마감 비교" : "Compare"}
      </button>
    </div>
  );
};
