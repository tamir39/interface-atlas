(() => {
  'use strict';
  const root = document.documentElement;
  const appearance = document.getElementById('appearance');
  const density = document.getElementById('density');
  const motion = document.getElementById('motion');
  const motionNote = document.getElementById('motion-note');
  const preferenceNote = document.getElementById('preference-note');
  const densityNote = document.getElementById('density-note');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const search = document.getElementById('note-search');
  const topic = document.getElementById('note-topic');
  const reset = document.getElementById('reset-filters');
  const rows = [...document.querySelectorAll('[data-note-id]')];
  const details = [...document.querySelectorAll('[data-detail-id]')];
  const keepButtons = [...document.querySelectorAll('[data-keep-id]')];
  const readingStatus = document.getElementById('reading-status');
  const listStatus = document.getElementById('list-status');
  const keptList = document.getElementById('kept-list');
  const clearList = document.getElementById('clear-list');
  const exportList = document.getElementById('export-list');
  const listTitle = document.getElementById('reading-list-title');
  const notes = rows.map(row => ({
    id: row.dataset.noteId,
    topic: row.dataset.topic,
    title: row.querySelector('h4').textContent.trim(),
    summary: row.querySelector('.note-summary').textContent.trim(),
  }));
  const kept = new Set();
  let selectedNote = 'room';
  let exportNumber = 0;
  const countLabel = count => `${count} ${count === 1 ? 'note' : 'notes'}`;
  const noteFor = id => notes.find(note => note.id === id);
  for (const button of keepButtons) button.setAttribute('aria-label', `Keep note: ${noteFor(button.dataset.keepId).title}`);

  appearance.value = root.dataset.appearance;
  density.value = root.dataset.density;
  motion.checked = root.dataset.motion === 'on';
  for (const control of [appearance, density, motion, search, topic, reset, ...keepButtons]) control.disabled = false;
  document.querySelector('.preview-settings').addEventListener('submit', event => event.preventDefault());
  document.getElementById('note-filters').addEventListener('submit', event => event.preventDefault());

  const updatePreferenceNotes = () => {
    motionNote.textContent = reducedMotion.matches
      ? 'System reduced motion is active; all feedback changes are immediate.'
      : motion.checked ? 'Subtle color and border feedback only; the artwork stays still.' : 'Motion is off; all feedback changes are immediate.';
    densityNote.textContent = `${density.value === 'compact' ? 'Compact density · 16px' : 'Comfortable density · 24px'} panel inset`;
  };
  const savePreferences = () => {
    try {
      localStorage.setItem('interface-atlas-botanical-preview', JSON.stringify({ appearance: root.dataset.appearance, density: root.dataset.density, motion: root.dataset.motion }));
      preferenceNote.textContent = 'Only preferences stay in this browser. Your reading list resets on reload.';
    } catch {
      preferenceNote.textContent = 'Preferences apply to this page; browser storage is unavailable. Your reading list resets on reload.';
    }
  };
  appearance.addEventListener('change', () => { root.dataset.appearance = appearance.value; savePreferences(); });
  density.addEventListener('change', () => { root.dataset.density = density.value; updatePreferenceNotes(); savePreferences(); });
  motion.addEventListener('change', () => { root.dataset.motion = motion.checked ? 'on' : 'off'; updatePreferenceNotes(); savePreferences(); });
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', updatePreferenceNotes);
  else reducedMotion.addListener(updatePreferenceNotes);
  updatePreferenceNotes();
  savePreferences();

  const applyFilters = (announce = true) => {
    const query = search.value.trim().toLocaleLowerCase();
    let visible = 0;
    for (const row of rows) {
      const note = noteFor(row.dataset.noteId);
      const matchesQuery = `${note.title} ${note.summary} ${note.topic}`.toLocaleLowerCase().includes(query);
      const matchesTopic = topic.value === 'all' || topic.value === note.topic;
      row.hidden = !(matchesQuery && matchesTopic);
      if (!row.hidden) visible++;
    }
    document.getElementById('note-count').textContent = `${visible} design field ${visible === 1 ? 'note' : 'notes'}`;
    document.getElementById('no-notes').hidden = visible !== 0;
    if (announce) {
      const hiddenContext = document.getElementById(`note-${selectedNote}`).hidden;
      readingStatus.textContent = `${countLabel(visible)} match the current filters.${hiddenContext ? ` “${noteFor(selectedNote).title}” remains open for reading.` : ''}`;
    }
  };
  search.addEventListener('input', () => applyFilters());
  topic.addEventListener('change', () => applyFilters());
  reset.addEventListener('click', () => { search.value = ''; topic.value = 'all'; applyFilters(); });
  const openNote = (id, moveFocus = true) => {
    selectedNote = id;
    for (const detail of details) detail.hidden = detail.dataset.detailId !== id;
    for (const row of rows) {
      const selected = row.dataset.noteId === id;
      row.dataset.selected = String(selected);
      const link = document.getElementById(`inspect-note-${row.dataset.noteId}`);
      if (selected) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
    if (moveFocus) {
      document.getElementById(`detail-heading-${id}`).focus();
      readingStatus.textContent = `Reading “${noteFor(id).title}”. Your filters are unchanged.`;
    }
  };
  for (const row of rows) {
    const id = row.dataset.noteId;
    const headingLink = document.getElementById(`inspect-note-${id}`);
    headingLink.addEventListener('click', event => { event.preventDefault(); openNote(id); });
    row.querySelector('[data-open-id]').addEventListener('click', event => { event.preventDefault(); openNote(id); });
    const back = document.getElementById(`back-to-note-${id}`);
    back.hidden = false;
    back.disabled = false;
    back.addEventListener('click', () => {
      if (document.getElementById(`note-${id}`).hidden) {
        search.focus();
        readingStatus.textContent = `“${noteFor(id).title}” is hidden by the current filters. Returned to search; your filters and open note are preserved.`;
      } else {
        headingLink.focus();
        readingStatus.textContent = `Returned to “${noteFor(id).title}” in the collection. Your filters and open note are preserved.`;
      }
    });
  }
  applyFilters(false);
  openNote(selectedNote, false);

  const renderList = () => {
    keptList.replaceChildren();
    for (const note of notes.filter(item => kept.has(item.id))) {
      const li = document.createElement('li');
      const content = document.createElement('div');
      const label = document.createElement('span');
      label.className = 'small-label';
      label.textContent = `${note.topic[0].toUpperCase()}${note.topic.slice(1)} · Original field note`;
      const heading = document.createElement('h4');
      heading.textContent = note.title;
      const summary = document.createElement('p');
      summary.textContent = note.summary;
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.className = 'button secondary';
      remove.dataset.removeId = note.id;
      remove.textContent = 'Remove';
      remove.setAttribute('aria-label', `Remove: ${note.title}`);
      remove.addEventListener('click', () => {
        const active = document.activeElement === remove;
        const before = [...keptList.querySelectorAll('[data-remove-id]')];
        const position = before.indexOf(remove);
        kept.delete(note.id);
        renderList();
        listStatus.textContent = `Removed “${note.title}”. ${countLabel(kept.size)} in your reading list.`;
        if (active) {
          const after = [...keptList.querySelectorAll('[data-remove-id]')];
          (after[position] || after[position - 1] || listTitle).focus();
        }
      });
      content.append(label, heading, summary);
      li.append(content, remove);
      keptList.append(li);
    }
    document.getElementById('kept-count').textContent = countLabel(kept.size);
    document.getElementById('list-empty').hidden = kept.size !== 0;
    clearList.disabled = kept.size === 0;
    exportList.disabled = kept.size === 0;
    for (const button of keepButtons) button.setAttribute('aria-pressed', String(kept.has(button.dataset.keepId)));
  };
  document.getElementById('list-explanation').textContent = 'Kept notes stay on this page until reload. Export their titles, summaries, and credits as a Markdown file.';
  exportList.setAttribute('aria-describedby', 'list-explanation list-empty');
  for (const button of keepButtons) button.addEventListener('click', () => {
    const note = noteFor(button.dataset.keepId);
    const wasKept = kept.has(note.id);
    if (wasKept) kept.delete(note.id); else kept.add(note.id);
    renderList();
    listStatus.textContent = `${wasKept ? 'Removed' : 'Kept'} “${note.title}”${wasKept ? '' : ' for this visit'}. ${countLabel(kept.size)} in your reading list.`;
  });
  clearList.addEventListener('click', () => {
    kept.clear();
    renderList();
    listTitle.focus();
    listStatus.textContent = 'Reading list cleared. 0 notes in your reading list. Your open note and filters are unchanged.';
  });
  const markdownText = value => value.replace(/\\/g, '\\\\').replace(/([`*_{}\[\]<>#])/g, '\\$1');
  exportList.addEventListener('click', () => {
    if (!kept.size) return;
    const selected = notes.filter(note => kept.has(note.id));
    const lines = ['# Botanical reading list', '', 'Original Interface Atlas design field notes. Fictional design studies, not gardening advice.', '', 'This local browser-only list contains the notes kept during this visit. No agent is started and no server record is created.', ''];
    for (const note of selected) lines.push(`## ${markdownText(note.title)}`, '', `Topic: ${markdownText(note.topic)}`, '', markdownText(note.summary), '');
    lines.push('## Credits', '', 'Seed palette and geometry: Tamir (Phi Vuong Tuong Tam), https://github.com/tamir39/tamir39-portfolio, inspected at 6f9bfc6119f0e71dee04b675fbf59b8482aa9c74.', '', 'Original composition, code, vector artwork, fictional briefs, and design field notes: Interface Atlas with Codex AI assistance.', '', 'Named typefaces: Manrope by Mikhail Sharanda; DM Serif Display by Colophon Foundry; JetBrains Mono by JetBrains, Philipp Nurullin, and Konstantin Bulenkov. No font files are included.', '', 'Kedhareswer Naidu is credited for optional contour-artwork inspiration in the source portfolio. No third-party implementation or artwork is imported.', '');
    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'botanical-reading-list.md';
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    exportNumber++;
    listStatus.textContent = `Reading list prepared with ${countLabel(selected.length)}; Markdown download requested (${exportNumber}). Your list remains available on this page.`;
  });
  renderList();
})();
