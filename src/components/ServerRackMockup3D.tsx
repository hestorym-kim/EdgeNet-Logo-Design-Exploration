import React, { useState } from "react";
import { Language } from "../data/concepts";
import { REFINEMENT_SPECS, REFINEMENT_UI, RefinementId } from "../data/refinements";
import { RefinedConceptSymbol } from "./RefinedUnifiedFrameLogos";
import { RackFinish, RackFinishSwitcher } from "./RackFinishSwitcher";

type RackAngle = "iso" | "front" | "bevel";

interface ServerRackMockup3DProps {
  lang: Language;
}

export const ServerRackMockup3D: React.FC<ServerRackMockup3DProps> = ({ lang }) => {
  const ui = REFINEMENT_UI[lang];
  const [selectedId, setSelectedId] = useState<RefinementId>("minimal");
  const [rackFinish, setRackFinish] = useState<RackFinish>("rack-metal-brushed-black");
  const [angle, setAngle] = useState<RackAngle>("iso");

  const activeSpec =
    REFINEMENT_SPECS.find((item) => item.id === selectedId) ?? REFINEMENT_SPECS[2];
  const activeLoc = activeSpec[lang];

  const angleClass =
    angle === "iso"
      ? "rack-angle-iso"
      : angle === "front"
      ? "rack-angle-front"
      : "rack-angle-bevel";

  const depthClass =
    rackFinish === "rack-metal-brushed-black"
      ? "rack-depth-edge-black"
      : rackFinish === "rack-metal-titanium"
      ? "rack-depth-edge-titanium"
      : "rack-depth-edge-slate";

  const engravedFilterClass =
    rackFinish === "rack-metal-brushed-black"
      ? "rack-engraved-brushed-black"
      : rackFinish === "rack-metal-titanium"
      ? "rack-engraved-titanium"
      : "rack-engraved-slate";

  const isLightMetal = rackFinish === "rack-metal-titanium";
  const isBrushedBlack = rackFinish === "rack-metal-brushed-black";

  return (
    <div className="bg-white dark:bg-[#101D32] border border-[#D8E2EC] dark:border-[#213350] rounded-sm overflow-hidden transition-colors duration-200">
      {/* Control Header */}
      <div className="px-6 lg:px-8 py-4 bg-[#F8FAFC] dark:bg-[#0D182A] border-b border-[#E8EEF4] dark:border-[#1E2F4A] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-base font-semibold text-[#101E35] dark:text-white">
            {ui.rack3dTitle}
          </h3>
          <p className="text-xs text-[#303B49] dark:text-[#A8B8CD] mt-0.5">
            {ui.rack3dSubtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Refinement Version Selector */}
          <div
            role="group"
            aria-label="Logo Refinement Version"
            className="inline-flex items-center gap-1 p-1 bg-[#E8EEF4]/70 dark:bg-[#16253E] rounded-lg"
          >
            {REFINEMENT_SPECS.map((spec) => (
              <button
                key={spec.id}
                type="button"
                onClick={() => setSelectedId(spec.id)}
                aria-pressed={selectedId === spec.id}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#147DAB] ${
                  selectedId === spec.id
                    ? "bg-white dark:bg-[#101E35] text-[#101E35] dark:text-white shadow-xs"
                    : "text-[#303B49] dark:text-[#A8B8CD] hover:text-[#101E35] dark:hover:text-white"
                }`}
              >
                {spec[lang].versionTag}
              </button>
            ))}
          </div>

          {/* Brushed Metal Finish Switcher */}
          <RackFinishSwitcher
            rackFinish={rackFinish}
            onChange={setRackFinish}
            lang={lang}
          />

          {/* 3D Angle Selector */}
          <div
            role="group"
            aria-label="3D Viewing Angle"
            className="inline-flex items-center gap-1 p-1 bg-[#E8EEF4]/70 dark:bg-[#16253E] rounded-lg"
          >
            {(
              [
                { key: "iso", label: ui.rackAngleIso },
                { key: "front", label: ui.rackAngleFront },
                { key: "bevel", label: ui.rackAngleBevel },
              ] as const
            ).map((opt) => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setAngle(opt.key)}
                aria-pressed={angle === opt.key}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#147DAB] ${
                  angle === opt.key
                    ? "bg-white dark:bg-[#101E35] text-[#101E35] dark:text-white shadow-xs"
                    : "text-[#303B49] dark:text-[#A8B8CD] hover:text-[#101E35] dark:hover:text-white"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3D Perspective Stage with Hover Tilt & Specular Light-Glint */}
      <div className="rack-3d-stage rack-hover-target px-6 sm:px-10 py-12 lg:py-16 flex flex-col items-center justify-center overflow-hidden">
        <div className={`rack-3d-chassis w-full max-w-[920px] relative ${angleClass}`}>
          {/* Main 2U Brushed Metal Server Rack Faceplate */}
          <div
            className={`rack-faceplate relative rounded-[4px] border overflow-hidden ${rackFinish} ${
              isBrushedBlack
                ? "border-[#4A5362]/85"
                : isLightMetal
                ? "border-[#E6ECF2]/70"
                : "border-[#3C4A5E]/80"
            }`}
          >
            {/* Fine Brushed Metal CSS Filter Grain Overlay */}
            <div
              className="rack-brushed-grain absolute inset-0 pointer-events-none"
              aria-hidden="true"
            />

            {/* Diagonal Specular Light-Glint Sweep on Hover */}
            <div
              className="rack-light-glint absolute inset-0 pointer-events-none z-20"
              aria-hidden="true"
            />

            {/* Machined Faceplate Layout */}
            <div className="relative z-10 grid grid-cols-12 items-stretch min-h-[196px] sm:min-h-[216px]">
              {/* Left Rack Mounting Ear + Hex Fasteners */}
              <div
                className={`col-span-1 border-r flex flex-col items-center justify-between py-5 px-2 transition-colors duration-300 ${
                  isLightMetal
                    ? "border-[#7F8C9B]/45 bg-[#101E35]/[0.06]"
                    : isBrushedBlack
                    ? "border-[#38414E]/80 bg-black/35"
                    : "border-black/55 bg-black/30"
                }`}
              >
                <span className="rack-bolt w-3.5 h-3.5 rounded-full block" />
                <div
                  className={`w-1.5 h-10 rounded-full ${
                    isLightMetal
                      ? "bg-[#303B49]/30"
                      : isBrushedBlack
                      ? "bg-[#050608] ring-1 ring-white/10"
                      : "bg-black/60"
                  }`}
                />
                <span className="rack-bolt w-3.5 h-3.5 rounded-full block" />
              </div>

              {/* Center Primary Engraved EdgeNet Identity Bay */}
              <div className="col-span-10 px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                {/* Laser-Engraved Logo & Wordmark */}
                <div className={`flex items-center gap-5 ${engravedFilterClass}`}>
                  <RefinedConceptSymbol
                    refinementId={selectedId}
                    variant={isLightMetal ? "monochrome" : "engraved"}
                    size={78}
                  />
                  <div>
                    <div
                      className={`font-display text-3xl sm:text-4xl font-semibold tracking-[-0.03em] leading-none select-none transition-colors duration-300 ${
                        isLightMetal
                          ? "text-[#172436]"
                          : isBrushedBlack
                          ? "text-[#E6EEF6]"
                          : "text-[#D4DFEA]"
                      }`}
                    >
                      EdgeNet
                    </div>
                    <div
                      className={`font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase mt-2 transition-colors duration-300 ${
                        isLightMetal
                          ? "text-[#303B49]"
                          : isBrushedBlack
                          ? "text-[#A8BACF]"
                          : "text-[#90A2B7]"
                      }`}
                    >
                      UNIFRAME · DISTRIBUTED AI NODE
                    </div>
                  </div>
                </div>

                {/* Right CNC Ventilation Louvers & Engraved Chassis Metadata */}
                <div className="flex flex-col items-end gap-3.5 shrink-0">
                  {/* Machined Airflow Louvers */}
                  <div className="grid grid-cols-6 gap-1.5" aria-hidden="true">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <span
                        key={i}
                        className={`rack-vent-slot w-2.5 h-7 rounded-[1px] transition-colors duration-300 ${
                          isLightMetal
                            ? "bg-[#1A2433]/80"
                            : isBrushedBlack
                            ? "bg-[#040507] ring-1 ring-white/10"
                            : "bg-[#06080B]"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Engraved Model & Revision Stamp */}
                  <div
                    className={`flex items-center gap-3 font-mono text-[10px] tabular-nums ${engravedFilterClass} ${
                      isLightMetal
                        ? "text-[#263345]"
                        : isBrushedBlack
                        ? "text-[#BCCBDD]"
                        : "text-[#9FB0C4]"
                    }`}
                  >
                    <span>UF-EDGE-2U</span>
                    <span aria-hidden="true">/</span>
                    <span>REV 03.{activeSpec.letter}</span>
                  </div>
                </div>
              </div>

              {/* Right Rack Mounting Ear + Hex Fasteners */}
              <div
                className={`col-span-1 border-l flex flex-col items-center justify-between py-5 px-2 transition-colors duration-300 ${
                  isLightMetal
                    ? "border-[#7F8C9B]/45 bg-[#101E35]/[0.06]"
                    : isBrushedBlack
                    ? "border-[#38414E]/80 bg-black/35"
                    : "border-black/55 bg-black/30"
                }`}
              >
                <span className="rack-bolt w-3.5 h-3.5 rounded-full block" />
                <div
                  className={`w-1.5 h-10 rounded-full ${
                    isLightMetal
                      ? "bg-[#303B49]/30"
                      : isBrushedBlack
                      ? "bg-[#050608] ring-1 ring-white/10"
                      : "bg-black/60"
                  }`}
                />
                <span className="rack-bolt w-3.5 h-3.5 rounded-full block" />
              </div>
            </div>

            {/* Subtle Machined Lower Chamfer Accent */}
            <div
              className={`h-[3px] w-full transition-colors duration-300 ${
                rackFinish === "rack-metal-brushed-black"
                  ? "bg-[#147DAB]/75"
                  : rackFinish === "rack-metal-titanium"
                  ? "bg-[#147DAB]/65"
                  : "bg-[#3F8F6B]/70"
              }`}
              aria-hidden="true"
            />
          </div>

          {/* 3D Extruded Bottom Chassis Thickness Face */}
          <div
            className={`h-3.5 mx-1 rounded-b-[3px] transition-colors duration-300 ${depthClass}`}
            aria-hidden="true"
          />
        </div>

        {/* Caption Bar Below 3D Stage */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-[#B5C4D6]">
          <span className="font-display font-medium text-white">
            {activeLoc.fullTitle}
          </span>
          <span className="text-[#9FB0C4]/50" aria-hidden="true">
            ·
          </span>
          <span className="font-mono text-[11px]">.{rackFinish}</span>
          <span className="text-[#9FB0C4]/50" aria-hidden="true">
            ·
          </span>
          <span className="font-mono text-[11px]">{ui.rackChassisSpec}</span>
        </div>
      </div>
    </div>
  );
};
