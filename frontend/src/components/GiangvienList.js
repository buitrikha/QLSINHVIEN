import React, { useEffect, useState } from 'react';
import { getGiangviens } from '../api/giangvienApi';

export default function GiangvienList() {
  const [gvList, setGvList] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getGiangviens()
      .then(setGvList)
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Danh sách Giảng Viên</h2>
      {error && <p style={{color:'red'}}>{error}</p>}
      <ul>
        {gvList.map((gv) => (
          <li key={gv.id || gv._id}>{gv.name}</li>
        ))}
      </ul>
    </div>
  );
}