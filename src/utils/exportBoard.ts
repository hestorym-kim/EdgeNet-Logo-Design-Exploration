import {
  BRAND_COLORS,
  BRAND_INFO,
  ConceptId,
  Language,
  LOGO_CONCEPTS,
  UI_COPY,
} from "../data/concepts";
import { SymbolVariant } from "../components/EdgeNetLogos";

function getSymbolInnerSvg(conceptId: ConceptId, variant: SymbolVariant): string {
  const primary = variant === "dark" ? "#FFFFFF" : "#101E35";
  const accent = variant === "monochrome" ? "#101E35" : "#147DAB";
  const knockout =
    variant === "dark" ? "#101E35" : variant === "monochrome" ? "#F7F9FC" : "#FFFFFF";

  if (conceptId === "global-mesh") {
    return `
      <g transform="rotate(-22 60 60)">
        <circle cx="60" cy="60" r="39" fill="none" stroke="${primary}" stroke-width="4.6" />
        <ellipse cx="60" cy="60" rx="39" ry="15.5" fill="none" stroke="${primary}" stroke-width="3.8" />
        <ellipse cx="60" cy="60" rx="17.5" ry="39" fill="none" stroke="${primary}" stroke-width="3.8" />
        <line x1="28" y1="82" x2="92" y2="38" stroke="${accent}" stroke-width="4.2" stroke-linecap="round" />
        <circle cx="43.5" cy="46.2" r="5.6" fill="${knockout}" />
        <circle cx="43.5" cy="46.2" r="3.6" fill="${primary}" />
        <circle cx="76.5" cy="73.8" r="5.6" fill="${knockout}" />
        <circle cx="76.5" cy="73.8" r="3.6" fill="${primary}" />
        <circle cx="92" cy="38" r="6.8" fill="${knockout}" />
        <circle cx="92" cy="38" r="4.8" fill="${accent}" />
        <circle cx="28" cy="82" r="6.8" fill="${knockout}" />
        <circle cx="28" cy="82" r="4.8" fill="${accent}" />
        <circle cx="60" cy="60" r="8.2" fill="${knockout}" />
        <circle cx="60" cy="60" r="5.6" fill="${accent}" />
      </g>
    `;
  }

  if (conceptId === "core-edge") {
    return `
      <path d="M 31 51 L 51 31 M 69 31 L 89 51 M 89 69 L 69 89 M 51 89 L 31 69" fill="none" stroke="${primary}" stroke-width="4.2" stroke-linecap="round" />
      <line x1="60" y1="42" x2="60" y2="27" stroke="${accent}" stroke-width="4.6" stroke-linecap="round" />
      <line x1="78" y1="60" x2="93" y2="60" stroke="${accent}" stroke-width="4.6" stroke-linecap="round" />
      <line x1="60" y1="78" x2="60" y2="93" stroke="${accent}" stroke-width="4.6" stroke-linecap="round" />
      <line x1="42" y1="60" x2="27" y2="60" stroke="${accent}" stroke-width="4.6" stroke-linecap="round" />
      <circle cx="60" cy="22" r="7.5" fill="${knockout}" />
      <circle cx="60" cy="22" r="5.5" fill="${accent}" />
      <circle cx="98" cy="60" r="7.5" fill="${knockout}" />
      <circle cx="98" cy="60" r="5.5" fill="${accent}" />
      <circle cx="60" cy="98" r="7.5" fill="${knockout}" />
      <circle cx="60" cy="98" r="5.5" fill="${accent}" />
      <circle cx="22" cy="60" r="7.5" fill="${knockout}" />
      <circle cx="22" cy="60" r="5.5" fill="${accent}" />
      <g transform="rotate(45 60 60)">
        <rect x="46" y="46" width="28" height="28" rx="4.5" fill="${primary}" />
        <rect x="54.5" y="54.5" width="11" height="11" rx="2" fill="${knockout}" />
      </g>
      <circle cx="60" cy="60" r="3" fill="${accent}" />
    `;
  }

  return `
    <rect x="23" y="23" width="9.5" height="74" rx="1.5" fill="${primary}" />
    <rect x="23" y="23" width="38" height="9.5" rx="1.5" fill="${primary}" />
    <rect x="23" y="55.25" width="30" height="9.5" rx="1.5" fill="${primary}" />
    <rect x="23" y="87.5" width="38" height="9.5" rx="1.5" fill="${primary}" />
    <rect x="87.5" y="23" width="9.5" height="74" rx="1.5" fill="${primary}" />
    <rect x="75" y="23" width="22" height="9.5" rx="1.5" fill="${primary}" />
    <rect x="75" y="87.5" width="22" height="9.5" rx="1.5" fill="${primary}" />
    <line x1="59" y1="28.5" x2="92" y2="91.5" stroke="${accent}" stroke-width="7.5" stroke-linecap="round" />
    <circle cx="59" cy="28" r="6.5" fill="${knockout}" />
    <circle cx="59" cy="28" r="4.4" fill="${accent}" />
    <circle cx="53" cy="60" r="6.5" fill="${knockout}" />
    <circle cx="53" cy="60" r="4.4" fill="${accent}" />
    <circle cx="92" cy="92" r="6.5" fill="${knockout}" />
    <circle cx="92" cy="92" r="4.4" fill="${accent}" />
  `;
}

export function buildStandaloneSymbolSvg(conceptId: ConceptId, variant: SymbolVariant): string {
  const inner = getSymbolInnerSvg(conceptId, variant);
  return `<svg viewBox="0 0 120 120" width="512" height="512" fill="none" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
}

export function downloadSvgFile(filename: string, svgContent: string) {
  const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function wrapTextLines(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    if (!current) {
      current = word;
    } else if (current.length + 1 + word.length <= maxChars) {
      current += " " + word;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/**
 * Generates a self-contained 1920x1080 (16:9) presentation board SVG for clean PNG/SVG export
 * and for passing directly into the Gemini image editing studio.
 */
export function buildFullBoardSvg(lang: Language = "en"): string {
  const W = 1920;
  const H = 1080;
  const headerH = 88;
  const footerH = 112;
  const colW = W / 3;
  const copy = UI_COPY[lang];
  const displayFont = "Plus Jakarta Sans, Noto Sans KR, Arial, sans-serif";
  const bodyFont = "DM Sans, Noto Sans KR, Arial, sans-serif";

  const columnsSvg = LOGO_CONCEPTS.map((concept, idx) => {
    const localized = concept[lang];
    const x0 = idx * colW;
    const cx = x0 + colW / 2;
    const primarySymbolSvg = getSymbolInnerSvg(concept.id, "color");
    const monoSymbolSvg = getSymbolInnerSvg(concept.id, "monochrome");
    const darkSymbolSvg = getSymbolInnerSvg(concept.id, "dark");
    const meaningLines = wrapTextLines(
      localized.strategicMeaning,
      lang === "ko" ? 31 : 52
    );

    const divider =
      idx > 0
        ? `<line x1="${x0}" y1="${headerH + 28}" x2="${x0}" y2="${H - footerH - 28}" stroke="#E8EEF4" stroke-width="2" />`
        : "";

    const previewY = headerH + 634;
    const previewW = 248;
    const previewGap = 18;
    const leftBoxX = x0 + (colW - (previewW * 2 + previewGap)) / 2;
    const rightBoxX = leftBoxX + previewW + previewGap;

    return `
      ${divider}
      <!-- Concept Title -->
      <text x="${x0 + 56}" y="${headerH + 66}" font-family="${displayFont}" font-size="15" font-weight="600" letter-spacing="1.6" fill="#147DAB">${escapeXml(localized.fullTitle)}</text>
      <line x1="${x0 + 56}" y1="${headerH + 86}" x2="${x0 + colW - 56}" y2="${headerH + 86}" stroke="#E8EEF4" stroke-width="1.5" />

      <!-- Primary Symbol Showcase -->
      <rect x="${x0 + 56}" y="${headerH + 112}" width="${colW - 112}" height="284" rx="8" fill="#F8FAFC" stroke="#E8EEF4" stroke-width="1.5" />
      <g transform="translate(${cx - 108}, ${headerH + 146}) scale(1.8)">
        ${primarySymbolSvg}
      </g>

      <!-- Horizontal Lockup: Symbol + EdgeNet Wordmark -->
      <g transform="translate(${cx - 118}, ${headerH + 422})">
        <g transform="translate(0, 0) scale(0.38)">
          ${primarySymbolSvg}
        </g>
        <text x="58" y="34" font-family="${displayFont}" font-size="34" font-weight="600" letter-spacing="-1" fill="#101E35">EdgeNet</text>
      </g>

      <!-- Strategic Meaning -->
      <text x="${x0 + 56}" y="${headerH + 504}" font-family="${bodyFont}" font-size="16" fill="#303B49">
        ${meaningLines
          .map(
            (line, lineIdx) =>
              `<tspan x="${x0 + 56}" dy="${lineIdx === 0 ? 0 : 25}">${escapeXml(line)}</tspan>`
          )
          .join("")}
      </text>

      <!-- Monochrome & Dark Application Previews -->
      <rect x="${leftBoxX}" y="${previewY}" width="${previewW}" height="186" rx="6" fill="#F7F9FC" stroke="#E8EEF4" stroke-width="1.5" />
      <text x="${leftBoxX + 18}" y="${previewY + 30}" font-family="${displayFont}" font-size="11.5" font-weight="600" letter-spacing="1.2" fill="#303B49">${escapeXml(copy.monochrome.toUpperCase())}</text>
      <g transform="translate(${leftBoxX + 42}, ${previewY + 72}) scale(0.46)">
        ${monoSymbolSvg}
      </g>
      <text x="${leftBoxX + 106}" y="${previewY + 108}" font-family="${displayFont}" font-size="22" font-weight="600" letter-spacing="-0.6" fill="#101E35">EdgeNet</text>

      <rect x="${rightBoxX}" y="${previewY}" width="${previewW}" height="186" rx="6" fill="#101E35" />
      <text x="${rightBoxX + 18}" y="${previewY + 30}" font-family="${displayFont}" font-size="11.5" font-weight="600" letter-spacing="1.2" fill="#A5B7CB">${escapeXml(copy.darkSurface.toUpperCase())}</text>
      <g transform="translate(${rightBoxX + 42}, ${previewY + 72}) scale(0.46)">
        ${darkSymbolSvg}
      </g>
      <text x="${rightBoxX + 106}" y="${previewY + 108}" font-family="${displayFont}" font-size="22" font-weight="600" letter-spacing="-0.6" fill="#FFFFFF">EdgeNet</text>
    `;
  }).join("\n");

  const paletteSwatches = BRAND_COLORS.map((swatch, idx) => {
    const sx = 630 + idx * 124;
    const sy = H - footerH + 28;
    return `
      <rect x="${sx}" y="${sy}" width="28" height="28" rx="4" fill="${swatch.hex}" ${
      swatch.isLight ? 'stroke="#303B49" stroke-width="1"' : ""
    } />
      <text x="${sx}" y="${sy + 48}" font-family="IBM Plex Mono, monospace" font-size="12" fill="#E8EEF4">${swatch.hex}</text>
      <text x="${sx}" y="${sy + 64}" font-family="${bodyFont}" font-size="11" fill="#9FB0C4">${escapeXml(swatch.name[lang])}</text>
    `;
  }).join("\n");

  return `
    <svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${W}" height="${H}" fill="#FFFFFF" />

      <!-- Top Header Strip -->
      <rect width="${W}" height="${headerH}" fill="#F8FAFC" />
      <line x1="0" y1="${headerH}" x2="${W}" y2="${headerH}" stroke="#E8EEF4" stroke-width="2" />
      <text x="56" y="53" font-family="${displayFont}" font-size="22" font-weight="600" letter-spacing="-0.4" fill="#101E35">${escapeXml(BRAND_INFO.boardTitle[lang])}</text>
      <text x="${W - 56}" y="53" text-anchor="end" font-family="${bodyFont}" font-size="15" fill="#303B49">${escapeXml(BRAND_INFO.presentingCompany)}  ·  ${escapeXml(BRAND_INFO.descriptor[lang])}</text>

      <!-- Three Concept Columns -->
      <g>${columnsSvg}</g>

      <!-- Restrained Dark Navy Footer -->
      <rect x="0" y="${H - footerH}" width="${W}" height="${footerH}" fill="#101E35" />
      <text x="56" y="${H - footerH + 46}" font-family="${displayFont}" font-size="18" font-weight="600" fill="#FFFFFF">${escapeXml(BRAND_INFO.presentingCompany)}</text>
      <text x="56" y="${H - footerH + 74}" font-family="${bodyFont}" font-size="14" fill="#B5C4D6">${escapeXml(BRAND_INFO.descriptor[lang])}</text>

      ${paletteSwatches}

      <text x="${W - 56}" y="${H - footerH + 60}" text-anchor="end" font-family="${bodyFont}" font-size="14" fill="#B5C4D6">${escapeXml(BRAND_INFO.boardNote[lang])}</text>
    </svg>
  `.trim();
}

export async function svgStringToPngBase64(
  svgString: string,
  width: number,
  height: number
): Promise<{ dataUrl: string; base64: string }> {
  return new Promise((resolve, reject) => {
    const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          URL.revokeObjectURL(url);
          reject(new Error("Canvas 2D context unavailable."));
          return;
        }
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/png");
        const base64 = dataUrl.split(",")[1] ?? "";
        URL.revokeObjectURL(url);
        resolve({ dataUrl, base64 });
      } catch (e) {
        URL.revokeObjectURL(url);
        reject(e);
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to rasterize SVG."));
    };
    img.src = url;
  });
}

export async function downloadBoardAsPng(lang: Language = "en") {
  const svg = buildFullBoardSvg(lang);
  const { dataUrl } = await svgStringToPngBase64(svg, 1920, 1080);
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = `EdgeNet-Logo-Exploration-Board-16x9-${lang}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
