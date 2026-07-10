import { GoogleGenAI } from "@google/genai";
import { env } from "../../../config/env.js";
import type { AiProvider } from "./base-provider.js";

export class GeminiProvider implements AiProvider {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: env.GEMINI_API_KEY,
    });
  }

  async generateSite(prompt: string): Promise<any> {
    const response = await this.ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const html = response.text ?? "";

    return {
      pages: [
        {
          slug: "index",
          title: "Home",
          content: html,
        },
      ],
      css: "",
      js: "",
      assets: [],
    };
  }
}