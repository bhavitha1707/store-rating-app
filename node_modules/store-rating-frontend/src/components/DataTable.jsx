import React, { useState } from 'react';

export default function DataTable({ columns, data }) {
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortOrder(order);
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return 0;
    const valA = a[sortField] ?? '';
    const valB = b[sortField] ?? '';

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th 
              key={col.field} 
              onClick={() => handleSort(col.field)}
              style={{ cursor: 'pointer', background: '#f4f4f4' }}
            >
              {col.label} {sortField === col.field ? (sortOrder === 'asc' ? '▲' : '▼') : ''}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, idx) => (
          <tr key={idx}>
            {columns.map((col) => (
              <td key={col.field}>{row[col.field]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}