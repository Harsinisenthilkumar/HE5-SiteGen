/**
 * HE5 SiteGen — FAQ Accordion
 */
(function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer   = item.querySelector('.faq-answer');
    if (!question || !answer) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.faq-answer').style.height = '0';
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      if (isOpen) {
        item.classList.remove('open');
        answer.style.height = '0';
        question.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        answer.style.height = answer.scrollHeight + 'px';
        question.setAttribute('aria-expanded', 'true');
      }
    });

    // Keyboard support
    question.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        question.click();
      }
    });

    // Accessibility
    question.setAttribute('role', 'button');
    question.setAttribute('aria-expanded', 'false');
    question.setAttribute('tabindex', '0');
  });
})();
