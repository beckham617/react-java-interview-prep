'use client';

import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TransactionDetailModal from '@/components/modals/transactions/TransactionDetailModal';
import AddTransactionModal from '@/components/modals/transactions/AddTransactionModal';
import { TransactionDataService } from '@/data/transactionData';
import { Transaction } from '@/types/transaction';
import { CreditCard, TrendingUp, AlertCircle, CheckCircle, Search, Eye, Edit, Trash2, MoreVertical, UserPlus } from 'lucide-react';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [displayedTransactions, setDisplayedTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  // Load transactions from localStorage on component mount
  useEffect(() => {
    const loadedTransactions = TransactionDataService.getTransactions();
    setTransactions(loadedTransactions);
    setDisplayedTransactions(loadedTransactions);
  }, []);

  // Handle search results from API
  const handleSearchResults = useCallback((searchResults: Transaction[], loading: boolean, error: string | null, currentSearchTerm: string) => {
    if (!loading && !error) {
      // Only show all transactions when search term is completely empty
      if (currentSearchTerm.length === 0) {
        setDisplayedTransactions(transactions);
        setIsSearchMode(false);
        setSearchTerm('');
        setShowNoResults(false);
      } else {
        // For any search term (even if no results), show search results
        setDisplayedTransactions(searchResults);
        setIsSearchMode(true);
        setSearchTerm(currentSearchTerm);
        
        // Reset no results state when new search results come in
        setShowNoResults(false);
      }
    }
  }, [transactions]);

  // Reset to show all transactions when search is cleared
  const handleClearSearch = useCallback(() => {
    setDisplayedTransactions(transactions);
    setIsSearchMode(false);
    setSearchTerm('');
    setShowNoResults(false);
  }, [transactions]);

  // Modal functions
  const handleViewTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
    setIsModalOpen(false);
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    // Generate a new ID (in a real app, this would come from the backend)
    const maxId = Math.max(...transactions.map(t => t.id), 0);
    const transactionWithId: Transaction = {
      ...newTransaction,
      id: maxId + 1
    };
    
    const updatedTransactions = [...transactions, transactionWithId];
    setTransactions(updatedTransactions);
    setDisplayedTransactions(updatedTransactions);
    setIsAddModalOpen(false);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    // In a real app, this would open an edit modal or navigate to edit page
    console.log('Edit transaction:', transaction);
  };

  const handleApproveTransaction = (transaction: Transaction) => {
    // Update transaction status to completed
    const updatedTransactions = transactions.map(t => 
      t.id === transaction.id ? { ...t, status: 'Completed' as const } : t
    );
    setTransactions(updatedTransactions);
    setDisplayedTransactions(updatedTransactions);
    setIsModalOpen(false);
  };

  // Handle delayed "no results" display
  useEffect(() => {
    if (isSearchMode && displayedTransactions.length === 0 && searchTerm.length > 0) {
      const timer = setTimeout(() => {
        setShowNoResults(true);
      }, 1000); // 1 second delay before showing "no results"

      return () => clearTimeout(timer);
    } else {
      setShowNoResults(false);
    }
  }, [isSearchMode, displayedTransactions.length, searchTerm.length]);

  // Filter displayed transactions based on status and type
  const filteredTransactions = displayedTransactions.filter(transaction => {
    const matchesStatus = statusFilter === 'All' || transaction.status === statusFilter;
    const matchesType = typeFilter === 'All' || transaction.type === typeFilter;
    return matchesStatus && matchesType;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredTransactions.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const paginatedTransactions = filteredTransactions.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, typeFilter, searchTerm, recordsPerPage]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Deposit': return 'text-green-600';
      case 'Withdrawal': return 'text-red-600';
      case 'Transfer': return 'text-blue-600';
      case 'Investment': return 'text-purple-600';
      case 'Distribution': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };


  const handleDeleteTransaction = (id: number) => {
    if (window.confirm('Are you sure you want to delete this transaction? This action cannot be undone.')) {
      const success = TransactionDataService.deleteTransaction(id);
      if (success) {
        // Update local state
        const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
        setTransactions(updatedTransactions);
        setDisplayedTransactions(updatedTransactions);
        
        // Close modal if the deleted transaction was selected
        if (selectedTransaction && selectedTransaction.id === id) {
          handleCloseModal();
        }
        
        console.log('Transaction deleted successfully');
      } else {
        console.error('Failed to delete transaction');
        alert('Failed to delete transaction. Please try again.');
      }
    }
  };


  // Get transaction stats
  const stats = TransactionDataService.getTransactionStats();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transaction Management</h1>
            <p className="text-gray-600">Monitor and manage all trust transactions and financial activities</p>
          </div>
          <button 
            onClick={handleOpenAddModal}
            className="theme-button px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <UserPlus className="h-4 w-4" />
            <span>Add Transaction</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-50 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Total Transactions</h3>
                <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-50 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Completed</h3>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-50 p-3 rounded-full">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Pending</h3>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-50 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Total Volume</h3>
                <p className="text-2xl font-bold text-purple-600">{stats.totalAmount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions by client, reference, or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              >
                <option value="All">All Status</option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              >
                <option value="All">All Types</option>
                <option value="Deposit">Deposit</option>
                <option value="Withdrawal">Withdrawal</option>
                <option value="Transfer">Transfer</option>
                <option value="Investment">Investment</option>
                <option value="Distribution">Distribution</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isSearchMode && !showNoResults && paginatedTransactions.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Searching...</h3>
            <p className="text-gray-600">
              Looking for transactions matching "{searchTerm}"
            </p>
          </div>
        )}

        {/* No Results Message */}
        {isSearchMode && showNoResults && paginatedTransactions.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
            <p className="text-gray-600 mb-4">
              No transactions match your search criteria for "{searchTerm}"
            </p>
            <button
              onClick={handleClearSearch}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Show all transactions
            </button>
          </div>
        )}

        {/* Data Table */}
        {(!isSearchMode || paginatedTransactions.length > 0) && (
          <>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Transaction
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Client
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedTransactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{transaction.reference}</div>
                            <div className="text-sm text-gray-500">{transaction.description}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{transaction.clientName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm font-medium ${getTypeColor(transaction.type)}`}>
                            {transaction.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {transaction.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {transaction.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <button className="text-blue-600 hover:text-blue-900" onClick={() => handleViewTransaction(transaction)}>
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900" onClick={() => handleEditTransaction(transaction)}>
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900" onClick={() => handleDeleteTransaction(transaction.id)}>
                              <Trash2 className="h-4 w-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                    <span className="font-medium">{Math.min(endIndex, filteredTransactions.length)}</span> of{' '}
                    <span className="font-medium">{filteredTransactions.length}</span> results
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">Show:</span>
                    <select
                      value={recordsPerPage}
                      onChange={(e) => setRecordsPerPage(Number(e.target.value))}
                      className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                    >
                      <option value={10}>10</option>
                      <option value={25}>25</option>
                      <option value={100}>100</option>
                    </select>
                    <span className="text-sm text-gray-700">per page</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-[#726acf] text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                      if (pageNum > totalPages) return null;
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-1 text-sm rounded ${
                            currentPage === pageNum
                              ? 'bg-[#271e76] text-white'
                              : 'border border-gray-300 hover:bg-[#726acf] text-gray-900'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button 
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-[#726acf] text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
          </div>
        </div>
          </>
        )}
      </div>

      {/* Modals */}
      <TransactionDetailModal
        transaction={selectedTransaction}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onEdit={handleEditTransaction}
        onApprove={handleApproveTransaction}
      />

      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={handleCloseAddModal}
        onAddTransaction={handleAddTransaction}
      />
    </DashboardLayout>
  );
}