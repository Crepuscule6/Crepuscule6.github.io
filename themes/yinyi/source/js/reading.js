(() => {
  'use strict';
  const key = 'yinyi:reading-width';
  const root = document.documentElement;
  let width = 'wide';
  try {
    if (localStorage.getItem(key) === 'narrow') width = 'narrow';
  } catch (_) {}
  root.dataset.readingWidth = width;

  function init() {
    const controls = document.querySelector('.post-reading .reading-width-controls');
    if (!controls) return;
    const buttons = [...controls.querySelectorAll('[data-reading-width-choice]')];
    function apply(value) {
      width = value === 'narrow' ? 'narrow' : 'wide';
      root.dataset.readingWidth = width;
      for (const button of buttons) {
        button.setAttribute('aria-pressed', String(button.dataset.readingWidthChoice === width));
      }
    }
    apply(width);
    controls.hidden = false;
    for (const button of buttons) {
      button.addEventListener('click', () => {
        apply(button.dataset.readingWidthChoice);
        try { localStorage.setItem(key, width); } catch (_) {}
      });
    }
    window.addEventListener('storage', event => {
      if (event.key === key || event.key === null) apply(event.newValue);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
