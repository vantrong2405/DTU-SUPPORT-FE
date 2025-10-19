# GPA Calculator - Tính Toán GPA Thông Minh

## 📋 Tổng Quan

Hệ thống tính toán GPA thông minh giúp sinh viên Đại học Duy Tân:
- Dự đoán khả năng đạt GPA mục tiêu
- Tính toán GPA hiện tại và tích lũy
- Tính toán GPA thể dục
- Tính điểm qua môn theo trọng số
- Hỏi AI để nhận gợi ý học tập

---

## 📊 Dữ Liệu Định Nghĩa

### Xếp Loại Tốt Nghiệp Duy Tân

Bảng xếp loại tốt nghiệp chính thức của Đại học Duy Tân:

| Hạng | GPA Range (Thang 4) | Mô Tả |
|------|---------------------|-------|
| **Xuất sắc** | 3.60 – 4.00 | Hạng cao nhất, yêu cầu GPA ≥ 3.60 |
| **Giỏi** | 3.20 – 3.59 | Hạng tốt, yêu cầu GPA ≥ 3.20 |
| **Khá** | 2.50 – 3.19 | Hạng khá, yêu cầu GPA ≥ 2.50 |
| **Trung bình** | 2.00 – 2.49 | Hạng trung bình, yêu cầu GPA ≥ 2.00 |

**Lưu ý quan trọng:**
- Hạng tốt nghiệp có thể bị giảm nếu có **>5% tín chỉ học lại** hoặc bị kỷ luật
- Xếp loại dựa trên GPA tích lũy cuối cùng (thang điểm 4.0)

---

### Thang Điểm Duy Tân

Bảng chuyển đổi điểm số giữa các thang điểm của Đại học Duy Tân:

| Xếp Loại | Thang Điểm 10 | Điểm Chữ | Thang Điểm 4 | Trạng Thái |
|----------|---------------|----------|--------------|------------|
| **Giỏi** | 9.5 - 10.0 | A+ | 4.0 | Đạt |
| | 8.5 - 9.4 | A | 4.0 | Đạt |
| **Khá** | 8.0 - 8.4 | A- | 3.65 | Đạt |
| | 7.5 - 7.9 | B+ | 3.33 | Đạt |
| | 7.0 - 7.4 | B | 3.0 | Đạt |
| **Trung bình** | 6.5 - 6.9 | B- | 2.65 | Đạt |
| | 6.0 - 6.4 | C+ | 2.33 | Đạt |
| | 5.5 - 5.9 | C | 2.0 | Đạt |
| **Trung bình yếu** | 4.5 - 5.4 | C- | 1.65 | Đạt |
| **Không đạt** | 4.0 - 4.4 | D | 1.0 | Có điều kiện |
| **Kém** | 0.0 - 3.9 | F | 0.0 | Không đạt |

**Lưu ý quan trọng:**

1. **Thang điểm 4** là thang điểm đánh giá chính thức để:
   - Xét học vụ
   - Xét tốt nghiệp
   - Xếp hạng sinh viên

2. **Điểm D (1.0)** được xem là **đạt có điều kiện**:
   - Nếu có **>5% tổng tín chỉ** đạt điểm D, cần học cải thiện
   - Vẫn được tích lũy tín chỉ nhưng ảnh hưởng đến GPA

3. **Điểm F (0.0)**:
   - **Không được tích lũy** tín chỉ
   - **Bắt buộc phải học lại** môn học đó
   - Không tính vào GPA tích lũy

---

## 🟩 TAB 1 – TÍNH TOÁN MỤC TIÊU (GPA PROJECTION)

### 🎯 Mục Đích

Giúp sinh viên dự đoán xem mình có thể đạt GPA mục tiêu hoặc loại bằng mong muốn nếu cố gắng học tốt nhất (tức là đạt toàn điểm A cho số tín chỉ còn lại).

### 📥 Dữ Liệu Đầu Vào

Sinh viên sẽ nhập 4 giá trị:

| Trường | Label | Ý Nghĩa | Type | Validation | Ví Dụ |
|--------|-------|---------|------|------------|-------|
| `completedCredits` | Số tín đã học | Tổng số tín chỉ đã hoàn thành | Number (int) | ≥ 0 | 60 |
| `currentGpa` | GPA hiện tại | GPA tích lũy hiện tại (thang 4) | Number (float) | 0 ≤ value ≤ 4.0 | 3.0 |
| `targetGpa` | GPA mục tiêu | GPA mong muốn đạt được | Number (float) | 0.01 ≤ value ≤ 4.0 | 3.2 |
| `remainingCredits` | Số tín còn lại | Số tín chỉ chưa học | Number (int) | ≥ 1 | 65 |

### ⚙️ Cách Tính

Giả định rằng tất cả tín chỉ còn lại được điểm **A = 4.0**.

**Công thức:**

```
GPA_final = (current_gpa × credits_completed) + (4.0 × credits_remaining)
            ──────────────────────────────────────────────────────────
                          credits_completed + credits_remaining
```

**Ví dụ tính toán:**

Input:
- `completedCredits` = 60
- `currentGpa` = 3.0
- `targetGpa` = 3.2
- `remainingCredits` = 65

Calculation:
```
GPA_final = (3.0 × 60) + (4.0 × 65)
            ────────────────────────
                 60 + 65

         = 180 + 260
           ─────────
             125

         = 440 / 125
         = 3.520
```

Result: `GPA_final = 3.520`

### 📤 Kết Quả Đầu Ra

Hệ thống hiển thị:

1. **GPA dự kiến** nếu đạt toàn A → `GPA_final` (hiển thị với 3 chữ số thập phân)

2. **So sánh với mục tiêu:**

   **Nếu `GPA_final >= target_gpa`** → ✅ **"Có thể đạt mục tiêu!"**
   - Message: "Nếu đạt điểm A (4.0) ở tất cả các môn còn lại, bạn sẽ đạt GPA {GPA_final}, cao hơn mục tiêu của bạn."
   - Styling: Primary colors (success indicator)

   **Nếu `GPA_final < target_gpa`** → ❌ **"Khó đạt mục tiêu"**
   - Message: "Ngay cả khi đạt điểm A (4.0) ở tất cả các môn còn lại, GPA tối đa chỉ là {GPA_final}, thấp hơn mục tiêu."
   - Styling: Accent colors (warning indicator)

3. **Bằng tốt nghiệp tương ứng** (Optional - Future Enhancement):

   Hiển thị loại bằng tương ứng với `GPA_final`:

   | Hạng | GPA Range | Badge Color | Icon |
   |------|-----------|-------------|------|
   | **Xuất sắc** | 3.60 – 4.00 | Gold/Primary | ⭐ |
   | **Giỏi** | 3.20 – 3.59 | Primary | 🎓 |
   | **Khá** | 2.50 – 3.19 | Accent | 📜 |
   | **Trung bình** | 2.00 – 2.49 | Muted | 📄 |
   | **Yếu** | < 2.00 | Destructive | ⚠️ |

### 🧩 Mục Tiêu Của Tab Này

- Giúp sinh viên lên kế hoạch học tập và biết rõ liệu có thể đạt hạng mong muốn hay không
- Không cần nhập chi tiết từng môn học
- Dễ thao tác, chỉ cần 4 thông số là đủ

---

## 🟦 TAB 2 – TÍNH TOÁN GPA (Coming Soon)

### 🎯 Mục Đích

Tính GPA hiện tại hoặc GPA tích lũy theo số tín đã/đang học từ danh sách các môn học chi tiết.

### 📥 Dữ Liệu Đầu Vào (Dự Kiến)

- Danh sách các môn học đã học
- Mỗi môn: Tên môn, Số tín chỉ, Điểm (thang 10 hoặc thang 4)
- Tự động tính GPA tích lũy

### ⚙️ Cách Tính (Dự Kiến)

```
GPA = Σ(điểm_môn × số_tín_chỉ) / Σ(số_tín_chỉ)
```

---

## 🟦 TAB 3 – GPA THỂ DỤC (Coming Soon)

### 🎯 Mục Đích

Công cụ tính GPA thể dục theo thang điểm DTU.

### 📥 Dữ Liệu Đầu Vào (Dự Kiến)

- Các môn thể dục đã học
- Điểm thể dục (có thể có thang điểm riêng)

---

## 🟦 TAB 4 – TÍNH ĐIỂM QUA MÔN (Coming Soon)

### 🎯 Mục Đích

Tính điểm cần ở bài thi cuối để qua môn theo trọng số.

### 📥 Dữ Liệu Đầu Vào (Dự Kiến)

- Điểm các thành phần hiện có (quá trình, giữa kỳ, etc.)
- Trọng số của từng thành phần
- Trọng số của bài thi cuối
- Điểm đậu yêu cầu (thường ≥ 4.0 hoặc ≥ 5.0)

### ⚙️ Cách Tính (Dự Kiến)

```
Điểm_cần_thi_cuối = (Điểm_đậu - Σ(điểm_thành_phần × trọng_số)) / trọng_số_thi_cuối
```

---

## 🟦 TAB 5 – HỎI AI (Coming Soon)

### 🎯 Mục Đích

Đặt câu hỏi cho AI để nhận lời khuyên học tập thông minh dựa trên GPA và kế hoạch học tập.

### 📥 Dữ Liệu Đầu Vào (Dự Kiến)

- Câu hỏi của sinh viên
- Context: GPA hiện tại, mục tiêu, số tín chỉ còn lại

### 📤 Kết Quả Đầu Ra (Dự Kiến)

- Gợi ý học tập cá nhân hóa
- Lộ trình học tập
- Tips để cải thiện GPA

---

## 🎨 UI/UX Considerations

### Layout

- **Desktop:** 2-column grid (Form left, Result right) cho tab 1
- **Mobile:** 1-column stack (Form top, Result bottom)
- **Tabs:** Horizontal tabs với overflow scroll trên mobile

### Design Principles

- Tất cả màu sắc sử dụng design tokens (primary, accent, muted, etc.)
- Không hardcode màu sắc
- Support dark mode
- Internationalization ready (i18n keys)
- Accessibility: ARIA labels, keyboard navigation

### Responsive Behavior

- **Mobile (< 640px):** Full-width inputs, stacked buttons, smaller text
- **Tablet (640px - 1024px):** Same as mobile với larger spacing
- **Desktop (> 1024px):** 2-column layout, larger text, horizontal buttons

---

## 🔍 Edge Cases & Validation

### Common Validations

- **Negative numbers:** Chặn (min: 0)
- **GPA > 4.0:** Chặn (max: 4.0)
- **Zero credits:** Warning nếu `remainingCredits = 0`
- **Total credits = 0:** Return `null`, không hiển thị result
- **Division by zero:** Prevent với validation
- **NaN values:** Error handling

### Error Handling

- Validation errors hiển thị dưới mỗi input field
- Disable submit button khi form invalid
- Clear error messages bằng tiếng Việt

---

## ✅ Acceptance Criteria (Tab 1)

- [x] User có thể nhập 4 giá trị input
- [x] Form validation hoạt động đúng
- [x] Calculation chính xác với công thức
- [x] Hiển thị result với formatting đúng (3 decimal places)
- [x] So sánh với target GPA và hiển thị message phù hợp
- [x] Responsive trên mobile, tablet, desktop
- [x] Error handling cho edge cases
- [x] Dark mode support
- [x] Accessibility compliance

---

## 📝 Notes

- File này mô tả ý tưởng và requirements cho GPA Calculator
- Chi tiết implementation sẽ được update khi develop từng tab
- Tất cả tabs đều sử dụng chung design system và tokens
