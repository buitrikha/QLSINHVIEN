import React, { useEffect, useState } from 'react';
import { getGiangviens, addGiangvien, updateGiangvien, deleteGiangvien } from '../api/giangvienApi';

export default function GiangvienCrud() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    Ma_GV: '',
    Ten_GV: '',
    SDT_GV: '',
    Ngay_Sinh_GV: '',
    Gioi_Tinh_GV: '',
    Email_GV: '',
    Hoc_Vi: '',
    Ma_BM: ''
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reload = async () => {
    try {
      setLoading(true);
      const data = await getGiangviens();
      setList(data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reload();
  }, []);

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      if (editId) {
        await updateGiangvien(editId, form);
        setEditId(null);
      } else {
        await addGiangvien(form);
      }
      setForm({
        Ma_GV: '',
        Ten_GV: '',
        SDT_GV: '',
        Ngay_Sinh_GV: '',
        Gioi_Tinh_GV: '',
        Email_GV: '',
        Hoc_Vi: '',
        Ma_BM: ''
      });
      reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (gv) => {
    setForm({
      Ma_GV: gv.Ma_GV || '',
      Ten_GV: gv.Ten_GV || '',
      SDT_GV: gv.SDT_GV || '',
      Ngay_Sinh_GV: gv.Ngay_Sinh_GV ? gv.Ngay_Sinh_GV.split('T')[0] : '',
      Gioi_Tinh_GV: gv.Gioi_Tinh_GV || '',
      Email_GV: gv.Email_GV || '',
      Hoc_Vi: gv.Hoc_Vi || '',
      Ma_BM: gv.Ma_BM || ''
    });
    setEditId(gv.Ma_GV);
  };

  const handleDelete = async (maGV) => {
    if (!window.confirm('Bạn có chắc muốn xóa giảng viên này?')) return;
    try {
      setLoading(true);
      await deleteGiangvien(maGV);
      reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditId(null);
    setForm({
      Ma_GV: '',
      Ten_GV: '',
      SDT_GV: '',
      Ngay_Sinh_GV: '',
      Gioi_Tinh_GV: '',
      Email_GV: '',
      Hoc_Vi: '',
      Ma_BM: ''
    });
  };

  return (
    <div style={{ marginBottom: '3rem', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Quản lý Giảng viên</h2>
      
      {error && <div style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', background: '#ffe6e6', borderRadius: '4px' }}>{error}</div>}

      <form onSubmit={handleAddOrUpdate} style={{ marginBottom: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
        <h3>{editId ? 'Cập nhật giảng viên' : 'Thêm giảng viên mới'}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label>Mã GV *</label>
            <input
              type="text"
              placeholder="Mã giảng viên"
              value={form.Ma_GV}
              onChange={e => setForm({...form, Ma_GV: e.target.value})}
              required
              disabled={!!editId}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div>
            <label>Tên giảng viên *</label>
            <input
              type="text"
              placeholder="Tên giảng viên"
              value={form.Ten_GV}
              onChange={e => setForm({...form, Ten_GV: e.target.value})}
              required
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div>
            <label>SĐT</label>
            <input
              type="text"
              placeholder="Số điện thoại"
              value={form.SDT_GV}
              onChange={e => setForm({...form, SDT_GV: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div>
            <label>Ngày sinh</label>
            <input
              type="date"
              value={form.Ngay_Sinh_GV}
              onChange={e => setForm({...form, Ngay_Sinh_GV: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div>
            <label>Giới tính</label>
            <select
              value={form.Gioi_Tinh_GV}
              onChange={e => setForm({...form, Gioi_Tinh_GV: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            >
              <option value="">Chọn giới tính</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={form.Email_GV}
              onChange={e => setForm({...form, Email_GV: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div>
            <label>Học vị</label>
            <input
              type="text"
              placeholder="VD: Thạc sĩ, Tiến sĩ..."
              value={form.Hoc_Vi}
              onChange={e => setForm({...form, Hoc_Vi: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div>
            <label>Mã bộ môn</label>
            <input
              type="text"
              placeholder="Mã bộ môn"
              value={form.Ma_BM}
              onChange={e => setForm({...form, Ma_BM: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
        </div>
        <div>
          <button type="submit" disabled={loading} style={{ padding: '0.5rem 1rem', marginRight: '0.5rem', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            {loading ? 'Đang xử lý...' : (editId ? 'Cập nhật' : 'Thêm mới')}
          </button>
          {editId && (
            <button type="button" onClick={handleCancel} style={{ padding: '0.5rem 1rem', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Hủy
            </button>
          )}
        </div>
      </form>

      <div>
        <h3>Danh sách giảng viên ({list.length})</h3>
        {loading && <p>Đang tải...</p>}
        {!loading && list.length === 0 && <p>Chưa có dữ liệu</p>}
        {!loading && list.length > 0 && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>Mã GV</th>
                  <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>Tên</th>
                  <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>SĐT</th>
                  <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>Ngày sinh</th>
                  <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>Giới tính</th>
                  <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>Email</th>
                  <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>Học vị</th>
                  <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>Mã BM</th>
                  <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {list.map(gv => (
                  <tr key={gv.Ma_GV}>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{gv.Ma_GV}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{gv.Ten_GV}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{gv.SDT_GV}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{gv.Ngay_Sinh_GV ? new Date(gv.Ngay_Sinh_GV).toLocaleDateString('vi-VN') : ''}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{gv.Gioi_Tinh_GV}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{gv.Email_GV}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{gv.Hoc_Vi}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{gv.Ma_BM}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                      <button onClick={() => handleEdit(gv)} style={{ padding: '0.25rem 0.5rem', marginRight: '0.25rem', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Sửa</button>
                      <button onClick={() => handleDelete(gv.Ma_GV)} style={{ padding: '0.25rem 0.5rem', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
