(() => {
  const root = document.documentElement;
  root.classList.add('js');
  const storageKey = 'interface-atlas-gallery-preview';
  const defaults = { appearance: 'system', density: 'comfortable', motion: 'on' };
  const options = { appearance: ['system', 'light', 'dark'], density: ['comfortable', 'compact'], motion: ['on', 'off'] };
  const preferences = Object.fromEntries(Object.keys(defaults).map(key => [key, options[key].includes(root.dataset[key]) ? root.dataset[key] : defaults[key]]));
  const appearance = document.getElementById('appearance');
  const density = document.getElementById('density');
  const motion = document.getElementById('motion');
  const preferenceNote = document.getElementById('preference-note');
  const synchronizePreferences = () => {
    for (const [key, value] of Object.entries(preferences)) root.dataset[key] = value;
    appearance.value = preferences.appearance;
    density.value = preferences.density;
    motion.checked = preferences.motion === 'on';
    document.getElementById('density-note').textContent = preferences.density === 'compact' ? 'Compact density · 16px panel inset' : 'Comfortable density · 24px panel inset';
  };
  const savePreferences = () => {
    synchronizePreferences();
    try { localStorage.setItem(storageKey, JSON.stringify(preferences)); preferenceNote.textContent = 'Preview preferences are saved in this browser.'; }
    catch { preferenceNote.textContent = 'Storage is unavailable. Preferences apply for this visit.'; }
  };
  appearance.addEventListener('change', () => { preferences.appearance = options.appearance.includes(appearance.value) ? appearance.value : defaults.appearance; savePreferences(); });
  density.addEventListener('change', () => { preferences.density = options.density.includes(density.value) ? density.value : defaults.density; savePreferences(); });
  motion.addEventListener('change', () => { preferences.motion = motion.checked ? 'on' : 'off'; savePreferences(); });
  document.querySelector('.preview-settings').addEventListener('submit', event => event.preventDefault());
  synchronizePreferences();
  appearance.disabled = false;
  density.disabled = false;
  motion.disabled = false;
  try { localStorage.getItem(storageKey); preferenceNote.textContent = 'Preview preferences are saved when changed in this browser.'; }
  catch { preferenceNote.textContent = 'Storage is unavailable. Preferences apply for this visit.'; }

  const works = [
    { id: 'vessel', title: 'Vessel study', category: 'objects', description: 'A chalk-colored ceramic form, shaped by a soft edge and the light around it.' },
    { id: 'seat', title: 'Seat study', category: 'objects', description: 'A simple oak seat. The grain, joinery, and familiar weight of an everyday object.' },
    { id: 'room', title: 'Room study', category: 'spaces', description: 'An architectural alcove in plaster and timber. A study of how daylight gives a quiet room its shape.' }
  ];
  const search = document.getElementById('search');
  const category = document.getElementById('category');
  const count = document.getElementById('result-count');
  const empty = document.getElementById('no-results');
  const clear = document.getElementById('clear-filters');
  const status = document.getElementById('gallery-status');
  const cards = new Map(works.map(work => [work.id, document.querySelector(`[data-work-id="${work.id}"]`)]));
  let selectedId = 'vessel';
  const announce = message => { status.textContent = message; };
  const isPlainClick = event => !event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey;
  const showWork = (id, { focusHeading = false, announceChange = true } = {}) => {
    const chosen = works.find(work => work.id === id);
    if (!chosen) return;
    selectedId = chosen.id;
    for (const work of works) {
      document.getElementById(`work-${work.id}`).hidden = work.id !== selectedId;
      document.getElementById(`view-${work.id}`).setAttribute('aria-pressed', String(work.id === selectedId));
    }
    if (focusHeading) document.getElementById(`work-title-${selectedId}`).focus();
    if (announceChange) announce(`${chosen.title} is shown in work details. Collection filters are unchanged.`);
  };
  const applyFilters = ({ announceChange = true } = {}) => {
    if (!['all', 'objects', 'spaces'].includes(category.value)) category.value = 'all';
    const query = search.value.trim().toLocaleLowerCase();
    let shown = 0;
    for (const work of works) {
      const matches = (category.value === 'all' || category.value === work.category) && `${work.title} ${work.description}`.toLocaleLowerCase().includes(query);
      cards.get(work.id).hidden = !matches;
      if (matches) shown += 1;
    }
    count.textContent = `${shown} ${shown === 1 ? 'study' : 'studies'}`;
    empty.hidden = shown !== 0;
    if (announceChange) announce(`${shown} ${shown === 1 ? 'study matches' : 'studies match'} your filters. ${works.find(work => work.id === selectedId).title} remains open in work details.`);
  };
  search.disabled = false;
  category.disabled = false;
  clear.disabled = false;
  search.addEventListener('input', () => applyFilters());
  category.addEventListener('change', () => applyFilters());
  document.querySelector('.collection-toolbar').addEventListener('submit', event => event.preventDefault());
  clear.addEventListener('click', () => {
    search.value = '';
    category.value = 'all';
    applyFilters({ announceChange: false });
    search.focus();
    announce(`All 3 studies are shown. ${works.find(work => work.id === selectedId).title} remains open in work details.`);
  });
  for (const work of works) {
    const view = document.getElementById(`view-${work.id}`);
    view.disabled = false;
    view.addEventListener('click', () => showWork(work.id));
    document.getElementById(`inspect-${work.id}`).addEventListener('click', event => {
      if (!isPlainClick(event)) return;
      event.preventDefault();
      showWork(work.id, { focusHeading: true });
    });
    document.getElementById(`back-${work.id}`).addEventListener('click', event => {
      if (!isPlainClick(event)) return;
      event.preventDefault();
      if (cards.get(work.id).hidden) {
        search.focus();
        announce(`${work.title} is hidden by the current collection filters. Search is focused; your filters and open study are preserved.`);
      } else {
        document.getElementById(`inspect-${work.id}`).focus();
        announce(`Back to ${work.title} in the collection. Your filters and open study are preserved.`);
      }
    });
    const image = document.getElementById(`image-${work.id}`);
    const imageStatus = document.getElementById(`image-state-${work.id}`);
    const retry = document.getElementById(`retry-${work.id}`);
    const figure = image.closest('.detail-image');
    const imageSource = image.getAttribute('src');
    const setImageState = state => {
      imageStatus.dataset.state = state;
      figure.dataset.state = state;
      imageStatus.textContent = state === 'loaded' ? 'Image loaded.' : state === 'error' ? `${work.title} image could not be loaded. Its description and image credit are still available. Retry to request the same image again.` : `Loading ${work.title} image…`;
      retry.hidden = state !== 'error';
      retry.disabled = state !== 'error';
    };
    image.addEventListener('load', () => setImageState('loaded'));
    image.addEventListener('error', () => setImageState('error'));
    retry.addEventListener('click', () => {
      setImageState('loading');
      image.src = imageSource;
      // The retry control is hidden while the real image request is pending.
      document.getElementById(`work-title-${work.id}`).focus({ preventScroll: true });
    });
    setImageState(image.complete && image.naturalWidth > 0 ? 'loaded' : image.complete ? 'error' : 'loading');
  }
  document.getElementById('collection-note').textContent = 'Search and category filters keep the open study available. Browsing choices reset on reload; only preview preferences are saved.';
  search.value = '';
  category.value = 'all';
  const workFromFragment = () => {
    const match = /^#work-(vessel|seat|room)$/.exec(window.location.hash);
    return match ? match[1] : null;
  };
  const initialWork = workFromFragment();
  showWork(initialWork || 'vessel', { focusHeading: Boolean(initialWork), announceChange: false });
  window.addEventListener('hashchange', () => {
    const target = workFromFragment();
    if (target) showWork(target, { focusHeading: true });
  });
  applyFilters({ announceChange: false });
})();
