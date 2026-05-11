const DATA = {
  oralQuestions: [
    // ===== MODERN SOLUTIONS =====
    // Parallelism & Flynn's
    {
      id: 1,
      category: "modern-solutions",
      subcategory: "parallelism",
      difficulty: "easy",
      question: "What are the different levels of parallelism in computer architecture?",
      keyPoints: ["bit level", "data level (DLP)", "instruction level (ILP)", "task/thread level (TLP)", "process level"],
      answer: "There are 5 levels: (1) Bit level - operations on all bits simultaneously, (2) Data level (DLP) - same instruction on multiple data at once (SIMD), (3) Instruction level (ILP) - multiple assembly instructions executing in overlapping fashion, (4) Task/thread level (TLP) - parallel execution of instruction groups/threads, (5) Process level - multiple running processes managed by a multiprogrammed OS."
    },
    {
      id: 2,
      category: "modern-solutions",
      subcategory: "parallelism",
      difficulty: "medium",
      question: "Explain Flynn's taxonomy. Give an example for each category.",
      keyPoints: ["SISD", "SIMD", "MISD", "MIMD", "classification by instruction and data streams"],
      answer: "Flynn's taxonomy classifies architectures by number of instruction and data streams: SISD (Single Instruction Single Data) - classical single-core PCs, sequential execution. SIMD (Single Instruction Multiple Data) - vector processors, GPUs, applying one operation to many data elements. MISD (Multiple Instruction Single Data) - rare, used in fault-tolerant systems like space shuttle computers. MIMD (Multiple Instruction Multiple Data) - multicore processors, superscalar processors, each core can execute different instructions on different data."
    },
    // Pipelining
    {
      id: 3,
      category: "modern-solutions",
      subcategory: "pipelining",
      difficulty: "medium",
      question: "Why do we need pipelining? What problem does it solve?",
      keyPoints: ["throughput improvement", "does NOT reduce latency of single instruction", "overlapping execution phases", "faster program execution"],
      answer: "Pipelining allows multiple instructions to be in different stages of execution simultaneously, like an assembly line. It does NOT reduce the execution time (latency) of a single instruction - each still takes the same number of cycles. Instead, it increases throughput - the number of instructions completed per time unit. With a 5-stage pipeline (IF, ID, EX, MEM, WB), after the pipeline is full, ideally one instruction completes every clock cycle instead of every 5 cycles."
    },
    {
      id: 4,
      category: "modern-solutions",
      subcategory: "pipelining",
      difficulty: "medium",
      question: "What are the 5 stages of a RISC pipeline? Explain each briefly.",
      keyPoints: ["IF - instruction fetch", "ID - instruction decode", "EX - execution", "MEM - memory access", "WB - write back"],
      answer: "The 5 stages are: (1) IF (Instruction Fetch) - read the next instruction from memory using the PC register. (2) ID (Instruction Decode) - interpret the opcode, determine operation type, identify registers. (3) EX (Execution) - ALU performs the computation or calculates a memory address for load/store. (4) MEM (Memory Access) - read from or write to data memory (only for load/store instructions). (5) WB (Write Back) - write the result back into the destination register."
    },
    {
      id: 5,
      category: "modern-solutions",
      subcategory: "pipelining",
      difficulty: "hard",
      question: "What are hazards in pipelining? Name all types and explain them.",
      keyPoints: ["data hazard (RAW, WAR, WAW)", "structural hazard", "control hazard", "pipeline assumes sequential execution"],
      answer: "Hazards occur because pipelining violates the sequential execution assumption of von Neumann architecture. Three types: (1) Data hazards - instructions in the pipeline use/modify the same data. RAW (Read After Write/true dependency): instruction needs a result not yet written. WAR (Write After Read/name dependency): instruction overwrites a value still being read. WAW (Write After Write/name dependency): two instructions write to the same destination. (2) Structural hazards - hardware cannot support the combination of instructions in the same cycle (e.g., IF and MEM both need memory). (3) Control hazards - at a branch instruction, the CPU doesn't know which instruction to fetch next."
    },
    {
      id: 6,
      category: "modern-solutions",
      subcategory: "pipelining",
      difficulty: "medium",
      question: "How is a RAW (Read After Write) data hazard handled? Describe multiple solutions.",
      keyPoints: ["pipeline bubble/stall", "result forwarding/bypassing", "OoOE", "register renaming"],
      answer: "RAW hazards can be handled by: (1) Pipeline bubble/stall - insert NOP instructions (bubbles) to delay the dependent instruction until the result is available. Simple but wastes cycles. (2) Result forwarding (bypassing) - forward the output of the EX stage directly to the input of the next instruction's EX stage, bypassing the WB stage. Eliminates the stall entirely for many cases. (3) Out-of-Order Execution - rearrange instruction order so independent instructions fill the gap. (4) Register renaming - eliminate false dependencies (WAR, WAW) by mapping architectural registers to a larger set of physical registers."
    },
    {
      id: 7,
      category: "modern-solutions",
      subcategory: "pipelining",
      difficulty: "medium",
      question: "What is result forwarding (bypassing) and why is it useful?",
      keyPoints: ["output of EX forwarded directly", "avoids waiting for WB", "eliminates bubble for RAW", "hardware shortcut"],
      answer: "Result forwarding is a hardware optimization where the output of the EX (execution) stage of one instruction is forwarded directly to the EX stage of the next dependent instruction, without waiting for the WB (write back) stage. This eliminates the pipeline bubble that would otherwise be needed for RAW data hazards. For example, if 'ADD r1, r2, r3' is followed by 'SUB r4, r5, r1', the result of r1 is available after EX of ADD and can be forwarded immediately to SUB's EX stage instead of waiting 2 more cycles."
    },
    // OoOE & Register Renaming
    {
      id: 8,
      category: "modern-solutions",
      subcategory: "ooo-execution",
      difficulty: "hard",
      question: "How does Out-of-Order Execution (OoOE) work? Describe the process.",
      keyPoints: ["instruction queue", "operand availability", "result queue", "in-order commit", "avoids bubbles"],
      answer: "OoOE executes instructions in a different order than they appear in the program to avoid pipeline bubbles. The process: (1) Instructions are read from memory into an instruction queue. (2) An instruction leaves the queue when its input operands are available (not necessarily in program order). (3) The instruction is executed. (4) The result goes to a result queue. (5) Results are committed (saved to register file) in original program order - a result only leaves the queue when all results of prior instructions are ready. This maintains correct program behavior while maximizing pipeline utilization."
    },
    {
      id: 9,
      category: "modern-solutions",
      subcategory: "ooo-execution",
      difficulty: "hard",
      question: "What is register renaming and what problem does it solve?",
      keyPoints: ["solves WAR and WAW (name dependencies)", "architectural vs hardware registers", "mapping circuit", "enables OoOE"],
      answer: "Register renaming solves name dependencies (WAR and WAW hazards) that prevent out-of-order execution. The problem: the instruction set has limited architectural registers (e.g., r0-r7), so different instructions may need to reuse the same register even when there's no true data dependency. The solution: the CPU has a larger set of hardware/physical registers (e.g., t0-t15), and a mapping circuit dynamically assigns architectural registers to different physical registers. This way, instructions that write to the same architectural register actually write to different physical registers, eliminating false dependencies and enabling safe reordering."
    },
    // Speculative Execution & Branch Prediction
    {
      id: 10,
      category: "modern-solutions",
      subcategory: "branch-prediction",
      difficulty: "medium",
      question: "What is speculative execution and why is it needed?",
      keyPoints: ["control hazard solution", "execute before knowing if needed", "discard if wrong", "avoids pipeline bubbles"],
      answer: "Speculative execution addresses control hazards at branch instructions. Instead of stalling the pipeline until the branch condition is evaluated, the CPU speculatively executes instructions from the predicted branch path. If the prediction is correct, no time is wasted. If wrong, the speculative results are discarded and the correct branch is fetched. Two approaches: (1) Greedy prefetching - execute both branches simultaneously, keep only the correct one. (2) Predictive execution - predict which branch will be taken using branch prediction, execute only that one."
    },
    {
      id: 11,
      category: "modern-solutions",
      subcategory: "branch-prediction",
      difficulty: "hard",
      question: "Explain static vs dynamic branch prediction. How does 2-bit prediction work?",
      keyPoints: ["static: backward jump = taken", "dynamic: runtime history", "1-bit: jump or no jump", "2-bit: strongly/weakly taken/not taken", "branch target buffer"],
      answer: "Static prediction uses a simple rule: backward jumps (loops) are predicted as taken, forward jumps as not taken. Dynamic prediction records runtime history of branch instructions in a Branch Target Buffer (BTB). 1-bit prediction: stores one bit per branch - 'taken' or 'not taken', flips on every misprediction. Problem: loop exits always mispredict. 2-bit prediction: uses 4 states - Strongly Taken, Weakly Taken, Weakly Not Taken, Strongly Not Taken. It takes two consecutive mispredictions to change the prediction direction. This handles loop exit better - one wrong prediction at the end doesn't change the overall 'taken' prediction for next time."
    },
    // Superscalar & VLIW
    {
      id: 12,
      category: "modern-solutions",
      subcategory: "superscalar",
      difficulty: "medium",
      question: "What is a superscalar processor? How does it differ from a simple pipelined processor?",
      keyPoints: ["multiple instructions per clock", "multiple execution units", "ILP + OoOE", "instruction window"],
      answer: "A superscalar processor can finish more than one instruction per clock cycle by having multiple execution units in a single core. Unlike a simple pipelined processor (which achieves at most 1 instruction/cycle throughput), a superscalar can issue 2 or more instructions simultaneously to different execution units. It uses ILP (Instruction Level Parallelism) and OoOE to find independent instructions within an instruction window. The larger the instruction window, the more opportunities to find parallelism. Appropriate compilation can further increase performance."
    },
    {
      id: 13,
      category: "modern-solutions",
      subcategory: "vliw",
      difficulty: "medium",
      question: "What is VLIW? How does it compare to superscalar?",
      keyPoints: ["bundle of parallel instructions", "compiler responsibility", "simple hardware", "complex compiler", "EPIC"],
      answer: "VLIW (Very Long Instruction Word) packs multiple simple instructions into one 'bundle' that execute in parallel. Key difference from superscalar: in VLIW, the compiler (not hardware) decides which instructions run in parallel. This means simpler hardware but requires a specialized compiler. Pros: simpler hardware, shorter clock cycle, higher density of execution units. Cons: slow compilation, non-portable programs (software incompatibility between different VLIW implementations), larger code size due to NOP slots when parallelism can't be found. Intel calls their approach EPIC (Explicitly Parallel Instruction Computing)."
    },
    {
      id: 14,
      category: "modern-solutions",
      subcategory: "vliw",
      difficulty: "hard",
      question: "Given the expression (x-y)*(x+y)/(z*z*8), show how VLIW can speed it up compared to scalar execution.",
      keyPoints: ["identify independent operations", "SUB and ADD and MUL can run in parallel", "6 scalar instructions vs 3 VLIW bundles", "data dependencies limit parallelism"],
      answer: "Scalar needs 6 sequential instructions: SUB r4,r1,r2 / ADD r5,r1,r2 / MUL r6,r4,r5 / MUL r7,r3,r3 / ASL r8,r7,#3 / DIV r9,r6,r8. With VLIW (3 slots): Clock 1: [SUB r4,r1,r2 | ADD r5,r1,r2 | MUL r7,r3,r3] - all independent, use only r1,r2,r3. Clock 2: [MUL r6,r4,r5 | ASL r8,r7,#3 | NOP] - depend on clock 1 results. Clock 3: [DIV r9,r6,r8 | NOP | NOP] - depends on clock 2. This achieves 2x speedup (3 vs 6 cycles). Parallelism is limited by data dependencies."
    },
    // Vector Processors
    {
      id: 15,
      category: "modern-solutions",
      subcategory: "vector-processors",
      difficulty: "medium",
      question: "What are vector processors and how do they achieve parallelism?",
      keyPoints: ["SIMD", "large registers holding multiple data", "one instruction operates on all elements", "MMX, SSE, AVX, Neon"],
      answer: "Vector processors implement SIMD (Single Instruction Multiple Data) parallelism. They use large registers that can store multiple data elements simultaneously. A single instruction operates on all elements in the register at once. For example, instead of adding 10 pairs of numbers one by one (10 iterations), a vector processor loads 10 numbers into one register and 10 into another, then adds them all in one instruction. Examples: x86 has MMX (64-bit), SSE (128-bit), AVX (256-bit), AVX-512 (512-bit). ARM has Neon (128-bit)."
    },
    {
      id: 16,
      category: "modern-solutions",
      subcategory: "vector-processors",
      difficulty: "medium",
      question: "Explain the evolution of SIMD extensions in x86: MMX, SSE, AVX, AVX-512.",
      keyPoints: ["register size growth", "MMX 64-bit shared with FPU", "SSE 128-bit dedicated", "AVX 256-bit", "AVX-512 512-bit", "register hierarchy"],
      answer: "MMX (1997): 64-bit registers (MM0-MM7), 8 pieces, integers only. Shared with FPU registers (couldn't use both). SSE: 128-bit dedicated registers (XMM0-XMM15), 8 or 16 pieces, 70 new instructions, primarily float (4x32-bit). SSE2 added integer support (2x64, 4x32, 8x16, 16x8). AVX/AVX2: 256-bit registers (YMM0-YMM15), int and float. AVX-512: 512-bit registers (ZMM0-ZMM31), 32 pieces. They nest hierarchically: ZMM contains YMM contains XMM contains MM."
    },
    {
      id: 17,
      category: "modern-solutions",
      subcategory: "vector-processors",
      difficulty: "hard",
      question: "What is loop dependency? Which types are vectorizable and which are not?",
      keyPoints: ["RAW non-vectorizable", "WAR vectorizable", "RAR vectorizable", "WAW non-vectorizable", "iteration dependency matters"],
      answer: "Loop dependency refers to data dependencies between iterations of a loop that affect whether it can be vectorized (executed with SIMD). RAW (Read After Write) - x[i] = x[i-1] + y[i] - NOT vectorizable because each iteration needs the previous iteration's result. WAR (Write After Read) - x[i] = x[i+1] + y[i] - vectorizable because all reads can happen before writes. RAR (Read after Read) - x[i] = y[i%2] + z[i] - vectorizable because reads don't conflict. WAW (Write after Write) - x[i%2] = y[i] + z[i] - NOT vectorizable because multiple iterations write to the same location."
    },
    // Loop Unrolling
    {
      id: 18,
      category: "modern-solutions",
      subcategory: "loop-unrolling",
      difficulty: "easy",
      question: "What is loop unrolling and why does it improve performance?",
      keyPoints: ["duplicate loop body", "reduce loop overhead", "easier to find independent instructions", "benefits superscalar/vector/VLIW"],
      answer: "Loop unrolling duplicates the loop body multiple times within each iteration. For example, instead of processing 1 element per iteration for 100 iterations, process 4 elements per iteration for 25 iterations. Benefits: (1) Reduces loop control overhead (fewer comparisons and jumps). (2) Makes it easier for superscalar processors to find independent instructions. (3) Enables better use of vector instructions. (4) Benefits VLIW by providing more instructions to fill bundle slots."
    },
    // Hyper-threading
    {
      id: 19,
      category: "modern-solutions",
      subcategory: "hyper-threading",
      difficulty: "medium",
      question: "What is hyper-threading (SMT)? How does it differ from having actual multiple cores?",
      keyPoints: ["Simultaneous MultiThreading", "one core appears as two logical cores", "shared execution resources", "multiple context handlers", "reduces pipeline bubbles"],
      answer: "Hyper-threading is Intel's SMT (Simultaneous MultiThreading) implementation. A single physical core has multiple sets of architectural state (registers, PC) called 'context handlers' but shares the execution units (ALU, FPU, etc.). When one thread stalls (e.g., waiting for memory), another thread can use the execution units, reducing pipeline bubbles. Each physical core appears as two logical cores to the OS. Unlike true multi-core where each core has its own execution units, hyper-threading shares resources - so it provides less speedup than doubling cores, but at much lower cost in chip area."
    },
    // Multi-processor/Multi-core
    {
      id: 20,
      category: "modern-solutions",
      subcategory: "multicore",
      difficulty: "medium",
      question: "What is the difference between multi-core, many-core, homogeneous, and heterogeneous systems?",
      keyPoints: ["multi-core: few cores on one chip", "many-core: thousands of cores", "homogeneous: same type processors", "heterogeneous: different types (CPU+GPU)"],
      answer: "Multi-core: a few independent processing units (cores) on one chip, used in personal computers. Each core typically has its own L1 cache, sometimes L2, and shares L3. Many-core: a large number of cores (up to thousands) on one chip, used in servers and supercomputers. Homogeneous (symmetric): all processors are the same type with shared memory. Heterogeneous: different processor types for different tasks - e.g., ARM big.LITTLE (high-performance + energy-efficient cores), or CPU + GPU, CPU + FPGA, CPU + DSP. Hardware accelerators include FPU, GPU, cryptography accelerators (AES-NI), DSP, FPGA, and AI accelerators."
    },
    // GPU
    {
      id: 21,
      category: "modern-solutions",
      subcategory: "gpu",
      difficulty: "medium",
      question: "Compare CPU and GPU architectures. When would you use each?",
      keyPoints: ["CPU: low latency, few cores, serial", "GPU: high throughput, thousands of cores, parallel", "GPU: deep pipeline >100 stages", "GPGPU for non-graphics computation"],
      answer: "CPU: optimized for low latency and serial operations, shallow pipeline (<30 stages), few powerful cores (up to ~tens), large cache, complex control logic. Best for sequential tasks, OS operations, branching logic. GPU: optimized for high throughput and parallel operations, deep pipeline (>100 stages), thousands of simple cores, small cache per core, hardware thread management. Best for massively parallel tasks (graphics rendering, matrix operations, AI training). GPGPU (General-Purpose GPU) uses GPU for non-graphics computation via OpenCL, CUDA, or MATLAB."
    },
    {
      id: 22,
      category: "modern-solutions",
      subcategory: "gpu",
      difficulty: "hard",
      question: "Describe the architecture of an NVIDIA GPU (Tesla architecture). What are SM, SP, SFU?",
      keyPoints: ["TPC contains SMs", "SM contains SPs, SFUs, shared memory", "SP = streaming/scalar processor", "SFU = special function unit", "hardware thread management"],
      answer: "In NVIDIA Tesla architecture: The GPU contains multiple Texture/Processor Clusters (TPCs). Each TPC has 2 Streaming Multiprocessors (SMs) and a Texture Unit (TU). Each SM contains: a Multithreaded Instruction Unit (MIU) for hardware thread scheduling, a cache, 8 Streaming/Scalar Processors (SPs) which are the actual computation cores, Register Files (RF), 2 Special Function Units (SFUs) for transcendental functions like 1/sqrt(x), and Shared Memory for inter-thread communication. TPCs connect via an Interconnection Network to Raster Operation Processors (ROPs), L2 cache, and VRAM."
    },
    // FPGA & NUMA
    {
      id: 23,
      category: "modern-solutions",
      subcategory: "fpga",
      difficulty: "easy",
      question: "What is an FPGA and what makes it different from a CPU?",
      keyPoints: ["programmable logic circuits", "reconfigurable", "VHDL/Verilog", "parallel by nature", "soft-processor possible"],
      answer: "FPGA (Field-Programmable Gate Array) is a chip containing programmable logical circuits that can be reconfigured after manufacturing. Unlike a CPU which executes sequential instructions, FPGA circuits operate in parallel by nature. They are programmed using hardware description languages (VHDL, Verilog). FPGAs can implement custom hardware accelerators, and can even implement a processor architecture (called a soft-processor). Some modern processors integrate FPGA blocks for flexible acceleration."
    },
    {
      id: 24,
      category: "modern-solutions",
      subcategory: "numa",
      difficulty: "medium",
      question: "What is NUMA architecture? How does it differ from uniform memory access?",
      keyPoints: ["Non-Uniform Memory Access", "each processor has own memory", "can access other's memory", "access time depends on location", "more simultaneous memory operations"],
      answer: "NUMA (Non-Uniform Memory Access) is a memory architecture for multi-processor systems where each processor has its own local memory but can also access other processors' memory. Access time depends on whether the memory is local or remote - local access is fast, remote access goes through an interconnection network and is slower. This contrasts with UMA (Uniform Memory Access) where all processors share one memory with equal access time. NUMA's advantage: multiple memory operations can happen simultaneously on different nodes, improving throughput for well-distributed workloads."
    },
    // Performance
    {
      id: 25,
      category: "modern-solutions",
      subcategory: "performance",
      difficulty: "medium",
      question: "Explain the performance equation T = NI x eCPI x 1/f. What affects each factor?",
      keyPoints: ["T = execution time", "NI = number of instructions", "eCPI = effective cycles per instruction", "f = clock frequency", "FLOPS as measure"],
      answer: "T (program execution time in seconds) = NI x eCPI x 1/f. NI (Number of Instructions): depends on the algorithm, compiler, and ISA. CISC may need fewer instructions than RISC for the same task. eCPI (effective Cycles Per Instruction): depends on instruction mix, microarchitecture (pipelining, superscalar, cache hits/misses). A superscalar processor can achieve eCPI < 1. f (clock frequency in Hz): determined by hardware technology and power/thermal limits. Performance is measured in FLOPS (Floating Point Operations Per Second). To improve performance, reduce NI (better algorithms/compiler), reduce eCPI (better microarchitecture), or increase f (better technology)."
    },
    {
      id: 26,
      category: "modern-solutions",
      subcategory: "performance",
      difficulty: "hard",
      question: "Explain Amdahl's law. If 20% of a program is sequential, what's the maximum speedup with 8 processors?",
      keyPoints: ["S(N) = 1/(A + (1-A)/N)", "A = sequential ratio", "diminishing returns", "sequential part limits speedup"],
      answer: "Amdahl's law states that N processors don't give N times speedup because some portion of the program must run sequentially. Formula: S(N) = 1/(A + (1-A)/N), where A is the sequential ratio (0 to 1) and N is number of processors. With A=0.2 and N=8: S(8) = 1/(0.2 + 0.8/8) = 1/(0.2 + 0.1) = 1/0.3 = 3.33x speedup. Even with infinite processors: S(inf) = 1/0.2 = 5x maximum. This shows the sequential portion fundamentally limits scalability - even a small sequential fraction severely caps the achievable speedup."
    },
    // ===== CACHE =====
    {
      id: 27,
      category: "cache",
      subcategory: "locality",
      difficulty: "easy",
      question: "What are the locality principles? Why are they important for cache?",
      keyPoints: ["spatial locality", "temporal locality", "reason cache works", "sequential execution and arrays", "loops"],
      answer: "Two locality principles justify cache existence: (1) Spatial locality: if a program accesses a memory address, it will likely soon access neighboring addresses too. This occurs due to sequential instruction execution and array traversals. That's why cache loads entire blocks, not single bytes. (2) Temporal locality: if a program accesses a memory address, it will likely access it again soon. This occurs in loops where the same instructions/data are reused. Cache keeps recently accessed data for quick reuse. Without these properties, cache would be useless since there'd be no way to predict what data to keep."
    },
    {
      id: 28,
      category: "cache",
      subcategory: "structure",
      difficulty: "medium",
      question: "Describe the structure and basic operation of a CPU cache.",
      keyPoints: ["lines/blocks", "tag and flags", "cache hit vs miss", "SRAM faster than DRAM", "transparent to programmer"],
      answer: "Cache is an intermediate storage between CPU and RAM, built from fast SRAM. Structure: organized into lines (blocks), each containing: a Block (copy of a memory fragment), a Tag (identifies which memory address the block corresponds to), and Flags (valid bit, dirty bit, etc.). Operation: CPU gives an address to the cache controller. If the tag matches (cache hit), data is returned quickly from the cache. If no tag matches (cache miss), the block is read from RAM into a cache line (possibly overwriting an existing line), then returned to CPU. Cache is transparent - programmers don't directly control it."
    },
    {
      id: 29,
      category: "cache",
      subcategory: "associativity",
      difficulty: "hard",
      question: "Explain the three types of cache associativity. What are the trade-offs?",
      keyPoints: ["direct-mapped: 1 possible location", "fully associative: any location", "N-way set-associative: N possible locations", "trade-off: speed vs hit rate vs complexity"],
      answer: "Direct-mapped: each memory address maps to exactly one cache line. Fast lookup (just check one line) but high conflict miss rate - two addresses mapping to the same line evict each other. Fully associative: any address can go in any cache line. Best hit rate but expensive - must compare tag with ALL lines simultaneously (requires CAM/associative memory). N-way set-associative: compromise - cache divided into sets, each with N lines. An address maps to one set but can use any of the N lines within it. Direct-mapped is 1-way, fully associative is (total lines)-way. Common: 4-way or 8-way, balancing hit rate with lookup complexity."
    },
    {
      id: 30,
      category: "cache",
      subcategory: "replacement",
      difficulty: "easy",
      question: "What replacement policies are used when a cache line must be overwritten?",
      keyPoints: ["random: fast but not effective", "LRU: efficient but complex", "not most recently used: good balance"],
      answer: "When a cache set is full and a new block must be loaded, a replacement policy decides which existing line to evict: (1) Random: pick any line randomly. Fast to implement but not effective - may evict useful data. (2) LRU (Least Recently Used): evict the line that hasn't been accessed for the longest time. Most efficient since it keeps frequently used data, but requires tracking access order (complex hardware). (3) Not Most Recently Used: don't evict the most recently used line, but among the others, any can be chosen. Simpler than full LRU while still effective."
    },
    {
      id: 31,
      category: "cache",
      subcategory: "write-policy",
      difficulty: "medium",
      question: "Compare write-through and write-back cache policies. What is the dirty bit?",
      keyPoints: ["write-through: simultaneous write to cache and RAM", "write-back: write only to cache, dirty bit marks modified", "dirty line must be written back before eviction", "write-back faster but coherence issues"],
      answer: "Write-through: every write updates both cache and RAM simultaneously. Simple and consistent, but cache doesn't speed up write operations. Write-back: writes only update the cache. A 'dirty bit' flag marks that the cache line has been modified and differs from RAM. When a dirty line must be evicted, it must first be written back to RAM. This is faster (most writes hit cache only) but introduces consistency challenges in multiprocessor systems where different caches may have different versions. DMA also has issues with write-back caches."
    },
    {
      id: 32,
      category: "cache",
      subcategory: "address-structure",
      difficulty: "hard",
      question: "How is a memory address divided for cache lookup? Calculate the address bits for an 8KB 4-way cache with 64B blocks and 32-bit addresses.",
      keyPoints: ["address = tag | index | offset", "offset = log2(block size)", "index = log2(number of sets)", "tag = remaining bits"],
      answer: "A memory address is divided into three fields: Offset (least significant) - identifies the byte within a block. Index - identifies which set in the cache. Tag (most significant) - stored in cache to identify the source address. Calculation for 8KB 4-way cache, 64B blocks, 32-bit address: Offset = log2(64) = 6 bits. Number of sets = cache_size / (block_size x ways) = 8192 / (64 x 4) = 32 sets. Index = log2(32) = 5 bits. Tag = 32 - 5 - 6 = 21 bits. So address format: [21-bit tag | 5-bit index | 6-bit offset]."
    },
    {
      id: 33,
      category: "cache",
      subcategory: "hierarchy",
      difficulty: "medium",
      question: "Describe the cache hierarchy in a modern multi-core processor.",
      keyPoints: ["L1: fastest, smallest, per core, split instruction/data", "L2: per core, unified", "L3: shared among cores", "inclusive or exclusive"],
      answer: "Modern processors have a multi-level cache hierarchy: L1 cache: closest to the core, fastest (1-2 cycle access), smallest (typically 32-64KB per core). Usually split into L1 instruction cache and L1 data cache. L2 cache: per-core, unified (both instructions and data), larger (256KB-1MB), slightly slower (~10 cycles). L3 cache: shared among all cores in a processor, largest (several MB to tens of MB), slowest cache level (~30-40 cycles) but still much faster than RAM (~100+ cycles). Each core has its own L1 and L2, but shares L3 with other cores on the same processor."
    },
    {
      id: 34,
      category: "cache",
      subcategory: "coherence",
      difficulty: "hard",
      question: "What is cache coherence? Explain the MESI protocol states and transitions.",
      keyPoints: ["multiple caches may have copies of same data", "must stay consistent", "MESI: Modified, Exclusive, Shared, Invalid", "invalidation-based protocol"],
      answer: "Cache coherence ensures that when multiple processors cache the same memory location, all copies remain consistent. MESI is an invalidation-based protocol with 4 states per cache line: Modified (M): only this cache has the line, it has been written (dirty). Must write back before another processor reads it. Exclusive (E): only this cache has the line, unmodified (clean). Can transition to Modified on write without bus traffic. Shared (S): multiple caches have identical copies (clean). Writing requires invalidating other copies first. Invalid (I): line not present/valid in this cache. Key transitions: processor read with no other copies -> E; read with existing copies -> S; write -> M (others become I); another processor reads our M line -> write back, both become S."
    },
    {
      id: 35,
      category: "cache",
      subcategory: "programming",
      difficulty: "medium",
      question: "How does cache affect programming? Why is row-major matrix traversal faster than column-major in C?",
      keyPoints: ["spatial locality matters", "C stores matrices row-major", "row traversal = sequential memory", "column traversal = stride causes cache misses", "data fitting in cache = faster"],
      answer: "Cache exploits spatial locality - when one byte is accessed, the entire block (e.g., 64 bytes) is loaded. In C, 2D arrays are stored in row-major order: a[0][0], a[0][1], ..., a[0][M-1], a[1][0], ... Row-by-row traversal (inner loop over columns) accesses sequential memory addresses, getting many hits from each loaded cache block. Column-by-column traversal (inner loop over rows) jumps by M*sizeof(int) bytes between accesses, potentially causing a cache miss on every access for large matrices. Also, if your data fits entirely within the cache, performance is significantly better than when it doesn't - this creates a visible 'cliff' in performance graphs as array size exceeds cache size."
    },
    // Additional cache questions
    {
      id: 36,
      category: "cache",
      subcategory: "operation",
      difficulty: "hard",
      question: "Walk through the cache read and write flowcharts for a write-back cache.",
      keyPoints: ["check hit/miss", "on miss: find line to overwrite", "check dirty bit", "write back if dirty", "load new block", "for write: set dirty bit"],
      answer: "Read flowchart: (1) Check if address hits in cache. If hit, return data immediately. If miss: (2) Find a line to overwrite (using replacement policy). (3) Check if that line is dirty. If dirty, write it back to RAM first. (4) Load the requested block from RAM into the chosen line, mark as not dirty. (5) Return the data. Write flowchart: (1) Check if address hits. If miss: (2) Find line to overwrite. (3) If dirty, write back to RAM. (4) Load the block from RAM. (5) Write the new data to the cache block, mark the line as dirty. The dirty bit is crucial - it tells us whether the cache line has been modified and needs to be written back before being evicted."
    },
    // More oral-style questions
    {
      id: 37,
      category: "modern-solutions",
      subcategory: "pipelining",
      difficulty: "easy",
      question: "What is the theoretical throughput of a 5-stage pipeline? What is the latency?",
      keyPoints: ["throughput: 1 instruction/clock", "latency: 5 clocks/instruction", "throughput != latency"],
      answer: "The theoretical throughput of a 5-stage pipeline is 1 instruction per clock cycle - once the pipeline is full, one instruction completes every cycle. The latency remains 5 clock cycles per instruction - each individual instruction still takes 5 stages to complete. The key insight is that throughput and latency are different measures. Without pipelining, you'd get 1 instruction every 5 clocks (0.2 instructions/clock throughput). Pipelining increases throughput 5x while keeping latency the same."
    },
    {
      id: 38,
      category: "modern-solutions",
      subcategory: "pipelining",
      difficulty: "medium",
      question: "What is a pipeline bubble and when does it occur?",
      keyPoints: ["NOP inserted by control unit", "delays next instruction", "caused by hazards", "reduces throughput", "still faster than no pipeline"],
      answer: "A pipeline bubble (also called stall) is an idle state inserted into the pipeline by the control unit when a hazard is detected after the IF (instruction fetch) phase. It delays the dependent instruction by one or more cycles, effectively inserting NOP instructions. For example, with a RAW data hazard, if SUB needs the result of a preceding ADD, the pipeline inserts bubbles until ADD's result is available. This increases total running time and reduces throughput below the ideal 1 instruction/cycle. However, execution is still faster overall than without pipelining."
    },
    {
      id: 39,
      category: "cache",
      subcategory: "basics",
      difficulty: "easy",
      question: "Why do we need cache? Why not just use faster RAM?",
      keyPoints: ["CPU ~10x faster than RAM", "SRAM is fast but expensive", "can't replace all RAM with SRAM due to cost", "cache uses locality to be effective"],
      answer: "The CPU operates roughly 10 times faster than RAM, so without cache, the CPU constantly waits for data. The solution seems simple: use faster memory (SRAM). However, SRAM is much more expensive per byte than DRAM. We can't afford to replace all main memory with SRAM. Cache works because of the locality principle - programs tend to access the same data repeatedly (temporal) and nearby data (spatial). So a small, fast SRAM cache holding recently used data satisfies most memory requests without going to slow RAM. Typical hit rates exceed 90%."
    },
    {
      id: 40,
      category: "cache",
      subcategory: "address-structure",
      difficulty: "hard",
      question: "Given a 13-bit address, 128B cache, 4-way set-associative, 8B blocks: calculate tag, index, and offset widths.",
      keyPoints: ["offset = log2(8) = 3 bits", "sets = 128/(8*4) = 4 sets", "index = log2(4) = 2 bits", "tag = 13-2-3 = 8 bits"],
      answer: "Step by step: (1) Offset bits = log2(block size) = log2(8) = 3 bits - addresses a byte within the 8-byte block. (2) Number of sets = total cache size / (block size x associativity) = 128 / (8 x 4) = 4 sets. (3) Index bits = log2(number of sets) = log2(4) = 2 bits - selects which set. (4) Tag bits = address width - index bits - offset bits = 13 - 2 - 3 = 8 bits. So address format: [8-bit tag | 2-bit index | 3-bit offset]. Each set has 4 ways (lines), and there are 4 sets, totaling 16 cache lines."
    },
    {
      id: 41,
      category: "modern-solutions",
      subcategory: "performance",
      difficulty: "medium",
      question: "What are the 'classical' (non-parallel) ways to improve processor performance?",
      keyPoints: ["increase clock frequency", "co-processors (FPU)", "DMA", "larger word size", "cache", "faster bus"],
      answer: "Before parallelism, performance was improved through: (1) Increasing CPU clock frequency - limited by heat production and signal propagation time. (2) Co-processors (FPU) - dedicated hardware for floating-point operations. (3) DMA (Direct Memory Access) - allows data transfer between RAM and I/O without CPU involvement, freeing the CPU. (4) Larger word size - bigger registers and data bus (8->16->32->64 bit). (5) Application of cache - fast intermediate storage for frequently used data. (6) Faster bus system - higher bandwidth between components."
    },
    {
      id: 42,
      category: "modern-solutions",
      subcategory: "vector-processors",
      difficulty: "medium",
      question: "What is saturation arithmetic and why is it used in vector processing?",
      keyPoints: ["overflow handling for SIMD", "clamps to max/min instead of wrapping", "no status register per element", "useful for media processing"],
      answer: "In regular integer arithmetic, overflow wraps around (e.g., 127+1 = -128 for signed 8-bit). But in vector processing where one register holds multiple elements (e.g., 4x8-bit in a 32-bit register), there's no per-element overflow flag in the status register. Saturation arithmetic solves this by clamping results to the maximum or minimum representable value instead of wrapping. For example, 119+59 = 127 (not 178 which would wrap to a negative number in signed 8-bit). This is especially useful for media processing where clamping (e.g., pixel values) makes more sense than wraparound."
    },
    {
      id: 43,
      category: "cache",
      subcategory: "coherence",
      difficulty: "medium",
      question: "What is the difference between invalidation-based and update-based cache coherence?",
      keyPoints: ["invalidation: mark other copies invalid on write", "update: send new value to all caches", "invalidation more common", "MESI is invalidation-based"],
      answer: "Two approaches to maintaining cache coherence in multiprocessor systems: Invalidation-based (e.g., MESI protocol): when one processor writes to a cached line, all other copies of that line in other caches are marked as Invalid. Other processors must fetch the updated data from memory or the modifying cache on their next access. Simpler and uses less bandwidth when data is written multiple times before being read by others. Update-based: when one processor writes to a cached line, the new value is broadcast to all other caches that have a copy, updating them immediately. Keeps data fresh everywhere but generates more bus traffic. Invalidation-based is more common in practice."
    }
  ],

  flashcards: [
    // Comparisons
    { id: 1, category: "comparison", front: "CISC vs RISC", back: "CISC: many complex instructions, variable length, multiple cycles, microprogrammed, few registers, instructions can access RAM. Examples: x86.\n\nRISC: few simple instructions, fixed length, one cycle, often hardwired, many registers, only load/store access RAM. Examples: ARM, MIPS." },
    { id: 2, category: "comparison", front: "CPU vs GPU", back: "CPU: low latency, shallow pipeline (<30), optimized for serial, few powerful cores (~tens).\n\nGPU: high throughput, deep pipeline (>100), optimized for parallel, thousands of simple cores. GPU used for SIMD-heavy tasks." },
    { id: 3, category: "comparison", front: "Write-through vs Write-back", back: "Write-through: writes to cache AND RAM simultaneously. Simple, consistent, but slow writes.\n\nWrite-back: writes only to cache, dirty bit marks modified lines. Faster writes but must write back dirty lines before eviction. Coherence challenges." },
    { id: 4, category: "comparison", front: "VLIW vs Superscalar", back: "VLIW: compiler decides parallelism, simple hardware, shorter clock, non-portable code, NOP waste.\n\nSuperscalar: hardware finds parallelism, complex hardware, portable code, uses instruction window + OoOE." },
    { id: 5, category: "comparison", front: "Direct-mapped vs Fully associative vs Set-associative cache", back: "Direct-mapped: 1 address -> 1 line. Fast lookup, high conflict misses.\n\nFully associative: any address -> any line. Best hit rate, expensive.\n\nN-way set-associative: address -> 1 set with N lines. Compromise of both." },
    { id: 6, category: "comparison", front: "Spatial vs Temporal Locality", back: "Spatial: accessing an address means nearby addresses likely accessed soon (sequential code, arrays).\n\nTemporal: accessing an address means the same address likely accessed again soon (loops, frequently used variables)." },
    { id: 7, category: "comparison", front: "Static vs Dynamic Branch Prediction", back: "Static: simple rule - backward jumps (loops) predicted taken, forward predicted not taken. No history.\n\nDynamic: records runtime history in Branch Target Buffer. 1-bit: flips each misprediction. 2-bit: needs two consecutive mispredictions to change (strongly/weakly taken/not taken)." },
    { id: 8, category: "comparison", front: "Pipeline Bubble vs Result Forwarding", back: "Bubble: insert NOP to wait for data, wastes cycles, simple.\n\nResult forwarding: output of EX stage sent directly to next instruction's EX input, bypassing WB stage. Eliminates many stalls." },
    { id: 9, category: "comparison", front: "Hyper-threading vs Multi-core", back: "Hyper-threading (SMT): one physical core, multiple thread contexts, shared execution units. Less speedup but cheap.\n\nMulti-core: multiple independent cores with own execution units. More speedup but more chip area/power." },
    { id: 10, category: "comparison", front: "Invalidation-based vs Update-based coherence", back: "Invalidation: on write, mark other copies Invalid. Others re-fetch on next access. Less bus traffic.\n\nUpdate: on write, broadcast new value to all caches. Immediate consistency but more bus traffic." },

    // Definitions
    { id: 11, category: "definition", front: "Pipeline", back: "Architecture where multiple instructions overlap in different execution phases (IF, ID, EX, MEM, WB). Increases throughput without reducing individual instruction latency." },
    { id: 12, category: "definition", front: "RAW Hazard", back: "Read After Write: true data dependency where a later instruction needs a result not yet written by an earlier instruction. E.g., ADD r1,r2,r3 followed by SUB r4,r1,r5." },
    { id: 13, category: "definition", front: "Out-of-Order Execution (OoOE)", back: "Execute instructions not in program order but based on operand availability. Results committed in order. Avoids pipeline bubbles from data dependencies." },
    { id: 14, category: "definition", front: "Register Renaming", back: "Mapping architectural registers to a larger set of hardware registers to eliminate WAR and WAW (name) dependencies, enabling safe out-of-order execution." },
    { id: 15, category: "definition", front: "Cache Hit / Cache Miss", back: "Hit: requested address found in cache tag, data returned from fast cache. Miss: address not in cache, block must be loaded from slower RAM first." },
    { id: 16, category: "definition", front: "Dirty Bit", back: "A flag in cache indicating a line has been modified (written) but not yet written back to main memory. Used in write-back policy." },
    { id: 17, category: "definition", front: "MESI Protocol", back: "Cache coherence protocol. States: Modified (dirty, exclusive), Exclusive (clean, exclusive), Shared (clean, multiple copies), Invalid (not present)." },
    { id: 18, category: "definition", front: "Flynn's Taxonomy", back: "Classification of architectures: SISD (single instr, single data), SIMD (single instr, multiple data), MISD (multiple instr, single data), MIMD (multiple instr, multiple data)." },
    { id: 19, category: "definition", front: "FPGA", back: "Field-Programmable Gate Array: reconfigurable logic circuits programmed with VHDL/Verilog. Parallel by nature. Can implement custom accelerators or soft-processors." },
    { id: 20, category: "definition", front: "NUMA", back: "Non-Uniform Memory Access: each processor has local memory, can access remote memory at higher latency. Enables more simultaneous memory operations." },
    { id: 21, category: "definition", front: "Branch Target Buffer (BTB)", back: "Hardware table storing history of branch instruction outcomes. Used by dynamic branch prediction to predict which branch path to take." },
    { id: 22, category: "definition", front: "Instruction Window", back: "The set of foreseeable instructions that a superscalar processor examines to find independent instructions for parallel execution. Larger window = more parallelism." },
    { id: 23, category: "definition", front: "Superscalar Processor", back: "A processor with multiple execution units that can complete more than one instruction per clock cycle by exploiting ILP." },
    { id: 24, category: "definition", front: "GPGPU", back: "General-Purpose GPU: using a GPU for non-graphics computation. Programmed via CUDA, OpenCL, or MATLAB. Exploits massive parallelism for scientific computing, AI, etc." },
    { id: 25, category: "definition", front: "Loop Unrolling", back: "Optimization that duplicates the loop body multiple times per iteration, reducing loop overhead and exposing more instruction-level parallelism." },

    // Formulas
    { id: 26, category: "formula", front: "Performance Equation", back: "T = NI x eCPI x 1/f\n\nT = execution time (s)\nNI = number of instructions\neCPI = effective cycles per instruction\nf = clock frequency (Hz)" },
    { id: 27, category: "formula", front: "Amdahl's Law", back: "S(N) = 1 / (A + (1-A)/N)\n\nS = speedup\nN = number of processors\nA = sequential ratio (0 <= A <= 1)\n\nMax speedup (N->inf) = 1/A" },
    { id: 28, category: "formula", front: "Cache Address Decomposition", back: "Address = [Tag | Index | Offset]\n\nOffset = log2(block_size) bits\nIndex = log2(num_sets) bits\nnum_sets = cache_size / (block_size x associativity)\nTag = address_width - index - offset bits" },
    { id: 29, category: "formula", front: "Cache Number of Sets", back: "num_sets = cache_size / (block_size x associativity)\n\nDirect-mapped: associativity = 1\nFully associative: associativity = total_lines\nN-way: associativity = N" },
    { id: 30, category: "formula", front: "Pipeline Speedup (ideal)", back: "Speedup = N (number of stages)\nThroughput = 1 instruction/cycle\nLatency = N cycles/instruction\n\nReal speedup < N due to hazards, unequal stage times" }
  ],

  concepts: [
    // Modern Solutions concepts
    {
      id: 1,
      category: "modern-solutions",
      subcategory: "parallelism",
      title: "Levels of Parallelism",
      explanation: "Parallelism in computer architecture exists at multiple levels, from the lowest hardware level to the highest software level.",
      keyPoints: [
        "Bit level: all bits of a word processed simultaneously",
        "Data level (DLP/SIMD): one instruction operates on multiple data",
        "Instruction level (ILP): multiple instructions in overlapping execution",
        "Task/Thread level (TLP): multiple threads run in parallel",
        "Process level: OS manages multiple processes"
      ],
      diagram: "Bit < Data < Instruction < Task < Process\n(hardware)                        (software)"
    },
    {
      id: 2,
      category: "modern-solutions",
      subcategory: "parallelism",
      title: "Flynn's Taxonomy",
      explanation: "A classification system for computer architectures based on the number of concurrent instruction and data streams.",
      keyPoints: [
        "SISD: classical sequential processor",
        "SIMD: vector processors, GPUs",
        "MISD: fault-tolerant systems (rare)",
        "MIMD: multicore, superscalar"
      ],
      diagram: "              Single Data    Multiple Data\nSingle Instr    SISD            SIMD\nMultiple Instr  MISD            MIMD"
    },
    {
      id: 3,
      category: "modern-solutions",
      subcategory: "pipelining",
      title: "5-Stage RISC Pipeline",
      explanation: "Pipelining overlaps execution phases of multiple instructions. Like an assembly line - each station handles one part of the work.",
      keyPoints: [
        "IF: fetch instruction from memory using PC",
        "ID: decode opcode, identify registers",
        "EX: ALU computation or address calculation",
        "MEM: read/write data memory (load/store only)",
        "WB: write result to destination register",
        "Throughput: 1 instr/cycle (ideal), Latency: 5 cycles/instr"
      ],
      diagram: "Clock:  1    2    3    4    5    6    7\nI1:    IF   ID   EX  MEM   WB\nI2:         IF   ID   EX  MEM   WB\nI3:              IF   ID   EX  MEM   WB"
    },
    {
      id: 4,
      category: "modern-solutions",
      subcategory: "pipelining",
      title: "Pipeline Hazards",
      explanation: "Situations where the next instruction cannot execute in the next clock cycle due to dependencies or resource conflicts.",
      keyPoints: [
        "Data hazard: RAW (true dependency), WAR and WAW (name dependencies)",
        "Structural hazard: hardware resource conflict",
        "Control hazard: branch destination unknown",
        "Solutions: bubbles, forwarding, OoOE, renaming, speculation"
      ],
      diagram: "RAW: ADD r1,r2,r3 -> SUB r4,r1,r5  (r1 not ready)\nWAR: ADD r3,r1,r2 -> ADD r2,r4,r5  (r2 read then written)\nWAW: ADD r3,r1,r2 -> SUB r3,r4,r5  (r3 written twice)"
    },
    {
      id: 5,
      category: "modern-solutions",
      subcategory: "pipelining",
      title: "Hazard Solutions",
      explanation: "Various techniques to handle pipeline hazards and keep the pipeline flowing.",
      keyPoints: [
        "Bubble/Stall: insert NOPs, simple but wastes cycles",
        "Result Forwarding: EX output -> next EX input directly",
        "OoOE: reorder instructions to fill gaps",
        "Register Renaming: map to larger physical register file",
        "Speculative Execution: predict and execute branches early"
      ],
      diagram: "Without forwarding:  ADD -> bubble -> bubble -> SUB\nWith forwarding:     ADD -> SUB (EX result forwarded)"
    },
    {
      id: 6,
      category: "modern-solutions",
      subcategory: "branch-prediction",
      title: "Branch Prediction",
      explanation: "Predicting which path a conditional branch will take to avoid pipeline stalls.",
      keyPoints: [
        "Static: backward=taken (loops), forward=not taken",
        "Dynamic 1-bit: tracks last outcome, flips each time",
        "Dynamic 2-bit: strongly/weakly taken/not-taken states",
        "2-bit needs 2 wrong predictions to change direction",
        "History stored in Branch Target Buffer (BTB)"
      ],
      diagram: "2-bit state machine:\nStrongly Taken <-> Weakly Taken <-> Weakly Not <-> Strongly Not\n   predict T        predict T       predict NT      predict NT"
    },
    {
      id: 7,
      category: "modern-solutions",
      subcategory: "superscalar",
      title: "Superscalar Processors",
      explanation: "Processors that can issue and complete multiple instructions per clock cycle using multiple execution units.",
      keyPoints: [
        "Multiple execution units (ALUs, FPUs, etc.)",
        "Hardware finds parallelism via instruction window",
        "Uses ILP + OoOE + speculation",
        "Throughput > 1 instruction/cycle possible",
        "Larger instruction window = more parallelism"
      ],
      diagram: "Clock 1: [I1, I2] -> IF\nClock 2: [I3, I4] -> IF,  [I1, I2] -> ID\nClock 3: [I5, I6] -> IF,  [I3, I4] -> ID,  [I1, I2] -> EX"
    },
    {
      id: 8,
      category: "modern-solutions",
      subcategory: "vliw",
      title: "VLIW Processors",
      explanation: "Very Long Instruction Word - the compiler explicitly packs multiple operations into one wide instruction bundle.",
      keyPoints: [
        "Compiler decides parallelism (not hardware)",
        "Simple hardware, complex compiler",
        "Bundle has multiple slots for parallel operations",
        "Empty slots filled with NOPs (code bloat)",
        "Intel EPIC/Itanium was a VLIW approach",
        "Non-portable between different implementations"
      ],
      diagram: "Bundle: [  ALU op  |  ALU op  |  MUL op  ]\n         slot 1      slot 2     slot 3"
    },
    {
      id: 9,
      category: "modern-solutions",
      subcategory: "vector-processors",
      title: "Vector / SIMD Processors",
      explanation: "Process multiple data elements with a single instruction using wide registers.",
      keyPoints: [
        "MMX: 64-bit (shared with FPU), integers only",
        "SSE: 128-bit dedicated, float (SSE2: + integer)",
        "AVX: 256-bit, AVX-512: 512-bit",
        "ARM Neon: 128-bit registers",
        "Saturation arithmetic for overflow handling",
        "Register hierarchy: ZMM > YMM > XMM > MM"
      ],
      diagram: "Scalar: a[0]+b[0], a[1]+b[1], a[2]+b[2], a[3]+b[3]  (4 ops)\nVector: [a0,a1,a2,a3] + [b0,b1,b2,b3] = [s0,s1,s2,s3]  (1 op)"
    },
    {
      id: 10,
      category: "modern-solutions",
      subcategory: "gpu",
      title: "GPU Architecture",
      explanation: "Graphics Processing Units are massively parallel processors optimized for throughput over latency.",
      keyPoints: [
        "Thousands of simple cores vs CPU's few complex cores",
        "Hardware-level thread management",
        "Deep pipeline (>100 stages)",
        "GPGPU: non-graphics computation (CUDA, OpenCL)",
        "Components: SM, SP, SFU, shared memory, VRAM",
        "Huge memory bandwidth (TB/s)"
      ],
      diagram: "CPU: [Control][Cache]     GPU: [Core][Core][Core]...\n     [Core ][Core ]          [Core][Core][Core]...\n                             [Core][Core][Core]..."
    },
    {
      id: 11,
      category: "modern-solutions",
      subcategory: "multicore",
      title: "Multi-core & Multi-processor Systems",
      explanation: "Using multiple processing units for parallel execution at the task/thread level.",
      keyPoints: [
        "Multi-core: few cores on one die (PCs)",
        "Many-core: thousands of cores (servers)",
        "Own L1/L2, shared L3 cache",
        "Homogeneous: same type cores",
        "Heterogeneous: different types (big.LITTLE, CPU+GPU)",
        "Hyper-threading: 1 core = 2 logical cores (SMT)"
      ],
      diagram: "Processor: [Core0(L1,L2)] [Core1(L1,L2)]\n                    [  Shared L3  ]\n                    [ Main Memory ]"
    },
    {
      id: 12,
      category: "modern-solutions",
      subcategory: "performance",
      title: "Performance Analysis",
      explanation: "Quantifying processor performance through equations and understanding limits of parallelism.",
      keyPoints: [
        "T = NI x eCPI x 1/f (execution time)",
        "FLOPS = floating point operations per second",
        "Amdahl's law: S(N) = 1/(A + (1-A)/N)",
        "Sequential portion limits max speedup to 1/A",
        "Even small sequential fraction severely caps scaling"
      ],
      diagram: "Amdahl's Law (A=0.1):\nN=1: S=1x | N=4: S=3.1x | N=8: S=4.7x | N=inf: S=10x"
    },
    // Cache concepts
    {
      id: 13,
      category: "cache",
      subcategory: "basics",
      title: "Why Cache Exists",
      explanation: "Cache bridges the speed gap between fast CPU and slow RAM using locality principles.",
      keyPoints: [
        "CPU ~10x faster than RAM",
        "SRAM fast but too expensive for large capacity",
        "Spatial locality: nearby addresses accessed together",
        "Temporal locality: same address accessed repeatedly",
        "Hit rate typically >90%"
      ],
      diagram: "CPU (fast) <-> Cache (SRAM, fast, small)\n                  <-> RAM (DRAM, slow, large)"
    },
    {
      id: 14,
      category: "cache",
      subcategory: "structure",
      title: "Cache Structure",
      explanation: "Cache is organized into lines, each containing a data block, tag, and status flags.",
      keyPoints: [
        "Line = Tag + Flags + Block (data)",
        "Tag identifies which memory address the block corresponds to",
        "Flags: valid bit, dirty bit, recent bit",
        "Block: copy of a contiguous memory fragment (e.g., 64 bytes)",
        "Multiple levels: L1 (fastest), L2, L3 (largest)"
      ],
      diagram: "Cache Line: [Tag][Valid][Dirty][   Data Block (64B)   ]\n              ^                    ^\n         memory addr ID      copy of RAM contents"
    },
    {
      id: 15,
      category: "cache",
      subcategory: "associativity",
      title: "Cache Associativity",
      explanation: "Determines how many cache lines a memory address can map to.",
      keyPoints: [
        "Direct-mapped: 1 address -> 1 line (fast, more misses)",
        "Fully associative: any address -> any line (best hits, expensive)",
        "N-way set-associative: address -> 1 set of N lines (balanced)",
        "More ways = fewer conflict misses but more complex lookup",
        "Common: 4-way or 8-way set-associative"
      ],
      diagram: "Direct:    addr -> [line X] only\nFully:     addr -> [any line]\n4-way set: addr -> [set Y] -> {line0, line1, line2, line3}"
    },
    {
      id: 16,
      category: "cache",
      subcategory: "address-structure",
      title: "Cache Address Structure",
      explanation: "Memory addresses are decomposed into tag, index, and offset for cache lookup.",
      keyPoints: [
        "Offset: byte position within block = log2(block_size)",
        "Index: selects the set = log2(num_sets)",
        "Tag: remaining bits, stored in cache for identification",
        "num_sets = cache_size / (block_size x ways)",
        "Direct-mapped: most index bits. Fully assoc: no index bits"
      ],
      diagram: "|<-- Tag -->|<-- Index -->|<-- Offset -->|\n MSB                                       LSB\n\nExample: 32-bit addr, 8KB 4-way, 64B block\nOffset=6, Index=5, Tag=21"
    },
    {
      id: 17,
      category: "cache",
      subcategory: "write-policy",
      title: "Write Policies",
      explanation: "How the cache handles write operations to maintain consistency with main memory.",
      keyPoints: [
        "Write-through: write to cache AND RAM simultaneously",
        "Write-back: write only to cache, set dirty bit",
        "Dirty lines must be written back before eviction",
        "Write-through: simpler, no dirty bits needed",
        "Write-back: faster writes, but coherence complexity"
      ],
      diagram: "Write-through: CPU -> Cache -> RAM (simultaneous)\nWrite-back:    CPU -> Cache (dirty=1)\n               Later: Cache (dirty) -> RAM (on eviction)"
    },
    {
      id: 18,
      category: "cache",
      subcategory: "coherence",
      title: "Cache Coherence & MESI",
      explanation: "Protocols ensuring all caches see consistent data in multiprocessor systems.",
      keyPoints: [
        "Problem: multiple caches may have copies of same data",
        "Invalidation-based: mark others' copies invalid on write",
        "Update-based: broadcast writes to all caches",
        "MESI states: Modified, Exclusive, Shared, Invalid",
        "Modified: dirty, only copy. Exclusive: clean, only copy",
        "Shared: clean, multiple copies. Invalid: not present"
      ],
      diagram: "MESI transitions:\n  I --read(no copies)--> E --write--> M\n  I --read(copies)----> S --write--> M (others->I)\n  M --other reads-----> S\n  E --other reads-----> S"
    }
  ],

  problems: [
    {
      id: 1,
      category: "cache",
      type: "cache-calculation",
      title: "Cache Address Decomposition",
      problem: "A system has a 32-bit address space, a 16KB 4-way set-associative cache with 64-byte blocks. Calculate the number of offset, index, and tag bits.",
      steps: [
        { text: "Calculate offset bits: log2(block_size) = log2(64)", answer: "6 bits" },
        { text: "Calculate number of sets: cache_size / (block_size x ways) = 16384 / (64 x 4)", answer: "64 sets" },
        { text: "Calculate index bits: log2(num_sets) = log2(64)", answer: "6 bits" },
        { text: "Calculate tag bits: address_width - index - offset = 32 - 6 - 6", answer: "20 bits" }
      ],
      finalAnswer: "Offset: 6 bits, Index: 6 bits, Tag: 20 bits. Address format: [20-bit tag | 6-bit index | 6-bit offset]"
    },
    {
      id: 2,
      category: "cache",
      type: "cache-calculation",
      title: "Direct-Mapped Cache",
      problem: "A 4KB direct-mapped cache has 32-byte blocks. The system uses 24-bit addresses. How many offset, index, and tag bits? How many cache lines are there?",
      steps: [
        { text: "Calculate offset bits: log2(32)", answer: "5 bits" },
        { text: "Calculate number of lines: 4096 / 32 (direct-mapped = 1-way)", answer: "128 lines" },
        { text: "Calculate index bits: log2(128)", answer: "7 bits" },
        { text: "Calculate tag bits: 24 - 7 - 5", answer: "12 bits" },
        { text: "Total cache lines?", answer: "128 lines (direct-mapped: 128 sets x 1 way)" }
      ],
      finalAnswer: "128 cache lines. Offset: 5 bits, Index: 7 bits, Tag: 12 bits."
    },
    {
      id: 3,
      category: "cache",
      type: "cache-calculation",
      title: "Fully Associative Cache",
      problem: "A 2KB fully associative cache has 64-byte blocks with 32-bit addresses. Calculate offset and tag bits. How many lines?",
      steps: [
        { text: "Calculate offset bits: log2(64)", answer: "6 bits" },
        { text: "Calculate number of lines: 2048 / 64", answer: "32 lines" },
        { text: "Index bits for fully associative?", answer: "0 bits (only 1 set containing all lines)" },
        { text: "Calculate tag bits: 32 - 0 - 6", answer: "26 bits" }
      ],
      finalAnswer: "32 cache lines, 1 set. Offset: 6 bits, Index: 0 bits, Tag: 26 bits. Any address can go in any of the 32 lines."
    },
    {
      id: 4,
      category: "modern-solutions",
      type: "amdahl",
      title: "Amdahl's Law - Basic",
      problem: "A program has 30% sequential code. Calculate the speedup with 4, 8, and infinite processors.",
      steps: [
        { text: "Write the formula: S(N) = 1 / (A + (1-A)/N), where A = 0.3", answer: "S(N) = 1 / (0.3 + 0.7/N)" },
        { text: "Calculate S(4) = 1 / (0.3 + 0.7/4)", answer: "S(4) = 1 / (0.3 + 0.175) = 1/0.475 = 2.11x" },
        { text: "Calculate S(8) = 1 / (0.3 + 0.7/8)", answer: "S(8) = 1 / (0.3 + 0.0875) = 1/0.3875 = 2.58x" },
        { text: "Calculate S(inf) = 1 / (0.3 + 0) = 1/A", answer: "S(inf) = 1/0.3 = 3.33x maximum speedup" }
      ],
      finalAnswer: "S(4) = 2.11x, S(8) = 2.58x, S(inf) = 3.33x. Even with infinite processors, speedup is limited to 3.33x by the 30% sequential portion."
    },
    {
      id: 5,
      category: "modern-solutions",
      type: "amdahl",
      title: "Amdahl's Law - Find Sequential Ratio",
      problem: "With 16 processors, you achieve a 10x speedup. What is the sequential ratio (A)?",
      steps: [
        { text: "Start with S(N) = 1/(A + (1-A)/N), substitute S=10, N=16", answer: "10 = 1/(A + (1-A)/16)" },
        { text: "Rearrange: A + (1-A)/16 = 1/10 = 0.1", answer: "A + 1/16 - A/16 = 0.1" },
        { text: "Simplify: A(1 - 1/16) + 1/16 = 0.1 -> (15/16)A = 0.1 - 1/16", answer: "(15/16)A = 0.1 - 0.0625 = 0.0375" },
        { text: "Solve for A", answer: "A = 0.0375 x 16/15 = 0.04 = 4%" }
      ],
      finalAnswer: "The sequential ratio A = 4%. Only 4% of the program is sequential, allowing a 10x speedup with 16 processors. Maximum possible speedup = 1/0.04 = 25x."
    },
    {
      id: 6,
      category: "modern-solutions",
      type: "pipeline",
      title: "Pipeline Hazard Identification",
      problem: "Identify the hazard type for each pair of instructions (ARM assembly):\n1) ADD r1, r2, r3 / SUB r4, r1, r5\n2) ADD r3, r1, r2 / MUL r1, r4, r5\n3) ADD r3, r1, r2 / SUB r3, r4, r5\n4) LDR r1, [r2] / ADD r3, r1, r4",
      steps: [
        { text: "Pair 1: ADD writes r1, SUB reads r1. Type?", answer: "RAW (Read After Write) - true data dependency. SUB needs r1 which ADD hasn't written yet." },
        { text: "Pair 2: ADD reads r1, MUL writes r1. Type?", answer: "WAR (Write After Read) - name dependency. MUL would overwrite r1 before ADD reads it if reordered." },
        { text: "Pair 3: ADD writes r3, SUB writes r3. Type?", answer: "WAW (Write After Write) - name dependency. Both write to r3, order matters." },
        { text: "Pair 4: LDR loads into r1, ADD reads r1. Type and issue?", answer: "RAW hazard. Extra tricky: LDR result only available after MEM stage, so even forwarding from EX isn't enough - needs a 1-cycle stall (load-use hazard)." }
      ],
      finalAnswer: "1) RAW - solved by forwarding. 2) WAR - solved by register renaming. 3) WAW - solved by register renaming. 4) RAW (load-use) - needs 1 bubble even with forwarding."
    },
    {
      id: 7,
      category: "modern-solutions",
      type: "pipeline",
      title: "Pipeline Timing with Bubbles",
      problem: "Given these instructions in a 5-stage pipeline WITHOUT result forwarding:\nADD r1, r2, r3\nSUB r4, r1, r5\nHow many clock cycles does it take to complete both instructions? How many with forwarding?",
      steps: [
        { text: "Without forwarding: ADD writes r1 in WB (cycle 5). SUB needs r1 in EX. When can SUB's EX run?", answer: "SUB must wait until ADD's WB completes. SUB enters IF at cycle 2, but must stall in ID until cycle 6 (after ADD's WB in cycle 5). SUB's EX runs in cycle 7." },
        { text: "Count the bubbles inserted", answer: "2 bubble cycles (cycles 3 and 4 in SUB's perspective). Total: ADD finishes at cycle 5, SUB finishes at cycle 8 = 8 cycles total." },
        { text: "With forwarding: ADD's EX result available after cycle 3. SUB's EX can use it in cycle?", answer: "Cycle 4. No stall needed. ADD's EX output is forwarded directly to SUB's EX input." },
        { text: "Total cycles with forwarding?", answer: "6 cycles (ADD: cycles 1-5, SUB: cycles 2-6). No bubbles." }
      ],
      finalAnswer: "Without forwarding: 8 cycles (2 bubbles). With forwarding: 6 cycles (0 bubbles). Forwarding saves 2 cycles."
    },
    {
      id: 8,
      category: "cache",
      type: "cache-calculation",
      title: "Cache from Slide Example",
      problem: "Given: 13-bit address, 128B cache, 4-way set-associative, 8B blocks, write-back policy. Address to look up: 1101110001010 (binary). Is it a cache hit?",
      steps: [
        { text: "Calculate offset bits: log2(8)", answer: "3 bits. Offset = 010 (last 3 bits)" },
        { text: "Calculate number of sets: 128/(8x4)", answer: "4 sets. Index bits = log2(4) = 2 bits. Index = 01" },
        { text: "Calculate tag bits: 13-2-3", answer: "8 bits. Tag = 11011100 = 0xDC" },
        { text: "Look in set 01 for tag 0xDC. In the slide data, set 01 has tags: 56, F2, DC, 03. Is DC present and valid?", answer: "Yes! Tag DC is found in set 01, and its valid bit = 1. Cache HIT!" },
        { text: "What is the data at offset 010 (binary = 2)?", answer: "The byte at offset 2 in the DC line is: 48 (0x48 = 'H' in ASCII)" }
      ],
      finalAnswer: "Cache HIT. Tag=0xDC found in set 01 (valid=1, dirty=1). Data at offset 010 = 0x48. Note: this line is dirty, meaning it has been modified. The data in the DC line is: 3E 18 48 45 4C 4C 4F 00 (spells '.HELLO.' in ASCII!)."
    }
  ]
};
