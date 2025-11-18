import React, { useEffect, useState } from 'react';
import { getSinhviens } from '../api/sinhvienApi';

export default function SinhvienList() {
  const [svs, setSvs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getSinhviens()
      .then(setSvs)
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Danh sách Sinh Viên</h2>
      {error && <p style={{color:'red'}}>{error}</p>}
      <ul>
        {svs.map((sv) => (
          <li key={sv.id || sv._id}>{sv.name}</li>
        ))}
      </ul>
    </div>
  );
}