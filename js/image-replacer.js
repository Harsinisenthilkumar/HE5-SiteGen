/**
 * Image Replacer Engine
 * Allows clicking on images inside the preview iframe to trigger uploads, URL replacement,
 * or selecting category-appropriate placeholders. Also supports drag-and-drop.
 */
class ImageReplacer {
  constructor(iframeId) {
    this.iframe = document.getElementById(iframeId);
    this.activeImg = null;
    this.overlay = null;
  }

  init() {
    this.removeOverlay();
    this.setupIframeEvents();
  }

  setupIframeEvents() {
    const doc = this.iframe.contentDocument;
    if (!doc) return;

    // Inject hover styles into the iframe
    if (!doc.getElementById('image-replacer-styles')) {
      const style = doc.createElement('style');
      style.id = 'image-replacer-styles';
      style.textContent = `
        .image-hover-outline {
          outline: 3px solid #3b82f6 !important;
          outline-offset: -3px !important;
          cursor: pointer !important;
          opacity: 0.9 !important;
        }
      `;
      doc.head.appendChild(style);
    }

    // Attach click and drag-drop handlers to all images in the iframe
    doc.querySelectorAll('img').forEach(img => {
      // Hover outlines
      img.addEventListener('mouseenter', () => {
        img.classList.add('image-hover-outline');
      });

      img.addEventListener('mouseleave', () => {
        img.classList.remove('image-hover-outline');
      });

      // Click handler
      img.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.openMenu(img);
      });

      // Setup Drag & Drop Upload
      img.classList.add('drag-upload-zone');
      
      img.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        img.classList.add('drag-active');
      });

      img.addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        img.classList.remove('drag-active');
      });

      img.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        img.classList.remove('drag-active');

        const files = e.dataTransfer.files;
        if (files.length > 0) {
          this.handleFile(files[0], img);
        }
      });
    });

    // Close menu on click anywhere in the iframe
    doc.addEventListener('click', () => {
      this.removeOverlay();
    });
  }

  openMenu(img) {
    this.removeOverlay();
    this.activeImg = img;

    // Calculate position
    const iframeRect = this.iframe.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();

    const top = iframeRect.top + imgRect.top + window.scrollY + 10;
    const left = iframeRect.left + imgRect.left + window.scrollX + 10;

    // Create action menu overlay
    const overlay = document.createElement('div');
    overlay.id = 'image-replacer-overlay';
    overlay.style.position = 'absolute';
    overlay.style.top = `${top}px`;
    overlay.style.left = `${left}px`;

    // 1. Replace Image (URL)
    const replaceUrlBtn = document.createElement('button');
    replaceUrlBtn.className = 'image-overlay-item';
    replaceUrlBtn.innerHTML = '🔗 Replace Image URL';
    replaceUrlBtn.onclick = () => this.promptImageUrl();

    // 2. Upload Image
    const uploadBtn = document.createElement('button');
    uploadBtn.className = 'image-overlay-item';
    uploadBtn.innerHTML = '📤 Upload Image File';
    uploadBtn.onclick = () => this.triggerFileUpload();

    // 3. Choose Placeholder
    const placeholderBtn = document.createElement('button');
    placeholderBtn.className = 'image-overlay-item';
    placeholderBtn.innerHTML = '🖼️ Choose Placeholder';
    placeholderBtn.onclick = () => this.showPlaceholdersModal();

    // 4. Reset Image
    const resetBtn = document.createElement('button');
    resetBtn.className = 'image-overlay-item';
    resetBtn.innerHTML = '🔄 Reset to Original';
    resetBtn.onclick = () => this.resetImage();

    overlay.appendChild(replaceUrlBtn);
    overlay.appendChild(uploadBtn);
    overlay.appendChild(placeholderBtn);
    overlay.appendChild(resetBtn);

    document.body.appendChild(overlay);
    this.overlay = overlay;

    // Close overlay on click outside
    document.addEventListener('click', this.clickOutsideHandler.bind(this));
  }

  promptImageUrl() {
    const currentUrl = this.activeImg.src;
    const newUrl = prompt('Enter the absolute URL of the new image:', currentUrl);
    if (newUrl && newUrl.trim() !== '') {
      this.updateSrc(newUrl);
    }
  }

  triggerFileUpload() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        this.handleFile(file, this.activeImg);
      }
    };
    fileInput.click();
  }

  handleFile(file, targetImg) {
    const reader = new FileReader();
    reader.onload = (event) => {
      this.updateSrc(event.target.result, targetImg);
    };
    reader.readAsDataURL(file);
  }

  showPlaceholdersModal() {
    // Generate a simple popup showing a grid of 6 beautiful stock placeholders
    const doc = this.iframe.contentDocument;
    if (!doc) return;

    // Detect prompt category to show related images
    const promptText = localStorage.getItem('he5_fallback_prompt') || '';
    let category = 'generic';
    const lower = promptText.toLowerCase();
    
    if (lower.includes('cafe') || lower.includes('bakery') || lower.includes('restaurant') || lower.includes('food') || lower.includes('coffee')) {
      category = 'restaurant';
    } else if (lower.includes('clinic') || lower.includes('dental') || lower.includes('doctor') || lower.includes('health') || lower.includes('medical')) {
      category = 'hospital';
    } else if (lower.includes('gym') || lower.includes('fitness') || lower.includes('workout') || lower.includes('training')) {
      category = 'gym';
    } else if (lower.includes('design') || lower.includes('creative') || lower.includes('agency') || lower.includes('portfolio')) {
      category = 'portfolio';
    }

    // Default Unsplash sample pool
    const samples = {
      restaurant: [
        'photo-1517248135467-4c7edcad34c4', 'photo-1555396273-367ea4eb4db5', 'photo-1504674900247-0877df9cc836',
        'photo-1565299624946-b28f40a0ae38', 'photo-1540189549336-e6e99c3679fe', 'photo-1514933651103-005eec06c04b'
      ],
      hospital: [
        'photo-1519494026892-80bbd2d6fd0d', 'photo-1584515901387-a7c11b26958a', 'photo-1559839734-2b71ea197ec2',
        'photo-1579684389782-64d84b5e901a', 'photo-1516549655169-df83a0774514', 'photo-1579156223622-c34b3e8fb53d'
      ],
      gym: [
        'photo-1517838277536-f5f99be501cd', 'photo-1534438327276-14e5300c3a48', 'photo-1541534741688-6078c6bfb5c5',
        'photo-1571902943202-507ec2618e8f', 'photo-1584735935682-2f2b69dff9d2', 'photo-1599058917212-d750089bc07e'
      ],
      portfolio: [
        'photo-1507238691740-187a5b1d37b8', 'photo-1522202176988-66273c2fd55f', 'photo-1534528741775-53994a69daeb',
        'photo-1542744094-3a31f103e35f', 'photo-1498050108023-c5249f4df085', 'photo-1519389950473-47ba0277781c'
      ],
      generic: [
        'photo-1557804506-669a67965ba0', 'photo-1486406146926-c627a92ad1ab', 'photo-1507238691740-187a5b1d37b8',
        'photo-152202176988-66273c2fd55f', 'photo-1519389950473-47ba0277781c', 'photo-1560250097-0b93528c311a'
      ]
    };

    const list = samples[category] || samples.generic;

    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.background = '#1e293b';
    modal.style.padding = '1.5rem';
    modal.style.borderRadius = '12px';
    modal.style.boxShadow = '0 20px 50px rgba(0,0,0,0.5)';
    modal.style.zIndex = '200000';
    modal.style.width = '380px';
    modal.style.border = '1px solid rgba(255,255,255,0.1)';

    modal.innerHTML = `
      <h3 style="margin-top:0;color:#fff;font-size:1.1rem;margin-bottom:1rem;">Select Royalty-Free Image</h3>
      <div class="placeholder-grid">
        ${list.map(id => `
          <div class="placeholder-option" data-url="https://images.unsplash.com/${id}?w=800&auto=format&fit=crop&q=80">
            <img src="https://images.unsplash.com/${id}?w=150&auto=format&fit=crop&q=80">
          </div>
        `).join('')}
      </div>
      <button class="editor-btn editor-btn-secondary" style="width:100%;margin-top:1rem;" id="close-placeholder-modal">Cancel</button>
    `;

    document.body.appendChild(modal);

    modal.querySelectorAll('.placeholder-option').forEach(opt => {
      opt.onclick = () => {
        this.updateSrc(opt.getAttribute('data-url'));
        modal.remove();
      };
    });

    document.getElementById('close-placeholder-modal').onclick = () => {
      modal.remove();
    };
  }

  resetImage() {
    if (this.activeImg && window.editor && window.editor.originalImages) {
      // Find original src
      const src = window.editor.originalImages['.logo-img'] || window.editor.originalImages['.hero-img'] || '';
      if (src) {
        this.updateSrc(src);
      } else {
        alert('No original image record was found.');
      }
    }
  }

  updateSrc(src, imgElement) {
    const target = imgElement || this.activeImg;
    if (target) {
      target.src = src;
      // Sync gallery images in sidebar
      if (window.editor) {
        window.editor.syncGalleryImages();
      }
    }
    this.removeOverlay();
  }

  removeOverlay() {
    if (this.overlay) {
      this.overlay.remove();
      this.overlay = null;
    }
    this.activeImg = null;
    document.removeEventListener('click', this.clickOutsideHandler);
  }

  clickOutsideHandler(e) {
    if (this.overlay && !this.overlay.contains(e.target) && e.target !== this.iframe) {
      this.removeOverlay();
    }
  }
}

// Attach class to window
window.ImageReplacer = ImageReplacer;
