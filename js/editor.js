/**
 * WebsiteEditor Class
 * Manages the slide-out editor panel, reads current state from the generated iframe,
 * and updates text, colors, layouts, and images in real-time.
 */
class WebsiteEditor {
  constructor(iframeId, panelId) {
    this.iframe = document.getElementById(iframeId);
    this.panel = document.getElementById(panelId);
    this.isOpen = false;
    this.activeTab = 'content';
    this.originalImages = {}; // Keeps track of original src values for resets
    this.themeEditor = new ThemeEditor(iframeId);
  }

  init() {
    this.createPanelHtml();
    this.setupEventListeners();
    this.syncFromIframe();
  }

  /**
   * Generates and inserts the HTML structure for the editor panel.
   */
  createPanelHtml() {
    if (this.panel) return;

    const panelDiv = document.createElement('div');
    panelDiv.id = 'editor-panel';
    panelDiv.innerHTML = `
      <div class="editor-header">
        <h2>✏️ Edit Website</h2>
        <button class="editor-close" id="editor-close-btn">&times;</button>
      </div>
      
      <div class="editor-tabs">
        <button class="editor-tab-btn active" data-tab="content">Content</button>
        <button class="editor-tab-btn" data-tab="design">Design</button>
        <button class="editor-tab-btn" data-tab="sections">Sections</button>
        <button class="editor-tab-btn" data-tab="images">Images</button>
      </div>

      <div class="editor-content">
        <!-- CONTENT TAB -->
        <div class="editor-tab-panel active" id="tab-content">
          <div class="editor-group">
            <div class="editor-group-title">Business Identity</div>
            <div class="editor-field">
              <label class="editor-label">Business Name</label>
              <input type="text" class="editor-input" id="edit-business-name">
            </div>
            <div class="editor-field">
              <label class="editor-label">Button Text</label>
              <input type="text" class="editor-input" id="edit-button-text">
            </div>
          </div>

          <div class="editor-group">
            <div class="editor-group-title">Hero Section</div>
            <div class="editor-field">
              <label class="editor-label">Hero Title</label>
              <input type="text" class="editor-input" id="edit-hero-title">
            </div>
            <div class="editor-field">
              <label class="editor-label">Hero Subtitle</label>
              <textarea class="editor-input" id="edit-hero-subtitle"></textarea>
            </div>
          </div>

          <div class="editor-group">
            <div class="editor-group-title">About Section</div>
            <div class="editor-field">
              <label class="editor-label">About Description</label>
              <textarea class="editor-input" id="edit-about-text"></textarea>
            </div>
          </div>

          <div class="editor-group">
            <div class="editor-group-title">Services</div>
            <div id="editor-services-list"></div>
            <button class="editor-btn editor-btn-secondary" id="editor-add-service-btn" style="width: 100%; margin-top: 0.5rem;">+ Add Service</button>
          </div>

          <div class="editor-group">
            <div class="editor-group-title">Contact & Location</div>
            <div class="editor-field">
              <label class="editor-label">Email Address</label>
              <input type="email" class="editor-input" id="edit-contact-email" placeholder="hello@company.com">
            </div>
            <div class="editor-field">
              <label class="editor-label">Phone Number</label>
              <input type="text" class="editor-input" id="edit-contact-phone" placeholder="+1 (555) 000-0000">
            </div>
            <div class="editor-field">
              <label class="editor-label">Address</label>
              <input type="text" class="editor-input" id="edit-contact-address" placeholder="123 Main St, New York">
            </div>
            <div class="editor-field">
              <label class="editor-label">Working Hours</label>
              <input type="text" class="editor-input" id="edit-contact-hours" placeholder="Mon-Fri: 9 AM - 6 PM">
            </div>
          </div>
        </div>

        <!-- DESIGN TAB -->
        <div class="editor-tab-panel" id="tab-design">
          <div class="editor-group">
            <div class="editor-group-title">Color Palette</div>
            <div class="editor-field">
              <label class="editor-label">Primary Color</label>
              <div class="color-picker-wrapper">
                <input type="color" class="editor-color-input" id="theme-primary-color">
                <input type="text" class="editor-input" id="theme-primary-text" style="width: 100px;">
              </div>
            </div>
            <div class="editor-field">
              <label class="editor-label">Secondary Color</label>
              <div class="color-picker-wrapper">
                <input type="color" class="editor-color-input" id="theme-secondary-color">
                <input type="text" class="editor-input" id="theme-secondary-text" style="width: 100px;">
              </div>
            </div>
            <div class="editor-field">
              <label class="editor-label">Accent Color</label>
              <div class="color-picker-wrapper">
                <input type="color" class="editor-color-input" id="theme-accent-color">
                <input type="text" class="editor-input" id="theme-accent-text" style="width: 100px;">
              </div>
            </div>
            <div class="editor-field">
              <label class="editor-label">Background Color</label>
              <div class="color-picker-wrapper">
                <input type="color" class="editor-color-input" id="theme-bg-color">
                <input type="text" class="editor-input" id="theme-bg-text" style="width: 100px;">
              </div>
            </div>
            <div class="editor-field">
              <label class="editor-label">Button Color</label>
              <div class="color-picker-wrapper">
                <input type="color" class="editor-color-input" id="theme-btn-color">
                <input type="text" class="editor-input" id="theme-btn-text" style="width: 100px;">
              </div>
            </div>
          </div>

          <div class="editor-group">
            <div class="editor-group-title">Typography & Layout</div>
            <div class="editor-field">
              <label class="editor-label">Font Family</label>
              <select class="editor-input" id="theme-font-family">
                <option value="'Poppins', sans-serif">Poppins / Inter</option>
                <option value="'Inter', sans-serif">Inter Sans</option>
                <option value="'Roboto', sans-serif">Roboto</option>
                <option value="'Outfit', sans-serif">Outfit</option>
                <option value="'Playfair Display', serif">Playfair Display</option>
                <option value="'Lato', sans-serif">Lato</option>
                <option value="'Montserrat', sans-serif">Montserrat</option>
                <option value="'Open Sans', sans-serif">Open Sans</option>
              </select>
            </div>
            <div class="editor-field">
              <label class="editor-label">Border Radius</label>
              <input type="range" class="editor-input" id="theme-border-radius" min="0" max="24" value="8">
            </div>
            <div class="editor-field">
              <label class="editor-label">Shadow Intensity</label>
              <input type="range" class="editor-input" id="theme-shadow-intensity" min="0" max="5" value="2">
            </div>
            <div class="editor-field">
              <label class="editor-label">Spacing Unit</label>
              <select class="editor-input" id="theme-spacing">
                <option value="1rem">Compact</option>
                <option value="1.5rem" selected>Normal</option>
                <option value="2.25rem">Relaxed</option>
              </select>
            </div>
          </div>
        </div>

        <!-- SECTIONS TAB -->
        <div class="editor-tab-panel" id="tab-sections">
          <div class="editor-group">
            <div class="editor-group-title">Toggle Sections Visibility</div>
            
            <div class="toggle-wrapper">
              <span>Hero Section</span>
              <label class="toggle-switch">
                <input type="checkbox" id="toggle-hero" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="toggle-wrapper">
              <span>About Section</span>
              <label class="toggle-switch">
                <input type="checkbox" id="toggle-about" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="toggle-wrapper">
              <span>Services Section</span>
              <label class="toggle-switch">
                <input type="checkbox" id="toggle-services" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="toggle-wrapper">
              <span>Gallery Section</span>
              <label class="toggle-switch">
                <input type="checkbox" id="toggle-gallery" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="toggle-wrapper">
              <span>Testimonials Section</span>
              <label class="toggle-switch">
                <input type="checkbox" id="toggle-testimonials" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="toggle-wrapper">
              <span>Contact Form</span>
              <label class="toggle-switch">
                <input type="checkbox" id="toggle-contact" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="toggle-wrapper">
              <span>Footer</span>
              <label class="toggle-switch">
                <input type="checkbox" id="toggle-footer" checked>
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <!-- IMAGES TAB -->
        <div class="editor-tab-panel" id="tab-images">
          <div class="editor-group">
            <div class="editor-group-title">Brand Assets</div>
            <div class="editor-field">
              <label class="editor-label">Logo Image</label>
              <input type="file" class="editor-input" id="img-logo-upload" accept="image/*">
              <button class="editor-btn editor-btn-secondary" id="img-logo-reset" style="width: 100%; margin-top: 0.5rem; padding: 0.4rem;">Reset Logo</button>
            </div>
          </div>

          <div class="editor-group">
            <div class="editor-group-title">Main Sections</div>
            <div class="editor-field">
              <label class="editor-label">Hero Main Image</label>
              <input type="file" class="editor-input" id="img-hero-upload" accept="image/*">
              <button class="editor-btn editor-btn-secondary" id="img-hero-reset" style="width: 100%; margin-top: 0.5rem; padding: 0.4rem;">Reset Hero</button>
            </div>
          </div>

          <div class="editor-group">
            <div class="editor-group-title">Gallery Management</div>
            <div id="editor-gallery-images-list"></div>
          </div>
        </div>
      </div>

      <div class="editor-actions-footer">
        <button class="editor-btn editor-btn-primary" id="editor-save-btn">✨ Save & Finish</button>
        <button class="editor-btn editor-btn-secondary" id="editor-reset-btn">Reset All Edits</button>
      </div>
    `;
    
    document.body.appendChild(panelDiv);
    this.panel = panelDiv;
  }

  setupEventListeners() {
    // Open/Close
    document.getElementById('editor-close-btn').addEventListener('click', () => this.toggle(false));
    
    // Save button
    document.getElementById('editor-save-btn').addEventListener('click', () => {
      alert('Edits successfully saved! Use the Export menu at the top to download your customized site.');
      this.toggle(false);
    });

    // Reset button
    document.getElementById('editor-reset-btn').addEventListener('click', () => {
      if (confirm('Are you sure you want to discard all changes and reload the original generated site?')) {
        this.iframe.contentWindow.location.reload();
        setTimeout(() => this.syncFromIframe(), 500);
      }
    });

    // Tab buttons
    this.panel.querySelectorAll('.editor-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.target.getAttribute('data-tab');
        this.switchTab(tab);
      });
    });

    // Inputs matching real-time preview (Content tab)
    const bindContentInput = (inputId, callback) => {
      document.getElementById(inputId).addEventListener('input', (e) => {
        callback(e.target.value);
      });
    };

    bindContentInput('edit-business-name', (val) => {
      this.updateBusinessName(val);
    });

    bindContentInput('edit-button-text', (val) => {
      this.updateButtonText(val);
    });

    bindContentInput('edit-hero-title', (val) => {
      this.updateElement('.hero-title', val, true);
    });

    bindContentInput('edit-hero-subtitle', (val) => {
      this.updateElement('.hero-desc', val);
    });

    bindContentInput('edit-about-text', (val) => {
      const p = this.iframe.contentDocument.querySelector('#about p');
      if (p) p.textContent = val;
    });

    // Contact fields
    bindContentInput('edit-contact-email', (val) => {
      this.updateContactField('email', val);
    });
    bindContentInput('edit-contact-phone', (val) => {
      this.updateContactField('phone', val);
    });
    bindContentInput('edit-contact-address', (val) => {
      this.updateContactField('address', val);
    });
    bindContentInput('edit-contact-hours', (val) => {
      this.updateContactField('hours', val);
    });

    // Color Inputs
    const bindColorInput = (colorId, textId, updateFn) => {
      const picker = document.getElementById(colorId);
      const text = document.getElementById(textId);
      
      const updateColor = (val) => {
        picker.value = val;
        text.value = val;
        updateFn(val);
      };

      picker.addEventListener('input', (e) => updateColor(e.target.value));
      text.addEventListener('input', (e) => updateColor(e.target.value));
    };

    bindColorInput('theme-primary-color', 'theme-primary-text', (val) => this.themeEditor.updatePrimaryColor(val));
    bindColorInput('theme-secondary-color', 'theme-secondary-text', (val) => this.themeEditor.updateSecondaryColor(val));
    bindColorInput('theme-accent-color', 'theme-accent-text', (val) => this.themeEditor.updateAccentColor(val));
    bindColorInput('theme-bg-color', 'theme-bg-text', (val) => this.themeEditor.updateBgColor(val));
    bindColorInput('theme-btn-color', 'theme-btn-text', (val) => this.themeEditor.setVariable('--btn-color', val));

    // Font Select
    document.getElementById('theme-font-family').addEventListener('change', (e) => {
      this.updateCSSVariable('--font-heading', e.target.value);
      this.updateCSSVariable('--font-body', e.target.value);
    });

    // Border Radius
    document.getElementById('theme-border-radius').addEventListener('input', (e) => {
      this.updateCSSVariable('--border-radius', `${e.target.value}px`);
      // Update iframe elements that might have border-radius manually
      this.iframe.contentDocument.querySelectorAll('.service-card, .gallery-item, .contact-card, .btn').forEach(el => {
        el.style.borderRadius = `${e.target.value}px`;
      });
    });

    // Shadow Intensity
    document.getElementById('theme-shadow-intensity').addEventListener('input', (e) => {
      this.themeEditor.updateShadowIntensity(e.target.value);
    });

    // Spacing Unit
    document.getElementById('theme-spacing').addEventListener('change', (e) => {
      this.iframe.contentDocument.querySelectorAll('.section').forEach(el => {
        el.style.padding = `${e.target.value} 0`;
      });
    });

    // Toggle Section visibility
    const bindToggle = (toggleId, selector) => {
      document.getElementById(toggleId).addEventListener('change', (e) => {
        const els = this.iframe.contentDocument.querySelectorAll(selector);
        els.forEach(el => {
          el.style.display = e.target.checked ? '' : 'none';
        });
      });
    };

    bindToggle('toggle-hero', '.hero');
    bindToggle('toggle-about', '#about, .about');
    bindToggle('toggle-services', '#services, .services');
    bindToggle('toggle-gallery', '#gallery, .gallery');
    bindToggle('toggle-testimonials', '#testimonials, .testimonials');
    bindToggle('toggle-contact', '#contact, .contact');
    bindToggle('toggle-footer', '.footer');

    // Image Uploads
    const bindImageUpload = (fileInputId, imgSelector) => {
      document.getElementById(fileInputId).addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = this.iframe.contentDocument.querySelector(imgSelector);
          if (img) {
            // Save original src if not saved
            if (!this.originalImages[imgSelector]) {
              this.originalImages[imgSelector] = img.src;
            }
            img.src = event.target.result;
          }
        };
        reader.readAsDataURL(file);
      });
    };

    bindImageUpload('img-logo-upload', '.logo-img');
    bindImageUpload('img-hero-upload', '.hero-img');

    // Image Resets
    document.getElementById('img-logo-reset').addEventListener('click', () => {
      const img = this.iframe.contentDocument.querySelector('.logo-img');
      if (img && this.originalImages['.logo-img']) {
        img.src = this.originalImages['.logo-img'];
      }
    });

    document.getElementById('img-hero-reset').addEventListener('click', () => {
      const img = this.iframe.contentDocument.querySelector('.hero-img');
      if (img && this.originalImages['.hero-img']) {
        img.src = this.originalImages['.hero-img'];
      }
    });

    // Add Service button
    document.getElementById('editor-add-service-btn').addEventListener('click', () => {
      this.addServiceCard();
    });
  }

  switchTab(tab) {
    this.activeTab = tab;
    this.panel.querySelectorAll('.editor-tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
    });
    this.panel.querySelectorAll('.editor-tab-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === `tab-${tab}`);
    });
  }

  toggle(forceState) {
    this.isOpen = forceState !== undefined ? forceState : !this.isOpen;
    this.panel.classList.toggle('open', this.isOpen);
    document.body.classList.toggle('editor-open', this.isOpen);
  }

  /**
   * Reads values directly from the iframe's DOM to populate the inputs
   */
  syncFromIframe() {
    const doc = this.iframe.contentDocument;
    if (!doc) return;

    // Business Name
    const brandText = doc.querySelector('.brand span, .brand')?.textContent || '';
    document.getElementById('edit-business-name').value = brandText.replace(/^[🚀✨💼🏠]/, '').trim();

    // Button Text
    const primaryBtn = doc.querySelector('.btn-primary, .hero-actions .btn');
    document.getElementById('edit-button-text').value = primaryBtn?.textContent || 'Book Consultation';

    // Hero Section
    document.getElementById('edit-hero-title').value = doc.querySelector('.hero-title')?.textContent || '';
    document.getElementById('edit-hero-subtitle').value = doc.querySelector('.hero-desc')?.textContent || '';

    // About Section
    document.getElementById('edit-about-text').value = doc.querySelector('#about p, .about p')?.textContent || '';

    // Services list
    this.syncServices();

    // Contact details (find emails or text containing phone/address)
    this.syncContactDetails();

    // Theme values (CSS variables)
    this.syncCSSVariables();

    // Gallery images
    this.syncGalleryImages();
  }

  updateElement(selector, val, isHeroTitle = false) {
    const el = this.iframe.contentDocument.querySelector(selector);
    if (!el) return;

    if (isHeroTitle) {
      // Keep the <span> tag for brand name if it exists
      const brand = document.getElementById('edit-business-name').value;
      if (brand && val.includes(brand)) {
        el.innerHTML = val.replace(brand, `<span>${brand}</span>`);
      } else {
        el.textContent = val;
      }
    } else {
      el.textContent = val;
    }
  }

  updateBusinessName(val) {
    const doc = this.iframe.contentDocument;
    
    // Update navbar brand
    const brandSpan = doc.querySelector('.brand span');
    if (brandSpan) {
      brandSpan.textContent = val;
    } else {
      const brand = doc.querySelector('.brand');
      if (brand) brand.textContent = `🚀 ${val}`;
    }

    // Update footer brand
    const footerBrand = doc.querySelector('.footer-brand');
    if (footerBrand) footerBrand.textContent = `🚀 ${val}`;

    // Update copyright text
    const copyright = doc.querySelector('.copyright');
    if (copyright) {
      const currentYear = new Date().getFullYear();
      copyright.innerHTML = `&copy; ${currentYear} ${val}. Crafted via HE5 SiteGen platform.`;
    }
  }

  updateButtonText(val) {
    const doc = this.iframe.contentDocument;
    doc.querySelectorAll('.btn-primary, .btn').forEach(btn => {
      // Only replace main buttons, keep nav/consult/actions text
      if (btn.textContent.toLowerCase().includes('consult') || btn.textContent.toLowerCase().includes('services')) {
        return;
      }
      btn.textContent = val;
    });
  }

  updateCSSVariable(varName, value) {
    const doc = this.iframe.contentDocument;
    doc.documentElement.style.setProperty(varName, value);
  }

  updateContactField(type, value) {
    const doc = this.iframe.contentDocument;
    
    // Search contact section for text fields or anchor tags
    if (type === 'email') {
      const emailLink = doc.querySelector('a[href^="mailto:"]');
      if (emailLink) {
        emailLink.href = `mailto:${value}`;
        emailLink.textContent = value;
      }
    } else if (type === 'phone') {
      const telLink = doc.querySelector('a[href^="tel:"]');
      if (telLink) {
        telLink.href = `tel:${value}`;
        telLink.textContent = value;
      }
    }
  }

  syncServices() {
    const doc = this.iframe.contentDocument;
    const cards = doc.querySelectorAll('.service-card');
    const container = document.getElementById('editor-services-list');
    container.innerHTML = '';

    cards.forEach((card, index) => {
      const title = card.querySelector('.service-title')?.textContent || `Service ${index + 1}`;
      const desc = card.querySelector('.service-desc')?.textContent || '';

      const serviceDiv = document.createElement('div');
      serviceDiv.className = 'service-edit-item';
      serviceDiv.innerHTML = `
        <div class="service-edit-header">
          <span class="service-edit-title">Service ${index + 1}</span>
          <button class="service-edit-delete" data-index="${index}">Delete</button>
        </div>
        <div class="editor-field">
          <input type="text" class="editor-input service-title-input" data-index="${index}" value="${title.replace(/"/g, '&quot;')}">
        </div>
        <div class="editor-field" style="margin-bottom:0;">
          <textarea class="editor-input service-desc-input" data-index="${index}" style="min-height:50px;font-size:0.8rem;">${desc}</textarea>
        </div>
      `;

      // Event listeners for text inputs
      serviceDiv.querySelector('.service-title-input').addEventListener('input', (e) => {
        const titleEl = card.querySelector('.service-title');
        if (titleEl) titleEl.textContent = e.target.value;
      });

      serviceDiv.querySelector('.service-desc-input').addEventListener('input', (e) => {
        const descEl = card.querySelector('.service-desc');
        if (descEl) descEl.textContent = e.target.value;
      });

      serviceDiv.querySelector('.service-edit-delete').addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this service card?')) {
          card.remove();
          this.syncServices();
        }
      });

      container.appendChild(serviceDiv);
    });
  }

  addServiceCard() {
    const doc = this.iframe.contentDocument;
    const grid = doc.querySelector('.services-grid');
    if (!grid) return;

    const newCard = document.createElement('div');
    newCard.className = 'service-card';
    newCard.innerHTML = `
      <div class="service-img-container" style="height: 150px; overflow: hidden; border-radius: 8px; margin-bottom: 1.5rem;">
        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80" class="service-img" alt="New Service">
      </div>
      <h3 class="service-title">New Service Title</h3>
      <p class="service-desc">Description of the newly added service card offering.</p>
    `;

    grid.appendChild(newCard);
    
    // Apply current border radius
    const currentRadius = document.getElementById('theme-border-radius').value;
    newCard.style.borderRadius = `${currentRadius}px`;

    this.syncServices();
    // Refresh click-editor and image replacer
    if (window.initializeIframeHandlers) {
      window.initializeIframeHandlers();
    }
  }

  syncContactDetails() {
    const doc = this.iframe.contentDocument;
    
    // Populate form placeholders or fallback
    document.getElementById('edit-contact-email').value = doc.querySelector('a[href^="mailto:"]')?.textContent || 'hello@company.com';
    document.getElementById('edit-contact-phone').value = doc.querySelector('a[href^="tel:"]')?.textContent || '+1 (555) 000-0000';
    
    // Try to find address in contact card
    const contactCard = doc.querySelector('#contact, .contact');
    if (contactCard) {
      // Find text containing street/city
      const infoText = contactCard.textContent;
      const addressMatch = infoText.match(/\b\d+\s+[A-Za-z0-9\s,.]+ न्यूयॉर्क|New York|Street|Avenue\b/i);
      document.getElementById('edit-contact-address').value = addressMatch ? addressMatch[0] : '123 Main St, New York';
    }
    
    document.getElementById('edit-contact-hours').value = 'Mon-Fri: 9 AM - 6 PM';
  }

  syncCSSVariables() {
    const doc = this.iframe.contentDocument;
    const computedStyles = doc.documentElement.style;

    const getHexColor = (varName, defaultVal) => {
      let val = computedStyles.getPropertyValue(varName).trim();
      if (!val) {
        // Fallback to computed values if inline property not set
        const temp = doc.createElement('div');
        temp.style.color = `var(${varName})`;
        doc.body.appendChild(temp);
        const rgb = window.getComputedStyle(temp).color;
        doc.body.removeChild(temp);
        val = this.rgbToHex(rgb) || defaultVal;
      }
      return val.startsWith('#') ? val : defaultVal;
    };

    document.getElementById('theme-primary-color').value = getHexColor('--orange', '#F07900');
    document.getElementById('theme-primary-text').value = document.getElementById('theme-primary-color').value;

    document.getElementById('theme-secondary-color').value = getHexColor('--grey', '#171923');
    document.getElementById('theme-secondary-text').value = document.getElementById('theme-secondary-color').value;

    document.getElementById('theme-accent-color').value = getHexColor('--orange-light', '#F8A145');
    document.getElementById('theme-accent-text').value = document.getElementById('theme-accent-color').value;

    document.getElementById('theme-bg-color').value = getHexColor('--black', '#0D0E12');
    document.getElementById('theme-bg-text').value = document.getElementById('theme-bg-color').value;

    document.getElementById('theme-btn-color').value = getHexColor('--btn-color', '#D35100');
    document.getElementById('theme-btn-text').value = document.getElementById('theme-btn-color').value;
  }

  syncGalleryImages() {
    const doc = this.iframe.contentDocument;
    const images = doc.querySelectorAll('.gallery-img');
    const container = document.getElementById('editor-gallery-images-list');
    container.innerHTML = '';

    images.forEach((img, index) => {
      const src = img.src;
      const itemDiv = document.createElement('div');
      itemDiv.className = 'service-edit-item';
      itemDiv.innerHTML = `
        <div class="service-edit-header" style="margin-bottom:0.25rem;">
          <span class="service-edit-title">Image ${index + 1}</span>
        </div>
        <div style="display:flex;gap:0.5rem;align-items:center;">
          <img src="${src}" style="width:40px;height:40px;object-fit:cover;border-radius:4px;border:1px solid var(--editor-border);">
          <div style="flex:1;">
            <input type="file" class="editor-input gallery-img-upload" data-index="${index}" accept="image/*" style="font-size:0.75rem;padding:0.25rem;">
          </div>
        </div>
      `;

      itemDiv.querySelector('.gallery-img-upload').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          // Save original
          const selector = `gallery-img-${index}`;
          if (!this.originalImages[selector]) {
            this.originalImages[selector] = img.src;
          }
          img.src = event.target.result;
          itemDiv.querySelector('img').src = event.target.result;
        };
        reader.readAsDataURL(file);
      });

      container.appendChild(itemDiv);
    });
  }

  rgbToHex(rgb) {
    if (!rgb) return null;
    const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) return rgb;
    return "#" + ((1 << 24) + (parseInt(match[1]) << 16) + (parseInt(match[2]) << 8) + parseInt(match[3])).toString(16).slice(1).toUpperCase();
  }
}

// Attach class to window
window.WebsiteEditor = WebsiteEditor;
