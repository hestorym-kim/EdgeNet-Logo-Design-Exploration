export type Language = "en" | "ko";
export type ConceptId = "global-mesh" | "core-edge" | "unified-frame";

export interface BrandColor {
  name: Record<Language, string>;
  hex: string;
  role: Record<Language, string>;
  isLight?: boolean;
}

export interface LogoConceptLocalized {
  name: string;
  fullTitle: string;
  strategicMeaning: string;
  designRationale: string;
  geometrySpecs: string[];
  applicationContexts: string[];
}

export interface LogoConcept {
  id: ConceptId;
  number: string;
  en: LogoConceptLocalized;
  ko: LogoConceptLocalized;
}

export const BRAND_INFO = {
  brandName: "EdgeNet",
  presentingCompany: "UniFrame Launchers",
  descriptor: {
    en: "Distributed Intelligence Infrastructure",
    ko: "분산 지능 인프라",
  },
  boardTitle: {
    en: "EdgeNet — Logo Design Exploration",
    ko: "EdgeNet — 로고 디자인 탐색 보드",
  },
  boardNote: {
    en: "Concept Exploration — Not Final Artwork",
    ko: "콘셉트 탐색안 — 최종 아트워크 아님",
  },
} as const;

export const UI_COPY = {
  en: {
    constructionGrid: "Construction Grid",
    boardSvg: "Board SVG",
    imageStudio: "Image Studio",
    exportPng: "Export 16:9 PNG",
    exporting: "Exporting...",
    inspect: "Inspect",
    monochrome: "Monochrome",
    darkSurface: "Dark Surface",
    boardAria: "EdgeNet Logo Design Exploration Board",
    paletteAria: "Brand Color System",
    navAria: "Presentation Controls",
    langAria: "Language Selection",
    inspectorSubtitle: "Scale & Engraving Inspection",
    opticalScale: "Optical Scale Legibility",
    chassis: "Chassis",
    constructionSpecs: "Construction Specifications",
    deploymentSurfaces: "Primary Deployment Surfaces",
    downloadColorSvg: "Download Color SVG",
    downloadMonoSvg: "Download Monochrome SVG",
    mockupInStudio: "Mockup in Image Studio",
    studioTitle: "Brand Visual Studio",
    refImageLabel: "Reference Image (Optional — for editing)",
    clear: "Clear",
    editModeActive: "Edit mode active · Prompt modifies this visual",
    uploadImage: "Upload Image",
    loadBoard: "Load 16:9 Board",
    usePrefix: "Use",
    promptLabel: "Prompt",
    promptPlaceholder:
      "Describe a new brand visual to create, or how to edit the loaded EdgeNet symbol...",
    aspectRatio: "Aspect Ratio",
    resolution: "Resolution",
    aspectOptions: {
      "16:9": "16:9 Landscape",
      "4:3": "4:3 Standard",
      "1:1": "1:1 Square",
      "3:4": "3:4 Portrait",
    },
    generating: "Generating with gemini-nano-banana-2.1...",
    editImageBtn: "Edit Image",
    createImageBtn: "Create Image",
    studioEmptyTitle: "Create or Edit Brand Application Assets",
    studioEmptyBody:
      "Load one of the three EdgeNet symbols or enter a text prompt to generate photorealistic hardware mockups, signage, or brand environments with",
    editFurther: "Edit Further",
    editedLabel: "Edited",
    createdLabel: "Created",
    fullBoardLabel: "Full 16:9 Exploration Board",
    previousImageLabel: "Previous Generated Image",
    primaryMarkLabel: "Primary Mark",
    invalidImageError: "Please select a valid image file (PNG, JPEG, or WebP).",
    readImageError: "Could not read image contents.",
    genFailedError: "Image generation failed.",
    networkError: "Network error while contacting image service.",
    presets: [
      {
        label: "Hardware Chassis Engraving",
        prompt:
          "Photorealistic macro studio photograph of this EdgeNet logo precision laser-engraved onto a matte anodized deep navy and brushed aluminum edge AI server chassis, soft architectural side lighting, clean enterprise industrial design.",
      },
      {
        label: "Enterprise Keynote Backdrop",
        prompt:
          "Minimalist international B2B technology summit stage backdrop featuring the EdgeNet corporate identity in crisp white on deep navy architectural panels, clean glass atrium lighting, editorial photography.",
      },
      {
        label: "Device Silicon Label",
        prompt:
          "Studio product photography of an industrial edge compute module housing with a clean etched monochrome EdgeNet symbol and wordmark on bead-blasted steel, diffused neutral daylight, sharp focus.",
      },
    ],
  },
  ko: {
    constructionGrid: "구성 그리드",
    boardSvg: "보드 SVG",
    imageStudio: "이미지 스튜디오",
    exportPng: "16:9 PNG 내보내기",
    exporting: "내보내는 중...",
    inspect: "상세 보기",
    monochrome: "단색 변형",
    darkSurface: "다크 서피스",
    boardAria: "EdgeNet 로고 디자인 탐색 보드",
    paletteAria: "브랜드 컬러 시스템",
    navAria: "프레젠테이션 제어",
    langAria: "언어 선택",
    inspectorSubtitle: "축척 및 각인 정밀 검토",
    opticalScale: "광학 축척별 가독성 검증",
    chassis: "섀시 각인",
    constructionSpecs: "기하학 설계 사양",
    deploymentSurfaces: "주요 적용 매체",
    downloadColorSvg: "컬러 SVG 다운로드",
    downloadMonoSvg: "단색 SVG 다운로드",
    mockupInStudio: "이미지 스튜디오에서 목업 생성",
    studioTitle: "브랜드 비주얼 스튜디오",
    refImageLabel: "참조 이미지 (선택 사항 — 이미지 편집 시 사용)",
    clear: "초기화",
    editModeActive: "편집 모드 활성 · 프롬프트로 이 비주얼을 수정합니다",
    uploadImage: "이미지 업로드",
    loadBoard: "16:9 보드 불러오기",
    usePrefix: "불러오기",
    promptLabel: "프롬프트",
    promptPlaceholder:
      "새로 생성할 브랜드 비주얼을 설명하거나, 불러온 EdgeNet 심볼의 편집 지시사항을 입력하세요...",
    aspectRatio: "화면 비율",
    resolution: "해상도",
    aspectOptions: {
      "16:9": "16:9 가로형",
      "4:3": "4:3 표준형",
      "1:1": "1:1 정방형",
      "3:4": "3:4 세로형",
    },
    generating: "gemini-nano-banana-2.1 모델로 생성 중...",
    editImageBtn: "이미지 편집하기",
    createImageBtn: "이미지 생성하기",
    studioEmptyTitle: "브랜드 적용 비주얼 생성 및 편집",
    studioEmptyBody:
      "세 가지 EdgeNet 심볼 중 하나를 불러오거나 텍스트 프롬프트를 입력해 하드웨어 목업, 사이니지, 브랜드 환경 이미지를 생성하세요:",
    editFurther: "추가 편집",
    editedLabel: "편집됨",
    createdLabel: "생성됨",
    fullBoardLabel: "16:9 전체 탐색 보드",
    previousImageLabel: "이전 생성 이미지",
    primaryMarkLabel: "기본 심볼",
    invalidImageError: "올바른 이미지 파일(PNG, JPEG, WebP)을 선택해 주세요.",
    readImageError: "이미지 데이터를 읽을 수 없습니다.",
    genFailedError: "이미지 생성에 실패했습니다.",
    networkError: "이미지 서비스 연결 중 네트워크 오류가 발생했습니다.",
    presets: [
      {
        label: "하드웨어 섀시 레이저 각인",
        prompt:
          "Photorealistic macro studio photograph of this EdgeNet logo precision laser-engraved onto a matte anodized deep navy and brushed aluminum edge AI server chassis, soft architectural side lighting, clean enterprise industrial design.",
      },
      {
        label: "엔터프라이즈 키노트 무대",
        prompt:
          "Minimalist international B2B technology summit stage backdrop featuring the EdgeNet corporate identity in crisp white on deep navy architectural panels, clean glass atrium lighting, editorial photography.",
      },
      {
        label: "디바이스 메탈 라벨",
        prompt:
          "Studio product photography of an industrial edge compute module housing with a clean etched monochrome EdgeNet symbol and wordmark on bead-blasted steel, diffused neutral daylight, sharp focus.",
      },
    ],
  },
} as const;

export const BRAND_COLORS: BrandColor[] = [
  {
    name: { en: "Deep Navy", ko: "딥 네이비" },
    hex: "#101E35",
    role: { en: "Primary", ko: "주조색" },
    isLight: false,
  },
  {
    name: { en: "Edge Blue", ko: "엣지 블루" },
    hex: "#147DAB",
    role: { en: "Primary", ko: "주조색" },
    isLight: false,
  },
  {
    name: { en: "White", ko: "화이트" },
    hex: "#FFFFFF",
    role: { en: "Primary", ko: "주조색" },
    isLight: true,
  },
  {
    name: { en: "Graphite", ko: "그래파이트" },
    hex: "#303B49",
    role: { en: "Supporting", ko: "보조색" },
    isLight: false,
  },
  {
    name: { en: "Cloud Silver", ko: "클라우드 실버" },
    hex: "#E8EEF4",
    role: { en: "Supporting", ko: "보조색" },
    isLight: true,
  },
  {
    name: { en: "Natural Green", ko: "내추럴 그린" },
    hex: "#3F8F6B",
    role: { en: "Accent", ko: "강조색" },
    isLight: false,
  },
];

export const LOGO_CONCEPTS: LogoConcept[] = [
  {
    id: "global-mesh",
    number: "01",
    en: {
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
    ko: {
      name: "글로벌 메시",
      fullTitle: "콘셉트 01 — 글로벌 메시",
      strategicMeaning:
        "정교하게 균형 잡힌 구형 네트워크 격자를 통해 지구 규모의 AI 추론 인프라를 상징합니다. 교차하는 궤도 호와 중계 노드는 전 세계적 회복탄력성, 초저지연 라우팅, 주권형 인프라 확장성을 전달합니다.",
      designRationale:
        "23.5° 축 기울기와 절제된 선 두께, 광학적 노드 여백을 적용하여 하드웨어 베젤이나 기술 문서, 16px 브라우저 아이콘에서도 복잡한 와이어프레임으로 뭉개지지 않고 선명하게 식별됩니다.",
      geometrySpecs: [
        "이중 개방 중계 간격을 갖춘 40u 외곽 자오선 경계",
        "역동적 글로벌 포지셔닝을 위한 23.5° 행성 축 회전",
        "3u 광학 여백이 적용된 5노드 기하학적 라우팅 격자",
      ],
      applicationContexts: [
        "글로벌 관제(NOC) 및 클라우드 포털 헤더",
        "서버 랙 섀시 레이저 각인 배지",
        "국제 B2G 기술 서밋 사이니지",
      ],
    },
  },
  {
    id: "core-edge",
    number: "02",
    en: {
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
    ko: {
      name: "코어 & 엣지",
      fullTitle: "콘셉트 02 — 코어 & 엣지",
      strategicMeaning:
        "네 개의 분산 엣지 노드 경계 중심에 단일 오케스트레이션 코어를 배치했습니다. 지능형 AI 모델 배포, 결정론적 엣지 텔레메트리, 원격 컴퓨팅 클러스터 간의 매끄러운 동기화를 표현합니다.",
      designRationale:
        "진부한 바퀴살 아이콘이나 분자 도식 대신 건축적 다이아몬드 성좌 구조를 채택했습니다. 네 방향의 엣지 브리지가 중앙 모깎기 코어로 수렴하여 모든 크기에서 독보적인 실루엣을 유지합니다.",
      geometrySpecs: [
        "정밀 내부 개구부를 지닌 24u 모깎기 중앙 코어",
        "76u 다이아몬드 경계로 연결된 4방위 엣지 터미널",
        "금속 스탬핑 공정에 최적화된 균일 4.5u 도관 선폭",
      ],
      applicationContexts: [
        "엣지 어플라이언스 하드웨어 외관",
        "개발자 SDK 및 CLI 공식 문서",
        "엔터프라이즈 컨트롤 플레인 파비콘",
      ],
    },
  },
  {
    id: "unified-frame",
    number: "03",
    en: {
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
    ko: {
      name: "유니파이드 프레임",
      fullTitle: "콘셉트 03 — 유니파이드 프레임",
      strategicMeaning:
        "개방형 건축 프레임과 내장된 네트워크 토폴로지를 결합해 여백 속에 이니셜 E와 N을 절제미 있게 담아냈습니다. 기업 및 공공 인프라 환경에 최적화된 통합 컴퓨팅 프레임워크를 상징합니다.",
      designRationale:
        "상하단 레일에 의도적인 구조적 개방 포털을 두어 닫힌 소프트웨어 창이 아닌 역동적인 인프라 프레임워크로 읽히도록 설계했으며, 스위스 그리드의 엄격함과 명확한 연결성을 결합했습니다.",
      geometrySpecs: [
        "9u 구조 레일을 갖춘 74×74u 개방형 건축 프레임",
        "통합형 E 캔틸레버 및 대각선 N 벡터 브리지",
        "12u 모듈러 그리드에 정렬된 3개의 정밀 터미널 노드",
      ],
      applicationContexts: [
        "UniFrame Launchers 하드웨어 생태계",
        "엔터프라이즈 아키텍처 백서",
        "실리콘·알루미늄 디바이스 물리 라벨",
      ],
    },
  },
];
