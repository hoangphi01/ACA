const DATA = {
  oralQuestions: [
    // ===== MODERN SOLUTIONS =====
    {
      id: 1,
      category: "modern-solutions",
      subcategory: "parallelism",
      difficulty: "easy",
      question: "What are the different levels of parallelism in computer architecture?",
      keyPoints: ["bit level", "data level", "instruction level", "task/thread level", "process level"],
      answer: "Think of parallelism as doing multiple things at once, and it happens at 5 levels:\n\n1. Bit level - the processor works on all bits of a number at the same time (e.g., a 32-bit CPU adds all 32 bits in one go, not one by one).\n\n2. Data level (DLP = Data Level Parallelism) - one instruction works on many pieces of data at once. Imagine adding 4 pairs of numbers with a single instruction instead of 4 separate additions.\n\n3. Instruction level (ILP = Instruction Level Parallelism) - multiple instructions are being processed at the same time in different stages, like an assembly line in a factory.\n\n4. Task/Thread level (TLP = Thread Level Parallelism) - different threads or tasks run at the same time on different cores. Like having multiple workers each doing their own job.\n\n5. Process level - the operating system runs multiple programs at the same time."
    },
    {
      id: 2,
      category: "modern-solutions",
      subcategory: "parallelism",
      difficulty: "medium",
      question: "Explain Flynn's taxonomy. Give an example for each category.",
      keyPoints: ["SISD - single instruction single data", "SIMD - single instruction multiple data", "MISD - multiple instruction single data", "MIMD - multiple instruction multiple data"],
      answer: "Flynn's taxonomy is a simple way to classify computer architectures based on two questions: How many instructions run at once? How many data items are processed at once?\n\nSISD (Single Instruction, Single Data) - the classic computer: one instruction at a time on one piece of data. Example: old single-core PCs.\n\nSIMD (Single Instruction, Multiple Data) - one instruction works on many data items simultaneously. Think of it as: 'add these 8 numbers to those 8 numbers, all at once.' Example: vector processors, GPUs (Graphics Processing Units).\n\nMISD (Multiple Instruction, Single Data) - multiple different operations on the same data. Very rare. Example: space shuttle flight computers that ran the same data through different algorithms to check for errors.\n\nMIMD (Multiple Instruction, Multiple Data) - multiple processors each doing their own thing on their own data. Example: modern multicore processors, where each core runs different code on different data."
    },
    {
      id: 3,
      category: "modern-solutions",
      subcategory: "pipelining",
      difficulty: "medium",
      question: "Why do we need pipelining? What problem does it solve?",
      keyPoints: ["increases throughput (instructions completed per second)", "does NOT make individual instructions faster", "like an assembly line in a factory", "overlapping execution phases"],
      answer: "Think of a laundry analogy: washing takes 30 min, drying takes 30 min. Without pipelining, you finish one full load (wash + dry = 60 min) before starting the next. With pipelining, as soon as load 1 moves to the dryer, load 2 goes into the washer. You're overlapping the stages.\n\nIn a CPU (Central Processing Unit), each instruction goes through 5 stages: fetch, decode, execute, memory access, write back. Without pipelining, you'd wait for all 5 stages to finish before starting the next instruction. With pipelining, while instruction 1 is in the 'execute' stage, instruction 2 is being 'decoded', and instruction 3 is being 'fetched'.\n\nKey insight: pipelining does NOT make a single instruction faster (it still takes 5 cycles). But it dramatically increases throughput - after the pipeline is full, one instruction finishes every cycle instead of every 5 cycles."
    },
    {
      id: 4,
      category: "modern-solutions",
      subcategory: "pipelining",
      difficulty: "medium",
      question: "What are the 5 stages of a RISC pipeline? Explain each briefly.",
      keyPoints: ["IF = Instruction Fetch", "ID = Instruction Decode", "EX = Execution", "MEM = Memory Access", "WB = Write Back"],
      answer: "A RISC (Reduced Instruction Set Computer) pipeline has 5 stages that every instruction passes through:\n\n1. IF (Instruction Fetch) - the CPU reads the next instruction from memory. The PC (Program Counter) register tells it where to look.\n\n2. ID (Instruction Decode) - the CPU figures out what the instruction means. What operation? Which registers are involved? It's like reading a recipe step and understanding what to do.\n\n3. EX (Execution) - the ALU (Arithmetic Logic Unit) does the actual work: addition, subtraction, comparison, etc. For load/store instructions, it calculates the memory address.\n\n4. MEM (Memory Access) - only used by load/store instructions. If loading, it reads data from RAM (Random Access Memory). If storing, it writes data to RAM. Other instructions just pass through.\n\n5. WB (Write Back) - the result gets saved into the destination register. The instruction is now complete."
    },
    {
      id: 5,
      category: "modern-solutions",
      subcategory: "pipelining",
      difficulty: "hard",
      question: "What are hazards in pipelining? Name all types and explain them.",
      keyPoints: ["data hazard - instructions depend on same data", "structural hazard - hardware conflict", "control hazard - branches cause uncertainty", "RAW, WAR, WAW are subtypes of data hazard"],
      answer: "Hazards are situations where the pipeline can't smoothly process the next instruction because something goes wrong. There are 3 types:\n\n1. Data hazard - two instructions in the pipeline need the same data, causing a conflict:\n   - RAW (Read After Write): instruction B needs a result that instruction A hasn't finished calculating yet. Like trying to eat a cake that's still in the oven. This is the most common and serious type.\n   - WAR (Write After Read): instruction B would overwrite data that instruction A still needs to read. This is a 'name dependency' - they just happen to use the same register.\n   - WAW (Write After Write): two instructions both write to the same register - the order matters or you get the wrong final value.\n\n2. Structural hazard - two instructions need the same hardware at the same time. For example, one instruction is being fetched from memory while another is reading data from memory, but there's only one memory port.\n\n3. Control hazard - at a branch instruction (like an if-statement), the CPU doesn't know which instruction comes next until the branch is resolved. The pipeline doesn't know what to fetch."
    },
    {
      id: 6,
      category: "modern-solutions",
      subcategory: "pipelining",
      difficulty: "medium",
      question: "How is a RAW (Read After Write) data hazard handled? Describe multiple solutions.",
      keyPoints: ["pipeline bubble/stall - insert wait cycles", "result forwarding - shortcut the data path", "Out-of-Order Execution - rearrange instructions", "register renaming - use extra physical registers"],
      answer: "RAW (Read After Write) is when instruction B needs a result that instruction A hasn't written back yet. There are several solutions:\n\n1. Pipeline bubble/stall - the simplest approach. Just pause (stall) instruction B for a few cycles until instruction A's result is ready. The CPU inserts 'empty' cycles called bubbles. It works but wastes time.\n\n2. Result forwarding (also called bypassing) - a hardware shortcut. As soon as instruction A calculates its result in the EX (Execution) stage, that result is immediately forwarded to instruction B's EX stage through a special wire, without waiting for it to be written back to the register. This eliminates the stall entirely in many cases.\n\n3. OoOE (Out-of-Order Execution) - instead of stalling, the CPU looks ahead and finds other independent instructions to execute while waiting. It rearranges the execution order to fill the gaps.\n\n4. Register renaming - mainly solves WAR and WAW hazards. The CPU has more physical registers than the programmer sees, and it maps instructions to different physical registers to avoid conflicts."
    },
    {
      id: 7,
      category: "modern-solutions",
      subcategory: "pipelining",
      difficulty: "medium",
      question: "What is result forwarding (bypassing) and why is it useful?",
      keyPoints: ["hardware shortcut that sends result early", "from EX stage output directly to next EX input", "avoids waiting for Write Back stage", "eliminates bubble for RAW hazards"],
      answer: "Result forwarding is like passing a note directly to someone instead of going through the mailbox.\n\nNormally, instruction A calculates a result in the EX (Execution) stage but doesn't save it to the register until the WB (Write Back) stage - 2 cycles later. If instruction B needs that result, it would have to wait.\n\nWith forwarding, there's a special wire that takes the output of instruction A's EX stage and feeds it directly into instruction B's EX stage. The data takes a shortcut, bypassing the MEM and WB stages.\n\nExample: 'ADD r1, r2, r3' (r1 = r2 + r3) followed by 'SUB r4, r1, r5' (r4 = r1 - r5). The SUB needs r1, which ADD just calculated. Without forwarding: 2-cycle stall. With forwarding: zero stall, the result flows directly from ADD's output to SUB's input."
    },
    {
      id: 8,
      category: "modern-solutions",
      subcategory: "ooo-execution",
      difficulty: "hard",
      question: "How does Out-of-Order Execution (OoOE) work? Describe the process.",
      keyPoints: ["executes instructions based on data readiness, not program order", "instruction queue waits for operands", "result queue ensures in-order commit", "avoids pipeline bubbles"],
      answer: "OoOE (Out-of-Order Execution) means the CPU doesn't execute instructions in the order they appear in the program. Instead, it executes whichever instruction has its inputs ready first. Think of it like a restaurant kitchen - the chef doesn't make dishes in order of when they were ordered, but based on which ingredients are ready.\n\nThe process step by step:\n1. Instructions are read from memory and placed into an instruction queue (like a waiting room).\n2. The CPU checks which instructions have all their input data (operands) available.\n3. The first instruction with ready inputs gets executed - even if it appeared later in the program.\n4. The result goes into a result queue (a holding area).\n5. Crucially, results are saved (committed) back to registers in the ORIGINAL program order. So even though instructions execute out of order, the final results look as if they ran in order.\n\nThis avoids pipeline bubbles because while one instruction waits for data, others can run instead of leaving the pipeline idle."
    },
    {
      id: 9,
      category: "modern-solutions",
      subcategory: "ooo-execution",
      difficulty: "hard",
      question: "What is register renaming and what problem does it solve?",
      keyPoints: ["solves WAR and WAW (false/name dependencies)", "CPU has more physical registers than visible to programmer", "mapping circuit assigns architectural to physical registers", "enables safe reordering of instructions"],
      answer: "Register renaming solves a specific problem: what happens when two instructions use the same register name, but don't actually depend on each other's data? These are called 'name dependencies' or 'false dependencies' (WAR and WAW hazards).\n\nImagine two coworkers both need 'desk #3' but for completely different tasks. If you give them separate desks, they can work at the same time. That's exactly what register renaming does.\n\nThe programmer's code uses 'architectural registers' - the visible ones like r0 through r7 (only 8 names). But inside the CPU, there are many more 'physical registers' (say t0 through t15). A mapping circuit dynamically assigns each use of an architectural register to a different physical register.\n\nExample: if two instructions both write to r3, the CPU renames the first write to t9 and the second to t10. Now they don't conflict and can run in parallel or out of order. The CPU keeps track of which physical register currently represents each architectural register."
    },
    {
      id: 10,
      category: "modern-solutions",
      subcategory: "branch-prediction",
      difficulty: "medium",
      question: "What is speculative execution and why is it needed?",
      keyPoints: ["solves control hazards at branch instructions", "CPU guesses which path to take and starts executing", "if guess is wrong, discard the work", "better than stalling and doing nothing"],
      answer: "Speculative execution solves the control hazard problem: when the CPU hits a branch instruction (like an if-else), it doesn't know which path to take until the condition is evaluated. But the pipeline needs to keep fetching instructions NOW - it can't wait.\n\nSo the CPU takes a guess and starts executing instructions from the predicted path. If the guess turns out to be correct - great, no time wasted! If wrong, the CPU throws away (discards) all the speculative work and starts over on the correct path.\n\nTwo approaches:\n1. Greedy prefetching - execute BOTH branches simultaneously, then keep only the correct one. Uses more power but guarantees one path is right.\n2. Predictive execution - use a branch predictor to guess which path is more likely, and only execute that one. More efficient but can be wrong.\n\nThis is much better than doing nothing (stalling) while waiting for the branch to resolve, especially with deep pipelines (20-30 stages) where a stall would waste many cycles."
    },
    {
      id: 11,
      category: "modern-solutions",
      subcategory: "branch-prediction",
      difficulty: "hard",
      question: "Explain static vs dynamic branch prediction. How does 2-bit prediction work?",
      keyPoints: ["static: simple fixed rule based on direction", "dynamic: learns from runtime history", "1-bit: flips prediction on every mistake", "2-bit: needs 2 consecutive mistakes to change prediction"],
      answer: "Branch prediction guesses whether a conditional jump will be taken or not.\n\nStatic prediction uses a simple fixed rule with no learning:\n- If the jump goes backward (like returning to the top of a loop), predict 'taken' (the loop will repeat).\n- If the jump goes forward, predict 'not taken'.\nThis works well for loops but can't adapt.\n\nDynamic prediction learns from what happened before, storing history in a BTB (Branch Target Buffer - a small table in hardware):\n\n1-bit predictor: remembers one bit - was the branch taken last time? If yes, predict taken. Problem: at the end of a loop, it mispredicts twice: once when the loop exits (predicted taken but wasn't), and once when the loop starts again (now predicts not-taken but it is taken).\n\n2-bit predictor: uses 4 states - Strongly Taken, Weakly Taken, Weakly Not-Taken, Strongly Not-Taken. It takes TWO consecutive wrong predictions to flip the direction. So when a loop exits once (one misprediction), the predictor stays on 'Weakly Taken' instead of flipping. Next time the loop runs, it still correctly predicts taken. This handles loop exits much better."
    },
    {
      id: 12,
      category: "modern-solutions",
      subcategory: "superscalar",
      difficulty: "medium",
      question: "What is a superscalar processor? How does it differ from a simple pipelined processor?",
      keyPoints: ["finishes more than one instruction per clock cycle", "has multiple execution units (ALUs, etc.)", "hardware automatically finds parallelism", "uses an instruction window to look ahead"],
      answer: "A regular pipelined processor is like a single assembly line - it can work on many instructions at once (in different stages), but only completes one instruction per clock cycle at best.\n\nA superscalar processor is like having MULTIPLE assembly lines running side by side. It has several execution units (multiple ALUs = Arithmetic Logic Units, multiple floating-point units, etc.), so it can start and finish more than one instruction per clock cycle.\n\nThe hardware automatically looks at upcoming instructions through an 'instruction window' (a set of instructions the CPU can see ahead) and finds ones that are independent of each other. Those independent instructions get sent to different execution units simultaneously.\n\nThe CPU uses ILP (Instruction Level Parallelism) and OoOE (Out-of-Order Execution) to maximize how many instructions run in parallel. The bigger the instruction window, the more opportunities the CPU has to find independent instructions.\n\nKey difference: pipelined = 1 instruction/cycle max throughput. Superscalar = multiple instructions/cycle."
    },
    {
      id: 13,
      category: "modern-solutions",
      subcategory: "vliw",
      difficulty: "medium",
      question: "What is VLIW? How does it compare to superscalar?",
      keyPoints: ["VLIW = Very Long Instruction Word", "compiler packs parallel instructions into bundles", "simpler hardware than superscalar", "programs are not portable between different VLIW chips"],
      answer: "VLIW (Very Long Instruction Word) is an alternative way to run multiple instructions in parallel, but instead of the hardware figuring out what can run together (like superscalar does), the COMPILER does all that work ahead of time.\n\nThe compiler analyzes the code and packs multiple small instructions into one big 'bundle' (the 'very long instruction word'). Each slot in the bundle runs on a different execution unit simultaneously. If the compiler can't find enough parallel work, it fills empty slots with NOP (No Operation - do nothing) instructions.\n\nVLIW pros: simpler hardware (no complex scheduling logic), can have shorter clock cycles and pack more execution units on the chip.\n\nVLIW cons: needs a special smart compiler, programs compiled for one VLIW chip won't work on a different one (not portable), and the NOP padding wastes memory.\n\nSuperscalar pros: programs are portable, hardware adapts dynamically.\nSuperscalar cons: complex hardware needed for scheduling.\n\nIntel's Itanium processor used a VLIW-like approach called EPIC (Explicitly Parallel Instruction Computing)."
    },
    {
      id: 14,
      category: "modern-solutions",
      subcategory: "vliw",
      difficulty: "hard",
      question: "Given the expression (x-y)*(x+y)/(z*z*8), show how VLIW can speed it up compared to scalar execution.",
      keyPoints: ["find which operations are independent", "independent operations go in the same bundle", "6 scalar steps become 3 VLIW bundles", "data dependencies limit how much you can parallelize"],
      answer: "Let's calculate (x-y)*(x+y)/(z*z*8) with x in r1, y in r2, z in r3.\n\nScalar (one at a time) - 6 instructions:\n1. SUB r4, r1, r2  (r4 = x-y)\n2. ADD r5, r1, r2  (r5 = x+y)\n3. MUL r6, r4, r5  (r6 = (x-y)*(x+y)) - needs results from steps 1 & 2\n4. MUL r7, r3, r3  (r7 = z*z)\n5. ASL r8, r7, #3  (r8 = z*z*8, shift left by 3 = multiply by 8) - needs step 4\n6. DIV r9, r6, r8  (final result) - needs steps 3 & 5\n\nVLIW (parallel bundles) - 3 bundles:\nBundle 1: [SUB r4,r1,r2 | ADD r5,r1,r2 | MUL r7,r3,r3]\n  All three only need x, y, z which are already available - so they can run together!\nBundle 2: [MUL r6,r4,r5 | ASL r8,r7,#3 | (empty)]\n  These need bundle 1's results, but are independent of each other.\nBundle 3: [DIV r9,r6,r8 | (empty) | (empty)]\n  Needs both results from bundle 2.\n\nResult: 3 cycles instead of 6 = 2x speedup. We can't do better because of data dependencies."
    },
    {
      id: 15,
      category: "modern-solutions",
      subcategory: "vector-processors",
      difficulty: "medium",
      question: "What are vector processors and how do they achieve parallelism?",
      keyPoints: ["SIMD = Single Instruction Multiple Data", "one big register holds multiple values", "one instruction processes all values at once", "examples: MMX, SSE, AVX, Neon"],
      answer: "Vector processors use SIMD (Single Instruction, Multiple Data) - one instruction works on many data items at once.\n\nImagine you need to add 4 pairs of numbers. A normal (scalar) processor does it one pair at a time - 4 separate add instructions. A vector processor packs all 4 numbers into one big register, and a single add instruction adds all 4 pairs simultaneously.\n\nThey use extra-wide registers to hold multiple values:\n- MMX (MultiMedia eXtension): 64-bit registers holding e.g. 8 bytes or 4 shorts. 8 registers called MM0-MM7.\n- SSE (Streaming SIMD Extensions): 128-bit registers, e.g. 4 floats at once. 8-16 registers called XMM0-XMM15.\n- AVX (Advanced Vector eXtensions): 256-bit registers (YMM0-YMM15), even wider.\n- AVX-512: 512-bit registers (ZMM0-ZMM31), can process 16 floats at once.\n- Neon (ARM's version): 128-bit registers for both integer and float.\n\nThese registers nest inside each other: the lower half of a YMM register IS the XMM register, and the lower half of XMM is MM."
    },
    {
      id: 16,
      category: "modern-solutions",
      subcategory: "vector-processors",
      difficulty: "medium",
      question: "Explain the evolution of SIMD extensions in x86: MMX, SSE, AVX, AVX-512.",
      keyPoints: ["register width keeps doubling", "MMX shared registers with floating-point unit", "SSE got its own dedicated registers", "AVX doubled to 256-bit, AVX-512 to 512-bit"],
      answer: "Each generation made the registers wider so more data can be processed in parallel:\n\nMMX (1997, MultiMedia eXtension): 64-bit registers (MM0-MM7), 8 of them. Only integers. Major flaw: shared the same physical registers as the FPU (Floating Point Unit), so you couldn't use MMX and floating-point math at the same time.\n\nSSE (Streaming SIMD Extensions, 1999): fixed MMX's problem with brand new dedicated 128-bit registers (XMM0-XMM15). Mainly for floats - can process 4 x 32-bit floats at once. SSE2 added integer support too (can also do 16 x 8-bit, 8 x 16-bit, 4 x 32-bit, 2 x 64-bit integers).\n\nAVX (Advanced Vector eXtensions, 2011): doubled to 256-bit registers (YMM0-YMM15). AVX2 added full integer support.\n\nAVX-512 (2016): doubled again to 512-bit registers (ZMM0-ZMM31), now 32 registers. Can process 16 floats or 64 bytes at once.\n\nThey nest like Russian dolls: ZMM0 contains YMM0, which contains XMM0, which contains MM0."
    },
    {
      id: 17,
      category: "modern-solutions",
      subcategory: "vector-processors",
      difficulty: "hard",
      question: "What is loop dependency? Which types are vectorizable and which are not?",
      keyPoints: ["about whether loop iterations depend on each other", "RAW between iterations = cannot vectorize", "WAR between iterations = can vectorize", "WAW between iterations = cannot vectorize"],
      answer: "Loop dependency asks: does one iteration of a loop depend on a previous iteration? This matters because vectorization (SIMD) processes multiple iterations at once - which only works if iterations are independent.\n\nRAW (Read After Write) between iterations - NOT vectorizable:\n  for(i=1; i<N; i++) x[i] = x[i-1] + y[i];\n  Each iteration needs the PREVIOUS iteration's result. You can't run them in parallel because iteration 3 needs iteration 2's answer, which needs iteration 1's answer.\n\nWAR (Write After Read) between iterations - YES vectorizable:\n  for(i=0; i<N-1; i++) x[i] = x[i+1] + y[i];\n  Each iteration reads from a LATER position and writes to the current one. If you read all values first (before any writes), there's no conflict.\n\nRAR (Read After Read) - YES vectorizable:\n  for(i=0; i<N; i++) x[i] = y[i%2] + z[i];\n  Multiple iterations read the same data - no problem, reads don't conflict.\n\nWAW (Write After Write) - NOT vectorizable:\n  for(i=0; i<N; i++) x[i%2] = y[i] + z[i];\n  Multiple iterations write to the same location - the final value depends on which iteration runs last."
    },
    {
      id: 18,
      category: "modern-solutions",
      subcategory: "loop-unrolling",
      difficulty: "easy",
      question: "What is loop unrolling and why does it improve performance?",
      keyPoints: ["copy the loop body multiple times", "fewer loop overhead operations", "easier for CPU to find independent instructions", "helps superscalar, vector, and VLIW processors"],
      answer: "Loop unrolling is a simple optimization: instead of doing one thing per loop iteration, you copy the loop body several times and do multiple things per iteration.\n\nOriginal: for(i=0; i<100; i++) a[i] = b[i] + c[i];  (100 iterations)\n\nUnrolled: for(i=0; i<100; i+=4) {\n  a[i]   = b[i]   + c[i];\n  a[i+1] = b[i+1] + c[i+1];\n  a[i+2] = b[i+2] + c[i+2];\n  a[i+3] = b[i+3] + c[i+3];\n}  (25 iterations doing 4 items each)\n\nWhy it helps:\n1. Less loop overhead - fewer comparisons (i<100) and increments (i++). 25 checks instead of 100.\n2. More independent instructions visible at once - a superscalar processor can find and execute the 4 additions in parallel.\n3. Better for vector processors - the compiler can more easily combine the 4 operations into one SIMD instruction.\n4. Better for VLIW (Very Long Instruction Word) - more instructions to fill the bundle slots."
    },
    {
      id: 19,
      category: "modern-solutions",
      subcategory: "hyper-threading",
      difficulty: "medium",
      question: "What is hyper-threading (SMT)? How does it differ from having actual multiple cores?",
      keyPoints: ["SMT = Simultaneous MultiThreading", "one physical core pretends to be two logical cores", "shares execution units but has separate register sets", "fills pipeline bubbles with work from other thread"],
      answer: "Hyper-threading is Intel's name for SMT (Simultaneous MultiThreading). The idea: one physical core pretends to be two 'logical' cores to the operating system.\n\nHow it works: the core has TWO sets of registers and program counters (so it can track two threads), but only ONE set of execution units (ALUs, etc.). When thread A stalls (waiting for memory, branch resolution, etc.), thread B can immediately use the execution units instead of leaving them idle. It fills the pipeline bubbles with useful work from the other thread.\n\nDifference from real multi-core:\n- Multi-core: each core has its OWN execution units. Two cores can truly run two instructions at the exact same moment. More speedup but costs more chip area and power.\n- Hyper-threading: shares execution units between threads. Can't truly run both at the same instant - it just keeps the existing hardware busier. Less speedup (typically 15-30% boost, not 100%) but almost free in terms of chip area.\n\nThe OS needs to support it to schedule threads properly across logical cores."
    },
    {
      id: 20,
      category: "modern-solutions",
      subcategory: "multicore",
      difficulty: "medium",
      question: "What is the difference between multi-core, many-core, homogeneous, and heterogeneous systems?",
      keyPoints: ["multi-core = few cores on one chip", "many-core = hundreds/thousands of cores", "homogeneous = all cores are the same type", "heterogeneous = mix of different processor types"],
      answer: "Multi-core: a chip with a few independent cores (2, 4, 8, 16...). Each core can run its own program/thread. Used in everyday PCs and phones. Cores typically have their own L1 cache (sometimes L2) but share L3 cache.\n\nMany-core: a chip with hundreds or thousands of smaller cores. Used in servers and supercomputers where you need massive parallel processing. GPUs (Graphics Processing Units) are essentially many-core processors.\n\nHomogeneous (symmetric): all processors/cores are the same type with shared memory. Every core can do the same work equally well.\n\nHeterogeneous: different types of processors working together, each specialized for different tasks:\n- ARM big.LITTLE: some cores are powerful but power-hungry ('big'), others are slower but energy-efficient ('LITTLE'). The phone uses big cores for demanding tasks and LITTLE cores for basic ones to save battery.\n- CPU + GPU: CPU handles general tasks, GPU handles parallel math/graphics.\n- Other accelerators: FPU (Floating Point Unit), FPGA (Field-Programmable Gate Array), DSP (Digital Signal Processor), AI accelerators, cryptography accelerators like AES-NI."
    },
    {
      id: 21,
      category: "modern-solutions",
      subcategory: "gpu",
      difficulty: "medium",
      question: "Compare CPU and GPU architectures. When would you use each?",
      keyPoints: ["CPU = few powerful cores, optimized for serial tasks", "GPU = thousands of simple cores, optimized for parallel tasks", "CPU has low latency, GPU has high throughput", "GPGPU = using GPU for non-graphics work"],
      answer: "Think of CPU vs GPU as: a few expert workers vs. an army of basic workers.\n\nCPU (Central Processing Unit):\n- Few powerful cores (typically 4-16 in consumer chips)\n- Optimized for low latency - getting ONE thing done as fast as possible\n- Shallow pipeline (under 30 stages)\n- Big cache, complex branch prediction and out-of-order logic\n- Best for: sequential logic, decision-heavy code, operating system tasks, running applications\n\nGPU (Graphics Processing Unit):\n- Thousands of simple cores\n- Optimized for high throughput - getting MANY things done at once\n- Deep pipeline (over 100 stages)\n- Small cache per core, hardware-managed threads\n- Huge memory bandwidth (can reach TB/s)\n- Best for: graphics rendering, matrix math, AI training, any task where you repeat the same operation on massive amounts of data\n\nGPGPU (General-Purpose GPU) means using the GPU for non-graphics computation. Programmed with CUDA (NVIDIA's language), OpenCL (open standard), or MATLAB. The CPU sends parallel work to the GPU, which processes it and sends results back."
    },
    {
      id: 22,
      category: "modern-solutions",
      subcategory: "gpu",
      difficulty: "hard",
      question: "Describe the architecture of an NVIDIA GPU (Tesla architecture). What are SM, SP, SFU?",
      keyPoints: ["SM = Streaming Multiprocessor (the main building block)", "SP = Streaming Processor (individual compute core)", "SFU = Special Function Unit (for sin, sqrt, etc.)", "TPC = Texture/Processor Cluster (groups of SMs)"],
      answer: "NVIDIA's Tesla GPU architecture is organized hierarchically, like a company with departments:\n\nThe GPU chip contains multiple TPCs (Texture/Processor Clusters). Each TPC has:\n- 2 SMs (Streaming Multiprocessors) - these are the main work units\n- 1 TU (Texture Unit) - handles texture sampling for graphics\n\nEach SM (Streaming Multiprocessor) contains:\n- 1 MIU (Multithreaded Instruction Unit) - schedules and manages hundreds of threads in hardware (no OS needed)\n- A small cache\n- 8 SPs (Streaming/Scalar Processors) - these are the actual compute cores that do math operations. Each has its own register file (RF)\n- 2 SFUs (Special Function Units) - handle expensive math like sin(), cos(), 1/sqrt(x), which would take many cycles on a regular core\n- Shared memory - fast memory that threads within the same SM can use to communicate\n\nAll TPCs connect through an Interconnection Network to:\n- ROPs (Raster Operation Processors) - handle final pixel operations\n- L2 cache\n- VRAM (Video RAM) - the GPU's own dedicated memory\n\nThis design is massively parallel: one GPU can have thousands of SPs all running simultaneously."
    },
    {
      id: 23,
      category: "modern-solutions",
      subcategory: "fpga",
      difficulty: "easy",
      question: "What is an FPGA and what makes it different from a CPU?",
      keyPoints: ["FPGA = Field-Programmable Gate Array", "a chip with reconfigurable logic circuits", "parallel by nature, not sequential", "programmed with hardware description languages"],
      answer: "An FPGA (Field-Programmable Gate Array) is a special chip filled with programmable logic circuits that you can rewire after manufacturing.\n\nThink of a CPU like a general-purpose calculator that follows instructions one by one. An FPGA is more like a box of LEGO - you can build any digital circuit you want, and rebuild it differently whenever you need.\n\nKey differences from a CPU:\n- A CPU executes instructions sequentially (or with limited parallelism). An FPGA is parallel by nature - all its circuits run simultaneously, like having thousands of tiny calculators working at once.\n- A CPU is programmed with software languages (C, Python). An FPGA is programmed with hardware description languages: VHDL or Verilog, which describe circuits, not steps.\n- A CPU is general-purpose. An FPGA can be customized for a specific task and often runs that task much faster.\n\nCool feature: you can even build an entire processor design INSIDE an FPGA - this is called a 'soft-processor.' Some modern chips even have an FPGA built alongside a regular CPU for flexible acceleration."
    },
    {
      id: 24,
      category: "modern-solutions",
      subcategory: "numa",
      difficulty: "medium",
      question: "What is NUMA architecture? How does it differ from uniform memory access?",
      keyPoints: ["NUMA = Non-Uniform Memory Access", "each processor has its own local memory", "can access other processors' memory but it's slower", "allows more simultaneous memory operations"],
      answer: "NUMA (Non-Uniform Memory Access) is a memory design for multi-processor systems.\n\nIn a regular system (UMA = Uniform Memory Access), all processors share one pool of memory. Every processor takes the same time to access any memory location. Problem: as you add more processors, they all fight over the same memory bus - it becomes a bottleneck.\n\nIn NUMA, each processor has its own LOCAL memory directly attached to it. Accessing local memory is fast. But processors can ALSO reach other processors' memory through an interconnection network - it just takes longer (the access time is 'non-uniform' - it depends on WHERE the memory is).\n\nAdvantage: multiple processors can read/write their local memory simultaneously without interfering with each other. Much better scalability.\n\nDisadvantage: programmers and the OS need to be smart about placing data near the processor that uses it. If processor A constantly accesses processor B's memory, performance suffers.\n\nNUMA is commonly used in server systems and clusters where multiple processor nodes are connected together."
    },
    {
      id: 25,
      category: "modern-solutions",
      subcategory: "performance",
      difficulty: "medium",
      question: "Explain the performance equation T = NI x eCPI x 1/f. What affects each factor?",
      keyPoints: ["T = how long the program takes to run", "NI = how many instructions the program has", "eCPI = how many clock cycles each instruction needs on average", "f = how fast the clock ticks"],
      answer: "The performance equation tells you how long a program takes to run:\n\nT = NI x eCPI x 1/f\n\nT (Time) = total execution time in seconds. This is what we want to minimize.\n\nNI (Number of Instructions) = how many machine code instructions the program executes (counting loops - if a loop runs 100 times, count those instructions 100 times). Affected by: the algorithm, the compiler's quality, and the ISA (Instruction Set Architecture). A CISC (Complex Instruction Set Computer) processor might need fewer instructions than a RISC (Reduced Instruction Set Computer) for the same task because CISC has more powerful individual instructions.\n\neCPI (effective Cycles Per Instruction) = on average, how many clock cycles each instruction needs. Affected by: instruction types (multiply takes more cycles than add), cache hits/misses, pipeline stalls, superscalar parallelism. A superscalar processor can achieve eCPI below 1 (multiple instructions per cycle).\n\nf (frequency) = clock speed in Hz. Higher frequency = faster clock ticks. Limited by heat and power consumption.\n\nTo make programs faster: reduce NI (better algorithms), reduce eCPI (better microarchitecture), or increase f (better chip technology).\n\nPerformance is often measured in FLOPS (FLoating-point Operations Per Second)."
    },
    {
      id: 26,
      category: "modern-solutions",
      subcategory: "performance",
      difficulty: "hard",
      question: "Explain Amdahl's law. If 20% of a program is sequential, what's the maximum speedup with 8 processors?",
      keyPoints: ["S(N) = 1/(A + (1-A)/N)", "A = fraction that must run sequentially", "sequential part puts a hard ceiling on speedup", "even infinite processors can't overcome the sequential bottleneck"],
      answer: "Amdahl's law answers the question: 'If I add more processors, how much faster will my program get?'\n\nThe formula: S(N) = 1 / (A + (1-A)/N)\n- S = speedup (how many times faster)\n- N = number of processors\n- A = the fraction of the program that MUST run sequentially (can't be parallelized)\n- (1-A) = the fraction that CAN run in parallel\n\nThe intuition: even with 1000 processors, you still have to wait for the sequential part to finish one step at a time. The sequential part is the bottleneck.\n\nWith A = 0.2 (20% sequential) and N = 8:\nS(8) = 1 / (0.2 + 0.8/8) = 1 / (0.2 + 0.1) = 1 / 0.3 = 3.33x speedup\n\nWith infinite processors:\nS(infinity) = 1 / (0.2 + 0) = 1 / 0.2 = 5x maximum speedup, EVER!\n\nSo even with a million processors, if 20% of your code is sequential, you can never go faster than 5x. This shows why reducing the sequential portion is so important for parallel computing."
    },
    // ===== CACHE =====
    {
      id: 27,
      category: "cache",
      subcategory: "locality",
      difficulty: "easy",
      question: "What are the locality principles? Why are they important for cache?",
      keyPoints: ["spatial locality = nearby data will be used soon", "temporal locality = same data will be used again soon", "these are the reason cache works at all", "without locality, cache would be useless"],
      answer: "Locality principles are the reason cache works. Without them, we couldn't predict what data the CPU will need next, and cache would be useless.\n\nSpatial locality: 'if you used this address, you'll probably use nearby addresses soon.'\n- Why? Programs execute instructions one after another (sequential), and data is often stored in arrays (consecutive memory). When you access array element [5], you'll likely access [6], [7], [8] soon. That's why cache loads an entire BLOCK of data (e.g., 64 bytes) when you request just one byte - the neighbors come along for free.\n\nTemporal locality: 'if you used this address, you'll probably use the SAME address again soon.'\n- Why? Loops! When a loop runs, it executes the same instructions over and over. Variables used inside loops are accessed repeatedly. Cache keeps recently used data so it's fast to access again.\n\nCache hit rates are typically over 90% thanks to these principles - meaning 9 out of 10 memory accesses are served from fast cache instead of slow RAM (Random Access Memory)."
    },
    {
      id: 28,
      category: "cache",
      subcategory: "structure",
      difficulty: "medium",
      question: "Describe the structure and basic operation of a CPU cache.",
      keyPoints: ["organized into lines (blocks)", "each line has: tag + flags + data block", "cache hit = data found in cache (fast)", "cache miss = data not in cache, must fetch from RAM (slow)"],
      answer: "Cache is a small, fast memory (built from SRAM = Static RAM, which is fast but expensive) that sits between the CPU and main memory (DRAM = Dynamic RAM, which is slow but cheap).\n\nStructure - cache is divided into 'lines' (or 'blocks'). Each line contains:\n- Data Block: a copy of a chunk of memory (e.g., 64 bytes of consecutive data from RAM)\n- Tag: identifies WHICH memory address this block came from (like a label on a storage box)\n- Flags: status bits including 'valid' (is this data real?) and 'dirty' (has it been modified?)\n\nHow it works:\n1. The CPU says 'I need data at address X'\n2. The cache controller checks all tags: does any line have data from address X?\n3. Cache HIT: yes! The data is returned immediately from the fast cache.\n4. Cache MISS: no. The cache reads the entire block containing address X from slow RAM, stores it in a cache line, then returns the data to the CPU.\n\nImportant: cache is transparent to the programmer - you don't explicitly manage it. The hardware handles everything automatically."
    },
    {
      id: 29,
      category: "cache",
      subcategory: "associativity",
      difficulty: "hard",
      question: "Explain the three types of cache associativity. What are the trade-offs?",
      keyPoints: ["direct-mapped = each address has exactly 1 possible location", "fully associative = address can go in any location", "N-way set-associative = address can go in N possible locations", "trade-off between speed, hit rate, and hardware cost"],
      answer: "Associativity answers: 'when data comes from RAM, where can it be stored in the cache?'\n\nDirect-mapped (1-way): each memory address can only go in ONE specific cache line, determined by its address. Like assigned seating in a classroom.\n- Pro: very fast lookup - just check one line.\n- Con: if two addresses map to the same line, they keep evicting each other even if other lines are empty (called 'conflict misses'). Bad hit rate.\n\nFully associative: any address can go in ANY cache line. Like open seating - sit anywhere.\n- Pro: best possible hit rate - no conflict misses.\n- Con: very expensive! To check if data is cached, you must compare the tag against ALL lines simultaneously. Requires special hardware called CAM (Content-Addressable Memory).\n\nN-way set-associative: the cache is divided into sets, each set has N lines. An address maps to one specific set, but can use any of the N lines within that set. Like: 'you must sit in row 3, but you can pick any of the 4 seats in that row.'\n- This is the practical compromise used in real CPUs. 4-way and 8-way are common.\n- Direct-mapped is the special case where N=1.\n- Fully associative is the special case where there's only 1 set containing all lines."
    },
    {
      id: 30,
      category: "cache",
      subcategory: "replacement",
      difficulty: "easy",
      question: "What replacement policies are used when a cache line must be overwritten?",
      keyPoints: ["random = pick any line, simple but not smart", "LRU = Least Recently Used, evict oldest unused", "not most recently used = simpler version of LRU"],
      answer: "When the cache is full and needs to load new data, it must evict (remove) an existing line. The replacement policy decides which one to kick out:\n\n1. Random: just pick any line randomly.\n   - Pro: extremely simple to implement in hardware.\n   - Con: might evict data you'll need again very soon. Not very effective.\n\n2. LRU (Least Recently Used): evict the line that hasn't been accessed for the longest time. The logic is: 'if you haven't used it in a while, you probably won't need it soon.'\n   - Pro: very effective - keeps frequently used data in cache.\n   - Con: requires tracking the access order of all lines, which needs extra hardware (timestamps or access counters). Gets complex with many lines.\n\n3. Not Most Recently Used: don't evict the line that was used MOST recently, but among all the others, you can pick any.\n   - Pro: captures the most important insight of LRU (the thing you just used is likely needed again) with much simpler hardware.\n   - Con: not as precise as full LRU, but usually good enough.\n\nThis is a good balance of effectiveness and simplicity."
    },
    {
      id: 31,
      category: "cache",
      subcategory: "write-policy",
      difficulty: "medium",
      question: "Compare write-through and write-back cache policies. What is the dirty bit?",
      keyPoints: ["write-through = write to cache AND RAM at the same time", "write-back = write only to cache, update RAM later", "dirty bit = flag that says 'this line was modified'", "write-back is faster but more complex"],
      answer: "When the CPU writes (modifies) data, the cache needs a policy for keeping RAM in sync:\n\nWrite-through: every time you write to the cache, the same data is ALSO written to RAM immediately.\n- Pro: RAM always has the latest data. Simple and safe.\n- Con: slow! Every write has to wait for the slow RAM. Cache doesn't help with write speed at all.\n\nWrite-back: writes ONLY update the cache. RAM is NOT updated immediately.\n- The modified cache line gets a 'dirty bit' flag set to 1, meaning 'this line has been changed and is different from what's in RAM.'\n- RAM only gets updated when the dirty line needs to be evicted (replaced by new data). At that point, the dirty line is 'written back' to RAM before being overwritten.\n- Pro: much faster! Most writes only touch the fast cache. RAM is only updated when absolutely necessary.\n- Con: RAM has stale (outdated) data. In multi-processor systems, this causes cache coherence problems - different CPUs might see different values for the same address. DMA (Direct Memory Access) operations also need special handling."
    },
    {
      id: 32,
      category: "cache",
      subcategory: "address-structure",
      difficulty: "hard",
      question: "How is a memory address divided for cache lookup? Calculate the address bits for an 8KB 4-way cache with 64B blocks and 32-bit addresses.",
      keyPoints: ["address = [tag | index | offset]", "offset bits = log2(block size)", "index bits = log2(number of sets)", "tag bits = address width - index - offset"],
      answer: "Every memory address is split into 3 parts for cache lookup:\n\n[Tag | Index | Offset]\n\nOffset (rightmost bits): which BYTE within the block do you want?\n- If block is 64 bytes, you need log2(64) = 6 bits to address any byte in it.\n\nIndex (middle bits): which SET in the cache does this address map to?\n- First calculate how many sets: total_cache_size / (block_size x number_of_ways)\n- Then index bits = log2(number_of_sets)\n\nTag (leftmost bits): whatever bits are left. Stored in the cache to uniquely identify which memory block this cache line holds.\n\nCalculation for 8KB 4-way cache, 64B blocks, 32-bit address:\n1. Offset = log2(64) = 6 bits\n2. Number of sets = 8192 bytes / (64 bytes x 4 ways) = 32 sets\n3. Index = log2(32) = 5 bits\n4. Tag = 32 - 5 - 6 = 21 bits\n\nResult: [21-bit tag | 5-bit index | 6-bit offset]\n\nTo look up an address: use the index to find the set, then compare the tag against all 4 lines in that set. If a tag matches and the valid bit is set, it's a hit!"
    },
    {
      id: 33,
      category: "cache",
      subcategory: "hierarchy",
      difficulty: "medium",
      question: "Describe the cache hierarchy in a modern multi-core processor.",
      keyPoints: ["L1 = fastest and smallest, private per core, split into instruction and data", "L2 = medium, usually private per core", "L3 = largest and slowest cache, shared among all cores", "each level is bigger but slower"],
      answer: "Modern processors have multiple levels of cache, like a series of increasingly large warehouses getting farther from the factory:\n\nL1 cache (Level 1) - closest to the core:\n- Fastest: ~1-2 clock cycles to access\n- Smallest: typically 32-64 KB per core\n- Split into two parts: L1i (instruction cache) and L1d (data cache)\n- Each core has its OWN private L1\n\nL2 cache (Level 2):\n- Slower: ~5-10 clock cycles\n- Larger: typically 256 KB - 1 MB per core\n- Unified (holds both instructions and data)\n- Usually private to each core\n\nL3 cache (Level 3):\n- Slowest cache level: ~20-40 clock cycles\n- Largest: several MB to tens of MB\n- SHARED among all cores on the same processor chip\n- When one core loads data into L3, other cores can find it there too\n\nFor comparison, accessing main RAM takes ~100+ clock cycles - much slower than any cache level.\n\nThe hierarchy works because of locality: most accesses hit L1 (tiny, fast), some miss to L2, fewer miss to L3, and very few go all the way to RAM."
    },
    {
      id: 34,
      category: "cache",
      subcategory: "coherence",
      difficulty: "hard",
      question: "What is cache coherence? Explain the MESI protocol states and transitions.",
      keyPoints: ["problem: multiple cores may cache the same data with different values", "MESI = Modified, Exclusive, Shared, Invalid", "invalidation-based: tell others to discard their copy when you write", "ensures all cores see consistent data"],
      answer: "Cache coherence problem: in a multi-core processor, each core has its own L1/L2 cache. If two cores cache the same memory address and one core modifies it, the other core's copy becomes stale (outdated). We need a protocol to keep them consistent.\n\nMESI is the most common solution. Each cache line has one of 4 states:\n\nM = Modified: 'I'm the ONLY one with this data, AND I've changed it (it's dirty).' RAM has an outdated copy. If another core wants this data, I must share my updated version.\n\nE = Exclusive: 'I'm the ONLY one with this data, but I HAVEN'T changed it (it's clean).' Matches RAM. I can write to it freely (just change state to M) without telling anyone.\n\nS = Shared: 'Multiple cores have copies of this data, and nobody has changed it (all copies are clean).' If I want to write, I must first tell ALL other cores to invalidate (throw away) their copies.\n\nI = Invalid: 'I don't have a valid copy of this data.' If I need it, I must fetch it from another cache or RAM.\n\nKey transitions:\n- Core reads, no one else has it -> E (Exclusive)\n- Core reads, someone else has it -> S (Shared) for both\n- Core writes to E or S line -> M (Modified), others become I (Invalid)\n- Another core reads my M line -> I write back to RAM, both become S"
    },
    {
      id: 35,
      category: "cache",
      subcategory: "programming",
      difficulty: "medium",
      question: "How does cache affect programming? Why is row-major matrix traversal faster than column-major in C?",
      keyPoints: ["C stores 2D arrays row by row in memory", "row traversal = accessing consecutive memory addresses = cache friendly", "column traversal = jumping around in memory = cache misses", "if data fits in cache, performance is much better"],
      answer: "Cache affects how you should write code, especially with arrays and matrices.\n\nIn C, a 2D array like int a[100][100] is stored ROW by ROW in memory:\na[0][0], a[0][1], a[0][2], ... a[0][99], a[1][0], a[1][1], ...\n\nRow-by-row traversal (FAST - cache friendly):\nfor(i=0; i<100; i++)\n  for(j=0; j<100; j++)\n    sum += a[i][j];\nThis accesses memory sequentially: a[0][0], a[0][1], a[0][2]... When the cache loads a block (e.g., 64 bytes = 16 ints), the next 15 accesses are all in that same block. Tons of cache hits!\n\nColumn-by-column traversal (SLOW - cache unfriendly):\nfor(j=0; j<100; j++)\n  for(i=0; i<100; i++)\n    sum += a[i][j];\nThis jumps 100 elements (400 bytes) between each access: a[0][0], a[1][0], a[2][0]... Each access likely lands in a DIFFERENT cache block, causing a cache miss almost every time for large matrices.\n\nAlso: if your entire dataset fits within the cache, your program runs much faster. When data exceeds cache size, performance drops noticeably - you can see a clear 'cliff' in benchmark graphs at each cache level boundary."
    },
    {
      id: 36,
      category: "cache",
      subcategory: "operation",
      difficulty: "hard",
      question: "Walk through the cache read and write flowcharts for a write-back cache.",
      keyPoints: ["on miss: find a line to evict", "check dirty bit before evicting", "if dirty, write back to RAM first, then load new data", "on write hit: update cache and set dirty bit"],
      answer: "Read operation (CPU wants to READ data at address X):\n1. Check: is address X in the cache? (Compare tags in the correct set)\n2. HIT -> Return the data immediately. Done!\n3. MISS -> Need to load from RAM, but first make room:\n   a. Pick a cache line to evict (using replacement policy: random, LRU, etc.)\n   b. Is the chosen line DIRTY (modified)? If YES -> write its data back to RAM first (can't lose the changes!). If NO -> just overwrite it (RAM already has the same data).\n   c. Load the block containing address X from RAM into the freed line. Set tag to match address X. Set dirty bit to 0 (clean). Set valid bit to 1.\n   d. Return the requested data.\n\nWrite operation (CPU wants to WRITE data to address X):\n1. Check: is address X in the cache?\n2. HIT -> Write the new value into the cache block. Set the dirty bit to 1 (modified). Done!\n3. MISS -> Same eviction process as read miss:\n   a. Pick a line, write it back if dirty, load the block from RAM.\n   b. THEN write the new value into the loaded block. Set dirty bit to 1.\n\nThe dirty bit is the key to write-back efficiency: it lets the cache delay RAM writes until absolutely necessary (when the line is evicted)."
    },
    {
      id: 37,
      category: "modern-solutions",
      subcategory: "pipelining",
      difficulty: "easy",
      question: "What is the theoretical throughput of a 5-stage pipeline? What is the latency?",
      keyPoints: ["throughput = 1 instruction per clock cycle", "latency = 5 clock cycles per instruction", "throughput and latency are different things"],
      answer: "These are two different measurements:\n\nLatency = how long does ONE instruction take from start to finish?\nAnswer: 5 clock cycles (it must go through all 5 stages: IF, ID, EX, MEM, WB).\nPipelining does NOT change this.\n\nThroughput = how many instructions complete per clock cycle?\nAnswer: 1 instruction per cycle (once the pipeline is full, one instruction finishes every cycle).\n\nThe magic of pipelining is all about throughput, not latency:\n- Without pipeline: 1 instruction every 5 cycles = 0.2 instructions/cycle\n- With pipeline: 1 instruction every 1 cycle = 1.0 instruction/cycle\n- That's a 5x improvement in throughput!\n\nAnalogy: each car takes 60 minutes to go through a car wash (latency = 60 min). But if the car wash is pipelined into stages, a clean car comes out every 12 minutes (throughput = 1 car per 12 min). Each car still takes 60 minutes inside, but cars finish more frequently."
    },
    {
      id: 38,
      category: "modern-solutions",
      subcategory: "pipelining",
      difficulty: "medium",
      question: "What is a pipeline bubble and when does it occur?",
      keyPoints: ["a bubble = an empty/wasted cycle in the pipeline", "caused by hazards (data, structural, control)", "the CPU inserts NOPs to delay the problematic instruction", "reduces throughput but still better than no pipeline"],
      answer: "A pipeline bubble (also called a stall) is an empty, wasted cycle inserted into the pipeline when a hazard is detected.\n\nImagine an assembly line where one station suddenly says 'I can't process this item yet - the previous station hasn't finished preparing it!' The line pauses for that item, creating a gap (bubble) that flows through the pipeline.\n\nWhen it happens: the control unit detects a hazard after the IF (Instruction Fetch) stage and inserts NOP (No Operation) instructions to delay the dependent instruction.\n\nExample: ADD r1, r2, r3 (calculates r1) followed by SUB r4, r1, r5 (needs r1). Without forwarding, SUB can't execute until ADD writes r1 back in the WB stage. So 2 bubble cycles are inserted between them.\n\nThe pipeline looks like:\nCycle 1: ADD in IF\nCycle 2: ADD in ID, SUB in IF\nCycle 3: ADD in EX, (SUB stalls - bubble)\nCycle 4: ADD in MEM, (bubble)\nCycle 5: ADD in WB, (bubble), then SUB can proceed\n\nBubbles reduce throughput below the ideal 1 instruction/cycle, but the pipeline is still faster overall than having no pipeline at all."
    },
    {
      id: 39,
      category: "cache",
      subcategory: "basics",
      difficulty: "easy",
      question: "Why do we need cache? Why not just use faster RAM?",
      keyPoints: ["CPU is ~10x faster than RAM", "fast memory (SRAM) exists but is very expensive", "cache uses locality to serve most requests from a small fast memory", "typical hit rate over 90%"],
      answer: "The problem: the CPU can process data roughly 10 times faster than RAM can deliver it. So the CPU spends a lot of time just WAITING for data. This is called the 'memory wall.'\n\nThe obvious solution: use faster memory! Fast memory does exist - it's called SRAM (Static RAM). It's almost as fast as the CPU. So why not just make ALL memory from SRAM?\n\nThe reason: cost. SRAM is dramatically more expensive than DRAM (Dynamic RAM, the regular kind). Making 16 GB of SRAM would cost a fortune and generate too much heat.\n\nThe clever solution: use a SMALL amount of SRAM (the cache) and a LARGE amount of cheap DRAM (main memory). Thanks to locality principles:\n- Temporal locality: you keep reusing the same data (loops, hot variables)\n- Spatial locality: you access nearby data in sequence (arrays, sequential code)\n\n...a small cache can serve over 90% of memory requests! Only the remaining ~10% of accesses (cache misses) need to go to slow RAM.\n\nSo cache is a cost-effective trick: get almost the speed of SRAM at almost the cost of DRAM."
    },
    {
      id: 40,
      category: "cache",
      subcategory: "address-structure",
      difficulty: "hard",
      question: "Given a 13-bit address, 128B cache, 4-way set-associative, 8B blocks: calculate tag, index, and offset widths.",
      keyPoints: ["offset = log2(8) = 3 bits", "number of sets = 128/(8x4) = 4", "index = log2(4) = 2 bits", "tag = 13-2-3 = 8 bits"],
      answer: "Let's solve this step by step:\n\nGiven: 13-bit addresses, 128 bytes total cache, 4-way set-associative, 8-byte blocks.\n\nStep 1 - Offset bits: how many bits to address a byte within one block?\nBlock size = 8 bytes, so offset = log2(8) = 3 bits\n(3 bits can represent 0-7, exactly 8 positions)\n\nStep 2 - How many sets does the cache have?\nsets = total_cache_size / (block_size x ways) = 128 / (8 x 4) = 128 / 32 = 4 sets\n(The cache has 128/8 = 16 lines total, grouped into 4 sets of 4 lines each)\n\nStep 3 - Index bits: how many bits to select a set?\nindex = log2(4) = 2 bits\n(2 bits can represent 0-3, exactly 4 sets: set 00, 01, 10, 11)\n\nStep 4 - Tag bits: whatever is left\ntag = address_width - index - offset = 13 - 2 - 3 = 8 bits\n\nFinal address format: [8-bit tag | 2-bit index | 3-bit offset]\n\nTo find data: use the 2 index bits to go to the correct set, then compare the 8-bit tag against all 4 lines in that set. If a match is found with valid=1, it's a hit. The 3 offset bits tell you which byte within the 8-byte block."
    },
    {
      id: 41,
      category: "modern-solutions",
      subcategory: "performance",
      difficulty: "medium",
      question: "What are the 'classical' (non-parallel) ways to improve processor performance?",
      keyPoints: ["increase clock speed (limited by heat)", "add co-processors like FPU", "DMA for memory transfers without CPU", "wider data bus and registers", "add cache", "faster bus"],
      answer: "Before the era of parallelism, engineers improved performance using these approaches:\n\n1. Increase clock frequency - make the clock tick faster so instructions complete sooner. But limited by heat: faster clock = more heat. There's a physical wall around 4-5 GHz with current technology.\n\n2. FPU (Floating Point Unit) co-processor - a dedicated chip (or unit) for floating-point math (decimals, scientific calculations). Originally a separate chip (like Intel's x87), now built into every CPU. Offloads heavy math from the main processor.\n\n3. DMA (Direct Memory Access) - allows devices to transfer data directly to/from RAM without bothering the CPU. While DMA handles a large file transfer, the CPU is free to do other work.\n\n4. Larger word size - wider registers and data bus: 8-bit -> 16-bit -> 32-bit -> 64-bit. A 64-bit CPU can process twice as much data per operation as a 32-bit one, and can address much more memory.\n\n5. Cache - fast intermediate memory that stores recently used data (covered in detail in the Cache chapter).\n\n6. Faster bus system - higher bandwidth connections between CPU, memory, and devices."
    },
    {
      id: 42,
      category: "modern-solutions",
      subcategory: "vector-processors",
      difficulty: "medium",
      question: "What is saturation arithmetic and why is it used in vector processing?",
      keyPoints: ["overflow handling for SIMD operations", "clamps result to max/min value instead of wrapping around", "needed because vector registers have no per-element overflow flag", "makes sense for media: pixel values should clamp, not wrap"],
      answer: "Saturation arithmetic is a special way of handling overflow used in vector (SIMD = Single Instruction, Multiple Data) processing.\n\nNormal integer overflow: when a result is too big, it 'wraps around.' For 8-bit signed numbers (range -128 to 127): 119 + 59 = 178, but 178 doesn't fit, so it wraps to -78. This is usually wrong and unexpected!\n\nSaturation arithmetic: instead of wrapping, the result is 'clamped' to the maximum (or minimum) value. So 119 + 59 = 127 (the max for signed 8-bit). It can't go higher, it just 'saturates' at the limit.\n\nWhy it's needed for SIMD:\nIn normal arithmetic, the CPU has a status register with an OF (Overflow Flag) that tells you if overflow happened. But in SIMD, one register holds MULTIPLE values (e.g., 4 numbers packed into 32 bits). There's only ONE overflow flag, not one per element - so you can't tell WHICH element overflowed.\n\nSaturation solves this elegantly. It's also more useful for real applications:\n- Image processing: pixel brightness should max out at 255, not wrap to 0\n- Audio processing: volume should clip at maximum, not suddenly become very quiet\n- Sensor data: readings should cap at the limit, not produce garbage values"
    },
    {
      id: 43,
      category: "cache",
      subcategory: "coherence",
      difficulty: "medium",
      question: "What is the difference between invalidation-based and update-based cache coherence?",
      keyPoints: ["invalidation = tell others to throw away their copy when you write", "update = send the new value to all copies when you write", "invalidation uses less bus traffic usually", "MESI protocol is invalidation-based"],
      answer: "In a multi-core system, when one core writes to a cached memory location that other cores also have cached, how do you keep everyone consistent? Two approaches:\n\nInvalidation-based (used by MESI protocol, more common):\nWhen core A writes to a shared cache line, it sends a message to ALL other cores: 'throw away (invalidate) your copy of this data!' Other cores mark their copy as Invalid. When they need the data again later, they must fetch the updated version.\n- Pro: less bus traffic if the writer modifies the data multiple times before anyone else reads it (only one invalidation message, not multiple update messages).\n- Con: other cores have a cache miss when they next need the data.\n\nUpdate-based:\nWhen core A writes to a shared cache line, it broadcasts the new value to ALL other cores who have a copy. Their caches are immediately updated.\n- Pro: other cores always have the latest data, no miss penalty on next read.\n- Con: generates a LOT of bus traffic, especially if data is written many times but rarely read by others. Every single write sends a broadcast.\n\nIn practice, invalidation-based is more popular because most written data is read by others infrequently, making invalidation more efficient."
    }
  ],

  flashcards: [
    // Comparisons
    { id: 1, category: "comparison", front: "CISC vs RISC", back: "CISC (Complex Instruction Set Computer):\n- Many powerful instructions that do complex things in one step\n- Variable-length instructions (different instructions have different sizes)\n- Each instruction may take multiple clock cycles\n- Uses microcode (tiny internal programs to execute each instruction)\n- Fewer registers; instructions can work directly with RAM\n- Example: x86 (Intel, AMD)\n\nRISC (Reduced Instruction Set Computer):\n- Few, simple instructions that each do one small thing\n- Fixed-length instructions (all same size = easy to decode)\n- Each instruction ideally completes in one clock cycle\n- Often hardwired control (faster, no microcode)\n- Many registers; only LOAD/STORE instructions touch RAM\n- Example: ARM, MIPS" },
    { id: 2, category: "comparison", front: "CPU vs GPU", back: "CPU (Central Processing Unit):\n- A few powerful cores (4-16 typically)\n- Low latency: gets ONE thing done fast\n- Shallow pipeline (under 30 stages)\n- Big cache, smart branch prediction\n- Great for: sequential tasks, decision-heavy code, OS\n\nGPU (Graphics Processing Unit):\n- Thousands of simple cores\n- High throughput: gets MANY things done at once\n- Deep pipeline (over 100 stages)\n- Hardware thread management, huge memory bandwidth\n- Great for: graphics, matrix math, AI, any massively parallel task" },
    { id: 3, category: "comparison", front: "Write-through vs Write-back cache", back: "Write-through:\n- Every write goes to BOTH cache AND RAM at the same time\n- RAM always has the latest data (consistent)\n- Slow: writes are limited by RAM speed\n- No dirty bit needed\n\nWrite-back:\n- Writes go ONLY to cache; RAM updated later\n- A 'dirty bit' marks lines that have been modified\n- Fast: most writes only hit the fast cache\n- Dirty lines must be written to RAM before eviction\n- Causes cache coherence challenges in multi-core systems" },
    { id: 4, category: "comparison", front: "VLIW vs Superscalar", back: "VLIW (Very Long Instruction Word):\n- The COMPILER decides which instructions run in parallel\n- Packs them into wide 'bundles' at compile time\n- Simple hardware (no complex scheduling logic)\n- Programs NOT portable between different VLIW chips\n- Empty slots filled with NOPs, wasting memory\n\nSuperscalar:\n- The HARDWARE finds parallelism at runtime\n- Uses an instruction window + OoOE (Out-of-Order Execution)\n- Complex hardware (dynamic scheduling, renaming)\n- Programs ARE portable - any code works\n- No wasted NOP slots" },
    { id: 5, category: "comparison", front: "Direct-mapped vs Fully associative vs Set-associative cache", back: "Direct-mapped (1-way):\n- Each address can go in only 1 specific cache line\n- Fast lookup (check 1 line) but lots of conflict misses\n\nFully associative:\n- Any address can go in ANY cache line\n- Best hit rate but expensive (must check ALL tags)\n\nN-way set-associative (the practical middle ground):\n- Cache divided into sets; each set has N lines\n- Address maps to 1 set, can use any of the N lines\n- Direct-mapped = 1-way, Fully associative = all-lines-way\n- Real CPUs commonly use 4-way or 8-way" },
    { id: 6, category: "comparison", front: "Spatial vs Temporal locality", back: "Spatial locality ('nearby data will be used soon'):\n- Programs execute instructions sequentially\n- Arrays store elements next to each other in memory\n- That's why cache loads entire BLOCKS (e.g., 64 bytes), not single bytes\n\nTemporal locality ('same data will be used again'):\n- Loops reuse the same instructions and variables\n- Frequently accessed variables stay 'hot'\n- That's why cache KEEPS recently used data instead of discarding it\n\nBoth are the reason cache works: they let us predict what data the CPU will need next." },
    { id: 7, category: "comparison", front: "Static vs Dynamic branch prediction", back: "Static (simple fixed rule, no learning):\n- Backward jump (loop) -> predict TAKEN (loop repeats)\n- Forward jump -> predict NOT taken\n- No hardware history, no adaptation\n\nDynamic (learns from past behavior):\n- Stores history in BTB (Branch Target Buffer)\n- 1-bit: remembers last outcome, flips on every mistake\n  Problem: always mispredicts twice at loop boundaries\n- 2-bit: 4 states (Strongly/Weakly Taken/Not-Taken)\n  Needs TWO consecutive wrong predictions to change direction\n  Handles loop exits much better (one miss doesn't flip it)" },
    { id: 8, category: "comparison", front: "Pipeline bubble vs Result forwarding", back: "Pipeline bubble (stall):\n- Insert empty NOP cycles to wait for data\n- Simple but wastes time\n- Example: 2-cycle stall for a RAW (Read After Write) hazard\n\nResult forwarding (bypassing):\n- A hardware shortcut wire\n- Sends the result from one instruction's EX (Execution) stage directly to the next instruction's EX input\n- Skips waiting for the WB (Write Back) stage\n- Eliminates the stall entirely in most cases\n- More complex hardware but much faster" },
    { id: 9, category: "comparison", front: "Hyper-threading (SMT) vs Multi-core", back: "Hyper-threading / SMT (Simultaneous MultiThreading):\n- 1 physical core acts as 2 'logical' cores\n- Has 2 sets of registers but SHARES execution units\n- When thread A stalls, thread B uses the idle hardware\n- Cheap (barely increases chip size)\n- Modest speedup (~15-30%)\n\nMulti-core:\n- Multiple REAL independent cores\n- Each core has its OWN execution units, registers, L1 cache\n- Cores can truly run in parallel at the same time\n- Costs more chip area and power\n- Much bigger speedup (close to Nx with N cores for parallel tasks)" },
    { id: 10, category: "comparison", front: "Invalidation-based vs Update-based cache coherence", back: "Invalidation-based (e.g., MESI protocol):\n- When core A writes, it tells others: 'your copy is now invalid, throw it away'\n- Other cores get a cache miss on next access and must re-fetch\n- Less bus traffic (one 'invalidate' message, even if A writes many times)\n- More common in practice\n\nUpdate-based:\n- When core A writes, it broadcasts the new value to ALL other caches\n- Other caches are updated immediately, no miss on next access\n- MORE bus traffic (every write = a broadcast)\n- Better only when data is written once, read by many" },

    // Definitions
    { id: 11, category: "definition", front: "Pipeline", back: "A technique where multiple instructions overlap in different stages of execution, like an assembly line.\n\n5 stages: IF (Instruction Fetch), ID (Instruction Decode), EX (Execution), MEM (Memory Access), WB (Write Back).\n\nDoes NOT make one instruction faster (still 5 cycles). But increases throughput: after filling up, 1 instruction completes every cycle instead of every 5 cycles." },
    { id: 12, category: "definition", front: "RAW Hazard (Read After Write)", back: "The most common pipeline hazard. A 'true data dependency.'\n\nInstruction B needs to READ a value that instruction A hasn't WRITTEN yet.\n\nExample:\n  ADD r1, r2, r3   (writes to r1)\n  SUB r4, r1, r5   (needs to read r1, but ADD hasn't finished yet!)\n\nSolutions: pipeline bubble (wait), result forwarding (shortcut the data), or OoOE (Out-of-Order Execution - do something else while waiting)." },
    { id: 13, category: "definition", front: "OoOE (Out-of-Order Execution)", back: "The CPU executes instructions not in program order, but based on which instruction has its data ready first.\n\nLike a restaurant kitchen: the chef makes whichever dish has its ingredients ready, not strictly in order of when it was ordered.\n\nKey rule: even though execution is out of order, results are COMMITTED (saved) in the original program order to maintain correctness.\n\nPurpose: avoids pipeline bubbles by keeping execution units busy." },
    { id: 14, category: "definition", front: "Register renaming", back: "A technique to eliminate false dependencies (WAR = Write After Read, WAW = Write After Write hazards).\n\nProblem: the program has limited register names (e.g., r0-r7), so unrelated instructions accidentally 'conflict' by using the same register name.\n\nSolution: the CPU has MORE physical registers than visible to the programmer. A mapping circuit assigns each register use to a different physical register, removing the conflict.\n\nLike giving each worker their own desk instead of sharing." },
    { id: 15, category: "definition", front: "Cache hit vs Cache miss", back: "Cache hit: the CPU requests data, and it IS found in the cache. Data is returned quickly from fast SRAM (Static RAM). This is the happy path (~90%+ of the time).\n\nCache miss: the data is NOT in the cache. The cache must fetch it from slow main memory (DRAM = Dynamic RAM), store it in a cache line, then return it. Much slower.\n\nHit rate = percentage of accesses that are hits. Higher is better. Affected by cache size, associativity, block size, and program behavior." },
    { id: 16, category: "definition", front: "Dirty bit", back: "A single flag (0 or 1) attached to each cache line in a write-back cache.\n\n0 = 'clean' - the cache line has NOT been modified. It matches what's in RAM. Safe to evict without saving.\n\n1 = 'dirty' - the cache line HAS been modified. RAM has outdated data. Before evicting this line, you MUST write it back to RAM first, or the changes are lost.\n\nOnly exists in write-back caches. Write-through caches don't need it because they always update RAM immediately." },
    { id: 17, category: "definition", front: "MESI protocol", back: "A cache coherence protocol that keeps data consistent across multiple cores' caches. Each cache line has one of 4 states:\n\nM (Modified): I have the only copy AND I changed it. RAM is outdated.\nE (Exclusive): I have the only copy but I didn't change it. Matches RAM.\nS (Shared): Multiple cores have identical, clean copies.\nI (Invalid): I don't have a valid copy.\n\nIt's invalidation-based: when one core writes, others' copies become Invalid." },
    { id: 18, category: "definition", front: "Flynn's taxonomy", back: "A classification system for computer architectures based on instruction and data streams:\n\nSISD (Single Instruction, Single Data): one operation on one data item at a time. Classic sequential CPU.\n\nSIMD (Single Instruction, Multiple Data): one operation on MANY data items at once. Vector processors, GPUs.\n\nMISD (Multiple Instruction, Single Data): multiple operations on the same data. Rare (fault-tolerant systems).\n\nMIMD (Multiple Instruction, Multiple Data): multiple operations on multiple data. Multicore processors." },
    { id: 19, category: "definition", front: "FPGA (Field-Programmable Gate Array)", back: "A chip containing programmable logic circuits that can be reconfigured after manufacturing.\n\nUnlike a CPU (which runs sequential instructions), an FPGA's circuits all operate in parallel by nature.\n\nProgrammed using hardware description languages: VHDL or Verilog.\n\nCan implement custom accelerators for specific tasks (often faster than a CPU for those tasks). Can even implement an entire processor design inside it (called a 'soft-processor').\n\nSome modern chips integrate FPGA alongside a regular CPU." },
    { id: 20, category: "definition", front: "NUMA (Non-Uniform Memory Access)", back: "A memory architecture for multi-processor systems where each processor has its own LOCAL memory.\n\nProcessors CAN access other processors' memory through an interconnection network, but it's SLOWER than accessing local memory.\n\n'Non-uniform' = access time DEPENDS on where the memory is located.\n\nAdvantage: multiple processors can read/write their own local memory simultaneously without bottlenecking.\n\nUsed in servers and cluster systems." },
    { id: 21, category: "definition", front: "BTB (Branch Target Buffer)", back: "A small hardware table inside the CPU that stores the history of recent branch instructions.\n\nFor each branch, it records: the branch address, the target address (where it jumps to), and whether it was taken or not taken recently.\n\nUsed by dynamic branch prediction to make educated guesses about which path a branch will take next time.\n\nBigger BTB = can remember more branches = better prediction accuracy." },
    { id: 22, category: "definition", front: "Instruction window", back: "The set of upcoming instructions that a superscalar processor can 'see' and analyze at once.\n\nThe CPU scans this window to find independent instructions that can execute in parallel on different execution units.\n\nBigger window = more instructions to choose from = more parallelism found = better performance.\n\nLimited by hardware complexity: a larger window requires more comparison circuits." },
    { id: 23, category: "definition", front: "Superscalar processor", back: "A processor that can complete MORE than one instruction per clock cycle.\n\nIt has multiple execution units (multiple ALUs = Arithmetic Logic Units, FPUs = Floating Point Units, etc.) running side by side.\n\nThe hardware automatically finds independent instructions and sends them to different execution units simultaneously.\n\nThink of it as multiple assembly lines in one factory, compared to pipelining which is just one assembly line." },
    { id: 24, category: "definition", front: "GPGPU (General-Purpose GPU)", back: "Using a GPU (Graphics Processing Unit) for tasks OTHER than graphics.\n\nGPUs have thousands of cores optimized for parallel math. This makes them great for:\n- Scientific simulations\n- AI / machine learning training\n- Cryptocurrency mining\n- Video encoding\n\nProgrammed with:\n- CUDA (NVIDIA's proprietary language)\n- OpenCL (open standard, works on any GPU)\n- MATLAB\n\nThe CPU sends parallel work to the GPU, which processes it and returns results." },
    { id: 25, category: "definition", front: "Loop unrolling", back: "An optimization that copies the loop body multiple times within each iteration.\n\nOriginal: process 1 item per iteration, 100 iterations\nUnrolled x4: process 4 items per iteration, 25 iterations\n\nBenefits:\n1. Less loop overhead (fewer comparisons and jumps)\n2. More independent instructions visible for superscalar/OoOE to exploit\n3. Easier for the compiler to use SIMD (vector) instructions\n4. Better for VLIW (Very Long Instruction Word) bundle filling" },

    // Formulas
    { id: 26, category: "formula", front: "Performance equation", back: "T = NI x eCPI x 1/f\n\nT = total execution time (seconds)\nNI = Number of Instructions the program executes (counting loops)\neCPI = effective Cycles Per Instruction (average clock cycles per instruction)\nf = clock frequency in Hz (ticks per second)\n\nTo make programs faster:\n- Reduce NI: better algorithms, smarter compiler\n- Reduce eCPI: better pipeline, superscalar, cache\n- Increase f: faster hardware (limited by heat)" },
    { id: 27, category: "formula", front: "Amdahl's law", back: "S(N) = 1 / (A + (1-A)/N)\n\nS = speedup (how many times faster)\nN = number of processors\nA = sequential ratio (fraction that can't be parallelized, 0 to 1)\n\nMax speedup with infinite processors = 1/A\n\nExample: A=0.2, N=8 -> S = 1/(0.2 + 0.8/8) = 1/0.3 = 3.33x\nWith infinite processors: S = 1/0.2 = 5x maximum\n\nLesson: even a small sequential portion severely limits parallelism gains." },
    { id: 28, category: "formula", front: "Cache address decomposition", back: "Address = [Tag | Index | Offset]\n\nOffset = log2(block_size) bits\n  Which byte within the block\n\nIndex = log2(num_sets) bits\n  Which set in the cache\n  num_sets = cache_size / (block_size x associativity)\n\nTag = address_width - index - offset bits\n  Stored in cache to identify the source address\n\nExample: 32-bit address, 8KB 4-way, 64B blocks\nOffset=6, Sets=8192/(64x4)=32, Index=5, Tag=21" },
    { id: 29, category: "formula", front: "Number of cache sets", back: "num_sets = cache_size / (block_size x associativity)\n\nDirect-mapped: associativity = 1 (most sets, most index bits)\nN-way: associativity = N\nFully associative: associativity = total_lines (1 set, 0 index bits)\n\nTotal lines in cache = cache_size / block_size\n\nExample: 16KB cache, 64B blocks, 4-way\nTotal lines = 16384/64 = 256\nSets = 256/4 = 64 sets" },
    { id: 30, category: "formula", front: "Pipeline speedup (ideal)", back: "Ideal speedup = N (number of pipeline stages)\n\nThroughput = 1 instruction completed per clock cycle\nLatency per instruction = N clock cycles (unchanged)\n\nWithout pipeline: 1 instruction every N cycles\nWith pipeline: 1 instruction every 1 cycle (after filling)\n\nReal speedup is LESS than N because of:\n- Hazards causing bubbles/stalls\n- Unequal stage execution times\n- Branch mispredictions" }
  ],

  concepts: [
    {
      id: 1,
      category: "modern-solutions",
      subcategory: "parallelism",
      title: "Levels of Parallelism",
      explanation: "Parallelism means doing multiple things at once. In computers, this happens at different scales, from tiny hardware operations to entire programs running side by side.",
      keyPoints: [
        "Bit level: all bits of a number processed at once (a 32-bit add handles all 32 bits simultaneously)",
        "Data level (DLP = Data Level Parallelism / SIMD): one instruction works on many data items at once",
        "Instruction level (ILP = Instruction Level Parallelism): multiple instructions overlap in the pipeline",
        "Task/Thread level (TLP = Thread Level Parallelism): separate threads run on different cores",
        "Process level: the OS (Operating System) runs multiple programs simultaneously"
      ],
      diagram: "Bit < Data < Instruction < Task < Process\n(hardware level)              (software level)"
    },
    {
      id: 2,
      category: "modern-solutions",
      subcategory: "parallelism",
      title: "Flynn's Taxonomy",
      explanation: "A simple 2x2 classification of computer architectures. Ask two questions: how many instruction streams? How many data streams? This gives 4 categories.",
      keyPoints: [
        "SISD (Single Instruction, Single Data): classic sequential processor - one thing at a time",
        "SIMD (Single Instruction, Multiple Data): one instruction, many data items - vector processors, GPUs",
        "MISD (Multiple Instruction, Single Data): multiple operations on same data - very rare (fault tolerance)",
        "MIMD (Multiple Instruction, Multiple Data): fully parallel - multicore processors"
      ],
      diagram: "                    Single Data    Multiple Data\nSingle Instruction    SISD            SIMD\n                     (old PCs)     (GPU, vectors)\nMultiple Instr.       MISD            MIMD\n                   (space shuttle) (multicore CPU)"
    },
    {
      id: 3,
      category: "modern-solutions",
      subcategory: "pipelining",
      title: "5-Stage RISC Pipeline",
      explanation: "Like a factory assembly line: each instruction passes through 5 stations. While instruction 1 is at station 3, instruction 2 is at station 2, and instruction 3 is at station 1. Multiple instructions are 'in flight' simultaneously.",
      keyPoints: [
        "IF (Instruction Fetch): read the next instruction from memory",
        "ID (Instruction Decode): figure out what the instruction does, which registers to use",
        "EX (Execution): the ALU (Arithmetic Logic Unit) does the math or calculates an address",
        "MEM (Memory Access): read/write to RAM (only for load/store instructions)",
        "WB (Write Back): save the result into the destination register",
        "Throughput: 1 instruction/cycle (ideal) | Latency: 5 cycles per instruction"
      ],
      diagram: "Clock:  1    2    3    4    5    6    7\nI1:    IF   ID   EX  MEM   WB\nI2:         IF   ID   EX  MEM   WB\nI3:              IF   ID   EX  MEM   WB\n                               ^ one finishes every cycle"
    },
    {
      id: 4,
      category: "modern-solutions",
      subcategory: "pipelining",
      title: "Pipeline Hazards",
      explanation: "Hazards are problems that break the smooth flow of the pipeline. The next instruction can't proceed because of a dependency or conflict.",
      keyPoints: [
        "Data hazard: two instructions need the same register. RAW (Read After Write) = true dependency. WAR/WAW = name dependency (solvable with renaming)",
        "Structural hazard: two instructions need the same hardware at the same time (e.g., both need memory port)",
        "Control hazard: branch instruction - CPU doesn't know which instruction to fetch next",
        "Solutions: bubbles (wait), forwarding (shortcut data), OoOE (reorder), renaming (use different physical registers), speculation (guess the branch)"
      ],
      diagram: "RAW: ADD r1,r2,r3 then SUB r4,r1,r5  (SUB needs r1 but ADD hasn't finished)\nWAR: ADD r3,r1,r2 then MUL r2,r4,r5  (MUL overwrites r2 that ADD still needs)\nWAW: ADD r3,r1,r2 then SUB r3,r4,r5  (both write to r3, order matters)"
    },
    {
      id: 5,
      category: "modern-solutions",
      subcategory: "pipelining",
      title: "Hazard Solutions",
      explanation: "Different techniques to handle pipeline problems, ranging from simple (but slow) to complex (but fast).",
      keyPoints: [
        "Bubble/Stall: pause the pipeline by inserting empty NOP (No Operation) cycles. Simple but wastes time.",
        "Result Forwarding: wire the output of EX stage directly to the next instruction's EX input. Skips WB stage. Eliminates most RAW stalls.",
        "OoOE (Out-of-Order Execution): rearrange instructions to fill gaps with useful work while waiting.",
        "Register Renaming: use extra physical registers to eliminate WAR/WAW false dependencies.",
        "Speculative Execution: guess which branch to take and start executing. Discard if wrong."
      ],
      diagram: "Without forwarding:  ADD r1 -> [bubble] -> [bubble] -> SUB uses r1\nWith forwarding:     ADD r1 -> SUB uses r1 (result forwarded directly)"
    },
    {
      id: 6,
      category: "modern-solutions",
      subcategory: "branch-prediction",
      title: "Branch Prediction",
      explanation: "When the CPU hits an if/else or loop end, it must guess which instruction comes next. Good guessing keeps the pipeline full; bad guessing wastes many cycles.",
      keyPoints: [
        "Static: fixed rule - backward jumps (loops) predicted taken, forward jumps predicted not taken",
        "Dynamic 1-bit: remembers last outcome, flips after each wrong guess. Bad at loop exits.",
        "Dynamic 2-bit: 4 states (Strongly Taken / Weakly Taken / Weakly Not-Taken / Strongly Not-Taken)",
        "2-bit needs 2 consecutive mispredictions to change direction - handles loop exits well",
        "History stored in BTB (Branch Target Buffer) - a hardware table tracking recent branches"
      ],
      diagram: "2-bit state machine:\nStrongly    Weakly     Weakly      Strongly\n Taken  <->  Taken  <-> Not-Taken <-> Not-Taken\npredict T   predict T   predict NT   predict NT\n      (needs 2 misses to cross the middle)"
    },
    {
      id: 7,
      category: "modern-solutions",
      subcategory: "superscalar",
      title: "Superscalar Processors",
      explanation: "Like having multiple assembly lines in one factory. The CPU has several execution units and can finish more than one instruction per clock cycle.",
      keyPoints: [
        "Multiple execution units: several ALUs (Arithmetic Logic Units), FPUs (Floating Point Units), etc.",
        "Hardware scans an 'instruction window' to find independent instructions",
        "Uses ILP (Instruction Level Parallelism) + OoOE (Out-of-Order Execution) + speculation",
        "Can achieve throughput > 1 instruction per cycle",
        "Bigger instruction window = more opportunities to find parallelism"
      ],
      diagram: "     Execution unit 1   Execution unit 2\nCycle 1:   I1                 I2        <- 2 at once!\nCycle 2:   I3                 I4\nCycle 3:   I5                 I6\n  Throughput: 2 instructions per cycle"
    },
    {
      id: 8,
      category: "modern-solutions",
      subcategory: "vliw",
      title: "VLIW (Very Long Instruction Word) Processors",
      explanation: "Instead of hardware finding parallelism (like superscalar), the COMPILER figures it out ahead of time and packs parallel operations into one wide instruction 'bundle'.",
      keyPoints: [
        "VLIW = Very Long Instruction Word",
        "Compiler (not hardware) decides what runs in parallel",
        "Each 'bundle' has multiple slots, each slot runs on a different execution unit",
        "Empty slots filled with NOP (No Operation) - wastes memory",
        "Pro: simpler, faster hardware. Con: non-portable programs, code bloat from NOPs",
        "Intel used this idea as EPIC (Explicitly Parallel Instruction Computing) for Itanium"
      ],
      diagram: "Bundle: [ ADD r4,r1,r2 | MUL r5,r3,r3 |   NOP    ]\n           slot 1          slot 2       slot 3\n     All 3 slots execute simultaneously in 1 cycle"
    },
    {
      id: 9,
      category: "modern-solutions",
      subcategory: "vector-processors",
      title: "Vector / SIMD Processors",
      explanation: "Process multiple data elements with a single instruction using extra-wide registers. Instead of adding numbers one pair at a time, add 4 or 8 or 16 pairs at once.",
      keyPoints: [
        "SIMD = Single Instruction, Multiple Data",
        "MMX (MultiMedia eXtension): 64-bit registers, integers only, SHARED with FPU = couldn't use both",
        "SSE (Streaming SIMD Extensions): 128-bit DEDICATED registers, floats (SSE2 added integers)",
        "AVX (Advanced Vector eXtensions): 256-bit. AVX-512: 512-bit registers",
        "ARM Neon: 128-bit registers for mobile/embedded processors",
        "Saturation arithmetic: clamp to max/min on overflow instead of wrapping around"
      ],
      diagram: "Scalar: a[0]+b[0], a[1]+b[1], a[2]+b[2], a[3]+b[3]  (4 instructions)\nSIMD:   [a0,a1,a2,a3] + [b0,b1,b2,b3]  (1 instruction!)\n\nRegister nesting: ZMM(512) > YMM(256) > XMM(128) > MM(64)"
    },
    {
      id: 10,
      category: "modern-solutions",
      subcategory: "gpu",
      title: "GPU (Graphics Processing Unit) Architecture",
      explanation: "GPUs are massively parallel processors with thousands of simple cores. Think of a CPU as a few expert workers, and a GPU as an army of basic workers - great for tasks that can be split into many identical small jobs.",
      keyPoints: [
        "Thousands of simple cores vs. CPU's few complex cores",
        "Hardware manages threads automatically (no OS needed for thread scheduling)",
        "Deep pipeline (>100 stages) optimized for throughput, not latency",
        "GPGPU (General-Purpose GPU): using GPU for non-graphics tasks via CUDA, OpenCL",
        "NVIDIA structure: TPC (Texture/Processor Cluster) > SM (Streaming Multiprocessor) > SP (Streaming Processor)",
        "Each SM has: SPs (compute cores), SFUs (Special Function Units for sin/sqrt), shared memory, register files"
      ],
      diagram: "CPU: [Control][  Cache  ]     GPU: [sp][sp][sp][sp][sp][sp]...\n     [Core 1][Core 2  ]          [sp][sp][sp][sp][sp][sp]...\n     few powerful cores           thousands of simple cores"
    },
    {
      id: 11,
      category: "modern-solutions",
      subcategory: "multicore",
      title: "Multi-core & Multi-processor Systems",
      explanation: "Using multiple processing units to run tasks in parallel. Different flavors depending on how many cores, whether they're the same type, and how memory is organized.",
      keyPoints: [
        "Multi-core: a few cores (2-16) on one chip. Each has own L1/L2 cache, shares L3. Used in PCs/phones.",
        "Many-core: hundreds/thousands of cores on one chip. Used in servers, supercomputers, GPUs.",
        "Homogeneous: all cores are identical (symmetric). Any core can do any task equally well.",
        "Heterogeneous: different types of cores. ARM big.LITTLE = power + efficiency cores. CPU + GPU = general + parallel.",
        "SMT / Hyper-threading: 1 physical core acts as 2 logical cores by sharing execution units between threads.",
        "Cache coherence is a key challenge: shared data must stay consistent across private caches."
      ],
      diagram: "Processor chip:\n[Core0: L1i,L1d,L2] [Core1: L1i,L1d,L2] [Core2...]\n            [     Shared L3 Cache     ]\n            [     Main Memory (RAM)   ]"
    },
    {
      id: 12,
      category: "modern-solutions",
      subcategory: "performance",
      title: "Performance Analysis",
      explanation: "How to measure and predict processor speed. Two key tools: the performance equation (for one processor) and Amdahl's law (for multiple processors).",
      keyPoints: [
        "T = NI x eCPI x 1/f: execution time = instructions x cycles-per-instruction x 1/frequency",
        "FLOPS (FLoating-point Operations Per Second): common performance measure for scientific computing",
        "Amdahl's law: S(N) = 1/(A + (1-A)/N) where A = sequential fraction, N = number of processors",
        "Maximum speedup with infinite processors = 1/A (the sequential part is the hard limit)",
        "Even 10% sequential code limits max speedup to 10x no matter how many processors you add"
      ],
      diagram: "Amdahl's Law examples:\nA=0.1 (10% sequential): N=4->3.1x  N=8->4.7x  N=inf->10x\nA=0.2 (20% sequential): N=4->2.5x  N=8->3.3x  N=inf->5x\nA=0.5 (50% sequential): N=4->1.6x  N=8->1.8x  N=inf->2x"
    },
    {
      id: 13,
      category: "cache",
      subcategory: "basics",
      title: "Why Cache Exists",
      explanation: "The CPU is much faster than RAM. Cache is a small, fast memory that bridges this speed gap by keeping frequently used data close to the CPU.",
      keyPoints: [
        "The problem: CPU is ~10x faster than RAM, so it spends a lot of time waiting for data",
        "Fast memory (SRAM = Static RAM) exists but is too expensive to use for all memory",
        "Cheap memory (DRAM = Dynamic RAM) is big but slow",
        "Cache = small SRAM that stores recently/frequently used data",
        "Works because of locality: programs reuse the same data (temporal) and access nearby data (spatial)",
        "Hit rate typically >90%: 9 out of 10 accesses served from fast cache"
      ],
      diagram: "CPU <--(fast)--> Cache (SRAM, small, expensive)\n                    <--(slow)--> RAM (DRAM, big, cheap)\n\nCache is the best of both worlds:\nalmost SRAM speed at almost DRAM cost"
    },
    {
      id: 14,
      category: "cache",
      subcategory: "structure",
      title: "Cache Structure",
      explanation: "Cache is organized into 'lines' (also called blocks). Each line stores a chunk of data from RAM along with a label (tag) saying where it came from and status flags.",
      keyPoints: [
        "Line = Tag + Flags + Data Block",
        "Tag: identifies which RAM address this block corresponds to (like a label on a storage box)",
        "Flags: Valid bit (is this data real?), Dirty bit (has it been modified?), Recent bit (for replacement)",
        "Block: a copy of a contiguous chunk of memory from RAM (typically 64 bytes)",
        "Cache levels: L1 (fastest, ~32-64KB), L2 (medium, ~256KB-1MB), L3 (largest, shared, several MB)"
      ],
      diagram: "One cache line:\n[  Tag  ][V][D][        Data Block (64 bytes)         ]\n   ^      ^  ^                ^  \nwhich    is  has it      actual copy of \naddress? valid? modified?  RAM contents"
    },
    {
      id: 15,
      category: "cache",
      subcategory: "associativity",
      title: "Cache Associativity",
      explanation: "Determines WHERE in the cache a particular memory block can be stored. More flexibility = fewer conflict misses, but more expensive hardware.",
      keyPoints: [
        "Direct-mapped (1-way): each address -> exactly 1 possible line. Fast but many conflict misses.",
        "Fully associative: any address -> any line. Best hit rate but very expensive (check all tags).",
        "N-way set-associative: address -> 1 set of N lines. The practical compromise.",
        "Common in real CPUs: 4-way or 8-way set-associative",
        "Direct-mapped is 1-way. Fully associative means 1 set containing all lines."
      ],
      diagram: "Direct-mapped:    addr -> [line 5]  (only option)\nFully associative: addr -> [any of 16 lines]\n4-way set-assoc:  addr -> [set 2] -> pick from {line 0,1,2,3}\n\nLike seating: assigned seat vs open vs pick from your row"
    },
    {
      id: 16,
      category: "cache",
      subcategory: "address-structure",
      title: "Cache Address Structure",
      explanation: "A memory address is split into 3 parts for cache lookup: tag (which block?), index (which set?), and offset (which byte within the block?).",
      keyPoints: [
        "Offset (rightmost bits): byte position within block = log2(block_size) bits",
        "Index (middle bits): selects which set = log2(num_sets) bits",
        "Tag (leftmost bits): remaining bits, stored in cache for identification",
        "num_sets = cache_size / (block_size x ways)",
        "Direct-mapped: most index bits, fewest tag bits. Fully associative: no index bits, most tag bits."
      ],
      diagram: "Address: [  Tag  |  Index  |  Offset  ]\n          MSB                      LSB\n\nExample: 32-bit addr, 8KB cache, 4-way, 64B blocks\nOffset = log2(64) = 6 bits\nSets = 8192/(64x4) = 32 -> Index = log2(32) = 5 bits\nTag = 32 - 5 - 6 = 21 bits"
    },
    {
      id: 17,
      category: "cache",
      subcategory: "write-policy",
      title: "Write Policies",
      explanation: "When the CPU writes data, the cache needs a strategy for keeping RAM up to date. Two main approaches with different speed/consistency trade-offs.",
      keyPoints: [
        "Write-through: write to cache AND RAM simultaneously. Simple, consistent, but slow writes.",
        "Write-back: write ONLY to cache, set dirty bit to 1. RAM updated later when line is evicted.",
        "Dirty bit: flag indicating 'this line has been modified and differs from RAM'",
        "Write-through: no dirty bits needed, simpler. Write-back: faster, but needs dirty bit tracking.",
        "Write-back complication: cache coherence in multi-core systems, DMA (Direct Memory Access) issues."
      ],
      diagram: "Write-through: CPU -> [Cache] -> [RAM]  (both updated now)\nWrite-back:    CPU -> [Cache dirty=1]  (RAM updated later)\n               ...time passes...\n               Eviction: [Cache dirty=1] -> [RAM] then overwrite"
    },
    {
      id: 18,
      category: "cache",
      subcategory: "coherence",
      title: "Cache Coherence & MESI Protocol",
      explanation: "In multi-core systems, each core has its own cache. When one core modifies shared data, other cores' copies become stale. Coherence protocols keep everyone consistent.",
      keyPoints: [
        "Problem: Core A and Core B both cache address X. Core A writes a new value. Core B still has the old value.",
        "Invalidation-based (MESI): on write, tell others to discard their copy. More common.",
        "Update-based: on write, broadcast new value to all caches. More bus traffic.",
        "MESI states: M (Modified - dirty, only copy), E (Exclusive - clean, only copy), S (Shared - clean, multiple copies), I (Invalid - no valid copy)",
        "When you write to a Shared line, all other copies become Invalid first"
      ],
      diagram: "MESI state transitions:\nRead, no other copies  -> E (Exclusive: I'm the only one, clean)\nRead, others have it   -> S (Shared: we all have the same clean copy)\nWrite                  -> M (Modified: I changed it, others -> Invalid)\nAnother core reads my M -> write back, both become S (Shared)"
    }
  ],

  problems: [
    {
      id: 1,
      category: "cache",
      type: "cache-calculation",
      title: "Cache Address Decomposition",
      problem: "A system has a 32-bit address space, a 16KB 4-way set-associative cache with 64-byte blocks.\nCalculate the number of offset, index, and tag bits.",
      steps: [
        { text: "Offset bits = log2(block_size). Block size is 64 bytes, so log2(64) = ?", answer: "6 bits (because 2^6 = 64, so 6 bits can address any byte position 0-63 within a 64-byte block)" },
        { text: "How many sets? Formula: cache_size / (block_size x ways) = 16384 / (64 x 4) = ?", answer: "64 sets (16384 bytes total, divided into groups of 64 bytes x 4 ways = 256 bytes per set)" },
        { text: "Index bits = log2(number of sets) = log2(64) = ?", answer: "6 bits (because 2^6 = 64, so 6 bits can select any of the 64 sets)" },
        { text: "Tag bits = address_width - index_bits - offset_bits = 32 - 6 - 6 = ?", answer: "20 bits (whatever address bits are left after index and offset)" }
      ],
      finalAnswer: "Offset: 6 bits | Index: 6 bits | Tag: 20 bits\nAddress format: [20-bit tag | 6-bit index | 6-bit offset]\nThe cache has 64 sets, each with 4 lines, totaling 256 cache lines."
    },
    {
      id: 2,
      category: "cache",
      type: "cache-calculation",
      title: "Direct-Mapped Cache",
      problem: "A 4KB direct-mapped cache has 32-byte blocks. The system uses 24-bit addresses.\nHow many offset, index, and tag bits? How many cache lines are there?",
      steps: [
        { text: "Offset bits = log2(block_size) = log2(32) = ?", answer: "5 bits (2^5 = 32 bytes per block)" },
        { text: "How many lines? Direct-mapped means 1-way, so lines = 4096 / 32 = ?", answer: "128 lines (total cache / block size, since each set has exactly 1 line in direct-mapped)" },
        { text: "Index bits = log2(128) = ?", answer: "7 bits (2^7 = 128, need 7 bits to select which of the 128 lines)" },
        { text: "Tag bits = 24 - 7 - 5 = ?", answer: "12 bits (remaining address bits after index and offset)" },
        { text: "How many total cache lines?", answer: "128 lines (in direct-mapped: 128 sets x 1 line per set = 128 lines)" }
      ],
      finalAnswer: "128 cache lines | Offset: 5 bits | Index: 7 bits | Tag: 12 bits\nDirect-mapped means each memory address can only go in one specific line."
    },
    {
      id: 3,
      category: "cache",
      type: "cache-calculation",
      title: "Fully Associative Cache",
      problem: "A 2KB fully associative cache has 64-byte blocks with 32-bit addresses.\nCalculate offset and tag bits. How many lines does it have?",
      steps: [
        { text: "Offset bits = log2(64) = ?", answer: "6 bits (2^6 = 64 bytes per block)" },
        { text: "How many lines? total_size / block_size = 2048 / 64 = ?", answer: "32 lines" },
        { text: "How many index bits does a fully associative cache have?", answer: "0 bits! Fully associative means there's only 1 set containing ALL lines. No index needed - any address can go in any line." },
        { text: "Tag bits = 32 - 0 - 6 = ?", answer: "26 bits (with no index, almost the entire address is the tag)" }
      ],
      finalAnswer: "32 cache lines, 1 set (all lines in one set) | Offset: 6 bits | Index: 0 bits | Tag: 26 bits\nAny address can be stored in any of the 32 lines. To check for a hit, ALL 32 tags must be compared simultaneously."
    },
    {
      id: 4,
      category: "modern-solutions",
      type: "amdahl",
      title: "Amdahl's Law - Basic",
      problem: "A program has 30% sequential code (cannot be parallelized).\nCalculate the speedup with 4, 8, and infinite processors.",
      steps: [
        { text: "Write the formula with A = 0.3 (30% sequential)", answer: "S(N) = 1 / (A + (1-A)/N) = 1 / (0.3 + 0.7/N)" },
        { text: "S(4) = 1 / (0.3 + 0.7/4) = ?", answer: "1 / (0.3 + 0.175) = 1 / 0.475 = 2.11x speedup" },
        { text: "S(8) = 1 / (0.3 + 0.7/8) = ?", answer: "1 / (0.3 + 0.0875) = 1 / 0.3875 = 2.58x speedup" },
        { text: "S(infinity) = 1 / (0.3 + 0) = ?", answer: "1 / 0.3 = 3.33x maximum possible speedup (the parallel part finishes instantly, but 30% still runs sequentially)" }
      ],
      finalAnswer: "S(4) = 2.11x | S(8) = 2.58x | S(infinity) = 3.33x\n\nKey insight: doubling processors from 4 to 8 only gains 0.47x more speedup. Even infinite processors can't beat 3.33x because 30% of the work must be done sequentially."
    },
    {
      id: 5,
      category: "modern-solutions",
      type: "amdahl",
      title: "Amdahl's Law - Find Sequential Ratio",
      problem: "With 16 processors, you achieve a 10x speedup.\nWhat percentage of the program is sequential?",
      steps: [
        { text: "Start with S(N) = 1/(A + (1-A)/N). Plug in S=10 and N=16.", answer: "10 = 1 / (A + (1-A)/16)" },
        { text: "Flip it: A + (1-A)/16 = 1/10 = 0.1. Expand (1-A)/16.", answer: "A + 1/16 - A/16 = 0.1, which simplifies to A(1 - 1/16) + 1/16 = 0.1" },
        { text: "Simplify: (15/16)A + 0.0625 = 0.1. Solve for A.", answer: "(15/16)A = 0.1 - 0.0625 = 0.0375, so A = 0.0375 x (16/15) = 0.04" },
        { text: "What does A = 0.04 mean? What's the max speedup?", answer: "Only 4% of the program is sequential. Max speedup = 1/0.04 = 25x (with infinite processors)" }
      ],
      finalAnswer: "Sequential ratio A = 0.04 = 4%\nOnly 4% of the program is sequential, which is why 16 processors can achieve 10x speedup.\nTheoretical maximum speedup = 1/0.04 = 25x with infinite processors."
    },
    {
      id: 6,
      category: "modern-solutions",
      type: "pipeline",
      title: "Pipeline Hazard Identification",
      problem: "Identify the hazard type for each pair of instructions (ARM assembly):\n1) ADD r1, r2, r3  then  SUB r4, r1, r5\n2) ADD r3, r1, r2  then  MUL r1, r4, r5\n3) ADD r3, r1, r2  then  SUB r3, r4, r5\n4) LDR r1, [r2]   then  ADD r3, r1, r4",
      steps: [
        { text: "Pair 1: ADD writes r1, then SUB reads r1. What type?", answer: "RAW (Read After Write) - SUB needs to READ r1, but ADD hasn't WRITTEN it yet. This is a true data dependency." },
        { text: "Pair 2: ADD reads r1, then MUL writes r1. What type?", answer: "WAR (Write After Read) - MUL would WRITE (overwrite) r1, but ADD still needs to READ the old value of r1. This is a name/false dependency." },
        { text: "Pair 3: ADD writes r3, then SUB also writes r3. What type?", answer: "WAW (Write After Write) - both instructions WRITE to r3. The order matters: we need SUB's result to be the final value, not ADD's." },
        { text: "Pair 4: LDR loads from memory into r1, then ADD reads r1. Type and special issue?", answer: "RAW (Read After Write). Extra tricky: LDR's data is only available after the MEM (Memory Access) stage, not after EX. So even with forwarding, a 1-cycle stall is needed (called a 'load-use hazard')." }
      ],
      finalAnswer: "1) RAW - solvable with result forwarding\n2) WAR - solvable with register renaming\n3) WAW - solvable with register renaming\n4) RAW (load-use) - needs at least 1 bubble even WITH forwarding, because the data comes from memory, not the ALU"
    },
    {
      id: 7,
      category: "modern-solutions",
      type: "pipeline",
      title: "Pipeline Timing with Bubbles",
      problem: "Given these instructions in a 5-stage pipeline WITHOUT result forwarding:\n  ADD r1, r2, r3\n  SUB r4, r1, r5\nHow many clock cycles to complete both? How many with forwarding?",
      steps: [
        { text: "Without forwarding: ADD writes r1 in WB (cycle 5). When can SUB's EX stage use r1?", answer: "SUB must wait until ADD's WB completes in cycle 5. SUB enters IF at cycle 2 but stalls in ID because r1 isn't ready. SUB's EX can't run until cycle 6 (after ADD's WB in cycle 5)." },
        { text: "How many bubble cycles are inserted?", answer: "2 bubble cycles. SUB stalls for 2 extra cycles while waiting for ADD to write back r1." },
        { text: "Total cycles without forwarding?", answer: "8 cycles total. ADD finishes at cycle 5, SUB finishes at cycle 8 (shifted 2 cycles due to stalls)." },
        { text: "With forwarding: ADD's EX result is available after cycle 3. When does SUB's EX run?", answer: "Cycle 4. The result is forwarded directly from ADD's EX output to SUB's EX input. No stall needed! Total: 6 cycles (ADD: 1-5, SUB: 2-6)." }
      ],
      finalAnswer: "Without forwarding: 8 cycles (2 bubbles wasted)\nWith forwarding: 6 cycles (0 bubbles)\nForwarding saves 2 cycles by shortcutting the data path."
    },
    {
      id: 8,
      category: "cache",
      type: "cache-calculation",
      title: "Cache Lookup from Slide Example",
      problem: "Given: 13-bit address, 128-byte cache, 4-way set-associative, 8-byte blocks, write-back policy.\nAddress to look up: 1101110001010 (binary). Is it a cache hit?\n\nCache contents for set 01:\n  Tag=56, Valid=1, Dirty=1\n  Tag=F2, Valid=0, Dirty=0\n  Tag=DC, Valid=1, Dirty=1, Data=[3E,18,48,45,4C,4C,4F,00]\n  Tag=03, Valid=1, Dirty=0",
      steps: [
        { text: "Calculate offset bits: log2(block_size) = log2(8) = ?", answer: "3 bits. The last 3 bits of the address = 010 (binary) = position 2 within the 8-byte block." },
        { text: "Calculate sets: 128/(8x4) = 4 sets. Index bits = log2(4) = 2. What's the index?", answer: "2 index bits. From the address: ...01|010, the index = 01 (binary) = set 1." },
        { text: "Tag bits = 13 - 2 - 3 = 8. What's the tag value?", answer: "8 tag bits. From the address: 11011100|01|010, the tag = 11011100 = 0xDC." },
        { text: "Look in set 01 for tag 0xDC. The set has tags: 56, F2, DC, 03. Is DC there and valid?", answer: "Yes! Tag DC is found in set 01 with Valid=1. This is a CACHE HIT!" },
        { text: "What data is at offset 010 (position 2)?", answer: "The DC line's data is [3E, 18, 48, 45, 4C, 4C, 4F, 00]. Position 2 = 0x48 = the letter 'H' in ASCII. (Fun fact: the whole line spells '.HELLO.' in ASCII!)" }
      ],
      finalAnswer: "CACHE HIT! Tag 0xDC found in set 01, valid=1, dirty=1.\nData at offset 2 = 0x48 ('H').\nThe dirty bit = 1 means this line has been modified and must be written back to RAM before it can be evicted."
    }
  ]
};
