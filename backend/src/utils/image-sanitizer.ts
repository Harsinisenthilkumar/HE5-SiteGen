import { detectCategoryFromPrompt, getImagesForCategory } from './image-library.js';

/**
 * Sanitizes and cleans up generated HTML by replacing empty, invalid, or placeholder image sources
 * with high-quality, category-appropriate royalty-free Unsplash images.
 */
export class ImageSanitizer {
  /**
   * Sanitizes all <img> tag sources in the HTML string
   * @param html The generated HTML string
   * @param prompt The prompt used to generate the site (to detect category)
   * @param projectId The project ID used as a seed for different images
   */
  public static sanitize(html: string, prompt: string, projectId: string): string {
    const category = detectCategoryFromPrompt(prompt);
    const images = getImagesForCategory(category, projectId);
    
    let heroIndex = 0;
    let aboutIndex = 0;
    let serviceIndex = 0;
    let galleryIndex = 0;
    let generalIndex = 0;

    // Regular expression to match img tags and capture their complete tag content
    const imgTagRegex = /<img\s+([^>]*?)>/gi;

    return html.replace(imgTagRegex, (fullTag, attributes) => {
      // Extract the current src attribute if it exists
      const srcMatch = attributes.match(/src=["']([^"']*)["']/i);
      const currentSrc = srcMatch ? srcMatch[1].trim() : '';

      // Check if the current src is broken, empty, local, or a generic placeholder
      const isBroken = !currentSrc || 
                       currentSrc === '#' ||
                       currentSrc.startsWith('http://localhost') ||
                       (!currentSrc.startsWith('http://') && !currentSrc.startsWith('https://') && !currentSrc.startsWith('data:'));
      
      const isPlaceholder = currentSrc.includes('placeholder') || 
                            currentSrc.includes('placehold.co') || 
                            currentSrc.includes('picsum.photos') ||
                            currentSrc.includes('unsplash.com/random');

      if (!isBroken && !isPlaceholder) {
        // The image URL is already a valid absolute URL (like Unsplash, custom host, etc.)
        // We will keep it but ensure alt text is present if missing
        return ImageSanitizer.ensureAlt(fullTag, category);
      }

      // Determine context of this image based on surrounding text/attributes in the tag
      const lowerAttributes = attributes.toLowerCase();
      let newSrc = '';

      if (lowerAttributes.includes('hero') || lowerAttributes.includes('banner') || lowerAttributes.includes('header')) {
        newSrc = images.hero[heroIndex % images.hero.length];
        heroIndex++;
      } else if (lowerAttributes.includes('about') || lowerAttributes.includes('team') || lowerAttributes.includes('owner') || lowerAttributes.includes('profile')) {
        newSrc = images.about[aboutIndex % images.about.length];
        aboutIndex++;
      } else if (lowerAttributes.includes('service') || lowerAttributes.includes('feature') || lowerAttributes.includes('offer') || lowerAttributes.includes('benefit') || lowerAttributes.includes('card')) {
        newSrc = images.services[serviceIndex % images.services.length];
        serviceIndex++;
      } else if (lowerAttributes.includes('gallery') || lowerAttributes.includes('portfolio') || lowerAttributes.includes('project') || lowerAttributes.includes('item')) {
        newSrc = images.gallery[galleryIndex % images.gallery.length];
        galleryIndex++;
      } else {
        // First image fallback is usually hero, subsequent are gallery/services
        if (heroIndex === 0) {
          newSrc = images.hero[0];
          heroIndex++;
        } else {
          newSrc = images.gallery[generalIndex % images.gallery.length];
          generalIndex++;
        }
      }

      // Reconstruct the attributes string, replacing the src attribute
      let newAttributes = attributes;
      if (srcMatch) {
        newAttributes = attributes.replace(/src=["']([^"']*)["']/i, `src="${newSrc}"`);
      } else {
        newAttributes = `src="${newSrc}" ${attributes}`;
      }

      // Ensure alt attribute is present
      if (!newAttributes.toLowerCase().includes('alt=')) {
        const altText = `${category.replace('_', ' ')} illustration`;
        newAttributes = `${newAttributes.trim()} alt="${altText}"`;
      }

      // Add loading="lazy" to non-hero images to improve performance
      if (!lowerAttributes.includes('hero') && !lowerAttributes.includes('banner') && !newAttributes.toLowerCase().includes('loading=')) {
        newAttributes = `${newAttributes.trim()} loading="lazy"`;
      }

      return `<img ${newAttributes.trim()}>`;
    });
  }

  /**
   * Helper to ensure alt attribute is present on an img tag
   */
  private static ensureAlt(imgTag: string, category: string): string {
    if (imgTag.toLowerCase().includes('alt=')) {
      return imgTag;
    }
    const altText = `${category.replace('_', ' ')} image`;
    return imgTag.replace(/>$/, ` alt="${altText}">`);
  }
}
