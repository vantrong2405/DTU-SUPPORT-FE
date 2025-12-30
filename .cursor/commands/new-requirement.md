# Tạo Feature Mới

Hướng dẫn tạo feature mới từ đầu đến cuối.

## Bước 1: Thu thập thông tin
Hỏi user về:
- Tên feature (kebab-case, ví dụ: `user-authentication`)
- Vấn đề cần giải quyết và user stories chính

## Bước 2: Tạo docs và điền nội dung
Tạo các file documentation (nếu có template thì copy):
- `docs/requirements/feature-{name}.md` - Yêu cầu (vấn đề, mục tiêu, user stories, tiêu chí thành công)
- `docs/design/feature-{name}.md` - Thiết kế (kiến trúc, API, components, data models)
- `docs/planning/feature-{name}.md` - Kế hoạch (chia nhỏ task, phụ thuộc, thứ tự)

Giúp user điền nội dung vào các file này.

## Bước 3: Kiểm tra và implement
- Kiểm tra requirements và design docs để validate (kiểm tra phần thiếu, điểm không rõ, mâu thuẫn)
- Khi sẵn sàng code: chạy `/execute-plan` để implement
- Sau khi code xong: chạy `/writing-test` và `/check-implementation`

---

**Bắt đầu:** Hỏi user về feature họ muốn tạo.
