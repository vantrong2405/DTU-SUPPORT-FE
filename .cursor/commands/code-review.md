# Code Review

Review code local trước khi push changes.

## Bước 1: Thu thập thông tin
Hỏi user về:
- Mô tả feature/branch
- Danh sách file đã sửa
- Tài liệu thiết kế liên quan

Yêu cầu diff: `git status -sb` và `git diff --stat`

## Bước 2: Review files
Với mỗi file đã sửa:
- Kiểm tra lệch từ design/requirements
- Phát hiện vấn đề logic, edge cases
- Đánh dấu mối quan tâm bảo mật (validation input, auth, xử lý data)
- Xác định tests thiếu
- Đề xuất cải thiện

## Bước 3: Tóm tắt
Tóm tắt:
- Vấn đề chặn
- Theo dõi quan trọng
- Cải thiện tùy chọn
- Bước tiếp theo được đề xuất (sửa vấn đề, thêm tests, cập nhật docs)

---

**Bắt đầu:** Hỏi mô tả feature và file đã sửa.
