/* Original browser-local specimen behavior. No network, storage, or backend. */
(() => {
  'use strict';
  const root = document.documentElement;
  const byId = (id) => document.getElementById(id);
  const settings = { theme: byId('theme-select'), appearance: byId('appearance'), motion: byId('motion') };
  const labels = { editorial: 'Editorial', swiss: 'Swiss', precision: 'Precision', play: 'Play', botanical: 'Botanical', blueprint: 'Blueprint', pulse: 'Pulse', gallery: 'Gallery', layered: 'Layered' };
  const fits = {
    editorial: 'Editorial keeps its reading palette and declared type. Inflated clay shells are an explicit departure from its quieter surface grammar.',
    swiss: 'Swiss keeps its graphic palette and type roles. Its ordinary geometric surfaces conflict with inflated clay; this bounded creative study is a declared exception.',
    precision: 'Precision keeps its utility palette and declared type. Its ordinary utility surfaces conflict with inflated clay; this bounded creative study is a declared exception. Detailed fields and work surfaces keep ordinary geometry.',
    play: 'Play’s expressive identity has affinity with this small creative task. Clay explicitly replaces its hard depth and shell geometry.',
    botanical: 'Botanical keeps its organic palette and declared type. Clay adds inflated volume; its heavier rounding is an explicit style choice.',
    blueprint: 'Blueprint keeps its technical palette and declared type. Its ordinary technical surfaces conflict with inflated clay; this bounded creative study is a declared exception.',
    pulse: 'Pulse keeps its event palette and declared type. Normal schedule and task surfaces stay flat; clay is a bounded creative choice here, not a replacement for those surfaces.',
    gallery: 'Gallery keeps its collection palette and declared type. Its ordinary restrained surfaces conflict with inflated clay; this bounded creative study is a declared exception. Image-led work needs separate evaluation.',
    layered: 'Layered explicitly rules out inset bevels that simulate physical controls on its ordinary workspace. This creative illustration study is a substantial declared departure; the detailed form keeps ordinary geometry.',
  };
  const allowed = { theme: Object.keys(labels), appearance: ['light', 'dark', 'system'], motion: ['off', 'on'] };
  const media = {
    dark: window.matchMedia('(prefers-color-scheme: dark)'),
    reduced: window.matchMedia('(prefers-reduced-motion: reduce)'),
    forced: window.matchMedia('(forced-colors: active)'),
  };
  const practices = { sketch: 'Sketch a little', writing: 'Write a page', making: 'Make a thing' };
  let selected = 'sketch';
  const form = byId('session-form');
  const title = byId('session-title');
  const minutes = byId('session-minutes');
  const status = byId('form-status');

  function updateMaterialStatus() {
    const dark = settings.appearance.value === 'dark' || (settings.appearance.value === 'system' && media.dark.matches);
    let message = 'Opaque clay surfaces · ' + (dark ? 'dark' : 'light') + ' appearance · ';
    if (media.forced.matches) message = 'System colors · shadows removed · press travel off for forced colors.';
    else if (media.reduced.matches) message += 'press travel off for reduced motion.';
    else message += settings.motion.value === 'on' ? '1px press travel on.' : 'press travel off.';
    byId('material-status').textContent = message;
    root.dataset.effectiveMotion = settings.motion.value === 'on' && !media.reduced.matches && !media.forced.matches ? 'on' : 'off';
  }

  function applySetting(key) {
    const field = settings[key];
    if (!allowed[key].includes(field.value)) field.value = key === 'theme' ? 'play' : allowed[key][0];
    root.dataset[key] = field.value;
    if (key === 'theme') {
      const name = labels[field.value];
      byId('theme-label').textContent = name;
      byId('theme-source-link').textContent = name + ' theme reference ↗';
      byId('theme-source-link').href = '../../../themes/' + field.value + '/README.md';
      byId('theme-credits-link').textContent = name + ' source & font credits ↗';
      byId('theme-credits-link').href = '../../../themes/' + field.value + '/sources.md';
      byId('theme-fit').textContent = fits[field.value];
    }
    byId('font-stack').textContent = getComputedStyle(root).getPropertyValue('--theme-font').trim();
    updateMaterialStatus();
  }

  function clearError(field, errorId) {
    field.removeAttribute('aria-invalid');
    byId(errorId).hidden = true;
    byId(errorId).textContent = '';
  }

  function clearErrors() {
    clearError(title, 'title-error');
    clearError(minutes, 'minutes-error');
  }

  function hideReview() {
    byId('review-panel').hidden = true;
    byId('starting-note').hidden = false;
  }

  function draftChanged() {
    clearErrors();
    hideReview();
    status.dataset.state = 'draft';
    status.textContent = 'Session changed. Review it again when ready. Nothing is sent or saved.';
  }

  function selectPractice(value, announce = true) {
    if (!Object.hasOwn(practices, value)) return;
    selected = value;
    document.querySelectorAll('[data-practice]').forEach((button) => {
      const current = button.dataset.practice === value;
      button.setAttribute('aria-pressed', String(current));
      button.querySelector('.choice-state').textContent = current ? 'Selected' : 'Choose';
    });
    byId('practice-name').textContent = practices[value];
    byId('selection-status').textContent = practices[value] + ' selected. Your session will use this practice.';
    if (announce) draftChanged();
  }

  function showError(field, errorId, message) {
    field.setAttribute('aria-invalid', 'true');
    byId(errorId).textContent = message;
    byId(errorId).hidden = false;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearErrors();
    hideReview();
    const value = title.value.trim();
    const amount = Number(minutes.value);
    let firstInvalid = null;
    if (value.length < 3 || value.length > 48) {
      showError(title, 'title-error', 'Enter a session name using 3–48 characters after trimming spaces.');
      firstInvalid = title;
    }
    if (minutes.value === '' || !Number.isInteger(amount) || amount < 5 || amount > 120 || amount % 5 !== 0) {
      showError(minutes, 'minutes-error', 'Choose 5–120 minutes, in steps of 5.');
      if (!firstInvalid) firstInvalid = minutes;
    }
    if (firstInvalid) {
      status.dataset.state = 'error';
      status.textContent = 'Your session needs an update. Check the marked fields before reviewing.';
      firstInvalid.focus();
      return;
    }
    title.value = value;
    byId('review-title').textContent = value;
    byId('review-practice').textContent = practices[selected];
    byId('review-minutes').textContent = amount + ' minutes';
    byId('starting-note').hidden = true;
    byId('review-panel').hidden = false;
    status.dataset.state = 'success';
    status.textContent = 'Reviewed: ' + value + ' · ' + practices[selected] + ' · ' + amount + ' minutes. This example stays in this page only.';
  });
  title.addEventListener('input', draftChanged);
  minutes.addEventListener('input', draftChanged);
  byId('reset-button').addEventListener('click', () => {
    form.reset();
    selectPractice('sketch', false);
    clearErrors();
    hideReview();
    status.dataset.state = 'draft';
    status.textContent = 'Example reset to Sketch a little and 20 minutes. Nothing is sent or saved.';
    title.focus();
  });
  document.querySelectorAll('[data-practice]').forEach((button) => {
    button.addEventListener('click', () => selectPractice(button.dataset.practice));
  });
  Object.entries(settings).forEach(([key, field]) => {
    field.addEventListener('change', () => applySetting(key));
  });
  Object.values(media).forEach((query) => {
    if (query.addEventListener) query.addEventListener('change', updateMaterialStatus);
    else if (query.addListener) query.addListener(updateMaterialStatus);
  });
  Object.keys(settings).forEach(applySetting);
  Object.values(settings).forEach((field) => { field.disabled = false; });
  document.querySelectorAll('[data-practice]').forEach((button) => { button.disabled = false; });
  byId('session-fields').disabled = false;
  byId('js-status').textContent = 'Settings and local session review are active. Reload restores the example; no preferences or session data are stored.';
})();
