import React, { useState, useEffect } from 'react';
import API from '../services/api';
import DataTable from '../components/DataTable';

export default function OwnerDashboard() {
  const [data, setData] = useState({ storeName: '', averageRating: 0, ratings: [] });

  useEffect(() => {
    API.get('/owner/dashboard').then((res) => setData(res.data));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Store Dashboard: {data.storeName}</h1>
      <h3>Average Rating: {data.averageRating} ⭐</h3>

      <h2>User Ratings</h2>
      <DataTable
        columns={[
          { label: 'User Name', field: 'name' },
          { label: 'Email', field: 'email' },
          { label: 'Address', field: 'address' },
          { label: 'Rating Submitted', field: 'rating' }
        ]}
        data={data.ratings}
      />
    </div>
  );
}