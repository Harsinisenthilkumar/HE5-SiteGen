/**
 * HE5 SiteGen — Interactive Demo
 */
(function initDemo() {
  const generateBtn  = document.querySelector('#demo-generate-btn');
  const textarea     = document.querySelector('#demo-textarea');
  const previewArea  = document.querySelector('#demo-preview');
  const placeholder  = document.querySelector('#demo-placeholder');
  const generating   = document.querySelector('#demo-generating');
  const chips        = document.querySelectorAll('.suggestion-chip');

  if (!generateBtn) return;

  const sampleWebsites = {
    restaurant: `
      <div style="font-family:sans-serif;background:#fff;padding:0;border-radius:8px;overflow:hidden;">
        <div style="background:#1a0800;padding:24px 32px;display:flex;justify-content:space-between;align-items:center;">
          <span style="color:#F07900;font-weight:800;font-size:20px;">🍝 Bella Cucina</span>
          <div style="display:flex;gap:20px;">
            <span style="color:rgba(255,255,255,0.7);font-size:13px;">Menu</span>
            <span style="color:rgba(255,255,255,0.7);font-size:13px;">Reserve</span>
            <span style="color:rgba(255,255,255,0.7);font-size:13px;">About</span>
          </div>
        </div>
        <div style="background:linear-gradient(135deg,#2d0a00,#1a0800);padding:64px 32px;text-align:center;">
          <div style="font-size:12px;color:#F8A145;letter-spacing:4px;margin-bottom:12px;text-transform:uppercase;">Authentic Italian Cuisine</div>
          <h1 style="color:#fff;font-size:40px;font-weight:900;margin:0 0 16px;line-height:1.1;">An Unforgettable<br>Dining Experience</h1>
          <p style="color:rgba(255,255,255,0.6);max-width:400px;margin:0 auto 28px;line-height:1.7;font-size:14px;">20 years of authentic Italian flavors in the heart of downtown Chicago.</p>
          <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
            <a href="contact.html" style="background:#F07900;color:#fff;padding:12px 28px;border-radius:50px;font-weight:700;font-size:14px;text-decoration:none;">Reserve a Table</a>
            <a href="resources.html" style="border:1px solid rgba(255,255,255,0.3);color:#fff;padding:12px 28px;border-radius:50px;font-weight:600;font-size:14px;text-decoration:none;">View Menu</a>
          </div>
        </div>
        <div style="padding:32px;display:grid;grid-template-columns:repeat(3,1fr);gap:16px;background:#fff;">
          <div style="text-align:center;padding:20px;border-radius:12px;background:#f8f8f8;">
            <div style="font-size:28px;margin-bottom:8px;">🍕</div>
            <div style="font-weight:700;color:#1a0800;font-size:14px;">Wood-Fired Pizza</div>
          </div>
          <div style="text-align:center;padding:20px;border-radius:12px;background:#f8f8f8;">
            <div style="font-size:28px;margin-bottom:8px;">🍝</div>
            <div style="font-weight:700;color:#1a0800;font-size:14px;">Handmade Pasta</div>
          </div>
          <div style="text-align:center;padding:20px;border-radius:12px;background:#f8f8f8;">
            <div style="font-size:28px;margin-bottom:8px;">🍷</div>
            <div style="font-weight:700;color:#1a0800;font-size:14px;">Fine Wine Selection</div>
          </div>
        </div>
      </div>`,
    fitness: `
      <div style="font-family:sans-serif;background:#000;padding:0;border-radius:8px;overflow:hidden;">
        <div style="background:#111;padding:20px 28px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #222;">
          <span style="color:#F07900;font-weight:800;font-size:18px;">⚡ PEAK FIT</span>
          <a href="contact.html" style="background:#F07900;color:#fff;padding:8px 18px;border-radius:50px;font-size:12px;font-weight:700;text-decoration:none;">Join Now</a>
        </div>
        <div style="padding:56px 28px;text-align:center;background:linear-gradient(135deg,#000,#1a0000);">
          <div style="display:inline-block;background:rgba(240,121,0,0.15);border:1px solid rgba(240,121,0,0.3);color:#F07900;font-size:11px;font-weight:700;letter-spacing:4px;text-transform:uppercase;padding:5px 14px;border-radius:50px;margin-bottom:16px;">Transform Your Body</div>
          <h1 style="color:#fff;font-size:42px;font-weight:900;margin:0 0 16px;line-height:1.05;">Unleash Your<br><span style="color:#F07900;">Full Potential</span></h1>
          <p style="color:rgba(255,255,255,0.5);font-size:14px;margin-bottom:28px;">Expert trainers. State-of-the-art equipment. Real results guaranteed.</p>
          <a href="pricing.html" style="background:#F07900;color:#fff;padding:14px 32px;border-radius:50px;font-weight:700;font-size:14px;text-decoration:none;display:inline-block;">Start Free Trial</a>
        </div>
      </div>`,
    default: `
      <div style="font-family:sans-serif;background:#fff;padding:0;border-radius:8px;overflow:hidden;">
        <div style="background:#151515;padding:20px 28px;display:flex;justify-content:space-between;align-items:center;">
          <span style="color:#F07900;font-weight:800;font-size:18px;">✨ AI Generated Site</span>
          <a href="pricing.html" style="background:#F07900;color:#fff;padding:8px 16px;border-radius:50px;font-size:12px;font-weight:700;text-decoration:none;">Get Started</a>
        </div>
        <div style="background:linear-gradient(135deg,#000,#1a1a1a);padding:56px 28px;text-align:center;">
          <h1 style="color:#fff;font-size:38px;font-weight:900;margin:0 0 16px;line-height:1.1;">Your Business<br><span style="color:#F07900;">Starts Here</span></h1>
          <p style="color:rgba(255,255,255,0.6);font-size:14px;max-width:380px;margin:0 auto 28px;line-height:1.7;">Professional website generated in seconds by HE5 SiteGen AI.</p>
          <a href="pricing.html" style="background:#F07900;color:#fff;padding:12px 28px;border-radius:50px;font-weight:700;font-size:14px;text-decoration:none;">Launch Website</a>
        </div>
        <div style="padding:24px 28px;background:#fff;display:flex;gap:16px;flex-wrap:wrap;justify-content:center;">
          <div style="background:#f8f8f8;padding:16px 20px;border-radius:10px;text-align:center;min-width:100px;">
            <div style="color:#F07900;font-weight:800;font-size:20px;">10K+</div>
            <div style="color:#666;font-size:11px;margin-top:4px;">Happy Clients</div>
          </div>
          <div style="background:#f8f8f8;padding:16px 20px;border-radius:10px;text-align:center;min-width:100px;">
            <div style="color:#F07900;font-weight:800;font-size:20px;">99.9%</div>
            <div style="color:#666;font-size:11px;margin-top:4px;">Uptime</div>
          </div>
          <div style="background:#f8f8f8;padding:16px 20px;border-radius:10px;text-align:center;min-width:100px;">
            <div style="color:#F07900;font-weight:800;font-size:20px;">4.9★</div>
            <div style="color:#666;font-size:11px;margin-top:4px;">Rating</div>
          </div>
        </div>
      </div>`
  };

  function getTemplate(text) {
    const lower = text.toLowerCase();
    if (lower.includes('restaurant') || lower.includes('food') || lower.includes('cafe') || lower.includes('dining')) {
      return sampleWebsites.restaurant;
    }
    if (lower.includes('fitness') || lower.includes('gym') || lower.includes('yoga') || lower.includes('workout')) {
      return sampleWebsites.fitness;
    }
    return sampleWebsites.default;
  }

  function showGenerating() {
    if (placeholder) placeholder.style.display = 'none';
    if (generating)  { generating.style.display = 'flex'; }
    previewArea.innerHTML = '';
    if (generating) previewArea.appendChild(generating);
  }

  function showResult(html) {
    previewArea.innerHTML = html;
    previewArea.style.minHeight = '';
  }

  function generate() {
    const text = textarea ? textarea.value.trim() : '';
    if (!text) {
      textarea?.focus();
      return;
    }

    // Show loading
    generateBtn.disabled = true;
    const originalHTML = generateBtn.innerHTML;
    generateBtn.innerHTML = `<span class="spinner"></span> Generating...`;

    // Show shimmer
    previewArea.innerHTML = `
      <div style="padding:24px;width:100%;">
        <div class="gen-bar" style="height:14px;background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%);background-size:200% 100%;border-radius:50px;animation:shimmer 1.5s infinite;margin-bottom:12px;width:60%;"></div>
        <div class="gen-bar" style="height:14px;background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%);background-size:200% 100%;border-radius:50px;animation:shimmer 1.5s infinite;margin-bottom:12px;width:90%;"></div>
        <div class="gen-bar" style="height:14px;background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%);background-size:200% 100%;border-radius:50px;animation:shimmer 1.5s infinite;margin-bottom:12px;width:75%;"></div>
        <div style="height:120px;background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%);background-size:200% 100%;border-radius:12px;animation:shimmer 1.5s infinite;margin-top:16px;"></div>
      </div>`;

    // Simulate AI generation delay (1.8s)
    setTimeout(() => {
      showResult(getTemplate(text));
      generateBtn.disabled = false;
      generateBtn.innerHTML = originalHTML;
    }, 1800);
  }

  generateBtn.addEventListener('click', generate);

  // Chip suggestions
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      if (textarea) {
        textarea.value = chip.textContent;
        textarea.focus();
      }
    });
  });

  // Enter key in textarea (Ctrl+Enter)
  if (textarea) {
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        generate();
      }
    });
  }
})();
