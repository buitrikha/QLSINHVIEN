const { sql, poolPromise } = require('../db');

// Lấy toàn bộ sinh viên
exports.getAll = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM SINHVIEN');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy sinh viên theo mã
exports.getById = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('Ma_SV', sql.NVarChar, req.params.Ma_SV)
      .query('SELECT * FROM SINHVIEN WHERE Ma_SV = @Ma_SV');
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Thêm sinh viên mới
exports.create = async (req, res) => {
  const { Ma_SV, HoDemSV, Ten_SV, Ngay_Sinh_SV, SDT_SV, Email_SV, TT_Hoctap, Dia_Chi, Ma_Lop } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('Ma_SV', sql.NVarChar, Ma_SV)
      .input('HoDemSV', sql.NVarChar, HoDemSV)
      .input('Ten_SV', sql.NVarChar, Ten_SV)
      .input('Ngay_Sinh_SV', sql.Date, Ngay_Sinh_SV)
      .input('SDT_SV', sql.NVarChar, SDT_SV)
      .input('Email_SV', sql.NVarChar, Email_SV)
      .input('TT_Hoctap', sql.NVarChar, TT_Hoctap)
      .input('Dia_Chi', sql.NVarChar, Dia_Chi)
      .input('Ma_Lop', sql.NVarChar, Ma_Lop)
      .query(`INSERT INTO SINHVIEN
        (Ma_SV, HoDemSV, Ten_SV, Ngay_Sinh_SV, SDT_SV, Email_SV, TT_Hoctap, Dia_Chi, Ma_Lop)
        VALUES (@Ma_SV, @HoDemSV, @Ten_SV, @Ngay_Sinh_SV, @SDT_SV, @Email_SV, @TT_Hoctap, @Dia_Chi, @Ma_Lop)
      `);
    res.status(201).json({ message: 'Đã thêm sinh viên' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cập nhật sinh viên
exports.update = async (req, res) => {
  const { HoDemSV, Ten_SV, Ngay_Sinh_SV, SDT_SV, Email_SV, TT_Hoctap, Dia_Chi, Ma_Lop } = req.body;
  const Ma_SV = req.params.Ma_SV;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('Ma_SV', sql.NVarChar, Ma_SV)
      .input('HoDemSV', sql.NVarChar, HoDemSV)
      .input('Ten_SV', sql.NVarChar, Ten_SV)
      .input('Ngay_Sinh_SV', sql.Date, Ngay_Sinh_SV)
      .input('SDT_SV', sql.NVarChar, SDT_SV)
      .input('Email_SV', sql.NVarChar, Email_SV)
      .input('TT_Hoctap', sql.NVarChar, TT_Hoctap)
      .input('Dia_Chi', sql.NVarChar, Dia_Chi)
      .input('Ma_Lop', sql.NVarChar, Ma_Lop)
      .query(`UPDATE SINHVIEN 
        SET HoDemSV=@HoDemSV, Ten_SV=@Ten_SV, Ngay_Sinh_SV=@Ngay_Sinh_SV, SDT_SV=@SDT_SV, Email_SV=@Email_SV, 
            TT_Hoctap=@TT_Hoctap, Dia_Chi=@Dia_Chi, Ma_Lop=@Ma_Lop
        WHERE Ma_SV=@Ma_SV
      `);
    res.json({ message: 'Đã cập nhật sinh viên' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Xóa sinh viên
exports.delete = async (req, res) => {
  const Ma_SV = req.params.Ma_SV;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('Ma_SV', sql.NVarChar, Ma_SV)
      .query('DELETE FROM SINHVIEN WHERE Ma_SV=@Ma_SV');
    res.json({ message: 'Đã xóa sinh viên' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};