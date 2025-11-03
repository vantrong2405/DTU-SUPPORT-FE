# FE Authentication Flow (Session + Cookie)

## Mục tiêu
- FE không quản lý token.
- BE lưu phiên bằng HttpOnly Cookie.
- FE chỉ gọi đúng 1 API để xác định trạng thái đăng nhập, UI đọc từ Pinia.

## Endpoints FE sử dụng
- GET `/users/me` (credentials: include)
- GET `{BACKEND_URL}/oauth/google/redirect?return_url={ABS_FE_URL}` (chuyển hướng qua BE)
- POST `/logout` (nếu có)

## Store cần dùng
- `auth.user: User | null`
- `auth.hasSessionChecked: boolean`
- `auth.setUser(u)`
- `auth.setHasSessionChecked(v)`

## Luồng chi tiết
1) App khởi động (sau F5)
- onMounted ở `app/app.vue`:
  - Nếu `!auth.hasSessionChecked` → gọi `GET /users/me` một lần.
  - 200 → `setUser(user)` → `setHasSessionChecked(true)`.
  - 401 → `setUser(null)` → `setHasSessionChecked(true)`.
- Không gọi lại ở Header/Page khác.

2) Nút "Login with Google"
- Build absolute return_url: `window.location.origin + (redirectPath || '/')`.
- Redirect trình duyệt tới: `{BACKEND_URL}/oauth/google/redirect?return_url={return_url}`.
- BE xác thực xong → set cookie → 302 về `return_url` (FE).
- FE KHÔNG gọi thêm gì tại callback. Lần render tiếp theo, App (bước 1) sẽ re-hydrate.

3) Chặn truy cập /login khi đã đăng nhập
- Trang `pages/login` gắn middleware `guest`:
  - Nếu `!auth.hasSessionChecked` → gọi `GET /users/me` đúng 1 lần để hydrate.
  - Nếu `auth.user` tồn tại → `navigateTo(redirect || '/')`.
  - Nếu không có user → cho vào /login.

4) Header hiển thị UI
- Không fetch API.
- Logic hiển thị:
  - Hiện Logout khi `auth.hasSessionChecked && auth.user`.
  - Hiện Login khi `auth.hasSessionChecked && !auth.user`.
  - Trước khi `hasSessionChecked === true` → có thể ẩn cả hai để tránh nhấp nháy.

5) Logout
- Gọi `POST /logout` (credentials: include).
- Sau 200 → `setUser(null)` → `navigateTo('/login')`.

## Tóm tắt
- Chỉ 1 lần `GET /users/me` ở boot (và trong `guest` khi vào /login nếu chưa check).
- UI đọc từ Pinia, không gọi API ở Header/Component.
- `return_url` luôn là ABS FE URL để tránh quay về origin BE.
