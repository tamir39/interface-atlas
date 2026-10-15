(() => {
  const root = document.documentElement;
  const storageKey = 'interface-atlas-layered-preview';
  const defaults = { appearance: 'system', density: 'comfortable', motion: 'on' };
  const options = { appearance: ['system', 'light', 'dark'], density: ['comfortable', 'compact'], motion: ['on', 'off'] };
  const preferences = Object.fromEntries(Object.keys(defaults).map(key => [key, options[key].includes(root.dataset[key]) ? root.dataset[key] : defaults[key]]));
  const appearance = document.querySelector('#appearance');
  const density = document.querySelector('#density');
  const motion = document.querySelector('#motion');
  const preferenceNote = document.querySelector('#preference-note');
  let preferenceStorageAvailable = true;
  function updateWorkspaceNote() {
    document.querySelector('#workspace-note').textContent = preferenceStorageAvailable
      ? 'A fictional local workspace. Project edits and task changes reset on reload; preview preferences can be saved separately.'
      : 'A fictional local workspace. Project edits, task changes, and preview preferences apply for this visit and reset on reload.';
  }
  function applyPreferences() {
    for (const key of Object.keys(defaults)) root.dataset[key] = preferences[key];
    appearance.value = preferences.appearance;
    density.value = preferences.density;
    motion.checked = preferences.motion === 'on';
    document.querySelector('#density-note').textContent = preferences.density === 'compact' ? 'Compact density · 16px panel inset' : 'Comfortable density · 24px panel inset';
  }
  function savePreferences() {
    try { localStorage.setItem(storageKey, JSON.stringify(preferences)); preferenceStorageAvailable = true; preferenceNote.textContent = 'Only these preview preferences are saved in this browser.'; }
    catch { preferenceStorageAvailable = false; preferenceNote.textContent = 'Preferences apply for this visit; this browser is not saving them.'; }
    applyPreferences();
    updateWorkspaceNote();
  }
  appearance.addEventListener('change', () => { preferences.appearance = options.appearance.includes(appearance.value) ? appearance.value : defaults.appearance; savePreferences(); });
  density.addEventListener('change', () => { preferences.density = options.density.includes(density.value) ? density.value : defaults.density; savePreferences(); });
  motion.addEventListener('change', () => { preferences.motion = motion.checked ? 'on' : 'off'; savePreferences(); });
  document.querySelector('.preview-settings').addEventListener('submit', event => event.preventDefault());
  applyPreferences();
  for (const control of [appearance, density, motion]) control.disabled = false;
  try { localStorage.getItem(storageKey); preferenceNote.textContent = 'Only these preview preferences are saved when changed in this browser.'; }
  catch { preferenceStorageAvailable = false; preferenceNote.textContent = 'Preferences apply for this visit; this browser is not saving them.'; }

  const initialProjects = [
    { id: 'reading', title: 'Reading corner', category: 'personal', priority: 'normal', description: 'Make a little room for reading and a useful note.', tasks: [true, false, false] },
    { id: 'studio', title: 'Studio refresh', category: 'creative', priority: 'focus', description: 'Give a small creative space a considered refresh.', tasks: [true, true, false] },
    { id: 'weekend', title: 'Weekend walk', category: 'personal', priority: 'later', description: 'Prepare a simple walk with space to notice things.', tasks: [false, false, false] }
  ];
  const projects = initialProjects.map(project => ({ ...project, tasks: [...project.tasks] }));
  const projectById = id => projects.find(project => project.id === id);
  const priorityNames = { normal: 'Normal', focus: 'Focus', later: 'Later' };
  const search = document.querySelector('#project-search');
  const category = document.querySelector('#project-category');
  const status = document.querySelector('#workspace-status');
  let selectedId = 'reading';
  function announce(message) { status.textContent = message; }
  function changed(project) {
    const initial = initialProjects.find(item => item.id === project.id);
    return project.title !== initial.title || project.priority !== initial.priority || project.tasks.some((value, index) => value !== initial.tasks[index]);
  }
  function updateProject(project) {
    document.querySelectorAll(`[data-project-title="${project.id}"]`).forEach(node => { node.textContent = project.title; });
    document.querySelectorAll(`[data-project-priority="${project.id}"]`).forEach(node => { node.textContent = priorityNames[project.priority]; });
    const complete = project.tasks.filter(Boolean).length;
    document.querySelectorAll(`[data-project-progress="${project.id}"]`).forEach(node => { node.textContent = `${complete} of ${project.tasks.length} tasks completed`; });
    document.querySelector(`[data-project-bar="${project.id}"]`).style.width = `${complete / project.tasks.length * 100}%`;
    document.querySelector(`[data-open-project="${project.id}"]`).setAttribute('aria-label', `Open ${project.title}`);
    document.querySelector(`[data-edit-project="${project.id}"]`).setAttribute('aria-label', `Edit project: ${project.title}`);
    const revert = document.querySelector(`[data-revert-project="${project.id}"]`);
    revert.setAttribute('aria-label', `Revert project: ${project.title}`);
    revert.disabled = !changed(project);
    document.querySelectorAll(`[data-project-task="${project.id}"]`).forEach(input => { input.checked = project.tasks[Number(input.dataset.taskIndex)]; });
    const allTasks = projects.flatMap(item => item.tasks);
    document.querySelector('#overall-progress').textContent = `${allTasks.filter(Boolean).length} of ${allTasks.length} sample tasks completed`;
  }
  function filterProjects(shouldAnnounce = true) {
    const query = search.value.trim().toLocaleLowerCase();
    let count = 0;
    for (const project of projects) {
      const matches = (category.value === 'all' || category.value === project.category) && `${project.title} ${project.description}`.toLocaleLowerCase().includes(query);
      document.querySelector(`[data-project-card="${project.id}"]`).hidden = !matches;
      if (matches) count++;
    }
    document.querySelector('#project-count').textContent = `${count} ${count === 1 ? 'project' : 'projects'}`;
    document.querySelector('#empty-projects').hidden = count !== 0;
    if (shouldAnnounce) {
      const hiddenCurrent = document.querySelector(`[data-project-card="${selectedId}"]`).hidden;
      announce(`${count} ${count === 1 ? 'project matches' : 'projects match'} these filters.${hiddenCurrent ? ' Your open project remains available in Project details.' : ''}`);
    }
  }
  function selectProject(id, focus = true) {
    if (!projectById(id)) return;
    selectedId = id;
    for (const project of projects) {
      const current = project.id === id;
      document.querySelector(`[data-project-detail="${project.id}"]`).hidden = !current;
      document.querySelector(`[data-project-card="${project.id}"]`).dataset.current = String(current);
      document.querySelector(`[data-current-project="${project.id}"]`).hidden = !current;
      const link = document.querySelector(`[data-open-project="${project.id}"]`);
      if (current) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    }
    if (focus) document.querySelector(`#project-${id}-title`).focus();
  }
  function selectFragment() {
    const match = /^#project-(reading|studio|weekend)$/.exec(location.hash);
    if (match) selectProject(match[1]);
  }
  search.disabled = false;
  category.disabled = false;
  document.querySelector('.project-toolbar').addEventListener('submit', event => { event.preventDefault(); filterProjects(); });
  search.addEventListener('input', () => filterProjects());
  category.addEventListener('change', () => filterProjects());
  document.querySelector('#clear-filters').disabled = false;
  document.querySelector('#clear-filters').addEventListener('click', () => { search.value = ''; category.value = 'all'; filterProjects(); search.focus(); });
  document.querySelectorAll('[data-open-project]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      selectProject(link.dataset.openProject);
      announce(`${projectById(selectedId).title} is open in Project details.`);
    });
  });
  addEventListener('hashchange', selectFragment);
  document.querySelectorAll('[data-project-task]').forEach(input => {
    input.disabled = false;
    input.addEventListener('change', () => {
      const project = projectById(input.dataset.projectTask);
      project.tasks[Number(input.dataset.taskIndex)] = input.checked;
      updateProject(project);
      announce(`${project.title}: ${project.tasks.filter(Boolean).length} of ${project.tasks.length} sample tasks completed.`);
    });
  });
  document.querySelectorAll('[data-revert-project]').forEach(button => {
    button.addEventListener('click', () => {
      const project = projectById(button.dataset.revertProject);
      const initial = initialProjects.find(item => item.id === project.id);
      project.title = initial.title;
      project.priority = initial.priority;
      project.tasks = [...initial.tasks];
      updateProject(project);
      filterProjects(false);
      document.querySelector(`#project-${project.id}-title`).focus();
      announce(`${project.title} restored to its starting title, priority, and tasks. Other projects are unchanged.`);
    });
  });

  const editor = document.querySelector('#project-editor');
  const editorForm = document.querySelector('#project-form');
  const titleInput = document.querySelector('#project-title');
  const priorityInput = document.querySelector('#project-priority');
  const errorSummary = document.querySelector('#editor-errors');
  let editingId = null;
  let editorOpener = null;
  function clearErrors() {
    errorSummary.hidden = true;
    errorSummary.querySelector('ul').replaceChildren();
    titleInput.removeAttribute('aria-invalid');
    titleInput.setAttribute('aria-describedby', 'title-hint');
    priorityInput.removeAttribute('aria-invalid');
    priorityInput.removeAttribute('aria-describedby');
    for (const id of ['title-error', 'priority-error']) { const node = document.getElementById(id); node.textContent = ''; node.hidden = true; }
  }
  function editorUnavailable() {
    document.querySelector('#editor-unavailable').hidden = false;
    document.querySelectorAll('[data-edit-project]').forEach(button => { button.disabled = true; });
  }
  function showErrors(errors) {
    clearErrors();
    for (const error of errors) {
      const input = document.getElementById(error.input);
      const message = document.getElementById(error.error);
      message.textContent = error.message;
      message.hidden = false;
      input.setAttribute('aria-invalid', 'true');
      input.setAttribute('aria-describedby', error.input === 'project-title' ? `title-hint ${error.error}` : error.error);
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${error.input}`;
      link.textContent = error.message;
      link.addEventListener('click', event => { event.preventDefault(); input.focus(); });
      item.append(link);
      errorSummary.querySelector('ul').append(item);
    }
    errorSummary.hidden = false;
    document.querySelector('#editor-error-heading').focus();
  }
  const supportsDialog = typeof editor.showModal === 'function' && typeof editor.close === 'function';
  if (supportsDialog) {
    document.querySelectorAll('[data-edit-project]').forEach(button => {
      button.disabled = false;
      button.addEventListener('click', () => {
        const project = projectById(button.dataset.editProject);
        editingId = project.id;
        editorOpener = button;
        titleInput.value = project.title;
        priorityInput.value = project.priority;
        clearErrors();
        try { editor.showModal(); titleInput.focus(); }
        catch {
          editingId = null;
          editorOpener = null;
          if (editor.open) editor.close('unavailable');
          editorUnavailable();
          document.querySelector(`#project-${project.id}-title`).focus();
          announce('Project editing is unavailable. The rest of the workspace is still available.');
        }
      });
    });
    document.querySelector('#cancel-project').addEventListener('click', () => editor.close('cancel'));
    editor.addEventListener('close', () => {
      const opener = editorOpener;
      editingId = null;
      editorOpener = null;
      clearErrors();
      if (opener?.isConnected && !opener.disabled) opener.focus();
    });
    editorForm.addEventListener('submit', event => {
      event.preventDefault();
      if (!editingId) return;
      const title = titleInput.value.trim();
      const priority = priorityInput.value;
      const errors = [];
      if (!title) errors.push({ input: 'project-title', error: 'title-error', message: 'Enter a project title using 1–60 characters.' });
      else if (title.length > 60) errors.push({ input: 'project-title', error: 'title-error', message: 'Shorten the project title to 60 characters or fewer.' });
      if (!Object.hasOwn(priorityNames, priority)) errors.push({ input: 'project-priority', error: 'priority-error', message: 'Choose Normal, Focus, or Later for the priority.' });
      if (errors.length) { showErrors(errors); return; }
      const project = projectById(editingId);
      project.title = title;
      project.priority = priority;
      updateProject(project);
      filterProjects(false);
      editor.close('save');
      const cardHidden = document.querySelector(`[data-project-card="${project.id}"]`).hidden;
      announce(`${project.title} updated in this demo.${cardHidden ? ' These filters hide its card; the open project remains available below.' : ''}`);
    });
  } else editorUnavailable();
  for (const project of projects) updateProject(project);
  selectProject('reading', false);
  filterProjects(false);
  selectFragment();
  const initialFragment = location.hash;
  addEventListener('load', () => {
    setTimeout(() => {
      const match = /^#project-(reading|studio|weekend)$/.exec(initialFragment);
      if (!match || location.hash !== initialFragment || selectedId !== match[1] || editor.open) return;
      const heading = document.querySelector(`#project-${match[1]}-title`);
      const detail = document.querySelector(`#project-${match[1]}`);
      if (document.activeElement === document.body || document.activeElement === detail || document.activeElement === heading) heading.focus();
    }, 0);
  }, { once: true });
  updateWorkspaceNote();
  root.classList.add('js');
})();
