import React, { useEffect, useRef, useState } from "react";
import { Download, ImagePlus, Loader2, Sparkles, Trash2, Upload, X } from "lucide-react";
import { ConceptId, Language, LOGO_CONCEPTS, UI_COPY } from "../data/concepts";
import {
  buildFullBoardSvg,
  buildStandaloneSymbolSvg,
  svgStringToPngBase64,
} from "../utils/exportBoard";

interface GeneratedImageRecord {
  id: string;
  prompt: string;
  imageDataUrl: string;
  aspectRatio: string;
  imageSize: string;
  note: string | null;
  mode: "create" | "edit";
}

interface ImageStudioModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
  initialSourceImage?: {
    dataUrl: string;
    base64: string;
    label: string;
  } | null;
}

export const ImageStudioModal: React.FC<ImageStudioModalProps> = ({
  isOpen,
  lang,
  onClose,
  initialSourceImage = null,
}) => {
  const copy = UI_COPY[lang];
  const [prompt, setPrompt] = useState("");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [imageSize, setImageSize] = useState("1K");
  const [sourceImage, setSourceImage] = useState<{
    dataUrl: string;
    base64: string;
    mimeType: string;
    label: string;
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [history, setHistory] = useState<GeneratedImageRecord[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (initialSourceImage) {
      setSourceImage({
        dataUrl: initialSourceImage.dataUrl,
        base64: initialSourceImage.base64,
        mimeType: "image/png",
        label: initialSourceImage.label,
      });
      if (!prompt) {
        setPrompt(copy.presets[0].prompt);
      }
    }
  }, [initialSourceImage]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLoadConceptSource = async (conceptId: ConceptId) => {
    const concept = LOGO_CONCEPTS.find((c) => c.id === conceptId);
    const svg = buildStandaloneSymbolSvg(conceptId, "color");
    const { dataUrl, base64 } = await svgStringToPngBase64(svg, 1024, 1024);
    setSourceImage({
      dataUrl,
      base64,
      mimeType: "image/png",
      label: concept ? concept[lang].fullTitle : conceptId,
    });
    setErrorMessage(null);
  };

  const handleLoadBoardSource = async () => {
    const svg = buildFullBoardSvg(lang);
    const { dataUrl, base64 } = await svgStringToPngBase64(svg, 1920, 1080);
    setSourceImage({
      dataUrl,
      base64,
      mimeType: "image/png",
      label: copy.fullBoardLabel,
    });
    setErrorMessage(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrorMessage(copy.invalidImageError);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      const base64 = result.split(",")[1] ?? "";
      if (!base64) {
        setErrorMessage(copy.readImageError);
        return;
      }
      setSourceImage({
        dataUrl: result,
        base64,
        mimeType: file.type,
        label: file.name,
      });
      setErrorMessage(null);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/images/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: prompt.trim(),
          aspectRatio,
          imageSize,
          sourceImageBase64: sourceImage?.base64,
          sourceImageMimeType: sourceImage?.mimeType,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorMessage(data?.error || copy.genFailedError);
        return;
      }

      const record: GeneratedImageRecord = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        prompt: prompt.trim(),
        imageDataUrl: data.imageDataUrl,
        aspectRatio: data.aspectRatio ?? aspectRatio,
        imageSize: data.imageSize ?? imageSize,
        note: data.note ?? null,
        mode: sourceImage ? "edit" : "create",
      };

      setHistory((prev) => [record, ...prev]);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : copy.networkError
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUseAsSource = (item: GeneratedImageRecord) => {
    const [prefix, base64] = item.imageDataUrl.split(",");
    const mimeMatch = prefix.match(/data:(.*?);base64/);
    setSourceImage({
      dataUrl: item.imageDataUrl,
      base64: base64 ?? "",
      mimeType: mimeMatch?.[1] ?? "image/png",
      label: copy.previousImageLabel,
    });
  };

  const handleDownloadResult = (item: GeneratedImageRecord) => {
    const a = document.createElement("a");
    a.href = item.imageDataUrl;
    a.download = `edgenet-studio-${item.id}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#101E35]/65 dark:bg-black/75 backdrop-blur-[2px] p-4 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="studio-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-5xl bg-white dark:bg-[#101D32] border border-[#E8EEF4] dark:border-[#213350] rounded-xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8EEF4] dark:border-[#1E2F4A] bg-[#F8FAFC] dark:bg-[#0D182A]">
          <div className="flex items-center gap-3">
            <h2 id="studio-title" className="font-display text-base font-semibold text-[#101E35] dark:text-white">
              {copy.studioTitle}
            </h2>
            <span className="text-[#303B49]/40 dark:text-white/25" aria-hidden="true">·</span>
            <span className="font-mono text-xs text-[#303B49] dark:text-[#A8B8CD]">gemini-nano-banana-2.1</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-2 text-[#303B49] dark:text-[#A8B8CD] hover:text-[#101E35] dark:hover:text-white hover:bg-[#E8EEF4]/60 dark:hover:bg-[#1A2D49] rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#147DAB]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 min-h-0 overflow-y-auto">
          {/* Left Form Panel */}
          <form
            onSubmit={handleGenerate}
            className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-[#E8EEF4] dark:border-[#1E2F4A] space-y-5 bg-white dark:bg-[#101D32]"
          >
            {/* Reference / Edit Source Image */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-[#101E35] dark:text-white">
                  {copy.refImageLabel}
                </label>
                {sourceImage && (
                  <button
                    type="button"
                    onClick={() => setSourceImage(null)}
                    className="inline-flex items-center gap-1 text-xs text-[#303B49] dark:text-[#A8B8CD] hover:text-[#101E35] dark:hover:text-white transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    {copy.clear}
                  </button>
                )}
              </div>

              {sourceImage ? (
                <div className="flex items-center gap-3 p-2.5 bg-[#F8FAFC] dark:bg-[#15243C] border border-[#E8EEF4] dark:border-[#243858] rounded-lg">
                  <img
                    src={sourceImage.dataUrl}
                    alt={sourceImage.label}
                    className="w-14 h-14 object-contain bg-white border border-[#E8EEF4] rounded"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-medium text-[#101E35] dark:text-white truncate">
                      {sourceImage.label}
                    </div>
                    <div className="text-[11px] text-[#303B49] dark:text-[#A8B8CD] mt-0.5">
                      {copy.editModeActive}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-[#F8FAFC] dark:bg-[#15243C] border border-dashed border-[#CBD5E1] dark:border-[#2A4063] rounded-lg space-y-2.5">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#101E35] dark:text-[#E8EEF4] bg-white dark:bg-[#101D32] border border-[#E8EEF4] dark:border-[#2A4063] hover:border-[#147DAB] rounded transition-colors whitespace-nowrap shrink-0"
                    >
                      <Upload className="w-3.5 h-3.5 text-[#147DAB]" />
                      {copy.uploadImage}
                    </button>
                    <button
                      type="button"
                      onClick={handleLoadBoardSource}
                      className="px-2.5 py-1.5 text-xs font-medium text-[#303B49] dark:text-[#B5C4D6] bg-white dark:bg-[#101D32] border border-[#E8EEF4] dark:border-[#2A4063] hover:border-[#147DAB] rounded transition-colors whitespace-nowrap shrink-0"
                    >
                      {copy.loadBoard}
                    </button>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {LOGO_CONCEPTS.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => handleLoadConceptSource(c.id)}
                        className="px-2.5 py-1 text-[11px] font-medium text-[#303B49] dark:text-[#B5C4D6] bg-white dark:bg-[#101D32] border border-[#E8EEF4] dark:border-[#2A4063] hover:border-[#147DAB] hover:text-[#101E35] dark:hover:text-white rounded transition-colors whitespace-nowrap shrink-0"
                      >
                        {c.number} {c[lang].name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Prompt Input */}
            <div className="space-y-2">
              <label htmlFor="studio-prompt" className="block text-xs font-medium text-[#101E35] dark:text-white">
                {copy.promptLabel}
              </label>
              <textarea
                id="studio-prompt"
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={copy.promptPlaceholder}
                className="w-full px-3 py-2.5 text-sm text-[#101E35] dark:text-white placeholder:text-[#303B49]/60 dark:placeholder:text-[#8A9BB0] bg-white dark:bg-[#0D182A] border border-[#E8EEF4] dark:border-[#243858] rounded-lg focus:outline-none focus:border-[#147DAB] focus:ring-1 focus:ring-[#147DAB] resize-none"
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                {copy.presets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => setPrompt(preset.prompt)}
                    className="px-2.5 py-1 text-[11px] text-[#303B49] dark:text-[#B5C4D6] bg-[#F8FAFC] dark:bg-[#15243C] border border-[#E8EEF4] dark:border-[#243858] hover:border-[#147DAB] hover:text-[#101E35] dark:hover:text-white rounded transition-colors whitespace-nowrap shrink-0"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio & Resolution */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="studio-aspect" className="block text-xs font-medium text-[#101E35] dark:text-white mb-1.5">
                  {copy.aspectRatio}
                </label>
                <select
                  id="studio-aspect"
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono text-[#101E35] dark:text-white bg-white dark:bg-[#0D182A] border border-[#E8EEF4] dark:border-[#243858] rounded-lg focus:outline-none focus:border-[#147DAB]"
                >
                  <option value="16:9">{copy.aspectOptions["16:9"]}</option>
                  <option value="4:3">{copy.aspectOptions["4:3"]}</option>
                  <option value="1:1">{copy.aspectOptions["1:1"]}</option>
                  <option value="3:4">{copy.aspectOptions["3:4"]}</option>
                </select>
              </div>
              <div>
                <label htmlFor="studio-size" className="block text-xs font-medium text-[#101E35] dark:text-white mb-1.5">
                  {copy.resolution}
                </label>
                <select
                  id="studio-size"
                  value={imageSize}
                  onChange={(e) => setImageSize(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-mono text-[#101E35] dark:text-white bg-white dark:bg-[#0D182A] border border-[#E8EEF4] dark:border-[#243858] rounded-lg focus:outline-none focus:border-[#147DAB]"
                >
                  <option value="1K">1K</option>
                  <option value="2K">2K</option>
                  <option value="4K">4K</option>
                </select>
              </div>
            </div>

            {errorMessage && (
              <div
                role="alert"
                className="p-3 text-xs leading-relaxed text-[#7F1D1D] dark:text-[#FECACA] bg-[#FEF2F2] dark:bg-[#450A0A]/60 border border-[#FECACA] dark:border-[#991B1B] rounded-lg"
              >
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={!prompt.trim() || isGenerating}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#101E35] dark:bg-[#147DAB] hover:bg-[#147DAB] dark:hover:bg-[#1B92C7] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#147DAB]"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {copy.generating}
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  {sourceImage ? copy.editImageBtn : copy.createImageBtn}
                </>
              )}
            </button>
          </form>

          {/* Right Output Canvas */}
          <div className="lg:col-span-7 p-6 bg-[#F8FAFC] dark:bg-[#0C1626] flex flex-col min-h-[360px]">
            {history.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12 border border-[#E8EEF4] dark:border-[#213350] rounded-lg bg-white dark:bg-[#101D32]">
                <div className="w-11 h-11 rounded-lg bg-[#E8EEF4]/60 dark:bg-[#15243C] flex items-center justify-center mb-3">
                  <ImagePlus className="w-5 h-5 text-[#147DAB] dark:text-[#4AB0DA]" />
                </div>
                <h3 className="font-display text-sm font-semibold text-[#101E35] dark:text-white">
                  {copy.studioEmptyTitle}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-[#303B49] dark:text-[#B5C4D6] max-w-sm">
                  {copy.studioEmptyBody}{" "}
                  <span className="font-mono">gemini-nano-banana-2.1</span>.
                </p>
              </div>
            ) : (
              <div className="space-y-4 overflow-y-auto">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-[#101D32] border border-[#E8EEF4] dark:border-[#213350] rounded-lg overflow-hidden"
                  >
                    <div className="bg-[#101E35]/5 dark:bg-[#070E1A] flex items-center justify-center p-3">
                      <img
                        src={item.imageDataUrl}
                        alt={item.prompt}
                        className="max-h-72 w-auto rounded object-contain"
                      />
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between gap-2 text-[11px] font-mono text-[#303B49] dark:text-[#A8B8CD]">
                        <span>
                          {item.mode === "edit" ? copy.editedLabel : copy.createdLabel} · {item.aspectRatio} · {item.imageSize}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleUseAsSource(item)}
                            className="px-2.5 py-1 text-xs font-sans font-medium text-[#101E35] dark:text-[#E8EEF4] bg-[#F8FAFC] dark:bg-[#15243C] border border-[#E8EEF4] dark:border-[#243858] hover:border-[#147DAB] rounded transition-colors"
                          >
                            {copy.editFurther}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDownloadResult(item)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-sans font-medium text-white bg-[#101E35] dark:bg-[#147DAB] hover:bg-[#147DAB] dark:hover:bg-[#1B92C7] rounded transition-colors"
                          >
                            <Download className="w-3 h-3" />
                            PNG
                          </button>
                        </div>
                      </div>
                      <p className="text-xs text-[#303B49] dark:text-[#B5C4D6] leading-relaxed">{item.prompt}</p>
                      {item.note && (
                        <p className="text-[11px] text-[#303B49]/80 dark:text-[#9FB0C4] border-t border-[#E8EEF4] dark:border-[#1E2F4A] pt-2">
                          {item.note}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
