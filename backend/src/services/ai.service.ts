import { env } from '../config/env.js';
import { OpenAIProvider } from './ai/providers/openai.provider.js';
import { GeminiProvider } from './ai/providers/gemini.provider.js';
import { ClaudeProvider } from './ai/providers/claude.provider.js';
import type { AiProvider } from './ai/providers/base-provider.js';

// ─── Category Detection ───────────────────────────────────────────────────────

interface CategoryProfile {
  category: string;
  palette: string;
  fonts: string;
  sections: string;
  features: string;
  hero: string;
  tone: string;
  unsplashKeywords: string;
}

function detectCategory(prompt: string): CategoryProfile {
  const p = prompt.toLowerCase();

  // ── Restaurant / Food / Cafe ──────────────────────────────────────────────
  if (/restaurant|bistro|diner|eatery|fine dining|cuisine/.test(p)) {
    return {
      category: 'Restaurant',
      palette: 'Warm Terracotta #9B4221, Deep Mahogany #3B1A08, Cream #FDF6EC, Sage Green #7B8C5A, Gold #D4A853',
      fonts: 'Playfair Display (headings), Lato (body)',
      sections: 'Sticky Navbar, Full-screen Hero with background video/image overlay, Today\'s Specials Cards, Interactive Menu with category tabs (Starters / Mains / Desserts / Drinks), Chef\'s Profile with story, Image Gallery with lightbox, Reservation Form with date-time picker, Customer Reviews carousel, Location with embedded map, Footer',
      features: 'Interactive menu tab switcher in JS, Reservation form with validation, Animated dish cards with price tags, Scroll reveal animations, Fixed reservation CTA button floating at bottom-right',
      hero: 'Full-screen image hero with parallax effect, overlay gradient, large italic headline, subtitle, two CTAs: "Reserve a Table" and "View Menu"',
      tone: 'Warm, inviting, sophisticated, passionate about food',
      unsplashKeywords: 'restaurant,food,chef,fine-dining,cuisine',
    };
  }

  // ── Hotel / Resort / Accommodation ────────────────────────────────────────
  if (/hotel|resort|lodge|accommodation|boutique hotel|luxury stay/.test(p)) {
    return {
      category: 'Hotel',
      palette: 'Deep Navy #0A2342, Champagne Gold #C9A96E, Ivory #FAFAF8, Warm Grey #8C8C8C, Emerald #2D6A4F',
      fonts: 'Cormorant Garamond (headings), Source Sans Pro (body)',
      sections: 'Transparent Navbar, Fullscreen cinematic Hero with hero slider, Room Types showcase grid, Amenities icons section, Availability Booking Widget, Photo Gallery with masonry layout, Guest Reviews with star ratings, Location & Directions, Footer with newsletter',
      features: 'Hero room slider with JS, Booking form with check-in/check-out date fields, Amenities animated icons, Room hover cards with "Book Now" CTA, Animated counter stats (guests served, awards, etc.), Parallax sections',
      hero: 'Full-screen cinematic slider with 3 slides, each with a different room/property image, smooth fade transition, large headline and CTA "Book Your Stay"',
      tone: 'Luxurious, refined, calm, exclusive',
      unsplashKeywords: 'luxury-hotel,resort,hotel-room,lobby,pool',
    };
  }

  // ── Hospital / Clinic / Healthcare ────────────────────────────────────────
  if (/hospital|clinic|healthcare|medical center|doctor|physician|dental|dentist|health/.test(p)) {
    return {
      category: 'Hospital',
      palette: 'Trust Blue #1B4F9E, Medical White #F8FBFF, Light Sky #E8F4FD, Soft Green #28A745, Alert Red #DC3545',
      fonts: 'Nunito (headings), Open Sans (body)',
      sections: 'Sticky Navbar with emergency hotline, Hero with appointment CTA, Departments grid with icons, Featured Doctors profiles, Facilities & Equipment section, Appointment Booking Form, Patient Testimonials, Emergency Contact banner, FAQ Accordion, Footer',
      features: 'Appointment booking form with specialty selector, Emergency floating banner, Doctor profile cards with specialization, Department icon grid, Animated health stats counters (patients treated, doctors, years), FAQ accordion',
      hero: 'Split-screen hero: left side headline "Your Health Is Our Priority" with appointment CTA button, right side illustration or medical image. Clean, clinical, trustworthy look.',
      tone: 'Professional, trustworthy, compassionate, reassuring',
      unsplashKeywords: 'hospital,doctor,medical,healthcare,clinic',
    };
  }

  // ── Gym / Fitness / Training ──────────────────────────────────────────────
  if (/gym|fitness|workout|bodybuilding|crossfit|yoga|training center|wellness center/.test(p)) {
    return {
      category: 'Gym',
      palette: 'Pitch Black #0D0D0D, Energy Red #E63946, Steel Grey #2B2D42, Electric Yellow #FEDD00, Pure White #FFFFFF',
      fonts: 'Oswald (headings), Roboto (body)',
      sections: 'Dark sticky Navbar, Full-bleed Hero with bold typography and video background, Stats counter row (members, trainers, classes), Workout Programs grid, Trainer profiles, BMI Calculator widget, Membership Pricing cards with toggle (monthly/yearly), Testimonials, Schedule timetable, Contact, Footer',
      features: 'Working BMI Calculator with JS (weight/height input → result display), Membership pricing toggle (monthly vs annual), Animated counter stats, Trainer cards with hover flip, Program cards with hover effects, Scroll reveal for all sections',
      hero: 'Full-bleed dark hero with high-contrast text, energetic tagline like "FORGE YOUR LIMITS", bold CTA "Start Training Today", animated pulsing background with subtle grid pattern',
      tone: 'High-energy, motivational, bold, powerful, intense',
      unsplashKeywords: 'gym,fitness,workout,bodybuilding,training',
    };
  }

  // ── Travel Agency / Tour Operator ─────────────────────────────────────────
  if (/travel|tour|tourism|destination|vacation|holiday|adventure|trek/.test(p)) {
    return {
      category: 'Travel',
      palette: 'Ocean Blue #006994, Sandy Beige #F5E6CA, Coral #FF6B6B, Turquoise #20B2AA, Deep Forest #1A3C34',
      fonts: 'Raleway (headings), Merriweather (body)',
      sections: 'Transparent-to-solid Navbar, Hero with search bar (destination/date/travelers), Popular Destinations cards, Featured Packages with pricing, Why Choose Us section, Photo Gallery with lightbox, Testimonials carousel, Booking Form, Newsletter, Footer',
      features: 'Destination search/filter cards in JS, Package cards with hover reveal, Interactive gallery with lightbox JS, Testimonial carousel, Booking form with destination dropdown, Animated counter (destinations, travelers, years)',
      hero: 'Full-screen nature/travel image hero with search widget overlaid: "Where do you want to go?" input + date picker + search button. Large inspirational tagline above.',
      tone: 'Adventurous, inspiring, wanderlust-inducing, vibrant',
      unsplashKeywords: 'travel,destination,adventure,vacation,landmark',
    };
  }

  // ── Bakery / Pastry ───────────────────────────────────────────────────────
  if (/bakery|pastry|cake|bread|bake|confectionery|patisserie|sweet shop/.test(p)) {
    return {
      category: 'Bakery',
      palette: 'Warm Cream #FFF8F0, Dusty Rose #E8A598, Chocolate Brown #5C3D2E, Soft Pink #F9C0C0, Vanilla #FFF3CD',
      fonts: 'Dancing Script (display headings), Nunito (body)',
      sections: 'Cute Navbar with logo, Cozy hero with fresh-baked imagery, Today\'s Specials highlight section, Full Menu with categories (Breads / Cakes / Pastries / Seasonal), Custom Cake Order Form, Gallery of creations, Customer Reviews, About the Baker story, Opening Hours, Contact & Location, Footer',
      features: 'Menu category tabs with JS filter, Custom cake order form with flavor/size/date fields, Gallery with CSS masonry grid, Animated daily specials badge, Scroll reveal animations, Floating "Order Now" button',
      hero: 'Warm, cozy hero with large beautiful bakery/cake image, hand-lettered style headline like "Baked With Love Every Morning", subtitle and "Shop Now" + "Order Custom Cake" CTAs',
      tone: 'Warm, artisanal, homey, delightful, charming',
      unsplashKeywords: 'bakery,cake,bread,pastry,sweets',
    };
  }

  // ── Coffee Shop ───────────────────────────────────────────────────────────
  if (/coffee|cafe|espresso|cappuccino|latte|brew|barista/.test(p)) {
    return {
      category: 'Coffee Shop',
      palette: 'Rich Espresso #2C1810, Warm Latte #C4956A, Cream Foam #F7F0E6, Soft Mocha #8B6355, Leaf Green #5C8A5A',
      fonts: 'Libre Baskerville (headings), Source Serif Pro (body)',
      sections: 'Minimal Navbar, Moody hero with steaming coffee imagery, Featured Drinks showcase, Full Menu (Coffee / Tea / Cold Brew / Food), About & Origin Story, Coffee Process (farm to cup), Gallery of drinks and ambiance, Customer Reviews, Loyalty Program CTA, Location & Hours, Footer',
      features: 'Featured drinks hover cards, Menu with category JS filter, Loyalty program signup form, Animated bean-to-cup infographic section, Parallax hero, Customer reviews carousel',
      hero: 'Dark, moody, atmospheric hero. Large warm image of latte art or espresso. Minimal headline "Every Sip Tells a Story". Subtle grain texture overlay. CTA: "Explore Our Menu"',
      tone: 'Cozy, artisanal, slow-living, mindful, warm',
      unsplashKeywords: 'coffee,cafe,espresso,latte,coffeeshop',
    };
  }

  // ── Spa / Salon / Beauty ──────────────────────────────────────────────────
  if (/spa|salon|beauty|wellness|skincare|massage|nail|hair studio|blow dry/.test(p)) {
    return {
      category: 'Spa & Salon',
      palette: 'Blush Pink #F2AABB, Sage #8FB8A0, Ivory White #FAFAF8, Rose Gold #B76E79, Charcoal #3D3D3D',
      fonts: 'Gilda Display (headings), Montserrat (body)',
      sections: 'Elegant Navbar, Serene hero with calm imagery, Services & Treatments grid with icons, About the Team, Booking/Appointment Form, Price List, Before & After Gallery, Testimonials, Gift Cards promo section, Contact & Hours, Footer',
      features: 'Appointment booking form with service selector and time slots, Service cards with elegant hover animations, Price list accordion, Gallery with CSS masonry grid, Animated relaxing particle background on hero',
      hero: 'Serene, minimal hero with soft floral/spa imagery. Elegant script headline "Indulge Your Senses". Tagline about wellness. CTA "Book Your Treatment"',
      tone: 'Luxurious, serene, calming, feminine, sophisticated',
      unsplashKeywords: 'spa,salon,beauty,wellness,massage',
    };
  }

  // ── Portfolio / Freelancer / Creative ─────────────────────────────────────
  if (/portfolio|freelancer|personal brand|creative professional|designer|developer|photographer/.test(p)) {
    return {
      category: 'Portfolio',
      palette: 'Midnight Black #0A0A0A, Electric Violet #7C3AED, Soft White #F8F8F8, Accent Cyan #06B6D4, Mid Grey #4B5563',
      fonts: 'Space Grotesk (headings), Inter (body)',
      sections: 'Minimal Fixed Navbar, Hero with animated text typewriter effect, About with photo, Skill Bars section, Projects/Work showcase grid with filter, Experience & Timeline, Achievements/Awards, Testimonials, Contact Form with social links, Footer',
      features: 'Animated typewriter text effect on hero, Animated skill progress bars with JS, Project filter by category (Web/Mobile/Design etc.), Timeline for experience, Dark/Light mode toggle, Smooth scroll, Back to top button',
      hero: 'Dark hero with large name, animated typewriter for roles (Designer / Developer / Creator), subtle gradient background or particle effect, "View My Work" and "Hire Me" CTAs',
      tone: 'Modern, minimalist, bold, creative, professional',
      unsplashKeywords: 'design,portfolio,creative,workspace,minimal',
    };
  }

  // ── Real Estate / Property ────────────────────────────────────────────────
  if (/real estate|property|realty|realtor|homes for sale|apartment|housing|mortgage|land developer/.test(p)) {
    return {
      category: 'Real Estate',
      palette: 'Navy Blue #1B2A4A, Pure White #FFFFFF, Warm Gold #C9A84C, Light Grey #F3F4F6, Steel #64748B',
      fonts: 'Merriweather (headings), Lato (body)',
      sections: 'Clean Navbar with phone CTA, Hero with property search widget, Featured Listings grid with images, Property Categories, Agent Profiles, Mortgage Calculator widget, Why Choose Us stats, Testimonials, Newsletter Signup, Contact & Office Location, Footer',
      features: 'Working Mortgage Calculator (loan/interest/term → monthly payment), Property listing cards with image carousel, Search/filter by property type, Agent profile cards, Animated stats counters, Contact form with property interest selector',
      hero: 'Clean professional hero with city/property background image, headline "Find Your Perfect Home", property search bar with Type/Location/Price filters prominently overlaid',
      tone: 'Professional, trustworthy, authoritative, aspirational',
      unsplashKeywords: 'real-estate,property,house,architecture,home',
    };
  }

  // ── Architecture / Interior Design ────────────────────────────────────────
  if (/architect|architecture|interior design|interior decorator|space design|construction firm/.test(p)) {
    return {
      category: 'Architecture',
      palette: 'Concrete Grey #6B7280, Off White #F9F7F5, Dark Slate #1C1C1E, Copper #B87333, Warm Wood #8B6914',
      fonts: 'DM Serif Display (headings), Work Sans (body)',
      sections: 'Minimal editorial Navbar, Full-screen architecture hero, About & Philosophy, Services (Architecture / Interior / Landscaping), Project Showcase with category filter, Process Timeline (Concept → Design → Build), Awards & Recognition, Team Profiles, Client Testimonials, Contact, Footer',
      features: 'Project portfolio filter by type (Residential/Commercial/Interior), Process timeline animation, Parallax scrolling images, Image hover zoom effect, Team profile cards, Awards counter stats',
      hero: 'Dramatic full-screen architectural photography with subtle overlay. Minimal editorial headline. "We Build Dreams Into Reality". CTA: "View Our Projects"',
      tone: 'Minimal, editorial, sophisticated, precise, visionary',
      unsplashKeywords: 'architecture,building,interior-design,modern-home,structure',
    };
  }

  // ── Photography Studio ────────────────────────────────────────────────────
  if (/photography|photographer|photo studio|portrait|wedding photo|photoshoot/.test(p)) {
    return {
      category: 'Photography',
      palette: 'Jet Black #111111, Pure White #FEFEFE, Muted Gold #C8A951, Warm Grey #A0A0A0, Blush #F4D4C8',
      fonts: 'Playfair Display (headings), Crimson Text (body)',
      sections: 'Edge-to-edge dark Navbar, Hero with full-bleed photography, About the Photographer, Services (Weddings / Portraits / Commercial / Events), Portfolio Gallery with lightbox, Equipment & Style, Pricing Packages, Booking Request Form, Testimonials, Contact, Footer',
      features: 'Lightbox gallery with JS (click to expand, ESC to close, arrow navigation), Portfolio category filter, Pricing package cards, Booking form with session type selector, Masonry grid gallery, Parallax hero',
      hero: 'Ultra-minimal dark hero with a stunning editorial photograph as background, minimal white text, "Capturing Moments That Last Forever", soft CTA',
      tone: 'Artistic, editorial, emotive, minimalist, cinematic',
      unsplashKeywords: 'photography,portrait,camera,wedding,photoshoot',
    };
  }

  // ── School / College / University ─────────────────────────────────────────
  if (/school|college|university|academy|education|institute|learning center|tutoring/.test(p)) {
    return {
      category: 'Education',
      palette: 'Royal Blue #1E40AF, Sunshine Yellow #FCD34D, White #FFFFFF, Light Blue #DBEAFE, Forest Green #166534',
      fonts: 'Poppins (headings), Roboto (body)',
      sections: 'Institutional Navbar with admission CTA, Hero with campus imagery, Stats (students, faculty, programs, years), About & Mission, Courses/Programs grid, Faculty Profiles, Campus Life gallery, Admission Process steps, Testimonials, Events Calendar, Contact, Footer',
      features: 'Course category filter, Faculty profile cards, Admission steps timeline, Events accordion, Stats counter animation, Newsletter subscription, Campus gallery with hover overlay',
      hero: 'Bright, aspirational hero with campus image. Bold headline "Shape Your Future With Us". Stats row below. "Apply Now" and "Explore Programs" CTAs.',
      tone: 'Aspirational, professional, welcoming, achievement-focused',
      unsplashKeywords: 'university,campus,education,students,library',
    };
  }

  // ── Software / SaaS / Tech Startup ────────────────────────────────────────
  if (/software|saas|startup|tech|app|platform|ai tool|product|devops|cloud/.test(p)) {
    return {
      category: 'Software / SaaS',
      palette: 'Deep Indigo #312E81, Electric Purple #7C3AED, Neon Cyan #06B6D4, Dark BG #0F172A, Off White #F8FAFC',
      fonts: 'Plus Jakarta Sans (headings), Inter (body)',
      sections: 'Dark glassmorphism Navbar, Hero with product mockup/dashboard screenshot, Social proof logos row, Features grid (3 or 6 cards with icons), How It Works (3-step process), Pricing Table with monthly/yearly toggle, Integrations section, Customer Testimonials, FAQ Accordion, Final CTA section, Footer',
      features: 'Pricing monthly/annual JS toggle with savings badge, FAQ accordion, Animated gradient hero background, Glassmorphism cards, Animated counter stats (users, uptime, integrations), Smooth scroll reveal for all sections, Dark mode default',
      hero: 'Dark hero with animated mesh/gradient background, product dashboard screenshot floating with subtle 3D tilt on hover, compelling headline, subtitle with benefit keywords highlighted in gradient, "Start Free Trial" + "Watch Demo" CTAs',
      tone: 'Modern, technical, innovative, confident, bold',
      unsplashKeywords: 'technology,software,dashboard,startup,code',
    };
  }

  // ── Fashion / E-commerce / Retail ─────────────────────────────────────────
  if (/fashion|clothing|apparel|boutique|retail|e-commerce|online store|shop|collection|lookbook/.test(p)) {
    return {
      category: 'Fashion / E-commerce',
      palette: 'Charcoal Black #1A1A1A, Soft White #FAF9F8, Dusty Rose #C9A4A4, Warm Tan #D4B896, Champagne #F5DEB3',
      fonts: 'Didact Gothic (headings), Questrial (body)',
      sections: 'Minimal edge-to-edge Navbar, Full-screen editorial Hero with lookbook imagery, New Arrivals product grid, Collections showcase, Featured Product spotlight, Size Guide, Lookbook Gallery, Customer Reviews, Trending Now section, Newsletter, Footer',
      features: 'Product hover cards with quick-view overlay, Collection category filter, Size guide modal, Newsletter popup, Lookbook gallery with hover effects, Wishlist button animation, Featured product with image zoom',
      hero: 'High-fashion editorial hero: full bleed model/product image, minimal Helvetica-style text overlaid, extremely minimal layout, "Shop The Collection" CTA',
      tone: 'Minimal, editorial, chic, aspirational, curated',
      unsplashKeywords: 'fashion,clothing,style,model,boutique',
    };
  }

  // ── NGO / Non-Profit ──────────────────────────────────────────────────────
  if (/ngo|non-profit|nonprofit|charity|foundation|social cause|volunteer|humanitarian|mission/.test(p)) {
    return {
      category: 'NGO / Non-Profit',
      palette: 'Hope Green #2D6A4F, Warm Orange #E76F51, Cream #FFF8F0, Sky Blue #90E0EF, Earth Brown #6B4226',
      fonts: 'Merriweather (headings), Open Sans (body)',
      sections: 'Transparent Navbar with Donate CTA, Emotional hero with cause imagery, Mission & Vision, Impact Stats (lives changed, projects, countries), Programs/Initiatives, Team Volunteers, Donation Form, Success Stories, Partners & Sponsors logos, Latest News/Blog, Footer',
      features: 'Donation form with preset amounts + custom input, Impact animated counter stats, Volunteer signup form, Stories carousel, Partner logo slider, Newsletter subscription',
      hero: 'Emotional, purpose-driven hero with real cause imagery, powerful headline "Together We Change Lives", impact numbers prominently displayed, "Donate Now" + "Join As Volunteer" CTAs',
      tone: 'Empathetic, purposeful, hopeful, community-driven, inspiring',
      unsplashKeywords: 'charity,community,volunteer,ngo,humanitarians',
    };
  }

  // ── Law Firm / Legal ──────────────────────────────────────────────────────
  if (/law firm|lawyer|attorney|legal|solicitor|advocate|barrister|counsel/.test(p)) {
    return {
      category: 'Law Firm',
      palette: 'Dark Navy #1A2744, Premium Gold #C9A84C, Pure White #FFFFFF, Warm Grey #6B7280, Deep Charcoal #1F2937',
      fonts: 'EB Garamond (headings), Source Sans Pro (body)',
      sections: 'Authoritative dark Navbar, Hero with law firm imagery and trust statement, Practice Areas grid, About & Partners, Attorney Profiles, Case Results/Wins stats, Client Testimonials, Free Consultation Form, Awards & Recognition, FAQ, Footer',
      features: 'Practice area cards with hover expand, Attorney profile cards, Consultation booking form, Case result stats counters, FAQ accordion, Smooth scroll',
      hero: 'Professional dark hero. Strong headline "Justice. Experience. Results." Clean layout. Gold accents. "Schedule a Free Consultation" CTA.',
      tone: 'Authoritative, trustworthy, formal, professional, confident',
      unsplashKeywords: 'law,justice,courtroom,attorney,legal',
    };
  }

  // ── Finance / Investment ───────────────────────────────────────────────────
  if (/finance|financial|investment|wealth|banking|insurance|accounting|fintech|trading/.test(p)) {
    return {
      category: 'Finance',
      palette: 'Corporate Navy #0F2D5B, Forest Green #1D6B4A, Pure White #FFFFFF, Platinum #E5E5E5, Accent Gold #B8962E',
      fonts: 'IBM Plex Sans (headings), Roboto (body)',
      sections: 'Clean corporate Navbar, Hero with trust metrics, Services (Wealth Management / Investment / Tax / Insurance), About & Team, Statistics row (assets managed, clients, years, returns), Calculator Widget, Testimonials, Blog/Insights preview, Contact & Branches, Footer',
      features: 'Investment Return Calculator widget with JS, Stats counter animation, Service cards with expandable info, Blog preview cards, Newsletter, Consultation booking form',
      hero: 'Clean, corporate hero with upward-trend imagery or abstract finance visual. Headline "Your Wealth. Our Expertise." Trust badges: "20+ Years | $2B Managed | 10K Clients". CTA "Get a Free Consultation".',
      tone: 'Professional, trustworthy, sophisticated, data-driven, conservative',
      unsplashKeywords: 'finance,investment,business,banking,wealth',
    };
  }

  // ── Event Management ──────────────────────────────────────────────────────
  if (/event|wedding planner|event management|conference|exhibition|concert|party planner/.test(p)) {
    return {
      category: 'Event Management',
      palette: 'Deep Purple #2D0557, Electric Gold #FFD700, Pure Black #0A0A0A, Blush Pink #FFB6C1, Ivory #FFFFF0',
      fonts: 'Cinzel (headings), Josefin Sans (body)',
      sections: 'Glamorous dark Navbar, Dramatic hero with event imagery, Services (Weddings / Corporate / Concerts / Private), Past Events portfolio gallery, Our Process timeline, Team & Coordinators, Testimonials, Event Inquiry Form, FAQs, Footer',
      features: 'Event gallery with lightbox, Services hover cards, Event inquiry/booking form with date and event type, Process timeline, FAQ accordion, Testimonial carousel',
      hero: 'Dramatic, glamorous hero with sparkling/event imagery, elegant headline "We Create Unforgettable Experiences", two CTAs: "Plan Your Event" and "View Portfolio"',
      tone: 'Glamorous, elegant, exciting, celebratory, premium',
      unsplashKeywords: 'event,wedding,party,conference,celebration',
    };
  }

  // ── Default / General Business ────────────────────────────────────────────
  return {
    category: 'Business',
    palette: 'Deep Indigo #1E1B4B, Vivid Purple #7C3AED, Warm White #FAFAFA, Cool Grey #6B7280, Accent Amber #F59E0B',
    fonts: 'Plus Jakarta Sans (headings), Inter (body)',
    sections: 'Glassmorphism Navbar, Hero with animated gradient background, Features grid, About section with team photo, Services showcase, Stats counter, Testimonials carousel, FAQ Accordion, Contact Form, Footer',
    features: 'Animated gradient mesh background, Scroll reveal animations, Stats counter, FAQ accordion, Dark/light toggle, Floating CTA, Smooth scroll',
    hero: 'Modern animated gradient hero, compelling business headline, subtitle with key benefits, "Get Started" and "Learn More" CTAs',
    tone: 'Professional, modern, innovative, trustworthy',
    unsplashKeywords: 'business,office,professional,team,modern',
  };
}

// ─── AI Service ───────────────────────────────────────────────────────────────

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
    const profile = detectCategory(prompt);

    return `
You are a world-class Full-Stack Web Developer AND UI/UX Designer AND professional Copywriter combined.

Your job: Generate ONE SINGLE complete, production-ready, standalone HTML5 website file for the following request:

USER REQUEST: "${prompt}"

════════════════════════════════════════════════════════════════════
DETECTED BUSINESS PROFILE (USE THIS TO DRIVE EVERY DECISION)
════════════════════════════════════════════════════════════════════
Category       : ${profile.category}
Color Palette  : ${profile.palette}
Typography     : ${profile.fonts}
Required Sections (in ORDER): ${profile.sections}
Business Features  : ${profile.features}
Hero Design    : ${profile.hero}
Brand Tone     : ${profile.tone}
Image Keywords : ${profile.unsplashKeywords}

════════════════════════════════════════════════════════════════════
PHASE 1 – DESIGN SYSTEM (APPLY TO EVERY ELEMENT)
════════════════════════════════════════════════════════════════════
• Use ONLY the detected Color Palette above. Define ALL colors as CSS custom properties in :root {}.
• Import ONLY the detected Google Fonts above using a <link> tag.
• Every section must have distinct visual treatment (different bg color, texture, or gradient).
• Buttons: minimum 2 variants (primary solid, secondary outline), with hover transform + shadow.
• Cards: subtle box-shadow, border-radius 12px–20px, hover lift effect (translateY -4px to -8px).
• Typography scale: heading sizes h1 (3rem+), h2 (2rem+), h3 (1.5rem+), body (1rem).
• Include a CSS Scroll Progress Bar at the top of the page.

════════════════════════════════════════════════════════════════════
PHASE 2 – LAYOUT & SECTIONS
════════════════════════════════════════════════════════════════════
Build EXACTLY the sections listed in "Required Sections" above, in that ORDER.
Each section must have:
  • A unique id="" attribute for navbar anchor links
  • Its own background color/texture (alternate light/dark sections)
  • A section heading (h2) + descriptive subheading
  • Real, meaningful content (NO Lorem Ipsum EVER)

SPECIFIC LAYOUT RULES:
• Navbar: Fixed/sticky. Logo on left, nav links center/right. Mobile hamburger menu with JS toggle.
• Hero: Implement EXACTLY as described in "Hero Design" above. Must be visually dramatic and unique.
• Cards/Grids: Use CSS Grid with auto-fit / minmax for full responsiveness.
• Footer: Dark background, 3–4 columns (logo+tagline, links, contact info, social), copyright.

════════════════════════════════════════════════════════════════════
PHASE 3 – INTERACTIVE JAVASCRIPT FEATURES
════════════════════════════════════════════════════════════════════
Implement ALL features listed in "Business Features" above using VANILLA JavaScript only.

Additionally, ALWAYS include these universal features:
  1. Sticky navbar that adds a shadow class on scroll
  2. Mobile hamburger menu toggle (show/hide nav links)
  3. Scroll Reveal animation: all .reveal elements animate fadeInUp when scrolled into view (use IntersectionObserver)
  4. Scroll Progress Bar: thin colored bar at the very top of the viewport, width = scroll percentage
  5. Back-to-Top button: appears after scrolling 300px, smooth scroll to top on click
  6. Ripple effect on all buttons on click
  7. Active nav link highlight based on current scroll section

════════════════════════════════════════════════════════════════════
PHASE 4 – CONTENT GENERATION (AI COPYWRITING)
════════════════════════════════════════════════════════════════════
Generate 100% realistic, professional business content. Rules:
  • Business Name: Create a creative, fitting name for this ${profile.category} business
  • Tagline: Memorable, benefit-focused, 6–10 words
  • About section: 2–3 paragraphs of real backstory, values, mission
  • Services/Features: 3–6 items with title, icon (SVG inline), and 2–3 sentence description
  • Team: 3 team members with realistic names, titles, and photo placeholders
  • Testimonials: 3 client reviews with full name, role, company, and realistic 2–3 sentence quotes
  • FAQs: 5–6 industry-relevant Q&A pairs
  • Contact: Realistic address, phone, email, working hours
  • ALL CTAs must be action-oriented and business-appropriate
  • NEVER generate placeholder text like "Lorem ipsum", "Your business name", "Add text here"

════════════════════════════════════════════════════════════════════
PHASE 5 – IMAGES
════════════════════════════════════════════════════════════════════
Use Unsplash placeholder images. Format:
  https://images.unsplash.com/photo-[VALID_ID]?w=800&q=80&auto=format&fit=crop

Use DIFFERENT image IDs for each image. Choose images relevant to: ${profile.unsplashKeywords}

Known reliable Unsplash photo IDs to use (use variety, mix and match):
  Food/Restaurant: 1414235077428-338989a2e8c0, 1504674900247-0877df9cc836, 1567620905732-2d1ec7ab7445
  Hotel/Luxury:    1542314831-068cd1dbfeeb, 1496417927853-d75e4d424f9e, 1551882547-ff40c4a49d43
  Fitness/Gym:     1534438327627-75c8ac7b4d48, 1517838277-74a51c0b5ff0, 1549476464-37392f717d9c
  Healthcare:      1559757148-5c350d0d3c56, 1579684385127-1ef15d508118, 1612277795421-9bc7706a4a34
  Travel:          1476514525405-309ad6da289f, 1469854523086-cc02fe5d8800, 1502602688690-82a0017db0fd
  Coffee:          1495474472287-4d71bcdd2085, 1509042239860-f550ce710b93, 1442512435-cd787b3b1f6e
  Bakery:          1549903072-7e9b9a4e6b9d, 1558961363-fa8fdf82db35, 1517093156-3a8e3e5d1a40
  Architecture:    1486325212986-09c7c0b6e72b, 1518780664697-55e3ad937233, 1467803738586-46b7eb7b16a1
  Technology:      1518770660439-4636190af475, 1531297484001-80022131f5a1, 1504868584819-f8e8b4b6d7e3
  Fashion:         1558618666-fcd25c85cd64, 1509631179647-0177331693ae, 1515886657613-9f3515b0c78f
  If none of these fit, use: https://images.unsplash.com/photo-1504892262-13ec5cc99d60?w=800&q=80

════════════════════════════════════════════════════════════════════
PHASE 6 – RESPONSIVE DESIGN
════════════════════════════════════════════════════════════════════
The site MUST work perfectly at: 320px | 768px | 1024px | 1440px
  • Mobile-first CSS with min-width media queries
  • No horizontal scrollbar at any width
  • Touch-friendly tap targets (min 44px)
  • Hamburger menu on mobile (max-width: 768px)
  • Grid layouts collapse to 1 column on mobile, 2 on tablet
  • Font sizes scale down on mobile

════════════════════════════════════════════════════════════════════
PHASE 7 – ANIMATIONS & MICRO-INTERACTIONS
════════════════════════════════════════════════════════════════════
Include these CSS animations:
  • @keyframes fadeInUp: opacity 0→1, translateY 30px→0
  • @keyframes fadeInLeft: opacity 0→1, translateX -30px→0
  • @keyframes fadeInRight: opacity 0→1, translateX 30px→0
  • @keyframes scaleIn: opacity 0→1, scale 0.95→1
  • @keyframes float: translateY 0→-10px→0 (for floating hero elements)
  • Hover transitions: all 0.3s ease on interactive elements
  • Add class "reveal" to all major section content; JS IntersectionObserver triggers animation

════════════════════════════════════════════════════════════════════
ABSOLUTE RULES – NEVER BREAK THESE
════════════════════════════════════════════════════════════════════
✅ Return ONLY raw HTML. Nothing else.
✅ Start with <!DOCTYPE html> on the very first line.
✅ All CSS must be inside <style> in <head>.
✅ All JavaScript must be inside <script> at the end of <body>.
✅ Do NOT use any external CSS frameworks (no Bootstrap, no Tailwind).
✅ Do NOT use any external JS libraries (no jQuery, no GSAP).
✅ Do NOT use triple backticks, markdown, or code fences.
✅ Do NOT output any explanation, comment, or text before or after the HTML.
✅ Do NOT use Lorem Ipsum anywhere.
✅ Do NOT hardcode the old orange #F07900 theme — use ONLY the detected palette.
✅ The output must be a single, fully self-contained HTML file.
✅ Every page must look COMPLETELY DIFFERENT from any other category's output.
`;
  }
}
