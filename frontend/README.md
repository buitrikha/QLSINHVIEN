# Frontend - Hệ thống Quản lý Sinh viên

Frontend React cho hệ thống quản lý sinh viên, giảng viên, môn học và báo cáo.

## Cài đặt

### Bước 1: Cài đặt dependencies
```bash
cd frontend
npm install
```

### Bước 2: Đảm bảo Backend đang chạy
Backend phải chạy tại `http://localhost:5000` (hoặc cập nhật proxy trong `package.json`)

### Bước 3: Chạy ứng dụng
```bash
npm start
```

Ứng dụng sẽ mở tại: `http://localhost:3000`

## Cấu trúc dự án

```
src/
├── api/              # API clients
│   ├── sinhvienApi.js
│   ├── giangvienApi.js
│   ├── monhocApi.js
│   ├── reportApi.js
│   └── dangkyApi.js
├── components/       # React components
│   ├── SinhvienCrud.js
│   ├── GiangvienCrud.js
│   ├── MonhocCrud.js
│   ├── DangkyLophp.js
│   └── ReportCrud.js
├── App.js           # Main app component
└── index.js         # Entry point
```

## Chức năng

### 1. Quản lý Sinh viên
- Xem danh sách sinh viên
- Thêm mới sinh viên
- Cập nhật thông tin sinh viên
- Xóa sinh viên
- Các trường: Mã SV, Họ đệm, Tên, Ngày sinh, SĐT, Email, Tình trạng học tập, Địa chỉ, Mã lớp

### 2. Quản lý Giảng viên
- Xem danh sách giảng viên
- Thêm mới giảng viên
- Cập nhật thông tin giảng viên
- Xóa giảng viên
- Các trường: Mã GV, Tên, SĐT, Ngày sinh, Giới tính, Email, Học vị, Mã bộ môn

### 3. Quản lý Môn học
- Xem danh sách môn học
- Thêm mới môn học
- Cập nhật thông tin môn học
- Xóa môn học
- Các trường: Mã MH, Tên môn học, Số tín chỉ

### 4. Đăng ký lớp học phần kỳ sau
- Xem danh sách lớp sắp mở (từ view `v_Lop_Sap_Mo_Ky_Sau`)
- Nhập mã sinh viên để đăng ký hoặc hủy đăng ký
- Tự động chặn đăng ký khi lớp đã đầy
- Không cho phép đăng ký hai lớp học phần cùng môn trong cùng học kỳ

### 5. Báo cáo và Thống kê
- Sinh viên điểm CK cao nhất
- Môn học chưa có lớp học phần
- SV CNTT chưa đăng ký CSDL
- SV trong lớp sắp xếp giảm dần
- Môn học SV đã đăng ký
- GPA theo học kỳ
- Bảng điểm chi tiết
- Lớp học phần còn chỗ
- SV nợ môn theo học kỳ

## API Endpoints

Frontend giao tiếp với backend qua các endpoints:

- `/api/sinhvien` - CRUD sinh viên
- `/api/giangvien` - CRUD giảng viên
- `/api/monhoc` - CRUD môn học
- `/api/dangky` - Đăng ký/hủy lớp học phần và danh sách lớp sắp mở
- `/api/report/*` - Các báo cáo và thống kê

Proxy được cấu hình trong `package.json` để tự động chuyển hướng API calls đến backend.

## Công nghệ sử dụng

- React 18.3.0
- React DOM 18.3.0
- React Scripts 5.0.1

## Lưu ý

- Đảm bảo backend đang chạy trước khi start frontend
- Nếu backend chạy ở port khác, cập nhật `proxy` trong `package.json`
- Các API calls sử dụng relative paths (ví dụ: `/api/sinhvien`) sẽ tự động được proxy đến backend

