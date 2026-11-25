import React from "react";
import { RefinementId } from "../data/refinements";

export type RefinedSymbolVariant = "color" | "monochrome" | "dark" | "engraved";

interface RefinedSymbolProps {
  variant?: RefinedSymbolVariant;
  showGrid?: boolean;
  className?: string;
  size?: number;
}

function getRefinedPalette(variant: RefinedSymbolVariant) {
  if (variant === "monochrome") {
    return {
      primary: "#101E35",
      accent: "#101E35",
      subtleAccent: "#101E35",
    };
  }
  if (variant === "dark") {
    return {
      primary: "#FFFFFF",
      accent: "#147DAB",
      subtleAccent: "#3F8F6B",
    };
  }
  if (variant === "engraved") {
    return {
      primary: "#D2DCE6",
      accent: "#96B7CC",
      subtleAccent: "#96B7CC",
    };
  }
  return {
    primary: "#101E35",
    accent: "#147DAB",
    subtleAccent: "#3F8F6B",
  };
}

function RefinementGridOverlay({ id }: { id: RefinementId }) {
  return (
    <g opacity={0.45} pointerEvents="none">
      <rect
        x="22"
        y="22"
        width="76"
        height="76"
        fill="none"
        stroke="#147DAB"
        strokeWidth="0.6"
        strokeDasharray="2.5 2.5"
      />
      <line x1="60" y1="10" x2="60" y2="110" stroke="#147DAB" strokeWidth="0.5" strokeDasharray="2 2" />
      <line x1="10" y1="60" x2="110" y2="60" stroke="#147DAB" strokeWidth="0.5" strokeDasharray="2 2" />
      {id === "refined" && (
        <>
          <line x1="60" y1="27" x2="93" y2="93" stroke="#3F8F6B" strokeWidth="0.65" strokeDasharray="2 2" />
          <circle cx="60" cy="27" r="7.4" fill="none" stroke="#3F8F6B" strokeWidth="0.6" />
          <circle cx="51" cy="60" r="7.4" fill="none" stroke="#3F8F6B" strokeWidth="0.6" />
          <circle cx="93" cy="93" r="7.4" fill="none" stroke="#3F8F6B" strokeWidth="0.6" />
        </>
      )}
      {id === "integrated" && (
        <>
          <line x1="60" y1="27" x2="93" y2="93" stroke="#3F8F6B" strokeWidth="0.65" strokeDasharray="2 2" />
          <line x1="32" y1="60" x2="76.5" y2="60" stroke="#3F8F6B" strokeWidth="0.65" strokeDasharray="2 2" />
          <circle cx="60" cy="27" r="7.2" fill="none" stroke="#3F8F6B" strokeWidth="0.6" />
          <circle cx="76.5" cy="60" r="7.2" fill="none" stroke="#3F8F6B" strokeWidth="0.6" />
          <circle cx="93" cy="93" r="7.2" fill="none" stroke="#3F8F6B" strokeWidth="0.6" />
        </>
      )}
      {id === "minimal" && (
        <>
          <line x1="59" y1="27.75" x2="92.25" y2="92.25" stroke="#3F8F6B" strokeWidth="0.65" strokeDasharray="2 2" />
          <rect x="22" y="22" width="11.5" height="76" fill="none" stroke="#147DAB" strokeWidth="0.5" />
          <rect x="86.5" y="22" width="11.5" height="76" fill="none" stroke="#147DAB" strokeWidth="0.5" />
        </>
      )}
    </g>
  );
}

/**
 * VERSION A — UNIFIED FRAME REFINED
 * Faithful optical & proportional refinement of the original Unified Frame SVG.
 * Uses true SVG mask clearances so transparent backgrounds remain completely clean on dark and light surfaces.
 */
export const UnifiedFrameRefinedSymbol: React.FC<RefinedSymbolProps> = ({
  variant = "color",
  showGrid = false,
  className = "",
  size,
}) => {
  const c = getRefinedPalette(variant);
  const maskId = React.useId();

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="EdgeNet Version A Unified Frame Refined Symbol"
    >
      <defs>
        <mask id={`${maskId}-frame`}>
          <rect x="0" y="0" width="120" height="120" fill="white" />
          {/* Clean optical clearances around the 3 nodes */}
          <circle cx="60" cy="27" r="7.5" fill="black" />
          <circle cx="51" cy="60" r="7.5" fill="black" />
          <circle cx="93" cy="93" r="7.5" fill="black" />
        </mask>
      </defs>

      <g mask={`url(#${maskId}-frame)`}>
        {/* Left E-Structure on strict 10u grid */}
        <rect x="22" y="22" width="10" height="76" rx="1.75" fill={c.primary} />
        <rect x="22" y="22" width="38" height="10" rx="1.75" fill={c.primary} />
        <rect x="22" y="55" width="29" height="10" rx="1.75" fill={c.primary} />
        <rect x="22" y="88" width="38" height="10" rx="1.75" fill={c.primary} />

        {/* Right N-Frame Structure */}
        <rect x="88" y="22" width="10" height="76" rx="1.75" fill={c.primary} />
        <rect x="75" y="22" width="23" height="10" rx="1.75" fill={c.primary} />
        <rect x="75" y="88" width="23" height="10" rx="1.75" fill={c.primary} />

        {/* Diagonal Network Bridge */}
        <line
          x1="60"
          y1="27"
          x2="93"
          y2="93"
          stroke={c.accent}
          strokeWidth="7.8"
          strokeLinecap="round"
        />
      </g>

      {/* Three Precision Network Nodes */}
      <circle cx="60" cy="27" r="4.8" fill={c.accent} />
      <circle cx="51" cy="60" r="4.8" fill={c.accent} />
      <circle cx="93" cy="93" r="4.8" fill={c.accent} />

      {showGrid && <RefinementGridOverlay id="refined" />}
    </svg>
  );
};

/**
 * VERSION B — UNIFIED FRAME INTEGRATED NETWORK
 * Integrates the middle E-bar directly into the diagonal topology via a central relay node,
 * unifying the E and N geometry into one structurally connected network framework.
 */
export const UnifiedFrameIntegratedSymbol: React.FC<RefinedSymbolProps> = ({
  variant = "color",
  showGrid = false,
  className = "",
  size,
}) => {
  const c = getRefinedPalette(variant);
  const maskId = React.useId();

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="EdgeNet Version B Unified Frame Integrated Network Symbol"
    >
      <defs>
        <mask id={`${maskId}-integrated`}>
          <rect x="0" y="0" width="120" height="120" fill="white" />
          {/* Optical knockouts for the three diagonal network nodes */}
          <circle cx="60" cy="27" r="7.4" fill="black" />
          <circle cx="76.5" cy="60" r="7.4" fill="black" />
          <circle cx="93" cy="93" r="7.4" fill="black" />
        </mask>
      </defs>

      <g mask={`url(#${maskId}-integrated)`}>
        {/* Left E-Frame Spine & Top/Bottom Cantilevers */}
        <rect x="22" y="22" width="10" height="76" rx="1.75" fill={c.primary} />
        <rect x="22" y="22" width="38" height="10" rx="1.75" fill={c.primary} />
        <rect x="22" y="55" width="30" height="10" rx="1.75" fill={c.primary} />
        <rect x="22" y="88" width="42" height="10" rx="1.75" fill={c.primary} />

        {/* Right N-Frame Vertical Pillar & Portals */}
        <rect x="88" y="22" width="10" height="76" rx="1.75" fill={c.primary} />
        <rect x="75" y="22" width="23" height="10" rx="1.75" fill={c.primary} />
        <rect x="77" y="88" width="21" height="10" rx="1.75" fill={c.primary} />

        {/* Horizontal Conduit Linking Middle E-Bar Directly to Central Diagonal Node */}
        <line
          x1="48"
          y1="60"
          x2="76.5"
          y2="60"
          stroke={c.accent}
          strokeWidth="7.8"
          strokeLinecap="round"
        />

        {/* Primary Diagonal N-Truss */}
        <line
          x1="60"
          y1="27"
          x2="93"
          y2="93"
          stroke={c.accent}
          strokeWidth="8.2"
          strokeLinecap="round"
        />
      </g>

      {/* Structurally Connected Network Nodes Along the Diagonal Axis */}
      <circle cx="60" cy="27" r="4.8" fill={c.accent} />
      <circle cx="76.5" cy="60" r="4.8" fill={c.accent} />
      <circle cx="93" cy="93" r="4.8" fill={c.accent} />

      {showGrid && <RefinementGridOverlay id="integrated" />}
    </svg>
  );
};

/**
 * VERSION C — UNIFIED FRAME MINIMAL IDENTITY
 * Monolithic, engraving-ready evolution with 11.5u architectural strokes,
 * uninterrupted right N-pillar, and solid un-ringed geometric nodes for 16px & hardware clarity.
 */
export const UnifiedFrameMinimalSymbol: React.FC<RefinedSymbolProps> = ({
  variant = "color",
  showGrid = false,
  className = "",
  size,
}) => {
  const c = getRefinedPalette(variant);

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="EdgeNet Version C Unified Frame Minimal Identity Symbol"
    >
      {/* Left E-Architecture Monolith (11.5u bold strokes, zero fragile details) */}
      <rect x="22" y="22" width="11.5" height="76" rx="2" fill={c.primary} />
      <rect x="22" y="22" width="29" height="11.5" rx="2" fill={c.primary} />
      <rect x="22" y="54.25" width="26" height="11.5" rx="2" fill={c.primary} />
      <rect x="22" y="86.5" width="34" height="11.5" rx="2" fill={c.primary} />

      {/* Right N Vertical Monolith with crisp clearance above corner node */}
      <rect x="86.5" y="22" width="11.5" height="55" rx="2" fill={c.primary} />

      {/* Simplified Bold Diagonal Network Vector & Three Solid Anchors */}
      <line
        x1="60"
        y1="27.75"
        x2="92.25"
        y2="92.25"
        stroke={c.accent}
        strokeWidth="9"
        strokeLinecap="round"
      />
      <circle cx="60" cy="27.75" r="5.75" fill={c.accent} />
      <circle cx="76.1" cy="60" r="7.2" fill={c.accent} />
      <circle cx="92.25" cy="92.25" r="5.75" fill={c.accent} />

      {showGrid && <RefinementGridOverlay id="minimal" />}
    </svg>
  );
};

export const RefinedConceptSymbol: React.FC<
  RefinedSymbolProps & { refinementId: RefinementId }
> = ({ refinementId, ...rest }) => {
  switch (refinementId) {
    case "refined":
      return <UnifiedFrameRefinedSymbol {...rest} />;
    case "integrated":
      return <UnifiedFrameIntegratedSymbol {...rest} />;
    case "minimal":
      return <UnifiedFrameMinimalSymbol {...rest} />;
  }
};
