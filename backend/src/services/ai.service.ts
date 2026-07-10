import { env } from '../config/env.js';
import { OpenAIProvider } from './ai/providers/openai.provider.js';
import { GeminiProvider } from './ai/providers/gemini.provider.js';
import { ClaudeProvider } from './ai/providers/claude.provider.js';
import type { AiProvider } from './ai/providers/base-provider.js';

export class AiService {
  private provider: AiProvider;

  constructor() {
    this.provider = this.createProvider();
  }

  async generateSite(prompt: string) {
    const masterPrompt = this.buildMasterPrompt(prompt);
    return this.provider.generateSite(masterPrompt);
  }

  private createProvider(): AiProvider {
    switch (env.AI_PROVIDER) {
      case 'gemini':
        return new GeminiProvider();
      case 'claude':
        return new ClaudeProvider();
      case 'openai':
      default:
        return new OpenAIProvider();
    }
  }

 private buildMasterPrompt(prompt: string): string {
  return `
You are an expert frontend developer.

Generate ONE complete HTML5 website.

IMPORTANT RULES:
- Return ONLY valid HTML.
- Do NOT use markdown.
- Do NOT use triple backticks.
- Include CSS inside <style>.
- Include JavaScript inside <script>.
- The website must be fully responsive.
- Use modern UI.
- Use the following color palette ONLY:

Primary Orange: #F07900
Light Orange: #F8A145
Dark Orange: #D35100
Dark Grey: #151515
Black: #000000
White: #FFFFFF

Include:

- Sticky Navbar
- Hero Section
- About
- Features
- Services
- Testimonials
- FAQ
- Contact Form
- Footer
- Scroll animations
- Hover effects
- CTA buttons
- SEO-friendly HTML

User Request:

${prompt}
`;
}
}
