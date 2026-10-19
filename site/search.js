(() => {
  const form = document.querySelector('.collection-search');
  const input = document.querySelector('#theme-search');
  const clearButton = document.querySelector('#search-clear');
  const count = document.querySelector('#search-count');
  const empty = document.querySelector('.search-empty');
  const cards = [...document.querySelectorAll('.preview-card:not(.brand-card)')];

  if (!form || !input || !clearButton || !count || !empty || !cards.length) return;

  const themes = cards.map((card) => {
    const name = card.querySelector('.card-copy h3 a');
    const description = card.querySelector('.card-copy p');
    if (!name || !description) return null;
    return {
      card,
      text: [
        [...name.childNodes].filter((node) => node.nodeType === Node.TEXT_NODE).map((node) => node.textContent).join(''),
        description.textContent,
      ].map((text) => text.toLowerCase()),
    };
  });

  // A broken or incomplete enhancement must leave the original collection usable.
  if (themes.some((theme) => !theme)) return;

  function update() {
    const query = input.value.trim().toLowerCase();
    let matches = 0;
    for (const theme of themes) {
      const visible = theme.text.some((text) => text.includes(query));
      theme.card.hidden = !visible;
      if (visible) matches += 1;
    }
    count.textContent = `${matches} of ${themes.length} themes shown`;
    empty.hidden = matches !== 0;
    clearButton.disabled = input.value.length === 0;
  }

  input.addEventListener('input', update);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    update();
  });
  clearButton.addEventListener('click', () => {
    input.value = '';
    update();
    input.focus();
  });

  input.value = '';
  update();
  form.hidden = false;
})();
