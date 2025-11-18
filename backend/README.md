# Fake DB Backend

## Cài đặt

### Bước 1: Cài đặt dependencies
```bash
cd backend
npm install
```

### Bước 2: Tạo file .env
Tạo file `.env` trong thư mục `backend/` với nội dung sau:

```env
# Database Configuration
DB_DRIVER=ODBC Driver 17 for SQL Server
DB_SERVER=MSI\\SQLEXPRESS
DB_DATABASE=QLSINHVIEN1
DB_USER=sa
DB_PASSWORD=123
DB_TRUSTED_CONNECTION=false
DB_TRUST_SERVER_CERTIFICATE=true

# Server Configuration
PORT=5000
```

**Lưu ý:** 
- Nếu bạn đổi sang Windows Authentication, để `DB_USER` và `DB_PASSWORD` trống, `DB_TRUSTED_CONNECTION=true`
- Nếu chạy SQL Server instance khác, thay `DB_SERVER` bằng tên instance tương ứng (nhớ escape `\` thành `\\`)
- Có thể thay đổi `DB_DATABASE`, `DB_USER`, `DB_PASSWORD` theo môi trường thực tế

### Bước 3: Khởi tạo Database
Chạy file SQL `../sqlserver/setup.sql` trong SQL Server Management Studio để tạo database và các bảng.

## Chạy server

### Chế độ development (tự động restart khi có thay đổi):
```bash
npm run dev
```

### Chế độ production:
```bash
npm start
```

Server sẽ chạy tại: `http://localhost:5000`

## Kiểm tra server
Mở trình duyệt hoặc dùng Postman/curl:
```
GET http://localhost:5000/api/ping
```
Kết quả: `Backend is running!`

## API endpoints

### Sinh viên
- `GET /api/sinhvien` - Lấy tất cả sinh viên
- `GET /api/sinhvien/:Ma_SV` - Lấy sinh viên theo mã
- `POST /api/sinhvien` - Thêm sinh viên mới
- `PUT /api/sinhvien/:Ma_SV` - Cập nhật sinh viên
- `DELETE /api/sinhvien/:Ma_SV` - Xóa sinh viên

### Giảng viên
- `GET /api/giangvien` - Lấy tất cả giảng viên
- `GET /api/giangvien/:Ma_GV` - Lấy giảng viên theo mã
- `POST /api/giangvien` - Thêm giảng viên mới
- `PUT /api/giangvien/:Ma_GV` - Cập nhật giảng viên
- `DELETE /api/giangvien/:Ma_GV` - Xóa giảng viên

### Môn học
- `GET /api/monhoc` - Lấy tất cả môn học
- `GET /api/monhoc/:Ma_MH` - Lấy môn học theo mã
- `POST /api/monhoc` - Thêm môn học mới
- `PUT /api/monhoc/:Ma_MH` - Cập nhật môn học
- `DELETE /api/monhoc/:Ma_MH` - Xóa môn học

### Đăng ký học phần kỳ sau
- `GET /api/dangky/lop-sap-mo` - Danh sách lớp học phần sắp mở kỳ sau
- `POST /api/dangky` - Đăng ký lớp học phần (body: `Ma_SV`, `Ma_LHP`)
  - Tự động chặn đăng ký nếu lớp đã đầy hoặc sinh viên đã đăng ký lớp khác của cùng môn trong học kỳ đó
- `DELETE /api/dangky/:Ma_SV/:Ma_LHP` - Hủy đăng ký lớp học phần

### Báo cáo (Reports)
- `GET /api/report/sv-diem-ck-max` - Sinh viên điểm CK cao nhất
- `GET /api/report/mh-chua-co-lophp` - Môn học chưa có lớp học phần
- `GET /api/report/sv-cntt-chua-dk-csdldata` - SV CNTT chưa đăng ký CSDL
- `GET /api/report/sv-in-lop-sort-desc?Ten_Lop=<tên lớp>` - SV trong lớp sắp xếp
- `GET /api/report/sv-mon-dang-ky/:Ma_SV` - Môn học SV đã đăng ký
- `GET /api/report/gpa-by-hk?Ma_HK=<mã học kỳ>` - GPA theo học kỳ
- `GET /api/report/view-gpa-by-hk?Ma_HK=<mã học kỳ>` - GPA từ view
- `GET /api/report/bangdiem-chitiet/:Ma_SV` - Bảng điểm chi tiết
- `GET /api/report/lhp-con-trong` - Lớp học phần còn chỗ
- `GET /api/report/sv-no-mon?Ma_HK=<mã học kỳ>` - SV nợ môn theo học kỳ
