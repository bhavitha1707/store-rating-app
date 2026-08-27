import React, { useState, useEffect } from 'react';
import API from '../services/api';
import DataTable from '../components/DataTable';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalStores: 0, totalRatings: 0 });
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const [statsRes, usersRes, storesRes] = await Promise.all([
      API.get('/admin/dashboard'),
      API.get('/admin/users'),
      API.get('/admin/stores')
    ]);
    setStats(statsRes.data);
    setUsers(usersRes.data);
    setStores(storesRes.data);
  };

  const filteredUsers = users.filter((u) =>
    [u.name, u.email, u.address, u.role].some((val) =>
      val?.toLowerCase().includes(filter.toLowerCase())
    )
  );

  const filteredStores = stores.filter((s) =>
    [s.name, s.email, s.address].some((val) =>
      val?.toLowerCase().includes(filter.toLowerCase())
    )
  );

  return (
    <div style={{ padding: '20px' }}>
      <h1>Admin Dashboard</h1>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div>Users: <strong>{stats.totalUsers}</strong></div>
        <div>Stores: <strong>{stats.totalStores}</strong></div>
        <div>Ratings: <strong>{stats.totalRatings}</strong></div>
      </div>

      <input
        type="text"
        placeholder="Filter listing by Name, Email, Address, Role..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '20px' }}
      />

      <h2>Users List</h2>
      <DataTable
        columns={[
          { label: 'Name', field: 'name' },
          { label: 'Email', field: 'email' },
          { label: 'Address', field: 'address' },
          { label: 'Role', field: 'role' },
          { label: 'Rating (If Store Owner)', field: 'rating' }
        ]}
        data={filteredUsers}
      />

      <h2>Stores List</h2>
      <DataTable
        columns={[
          { label: 'Name', field: 'name' },
          { label: 'Email', field: 'email' },
          { label: 'Address', field: 'address' },
          { label: 'Overall Rating', field: 'rating' }
        ]}
        data={filteredStores}
      />
    </div>
  );
}