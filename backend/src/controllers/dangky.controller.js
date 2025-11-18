const { sql, poolPromise } = require('../db');

// Đăng ký lớp học phần cho sinh viên
exports.registerClass = async (req, res) => {
  const { Ma_SV, Ma_LHP } = req.body;

  if (!Ma_SV || !Ma_LHP) {
    return res.status(400).json({ error: 'Ma_SV và Ma_LHP là bắt buộc' });
  }

  try {
    const pool = await poolPromise;

    // Thông tin lớp + số lượng đã đăng ký
    const classInfo = await pool.request()
      .input('Ma_LHP', sql.VarChar(10), Ma_LHP)
      .query(`
        SELECT 
          LHP.Ma_LHP,
          LHP.Ma_MH,
          LHP.Ma_HK,
          LHP.SL_Toi_Da,
          MH.Ten_MH,
          ISNULL((
            SELECT COUNT(*) FROM DANGKY DK WHERE DK.Ma_LHP = LHP.Ma_LHP
          ), 0) AS So_Dang_Ky
        FROM LOPHOCPHAN LHP
        JOIN MONHOC MH ON LHP.Ma_MH = MH.Ma_MH
        WHERE LHP.Ma_LHP = @Ma_LHP
      `);

    if (classInfo.recordset.length === 0) {
      return res.status(404).json({ error: 'Không tìm thấy lớp học phần' });
    }

    const lop = classInfo.recordset[0];

    if (lop.So_Dang_Ky >= lop.SL_Toi_Da) {
      return res.status(400).json({ error: 'Lớp đã đầy, không thể đăng ký' });
    }

    // Kiểm tra sinh viên đã đăng ký cùng môn học trong cùng học kỳ chưa
    const duplicated = await pool.request()
      .input('Ma_SV', sql.VarChar(10), Ma_SV)
      .input('Ma_MH', sql.VarChar(10), lop.Ma_MH)
      .input('Ma_HK', sql.VarChar(10), lop.Ma_HK)
      .query(`
        SELECT TOP 1 1
        FROM DANGKY DK
        JOIN LOPHOCPHAN LHP ON DK.Ma_LHP = LHP.Ma_LHP
        WHERE DK.Ma_SV = @Ma_SV
          AND LHP.Ma_MH = @Ma_MH
          AND LHP.Ma_HK = @Ma_HK
      `);

    if (duplicated.recordset.length > 0) {
      return res.status(400).json({
        error: 'Sinh viên đã đăng ký một lớp khác của môn này trong cùng học kỳ'
      });
    }

    await pool.request()
      .input('Ma_SV', sql.VarChar(10), Ma_SV)
      .input('Ma_LHP', sql.VarChar(10), Ma_LHP)
      .query('INSERT INTO DANGKY (Ma_SV, Ma_LHP) VALUES (@Ma_SV, @Ma_LHP)');

    res.status(201).json({
      message: 'Đăng ký thành công',
      lop: {
        Ma_LHP: lop.Ma_LHP,
        Ten_MH: lop.Ten_MH
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Hủy đăng ký lớp học phần
exports.unregisterClass = async (req, res) => {
  const { Ma_SV, Ma_LHP } = req.params;

  if (!Ma_SV || !Ma_LHP) {
    return res.status(400).json({ error: 'Thiếu Ma_SV hoặc Ma_LHP' });
  }

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('Ma_SV', sql.VarChar(10), Ma_SV)
      .input('Ma_LHP', sql.VarChar(10), Ma_LHP)
      .query('DELETE FROM DANGKY WHERE Ma_SV = @Ma_SV AND Ma_LHP = @Ma_LHP');

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: 'Không tìm thấy đăng ký để hủy' });
    }

    res.json({ message: 'Đã hủy đăng ký lớp học phần' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Danh sách lớp học phần sắp mở kỳ sau
exports.getUpcomingClasses = async (_req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT 
        Ma_LHP,
        Ma_MH,
        Ten_MH,
        So_Tin_Chi,
        Lich_Hoc,
        Ten_GV,
        Ma_HK,
        Ten_HK,
        Ngay_Bat_Dau,
        SL_Toi_Da,
        Da_Dang_Ky,
        Con_Lai
      FROM v_Lop_Sap_Mo_Ky_Sau
      ORDER BY Ngay_Bat_Dau ASC, Ten_MH ASC
    `);

    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

