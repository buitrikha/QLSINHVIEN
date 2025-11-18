# Hướng dẫn chạy Backend nhanh

## Các bước chạy:

### 1. Cài đặt dependencies (nếu chưa cài)
```bash
npm install
```

### 2. Tạo file .env
Tạo file `.env` trong thư mục `backend/` với nội dung:

```env
DB_DRIVER=ODBC Driver 17 for SQL Server
DB_SERVER=MSI\\SQLEXPRESS
DB_DATABASE=QLSINHVIEN1
DB_USER=sa
DB_PASSWORD=123
DB_TRUSTED_CONNECTION=false
DB_TRUST_SERVER_CERTIFICATE=true
PORT=5000
```

**Quan trọng:** Điều chỉnh các giá trị phù hợp với SQL Server của bạn:
- `DB_SERVER`: Tên server (ví dụ: `MSI\\SQLEXPRESS`, nhớ dùng `\\` thay vì `\`)
- `DB_DATABASE`: Tên database (mặc định: `QLSINHVIEN1`)
- Nếu dùng SQL Authentication: điền `DB_USER` và `DB_PASSWORD`, đặt `DB_TRUSTED_CONNECTION=false` (mặc định đã là cấu hình này với user `sa/123`)
- Nếu dùng Windows Authentication: để trống `DB_USER`, `DB_PASSWORD` và đặt `DB_TRUSTED_CONNECTION=true`

### 3. Khởi tạo Database
Chạy file `../sqlserver/setup.sql` trong SQL Server Management Studio để tạo database và bảng.

### 4. Chạy server
```bash
npm run dev
```

Hoặc chạy production:
```bash
npm start
```

### 5. Kiểm tra
Mở trình duyệt: http://localhost:5000/api/ping

Nếu thấy "Backend is running!" là thành công!

## Lỗi thường gặp:

1. **Database connection failed**
   - Kiểm tra SQL Server đã chạy chưa
   - Kiểm tra thông tin trong file `.env`
   - Kiểm tra database đã được tạo chưa (chạy setup.sql)

2. **Port 5000 đã được sử dụng**
   - Đổi PORT trong file `.env` sang port khác (ví dụ: 5001)

3. **Module not found**
   - Chạy lại `npm install`

