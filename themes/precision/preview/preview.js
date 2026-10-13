(() => {
  'use strict';
  const root = document.documentElement;
  const appearance = document.getElementById('appearance');
  const density = document.getElementById('density');
  const motion = document.getElementById('motion');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const search = document.getElementById('run-search');
  const stateFilter = document.getElementById('run-status-filter');
  const resetFilters = document.getElementById('reset-filters');
  const rows = [...document.querySelectorAll('[data-run-row]')];
  const details = [...document.querySelectorAll('[data-run-detail]')];
  const inspectButtons = [...document.querySelectorAll('[data-inspect-run]')];
  const back = document.getElementById('back-to-runs');
  const status = document.getElementById('workspace-status');
  const cancel = document.getElementById('cancel-run');
  const acknowledge = document.getElementById('acknowledge-cancellation');
  const disconnect = document.getElementById('simulate-disconnection');
  let selectedRun = 'RUN-041';
  let cancellationRequested = false;
  let disconnected = false;

  appearance.value = root.dataset.appearance;
  density.value = root.dataset.density;
  motion.checked = root.dataset.motion === 'on';
  for (const control of [appearance, density, motion, search, stateFilter, resetFilters, back, disconnect, ...inspectButtons]) control.disabled = false;
  back.hidden = false;

  const announce = message => { status.textContent = message; };
  const updatePreferenceNotes = () => {
    document.getElementById('motion-note').textContent = reducedMotion.matches
      ? 'System reduced motion is active; feedback changes are immediate.'
      : motion.checked ? 'Subtle feedback only. No moving artwork or continuous animation.' : 'Motion is off; feedback changes are immediate.';
    document.getElementById('density-note').textContent = `${density.value === 'compact' ? 'Compact' : 'Comfortable'} density`;
  };
  const savePreferences = () => {
    try {
      localStorage.setItem('interface-atlas-precision-preview', JSON.stringify({
        appearance: root.dataset.appearance, density: root.dataset.density, motion: root.dataset.motion,
      }));
      document.getElementById('preference-note').textContent = 'Preferences stay in this browser. Sample run state resets on reload.';
    } catch {
      document.getElementById('preference-note').textContent = 'Changes apply to this page; preference storage is unavailable.';
    }
  };
  appearance.addEventListener('change', () => { root.dataset.appearance = appearance.value; savePreferences(); });
  density.addEventListener('change', () => { root.dataset.density = density.value; updatePreferenceNotes(); savePreferences(); });
  motion.addEventListener('change', () => { root.dataset.motion = motion.checked ? 'on' : 'off'; updatePreferenceNotes(); savePreferences(); });
  reducedMotion.addEventListener('change', updatePreferenceNotes);
  document.querySelector('.preview-settings').addEventListener('submit', event => event.preventDefault());
  updatePreferenceNotes();
  savePreferences();

  const applyFilters = (announceResult = true) => {
    const query = search.value.trim().toLocaleLowerCase();
    let visible = 0;
    for (const row of rows) {
      const name = `${row.dataset.runRow} ${row.querySelector('h5').textContent} ${row.querySelector('.run-context').textContent}`;
      row.hidden = !(name.toLocaleLowerCase().includes(query) && (stateFilter.value === 'all' || row.dataset.state === stateFilter.value));
      if (!row.hidden) visible++;
    }
    const count = `${visible} sample ${visible === 1 ? 'run' : 'runs'}`;
    document.getElementById('run-count').textContent = count;
    document.getElementById('run-empty').hidden = visible !== 0;
    if (announceResult) announce(`${count} match the current filters. The open run detail is preserved.`);
  };
  search.addEventListener('input', () => applyFilters());
  stateFilter.addEventListener('change', () => applyFilters());
  resetFilters.addEventListener('click', () => { search.value = ''; stateFilter.value = 'all'; applyFilters(); });
  document.getElementById('run-filters').addEventListener('submit', event => event.preventDefault());

  const selectRun = (id, moveFocus = true) => {
    selectedRun = id;
    for (const detail of details) detail.hidden = detail.dataset.runDetail !== id;
    for (const row of rows) row.dataset.selected = String(row.dataset.runRow === id);
    for (const button of inspectButtons) {
      if (button.dataset.inspectRun === id) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    }
    if (moveFocus) {
      document.getElementById(`run-heading-${id}`).focus();
      announce(`${id} detail opened. Evidence and confirmed states are shown.`);
    }
  };
  for (const button of inspectButtons) button.addEventListener('click', () => selectRun(button.dataset.inspectRun));
  back.addEventListener('click', () => {
    const row = document.getElementById(`row-${selectedRun}`);
    if (row.hidden) {
      search.focus();
      announce(`${selectedRun} is hidden by the current filters. Filters and open detail are preserved. Focus returned to search.`);
    } else document.getElementById(`inspect-${selectedRun}`).focus();
  });
  selectRun(selectedRun, false);
  applyFilters(false);

  const updateCommandControls = () => {
    const running = document.getElementById('row-RUN-041').dataset.state === 'running';
    cancel.disabled = !running || cancellationRequested || disconnected;
    acknowledge.disabled = !cancellationRequested || !running || disconnected;
    if (!running) document.getElementById('cancel-explanation').textContent = 'Acknowledgement simulated. The sample execution is now Cancelled. No real run was affected.';
    else if (disconnected) document.getElementById('cancel-explanation').textContent = 'The connection simulation is disconnected. Reconnect before requesting or acknowledging a command. The last confirmed execution remains Running.';
    else if (cancellationRequested) document.getElementById('cancel-explanation').textContent = 'Cancellation is requested. The confirmed execution remains Running until its acknowledgement is simulated.';
    else document.getElementById('cancel-explanation').textContent = 'Requesting cancellation leaves execution at Running until its acknowledgement is explicitly simulated.';
  };
  const appendSampleEvent = (title, description) => {
    const item = document.createElement('li');
    const step = document.createElement('span');
    step.className = 'event-step';
    step.textContent = 'Manual';
    const body = document.createElement('div');
    const heading = document.createElement('strong');
    heading.textContent = title;
    const text = document.createElement('p');
    text.textContent = `Simulation: ${description}`;
    body.append(heading, text);
    item.append(step, body);
    document.getElementById('events-RUN-041').append(item);
  };
  cancel.addEventListener('click', () => {
    if (cancel.disabled || cancellationRequested) return;
    cancellationRequested = true;
    acknowledge.hidden = false;
    document.getElementById('pending-command').textContent = 'Cancellation requested';
    appendSampleEvent('Cancellation requested', 'acknowledgement is pending; confirmed execution remains Running.');
    updateCommandControls();
    announce('Cancellation requested for RUN-041. Confirmed execution remains Running. No backend command was sent.');
    acknowledge.focus();
  });
  acknowledge.addEventListener('click', () => {
    if (acknowledge.disabled || !cancellationRequested) return;
    const row = document.getElementById('row-RUN-041');
    row.dataset.state = 'cancelled';
    row.querySelector('[data-row-state]').textContent = 'Cancelled';
    row.querySelector('[data-row-state]').classList.remove('information');
    const execution = document.getElementById('confirmed-execution-RUN-041');
    execution.textContent = 'Cancelled';
    execution.classList.remove('information');
    document.getElementById('pending-command').textContent = 'None';
    document.getElementById('evidence-RUN-041').textContent = 'At a manual simulation step, cancellation was acknowledged and execution changed to Cancelled. No completion or deployment is confirmed.';
    acknowledge.textContent = 'Acknowledgement simulated';
    appendSampleEvent('Cancellation acknowledged', 'confirmed execution changed to Cancelled. No real run was affected.');
    updateCommandControls();
    applyFilters(false);
    announce('Acknowledgement simulated for RUN-041. Confirmed execution is now Cancelled. No real run was affected.');
    document.getElementById('run-heading-RUN-041').focus();
  });
  disconnect.addEventListener('click', () => {
    disconnected = !disconnected;
    const connection = disconnected ? 'Local simulation · Disconnected' : 'Local simulation · Connected';
    document.getElementById('connection-state').textContent = connection;
    for (const label of document.querySelectorAll('[data-detail-connection]')) label.textContent = connection;
    for (const label of document.querySelectorAll('[data-confirmed-label]')) label.textContent = disconnected ? 'Last confirmed execution' : 'Confirmed execution';
    document.getElementById('connection-note').hidden = !disconnected;
    disconnect.setAttribute('aria-pressed', String(disconnected));
    updateCommandControls();
    announce(disconnected
      ? 'Connection simulation disconnected. Last confirmed execution states and pending commands are preserved. No failure or new activity is inferred.'
      : 'Connection simulation reconnected. This local action does not confirm new run evidence; sample execution states are unchanged.');
  });
  updateCommandControls();
})();
