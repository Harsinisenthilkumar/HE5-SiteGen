export const masterPrompt = (prompt: string) => `
You are an expert product designer and frontend engineer.
Create a premium, fully responsive website for the following business description:
${prompt}

Requirements:
- Include these pages: Home, About, Services, Features, Testimonials, FAQ, Contact, Footer.
- Use semantic HTML, accessible navigation, strong contrast, polished spacing, and modern typography.
- Include SEO metadata, Open Graph metadata, favicon placeholder, and performant vanilla JavaScript.
- Return valid JSON only with this shape:
{
  "pages": [
    {
      "slug": "index",
      "title": "Home",
      "content": "<html structure>",
      "meta": { "title": "...", "description": "..." }
    }
  ],
  "css": "...",
  "js": "...",
  "assets": []
}
`;
