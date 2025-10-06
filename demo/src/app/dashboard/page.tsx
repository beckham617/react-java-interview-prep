'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatsCard from '@/components/dashboard/StatsCard';
import PortfolioChart from '@/components/dashboard/PortfolioChart';
import AssetAllocationChart from '@/components/dashboard/AssetAllocationChart';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import { ClientDataService } from '@/data/clientData';
import { TransactionDataService } from '@/data/transactionData';
import { Client } from '@/types/client';
import { Transaction } from '@/types/transaction';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  Shield,
  Building2,
  PieChart,
  ArrowRight,
  CreditCard
} from 'lucide-react';

export default function DashboardPage() {
  const [recentClients, setRecentClients] = useState<Client[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    // Fetch recent clients (first 5)
    const clients = ClientDataService.getClients();
    setRecentClients(clients.slice(0, 5));

    // Fetch recent transactions (first 5)
    const transactions = TransactionDataService.getTransactions();
    setRecentTransactions(transactions.slice(0, 5));
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Deposit': return 'bg-green-100 text-green-800';
      case 'Withdrawal': return 'bg-red-100 text-red-800';
      case 'Transfer': return 'bg-blue-100 text-blue-800';
      case 'Investment': return 'bg-purple-100 text-purple-800';
      case 'Distribution': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatAmount = (amount: number) => {
    // Debug logging
    console.log('formatAmount received:', amount, 'type:', typeof amount);
    if (isNaN(amount)) {
      console.error('formatAmount received NaN:', amount);
      return '$0.00';
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

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
        {/* <RecentTransactions /> */}

        {/* Data Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Clients Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-50 p-2 rounded-full">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Recent Clients</h3>
                </div>
              </div>
            </div>
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Account Value
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentClients.map((client) => (
                    <tr key={client.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{client.name}</div>
                          <div className="text-sm text-gray-500">{client.company}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                          {client.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {client.accountValue}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-gray-200">
              <Link 
                href="/dashboard/clients"
                className="flex items-center justify-end text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                View All Clients
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Recent Transactions Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-50 p-2 rounded-full">
                    <CreditCard className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                </div>
              </div>
            </div>
            <div className="overflow-hidden">
              <table className="w-full divide-y divide-gray-200" style={{tableLayout: 'fixed'}}>
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-5/10">
                      Transaction
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/5">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/10">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-900 truncate">{transaction.clientName}</div>
                          <div className="text-sm truncate text-gray-500">{transaction.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(transaction.type)}`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatAmount(transaction.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-gray-200">
              <Link 
                href="/dashboard/transactions"
                className="flex items-center justify-end text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                View All Transactions
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

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
