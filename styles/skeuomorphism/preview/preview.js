/* Original browser-local Fieldbook. No network, persistent storage, or backend. */
(() => {
  'use strict';
  const root = document.documentElement;
  const byId = (id) => document.getElementById(id);
  const labels = { editorial: 'Editorial', swiss: 'Swiss', precision: 'Precision', play: 'Play', botanical: 'Botanical', blueprint: 'Blueprint', pulse: 'Pulse', gallery: 'Gallery', layered: 'Layered' };
  const fits = {
    editorial: 'Editorial’s reading palette and type suit short notes. The bound notebook construction is an explicit material addition beyond its ordinary selective elevation.',
    swiss: 'Swiss retains its graphic palette, type, and 2px ordinary corners. Physical paper and binding depart from its ordinary flat graphic structure; this is a declared notebook exception.',
    precision: 'Precision retains its utility palette, type, and 4px ordinary corners. Its source working surfaces are flat and shadow-free; the material notebook is a declared exception.',
    play: 'Play retains its expressive palette, type, and rounded ordinary geometry. A bound paper stack replaces its characteristic hard offset shadow treatment in this limited notebook study.',
    botanical: 'Botanical retains its reading palette, type, and alternating ordinary corners. The paper artifact alone has 2px corners; the bound construction adds material beyond its ordinary selective elevation.',
    blueprint: 'Blueprint retains its technical palette, type, and 8px/4px ordinary geometry. The paper-and-binding metaphor is a declared addition to its usual drafting structure.',
    pulse: 'Pulse retains its event palette, type, and 12px/6px ordinary geometry. This short-note notebook is a bounded physical metaphor; schedule density and event workflows require separate evaluation.',
    gallery: 'Gallery retains its collection palette, type, and 4px ordinary geometry. The bound notebook gives material a role beyond its ordinary flat, image-led surfaces; collection work needs separate evaluation.',
    layered: 'Layered retains its workspace palette, type, and ordinary geometry. Its source excludes skeuomorphic inset bevels on ordinary controls; this bound-paper artifact is a substantial declared departure.',
  };
  const settings = { theme: byId('theme-select'), appearance: byId('appearance'), motion: byId('motion') };
  const allowed = { theme: Object.keys(labels), appearance: ['light', 'dark', 'system'], motion: ['off', 'on'] };
  const media = { dark: matchMedia('(prefers-color-scheme: dark)'), reduced: matchMedia('(prefers-reduced-motion: reduce)'), forced: matchMedia('(forced-colors: active)') };
  const records = [
    { id: 'window-light', title: 'Window light', body: 'At half past eight, a square of sun reaches the empty chair. By the time the kettle clicks, it has moved to the floor. A useful clock, if you are in no hurry.', tags: ['morning', 'light'] },
    { id: 'corner-shop', title: 'The corner shop', body: 'The shopkeeper puts a bowl of water beside the door each morning. No sign explains it. A sparrow lands on the rim, takes a drink, and leaves the arrangement exactly as it was.', tags: ['neighborhood', 'small rituals'] },
    { id: 'small-route', title: 'The small route', body: 'Turn left at the blue gate, then follow the wall until the jasmine begins. The longer route has better shade and one low branch worth remembering.', tags: ['walk', 'route'] },
    { id: 'rain-check', title: 'After the rain', body: 'Three drops hang from the washing line after the rain has stopped. Each holds the whole courtyard upside down. The smallest one lets go first.', tags: ['weather', 'afternoon'] },
  ];
  const drafts = new Map(records.map((note) => [note.id, { title: note.title, body: note.body }]));
  const buttons = Array.from(document.querySelectorAll('.note-option[data-note-id]'));
  const title = byId('draft-title');
  const body = byId('draft-body');
  const search = byId('note-search');
  const status = byId('draft-status');
  let currentId = records[0].id;
  const current = () => records.find((note) => note.id === currentId);
  const ordinal = (id) => String(records.findIndex((note) => note.id === id) + 1).padStart(2, '0');

  function updateMaterialStatus() {
    const dark = settings.appearance.value === 'dark' || (settings.appearance.value === 'system' && media.dark.matches);
    let message = 'Bound paper study · ' + (dark ? 'dark' : 'light') + ' appearance · ';
    if (media.forced.matches) message = 'System colors · decorative material removed · press travel off for forced colors.';
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
      byId('theme-fit').textContent = fits[field.value];
      byId('theme-source-link').textContent = label + ' theme reference ↗';
      byId('theme-source-link').href = '../../../themes/' + field.value + '/README.md';
      byId('theme-credits-link').textContent = label + ' source & font credits ↗';
      byId('theme-credits-link').href = '../../../themes/' + field.value + '/sources.md';
    }
    byId('font-stack').textContent = getComputedStyle(root).getPropertyValue('--theme-font').trim();
    updateMaterialStatus();
  }
  function cacheDraft() { drafts.set(currentId, { title: title.value, body: body.value }); }
  function clearErrors() {
    [[title, 'title-error'], [body, 'body-error']].forEach(([field, id]) => {
      field.setCustomValidity('');
      field.removeAttribute('aria-invalid');
      byId(id).textContent = '';
      byId(id).hidden = true;
    });
  }
  function isDirty() {
    const draft = drafts.get(currentId);
    return draft.title !== current().title || draft.body !== current().body;
  }
  function describeDraft() {
    const dirty = isDirty();
    status.dataset.state = dirty ? 'draft' : 'applied';
    status.textContent = dirty ? 'Draft changed for “' + current().title + '”. Apply locally to update the note; nothing is saved.' : 'The draft matches this note’s applied text. Nothing is saved.';
  }
  function matches(note) {
    const query = search.value.trim().toLocaleLowerCase();
    return !query || [note.title, note.body, ...note.tags].join(' ').toLocaleLowerCase().includes(query);
  }
  function renderIndex() {
    let count = 0;
    buttons.forEach((button) => {
      const note = records.find((item) => item.id === button.dataset.noteId);
      const selected = note.id === currentId;
      button.hidden = !matches(note);
      if (!button.hidden) count += 1;
      button.setAttribute('aria-pressed', String(selected));
      button.querySelector('.note-title').textContent = note.title;
      button.querySelector('.choice-state').textContent = selected ? '✓ Selected' : 'Open note';
    });
    const query = search.value.trim();
    byId('search-status').textContent = query ? count + ' of 4 applied notes match “' + query + '”.' : 'All 4 notes in their original order.';
    byId('empty-search').hidden = count !== 0;
    const hidden = !matches(current());
    byId('context-status').dataset.hidden = String(hidden);
    byId('context-status').textContent = hidden ? 'The open note is outside these search results. Your note and draft stay open; clear search to see it in the index.' : 'Open note: ' + ordinal(currentId) + ' · ' + current().title + '. Changes remain in this page.';
  }
  function renderApplied() {
    const note = current();
    byId('applied-title').textContent = note.title;
    byId('applied-body').textContent = note.body;
    byId('applied-tags').textContent = note.tags.join(' · ');
    byId('opened-note-id').textContent = 'LEAF ' + ordinal(currentId);
    byId('download-status').textContent = '';
    renderIndex();
  }
  function openNote(id) {
    if (!records.some((note) => note.id === id)) return;
    cacheDraft();
    currentId = id;
    clearErrors();
    const draft = drafts.get(id);
    title.value = draft.title;
    body.value = draft.body;
    renderApplied();
    describeDraft();
  }
  function showError(field, id, message) {
    field.setCustomValidity(message);
    field.setAttribute('aria-invalid', 'true');
    byId(id).textContent = message;
    byId(id).hidden = false;
  }
  function validate() {
    clearErrors();
    const next = { title: title.value.trim(), body: body.value.trim() };
    if (next.title.length < 3 || next.title.length > 48) showError(title, 'title-error', 'Enter a title of 3–48 characters after trimming spaces.');
    if (next.body.length < 1 || next.body.length > 240) showError(body, 'body-error', 'Enter note text of 1–240 characters after trimming spaces.');
    const invalid = [title, body].find((field) => !field.validity.valid);
    if (invalid) {
      status.dataset.state = 'error';
      status.textContent = 'Check the highlighted draft fields. The applied note is unchanged.';
      invalid.focus();
      return null;
    }
    return next;
  }

  buttons.forEach((button) => button.addEventListener('click', () => openNote(button.dataset.noteId)));
  [title, body].forEach((field) => field.addEventListener('input', () => {
    cacheDraft();
    clearErrors();
    describeDraft();
  }));
  search.addEventListener('input', renderIndex);
  byId('clear-search').addEventListener('click', () => {
    search.value = '';
    renderIndex();
    search.focus();
  });
  byId('note-form').addEventListener('submit', (event) => {
    event.preventDefault();
    cacheDraft();
    const next = validate();
    if (!next) return;
    Object.assign(current(), next);
    title.value = next.title;
    body.value = next.body;
    cacheDraft();
    renderApplied();
    status.dataset.state = 'applied';
    status.textContent = 'Applied “' + next.title + '” locally. This page holds the change; reload resets the demo. Nothing is saved.';
  });
  byId('revert-button').addEventListener('click', () => {
    clearErrors();
    title.value = current().title;
    body.value = current().body;
    cacheDraft();
    status.dataset.state = 'applied';
    status.textContent = 'Draft reverted to “' + current().title + '”, the open note’s last applied text. Other note drafts are unchanged.';
    title.focus();
  });
  byId('download-button').addEventListener('click', () => {
    const note = current();
    const payload = 'Fieldbook · Interface Atlas\n\n' + note.title + '\n\n' + note.body + '\n\nTags: ' + note.tags.join(', ') + '\n\nManual copy of a browser-local example.\n';
    const url = URL.createObjectURL(new Blob([payload], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'fieldbook-' + note.id + '.txt';
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    byId('download-status').textContent = 'Applied note prepared for download: “' + note.title + '”.' + (isDirty() ? ' Your unapplied draft is not included.' : '');
  });
  Object.keys(settings).forEach((key) => settings[key].addEventListener('change', () => applySetting(key)));
  Object.values(media).forEach((query) => query.addEventListener('change', updateMaterialStatus));
  Object.keys(settings).forEach(applySetting);
  renderApplied();
  Object.values(settings).forEach((field) => { field.disabled = false; });
  buttons.forEach((button) => { button.disabled = false; });
  [search, byId('clear-search'), byId('download-button')].forEach((field) => { field.disabled = false; });
  byId('note-fields').disabled = false;
  byId('static-notes').hidden = true;
  byId('js-status').textContent = 'Local note tools ready. Apply in this page, or download applied text for a manual copy. Reload resets the demo.';
  root.dataset.ready = 'true';
})();
