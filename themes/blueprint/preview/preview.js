(() => {
  const root = document.documentElement;
  const storageKey = 'interface-atlas-blueprint-preview';
  const defaults = { appearance: 'system', density: 'comfortable', motion: 'on' };
  const options = { appearance: ['system', 'light', 'dark'], density: ['comfortable', 'compact'], motion: ['on', 'off'] };
  const appearance = document.getElementById('appearance');
  const density = document.getElementById('density');
  const motion = document.getElementById('motion');
  const preferenceNote = document.getElementById('preference-note');
  const densityNote = document.getElementById('density-note');
  const workspace = document.getElementById('workspace');
  const presentation = document.getElementById('presentation');
  const showGrid = document.getElementById('show-grid');
  const resetWorkspace = document.getElementById('reset-workspace');
  const workspaceNote = document.getElementById('workspace-note');
  const workspaceStatus = document.getElementById('workspace-status');
  const previousNode = document.getElementById('previous-node');
  const nextNode = document.getElementById('next-node');
  const nodeOrder = ['brief', 'catalog', 'assembler', 'design', 'review'];
  const nodeTitles = { brief: 'Project brief', catalog: 'Theme catalog', assembler: 'Design preparation', design: 'Project design.md', review: 'Human review' };
  const nodes = new Map(nodeOrder.map(id => [id, workspace.querySelector(`[data-node-id="${id}"]`)]));
  const details = new Map(nodeOrder.map(id => [id, document.getElementById(`detail-${id}`)]));
  const inspectLinks = new Map(nodeOrder.map(id => [id, document.getElementById(`inspect-node-${id}`)]));
  const backButtons = new Map(nodeOrder.map(id => [id, document.getElementById(`back-to-node-${id}`)]));
  let selectedNode = 'brief';

  const preferences = Object.fromEntries(Object.keys(defaults).map(key => [key, options[key].includes(root.dataset[key]) ? root.dataset[key] : defaults[key]]));
  const synchronizePreferences = () => {
    for (const [key, value] of Object.entries(preferences)) root.dataset[key] = value;
    appearance.value = preferences.appearance;
    density.value = preferences.density;
    motion.checked = preferences.motion === 'on';
    densityNote.textContent = preferences.density === 'compact' ? 'Compact density · 16px panel inset' : 'Comfortable density · 24px panel inset';
  };
  const savePreferences = () => {
    synchronizePreferences();
    try {
      localStorage.setItem(storageKey, JSON.stringify(preferences));
      preferenceNote.textContent = 'Preview preferences are saved in this browser.';
    } catch {
      preferenceNote.textContent = 'Storage is unavailable. Preferences apply for this visit.';
    }
  };
  appearance.addEventListener('change', () => {
    preferences.appearance = options.appearance.includes(appearance.value) ? appearance.value : defaults.appearance;
    savePreferences();
  });
  density.addEventListener('change', () => {
    preferences.density = options.density.includes(density.value) ? density.value : defaults.density;
    savePreferences();
  });
  motion.addEventListener('change', () => {
    preferences.motion = motion.checked ? 'on' : 'off';
    savePreferences();
  });
  document.querySelector('.preview-settings').addEventListener('submit', event => event.preventDefault());
  synchronizePreferences();
  appearance.disabled = false;
  density.disabled = false;
  motion.disabled = false;
  try {
    localStorage.getItem(storageKey);
    preferenceNote.textContent = 'Preview preferences are saved when changed in this browser.';
  } catch {
    preferenceNote.textContent = 'Storage is unavailable. Preferences apply for this visit.';
  }

  const announce = message => { workspaceStatus.textContent = message; };
  const selectNode = (id, { focus = false, message = '' } = {}) => {
    if (!nodeOrder.includes(id)) return;
    selectedNode = id;
    for (const nodeId of nodeOrder) {
      const current = nodeId === selectedNode;
      nodes.get(nodeId).dataset.selected = String(current);
      nodes.get(nodeId).querySelector('.reading-marker').hidden = !current;
      if (current) inspectLinks.get(nodeId).setAttribute('aria-current', 'true');
      else inspectLinks.get(nodeId).removeAttribute('aria-current');
      details.get(nodeId).hidden = !current;
    }
    const index = nodeOrder.indexOf(selectedNode);
    previousNode.disabled = index === 0;
    nextNode.disabled = index === nodeOrder.length - 1;
    if (focus) document.getElementById(`detail-heading-${selectedNode}`).focus();
    if (message) announce(message);
  };

  for (const id of nodeOrder) {
    inspectLinks.get(id).addEventListener('click', event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      selectNode(id, { focus: true, message: `Reading ${nodeTitles[id]}. This is a local conceptual example.` });
    });
    const back = backButtons.get(id);
    back.hidden = false;
    back.disabled = false;
    back.addEventListener('click', () => {
      inspectLinks.get(selectedNode).focus();
      announce(`Returned to ${nodeTitles[selectedNode]} in the ${presentation.value} presentation.`);
    });
  }
  previousNode.addEventListener('click', () => {
    const index = nodeOrder.indexOf(selectedNode);
    if (index > 0) selectNode(nodeOrder[index - 1], { focus: true, message: `Reading ${nodeTitles[nodeOrder[index - 1]]}.` });
  });
  nextNode.addEventListener('click', () => {
    const index = nodeOrder.indexOf(selectedNode);
    if (index < nodeOrder.length - 1) selectNode(nodeOrder[index + 1], { focus: true, message: `Reading ${nodeTitles[nodeOrder[index + 1]]}.` });
  });
  presentation.addEventListener('change', () => {
    workspace.dataset.presentation = presentation.value === 'outline' ? 'outline' : 'diagram';
    presentation.value = workspace.dataset.presentation;
    announce(`${presentation.value === 'outline' ? 'Outline' : 'Diagram'} presentation. Still reading ${nodeTitles[selectedNode]}; all four labeled relationships remain below.`);
  });
  showGrid.addEventListener('click', () => {
    const enabled = showGrid.getAttribute('aria-pressed') !== 'true';
    showGrid.setAttribute('aria-pressed', String(enabled));
    workspace.dataset.grid = enabled ? 'on' : 'off';
    announce(`Decorative grid ${enabled ? 'on' : 'off'}. ${presentation.value === 'outline' ? 'The grid is only displayed in Diagram. ' : ''}Still reading ${nodeTitles[selectedNode]}.`);
  });
  resetWorkspace.addEventListener('click', () => {
    presentation.value = 'diagram';
    workspace.dataset.presentation = 'diagram';
    workspace.dataset.grid = 'on';
    showGrid.setAttribute('aria-pressed', 'true');
    selectNode('brief');
    try { history.replaceState(null, '', location.pathname + location.search); } catch {}
    inspectLinks.get('brief').focus();
    announce('Workspace reset locally: Diagram presentation, decorative grid on, and Project brief selected. Preview preferences are unchanged.');
  });
  const linkedNode = () => {
    const id = location.hash.slice(1).replace(/^detail-/, '');
    return location.hash.startsWith('#detail-') && nodeOrder.includes(id) ? id : null;
  };
  window.addEventListener('hashchange', () => {
    const id = linkedNode();
    if (id) selectNode(id, { focus: true, message: `Reading ${nodeTitles[id]} from its direct link.` });
  });
  presentation.disabled = false;
  showGrid.disabled = false;
  resetWorkspace.disabled = false;
  workspaceNote.textContent = 'Presentation, grid, and selection stay within this visit. Reload starts a fresh workspace; a direct article link opens that part. No file is generated and no agent is run.';
  selectNode(linkedNode() ?? 'brief');
})();
