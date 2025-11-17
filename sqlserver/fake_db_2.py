import pyodbc
from faker import Faker
import random
from datetime import datetime, timedelta

# Khởi tạo Faker với locale tiếng Việt
fake = Faker('vi_VN')

# Kết nối SQL Server
conn = pyodbc.connect(
    'DRIVER={ODBC Driver 17 for SQL Server};'
    'SERVER=MSI\\SQLEXPRESS;'
    'DATABASE=QLSINHVIEN1;'
    'Trusted_Connection=yes;'  
    'TrustServerCertificate=yes;'
)
cursor = conn.cursor()

print("Bắt đầu tạo dữ liệu fake...")

# 1. Tạo KHOA (10 khoa)
print("Đang tạo dữ liệu KHOA...")
khoa_list = []
khoa_names = [
    'Công nghệ thông tin', 'Kinh tế', 'Kỹ thuật', 'Ngoại ngữ', 
    'Khoa học tự nhiên', 'Y Dược', 'Luật', 'Sư phạm',
    'Điện - Điện tử', 'Xây dựng'
]

for i in range(10):
    ma_khoa = f'K{i+1:02d}'
    khoa_list.append(ma_khoa)
    cursor.execute("""
        INSERT INTO KHOA (Ma_Khoa, Ten_Khoa, Nam_TL, Phong_Khoa)
        VALUES (?, ?, ?, ?)
    """, (ma_khoa, khoa_names[i], random.randint(1950, 2000), f'P{i+1}'))

conn.commit()

# 2. Tạo BOMON (30 bộ môn) - Gán đúng khoa
print("Đang tạo dữ liệu BOMON...")
bomon_list = []

# Danh sách bộ môn theo khoa (Ten_BM, Phong_BM, Email_BM, Ma_Khoa)
bomon_data = [
    # Khoa Công nghệ thông tin (K01)
    ('Lập trình', 'P101', 'laptrinh@ptit.edu.vn', 'K01'),
    ('Mạng máy tính', 'P102', 'mmt@ptit.edu.vn', 'K01'),
    ('Trí tuệ nhân tạo', 'P103', 'AI@ptit.edu.vn', 'K01'),
    ('An toàn thông tin', 'P104', 'Attt@ptit.edu.vn', 'K01'),
    
    # Khoa Kinh tế (K02)
    ('Kế toán', 'P201', 'ketoan@ptit.edu.vn', 'K02'),
    ('Tài chính', 'P202', 'taichinh@ptit.edu.vn', 'K02'),
    ('Marketing', 'P203', 'marketing@ptit.edu.vn', 'K02'),
    ('Quản trị kinh doanh', 'P204', 'qtkinhdoanh@ptit.edu.vn', 'K02'),
    
    # Khoa Kỹ thuật (K03)
    ('Cơ khí', 'P301', 'cokhi@ptit.edu.vn', 'K03'),
    ('Tự động hóa', 'P302', 'tudonghoa@ptit.edu.vn', 'K03'),
    ('Điện tử viễn thông', 'P303', 'dtvt@ptit.edu.vn', 'K03'),
    ('Kỹ thuật xây dựng', 'P304', 'xaydung@ptit.edu.vn', 'K03'),
    
    # Khoa Ngoại ngữ (K04)
    ('Tiếng Anh', 'P401', 'tienganh@ptit.edu.vn', 'K04'),
    ('Tiếng Trung', 'P402', 'tiengtrung@ptit.edu.vn', 'K04'),
    ('Tiếng Nhật', 'P403', 'tiengnhat@ptit.edu.vn', 'K04'),
    ('Tiếng Hàn', 'P404', 'tienghan@ptit.edu.vn', 'K04'),
    
    # Khoa Khoa học tự nhiên (K05)
    ('Toán học', 'P501', 'toanhoc@ptit.edu.vn', 'K05'),
    ('Vật lý', 'P502', 'vatly@ptit.edu.vn', 'K05'),
    ('Hóa học', 'P503', 'hoahoc@ptit.edu.vn', 'K05'),
    ('Sinh học', 'P504', 'sinhhoc@ptit.edu.vn', 'K05'),
    
    # Khoa Y Dược (K06)
    ('Y khoa', 'P601', 'y1@ptit.edu.vn', 'K06'),
    ('Dược học', 'P602', 'duoc@ptit.edu.vn', 'K06'),
    ('Điều dưỡng', 'P603', 'dieuuong@ptit.edu.vn', 'K06'),
    ('Y tế công cộng', 'P604', 'yte@ptit.edu.vn', 'K06'),
    
    # Khoa Luật (K07)
    ('Luật dân sự', 'P701', 'luat1@ptit.edu.vn', 'K07'),
    ('Luật hình sự', 'P702', 'luat2@ptit.edu.vn', 'K07'),
    ('Luật kinh tế', 'P703', 'luat3@ptit.edu.vn', 'K07'),
    ('Luật quốc tế', 'P704', 'luat4@ptit.edu.vn', 'K07'),
    
    # Khoa Sư phạm (K08)
    ('Sư phạm toán', 'P801', 'supham1@ptit.edu.vn', 'K08'),
    ('Sư phạm văn', 'P802', 'supham2@ptit.edu.vn', 'K08'),
]

for i, (ten_bm, phong_bm, email_bm, ma_khoa) in enumerate(bomon_data):
    ma_bm = f'BM{i+1:02d}'
    bomon_list.append(ma_bm)
    cursor.execute("""
        INSERT INTO BOMON (Ma_BM, Ten_BM, Phong_BM, Email_BM, Ma_Khoa)
        VALUES (?, ?, ?, ?, ?)
    """, (ma_bm, ten_bm, phong_bm, email_bm, ma_khoa))

conn.commit()

# 3. Tạo LOPHANHCHINH (50 lớp) - Tạo trước GIANGVIEN vì không phụ thuộc
print("Đang tạo dữ liệu LOPHANHCHINH...")
lhc_list = []

# Tạo danh sách tên lớp unique
nganh_list = ["CNTT", "KTPM", "KHMT", "HTTT", "TMDT", "KT", "QTKD", "NN"]
khoa_list_year = list(range(18, 24))  # K18 đến K23

# Tạo tên lớp unique bằng cách kết hợp ngành + khóa + số thứ tự
lop_counter = {}
for i in range(50):
    ma_lop = f'LHC{i+1:02d}'
    lhc_list.append(ma_lop)
    
    # Tạo tên lớp unique
    nganh = nganh_list[i % len(nganh_list)]
    khoa = khoa_list_year[(i // len(nganh_list)) % len(khoa_list_year)]
    
    # Đếm số lớp cùng ngành và khóa để tạo số thứ tự
    key = f"{nganh}_K{khoa}"
    if key not in lop_counter:
        lop_counter[key] = 1
    else:
        lop_counter[key] += 1
    
    ten_lop = f'{nganh} K{khoa}-{lop_counter[key]}'
    
    cursor.execute("""
        INSERT INTO LOPHANHCHINH (Ma_Lop, Ten_Lop, Si_So, Nien_Khoa, Ma_Khoa)
        VALUES (?, ?, ?, ?, ?)
    """, (
        ma_lop,
        ten_lop,
        random.randint(30, 50),
        f'20{khoa}-20{khoa+4}',
        random.choice(khoa_list)
    ))

conn.commit()

# 4. Tạo GIANGVIEN (200 giảng viên)
print("Đang tạo dữ liệu GIANGVIEN...")
gv_list = []
hoc_vi = ['Cử nhân', 'Thạc sĩ', 'Tiến sĩ', 'Phó Giáo sư', 'Giáo sư']

for i in range(200):
    ma_gv = f'GV{i+1:04d}'
    gv_list.append(ma_gv)
    cursor.execute("""
        INSERT INTO GIANGVIEN (Ma_GV, Ten_GV, SDT_GV, Ngay_Sinh_GV, Gioi_Tinh_GV, Email_GV, Hoc_Vi, Ma_BM)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        ma_gv,
        fake.name(),
        f'09{random.randint(10000000, 99999999)}',  # Tạo SDT unique
        fake.date_of_birth(minimum_age=30, maximum_age=65),
        random.choice(['Nam', 'Nữ']),
        f'gv{i+1}@ptit.edu.vn',
        random.choice(hoc_vi),
        random.choice(bomon_list)
    ))

conn.commit()

# 5. Tạo MONHOC (110 môn học) - Gán đúng bộ môn
print("Đang tạo dữ liệu MONHOC...")
monhoc_list = []

mon_hoc_data = [
    # Lập trình (BM01)
    ('Lập trình C', 45, 30, 3, 'BM01'),
    ('Lập trình Java', 45, 30, 3, 'BM01'),
    ('Lập trình Hướng đối tượng', 45, 30, 3, 'BM01'),
    ('Lập trình Python', 45, 30, 3, 'BM01'),
    ('Lập trình Web', 30, 45, 3, 'BM01'),
    ('Lập trình di động', 30, 45, 3, 'BM01'),
    ('Lập trình .NET', 45, 30, 3, 'BM01'),
    ('Lập trình hệ thống', 45, 30, 3, 'BM01'),
    ('Lập trình nhúng', 30, 30, 3, 'BM01'),
    ('Cơ sở dữ liệu', 45, 30, 3, 'BM01'),
    ('Hệ quản trị Cơ sở dữ liệu', 30, 30, 3, 'BM01'),
    ('Công nghệ phần mềm', 45, 15, 3, 'BM01'),
    ('Kiểm thử phần mềm', 30, 30, 3, 'BM01'),
    ('Quản lý dự án phần mềm', 45, 0, 3, 'BM01'),
    ('Phân tích & Thiết kế hệ thống', 45, 15, 3, 'BM01'),
    ('Phân tích & Thiết kế hướng đối tượng', 45, 15, 3, 'BM01'),
    ('Các mẫu thiết kế', 45, 15, 3, 'BM01'),
    ('Tương tác Người – Máy', 30, 30, 3, 'BM01'),
    ('Cấu trúc dữ liệu', 45, 30, 3, 'BM01'),
    ('Hệ điều hành', 45, 15, 3, 'BM01'),
    ('Kiến trúc máy tính', 45, 15, 3, 'BM01'),
    
    # Mạng máy tính (BM02)
    ('Mạng máy tính', 45, 15, 3, 'BM02'),
    ('Quản trị mạng', 30, 30, 3, 'BM02'),
    ('Quản trị hệ thống', 30, 30, 3, 'BM02'),
    ('Điện toán đám mây', 45, 15, 3, 'BM02'),
    ('Điện toán song song & Phân tán', 45, 15, 3, 'BM02'),
    
    # Trí tuệ nhân tạo (BM03)
    ('Trí tuệ nhân tạo', 45, 15, 3, 'BM03'),
    ('Học máy', 45, 30, 4, 'BM03'),
    ('Khai phá dữ liệu', 45, 30, 3, 'BM03'),
    ('Xử lý ngôn ngữ tự nhiên', 45, 30, 3, 'BM03'),
    ('Thị giác máy tính', 45, 30, 4, 'BM03'),
    ('Big Data', 45, 30, 3, 'BM03'),
    
    # An toàn thông tin (BM04)
    ('An toàn thông tin', 45, 15, 3, 'BM04'),
    ('Mật mã học', 45, 15, 3, 'BM04'),
    ('An ninh mạng', 30, 30, 3, 'BM04'),
    
    # Kế toán (BM05)
    ('Nguyên lý Kế toán', 45, 15, 3, 'BM05'),
    ('Kế toán tài chính', 45, 15, 3, 'BM05'),
    ('Kế toán quản trị', 45, 15, 3, 'BM05'),
    ('Kinh tế vĩ mô', 45, 0, 3, 'BM05'),
    ('Kinh tế vi mô', 45, 0, 3, 'BM05'),
    ('Kinh tế chính trị Mác-Lênin', 30, 0, 2, 'BM05'),
    
    # Tài chính (BM06)
    ('Tài chính doanh nghiệp', 45, 0, 3, 'BM06'),
    ('Quản trị tài chính', 45, 0, 3, 'BM06'),
    ('Quản trị rủi ro', 45, 0, 3, 'BM06'),
    
    # Marketing (BM07)
    ('Marketing căn bản', 45, 0, 3, 'BM07'),
    ('Marketing trực tuyến', 45, 0, 3, 'BM07'),
    ('Hành vi người tiêu dùng', 45, 0, 3, 'BM07'),
    
    # Quản trị kinh doanh (BM08)
    ('Quản trị học', 45, 0, 3, 'BM08'),
    ('Quản trị nhân sự', 45, 0, 3, 'BM08'),
    ('Quản trị chiến lược', 45, 0, 3, 'BM08'),
    ('Quản trị vận hành', 45, 0, 3, 'BM08'),
    ('Logistics và Quản lý chuỗi cung ứng', 45, 0, 3, 'BM08'),
    
    # Cơ khí (BM09)
    ('Cơ học kỹ thuật', 45, 15, 3, 'BM09'),
    ('Vẽ kỹ thuật', 30, 30, 3, 'BM09'),
    ('Sức bền vật liệu', 45, 15, 3, 'BM09'),
    
    # Tự động hóa (BM10)
    ('Lý thuyết điều khiển tự động', 45, 15, 3, 'BM10'),
    ('PLC & SCADA', 30, 30, 3, 'BM10'),
    
    # Điện tử viễn thông (BM11)
    ('Kỹ thuật điện', 45, 15, 3, 'BM11'),
    ('Điện tử cơ bản', 45, 30, 3, 'BM11'),
    ('Kỹ thuật số', 45, 30, 3, 'BM11'),
    ('Vi xử lý & Vi điều khiển', 30, 30, 3, 'BM11'),
    ('Tín hiệu và Hệ thống', 45, 15, 3, 'BM11'),
    ('Xử lý tín hiệu số', 45, 15, 3, 'BM11'),
    ('Thông tin vô tuyến', 45, 15, 3, 'BM11'),
    ('Thông tin quang', 45, 15, 3, 'BM11'),
    
    # Kỹ thuật xây dựng (BM12)
    ('Kỹ thuật thi công', 45, 15, 3, 'BM12'),
    ('Cơ học đất', 45, 15, 3, 'BM12'),
    
    # Tiếng Anh (BM13)
    ('Tiếng Anh 1', 45, 0, 3, 'BM13'),
    ('Tiếng Anh 2', 45, 0, 3, 'BM13'),
    ('Tiếng Anh 3', 45, 0, 3, 'BM13'),
    ('Tiếng Anh 4', 45, 0, 3, 'BM13'),
    ('Tiếng Anh chuyên ngành', 45, 0, 3, 'BM13'),
    
    # Tiếng Trung (BM14)
    ('Tiếng Trung 1', 45, 0, 3, 'BM14'),
    ('Tiếng Trung 2', 45, 0, 3, 'BM14'),
    
    # Tiếng Nhật (BM15)
    ('Tiếng Nhật 1', 45, 0, 3, 'BM15'),
    ('Tiếng Nhật 2', 45, 0, 3, 'BM15'),
    
    # Tiếng Hàn (BM16)
    ('Tiếng Hàn 1', 45, 0, 3, 'BM16'),
    ('Tiếng Hàn 2', 45, 0, 3, 'BM16'),
    
    # Toán học (BM17)
    ('Toán cao cấp 1', 45, 15, 3, 'BM17'),
    ('Toán cao cấp 2', 45, 15, 3, 'BM17'),
    ('Toán cao cấp 3', 45, 15, 3, 'BM17'),
    ('Toán rời rạc', 45, 0, 3, 'BM17'),
    ('Xác suất thống kê', 45, 15, 3, 'BM17'),
    ('Đại số tuyến tính', 45, 0, 3, 'BM17'),
    ('Phương pháp tính', 45, 15, 3, 'BM17'),
    ('Lý thuyết đồ thị', 45, 0, 3, 'BM17'),
    ('Lý thuyết thông tin', 45, 0, 3, 'BM17'),
    ('Tối ưu hóa', 45, 15, 3, 'BM17'),
    ('Logic học', 45, 0, 3, 'BM17'),
    ('Triết học Mác-Lênin', 45, 0, 3, 'BM17'),
    ('Tư tưởng Hồ Chí Minh', 30, 0, 2, 'BM17'),
    ('Đường lối Đảng Cộng sản Việt Nam', 30, 0, 2, 'BM17'),
    ('Chủ nghĩa xã hội khoa học', 30, 0, 2, 'BM17'),
    ('Lịch sử Đảng Cộng sản Việt Nam', 30, 0, 2, 'BM17'),
    ('Phương pháp nghiên cứu khoa học', 30, 15, 2, 'BM17'),
    
    # Vật lý (BM18)
    ('Vật lý đại cương 1', 45, 15, 3, 'BM18'),
    ('Vật lý đại cương 2', 45, 15, 3, 'BM18'),
    
    # Hóa học (BM19)
    ('Hóa học đại cương', 45, 15, 3, 'BM19'),
    ('Hóa học hữu cơ', 45, 30, 3, 'BM19'),
    
    # Sinh học (BM20)
    ('Sinh học đại cương', 45, 15, 3, 'BM20'),
    ('Sinh lý học', 45, 15, 3, 'BM20'),
    
    # Luật (BM25)
    ('Pháp luật đại cương', 30, 0, 2, 'BM25'),
    
    # Sư phạm (BM29)
    ('Tâm lý học đại cương', 30, 0, 2, 'BM29'),
    ('Xã hội học đại cương', 30, 0, 2, 'BM29'),
    ('Giáo dục thể chất 1', 0, 30, 1, 'BM29'),
    ('Giáo dục thể chất 2', 0, 30, 1, 'BM29'),
]

for i, (ten_mh, so_tiet_lt, so_tiet_th, so_tin_chi, ma_bm) in enumerate(mon_hoc_data):
    ma_mh = f'MH{i+1:03d}'
    monhoc_list.append(ma_mh)
    cursor.execute("""
        INSERT INTO MONHOC (Ma_MH, Ten_MH, So_Tiet_LT, So_Tiet_TH, So_Tin_Chi, Ma_BM)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (ma_mh, ten_mh, so_tiet_lt, so_tiet_th, so_tin_chi, ma_bm))

conn.commit()

dia_chi_data = {
    "Hà Nội": ["Ba Đình", "Hoàn Kiếm", "Tây Hồ", "Long Biên", "Cầu Giấy", "Đống Đa", "Hai Bà Trưng", "Hoàng Mai", "Thanh Xuân", "Sóc Sơn", "Đông Anh", "Gia Lâm", "Nam Từ Liêm"],
    "Hồ Chí Minh": ["Quận 1", "Quận 3", "Quận 4", "Quận 5", "Quận 6", "Quận 7", "Quận 8", "Quận 10", "Bình Thạnh", "Gò Vấp", "Phú Nhuận", "Tân Bình", "Tân Phú", "Bình Tân", "Thủ Đức"],
    "Đà Nẵng": ["Hải Châu", "Thanh Khê", "Sơn Trà", "Ngũ Hành Sơn", "Liên Chiểu", "Cẩm Lệ", "Hòa Vang"],
    "Hải Phòng": ["Hồng Bàng", "Ngô Quyền", "Lê Chân", "Hải An", "Kiến An", "Đồ Sơn", "Dương Kinh"],
    "Cần Thơ": ["Ninh Kiều", "Bình Thủy", "Cái Răng", "Ô Môn", "Thốt Nốt"],
    "Nghệ An": ["Vinh", "Cửa Lò", "Thái Hòa", "Diễn Châu", "Quỳnh Lưu", "Yên Thành"],
    "Thanh Hóa": ["Thanh Hóa", "Sầm Sơn", "Bỉm Sơn", "Hoằng Hóa", "Quảng Xương"]
}

# --- 2. Code tạo dữ liệu ---
print("Đang tạo dữ liệu SINHVIEN...")
sv_list = []
for i in range(1000):
    ma_sv = f'SV{i+1:05d}'
    sv_list.append(ma_sv)
    # Tách họ tên
    full_name_str = fake.name()
    ho_ten = full_name_str.split()
    # --- XỬ LÝ ĐỊA CHỈ MỚI TẠI ĐÂY ---
    # Chọn ngẫu nhiên một Thành phố (key)
    thanh_pho = random.choice(list(dia_chi_data.keys()))
    # Chọn ngẫu nhiên một Quận/Huyện thuộc thành phố đó (value)
    quan_huyen = random.choice(dia_chi_data[thanh_pho])
    # Tạo string theo định dạng mong muốn
    dia_chi_cu_the = f"{quan_huyen} - {thanh_pho}" 
    # ---------------------------------
    cursor.execute("""
        INSERT INTO SINHVIEN (Ma_SV, HoDemSV, Ten_SV, Ngay_Sinh_SV, SDT_SV, Email_SV, TT_Hoctap, Dia_Chi, Ma_Lop, Gioi_tinh_SV)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        ma_sv,
        ' '.join(ho_ten[:-1]) if len(ho_ten) > 1 else ho_ten[0], # Fix lỗi nếu tên chỉ có 1 từ
        ho_ten[-1],
        fake.date_of_birth(minimum_age=18, maximum_age=25),
        f'08{random.randint(10000000, 99999999)}',
        f'sv{i+1}@student.ptit.edu.vn',
        random.choice(['Đang học', 'Bảo lưu', 'Tốt nghiệp']),
        dia_chi_cu_the,  # Sử dụng biến địa chỉ mới
        random.choice(lhc_list),
        random.choice(['Nam', 'Nữ'])
    ))
conn.commit()

# 7. Tạo HOCKY (10 học kỳ)
print("Đang tạo dữ liệu HOCKY...")
hk_list = []
for i in range(10):
    ma_hk = f'HK{i+1:02d}'
    hk_list.append(ma_hk)
    nam = 2020 + i // 2
    ky = (i % 2) + 1
    cursor.execute("""
        INSERT INTO HOCKY (Ma_HK, Ten_HK, Nam_Hoc, Ky_Trong_Nam, Ngay_Bat_Dau, Ngay_Ket_Thuc)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        ma_hk,
        f'Học kỳ {ky} năm học {nam}-{nam+1}',
        f'{nam}-{nam+1}',
        ky,
        datetime(nam, 9 if ky == 1 else 2, 1),
        datetime(nam+1 if ky == 1 else nam, 1 if ky == 1 else 6, 15)
    ))

conn.commit()

# 8. Tạo LOPHOCPHAN (300 lớp học phần)
print("Đang tạo dữ liệu LOPHOCPHAN...")
lhp_list = []
phong_hoc = ['A101', 'A102', 'B201', 'B202', 'C301', 'C302', 'D401', 'D402']
for i in range(300):
    ma_lhp = f'LHP{i+1:04d}'
    lhp_list.append(ma_lhp)
    cursor.execute("""
        INSERT INTO LOPHOCPHAN (Ma_LHP, SL_Toi_Da, Phong_Hoc, Lich_Hoc, Ma_MH, Ma_HK, Ma_GV)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (
        ma_lhp,
        random.randint(40, 60),
        random.choice(phong_hoc),
        f'Thứ {random.randint(2, 7)}, tiết {random.randint(1, 10)}-{random.randint(11, 12)}',
        random.choice(monhoc_list),
        random.choice(hk_list),
        random.choice(gv_list)
    ))

conn.commit()

# 9. Tạo DANGKY (2000 bản ghi đăng ký)
print("Đang tạo dữ liệu DANGKY...")
dangky_set = set()
while len(dangky_set) < 2000:
    sv = random.choice(sv_list)
    lhp = random.choice(lhp_list)
    dangky_set.add((sv, lhp))

for sv, lhp in dangky_set:
    cursor.execute("""
        INSERT INTO DANGKY (Ma_SV, Ma_LHP)
        VALUES (?, ?)
    """, (sv, lhp))

conn.commit()

# 10. Tạo DIEM (1500 bản ghi điểm)
print("Đang tạo dữ liệu DIEM...")
diem_list = random.sample(list(dangky_set), 1500)
for sv, lhp in diem_list:
    cursor.execute("""
        INSERT INTO DIEM (Ma_SV, Ma_LHP, Diem_CC, Diem_GK, Diem_CK)
        VALUES (?, ?, ?, ?, ?)
    """, (
        sv,
        lhp,
        round(random.uniform(0, 10), 1),
        round(random.uniform(0, 10), 1),
        round(random.uniform(0, 10), 1)
    ))

conn.commit()

# Đóng kết nối
cursor.close()
conn.close()

print("✅ Hoàn thành! Đã tạo:")
print("- 10 Khoa")
print("- 30 Bộ môn")
print("- 200 Giảng viên")
print("- 110 Môn học")
print("- 50 Lớp hành chính")
print("- 1000 Sinh viên")
print("- 10 Học kỳ")
print("- 300 Lớp học phần")
print("- 2000 Đăng ký")
print("- 1500 Điểm")