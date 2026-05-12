# Plan: Multiple Choice Mini Tests

## Why MCQ Tests?

The current app has: oral Q&A (open-ended), flashcards (recall), and calculation problems.
What's missing: **quick self-assessment** — a way to test yourself in 2-3 minutes and see a score.

For oral exam prep, MCQs help with:
- Quickly identifying knowledge gaps across topics
- Testing understanding of distinctions (e.g., "which hazard is this?", "which policy does X?")
- Building confidence before the real exam
- Revision after studying a topic — immediate feedback loop

## Content Analysis

Current content that MCQs can be derived from:

| Source | Count | MCQ potential |
|--------|-------|---------------|
| Oral questions (answers + key points) | 43 | HIGH — each answer has 4-6 key points that become wrong/right options |
| Flashcards (comparisons especially) | 30 | HIGH — 10 comparison cards = natural "which one does X?" questions |
| Concepts (key points) | 18 (94 key points) | MEDIUM — key points can be shuffled between concepts |
| Problems (steps + answers) | 8 | LOW — calculation-based, harder to make MCQ |

**Estimated MCQ yield: ~120-150 questions** across all topics.

## Question Types (6 types)

### Type 1: "Which is correct?"
> Q: Which of the following is TRUE about pipelining?
> A) It makes each instruction faster
> B) It increases throughput to 1 instruction/cycle [correct]
> C) It eliminates all hazards
> D) It requires multiple ALUs

Source: oral answers, concept key points

### Type 2: "Match the term"
> Q: What does RAW stand for in pipeline hazards?
> A) Read And Write
> B) Read After Write [correct]
> C) Register Allocation Width
> D) Random Access Window

Source: definitions, abbreviations from flashcards and concepts

### Type 3: "Compare/distinguish"
> Q: Which is an advantage of write-back over write-through cache?
> A) RAM always has latest data
> B) Simpler hardware
> C) Faster writes because most only touch cache [correct]
> D) No cache coherence issues

Source: comparison flashcards (10 cards = 10+ questions each)

### Type 4: "Identify the scenario"
> Q: Instruction 1: ADD r1, r2, r3 / Instruction 2: SUB r4, r1, r5 — What hazard is this?
> A) WAR (Write After Read)
> B) WAW (Write After Write)
> C) RAW (Read After Write) [correct]
> D) Structural hazard

Source: oral questions about hazards, MESI, branch prediction

### Type 5: "Calculate/apply"
> Q: A 16KB 4-way cache with 64B blocks has how many sets?
> A) 32
> B) 64 [correct]
> C) 128
> D) 256

Source: problem steps, cache address formulas

### Type 6: "What happens next?" (MESI, pipeline, branch prediction)
> Q: In MESI protocol, if Core A has a line in Exclusive state and Core B reads it, both become:
> A) Modified
> B) Invalid
> C) Shared [correct]
> D) Exclusive

Source: MESI transitions, pipeline stage sequences

## Distribution Plan per Topic

### Modern Solutions (~75 MCQs)
| Topic | Target MCQs | Notes |
|-------|-------------|-------|
| Parallelism & Flynn's | 8 | 4 types of Flynn, 5 levels of parallelism |
| Pipelining & Hazards | 15 | Richest topic — stages, hazards, solutions |
| OoO Execution & Renaming | 6 | Process steps, WAR/WAW vs RAW |
| Branch Prediction | 8 | Static vs dynamic, 1-bit vs 2-bit states |
| Superscalar & VLIW | 8 | Comparison-heavy, loop unrolling |
| Vector/SIMD | 8 | MMX/SSE/AVX evolution, loop dependency |
| Multi-core & GPU | 10 | CPU vs GPU, SMT, homogeneous/heterogeneous |
| FPGA & NUMA | 4 | Fewer source material |
| Performance | 8 | Amdahl's law calculations, equation components |

### Cache (~55 MCQs)
| Topic | Target MCQs | Notes |
|-------|-------------|-------|
| Why Cache & Locality | 6 | Spatial vs temporal, SRAM vs DRAM |
| Cache Structure | 6 | Lines, tags, flags, hit vs miss |
| Associativity & Replacement | 8 | 3 types + replacement policies |
| Write Policies | 6 | Write-through vs write-back, dirty bit |
| Address Calculations | 8 | Formula application, bit calculations |
| Coherence & MESI | 8 | 4 states, transitions, invalidation vs update |
| Cache & Programming | 3 | Row vs column traversal |

**Total: ~130 MCQs**

## Test Modes

### 1. Mini Test (Quick Quiz)
- **5 questions**, ~2 minutes
- Random from all topics OR filtered by chapter (Modern Solutions / Cache)
- Show score at end + review wrong answers
- "Quick check before class" feeling

### 2. Topic Test
- **8-10 questions** from a single topic
- Accessed from the topic detail page ("Test yourself on this topic")
- Includes mix of difficulty levels
- Shows which subtopics need more work

### 3. Full Mock Test
- **25 questions**, ~10 minutes
- Proportional to topic weight (more pipelining/cache questions)
- Mix of all 6 question types
- Final score + breakdown by topic + weak areas
- Timer (optional, for exam pressure simulation)

### 4. Mistake Review
- Re-test only questions you got wrong previously
- Tracks which MCQs you've answered and your accuracy
- Spaced repetition feel: wrong answers appear more often

## UI/UX Design

### Navigation
- New "Quiz" button in bottom tab bar (between existing tabs)
- Or: add quiz access from dashboard + topic detail pages

### Question Screen
```
[Progress: 3/10]  [Timer: optional]

Q: Which of the following is NOT a pipeline hazard?
   A) RAW (Read After Write)
   B) WAR (Write After Read)
   C) RAR (Read After Read)    <-- correct
   D) WAW (Write After Write)

[Vietnamese translation in gray italic below question]
```

### Answer Feedback (immediate)
- Correct: green highlight + brief "why it's right"
- Wrong: red highlight on your choice + green on correct + explanation
- Vietnamese explanation below English
- "Next" button to proceed

### Results Screen
```
Score: 8/10 (80%)

[topic breakdown bar chart]
Pipelining: 3/3
Cache: 2/3
MESI: 2/2
Performance: 1/2  <-- "Review this topic"

[Review Wrong Answers] [Try Again] [Back to Dashboard]
```

## Data Structure

```javascript
// In js/data-mcq.js
const MCQ = {
  questions: [
    {
      id: 1,
      topic: "pipelining",        // maps to TOPICS[].id
      type: "correct-statement",   // question type
      difficulty: "easy",
      question: "Which of the following is TRUE about pipelining?",
      questionVi: "Dieu nao sau day DUNG ve pipeline?",
      options: [
        { text: "It makes each instruction execute faster", vi: "..." },
        { text: "It increases throughput to 1 instruction per cycle", vi: "..." },
        { text: "It eliminates all data hazards", vi: "..." },
        { text: "It requires multiple ALUs", vi: "..." }
      ],
      correct: 1,  // index of correct option (0-based)
      explanation: "Pipeline does NOT speed up individual instructions...",
      explanationVi: "Pipeline KHONG lam nhanh tung lenh rieng le..."
    },
    // ...
  ]
};
```

## Progress Tracking

```javascript
// Added to existing Progress system
Progress.data.mcq = {
  answered: { [questionId]: true/false },  // last answer correct?
  history: [],   // recent test results: { date, mode, score, total, topicBreakdown }
  streak: 0      // consecutive correct answers (gamification)
};
```

## Implementation Order

### Phase 1: Core MCQ engine + Mini Test (implement first)
1. Create `js/data-mcq.js` with ~50 questions covering the most important topics
2. Add MCQ rendering + answer checking to `app.js`
3. Add "Quick Quiz" access from dashboard
4. Score screen with topic breakdown
5. Vietnamese translations for all questions

### Phase 2: Expand questions + Topic Test
6. Add remaining ~80 questions to reach full coverage
7. Add "Test yourself" button on each topic detail page
8. Topic-specific question filtering

### Phase 3: Full Mock Test + Review
9. Full 25-question mock test mode with timer
10. Wrong answer tracking + review mode
11. History of past test scores (progress over time)

## Files to Create/Modify

| File | Action | Purpose |
|------|--------|---------|
| `js/data-mcq.js` | CREATE | All MCQ questions + Vietnamese |
| `js/app.js` | MODIFY | Add quiz rendering, state, scoring |
| `index.html` | MODIFY | Add script tag, maybe quiz nav button |
| `js/translations-vi.js` | NO CHANGE | MCQ Vietnamese is inline in data-mcq.js |

## Question Writing Guidelines

- Every wrong option must be plausible (not obviously wrong)
- Wrong options should be common misconceptions
- Avoid "all of the above" / "none of the above"
- Keep options roughly the same length
- Test understanding, not trivia (matches oral exam style)
- Include at least 1 calculation question per cache topic
- MESI state transitions: draw from the specific transition rules
- For comparisons: swap attributes between the two things being compared
