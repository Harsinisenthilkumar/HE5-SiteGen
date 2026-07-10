export interface AiProvider {
  generateSite(prompt: string): Promise<any>;
}
