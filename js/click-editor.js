/**
 * Click-to-Edit Engine
 * Allows users to click on any text element inside the preview iframe,
 * opening a floating editor bubble to edit the text inline.
 */
class ClickEditor {
  constructor(iframeId) {
    this.iframe = document.getElementById(iframeId);
    this.activeElement = null;
    this.overlay = null;
  }

  init() {
    this.removeOverlay();
    this.setupIframeEvents();
  }

  /**
   * Attaches event listeners inside the iframe document
   */
  setupIframeEvents() {
    const doc = this.iframe.contentDocument;
    if (!doc) return;

    // Inject outline styles into the iframe head
    if (!doc.getElementById('click-editor-styles')) {
      const style = doc.createElement('style');
      style.id = 'click-editor-styles';
      style.textContent = `
        .editable-text-hover {
          outline: 2px dashed #f97316 !important;
          outline-offset: 4px !important;
          cursor: text !important;
          transition: outline-color 0.2s;
        }
      `;
      doc.head.appendChild(style);
    }

    // List of tags that are editable
    const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'button'];

    // Select all potential text elements
    tags.forEach(tag => {
      doc.querySelectorAll(tag).forEach(el => {
        // Exclude logo image container and other special tags
        if (el.querySelector('.logo-img') || el.classList.contains('logo-img') || el.closest('.brand')) {
          return;
        }

        // Add hover outlines
        el.addEventListener('mouseenter', () => {
          el.classList.add('editable-text-hover');
        });

        el.addEventListener('mouseleave', () => {
          el.classList.remove('editable-text-hover');
        });

        // Click to edit
        el.addEventListener('click', (e) => {
          // If clicked inside a link or button, prevent navigation/submit
          e.preventDefault();
          e.stopPropagation();

          this.openEditor(el);
        });
      });
    });

    // Close floating editor on iframe click elsewhere
    doc.addEventListener('click', () => {
      this.removeOverlay();
    });
  }

  /**
   * Opens the floating editor overlay next to the clicked element
   */
  openEditor(element) {
    this.removeOverlay();
    this.activeElement = element;

    // Calculate position relative to host window
    const iframeRect = this.iframe.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    const top = iframeRect.top + elementRect.top + window.scrollY - 10;
    const left = iframeRect.left + elementRect.left + window.scrollX;

    // Create overlay container
    const overlay = document.createElement('div');
    overlay.id = 'click-editor-overlay';
    overlay.style.position = 'absolute';
    overlay.style.top = `${top}px`;
    overlay.style.left = `${left}px`;

    // Create textarea
    const textarea = document.createElement('textarea');
    textarea.value = element.textContent.trim();

    // Create actions container
    const actions = document.createElement('div');
    actions.className = 'overlay-actions';

    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'overlay-btn overlay-btn-cancel';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.onclick = () => this.removeOverlay();

    const saveBtn = document.createElement('button');
    saveBtn.className = 'overlay-btn overlay-btn-save';
    saveBtn.textContent = 'Save';
    saveBtn.onclick = () => this.saveEdits(textarea.value);

    actions.appendChild(cancelBtn);
    actions.appendChild(saveBtn);
    overlay.appendChild(textarea);
    overlay.appendChild(actions);

    document.body.appendChild(overlay);
    this.overlay = overlay;

    // Focus textarea and select text
    textarea.focus();
    textarea.select();

    // Save on Enter key, Cancel on Escape
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.saveEdits(textarea.value);
      }
      if (e.key === 'Escape') {
        this.removeOverlay();
      }
    });

    // Close overlay on click outside
    document.addEventListener('click', this.clickOutsideHandler.bind(this));
  }

  saveEdits(newValue) {
    if (this.activeElement) {
      this.activeElement.textContent = newValue;
      
      // Update form values in editor sidebar
      if (window.editor) {
        window.editor.syncFromIframe();
      }
    }
    this.removeOverlay();
  }

  removeOverlay() {
    if (this.overlay) {
      this.overlay.remove();
      this.overlay = null;
    }
    this.activeElement = null;
    document.removeEventListener('click', this.clickOutsideHandler);
  }

  clickOutsideHandler(e) {
    if (this.overlay && !this.overlay.contains(e.target) && e.target !== this.iframe) {
      this.removeOverlay();
    }
  }
}

// Attach class to window
window.ClickEditor = ClickEditor;
