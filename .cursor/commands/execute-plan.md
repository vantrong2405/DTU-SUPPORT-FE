# Thực Thi Plan

Hỗ trợ thực hiện từng task trong planning doc.

## Bước 1: Tải plan
- Đọc planning doc (`docs/planning/feature-{name}.md`)
- Parse danh sách task (checkboxes `[ ]`, `[x]`)
- Hiển thị hàng đợi task với trạng thái: `todo`, `in-progress`, `done`, `blocked`

## Bước 2: Thực thi từng task
Với mỗi task:
- Hiển thị nội dung task và context
- Gợi ý docs liên quan (design, requirements) để tham khảo
- Hỗ trợ implement code/document
- Sau khi xong: tạo Markdown snippet để cập nhật planning doc

## Bước 3: Tóm tắt
Tạo tóm tắt:
- Tasks đã hoàn thành
- Tasks đang thực hiện
- Tasks bị chặn (với lý do chặn)
- Tasks mới phát hiện

Nhắc user cập nhật planning doc và chạy `/check-implementation`, `/writing-test` khi sẵn sàng.

---

**Bắt đầu:** Hỏi tên feature và đường dẫn planning doc.
