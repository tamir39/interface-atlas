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
  const search = document.getElementById('run-search');
  const stateFilter = document.getElementById('run-state-filter');
  const resetFilters = document.getElementById('reset-filters');
  const rows = [...document.querySelectorAll('[data-run-id]')];
  const details = [...document.querySelectorAll('[data-detail-id]')];
  const status = document.getElementById('operation-status');
  const cancel = document.getElementById('request-cancel');
  const acknowledge = document.getElementById('acknowledge-cancel');
  let cancellationRequested = false;
  let selectedRun = '101';

  appearance.value = root.dataset.appearance;
  density.value = root.dataset.density;
  motion.checked = root.dataset.motion === 'on';
  for (const control of [appearance, density, motion, search, stateFilter, resetFilters, cancel]) control.disabled = false;

  const updatePreferenceNotes = () => {
    motionNote.textContent = reducedMotion.matches
      ? 'System reduced motion is active; all feedback changes are immediate.'
      : motion.checked ? 'Subtle feedback only. No entrance or continuous animation.' : 'Motion is off; all feedback changes are immediate.';
    densityNote.textContent = `${density.value === 'compact' ? 'Compact' : 'Comfortable'} density`;
  };

  const savePreferences = () => {
    try {
      localStorage.setItem('interface-atlas-editorial-preview', JSON.stringify({
        appearance: root.dataset.appearance, density: root.dataset.density, motion: root.dataset.motion,
      }));
      preferenceNote.textContent = 'Preferences stay in this browser. Sample run state resets on reload.';
    } catch {
      preferenceNote.textContent = 'Changes apply to this page; preference storage is unavailable.';
    }
  };

  appearance.addEventListener('change', () => { root.dataset.appearance = appearance.value; savePreferences(); });
  density.addEventListener('change', () => { root.dataset.density = density.value; updatePreferenceNotes(); savePreferences(); });
  motion.addEventListener('change', () => { root.dataset.motion = motion.checked ? 'on' : 'off'; updatePreferenceNotes(); savePreferences(); });
  reducedMotion.addEventListener('change', updatePreferenceNotes);
  document.querySelector('.preview-settings').addEventListener('submit', event => event.preventDefault());
  updatePreferenceNotes();
  savePreferences();

  const applyFilters = () => {
    const query = search.value.trim().toLocaleLowerCase();
    let visible = 0;
    for (const row of rows) {
      const searchableName = `${row.querySelector('h4').textContent} RUN-${row.dataset.runId}`;
      const matchesName = searchableName.toLocaleLowerCase().includes(query);
      const matchesState = stateFilter.value === 'all' || row.dataset.state === stateFilter.value;
      row.hidden = !(matchesName && matchesState);
      if (!row.hidden) visible++;
    }
    document.getElementById('run-count').textContent = `${visible} sample ${visible === 1 ? 'run' : 'runs'}`;
    document.getElementById('no-runs').hidden = visible !== 0;
  };
  search.addEventListener('input', applyFilters);
  stateFilter.addEventListener('change', applyFilters);
  resetFilters.addEventListener('click', () => { search.value = ''; stateFilter.value = 'all'; applyFilters(); });
  document.getElementById('run-filters').addEventListener('submit', event => event.preventDefault());

  const selectRun = (id, moveFocus = true) => {
    selectedRun = id;
    for (const detail of details) detail.hidden = detail.dataset.detailId !== id;
    for (const row of rows) {
      row.dataset.selected = String(row.dataset.runId === id);
      const link = document.getElementById(`inspect-run-${row.dataset.runId}`);
      if (row.dataset.runId === id) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
    if (moveFocus) document.getElementById(`detail-heading-${id}`).focus();
  };
  for (const row of rows) {
    const id = row.dataset.runId;
    document.getElementById(`inspect-run-${id}`).addEventListener('click', event => { event.preventDefault(); selectRun(id); });
    const back = document.getElementById(`back-to-run-${id}`);
    back.hidden = false;
    back.addEventListener('click', () => {
      const row = document.getElementById(`run-${selectedRun}`);
      if (row.hidden) {
        search.focus();
        status.textContent = `RUN-${selectedRun} is hidden by the current filters. Filters and open detail context are preserved.`;
      } else {
        document.getElementById(`inspect-run-${selectedRun}`).focus();
      }
    });
  }
  selectRun(selectedRun, false);

  const appendSampleEvent = (label) => {
    const event = document.createElement('li');
    const time = document.createElement('span');
    time.className = 'support';
    time.textContent = 'Manual step';
    const text = document.createElement('span');
    text.textContent = `Simulation: ${label}`;
    event.append(time, text);
    document.getElementById('run-101-events').append(event);
  };
  cancel.addEventListener('click', () => {
    if (cancellationRequested || document.getElementById('run-101').dataset.state !== 'running') return;
    cancellationRequested = true;
    cancel.disabled = true;
    acknowledge.hidden = false;
    acknowledge.disabled = false;
    document.getElementById('pending-run-101').textContent = 'Cancellation requested';
    document.getElementById('cancel-explanation').textContent = 'Cancellation is requested. The last confirmed execution state is still Running; simulate an acknowledgement to confirm cancellation.';
    appendSampleEvent('cancellation requested; acknowledgement pending.');
    status.textContent = 'Cancellation requested for RUN-101. Confirmed execution remains Running.';
    acknowledge.focus();
  });
  acknowledge.addEventListener('click', () => {
    if (!cancellationRequested || acknowledge.disabled) return;
    const row = document.getElementById('run-101');
    row.dataset.state = 'cancelled';
    const rowLabel = row.querySelector('[data-execution-label="101"]');
    rowLabel.textContent = 'Cancelled';
    rowLabel.classList.remove('information');
    const execution = document.getElementById('execution-run-101');
    execution.textContent = 'Cancelled';
    execution.classList.remove('information');
    document.getElementById('pending-run-101').textContent = 'None';
    document.getElementById('cancel-explanation').textContent = 'Acknowledgement simulated. The sample execution state is now Cancelled. No real run was affected.';
    acknowledge.disabled = true;
    acknowledge.textContent = 'Acknowledgement simulated';
    appendSampleEvent('cancellation acknowledged; confirmed state changed to Cancelled.');
    applyFilters();
    status.textContent = 'Acknowledgement simulated for RUN-101. Confirmed execution is now Cancelled.';
    document.getElementById('detail-heading-101').focus();
  });
})();
