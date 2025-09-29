import React from 'react';

export default function DashboardPage() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <nav style={{ marginBottom: '2rem' }}>
        <button style={{ marginRight: '1rem' }}>Overview</button>
        <button style={{ marginRight: '1rem' }}>Accounts</button>
        <button style={{ marginRight: '1rem' }}>Transactions</button>
        <button>Reports</button>
      </nav>
      <section style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 1 }}>
          <h2>Charts</h2>
          {/* Placeholder for charts */}
          <div style={{ height: '200px', background: '#eee', borderRadius: '8px' }} />
        </div>
        <div style={{ flex: 1 }}>
          <h2>Data Table</h2>
          {/* Placeholder for data table */}
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Amount</th>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>Sample</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>$1000</td>
                <td style={{ border: '1px solid #ccc', padding: '8px' }}>2025-09-29</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
