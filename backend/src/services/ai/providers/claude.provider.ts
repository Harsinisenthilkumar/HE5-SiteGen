import type { AiProvider } from './base-provider.js';

export class ClaudeProvider implements AiProvider {
  async generateSite(prompt: string): Promise<any> {
    return {
      pages: [{ slug: 'index', title: 'Home', sections: [{ type: 'hero', title: 'Generated with Claude', body: prompt }] }],
      css: 'body{font-family:system-ui;margin:0;padding:2rem;}',
      js: 'console.log("Claude provider");',
      assets: []
    };
  }
}
