/* Original Atlas Next Up. Browser-local task state; no service or storage. */
(() => {
  'use strict';
  const root = document.documentElement;
  const byId = (id) => document.getElementById(id);
  const themeSourceTemplate = byId('theme-source-link').getAttribute('href');
  const themeCreditsTemplate = byId('theme-credits-link').getAttribute('href');
  const labels = { editorial: 'Editorial', swiss: 'Swiss', precision: 'Precision', play: 'Play', botanical: 'Botanical', blueprint: 'Blueprint', pulse: 'Pulse', gallery: 'Gallery', layered: 'Layered' };
  const fits = {
    editorial: 'Editorial contributes its warm palette, serif display stack and declared corners. This treatment replaces selective elevation with opaque filled planes and explicit grouping; it does not reproduce a complete Editorial product.',
    swiss: 'Swiss contributes its graphic palette, sans type and declared 2px corners. Shared edges and explicit rules offer a surface affinity, while this filled-plane task board remains an original composition.',
    precision: 'Precision contributes its utility palette, IBM Plex stacks and declared 4px corners. Shadow-free task surfaces offer an affinity; this short local list does not establish fit for dense operational workflows.',
    play: 'Play contributes its expressive colors, typography and declared rounded geometry. Removing its hard offset depth is a substantial departure; labels and native controls carry the working states here.',
    botanical: 'Botanical contributes its earthy palette, serif display stack and alternating source corners. Removing its selective elevation simplifies the material treatment; the profile does not reproduce its narrative composition.',
    blueprint: 'Blueprint contributes its drafting palette, technical type and declared 8px/4px geometry. This specimen removes offset construction decoration; the list is not a full drafting or technical workspace.',
    pulse: 'Pulse contributes its event palette, condensed display stack and declared 12px/6px corners. Flat surfaces offer a limited affinity, but this task list does not exercise poster artwork, schedules or event workflows.',
    gallery: 'Gallery contributes its collection palette, sans type and declared panel/control corners. Its flat surfaces offer an affinity, but a text task board does not test meaningful imagery or collection viewing.',
    layered: 'Layered contributes its opaque role colors, geometric sans stack and declared rounded geometry. Filled regions still group the work, but this small flat board does not exercise the hierarchy of a complete layered workspace.',
  };
  const settings = { theme: byId('theme-select'), appearance: byId('appearance'), motion: byId('motion') };
  const allowed = { theme: Object.keys(labels), appearance: ['light', 'dark', 'system'], motion: ['off', 'on'] };
  const media = { dark: matchMedia('(prefers-color-scheme: dark)'), reduced: matchMedia('(prefers-reduced-motion: reduce)'), forced: matchMedia('(forced-colors: active)') };
  const list = byId('task-list');
  const filter = byId('task-filter');
  const title = byId('task-title');
  const priority = byId('task-priority');
  const priorityLabels = { high: 'High priority', normal: 'Normal priority', low: 'Low priority' };
  const records = Array.from(list.querySelectorAll('.task-item'), (row) => ({ row, checkbox: row.querySelector('.task-toggle'), title: row.querySelector('.task-title').textContent.trim() }));
  let nextId = 1;

  function updateMaterialStatus() {
    const dark = settings.appearance.value === 'dark' || (settings.appearance.value === 'system' && media.dark.matches);
    const effective = settings.motion.value === 'on' && !media.reduced.matches && !media.forced.matches;
    root.dataset.effectiveMotion = effective ? 'on' : 'off';
    let text = 'Opaque color planes · ' + (dark ? 'dark' : 'light') + ' appearance · ';
    if (media.forced.matches) text = 'System colors · explicit boundaries and state words · border feedback off for forced colors.';
    else if (media.reduced.matches) text += 'border feedback off for reduced motion.';
    else text += effective ? '120ms border-color feedback on; no movement.' : 'border feedback off.';
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
  function updateBoard() {
    const done = records.filter((record) => record.checkbox.checked).length;
    let visible = 0;
    records.forEach((record) => {
      const checked = record.checkbox.checked;
      record.row.classList.toggle('is-done', checked);
      record.row.querySelector('.task-state').textContent = checked ? 'Done' : 'Open';
      record.row.hidden = filter.value === 'open' ? checked : filter.value === 'done' ? !checked : false;
      if (!record.row.hidden) visible += 1;
    });
    byId('task-summary').textContent = (records.length - done) + ' open · ' + done + ' done · ' + records.length + ' total';
    byId('filter-status').textContent = filter.value === 'all' ? 'Showing all ' + records.length + ' tasks in original order.' : 'Showing ' + visible + ' of ' + records.length + ' tasks in original order.';
    byId('empty-tasks').hidden = visible !== 0;
    return visible;
  }
  function status(text) { byId('task-status').textContent = text; }
  function clearTitleError() {
    title.setCustomValidity('');
    title.removeAttribute('aria-invalid');
    byId('title-error').textContent = '';
    byId('title-error').hidden = true;
  }
  function validateTitle() {
    clearTitleError();
    const value = title.value.trim();
    if (value.length >= 3 && value.length <= 64) return value;
    const message = 'Enter a task title of 3–64 characters after trimming spaces.';
    title.setCustomValidity(message);
    title.setAttribute('aria-invalid', 'true');
    byId('title-error').textContent = message;
    byId('title-error').hidden = false;
    status('Check the task title. Your existing tasks are unchanged.');
    title.focus();
    return null;
  }
  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function addTask(event) {
    event.preventDefault();
    const taskTitle = validateTitle();
    if (taskTitle === null) return;
    const chosenPriority = Object.hasOwn(priorityLabels, priority.value) ? priority.value : 'normal';
    const id = 'user-' + nextId++;
    const row = element('li', 'task-item');
    row.dataset.taskId = id;
    row.dataset.priority = chosenPriority;
    const label = element('label', 'task-choice');
    const checkbox = element('input', 'task-toggle');
    checkbox.type = 'checkbox';
    checkbox.id = 'task-' + id;
    label.htmlFor = checkbox.id;
    label.append(checkbox, element('span', 'task-title', taskTitle));
    const meta = element('div', 'task-meta');
    meta.append(element('span', 'task-priority', priorityLabels[chosenPriority]), element('span', 'task-state', 'Open'));
    row.append(label, element('p', 'task-description', 'Added to this page. Reload restores the sample board.'), meta);
    list.append(row);
    records.push({ row, checkbox, title: taskTitle });
    updateBoard();
    title.value = '';
    clearTitleError();
    status('Added “' + taskTitle + '” as an open task. ' + (row.hidden ? 'It is hidden by the Done tasks view; choose All tasks or Open tasks to see it. ' : '') + 'Nothing has been saved beyond this page.');
    title.focus();
  }

  Object.keys(settings).forEach((key) => settings[key].addEventListener('change', () => applySetting(key)));
  Object.values(media).forEach((query) => query.addEventListener('change', updateMaterialStatus));
  filter.addEventListener('change', () => {
    const visible = updateBoard();
    status('View changed to ' + filter.selectedOptions[0].textContent + '. ' + visible + ' tasks shown; all tasks remain on this page.');
  });
  list.addEventListener('change', (event) => {
    const record = records.find((item) => item.checkbox === event.target);
    if (!record) return;
    const wasFocused = document.activeElement === record.checkbox;
    updateBoard();
    let message = '“' + record.title + '” marked ' + (record.checkbox.checked ? 'done.' : 'open.');
    if (record.row.hidden && wasFocused) {
      const next = records.find((item) => !item.row.hidden);
      if (next) { next.checkbox.focus(); message += ' The task left this filtered view. Focus moved to the first visible task.'; }
      else { filter.focus(); message += ' No tasks remain in this view. Focus moved to Show tasks.'; }
    }
    status(message + ' This change belongs to the open page only.');
  });
  byId('show-all').addEventListener('click', () => {
    filter.value = 'all';
    updateBoard();
    filter.focus();
    status('All tasks are shown in original order. Focus moved to Show tasks.');
  });
  title.addEventListener('input', clearTitleError);
  byId('add-task-form').addEventListener('submit', addTask);
  Object.keys(settings).forEach(applySetting);
  updateBoard();
  Object.values(settings).forEach((field) => { field.disabled = false; });
  records.forEach((record) => { record.checkbox.disabled = false; });
  filter.disabled = false;
  byId('show-all').disabled = false;
  byId('add-fields').disabled = false;
  byId('js-status').textContent = 'Local tools ready. Tasks and form input last only while this page stays open. Reload restores the four sample tasks.';
  root.dataset.ready = 'true';
})();
