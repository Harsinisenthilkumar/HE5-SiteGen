/**
 * ExportManager Class
 * Serializes the edited iframe state into clean HTML, extracts CSS,
 * and bundles them into an HTML, CSS, or ZIP download.
 */
class ExportManager {
  constructor(iframeId) {
    this.iframe = document.getElementById(iframeId);
  }

  /**
   * Helper to clean up any click-to-edit classes or visual guides
   * from the HTML string before exporting.
   */
  getCleanHtml() {
    const doc = this.iframe.contentDocument.cloneNode(true);
    
    // Remove hover styles injected for editor
    const editorStyles = doc.getElementById('click-editor-styles');
    if (editorStyles) editorStyles.remove();

    const replacerStyles = doc.getElementById('image-replacer-styles');
    if (replacerStyles) replacerStyles.remove();

    // Clean up temporary visual helper classes
    doc.querySelectorAll('*').forEach(el => {
      el.classList.remove('editable-text-hover');
      el.classList.remove('image-hover-outline');
      el.classList.remove('drag-upload-zone');
      el.classList.remove('drag-active');
      
      // Clean up style attribute if it's empty
      if (el.getAttribute('style') === '') {
        el.removeAttribute('style');
      }
    });

    return `<!DOCTYPE html>\n${doc.documentElement.outerHTML}`;
  }

  /**
   * Triggers download of raw edited HTML file
   */
  downloadHtml() {
    const html = this.getCleanHtml();
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    this.triggerDownload(blob, 'index.html');
  }

  /**
   * Extracts CSS styles from the iframe page
   */
  getCss() {
    const doc = this.iframe.contentDocument;
    let css = '';
    
    // Extract inline styles
    doc.querySelectorAll('style').forEach(style => {
      if (style.id === 'click-editor-styles' || style.id === 'image-replacer-styles') {
        return;
      }
      css += `/* Style Block */\n${style.textContent}\n\n`;
    });

    return css || '/* No custom styles generated */';
  }

  /**
   * Triggers download of custom CSS styles file
   */
  downloadCss() {
    const css = this.getCss();
    const blob = new Blob([css], { type: 'text/css;charset=utf-8' });
    this.triggerDownload(blob, 'styles.css');
  }

  /**
   * Bundles HTML, CSS, and scripts into a ZIP archive using JSZip
   */
  async downloadZip() {
    if (typeof JSZip === 'undefined') {
      alert('JSZip library is still loading. Please try again in a few seconds.');
      return;
    }

    const zip = new JSZip();
    
    // 1. Get clean HTML, but update links to point to external css/js files
    let html = this.getCleanHtml();
    
    // Extract inline CSS block from HTML to save it as styles.css
    const css = this.getCss();
    
    // Replace inline style in exported HTML to load external stylesheet instead
    html = html.replace(/<style>([\s\S]*?)<\/style>/i, '<link rel="stylesheet" href="css/styles.css">');

    // Add files to ZIP
    zip.file('index.html', html);
    zip.folder('css').file('styles.css', css);
    
    // Extract script content or add a default empty app.js
    let js = '';
    const scripts = this.iframe.contentDocument.querySelectorAll('script');
    scripts.forEach(script => {
      if (script.textContent && !script.src) {
        js += `/* Injected Script */\n${script.textContent}\n\n`;
      }
    });
    
    // Replace inline scripts with link to external js
    html = html.replace(/<script>([\s\S]*?)<\/script>/gi, '');
    html = html.replace('</body>', '<script src="js/scripts.js"></script>\n</body>');
    // Save updated index.html
    zip.file('index.html', html);
    
    zip.folder('js').file('scripts.js', js || '/* Custom scripts */');

    // Generate ZIP file
    try {
      const content = await zip.generateAsync({ type: 'blob' });
      this.triggerDownload(content, 'website-export.zip');
    } catch (err) {
      console.error('Failed to generate ZIP archive:', err);
      alert('Failed to generate ZIP archive.');
    }
  }

  triggerDownload(blob, filename) {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  }
}

// Attach class to window
window.ExportManager = ExportManager;
