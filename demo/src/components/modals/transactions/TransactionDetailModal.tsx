'use client';

import { X, CreditCard, User, Calendar, DollarSign, FileText, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { Transaction } from '@/types/transaction';

interface TransactionDetailModalProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (transaction: Transaction) => void;
  onApprove?: (transaction: Transaction) => void;
}

export default function TransactionDetailModal({ 
  transaction, 
  isOpen, 
  onClose, 
  onEdit,
  onApprove
}: TransactionDetailModalProps) {
  if (!isOpen || !transaction) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed': return <CheckCircle className="h-4 w-4" />;
      case 'Pending': return <Clock className="h-4 w-4" />;
      case 'Failed': return <XCircle className="h-4 w-4" />;
      case 'Cancelled': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatAmount = (amount: string) => {
    const numAmount = parseFloat(amount);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(numAmount);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Transaction Details</h2>
              <p className="text-sm text-gray-500">Reference: {transaction.reference}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status and Type */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                {getStatusIcon(transaction.status)}
                <span className="ml-1">{transaction.status}</span>
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(transaction.type)}`}>
                {transaction.type}
              </span>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">{formatAmount(transaction.amount)}</p>
            </div>
          </div>

          {/* Client Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-full">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Client Information</h3>
                <p className="text-sm text-gray-600">ID: {transaction.clientId}</p>
                <p className="text-sm text-gray-600">{transaction.clientName}</p>
              </div>
            </div>
          </div>

          {/* Transaction Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-900">{formatDate(transaction.date)}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-900">{formatAmount(transaction.amount)}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(transaction.type)}`}>
                  {transaction.type}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                  {getStatusIcon(transaction.status)}
                  <span className="ml-1">{transaction.status}</span>
                </span>
              </div>

              {transaction.approvedBy && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Approved By</label>
                  <span className="text-sm text-gray-900">{transaction.approvedBy}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-900">{transaction.description}</p>
            </div>
          </div>

          {/* Account Information */}
          {(transaction.accountFrom || transaction.accountTo) && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Account Information</label>
              <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                {transaction.accountFrom && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">From:</span>
                    <span className="text-sm text-gray-900">{transaction.accountFrom}</span>
                  </div>
                )}
                {transaction.accountTo && (
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">To:</span>
                    <span className="text-sm text-gray-900">{transaction.accountTo}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Notes */}
          {transaction.notes && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-900">{transaction.notes}</p>
              </div>
            </div>
          )}

          {/* Reference */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reference Number</label>
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-900 font-mono">{transaction.reference}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Close
          </button>
          {onEdit && (
            <button
              onClick={() => onEdit(transaction)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Edit Transaction
            </button>
          )}
          {onApprove && transaction.status === 'Pending' && (
            <button
              onClick={() => onApprove(transaction)}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Approve Transaction
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
