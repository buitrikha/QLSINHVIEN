--- Thêm dữ liệu vào bảng SINHVIEN
INSERT INTO SINHVIEN (
    Ma_SV, 
    HoDemSV, 
    Ten_SV, 
    Ngay_Sinh_SV, 
    SDT_SV, 
    Email_SV, 
    TT_Hoctap, 
    Dia_Chi, 
    Ma_Lop
)
VALUES (
    'SV00999',              -- Mã SV (Khóa chính)
    N'Nguyễn Văn',          -- Họ đệm
    N'Hùng',                -- Tên
    '2005-08-15',           -- Ngày sinh (YYYY-MM-DD)
    '0912345678',           -- SĐT
    'hungnv@student.edu.vn',-- Email
    N'Đang học',            -- Tình trạng
    N'Cầu Giấy, Hà Nội',-- Địa chỉ
    'LHC01'                 -- Mã lớp (Phải có trong bảng LOPHANHCHINH)
);
GO
--- Cập nhật thông tin sinh viên vừa thêm
UPDATE SINHVIEN
SET 
    Dia_Chi = N'456 Kim Mã, Hà Nội',
    SDT_SV = '0999888777',
    Email_SV = 'hung_new@student.edu.vn'
WHERE Ma_SV = 'SV00999';
GO

--- Thêm dữ liệu vào bảng GIANGVIEN
INSERT INTO GIANGVIEN (
    Ma_GV, 
    Ten_GV, 
    SDT_GV, 
    Ngay_Sinh_GV, 
    Gioi_Tinh_GV, 
    Email_GV, 
    Hoc_Vi, 
    Ma_BM
)
VALUES (
    'GV00999',              -- Mã GV (Khóa chính)
    N'Trần Thị Thu',        -- Tên Giảng viên
    '0909123456',           -- Số điện thoại
    '1985-05-20',           -- Ngày sinh (YYYY-MM-DD)
    N'Nữ',                  -- Giới tính
    'thutt@school.edu.vn',  -- Email
    N'Tiến sĩ',             -- Học vị
    'BM01'                  -- Mã Bộ môn (Phải tồn tại trong bảng BOMON)
);
--- Cập nhật thông tin giảng viên 
UPDATE GIANGVIEN
SET 
    Hoc_Vi = N'Phó Giáo sư',    -- Cập nhật học vị mới
    SDT_GV = '0911222333',      -- Cập nhật số điện thoại mới
    Email_GV = 'thutt_new@school.edu.vn' -- Cập nhật email (nếu cần)
WHERE Ma_GV = 'GV00999';

--- Truy vấn để tìm sinh viên có điểm cuối kỳ cao nhất
SELECT TOP 1 WITH TIES
    sv.Ma_SV,
    sv.HoDemSV,
    sv.Ten_SV,
    mh.Ten_MH, -- Lấy thêm tên môn học để biết điểm 10 ở môn nào
    d.Diem_CK
FROM 
    DIEM d
JOIN 
    SINHVIEN sv ON d.Ma_SV = sv.Ma_SV
JOIN 
    LOPHOCPHAN lhp ON d.Ma_LHP = lhp.Ma_LHP
JOIN 
    MONHOC mh ON lhp.Ma_MH = mh.Ma_MH
ORDER BY 
    d.Diem_CK DESC;
GO
--- Truy vấn để tìm các môn học chưa có lớp học phần nào
SELECT 
    mh.Ma_MH, 
    mh.Ten_MH
FROM 
    MONHOC mh
LEFT JOIN 
    LOPHOCPHAN lhp ON mh.Ma_MH = lhp.Ma_MH
WHERE 
    lhp.Ma_LHP IS NULL;
    GO
--- Truy vấn để tìm sinh viên thuộc khoa nào đó chưa đăng ký môn nào đó
SELECT 
    sv.Ma_SV, 
    sv.HoDemSV, 
    sv.Ten_SV
FROM 
    SINHVIEN sv
JOIN 
    LOPHANHCHINH lhc ON sv.Ma_Lop = lhc.Ma_Lop
JOIN 
    KHOA k ON lhc.Ma_Khoa = k.Ma_Khoa
WHERE 
    k.Ten_Khoa = N'Công nghệ thông tin'
    AND sv.Ma_SV NOT IN (
        -- Bắt đầu truy vấn con --
        SELECT d.Ma_SV
        FROM DIEM d
        JOIN LOPHOCPHAN lhp ON d.Ma_LHP = lhp.Ma_LHP
        JOIN MONHOC mh ON lhp.Ma_MH = mh.Ma_MH
        WHERE mh.Ten_MH = N'Cơ sở dữ liệu'
        -- Kết thúc truy vấn con --
    );
GO
--- Truy vấn để liệt kê sinh viên trong lớp nào đó sắp xếp theo tên giảm dần
SELECT 
    sv.Ma_SV, 
    sv.HoDemSV, 
    sv.Ten_SV, 
    lhc.Ten_Lop 
FROM 
    SINHVIEN sv
JOIN 
    LOPHANHCHINH lhc ON sv.Ma_Lop = lhc.Ma_Lop
WHERE 
    lhc.Ten_Lop = N'CNTT K18-1';
ORDER BY sv.Ten_SV DESC;
GO
--- Truy vấn để liệt kê tất cả môn học mà sinh viên nào đó đã đăng ký cùng với thông tin chi tiết
SELECT DISTINCT
    MH.Ma_MH AS [Mã Môn],
    MH.Ten_MH AS [Tên Môn Học],
    LHP.Ma_LHP AS [Mã Lớp HP],
    MH.So_Tin_Chi AS [Số TC],
    LHP.Phong_Hoc AS [Phòng Học],
    LHP.Lich_Hoc AS [Lịch Học], 
    GV.Ten_GV AS [Giảng Viên],
    HK.Ten_HK AS [Học Kỳ],
    HK.Ma_HK AS [MÃ HỌC KỲ]
FROM 
    DANGKY DK
    -- 1. Từ Đăng ký nối sang Lớp học phần để lấy thông tin lớp, lịch học
    JOIN LOPHOCPHAN LHP ON DK.Ma_LHP = LHP.Ma_LHP
    -- 2. Từ Lớp học phần nối sang Môn học để lấy tên môn
    JOIN MONHOC MH ON LHP.Ma_MH = MH.Ma_MH
    -- 3. Từ Lớp học phần nối sang Giảng viên để biết ai dạy
    JOIN GIANGVIEN GV ON LHP.Ma_GV = GV.Ma_GV
    -- 4. Nối sang Học kỳ để lọc theo kỳ học cụ thể
    JOIN HOCKY HK ON LHP.Ma_HK = HK.Ma_HK
WHERE 
    DK.Ma_SV = 'SV00006'        
ORDER BY 
    MH.Ten_MH ASC; 
GO
--- Truy vấn để tính GPA cho sinh viên theo học kỳ cụ thể
SELECT 
    K.Ten_Khoa,
    LHC.Ten_Lop,
    SV.Ma_SV,
    (SV.HoDemSV + ' ' + SV.Ten_SV) AS Ho_Ten,
    HK.Ten_HK,
    -- Tính tổng số tín chỉ đã học trong kỳ (để tham khảo)
    SUM(MH.So_Tin_Chi) AS Tong_So_TC,
    -- Công thức tính GPA (Trọng số tín chỉ)
    CAST(
        SUM(
            (D.Diem_CC * 0.1 + D.Diem_GK * 0.3 + D.Diem_CK * 0.6) * MH.So_Tin_Chi
        ) 
        / SUM(MH.So_Tin_Chi) 
    AS DECIMAL(4, 2)) AS Diem_GPA
FROM 
    SINHVIEN SV
    -- 1. Để lấy thông tin Khoa
    JOIN LOPHANHCHINH LHC ON SV.Ma_Lop = LHC.Ma_Lop
    JOIN KHOA K ON LHC.Ma_Khoa = K.Ma_Khoa
    -- 2. Để lấy Điểm
    JOIN DIEM D ON SV.Ma_SV = D.Ma_SV
    -- 3. Để lấy thông tin Môn học (Tín chỉ) và Học kỳ
    JOIN LOPHOCPHAN LHP ON D.Ma_LHP = LHP.Ma_LHP
    JOIN MONHOC MH ON LHP.Ma_MH = MH.Ma_MH
    JOIN HOCKY HK ON LHP.Ma_HK = HK.Ma_HK
WHERE 
    HK.Ma_HK = 'HK01'       -- Mã Học Kỳ cần tính
   
GROUP BY 
    K.Ten_Khoa, LHC.Ten_Lop, SV.Ma_SV, SV.HoDemSV, SV.Ten_SV, HK.Ten_HK
HAVING 
    SUM(MH.So_Tin_Chi) > 0      -- Chỉ tính những bạn đã có môn học/có điểm
ORDER BY 
    K.Ten_Khoa ASC,            
    Diem_GPA DESC;
    GO
    --- Sử dụng view đã tạo để truy vấn thống kê GPA theo học kỳ
SELECT * FROM v_ThongKeGPA_HocKy
WHERE Ma_HK = 'HK01'  -- Lọc học kỳ tại đây
ORDER BY 
    Ten_Khoa ASC, 
    Diem_GPA DESC;
    GO
--- Sử dụng view đã tạo để truy vấn chi tiết bảng điểm của sinh viên
    SELECT * FROM V_BANGDIEM_CHITIET WHERE Ma_SV = 'SV00011';
    GO
--- Sử dụng view đã tạo để truy vấn các lớp học phần còn chỗ trống
SELECT * FROM V_THONGTIN_LOPHOCPHAN WHERE Con_Trong > 0;
GO
--- Sử dụng view đã tạo để truy vấn sinh viên nợ môn theo học kỳ
SELECT * FROM V_SINHVIEN_NO_MON WHERE Ma_HK='HK05';
GO
--- Thêm đăng ký học phần cho sinh viên
INSERT INTO DANGKY (Ma_SV, Ma_LHP)
VALUES ('SV00001', 'LHP0301');
GO
--- Xóa đăng ký học phần cho sinh viên
DELETE FROM DANGKY
WHERE Ma_SV = 'SV00001' AND Ma_LHP = 'LHP0301';
GO