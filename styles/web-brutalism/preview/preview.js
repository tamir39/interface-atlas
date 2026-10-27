/* Original Atlas Open Index. Browser-local selection; no storage or backend. */
(() => {
  'use strict';
  const root = document.documentElement;
  const byId = (id) => document.getElementById(id);
  // Preserve local document paths or the publication build's rewritten URLs.
  const themeSourceTemplate = byId('theme-source-link').getAttribute('href');
  const themeCreditsTemplate = byId('theme-credits-link').getAttribute('href');
  const publicBase = 'https://tamir39.github.io/interface-atlas/styles/web-brutalism/preview/';
  const labels = { editorial: 'Editorial', swiss: 'Swiss', precision: 'Precision', play: 'Play', botanical: 'Botanical', blueprint: 'Blueprint', pulse: 'Pulse', gallery: 'Gallery', layered: 'Layered' };
  const fits = {
    editorial: 'Editorial contributes its warm palette and serif display stack. This raw document explicitly replaces its rounded geometry and selective elevation with square, shadow-free document structure.',
    swiss: 'Swiss contributes its graphic palette and sans type. Thin document rules and unboxed text align with its flat structure; this variant explicitly replaces its ordinary 2px corners with 0px corners.',
    precision: 'Precision contributes its utility palette and sans type. The document keeps flat, shadow-free working content while explicitly replacing its ordinary 4px corners with 0px corners.',
    play: 'Play contributes its expressive palette and type. This is a substantial declared departure: the document replaces its rounded shapes and hard offset shadows with 0px corners, thin rules, and no elevation.',
    botanical: 'Botanical contributes its earthy palette and serif display stack. The document explicitly replaces its alternating organic corners and selective elevation with square, shadow-free structure.',
    blueprint: 'Blueprint contributes its drafting palette and technical display stack. This document explicitly replaces its 8px/4px geometry with 0px corners and uses ordinary text flow rather than a diagram or drafting surface.',
    pulse: 'Pulse contributes its event palette and condensed display stack. This document explicitly replaces its 12px/6px geometry with 0px corners. Its short notes do not establish fit for dense schedules or event workflows.',
    gallery: 'Gallery contributes its collection palette and sans type. Unboxed content suits this limited document; its ordinary 4px corners become 0px. Image-led collection behavior remains outside this study.',
    layered: 'Layered contributes its workspace palette and geometric sans stack. This is a substantial declared departure from its rounded, layered workspace: actual corners become 0px and all shadows are removed.',
  };
  const settings = { theme: byId('theme-select'), appearance: byId('appearance'), motion: byId('motion') };
  const allowed = { theme: Object.keys(labels), appearance: ['light', 'dark', 'system'], motion: ['off', 'on'] };
  const media = { dark: matchMedia('(prefers-color-scheme: dark)'), reduced: matchMedia('(prefers-reduced-motion: reduce)'), forced: matchMedia('(forced-colors: active)') };
  const search = byId('note-search');
  const title = byId('plan-title');
  const download = byId('download-button');
  const rows = Array.from(document.querySelectorAll('#note-list > .index-entry'));
  const records = rows.map((row) => {
    const id = row.dataset.noteId;
    const article = byId(id);
    return {
      id,
      row,
      checkbox: row.querySelector('.plan-checkbox'),
      title: row.querySelector('.note-title').textContent.trim(),
      topic: row.querySelector('.note-topic').textContent.trim(),
      summary: row.querySelector('.note-summary').textContent.trim(),
      paragraphs: Array.from(article.querySelectorAll('.note-copy > p'), (paragraph) => paragraph.textContent.trim()),
    };
  });
  const selected = () => records.filter((note) => note.checkbox.checked);

  function updateMaterialStatus() {
    const dark = settings.appearance.value === 'dark' || (settings.appearance.value === 'system' && media.dark.matches);
    const effective = settings.motion.value === 'on' && !media.reduced.matches && !media.forced.matches;
    root.dataset.effectiveMotion = effective ? 'on' : 'off';
    let text = 'Raw document · ' + (dark ? 'dark' : 'light') + ' appearance · ';
    if (media.forced.matches) text = 'System colors · raw document · border feedback off for forced colors.';
    else if (media.reduced.matches) text += 'border feedback off for reduced motion.';
    else text += effective ? '100ms border-color feedback on; no movement.' : 'border feedback off.';
    byId('material-status').textContent = text;
  }
  function applySetting(key) {
    const field = settings[key];
    if (!allowed[key].includes(field.value)) field.value = key === 'theme' ? 'editorial' : allowed[key][0];
    root.dataset[key] = field.value;
    if (key === 'theme') {
      const name = labels[field.value];
      byId('theme-label').textContent = name;
      byId('theme-fit').textContent = fits[field.value];
      byId('theme-source-link').textContent = name + ' theme reference';
      byId('theme-source-link').href = themeSourceTemplate.replace('/editorial/', '/' + field.value + '/');
      byId('theme-credits-link').textContent = name + ' source & font credits';
      byId('theme-credits-link').href = themeCreditsTemplate.replace('/editorial/', '/' + field.value + '/');
    }
    byId('font-stack').textContent = getComputedStyle(root).getPropertyValue('--theme-font').trim();
    updateMaterialStatus();
  }
  function updateSelection() {
    const notes = selected();
    const hidden = notes.filter((note) => note.row.hidden).length;
    byId('selection-status').textContent = notes.length + ' of 6 notes selected. ' + (hidden ? hidden + ' selected ' + (hidden === 1 ? 'note is' : 'notes are') + ' hidden by the index filter; all selected notes will be downloaded.' : 'No selected notes are hidden by the index filter.');
    download.disabled = notes.length === 0;
    byId('download-hint').textContent = notes.length ? 'Downloads all ' + notes.length + ' selected ' + (notes.length === 1 ? 'note' : 'notes') + ', including any hidden by the filter, in original document order.' : 'Select at least one note in the index to download a .txt reading plan.';
  }
  function filterIndex() {
    const query = search.value.trim().toLocaleLowerCase();
    let count = 0;
    records.forEach((note) => {
      note.row.hidden = Boolean(query) && ![note.title, note.topic, note.summary].join(' ').toLocaleLowerCase().includes(query);
      if (!note.row.hidden) count += 1;
    });
    byId('search-status').textContent = query ? count + ' of 6 index entries match “' + search.value.trim() + '”. All six articles remain below.' : 'All 6 index entries in their original order.';
    byId('empty-search').hidden = count !== 0;
    updateSelection();
  }
  function clearTitleError() {
    title.setCustomValidity('');
    title.removeAttribute('aria-invalid');
    byId('title-error').textContent = '';
    byId('title-error').hidden = true;
  }
  function validateTitle() {
    clearTitleError();
    const value = title.value.trim();
    if (value.length >= 3 && value.length <= 48) return value;
    const message = 'Enter a plan title of 3–48 characters after trimming spaces.';
    title.setCustomValidity(message);
    title.setAttribute('aria-invalid', 'true');
    byId('title-error').textContent = message;
    byId('title-error').hidden = false;
    byId('download-status').textContent = 'Check the plan title. Your selected notes are unchanged.';
    title.focus();
    return null;
  }
  function downloadPlan(event) {
    event.preventDefault();
    const planTitle = validateTitle();
    if (planTitle === null) return;
    const notes = selected();
    if (!notes.length) {
      byId('download-status').textContent = 'Select at least one note in the index before downloading.';
      return;
    }
    title.value = planTitle;
    const noteText = notes.map((note) => (records.indexOf(note) + 1) + '. ' + note.title + '\nTopic: ' + note.topic + '\n\n' + note.paragraphs.join('\n\n') + '\n\nSource: ' + publicBase + '#' + note.id).join('\n\n---\n\n');
    const payload = planTitle + '\nOpen Index · Interface Atlas\n' + notes.length + ' selected ' + (notes.length === 1 ? 'note' : 'notes') + ' in original document order\n\n' + noteText + '\n\nOriginal Atlas notes. Manual copy of a browser-local reading plan.\n';
    const url = URL.createObjectURL(new Blob([payload], { type: 'text/plain;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.hidden = true;
    anchor.href = url;
    anchor.download = 'open-index-reading-plan.txt';
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    byId('download-status').textContent = 'Prepared “' + planTitle + '” for download with ' + notes.length + ' selected ' + (notes.length === 1 ? 'note' : 'notes') + '. This page keeps no saved copy; reload resets the plan.';
  }

  Object.keys(settings).forEach((key) => settings[key].addEventListener('change', () => applySetting(key)));
  Object.values(media).forEach((query) => query.addEventListener('change', updateMaterialStatus));
  search.addEventListener('input', filterIndex);
  byId('index-filter').addEventListener('submit', (event) => { event.preventDefault(); filterIndex(); });
  byId('clear-search').addEventListener('click', () => { search.value = ''; filterIndex(); search.focus(); });
  records.forEach((note) => note.checkbox.addEventListener('change', () => {
    updateSelection();
    byId('download-status').textContent = '';
  }));
  title.addEventListener('input', () => { clearTitleError(); byId('download-status').textContent = ''; });
  byId('plan-form').addEventListener('submit', downloadPlan);
  Object.keys(settings).forEach(applySetting);
  filterIndex();
  Object.values(settings).forEach((field) => { field.disabled = false; });
  records.forEach((note) => { note.checkbox.disabled = false; });
  [search, byId('clear-search')].forEach((field) => { field.disabled = false; });
  byId('plan-fields').disabled = false;
  updateSelection();
  byId('js-status').textContent = 'Local tools ready. Filtering changes only the index; all six articles remain below. Your plan and settings last until reload. Download makes a manual text copy.';
  root.dataset.ready = 'true';
})();
