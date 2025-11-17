const { sql, poolPromise } = require('../db');

// Lấy toàn bộ giảng viên
exports.getAll = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM GIANGVIEN');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('Ma_GV', sql.NVarChar, req.params.Ma_GV)
      .query('SELECT * FROM GIANGVIEN WHERE Ma_GV=@Ma_GV');
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const { Ma_GV, Ten_GV, SDT_GV, Ngay_Sinh_GV, Gioi_Tinh_GV, Email_GV, Hoc_Vi, Ma_BM } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('Ma_GV', sql.NVarChar, Ma_GV)
      .input('Ten_GV', sql.NVarChar, Ten_GV)
      .input('SDT_GV', sql.NVarChar, SDT_GV)
      .input('Ngay_Sinh_GV', sql.Date, Ngay_Sinh_GV)
      .input('Gioi_Tinh_GV', sql.NVarChar, Gioi_Tinh_GV)
      .input('Email_GV', sql.NVarChar, Email_GV)
      .input('Hoc_Vi', sql.NVarChar, Hoc_Vi)
      .input('Ma_BM', sql.NVarChar, Ma_BM)
      .query(`INSERT INTO GIANGVIEN
        (Ma_GV, Ten_GV, SDT_GV, Ngay_Sinh_GV, Gioi_Tinh_GV, Email_GV, Hoc_Vi, Ma_BM)
        VALUES (@Ma_GV, @Ten_GV, @SDT_GV, @Ngay_Sinh_GV, @Gioi_Tinh_GV, @Email_GV, @Hoc_Vi, @Ma_BM)
      `);
    res.status(201).json({ message: 'Đã thêm giảng viên' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const { Ten_GV, SDT_GV, Ngay_Sinh_GV, Gioi_Tinh_GV, Email_GV, Hoc_Vi, Ma_BM } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('Ma_GV', sql.NVarChar, req.params.Ma_GV)
      .input('Ten_GV', sql.NVarChar, Ten_GV)
      .input('SDT_GV', sql.NVarChar, SDT_GV)
      .input('Ngay_Sinh_GV', sql.Date, Ngay_Sinh_GV)
      .input('Gioi_Tinh_GV', sql.NVarChar, Gioi_Tinh_GV)
      .input('Email_GV', sql.NVarChar, Email_GV)
      .input('Hoc_Vi', sql.NVarChar, Hoc_Vi)
      .input('Ma_BM', sql.NVarChar, Ma_BM)
      .query(`UPDATE GIANGVIEN
        SET Ten_GV=@Ten_GV, SDT_GV=@SDT_GV, Ngay_Sinh_GV=@Ngay_Sinh_GV, Gioi_Tinh_GV=@Gioi_Tinh_GV,
            Email_GV=@Email_GV, Hoc_Vi=@Hoc_Vi, Ma_BM=@Ma_BM
        WHERE Ma_GV=@Ma_GV
      `);
    res.json({ message: 'Đã cập nhật giảng viên' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('Ma_GV', sql.NVarChar, req.params.Ma_GV)
      .query('DELETE FROM GIANGVIEN WHERE Ma_GV=@Ma_GV');
    res.json({ message: 'Đã xóa giảng viên' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};