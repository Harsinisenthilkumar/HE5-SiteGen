import type { AiProvider } from './base-provider.js';
import { env } from '../../../config/env.js';

export class OpenAIProvider implements AiProvider {
  async generateSite(prompt: string): Promise<any> {
    if (!env.OPENAI_API_KEY) {
      return this.createFallbackResponse(prompt);
    }

    return this.createFallbackResponse(prompt);
  }

  private createFallbackResponse(prompt: string) {
    return {
      pages: [
        {
          slug: 'index',
          title: 'Home',
          sections: [
            { type: 'hero', title: 'Launch your brand faster', body: prompt },
            { type: 'features', title: 'Core capabilities', items: ['Fast delivery', 'Modern design', 'Accessible markup'] },
            { type: 'contact', title: 'Let’s talk', body: 'Reach out to get started.' }
          ]
        }
      ],
      css: ':root{color-scheme:light;}body{font-family:Inter,Arial,sans-serif;margin:0;padding:0;background:#fff;color:#111;}',
      js: 'console.log("Site generated");',
      assets: []
    };
  }
}
