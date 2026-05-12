const MCQ = [
  // ===== PARALLELISM & FLYNN'S =====
  {
    id: 1, topic: "parallelism", difficulty: "easy",
    question: "Which level of parallelism allows a 32-bit CPU to add all 32 bits simultaneously?",
    questionVi: "Mức song song nào cho phép CPU 32-bit cộng tất cả 32 bit đồng thời?",
    options: [
      "Data Level Parallelism (DLP)",
      "Bit Level Parallelism",
      "Instruction Level Parallelism (ILP)",
      "Thread Level Parallelism (TLP)"
    ],
    optionsVi: [
      "Song song mức dữ liệu (DLP)",
      "Song song mức bit",
      "Song song mức lệnh (ILP)",
      "Song song mức luồng (TLP)"
    ],
    correct: 1,
    explanation: "Bit level parallelism means the processor handles all bits of a number at once. A 32-bit add processes all 32 bits in parallel, not one by one.",
    explanationVi: "Song song mức bit nghĩa là bộ xử lý xử lý tất cả các bit của một số cùng lúc. Phép cộng 32-bit xử lý cả 32 bit song song, không phải từng bit một."
  },
  {
    id: 2, topic: "parallelism", difficulty: "easy",
    question: "In Flynn's taxonomy, a modern GPU is classified as:",
    questionVi: "Trong phân loại Flynn, GPU hiện đại được phân loại là:",
    options: ["SISD", "SIMD", "MISD", "MIMD"],
    optionsVi: ["SISD", "SIMD", "MISD", "MIMD"],
    correct: 1,
    explanation: "GPUs use SIMD (Single Instruction, Multiple Data) — one instruction processes many data items at once, which is how they handle thousands of pixels simultaneously.",
    explanationVi: "GPU dùng SIMD (Đơn Lệnh, Đa Dữ Liệu) — một lệnh xử lý nhiều dữ liệu cùng lúc, đó là cách chúng xử lý hàng nghìn pixel đồng thời."
  },
  {
    id: 3, topic: "parallelism", difficulty: "medium",
    question: "Which Flynn category is the RAREST in practice?",
    questionVi: "Loại Flynn nào HIẾM NHẤT trong thực tế?",
    options: ["SISD", "SIMD", "MISD", "MIMD"],
    optionsVi: ["SISD", "SIMD", "MISD", "MIMD"],
    correct: 2,
    explanation: "MISD (Multiple Instruction, Single Data) is extremely rare. The only real example is space shuttle flight computers that ran the same data through different algorithms for fault tolerance.",
    explanationVi: "MISD (Đa Lệnh, Đơn Dữ Liệu) cực kỳ hiếm. Ví dụ thực tế duy nhất là máy tính tàu con thoi chạy cùng dữ liệu qua nhiều thuật toán khác nhau để chịu lỗi."
  },
  {
    id: 4, topic: "parallelism", difficulty: "medium",
    question: "Multiple cores running different programs on different data is an example of:",
    questionVi: "Nhiều lõi chạy chương trình khác nhau trên dữ liệu khác nhau là ví dụ của:",
    options: ["SISD", "SIMD", "MISD", "MIMD"],
    optionsVi: ["SISD", "SIMD", "MISD", "MIMD"],
    correct: 3,
    explanation: "MIMD (Multiple Instruction, Multiple Data) — each core executes its own instruction stream on its own data. This is what modern multi-core CPUs do.",
    explanationVi: "MIMD (Đa Lệnh, Đa Dữ Liệu) — mỗi lõi thực thi luồng lệnh riêng trên dữ liệu riêng. Đây là cách CPU đa nhân hiện đại hoạt động."
  },

  // ===== PIPELINING =====
  {
    id: 5, topic: "pipelining", difficulty: "easy",
    question: "What does pipelining improve?",
    questionVi: "Pipeline cải thiện điều gì?",
    options: [
      "The speed of each individual instruction",
      "Throughput (instructions completed per second)",
      "The number of pipeline stages",
      "The size of registers"
    ],
    optionsVi: [
      "Tốc độ của từng lệnh riêng lẻ",
      "Thông lượng (số lệnh hoàn thành mỗi giây)",
      "Số giai đoạn pipeline",
      "Kích thước thanh ghi"
    ],
    correct: 1,
    explanation: "Pipelining does NOT make individual instructions faster (still 5 cycles each). It increases throughput — after the pipeline fills, one instruction completes every cycle instead of every 5.",
    explanationVi: "Pipeline KHÔNG làm từng lệnh nhanh hơn (vẫn 5 chu kỳ mỗi lệnh). Nó tăng thông lượng — sau khi pipeline đầy, mỗi chu kỳ có một lệnh hoàn thành thay vì mỗi 5 chu kỳ."
  },
  {
    id: 6, topic: "pipelining", difficulty: "easy",
    question: "What is the correct order of the 5 RISC pipeline stages?",
    questionVi: "Thứ tự đúng của 5 giai đoạn pipeline RISC là gì?",
    options: [
      "IF, EX, ID, MEM, WB",
      "IF, ID, EX, MEM, WB",
      "ID, IF, EX, WB, MEM",
      "IF, ID, MEM, EX, WB"
    ],
    optionsVi: [
      "IF, EX, ID, MEM, WB",
      "IF, ID, EX, MEM, WB",
      "ID, IF, EX, WB, MEM",
      "IF, ID, MEM, EX, WB"
    ],
    correct: 1,
    explanation: "The 5 stages in order: IF (Instruction Fetch), ID (Instruction Decode), EX (Execution), MEM (Memory Access), WB (Write Back).",
    explanationVi: "5 giai đoạn theo thứ tự: IF (Nạp Lệnh), ID (Giải Mã), EX (Thực Thi), MEM (Truy Cập Bộ Nhớ), WB (Ghi Lại)."
  },
  {
    id: 7, topic: "pipelining", difficulty: "medium",
    question: "ADD r1, r2, r3 followed by SUB r4, r1, r5 — what type of hazard is this?",
    questionVi: "ADD r1, r2, r3 theo sau bởi SUB r4, r1, r5 — đây là loại xung đột gì?",
    options: [
      "WAR (Write After Read)",
      "WAW (Write After Write)",
      "RAW (Read After Write)",
      "Structural hazard"
    ],
    optionsVi: [
      "WAR (Ghi Sau Đọc)",
      "WAW (Ghi Sau Ghi)",
      "RAW (Đọc Sau Ghi)",
      "Xung đột cấu trúc"
    ],
    correct: 2,
    explanation: "SUB needs to READ r1, but ADD hasn't WRITTEN it yet. This is RAW (Read After Write) — the most common and serious data hazard.",
    explanationVi: "SUB cần ĐỌC r1, nhưng ADD chưa GHI xong. Đây là RAW (Đọc Sau Ghi) — xung đột dữ liệu phổ biến và nghiêm trọng nhất."
  },
  {
    id: 8, topic: "pipelining", difficulty: "medium",
    question: "ADD r3, r1, r2 followed by MUL r1, r4, r5 — what type of hazard?",
    questionVi: "ADD r3, r1, r2 theo sau bởi MUL r1, r4, r5 — loại xung đột gì?",
    options: [
      "RAW (Read After Write)",
      "WAR (Write After Read)",
      "WAW (Write After Write)",
      "Control hazard"
    ],
    optionsVi: [
      "RAW (Đọc Sau Ghi)",
      "WAR (Ghi Sau Đọc)",
      "WAW (Ghi Sau Ghi)",
      "Xung đột điều khiển"
    ],
    correct: 1,
    explanation: "MUL WRITES to r1, but ADD still needs to READ the old value of r1. This is WAR (Write After Read) — a name/false dependency solvable with register renaming.",
    explanationVi: "MUL GHI vào r1, nhưng ADD vẫn cần ĐỌC giá trị cũ của r1. Đây là WAR (Ghi Sau Đọc) — phụ thuộc tên/giả, giải được bằng đổi tên thanh ghi."
  },
  {
    id: 9, topic: "pipelining", difficulty: "medium",
    question: "What does result forwarding (bypassing) do?",
    questionVi: "Chuyển tiếp kết quả (bypassing) làm gì?",
    options: [
      "Skips the EX stage entirely",
      "Sends the EX output directly to the next instruction's EX input",
      "Removes instructions from the pipeline",
      "Predicts which branch to take"
    ],
    optionsVi: [
      "Bỏ qua hoàn toàn giai đoạn EX",
      "Gửi đầu ra EX trực tiếp đến đầu vào EX của lệnh tiếp",
      "Xóa các lệnh khỏi pipeline",
      "Dự đoán nhánh nào sẽ được thực hiện"
    ],
    correct: 1,
    explanation: "Forwarding creates a hardware shortcut: the result from one instruction's EX stage is sent directly to the next instruction's EX input, bypassing the MEM and WB stages. This eliminates stalls for most RAW hazards.",
    explanationVi: "Chuyển tiếp tạo đường tắt phần cứng: kết quả từ giai đoạn EX của một lệnh được gửi trực tiếp đến đầu vào EX của lệnh tiếp, bỏ qua MEM và WB. Loại bỏ tạm dừng cho hầu hết xung đột RAW."
  },
  {
    id: 10, topic: "pipelining", difficulty: "hard",
    question: "Without forwarding, how many bubble cycles are needed between ADD r1,r2,r3 and SUB r4,r1,r5?",
    questionVi: "Không có chuyển tiếp, cần bao nhiêu chu kỳ bong bóng giữa ADD r1,r2,r3 và SUB r4,r1,r5?",
    options: ["0", "1", "2", "3"],
    optionsVi: ["0", "1", "2", "3"],
    correct: 2,
    explanation: "ADD writes r1 in WB (cycle 5). SUB needs r1 in EX. Without forwarding, SUB must wait 2 cycles for ADD to complete WB before it can proceed to EX.",
    explanationVi: "ADD ghi r1 ở WB (chu kỳ 5). SUB cần r1 ở EX. Không có chuyển tiếp, SUB phải đợi 2 chu kỳ để ADD hoàn thành WB trước khi có thể tiến đến EX."
  },
  {
    id: 11, topic: "pipelining", difficulty: "easy",
    question: "A pipeline bubble is:",
    questionVi: "Bong bóng pipeline là:",
    options: [
      "An extra instruction added to the pipeline",
      "An empty/wasted cycle inserted due to a hazard",
      "A hardware failure in the pipeline",
      "A technique to speed up branch prediction"
    ],
    optionsVi: [
      "Một lệnh thêm vào pipeline",
      "Chu kỳ trống/lãng phí được chèn vào do xung đột",
      "Lỗi phần cứng trong pipeline",
      "Kỹ thuật tăng tốc dự đoán nhánh"
    ],
    correct: 1,
    explanation: "A bubble (stall) is an empty NOP cycle inserted when a hazard is detected. It wastes a cycle but prevents incorrect execution.",
    explanationVi: "Bong bóng (tạm dừng) là chu kỳ NOP trống được chèn vào khi phát hiện xung đột. Nó lãng phí một chu kỳ nhưng ngăn thực thi sai."
  },
  {
    id: 12, topic: "pipelining", difficulty: "medium",
    question: "Which hazard occurs at a branch instruction (if/else)?",
    questionVi: "Xung đột nào xảy ra tại lệnh rẽ nhánh (if/else)?",
    options: [
      "Data hazard",
      "Structural hazard",
      "Control hazard",
      "WAW hazard"
    ],
    optionsVi: [
      "Xung đột dữ liệu",
      "Xung đột cấu trúc",
      "Xung đột điều khiển",
      "Xung đột WAW"
    ],
    correct: 2,
    explanation: "Control hazards occur at branches — the CPU doesn't know which instruction to fetch next until the branch condition is evaluated.",
    explanationVi: "Xung đột điều khiển xảy ra tại rẽ nhánh — CPU không biết nạp lệnh nào tiếp cho đến khi điều kiện rẽ nhánh được đánh giá."
  },
  {
    id: 13, topic: "pipelining", difficulty: "medium",
    question: "The ideal throughput of a 5-stage pipeline is:",
    questionVi: "Thông lượng lý tưởng của pipeline 5 giai đoạn là:",
    options: [
      "5 instructions per cycle",
      "1 instruction per cycle",
      "1 instruction every 5 cycles",
      "Depends on the clock frequency"
    ],
    optionsVi: [
      "5 lệnh mỗi chu kỳ",
      "1 lệnh mỗi chu kỳ",
      "1 lệnh mỗi 5 chu kỳ",
      "Phụ thuộc vào tần số đồng hồ"
    ],
    correct: 1,
    explanation: "After filling up, a pipeline completes 1 instruction per cycle regardless of the number of stages. The number of stages determines latency (5 cycles), not throughput.",
    explanationVi: "Sau khi đầy, pipeline hoàn thành 1 lệnh mỗi chu kỳ bất kể số giai đoạn. Số giai đoạn xác định độ trễ (5 chu kỳ), không phải thông lượng."
  },

  // ===== OoO EXECUTION =====
  {
    id: 14, topic: "ooo-execution", difficulty: "medium",
    question: "In Out-of-Order Execution, results are committed (saved) in:",
    questionVi: "Trong Thực Thi Không Theo Thứ Tự, kết quả được commit (lưu) theo:",
    options: [
      "The order they finish executing",
      "Random order",
      "The original program order",
      "Reverse order"
    ],
    optionsVi: [
      "Thứ tự hoàn thành thực thi",
      "Thứ tự ngẫu nhiên",
      "Thứ tự chương trình gốc",
      "Thứ tự ngược"
    ],
    correct: 2,
    explanation: "Even though instructions execute out of order (whichever has data ready first), results are committed back to registers in the ORIGINAL program order. This ensures correctness.",
    explanationVi: "Dù lệnh thực thi không theo thứ tự (lệnh nào có dữ liệu sẵn trước), kết quả được commit lại thanh ghi theo THỨ TỰ CHƯƠNG TRÌNH GỐC. Điều này đảm bảo tính đúng đắn."
  },
  {
    id: 15, topic: "ooo-execution", difficulty: "hard",
    question: "Register renaming primarily solves which hazard types?",
    questionVi: "Đổi tên thanh ghi chủ yếu giải quyết loại xung đột nào?",
    options: [
      "RAW (true dependency)",
      "WAR and WAW (false/name dependencies)",
      "Structural hazards",
      "Control hazards"
    ],
    optionsVi: [
      "RAW (phụ thuộc thực)",
      "WAR và WAW (phụ thuộc giả/tên)",
      "Xung đột cấu trúc",
      "Xung đột điều khiển"
    ],
    correct: 1,
    explanation: "WAR and WAW are 'name dependencies' — instructions conflict only because they use the same register name. Register renaming assigns different physical registers, eliminating the conflict.",
    explanationVi: "WAR và WAW là 'phụ thuộc tên' — các lệnh xung đột chỉ vì dùng cùng tên thanh ghi. Đổi tên thanh ghi gán các thanh ghi vật lý khác nhau, loại bỏ xung đột."
  },

  // ===== BRANCH PREDICTION =====
  {
    id: 16, topic: "branch-prediction", difficulty: "medium",
    question: "In static branch prediction, a backward jump (loop) is predicted as:",
    questionVi: "Trong dự đoán nhánh tĩnh, nhảy lùi (vòng lặp) được dự đoán là:",
    options: ["Not taken", "Taken", "Random", "Depends on the BTB"],
    optionsVi: ["Không thực hiện", "Thực hiện", "Ngẫu nhiên", "Phụ thuộc vào BTB"],
    correct: 1,
    explanation: "Static prediction uses a simple rule: backward jumps (like loop tops) are predicted TAKEN because loops usually repeat. Forward jumps are predicted NOT taken.",
    explanationVi: "Dự đoán tĩnh dùng quy tắc đơn giản: nhảy lùi (như đầu vòng lặp) được dự đoán THỰC HIỆN vì vòng lặp thường lặp lại. Nhảy tiến được dự đoán KHÔNG thực hiện."
  },
  {
    id: 17, topic: "branch-prediction", difficulty: "hard",
    question: "What is the main advantage of 2-bit over 1-bit branch prediction?",
    questionVi: "Ưu điểm chính của dự đoán nhánh 2-bit so với 1-bit là gì?",
    options: [
      "It uses less hardware",
      "It needs two consecutive mispredictions to change direction",
      "It can predict forward jumps",
      "It doesn't need a BTB"
    ],
    optionsVi: [
      "Nó dùng ít phần cứng hơn",
      "Nó cần hai lần dự đoán sai liên tiếp mới đổi hướng",
      "Nó có thể dự đoán nhảy tiến",
      "Nó không cần BTB"
    ],
    correct: 1,
    explanation: "1-bit flips after every mistake, causing 2 mispredictions at loop boundaries. 2-bit has 4 states and needs 2 consecutive wrong predictions to change direction, handling loop exits much better.",
    explanationVi: "1-bit đổi sau mỗi sai, gây 2 lần dự đoán sai ở ranh giới vòng lặp. 2-bit có 4 trạng thái và cần 2 lần sai liên tiếp mới đổi hướng, xử lý thoát vòng lặp tốt hơn nhiều."
  },
  {
    id: 18, topic: "branch-prediction", difficulty: "medium",
    question: "What does the BTB (Branch Target Buffer) store?",
    questionVi: "BTB (Bộ Đệm Đích Rẽ Nhánh) lưu gì?",
    options: [
      "The result of ALU operations",
      "Branch address, target address, and taken/not-taken history",
      "Register values for forwarding",
      "Cache line tags"
    ],
    optionsVi: [
      "Kết quả phép tính ALU",
      "Địa chỉ nhánh, địa chỉ đích, và lịch sử thực hiện/không thực hiện",
      "Giá trị thanh ghi cho chuyển tiếp",
      "Thẻ dòng cache"
    ],
    correct: 1,
    explanation: "The BTB is a small hardware table that records recent branch instructions: where they are, where they jump to, and whether they were taken. Used by dynamic prediction.",
    explanationVi: "BTB là bảng phần cứng nhỏ ghi lại các lệnh rẽ nhánh gần đây: chúng ở đâu, nhảy đến đâu, và có được thực hiện không. Dùng bởi dự đoán động."
  },

  // ===== SUPERSCALAR & VLIW =====
  {
    id: 19, topic: "superscalar-vliw", difficulty: "medium",
    question: "In a VLIW processor, who decides which instructions run in parallel?",
    questionVi: "Trong bộ xử lý VLIW, ai quyết định lệnh nào chạy song song?",
    options: [
      "The hardware at runtime",
      "The compiler at compile time",
      "The operating system",
      "The programmer manually"
    ],
    optionsVi: [
      "Phần cứng lúc chạy",
      "Trình biên dịch lúc biên dịch",
      "Hệ điều hành",
      "Lập trình viên thủ công"
    ],
    correct: 1,
    explanation: "In VLIW, the COMPILER analyzes code and packs parallel instructions into bundles. In superscalar, the HARDWARE does this at runtime. This is the key difference.",
    explanationVi: "Trong VLIW, TRÌNH BIÊN DỊCH phân tích code và gom lệnh song song vào gói. Trong siêu vô hướng, PHẦN CỨNG làm việc này lúc chạy. Đây là khác biệt chính."
  },
  {
    id: 20, topic: "superscalar-vliw", difficulty: "medium",
    question: "What is a disadvantage of VLIW compared to superscalar?",
    questionVi: "Nhược điểm của VLIW so với siêu vô hướng là gì?",
    options: [
      "More complex hardware",
      "Programs are not portable between different VLIW chips",
      "Cannot achieve more than 1 instruction per cycle",
      "Requires out-of-order execution"
    ],
    optionsVi: [
      "Phần cứng phức tạp hơn",
      "Chương trình không di động giữa các chip VLIW khác",
      "Không thể đạt hơn 1 lệnh mỗi chu kỳ",
      "Yêu cầu thực thi không theo thứ tự"
    ],
    correct: 1,
    explanation: "VLIW programs are compiled for a specific chip's bundle format. A different VLIW chip with a different number of execution units needs recompilation. Superscalar programs are portable.",
    explanationVi: "Chương trình VLIW được biên dịch cho định dạng gói của chip cụ thể. Chip VLIW khác với số đơn vị thực thi khác cần biên dịch lại. Chương trình siêu vô hướng di động được."
  },
  {
    id: 21, topic: "superscalar-vliw", difficulty: "easy",
    question: "What does loop unrolling do?",
    questionVi: "Mở vòng lặp (loop unrolling) làm gì?",
    options: [
      "Eliminates the loop entirely",
      "Copies the loop body multiple times to reduce overhead and expose parallelism",
      "Converts loops into recursive functions",
      "Adds more iterations to the loop"
    ],
    optionsVi: [
      "Loại bỏ vòng lặp hoàn toàn",
      "Sao chép thân vòng lặp nhiều lần để giảm chi phí và bộc lộ song song",
      "Chuyển vòng lặp thành hàm đệ quy",
      "Thêm nhiều lần lặp vào vòng lặp"
    ],
    correct: 1,
    explanation: "Loop unrolling copies the loop body (e.g., 4 times) so each iteration does 4 items. Fewer loop overhead, more independent instructions visible for superscalar/SIMD to exploit.",
    explanationVi: "Mở vòng lặp sao chép thân vòng lặp (ví dụ 4 lần) để mỗi lần lặp xử lý 4 phần tử. Ít chi phí vòng lặp hơn, nhiều lệnh độc lập hơn để siêu vô hướng/SIMD khai thác."
  },

  // ===== VECTOR / SIMD =====
  {
    id: 22, topic: "vector-processors", difficulty: "medium",
    question: "What was the major flaw of MMX?",
    questionVi: "Lỗi lớn của MMX là gì?",
    options: [
      "It only supported 8-bit operations",
      "It shared registers with the FPU, so you couldn't use both at once",
      "It was too slow for multimedia",
      "It required a separate chip"
    ],
    optionsVi: [
      "Nó chỉ hỗ trợ phép tính 8-bit",
      "Nó dùng chung thanh ghi với FPU, nên không thể dùng cả hai cùng lúc",
      "Nó quá chậm cho đa phương tiện",
      "Nó yêu cầu chip riêng"
    ],
    correct: 1,
    explanation: "MMX shared the same physical registers as the FPU (Floating Point Unit). You had to choose: MMX OR floating-point math, not both. SSE fixed this with dedicated XMM registers.",
    explanationVi: "MMX dùng chung thanh ghi vật lý với FPU (Đơn Vị Dấu Phẩy Động). Bạn phải chọn: MMX HOẶC toán dấu phẩy động, không phải cả hai. SSE sửa điều này bằng thanh ghi XMM riêng."
  },
  {
    id: 23, topic: "vector-processors", difficulty: "medium",
    question: "What is the register width of AVX-512?",
    questionVi: "Độ rộng thanh ghi của AVX-512 là bao nhiêu?",
    options: ["128 bits", "256 bits", "512 bits", "1024 bits"],
    optionsVi: ["128 bit", "256 bit", "512 bit", "1024 bit"],
    correct: 2,
    explanation: "AVX-512 uses 512-bit ZMM registers (ZMM0-ZMM31). The evolution: MMX(64) → SSE(128) → AVX(256) → AVX-512(512). Each generation doubled the width.",
    explanationVi: "AVX-512 dùng thanh ghi ZMM 512-bit (ZMM0-ZMM31). Tiến hóa: MMX(64) → SSE(128) → AVX(256) → AVX-512(512). Mỗi thế hệ gấp đôi độ rộng."
  },
  {
    id: 24, topic: "vector-processors", difficulty: "hard",
    question: "for(i=1;i<N;i++) x[i]=x[i-1]+y[i]; — Can this loop be vectorized?",
    questionVi: "for(i=1;i<N;i++) x[i]=x[i-1]+y[i]; — Vòng lặp này có thể vector hóa không?",
    options: [
      "Yes, because iterations are independent",
      "No, because of RAW dependency between iterations",
      "Yes, because it only reads y[i]",
      "No, because of WAR dependency"
    ],
    optionsVi: [
      "Có, vì các lần lặp độc lập",
      "Không, vì có phụ thuộc RAW giữa các lần lặp",
      "Có, vì nó chỉ đọc y[i]",
      "Không, vì có phụ thuộc WAR"
    ],
    correct: 1,
    explanation: "Each iteration reads x[i-1] which was WRITTEN by the previous iteration. This is RAW between iterations — iteration 3 needs iteration 2's result. Cannot run in parallel.",
    explanationVi: "Mỗi lần lặp đọc x[i-1] được GHI bởi lần lặp trước. Đây là RAW giữa các lần lặp — lần lặp 3 cần kết quả lần lặp 2. Không thể chạy song song."
  },

  // ===== MULTICORE & GPU =====
  {
    id: 25, topic: "multicore", difficulty: "medium",
    question: "Hyper-threading (SMT) provides a typical speedup of:",
    questionVi: "Siêu phân luồng (SMT) cung cấp tăng tốc thường khoảng:",
    options: ["100% (2x)", "50-75%", "15-30%", "Less than 5%"],
    optionsVi: ["100% (2 lần)", "50-75%", "15-30%", "Dưới 5%"],
    correct: 2,
    explanation: "SMT shares execution units between 2 threads. It can't truly run both simultaneously — it just keeps hardware busier. Typical boost is 15-30%, NOT double performance.",
    explanationVi: "SMT chia sẻ đơn vị thực thi giữa 2 luồng. Không thể thực sự chạy cả hai đồng thời — chỉ giữ phần cứng bận hơn. Tăng tốc thường 15-30%, KHÔNG phải gấp đôi."
  },
  {
    id: 26, topic: "multicore", difficulty: "medium",
    question: "Which is optimized for HIGH THROUGHPUT rather than low latency?",
    questionVi: "Cái nào được tối ưu cho THÔNG LƯỢNG CAO thay vì độ trễ thấp?",
    options: ["CPU", "GPU", "FPGA", "DMA controller"],
    optionsVi: ["CPU", "GPU", "FPGA", "Bộ điều khiển DMA"],
    correct: 1,
    explanation: "GPUs have thousands of simple cores optimized for throughput — getting MANY things done at once. CPUs have few powerful cores optimized for latency — getting ONE thing done fast.",
    explanationVi: "GPU có hàng nghìn lõi đơn giản tối ưu cho thông lượng — hoàn thành NHIỀU việc cùng lúc. CPU có vài lõi mạnh tối ưu cho độ trễ — hoàn thành MỘT việc nhanh."
  },
  {
    id: 27, topic: "multicore", difficulty: "easy",
    question: "ARM big.LITTLE is an example of what type of system?",
    questionVi: "ARM big.LITTLE là ví dụ của loại hệ thống nào?",
    options: [
      "Homogeneous multi-core",
      "Heterogeneous multi-core",
      "NUMA architecture",
      "SIMD processor"
    ],
    optionsVi: [
      "Đa nhân đồng nhất",
      "Đa nhân không đồng nhất",
      "Kiến trúc NUMA",
      "Bộ xử lý SIMD"
    ],
    correct: 1,
    explanation: "big.LITTLE has different types of cores: powerful 'big' cores for heavy tasks and energy-efficient 'LITTLE' cores for light tasks. Different core types = heterogeneous.",
    explanationVi: "big.LITTLE có các loại lõi khác nhau: lõi 'big' mạnh cho tác vụ nặng và lõi 'LITTLE' tiết kiệm năng lượng cho tác vụ nhẹ. Loại lõi khác nhau = không đồng nhất."
  },

  // ===== FPGA & NUMA =====
  {
    id: 28, topic: "fpga-numa", difficulty: "easy",
    question: "An FPGA is programmed using:",
    questionVi: "FPGA được lập trình bằng:",
    options: [
      "C and Python",
      "VHDL or Verilog (hardware description languages)",
      "Assembly language",
      "JavaScript"
    ],
    optionsVi: [
      "C và Python",
      "VHDL hoặc Verilog (ngôn ngữ mô tả phần cứng)",
      "Hợp ngữ",
      "JavaScript"
    ],
    correct: 1,
    explanation: "FPGAs are programmed with hardware description languages (VHDL, Verilog) because you're describing circuits, not sequential instructions. They are parallel by nature.",
    explanationVi: "FPGA được lập trình bằng ngôn ngữ mô tả phần cứng (VHDL, Verilog) vì bạn mô tả mạch, không phải lệnh tuần tự. Chúng song song tự nhiên."
  },
  {
    id: 29, topic: "fpga-numa", difficulty: "medium",
    question: "In NUMA, accessing another processor's memory is:",
    questionVi: "Trong NUMA, truy cập bộ nhớ của bộ xử lý khác thì:",
    options: [
      "Impossible",
      "The same speed as local memory",
      "Slower than accessing local memory",
      "Faster than accessing local memory"
    ],
    optionsVi: [
      "Không thể",
      "Cùng tốc độ với bộ nhớ cục bộ",
      "Chậm hơn truy cập bộ nhớ cục bộ",
      "Nhanh hơn truy cập bộ nhớ cục bộ"
    ],
    correct: 2,
    explanation: "NUMA = Non-Uniform Memory Access. 'Non-uniform' means access time DEPENDS on where memory is. Local = fast, remote = slower (but still possible).",
    explanationVi: "NUMA = Truy Cập Bộ Nhớ Không Đồng Nhất. 'Không đồng nhất' nghĩa là thời gian truy cập PHỤ THUỘC vào vị trí bộ nhớ. Cục bộ = nhanh, xa = chậm hơn (nhưng vẫn có thể)."
  },

  // ===== PERFORMANCE =====
  {
    id: 30, topic: "performance", difficulty: "medium",
    question: "In T = NI × eCPI × 1/f, what does eCPI represent?",
    questionVi: "Trong T = NI × eCPI × 1/f, eCPI đại diện cho gì?",
    options: [
      "Total number of clock cycles",
      "Average clock cycles per instruction",
      "Clock frequency in GHz",
      "Number of executed instructions"
    ],
    optionsVi: [
      "Tổng số chu kỳ đồng hồ",
      "Số chu kỳ trung bình mỗi lệnh",
      "Tần số đồng hồ tính bằng GHz",
      "Số lệnh được thực thi"
    ],
    correct: 1,
    explanation: "eCPI = effective Cycles Per Instruction — the average number of clock cycles each instruction takes. Affected by cache misses, pipeline stalls, superscalar parallelism.",
    explanationVi: "eCPI = Số Chu Kỳ Hiệu Dụng Mỗi Lệnh — số chu kỳ đồng hồ trung bình mỗi lệnh cần. Bị ảnh hưởng bởi trượt cache, tạm dừng pipeline, song song siêu vô hướng."
  },
  {
    id: 31, topic: "performance", difficulty: "hard",
    question: "With 20% sequential code, what is the MAXIMUM speedup with infinite processors (Amdahl's law)?",
    questionVi: "Với 20% code tuần tự, tăng tốc TỐI ĐA với vô hạn bộ xử lý (định luật Amdahl) là bao nhiêu?",
    options: ["2x", "4x", "5x", "10x"],
    optionsVi: ["2 lần", "4 lần", "5 lần", "10 lần"],
    correct: 2,
    explanation: "S(∞) = 1/A = 1/0.2 = 5x. Even with infinite processors, 20% of the code still runs sequentially, limiting speedup to 5x forever.",
    explanationVi: "S(∞) = 1/A = 1/0.2 = 5 lần. Dù với vô hạn bộ xử lý, 20% code vẫn chạy tuần tự, giới hạn tăng tốc ở 5 lần mãi mãi."
  },
  {
    id: 32, topic: "performance", difficulty: "medium",
    question: "Amdahl's law: S(N) = 1/(A + (1-A)/N). With A=0.1, N=10, what is the speedup?",
    questionVi: "Định luật Amdahl: S(N) = 1/(A + (1-A)/N). Với A=0.1, N=10, tăng tốc là bao nhiêu?",
    options: ["5.26x", "6.90x", "9.00x", "10.0x"],
    optionsVi: ["5.26 lần", "6.90 lần", "9.00 lần", "10.0 lần"],
    correct: 0,
    explanation: "S = 1/(0.1 + 0.9/10) = 1/(0.1 + 0.09) = 1/0.19 = 5.26x. Even with only 10% sequential code, 10 processors only give 5.26x, not 10x.",
    explanationVi: "S = 1/(0.1 + 0.9/10) = 1/(0.1 + 0.09) = 1/0.19 = 5.26 lần. Dù chỉ 10% code tuần tự, 10 bộ xử lý chỉ cho 5.26 lần, không phải 10 lần."
  },

  // ===== CACHE BASICS =====
  {
    id: 33, topic: "cache-basics", difficulty: "easy",
    question: "Cache works well because of:",
    questionVi: "Cache hoạt động tốt nhờ:",
    options: [
      "Large memory capacity",
      "Locality principles (spatial and temporal)",
      "High clock frequency",
      "Multiple ALUs"
    ],
    optionsVi: [
      "Dung lượng bộ nhớ lớn",
      "Nguyên lý cục bộ (không gian và thời gian)",
      "Tần số đồng hồ cao",
      "Nhiều ALU"
    ],
    correct: 1,
    explanation: "Without locality, we couldn't predict what data the CPU needs next. Temporal locality (reuse same data) and spatial locality (use nearby data) make cache effective with 90%+ hit rates.",
    explanationVi: "Không có cục bộ, ta không thể dự đoán CPU cần dữ liệu gì tiếp. Cục bộ thời gian (dùng lại cùng dữ liệu) và cục bộ không gian (dùng dữ liệu lân cận) giúp cache hiệu quả với tỷ lệ trúng trên 90%."
  },
  {
    id: 34, topic: "cache-basics", difficulty: "medium",
    question: "Why don't we make ALL memory from fast SRAM?",
    questionVi: "Tại sao không làm TẤT CẢ bộ nhớ bằng SRAM nhanh?",
    options: [
      "SRAM is slower than DRAM",
      "SRAM is too expensive and generates too much heat",
      "SRAM cannot store data permanently",
      "SRAM only works with certain CPUs"
    ],
    optionsVi: [
      "SRAM chậm hơn DRAM",
      "SRAM quá đắt và tỏa quá nhiều nhiệt",
      "SRAM không thể lưu dữ liệu vĩnh viễn",
      "SRAM chỉ hoạt động với một số CPU nhất định"
    ],
    correct: 1,
    explanation: "SRAM is fast but dramatically more expensive than DRAM. Cache is the compromise: small SRAM (fast) + large DRAM (cheap) = almost SRAM speed at almost DRAM cost.",
    explanationVi: "SRAM nhanh nhưng đắt hơn DRAM rất nhiều. Cache là thỏa hiệp: SRAM nhỏ (nhanh) + DRAM lớn (rẻ) = gần tốc độ SRAM với gần giá DRAM."
  },

  // ===== CACHE STRUCTURE =====
  {
    id: 35, topic: "cache-structure", difficulty: "easy",
    question: "Each cache line contains:",
    questionVi: "Mỗi dòng cache chứa:",
    options: [
      "Only the data block",
      "Tag + flags (valid, dirty) + data block",
      "Only the tag and data",
      "Address + instruction + result"
    ],
    optionsVi: [
      "Chỉ khối dữ liệu",
      "Thẻ + cờ (hợp lệ, bẩn) + khối dữ liệu",
      "Chỉ thẻ và dữ liệu",
      "Địa chỉ + lệnh + kết quả"
    ],
    correct: 1,
    explanation: "A cache line has: Tag (identifies which address), Flags (valid bit, dirty bit), and Data Block (actual copy of memory, e.g., 64 bytes).",
    explanationVi: "Dòng cache có: Thẻ (xác định địa chỉ nào), Cờ (bit hợp lệ, bit bẩn), và Khối Dữ Liệu (bản sao thực của bộ nhớ, ví dụ 64 byte)."
  },
  {
    id: 36, topic: "cache-structure", difficulty: "medium",
    question: "L1 cache is typically:",
    questionVi: "Cache L1 thường là:",
    options: [
      "The largest and shared among all cores",
      "The smallest, fastest, and private per core",
      "Only used for data, not instructions",
      "Located on a separate chip"
    ],
    optionsVi: [
      "Lớn nhất và chia sẻ giữa tất cả lõi",
      "Nhỏ nhất, nhanh nhất, và riêng cho mỗi lõi",
      "Chỉ dùng cho dữ liệu, không dùng cho lệnh",
      "Nằm trên chip riêng"
    ],
    correct: 1,
    explanation: "L1 is closest to the core: smallest (~32-64KB), fastest (~1-2 cycles), private per core, split into L1i (instructions) and L1d (data). L3 is the largest and shared.",
    explanationVi: "L1 gần nhất với lõi: nhỏ nhất (~32-64KB), nhanh nhất (~1-2 chu kỳ), riêng mỗi lõi, chia thành L1i (lệnh) và L1d (dữ liệu). L3 lớn nhất và chia sẻ."
  },

  // ===== CACHE ASSOCIATIVITY =====
  {
    id: 37, topic: "cache-associativity", difficulty: "medium",
    question: "In a direct-mapped cache, each memory address can go in:",
    questionVi: "Trong cache ánh xạ trực tiếp, mỗi địa chỉ bộ nhớ có thể vào:",
    options: [
      "Any cache line",
      "Exactly 1 specific cache line",
      "Any line within a set of N lines",
      "The most recently used line"
    ],
    optionsVi: [
      "Bất kỳ dòng cache nào",
      "Đúng 1 dòng cache cụ thể",
      "Bất kỳ dòng nào trong tập N dòng",
      "Dòng dùng gần đây nhất"
    ],
    correct: 1,
    explanation: "Direct-mapped = 1-way associative. Each address maps to exactly one cache line. Fast lookup (check 1 line) but suffers from conflict misses.",
    explanationVi: "Ánh xạ trực tiếp = liên kết 1-way. Mỗi địa chỉ ánh xạ vào đúng một dòng cache. Tìm nhanh (kiểm tra 1 dòng) nhưng bị trượt xung đột."
  },
  {
    id: 38, topic: "cache-associativity", difficulty: "hard",
    question: "A fully associative cache has how many index bits?",
    questionVi: "Cache liên kết đầy đủ có bao nhiêu bit chỉ số?",
    options: ["Equal to log2(cache_size)", "Equal to log2(block_size)", "0", "Depends on the tag bits"],
    optionsVi: ["Bằng log2(kích_thước_cache)", "Bằng log2(kích_thước_khối)", "0", "Phụ thuộc vào bit thẻ"],
    correct: 2,
    explanation: "Fully associative = 1 set containing ALL lines. Since there's only 1 set, no index bits are needed (log2(1) = 0). Any address can go in any line.",
    explanationVi: "Liên kết đầy đủ = 1 tập chứa TẤT CẢ dòng. Vì chỉ có 1 tập, không cần bit chỉ số (log2(1) = 0). Bất kỳ địa chỉ nào vào bất kỳ dòng nào."
  },
  {
    id: 39, topic: "cache-associativity", difficulty: "easy",
    question: "LRU replacement policy evicts the cache line that:",
    questionVi: "Chính sách thay thế LRU loại bỏ dòng cache mà:",
    options: [
      "Was most recently used",
      "Has the smallest tag",
      "Hasn't been accessed for the longest time",
      "Was loaded first"
    ],
    optionsVi: [
      "Được dùng gần đây nhất",
      "Có thẻ nhỏ nhất",
      "Chưa được truy cập lâu nhất",
      "Được nạp đầu tiên"
    ],
    correct: 2,
    explanation: "LRU = Least Recently Used. It evicts the line not accessed for the longest time. Logic: if you haven't used it in a while, you probably won't need it soon.",
    explanationVi: "LRU = Ít Dùng Gần Đây Nhất. Nó loại dòng chưa được truy cập lâu nhất. Logic: nếu bạn chưa dùng nó một thời gian, bạn có lẽ không cần sớm."
  },

  // ===== CACHE WRITE POLICIES =====
  {
    id: 40, topic: "cache-write", difficulty: "medium",
    question: "In a write-back cache, when is data written to RAM?",
    questionVi: "Trong cache ghi lại, khi nào dữ liệu được ghi vào RAM?",
    options: [
      "Immediately on every write",
      "Only when the dirty line needs to be evicted",
      "At fixed time intervals",
      "When the CPU is idle"
    ],
    optionsVi: [
      "Ngay lập tức mỗi lần ghi",
      "Chỉ khi dòng bẩn cần bị loại bỏ",
      "Theo khoảng thời gian cố định",
      "Khi CPU rảnh rỗi"
    ],
    correct: 1,
    explanation: "Write-back only writes to cache. RAM is updated when a dirty line must be evicted to make room for new data. This is why it's faster — most writes never touch slow RAM.",
    explanationVi: "Ghi lại chỉ ghi vào cache. RAM được cập nhật khi dòng bẩn phải bị loại để nhường chỗ cho dữ liệu mới. Vì vậy nó nhanh hơn — hầu hết ghi không bao giờ chạm RAM chậm."
  },
  {
    id: 41, topic: "cache-write", difficulty: "medium",
    question: "The dirty bit indicates:",
    questionVi: "Dirty bit (bit bẩn) cho biết:",
    options: [
      "The cache line has an error",
      "The cache line has been modified and differs from RAM",
      "The cache line is invalid",
      "The cache line was recently accessed"
    ],
    optionsVi: [
      "Dòng cache có lỗi",
      "Dòng cache đã bị sửa đổi và khác với RAM",
      "Dòng cache không hợp lệ",
      "Dòng cache được truy cập gần đây"
    ],
    correct: 1,
    explanation: "Dirty bit = 1 means this cache line was modified (written to). RAM has outdated data. Must write back to RAM before eviction or changes are lost.",
    explanationVi: "Dirty bit = 1 nghĩa là dòng cache đã bị sửa đổi (ghi vào). RAM có dữ liệu lỗi thời. Phải ghi lại RAM trước khi loại bỏ nếu không thay đổi sẽ mất."
  },

  // ===== CACHE ADDRESS =====
  {
    id: 42, topic: "cache-address", difficulty: "medium",
    question: "A memory address is split into [Tag | Index | Offset]. The offset selects:",
    questionVi: "Địa chỉ bộ nhớ được tách thành [Thẻ | Chỉ số | Offset]. Offset chọn:",
    options: [
      "Which set in the cache",
      "Which byte within the cache block",
      "Which cache level to use",
      "Which way in the set"
    ],
    optionsVi: [
      "Tập nào trong cache",
      "Byte nào trong khối cache",
      "Mức cache nào để dùng",
      "Way nào trong tập"
    ],
    correct: 1,
    explanation: "Offset = which byte within the block. Index = which set. Tag = identifies which memory block. Offset bits = log2(block_size).",
    explanationVi: "Offset = byte nào trong khối. Chỉ số = tập nào. Thẻ = xác định khối bộ nhớ nào. Bit offset = log2(kích_thước_khối)."
  },
  {
    id: 43, topic: "cache-address", difficulty: "hard",
    question: "8KB 4-way cache, 64B blocks, 32-bit address. How many index bits?",
    questionVi: "Cache 8KB 4-way, khối 64B, địa chỉ 32-bit. Bao nhiêu bit chỉ số?",
    options: ["4", "5", "6", "7"],
    optionsVi: ["4", "5", "6", "7"],
    correct: 1,
    explanation: "Sets = 8192/(64×4) = 32. Index bits = log2(32) = 5. The full breakdown: offset=6, index=5, tag=21.",
    explanationVi: "Tập = 8192/(64×4) = 32. Bit chỉ số = log2(32) = 5. Phân tách đầy đủ: offset=6, chỉ số=5, thẻ=21."
  },
  {
    id: 44, topic: "cache-address", difficulty: "hard",
    question: "16KB 4-way cache with 64B blocks. How many total cache lines?",
    questionVi: "Cache 16KB 4-way với khối 64B. Tổng bao nhiêu dòng cache?",
    options: ["64", "128", "256", "512"],
    optionsVi: ["64", "128", "256", "512"],
    correct: 2,
    explanation: "Total lines = cache_size / block_size = 16384 / 64 = 256 lines. These 256 lines are organized into 64 sets of 4 lines each.",
    explanationVi: "Tổng dòng = kích_thước_cache / kích_thước_khối = 16384 / 64 = 256 dòng. 256 dòng này được tổ chức thành 64 tập, mỗi tập 4 dòng."
  },

  // ===== CACHE COHERENCE =====
  {
    id: 45, topic: "cache-coherence", difficulty: "medium",
    question: "In the MESI protocol, 'E' (Exclusive) means:",
    questionVi: "Trong giao thức MESI, 'E' (Exclusive) nghĩa là:",
    options: [
      "The line has been modified and RAM is outdated",
      "I'm the only one with this data and I haven't changed it",
      "Multiple cores have copies of this data",
      "The line is not valid"
    ],
    optionsVi: [
      "Dòng đã bị sửa đổi và RAM lỗi thời",
      "Tôi là người duy nhất có dữ liệu này và tôi chưa thay đổi nó",
      "Nhiều lõi có bản sao dữ liệu này",
      "Dòng không hợp lệ"
    ],
    correct: 1,
    explanation: "Exclusive = I'm the only one with this data AND it's clean (matches RAM). I can freely write to it (just change state to M) without telling anyone.",
    explanationVi: "Exclusive = Tôi là người duy nhất có dữ liệu này VÀ nó sạch (khớp RAM). Tôi có thể tự do ghi vào (chỉ đổi trạng thái sang M) mà không cần nói ai."
  },
  {
    id: 46, topic: "cache-coherence", difficulty: "hard",
    question: "Core A has a line in Shared state and wants to write to it. What happens?",
    questionVi: "Lõi A có dòng ở trạng thái Shared và muốn ghi vào. Điều gì xảy ra?",
    options: [
      "A writes directly, nothing else changes",
      "A's line becomes Modified, all other copies become Invalid",
      "A's line becomes Exclusive, others stay Shared",
      "A must fetch a new copy from RAM first"
    ],
    optionsVi: [
      "A ghi trực tiếp, không gì khác thay đổi",
      "Dòng của A thành Modified, tất cả bản sao khác thành Invalid",
      "Dòng của A thành Exclusive, các lõi khác vẫn Shared",
      "A phải lấy bản sao mới từ RAM trước"
    ],
    correct: 1,
    explanation: "When writing to a Shared line, the core must first INVALIDATE all other copies (they become Invalid). Then its own line transitions to Modified (dirty, only copy).",
    explanationVi: "Khi ghi vào dòng Shared, lõi phải VÔ HIỆU HÓA tất cả bản sao khác (chúng thành Invalid). Rồi dòng của nó chuyển sang Modified (bẩn, bản duy nhất)."
  },
  {
    id: 47, topic: "cache-coherence", difficulty: "medium",
    question: "MESI is an example of which type of coherence protocol?",
    questionVi: "MESI là ví dụ của loại giao thức nhất quán nào?",
    options: [
      "Update-based",
      "Invalidation-based",
      "Directory-based",
      "Broadcast-based"
    ],
    optionsVi: [
      "Dựa trên cập nhật",
      "Dựa trên vô hiệu hóa",
      "Dựa trên thư mục",
      "Dựa trên phát sóng"
    ],
    correct: 1,
    explanation: "MESI is invalidation-based: when one core writes, it tells others to discard (invalidate) their copies. This generates less bus traffic than update-based protocols.",
    explanationVi: "MESI dựa trên vô hiệu hóa: khi một lõi ghi, nó nói lõi khác bỏ (vô hiệu hóa) bản sao. Điều này tạo ít lưu lượng bus hơn giao thức dựa trên cập nhật."
  },

  // ===== CACHE PROGRAMMING =====
  {
    id: 48, topic: "cache-programming", difficulty: "medium",
    question: "In C, traversing a 2D array row-by-row is faster than column-by-column because:",
    questionVi: "Trong C, duyệt mảng 2D theo hàng nhanh hơn theo cột vì:",
    options: [
      "Rows have fewer elements",
      "C stores arrays row-by-row, so row traversal accesses consecutive memory (cache-friendly)",
      "Column traversal uses more CPU registers",
      "Row traversal skips the cache entirely"
    ],
    optionsVi: [
      "Hàng có ít phần tử hơn",
      "C lưu mảng theo hàng, nên duyệt hàng truy cập bộ nhớ liên tiếp (thân thiện cache)",
      "Duyệt cột dùng nhiều thanh ghi CPU hơn",
      "Duyệt hàng bỏ qua cache hoàn toàn"
    ],
    correct: 1,
    explanation: "C stores 2D arrays row-by-row in memory. Row traversal accesses consecutive addresses — when cache loads a block, the next accesses are all in that same block. Column traversal jumps around, causing cache misses.",
    explanationVi: "C lưu mảng 2D theo hàng trong bộ nhớ. Duyệt hàng truy cập địa chỉ liên tiếp — khi cache nạp một khối, các truy cập tiếp đều trong cùng khối. Duyệt cột nhảy lung tung, gây trượt cache."
  },

  // ===== MIXED / TRICKY =====
  {
    id: 49, topic: "pipelining", difficulty: "medium",
    question: "Which of these is NOT a type of pipeline hazard?",
    questionVi: "Cái nào KHÔNG phải là loại xung đột pipeline?",
    options: [
      "Data hazard",
      "Structural hazard",
      "Control hazard",
      "Temporal hazard"
    ],
    optionsVi: [
      "Xung đột dữ liệu",
      "Xung đột cấu trúc",
      "Xung đột điều khiển",
      "Xung đột thời gian"
    ],
    correct: 3,
    explanation: "The three types of pipeline hazards are: Data (RAW/WAR/WAW), Structural (hardware conflict), and Control (branches). 'Temporal hazard' is not a real term.",
    explanationVi: "Ba loại xung đột pipeline là: Dữ liệu (RAW/WAR/WAW), Cấu trúc (xung đột phần cứng), và Điều khiển (rẽ nhánh). 'Xung đột thời gian' không phải thuật ngữ thực."
  },
  {
    id: 50, topic: "performance", difficulty: "medium",
    question: "A superscalar processor can achieve eCPI:",
    questionVi: "Bộ xử lý siêu vô hướng có thể đạt eCPI:",
    options: [
      "Always equal to 1",
      "Always greater than 1",
      "Less than 1 (multiple instructions per cycle)",
      "Equal to the number of pipeline stages"
    ],
    optionsVi: [
      "Luôn bằng 1",
      "Luôn lớn hơn 1",
      "Nhỏ hơn 1 (nhiều lệnh mỗi chu kỳ)",
      "Bằng số giai đoạn pipeline"
    ],
    correct: 2,
    explanation: "A superscalar processor has multiple execution units and can complete more than 1 instruction per cycle, meaning eCPI < 1. For example, completing 2 instructions/cycle gives eCPI = 0.5.",
    explanationVi: "Bộ xử lý siêu vô hướng có nhiều đơn vị thực thi và có thể hoàn thành hơn 1 lệnh mỗi chu kỳ, nghĩa là eCPI < 1. Ví dụ, hoàn thành 2 lệnh/chu kỳ cho eCPI = 0.5."
  }
];
