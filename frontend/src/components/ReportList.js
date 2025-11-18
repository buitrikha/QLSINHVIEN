import React, { useEffect, useState } from 'react';
import { getReports } from '../api/reportApi';

export default function ReportList() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getReports()
      .then(setReports)
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Danh sách Báo Cáo</h2>
      {error && <p style={{color:'red'}}>{error}</p>}
      <ul>
        {reports.map((r) => (
          <li key={r.id || r._id}>{r.title || r.name}</li>
        ))}
      </ul>
    </div>
  );
}