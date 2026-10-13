(() => {
  'use strict';

  const root = document.documentElement;
  const appearance = document.getElementById('appearance');
  const density = document.getElementById('density');
  const motion = document.getElementById('motion');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const preferenceNote = document.getElementById('preference-note');
  const motionNote = document.getElementById('motion-note');
  const densityNote = document.getElementById('density-note');
  appearance.value = root.dataset.appearance;
  density.value = root.dataset.density;
  motion.checked = root.dataset.motion === 'on';
  for (const control of [appearance, density, motion]) control.disabled = false;

  const updateNotes = () => {
    motionNote.textContent = reducedMotion.matches
      ? 'System reduced motion is active; all feedback changes are immediate.'
      : motion.checked ? 'Short color and border feedback only. No moving artwork.' : 'Motion is off; all feedback changes are immediate.';
    densityNote.textContent = `${density.value === 'compact' ? 'Compact' : 'Comfortable'} density`;
  };
  const savePreferences = () => {
    try {
      localStorage.setItem('interface-atlas-swiss-preview', JSON.stringify({ appearance: root.dataset.appearance, density: root.dataset.density, motion: root.dataset.motion }));
      preferenceNote.textContent = 'Preferences stay in this browser. The review simulation resets on reload.';
    } catch {
      preferenceNote.textContent = 'Changes apply to this page; preference storage is unavailable.';
    }
  };
  appearance.addEventListener('change', () => { root.dataset.appearance = appearance.value; savePreferences(); });
  density.addEventListener('change', () => { root.dataset.density = density.value; updateNotes(); savePreferences(); });
  motion.addEventListener('change', () => { root.dataset.motion = motion.checked ? 'on' : 'off'; updateNotes(); savePreferences(); });
  reducedMotion.addEventListener('change', updateNotes);
  document.querySelector('.preview-settings').addEventListener('submit', event => event.preventDefault());
  updateNotes();
  savePreferences();

  const view = document.getElementById('view-proposal');
  const detail = document.getElementById('proposal-detail');
  const placeholder = document.getElementById('proposal-placeholder');
  const heading = document.getElementById('proposal-heading');
  const accept = document.getElementById('accept-proposal');
  const reject = document.getElementById('reject-proposal');
  const acknowledge = document.getElementById('acknowledge-decision');
  const back = document.getElementById('back-to-proposal');
  const reset = document.getElementById('reset-proposal');
  const confirmed = document.getElementById('confirmed-decision');
  const pending = document.getElementById('pending-decision');
  const explanation = document.getElementById('decision-explanation');
  const result = document.getElementById('review-result');
  const status = document.getElementById('review-status');
  let requested = null;
  let resolved = false;

  view.disabled = false;
  back.disabled = false;
  back.hidden = false;
  reset.disabled = false;
  detail.hidden = true;
  placeholder.hidden = false;
  view.setAttribute('aria-expanded', 'false');

  view.addEventListener('click', () => {
    detail.hidden = false;
    placeholder.hidden = true;
    view.setAttribute('aria-expanded', 'true');
    accept.disabled = Boolean(requested) || resolved;
    reject.disabled = Boolean(requested) || resolved;
    heading.focus();
  });
  back.addEventListener('click', () => {
    detail.hidden = true;
    placeholder.hidden = false;
    view.setAttribute('aria-expanded', 'false');
    view.focus();
  });
  const requestDecision = decision => {
    if (requested || resolved) return;
    requested = decision;
    pending.textContent = `${decision === 'accepted' ? 'Acceptance' : 'Rejection'} requested`;
    pending.className = 'warning';
    accept.disabled = true;
    reject.disabled = true;
    acknowledge.hidden = false;
    acknowledge.disabled = false;
    explanation.textContent = `The ${decision === 'accepted' ? 'acceptance' : 'rejection'} request is pending. The confirmed decision remains Unreviewed until acknowledgement is simulated.`;
    status.textContent = `${pending.textContent} for CHG-024. Confirmed decision remains Unreviewed. No change has been executed.`;
    acknowledge.focus();
  };
  accept.addEventListener('click', () => requestDecision('accepted'));
  reject.addEventListener('click', () => requestDecision('rejected'));
  acknowledge.addEventListener('click', () => {
    if (!requested || resolved) return;
    resolved = true;
    confirmed.textContent = requested === 'accepted' ? 'Accepted' : 'Rejected';
    confirmed.className = requested === 'accepted' ? 'success' : 'danger';
    pending.textContent = 'None';
    pending.className = '';
    acknowledge.disabled = true;
    acknowledge.textContent = 'Acknowledgement simulated';
    explanation.textContent = 'Acknowledgement simulated. Execution remains Not started; no file, service, or deployed interface was changed.';
    result.hidden = false;
    result.textContent = `Sample decision: ${confirmed.textContent}. This records only a local decision; it does not execute the proposal.`;
    status.textContent = `Acknowledgement simulated for CHG-024. Confirmed decision is ${confirmed.textContent}. Execution remains Not started.`;
    result.focus();
  });
  reset.addEventListener('click', () => {
    requested = null;
    resolved = false;
    confirmed.textContent = 'Unreviewed';
    confirmed.className = '';
    pending.textContent = 'None';
    pending.className = '';
    accept.disabled = false;
    reject.disabled = false;
    acknowledge.hidden = true;
    acknowledge.disabled = true;
    acknowledge.textContent = 'Simulate acknowledgement';
    explanation.textContent = 'A requested decision remains pending until its acknowledgement is simulated.';
    result.hidden = true;
    result.textContent = '';
    status.textContent = 'Sample CHG-024 reset. Confirmed decision is Unreviewed. No change has been executed.';
    heading.focus();
  });
})();
