// ========== STATE MANAGEMENT ==========
const State = {
  currentMode: 'dashboard',
  oral: { currentIndex: 0, filter: 'all', difficultyFilter: 'all', answered: new Set(), correct: new Set() },
  concepts: { filter: 'all', expanded: null },
  flashcards: { currentIndex: 0, filter: 'all', flipped: false, known: new Set(), queue: [] },
  problems: { currentIndex: 0, revealedSteps: new Set() }
};

// ========== PROGRESS (localStorage) ==========
const Progress = {
  _key: 'aca-progress-v1',
  _data: null,
  load() {
    try {
      this._data = JSON.parse(localStorage.getItem(this._key)) || this._default();
    } catch { this._data = this._default(); }
    return this._data;
  },
  _default() {
    return { oral: { answered: [], correct: [] }, flashcards: { known: [], seen: [] }, problems: { completed: [] }, streak: { last: null, count: 0 }, startDate: new Date().toISOString() };
  },
  save() { localStorage.setItem(this._key, JSON.stringify(this._data)); },
  get data() { if (!this._data) this.load(); return this._data; },
  reset() { this._data = this._default(); this.save(); },
  updateStreak() {
    const today = new Date().toDateString();
    if (this.data.streak.last === today) return;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    this.data.streak.count = this.data.streak.last === yesterday ? this.data.streak.count + 1 : 1;
    this.data.streak.last = today;
    this.save();
  }
};

// ========== NAVIGATION ==========
function initNav() {
  document.querySelectorAll('[data-mode]').forEach(btn => {
    btn.addEventListener('click', () => switchMode(btn.dataset.mode));
  });
  document.getElementById('nav-toggle').addEventListener('click', () => {
    document.getElementById('mobile-sidebar').classList.remove('hidden');
    document.getElementById('mobile-overlay').classList.remove('hidden');
  });
  ['close-sidebar', 'mobile-overlay'].forEach(id => {
    document.getElementById(id).addEventListener('click', closeMobileSidebar);
  });
}

function closeMobileSidebar() {
  document.getElementById('mobile-sidebar').classList.add('hidden');
  document.getElementById('mobile-overlay').classList.add('hidden');
}

function switchMode(mode) {
  State.currentMode = mode;
  // Update desktop nav
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.mode === mode);
    item.classList.toggle('border-transparent', item.dataset.mode !== mode);
  });
  // Update bottom tabs
  document.querySelectorAll('.bottom-tab').forEach(tab => {
    const isActive = tab.dataset.mode === mode;
    tab.classList.toggle('text-modern', isActive);
    tab.classList.toggle('text-gray-400', !isActive);
  });
  closeMobileSidebar();
  render();
}

// ========== RENDER ==========
function render() {
  const content = document.getElementById('content');
  Progress.updateStreak();
  switch (State.currentMode) {
    case 'dashboard': content.innerHTML = renderDashboard(); break;
    case 'oral': content.innerHTML = renderOral(); break;
    case 'concepts': content.innerHTML = renderConcepts(); break;
    case 'flashcards': content.innerHTML = renderFlashcards(); break;
    case 'problems': content.innerHTML = renderProblems(); break;
  }
  attachEventListeners();
}

// ========== DASHBOARD ==========
function renderDashboard() {
  const p = Progress.data;
  const oralTotal = DATA.oralQuestions.length;
  const oralDone = p.oral.answered.length;
  const oralCorrect = p.oral.correct.length;
  const fcTotal = DATA.flashcards.length;
  const fcKnown = p.flashcards.known.length;
  const probTotal = DATA.problems.length;
  const probDone = p.problems.completed.length;
  const overallPct = Math.round(((oralDone + fcKnown + probDone) / (oralTotal + fcTotal + probTotal)) * 100) || 0;

  // Find weak topics
  const weakTopics = findWeakTopics();

  return `
    <div class="max-w-4xl mx-auto slide-in">
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-1">Welcome back!</h2>
        <p class="text-gray-400">Advanced Computer Architectures - Oral Exam Prep</p>
      </div>

      <!-- Overall progress -->
      <div class="bg-surface-light rounded-xl p-6 mb-6 border border-gray-700">
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold">Overall Progress</h3>
          <span class="text-2xl font-bold text-modern">${overallPct}%</span>
        </div>
        <div class="w-full bg-surface rounded-full h-3">
          <div class="progress-fill bg-modern rounded-full h-3" style="width: ${overallPct}%"></div>
        </div>
      </div>

      <!-- Stats grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-surface-light rounded-xl p-4 border border-gray-700 text-center">
          <div class="text-3xl font-bold text-modern">${p.streak.count}</div>
          <div class="text-xs text-gray-400 mt-1">Day Streak</div>
        </div>
        <div class="bg-surface-light rounded-xl p-4 border border-gray-700 text-center">
          <div class="text-3xl font-bold text-blue-400">${oralDone}/${oralTotal}</div>
          <div class="text-xs text-gray-400 mt-1">Oral Questions</div>
        </div>
        <div class="bg-surface-light rounded-xl p-4 border border-gray-700 text-center">
          <div class="text-3xl font-bold text-green-400">${fcKnown}/${fcTotal}</div>
          <div class="text-xs text-gray-400 mt-1">Flashcards Known</div>
        </div>
        <div class="bg-surface-light rounded-xl p-4 border border-gray-700 text-center">
          <div class="text-3xl font-bold text-purple-400">${probDone}/${probTotal}</div>
          <div class="text-xs text-gray-400 mt-1">Problems Solved</div>
        </div>
      </div>

      <!-- Mode cards -->
      <div class="grid md:grid-cols-2 gap-4 mb-6">
        <button onclick="switchMode('oral')" class="bg-surface-light rounded-xl p-5 border border-gray-700 hover:border-modern transition text-left group">
          <h3 class="font-semibold mb-2 group-hover:text-modern transition">Oral Exam Simulator</h3>
          <p class="text-sm text-gray-400">Practice answering professor-style questions out loud. ${oralTotal} questions covering Modern Solutions & Cache.</p>
          <div class="mt-3 w-full bg-surface rounded-full h-2">
            <div class="progress-fill bg-modern rounded-full h-2" style="width: ${oralTotal ? (oralDone/oralTotal*100) : 0}%"></div>
          </div>
        </button>
        <button onclick="switchMode('concepts')" class="bg-surface-light rounded-xl p-5 border border-gray-700 hover:border-cache transition text-left group">
          <h3 class="font-semibold mb-2 group-hover:text-cache transition">Concept Explorer</h3>
          <p class="text-sm text-gray-400">Browse ${DATA.concepts.length} topic cards with explanations, diagrams, and key points.</p>
        </button>
        <button onclick="switchMode('flashcards')" class="bg-surface-light rounded-xl p-5 border border-gray-700 hover:border-yellow-500 transition text-left group">
          <h3 class="font-semibold mb-2 group-hover:text-yellow-400 transition">Flashcards</h3>
          <p class="text-sm text-gray-400">${fcTotal} flip cards for definitions, comparisons, and formulas.</p>
          <div class="mt-3 w-full bg-surface rounded-full h-2">
            <div class="progress-fill bg-yellow-500 rounded-full h-2" style="width: ${fcTotal ? (fcKnown/fcTotal*100) : 0}%"></div>
          </div>
        </button>
        <button onclick="switchMode('problems')" class="bg-surface-light rounded-xl p-5 border border-gray-700 hover:border-purple-500 transition text-left group">
          <h3 class="font-semibold mb-2 group-hover:text-purple-400 transition">Practice Problems</h3>
          <p class="text-sm text-gray-400">${probTotal} step-by-step problems: cache calculations, Amdahl's law, pipeline timing.</p>
          <div class="mt-3 w-full bg-surface rounded-full h-2">
            <div class="progress-fill bg-purple-500 rounded-full h-2" style="width: ${probTotal ? (probDone/probTotal*100) : 0}%"></div>
          </div>
        </button>
      </div>

      <!-- Weak topics -->
      ${weakTopics.length ? `
      <div class="bg-surface-light rounded-xl p-5 border border-yellow-700/50 mb-6">
        <h3 class="font-semibold text-yellow-400 mb-3">Topics to Review</h3>
        <div class="flex flex-wrap gap-2">
          ${weakTopics.map(t => `<span class="px-3 py-1 bg-yellow-500/10 text-yellow-300 rounded-full text-sm">${t}</span>`).join('')}
        </div>
      </div>` : ''}

      <!-- Reset -->
      <div class="text-center">
        <button onclick="resetProgress()" class="text-sm text-gray-500 hover:text-red-400 transition">Reset all progress</button>
      </div>
    </div>
  `;
}

function findWeakTopics() {
  const p = Progress.data;
  const incorrectIds = p.oral.answered.filter(id => !p.oral.correct.includes(id));
  const subcats = new Map();
  incorrectIds.forEach(id => {
    const q = DATA.oralQuestions.find(q => q.id === id);
    if (q) subcats.set(q.subcategory, (subcats.get(q.subcategory) || 0) + 1);
  });
  return [...subcats.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name]) => name.replace(/-/g, ' '));
}

function resetProgress() {
  if (confirm('Reset all progress? This cannot be undone.')) {
    Progress.reset();
    render();
  }
}

// ========== ORAL EXAM SIMULATOR ==========
function getFilteredOralQuestions() {
  return DATA.oralQuestions.filter(q => {
    if (State.oral.filter !== 'all' && q.category !== State.oral.filter) return false;
    if (State.oral.difficultyFilter !== 'all' && q.difficulty !== State.oral.difficultyFilter) return false;
    return true;
  });
}

function renderOral() {
  const questions = getFilteredOralQuestions();
  const q = questions[State.oral.currentIndex];
  const p = Progress.data;
  const isAnswered = q && p.oral.answered.includes(q.id);
  const isCorrect = q && p.oral.correct.includes(q.id);

  return `
    <div class="max-w-3xl mx-auto slide-in">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold">Oral Exam Simulator</h2>
        <span class="text-sm text-gray-400">${questions.length ? State.oral.currentIndex + 1 : 0} / ${questions.length}</span>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-2 mb-6">
        <select id="oral-cat-filter" class="bg-surface-lighter text-sm rounded-lg px-3 py-1.5 border border-gray-600">
          <option value="all" ${State.oral.filter === 'all' ? 'selected' : ''}>All Topics</option>
          <option value="modern-solutions" ${State.oral.filter === 'modern-solutions' ? 'selected' : ''}>Modern Solutions</option>
          <option value="cache" ${State.oral.filter === 'cache' ? 'selected' : ''}>Cache</option>
        </select>
        <select id="oral-diff-filter" class="bg-surface-lighter text-sm rounded-lg px-3 py-1.5 border border-gray-600">
          <option value="all" ${State.oral.difficultyFilter === 'all' ? 'selected' : ''}>All Difficulties</option>
          <option value="easy" ${State.oral.difficultyFilter === 'easy' ? 'selected' : ''}>Easy</option>
          <option value="medium" ${State.oral.difficultyFilter === 'medium' ? 'selected' : ''}>Medium</option>
          <option value="hard" ${State.oral.difficultyFilter === 'hard' ? 'selected' : ''}>Hard</option>
        </select>
      </div>

      ${q ? `
      <!-- Question card -->
      <div class="bg-surface-light rounded-xl p-6 border border-gray-700 mb-4">
        <div class="flex items-center gap-2 mb-4">
          <span class="px-2 py-0.5 rounded text-xs font-semibold badge-${q.difficulty}">${q.difficulty}</span>
          <span class="px-2 py-0.5 rounded text-xs font-medium ${q.category === 'cache' ? 'bg-cache/20 text-cache-light' : 'bg-modern/20 text-modern-light'}">${q.category === 'cache' ? 'Cache' : 'Modern Solutions'}</span>
          <span class="text-xs text-gray-500">${q.subcategory.replace(/-/g, ' ')}</span>
        </div>
        <p class="text-lg font-medium mb-4">${escHtml(q.question)}</p>
        <p class="text-sm text-gray-400 italic mb-4">Practice answering out loud, then click to reveal the expected answer.</p>

        <!-- Key points hint -->
        <div class="mb-4">
          <button id="show-hints-btn" class="text-sm text-modern hover:underline">Show key points to mention</button>
          <div id="hints-area" class="hidden mt-2 flex flex-wrap gap-2">
            ${q.keyPoints.map(kp => `<span class="px-2 py-1 bg-modern/10 text-modern-light rounded text-sm">${escHtml(kp)}</span>`).join('')}
          </div>
        </div>

        <!-- Answer reveal -->
        <button id="reveal-btn" class="w-full py-3 rounded-lg bg-modern hover:bg-modern-dark text-white font-medium transition ${isAnswered ? 'hidden' : ''}">Reveal Answer</button>
        <div id="answer-area" class="reveal-answer ${isAnswered ? 'show' : ''}">
          <div class="mt-4 p-4 bg-surface rounded-lg border border-gray-600 answer-text">
            <h4 class="font-semibold text-modern-light mb-2">Expected Answer:</h4>
            <p class="text-sm leading-relaxed whitespace-pre-line">${escHtml(q.answer)}</p>
          </div>
          ${!isAnswered ? `
          <div class="flex gap-3 mt-4">
            <button onclick="markOral(${q.id}, false)" class="flex-1 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition font-medium text-sm">Needs Practice</button>
            <button onclick="markOral(${q.id}, true)" class="flex-1 py-2 rounded-lg bg-green-500/20 text-green-300 hover:bg-green-500/30 transition font-medium text-sm">Got It</button>
          </div>` : `
          <div class="mt-4 text-center text-sm ${isCorrect ? 'text-green-400' : 'text-red-400'}">${isCorrect ? 'Marked as correct' : 'Marked for review'}</div>
          `}
        </div>
      </div>

      <!-- Navigation -->
      <div class="flex justify-between">
        <button onclick="oralNav(-1)" class="px-4 py-2 rounded-lg bg-surface-lighter hover:bg-surface-light transition text-sm" ${State.oral.currentIndex === 0 ? 'disabled' : ''}>Previous</button>
        <button onclick="oralNav(0)" class="px-4 py-2 rounded-lg bg-surface-lighter hover:bg-surface-light transition text-sm">Random</button>
        <button onclick="oralNav(1)" class="px-4 py-2 rounded-lg bg-surface-lighter hover:bg-surface-light transition text-sm" ${State.oral.currentIndex >= questions.length - 1 ? 'disabled' : ''}>Next</button>
      </div>
      ` : `<p class="text-gray-400 text-center py-12">No questions match your filters.</p>`}
    </div>
  `;
}

function markOral(id, correct) {
  const p = Progress.data;
  if (!p.oral.answered.includes(id)) p.oral.answered.push(id);
  if (correct && !p.oral.correct.includes(id)) p.oral.correct.push(id);
  if (!correct) p.oral.correct = p.oral.correct.filter(x => x !== id);
  Progress.save();
  render();
}

function oralNav(dir) {
  const questions = getFilteredOralQuestions();
  if (dir === 0) {
    State.oral.currentIndex = Math.floor(Math.random() * questions.length);
  } else {
    State.oral.currentIndex = Math.max(0, Math.min(questions.length - 1, State.oral.currentIndex + dir));
  }
  render();
}

// ========== CONCEPT EXPLORER ==========
function renderConcepts() {
  const filtered = State.concepts.filter === 'all'
    ? DATA.concepts
    : DATA.concepts.filter(c => c.category === State.concepts.filter);

  return `
    <div class="max-w-4xl mx-auto slide-in">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold">Concept Explorer</h2>
        <select id="concept-filter" class="bg-surface-lighter text-sm rounded-lg px-3 py-1.5 border border-gray-600">
          <option value="all">All Topics</option>
          <option value="modern-solutions" ${State.concepts.filter === 'modern-solutions' ? 'selected' : ''}>Modern Solutions</option>
          <option value="cache" ${State.concepts.filter === 'cache' ? 'selected' : ''}>Cache</option>
        </select>
      </div>

      <div class="space-y-3">
        ${filtered.map(c => `
          <div class="bg-surface-light rounded-xl border border-gray-700 overflow-hidden">
            <button class="concept-toggle w-full p-4 flex items-center justify-between text-left hover:bg-surface-lighter transition" data-id="${c.id}">
              <div class="flex items-center gap-3">
                <span class="w-2 h-2 rounded-full ${c.category === 'cache' ? 'bg-cache' : 'bg-modern'}"></span>
                <div>
                  <h3 class="font-medium">${escHtml(c.title)}</h3>
                  <p class="text-xs text-gray-500">${c.subcategory.replace(/-/g, ' ')}</p>
                </div>
              </div>
              <svg class="w-5 h-5 text-gray-400 transition ${State.concepts.expanded === c.id ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            ${State.concepts.expanded === c.id ? `
            <div class="px-4 pb-4 border-t border-gray-700">
              <p class="text-sm text-gray-300 mt-3 mb-3">${escHtml(c.explanation)}</p>
              <div class="mb-3">
                <h4 class="text-xs font-semibold text-gray-400 uppercase mb-2">Key Points</h4>
                <ul class="space-y-1">
                  ${c.keyPoints.map(kp => `<li class="text-sm flex gap-2"><span class="text-modern mt-0.5">-</span> ${escHtml(kp)}</li>`).join('')}
                </ul>
              </div>
              ${c.diagram ? `
              <div>
                <h4 class="text-xs font-semibold text-gray-400 uppercase mb-2">Diagram</h4>
                <pre class="bg-surface p-3 rounded-lg text-xs text-green-300 overflow-x-auto">${escHtml(c.diagram)}</pre>
              </div>` : ''}
              <p class="mt-4 text-sm text-yellow-400 italic">Can you explain this concept in your own words?</p>
            </div>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ========== FLASHCARDS ==========
function getFilteredFlashcards() {
  return State.flashcards.filter === 'all'
    ? DATA.flashcards
    : DATA.flashcards.filter(f => f.category === State.flashcards.filter);
}

function renderFlashcards() {
  const cards = getFilteredFlashcards();
  const card = cards[State.flashcards.currentIndex];
  const p = Progress.data;
  const known = p.flashcards.known;

  return `
    <div class="max-w-2xl mx-auto slide-in">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold">Flashcards</h2>
        <span class="text-sm text-gray-400">${cards.length ? State.flashcards.currentIndex + 1 : 0} / ${cards.length}</span>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-2 mb-6">
        <select id="fc-filter" class="bg-surface-lighter text-sm rounded-lg px-3 py-1.5 border border-gray-600">
          <option value="all">All</option>
          <option value="comparison" ${State.flashcards.filter === 'comparison' ? 'selected' : ''}>Comparisons</option>
          <option value="definition" ${State.flashcards.filter === 'definition' ? 'selected' : ''}>Definitions</option>
          <option value="formula" ${State.flashcards.filter === 'formula' ? 'selected' : ''}>Formulas</option>
        </select>
        <span class="text-sm text-gray-400 flex items-center">${known.length}/${DATA.flashcards.length} known</span>
      </div>

      ${card ? `
      <!-- Flip card -->
      <div class="flip-card cursor-pointer mb-6 ${State.flashcards.flipped ? 'flipped' : ''}" id="flip-card" style="min-height: 250px">
        <div class="flip-card-inner relative w-full h-full" style="min-height: 250px">
          <div class="flip-card-front absolute inset-0 bg-surface-light rounded-xl border border-gray-700 p-6 flex flex-col items-center justify-center">
            <span class="text-xs text-gray-500 mb-3 capitalize">${card.category}</span>
            <h3 class="text-xl font-bold text-center">${escHtml(card.front)}</h3>
            <p class="text-sm text-gray-400 mt-4">Tap to flip</p>
          </div>
          <div class="flip-card-back absolute inset-0 bg-surface-light rounded-xl border border-gray-700 p-6 overflow-y-auto">
            <span class="text-xs text-gray-500 mb-2 block capitalize">${card.category}</span>
            <h4 class="font-semibold text-modern-light mb-3">${escHtml(card.front)}</h4>
            <p class="text-sm leading-relaxed whitespace-pre-line">${escHtml(card.back)}</p>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex gap-3 mb-4">
        <button onclick="fcMark(${card.id}, false)" class="flex-1 py-2.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition font-medium text-sm">Still Learning</button>
        <button onclick="fcMark(${card.id}, true)" class="flex-1 py-2.5 rounded-lg bg-green-500/20 text-green-300 hover:bg-green-500/30 transition font-medium text-sm">Know It</button>
      </div>

      <!-- Navigation -->
      <div class="flex justify-between">
        <button onclick="fcNav(-1)" class="px-4 py-2 rounded-lg bg-surface-lighter hover:bg-surface-light transition text-sm">Previous</button>
        <button onclick="fcNav(0)" class="px-4 py-2 rounded-lg bg-surface-lighter hover:bg-surface-light transition text-sm">Shuffle</button>
        <button onclick="fcNav(1)" class="px-4 py-2 rounded-lg bg-surface-lighter hover:bg-surface-light transition text-sm">Next</button>
      </div>
      ` : `<p class="text-gray-400 text-center py-12">No cards match your filter.</p>`}
    </div>
  `;
}

function fcMark(id, known) {
  const p = Progress.data;
  if (!p.flashcards.seen.includes(id)) p.flashcards.seen.push(id);
  if (known && !p.flashcards.known.includes(id)) p.flashcards.known.push(id);
  if (!known) p.flashcards.known = p.flashcards.known.filter(x => x !== id);
  Progress.save();
  fcNav(1);
}

function fcNav(dir) {
  const cards = getFilteredFlashcards();
  if (!cards.length) return;
  State.flashcards.flipped = false;
  if (dir === 0) {
    // Prioritize unseen / unknown cards
    const p = Progress.data;
    const unknown = cards.filter(c => !p.flashcards.known.includes(c.id));
    const pool = unknown.length ? unknown : cards;
    const randomIdx = Math.floor(Math.random() * pool.length);
    State.flashcards.currentIndex = cards.indexOf(pool[randomIdx]);
  } else {
    State.flashcards.currentIndex = (State.flashcards.currentIndex + dir + cards.length) % cards.length;
  }
  render();
}

// ========== PRACTICE PROBLEMS ==========
function renderProblems() {
  const prob = DATA.problems[State.problems.currentIndex];
  const p = Progress.data;

  return `
    <div class="max-w-3xl mx-auto slide-in">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold">Practice Problems</h2>
        <span class="text-sm text-gray-400">${State.problems.currentIndex + 1} / ${DATA.problems.length}</span>
      </div>

      <!-- Problem list -->
      <div class="flex flex-wrap gap-2 mb-6">
        ${DATA.problems.map((pr, i) => `
          <button onclick="selectProblem(${i})" class="px-3 py-1 rounded-lg text-sm ${i === State.problems.currentIndex ? 'bg-modern text-white' : 'bg-surface-lighter text-gray-300 hover:bg-surface-light'} ${p.problems.completed.includes(pr.id) ? 'ring-1 ring-green-500' : ''} transition">
            ${i + 1}
          </button>
        `).join('')}
      </div>

      ${prob ? `
      <div class="bg-surface-light rounded-xl p-6 border border-gray-700 mb-4">
        <div class="flex items-center gap-2 mb-3">
          <span class="px-2 py-0.5 rounded text-xs font-medium ${prob.category === 'cache' ? 'bg-cache/20 text-cache-light' : 'bg-modern/20 text-modern-light'}">${prob.category === 'cache' ? 'Cache' : 'Modern Solutions'}</span>
          <span class="text-xs text-gray-500">${prob.type.replace(/-/g, ' ')}</span>
        </div>
        <h3 class="text-lg font-semibold mb-3">${escHtml(prob.title)}</h3>
        <p class="text-sm text-gray-300 whitespace-pre-line mb-6">${escHtml(prob.problem)}</p>

        <!-- Steps -->
        <div class="space-y-3">
          ${prob.steps.map((step, i) => {
            const stepKey = `${prob.id}-${i}`;
            const revealed = State.problems.revealedSteps.has(stepKey);
            return `
            <div class="bg-surface rounded-lg p-4 border border-gray-600">
              <div class="flex justify-between items-start">
                <p class="text-sm font-medium">Step ${i + 1}: ${escHtml(step.text)}</p>
                ${!revealed ? `<button onclick="revealStep('${stepKey}')" class="ml-3 shrink-0 px-3 py-1 bg-modern/20 text-modern-light rounded text-xs hover:bg-modern/30 transition">Show</button>` : ''}
              </div>
              ${revealed ? `<p class="mt-2 text-sm text-green-300 font-mono">${escHtml(step.answer)}</p>` : ''}
            </div>`;
          }).join('')}
        </div>

        <!-- Final answer -->
        <div class="mt-4">
          ${State.problems.revealedSteps.has(`${prob.id}-final`) ? `
          <div class="bg-green-500/10 border border-green-700/50 rounded-lg p-4">
            <h4 class="font-semibold text-green-400 mb-2">Final Answer</h4>
            <p class="text-sm text-green-200">${escHtml(prob.finalAnswer)}</p>
          </div>
          <button onclick="completeProblem(${prob.id})" class="w-full mt-3 py-2 rounded-lg bg-green-500/20 text-green-300 hover:bg-green-500/30 transition text-sm font-medium ${p.problems.completed.includes(prob.id) ? 'opacity-50' : ''}">
            ${p.problems.completed.includes(prob.id) ? 'Completed' : 'Mark as Completed'}
          </button>
          ` : `
          <button onclick="revealStep('${prob.id}-final')" class="w-full py-3 rounded-lg bg-modern hover:bg-modern-dark text-white font-medium transition text-sm">Show Final Answer</button>
          `}
        </div>
      </div>

      <!-- Navigation -->
      <div class="flex justify-between">
        <button onclick="selectProblem(${Math.max(0, State.problems.currentIndex - 1)})" class="px-4 py-2 rounded-lg bg-surface-lighter hover:bg-surface-light transition text-sm">Previous</button>
        <button onclick="selectProblem(${Math.min(DATA.problems.length - 1, State.problems.currentIndex + 1)})" class="px-4 py-2 rounded-lg bg-surface-lighter hover:bg-surface-light transition text-sm">Next</button>
      </div>
      ` : ''}
    </div>
  `;
}

function revealStep(key) {
  State.problems.revealedSteps.add(key);
  render();
}

function selectProblem(index) {
  State.problems.currentIndex = index;
  State.problems.revealedSteps = new Set();
  render();
}

function completeProblem(id) {
  const p = Progress.data;
  if (!p.problems.completed.includes(id)) {
    p.problems.completed.push(id);
    Progress.save();
  }
  render();
}

// ========== EVENT LISTENERS ==========
function attachEventListeners() {
  // Oral simulator
  const revealBtn = document.getElementById('reveal-btn');
  if (revealBtn) {
    revealBtn.addEventListener('click', () => {
      document.getElementById('answer-area').classList.add('show');
      revealBtn.classList.add('hidden');
    });
  }

  const hintsBtn = document.getElementById('show-hints-btn');
  if (hintsBtn) {
    hintsBtn.addEventListener('click', () => {
      document.getElementById('hints-area').classList.toggle('hidden');
    });
  }

  // Oral filters
  const oralCatFilter = document.getElementById('oral-cat-filter');
  if (oralCatFilter) {
    oralCatFilter.addEventListener('change', (e) => {
      State.oral.filter = e.target.value;
      State.oral.currentIndex = 0;
      render();
    });
  }
  const oralDiffFilter = document.getElementById('oral-diff-filter');
  if (oralDiffFilter) {
    oralDiffFilter.addEventListener('change', (e) => {
      State.oral.difficultyFilter = e.target.value;
      State.oral.currentIndex = 0;
      render();
    });
  }

  // Concept filter
  const conceptFilter = document.getElementById('concept-filter');
  if (conceptFilter) {
    conceptFilter.addEventListener('change', (e) => {
      State.concepts.filter = e.target.value;
      State.concepts.expanded = null;
      render();
    });
  }

  // Concept toggles
  document.querySelectorAll('.concept-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      State.concepts.expanded = State.concepts.expanded === id ? null : id;
      render();
    });
  });

  // Flashcard filter
  const fcFilter = document.getElementById('fc-filter');
  if (fcFilter) {
    fcFilter.addEventListener('change', (e) => {
      State.flashcards.filter = e.target.value;
      State.flashcards.currentIndex = 0;
      State.flashcards.flipped = false;
      render();
    });
  }

  // Flashcard flip
  const flipCard = document.getElementById('flip-card');
  if (flipCard) {
    flipCard.addEventListener('click', () => {
      State.flashcards.flipped = !State.flashcards.flipped;
      flipCard.classList.toggle('flipped');
    });
  }
}

// ========== UTILITIES ==========
function escHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ========== INIT ==========
Progress.load();
initNav();
switchMode('dashboard');
