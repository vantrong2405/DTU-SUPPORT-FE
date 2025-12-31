# Hướng Dẫn Deploy VPS

## Deploy Lần Đầu

```bash
# 1. Tạo thư mục
mkdir -p ~/dtu/dtu-support-fe
cd ~/dtu/dtu-support-fe

# 2. Tạo file docker-compose.yml
nano docker-compose.yml

# Copy nội dung này vào file:
services:
  web:
    image: vantrong1/dtu-support-fe:latest
    container_name: dtu-support-fe
    restart: unless-stopped
    ports:
      - "127.0.0.1:4000:3000"

# Lưu file: Ctrl+O, Enter, Ctrl+X

# 3. Chạy container
docker compose up -d

# 4. Kiểm tra
docker ps | grep dtu-support-fe
curl -s http://localhost:4000 | grep -o 'backendUrl":"[^"]*"'
# Kết quả: backendUrl:"https://api-dtu-support.vantrongdng.id.vn/"
```

---

## Khi Có Code Mới

### Bước 1: Trên Máy Local

```bash
cd /home/trongtk248/Documents/DTU-SUPPORT-FE

# 1. Dùng env production
cp .env.production .env

# 2. Xóa build cũ & rebuild
rm -rf .output
docker compose build --no-cache

# 3. Push lên Docker Hub
docker tag dtu-support-fe:latest vantrong1/dtu-support-fe:latest
docker push vantrong1/dtu-support-fe:latest
```

### Bước 2: Trên VPS

```bash
cd ~/dtu/dtu-support-fe

# 1. Dừng container cũ
docker compose down

# 2. Pull image mới
docker pull vantrong1/dtu-support-fe:latest

# 3. Chạy lại
docker compose up -d

# 4. Kiểm tra
curl -s http://localhost:4000 | grep -o 'backendUrl":"[^"]*"'
```

---

## Các Lệnh Kiểm Tra Container

```bash
# Container có đang chạy không?
docker ps | grep dtu-support-fe

# Xem logs
docker logs dtu-support-fe

# Restart container
docker compose restart

# Dừng container
docker compose down
```

---

## Lưu Ý

✅ **KHÔNG cần source code trên VPS** - chỉ cần docker-compose.yml
✅ **Mỗi lần sửa code → phải rebuild & push Docker Hub**
✅ **Image đã chứa sẵn production URL** - không cần file .env trên VPS
