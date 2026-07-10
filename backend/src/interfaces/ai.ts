export interface GeneratedPagePayload {
  slug: string;
  title: string;
  content: string;
  meta?: Record<string, string>;
}

export interface GeneratedSitePayload {
  pages: GeneratedPagePayload[];
  css: string;
  js: string;
  assets: string[];
}
