import React, { useState, useEffect } from 'react';
import API from '../services/api';

export default function UserDashboard() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadStores();
  }, []);

  const loadStores = async () => {
    const res = await API.get('/user/stores');
    setStores(res.data);
  };

  const handleRatingSubmit = async (storeId, rating) => {
    await API.post('/user/ratings', { storeId, rating });
    loadStores();
  };

  const filteredStores = stores.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>Store Listings</h1>

      <input
        type="text"
        placeholder="Search stores by Name or Address..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
      />

      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Store Name</th>
            <th>Address</th>
            <th>Overall Rating</th>
            <th>Your Rating</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredStores.map((store) => (
            <tr key={store.id}>
              <td>{store.name}</td>
              <td>{store.address}</td>
              <td>{store.overall_rating} ⭐</td>
              <td>{store.user_rating ? `${store.user_rating} ⭐` : 'Not Rated'}</td>
              <td>
                <select
                  defaultValue={store.user_rating || ''}
                  onChange={(e) => handleRatingSubmit(store.id, Number(e.target.value))}
                >
                  <option value="" disabled>Select Rating</option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>{num} Star</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}