const { sql, poolPromise } = require('../db');

exports.getAll = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM MONHOC');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input('Ma_MH', sql.NVarChar, req.params.Ma_MH)
      .query('SELECT * FROM MONHOC WHERE Ma_MH=@Ma_MH');
    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  const { Ma_MH, Ten_MH, So_Tin_Chi } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('Ma_MH', sql.NVarChar, Ma_MH)
      .input('Ten_MH', sql.NVarChar, Ten_MH)
      .input('So_Tin_Chi', sql.Int, So_Tin_Chi)
      .query(`INSERT INTO MONHOC (Ma_MH, Ten_MH, So_Tin_Chi)
        VALUES (@Ma_MH, @Ten_MH, @So_Tin_Chi)
      `);
    res.status(201).json({ message: 'Đã thêm môn học' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const { Ten_MH, So_Tin_Chi } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('Ma_MH', sql.NVarChar, req.params.Ma_MH)
      .input('Ten_MH', sql.NVarChar, Ten_MH)
      .input('So_Tin_Chi', sql.Int, So_Tin_Chi)
      .query(`UPDATE MONHOC SET Ten_MH=@Ten_MH, So_Tin_Chi=@So_Tin_Chi WHERE Ma_MH=@Ma_MH`);
    res.json({ message: 'Đã cập nhật môn học' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('Ma_MH', sql.NVarChar, req.params.Ma_MH)
      .query('DELETE FROM MONHOC WHERE Ma_MH=@Ma_MH');
    res.json({ message: 'Đã xóa môn học' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};