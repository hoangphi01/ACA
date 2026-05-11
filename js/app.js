// ========== STATE MANAGEMENT ==========
const State = {
  currentMode: 'dashboard',
  currentTopicId: null,
  oral: { currentIndex: 0, filter: 'all', difficultyFilter: 'all', answered: new Set(), correct: new Set() },
  concepts: { filter: 'all', expanded: null },
  flashcards: { currentIndex: 0, filter: 'all', flipped: false, known: new Set(), queue: [] },
  problems: { currentIndex: 0, revealedSteps: new Set() },
  topicDetail: { expandedConcepts: new Set(), expandedOral: new Set(), fcIndex: 0, fcFlipped: false, probIndex: 0, revealedSteps: new Set(), collapsedSections: new Set() }
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

// ========== TOPIC HELPERS ==========
function resetTopicDetailState() {
  State.topicDetail = { expandedConcepts: new Set(), expandedOral: new Set(), fcIndex: 0, fcFlipped: false, probIndex: 0, revealedSteps: new Set(), collapsedSections: new Set() };
}
function getTopicContent(topicId) {
  const topic = TOPICS.find(t => t.id === topicId);
  if (!topic) return { concepts: [], oral: [], flashcards: [], problems: [] };

  const matchingSubcats = Object.entries(SUBCATEGORY_TO_TOPIC)
    .filter(([, tid]) => tid === topicId)
    .map(([subcat]) => subcat);

  return {
    concepts: DATA.concepts.filter(c => matchingSubcats.includes(c.subcategory)),
    oral: DATA.oralQuestions.filter(q => matchingSubcats.includes(q.subcategory)),
    flashcards: DATA.flashcards.filter(f => (f.topic || []).includes(topicId)),
    problems: DATA.problems.filter(p => p.topic === topicId)
  };
}

function getTopicProgress(topicId) {
  const content = getTopicContent(topicId);
  const p = Progress.data;
  const oralDone = content.oral.filter(q => p.oral.answered.includes(q.id)).length;
  const fcKnown = content.flashcards.filter(f => p.flashcards.known.includes(f.id)).length;
  const probDone = content.problems.filter(pr => p.problems.completed.includes(pr.id)).length;
  const total = content.oral.length + content.flashcards.length + content.problems.length;
  const done = oralDone + fcKnown + probDone;
  return { oralDone, oralTotal: content.oral.length, fcKnown, fcTotal: content.flashcards.length, probDone, probTotal: content.problems.length, total, done, pct: total ? Math.round((done / total) * 100) : 0 };
}

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
  buildSidebarTopics();
}

function buildSidebarTopics() {
  const modernContainer = document.getElementById('sidebar-modern-topics');
  const cacheContainer = document.getElementById('sidebar-cache-topics');
  if (!modernContainer || !cacheContainer) return;

  TOPICS.forEach(topic => {
    const container = topic.chapter === 'modern-solutions' ? modernContainer : cacheContainer;
    const btn = document.createElement('button');
    btn.className = 'nav-item w-full text-left px-2 py-1.5 rounded text-xs text-gray-400 hover:text-gray-200 hover:bg-surface-lighter transition truncate';
    btn.dataset.mode = 'topic-detail';
    btn.dataset.topicId = topic.id;
    btn.textContent = topic.title;
    btn.addEventListener('click', () => { State.currentTopicId = topic.id; resetTopicDetailState(); switchMode('topic-detail'); });
    container.appendChild(btn);
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
    const isActive = item.dataset.mode === mode || (mode === 'topic-detail' && item.dataset.topicId === State.currentTopicId);
    item.classList.toggle('active', isActive);
    item.classList.toggle('border-transparent', !isActive);
  });
  // Expand/collapse sidebar topic sublists
  const modernTopics = document.getElementById('sidebar-modern-topics');
  const cacheTopics = document.getElementById('sidebar-cache-topics');
  if (modernTopics) modernTopics.classList.toggle('hidden', mode !== 'topics-modern' && !(mode === 'topic-detail' && TOPICS.find(t => t.id === State.currentTopicId)?.chapter === 'modern-solutions'));
  if (cacheTopics) cacheTopics.classList.toggle('hidden', mode !== 'topics-cache' && !(mode === 'topic-detail' && TOPICS.find(t => t.id === State.currentTopicId)?.chapter === 'cache'));

  // Update bottom tabs
  document.querySelectorAll('.bottom-tab').forEach(tab => {
    const isActive = tab.dataset.mode === mode || (mode === 'topics-cache' && tab.dataset.mode === 'topics-modern') || (mode === 'topic-detail' && tab.dataset.mode === 'topics-modern');
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
    case 'topics-modern': content.innerHTML = renderTopicList('modern-solutions'); break;
    case 'topics-cache': content.innerHTML = renderTopicList('cache'); break;
    case 'topic-detail': content.innerHTML = renderTopicDetail(State.currentTopicId); break;
  }
  attachEventListeners();
  window.scrollTo(0, 0);
}

// ========== TOPIC LIST VIEW ==========
function renderTopicList(chapter) {
  const topics = TOPICS.filter(t => t.chapter === chapter);
  const isModern = chapter === 'modern-solutions';
  const color = isModern ? 'modern' : 'cache';
  const title = isModern ? 'Modern Solutions' : 'Cache';

  return `
    <div class="max-w-4xl mx-auto slide-in">
      <div class="mb-6">
        <h2 class="text-2xl font-bold mb-1">${title}</h2>
        <p class="text-gray-400 text-sm">Pick a topic to study all related content in one place</p>
      </div>
      <div class="grid gap-3 sm:grid-cols-2">
        ${topics.map(topic => {
          const prog = getTopicProgress(topic.id);
          const content = getTopicContent(topic.id);
          const itemCount = content.concepts.length + content.oral.length + content.flashcards.length + content.problems.length;
          return `
          <button onclick="State.currentTopicId='${topic.id}'; resetTopicDetailState(); switchMode('topic-detail')" class="bg-surface-light rounded-xl p-5 border border-gray-700 hover:border-${color} transition text-left group">
            <div class="flex items-start justify-between mb-2">
              <h3 class="font-semibold group-hover:text-${color}-light transition text-sm">${topic.title}</h3>
              <span class="text-xs font-bold text-${color}-light ml-2 shrink-0">${prog.pct}%</span>
            </div>
            <p class="text-xs text-gray-400 mb-3">${topic.description}</p>
            <div class="flex gap-3 text-[10px] text-gray-500 mb-2">
              ${content.concepts.length ? `<span>${content.concepts.length} concepts</span>` : ''}
              ${content.oral.length ? `<span>${content.oral.length} oral Q</span>` : ''}
              ${content.flashcards.length ? `<span>${content.flashcards.length} cards</span>` : ''}
              ${content.problems.length ? `<span>${content.problems.length} problems</span>` : ''}
            </div>
            <div class="w-full bg-surface rounded-full h-1.5">
              <div class="progress-fill bg-${color} rounded-full h-1.5" style="width: ${prog.pct}%"></div>
            </div>
          </button>`;
        }).join('')}
      </div>
    </div>
  `;
}

// ========== TOPIC DETAIL VIEW ==========
function toggleTopicSection(section) {
  if (State.topicDetail.collapsedSections.has(section)) {
    State.topicDetail.collapsedSections.delete(section);
  } else {
    State.topicDetail.collapsedSections.add(section);
  }
  render();
}

function retryOral(id) {
  const p = Progress.data;
  p.oral.answered = p.oral.answered.filter(x => x !== id);
  p.oral.correct = p.oral.correct.filter(x => x !== id);
  State.topicDetail.expandedOral.delete(id);
  Progress.save();
  render();
}

function renderTopicDetail(topicId) {
  const topic = TOPICS.find(t => t.id === topicId);
  if (!topic) return '<p class="text-gray-400 text-center py-12">Topic not found.</p>';
  const content = getTopicContent(topicId);
  const prog = getTopicProgress(topicId);
  const isModern = topic.chapter === 'modern-solutions';
  const color = isModern ? 'modern' : 'cache';
  const p = Progress.data;
  const td = State.topicDetail;
  const collapsed = td.collapsedSections;

  // Helper for section headers
  function sectionHeader(key, icon, label, count, doneCount) {
    const isCollapsed = collapsed.has(key);
    const doneLabel = doneCount !== undefined ? `<span class="ml-auto text-xs ${doneCount === count ? 'text-green-400' : 'text-gray-500'}">${doneCount}/${count} done</span>` : '';
    return `
      <button onclick="toggleTopicSection('${key}')" class="w-full flex items-center gap-2 mb-3 group">
        <svg class="w-4 h-4 text-gray-400 transition shrink-0 ${isCollapsed ? '-rotate-90' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
        ${icon}
        <h3 class="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
          ${label} <span class="text-gray-600">(${count})</span>
        </h3>
        ${doneLabel}
      </button>`;
  }

  let html = `<div class="max-w-3xl mx-auto slide-in">`;

  // Header
  html += `
    <div class="mb-6">
      <button onclick="switchMode('${isModern ? 'topics-modern' : 'topics-cache'}')" class="text-sm text-${color}-light hover:underline mb-2 inline-flex items-center gap-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        ${isModern ? 'Modern Solutions' : 'Cache'}
      </button>
      <h2 class="text-xl font-bold">${topic.title}</h2>
      <p class="text-sm text-gray-400 mt-1">${topic.description}</p>
      <div class="mt-3 flex items-center gap-3">
        <div class="flex-1 bg-surface rounded-full h-2">
          <div class="progress-fill bg-${color} rounded-full h-2" style="width: ${prog.pct}%"></div>
        </div>
        <span class="text-sm font-bold text-${color}-light">${prog.pct}%</span>
      </div>
    </div>`;

  // Section 1: Concepts
  if (content.concepts.length) {
    const conceptsCollapsed = collapsed.has('concepts');
    html += `
    <div class="mb-6">
      ${sectionHeader('concepts', '<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>', 'Key Concepts', content.concepts.length)}
      ${!conceptsCollapsed ? `<div class="space-y-2">
        ${content.concepts.map(c => {
          const isExpanded = td.expandedConcepts.has(c.id);
          return `
          <div class="bg-surface-light rounded-xl border border-gray-700 overflow-hidden">
            <button class="topic-concept-toggle w-full p-4 flex items-center justify-between text-left hover:bg-surface-lighter transition" data-id="${c.id}">
              <h4 class="font-medium text-sm">${escHtml(c.title)}</h4>
              <svg class="w-4 h-4 text-gray-400 transition shrink-0 ml-2 ${isExpanded ? 'rotate-180' : ''}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
            </button>
            ${isExpanded ? `
            <div class="px-4 pb-4 border-t border-gray-700">
              <p class="text-sm text-gray-300 mt-3 mb-1">${escHtml(c.explanation)}</p>
              ${VI.concepts[c.id] ? `<p class="text-xs text-gray-500 italic mb-3">${escHtml(VI.concepts[c.id].explanation)}</p>` : '<div class="mb-3"></div>'}
              <ul class="space-y-1 mb-3">
                ${c.keyPoints.map(kp => `<li class="text-sm flex gap-2"><span class="text-${color} mt-0.5">-</span> ${escHtml(kp)}</li>`).join('')}
              </ul>
              ${c.diagram ? `<pre class="bg-surface p-3 rounded-lg text-xs text-green-300 overflow-x-auto">${escHtml(c.diagram)}</pre>` : ''}
            </div>` : ''}
          </div>`;
        }).join('')}
      </div>` : ''}
    </div>`;
  }

  // Section 2: Oral Questions
  if (content.oral.length) {
    const oralCollapsed = collapsed.has('oral');
    const oralDoneCount = content.oral.filter(q => p.oral.answered.includes(q.id)).length;
    html += `
    <div class="mb-6">
      ${sectionHeader('oral', '<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>', 'Oral Questions', content.oral.length, oralDoneCount)}
      ${!oralCollapsed ? `<div class="space-y-3">
        ${content.oral.map(q => {
          const isAnswered = p.oral.answered.includes(q.id);
          const isCorrect = p.oral.correct.includes(q.id);
          const isExpanded = td.expandedOral.has(q.id);
          return `
          <div class="bg-surface-light rounded-xl border border-gray-700 p-4">
            <div class="flex items-center gap-2 mb-2">
              <span class="px-2 py-0.5 rounded text-xs font-semibold badge-${q.difficulty}">${q.difficulty}</span>
              ${isAnswered ? `<span class="text-xs ${isCorrect ? 'text-green-400' : 'text-red-400'}">${isCorrect ? 'Got it' : 'Review'}</span>` : ''}
              ${isAnswered ? `<button onclick="retryOral(${q.id})" class="text-xs text-gray-500 hover:text-gray-300 ml-auto transition">Try Again</button>` : ''}
            </div>
            <p class="text-sm font-medium mb-1">${escHtml(q.question)}</p>
            ${VI.oral[q.id] ? `<p class="text-xs text-gray-500 italic mb-3">${escHtml(VI.oral[q.id].question)}</p>` : '<div class="mb-3"></div>'}
            ${!isExpanded ? `
            <button onclick="State.topicDetail.expandedOral.add(${q.id}); render()" class="w-full py-2 rounded-lg bg-${color}/20 text-${color}-light hover:bg-${color}/30 transition text-sm font-medium">Reveal Answer</button>
            ` : `
            <div class="mt-2 p-3 bg-surface rounded-lg border border-gray-600 mb-3">
              <div class="flex flex-wrap gap-1.5 mb-3">
                ${q.keyPoints.map(kp => `<span class="px-2 py-0.5 bg-${color}/10 text-${color}-light rounded text-xs">${escHtml(kp)}</span>`).join('')}
              </div>
              <p class="text-sm leading-relaxed whitespace-pre-line">${escHtml(q.answer)}</p>
              ${VI.oral[q.id] ? viBlock(VI.oral[q.id].answer) : ''}
            </div>
            ${!isAnswered ? `
            <div class="flex gap-2">
              <button onclick="markOral(${q.id}, false)" class="flex-1 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition text-xs font-medium">Needs Practice</button>
              <button onclick="markOral(${q.id}, true)" class="flex-1 py-2 rounded-lg bg-green-500/20 text-green-300 hover:bg-green-500/30 transition text-xs font-medium">Got It</button>
            </div>` : ''}
            `}
          </div>`;
        }).join('')}
      </div>` : ''}
    </div>`;
  }

  // Section 3: Flashcards
  if (content.flashcards.length) {
    const fcCollapsed = collapsed.has('flashcards');
    const fcDoneCount = content.flashcards.filter(f => p.flashcards.known.includes(f.id)).length;
    html += `
    <div class="mb-6">
      ${sectionHeader('flashcards', '<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>', 'Flashcards', content.flashcards.length, fcDoneCount)}`;
    if (!fcCollapsed) {
      const fcIdx = Math.min(td.fcIndex, content.flashcards.length - 1);
      const card = content.flashcards[fcIdx];
      html += `
      <div>
        <div class="text-xs text-gray-500 mb-2 text-center">${fcIdx + 1} / ${content.flashcards.length}</div>
        <div class="flip-card cursor-pointer mb-3 ${td.fcFlipped ? 'flipped' : ''}" id="topic-flip-card" style="min-height: 200px">
          <div class="flip-card-inner relative w-full h-full" style="min-height: 200px">
            <div class="flip-card-front absolute inset-0 bg-surface-light rounded-xl border border-gray-700 p-5 flex flex-col items-center justify-center">
              <span class="text-xs text-gray-500 mb-2 capitalize">${card.category}</span>
              <h4 class="text-lg font-bold text-center">${escHtml(card.front)}</h4>
              <p class="text-xs text-gray-400 mt-3">Tap to flip</p>
            </div>
            <div class="flip-card-back absolute inset-0 bg-surface-light rounded-xl border border-gray-700 p-5 overflow-y-auto">
              <span class="text-xs text-gray-500 mb-1 block capitalize">${card.category}</span>
              <h4 class="font-semibold text-${color}-light mb-2 text-sm">${escHtml(card.front)}</h4>
              <p class="text-sm leading-relaxed whitespace-pre-line">${escHtml(card.back)}</p>
            ${VI.flashcards[card.id] ? viBlock(VI.flashcards[card.id].back) : ''}
            </div>
          </div>
        </div>
        <div class="flex gap-2 mb-2">
          <button onclick="topicFcMark(${card.id}, false)" class="flex-1 py-2 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition text-xs font-medium">Still Learning</button>
          <button onclick="topicFcMark(${card.id}, true)" class="flex-1 py-2 rounded-lg bg-green-500/20 text-green-300 hover:bg-green-500/30 transition text-xs font-medium">Know It</button>
        </div>
        <div class="flex justify-between">
          <button onclick="topicFcNav(-1)" class="px-3 py-1.5 rounded-lg bg-surface-lighter hover:bg-surface-light transition text-xs">Prev</button>
          <button onclick="topicFcNav(1)" class="px-3 py-1.5 rounded-lg bg-surface-lighter hover:bg-surface-light transition text-xs">Next</button>
        </div>
      </div>`;
    }
    html += `</div>`;
  }

  // Section 4: Problems
  if (content.problems.length) {
    const probCollapsed = collapsed.has('problems');
    const probDoneCount = content.problems.filter(pr => p.problems.completed.includes(pr.id)).length;
    html += `
    <div class="mb-6">
      ${sectionHeader('problems', '<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>', 'Practice Problems', content.problems.length, probDoneCount)}`;
    if (!probCollapsed) {
      const probIdx = Math.min(td.probIndex, content.problems.length - 1);
      const prob = content.problems[probIdx];
      const isCompleted = p.problems.completed.includes(prob.id);
      html += `
      <div>
        ${content.problems.length > 1 ? `
        <div class="flex gap-1.5 mb-3">
          ${content.problems.map((pr, i) => `
            <button onclick="State.topicDetail.probIndex=${i}; State.topicDetail.revealedSteps=new Set(); render()" class="px-2.5 py-1 rounded text-xs ${i === probIdx ? 'bg-'+color+' text-white' : 'bg-surface-lighter text-gray-300'} ${p.problems.completed.includes(pr.id) ? 'ring-1 ring-green-500' : ''} transition">${i + 1}</button>
          `).join('')}
        </div>` : ''}
        <div class="bg-surface-light rounded-xl p-5 border border-gray-700">
          <h4 class="font-semibold mb-2 text-sm">${escHtml(prob.title)}</h4>
          <p class="text-sm text-gray-300 whitespace-pre-line mb-1">${escHtml(prob.problem)}</p>
          ${VI.problems[prob.id] ? `<p class="text-xs text-gray-500 italic whitespace-pre-line mb-4">${escHtml(VI.problems[prob.id].problem)}</p>` : '<div class="mb-4"></div>'}
          <div class="space-y-2">
            ${prob.steps.map((step, i) => {
              const stepKey = `topic-${prob.id}-${i}`;
              const revealed = td.revealedSteps.has(stepKey);
              return `
              <div class="bg-surface rounded-lg p-3 border border-gray-600">
                <div class="flex justify-between items-start">
                  <p class="text-xs font-medium">Step ${i + 1}: ${escHtml(step.text)}</p>
                  ${!revealed ? `<button onclick="State.topicDetail.revealedSteps.add('${stepKey}'); render()" class="ml-2 shrink-0 px-2 py-0.5 bg-${color}/20 text-${color}-light rounded text-xs hover:bg-${color}/30 transition">Show</button>` : ''}
                </div>
                ${revealed ? `<p class="mt-1.5 text-xs text-green-300 font-mono">${escHtml(step.answer)}</p>` : ''}
              </div>`;
            }).join('')}
          </div>
          <div class="mt-3">
            ${td.revealedSteps.has(`topic-${prob.id}-final`) ? `
            <div class="bg-green-500/10 border border-green-700/50 rounded-lg p-3">
              <h4 class="font-semibold text-green-400 mb-1 text-sm">Final Answer</h4>
              <p class="text-xs text-green-200">${escHtml(prob.finalAnswer)}</p>
            </div>
            <button onclick="completeProblem(${prob.id})" class="w-full mt-2 py-2 rounded-lg bg-green-500/20 text-green-300 hover:bg-green-500/30 transition text-xs font-medium ${isCompleted ? 'opacity-50' : ''}">${isCompleted ? 'Completed' : 'Mark as Completed'}</button>
            ` : `
            <button onclick="State.topicDetail.revealedSteps.add('topic-${prob.id}-final'); render()" class="w-full py-2.5 rounded-lg bg-${color} hover:opacity-90 text-white font-medium transition text-sm">Show Final Answer</button>
            `}
          </div>
        </div>
      </div>`;
    }
    html += `</div>`;
  }

  // Next/Prev topic navigation
  const chapterTopics = TOPICS.filter(t => t.chapter === topic.chapter);
  const currentIdx = chapterTopics.findIndex(t => t.id === topicId);
  const prevTopic = currentIdx > 0 ? chapterTopics[currentIdx - 1] : null;
  const nextTopic = currentIdx < chapterTopics.length - 1 ? chapterTopics[currentIdx + 1] : null;
  // If at the end of a chapter, link to the other chapter's first topic
  const otherChapter = topic.chapter === 'modern-solutions' ? 'cache' : 'modern-solutions';
  const otherChapterTopics = TOPICS.filter(t => t.chapter === otherChapter);
  const crossoverTopic = !nextTopic && otherChapterTopics.length ? otherChapterTopics[0] : null;

  html += `
    <div class="flex items-center justify-between mt-8 mb-6 pt-6 border-t border-gray-700">
      ${prevTopic ? `
      <button onclick="State.currentTopicId='${prevTopic.id}'; resetTopicDetailState(); switchMode('topic-detail')" class="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-light border border-gray-700 hover:border-${color} transition text-left max-w-[45%]">
        <svg class="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
        <div class="min-w-0">
          <div class="text-[10px] text-gray-500 uppercase">Previous</div>
          <div class="text-xs font-medium truncate">${prevTopic.title}</div>
        </div>
      </button>` : '<div></div>'}
      ${nextTopic ? `
      <button onclick="State.currentTopicId='${nextTopic.id}'; resetTopicDetailState(); switchMode('topic-detail')" class="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-light border border-gray-700 hover:border-${color} transition text-right max-w-[45%]">
        <div class="min-w-0">
          <div class="text-[10px] text-gray-500 uppercase">Next</div>
          <div class="text-xs font-medium truncate">${nextTopic.title}</div>
        </div>
        <svg class="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </button>` : crossoverTopic ? `
      <button onclick="State.currentTopicId='${crossoverTopic.id}'; resetTopicDetailState(); switchMode('topic-detail')" class="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-light border border-gray-700 hover:border-${otherChapter === 'cache' ? 'cache' : 'modern'} transition text-right max-w-[45%]">
        <div class="min-w-0">
          <div class="text-[10px] text-gray-500 uppercase">Next: ${otherChapter === 'cache' ? 'Cache' : 'Modern Solutions'}</div>
          <div class="text-xs font-medium truncate">${crossoverTopic.title}</div>
        </div>
        <svg class="w-4 h-4 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
      </button>` : '<div></div>'}
    </div>`;

  html += `</div>`;
  return html;
}

// Topic flashcard navigation
function topicFcNav(dir) {
  const content = getTopicContent(State.currentTopicId);
  if (!content.flashcards.length) return;
  State.topicDetail.fcFlipped = false;
  State.topicDetail.fcIndex = (State.topicDetail.fcIndex + dir + content.flashcards.length) % content.flashcards.length;
  render();
}

function topicFcMark(id, known) {
  const p = Progress.data;
  if (!p.flashcards.seen.includes(id)) p.flashcards.seen.push(id);
  if (known && !p.flashcards.known.includes(id)) p.flashcards.known.push(id);
  if (!known) p.flashcards.known = p.flashcards.known.filter(x => x !== id);
  Progress.save();
  topicFcNav(1);
}

// ========== DASHBOARD ==========
function renderDashboard() {
  const p = Progress.data;
  const oralTotal = DATA.oralQuestions.length;
  const oralDone = p.oral.answered.length;
  const fcTotal = DATA.flashcards.length;
  const fcKnown = p.flashcards.known.length;
  const probTotal = DATA.problems.length;
  const probDone = p.problems.completed.length;
  const overallPct = Math.round(((oralDone + fcKnown + probDone) / (oralTotal + fcTotal + probTotal)) * 100) || 0;
  const weakTopics = findWeakTopics();

  // Find "continue studying" topic: first incomplete, or lowest progress
  const continueTopicData = (() => {
    let best = null;
    let bestPct = 101;
    for (const t of TOPICS) {
      const tp = getTopicProgress(t.id);
      if (tp.total > 0 && tp.pct < 100 && tp.pct < bestPct) {
        bestPct = tp.pct;
        best = t;
      }
    }
    return best ? { topic: best, prog: getTopicProgress(best.id) } : null;
  })();

  return `
    <div class="max-w-4xl mx-auto slide-in">
      <div class="mb-8">
        <h2 class="text-2xl font-bold mb-1">Welcome back!</h2>
        <p class="text-gray-400">Advanced Computer Architectures - Oral Exam Prep</p>
      </div>

      ${continueTopicData ? `
      <!-- Continue studying -->
      <button onclick="State.currentTopicId='${continueTopicData.topic.id}'; resetTopicDetailState(); switchMode('topic-detail')" class="w-full bg-gradient-to-r ${continueTopicData.topic.chapter === 'modern-solutions' ? 'from-modern/20 to-modern/5 border-modern/50 hover:border-modern' : 'from-cache/20 to-cache/5 border-cache/50 hover:border-cache'} rounded-xl p-5 mb-6 border text-left transition group">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs text-gray-400 uppercase tracking-wider mb-1">Continue studying</p>
            <h3 class="font-semibold text-sm group-hover:text-white transition">${continueTopicData.topic.title}</h3>
            <p class="text-xs text-gray-400 mt-1">${continueTopicData.prog.done} of ${continueTopicData.prog.total} items completed</p>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-lg font-bold ${continueTopicData.topic.chapter === 'modern-solutions' ? 'text-modern-light' : 'text-cache-light'}">${continueTopicData.prog.pct}%</span>
            <svg class="w-5 h-5 text-gray-400 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </div>
        </div>
        <div class="w-full bg-surface rounded-full h-1.5 mt-3">
          <div class="progress-fill ${continueTopicData.topic.chapter === 'modern-solutions' ? 'bg-modern' : 'bg-cache'} rounded-full h-1.5" style="width: ${continueTopicData.prog.pct}%"></div>
        </div>
      </button>
      ` : ''}

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

      <!-- Topic progress grid -->
      <h3 class="font-semibold mb-3">Topic Progress</h3>
      <div class="grid sm:grid-cols-2 gap-3 mb-6">
        <div>
          <h4 class="text-xs font-semibold text-modern-light uppercase tracking-wider mb-2">Modern Solutions</h4>
          <div class="space-y-1.5">
            ${TOPICS.filter(t => t.chapter === 'modern-solutions').map(t => {
              const tp = getTopicProgress(t.id);
              return `
              <button onclick="State.currentTopicId='${t.id}'; resetTopicDetailState(); switchMode('topic-detail')" class="w-full flex items-center gap-2 bg-surface-light rounded-lg px-3 py-2 border border-gray-700 hover:border-modern transition text-left">
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-medium truncate">${t.title}</p>
                  <div class="w-full bg-surface rounded-full h-1 mt-1">
                    <div class="bg-modern rounded-full h-1 transition-all" style="width:${tp.pct}%"></div>
                  </div>
                </div>
                <span class="text-[10px] font-bold text-modern-light shrink-0">${tp.pct}%</span>
              </button>`;
            }).join('')}
          </div>
        </div>
        <div>
          <h4 class="text-xs font-semibold text-cache-light uppercase tracking-wider mb-2">Cache</h4>
          <div class="space-y-1.5">
            ${TOPICS.filter(t => t.chapter === 'cache').map(t => {
              const tp = getTopicProgress(t.id);
              return `
              <button onclick="State.currentTopicId='${t.id}'; resetTopicDetailState(); switchMode('topic-detail')" class="w-full flex items-center gap-2 bg-surface-light rounded-lg px-3 py-2 border border-gray-700 hover:border-cache transition text-left">
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-medium truncate">${t.title}</p>
                  <div class="w-full bg-surface rounded-full h-1 mt-1">
                    <div class="bg-cache rounded-full h-1 transition-all" style="width:${tp.pct}%"></div>
                  </div>
                </div>
                <span class="text-[10px] font-bold text-cache-light shrink-0">${tp.pct}%</span>
              </button>`;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- Quick access cards -->
      <h3 class="font-semibold mb-3">Mixed Practice</h3>
      <div class="grid md:grid-cols-3 gap-4 mb-6">
        <button onclick="switchMode('oral')" class="bg-surface-light rounded-xl p-4 border border-gray-700 hover:border-modern transition text-left group">
          <h3 class="font-semibold text-sm mb-1 group-hover:text-modern transition">Oral Simulator</h3>
          <p class="text-xs text-gray-400">${oralDone}/${oralTotal} answered</p>
        </button>
        <button onclick="switchMode('flashcards')" class="bg-surface-light rounded-xl p-4 border border-gray-700 hover:border-yellow-500 transition text-left group">
          <h3 class="font-semibold text-sm mb-1 group-hover:text-yellow-400 transition">Flashcards</h3>
          <p class="text-xs text-gray-400">${fcKnown}/${fcTotal} known</p>
        </button>
        <button onclick="switchMode('problems')" class="bg-surface-light rounded-xl p-4 border border-gray-700 hover:border-purple-500 transition text-left group">
          <h3 class="font-semibold text-sm mb-1 group-hover:text-purple-400 transition">Problems</h3>
          <p class="text-xs text-gray-400">${probDone}/${probTotal} solved</p>
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

      <!-- Keyboard shortcuts -->
      <div class="bg-surface-light rounded-xl p-5 border border-gray-700 mb-6">
        <h3 class="font-semibold mb-3">Keyboard Shortcuts</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-400">
          <div><kbd class="px-2 py-0.5 bg-surface rounded text-gray-300">←</kbd> <kbd class="px-2 py-0.5 bg-surface rounded text-gray-300">→</kbd> Previous / Next</div>
          <div><kbd class="px-2 py-0.5 bg-surface rounded text-gray-300">Space</kbd> Reveal answer / Flip card</div>
          <div><kbd class="px-2 py-0.5 bg-surface rounded text-gray-300">N</kbd> or <kbd class="px-2 py-0.5 bg-surface rounded text-gray-300">1</kbd> Still learning / Needs practice</div>
          <div><kbd class="px-2 py-0.5 bg-surface rounded text-gray-300">Y</kbd> or <kbd class="px-2 py-0.5 bg-surface rounded text-gray-300">2</kbd> Know it / Got it</div>
        </div>
      </div>

      <!-- Reset -->
      <div class="text-center">
        <button onclick="resetAll()" class="px-6 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30 transition text-sm font-medium">Reset All Progress</button>
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
        <p class="text-lg font-medium mb-2">${escHtml(q.question)}</p>
        ${VI.oral[q.id] ? `<p class="text-sm text-gray-500 italic mb-4">${escHtml(VI.oral[q.id].question)}</p>` : ''}
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
            ${VI.oral[q.id] ? viBlock(VI.oral[q.id].answer) : ''}
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
              <p class="text-sm text-gray-300 mt-3 mb-1">${escHtml(c.explanation)}</p>
              ${VI.concepts[c.id] ? `<p class="text-xs text-gray-500 italic mb-3">${escHtml(VI.concepts[c.id].explanation)}</p>` : '<div class="mb-3"></div>'}
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
            ${VI.flashcards[card.id] ? viBlock(VI.flashcards[card.id].back) : ''}
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
        <p class="text-sm text-gray-300 whitespace-pre-line mb-1">${escHtml(prob.problem)}</p>
        ${VI.problems[prob.id] ? `<p class="text-xs text-gray-500 italic whitespace-pre-line mb-6">${escHtml(VI.problems[prob.id].problem)}</p>` : '<div class="mb-6"></div>'}

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

  // Topic concept toggles
  document.querySelectorAll('.topic-concept-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      if (State.topicDetail.expandedConcepts.has(id)) {
        State.topicDetail.expandedConcepts.delete(id);
      } else {
        State.topicDetail.expandedConcepts.add(id);
      }
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

  // Flashcard flip (main mode)
  const flipCard = document.getElementById('flip-card');
  if (flipCard) {
    flipCard.addEventListener('click', () => {
      State.flashcards.flipped = !State.flashcards.flipped;
      flipCard.classList.toggle('flipped');
    });
  }

  // Flashcard flip (topic detail mode)
  const topicFlipCard = document.getElementById('topic-flip-card');
  if (topicFlipCard) {
    topicFlipCard.addEventListener('click', () => {
      State.topicDetail.fcFlipped = !State.topicDetail.fcFlipped;
      topicFlipCard.classList.toggle('flipped');
    });
  }
}

// ========== UTILITIES ==========
function escHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function viBlock(text) {
  if (!text) return '';
  return `<div class="mt-2 pt-2 border-t border-gray-700/50"><p class="text-sm leading-relaxed whitespace-pre-line text-gray-400 italic">${escHtml(text)}</p></div>`;
}

// ========== KEYBOARD CONTROLS ==========
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

  if (State.currentMode === 'oral') {
    if (e.key === 'ArrowLeft') { e.preventDefault(); oralNav(-1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); oralNav(1); }
    else if (e.key === ' ') {
      e.preventDefault();
      const revealBtn = document.getElementById('reveal-btn');
      if (revealBtn && !revealBtn.classList.contains('hidden')) {
        document.getElementById('answer-area').classList.add('show');
        revealBtn.classList.add('hidden');
      }
    }
    else if (e.key === '1' || e.key === 'n') {
      const questions = getFilteredOralQuestions();
      const q = questions[State.oral.currentIndex];
      if (q && !Progress.data.oral.answered.includes(q.id)) markOral(q.id, false);
    }
    else if (e.key === '2' || e.key === 'y') {
      const questions = getFilteredOralQuestions();
      const q = questions[State.oral.currentIndex];
      if (q && !Progress.data.oral.answered.includes(q.id)) markOral(q.id, true);
    }
  }

  else if (State.currentMode === 'flashcards') {
    if (e.key === 'ArrowLeft') { e.preventDefault(); fcNav(-1); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); fcNav(1); }
    else if (e.key === ' ') {
      e.preventDefault();
      State.flashcards.flipped = !State.flashcards.flipped;
      const flipCard = document.getElementById('flip-card');
      if (flipCard) flipCard.classList.toggle('flipped');
    }
    else if (e.key === '1' || e.key === 'n') {
      const cards = getFilteredFlashcards();
      const card = cards[State.flashcards.currentIndex];
      if (card) fcMark(card.id, false);
    }
    else if (e.key === '2' || e.key === 'y') {
      const cards = getFilteredFlashcards();
      const card = cards[State.flashcards.currentIndex];
      if (card) fcMark(card.id, true);
    }
  }

  else if (State.currentMode === 'problems') {
    if (e.key === 'ArrowLeft') { e.preventDefault(); selectProblem(Math.max(0, State.problems.currentIndex - 1)); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); selectProblem(Math.min(DATA.problems.length - 1, State.problems.currentIndex + 1)); }
    else if (e.key === ' ') {
      e.preventDefault();
      const prob = DATA.problems[State.problems.currentIndex];
      if (prob) {
        let revealed = false;
        for (let i = 0; i < prob.steps.length; i++) {
          const stepKey = `${prob.id}-${i}`;
          if (!State.problems.revealedSteps.has(stepKey)) {
            revealStep(stepKey);
            revealed = true;
            break;
          }
        }
        if (!revealed && !State.problems.revealedSteps.has(`${prob.id}-final`)) {
          revealStep(`${prob.id}-final`);
        }
      }
    }
  }

  // Topic detail keyboard shortcuts
  else if (State.currentMode === 'topic-detail') {
    const content = getTopicContent(State.currentTopicId);
    if (e.key === ' ') {
      e.preventDefault();
      // Flip flashcard if present
      const topicFlipCard = document.getElementById('topic-flip-card');
      if (topicFlipCard) {
        State.topicDetail.fcFlipped = !State.topicDetail.fcFlipped;
        topicFlipCard.classList.toggle('flipped');
      }
    }
    else if (e.key === 'ArrowLeft' && content.flashcards.length) { e.preventDefault(); topicFcNav(-1); }
    else if (e.key === 'ArrowRight' && content.flashcards.length) { e.preventDefault(); topicFcNav(1); }
    else if ((e.key === '1' || e.key === 'n') && content.flashcards.length) {
      const card = content.flashcards[State.topicDetail.fcIndex];
      if (card) topicFcMark(card.id, false);
    }
    else if ((e.key === '2' || e.key === 'y') && content.flashcards.length) {
      const card = content.flashcards[State.topicDetail.fcIndex];
      if (card) topicFcMark(card.id, true);
    }
  }
});

// ========== RESET ALL ==========
function resetAll() {
  if (confirm('Reset ALL progress and start fresh? This clears all localStorage data and cannot be undone.')) {
    localStorage.clear();
    Progress._data = null;
    Progress.load();
    State.oral = { currentIndex: 0, filter: 'all', difficultyFilter: 'all', answered: new Set(), correct: new Set() };
    State.flashcards = { currentIndex: 0, filter: 'all', flipped: false, known: new Set(), queue: [] };
    State.problems = { currentIndex: 0, revealedSteps: new Set() };
    State.concepts = { filter: 'all', expanded: null };
    State.topicDetail = { expandedConcepts: new Set(), expandedOral: new Set(), fcIndex: 0, fcFlipped: false, probIndex: 0, revealedSteps: new Set(), collapsedSections: new Set() };
    switchMode('dashboard');
  }
}

// ========== INIT ==========
Progress.load();
initNav();
switchMode('dashboard');
