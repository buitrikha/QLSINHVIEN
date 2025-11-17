const { sql, poolPromise } = require('../db');

// 1. Sinh viên điểm CK cao nhất
exports.sv_diem_ck_max = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT TOP 1 WITH TIES
        sv.Ma_SV, sv.HoDemSV, sv.Ten_SV, mh.Ten_MH, d.Diem_CK
      FROM DIEM d
      JOIN SINHVIEN sv ON d.Ma_SV = sv.Ma_SV
      JOIN LOPHOCPHAN lhp ON d.Ma_LHP = lhp.Ma_LHP
      JOIN MONHOC mh ON lhp.Ma_MH = mh.Ma_MH
      ORDER BY d.Diem_CK DESC
    `);
    res.json(result.recordset);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// 2. Môn học chưa có lớp học phần nào
exports.mh_chua_co_lophp = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT mh.Ma_MH, mh.Ten_MH
      FROM MONHOC mh
      LEFT JOIN LOPHOCPHAN lhp ON mh.Ma_MH = lhp.Ma_MH
      WHERE lhp.Ma_LHP IS NULL
    `);
    res.json(result.recordset);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// 3. Sinh viên CNTT chưa đăng ký môn "Cơ sở dữ liệu"
exports.sv_cntt_chua_dk_csdldata = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT sv.Ma_SV, sv.HoDemSV, sv.Ten_SV
      FROM SINHVIEN sv
      JOIN LOPHANHCHINH lhc ON sv.Ma_Lop = lhc.Ma_Lop
      JOIN KHOA k ON lhc.Ma_Khoa = k.Ma_Khoa
      WHERE k.Ten_Khoa = N'Công nghệ thông tin'
        AND sv.Ma_SV NOT IN (
          SELECT d.Ma_SV
          FROM DIEM d
          JOIN LOPHOCPHAN lhp ON d.Ma_LHP = lhp.Ma_LHP
          JOIN MONHOC mh ON lhp.Ma_MH = mh.Ma_MH
          WHERE mh.Ten_MH = N'Cơ sở dữ liệu'
        )
    `);
    res.json(result.recordset);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// 4. Sinh viên trong lớp theo tên giảm dần
exports.sv_in_lop_sort_desc = async (req, res) => {
  const { Ten_Lop } = req.query;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('Ten_Lop', sql.NVarChar, Ten_Lop)
      .query(`
        SELECT sv.Ma_SV, sv.HoDemSV, sv.Ten_SV, lhc.Ten_Lop
        FROM SINHVIEN sv
        JOIN LOPHANHCHINH lhc ON sv.Ma_Lop = lhc.Ma_Lop
        WHERE lhc.Ten_Lop = @Ten_Lop
        ORDER BY sv.Ten_SV DESC
      `);
    res.json(result.recordset);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// 5. Liệt kê môn học SV đã đăng ký cùng thông tin
exports.sv_mon_dang_ky = async (req, res) => {
  const { Ma_SV } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('Ma_SV', sql.NVarChar, Ma_SV)
      .query(`
        SELECT DISTINCT MH.Ma_MH, MH.Ten_MH, LHP.Ma_LHP, MH.So_Tin_Chi,
          LHP.Phong_Hoc, LHP.Lich_Hoc, GV.Ten_GV, HK.Ten_HK, HK.Ma_HK
        FROM DANGKY DK
        JOIN LOPHOCPHAN LHP ON DK.Ma_LHP = LHP.Ma_LHP
        JOIN MONHOC MH ON LHP.Ma_MH = MH.Ma_MH
        JOIN GIANGVIEN GV ON LHP.Ma_GV = GV.Ma_GV
        JOIN HOCKY HK ON LHP.Ma_HK = HK.Ma_HK
        WHERE DK.Ma_SV = @Ma_SV
        ORDER BY MH.Ten_MH ASC
      `);
    res.json(result.recordset);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// 6. Tính GPA cho sinh viên theo học kỳ cụ thể
exports.gpa_by_hk = async (req, res) => {
  const { Ma_HK } = req.query;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('Ma_HK', sql.NVarChar, Ma_HK)
      .query(`
        SELECT K.Ten_Khoa, LHC.Ten_Lop, SV.Ma_SV,
          (SV.HoDemSV + ' ' + SV.Ten_SV) AS Ho_Ten,
          HK.Ten_HK, SUM(MH.So_Tin_Chi) AS Tong_So_TC,
          CAST(
            SUM(
              (D.Diem_CC * 0.1 + D.Diem_GK * 0.3 + D.Diem_CK * 0.6) * MH.So_Tin_Chi
            ) / SUM(MH.So_Tin_Chi)
          AS DECIMAL(4,2)) AS Diem_GPA
        FROM SINHVIEN SV
        JOIN LOPHANHCHINH LHC ON SV.Ma_Lop = LHC.Ma_Lop
        JOIN KHOA K ON LHC.Ma_Khoa = K.Ma_Khoa
        JOIN DIEM D ON SV.Ma_SV = D.Ma_SV
        JOIN LOPHOCPHAN LHP ON D.Ma_LHP = LHP.Ma_LHP
        JOIN MONHOC MH ON LHP.Ma_MH = MH.Ma_MH
        JOIN HOCKY HK ON LHP.Ma_HK = HK.Ma_HK
        WHERE HK.Ma_HK = @Ma_HK
        GROUP BY K.Ten_Khoa, LHC.Ten_Lop, SV.Ma_SV, SV.HoDemSV, SV.Ten_SV, HK.Ten_HK
        HAVING SUM(MH.So_Tin_Chi) > 0
        ORDER BY K.Ten_Khoa ASC, Diem_GPA DESC
      `);
    res.json(result.recordset);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// 7. Sử dụng view đã tạo để thống kê GPA theo học kỳ
exports.view_gpa_by_hk = async (req, res) => {
  const { Ma_HK } = req.query;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('Ma_HK', sql.NVarChar, Ma_HK)
      .query(`
        SELECT * FROM v_ThongKeGPA_HocKy WHERE Ma_HK = @Ma_HK
        ORDER BY Ten_Khoa ASC, Diem_GPA DESC
      `);
    res.json(result.recordset);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// 8. Truy vấn chi tiết bảng điểm (View)
exports.view_bangdiem_chitiet = async (req, res) => {
  const { Ma_SV } = req.params;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('Ma_SV', sql.NVarChar, Ma_SV)
      .query(`
        SELECT * FROM V_BANGDIEM_CHITIET WHERE Ma_SV = @Ma_SV
      `);
    res.json(result.recordset);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// 9. Truy vấn lớp học phần còn chỗ (View)
exports.view_lhp_con_trong = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT * FROM V_THONGTIN_LOPHOCPHAN WHERE Con_Trong > 0
    `);
    res.json(result.recordset);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// 10. Truy vấn sinh viên nợ môn theo học kỳ (View)
exports.view_sv_no_mon = async (req, res) => {
  const { Ma_HK } = req.query;
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('Ma_HK', sql.NVarChar, Ma_HK)
      .query(`
        SELECT * FROM V_SINHVIEN_NO_MON WHERE Ma_HK = @Ma_HK
      `);
    res.json(result.recordset);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};