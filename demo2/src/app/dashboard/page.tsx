'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import PortfolioChart from '@/components/dashboard/PortfolioChart';
import AssetAllocationChart from '@/components/dashboard/AssetAllocationChart';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Shield,
  Building2,
  PieChart
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your trust company.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Assets"
            value="$3.1M"
            change="+5.2% from last month"
            changeType="positive"
            icon={DollarSign}
          />
          <StatsCard
            title="Active Trusts"
            value="127"
            change="+3 new this month"
            changeType="positive"
            icon={Shield}
          />
          <StatsCard
            title="Total Clients"
            value="89"
            change="+2 new this month"
            changeType="positive"
            icon={Users}
          />
          <StatsCard
            title="Portfolio Growth"
            value="+12.4%"
            change="+2.1% from last month"
            changeType="positive"
            icon={TrendingUp}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PortfolioChart />
          <AssetAllocationChart />
        </div>

        {/* Recent Transactions */}
        <RecentTransactions />

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Trust Performance</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">94.2%</p>
                <p className="text-sm text-green-600 mt-1">Above benchmark</p>
              </div>
              <div className="bg-green-50 p-3 rounded-full">
                <Building2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Risk Score</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">Low</p>
                <p className="text-sm text-green-600 mt-1">Well diversified</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-full">
                <PieChart className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Compliance</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">100%</p>
                <p className="text-sm text-green-600 mt-1">All requirements met</p>
              </div>
              <div className="bg-green-50 p-3 rounded-full">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
