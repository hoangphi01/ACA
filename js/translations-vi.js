// Vietnamese translations for all study content
const VI = {
  oral: {
    1: {
      question: "Các mức độ song song (parallelism) trong kiến trúc máy tính là gì?",
      answer: "Song song là làm nhiều việc cùng lúc, xảy ra ở 5 mức độ:\n\n1. Mức bit — bộ xử lý xử lý tất cả các bit của một số cùng lúc (ví dụ: CPU 32-bit cộng tất cả 32 bit trong một lần, không phải từng bit một).\n\n2. Mức dữ liệu (DLP) — một lệnh xử lý nhiều dữ liệu cùng lúc. Tưởng tượng cộng 4 cặp số bằng một lệnh thay vì 4 lệnh riêng.\n\n3. Mức lệnh (ILP) — nhiều lệnh được xử lý đồng thời ở các giai đoạn khác nhau, giống như dây chuyền lắp ráp trong nhà máy.\n\n4. Mức tác vụ/luồng (TLP) — các luồng hoặc tác vụ khác nhau chạy đồng thời trên các lõi khác nhau. Giống như nhiều công nhân, mỗi người làm việc riêng.\n\n5. Mức tiến trình — hệ điều hành chạy nhiều chương trình cùng lúc."
    },
    2: {
      question: "Giải thích phân loại Flynn. Cho ví dụ cho từng loại.",
      answer: "Phân loại Flynn là cách đơn giản để phân loại kiến trúc máy tính dựa trên hai câu hỏi: Bao nhiêu lệnh chạy cùng lúc? Bao nhiêu dữ liệu được xử lý cùng lúc?\n\nSISD (Đơn Lệnh, Đơn Dữ Liệu) — máy tính cổ điển: một lệnh tại một thời điểm trên một dữ liệu. Ví dụ: PC đơn nhân cũ.\n\nSIMD (Đơn Lệnh, Đa Dữ Liệu) — một lệnh xử lý nhiều dữ liệu đồng thời. Ví dụ: bộ xử lý vector, GPU.\n\nMISD (Đa Lệnh, Đơn Dữ Liệu) — nhiều phép tính khác nhau trên cùng một dữ liệu. Rất hiếm. Ví dụ: máy tính tàu con thoi chạy cùng dữ liệu qua nhiều thuật toán để kiểm tra lỗi.\n\nMIMD (Đa Lệnh, Đa Dữ Liệu) — nhiều bộ xử lý, mỗi cái làm việc riêng trên dữ liệu riêng. Ví dụ: bộ xử lý đa nhân hiện đại."
    },
    3: {
      question: "Tại sao chúng ta cần pipeline? Nó giải quyết vấn đề gì?",
      answer: "Tưởng tượng ví dụ giặt đồ: giặt mất 30 phút, sấy mất 30 phút. Không có pipeline, bạn hoàn thành một mẻ (giặt + sấy = 60 phút) trước khi bắt đầu mẻ tiếp. Với pipeline, khi mẻ 1 chuyển sang máy sấy, mẻ 2 vào máy giặt. Bạn chồng chéo các giai đoạn.\n\nTrong CPU, mỗi lệnh đi qua 5 giai đoạn: nạp lệnh, giải mã, thực thi, truy cập bộ nhớ, ghi lại. Không có pipeline, bạn phải đợi cả 5 giai đoạn xong mới bắt đầu lệnh tiếp. Với pipeline, khi lệnh 1 đang 'thực thi', lệnh 2 đang 'giải mã', và lệnh 3 đang 'nạp lệnh'.\n\nĐiểm mấu chốt: pipeline KHÔNG làm một lệnh nhanh hơn (vẫn mất 5 chu kỳ). Nhưng nó tăng thông lượng đáng kể — sau khi pipeline đầy, cứ mỗi chu kỳ lại có một lệnh hoàn thành thay vì cứ 5 chu kỳ mới xong một lệnh."
    },
    4: {
      question: "5 giai đoạn của pipeline RISC là gì? Giải thích ngắn gọn từng giai đoạn.",
      answer: "Pipeline RISC có 5 giai đoạn mà mỗi lệnh phải đi qua:\n\n1. IF (Nạp Lệnh) — CPU đọc lệnh tiếp theo từ bộ nhớ. Thanh ghi PC (Bộ Đếm Chương Trình) cho biết vị trí cần đọc.\n\n2. ID (Giải Mã Lệnh) — CPU hiểu lệnh đó làm gì. Phép tính nào? Dùng thanh ghi nào?\n\n3. EX (Thực Thi) — ALU (Đơn Vị Số Học Logic) thực hiện công việc: cộng, trừ, so sánh, v.v. Với lệnh load/store, nó tính địa chỉ bộ nhớ.\n\n4. MEM (Truy Cập Bộ Nhớ) — chỉ dùng cho lệnh load/store. Nếu load, đọc dữ liệu từ RAM. Nếu store, ghi dữ liệu vào RAM. Các lệnh khác đi qua mà không làm gì.\n\n5. WB (Ghi Lại) — kết quả được lưu vào thanh ghi đích. Lệnh hoàn thành."
    },
    5: {
      question: "Xung đột (hazard) trong pipeline là gì? Kể tên tất cả các loại và giải thích.",
      answer: "Xung đột là các tình huống mà pipeline không thể xử lý lệnh tiếp theo một cách trơn tru vì có vấn đề. Có 3 loại:\n\n1. Xung đột dữ liệu — hai lệnh trong pipeline cần cùng một dữ liệu, gây ra xung đột:\n   - RAW (Đọc Sau Ghi): lệnh B cần kết quả mà lệnh A chưa tính xong. Giống như muốn ăn bánh mà bánh còn trong lò. Đây là loại phổ biến và nghiêm trọng nhất.\n   - WAR (Ghi Sau Đọc): lệnh B sẽ ghi đè dữ liệu mà lệnh A vẫn cần đọc. Đây là 'phụ thuộc tên'.\n   - WAW (Ghi Sau Ghi): hai lệnh đều ghi vào cùng thanh ghi — thứ tự quan trọng nếu không sẽ sai giá trị cuối cùng.\n\n2. Xung đột cấu trúc — hai lệnh cần cùng một phần cứng cùng lúc. Ví dụ, một lệnh đang nạp từ bộ nhớ trong khi lệnh khác đang đọc dữ liệu từ bộ nhớ, nhưng chỉ có một cổng bộ nhớ.\n\n3. Xung đột điều khiển — tại lệnh rẽ nhánh (như câu lệnh if), CPU không biết lệnh nào tiếp theo cho đến khi điều kiện được đánh giá. Pipeline không biết nạp lệnh gì."
    },
    6: {
      question: "Xung đột RAW (Đọc Sau Ghi) được xử lý như thế nào? Mô tả nhiều giải pháp.",
      answer: "RAW là khi lệnh B cần kết quả mà lệnh A chưa ghi lại. Có nhiều giải pháp:\n\n1. Bong bóng pipeline/tạm dừng — cách đơn giản nhất. Tạm dừng lệnh B vài chu kỳ cho đến khi kết quả của lệnh A sẵn sàng. CPU chèn các chu kỳ 'trống' gọi là bong bóng. Hoạt động nhưng lãng phí thời gian.\n\n2. Chuyển tiếp kết quả (bypassing) — đường tắt phần cứng. Ngay khi lệnh A tính kết quả ở giai đoạn EX, kết quả đó được chuyển trực tiếp đến giai đoạn EX của lệnh B qua một đường dây đặc biệt, không cần đợi ghi lại thanh ghi. Loại bỏ hoàn toàn việc tạm dừng trong nhiều trường hợp.\n\n3. OoOE (Thực Thi Không Theo Thứ Tự) — thay vì tạm dừng, CPU tìm phía trước các lệnh độc lập khác để thực thi trong khi chờ đợi. Nó sắp xếp lại thứ tự thực thi để lấp đầy khoảng trống.\n\n4. Đổi tên thanh ghi — chủ yếu giải quyết xung đột WAR và WAW. CPU có nhiều thanh ghi vật lý hơn những gì lập trình viên thấy, và nó ánh xạ các lệnh đến các thanh ghi vật lý khác nhau để tránh xung đột."
    },
    7: {
      question: "Chuyển tiếp kết quả (bypassing) là gì và tại sao nó hữu ích?",
      answer: "Chuyển tiếp kết quả giống như chuyển một mẩu giấy trực tiếp cho người cần thay vì gửi qua hộp thư.\n\nBình thường, lệnh A tính kết quả ở giai đoạn EX nhưng không lưu vào thanh ghi cho đến giai đoạn WB — 2 chu kỳ sau. Nếu lệnh B cần kết quả đó, nó phải đợi.\n\nVới chuyển tiếp, có một đường dây đặc biệt lấy đầu ra của giai đoạn EX của lệnh A và đưa trực tiếp vào đầu vào giai đoạn EX của lệnh B. Dữ liệu đi tắt, bỏ qua giai đoạn MEM và WB.\n\nVí dụ: 'ADD r1, r2, r3' tiếp theo là 'SUB r4, r1, r5'. SUB cần r1 mà ADD vừa tính. Không có chuyển tiếp: tạm dừng 2 chu kỳ. Với chuyển tiếp: không tạm dừng, kết quả chạy trực tiếp từ đầu ra ADD đến đầu vào SUB."
    },
    8: {
      question: "Thực thi không theo thứ tự (OoOE) hoạt động như thế nào? Mô tả quy trình.",
      answer: "OoOE nghĩa là CPU không thực thi lệnh theo thứ tự xuất hiện trong chương trình. Thay vào đó, nó thực thi lệnh nào có dữ liệu đầu vào sẵn sàng trước. Giống như bếp nhà hàng — đầu bếp không nấu món theo thứ tự đặt, mà dựa trên nguyên liệu nào sẵn sàng.\n\nQuy trình từng bước:\n1. Các lệnh được đọc từ bộ nhớ và đặt vào hàng đợi lệnh (như phòng chờ).\n2. CPU kiểm tra lệnh nào có tất cả dữ liệu đầu vào (toán hạng) sẵn sàng.\n3. Lệnh đầu tiên có dữ liệu sẵn sàng được thực thi — dù nó xuất hiện sau trong chương trình.\n4. Kết quả vào hàng đợi kết quả (khu vực tạm giữ).\n5. Quan trọng: kết quả được lưu (commit) lại thanh ghi theo THỨ TỰ CHƯƠNG TRÌNH GỐC. Dù lệnh thực thi không theo thứ tự, kết quả cuối cùng trông như chạy theo thứ tự.\n\nĐiều này tránh bong bóng pipeline vì khi một lệnh chờ dữ liệu, các lệnh khác có thể chạy thay vì để pipeline rảnh rỗi."
    },
    9: {
      question: "Đổi tên thanh ghi là gì và nó giải quyết vấn đề gì?",
      answer: "Đổi tên thanh ghi giải quyết vấn đề cụ thể: khi hai lệnh dùng cùng tên thanh ghi nhưng không thực sự phụ thuộc dữ liệu của nhau. Đây gọi là 'phụ thuộc tên' hay 'phụ thuộc giả' (xung đột WAR và WAW).\n\nTưởng tượng hai đồng nghiệp đều cần 'bàn số 3' nhưng cho các công việc hoàn toàn khác nhau. Nếu cho họ bàn riêng, họ có thể làm việc cùng lúc. Đó chính là đổi tên thanh ghi.\n\nCode của lập trình viên dùng 'thanh ghi kiến trúc' — những cái nhìn thấy như r0 đến r7 (chỉ 8 tên). Nhưng bên trong CPU, có nhiều 'thanh ghi vật lý' hơn (ví dụ t0 đến t15). Mạch ánh xạ tự động gán mỗi lần dùng thanh ghi kiến trúc đến một thanh ghi vật lý khác.\n\nVí dụ: nếu hai lệnh đều ghi vào r3, CPU đổi tên lần ghi đầu thành t9 và lần thứ hai thành t10. Bây giờ chúng không xung đột và có thể chạy song song hoặc không theo thứ tự."
    },
    10: {
      question: "Thực thi suy đoán là gì và tại sao cần nó?",
      answer: "Thực thi suy đoán giải quyết vấn đề xung đột điều khiển: khi CPU gặp lệnh rẽ nhánh (như if-else), nó không biết đi đường nào cho đến khi điều kiện được đánh giá. Nhưng pipeline cần nạp lệnh NGAY — không thể đợi.\n\nNên CPU đoán và bắt đầu thực thi lệnh từ đường được dự đoán. Nếu đoán đúng — tuyệt vời, không lãng phí thời gian! Nếu sai, CPU bỏ tất cả công việc suy đoán và bắt đầu lại trên đường đúng.\n\nHai cách tiếp cận:\n1. Nạp trước tham lam — thực thi CẢ HAI nhánh đồng thời, sau đó giữ lại nhánh đúng. Tốn năng lượng nhưng đảm bảo một đường đúng.\n2. Thực thi dự đoán — dùng bộ dự đoán rẽ nhánh để đoán đường nào có khả năng hơn, và chỉ thực thi đường đó. Hiệu quả hơn nhưng có thể sai.\n\nĐiều này tốt hơn nhiều so với không làm gì (tạm dừng) trong khi chờ nhánh được giải quyết, đặc biệt với pipeline sâu (20-30 giai đoạn)."
    },
    11: {
      question: "Giải thích dự đoán rẽ nhánh tĩnh và động. Dự đoán 2-bit hoạt động như thế nào?",
      answer: "Dự đoán rẽ nhánh đoán xem nhảy có điều kiện sẽ được thực hiện hay không.\n\nDự đoán tĩnh dùng quy tắc cố định đơn giản, không học:\n- Nếu nhảy lùi (như quay lại đầu vòng lặp), dự đoán 'thực hiện' (vòng lặp sẽ lặp lại).\n- Nếu nhảy tiến, dự đoán 'không thực hiện'.\nHoạt động tốt cho vòng lặp nhưng không thể thích ứng.\n\nDự đoán động học từ những gì đã xảy ra, lưu lịch sử trong BTB (Bộ Đệm Đích Rẽ Nhánh):\n\nDự đoán 1-bit: nhớ một bit — lần trước nhánh có thực hiện không? Nếu có, dự đoán thực hiện. Vấn đề: cuối vòng lặp, dự đoán sai hai lần.\n\nDự đoán 2-bit: dùng 4 trạng thái — Mạnh Thực Hiện, Yếu Thực Hiện, Yếu Không Thực Hiện, Mạnh Không Thực Hiện. Cần HAI lần dự đoán sai liên tiếp mới đổi hướng. Nên khi vòng lặp kết thúc một lần (một dự đoán sai), bộ dự đoán ở 'Yếu Thực Hiện' thay vì đổi. Lần sau vòng lặp chạy, nó vẫn dự đoán đúng là thực hiện."
    },
    12: {
      question: "Bộ xử lý siêu vô hướng (superscalar) là gì? Khác gì với bộ xử lý pipeline đơn giản?",
      answer: "Bộ xử lý pipeline bình thường giống như một dây chuyền lắp ráp — nó có thể xử lý nhiều lệnh cùng lúc (ở các giai đoạn khác nhau), nhưng chỉ hoàn thành một lệnh mỗi chu kỳ đồng hồ.\n\nBộ xử lý siêu vô hướng giống như có NHIỀU dây chuyền chạy song song. Nó có nhiều đơn vị thực thi (nhiều ALU, nhiều đơn vị dấu phẩy động, v.v.), nên có thể bắt đầu và hoàn thành nhiều hơn một lệnh mỗi chu kỳ.\n\nPhần cứng tự động xem các lệnh sắp tới qua 'cửa sổ lệnh' và tìm những lệnh độc lập với nhau. Những lệnh độc lập đó được gửi đến các đơn vị thực thi khác nhau đồng thời.\n\nKhác biệt chính: pipeline = tối đa 1 lệnh/chu kỳ. Siêu vô hướng = nhiều lệnh/chu kỳ."
    },
    13: {
      question: "VLIW là gì? So sánh với siêu vô hướng?",
      answer: "VLIW (Từ Lệnh Rất Dài) là cách khác để chạy nhiều lệnh song song, nhưng thay vì phần cứng tìm ra những gì có thể chạy cùng nhau (như siêu vô hướng), TRÌNH BIÊN DỊCH làm tất cả công việc đó trước.\n\nTrình biên dịch phân tích code và gom nhiều lệnh nhỏ vào một 'gói' lớn. Mỗi vị trí trong gói chạy trên một đơn vị thực thi khác nhau đồng thời. Nếu trình biên dịch không tìm đủ công việc song song, nó điền các vị trí trống bằng NOP (Không Thao Tác).\n\nƯu điểm VLIW: phần cứng đơn giản hơn, có thể có chu kỳ đồng hồ ngắn hơn.\nNhược điểm VLIW: cần trình biên dịch đặc biệt, chương trình không di động giữa các chip VLIW khác nhau, NOP lãng phí bộ nhớ.\n\nƯu điểm siêu vô hướng: chương trình di động, phần cứng thích ứng động.\nNhược điểm siêu vô hướng: cần phần cứng phức tạp để lập lịch.\n\nBộ xử lý Itanium của Intel dùng cách tiếp cận giống VLIW gọi là EPIC."
    },
    14: {
      question: "Cho biểu thức (x-y)*(x+y)/(z*z*8), chỉ ra VLIW tăng tốc như thế nào so với thực thi tuần tự.",
      answer: "Tính (x-y)*(x+y)/(z*z*8) với x trong r1, y trong r2, z trong r3.\n\nTuần tự (từng cái một) — 6 lệnh:\n1. SUB r4, r1, r2  (r4 = x-y)\n2. ADD r5, r1, r2  (r5 = x+y)\n3. MUL r6, r4, r5  (r6 = (x-y)*(x+y)) — cần kết quả bước 1 & 2\n4. MUL r7, r3, r3  (r7 = z*z)\n5. ASL r8, r7, #3  (r8 = z*z*8, dịch trái 3 = nhân 8) — cần bước 4\n6. DIV r9, r6, r8  (kết quả cuối) — cần bước 3 & 5\n\nVLIW (gói song song) — 3 gói:\nGói 1: [SUB r4,r1,r2 | ADD r5,r1,r2 | MUL r7,r3,r3]\n  Cả ba chỉ cần x, y, z đã có sẵn — nên chạy được cùng lúc!\nGói 2: [MUL r6,r4,r5 | ASL r8,r7,#3 | (trống)]\n  Cần kết quả gói 1, nhưng độc lập với nhau.\nGói 3: [DIV r9,r6,r8 | (trống) | (trống)]\n  Cần cả hai kết quả từ gói 2.\n\nKết quả: 3 chu kỳ thay vì 6 = tăng tốc 2 lần. Không thể tốt hơn vì phụ thuộc dữ liệu."
    },
    15: {
      question: "Bộ xử lý vector là gì và chúng đạt được song song như thế nào?",
      answer: "Bộ xử lý vector dùng SIMD (Đơn Lệnh, Đa Dữ Liệu) — một lệnh xử lý nhiều dữ liệu cùng lúc.\n\nTưởng tượng bạn cần cộng 4 cặp số. Bộ xử lý bình thường (vô hướng) làm từng cặp một — 4 lệnh cộng riêng. Bộ xử lý vector gom cả 4 số vào một thanh ghi lớn, và một lệnh cộng duy nhất cộng cả 4 cặp đồng thời.\n\nChúng dùng thanh ghi siêu rộng để chứa nhiều giá trị:\n- MMX: thanh ghi 64-bit, 8 thanh ghi MM0-MM7.\n- SSE: thanh ghi 128-bit, ví dụ 4 float cùng lúc. XMM0-XMM15.\n- AVX: thanh ghi 256-bit (YMM0-YMM15).\n- AVX-512: thanh ghi 512-bit (ZMM0-ZMM31), xử lý 16 float cùng lúc.\n- Neon (phiên bản ARM): thanh ghi 128-bit.\n\nCác thanh ghi này lồng nhau: nửa dưới của YMM chính LÀ thanh ghi XMM, và nửa dưới của XMM là MM."
    },
    16: {
      question: "Giải thích sự phát triển của các mở rộng SIMD trong x86: MMX, SSE, AVX, AVX-512.",
      answer: "Mỗi thế hệ làm thanh ghi rộng hơn để xử lý nhiều dữ liệu song song hơn:\n\nMMX (1997, Mở Rộng Đa Phương Tiện): thanh ghi 64-bit (MM0-MM7), 8 cái. Chỉ số nguyên. Lỗi lớn: dùng chung thanh ghi vật lý với FPU (Đơn Vị Dấu Phẩy Động), nên không thể dùng MMX và tính dấu phẩy động cùng lúc.\n\nSSE (Mở Rộng SIMD Truyền Dữ Liệu, 1999): sửa lỗi MMX bằng thanh ghi 128-bit riêng mới (XMM0-XMM15). Chủ yếu cho float — xử lý 4 x 32-bit float cùng lúc. SSE2 thêm hỗ trợ số nguyên.\n\nAVX (Mở Rộng Vector Nâng Cao, 2011): gấp đôi lên thanh ghi 256-bit (YMM0-YMM15). AVX2 thêm hỗ trợ đầy đủ số nguyên.\n\nAVX-512 (2016): gấp đôi lên thanh ghi 512-bit (ZMM0-ZMM31), 32 thanh ghi. Xử lý 16 float hoặc 64 byte cùng lúc.\n\nChúng lồng nhau như búp bê Nga: ZMM0 chứa YMM0, chứa XMM0, chứa MM0."
    },
    17: {
      question: "Phụ thuộc vòng lặp là gì? Loại nào có thể vector hóa và loại nào không?",
      answer: "Phụ thuộc vòng lặp hỏi: một lần lặp có phụ thuộc vào lần lặp trước không? Điều này quan trọng vì vector hóa (SIMD) xử lý nhiều lần lặp cùng lúc — chỉ hoạt động nếu các lần lặp độc lập.\n\nRAW giữa các lần lặp — KHÔNG vector hóa được:\n  for(i=1; i<N; i++) x[i] = x[i-1] + y[i];\n  Mỗi lần lặp cần kết quả của lần lặp TRƯỚC. Không thể chạy song song.\n\nWAR giữa các lần lặp — CÓ THỂ vector hóa:\n  for(i=0; i<N-1; i++) x[i] = x[i+1] + y[i];\n  Mỗi lần lặp đọc từ vị trí SAU và ghi vào vị trí hiện tại. Nếu đọc tất cả giá trị trước (trước khi ghi), không có xung đột.\n\nRAR (Đọc Sau Đọc) — CÓ THỂ vector hóa:\n  Nhiều lần lặp đọc cùng dữ liệu — không vấn đề, đọc không xung đột.\n\nWAW (Ghi Sau Ghi) — KHÔNG vector hóa được:\n  Nhiều lần lặp ghi vào cùng vị trí — giá trị cuối phụ thuộc vào lần lặp nào chạy cuối."
    },
    18: {
      question: "Mở vòng lặp (loop unrolling) là gì và tại sao nó cải thiện hiệu suất?",
      answer: "Mở vòng lặp là tối ưu hóa đơn giản: thay vì làm một việc mỗi lần lặp, bạn sao chép thân vòng lặp nhiều lần và làm nhiều việc mỗi lần lặp.\n\nGốc: for(i=0; i<100; i++) a[i] = b[i] + c[i];  (100 lần lặp)\n\nMở ra: for(i=0; i<100; i+=4) {\n  a[i]   = b[i]   + c[i];\n  a[i+1] = b[i+1] + c[i+1];\n  a[i+2] = b[i+2] + c[i+2];\n  a[i+3] = b[i+3] + c[i+3];\n}  (25 lần lặp, mỗi lần 4 phần tử)\n\nTại sao nó giúp:\n1. Ít chi phí vòng lặp hơn — ít so sánh (i<100) và tăng (i++) hơn. 25 lần kiểm tra thay vì 100.\n2. Nhiều lệnh độc lập nhìn thấy cùng lúc — bộ xử lý siêu vô hướng có thể tìm và thực thi 4 phép cộng song song.\n3. Tốt hơn cho bộ xử lý vector — trình biên dịch dễ kết hợp 4 phép tính thành một lệnh SIMD.\n4. Tốt hơn cho VLIW — nhiều lệnh hơn để điền vào các vị trí trong gói."
    },
    19: {
      question: "Siêu phân luồng (hyper-threading/SMT) là gì? Khác gì với đa nhân thực sự?",
      answer: "Hyper-threading là tên Intel cho SMT (Đa Luồng Đồng Thời). Ý tưởng: một lõi vật lý giả vờ là hai 'lõi logic' đối với hệ điều hành.\n\nCách hoạt động: lõi có HAI bộ thanh ghi và bộ đếm chương trình (để theo dõi hai luồng), nhưng chỉ MỘT bộ đơn vị thực thi (ALU, v.v.). Khi luồng A tạm dừng (chờ bộ nhớ, giải quyết nhánh, v.v.), luồng B có thể dùng đơn vị thực thi ngay thay vì để chúng rảnh rỗi. Nó lấp đầy bong bóng pipeline bằng công việc hữu ích từ luồng khác.\n\nKhác biệt với đa nhân thực sự:\n- Đa nhân: mỗi lõi có đơn vị thực thi RIÊNG. Hai lõi có thể thực sự chạy hai lệnh cùng lúc chính xác. Tăng tốc nhiều hơn nhưng tốn diện tích chip và điện.\n- Hyper-threading: chia sẻ đơn vị thực thi giữa các luồng. Không thể thực sự chạy cả hai cùng lúc — nó chỉ giữ phần cứng hiện có bận hơn. Ít tăng tốc hơn (thường 15-30%, không phải 100%) nhưng gần như miễn phí về diện tích chip."
    },
    20: {
      question: "Sự khác biệt giữa đa nhân, nhiều nhân, đồng nhất và không đồng nhất là gì?",
      answer: "Đa nhân (multi-core): một chip với vài lõi độc lập (2, 4, 8, 16...). Mỗi lõi có thể chạy chương trình/luồng riêng. Dùng trong PC và điện thoại hàng ngày. Các lõi thường có cache L1 riêng (đôi khi L2) nhưng chia sẻ cache L3.\n\nNhiều nhân (many-core): một chip với hàng trăm hoặc hàng nghìn lõi nhỏ hơn. Dùng trong máy chủ và siêu máy tính. GPU về cơ bản là bộ xử lý nhiều nhân.\n\nĐồng nhất (đối xứng): tất cả bộ xử lý/lõi cùng loại với bộ nhớ chia sẻ. Mọi lõi có thể làm cùng công việc tốt như nhau.\n\nKhông đồng nhất: các loại bộ xử lý khác nhau làm việc cùng nhau, mỗi loại chuyên biệt cho các tác vụ khác nhau:\n- ARM big.LITTLE: một số lõi mạnh nhưng tốn điện ('big'), số khác chậm hơn nhưng tiết kiệm năng lượng ('LITTLE').\n- CPU + GPU: CPU xử lý tác vụ chung, GPU xử lý toán song song/đồ họa.\n- Bộ tăng tốc khác: FPU, FPGA, DSP, bộ tăng tốc AI, bộ mã hóa AES-NI."
    },
    21: {
      question: "So sánh kiến trúc CPU và GPU. Khi nào dùng từng loại?",
      answer: "Hãy nghĩ CPU vs GPU như: vài công nhân giỏi vs. một đội quân công nhân cơ bản.\n\nCPU:\n- Vài lõi mạnh (thường 4-16)\n- Tối ưu cho độ trễ thấp — hoàn thành MỘT việc nhanh nhất có thể\n- Pipeline nông (dưới 30 giai đoạn)\n- Cache lớn, dự đoán nhánh phức tạp và logic thực thi không theo thứ tự\n- Tốt nhất cho: logic tuần tự, code nhiều quyết định, tác vụ hệ điều hành\n\nGPU:\n- Hàng nghìn lõi đơn giản\n- Tối ưu cho thông lượng cao — hoàn thành NHIỀU việc cùng lúc\n- Pipeline sâu (trên 100 giai đoạn)\n- Cache nhỏ mỗi lõi, quản lý luồng bằng phần cứng\n- Băng thông bộ nhớ khổng lồ (có thể đạt TB/s)\n- Tốt nhất cho: đồ họa, toán ma trận, huấn luyện AI, bất kỳ tác vụ nào lặp lại cùng phép tính trên lượng dữ liệu lớn\n\nGPGPU (GPU Đa Năng) nghĩa là dùng GPU cho tính toán phi đồ họa. Lập trình bằng CUDA (ngôn ngữ NVIDIA), OpenCL (tiêu chuẩn mở), hoặc MATLAB."
    },
    22: {
      question: "Mô tả kiến trúc GPU NVIDIA (kiến trúc Tesla). SM, SP, SFU là gì?",
      answer: "Kiến trúc GPU Tesla của NVIDIA được tổ chức theo cấp bậc, giống công ty có các phòng ban:\n\nChip GPU chứa nhiều TPC (Cụm Bộ Xử Lý/Kết Cấu). Mỗi TPC có:\n- 2 SM (Bộ Đa Xử Lý Luồng) — đây là đơn vị làm việc chính\n- 1 TU (Đơn Vị Kết Cấu) — xử lý lấy mẫu kết cấu cho đồ họa\n\nMỗi SM chứa:\n- 1 MIU (Đơn Vị Lệnh Đa Luồng) — lập lịch và quản lý hàng trăm luồng bằng phần cứng\n- Cache nhỏ\n- 8 SP (Bộ Xử Lý Luồng/Vô Hướng) — đây là lõi tính toán thực sự. Mỗi cái có tệp thanh ghi riêng (RF)\n- 2 SFU (Đơn Vị Hàm Đặc Biệt) — xử lý toán phức tạp như sin(), cos(), 1/sqrt(x)\n- Bộ nhớ chia sẻ — bộ nhớ nhanh để các luồng trong cùng SM giao tiếp\n\nTất cả TPC kết nối qua Mạng Liên Kết đến ROP, cache L2, và VRAM (RAM Video).\n\nThiết kế này song song ồ ạt: một GPU có thể có hàng nghìn SP chạy đồng thời."
    },
    23: {
      question: "FPGA là gì và nó khác CPU như thế nào?",
      answer: "FPGA (Mảng Cổng Lập Trình Được Tại Hiện Trường) là chip đặc biệt chứa các mạch logic có thể lập trình lại sau khi sản xuất.\n\nHãy nghĩ CPU như máy tính đa năng thực hiện lệnh từng bước một. FPGA giống như hộp LEGO — bạn có thể xây bất kỳ mạch số nào bạn muốn, và xây lại khác đi bất cứ lúc nào.\n\nKhác biệt chính với CPU:\n- CPU thực thi lệnh tuần tự (hoặc song song hạn chế). FPGA song song tự nhiên — tất cả mạch chạy đồng thời, như có hàng nghìn máy tính nhỏ hoạt động cùng lúc.\n- CPU lập trình bằng ngôn ngữ phần mềm (C, Python). FPGA lập trình bằng ngôn ngữ mô tả phần cứng: VHDL hoặc Verilog, mô tả mạch, không phải các bước.\n- CPU đa năng. FPGA có thể tùy chỉnh cho tác vụ cụ thể và thường chạy tác vụ đó nhanh hơn nhiều.\n\nTính năng hay: bạn thậm chí có thể xây toàn bộ thiết kế bộ xử lý BÊN TRONG FPGA — gọi là 'bộ xử lý mềm'."
    },
    24: {
      question: "Kiến trúc NUMA là gì? Khác với truy cập bộ nhớ đồng nhất như thế nào?",
      answer: "NUMA (Truy Cập Bộ Nhớ Không Đồng Nhất) là thiết kế bộ nhớ cho hệ thống đa bộ xử lý.\n\nTrong hệ thống bình thường (UMA = Truy Cập Bộ Nhớ Đồng Nhất), tất cả bộ xử lý chia sẻ một vùng bộ nhớ chung. Mọi bộ xử lý mất cùng thời gian để truy cập bất kỳ vị trí bộ nhớ nào. Vấn đề: khi thêm nhiều bộ xử lý, tất cả tranh nhau cùng bus bộ nhớ — trở thành nút thắt cổ chai.\n\nTrong NUMA, mỗi bộ xử lý có bộ nhớ CỤC BỘ riêng gắn trực tiếp. Truy cập bộ nhớ cục bộ thì nhanh. Nhưng bộ xử lý CŨNG CÓ THỂ truy cập bộ nhớ của bộ xử lý khác qua mạng liên kết — chỉ là chậm hơn (thời gian truy cập 'không đồng nhất').\n\nƯu điểm: nhiều bộ xử lý có thể đọc/ghi bộ nhớ cục bộ đồng thời mà không can thiệp nhau. Khả năng mở rộng tốt hơn nhiều.\n\nNhược điểm: lập trình viên và hệ điều hành cần thông minh về việc đặt dữ liệu gần bộ xử lý sử dụng nó."
    },
    25: {
      question: "Giải thích phương trình hiệu suất T = NI x eCPI x 1/f. Yếu tố nào ảnh hưởng đến từng thành phần?",
      answer: "Phương trình hiệu suất cho biết chương trình chạy mất bao lâu:\n\nT = NI x eCPI x 1/f\n\nT (Thời gian) = tổng thời gian thực thi tính bằng giây. Đây là cái ta muốn giảm thiểu.\n\nNI (Số Lệnh) = bao nhiêu lệnh mã máy chương trình thực thi (đếm cả vòng lặp). Bị ảnh hưởng bởi: thuật toán, chất lượng trình biên dịch, và ISA (Kiến Trúc Tập Lệnh). Bộ xử lý CISC có thể cần ít lệnh hơn RISC cho cùng tác vụ vì CISC có lệnh mạnh hơn.\n\neCPI (Số Chu Kỳ Trung Bình Mỗi Lệnh) = trung bình mỗi lệnh cần bao nhiêu chu kỳ. Bị ảnh hưởng bởi: loại lệnh (nhân tốn hơn cộng), trúng/trượt cache, tạm dừng pipeline, song song siêu vô hướng. Bộ xử lý siêu vô hướng có thể đạt eCPI dưới 1.\n\nf (tần số) = tốc độ đồng hồ tính bằng Hz. Tần số cao hơn = nhịp đồng hồ nhanh hơn. Bị giới hạn bởi nhiệt và công suất.\n\nĐể chương trình nhanh hơn: giảm NI (thuật toán tốt hơn), giảm eCPI (vi kiến trúc tốt hơn), hoặc tăng f (công nghệ chip tốt hơn)."
    },
    26: {
      question: "Giải thích định luật Amdahl. Nếu 20% chương trình là tuần tự, tăng tốc tối đa với 8 bộ xử lý là bao nhiêu?",
      answer: "Định luật Amdahl trả lời câu hỏi: 'Nếu thêm bộ xử lý, chương trình nhanh hơn bao nhiêu?'\n\nCông thức: S(N) = 1 / (A + (1-A)/N)\n- S = tăng tốc (nhanh hơn bao nhiêu lần)\n- N = số bộ xử lý\n- A = phần chương trình PHẢI chạy tuần tự (không thể song song hóa)\n- (1-A) = phần CÓ THỂ chạy song song\n\nTrực giác: dù có 1000 bộ xử lý, bạn vẫn phải đợi phần tuần tự hoàn thành từng bước một. Phần tuần tự là nút thắt cổ chai.\n\nVới A = 0.2 (20% tuần tự) và N = 8:\nS(8) = 1 / (0.2 + 0.8/8) = 1 / (0.2 + 0.1) = 1 / 0.3 = 3.33 lần tăng tốc\n\nVới vô hạn bộ xử lý:\nS(∞) = 1 / (0.2 + 0) = 1 / 0.2 = 5 lần tăng tốc tối đa, MÃI MÃI!\n\nNên dù với một triệu bộ xử lý, nếu 20% code là tuần tự, bạn không bao giờ nhanh hơn 5 lần. Điều này cho thấy tại sao giảm phần tuần tự quan trọng cho tính toán song song."
    },
    27: {
      question: "Nguyên lý cục bộ (locality) là gì? Tại sao chúng quan trọng cho cache?",
      answer: "Nguyên lý cục bộ là lý do cache hoạt động. Không có chúng, ta không thể dự đoán CPU cần dữ liệu gì tiếp theo, và cache sẽ vô dụng.\n\nCục bộ không gian: 'nếu bạn dùng địa chỉ này, bạn có thể sẽ dùng các địa chỉ lân cận sớm.'\n- Tại sao? Chương trình thực thi lệnh tuần tự, và dữ liệu thường lưu trong mảng (bộ nhớ liên tiếp). Khi bạn truy cập phần tử mảng [5], bạn có thể sẽ truy cập [6], [7], [8] sớm. Vì vậy cache nạp cả KHỐI dữ liệu (ví dụ 64 byte) khi bạn chỉ yêu cầu một byte — các phần tử lân cận đi kèm miễn phí.\n\nCục bộ thời gian: 'nếu bạn dùng địa chỉ này, bạn có thể sẽ dùng CÙNG địa chỉ đó lại sớm.'\n- Tại sao? Vòng lặp! Khi vòng lặp chạy, nó thực thi cùng các lệnh lặp đi lặp lại. Biến dùng trong vòng lặp được truy cập nhiều lần. Cache giữ dữ liệu dùng gần đây để truy cập lại nhanh.\n\nTỷ lệ trúng cache thường trên 90% nhờ các nguyên lý này — nghĩa là 9 trên 10 truy cập bộ nhớ được phục vụ từ cache nhanh thay vì RAM chậm."
    },
    28: {
      question: "Mô tả cấu trúc và hoạt động cơ bản của cache CPU.",
      answer: "Cache là bộ nhớ nhỏ, nhanh (làm từ SRAM = RAM Tĩnh, nhanh nhưng đắt) nằm giữa CPU và bộ nhớ chính (DRAM = RAM Động, chậm nhưng rẻ).\n\nCấu trúc — cache được chia thành các 'dòng' (hay 'khối'). Mỗi dòng chứa:\n- Khối Dữ Liệu: bản sao một đoạn bộ nhớ (ví dụ 64 byte dữ liệu liên tiếp từ RAM)\n- Thẻ (Tag): xác định dữ liệu này đến từ địa chỉ bộ nhớ NÀO (như nhãn trên hộp lưu trữ)\n- Cờ (Flags): bit trạng thái gồm 'hợp lệ' (dữ liệu có thực không?) và 'bẩn' (đã bị sửa đổi chưa?)\n\nCách hoạt động:\n1. CPU nói 'tôi cần dữ liệu tại địa chỉ X'\n2. Bộ điều khiển cache kiểm tra tất cả thẻ: có dòng nào chứa dữ liệu từ địa chỉ X không?\n3. Cache TRÚNG: có! Dữ liệu được trả về ngay lập tức từ cache nhanh.\n4. Cache TRƯỢT: không. Cache đọc toàn bộ khối chứa địa chỉ X từ RAM chậm, lưu vào dòng cache, rồi trả dữ liệu cho CPU.\n\nQuan trọng: cache minh bạch với lập trình viên — bạn không quản lý nó trực tiếp. Phần cứng xử lý mọi thứ tự động."
    },
    29: {
      question: "Giải thích ba loại liên kết cache (associativity). Đánh đổi là gì?",
      answer: "Liên kết trả lời: 'khi dữ liệu từ RAM đến, nó có thể được lưu ở đâu trong cache?'\n\nÁnh xạ trực tiếp (1-way): mỗi địa chỉ bộ nhớ chỉ có thể vào MỘT dòng cache cụ thể, xác định bởi địa chỉ. Giống chỗ ngồi cố định trong lớp.\n- Ưu: tìm kiếm rất nhanh — chỉ kiểm tra một dòng.\n- Nhược: nếu hai địa chỉ ánh xạ vào cùng dòng, chúng liên tục đẩy nhau ra dù các dòng khác trống ('trượt xung đột'). Tỷ lệ trúng kém.\n\nLiên kết đầy đủ: bất kỳ địa chỉ nào có thể vào BẤT KỲ dòng cache nào. Giống chỗ ngồi tự do.\n- Ưu: tỷ lệ trúng tốt nhất — không có trượt xung đột.\n- Nhược: rất đắt! Để kiểm tra dữ liệu có trong cache không, phải so thẻ với TẤT CẢ dòng đồng thời. Cần phần cứng đặc biệt gọi là CAM.\n\nLiên kết tập N-way: cache chia thành các tập, mỗi tập có N dòng. Địa chỉ ánh xạ vào một tập cụ thể, nhưng có thể dùng bất kỳ dòng nào trong N dòng của tập đó. Giống: 'bạn phải ngồi hàng 3, nhưng chọn bất kỳ ghế nào trong 4 ghế.'\n- Đây là thỏa hiệp thực tế dùng trong CPU thực. 4-way và 8-way phổ biến."
    },
    30: {
      question: "Các chính sách thay thế nào được dùng khi một dòng cache phải bị ghi đè?",
      answer: "Khi cache đầy và cần nạp dữ liệu mới, nó phải loại bỏ (evict) một dòng hiện có. Chính sách thay thế quyết định loại dòng nào:\n\n1. Ngẫu nhiên: chọn bất kỳ dòng nào ngẫu nhiên.\n   - Ưu: cực kỳ đơn giản để triển khai trong phần cứng.\n   - Nhược: có thể loại dữ liệu bạn sẽ cần lại sớm. Không hiệu quả lắm.\n\n2. LRU (Ít Dùng Gần Đây Nhất): loại dòng chưa được truy cập lâu nhất. Logic: 'nếu bạn chưa dùng nó một thời gian, bạn có lẽ không cần nó sớm.'\n   - Ưu: rất hiệu quả — giữ dữ liệu thường dùng trong cache.\n   - Nhược: cần theo dõi thứ tự truy cập của tất cả dòng, cần phần cứng thêm. Phức tạp khi nhiều dòng.\n\n3. Không phải dòng dùng gần đây nhất: không loại dòng vừa dùng GẦN ĐÂY NHẤT, nhưng trong các dòng còn lại, có thể chọn bất kỳ.\n   - Ưu: nắm bắt điểm quan trọng nhất của LRU (cái vừa dùng có thể cần lại) với phần cứng đơn giản hơn nhiều.\n   - Nhược: không chính xác bằng LRU đầy đủ, nhưng thường đủ tốt."
    },
    31: {
      question: "So sánh chính sách ghi xuyên (write-through) và ghi lại (write-back). Dirty bit là gì?",
      answer: "Khi CPU ghi (sửa đổi) dữ liệu, cache cần chính sách để giữ RAM đồng bộ:\n\nGhi xuyên (write-through): mỗi lần ghi vào cache, cùng dữ liệu CŨNG được ghi vào RAM ngay lập tức.\n- Ưu: RAM luôn có dữ liệu mới nhất. Đơn giản và an toàn.\n- Nhược: chậm! Mỗi lần ghi phải đợi RAM chậm. Cache không giúp gì cho tốc độ ghi.\n\nGhi lại (write-back): ghi CHỈ cập nhật cache. RAM KHÔNG được cập nhật ngay.\n- Dòng cache đã sửa đổi được đánh cờ 'dirty bit' = 1, nghĩa là 'dòng này đã bị thay đổi và khác với RAM.'\n- RAM chỉ được cập nhật khi dòng bẩn cần bị loại bỏ (thay thế bằng dữ liệu mới). Lúc đó, dòng bẩn được 'ghi lại' RAM trước khi bị ghi đè.\n- Ưu: nhanh hơn nhiều! Hầu hết các lần ghi chỉ chạm cache nhanh.\n- Nhược: RAM có dữ liệu cũ (lỗi thời). Trong hệ thống đa bộ xử lý, gây ra vấn đề nhất quán cache. Thao tác DMA cũng cần xử lý đặc biệt."
    },
    32: {
      question: "Địa chỉ bộ nhớ được chia như thế nào cho việc tra cứu cache? Tính số bit địa chỉ cho cache 8KB 4-way với khối 64B và địa chỉ 32-bit.",
      answer: "Mỗi địa chỉ bộ nhớ được tách thành 3 phần cho tra cứu cache:\n\n[Thẻ (Tag) | Chỉ số (Index) | Offset]\n\nOffset (bit ngoài cùng bên phải): byte NÀO trong khối bạn muốn?\n- Nếu khối 64 byte, cần log2(64) = 6 bit để đánh địa chỉ bất kỳ byte nào.\n\nChỉ số (bit giữa): TẬP nào trong cache mà địa chỉ này ánh xạ vào?\n- Trước tiên tính số tập: kích_thước_cache / (kích_thước_khối x số_way)\n- Rồi bit chỉ số = log2(số_tập)\n\nThẻ (bit ngoài cùng bên trái): các bit còn lại. Lưu trong cache để xác định duy nhất khối bộ nhớ nào dòng cache này giữ.\n\nTính cho cache 8KB 4-way, khối 64B, địa chỉ 32-bit:\n1. Offset = log2(64) = 6 bit\n2. Số tập = 8192 byte / (64 byte x 4 way) = 32 tập\n3. Chỉ số = log2(32) = 5 bit\n4. Thẻ = 32 - 5 - 6 = 21 bit\n\nKết quả: [thẻ 21-bit | chỉ số 5-bit | offset 6-bit]\n\nĐể tra cứu: dùng chỉ số tìm tập, rồi so thẻ với cả 4 dòng trong tập. Nếu thẻ khớp và bit hợp lệ được đặt, đó là trúng!"
    },
    33: {
      question: "Mô tả phân cấp cache trong bộ xử lý đa nhân hiện đại.",
      answer: "Bộ xử lý hiện đại có nhiều mức cache, giống một loạt kho hàng ngày càng lớn hơn càng xa nhà máy:\n\nCache L1 (Mức 1) — gần nhất với lõi:\n- Nhanh nhất: ~1-2 chu kỳ đồng hồ để truy cập\n- Nhỏ nhất: thường 32-64 KB mỗi lõi\n- Chia thành hai phần: L1i (cache lệnh) và L1d (cache dữ liệu)\n- Mỗi lõi có L1 RIÊNG\n\nCache L2 (Mức 2):\n- Chậm hơn: ~5-10 chu kỳ đồng hồ\n- Lớn hơn: thường 256 KB - 1 MB mỗi lõi\n- Hợp nhất (chứa cả lệnh và dữ liệu)\n- Thường riêng cho mỗi lõi\n\nCache L3 (Mức 3):\n- Mức cache chậm nhất: ~20-40 chu kỳ đồng hồ\n- Lớn nhất: vài MB đến hàng chục MB\n- CHIA SẺ giữa tất cả lõi trên cùng chip xử lý\n- Khi một lõi nạp dữ liệu vào L3, lõi khác có thể tìm thấy nó ở đó\n\nĐể so sánh, truy cập RAM chính mất ~100+ chu kỳ — chậm hơn nhiều bất kỳ mức cache nào.\n\nPhân cấp hoạt động nhờ cục bộ: hầu hết truy cập trúng L1, một số trượt đến L2, ít hơn đến L3, và rất ít đi đến RAM."
    },
    34: {
      question: "Nhất quán cache (cache coherence) là gì? Giải thích các trạng thái và chuyển đổi giao thức MESI.",
      answer: "Vấn đề nhất quán cache: trong bộ xử lý đa nhân, mỗi lõi có cache L1/L2 riêng. Nếu hai lõi cache cùng địa chỉ bộ nhớ và một lõi sửa đổi nó, bản sao của lõi kia trở nên cũ (lỗi thời). Ta cần giao thức để giữ chúng nhất quán.\n\nMESI là giải pháp phổ biến nhất. Mỗi dòng cache có một trong 4 trạng thái:\n\nM = Đã Sửa Đổi (Modified): 'Tôi là người DUY NHẤT có dữ liệu này, VÀ tôi đã thay đổi nó (bẩn).' RAM có bản sao lỗi thời. Nếu lõi khác muốn dữ liệu này, tôi phải chia sẻ bản cập nhật.\n\nE = Độc Quyền (Exclusive): 'Tôi là người DUY NHẤT có dữ liệu này, nhưng tôi CHƯA thay đổi nó (sạch).' Khớp với RAM. Tôi có thể ghi tự do (chỉ đổi trạng thái sang M) mà không cần nói ai.\n\nS = Chia Sẻ (Shared): 'Nhiều lõi có bản sao dữ liệu này, và không ai thay đổi (tất cả sạch).' Nếu tôi muốn ghi, tôi phải nói TẤT CẢ lõi khác vô hiệu hóa bản sao.\n\nI = Không Hợp Lệ (Invalid): 'Tôi không có bản sao hợp lệ.' Nếu cần, phải lấy từ cache khác hoặc RAM.\n\nChuyển đổi chính:\n- Lõi đọc, không ai khác có → E\n- Lõi đọc, lõi khác đã có → S cho cả hai\n- Lõi ghi vào dòng E hoặc S → M, các lõi khác thành I\n- Lõi khác đọc dòng M của tôi → tôi ghi lại RAM, cả hai thành S"
    },
    35: {
      question: "Cache ảnh hưởng đến lập trình như thế nào? Tại sao duyệt ma trận theo hàng nhanh hơn theo cột trong C?",
      answer: "Cache ảnh hưởng đến cách bạn nên viết code, đặc biệt với mảng và ma trận.\n\nTrong C, mảng 2D như int a[100][100] được lưu THEO HÀNG trong bộ nhớ:\na[0][0], a[0][1], a[0][2], ... a[0][99], a[1][0], a[1][1], ...\n\nDuyệt theo hàng (NHANH — thân thiện cache):\nfor(i=0; i<100; i++)\n  for(j=0; j<100; j++)\n    sum += a[i][j];\nTruy cập bộ nhớ tuần tự. Khi cache nạp một khối (ví dụ 64 byte = 16 int), 15 truy cập tiếp đều trong cùng khối đó. Rất nhiều cache trúng!\n\nDuyệt theo cột (CHẬM — không thân thiện cache):\nfor(j=0; j<100; j++)\n  for(i=0; i<100; i++)\n    sum += a[i][j];\nNhảy 100 phần tử (400 byte) giữa mỗi truy cập. Mỗi truy cập có thể rơi vào khối cache KHÁC, gây trượt cache gần như mỗi lần cho ma trận lớn.\n\nNgoài ra: nếu toàn bộ dữ liệu nằm vừa trong cache, chương trình chạy nhanh hơn nhiều. Khi dữ liệu vượt quá kích thước cache, hiệu suất giảm rõ rệt."
    },
    36: {
      question: "Đi qua lưu đồ đọc và ghi cache cho cache ghi lại (write-back).",
      answer: "Thao tác đọc (CPU muốn ĐỌC dữ liệu tại địa chỉ X):\n1. Kiểm tra: địa chỉ X có trong cache không? (So thẻ trong tập đúng)\n2. TRÚNG → Trả dữ liệu ngay lập tức. Xong!\n3. TRƯỢT → Cần nạp từ RAM, nhưng trước tiên tạo chỗ:\n   a. Chọn dòng cache để loại bỏ (dùng chính sách thay thế: ngẫu nhiên, LRU, v.v.)\n   b. Dòng được chọn có BẨN (đã sửa đổi) không? Nếu CÓ → ghi dữ liệu lại RAM trước (không thể mất thay đổi!). Nếu KHÔNG → ghi đè lên nó (RAM đã có cùng dữ liệu).\n   c. Nạp khối chứa địa chỉ X từ RAM vào dòng đã giải phóng. Đặt thẻ khớp X. Đặt dirty bit = 0. Đặt valid bit = 1.\n   d. Trả dữ liệu yêu cầu.\n\nThao tác ghi (CPU muốn GHI dữ liệu vào địa chỉ X):\n1. Kiểm tra: địa chỉ X có trong cache không?\n2. TRÚNG → Ghi giá trị mới vào khối cache. Đặt dirty bit = 1. Xong!\n3. TRƯỢT → Cùng quy trình loại bỏ như đọc trượt:\n   a. Chọn dòng, ghi lại nếu bẩn, nạp khối từ RAM.\n   b. RỒI ghi giá trị mới vào khối đã nạp. Đặt dirty bit = 1.\n\nDirty bit là chìa khóa hiệu quả write-back: nó cho cache trì hoãn ghi RAM cho đến khi thực sự cần thiết."
    },
    37: {
      question: "Thông lượng lý thuyết của pipeline 5 giai đoạn là gì? Độ trễ là gì?",
      answer: "Đây là hai phép đo khác nhau:\n\nĐộ trễ = MỘT lệnh mất bao lâu từ đầu đến cuối?\nTrả lời: 5 chu kỳ đồng hồ (phải đi qua cả 5 giai đoạn: IF, ID, EX, MEM, WB).\nPipeline KHÔNG thay đổi điều này.\n\nThông lượng = bao nhiêu lệnh hoàn thành mỗi chu kỳ?\nTrả lời: 1 lệnh mỗi chu kỳ (khi pipeline đã đầy, mỗi chu kỳ có một lệnh hoàn thành).\n\nĐiều kỳ diệu của pipeline là về thông lượng, không phải độ trễ:\n- Không có pipeline: 1 lệnh mỗi 5 chu kỳ = 0.2 lệnh/chu kỳ\n- Có pipeline: 1 lệnh mỗi 1 chu kỳ = 1.0 lệnh/chu kỳ\n- Tăng 5 lần thông lượng!\n\nVí dụ: mỗi xe mất 60 phút qua tiệm rửa xe (độ trễ = 60 phút). Nhưng nếu tiệm rửa có pipeline thành nhiều giai đoạn, cứ 12 phút lại có một xe sạch ra (thông lượng). Mỗi xe vẫn mất 60 phút bên trong, nhưng xe hoàn thành thường xuyên hơn."
    },
    38: {
      question: "Bong bóng pipeline là gì và khi nào nó xảy ra?",
      answer: "Bong bóng pipeline (còn gọi là tạm dừng/stall) là chu kỳ trống, lãng phí được chèn vào pipeline khi phát hiện xung đột.\n\nTưởng tượng dây chuyền lắp ráp mà một trạm đột nhiên nói 'tôi chưa xử lý được vật này — trạm trước chưa chuẩn bị xong!' Dây chuyền tạm dừng cho vật đó, tạo khoảng trống (bong bóng) chảy qua pipeline.\n\nKhi nào xảy ra: đơn vị điều khiển phát hiện xung đột sau giai đoạn IF và chèn lệnh NOP (Không Thao Tác) để trì hoãn lệnh phụ thuộc.\n\nVí dụ: ADD r1, r2, r3 (tính r1) tiếp theo SUB r4, r1, r5 (cần r1). Không có chuyển tiếp, SUB không thể thực thi cho đến khi ADD ghi r1 lại ở giai đoạn WB. Nên 2 chu kỳ bong bóng được chèn giữa chúng.\n\nBong bóng giảm thông lượng xuống dưới mức lý tưởng 1 lệnh/chu kỳ, nhưng pipeline vẫn nhanh hơn tổng thể so với không có pipeline."
    },
    39: {
      question: "Tại sao chúng ta cần cache? Tại sao không dùng RAM nhanh hơn?",
      answer: "Vấn đề: CPU có thể xử lý dữ liệu nhanh hơn RAM khoảng 10 lần. Nên CPU mất nhiều thời gian chỉ ĐỢI dữ liệu. Đây gọi là 'bức tường bộ nhớ.'\n\nGiải pháp hiển nhiên: dùng bộ nhớ nhanh hơn! Bộ nhớ nhanh có tồn tại — gọi là SRAM (RAM Tĩnh). Nó gần nhanh bằng CPU. Vậy tại sao không làm TẤT CẢ bộ nhớ bằng SRAM?\n\nLý do: giá thành. SRAM đắt hơn DRAM (RAM Động, loại thông thường) rất nhiều. Làm 16 GB SRAM sẽ tốn cả gia tài và tỏa quá nhiều nhiệt.\n\nGiải pháp thông minh: dùng lượng NHỎ SRAM (cache) và lượng LỚN DRAM rẻ (bộ nhớ chính). Nhờ nguyên lý cục bộ:\n- Cục bộ thời gian: bạn tiếp tục dùng lại cùng dữ liệu (vòng lặp, biến nóng)\n- Cục bộ không gian: bạn truy cập dữ liệu lân cận theo trình tự (mảng, code tuần tự)\n\n...một cache nhỏ có thể phục vụ trên 90% yêu cầu bộ nhớ! Chỉ ~10% truy cập còn lại (trượt cache) phải đến RAM chậm.\n\nNên cache là mẹo tiết kiệm: đạt gần tốc độ SRAM với gần giá DRAM."
    },
    40: {
      question: "Cho địa chỉ 13-bit, cache 128B, liên kết 4-way, khối 8B: tính độ rộng thẻ, chỉ số, và offset.",
      answer: "Giải từng bước:\n\nCho: địa chỉ 13-bit, cache 128 byte tổng, liên kết 4-way, khối 8 byte.\n\nBước 1 — Bit offset: bao nhiêu bit để đánh địa chỉ byte trong một khối?\nKích thước khối = 8 byte, nên offset = log2(8) = 3 bit\n(3 bit biểu diễn 0-7, đúng 8 vị trí)\n\nBước 2 — Cache có bao nhiêu tập?\ntập = kích_thước_cache / (kích_thước_khối x way) = 128 / (8 x 4) = 128 / 32 = 4 tập\n(Cache có 128/8 = 16 dòng tổng, nhóm thành 4 tập, mỗi tập 4 dòng)\n\nBước 3 — Bit chỉ số: bao nhiêu bit để chọn tập?\nchỉ số = log2(4) = 2 bit\n(2 bit biểu diễn 0-3, đúng 4 tập: tập 00, 01, 10, 11)\n\nBước 4 — Bit thẻ: phần còn lại\nthẻ = độ_rộng_địa_chỉ - chỉ_số - offset = 13 - 2 - 3 = 8 bit\n\nĐịnh dạng địa chỉ cuối: [thẻ 8-bit | chỉ số 2-bit | offset 3-bit]\n\nĐể tìm dữ liệu: dùng 2 bit chỉ số để đến tập đúng, rồi so thẻ 8-bit với cả 4 dòng trong tập. Nếu khớp với valid=1, đó là trúng."
    },
    41: {
      question: "Các cách 'cổ điển' (không song song) để cải thiện hiệu suất bộ xử lý là gì?",
      answer: "Trước kỷ nguyên song song, kỹ sư cải thiện hiệu suất bằng các cách sau:\n\n1. Tăng tần số đồng hồ — làm đồng hồ tích tắc nhanh hơn để lệnh hoàn thành sớm hơn. Nhưng bị giới hạn bởi nhiệt: đồng hồ nhanh hơn = nhiều nhiệt hơn. Có bức tường vật lý khoảng 4-5 GHz với công nghệ hiện tại.\n\n2. Bộ đồng xử lý FPU (Đơn Vị Dấu Phẩy Động) — chip (hoặc đơn vị) chuyên dụng cho toán dấu phẩy động. Ban đầu là chip riêng (như x87 của Intel), giờ tích hợp trong mọi CPU.\n\n3. DMA (Truy Cập Bộ Nhớ Trực Tiếp) — cho phép thiết bị truyền dữ liệu trực tiếp đến/từ RAM mà không phiền CPU. Trong khi DMA xử lý truyền file lớn, CPU rảnh làm việc khác.\n\n4. Kích thước từ lớn hơn — thanh ghi và bus dữ liệu rộng hơn: 8-bit → 16-bit → 32-bit → 64-bit. CPU 64-bit xử lý gấp đôi dữ liệu mỗi thao tác so với 32-bit.\n\n5. Cache — bộ nhớ trung gian nhanh lưu dữ liệu dùng gần đây.\n\n6. Hệ thống bus nhanh hơn — kết nối băng thông cao hơn giữa CPU, bộ nhớ, và thiết bị."
    },
    42: {
      question: "Số học bão hòa (saturation arithmetic) là gì và tại sao dùng trong xử lý vector?",
      answer: "Số học bão hòa là cách xử lý tràn đặc biệt dùng trong xử lý vector (SIMD).\n\nTràn số nguyên bình thường: khi kết quả quá lớn, nó 'quấn vòng.' Với số 8-bit có dấu (phạm vi -128 đến 127): 119 + 59 = 178, nhưng 178 không vừa, nên quấn thành -78. Thường sai và bất ngờ!\n\nSố học bão hòa: thay vì quấn, kết quả được 'kẹp' ở giá trị tối đa (hoặc tối thiểu). Nên 119 + 59 = 127 (max cho 8-bit có dấu). Không thể cao hơn, nó chỉ 'bão hòa' ở giới hạn.\n\nTại sao cần cho SIMD:\nTrong số học bình thường, CPU có thanh ghi trạng thái với cờ OF (Cờ Tràn) cho biết tràn xảy ra. Nhưng trong SIMD, một thanh ghi chứa NHIỀU giá trị (ví dụ 4 số gom vào 32 bit). Chỉ có MỘT cờ tràn, không phải một cho mỗi phần tử — nên bạn không biết phần tử NÀO bị tràn.\n\nBão hòa giải quyết điều này. Nó cũng hữu ích hơn cho ứng dụng thực:\n- Xử lý ảnh: độ sáng pixel nên tối đa ở 255, không quấn về 0\n- Xử lý âm thanh: âm lượng nên cắt ở mức tối đa, không đột ngột rất nhỏ"
    },
    43: {
      question: "Sự khác biệt giữa nhất quán cache dựa trên vô hiệu hóa và dựa trên cập nhật là gì?",
      answer: "Trong hệ thống đa nhân, khi một lõi ghi vào vị trí bộ nhớ đã được cache mà các lõi khác cũng có bản sao, làm sao giữ mọi người nhất quán? Hai cách:\n\nDựa trên vô hiệu hóa (dùng bởi giao thức MESI, phổ biến hơn):\nKhi lõi A ghi vào dòng cache chia sẻ, nó gửi thông điệp đến TẤT CẢ lõi khác: 'bỏ (vô hiệu hóa) bản sao dữ liệu này đi!' Các lõi khác đánh dấu bản sao là Invalid. Khi cần dữ liệu lại sau này, phải lấy phiên bản cập nhật.\n- Ưu: ít lưu lượng bus nếu người ghi sửa đổi dữ liệu nhiều lần trước khi ai khác đọc (chỉ một thông điệp vô hiệu hóa, không phải nhiều thông điệp cập nhật).\n- Nhược: lõi khác bị trượt cache khi cần dữ liệu lần tiếp.\n\nDựa trên cập nhật:\nKhi lõi A ghi vào dòng cache chia sẻ, nó phát sóng giá trị mới đến TẤT CẢ lõi khác có bản sao. Cache của họ được cập nhật ngay lập tức.\n- Ưu: lõi khác luôn có dữ liệu mới nhất, không bị trượt khi đọc tiếp.\n- Nhược: tạo NHIỀU lưu lượng bus, đặc biệt nếu dữ liệu được ghi nhiều lần nhưng hiếm khi được lõi khác đọc.\n\nTrong thực tế, dựa trên vô hiệu hóa phổ biến hơn vì hầu hết dữ liệu được ghi hiếm khi được lõi khác đọc."
    }
  },

  flashcards: {
    1: { front: "CISC vs RISC", back: "CISC (Máy Tính Tập Lệnh Phức Tạp):\n- Nhiều lệnh mạnh, mỗi lệnh làm việc phức tạp\n- Lệnh có độ dài thay đổi\n- Mỗi lệnh có thể mất nhiều chu kỳ\n- Dùng vi mã (chương trình nội bộ nhỏ)\n- Ít thanh ghi; lệnh có thể làm việc trực tiếp với RAM\n- Ví dụ: x86 (Intel, AMD)\n\nRISC (Máy Tính Tập Lệnh Thu Gọn):\n- Ít lệnh đơn giản, mỗi lệnh làm một việc nhỏ\n- Lệnh có độ dài cố định (dễ giải mã)\n- Mỗi lệnh lý tưởng hoàn thành trong một chu kỳ\n- Thường điều khiển cứng (nhanh hơn, không vi mã)\n- Nhiều thanh ghi; chỉ LOAD/STORE chạm RAM\n- Ví dụ: ARM, MIPS" },
    2: { front: "CPU vs GPU", back: "CPU:\n- Vài lõi mạnh (thường 4-16)\n- Độ trễ thấp: hoàn thành MỘT việc nhanh\n- Pipeline nông (dưới 30 giai đoạn)\n- Cache lớn, dự đoán nhánh thông minh\n- Tốt cho: tác vụ tuần tự, code nhiều quyết định, HĐH\n\nGPU:\n- Hàng nghìn lõi đơn giản\n- Thông lượng cao: hoàn thành NHIỀU việc cùng lúc\n- Pipeline sâu (trên 100 giai đoạn)\n- Quản lý luồng bằng phần cứng, băng thông bộ nhớ khổng lồ\n- Tốt cho: đồ họa, toán ma trận, AI, bất kỳ tác vụ song song ồ ạt nào" },
    3: { front: "Ghi xuyên vs Ghi lại cache", back: "Ghi xuyên (Write-through):\n- Mỗi lần ghi đi đến CẢ cache VÀ RAM cùng lúc\n- RAM luôn có dữ liệu mới nhất (nhất quán)\n- Chậm: ghi bị giới hạn bởi tốc độ RAM\n- Không cần dirty bit\n\nGhi lại (Write-back):\n- Ghi CHỈ cập nhật cache; RAM cập nhật sau\n- 'Dirty bit' đánh dấu dòng đã bị sửa đổi\n- Nhanh: hầu hết ghi chỉ chạm cache\n- Dòng bẩn phải ghi lại RAM trước khi bị loại\n- Gây thách thức nhất quán cache trong hệ đa nhân" },
    4: { front: "VLIW vs Siêu vô hướng", back: "VLIW (Từ Lệnh Rất Dài):\n- TRÌNH BIÊN DỊCH quyết định lệnh nào chạy song song\n- Gom vào 'gói' rộng lúc biên dịch\n- Phần cứng đơn giản (không cần logic lập lịch phức tạp)\n- Chương trình KHÔNG di động giữa các chip VLIW khác\n- Vị trí trống điền bằng NOP, lãng phí bộ nhớ\n\nSiêu vô hướng:\n- PHẦN CỨNG tìm song song lúc chạy\n- Dùng cửa sổ lệnh + OoOE\n- Phần cứng phức tạp (lập lịch động, đổi tên)\n- Chương trình DI ĐỘNG — code nào cũng chạy\n- Không lãng phí NOP" },
    5: { front: "Ánh xạ trực tiếp vs Liên kết đầy đủ vs Liên kết tập", back: "Ánh xạ trực tiếp (1-way):\n- Mỗi địa chỉ chỉ vào 1 dòng cache cụ thể\n- Tìm nhanh (kiểm tra 1 dòng) nhưng nhiều trượt xung đột\n\nLiên kết đầy đủ:\n- Bất kỳ địa chỉ nào vào BẤT KỲ dòng nào\n- Tỷ lệ trúng tốt nhất nhưng đắt (phải kiểm tra TẤT CẢ thẻ)\n\nLiên kết tập N-way (thỏa hiệp thực tế):\n- Cache chia thành tập; mỗi tập có N dòng\n- Địa chỉ ánh xạ vào 1 tập, có thể dùng bất kỳ N dòng nào\n- Ánh xạ trực tiếp = 1-way, Liên kết đầy đủ = tất-cả-dòng-way\n- CPU thực dùng phổ biến 4-way hoặc 8-way" },
    6: { front: "Cục bộ không gian vs Cục bộ thời gian", back: "Cục bộ không gian ('dữ liệu lân cận sẽ được dùng sớm'):\n- Chương trình thực thi lệnh tuần tự\n- Mảng lưu phần tử cạnh nhau trong bộ nhớ\n- Vì vậy cache nạp cả KHỐI (ví dụ 64 byte), không phải từng byte\n\nCục bộ thời gian ('cùng dữ liệu sẽ được dùng lại'):\n- Vòng lặp dùng lại cùng lệnh và biến\n- Biến truy cập thường xuyên luôn 'nóng'\n- Vì vậy cache GIỮ dữ liệu dùng gần đây thay vì bỏ đi\n\nCả hai là lý do cache hoạt động: cho phép dự đoán CPU cần dữ liệu gì tiếp." },
    7: { front: "Dự đoán rẽ nhánh tĩnh vs động", back: "Tĩnh (quy tắc cố định đơn giản, không học):\n- Nhảy lùi (vòng lặp) → dự đoán THỰC HIỆN\n- Nhảy tiến → dự đoán KHÔNG thực hiện\n- Không lịch sử, không thích ứng\n\nĐộng (học từ hành vi quá khứ):\n- Lưu lịch sử trong BTB (Bộ Đệm Đích Rẽ Nhánh)\n- 1-bit: nhớ kết quả lần trước, đổi sau mỗi sai\n  Vấn đề: luôn sai hai lần ở ranh giới vòng lặp\n- 2-bit: 4 trạng thái (Mạnh/Yếu Thực Hiện/Không Thực Hiện)\n  Cần HAI lần sai liên tiếp mới đổi hướng\n  Xử lý thoát vòng lặp tốt hơn nhiều" },
    8: { front: "Bong bóng pipeline vs Chuyển tiếp kết quả", back: "Bong bóng pipeline (tạm dừng):\n- Chèn chu kỳ NOP trống để đợi dữ liệu\n- Đơn giản nhưng lãng phí thời gian\n- Ví dụ: tạm dừng 2 chu kỳ cho xung đột RAW\n\nChuyển tiếp kết quả (bypassing):\n- Đường dây tắt phần cứng\n- Gửi kết quả từ đầu ra giai đoạn EX trực tiếp đến đầu vào EX lệnh tiếp\n- Bỏ qua đợi giai đoạn WB\n- Loại bỏ hoàn toàn tạm dừng trong hầu hết trường hợp\n- Phần cứng phức tạp hơn nhưng nhanh hơn nhiều" },
    9: { front: "Siêu phân luồng (SMT) vs Đa nhân", back: "Siêu phân luồng / SMT:\n- 1 lõi vật lý giả vờ là 2 'lõi logic'\n- Có 2 bộ thanh ghi nhưng CHIA SẺ đơn vị thực thi\n- Khi luồng A tạm dừng, luồng B dùng phần cứng rảnh\n- Rẻ (hầu như không tăng diện tích chip)\n- Tăng tốc vừa phải (~15-30%)\n\nĐa nhân:\n- Nhiều lõi THẬT độc lập\n- Mỗi lõi có đơn vị thực thi, thanh ghi, cache L1 RIÊNG\n- Các lõi thực sự chạy song song cùng lúc\n- Tốn diện tích chip và điện hơn\n- Tăng tốc lớn hơn nhiều (gần Nx với N lõi cho tác vụ song song)" },
    10: { front: "Nhất quán cache: Vô hiệu hóa vs Cập nhật", back: "Dựa trên vô hiệu hóa (ví dụ giao thức MESI):\n- Khi lõi A ghi, nó nói lõi khác: 'bản sao của bạn không hợp lệ nữa, bỏ đi'\n- Lõi khác bị trượt cache lần truy cập tiếp và phải lấy lại\n- Ít lưu lượng bus (một thông điệp 'vô hiệu', dù A ghi nhiều lần)\n- Phổ biến hơn trong thực tế\n\nDựa trên cập nhật:\n- Khi lõi A ghi, nó phát sóng giá trị mới đến TẤT CẢ cache khác\n- Cache khác được cập nhật ngay, không trượt lần truy cập tiếp\n- NHIỀU lưu lượng bus hơn (mỗi lần ghi = một phát sóng)\n- Chỉ tốt hơn khi dữ liệu ghi một lần, đọc bởi nhiều" },
    11: { front: "Pipeline", back: "Kỹ thuật chồng chéo nhiều lệnh ở các giai đoạn thực thi khác nhau, như dây chuyền lắp ráp.\n\n5 giai đoạn: IF (Nạp Lệnh), ID (Giải Mã), EX (Thực Thi), MEM (Truy Cập Bộ Nhớ), WB (Ghi Lại).\n\nKHÔNG làm một lệnh nhanh hơn (vẫn 5 chu kỳ). Nhưng tăng thông lượng: sau khi đầy, 1 lệnh hoàn thành mỗi chu kỳ thay vì mỗi 5 chu kỳ." },
    12: { front: "Xung đột RAW (Đọc Sau Ghi)", back: "Xung đột pipeline phổ biến nhất. Là 'phụ thuộc dữ liệu thực.'\n\nLệnh B cần ĐỌC giá trị mà lệnh A chưa GHI xong.\n\nVí dụ:\n  ADD r1, r2, r3   (ghi vào r1)\n  SUB r4, r1, r5   (cần đọc r1, nhưng ADD chưa xong!)\n\nGiải pháp: bong bóng pipeline (đợi), chuyển tiếp kết quả (tắt dữ liệu), hoặc OoOE (làm việc khác trong khi đợi)." },
    13: { front: "OoOE (Thực Thi Không Theo Thứ Tự)", back: "CPU thực thi lệnh không theo thứ tự chương trình, mà dựa trên lệnh nào có dữ liệu sẵn sàng trước.\n\nGiống bếp nhà hàng: đầu bếp nấu món nào có nguyên liệu sẵn, không nhất thiết theo thứ tự đặt.\n\nQuy tắc chính: dù thực thi không theo thứ tự, kết quả được COMMIT (lưu) theo thứ tự chương trình gốc để đảm bảo đúng đắn.\n\nMục đích: tránh bong bóng pipeline bằng cách giữ đơn vị thực thi luôn bận." },
    14: { front: "Đổi tên thanh ghi", back: "Kỹ thuật loại bỏ phụ thuộc giả (WAR, WAW).\n\nVấn đề: chương trình có ít tên thanh ghi (ví dụ r0-r7), nên các lệnh không liên quan vô tình 'xung đột' khi dùng cùng tên thanh ghi.\n\nGiải pháp: CPU có NHIỀU thanh ghi vật lý hơn lập trình viên thấy. Mạch ánh xạ gán mỗi lần dùng thanh ghi đến thanh ghi vật lý khác, loại bỏ xung đột.\n\nGiống cho mỗi công nhân bàn riêng thay vì chia sẻ." },
    15: { front: "Cache trúng vs Cache trượt", back: "Cache trúng: CPU yêu cầu dữ liệu, và nó CÓ trong cache. Dữ liệu trả về nhanh từ SRAM. Đây là trường hợp tốt (~90%+ thời gian).\n\nCache trượt: dữ liệu KHÔNG có trong cache. Cache phải lấy từ bộ nhớ chính chậm (DRAM), lưu vào dòng cache, rồi trả. Chậm hơn nhiều.\n\nTỷ lệ trúng = phần trăm truy cập là trúng. Cao hơn là tốt hơn. Bị ảnh hưởng bởi kích thước cache, liên kết, kích thước khối, và hành vi chương trình." },
    16: { front: "Dirty bit", back: "Một cờ đơn (0 hoặc 1) gắn với mỗi dòng cache trong cache ghi lại.\n\n0 = 'sạch' — dòng cache CHƯA bị sửa đổi. Khớp với RAM. An toàn để loại bỏ mà không cần lưu.\n\n1 = 'bẩn' — dòng cache ĐÃ bị sửa đổi. RAM có dữ liệu lỗi thời. Trước khi loại dòng này, bạn PHẢI ghi lại RAM trước, nếu không thay đổi sẽ mất.\n\nChỉ tồn tại trong cache ghi lại. Cache ghi xuyên không cần vì chúng luôn cập nhật RAM ngay." },
    17: { front: "Giao thức MESI", back: "Giao thức nhất quán cache giữ dữ liệu nhất quán giữa các cache của nhiều lõi. Mỗi dòng cache có 1 trong 4 trạng thái:\n\nM (Đã Sửa Đổi): Tôi có bản duy nhất VÀ tôi đã thay đổi. RAM lỗi thời.\nE (Độc Quyền): Tôi có bản duy nhất nhưng chưa thay đổi. Khớp RAM.\nS (Chia Sẻ): Nhiều lõi có bản sao giống nhau, sạch.\nI (Không Hợp Lệ): Tôi không có bản sao hợp lệ.\n\nDựa trên vô hiệu hóa: khi một lõi ghi, bản sao của lõi khác thành Invalid." },
    18: { front: "Phân loại Flynn", back: "Hệ thống phân loại kiến trúc máy tính dựa trên luồng lệnh và dữ liệu:\n\nSISD (Đơn Lệnh, Đơn Dữ Liệu): một thao tác trên một dữ liệu tại một thời điểm. CPU tuần tự cổ điển.\n\nSIMD (Đơn Lệnh, Đa Dữ Liệu): một thao tác trên NHIỀU dữ liệu cùng lúc. Bộ xử lý vector, GPU.\n\nMISD (Đa Lệnh, Đơn Dữ Liệu): nhiều thao tác trên cùng dữ liệu. Hiếm (hệ thống chịu lỗi).\n\nMIMD (Đa Lệnh, Đa Dữ Liệu): song song hoàn toàn. Bộ xử lý đa nhân." },
    19: { front: "FPGA", back: "Chip chứa mạch logic lập trình được có thể cấu hình lại sau sản xuất.\n\nKhác CPU (chạy lệnh tuần tự), mạch FPGA đều hoạt động song song tự nhiên.\n\nLập trình bằng ngôn ngữ mô tả phần cứng: VHDL hoặc Verilog.\n\nCó thể tạo bộ tăng tốc tùy chỉnh cho tác vụ cụ thể (thường nhanh hơn CPU). Thậm chí có thể xây toàn bộ thiết kế bộ xử lý bên trong (gọi là 'bộ xử lý mềm').\n\nMột số chip hiện đại tích hợp FPGA cạnh CPU thông thường." },
    20: { front: "NUMA", back: "Kiến trúc bộ nhớ cho hệ đa bộ xử lý, mỗi bộ xử lý có bộ nhớ CỤC BỘ riêng.\n\nBộ xử lý CÓ THỂ truy cập bộ nhớ của bộ xử lý khác qua mạng liên kết, nhưng CHẬM hơn truy cập bộ nhớ cục bộ.\n\n'Không đồng nhất' = thời gian truy cập PHỤ THUỘC vào vị trí bộ nhớ.\n\nƯu điểm: nhiều bộ xử lý đọc/ghi bộ nhớ cục bộ đồng thời mà không bị nghẽn cổ chai.\n\nDùng trong máy chủ và hệ thống cụm." },
    21: { front: "BTB (Bộ Đệm Đích Rẽ Nhánh)", back: "Bảng phần cứng nhỏ bên trong CPU lưu lịch sử các lệnh rẽ nhánh gần đây.\n\nVới mỗi nhánh, nó ghi: địa chỉ nhánh, địa chỉ đích (nhảy đến đâu), và gần đây có thực hiện hay không.\n\nDùng bởi dự đoán rẽ nhánh động để đoán có cơ sở nhánh sẽ đi đường nào lần tới.\n\nBTB lớn hơn = nhớ được nhiều nhánh hơn = dự đoán chính xác hơn." },
    22: { front: "Cửa sổ lệnh", back: "Tập hợp các lệnh sắp tới mà bộ xử lý siêu vô hướng có thể 'nhìn thấy' và phân tích cùng lúc.\n\nCPU quét cửa sổ này để tìm lệnh độc lập có thể thực thi song song trên các đơn vị thực thi khác nhau.\n\nCửa sổ lớn hơn = nhiều lệnh để chọn = tìm nhiều song song hơn = hiệu suất tốt hơn.\n\nBị giới hạn bởi độ phức tạp phần cứng: cửa sổ lớn hơn cần nhiều mạch so sánh hơn." },
    23: { front: "Bộ xử lý siêu vô hướng", back: "Bộ xử lý có thể hoàn thành NHIỀU HƠN một lệnh mỗi chu kỳ đồng hồ.\n\nCó nhiều đơn vị thực thi (nhiều ALU, FPU, v.v.) chạy song song.\n\nPhần cứng tự động tìm lệnh độc lập và gửi chúng đến các đơn vị thực thi khác nhau đồng thời.\n\nGiống nhiều dây chuyền lắp ráp trong một nhà máy, so với pipeline chỉ là một dây chuyền." },
    24: { front: "GPGPU (GPU Đa Năng)", back: "Dùng GPU cho tác vụ KHÁC ngoài đồ họa.\n\nGPU có hàng nghìn lõi tối ưu cho toán song song. Rất tốt cho:\n- Mô phỏng khoa học\n- Huấn luyện AI / học máy\n- Đào tiền mã hóa\n- Mã hóa video\n\nLập trình bằng:\n- CUDA (ngôn ngữ độc quyền NVIDIA)\n- OpenCL (tiêu chuẩn mở, chạy trên mọi GPU)\n- MATLAB\n\nCPU gửi công việc song song cho GPU, GPU xử lý và trả kết quả." },
    25: { front: "Mở vòng lặp (Loop unrolling)", back: "Tối ưu hóa sao chép thân vòng lặp nhiều lần trong mỗi lần lặp.\n\nGốc: xử lý 1 phần tử mỗi lần lặp, 100 lần lặp\nMở x4: xử lý 4 phần tử mỗi lần lặp, 25 lần lặp\n\nLợi ích:\n1. Ít chi phí vòng lặp (ít so sánh và nhảy hơn)\n2. Nhiều lệnh độc lập hơn để siêu vô hướng/OoOE khai thác\n3. Dễ hơn cho trình biên dịch dùng lệnh SIMD (vector)\n4. Tốt hơn cho VLIW để điền vị trí gói" },
    26: { front: "Phương trình hiệu suất", back: "T = NI x eCPI x 1/f\n\nT = tổng thời gian thực thi (giây)\nNI = Số Lệnh chương trình thực thi (đếm cả vòng lặp)\neCPI = Số Chu Kỳ Trung Bình Mỗi Lệnh\nf = tần số đồng hồ Hz (nhịp mỗi giây)\n\nĐể chương trình nhanh hơn:\n- Giảm NI: thuật toán tốt hơn, trình biên dịch thông minh hơn\n- Giảm eCPI: pipeline tốt hơn, siêu vô hướng, cache\n- Tăng f: phần cứng nhanh hơn (bị giới hạn bởi nhiệt)" },
    27: { front: "Định luật Amdahl", back: "S(N) = 1 / (A + (1-A)/N)\n\nS = tăng tốc (nhanh hơn bao nhiêu lần)\nN = số bộ xử lý\nA = tỷ lệ tuần tự (phần không thể song song, 0 đến 1)\n\nTăng tốc tối đa với vô hạn bộ xử lý = 1/A\n\nVí dụ: A=0.2, N=8 → S = 1/(0.2 + 0.8/8) = 1/0.3 = 3.33 lần\nVới vô hạn bộ xử lý: S = 1/0.2 = 5 lần tối đa\n\nBài học: dù phần tuần tự nhỏ cũng giới hạn nghiêm trọng lợi ích song song." },
    28: { front: "Phân tách địa chỉ cache", back: "Địa chỉ = [Thẻ | Chỉ số | Offset]\n\nOffset = log2(kích_thước_khối) bit\n  Byte nào trong khối\n\nChỉ số = log2(số_tập) bit\n  Tập nào trong cache\n  số_tập = kích_thước_cache / (kích_thước_khối x liên_kết)\n\nThẻ = độ_rộng_địa_chỉ - chỉ_số - offset bit\n  Lưu trong cache để xác định địa chỉ nguồn\n\nVí dụ: 32-bit, 8KB 4-way, khối 64B\nOffset=6, Tập=8192/(64x4)=32, Chỉ số=5, Thẻ=21" },
    29: { front: "Số tập cache", back: "số_tập = kích_thước_cache / (kích_thước_khối x liên_kết)\n\nÁnh xạ trực tiếp: liên_kết = 1 (nhiều tập nhất, nhiều bit chỉ số nhất)\nN-way: liên_kết = N\nLiên kết đầy đủ: liên_kết = tổng_dòng (1 tập, 0 bit chỉ số)\n\nTổng dòng trong cache = kích_thước_cache / kích_thước_khối\n\nVí dụ: cache 16KB, khối 64B, 4-way\nTổng dòng = 16384/64 = 256\nTập = 256/4 = 64 tập" },
    30: { front: "Tăng tốc pipeline (lý tưởng)", back: "Tăng tốc lý tưởng = N (số giai đoạn pipeline)\n\nThông lượng = 1 lệnh hoàn thành mỗi chu kỳ\nĐộ trễ mỗi lệnh = N chu kỳ (không đổi)\n\nKhông pipeline: 1 lệnh mỗi N chu kỳ\nCó pipeline: 1 lệnh mỗi 1 chu kỳ (sau khi đầy)\n\nTăng tốc thực tế THẤP hơn N vì:\n- Xung đột gây bong bóng/tạm dừng\n- Thời gian thực thi các giai đoạn không đều\n- Dự đoán nhánh sai" }
  },

  concepts: {
    1: {
      title: "Các Mức Độ Song Song",
      explanation: "Song song nghĩa là làm nhiều việc cùng lúc. Trong máy tính, điều này xảy ra ở nhiều quy mô khác nhau, từ thao tác phần cứng nhỏ đến toàn bộ chương trình chạy song song.",
      keyPoints: [
        "Mức bit: tất cả bit của một số được xử lý cùng lúc (phép cộng 32-bit xử lý cả 32 bit đồng thời)",
        "Mức dữ liệu (DLP / SIMD): một lệnh xử lý nhiều dữ liệu cùng lúc",
        "Mức lệnh (ILP): nhiều lệnh chồng chéo trong pipeline",
        "Mức tác vụ/luồng (TLP): các luồng riêng chạy trên các lõi khác nhau",
        "Mức tiến trình: HĐH chạy nhiều chương trình đồng thời"
      ]
    },
    2: {
      title: "Phân Loại Flynn",
      explanation: "Phân loại 2x2 đơn giản cho kiến trúc máy tính. Hỏi hai câu: bao nhiêu luồng lệnh? Bao nhiêu luồng dữ liệu? Cho ra 4 loại.",
      keyPoints: [
        "SISD (Đơn Lệnh, Đơn Dữ Liệu): bộ xử lý tuần tự cổ điển — một việc tại một thời điểm",
        "SIMD (Đơn Lệnh, Đa Dữ Liệu): một lệnh, nhiều dữ liệu — bộ xử lý vector, GPU",
        "MISD (Đa Lệnh, Đơn Dữ Liệu): nhiều thao tác trên cùng dữ liệu — rất hiếm (chịu lỗi)",
        "MIMD (Đa Lệnh, Đa Dữ Liệu): song song hoàn toàn — bộ xử lý đa nhân"
      ]
    },
    3: {
      title: "Pipeline RISC 5 Giai Đoạn",
      explanation: "Giống dây chuyền lắp ráp nhà máy: mỗi lệnh đi qua 5 trạm. Trong khi lệnh 1 ở trạm 3, lệnh 2 ở trạm 2, và lệnh 3 ở trạm 1. Nhiều lệnh 'đang bay' đồng thời.",
      keyPoints: [
        "IF (Nạp Lệnh): đọc lệnh tiếp theo từ bộ nhớ",
        "ID (Giải Mã): hiểu lệnh làm gì, dùng thanh ghi nào",
        "EX (Thực Thi): ALU thực hiện phép tính hoặc tính địa chỉ",
        "MEM (Truy Cập Bộ Nhớ): đọc/ghi RAM (chỉ cho lệnh load/store)",
        "WB (Ghi Lại): lưu kết quả vào thanh ghi đích",
        "Thông lượng: 1 lệnh/chu kỳ (lý tưởng) | Độ trễ: 5 chu kỳ mỗi lệnh"
      ]
    },
    4: {
      title: "Xung Đột Pipeline",
      explanation: "Xung đột là vấn đề phá vỡ dòng chảy trơn tru của pipeline. Lệnh tiếp theo không thể tiến hành vì có phụ thuộc hoặc xung đột.",
      keyPoints: [
        "Xung đột dữ liệu: hai lệnh cần cùng thanh ghi. RAW = phụ thuộc thực. WAR/WAW = phụ thuộc tên (giải được bằng đổi tên)",
        "Xung đột cấu trúc: hai lệnh cần cùng phần cứng cùng lúc (ví dụ cả hai cần cổng bộ nhớ)",
        "Xung đột điều khiển: lệnh rẽ nhánh — CPU không biết nạp lệnh nào tiếp theo",
        "Giải pháp: bong bóng (đợi), chuyển tiếp (tắt dữ liệu), OoOE (sắp lại), đổi tên (dùng thanh ghi vật lý khác), suy đoán (đoán nhánh)"
      ]
    },
    5: {
      title: "Giải Pháp Xung Đột",
      explanation: "Các kỹ thuật khác nhau để xử lý vấn đề pipeline, từ đơn giản (nhưng chậm) đến phức tạp (nhưng nhanh).",
      keyPoints: [
        "Bong bóng/Tạm dừng: tạm dừng pipeline bằng cách chèn chu kỳ NOP trống. Đơn giản nhưng lãng phí thời gian.",
        "Chuyển tiếp kết quả: nối đầu ra giai đoạn EX trực tiếp đến đầu vào EX lệnh tiếp. Bỏ qua giai đoạn WB. Loại bỏ hầu hết tạm dừng RAW.",
        "OoOE: sắp xếp lại lệnh để lấp khoảng trống bằng công việc hữu ích trong khi đợi.",
        "Đổi tên thanh ghi: dùng thanh ghi vật lý thêm để loại bỏ phụ thuộc giả WAR/WAW.",
        "Thực thi suy đoán: đoán nhánh nào và bắt đầu thực thi. Hủy nếu sai."
      ]
    },
    6: {
      title: "Dự Đoán Rẽ Nhánh",
      explanation: "Khi CPU gặp if/else hoặc cuối vòng lặp, nó phải đoán lệnh nào tiếp theo. Đoán tốt giữ pipeline đầy; đoán sai lãng phí nhiều chu kỳ.",
      keyPoints: [
        "Tĩnh: quy tắc cố định — nhảy lùi (vòng lặp) dự đoán thực hiện, nhảy tiến dự đoán không thực hiện",
        "Động 1-bit: nhớ kết quả lần trước, đổi sau mỗi đoán sai. Kém ở thoát vòng lặp.",
        "Động 2-bit: 4 trạng thái (Mạnh/Yếu Thực Hiện/Không Thực Hiện)",
        "2-bit cần 2 lần sai liên tiếp mới đổi hướng — xử lý thoát vòng lặp tốt",
        "Lịch sử lưu trong BTB (Bộ Đệm Đích Rẽ Nhánh) — bảng phần cứng theo dõi nhánh gần đây"
      ]
    },
    7: {
      title: "Bộ Xử Lý Siêu Vô Hướng",
      explanation: "Giống có nhiều dây chuyền lắp ráp trong một nhà máy. CPU có nhiều đơn vị thực thi và có thể hoàn thành nhiều hơn một lệnh mỗi chu kỳ.",
      keyPoints: [
        "Nhiều đơn vị thực thi: nhiều ALU, FPU, v.v.",
        "Phần cứng quét 'cửa sổ lệnh' để tìm lệnh độc lập",
        "Dùng ILP + OoOE + suy đoán",
        "Có thể đạt thông lượng > 1 lệnh mỗi chu kỳ",
        "Cửa sổ lệnh lớn hơn = nhiều cơ hội tìm song song hơn"
      ]
    },
    8: {
      title: "Bộ Xử Lý VLIW (Từ Lệnh Rất Dài)",
      explanation: "Thay vì phần cứng tìm song song (như siêu vô hướng), TRÌNH BIÊN DỊCH tìm trước và gom các thao tác song song vào một lệnh 'gói' rộng.",
      keyPoints: [
        "VLIW = Từ Lệnh Rất Dài",
        "Trình biên dịch (không phải phần cứng) quyết định cái gì chạy song song",
        "Mỗi 'gói' có nhiều vị trí, mỗi vị trí chạy trên đơn vị thực thi khác",
        "Vị trí trống điền bằng NOP — lãng phí bộ nhớ",
        "Ưu: phần cứng đơn giản, nhanh hơn. Nhược: chương trình không di động, code phình từ NOP",
        "Intel dùng ý tưởng này như EPIC cho Itanium"
      ]
    },
    9: {
      title: "Bộ Xử Lý Vector / SIMD",
      explanation: "Xử lý nhiều phần tử dữ liệu bằng một lệnh duy nhất dùng thanh ghi siêu rộng. Thay vì cộng từng cặp số, cộng 4 hoặc 8 hoặc 16 cặp cùng lúc.",
      keyPoints: [
        "SIMD = Đơn Lệnh, Đa Dữ Liệu",
        "MMX: thanh ghi 64-bit, chỉ số nguyên, DÙNG CHUNG với FPU = không thể dùng cả hai",
        "SSE: thanh ghi 128-bit RIÊNG, float (SSE2 thêm số nguyên)",
        "AVX: 256-bit. AVX-512: thanh ghi 512-bit",
        "ARM Neon: thanh ghi 128-bit cho di động/nhúng",
        "Số học bão hòa: kẹp ở max/min khi tràn thay vì quấn vòng"
      ]
    },
    10: {
      title: "Kiến Trúc GPU",
      explanation: "GPU là bộ xử lý song song ồ ạt với hàng nghìn lõi đơn giản. Hãy nghĩ CPU như vài công nhân giỏi, và GPU như đội quân công nhân cơ bản — tuyệt vời cho tác vụ có thể chia thành nhiều việc nhỏ giống nhau.",
      keyPoints: [
        "Hàng nghìn lõi đơn giản vs. vài lõi phức tạp của CPU",
        "Phần cứng quản lý luồng tự động (không cần HĐH lập lịch luồng)",
        "Pipeline sâu (>100 giai đoạn) tối ưu cho thông lượng, không phải độ trễ",
        "GPGPU: dùng GPU cho tác vụ phi đồ họa qua CUDA, OpenCL",
        "Cấu trúc NVIDIA: TPC > SM (Bộ Đa Xử Lý Luồng) > SP (Bộ Xử Lý Luồng)",
        "Mỗi SM có: SP (lõi tính), SFU (Đơn Vị Hàm Đặc Biệt cho sin/sqrt), bộ nhớ chia sẻ, tệp thanh ghi"
      ]
    },
    11: {
      title: "Hệ Thống Đa Nhân & Đa Bộ Xử Lý",
      explanation: "Dùng nhiều đơn vị xử lý để chạy tác vụ song song. Các loại khác nhau tùy thuộc vào số lõi, cùng loại hay không, và cách tổ chức bộ nhớ.",
      keyPoints: [
        "Đa nhân: vài lõi (2-16) trên một chip. Mỗi có cache L1/L2 riêng, chia sẻ L3. Dùng trong PC/điện thoại.",
        "Nhiều nhân: hàng trăm/nghìn lõi trên một chip. Dùng trong máy chủ, siêu máy tính, GPU.",
        "Đồng nhất: tất cả lõi giống nhau (đối xứng). Lõi nào cũng làm tác vụ nào tốt như nhau.",
        "Không đồng nhất: các loại lõi khác nhau. ARM big.LITTLE = lõi mạnh + tiết kiệm. CPU + GPU = chung + song song.",
        "SMT / Hyper-threading: 1 lõi vật lý giả vờ 2 lõi logic bằng chia sẻ đơn vị thực thi giữa luồng.",
        "Nhất quán cache là thách thức chính: dữ liệu chia sẻ phải nhất quán giữa các cache riêng."
      ]
    },
    12: {
      title: "Phân Tích Hiệu Suất",
      explanation: "Cách đo và dự đoán tốc độ bộ xử lý. Hai công cụ chính: phương trình hiệu suất (cho một bộ xử lý) và định luật Amdahl (cho nhiều bộ xử lý).",
      keyPoints: [
        "T = NI x eCPI x 1/f: thời gian thực thi = lệnh x chu-kỳ-mỗi-lệnh x 1/tần-số",
        "FLOPS: phép đo hiệu suất phổ biến cho tính toán khoa học",
        "Định luật Amdahl: S(N) = 1/(A + (1-A)/N) với A = tỷ lệ tuần tự, N = số bộ xử lý",
        "Tăng tốc tối đa với vô hạn bộ xử lý = 1/A (phần tuần tự là giới hạn cứng)",
        "Dù chỉ 10% code tuần tự cũng giới hạn tăng tốc tối đa ở 10 lần dù thêm bao nhiêu bộ xử lý"
      ]
    },
    13: {
      title: "Tại Sao Cache Tồn Tại",
      explanation: "CPU nhanh hơn RAM rất nhiều. Cache là bộ nhớ nhỏ, nhanh bắc cầu khoảng cách tốc độ này bằng cách giữ dữ liệu thường dùng gần CPU.",
      keyPoints: [
        "Vấn đề: CPU nhanh hơn RAM ~10 lần, nên mất nhiều thời gian đợi dữ liệu",
        "Bộ nhớ nhanh (SRAM) có nhưng quá đắt để dùng cho tất cả bộ nhớ",
        "Bộ nhớ rẻ (DRAM) lớn nhưng chậm",
        "Cache = SRAM nhỏ lưu dữ liệu dùng gần đây/thường xuyên",
        "Hoạt động nhờ cục bộ: chương trình dùng lại cùng dữ liệu (thời gian) và truy cập dữ liệu lân cận (không gian)",
        "Tỷ lệ trúng thường >90%: 9/10 truy cập phục vụ từ cache nhanh"
      ]
    },
    14: {
      title: "Cấu Trúc Cache",
      explanation: "Cache được tổ chức thành 'dòng' (cũng gọi là khối). Mỗi dòng lưu một đoạn dữ liệu từ RAM cùng nhãn (thẻ) cho biết nó đến từ đâu và cờ trạng thái.",
      keyPoints: [
        "Dòng = Thẻ + Cờ + Khối Dữ Liệu",
        "Thẻ: xác định dòng này tương ứng địa chỉ RAM nào (như nhãn trên hộp)",
        "Cờ: bit Hợp lệ (dữ liệu có thực?), bit Bẩn (đã sửa đổi?), bit Gần đây (cho thay thế)",
        "Khối: bản sao đoạn bộ nhớ liên tiếp từ RAM (thường 64 byte)",
        "Mức cache: L1 (nhanh nhất, ~32-64KB), L2 (trung bình, ~256KB-1MB), L3 (lớn nhất, chia sẻ, vài MB)"
      ]
    },
    15: {
      title: "Liên Kết Cache",
      explanation: "Xác định khối bộ nhớ cụ thể CÓ THỂ được lưu Ở ĐÂU trong cache. Linh hoạt hơn = ít trượt xung đột hơn, nhưng phần cứng đắt hơn.",
      keyPoints: [
        "Ánh xạ trực tiếp (1-way): mỗi địa chỉ → đúng 1 dòng. Nhanh nhưng nhiều trượt xung đột.",
        "Liên kết đầy đủ: bất kỳ địa chỉ → bất kỳ dòng. Tỷ lệ trúng tốt nhất nhưng rất đắt (kiểm tra tất cả thẻ).",
        "Liên kết tập N-way: địa chỉ → 1 tập gồm N dòng. Thỏa hiệp thực tế.",
        "Phổ biến trong CPU thực: liên kết tập 4-way hoặc 8-way",
        "Ánh xạ trực tiếp là 1-way. Liên kết đầy đủ là 1 tập chứa tất cả dòng."
      ]
    },
    16: {
      title: "Cấu Trúc Địa Chỉ Cache",
      explanation: "Địa chỉ bộ nhớ được tách thành 3 phần cho tra cứu cache: thẻ (khối nào?), chỉ số (tập nào?), và offset (byte nào trong khối?).",
      keyPoints: [
        "Offset (bit ngoài cùng phải): vị trí byte trong khối = log2(kích_thước_khối) bit",
        "Chỉ số (bit giữa): chọn tập nào = log2(số_tập) bit",
        "Thẻ (bit ngoài cùng trái): bit còn lại, lưu trong cache để xác định",
        "số_tập = kích_thước_cache / (kích_thước_khối x số_way)",
        "Ánh xạ trực tiếp: nhiều bit chỉ số nhất, ít bit thẻ nhất. Liên kết đầy đủ: không bit chỉ số, nhiều bit thẻ nhất."
      ]
    },
    17: {
      title: "Chính Sách Ghi",
      explanation: "Khi CPU ghi dữ liệu, cache cần chiến lược giữ RAM cập nhật. Hai cách tiếp cận chính với đánh đổi tốc độ/nhất quán khác nhau.",
      keyPoints: [
        "Ghi xuyên: ghi vào cache VÀ RAM đồng thời. Đơn giản, nhất quán, nhưng ghi chậm.",
        "Ghi lại: CHỈ ghi vào cache, đặt dirty bit = 1. RAM cập nhật sau khi dòng bị loại.",
        "Dirty bit: cờ chỉ 'dòng này đã bị sửa đổi và khác với RAM'",
        "Ghi xuyên: không cần dirty bit, đơn giản hơn. Ghi lại: nhanh hơn, nhưng cần theo dõi dirty bit.",
        "Phức tạp ghi lại: nhất quán cache trong hệ đa nhân, vấn đề DMA."
      ]
    },
    18: {
      title: "Nhất Quán Cache & Giao Thức MESI",
      explanation: "Trong hệ đa nhân, mỗi lõi có cache riêng. Khi một lõi sửa dữ liệu chia sẻ, bản sao lõi khác trở nên cũ. Giao thức nhất quán giữ mọi người đồng bộ.",
      keyPoints: [
        "Vấn đề: Lõi A và Lõi B đều cache địa chỉ X. Lõi A ghi giá trị mới. Lõi B vẫn có giá trị cũ.",
        "Dựa trên vô hiệu hóa (MESI): khi ghi, nói lõi khác bỏ bản sao. Phổ biến hơn.",
        "Dựa trên cập nhật: khi ghi, phát sóng giá trị mới đến tất cả cache. Nhiều lưu lượng bus hơn.",
        "Trạng thái MESI: M (Đã sửa, bẩn, bản duy nhất), E (Độc quyền, sạch, bản duy nhất), S (Chia sẻ, sạch, nhiều bản), I (Không hợp lệ, không bản hợp lệ)",
        "Khi ghi vào dòng Chia Sẻ, tất cả bản sao khác thành Không Hợp Lệ trước"
      ]
    }
  },

  problems: {
    1: {
      title: "Phân Tách Địa Chỉ Cache",
      problem: "Hệ thống có không gian địa chỉ 32-bit, cache liên kết tập 4-way 16KB với khối 64 byte.\nTính số bit offset, chỉ số, và thẻ.",
      steps: [
        { text: "Bit offset = log2(kích_thước_khối). Khối 64 byte, nên log2(64) = ?", answer: "6 bit (vì 2^6 = 64, nên 6 bit có thể đánh địa chỉ bất kỳ vị trí byte 0-63 trong khối 64 byte)" },
        { text: "Bao nhiêu tập? Công thức: kích_thước_cache / (kích_thước_khối x way) = 16384 / (64 x 4) = ?", answer: "64 tập (16384 byte tổng, chia thành nhóm 64 byte x 4 way = 256 byte mỗi tập)" },
        { text: "Bit chỉ số = log2(số tập) = log2(64) = ?", answer: "6 bit (vì 2^6 = 64, nên 6 bit có thể chọn bất kỳ tập nào trong 64 tập)" },
        { text: "Bit thẻ = độ_rộng_địa_chỉ - bit_chỉ_số - bit_offset = 32 - 6 - 6 = ?", answer: "20 bit (các bit địa chỉ còn lại sau chỉ số và offset)" }
      ],
      finalAnswer: "Offset: 6 bit | Chỉ số: 6 bit | Thẻ: 20 bit\nĐịnh dạng địa chỉ: [thẻ 20-bit | chỉ số 6-bit | offset 6-bit]\nCache có 64 tập, mỗi tập 4 dòng, tổng 256 dòng cache."
    },
    2: {
      title: "Cache Ánh Xạ Trực Tiếp",
      problem: "Cache ánh xạ trực tiếp 4KB có khối 32 byte. Hệ thống dùng địa chỉ 24-bit.\nBao nhiêu bit offset, chỉ số, và thẻ? Có bao nhiêu dòng cache?",
      steps: [
        { text: "Bit offset = log2(kích_thước_khối) = log2(32) = ?", answer: "5 bit (2^5 = 32 byte mỗi khối)" },
        { text: "Bao nhiêu dòng? Ánh xạ trực tiếp nghĩa là 1-way, nên dòng = 4096 / 32 = ?", answer: "128 dòng (tổng cache / kích thước khối, vì mỗi tập có đúng 1 dòng trong ánh xạ trực tiếp)" },
        { text: "Bit chỉ số = log2(128) = ?", answer: "7 bit (2^7 = 128, cần 7 bit để chọn dòng nào trong 128 dòng)" },
        { text: "Bit thẻ = 24 - 7 - 5 = ?", answer: "12 bit (bit địa chỉ còn lại sau chỉ số và offset)" },
        { text: "Tổng bao nhiêu dòng cache?", answer: "128 dòng (trong ánh xạ trực tiếp: 128 tập x 1 dòng mỗi tập = 128 dòng)" }
      ],
      finalAnswer: "128 dòng cache | Offset: 5 bit | Chỉ số: 7 bit | Thẻ: 12 bit\nÁnh xạ trực tiếp nghĩa là mỗi địa chỉ bộ nhớ chỉ có thể vào một dòng cụ thể."
    },
    3: {
      title: "Cache Liên Kết Đầy Đủ",
      problem: "Cache liên kết đầy đủ 2KB có khối 64 byte với địa chỉ 32-bit.\nTính bit offset và thẻ. Cache có bao nhiêu dòng?",
      steps: [
        { text: "Bit offset = log2(64) = ?", answer: "6 bit (2^6 = 64 byte mỗi khối)" },
        { text: "Bao nhiêu dòng? tổng / kích_thước_khối = 2048 / 64 = ?", answer: "32 dòng" },
        { text: "Cache liên kết đầy đủ có bao nhiêu bit chỉ số?", answer: "0 bit! Liên kết đầy đủ nghĩa là chỉ có 1 tập chứa TẤT CẢ dòng. Không cần chỉ số — bất kỳ địa chỉ nào cũng có thể vào bất kỳ dòng nào." },
        { text: "Bit thẻ = 32 - 0 - 6 = ?", answer: "26 bit (không có chỉ số, hầu như toàn bộ địa chỉ là thẻ)" }
      ],
      finalAnswer: "32 dòng cache, 1 tập (tất cả dòng trong một tập) | Offset: 6 bit | Chỉ số: 0 bit | Thẻ: 26 bit\nBất kỳ địa chỉ nào có thể lưu trong bất kỳ dòng nào. Để kiểm tra trúng, TẤT CẢ 32 thẻ phải so sánh đồng thời."
    },
    4: {
      title: "Định Luật Amdahl — Cơ Bản",
      problem: "Một chương trình có 30% code tuần tự (không thể song song hóa).\nTính tăng tốc với 4, 8, và vô hạn bộ xử lý.",
      steps: [
        { text: "Viết công thức với A = 0.3 (30% tuần tự)", answer: "S(N) = 1 / (A + (1-A)/N) = 1 / (0.3 + 0.7/N)" },
        { text: "S(4) = 1 / (0.3 + 0.7/4) = ?", answer: "1 / (0.3 + 0.175) = 1 / 0.475 = 2.11 lần tăng tốc" },
        { text: "S(8) = 1 / (0.3 + 0.7/8) = ?", answer: "1 / (0.3 + 0.0875) = 1 / 0.3875 = 2.58 lần tăng tốc" },
        { text: "S(∞) = 1 / (0.3 + 0) = ?", answer: "1 / 0.3 = 3.33 lần tăng tốc tối đa có thể (phần song song hoàn thành tức thì, nhưng 30% vẫn chạy tuần tự)" }
      ],
      finalAnswer: "S(4) = 2.11x | S(8) = 2.58x | S(∞) = 3.33x\n\nĐiểm chính: gấp đôi bộ xử lý từ 4 lên 8 chỉ thêm 0.47x tăng tốc. Dù vô hạn bộ xử lý cũng không vượt 3.33x vì 30% công việc phải làm tuần tự."
    },
    5: {
      title: "Định Luật Amdahl — Tìm Tỷ Lệ Tuần Tự",
      problem: "Với 16 bộ xử lý, bạn đạt tăng tốc 10 lần.\nBao nhiêu phần trăm chương trình là tuần tự?",
      steps: [
        { text: "Bắt đầu với S(N) = 1/(A + (1-A)/N). Thay S=10 và N=16.", answer: "10 = 1 / (A + (1-A)/16)" },
        { text: "Đảo: A + (1-A)/16 = 1/10 = 0.1. Khai triển (1-A)/16.", answer: "A + 1/16 - A/16 = 0.1, rút gọn thành A(1 - 1/16) + 1/16 = 0.1" },
        { text: "Rút gọn: (15/16)A + 0.0625 = 0.1. Giải A.", answer: "(15/16)A = 0.1 - 0.0625 = 0.0375, nên A = 0.0375 x (16/15) = 0.04" },
        { text: "A = 0.04 nghĩa là gì? Tăng tốc tối đa?", answer: "Chỉ 4% chương trình là tuần tự. Tăng tốc tối đa = 1/0.04 = 25 lần (với vô hạn bộ xử lý)" }
      ],
      finalAnswer: "Tỷ lệ tuần tự A = 0.04 = 4%\nChỉ 4% chương trình là tuần tự, vì vậy 16 bộ xử lý có thể đạt tăng tốc 10 lần.\nTăng tốc tối đa lý thuyết = 1/0.04 = 25 lần với vô hạn bộ xử lý."
    },
    6: {
      title: "Nhận Diện Xung Đột Pipeline",
      problem: "Xác định loại xung đột cho mỗi cặp lệnh (hợp ngữ ARM):\n1) ADD r1, r2, r3  rồi  SUB r4, r1, r5\n2) ADD r3, r1, r2  rồi  MUL r1, r4, r5\n3) ADD r3, r1, r2  rồi  SUB r3, r4, r5\n4) LDR r1, [r2]   rồi  ADD r3, r1, r4",
      steps: [
        { text: "Cặp 1: ADD ghi r1, rồi SUB đọc r1. Loại gì?", answer: "RAW (Đọc Sau Ghi) — SUB cần ĐỌC r1, nhưng ADD chưa GHI xong. Đây là phụ thuộc dữ liệu thực." },
        { text: "Cặp 2: ADD đọc r1, rồi MUL ghi r1. Loại gì?", answer: "WAR (Ghi Sau Đọc) — MUL sẽ GHI (ghi đè) r1, nhưng ADD vẫn cần ĐỌC giá trị cũ của r1. Đây là phụ thuộc tên/giả." },
        { text: "Cặp 3: ADD ghi r3, rồi SUB cũng ghi r3. Loại gì?", answer: "WAW (Ghi Sau Ghi) — cả hai lệnh GHI vào r3. Thứ tự quan trọng: ta cần kết quả SUB là giá trị cuối, không phải ADD." },
        { text: "Cặp 4: LDR nạp từ bộ nhớ vào r1, rồi ADD đọc r1. Loại và vấn đề đặc biệt?", answer: "RAW (Đọc Sau Ghi). Đặc biệt: dữ liệu LDR chỉ có sau giai đoạn MEM, không phải sau EX. Nên dù có chuyển tiếp, vẫn cần tạm dừng 1 chu kỳ (gọi là 'xung đột load-use')." }
      ],
      finalAnswer: "1) RAW — giải được bằng chuyển tiếp kết quả\n2) WAR — giải được bằng đổi tên thanh ghi\n3) WAW — giải được bằng đổi tên thanh ghi\n4) RAW (load-use) — cần ít nhất 1 bong bóng DÙ CÓ chuyển tiếp, vì dữ liệu đến từ bộ nhớ, không phải ALU"
    },
    7: {
      title: "Thời Gian Pipeline Với Bong Bóng",
      problem: "Cho các lệnh sau trong pipeline 5 giai đoạn KHÔNG CÓ chuyển tiếp kết quả:\n  ADD r1, r2, r3\n  SUB r4, r1, r5\nBao nhiêu chu kỳ để hoàn thành cả hai? Bao nhiêu với chuyển tiếp?",
      steps: [
        { text: "Không chuyển tiếp: ADD ghi r1 ở WB (chu kỳ 5). Khi nào giai đoạn EX của SUB có thể dùng r1?", answer: "SUB phải đợi đến khi WB của ADD hoàn thành ở chu kỳ 5. SUB vào IF ở chu kỳ 2 nhưng tạm dừng ở ID vì r1 chưa sẵn sàng. EX của SUB không thể chạy đến chu kỳ 6 (sau WB của ADD ở chu kỳ 5)." },
        { text: "Bao nhiêu chu kỳ bong bóng được chèn?", answer: "2 chu kỳ bong bóng. SUB tạm dừng 2 chu kỳ thêm trong khi đợi ADD ghi lại r1." },
        { text: "Tổng chu kỳ không có chuyển tiếp?", answer: "8 chu kỳ tổng. ADD hoàn thành ở chu kỳ 5, SUB hoàn thành ở chu kỳ 8 (dịch 2 chu kỳ do tạm dừng)." },
        { text: "Với chuyển tiếp: kết quả EX của ADD có sau chu kỳ 3. Khi nào EX của SUB chạy?", answer: "Chu kỳ 4. Kết quả được chuyển trực tiếp từ đầu ra EX của ADD đến đầu vào EX của SUB. Không cần tạm dừng! Tổng: 6 chu kỳ (ADD: 1-5, SUB: 2-6)." }
      ],
      finalAnswer: "Không chuyển tiếp: 8 chu kỳ (2 bong bóng lãng phí)\nCó chuyển tiếp: 6 chu kỳ (0 bong bóng)\nChuyển tiếp tiết kiệm 2 chu kỳ bằng cách tắt đường dữ liệu."
    },
    8: {
      title: "Tra Cứu Cache Từ Ví Dụ Slide",
      problem: "Cho: địa chỉ 13-bit, cache 128 byte, liên kết tập 4-way, khối 8 byte, chính sách ghi lại.\nĐịa chỉ tra cứu: 1101110001010 (nhị phân). Có trúng cache không?\n\nNội dung cache cho tập 01:\n  Thẻ=56, Valid=1, Dirty=1\n  Thẻ=F2, Valid=0, Dirty=0\n  Thẻ=DC, Valid=1, Dirty=1, Data=[3E,18,48,45,4C,4C,4F,00]\n  Thẻ=03, Valid=1, Dirty=0",
      steps: [
        { text: "Tính bit offset: log2(kích_thước_khối) = log2(8) = ?", answer: "3 bit. 3 bit cuối của địa chỉ = 010 (nhị phân) = vị trí 2 trong khối 8 byte." },
        { text: "Tính tập: 128/(8x4) = 4 tập. Bit chỉ số = log2(4) = 2. Chỉ số là gì?", answer: "2 bit chỉ số. Từ địa chỉ: ...01|010, chỉ số = 01 (nhị phân) = tập 1." },
        { text: "Bit thẻ = 13 - 2 - 3 = 8. Giá trị thẻ?", answer: "8 bit thẻ. Từ địa chỉ: 11011100|01|010, thẻ = 11011100 = 0xDC." },
        { text: "Tìm trong tập 01 thẻ 0xDC. Tập có thẻ: 56, F2, DC, 03. DC có ở đó và hợp lệ?", answer: "Có! Thẻ DC tìm thấy trong tập 01 với Valid=1. Đây là CACHE TRÚNG!" },
        { text: "Dữ liệu tại offset 010 (vị trí 2)?", answer: "Dữ liệu dòng DC là [3E, 18, 48, 45, 4C, 4C, 4F, 00]. Vị trí 2 = 0x48 = chữ 'H' trong ASCII. (Thú vị: toàn bộ dòng đánh vần '.HELLO.' trong ASCII!)" }
      ],
      finalAnswer: "CACHE TRÚNG! Thẻ 0xDC tìm thấy trong tập 01, valid=1, dirty=1.\nDữ liệu tại offset 2 = 0x48 ('H').\nDirty bit = 1 nghĩa là dòng này đã bị sửa đổi và phải ghi lại RAM trước khi bị loại."
    }
  }
};