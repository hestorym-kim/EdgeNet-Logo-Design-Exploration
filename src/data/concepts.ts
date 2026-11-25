export type ConceptId = "global-mesh" | "core-edge" | "unified-frame";

export interface BrandColor {
  name: string;
  hex: string;
  role: string;
  isLight?: boolean;
}

export interface LogoConcept {
  id: ConceptId;
  number: string;
  name: string;
  fullTitle: string;
  strategicMeaning: string;
  designRationale: string;
  geometrySpecs: string[];
  applicationContexts: string[];
}

export const BRAND_INFO = {
  brandName: "EdgeNet",
  presentingCompany: "UniFrame Launchers",
  descriptor: "Distributed Intelligence Infrastructure",
  boardNote: "Concept Exploration — Not Final Artwork",
} as const;

export const BRAND_COLORS: BrandColor[] = [
  { name: "Deep Navy", hex: "#101E35", role: "Primary", isLight: false },
  { name: "Edge Blue", hex: "#147DAB", role: "Primary", isLight: false },
  { name: "White", hex: "#FFFFFF", role: "Primary", isLight: true },
  { name: "Graphite", hex: "#303B49", role: "Supporting", isLight: false },
  { name: "Cloud Silver", hex: "#E8EEF4", role: "Supporting", isLight: true },
  { name: "Natural Green", hex: "#3F8F6B", role: "Accent", isLight: false },
];

export const LOGO_CONCEPTS: LogoConcept[] = [
  {
    id: "global-mesh",
    number: "01",
    name: "Global Mesh",
    fullTitle: "CONCEPT 01 — GLOBAL MESH",
    strategicMeaning:
      "Expresses planetary-scale AI inference through a precision-balanced spherical lattice. Intersecting orbital arcs and anchored relay nodes convey worldwide resilience, low-latency routing, and sovereign infrastructure reach.",
    designRationale:
      "Constructed on a 23.5° axial tilt with disciplined stroke weights and optical node knockouts so the mark remains legible on hardware bezels, documentation, and 16px browser icons without dissolving into a generic wireframe.",
    geometrySpecs: [
      "40u outer meridian boundary with dual open relay breaks",
      "23.5° planetary axis rotation for dynamic global posture",
      "5-node geometric routing lattice with 3u optical clearances",
    ],
    applicationContexts: [
      "Global NOC & Cloud Portal Header",
      "Laser-Etched Rack Chassis Badge",
      "International B2G Summit Signage",
    ],
  },
  {
    id: "core-edge",
    number: "02",
    name: "Core & Edge",
    fullTitle: "CONCEPT 02 — CORE & EDGE",
    strategicMeaning:
      "Anchors one central orchestration core inside a four-point distributed edge perimeter. Communicates coordinated AI model dispatch, deterministic edge telemetry, and seamless synchronization across remote compute clusters.",
    designRationale:
      "Replaces cliché spoked wheels and chemistry diagrams with an architectural diamond constellation. Four directional edge bridges feed an octagonal nucleus, delivering an unmistakable geometric silhouette at every scale.",
    geometrySpecs: [
      "24u chamfered central core with precision inner aperture",
      "4 cardinal edge terminals bridged across a 76u diamond span",
      "Uniform 4.5u conduit strokes engineered for metal stamping",
    ],
    applicationContexts: [
      "Edge Appliance Status Enclosure",
      "Developer SDK & CLI Documentation",
      "Enterprise Control Plane Favicon",
    ],
  },
  {
    id: "unified-frame",
    number: "03",
    name: "Unified Frame",
    fullTitle: "CONCEPT 03 — UNIFIED FRAME",
    strategicMeaning:
      "Unites open architectural framing with embedded network topology, subtly encoding the initials E and N within negative space. Represents an interoperable computing framework built for enterprise and government deployment.",
    designRationale:
      "Uses intentional structural portals along the upper and lower rails so the mark reads as an active infrastructure framework rather than a closed software window, pairing Swiss-grid rigor with clear directional connectivity.",
    geometrySpecs: [
      "74×74u open architectural frame with 9u structural rails",
      "Integrated E-cantilever and diagonal N-vector bridge",
      "3 calibrated terminal nodes aligned on a 12u modular grid",
    ],
    applicationContexts: [
      "UniFrame Launchers Hardware Ecosystem",
      "Enterprise Architecture Whitepapers",
      "Physical Silicone & Aluminum Device Labels",
    ],
  },
];
