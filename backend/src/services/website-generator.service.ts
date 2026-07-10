import fs from 'node:fs/promises';
import path from 'node:path';
import { env } from '../config/env.js';
import { prisma } from '../database/prisma.js';
import type { AiService } from '../services/ai.service.js';
import { ImageSanitizer } from '../utils/image-sanitizer.js';

export class WebsiteGeneratorService {
  private memorySites: Record<string, string> = {};

  constructor(private readonly aiService: AiService) {}

  // Parse prompt to extract custom details to populate fallback HTML page dynamically
  private parsePromptForFallback(prompt: string) {
    const cleanPrompt = prompt.trim();
    let businessName = "HE5 SiteGen Services";
    let businessType = "Business";
    
    // Attempt to extract business name (e.g. after 'called', 'named', etc.)
    const nameMatch = cleanPrompt.match(/(?:called|named|brand|firm)\s+["']?([A-Za-z0-9\s&]+)["']?/i);
    if (nameMatch && nameMatch[1]) {
      businessName = nameMatch[1].trim();
    } else {
      const words = cleanPrompt.split(/\s+/).filter(w => w.length > 2);
      if (words.length > 0 && words.length <= 4) {
        businessName = words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      } else if (words.length > 4) {
        businessName = words.slice(0, 3).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      }
    }
    
    businessName = businessName.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim();
    if (businessName.length > 40) {
      businessName = businessName.slice(0, 40) + "...";
    }
    if (!businessName) businessName = "HE5 SiteGen Services";

    const lower = cleanPrompt.toLowerCase();
    let services = ["Consulting & Strategy", "Custom Solutions", "Support & Maintenance"];
    let description = `Providing high-quality professional services tailored to your needs. Based on your prompt: "${prompt}"`;
    let heroTitle = `Smarter Solutions for Your Business`;
    let testimonials = [
      { name: "Sarah Jenkins", role: "CEO, TechStart", text: "HE5 SiteGen's generated solution completely transformed our online presence. Highly recommended!" },
      { name: "Michael Chang", role: "Founder, localBiz", text: "The service is outstanding. Fast, professional, and exactly what we needed to launch our brand." }
    ];
    let galleryItems = ["Custom Dashboard", "Client Portal", "Marketing Site", "Analytics App"];

    if (lower.includes("cafe") || lower.includes("bakery") || lower.includes("restaurant") || lower.includes("food") || lower.includes("coffee") || lower.includes("bistro")) {
      businessType = "Culinary";
      heroTitle = `Delicious Flavors, Memorable Moments`;
      description = `Experience the finest dining and authentic recipes crafted with passion. Inspired by your prompt: "${prompt}"`;
      services = ["Artisanal Menu Items", "Private Event Catering", "Online Reservations & Delivery"];
      testimonials = [
        { name: "Emily Watson", role: "Food Critic", text: "The atmosphere is incredible, and the food is absolutely spectacular. A must-visit spot!" },
        { name: "David Miller", role: "Regular Customer", text: "My go-to spot for weekend brunch. The quality of ingredients and service is unmatched." }
      ];
      galleryItems = ["Cozy Interior", "Signature Pastries", "Chef Specialties", "Special Events"];
    } else if (lower.includes("clinic") || lower.includes("dental") || lower.includes("doctor") || lower.includes("health") || lower.includes("medical") || lower.includes("hospital")) {
      businessType = "Healthcare";
      heroTitle = `Your Health, Our Top Priority`;
      description = `Providing modern, compassionate healthcare services for your entire family. Inspired by your prompt: "${prompt}"`;
      services = ["Comprehensive Checkups", "Specialized Treatments", "24/7 Emergency Support"];
      testimonials = [
        { name: "Robert Fletcher", role: "Patient", text: "The doctors and staff are incredibly kind and professional. I felt completely safe and cared for." },
        { name: "Amanda Ross", role: "Mother of Two", text: "Excellent family care clinic. Scheduling is easy, and they are always on time." }
      ];
      galleryItems = ["Modern Treatment Rooms", "Friendly Staff", "Advanced Equipment", "Patient Care Area"];
    } else if (lower.includes("gym") || lower.includes("fitness") || lower.includes("yoga") || lower.includes("workout") || lower.includes("coach") || lower.includes("training")) {
      businessType = "Fitness";
      heroTitle = `Unleash Your Strength & Vitality`;
      description = `Join our vibrant community and achieve your ultimate fitness goals with expert trainers. Inspired by your prompt: "${prompt}"`;
      services = ["Personal Training Plans", "Group Fitness Classes", "Nutrition & Wellness Coaching"];
      testimonials = [
        { name: "Jason Brooks", role: "Member", text: "The trainers here are top-notch. They push you to your limits and help you get real results." },
        { name: "Lisa Thompson", role: "Yoga Practitioner", text: "A beautiful, clean studio with an amazing selection of classes. It has changed my life." }
      ];
      galleryItems = ["State-of-the-Art Gym", "Yoga Studio", "Cardio Zone", "Group Workouts"];
    } else if (lower.includes("design") || lower.includes("architect") || lower.includes("creative") || lower.includes("agency") || lower.includes("studio") || lower.includes("portfolio")) {
      businessType = "Creative";
      heroTitle = `Designing the Future of Modern Living`;
      description = `Innovative design and architectural solutions that combine aesthetics and functionality. Inspired by your prompt: "${prompt}"`;
      services = ["Concept Development", "3D Architecture Modeling", "Full Project Management"];
      testimonials = [
        { name: "Sophie Vance", role: "Property Developer", text: "Their creative vision is outstanding. They turned our complex requirements into a stunning reality." },
        { name: "Daniel Craig", role: "Homeowner", text: "Professional, creative, and highly responsive throughout the design and construction phases." }
      ];
      galleryItems = ["Modern Residence", "Boutique Office", "Urban Design Plan", "Interior Detail"];
    }

    return { businessName, businessType, heroTitle, description, services, testimonials, galleryItems };
  }

  // Generate a complete, beautifully designed HTMLFallback site dynamically
  public createFallbackResponse(prompt: string) {
    const details = this.parsePromptForFallback(prompt);
    const escapedPrompt = prompt.replace(/"/g, '&quot;');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${details.businessName} — Professional Web Presence</title>
  
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  
  <style>
    :root {
      --orange: #F07900;
      --orange-light: #F8A145;
      --orange-dark: #D35100;
      --black: #0D0E12;
      --grey: #171923;
      --grey-light: #2D3142;
      --white: #FFFFFF;
      --text-muted: #A0AEC0;
      --border: rgba(255, 255, 255, 0.08);
      --font-heading: 'Poppins', sans-serif;
      --font-body: 'Inter', sans-serif;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--black);
      color: var(--white);
      font-family: var(--font-body);
      line-height: 1.6;
      overflow-x: hidden;
      scroll-behavior: smooth;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    /* Navbar */
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: rgba(13, 14, 18, 0.85);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
      z-index: 1000;
      padding: 1.25rem 0;
    }

    .navbar-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .brand {
      font-family: var(--font-heading);
      font-size: 1.4rem;
      font-weight: 800;
      color: var(--white);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .brand span {
      color: var(--orange);
    }

    .nav-links {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }

    .nav-links a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.95rem;
      font-weight: 500;
      transition: color 0.25s ease;
    }

    .nav-links a:hover {
      color: var(--orange-light);
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.75rem 1.5rem;
      border-radius: 9999px;
      font-family: var(--font-heading);
      font-weight: 600;
      font-size: 0.9rem;
      text-decoration: none;
      transition: all 0.25s ease;
      cursor: pointer;
      border: none;
    }

    .btn-primary {
      background: var(--orange);
      color: var(--white);
    }

    .btn-primary:hover {
      background: var(--orange-light);
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(240, 121, 0, 0.35);
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border);
      color: var(--white);
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
    }

    /* Hero */
    .hero {
      padding: 9rem 0 6rem;
      background: radial-gradient(circle at 80% 20%, rgba(240, 121, 0, 0.08) 0%, transparent 60%),
                  radial-gradient(circle at 10% 80%, rgba(240, 121, 0, 0.05) 0%, transparent 50%);
      text-align: center;
      position: relative;
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(240, 121, 0, 0.1);
      border: 1px solid rgba(240, 121, 0, 0.2);
      color: var(--orange-light);
      padding: 0.4rem 1.1rem;
      border-radius: 99px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 2rem;
      animation: fadeInDown 0.6s ease;
    }

    .hero-title {
      font-family: var(--font-heading);
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1.15;
      max-width: 900px;
      margin: 0 auto 1.5rem;
      animation: fadeInUp 0.8s ease;
    }

    .hero-title span {
      background: linear-gradient(135deg, var(--orange-light) 0%, var(--orange) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .hero-desc {
      font-size: 1.15rem;
      color: var(--text-muted);
      max-width: 650px;
      margin: 0 auto 2.5rem;
      line-height: 1.7;
      animation: fadeInUp 1s ease;
    }

    .hero-actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      animation: fadeInUp 1.2s ease;
    }

    /* Section Styling */
    .section {
      padding: 6rem 0;
      border-bottom: 1px solid var(--border);
    }

    .section-header {
      text-align: center;
      margin-bottom: 4rem;
    }

    .section-badge {
      color: var(--orange);
      font-weight: 700;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      display: block;
      margin-bottom: 0.75rem;
    }

    .section-title {
      font-family: var(--font-heading);
      font-size: 2.25rem;
      font-weight: 700;
    }

    /* About Section */
    .about-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .about-visual {
      background: linear-gradient(135deg, rgba(240, 121, 0, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%);
      border: 1px solid var(--border);
      border-radius: var(--border-radius, 16px);
      padding: 2.5rem;
      box-shadow: 0 20px 40px rgba(0,0,0,0.15);
      position: relative;
    }

    .window-header {
      display: flex;
      gap: 6px;
      margin-bottom: 1.5rem;
    }

    .dot {
      width: 11px;
      height: 11px;
      border-radius: 50%;
      background: var(--grey-light);
    }
    .dot-red { background: #ef4444; }
    .dot-yellow { background: #f59e0b; }
    .dot-green { background: #10b981; }

    .window-content {
      font-family: monospace;
      color: var(--text-muted);
      font-size: 0.9rem;
      line-height: 1.8;
    }

    .highlight-code {
      color: var(--orange-light);
    }

    /* Services Section */
    .services-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 2rem;
    }

    .service-card {
      background: var(--grey);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 2.5rem;
      transition: all 0.3s ease;
    }

    .service-card:hover {
      border-color: var(--orange);
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(240, 121, 0, 0.1);
    }

    .service-icon {
      width: 50px;
      height: 50px;
      border-radius: 12px;
      background: rgba(240, 121, 0, 0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
      color: var(--orange-light);
    }

    .service-title {
      font-family: var(--font-heading);
      font-size: 1.25rem;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .service-desc {
      color: var(--text-muted);
      font-size: 0.95rem;
    }

    /* Testimonials Section */
    .testimonials-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2.5rem;
    }

    .testimonial-card {
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 2.5rem;
      position: relative;
    }

    .quote {
      font-style: italic;
      color: #E2E8F0;
      font-size: 1.05rem;
      margin-bottom: 1.75rem;
    }

    .author-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--orange);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      color: var(--white);
    }

    .author-name {
      font-weight: 600;
      font-size: 0.95rem;
    }

    .author-role {
      color: var(--text-muted);
      font-size: 0.85rem;
    }

    /* Gallery Section */
    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.5rem;
    }

    .gallery-item {
      background: var(--grey);
      border: 1px solid var(--border);
      border-radius: 12px;
      height: 240px;
      overflow: hidden;
      position: relative;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .gallery-item-bg {
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(240, 121, 0, 0.15) 0%, rgba(13, 14, 18, 0.8) 100%);
      transition: transform 0.3s ease;
      z-index: 1;
    }

    .gallery-item:hover .gallery-item-bg {
      transform: scale(1.1);
    }

    .gallery-label {
      position: relative;
      z-index: 2;
      font-family: var(--font-heading);
      font-weight: 600;
      font-size: 1.1rem;
      text-align: center;
      padding: 1rem;
    }

    /* Contact Section */
    .contact-card {
      max-width: 600px;
      margin: 0 auto;
      background: var(--grey);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 3rem;
      box-shadow: 0 15px 35px rgba(0,0,0,0.2);
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-label {
      display: block;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-muted);
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .form-input {
      width: 100%;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 0.85rem 1rem;
      color: var(--white);
      font-family: var(--font-body);
      transition: all 0.25s ease;
    }

    .form-input:focus {
      outline: none;
      border-color: var(--orange);
      background: rgba(255, 255, 255, 0.08);
    }

    /* Footer */
    .footer {
      padding: 4rem 0 3rem;
      border-top: 1px solid var(--border);
      text-align: center;
    }

    .footer-brand {
      font-family: var(--font-heading);
      font-size: 1.3rem;
      font-weight: 800;
      margin-bottom: 1.5rem;
    }

    .footer-brand span {
      color: var(--orange);
    }

    .footer-links {
      display: flex;
      justify-content: center;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .footer-links a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.9rem;
      transition: color 0.25s ease;
    }

    .footer-links a:hover {
      color: var(--orange);
    }

    .copyright {
      color: var(--text-muted);
      font-size: 0.85rem;
    }

    /* Animations */
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeInDown {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Image Styles */
    .logo-img {
      height: 32px;
      width: auto;
      object-fit: contain;
      border-radius: 4px;
    }
    .hero-grid {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 2rem;
      align-items: center;
      text-align: left;
    }
    .hero-img-container {
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0,0,0,0.3);
      height: 400px;
    }
    .hero-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .about-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      border-radius: 16px;
    }
    .service-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .gallery-img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
      opacity: 0.6;
    }
    .gallery-item:hover .gallery-img {
      transform: scale(1.1);
      opacity: 0.9;
    }

    @media (max-width: 968px) {
      .hero-grid { grid-template-columns: 1fr !important; text-align: center !important; }
      .hero-actions { justify-content: center !important; }
      .hero-img-container { height: 300px !important; margin-top: 2rem; }
      .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
      .services-grid { grid-template-columns: 1fr; }
      .testimonials-grid { grid-template-columns: 1fr; }
      .gallery-grid { grid-template-columns: repeat(2, 1fr); }
      .hero-title { font-size: 2.5rem; }
    }
  </style>
</head>
<body>

  <!-- Sticky Navbar -->
  <nav class="navbar">
    <div class="container navbar-inner">
      <a href="#" class="brand"><img src="logo.png" alt="${details.businessName} Logo" class="logo-img"><span>${details.businessName}</span></a>
      <div class="nav-links">
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#gallery">Gallery</a>
        <a href="#contact">Contact</a>
        <a href="#contact" class="btn btn-primary" style="padding: 0.5rem 1.25rem;">Consult</a>
      </div>
    </div>
  </nav>

  <!-- Hero Section -->
  <header class="hero">
    <div class="container hero-grid">
      <div>
        <div class="hero-badge">
          <span>✨ AI Generated Design</span>
        </div>
        <h1 class="hero-title">${details.heroTitle} with <span>${details.businessName}</span></h1>
        <p class="hero-desc">${details.description}</p>
        <div class="hero-actions">
          <a href="#contact" class="btn btn-primary">Book Consultation</a>
          <a href="#services" class="btn btn-secondary">Our Services</a>
        </div>
      </div>
      <div class="hero-img-container">
        <img src="hero.jpg" alt="${details.businessName} Hero" class="hero-img">
      </div>
    </div>
  </header>

  <!-- About Section -->
  <section class="section" id="about">
    <div class="container">
      <div class="about-grid">
        <div>
          <span class="section-badge">Who We Are</span>
          <h2 class="section-title" style="margin-bottom: 1.5rem;">Dedicated to excellence and premium results</h2>
          <p style="color: var(--text-muted); font-size: 1.05rem; margin-bottom: 1.5rem; line-height: 1.8;">
            We combine strategic thinking, advanced technology, and high-impact design templates to build solutions that help your business scale efficiently. Our platform serves as a modern partner in launching your online presence.
          </p>
          <p style="color: var(--text-muted); font-size: 1.05rem; line-height: 1.8;">
            We focus on maximizing conversion metrics, optimizing responsive layouts, and establishing a professional identity that matches your exact prompt description.
          </p>
        </div>
        <div class="about-visual" style="padding:0; overflow:hidden; min-height:350px;">
          <img src="about.jpg" alt="About ${details.businessName}" class="about-img">
        </div>
      </div>
    </div>
  </section>

  <!-- Services Section -->
  <section class="section" id="services">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">Services</span>
        <h2 class="section-title">Professional Solutions</h2>
      </div>
      <div class="services-grid">
        <div class="service-card">
          <div class="service-img-container" style="height: 150px; overflow: hidden; border-radius: 8px; margin-bottom: 1.5rem;">
            <img src="service-1.jpg" alt="${details.services[0]}" class="service-img">
          </div>
          <h3 class="service-title">${details.services[0]}</h3>
          <p class="service-desc">Fully customized and optimized service designed specifically to align with your business goals.</p>
        </div>
        <div class="service-card">
          <div class="service-img-container" style="height: 150px; overflow: hidden; border-radius: 8px; margin-bottom: 1.5rem;">
            <img src="service-2.jpg" alt="${details.services[1]}" class="service-img">
          </div>
          <h3 class="service-title">${details.services[1]}</h3>
          <p class="service-desc">Applying cutting-edge technical architecture to ensure maximum performance and responsive scaling.</p>
        </div>
        <div class="service-card">
          <div class="service-img-container" style="height: 150px; overflow: hidden; border-radius: 8px; margin-bottom: 1.5rem;">
            <img src="service-3.jpg" alt="${details.services[2]}" class="service-img">
          </div>
          <h3 class="service-title">${details.services[2]}</h3>
          <p class="service-desc">Continuous monitoring, optimization reviews, and active support for your online platform.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Gallery Section -->
  <section class="section" id="gallery">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">Gallery</span>
        <h2 class="section-title">Featured Portfolios</h2>
      </div>
      <div class="gallery-grid">
        <div class="gallery-item">
          <img src="gallery-1.jpg" alt="${details.galleryItems[0]}" class="gallery-img">
          <div class="gallery-label">${details.galleryItems[0]}</div>
        </div>
        <div class="gallery-item">
          <img src="gallery-2.jpg" alt="${details.galleryItems[1]}" class="gallery-img">
          <div class="gallery-label">${details.galleryItems[1]}</div>
        </div>
        <div class="gallery-item">
          <img src="gallery-3.jpg" alt="${details.galleryItems[2]}" class="gallery-img">
          <div class="gallery-label">${details.galleryItems[2]}</div>
        </div>
        <div class="gallery-item">
          <img src="gallery-4.jpg" alt="${details.galleryItems[3]}" class="gallery-img">
          <div class="gallery-label">${details.galleryItems[3]}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section class="section" id="testimonials">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">Reviews</span>
        <h2 class="section-title">What Clients Say</h2>
      </div>
      <div class="testimonials-grid">
        <div class="testimonial-card">
          <p class="quote">"${details.testimonials[0].text}"</p>
          <div class="author-info">
            <div class="avatar">SJ</div>
            <div>
              <h4 class="author-name">${details.testimonials[0].name}</h4>
              <p class="author-role">${details.testimonials[0].role}</p>
            </div>
          </div>
        </div>
        <div class="testimonial-card">
          <p class="quote">"${details.testimonials[1].text}"</p>
          <div class="author-info">
            <div class="avatar">MC</div>
            <div>
              <h4 class="author-name">${details.testimonials[1].name}</h4>
              <p class="author-role">${details.testimonials[1].role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact Section -->
  <section class="section" id="contact">
    <div class="container">
      <div class="section-header">
        <span class="section-badge">Get In Touch</span>
        <h2 class="section-title">Start Your Journey</h2>
      </div>
      <div class="contact-card">
        <form onsubmit="event.preventDefault(); alert('Message sent successfully!');">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" class="form-input" placeholder="John Doe" required>
          </div>
          <div class="form-group">
            <label class="form-label">Email Address</label>
            <input type="email" class="form-input" placeholder="john@example.com" required>
          </div>
          <div class="form-group" style="margin-bottom: 2rem;">
            <label class="form-label">Tell Us About Your Project</label>
            <textarea class="form-input" style="min-height: 120px; resize: vertical;" placeholder="How can we help you scale?" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; padding: 1rem;">Send Message</button>
        </form>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer-brand">🚀 ${details.businessName}</div>
      <div class="footer-links">
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#gallery">Gallery</a>
        <a href="#contact">Contact</a>
      </div>
      <p class="copyright">&copy; ${new Date().getFullYear()} ${details.businessName}. Crafted via HE5 SiteGen platform.</p>
      <p style="font-size:0.75rem; color:var(--text-muted); margin-top:0.5rem; font-style:italic;">Original prompt: "${escapedPrompt}"</p>
    </div>
  </footer>

</body>
</html>`;

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

  async generateWebsite(prompt: string) {
    let project;
    try {
      project = await prisma.project.create({
        data: {
          title: prompt.slice(0, 80),
          prompt,
          status: 'processing'
        }
      });
    } catch (dbError) {
      console.error("Failed to create project in database, using fallback project ID:", dbError);
      project = {
        id: 'demo-presentation-fallback',
        title: prompt.slice(0, 80),
        prompt,
        status: 'ready'
      };
    }

    const outputDir = path.join(process.cwd(), env.GENERATED_OUTPUT_DIR, project.id);
    
    try {
      await fs.mkdir(outputDir, { recursive: true });
    } catch (fsError) {
      console.error("Failed to create output directory, continuing in-memory fallback:", fsError);
    }
    
    let aiResponse;
    try {
      aiResponse = await this.aiService.generateSite(prompt);
      if (!aiResponse || !aiResponse.pages || aiResponse.pages.length === 0) {
        throw new Error("Empty or invalid page structure returned from AI Service.");
      }
    } catch (aiError) {
      console.warn("AI website generation failed, generating local fallback website:", aiError);
      aiResponse = this.createFallbackResponse(prompt);
    }

    const pages = aiResponse.pages ?? [];

    // Sanitize and inject real images in all pages
    for (const page of pages) {
      if (page.content) {
        page.content = ImageSanitizer.sanitize(page.content, prompt, project.id);
      }
    }

    try {
      await Promise.all(pages.map((page: any) => this.writePage(outputDir, page)));
      await fs.mkdir(path.join(outputDir, 'js'), { recursive: true });
      await fs.writeFile(path.join(outputDir, 'css', 'app.css'), aiResponse.css ?? '', 'utf8');
      await fs.writeFile(path.join(outputDir, 'js', 'app.js'), aiResponse.js ?? '', 'utf8');
    } catch (fsWriteError) {
      console.error("Failed to write files to disk, serving page from memory cache:", fsWriteError);
    }

    // Cache content in memory for double-safety
    if (pages[0] && pages[0].content) {
      this.memorySites[project.id] = pages[0].content;
    }

    try {
      if (project.id !== 'demo-presentation-fallback') {
        await prisma.project.update({
          where: { id: project.id },
          data: {
            status: 'ready',
            generatedAt: new Date()
          }
        });

        // Delete old pages if exists
        await prisma.generatedPage.deleteMany({
          where: { projectId: project.id }
        });

        await prisma.generatedPage.createMany({
          data: pages.map((page: any) => ({
            projectId: project.id,
            slug: page.slug ?? 'index',
            title: page.title ?? 'Untitled',
            fileName: `${page.slug ?? 'index'}.html`,
            content: page.content ?? '',
            metadata: page.meta ?? {}
          }))
        });
        
        project.status = 'ready';
      }
    } catch (dbUpdateError) {
      console.error("Failed to update project status in DB, continuing in memory:", dbUpdateError);
      project.status = 'ready'; // set status ready anyway
    }

    return project;
  }

  async getProjects() {
    try {
      return await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
    } catch (e) {
      console.warn("Prisma projects fetch failed, returning empty list:", e);
      return [];
    }
  }

  async getProject(id: string) {
    try {
      return await prisma.project.findUnique({ where: { id }, include: { pages: true } });
    } catch (e) {
      console.warn(`Prisma findUnique failed for project ID ${id}:`, e);
      return null;
    }
  }

  async deleteProject(id: string) {
    try {
      return await prisma.project.delete({ where: { id } });
    } catch (e) {
      console.warn(`Prisma delete failed for project ID ${id}:`, e);
    }
  }

  async publishProject(id: string, url?: string) {
    try {
      return await prisma.project.update({
        where: { id },
        data: {
          publishedAt: new Date(),
          publishedSite: {
            upsert: {
              create: { url },
              update: { url }
            }
          }
        },
        include: { publishedSite: true }
      });
    } catch (e) {
      console.warn(`Prisma publish failed for project ID ${id}:`, e);
      return null;
    }
  }

  async exportProject(id: string) {
    try {
      const project = await this.getProject(id);
      if (!project) throw new Error('Project not found');
      return { projectId: id, files: ['index.html', 'css/app.css', 'js/app.js'] };
    } catch (e) {
      return { projectId: id, files: ['index.html'] };
    }
  }

  async readGeneratedSite(projectId: string, prompt?: string) {
    // 1. Try memory cache first
    if (this.memorySites[projectId]) {
      return this.memorySites[projectId];
    }
    
    // 2. Try file system
    try {
      const outputDir = path.join(process.cwd(), env.GENERATED_OUTPUT_DIR, projectId);
      const indexPath = path.join(outputDir, 'index.html');
      const content = await fs.readFile(indexPath, 'utf8');
      return content;
    } catch (fsError) {
      console.warn(`Failed to read file for project ${projectId}:`, fsError);
    }

    // 3. Try database content
    try {
      const page = await prisma.generatedPage.findFirst({
        where: { projectId, slug: 'index' }
      });
      if (page && page.content) {
        return page.content;
      }
    } catch (dbError) {
      console.warn(`Failed to read database content for project ${projectId}:`, dbError);
    }

    // 4. Ultimate fallback: generate dynamic fallback website in memory
    const fallbackResponse = this.createFallbackResponse(prompt || "HE5 SiteGen website");
    return ImageSanitizer.sanitize(fallbackResponse.pages[0].content, prompt || "HE5 SiteGen website", projectId);
  }

  private async writePage(outputDir: string, page: any) {
    const dir = path.join(outputDir, 'css');
    const fileName = `${page.slug ?? 'index'}.html`;
    await fs.mkdir(path.dirname(path.join(outputDir, fileName)), { recursive: true });
    await fs.writeFile(path.join(outputDir, fileName), page.content ?? '', 'utf8');
    await fs.mkdir(dir, { recursive: true });
  }
}
