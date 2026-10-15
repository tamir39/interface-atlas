(() => {
  const root = document.documentElement;
  const storageKey = 'interface-atlas-pulse-preview';
  const defaults = { appearance: 'system', density: 'comfortable', motion: 'on' };
  const options = { appearance: ['system', 'light', 'dark'], density: ['comfortable', 'compact'], motion: ['on', 'off'] };
  const appearance = document.getElementById('appearance');
  const density = document.getElementById('density');
  const motion = document.getElementById('motion');
  const preferenceNote = document.getElementById('preference-note');
  const densityNote = document.getElementById('density-note');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const playStudy = document.getElementById('play-study');
  const studyNote = document.getElementById('study-note');
  const bars = [...document.querySelectorAll('.motion-bar')];
  let activeAnimations = [];
  let studyGeneration = 0;
  const preferences = Object.fromEntries(Object.keys(defaults).map(key => [key, options[key].includes(root.dataset[key]) ? root.dataset[key] : defaults[key]]));

  const stopStudy = () => {
    studyGeneration += 1;
    for (const animation of activeAnimations) animation.cancel();
    activeAnimations = [];
  };
  const studyAvailability = () => {
    if (preferences.motion === 'off') return 'Motion is off in preview preferences. Static artwork is shown.';
    if (reducedMotion.matches) return 'Your system requests reduced motion. Static artwork is shown.';
    if (document.hidden) return 'The page is hidden. Static artwork is shown.';
    if (!bars.every(bar => typeof bar.animate === 'function')) return 'This browser does not support the motion study. Static artwork is shown.';
    return '';
  };
  const synchronizeStudy = () => {
    const unavailable = studyAvailability();
    playStudy.disabled = Boolean(unavailable);
    if (unavailable) { stopStudy(); studyNote.textContent = unavailable; }
    else if (activeAnimations.length === 0) studyNote.textContent = 'Static artwork. Play runs one 600ms study; repeat to replay.';
  };
  const synchronizePreferences = () => {
    for (const [key, value] of Object.entries(preferences)) root.dataset[key] = value;
    appearance.value = preferences.appearance;
    density.value = preferences.density;
    motion.checked = preferences.motion === 'on';
    densityNote.textContent = preferences.density === 'compact' ? 'Compact density · 16px panel inset' : 'Comfortable density · 24px panel inset';
    synchronizeStudy();
  };
  const savePreferences = () => {
    synchronizePreferences();
    try {
      localStorage.setItem(storageKey, JSON.stringify(preferences));
      preferenceNote.textContent = 'Preview preferences are saved in this browser.';
    } catch { preferenceNote.textContent = 'Storage is unavailable. Preferences apply for this visit.'; }
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

  playStudy.addEventListener('click', () => {
    if (studyAvailability()) { synchronizeStudy(); return; }
    stopStudy();
    const generation = studyGeneration;
    activeAnimations = bars.map(bar => bar.animate([
      { transform: 'translateY(16px) skewX(-16deg)', opacity: .4 },
      { transform: 'translateY(0) skewX(-16deg)', opacity: 1 }
    ], { duration: 600, easing: 'cubic-bezier(.2,0,0,1)', iterations: 1 }));
    studyNote.textContent = 'Playing one 600ms study. The artwork will settle into its static state.';
    Promise.allSettled(activeAnimations.map(animation => animation.finished)).then(() => {
      if (generation !== studyGeneration) return;
      activeAnimations = [];
      studyNote.textContent = 'Study complete. Static artwork is shown; you can play it again.';
    });
  });
  reducedMotion.addEventListener('change', synchronizeStudy);
  document.addEventListener('visibilitychange', synchronizeStudy);

  const sessions = [
    { id: 'opening', title: 'Start with a better question', format: 'talk', start: 540, end: 585, time: '09:00–09:45' },
    { id: 'systems', title: 'A system with room to grow', format: 'workshop', start: 600, end: 660, time: '10:00–11:00' },
    { id: 'motion', title: 'Motion that explains', format: 'lab', start: 630, end: 675, time: '10:30–11:15' },
    { id: 'type', title: 'Let the type do the work', format: 'talk', start: 675, end: 720, time: '11:15–12:00' },
    { id: 'prototype', title: 'Prototype the next decision', format: 'workshop', start: 780, end: 840, time: '13:00–14:00' },
    { id: 'critique', title: 'Make critique useful', format: 'lab', start: 810, end: 855, time: '13:30–14:15' }
  ];
  const selected = new Set();
  const format = document.getElementById('format');
  const cards = new Map(sessions.map(session => [session.id, document.querySelector(`[data-session-id="${session.id}"]`)]));
  const toggles = new Map(sessions.map(session => [session.id, document.getElementById(`add-${session.id}`)]));
  const plannerStatus = document.getElementById('planner-status');
  const planList = document.getElementById('plan-list');
  const planEmpty = document.getElementById('plan-empty');
  const planCount = document.getElementById('plan-count');
  const clearPlan = document.getElementById('clear-plan');
  const reviewPlan = document.getElementById('review-plan');
  const errorSummary = document.getElementById('plan-errors');
  const errorTitle = document.getElementById('error-title');
  const errorList = document.getElementById('error-list');
  const review = document.getElementById('plan-review');
  const reviewList = document.getElementById('review-list');
  const backToProgram = document.getElementById('back-to-program');
  const selectedSessions = () => sessions.filter(session => selected.has(session.id));
  const announce = message => { plannerStatus.textContent = message; };
  const invalidateReview = () => { errorSummary.hidden = true; review.hidden = true; errorList.replaceChildren(); reviewList.replaceChildren(); };
  const applyFilter = ({ announceChange = true } = {}) => {
    if (!['all', 'talk', 'workshop', 'lab'].includes(format.value)) format.value = 'all';
    let visible = 0;
    for (const session of sessions) {
      const shown = format.value === 'all' || session.format === format.value;
      cards.get(session.id).hidden = !shown;
      if (shown) visible += 1;
    }
    const formatLabel = format.options[format.selectedIndex].textContent;
    document.getElementById('program-count').textContent = `${visible} ${visible === 1 ? 'session' : 'sessions'} · ${formatLabel}`;
    if (announceChange) announce(`${visible} ${visible === 1 ? 'session' : 'sessions'} shown. Your ${selected.size} selected ${selected.size === 1 ? 'session is' : 'sessions are'} preserved in the plan.`);
  };
  const renderPlan = () => {
    const choices = selectedSessions();
    planCount.textContent = `${choices.length} ${choices.length === 1 ? 'session' : 'sessions'} selected`;
    planEmpty.hidden = choices.length > 0;
    clearPlan.disabled = choices.length === 0;
    for (const session of sessions) {
      const chosen = selected.has(session.id);
      cards.get(session.id).dataset.selected = String(chosen);
      toggles.get(session.id).setAttribute('aria-pressed', String(chosen));
      toggles.get(session.id).querySelector('.toggle-mark').textContent = chosen ? '✓' : '+';
    }
    planList.replaceChildren(...choices.map(session => {
      const item = document.createElement('li');
      item.dataset.planId = session.id;
      const time = document.createElement('p');
      time.className = 'chosen-time';
      time.textContent = `${session.time} · ${session.format[0].toUpperCase() + session.format.slice(1)}`;
      const title = document.createElement('h4');
      title.textContent = session.title;
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.id = `remove-${session.id}`;
      remove.className = 'remove-session';
      remove.textContent = 'Remove';
      remove.setAttribute('aria-label', `Remove ${session.title} from plan`);
      remove.addEventListener('click', () => {
        const previousOrder = selectedSessions();
        const position = previousOrder.findIndex(choice => choice.id === session.id);
        selected.delete(session.id);
        invalidateReview();
        renderPlan();
        const next = selectedSessions();
        const focusTarget = next[position] || next[position - 1];
        (focusTarget ? document.getElementById(`remove-${focusTarget.id}`) : document.getElementById('plan-title')).focus();
        announce(`Removed ${session.title}. ${selected.size} ${selected.size === 1 ? 'session remains' : 'sessions remain'} in your local plan. Review again when ready.`);
      });
      item.append(time, title, remove);
      return item;
    }));
  };
  for (const session of sessions) {
    const toggle = toggles.get(session.id);
    toggle.disabled = false;
    toggle.addEventListener('click', () => {
      const adding = !selected.has(session.id);
      if (adding) selected.add(session.id); else selected.delete(session.id);
      invalidateReview();
      renderPlan();
      announce(`${adding ? 'Added' : 'Removed'} ${session.title}. ${selected.size} ${selected.size === 1 ? 'session' : 'sessions'} in your local plan. Review checks for time overlaps.`);
    });
  }
  const addErrorLink = (item, session) => {
    const link = document.createElement('a');
    link.href = `#add-${session.id}`;
    link.textContent = session.title;
    link.addEventListener('click', event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const wasHidden = cards.get(session.id).hidden;
      if (wasHidden) { format.value = 'all'; applyFilter({ announceChange: false }); }
      toggles.get(session.id).focus();
      announce(`${wasHidden ? 'All formats are shown so this session is visible. ' : ''}Focused ${session.title}. Your choices are preserved; use Add to plan to toggle this session.`);
    });
    item.append(link);
  };
  reviewPlan.addEventListener('click', () => {
    invalidateReview();
    const choices = selectedSessions();
    if (choices.length === 0) {
      errorTitle.textContent = 'Choose a session to review';
      const item = document.createElement('li');
      item.append(document.createTextNode('Your plan is empty. Start with '));
      addErrorLink(item, sessions[0]);
      item.append(document.createTextNode(' or another session in the program.'));
      errorList.append(item);
      errorSummary.hidden = false;
      errorTitle.focus();
      announce('Your plan is empty. Choose at least one session, then review again.');
      return;
    }
    const conflicts = [];
    for (let first = 0; first < choices.length; first += 1) {
      for (let second = first + 1; second < choices.length; second += 1) {
        if (choices[first].start < choices[second].end && choices[second].start < choices[first].end) conflicts.push([choices[first], choices[second]]);
      }
    }
    if (conflicts.length > 0) {
      errorTitle.textContent = `${conflicts.length} ${conflicts.length === 1 ? 'time overlap needs' : 'time overlaps need'} a choice`;
      for (const [first, second] of conflicts) {
        const item = document.createElement('li');
        addErrorLink(item, first);
        item.append(document.createTextNode(` (${first.time}) overlaps with `));
        addErrorLink(item, second);
        item.append(document.createTextNode(` (${second.time}). Remove one of these sessions from your plan.`));
        errorList.append(item);
      }
      errorSummary.hidden = false;
      errorTitle.focus();
      announce(`${conflicts.length} time ${conflicts.length === 1 ? 'overlap found' : 'overlaps found'}. All ${choices.length} selected sessions are preserved.`);
      return;
    }
    reviewList.replaceChildren(...choices.map(session => {
      const item = document.createElement('li');
      item.dataset.reviewId = session.id;
      const time = document.createElement('p');
      time.className = 'chosen-time';
      time.textContent = `${session.time} · ${session.format[0].toUpperCase() + session.format.slice(1)}`;
      const title = document.createElement('h4');
      title.textContent = session.title;
      const summary = document.createElement('p');
      summary.textContent = cards.get(session.id).querySelector('.session-summary').textContent;
      item.append(time, title, summary);
      return item;
    }));
    document.getElementById('review-note').textContent = `${choices.length} selected ${choices.length === 1 ? 'session has' : 'sessions have'} no time overlaps on this sample day.`;
    review.hidden = false;
    document.getElementById('review-title').focus();
    announce('Local plan reviewed. No time overlaps found. Nothing has been booked or submitted.');
  });
  clearPlan.addEventListener('click', () => {
    selected.clear();
    invalidateReview();
    renderPlan();
    document.getElementById('plan-title').focus();
    announce('Your local plan is cleared. The program filter and preview preferences are unchanged.');
  });
  backToProgram.addEventListener('click', () => {
    review.hidden = true;
    document.getElementById('program-title').focus();
    announce('Back to the program. Your selected sessions and format filter are preserved.');
  });
  format.disabled = false;
  reviewPlan.disabled = false;
  backToProgram.disabled = false;
  format.addEventListener('change', () => applyFilter());
  document.getElementById('planner-note').textContent = 'Choices stay in this local page and reset on reload. Review checks that you selected at least one session and that session times do not overlap.';
  applyFilter({ announceChange: false });
  renderPlan();
})();
