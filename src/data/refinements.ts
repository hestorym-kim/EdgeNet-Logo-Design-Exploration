import { Language } from "./concepts";

export type RefinementId = "refined" | "integrated" | "minimal";

export interface RefinementLocalized {
  versionTag: string;
  name: string;
  fullTitle: string;
  subtitle: string;
  designRationale: string;
  geometryImprovements: string[];
  strengths: string;
  tradeOffs: string;
}

export interface RefinementSpec {
  id: RefinementId;
  letter: "A" | "B" | "C";
  filenameBase: string;
  en: RefinementLocalized;
  ko: RefinementLocalized;
}

export const REFINEMENT_UI = {
  en: {
    sectionTitle: "Unified Frame Refinement",
    sectionKicker: "Selected Direction Evolution · Concept 03",
    sectionLead:
      "Three calibrated vector refinements evolving the original Unified Frame symbol for enterprise-scale legibility, structural unity, and physical hardware engraving.",
    originalRefTitle: "Original Reference Symbol",
    originalRefSubtitle: "Unchanged baseline preserved from initial exploration",
    downloadOriginalSvg: "Original SVG",
    exportComparisonPng: "Comparison Board PNG (16:9)",
    exportComparisonSvg: "Comparison Board SVG (16:9)",
    boardHeading: "EdgeNet — Unified Frame Refinement Comparison",
    rationaleLabel: "Design Rationale",
    improvementsLabel: "Key Geometry Improvements",
    monochromeLabel: "Monochrome",
    darkSurfaceLabel: "Dark Surface",
    smallScaleLabel: "Small-Size Validation",
    engravingLabel: "Hardware Engraving Preview",
    engravingSpec: "Anodized Aluminum · 0.15mm Laser Etch",
    summaryTitle: "Refinement Comparison Summary",
    summaryNote:
      "All three directions preserve the Deep Navy E-frame, right vertical boundary, Edge Blue diagonal bridge, and three-node network signature. No final winner is declared pending executive review.",
    strengthsLabel: "Strengths",
    tradeOffsLabel: "Trade-offs",
    deliverablesTitle: "Editable Vector SVG Deliverables",
    deliverablesSubtitle:
      "Production-ready, transparent-background vector assets in full color and single-color monochrome.",
    downloadColor: "Color SVG",
    downloadMono: "Monochrome SVG",
    navRefinement: "Refinement",
    navOriginal: "Original Board",
    mockupBtn: "Mockup in Studio",
    rack3dTitle: "3D Server Rack Engraving Mockup",
    rack3dSubtitle:
      "Interactive 2U enterprise rack-blade simulation with brushed black aluminum, CSS depth filters, and hover light-glint transitions.",
    rackFinishBlack: "Anodized Black",
    rackFinishTitanium: "Anodized Titanium",
    rackFinishSlate: "Deep Slate Alloy",
    rackAngleIso: "Isometric 3D",
    rackAngleFront: "Front Elevation",
    rackAngleBevel: "Right Bevel",
    rackChassisSpec: "2U AI Inference Blade · CNC Anodized Faceplate · Laser Anneal 0.15mm",
  },
  ko: {
    sectionTitle: "유니파이드 프레임 고도화 탐색",
    sectionKicker: "선정 콘셉트 심화 · Concept 03",
    sectionLead:
      "기존 유니파이드 프레임 심볼의 핵심 정체성을 유지하면서, 엔터프라이즈 가독성, 구조적 통합성, 물리적 하드웨어 각인 적합성을 높인 세 가지 정교화 버전입니다.",
    originalRefTitle: "원본 레퍼런스 심볼",
    originalRefSubtitle: "초기 탐색에서 선정된 원본 SVG 원형 보존",
    downloadOriginalSvg: "원본 SVG",
    exportComparisonPng: "비교 보드 PNG (16:9)",
    exportComparisonSvg: "비교 보드 SVG (16:9)",
    boardHeading: "EdgeNet — 유니파이드 프레임 고도화 비교 보드",
    rationaleLabel: "디자인 의도",
    improvementsLabel: "주요 기하학 개선 사항",
    monochromeLabel: "단색 변형",
    darkSurfaceLabel: "다크 서피스",
    smallScaleLabel: "소형 크기 검증",
    engravingLabel: "하드웨어 각인 프리뷰",
    engravingSpec: "아노다이징 알루미늄 · 0.15mm 레이저 각인",
    summaryTitle: "고도화 버전별 비교 요약",
    summaryNote:
      "세 버전 모두 딥 네이비 E 프레임, 우측 수직 경계, 엣지 블루 대각선 연결, 3노드 네트워크 구조를 계승합니다. 최종안 선정을 위해 각 방향의 강점과 트레이드오프를 나란히 제시합니다.",
    strengthsLabel: "강점",
    tradeOffsLabel: "트레이드오프",
    deliverablesTitle: "편집 가능한 벡터 SVG 산출물",
    deliverablesSubtitle:
      "투명 배경과 정밀 여백이 적용된 풀컬러 및 단일 색상 모노크롬 프로덕션 벡터 파일입니다.",
    downloadColor: "컬러 SVG",
    downloadMono: "단색 SVG",
    navRefinement: "심화 비교",
    navOriginal: "초기 탐색 보드",
    mockupBtn: "스튜디오 목업",
    rack3dTitle: "3D 서버 랙 메탈 각인 목업",
    rack3dSubtitle:
      "블랙 아노다이징 알루미늄 질감과 호버 시 3D 틸트·광택 전환 효과를 적용한 2U 엔터프라이즈 서버 랙 목업입니다.",
    rackFinishBlack: "블랙 알루미늄",
    rackFinishTitanium: "아노다이징 티타늄",
    rackFinishSlate: "딥 슬레이트 합금",
    rackAngleIso: "아이소메트릭 3D",
    rackAngleFront: "정면 뷰",
    rackAngleBevel: "우측 베벨",
    rackChassisSpec: "2U AI 추론 블레이드 · CNC 브러시드 알루미늄 패널 · 0.15mm 레이저 각인",
  },
} as const;

export const REFINEMENT_SPECS: RefinementSpec[] = [
  {
    id: "refined",
    letter: "A",
    filenameBase: "edgenet-unified-frame-refined",
    en: {
      versionTag: "VERSION A",
      name: "Unified Frame Refined",
      fullTitle: "VERSION A — UNIFIED FRAME REFINED",
      subtitle: "Optical alignment & proportional calibration",
      designRationale:
        "Preserves the exact layout of the original symbol while resolving geometric drift: all structural bars align to a 10u modular grid, nodes seat cleanly on rail centerlines, and transparent mask clearances eliminate overhanging white artifacts on dark surfaces.",
      geometryImprovements: [
        "Unified 10u stroke thickness across E-frame and N-pillar",
        "True centerline anchoring for top (60, 27) and corner (93, 93) nodes",
        "Mask-based optical knockouts replace protruding opaque white rings",
      ],
      strengths:
        "Highest continuity with the approved concept; zero stakeholder friction while immediately elevating craftsmanship.",
      tradeOffs:
        "Middle node remains a cantilevered E-terminal rather than forming a closed structural truss with the diagonal.",
    },
    ko: {
      versionTag: "버전 A",
      name: "유니파이드 프레임 정제형",
      fullTitle: "VERSION A — 정제형 (REFINED)",
      subtitle: "광학 정렬 및 비례 균형 고도화",
      designRationale:
        "원본 심볼의 구조와 인상을 가장 충실히 계승하면서 기하학적 오차를 교정했습니다. 모든 프레임 두께를 10u 모듈 그리드로 통일하고, 노드를 중심선에 정확히 정렬했으며, 마스크 기반 투명 여백으로 다크 배경에서의 외곽 돌출을 제거했습니다.",
      geometryImprovements: [
        "E 프레임과 N 기둥 전체에 10u 균일 구조 두께 적용",
        "상단(60, 27) 및 우하단(93, 93) 노드의 정밀 중심선 정렬",
        "불투명 흰색 원 대신 투명 마스크 여백으로 다크 서피스 완벽 대응",
      ],
      strengths:
        "승인된 초기 심볼과의 연속성이 가장 높으며, 즉각적으로 완성도와 정밀도를 끌어올립니다.",
      tradeOffs:
        "중앙 노드가 대각선과 직접 결합되지 않고 좌측 E 수평 바 끝에 독립적으로 위치합니다.",
    },
  },
  {
    id: "integrated",
    letter: "B",
    filenameBase: "edgenet-unified-frame-integrated",
    en: {
      versionTag: "VERSION B",
      name: "Unified Frame Integrated Network",
      fullTitle: "VERSION B — INTEGRATED NETWORK",
      subtitle: "Structurally unified E-N topology",
      designRationale:
        "Bridges the middle E-cantilever directly into a central node seated on the N-diagonal, transforming the three nodes from surface accents into load-bearing structural junctions within one indivisible framework.",
      geometryImprovements: [
        "Middle E-bar connects via an Edge Blue conduit directly to the central diagonal node",
        "All three nodes sit along the primary diagonal routing axis",
        "Balanced horizontal portals reinforce cohesive E + N legibility",
      ],
      strengths:
        "Strongest narrative expression of distributed orchestration and unified architecture; every element is structurally connected.",
      tradeOffs:
        "Slightly higher interior path density requires disciplined spacing at 16px favicon scale.",
    },
    ko: {
      versionTag: "버전 B",
      name: "유니파이드 프레임 통합 네트워크형",
      fullTitle: "VERSION B — 통합 네트워크형 (INTEGRATED)",
      subtitle: "E와 N이 구조적으로 결합된 단일 토폴로지",
      designRationale:
        "좌측 E의 중앙 수평 바를 대각선 위에 놓인 중앙 노드와 직접 연결하여, 세 노드가 단순 장식이 아닌 하중을 지탱하는 구조적 교차점으로 기능하게 했습니다. 하나의 유기적인 글로벌 프레임워크를 완성합니다.",
      geometryImprovements: [
        "중앙 E 바가 엣지 블루 도관을 통해 대각선 중앙 노드와 직접 결합",
        "세 개의 네트워크 노드 모두 주 대각선 라우팅 축 위에 일렬 정렬",
        "균형 잡힌 상하단 포털 간격으로 E와 N의 결합 가독성 강화",
      ],
      strengths:
        "분산 오케스트레이션과 통합 아키텍처라는 브랜드 서사를 가장 설득력 있게 전달하며 구조적 완결성이 뛰어납니다.",
      tradeOffs:
        "내부 연결 밀도가 다소 높아져 16px 초소형 파비콘 크기에서는 여백 유지에 주의가 필요합니다.",
    },
  },
  {
    id: "minimal",
    letter: "C",
    filenameBase: "edgenet-unified-frame-minimal",
    en: {
      versionTag: "VERSION C",
      name: "Unified Frame Minimal Identity",
      fullTitle: "VERSION C — MINIMAL IDENTITY",
      subtitle: "Hardware-first monolithic silhouette",
      designRationale:
        "Distills the Unified Frame down to bold 11.5u architectural monoliths and solid un-ringed node anchors along the diagonal. Eliminates fragile outer caps and thin clearances for effortless CNC milling, laser etching, and 16px icon clarity.",
      geometryImprovements: [
        "Reinforced 11.5u stroke weight engineered for 16px clarity and metal etching",
        "Uninterrupted right vertical N-monolith removes small portal caps",
        "Solid Edge Blue diagonal + central node with clean 4u negative-space separations",
      ],
      strengths:
        "Unmatched durability across physical hardware, monochrome print, and tiny UI icons; timeless industrial restraint.",
      tradeOffs:
        "Simplifying the outer portal caps softens the enclosed square box boundary in favor of an open architectural monogram.",
    },
    ko: {
      versionTag: "버전 C",
      name: "유니파이드 프레임 미니멀 아이덴티티",
      fullTitle: "VERSION C — 미니멀 아이덴티티 (MINIMAL)",
      subtitle: "하드웨어 각인 및 소형 UI 최적화 모노리스",
      designRationale:
        "불필요한 외곽 캡과 미세 여백을 덜어내고 11.5u의 견고한 건축적 모노리스와 단단한 노드 앵커로 압축했습니다. CNC 가공, 메탈 레이저 각인, 16px UI 아이콘 등 극한의 제작 환경에서도 시인성이 무너지지 않습니다.",
      geometryImprovements: [
        "16px 가독성과 금속 각인을 고려한 11.5u 고강도 구조 선폭",
        "우측 N 수직 기둥을 단일 모노리스로 통합해 잔여 포털 캡 제거",
        "4u 음각 분리 간격을 둔 솔리드 엣지 블루 대각선 및 중앙 노드",
      ],
      strengths:
        "물리적 하드웨어 브랜딩, 단색 인쇄, 초소형 아이콘 환경에서 압도적인 내구성과 시대를 초월한 절제미를 발휘합니다.",
      tradeOffs:
        "외곽 포털 캡을 생략함으로써 닫힌 사각 프레임 느낌보다는 개방형 모노그램 인상이 강해집니다.",
    },
  },
];

export function getLocalizedRefinement(spec: RefinementSpec, lang: Language): RefinementLocalized {
  return spec[lang];
}
