# Fake DB Backend

## Cài đặt

```bash
git clone https://github.com/buitrikha/fake_db_backend.git
cd fake_db_backend
npm install
cp .env.example .env # chỉnh sửa thông tin truy cập database
```

## Khởi tạo DB

Chạy các lệnh SQL trong file `setup.sql` để tạo schema.

## Chạy server

```bash
npm run dev
```

## API endpoints
- GET/POST/PUT/DELETE cho từng bảng
- Xem chi tiết trong từng file routes.
