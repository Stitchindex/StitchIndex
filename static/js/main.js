// StitchIndex — search, filter, category tabs

(function() {
  const allCards = Array.from(document.querySelectorAll('.resource-card[data-title]'));
  const grid = document.querySelector('.resource-grid');
  const countEl = document.querySelector('.result-count');

  function normalise(s) { return (s || '').toLowerCase(); }

  function getFilters() {
    const params = new URLSearchParams(window.location.search);
    return {
      q: normalise(params.get('q') || ''),
      category: normalise(params.get('category') || ''),
      type: normalise(params.get('type') || ''),
      difficulty: normalise(params.get('difficulty') || ''),
    };
  }

  function applyFilters() {
    const f = getFilters();
    let shown = 0;
    allCards.forEach(card => {
      const title = normalise(card.dataset.title);
      const desc = normalise(card.dataset.desc);
      const tags = normalise(card.dataset.tags);
      const category = normalise(card.dataset.category);
      const type = normalise(card.dataset.type);
      const difficulty = normalise(card.dataset.difficulty);

      const matchQ = !f.q || title.includes(f.q) || desc.includes(f.q) || tags.includes(f.q);
      const matchCat = !f.category || category === f.category;
      const matchType = !f.type || type === f.type;
      const matchDiff = !f.difficulty || difficulty === f.difficulty;

      const visible = matchQ && matchCat && matchType && matchDiff;
      card.style.display = visible ? '' : 'none';
      if (visible) shown++;
    });

    if (countEl) countEl.textContent = shown;

    // empty state
    let empty = document.querySelector('.empty-state');
    if (shown === 0) {
      if (!empty) {
        empty = document.createElement('div');
        empty.className = 'empty-state';
        empty.innerHTML = '<p>No resources found. Try a different search or category.</p>';
        grid.appendChild(empty);
      }
    } else {
      if (empty) empty.remove();
    }
  }

  function setParam(key, value) {
    const params = new URLSearchParams(window.location.search);
    if (value) { params.set(key, value); } else { params.delete(key); }
    const newUrl = window.location.pathname + (params.toString() ? '?' + params.toString() : '');
    window.history.replaceState({}, '', newUrl);
    applyFilters();
    syncUI();
  }

  function syncUI() {
    const f = getFilters();

    // search inputs
    document.querySelectorAll('.search-input').forEach(el => {
      if (el.value !== f.q) el.value = f.q;
    });

    // category tabs
    document.querySelectorAll('.cat-tab').forEach(tab => {
      const val = normalise(tab.dataset.category || '');
      tab.classList.toggle('active', val === f.category);
    });

    // sidebar items
    document.querySelectorAll('.sidebar-item[data-filter]').forEach(item => {
      const key = item.dataset.filter;
      const val = normalise(item.dataset.value || '');
      const current = f[key] || '';
      item.classList.toggle('active', val === current);
    });
  }

  // ── Wire up search inputs
  document.querySelectorAll('.search-input').forEach(input => {
    let timer;
    input.addEventListener('input', e => {
      clearTimeout(timer);
      timer = setTimeout(() => setParam('q', e.target.value.trim()), 220);
    });
    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') { clearTimeout(timer); setParam('q', e.target.value.trim()); }
    });
  });

  // ── Wire up hero search form
  const heroForm = document.querySelector('.hero-search');
  if (heroForm) {
    heroForm.addEventListener('submit', e => {
      e.preventDefault();
      const val = heroForm.querySelector('input').value.trim();
      setParam('q', val);
      document.querySelector('.page-wrap')?.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ── Wire up category tabs
  document.querySelectorAll('.cat-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const val = tab.dataset.category || '';
      setParam('category', val);
    });
  });

  // ── Wire up sidebar filters
  document.querySelectorAll('.sidebar-item[data-filter]').forEach(item => {
    item.addEventListener('click', () => {
      const key = item.dataset.filter;
      const val = item.dataset.value || '';
      const current = new URLSearchParams(window.location.search).get(key) || '';
      setParam(key, current === val ? '' : val);
    });
  });

  // ── Sort control
  const sortEl = document.querySelector('.sort-select');
  if (sortEl) {
    sortEl.addEventListener('change', () => {
      const val = sortEl.value;
      const cards = Array.from(document.querySelectorAll('.resource-card[data-title]'));
      const sorted = cards.sort((a, b) => {
        if (val === 'alpha') return a.dataset.title.localeCompare(b.dataset.title);
        if (val === 'newest') return (b.dataset.date || '').localeCompare(a.dataset.date || '');
        return 0;
      });
      sorted.forEach(c => grid.appendChild(c));
    });
  }

  // ── Init
  syncUI();
  applyFilters();
})();
