import { ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';

const transactions = [
  {
    id: 1,
    type: 'deposit',
    amount: 50000,
    client: 'John Smith Trust',
    date: '2024-01-15',
    status: 'completed',
  },
  {
    id: 2,
    type: 'withdrawal',
    amount: 25000,
    client: 'Mary Johnson Family Trust',
    date: '2024-01-14',
    status: 'pending',
  },
  {
    id: 3,
    type: 'deposit',
    amount: 100000,
    client: 'Robert Davis Trust',
    date: '2024-01-13',
    status: 'completed',
  },
  {
    id: 4,
    type: 'withdrawal',
    amount: 15000,
    client: 'Sarah Wilson Trust',
    date: '2024-01-12',
    status: 'completed',
  },
  {
    id: 5,
    type: 'deposit',
    amount: 75000,
    client: 'Michael Brown Trust',
    date: '2024-01-11',
    status: 'completed',
  },
];

export default function RecentTransactions() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    return type === 'deposit' ? (
      <ArrowDownLeft className="h-4 w-4 text-green-600" />
    ) : (
      <ArrowUpRight className="h-4 w-4 text-red-600" />
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
        <p className="text-sm text-gray-600">Latest activity across all trusts</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Type</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Client</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Amount</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Date</th>
              <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-2">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(transaction.type)}
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {transaction.type}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <span className="text-sm text-gray-900">{transaction.client}</span>
                </td>
                <td className="py-3 px-2">
                  <span className="text-sm font-medium text-gray-900">
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(transaction.amount)}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span className="text-sm text-gray-600">{transaction.date}</span>
                </td>
                <td className="py-3 px-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                    {transaction.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
