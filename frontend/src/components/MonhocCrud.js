import React, { useEffect, useState } from 'react';
import { getMonhocs, addMonhoc, updateMonhoc, deleteMonhoc } from '../api/monhocApi';

export default function MonhocCrud() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    Ma_MH: '',
    Ten_MH: '',
    So_Tin_Chi: ''
  });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const reload = async () => {
    try {
      setLoading(true);
      const data = await getMonhocs();
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
        await updateMonhoc(editId, form);
        setEditId(null);
      } else {
        await addMonhoc(form);
      }
      setForm({
        Ma_MH: '',
        Ten_MH: '',
        So_Tin_Chi: ''
      });
      reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (mh) => {
    setForm({
      Ma_MH: mh.Ma_MH || '',
      Ten_MH: mh.Ten_MH || '',
      So_Tin_Chi: mh.So_Tin_Chi || ''
    });
    setEditId(mh.Ma_MH);
  };

  const handleDelete = async (maMH) => {
    if (!window.confirm('Bạn có chắc muốn xóa môn học này?')) return;
    try {
      setLoading(true);
      await deleteMonhoc(maMH);
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
      Ma_MH: '',
      Ten_MH: '',
      So_Tin_Chi: ''
    });
  };

  return (
    <div style={{ marginBottom: '3rem', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Quản lý Môn học</h2>
      
      {error && <div style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', background: '#ffe6e6', borderRadius: '4px' }}>{error}</div>}

      <form onSubmit={handleAddOrUpdate} style={{ marginBottom: '2rem', padding: '1rem', background: '#f5f5f5', borderRadius: '4px' }}>
        <h3>{editId ? 'Cập nhật môn học' : 'Thêm môn học mới'}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <label>Mã môn học *</label>
            <input
              type="text"
              placeholder="Mã môn học"
              value={form.Ma_MH}
              onChange={e => setForm({...form, Ma_MH: e.target.value})}
              required
              disabled={!!editId}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div>
            <label>Tên môn học *</label>
            <input
              type="text"
              placeholder="Tên môn học"
              value={form.Ten_MH}
              onChange={e => setForm({...form, Ten_MH: e.target.value})}
              required
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div>
            <label>Số tín chỉ *</label>
            <input
              type="number"
              placeholder="Số tín chỉ"
              value={form.So_Tin_Chi}
              onChange={e => setForm({...form, So_Tin_Chi: e.target.value})}
              required
              min="1"
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
        <h3>Danh sách môn học ({list.length})</h3>
        {loading && <p>Đang tải...</p>}
        {!loading && list.length === 0 && <p>Chưa có dữ liệu</p>}
        {!loading && list.length > 0 && (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>Mã MH</th>
                  <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>Tên môn học</th>
                  <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>Số tín chỉ</th>
                  <th style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {list.map(mh => (
                  <tr key={mh.Ma_MH}>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{mh.Ma_MH}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{mh.Ten_MH}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{mh.So_Tin_Chi}</td>
                    <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                      <button onClick={() => handleEdit(mh)} style={{ padding: '0.25rem 0.5rem', marginRight: '0.25rem', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Sửa</button>
                      <button onClick={() => handleDelete(mh.Ma_MH)} style={{ padding: '0.25rem 0.5rem', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Xóa</button>
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
