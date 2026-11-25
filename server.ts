import "dotenv/config";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ALLOWED_ASPECT_RATIOS = new Set([
  "1:1",
  "3:4",
  "4:3",
  "9:16",
  "16:9",
  "1:4",
  "1:8",
  "4:1",
  "8:1",
]);

const ALLOWED_IMAGE_SIZES = new Set(["1K", "2K", "4K"]);

async function startServer() {
  const app = express();
  const port = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: "25mb" }));

  app.post("/api/images/generate", async (req, res) => {
    try {
      const {
        prompt,
        aspectRatio = "16:9",
        imageSize = "1K",
        sourceImageBase64,
        sourceImageMimeType,
      } = req.body ?? {};

      if (typeof prompt !== "string" || !prompt.trim()) {
        res.status(400).json({ error: "Please provide a text prompt describing the image to create or edit." });
        return;
      }

      const apiKey = process.env.GEMINI_API_KEY?.trim();
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        res.status(403).json({
          error:
            "A billing-enabled Gemini API key is required to run gemini-nano-banana-2.1. Please select or add a paid API key in Settings > Secrets.",
          code: "API_KEY_REQUIRED",
        });
        return;
      }

      const safeAspectRatio = ALLOWED_ASPECT_RATIOS.has(aspectRatio) ? aspectRatio : "16:9";
      const safeImageSize = ALLOWED_IMAGE_SIZES.has(imageSize) ? imageSize : "1K";

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const parts: Array<
        | { text: string }
        | { inlineData: { data: string; mimeType: string } }
      > = [];

      if (
        typeof sourceImageBase64 === "string" &&
        sourceImageBase64.length > 0 &&
        typeof sourceImageMimeType === "string" &&
        sourceImageMimeType.startsWith("image/")
      ) {
        parts.push({
          inlineData: {
            data: sourceImageBase64,
            mimeType: sourceImageMimeType,
          },
        });
      }

      parts.push({ text: prompt.trim() });

      const response = await ai.models.generateContent({
        model: "gemini-nano-banana-2.1",
        contents: { parts },
        config: {
          imageConfig: {
            aspectRatio: safeAspectRatio,
            imageSize: safeImageSize,
          },
        },
      });

      let imageDataUrl: string | null = null;
      let modelNote = "";

      const candidateParts = response.candidates?.[0]?.content?.parts ?? [];
      for (const part of candidateParts) {
        if (part.inlineData?.data) {
          const mime = part.inlineData.mimeType ?? "image/png";
          imageDataUrl = `data:${mime};base64,${part.inlineData.data}`;
        } else if (part.text) {
          modelNote += (modelNote ? "\n" : "") + part.text;
        }
      }

      if (!imageDataUrl) {
        res.status(502).json({
          error: modelNote || "The model completed without returning an image. Try refining your prompt.",
        });
        return;
      }

      res.json({
        imageDataUrl,
        note: modelNote || null,
        model: "gemini-nano-banana-2.1",
        aspectRatio: safeAspectRatio,
        imageSize: safeImageSize,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to generate image.";
      const lower = message.toLowerCase();

      if (
        lower.includes("permission_denied") ||
        lower.includes("api_key_invalid") ||
        lower.includes("api key not valid") ||
        lower.includes("403")
      ) {
        res.status(403).json({
          error:
            "Permission denied or invalid API key for gemini-nano-banana-2.1. Please check or select a billing-enabled API key in Settings > Secrets.",
          code: "PERMISSION_DENIED",
        });
        return;
      }

      if (lower.includes("resource_exhausted") || lower.includes("429") || lower.includes("quota")) {
        res.status(429).json({
          error:
            "Quota exceeded for gemini-nano-banana-2.1. Please ensure a billing-enabled API key is selected in Settings > Secrets.",
          code: "RESOURCE_EXHAUSTED",
        });
        return;
      }

      res.status(500).json({ error: message });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath));
      app.get("*", (_req, res) => {
        res.sendFile(path.join(distPath, "index.html"));
      });
    }
  }

  app.listen(port, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
