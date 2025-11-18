import React, { useEffect, useState } from 'react';
import { getMonhocs } from '../api/monhocApi';

export default function MonhocList() {
  const [mhList, setMhList] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getMonhocs()
      .then(setMhList)
      .catch(err => setError(err.message));
  }, []);

  return (
    <div>
      <h2>Danh sách Môn Học</h2>
      {error && <p style={{color:'red'}}>{error}</p>}
      <ul>
        {mhList.map((mh) => (
          <li key={mh.id || mh._id}>{mh.name}</li>
        ))}
      </ul>
    </div>
  );
}