/**
 * ThemeEditor Class
 * Handles real-time styling updates, color palette changes, typography,
 * layout density, border-radius, and shadow intensities.
 */
class ThemeEditor {
  constructor(iframeId) {
    this.iframe = document.getElementById(iframeId);
    
    // Shadow templates matching intensity 0 to 5
    this.shadows = [
      'none',
      '0 2px 4px rgba(0,0,0,0.15)',
      '0 8px 16px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.1)',
      '0 12px 24px rgba(0,0,0,0.25), 0 4px 8px rgba(0,0,0,0.15)',
      '0 20px 35px rgba(0,0,0,0.35), 0 8px 16px rgba(0,0,0,0.2)',
      '0 30px 60px rgba(0,0,0,0.45), 0 12px 24px rgba(0,0,0,0.25)'
    ];
  }

  /**
   * Applies CSS custom properties on the iframe document element
   */
  setVariable(name, value) {
    const doc = this.iframe.contentDocument;
    if (doc) {
      doc.documentElement.style.setProperty(name, value);
    }
  }

  /**
   * Updates primary theme color
   */
  updatePrimaryColor(color) {
    this.setVariable('--orange', color);
    
    // Auto generate dark/light variations
    const darkColor = this.adjustBrightness(color, -20);
    this.setVariable('--orange-dark', darkColor);
  }

  /**
   * Updates secondary theme color
   */
  updateSecondaryColor(color) {
    this.setVariable('--grey', color);
    const lightGrey = this.adjustBrightness(color, 20);
    this.setVariable('--grey-light', lightGrey);
  }

  /**
   * Updates accent color
   */
  updateAccentColor(color) {
    this.setVariable('--orange-light', color);
  }

  /**
   * Updates main page background color
   */
  updateBgColor(color) {
    this.setVariable('--black', color);
  }

  /**
   * Updates shadow intensity
   * Updates card components shadow directly
   */
  updateShadowIntensity(intensity) {
    const shadowValue = this.shadows[Math.min(5, Math.max(0, intensity))];
    const doc = this.iframe.contentDocument;
    if (doc) {
      doc.querySelectorAll('.service-card, .gallery-item, .contact-card, .testimonial-card').forEach(el => {
        el.style.boxShadow = shadowValue;
      });
    }
  }

  /**
   * Helper to darken/lighten hex color codes
   */
  adjustBrightness(hex, percent) {
    let R = parseInt(hex.substring(1, 3), 16);
    let G = parseInt(hex.substring(3, 5), 16);
    let B = parseInt(hex.substring(5, 7), 16);

    R = parseInt((R * (100 + percent)) / 100);
    G = parseInt((G * (100 + percent)) / 100);
    B = parseInt((B * (100 + percent)) / 100);

    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;

    R = R > 0 ? R : 0;
    G = G > 0 ? G : 0;
    B = B > 0 ? B : 0;

    const rr = R.toString(16).padStart(2, '0');
    const gg = G.toString(16).padStart(2, '0');
    const bb = B.toString(16).padStart(2, '0');

    return `#${rr}${gg}${bb}`;
  }
}

// Attach class to window
window.ThemeEditor = ThemeEditor;
export { ThemeEditor };
