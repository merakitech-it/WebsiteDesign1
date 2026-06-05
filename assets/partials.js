(async function () {
  try {
    const [hRes, fRes] = await Promise.all([
      fetch('partials/header.html'),
      fetch('partials/footer.html')
    ]);
    const [hHTML, fHTML] = await Promise.all([hRes.text(), fRes.text()]);

    const hEl = document.getElementById('site-header');
    const fEl = document.getElementById('site-footer');
    if (hEl) hEl.outerHTML = hHTML;
    if (fEl) fEl.outerHTML = fHTML;

    // Mark the active nav link by matching the current page filename
    const page = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav.main a, .mobile-nav a').forEach(function (a) {
      if (!a.classList.contains('btn') && a.getAttribute('href') === page) {
        a.classList.add('active');
      }
    });

    // Init the header-dependent scripts now that the DOM is ready
    if (typeof window.initSiteHeader === 'function') window.initSiteHeader();
  } catch (e) {
    console.warn('Could not load site partials:', e);
  }
})();
