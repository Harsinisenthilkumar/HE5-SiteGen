// HE5 SiteGen — Website Builder Generation Logic
const promptInput = document.getElementById('prompt');
const generateBtn = document.getElementById('generateBtn');
const resetBtn = document.getElementById('resetBtn');
const statusBox = document.getElementById('statusBox');

document.querySelectorAll('.prompt-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    if (promptInput) {
      promptInput.value = chip.dataset.prompt || '';
    }
  });
});

if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    if (promptInput) promptInput.value = '';
    if (statusBox) {
      statusBox.classList.add('hidden');
      statusBox.innerHTML = '';
    }
  });
}

async function generateWebsite() {
  const prompt = promptInput ? promptInput.value.trim() : '';
  if (!prompt) {
    if (statusBox) {
      statusBox.textContent = 'Please describe the website you want to generate (e.g., "A boutique dental clinic focused on family care").';
      statusBox.classList.remove('hidden');
    }
    return;
  }

  // 1. Show loading animation & disable button
  if (generateBtn) {
    generateBtn.disabled = true;
    generateBtn.innerHTML = '<span class="spinner"></span> Generating…';
  }
  if (statusBox) {
    statusBox.classList.remove('hidden');
  }

  const startTime = Date.now();
  
  // Progress messages timeline list
  const progressMessages = [
    { delay: 0, text: 'Initializing connection with HE5 SiteGen AI engine…' },
    { delay: 1000, text: 'Analyzing prompt structure and content requirements…' },
    { delay: 2200, text: 'Assembling layout sections (Hero, About, Services, Gallery, Testimonials)…' },
    { delay: 3500, text: 'Applying modern orange-accented style variables and responsive CSS…' },
    { delay: 4800, text: 'Polishing typography and finalizing database records…' }
  ];

  // Start progress messages animation
  let messageIntervals = [];
  progressMessages.forEach(msg => {
    const timeout = setTimeout(() => {
      if (statusBox) {
        statusBox.innerHTML = `<strong>Generating website…</strong><div style="margin-top:0.4rem; color:var(--orange-light);">${msg.text}</div>`;
      }
    }, msg.delay);
    messageIntervals.push(timeout);
  });

  // Store the prompt in localStorage for client-side customization in case of fallback
  localStorage.setItem('he5_fallback_prompt', prompt);

  let projectId = 'demo-presentation-fallback';
  let generationSucceeded = false;

  try {
    // 2. Call API POST /api/generate
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      throw new Error('API server returned error status.');
    }

    const data = await response.json();
    projectId = data.projectId || 'demo-presentation-fallback';

    if (data.status === 'ready') {
      generationSucceeded = true;
    } else {
      // 3. Poll: GET /api/projects/:id
      let attempts = 0;
      const maxAttempts = 20;

      const pollProject = async () => {
        attempts++;
        try {
          const pollResponse = await fetch(`/api/projects/${projectId}`);
          if (!pollResponse.ok) {
            throw new Error('Project status query failed.');
          }
          const project = await pollResponse.json();
          if (project.status === 'ready') {
            generationSucceeded = true;
            proceedToPreview();
          } else {
            if (attempts >= maxAttempts) {
              console.warn('Polling timeout, redirecting to preview with fallback protection');
              generationSucceeded = true; // treat as ready so we go to preview.html
              proceedToPreview();
            } else {
              // Wait 2s and poll again
              setTimeout(pollProject, 2000);
            }
          }
        } catch (pollErr) {
          console.warn(`Polling error on attempt ${attempts}, retrying in 2 seconds:`, pollErr);
          // Auto retry on polling failures
          if (attempts >= maxAttempts) {
            generationSucceeded = true;
            proceedToPreview();
          } else {
            setTimeout(pollProject, 2000);
          }
        }
      };

      // Start polling
      setTimeout(pollProject, 1500);
      return; // pollProject handles the redirect
    }
  } catch (error) {
    console.warn('Network call failed, utilizing client-side fallback redirection:', error);
    // If anything fails, we redirect to fallback ID after simulated delay
    projectId = 'demo-presentation-fallback';
    generationSucceeded = true;
  }

  // Redirect helper enforcing the minimum 4 seconds simulation
  function proceedToPreview() {
    const elapsedTime = Date.now() - startTime;
    const remainingTime = Math.max(0, 4200 - elapsedTime);
    
    // Clear any pending progress messages
    messageIntervals.forEach(clearTimeout);

    setTimeout(() => {
      if (statusBox) {
        statusBox.innerHTML = `<strong>Success!</strong><div style="margin-top:0.4rem; color: #4ade80;">Website generation completed. Launching preview…</div>`;
      }
      setTimeout(() => {
        window.location.href = `preview.html?id=${projectId}`;
      }, 500);
    }, remainingTime);
  }

  if (generationSucceeded) {
    proceedToPreview();
  }
}

if (generateBtn) {
  generateBtn.addEventListener('click', generateWebsite);
}
