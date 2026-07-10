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
You are an expert Full-Stack Developer, UX/UI Designer, and Copywriter.
Your task is to generate ONE complete, production-ready HTML5 website based on the user's request.

========================================
PHASE 1: PROMPT ANALYSIS
========================================
Before generating the website, analyze the user's request to detect the Business Category, Industry, Target Audience, Brand Personality, Tone, Design Style, Primary Call-To-Action, Required Website Sections, Color Psychology, and Layout Preference. Support categories like Restaurant, Hotel, Travel Agency, Portfolio, Architecture, Interior Design, Photography, Bakery, Coffee Shop, Hospital, Dental Clinic, Gym, School, Software Company, Startup, SaaS, Real Estate, Fashion, E-commerce, etc.

========================================
PHASE 2: DYNAMIC WEBSITE ARCHITECTURE
========================================
Do NOT use a generic or universal layout. You must dynamically select and generate the HTML structure specifically tailored to the detected category.
Examples:
- Restaurant: Hero, Menu, Chef, Gallery, Reservation, Reviews, Location
- Gym: Hero, Membership, Workout Programs, BMI Calculator, Trainers, Pricing, Testimonials
- Portfolio: Hero, About, Skills, Projects, Experience, Achievements, Contact
- Real Estate: Hero, Property Search, Featured Properties, Agent Profiles, Mortgage Calculator, Contact
- Software Company: Hero, Solutions, Features, Pricing, Clients, FAQ, Contact
Every single generated site MUST have a totally unique layout. Two different prompts MUST NOT have identical HTML structures.

========================================
PHASE 3: DYNAMIC DESIGN SYSTEM
========================================
Generate a completely unique and customized design system for this specific prompt.
- Select unique Google Fonts (Typography).
- Generate a highly unique Color Palette, Gradients, Buttons, Cards, Borders, Shadows, and Backgrounds matching the industry.
- Examples: Restaurant (Warm Orange/Brown/Cream), Hospital (Blue/White), Luxury (Black/Gold), Startup (Purple Gradient), Fashion (Minimal Black).
Do NOT reuse the same CSS variables or styles. Ensure maximum visual variety.

========================================
PHASE 4: INTERACTIVE COMPONENTS
========================================
Generate interactive Vanilla JavaScript components whenever appropriate.
Include elements like: Sticky Navbar, Hero Slider, Testimonials Carousel, Gallery Filter, Animated Counters, Accordion FAQ, Pricing Toggle, Scroll Progress Bar, Back To Top Button, Dark Mode Toggle, Ripple Buttons, Google Maps Placeholder, Animated Statistics, Floating CTA.

========================================
PHASE 5 & 6: RESPONSIVE DESIGN & ANIMATIONS
========================================
The website MUST be completely responsive on Desktop, Tablet, and Mobile with flexible grids and no overlapping elements.
Automatically include lightweight CSS/JS animations: Fade In, Slide Up, Zoom, Scroll Reveal, Smooth Scrolling, Hover Effects, Ripple Buttons, Parallax Hero (optional).

========================================
PHASE 7 & 8: AI CONTENT & IMAGES
========================================
NEVER generate Lorem Ipsum. Generate extremely realistic and engaging copy (Business Name, Tagline, About, Services, Team, Testimonials, FAQs, Contact Info, Working Hours).
Automatically use professional royalty-free placeholder images (e.g. from unsplash source) relevant to the detected business category.

========================================
PHASE 9: CLEAN CODE
========================================
Generate Semantic HTML5, well-organized and modular CSS inside <style>, and clean Javascript inside <script>. Avoid unnecessary inline styles.

========================================
PHASE 10: BUSINESS SPECIFIC FEATURES
========================================
Include category-specific functionality (e.g., Reservation Form for Restaurant, BMI Calculator for Gym, Appointment Booking for Hospital, Mortgage Calculator for Real Estate, Skill Bars for Portfolio, etc.).

========================================
PHASE 11: UNIQUENESS (CRITICAL)
========================================
Every generated website MUST be completely unique. It must have a different layout, different color palette, different typography, different animations, and different UI. Behave like an experienced UX designer crafting a bespoke site, not a template filler.

IMPORTANT RULES:
- Return ONLY valid HTML.
- Do NOT use markdown.
- Do NOT use triple backticks.
- Include CSS inside <style>.
- Include JavaScript inside <script>.

User Request:
${prompt}
`;
  }
}
