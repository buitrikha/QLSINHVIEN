import React, { useState } from 'react';
import {
  getSvDiemCkMax,
  getMhChuaCoLopHP,
  getSvCnttChuaDkCSDL,
  getSvInLopSortDesc,
  getSvMonDangKy,
  getGpaByHK,
  getViewGpaByHK,
  getBangDiemChiTiet,
  getLhpConTrong,
  getSvNoMon
} from '../api/reportApi';

export default function ReportCrud() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [params, setParams] = useState({
    Ten_Lop: '',
    Ma_SV: '',
    Ma_HK: ''
  });

  const reports = [
    { id: 'sv-diem-ck-max', name: 'Sinh viên điểm CK cao nhất', func: getSvDiemCkMax, params: [] },
    { id: 'mh-chua-co-lophp', name: 'Môn học chưa có lớp học phần', func: getMhChuaCoLopHP, params: [] },
    { id: 'sv-cntt-chua-dk-csdl', name: 'SV CNTT chưa đăng ký CSDL', func: getSvCnttChuaDkCSDL, params: [] },
    { id: 'sv-in-lop-sort-desc', name: 'SV trong lớp sắp xếp giảm dần', func: getSvInLopSortDesc, params: ['Ten_Lop'] },
    { id: 'sv-mon-dang-ky', name: 'Môn học SV đã đăng ký', func: getSvMonDangKy, params: ['Ma_SV'] },
    { id: 'gpa-by-hk', name: 'GPA theo học kỳ', func: getGpaByHK, params: ['Ma_HK'] },
    { id: 'view-gpa-by-hk', name: 'GPA theo học kỳ (View)', func: getViewGpaByHK, params: ['Ma_HK'] },
    { id: 'bangdiem-chitiet', name: 'Bảng điểm chi tiết', func: getBangDiemChiTiet, params: ['Ma_SV'] },
    { id: 'lhp-con-trong', name: 'Lớp học phần còn chỗ', func: getLhpConTrong, params: [] },
    { id: 'sv-no-mon', name: 'SV nợ môn theo học kỳ', func: getSvNoMon, params: ['Ma_HK'] }
  ];

  const handleRunReport = async (report) => {
    setSelectedReport(report);
    setLoading(true);
    setError(null);
    setData([]);

    try {
      let result;
      if (report.params.length === 0) {
        result = await report.func();
      } else if (report.id === 'sv-in-lop-sort-desc') {
        if (!params.Ten_Lop) {
          setError('Vui lòng nhập tên lớp');
          setLoading(false);
          return;
        }
        result = await report.func(params.Ten_Lop);
      } else if (report.id === 'sv-mon-dang-ky' || report.id === 'bangdiem-chitiet') {
        if (!params.Ma_SV) {
          setError('Vui lòng nhập mã sinh viên');
          setLoading(false);
          return;
        }
        result = await report.func(params.Ma_SV);
      } else if (report.params.includes('Ma_HK')) {
        if (!params.Ma_HK) {
          setError('Vui lòng nhập mã học kỳ');
          setLoading(false);
          return;
        }
        result = await report.func(params.Ma_HK);
      } else {
        result = await report.func();
      }
      setData(Array.isArray(result) ? result : [result]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderTable = () => {
    if (!data || data.length === 0) return null;

    const columns = Object.keys(data[0]);

    return (
      <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8f9fa' }}>
              {columns.map(col => (
                <th key={col} style={{ padding: '0.75rem', border: '1px solid #ddd', textAlign: 'left' }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                {columns.map(col => (
                  <td key={col} style={{ padding: '0.75rem', border: '1px solid #ddd' }}>
                    {row[col] !== null && row[col] !== undefined ? String(row[col]) : ''}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div style={{ marginBottom: '3rem', padding: '1.5rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h2>Báo cáo và Thống kê</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {reports.map(report => (
          <button
            key={report.id}
            onClick={() => handleRunReport(report)}
            disabled={loading}
            style={{
              padding: '1rem',
              background: selectedReport?.id === report.id ? '#007bff' : '#f8f9fa',
              color: selectedReport?.id === report.id ? 'white' : '#333',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: loading ? 'not-allowed' : 'pointer',
              textAlign: 'left'
            }}
          >
            {report.name}
          </button>
        ))}
      </div>

      {selectedReport && selectedReport.params.length > 0 && (
        <div style={{ marginBottom: '1rem', padding: '1rem', background: '#fff3cd', borderRadius: '4px' }}>
          <h4>Tham số cần nhập:</h4>
          {selectedReport.params.includes('Ten_Lop') && (
            <div style={{ marginBottom: '0.5rem' }}>
              <label>Tên lớp: </label>
              <input
                type="text"
                value={params.Ten_Lop}
                onChange={e => setParams({...params, Ten_Lop: e.target.value})}
                placeholder="Nhập tên lớp"
                style={{ padding: '0.5rem', marginLeft: '0.5rem', width: '200px' }}
              />
            </div>
          )}
          {selectedReport.params.includes('Ma_SV') && (
            <div style={{ marginBottom: '0.5rem' }}>
              <label>Mã sinh viên: </label>
              <input
                type="text"
                value={params.Ma_SV}
                onChange={e => setParams({...params, Ma_SV: e.target.value})}
                placeholder="Nhập mã sinh viên"
                style={{ padding: '0.5rem', marginLeft: '0.5rem', width: '200px' }}
              />
            </div>
          )}
          {selectedReport.params.includes('Ma_HK') && (
            <div style={{ marginBottom: '0.5rem' }}>
              <label>Mã học kỳ: </label>
              <input
                type="text"
                value={params.Ma_HK}
                onChange={e => setParams({...params, Ma_HK: e.target.value})}
                placeholder="Nhập mã học kỳ"
                style={{ padding: '0.5rem', marginLeft: '0.5rem', width: '200px' }}
              />
            </div>
          )}
          <button
            onClick={() => handleRunReport(selectedReport)}
            disabled={loading}
            style={{ padding: '0.5rem 1rem', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Chạy báo cáo
          </button>
        </div>
      )}

      {error && (
        <div style={{ color: 'red', marginBottom: '1rem', padding: '0.5rem', background: '#ffe6e6', borderRadius: '4px' }}>
          {error}
        </div>
      )}

      {loading && <p>Đang tải dữ liệu...</p>}

      {!loading && selectedReport && (
        <div>
          <h3>Kết quả: {selectedReport.name}</h3>
          {data.length === 0 ? (
            <p>Không có dữ liệu</p>
          ) : (
            <>
              <p>Số lượng bản ghi: {data.length}</p>
              {renderTable()}
            </>
          )}
        </div>
      )}
    </div>
  );
}
