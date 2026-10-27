/* Original, browser-local specimen behavior. No network, storage, or backend. */
(() => {
  'use strict';
  const root = document.documentElement;
  const byId = (id) => document.getElementById(id);
  const fields = {
    theme: byId('theme-select'),
    appearance: byId('appearance'),
    transparency: byId('transparency'),
    background: byId('background'),
  };
  const allowed = {
    theme: ['editorial', 'swiss', 'precision', 'play', 'botanical', 'blueprint', 'pulse', 'gallery', 'layered'],
    appearance: ['light', 'dark', 'system'],
    transparency: ['auto', 'opaque'],
    background: ['calm', 'bright', 'busy'],
  };
  const labels = { editorial: 'Editorial', swiss: 'Swiss', precision: 'Precision', play: 'Play', botanical: 'Botanical', blueprint: 'Blueprint', pulse: 'Pulse', gallery: 'Gallery', layered: 'Layered' };
  const media = {
    dark: window.matchMedia('(prefers-color-scheme: dark)'),
    reduced: window.matchMedia('(prefers-reduced-transparency: reduce)'),
    forced: window.matchMedia('(forced-colors: active)'),
  };
  const supportsGlass = Boolean(window.CSS && CSS.supports &&
    (CSS.supports('backdrop-filter', 'blur(1px)') || CSS.supports('-webkit-backdrop-filter', 'blur(1px)')) &&
    CSS.supports('background', 'color-mix(in srgb, white 88%, transparent)'));

  function updateMaterialStatus() {
    const dark = fields.appearance.value === 'dark' || (fields.appearance.value === 'system' && media.dark.matches);
    const appearance = dark ? 'dark' : 'light';
    let message = `Tinted glass · ${appearance} appearance. Dense content stays opaque.`;
    let effective = 'glass';
    if (media.forced.matches) {
      message = 'Opaque chrome · your forced-colors preference takes precedence.';
      effective = 'opaque';
    } else if (media.reduced.matches) {
      message = 'Opaque chrome · your reduced-transparency preference takes precedence.';
      effective = 'opaque';
    } else if (fields.transparency.value === 'opaque') {
      message = `Opaque chrome · ${appearance} appearance. Your choice applies immediately.`;
      effective = 'opaque';
    } else if (!supportsGlass) {
      message = 'Opaque chrome · this browser does not support the tint and backdrop treatment.';
      effective = 'opaque';
    }
    root.dataset.effectiveTransparency = effective;
    byId('material-status').textContent = message;
  }

  function applySetting(key) {
    const field = fields[key];
    if (!allowed[key].includes(field.value)) field.value = allowed[key][0];
    root.dataset[key] = field.value;
    if (key === 'theme') {
      const name = labels[field.value];
      byId('theme-label').textContent = name;
      byId('theme-source-link').href = `../../../themes/${field.value}/README.md`;
      byId('theme-source-link').textContent = `${name} theme reference ↗`;
    }
    updateMaterialStatus();
  }

  const surfaceDetails = {
    navigation: { name: 'Navigation chrome', treatment: 'Tinted glass', description: 'Glass gives the navigation a visible edge while leaving the backdrop in view. The links keep a solid, readable foreground.' },
    context: { name: 'Context card', treatment: 'Tinted glass', description: 'Short supporting information can share the atmosphere of the backdrop. Keep its text brief and use the same shallow plane as the navigation.' },
    content: { name: 'Reading surface', treatment: 'Always opaque', description: 'The detailed work needs a stable background. This form, its validation messages, and the inventory table keep an opaque fill in every condition.' },
  };
  function selectSurface(key) {
    const detail = surfaceDetails[key];
    if (!detail) return;
    document.querySelectorAll('[data-surface-choice]').forEach((button) => {
      const current = button.dataset.surfaceChoice === key;
      button.setAttribute('aria-pressed', String(current));
      const state = button.querySelector('.choice-state');
      if (state) state.textContent = current ? 'Selected' : 'Inspect';
    });
    document.querySelectorAll('[data-surface-row]').forEach((row) => { row.dataset.selected = String(row.dataset.surfaceRow === key); });
    byId('current-surface').textContent = detail.name;
    byId('surface-description').textContent = detail.description;
    byId('surface-treatment').textContent = detail.treatment;
    byId('selection-status').textContent = `${detail.name} selected. The material still follows your transparency setting and device preferences.`;
  }

  const form = byId('project-form');
  const title = byId('project-title');
  const note = byId('project-note');
  const error = byId('title-error');
  const reviewStatus = byId('review-status');
  function clearTitleError() {
    title.removeAttribute('aria-invalid');
    error.hidden = true;
    error.textContent = '';
  }
  function draftChanged() {
    clearTitleError();
    reviewStatus.dataset.state = 'draft';
    reviewStatus.textContent = 'Draft changed. Review it again when ready. Nothing is sent or saved.';
  }
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = title.value.trim();
    if (value.length < 3 || value.length > 48) {
      title.setAttribute('aria-invalid', 'true');
      error.textContent = value.length === 0 ? 'Enter a project title using 3–48 characters.' : 'Use 3–48 characters after trimming spaces.';
      error.hidden = false;
      reviewStatus.dataset.state = 'error';
      reviewStatus.textContent = 'The draft needs a title update. Check the message below Project title.';
      title.focus();
      return;
    }
    clearTitleError();
    title.value = value;
    reviewStatus.dataset.state = 'success';
    reviewStatus.textContent = `Ready to review: ${value}. ${note.value.trim() ? 'Your note is included. ' : ''}This draft stays in this page only.`;
  });
  title.addEventListener('input', draftChanged);
  note.addEventListener('input', draftChanged);
  byId('reset-project').addEventListener('click', () => {
    form.reset();
    clearTitleError();
    reviewStatus.dataset.state = 'draft';
    reviewStatus.textContent = 'Example reset. Nothing is sent or saved.';
    title.focus();
  });

  Object.entries(fields).forEach(([key, field]) => {
    field.addEventListener('change', () => applySetting(key));
    field.disabled = false;
  });
  document.querySelectorAll('[data-surface-choice]').forEach((button) => {
    button.addEventListener('click', () => selectSurface(button.dataset.surfaceChoice));
    button.disabled = false;
  });
  Object.values(media).forEach((query) => {
    if (query.addEventListener) query.addEventListener('change', updateMaterialStatus);
    else if (query.addListener) query.addListener(updateMaterialStatus);
  });
  byId('project-fields').disabled = false;
  byId('js-status').textContent = 'Settings and the local draft review are active. Preferences are not saved; reload to reset this study.';
  updateMaterialStatus();
})();
