import React, { useEffect, useState } from 'react';
import { getSinhviens, addSinhvien, updateSinhvien, deleteSinhvien } from '../api/sinhvienApi';

export default function SinhvienCrud() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    Ma_SV: '',
    HoDemSV: '',
    Ten_SV: '',
    Ngay_Sinh_SV: '',
    SDT_SV: '',
    Email_SV: '',
    TT_Hoctap: '',
    Dia_Chi: '',
    Ma_Lop: ''
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reload = async () => {
    try {
      setLoading(true);
      const data = await getSinhviens();
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
        await updateSinhvien(editId, form);
        setEditId(null);
      } else {
        await addSinhvien(form);
      }
      setForm({
        Ma_SV: '',
        HoDemSV: '',
        Ten_SV: '',
        Ngay_Sinh_SV: '',
        SDT_SV: '',
        Email_SV: '',
        TT_Hoctap: '',
        Dia_Chi: '',
        Ma_Lop: ''
      });
      reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (sv) => {
    setForm({
      Ma_SV: sv.Ma_SV || '',
      HoDemSV: sv.HoDemSV || '',
      Ten_SV: sv.Ten_SV || '',
      Ngay_Sinh_SV: sv.Ngay_Sinh_SV ? sv.Ngay_Sinh_SV.split('T')[0] : '',
      SDT_SV: sv.SDT_SV || '',
      Email_SV: sv.Email_SV || '',
      TT_Hoctap: sv.TT_Hoctap || '',
      Dia_Chi: sv.Dia_Chi || '',
      Ma_Lop: sv.Ma_Lop || ''
    });
    setEditId(sv.Ma_SV);
  };

  const handleDelete = async (maSV) => {
    if (!window.confirm('Bạn có chắc muốn xóa sinh viên này?')) return;
    try {
      setLoading(true);
      await deleteSinhvien(maSV);
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
      Ma_SV: '',
      HoDemSV: '',
      Ten_SV: '',
      Ngay_Sinh_SV: '',
      SDT_SV: '',
      Email_SV: '',
      TT_Hoctap: '',
      Dia_Chi: '',
      Ma_Lop: ''
    });
  };

  return (
    <div style={{ marginBottom: '3rem', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Quản lý Sinh viên</h2>
      
      {error && <div style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', background: '#ffe6e6', borderRadius: '4px' }}>{error}</div>}

      <form onSubmit={handleAddOrUpdate} style={{ marginBottom: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
        <h3>{editId ? 'Cập nhật sinh viên' : 'Thêm sinh viên mới'}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label>Mã SV *</label>
            <input
              type="text"
              placeholder="Mã sinh viên"
              value={form.Ma_SV}
              onChange={e => setForm({...form, Ma_SV: e.target.value})}
              required
              disabled={!!editId}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div>
            <label>Họ đệm</label>
            <input
              type="text"
              placeholder="Họ đệm"
              value={form.HoDemSV}
              onChange={e => setForm({...form, HoDemSV: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div>
            <label>Tên *</label>
            <input
              type="text"
              placeholder="Tên sinh viên"
              value={form.Ten_SV}
              onChange={e => setForm({...form, Ten_SV: e.target.value})}
              required
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div>
            <label>Ngày sinh</label>
            <input
              type="date"
              value={form.Ngay_Sinh_SV}
              onChange={e => setForm({...form, Ngay_Sinh_SV: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div>
            <label>SĐT</label>
            <input
              type="text"
              placeholder="Số điện thoại"
              value={form.SDT_SV}
              onChange={e => setForm({...form, SDT_SV: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={form.Email_SV}
              onChange={e => setForm({...form, Email_SV: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div>
            <label>Tình trạng học tập</label>
            <input
              type="text"
              placeholder="VD: Đang học, Tốt nghiệp..."
              value={form.TT_Hoctap}
              onChange={e => setForm({...form, TT_Hoctap: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div>
            <label>Mã lớp</label>
            <input
              type="text"
              placeholder="Mã lớp"
              value={form.Ma_Lop}
              onChange={e => setForm({...form, Ma_Lop: e.target.value})}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label>Địa chỉ</label>
            <input
              type="text"
              placeholder="Địa chỉ"
              value={form.Dia_Chi}
              onChange={e => setForm({...form, Dia_Chi: e.target.value})}
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
        <h3>Danh sách sinh viên ({list.length})</h3>
        {loading && <p>Đang tải...</p>}
        {!loading && list.length === 0 && <p>Chưa có dữ liệu</p>}
        {!loading && list.length > 0 && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>Mã SV</th>
                  <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>Họ tên</th>
                  <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>Ngày sinh</th>
                  <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>SĐT</th>
                  <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>Email</th>
                  <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>Tình trạng</th>
                  <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>Mã lớp</th>
                  <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {list.map(sv => (
                  <tr key={sv.Ma_SV}>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{sv.Ma_SV}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{sv.HoDemSV} {sv.Ten_SV}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{sv.Ngay_Sinh_SV ? new Date(sv.Ngay_Sinh_SV).toLocaleDateString('vi-VN') : ''}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{sv.SDT_SV}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{sv.Email_SV}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{sv.TT_Hoctap}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{sv.Ma_Lop}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                      <button onClick={() => handleEdit(sv)} style={{ padding: '0.25rem 0.5rem', marginRight: '0.25rem', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Sửa</button>
                      <button onClick={() => handleDelete(sv.Ma_SV)} style={{ padding: '0.25rem 0.5rem', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Xóa</button>
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
