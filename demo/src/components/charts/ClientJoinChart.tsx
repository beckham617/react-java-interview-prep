'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, TrendingUp } from 'lucide-react';
import { Client } from '@/types/client';

interface ClientJoinChartProps {
  clients: Client[];
}

interface ChartData {
  month: string;
  year: number;
  newClients: number;
  cumulative: number;
}

export default function ClientJoinChart({ clients }: ClientJoinChartProps) {
  // Process client data to group by month/year
  const processData = (): ChartData[] => {
    const monthlyData: { [key: string]: number } = {};
    
    clients.forEach(client => {
      const date = new Date(client.joinDate);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthlyData[monthYear] = (monthlyData[monthYear] || 0) + 1;
    });

    // Convert to array and sort by date
    const sortedData = Object.entries(monthlyData)
      .map(([monthYear, count]) => {
        const [year, month] = monthYear.split('-');
        const monthName = new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('en-US', { 
          month: 'short', 
          year: 'numeric' 
        });
        return {
          month: monthName,
          year: parseInt(year),
          newClients: count,
          cumulative: 0 // Will be calculated below
        };
      })
      .sort((a, b) => a.year - b.year || a.month.localeCompare(b.month));

    // Calculate cumulative totals
    let cumulative = 0;
    sortedData.forEach(item => {
      cumulative += item.newClients;
      item.cumulative = cumulative;
    });

    return sortedData;
  };

  const chartData = processData();
  
  // Calculate statistics
  const totalNewClients = chartData.reduce((sum, item) => sum + item.newClients, 0);
  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  const thisMonthClients = chartData.find(item => item.month === currentMonth)?.newClients || 0;
  const lastMonth = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  const lastMonthClients = chartData.find(item => item.month === lastMonth)?.newClients || 0;
  const growthRate = lastMonthClients > 0 ? ((thisMonthClients - lastMonthClients) / lastMonthClients * 100) : 0;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-900">{label}</p>
          <p className="text-blue-600">
            New Clients: <span className="font-semibold">{payload[0].value}</span>
          </p>
          <p className="text-green-600">
            Total Clients: <span className="font-semibold">{payload[1]?.value || 0}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-50 p-3 rounded-full">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Client Growth</h3>
            <p className="text-sm text-gray-600">New client acquisitions by month</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">This Month</p>
            <p className="text-2xl font-bold text-blue-600">{thisMonthClients}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Growth Rate</p>
            <div className="flex items-center space-x-1">
              <TrendingUp className={`h-4 w-4 ${growthRate >= 0 ? 'text-green-600' : 'text-red-600'}`} />
              <p className={`text-lg font-semibold ${growthRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {growthRate >= 0 ? '+' : ''}{growthRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Toggle */}
      {/* <div className="flex justify-center mb-4">
        <div className="bg-gray-100 rounded-lg p-1">
          <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md">
            Bar Chart
          </button>
        </div>
      </div> */}

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="newClients" 
              fill="#271e76" 
              radius={[4, 4, 0, 0]}
              name="New Clients"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm font-medium text-blue-900">Total New Clients</p>
              <p className="text-2xl font-bold text-blue-600">{totalNewClients}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-900">Average per Month</p>
              <p className="text-2xl font-bold text-green-600">
                {chartData.length > 0 ? Math.round(totalNewClients / chartData.length) : 0}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-purple-600" />
            <div>
              <p className="text-sm font-medium text-purple-900">Peak Month</p>
              <p className="text-lg font-bold text-purple-600">
                {chartData.length > 0 ? Math.max(...chartData.map(d => d.newClients)) : 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Monthly Breakdown</h4>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Month
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  New Clients
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cumulative
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Growth
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {chartData.slice(-6).reverse().map((item, index) => {
                const prevMonth = chartData[chartData.indexOf(item) - 1];
                const growth = prevMonth ? ((item.newClients - prevMonth.newClients) / prevMonth.newClients * 100) : 0;
                
                return (
                  <tr key={index}>
                    <td className="px-4 py-2 text-sm text-gray-900">{item.month}</td>
                    <td className="px-4 py-2 text-sm font-medium text-blue-600">{item.newClients}</td>
                    <td className="px-4 py-2 text-sm text-gray-600">{item.cumulative}</td>
                    <td className="px-4 py-2 text-sm">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        growth >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {growth >= 0 ? '+' : ''}{growth.toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
