/* Original browser-local reading workbench. No network, storage, or backend. */
(() => {
  'use strict';
  const root = document.documentElement;
  const byId = (id) => document.getElementById(id);
  const settings = { theme: byId('theme-select'), appearance: byId('appearance'), motion: byId('motion') };
  const labels = { editorial: 'Editorial', swiss: 'Swiss', precision: 'Precision', play: 'Play', botanical: 'Botanical', blueprint: 'Blueprint', pulse: 'Pulse', gallery: 'Gallery', layered: 'Layered' };
  const fits = {
    editorial: 'Editorial’s reading palette and type suit this quiet task. Paired inset relief is an explicit departure from its ordinary selective elevation.',
    swiss: 'Swiss keeps its graphic palette, type, and small corners. Its ordinary flat graphic structure conflicts with soft physical relief; this reading study is a declared exception.',
    precision: 'Precision keeps its utility palette, type, and 4px geometry. Its ordinary working surfaces are flat and shadow-free; this soft reading study is a declared exception.',
    play: 'Play keeps its expressive palette, type, and rounded geometry. Same-material soft relief replaces its characteristic hard offset shadows, an explicit departure from ordinary Play depth.',
    botanical: 'Botanical’s reading palette, type, and alternating corners suit this quiet task. Paired inset relief is an additional style choice, beyond its ordinary selective elevation.',
    blueprint: 'Blueprint keeps its technical palette, type, and 8px/4px geometry. Same-material relief replaces its drafting depth; this soft reading study is a declared exception.',
    pulse: 'Pulse keeps its event palette, type, and 12px/6px geometry. Soft physical relief is a bounded reading study, not a replacement for flat schedule and task surfaces.',
    gallery: 'Gallery keeps its collection palette, type, and 4px geometry. Its ordinary surfaces rest flat and give imagery priority; soft reading relief is a declared exception. Image-led work needs separate evaluation.',
    layered: 'Layered explicitly rules out inset bevels that simulate physical controls on its ordinary workspace. This reading study is a substantial declared departure; the detailed form keeps ordinary geometry.',
  };
  const allowed = { theme: Object.keys(labels), appearance: ['light', 'dark', 'system'], motion: ['off', 'on'] };
  const media = {
    dark: window.matchMedia('(prefers-color-scheme: dark)'),
    reduced: window.matchMedia('(prefers-reduced-motion: reduce)'),
    forced: window.matchMedia('(forced-colors: active)'),
  };
  const defaults = Object.freeze({ name: 'A little room to read', width: 60, size: 18, spacing: '1.75' });
  const name = byId('preset-name');
  const size = byId('text-size');
  const spacing = byId('line-spacing');
  const status = byId('draft-status');
  const widths = Array.from(document.querySelectorAll('[data-width]'));
  let draftWidth = defaults.width;
  let applied = { ...defaults };

  function updateMaterialStatus() {
    const dark = settings.appearance.value === 'dark' || (settings.appearance.value === 'system' && media.dark.matches);
    let message = 'Same-material relief · ' + (dark ? 'dark' : 'light') + ' appearance · ';
    if (media.forced.matches) message = 'System colors · relief shadows removed · press travel off for forced colors.';
    else if (media.reduced.matches) message += 'press travel off for reduced motion.';
    else message += settings.motion.value === 'on' ? '1px press travel on.' : 'press travel off.';
    byId('material-status').textContent = message;
    root.dataset.effectiveMotion = settings.motion.value === 'on' && !media.reduced.matches && !media.forced.matches ? 'on' : 'off';
  }

  function applySetting(key) {
    const field = settings[key];
    if (!allowed[key].includes(field.value)) field.value = key === 'theme' ? 'editorial' : allowed[key][0];
    root.dataset[key] = field.value;
    if (key === 'theme') {
      const label = labels[field.value];
      byId('theme-label').textContent = label;
      byId('theme-source-link').textContent = label + ' theme reference ↗';
      byId('theme-source-link').href = '../../../themes/' + field.value + '/README.md';
      byId('theme-credits-link').textContent = label + ' source & font credits ↗';
      byId('theme-credits-link').href = '../../../themes/' + field.value + '/sources.md';
      byId('theme-fit').textContent = fits[field.value];
    }
    byId('font-stack').textContent = getComputedStyle(root).getPropertyValue('--theme-font').trim();
    updateMaterialStatus();
  }

  function updateWidthStatus() {
    byId('width-status').textContent = draftWidth + 'ch selected for the draft. The sample currently uses ' + applied.width + 'ch.';
  }

  function setDraftWidth(value) {
    if (![45, 60, 72].includes(value)) return;
    draftWidth = value;
    widths.forEach((button) => {
      const selected = Number(button.dataset.width) === value;
      button.setAttribute('aria-pressed', String(selected));
      button.querySelector('.choice-state').textContent = selected ? '✓ Selected' : 'Choose draft';
    });
    updateWidthStatus();
  }

  const errorFields = [[name, 'name-error'], [size, 'size-error'], [spacing, 'spacing-error']];
  function clearErrors() {
    errorFields.forEach(([field, id]) => {
      field.setCustomValidity('');
      field.removeAttribute('aria-invalid');
      byId(id).textContent = '';
      byId(id).hidden = true;
    });
  }

  function draftChanged() {
    clearErrors();
    status.dataset.state = 'draft';
    status.textContent = 'Draft changed. Apply reading settings when ready; the sample still shows your last applied settings.';
    updateWidthStatus();
  }

  function showError(field, id, message) {
    field.setCustomValidity(message);
    field.setAttribute('aria-invalid', 'true');
    byId(id).textContent = message;
    byId(id).hidden = false;
  }

  function validateDraft() {
    clearErrors();
    const trimmed = name.value.trim();
    if (trimmed.length < 3 || trimmed.length > 48) showError(name, 'name-error', 'Enter a preset name of 3–48 characters after trimming spaces.');
    const numericSize = size.valueAsNumber;
    if (!Number.isFinite(numericSize) || numericSize < 16 || numericSize > 24 || numericSize % 2 !== 0 || !size.validity.valid) showError(size, 'size-error', 'Enter a text size from 16 to 24px, in steps of 2.');
    if (!['1.5', '1.75', '2'].includes(spacing.value)) showError(spacing, 'spacing-error', 'Choose one of the three line-spacing options.');
    const firstInvalid = errorFields.find(([field]) => !field.validity.valid);
    if (firstInvalid) {
      status.dataset.state = 'error';
      status.textContent = 'Check the highlighted reading settings. The sample keeps your last applied settings.';
      firstInvalid[0].focus();
      return null;
    }
    return { name: trimmed, width: draftWidth, size: numericSize, spacing: spacing.value };
  }

  function applyReadingSettings(next) {
    applied = { ...next };
    const sample = byId('reading-sample');
    byId('sample-title').textContent = applied.name;
    sample.style.maxWidth = applied.width + 'ch';
    sample.style.fontSize = applied.size + 'px';
    sample.style.lineHeight = applied.spacing;
    byId('applied-width').textContent = applied.width + 'ch';
    byId('applied-size').textContent = applied.size + 'px';
    byId('applied-spacing').textContent = applied.spacing;
    updateWidthStatus();
  }

  widths.forEach((button) => button.addEventListener('click', () => {
    setDraftWidth(Number(button.dataset.width));
    draftChanged();
  }));
  [name, size].forEach((field) => field.addEventListener('input', draftChanged));
  spacing.addEventListener('change', draftChanged);
  byId('reading-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const next = validateDraft();
    if (!next) return;
    name.value = next.name;
    applyReadingSettings(next);
    status.dataset.state = 'applied';
    status.textContent = 'Applied “' + next.name + '”: ' + next.width + 'ch, ' + next.size + 'px text, and ' + next.spacing + ' line spacing. Nothing is saved.';
  });
  byId('reset-button').addEventListener('click', () => {
    clearErrors();
    name.value = defaults.name;
    size.value = String(defaults.size);
    spacing.value = defaults.spacing;
    setDraftWidth(defaults.width);
    applyReadingSettings(defaults);
    status.dataset.state = 'applied';
    status.textContent = 'Example restored. Both the draft and reading sample use the original settings. Nothing is saved.';
    name.focus();
  });
  Object.keys(settings).forEach((key) => settings[key].addEventListener('change', () => applySetting(key)));
  Object.values(media).forEach((query) => query.addEventListener('change', updateMaterialStatus));
  Object.keys(settings).forEach(applySetting);
  Object.values(settings).forEach((field) => { field.disabled = false; });
  widths.forEach((button) => { button.disabled = false; });
  byId('reading-fields').disabled = false;
  byId('js-status').textContent = 'Local workbench ready. Apply changes to the sample; nothing is saved or sent.';
})();
