(() => {
  'use strict';

  const root = document.documentElement;
  const storageKey = 'interface-atlas-play-preview';
  const appearanceQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const preferences = { appearance: 'system', density: 'comfortable', motion: true };
  const seed = window.__playPreferences;
  if (seed && typeof seed === 'object' && !Array.isArray(seed)) {
    if (['system', 'light', 'dark'].includes(seed.appearance)) preferences.appearance = seed.appearance;
    if (['comfortable', 'compact'].includes(seed.density)) preferences.density = seed.density;
    if (typeof seed.motion === 'boolean') preferences.motion = seed.motion;
  }
  const byId = id => document.getElementById(id);
  const appearance = byId('appearance');
  const density = byId('density');
  const motion = byId('motion');
  const preferenceNote = byId('preference-note');
  let storageAvailable = true;

  function applyPreferences() {
    root.dataset.appearance = preferences.appearance === 'dark' || (preferences.appearance === 'system' && appearanceQuery.matches) ? 'dark' : 'light';
    root.dataset.density = preferences.density;
    root.dataset.motion = preferences.motion ? 'on' : 'off';
    appearance.value = preferences.appearance;
    density.value = preferences.density;
    motion.checked = preferences.motion;
    byId('density-note').textContent = preferences.density === 'compact' ? 'Compact density · 16px specimen space' : 'Comfortable density · 24px specimen space';
    byId('motion-note').textContent = motionQuery.matches ? 'System reduced motion is active. Feedback is immediate.' : 'System reduced motion takes priority.';
    preferenceNote.textContent = storageAvailable ? 'Preferences are stored in this browser.' : 'Storage is unavailable. Preferences work for this visit.';
  }

  function savePreferences() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(preferences));
      storageAvailable = true;
    } catch {
      storageAvailable = false;
    }
    applyPreferences();
  }

  appearance.addEventListener('change', () => {
    if (!['system', 'light', 'dark'].includes(appearance.value)) return;
    preferences.appearance = appearance.value;
    savePreferences();
  });
  density.addEventListener('change', () => {
    if (!['comfortable', 'compact'].includes(density.value)) return;
    preferences.density = density.value;
    savePreferences();
  });
  motion.addEventListener('change', () => {
    preferences.motion = motion.checked;
    savePreferences();
  });
  function listen(query, callback) {
    if (typeof query.addEventListener === 'function') query.addEventListener('change', callback);
    else if (typeof query.addListener === 'function') query.addListener(callback);
  }
  listen(appearanceQuery, applyPreferences);
  listen(motionQuery, applyPreferences);
  window.addEventListener('storage', event => {
    if (event.key !== storageKey) return;
    let saved;
    try { saved = JSON.parse(event.newValue); } catch { return; }
    if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return;
    if (['system', 'light', 'dark'].includes(saved.appearance)) preferences.appearance = saved.appearance;
    if (['comfortable', 'compact'].includes(saved.density)) preferences.density = saved.density;
    if (typeof saved.motion === 'boolean') preferences.motion = saved.motion;
    applyPreferences();
  });

  const builder = byId('brief-builder');
  const form = byId('brief-form');
  const fields = byId('brief-fields');
  const projectName = byId('project-name');
  const projectGoal = byId('project-goal');
  const typeInputs = Array.from(form.querySelectorAll('input[name="projectType"]'));
  const deliverableInputs = Array.from(form.querySelectorAll('input[name="deliverables"]'));
  const review = byId('brief-review');
  const pending = byId('pending-panel');
  const receipt = byId('brief-receipt');
  const errorSummary = byId('error-summary');
  const errorList = byId('error-list');
  const edit = byId('edit-brief');
  const request = byId('request-confirmation');
  const acknowledge = byId('acknowledge-request');
  const status = byId('request-status');
  const typeLabels = { brand: 'Brand identity', product: 'Digital product', campaign: 'Creative campaign' };
  const deliverableLabels = { identity: 'Identity direction', website: 'Website concept', launch: 'Launch materials' };
  let state = 'editing';
  let snapshot = null;

  function setState(nextState) {
    state = nextState;
    builder.dataset.state = state;
    const editing = state === 'editing';
    const waiting = state === 'pending';
    form.hidden = !editing;
    fields.disabled = !editing;
    review.hidden = editing;
    pending.hidden = !waiting;
    receipt.hidden = state !== 'acknowledged';
    request.disabled = state !== 'review';
    edit.disabled = waiting || editing;
    acknowledge.disabled = !waiting;
  }

  function updateGoalCount() {
    byId('goal-count').textContent = `${projectGoal.value.length} / 600`;
  }

  function clearErrors() {
    errorSummary.hidden = true;
    errorList.replaceChildren();
    ['name-error', 'type-error', 'goal-error', 'deliverables-error'].forEach(id => {
      byId(id).hidden = true;
      byId(id).textContent = '';
    });
    [projectName, projectGoal, ...typeInputs, ...deliverableInputs].forEach(input => input.removeAttribute('aria-invalid'));
  }

  function showErrors(errors) {
    for (const error of errors) {
      const message = byId(error.messageId);
      message.textContent = error.message;
      message.hidden = false;
      error.inputs.forEach(input => input.setAttribute('aria-invalid', 'true'));
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${error.inputs[0].id}`;
      link.textContent = error.message;
      link.addEventListener('click', event => {
        event.preventDefault();
        error.inputs[0].focus();
      });
      item.append(link);
      errorList.append(item);
    }
    errorSummary.hidden = false;
    status.textContent = 'The brief needs corrections. Your entered details are preserved.';
    errorSummary.focus();
  }

  function collectBrief() {
    const name = projectName.value.trim();
    const goal = projectGoal.value.trim();
    const type = typeInputs.find(input => input.checked && Object.hasOwn(typeLabels, input.value))?.value;
    const deliverables = deliverableInputs.filter(input => input.checked && Object.hasOwn(deliverableLabels, input.value)).map(input => input.value);
    const errors = [];
    if (!name || name.length > 80) errors.push({ messageId: 'name-error', inputs: [projectName], message: 'Enter a project name of 1–80 characters.' });
    if (!type) errors.push({ messageId: 'type-error', inputs: typeInputs, message: 'Choose one project type.' });
    if (goal.length < 15 || goal.length > 600) errors.push({ messageId: 'goal-error', inputs: [projectGoal], message: 'Describe your project goal in 15–600 characters.' });
    if (!deliverables.length) errors.push({ messageId: 'deliverables-error', inputs: deliverableInputs, message: 'Choose at least one deliverable.' });
    return { errors, brief: { projectName: name, projectType: type, goal, deliverables } };
  }

  function renderSnapshot() {
    byId('review-name').textContent = snapshot.projectName;
    byId('review-type').textContent = typeLabels[snapshot.projectType];
    byId('review-goal').textContent = snapshot.goal;
    const items = snapshot.deliverables.map(deliverable => {
      const item = document.createElement('li');
      item.textContent = deliverableLabels[deliverable];
      return item;
    });
    byId('review-deliverables').replaceChildren(...items);
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (state !== 'editing') return;
    clearErrors();
    const { errors, brief } = collectBrief();
    if (errors.length) {
      showErrors(errors);
      return;
    }
    snapshot = Object.freeze({ ...brief, deliverables: Object.freeze([...brief.deliverables]) });
    renderSnapshot();
    setState('review');
    status.textContent = 'Brief ready for review. No confirmation has been requested.';
    byId('review-heading').focus();
  });

  edit.addEventListener('click', () => {
    if (state !== 'review' && state !== 'acknowledged') return;
    snapshot = null;
    clearErrors();
    setState('editing');
    status.textContent = 'Editing your brief. Your entered details are preserved; review again before requesting confirmation.';
    projectName.focus();
  });

  request.addEventListener('click', () => {
    if (state !== 'review' || !snapshot) return;
    setState('pending');
    status.textContent = 'Confirmation requested locally. Pending acknowledgement; no receipt is confirmed and no agent has started.';
    acknowledge.focus();
  });

  acknowledge.addEventListener('click', () => {
    if (state !== 'pending' || !snapshot) return;
    setState('acknowledged');
    status.textContent = 'Local receipt confirmed for the reviewed brief. No agent has started.';
    byId('receipt-heading').focus();
  });

  byId('reset-demo').addEventListener('click', () => {
    form.reset();
    snapshot = null;
    clearErrors();
    byId('review-name').textContent = '';
    byId('review-type').textContent = '';
    byId('review-goal').textContent = '';
    byId('review-deliverables').replaceChildren();
    updateGoalCount();
    setState('editing');
    status.textContent = 'Local demo reset. The brief and receipt were discarded; preview preferences are unchanged.';
    projectName.focus();
  });

  projectGoal.addEventListener('input', updateGoalCount);
  try { localStorage.getItem(storageKey); } catch { storageAvailable = false; }
  applyPreferences();
  [appearance, density, motion, byId('specimen-name'), byId('specimen-check'), byId('reset-demo')].forEach(control => { control.disabled = false; });
  byId('no-js-review').hidden = true;
  updateGoalCount();
  setState('editing');
  window.__playPreview = Object.freeze({
    getState: () => ({ state, snapshot, preferences: { ...preferences } })
  });
})();
