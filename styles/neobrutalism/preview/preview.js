/* Original browser-local specimen. No network, storage, or backend. */
(() => {
  'use strict';
  const root = document.documentElement;
  const byId = (id) => document.getElementById(id);
  const settings = { theme: byId('theme-select'), appearance: byId('appearance'), motion: byId('motion') };
  const allowed = {
    theme: ['editorial', 'swiss', 'precision', 'play', 'botanical', 'blueprint', 'pulse', 'gallery', 'layered'],
    appearance: ['light', 'dark', 'system'],
    motion: ['off', 'on'],
  };
  const themeLabels = { editorial: 'Editorial', swiss: 'Swiss', precision: 'Precision', play: 'Play', botanical: 'Botanical', blueprint: 'Blueprint', pulse: 'Pulse', gallery: 'Gallery', layered: 'Layered' };
  const fitNotes = {
    editorial: 'Editorial: an intentional tension with its quieter reading rhythm. Keep the heavy treatment to short, focused surfaces.',
    swiss: 'Swiss: resting hard shadows deliberately depart from its flat, shadow-free surfaces. This bounded profile study preserves its palette, type, and geometry; normal theme use needs a different depth choice.',
    precision: 'Precision: resting hard shadows conflict with its flat operational surfaces. This profile study keeps its palette, type, and geometry; use the heavy treatment only as a documented, scoped departure.',
    play: 'Play: the hard-shadow vocabulary is a close fit. Keep the theme’s rounded geometry and avoid filling every surface with decoration.',
    botanical: 'Botanical: the emphatic outlines create tension with its quieter, organic identity. Confine the treatment to a small set of actions or cards.',
    blueprint: 'Blueprint: clear boundaries fit its drafting language. Keep technical relationships readable and reserve shadows for one interactive layer.',
    pulse: 'Pulse: bold color blocking fits its poster rhythm. Maintain one clear priority so the heavy display and hard shadows do not compete.',
    gallery: 'Gallery: heavy boxes and resting shadows conflict with its flat, shadow-free image framing. This study uses supporting tools; preserve open artwork presentation in a real project.',
    layered: 'Layered: hard shadows reinterpret its tonal depth. Keep one shadow level and preserve the theme’s generous space and rounded geometry.',
  };
  const media = {
    dark: window.matchMedia('(prefers-color-scheme: dark)'),
    reduced: window.matchMedia('(prefers-reduced-motion: reduce)'),
    forced: window.matchMedia('(forced-colors: active)'),
  };
  function updateMotionStatus() {
    const appearance = settings.appearance.value === 'dark' || (settings.appearance.value === 'system' && media.dark.matches) ? 'dark' : 'light';
    let message = `Static press feedback · ${appearance} appearance. Selected text and boundaries change immediately.`;
    if (media.forced.matches) message = 'System colors active. Press travel and shadows are removed; selected text and boundaries remain visible.';
    else if (media.reduced.matches) message = `Reduced motion active · ${appearance} appearance. Press travel is disabled; text and boundary feedback remain.`;
    else if (settings.motion.value === 'on') message = `Optional 2px press travel · ${appearance} appearance. Text and boundary feedback remain immediate.`;
    byId('motion-status').textContent = message;
  }
  function applySetting(key) {
    const field = settings[key];
    if (!allowed[key].includes(field.value)) field.value = allowed[key][0];
    root.dataset[key] = field.value;
    if (key === 'theme') {
      const name = themeLabels[field.value];
      byId('theme-label').textContent = name;
      byId('theme-source-link').href = `../../../themes/${field.value}/README.md`;
      byId('theme-source-link').textContent = `${name} theme reference ↗`;
      byId('theme-fit').textContent = fitNotes[field.value];
    }
    updateMotionStatus();
  }

  const ideas = {
    'ink-club': { title: 'Ink club', track: 'Print', format: 'One-color poster', description: 'Make a one-color poster around something your neighborhood needs more of. Begin with a word, build a strong shape, and leave enough room for the message.' },
    'open-table': { title: 'Open table', track: 'Talks', format: 'Roundtable prompt', description: 'Bring one unfinished piece of work and one useful question. Build a short conversation around the choices still open, with room for people to share a different approach.' },
    'type-walk': { title: 'Type walk', track: 'Workshops', format: 'Lettering field notes', description: 'Take a familiar route and look closely at its letters. Collect three examples, describe what gives each its character, and turn one observation into a lettering study.' },
    'paper-radio': { title: 'Paper radio', track: 'Workshops', format: 'Eight-page zine', description: 'Start with a sound you remember: a station, a conversation, a street. Translate its rhythm into an eight-page paper story using words, marks, and pauses.' },
  };
  const cards = [...document.querySelectorAll('.idea-card[data-idea-id]')];
  const search = byId('idea-filter');
  const track = byId('track-filter');
  let selected = 'ink-club';
  function selectIdea(id, announce = true) {
    const idea = ideas[id];
    if (!idea) return;
    selected = id;
    cards.forEach((card) => {
      const isSelected = card.dataset.ideaId === id;
      card.setAttribute('aria-pressed', String(isSelected));
      card.querySelector('.card-state').textContent = isSelected ? 'Selected' : 'Inspect idea';
    });
    byId('selection-title').textContent = idea.title;
    byId('selection-description').textContent = idea.description;
    byId('selection-track').textContent = idea.track;
    byId('selection-format').textContent = idea.format;
    if (announce) byId('selection-status').textContent = `${idea.title} selected. Use its starting point for your own brief.`;
  }
  function filterIdeas() {
    const query = search.value.trim().toLocaleLowerCase();
    const selectedTrack = ['all', 'print', 'talks', 'workshops'].includes(track.value) ? track.value : 'all';
    const visible = [];
    cards.forEach((card) => {
      const idea = ideas[card.dataset.ideaId];
      const haystack = `${idea.title} ${idea.track} ${idea.description} ${card.querySelector('.card-description').textContent}`.toLocaleLowerCase();
      const show = (!query || haystack.includes(query)) && (selectedTrack === 'all' || card.dataset.track === selectedTrack);
      card.closest('[data-idea-item]').hidden = !show;
      if (show) visible.push(card.dataset.ideaId);
    });
    byId('filter-count').textContent = `${visible.length} of ${cards.length} ideas shown`;
    byId('empty-state').hidden = visible.length !== 0;
    if (!visible.length) byId('selection-status').textContent = `No ideas match the filters. ${ideas[selected].title} remains on the workbench.`;
    else if (!visible.includes(selected)) byId('selection-status').textContent = `${ideas[selected].title} selected. It is hidden by the current filters; clear filters to see it on the board.`;
    else byId('selection-status').textContent = `${ideas[selected].title} selected. Use its starting point for your own brief.`;
  }
  function clearFilters() {
    search.value = '';
    track.value = 'all';
    filterIdeas();
  }
  cards.forEach((card) => card.addEventListener('click', () => selectIdea(card.dataset.ideaId)));
  search.addEventListener('input', filterIdeas);
  track.addEventListener('change', filterIdeas);
  byId('filter-reset').addEventListener('click', clearFilters);
  byId('empty-reset').addEventListener('click', () => { clearFilters(); search.focus(); });

  const form = byId('brief-form');
  const title = byId('brief-title');
  const note = byId('brief-note');
  const error = byId('brief-error');
  const briefStatus = byId('brief-status');
  const trackLabels = { print: 'Print', talks: 'Talks', workshops: 'Workshops' };
  function clearTitleError() {
    title.removeAttribute('aria-invalid');
    error.hidden = true;
    error.textContent = '';
  }
  function draftChanged() {
    briefStatus.dataset.state = 'draft';
    briefStatus.textContent = 'Brief changed. Review it when ready. Nothing is sent or saved.';
  }
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = title.value.trim();
    if (value.length < 3 || value.length > 48) {
      title.setAttribute('aria-invalid', 'true');
      error.textContent = value.length === 0 ? 'Enter a brief title using 3–48 characters.' : 'Use 3–48 characters after trimming spaces.';
      error.hidden = false;
      briefStatus.dataset.state = 'invalid';
      briefStatus.textContent = 'The brief needs a title of 3–48 characters. Nothing is sent or saved.';
      title.focus();
      return;
    }
    clearTitleError();
    title.value = value;
    const name = trackLabels[byId('brief-track').value] || 'Print';
    briefStatus.dataset.state = 'success';
    briefStatus.textContent = `Reviewed “${value}” for ${name}. Local example only; nothing is sent or saved.`;
  });
  title.addEventListener('input', () => { clearTitleError(); draftChanged(); });
  note.addEventListener('input', draftChanged);
  byId('brief-track').addEventListener('change', draftChanged);
  byId('brief-reset').addEventListener('click', () => {
    form.reset();
    clearTitleError();
    briefStatus.dataset.state = 'draft';
    briefStatus.textContent = 'Example restored. Nothing is sent or saved.';
  });

  Object.keys(settings).forEach((key) => {
    settings[key].addEventListener('change', () => applySetting(key));
    applySetting(key);
  });
  Object.values(media).forEach((query) => query.addEventListener('change', updateMotionStatus));
  selectIdea(selected, false);
  filterIdeas();
  // Enable controls only after the complete local interaction setup succeeds.
  Object.values(settings).forEach((field) => { field.disabled = false; });
  [search, track, byId('filter-reset'), byId('empty-reset'), ...cards].forEach((control) => { control.disabled = false; });
  byId('brief-fields').disabled = false;
  byId('js-status').textContent = 'Local controls ready. Preferences and drafts reset on reload. Nothing is sent or saved.';
})();
