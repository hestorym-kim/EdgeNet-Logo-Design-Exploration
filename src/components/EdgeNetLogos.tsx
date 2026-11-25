import React from "react";
import { ConceptId } from "../data/concepts";

export type SymbolVariant = "color" | "monochrome" | "dark";

interface SymbolProps {
  variant?: SymbolVariant;
  showGrid?: boolean;
  className?: string;
  size?: number;
}

function getPalette(variant: SymbolVariant) {
  if (variant === "monochrome") {
    return {
      primary: "#101E35",
      accent: "#101E35",
      knockout: "#F7F9FC",
      subtle: "#101E35",
    };
  }
  if (variant === "dark") {
    return {
      primary: "#FFFFFF",
      accent: "#147DAB",
      knockout: "#101E35",
      subtle: "#3F8F6B",
    };
  }
  return {
    primary: "#101E35",
    accent: "#147DAB",
    knockout: "#FFFFFF",
    subtle: "#3F8F6B",
  };
}

function ConstructionGridOverlay({ kind }: { kind: ConceptId }) {
  return (
    <g opacity={0.42} pointerEvents="none">
      {/* Outer modular framing box */}
      <rect
        x="16"
        y="16"
        width="88"
        height="88"
        fill="none"
        stroke="#147DAB"
        strokeWidth="0.6"
        strokeDasharray="2.5 2.5"
      />
      {/* Center crosshairs */}
      <line x1="60" y1="8" x2="60" y2="112" stroke="#147DAB" strokeWidth="0.6" strokeDasharray="2 2" />
      <line x1="8" y1="60" x2="112" y2="60" stroke="#147DAB" strokeWidth="0.6" strokeDasharray="2 2" />

      {kind === "global-mesh" && (
        <>
          <circle cx="60" cy="60" r="40" fill="none" stroke="#3F8F6B" strokeWidth="0.6" strokeDasharray="2 2" />
          <line
            x1="20"
            y1="100"
            x2="100"
            y2="20"
            stroke="#147DAB"
            strokeWidth="0.6"
            strokeDasharray="2 2"
          />
          <line
            x1="34"
            y1="14"
            x2="86"
            y2="106"
            stroke="#3F8F6B"
            strokeWidth="0.6"
            strokeDasharray="2 2"
          />
        </>
      )}

      {kind === "core-edge" && (
        <>
          <polygon
            points="60,20 100,60 60,100 20,60"
            fill="none"
            stroke="#3F8F6B"
            strokeWidth="0.6"
            strokeDasharray="2 2"
          />
          <circle cx="60" cy="60" r="40" fill="none" stroke="#147DAB" strokeWidth="0.6" strokeDasharray="2 2" />
          <line x1="20" y1="20" x2="100" y2="100" stroke="#147DAB" strokeWidth="0.6" strokeDasharray="2 2" />
          <line x1="100" y1="20" x2="20" y2="100" stroke="#147DAB" strokeWidth="0.6" strokeDasharray="2 2" />
        </>
      )}

      {kind === "unified-frame" && (
        <>
          <rect x="23" y="23" width="74" height="74" fill="none" stroke="#3F8F6B" strokeWidth="0.6" strokeDasharray="2 2" />
          <line x1="23" y1="41.5" x2="97" y2="41.5" stroke="#147DAB" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="23" y1="78.5" x2="97" y2="78.5" stroke="#147DAB" strokeWidth="0.5" strokeDasharray="2 2" />
          <line x1="60" y1="23" x2="97" y2="97" stroke="#3F8F6B" strokeWidth="0.6" strokeDasharray="2 2" />
        </>
      )}
    </g>
  );
}

/**
 * CONCEPT 01 — GLOBAL MESH
 * Simplified tilted spherical mesh with precise meridian/latitude arcs and 5 anchored network nodes.
 */
export const GlobalMeshSymbol: React.FC<SymbolProps> = ({
  variant = "color",
  showGrid = false,
  className = "",
  size,
}) => {
  const c = getPalette(variant);

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="EdgeNet Concept 01 Global Mesh Logo Symbol"
    >
      <g transform="rotate(-22 60 60)">
        {/* Outer sphere divided by two clean architectural gaps at poles/nodes */}
        <circle
          cx="60"
          cy="60"
          r="39"
          stroke={c.primary}
          strokeWidth="4.6"
        />

        {/* Equatorial elliptical latitude */}
        <ellipse
          cx="60"
          cy="60"
          rx="39"
          ry="15.5"
          stroke={c.primary}
          strokeWidth="3.8"
        />

        {/* Vertical meridian arc */}
        <ellipse
          cx="60"
          cy="60"
          rx="17.5"
          ry="39"
          stroke={c.primary}
          strokeWidth="3.8"
        />

        {/* Diagonal active mesh routing chord across center */}
        <line
          x1="28"
          y1="82"
          x2="92"
          y2="38"
          stroke={c.accent}
          strokeWidth="4.2"
          strokeLinecap="round"
        />

        {/* Upper-left & Lower-right structural anchor nodes */}
        <circle cx="43.5" cy="46.2" r="5.6" fill={c.knockout} />
        <circle cx="43.5" cy="46.2" r="3.6" fill={c.primary} />

        <circle cx="76.5" cy="73.8" r="5.6" fill={c.knockout} />
        <circle cx="76.5" cy="73.8" r="3.6" fill={c.primary} />

        {/* Equatorial & Polar active Edge Blue nodes */}
        <circle cx="92" cy="38" r="6.8" fill={c.knockout} />
        <circle cx="92" cy="38" r="4.8" fill={c.accent} />

        <circle cx="28" cy="82" r="6.8" fill={c.knockout} />
        <circle cx="28" cy="82" r="4.8" fill={c.accent} />

        {/* Central global orchestration node */}
        <circle cx="60" cy="60" r="8.2" fill={c.knockout} />
        <circle cx="60" cy="60" r="5.6" fill={c.accent} />
      </g>

      {showGrid && <ConstructionGridOverlay kind="global-mesh" />}
    </svg>
  );
};

/**
 * CONCEPT 02 — CORE & EDGE
 * Intelligent central core orchestrating four distributed peripheral edge terminals.
 */
export const CoreEdgeSymbol: React.FC<SymbolProps> = ({
  variant = "color",
  showGrid = false,
  className = "",
  size,
}) => {
  const c = getPalette(variant);

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="EdgeNet Concept 02 Core and Edge Logo Symbol"
    >
      {/* Outer edge-to-edge mesh perimeter arcs (diamond geometry with crisp node gaps) */}
      <path
        d="M 31 51 L 51 31 M 69 31 L 89 51 M 89 69 L 69 89 M 51 89 L 31 69"
        stroke={c.primary}
        strokeWidth="4.2"
        strokeLinecap="round"
      />

      {/* Four directional orchestration conduits from core to edge nodes */}
      <line x1="60" y1="42" x2="60" y2="27" stroke={c.accent} strokeWidth="4.6" strokeLinecap="round" />
      <line x1="78" y1="60" x2="93" y2="60" stroke={c.accent} strokeWidth="4.6" strokeLinecap="round" />
      <line x1="60" y1="78" x2="60" y2="93" stroke={c.accent} strokeWidth="4.6" strokeLinecap="round" />
      <line x1="42" y1="60" x2="27" y2="60" stroke={c.accent} strokeWidth="4.6" strokeLinecap="round" />

      {/* Four peripheral edge device terminals */}
      {[
        { cx: 60, cy: 22 },
        { cx: 98, cy: 60 },
        { cx: 60, cy: 98 },
        { cx: 22, cy: 60 },
      ].map((pt, idx) => (
        <g key={idx}>
          <circle cx={pt.cx} cy={pt.cy} r="7.5" fill={c.knockout} />
          <circle cx={pt.cx} cy={pt.cy} r="5.5" fill={c.accent} />
        </g>
      ))}

      {/* Central intelligence & orchestration core (chamfered rotated monolith) */}
      <g transform="rotate(45 60 60)">
        <rect
          x="46"
          y="46"
          width="28"
          height="28"
          rx="4.5"
          fill={c.primary}
        />
        <rect
          x="54.5"
          y="54.5"
          width="11"
          height="11"
          rx="2"
          fill={c.knockout}
        />
      </g>
      <circle cx="60" cy="60" r="3" fill={c.accent} />

      {showGrid && <ConstructionGridOverlay kind="core-edge" />}
    </svg>
  );
};

/**
 * CONCEPT 03 — UNIFIED FRAME
 * Unified geometric frame with embedded E & N negative-space architecture and network bridges.
 */
export const UnifiedFrameSymbol: React.FC<SymbolProps> = ({
  variant = "color",
  showGrid = false,
  className = "",
  size,
}) => {
  const c = getPalette(variant);

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="EdgeNet Concept 03 Unified Frame Logo Symbol"
    >
      {/* Left E-Architecture Structural Frame */}
      {/* Vertical Spine */}
      <rect x="23" y="23" width="9.5" height="74" rx="1.5" fill={c.primary} />
      {/* Top Horizontal Cantilever */}
      <rect x="23" y="23" width="38" height="9.5" rx="1.5" fill={c.primary} />
      {/* Middle Horizontal Bridge */}
      <rect x="23" y="55.25" width="30" height="9.5" rx="1.5" fill={c.primary} />
      {/* Bottom Horizontal Cantilever */}
      <rect x="23" y="87.5" width="38" height="9.5" rx="1.5" fill={c.primary} />

      {/* Right N-Architecture Pillar & Portals */}
      <rect x="87.5" y="23" width="9.5" height="74" rx="1.5" fill={c.primary} />
      {/* Top-right frame cap with intentional negative-space portal */}
      <rect x="75" y="23" width="22" height="9.5" rx="1.5" fill={c.primary} />
      {/* Bottom-right frame cap with intentional negative-space portal */}
      <rect x="75" y="87.5" width="22" height="9.5" rx="1.5" fill={c.primary} />

      {/* Diagonal Network Connectivity Vector (completing the abstract N truss) */}
      <line
        x1="59"
        y1="28.5"
        x2="92"
        y2="91.5"
        stroke={c.accent}
        strokeWidth="7.5"
        strokeLinecap="round"
      />

      {/* Precision Network Node Terminals */}
      <circle cx="59" cy="28" r="6.5" fill={c.knockout} />
      <circle cx="59" cy="28" r="4.4" fill={c.accent} />

      <circle cx="53" cy="60" r="6.5" fill={c.knockout} />
      <circle cx="53" cy="60" r="4.4" fill={c.accent} />

      <circle cx="92" cy="92" r="6.5" fill={c.knockout} />
      <circle cx="92" cy="92" r="4.4" fill={c.accent} />

      {showGrid && <ConstructionGridOverlay kind="unified-frame" />}
    </svg>
  );
};

export const ConceptSymbol: React.FC<
  SymbolProps & { conceptId: ConceptId }
> = ({ conceptId, ...rest }) => {
  switch (conceptId) {
    case "global-mesh":
      return <GlobalMeshSymbol {...rest} />;
    case "core-edge":
      return <CoreEdgeSymbol {...rest} />;
    case "unified-frame":
      return <UnifiedFrameSymbol {...rest} />;
  }
};

export const EdgeNetWordmark: React.FC<{
  dark?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}> = ({ dark = false, size = "lg", className = "" }) => {
  const sizeClass =
    size === "sm"
      ? "text-[15px] tracking-[-0.025em]"
      : size === "md"
      ? "text-[20px] tracking-[-0.03em]"
      : "text-[25px] tracking-[-0.032em]";

  return (
    <span
      className={`font-display font-semibold leading-none select-none ${sizeClass} ${
        dark ? "text-white tracking-[-0.02em]" : "text-[#101E35]"
      } ${className}`}
    >
      EdgeNet
    </span>
  );
};
