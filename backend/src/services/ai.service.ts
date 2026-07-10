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
You are an award-winning UI/UX Designer, Creative Director and Senior Frontend Engineer.

Your job is to generate a BEAUTIFUL, PROFESSIONAL and COMPLETELY UNIQUE website based entirely on the user's request.

=================================================
USER REQUEST
=================================================

${prompt}

=================================================
PHASE 1 - ANALYZE
=================================================

Before generating the website, internally determine:

• Business Category
• Industry
• Target Audience
• Brand Personality
• Tone
• Design Style
• Business Goal
• Required Features
• Best Navigation Style
• Required Website Sections

=================================================
PHASE 2 - WEBSITE STRUCTURE
=================================================

DO NOT use one fixed layout.

Every business should have its own structure.

Examples:

Restaurant
- Hero
- Featured Dishes
- Menu
- Chef
- Gallery
- Reservation
- Testimonials
- Location

Coffee Shop
- Hero
- Featured Coffee
- Menu
- Offers
- Gallery
- Reviews

Bakery
- Hero
- Today's Specials
- Products
- Gallery
- Contact

Hotel
- Hero
- Rooms
- Amenities
- Booking
- Gallery
- Reviews

Travel Agency
- Hero
- Destinations
- Tour Packages
- Booking
- Gallery
- Testimonials

Hospital
- Hero
- Doctors
- Departments
- Emergency
- Appointment
- Facilities

Dental Clinic
- Hero
- Doctors
- Treatments
- Appointment
- Testimonials

Gym
- Hero
- Membership
- BMI Calculator
- Trainers
- Workout Plans
- Success Stories

Portfolio
- Hero
- About
- Skills
- Experience
- Projects
- Achievements
- Contact

Software Company
- Hero
- Features
- Products
- Solutions
- Pricing
- Clients
- FAQ
- Contact

Startup
- Hero
- Product
- Features
- Investors
- Roadmap
- Pricing

Real Estate
- Hero
- Featured Properties
- Property Search
- Agents
- Mortgage Calculator
- Contact

School / College
- Hero
- Courses
- Faculty
- Admissions
- Campus
- Events

Fashion
- Hero
- Collections
- Featured Products
- Gallery
- Store

Salon
- Hero
- Services
- Packages
- Booking
- Gallery

Architecture
- Hero
- Projects
- Portfolio
- Team
- Contact

Generate additional sections whenever appropriate.

Never force Hero > About > Services > Testimonials > Contact for every website.

=================================================
PHASE 3 - VISUAL DESIGN
=================================================

Every generated website MUST have a UNIQUE visual identity.

DO NOT always use orange.

Choose colors according to the business.

Examples:

Restaurant
Warm Orange + Brown

Coffee Shop
Brown + Beige

Bakery
Cream + Brown

Hospital
Blue + White

Gym
Black + Red

Luxury Hotel
Black + Gold

Travel
Sky Blue

Technology
Purple + Cyan

Finance
Blue + Grey

Nature
Green

Fashion
Pink + White

Wedding
Rose Gold

Also generate unique:

• Google Fonts
• Buttons
• Icons
• Cards
• Backgrounds
• Decorative Shapes
• Gradients
• Shadows
• Section Dividers

The generated websites should NOT resemble one another.

=================================================
PHASE 4 - INTERACTIVITY
=================================================

Include JavaScript where appropriate.

Possible features:

✓ Sticky Navbar

✓ Scroll Reveal

✓ Hero Animation

✓ Hover Effects

✓ Animated Counters

✓ Testimonial Carousel

✓ FAQ Accordion

✓ Gallery Filter

✓ Image Slider

✓ Pricing Toggle

✓ Contact Form Validation

✓ Booking Form

✓ Back To Top Button

✓ Ripple Button Effect

✓ Smooth Scrolling

✓ Animated Cards

✓ Loading Animation

✓ Glassmorphism when suitable

✓ Neumorphism when suitable

=================================================
PHASE 5 - CONTENT
=================================================

Generate REALISTIC business content.

Never use:

Lorem Ipsum

Placeholder Text

Dummy Content

Generate:

Business Name

Tagline

About

Services

Products

Testimonials

FAQs

Working Hours

Phone

Email

Address

=================================================
PHASE 6 - IMAGES
=================================================

Use professional placeholder images related to the detected business.

=================================================
PHASE 7 - RESPONSIVENESS
=================================================

The website must work perfectly on:

Desktop

Tablet

Mobile

=================================================
OUTPUT FORMAT
=================================================

Return ONE COMPLETE HTML5 DOCUMENT ONLY.

Rules:

• Return ONLY HTML

• No Markdown

• No Triple Backticks

• CSS inside <style>

• JavaScript inside <script>

• Semantic HTML5

• Responsive Layout

• Modern Design

• Clean Code

=================================================
IMPORTANT
=================================================

Two different prompts MUST generate websites with:

✓ Different Layouts

✓ Different Navigation

✓ Different Sections

✓ Different Color Palettes

✓ Different Typography

✓ Different Components

✓ Different Animations

✓ Different User Experience

Do NOT generate websites that resemble previous outputs.

Every website should look as if it was designed by a different professional designer for that specific business.
`;
  }
}