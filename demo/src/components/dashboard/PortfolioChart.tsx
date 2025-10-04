'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', value: 2400000 },
  { month: 'Feb', value: 2450000 },
  { month: 'Mar', value: 2520000 },
  { month: 'Apr', value: 2480000 },
  { month: 'May', value: 2600000 },
  { month: 'Jun', value: 2750000 },
  { month: 'Jul', value: 2800000 },
  { month: 'Aug', value: 2850000 },
  { month: 'Sep', value: 2900000 },
  { month: 'Oct', value: 2950000 },
  { month: 'Nov', value: 3000000 },
  { month: 'Dec', value: 3100000 },
];

export default function PortfolioChart() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Portfolio Performance</h3>
        <p className="text-sm text-gray-600">Total assets under management</p>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
            />
            <Tooltip 
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
              labelStyle={{ color: '#374151' }}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              }}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#271e76" 
              strokeWidth={3}
              dot={{ fill: '#271e76', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#271e76', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
