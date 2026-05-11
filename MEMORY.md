# ACA Project Memory

## Student Info
- **Student:** Pham Hoang Phi (Hoang Phi)
- **Course:** Advanced Computer Architectures (IPPV131-K2)
- **University:** University of Debrecen
- **Professor:** Dr. Imre Varga (Varga Imre)

## Exam Info
- **Format:** Oral discussion — professor checks understanding of operation/logic, not just memorization
- **Focus topics:** Modern Solutions + Cache (these are the important chapters)
- **NOT important:** "Other architectures" chapter (Intel Core i9, Ryzen, MIPS, SPARC, etc.)
- **Exam date:** TBD — professor will announce dates later (email from 5/5/2026)

## Files
- `ACA.pdf` — original lecture slides (142 slides)
- `ACA.md` — full markdown conversion of the PDF (created 2026-05-08)

## Focus Topics for Exam Prep (from slides)
### Modern Solutions (slides ~48-106)
- Parallelism (bit, data, instruction, task, process level)
- Flynn's taxonomy (SISD, SIMD, MISD, MIMD)
- Pipelining (5 stages: IF, ID, EX, MEM, WB)
- Hazards (data: RAW/WAR/WAW, structural, control)
- Hazard handling (bubble/stall, result forwarding, OoOE, register renaming)
- Speculative execution & branch prediction (static, dynamic 1-bit/2-bit)
- Superscalar processors
- VLIW processors
- Vector processors (MMX, SSE, AVX, Neon)
- Loop dependency & loop unrolling
- Hyper-threading (SMT)
- Multi-processor/multi-core systems
- GPU (architecture, GPGPU, CPU vs GPU)
- FPGA, NUMA/cluster
- Performance equation (T = NI x eCPI x 1/f)
- Amdahl's law: S(N) = 1 / (A + (1-A)/N)

### Cache (slides ~107-126)
- Locality principles (spatial, temporal)
- Cache structure (line/block, tag, flags)
- Cache hit vs miss
- Associativity (direct-mapped, fully associative, N-way set-associative)
- Replacement policies (random, LRU, not most recently used)
- Write policies (write-through, write-back, dirty bit)
- Address structure (tag, index, offset) + calculations
- Cache hierarchy (L1/L2/L3)
- Cache coherence (invalidation-based, update-based)
- MESI protocol (Modified, Exclusive, Shared, Invalid)
- Effect of cache on programming (array traversal, matrix row vs column)

## Planned Study Materials (TODO)
- [ ] Focused study guide (Modern Solutions + Cache only, oral-exam style)
- [ ] Oral exam simulator (interactive HTML app with Q&A practice)
- [ ] Practice problems (cache calculations, pipeline diagrams, Amdahl's law)
