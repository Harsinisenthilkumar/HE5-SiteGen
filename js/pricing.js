/**
 * HE5 SiteGen — Pricing Toggle (Monthly / Annual)
 */
(function initPricingToggle() {
  const toggle   = document.querySelector('#billing-toggle');
  const pricingEl = document.querySelector('.pricing-grid');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('annual');
    const isAnnual = toggle.classList.contains('annual');

    // Update label styles
    document.querySelectorAll('.billing-label').forEach((label, i) => {
      label.classList.toggle('active', isAnnual ? i === 1 : i === 0);
    });

    // Show/hide prices
    if (pricingEl) {
      pricingEl.classList.toggle('billing-annual', isAnnual);
    }
  });

  // Init first label as active
  const labels = document.querySelectorAll('.billing-label');
  if (labels[0]) labels[0].classList.add('active');
})();
