import React, { useEffect, useState } from 'react';
import { getUpcomingClasses, registerClass, unregisterClass } from '../api/dangkyApi';

export default function DangkyLophp() {
  const [classes, setClasses] = useState([]);
  const [maSV, setMaSV] = useState('');
  const [fetching, setFetching] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('info');

  const loadClasses = async () => {
    try {
      setFetching(true);
      const data = await getUpcomingClasses();
      setClasses(data || []);
    } catch (err) {
      setMessage(err.message);
      setMessageType('error');
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    loadClasses();
  }, []);

  const showMessage = (text, type = 'info') => {
    setMessage(text);
    setMessageType(type);
  };

  const ensureMaSV = () => {
    if (!maSV.trim()) {
      showMessage('Vui lòng nhập mã sinh viên trước khi thao tác', 'error');
      return false;
    }
    return true;
  };

  const handleRegister = async (Ma_LHP) => {
    if (!ensureMaSV()) return;
    try {
      setSubmitting(true);
      await registerClass({ Ma_SV: maSV.trim(), Ma_LHP });
      showMessage(`Đăng ký thành công lớp ${Ma_LHP}`, 'success');
      loadClasses();
    } catch (err) {
      showMessage(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUnregister = async (Ma_LHP) => {
    if (!ensureMaSV()) return;
    try {
      setSubmitting(true);
      await unregisterClass(maSV.trim(), Ma_LHP);
      showMessage(`Đã hủy đăng ký lớp ${Ma_LHP}`, 'success');
      loadClasses();
    } catch (err) {
      showMessage(err.message, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ marginBottom: '3rem', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Đăng ký lớp học phần kỳ sau</h2>
      <p>Nhập mã sinh viên để đăng ký hoặc hủy đăng ký các lớp học phần sắp mở.</p>

      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div>
          <label>Mã sinh viên *</label>
          <input
            type="text"
            placeholder="VD: SV00001"
            value={maSV}
            onChange={e => setMaSV(e.target.value)}
            style={{ width: '200px', padding: '0.5rem', marginLeft: '0.5rem' }}
          />
        </div>
        <button
          onClick={loadClasses}
          disabled={fetching || submitting}
          style={{ padding: '0.5rem 1rem', background: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {fetching ? 'Đang tải...' : 'Làm mới danh sách'}
        </button>
      </div>

      {message && (
        <div
          style={{
            marginBottom: '1rem',
            padding: '0.75rem',
            borderRadius: '4px',
            color: messageType === 'error' ? '#721c24' : messageType === 'success' ? '#155724' : '#004085',
            background: messageType === 'error' ? '#f8d7da' : messageType === 'success' ? '#d4edda' : '#cce5ff',
            border: `1px solid ${messageType === 'error' ? '#f5c6cb' : messageType === 'success' ? '#c3e6cb' : '#b8daff'}`
          }}
        >
          {message}
        </div>
      )}

      {fetching && <p>Đang tải dữ liệu lớp học phần...</p>}
      {!fetching && classes.length === 0 && <p>Chưa có lớp học phần nào sắp mở.</p>}

      {!fetching && classes.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8f9fa' }}>
                {['Mã LHP', 'Môn học', 'Tín chỉ', 'Lịch học', 'Giảng viên', 'Học kỳ', 'Ngày bắt đầu', 'Sức chứa', 'Đã đăng ký', 'Còn lại', 'Thao tác'].map(header => (
                  <th key={header} style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {classes.map(cls => (
                <tr key={cls.Ma_LHP}>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{cls.Ma_LHP}</td>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                    <strong>{cls.Ten_MH}</strong>
                    <div style={{ color: '#6c757d', fontSize: '0.9rem' }}>{cls.Ma_MH}</div>
                  </td>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{cls.So_Tin_Chi}</td>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{cls.Lich_Hoc}</td>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{cls.Ten_GV}</td>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                    {cls.Ten_HK}
                    <div style={{ color: '#6c757d', fontSize: '0.85rem' }}>{cls.Ma_HK}</div>
                  </td>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                    {cls.Ngay_Bat_Dau ? new Date(cls.Ngay_Bat_Dau).toLocaleDateString('vi-VN') : ''}
                  </td>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{cls.SL_Toi_Da}</td>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{cls.Da_Dang_Ky}</td>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd', fontWeight: cls.Con_Lai <= 0 ? '700' : '400', color: cls.Con_Lai <= 0 ? '#dc3545' : '#212529' }}>
                    {cls.Con_Lai}
                  </td>
                  <td style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                    <button
                      onClick={() => handleRegister(cls.Ma_LHP)}
                      disabled={submitting}
                      style={{ padding: '0.35rem 0.65rem', marginRight: '0.25rem', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Đăng ký
                    </button>
                    <button
                      onClick={() => handleUnregister(cls.Ma_LHP)}
                      disabled={submitting}
                      style={{ padding: '0.35rem 0.65rem', background: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      Hủy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

