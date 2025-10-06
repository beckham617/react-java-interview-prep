import { Transaction } from '@/types/transaction';

const LOCAL_STORAGE_KEY = 'trust_company_transactions';

const initialTransactions: Transaction[] = [
  {
    id: 1,
    clientId: 1,
    clientName: 'John Smith',
    type: 'Deposit',
    amount: 50000,
    status: 'Completed',
    date: '2024-01-15',
    description: 'Initial trust funding deposit',
    reference: 'TXN-2024-001',
    accountFrom: 'Smith Enterprises Business Account',
    accountTo: 'Smith Family Trust',
    approvedBy: 'Sarah Wilson',
    notes: 'Initial funding for family trust establishment'
  },
  {
    id: 2,
    clientId: 2,
    clientName: 'Sarah Johnson',
    type: 'Investment',
    amount: 125000,
    status: 'Completed',
    date: '2024-01-14',
    description: 'Investment in diversified portfolio',
    reference: 'TXN-2024-002',
    accountFrom: 'TechCorp Charitable Trust',
    accountTo: 'Investment Portfolio A',
    approvedBy: 'Michael Chen',
    notes: 'Portfolio rebalancing - increased equity allocation'
  },
  {
    id: 3,
    clientId: 3,
    clientName: 'Michael Chen',
    type: 'Withdrawal',
    amount: 25000,
    status: 'Pending',
    date: '2024-01-13',
    description: 'Quarterly distribution to beneficiary',
    reference: 'TXN-2024-003',
    accountFrom: 'Global Finance Investment Trust',
    accountTo: 'Chen Family Distribution Account',
    approvedBy: 'Sarah Wilson',
    notes: 'Regular quarterly distribution as per trust terms'
  },
  {
    id: 4,
    clientId: 4,
    clientName: 'Emily Rodriguez',
    type: 'Transfer',
    amount: 75000,
    status: 'Completed',
    date: '2024-01-12',
    description: 'Transfer between trust accounts',
    reference: 'TXN-2024-004',
    accountFrom: 'Healthcare Foundation Trust - General',
    accountTo: 'Healthcare Foundation Trust - Investment',
    approvedBy: 'David Thompson',
    notes: 'Internal transfer for investment reallocation'
  },
  {
    id: 5,
    clientId: 5,
    clientName: 'David Thompson',
    type: 'Deposit',
    amount: 200000,
    status: 'Completed',
    date: '2024-01-11',
    description: 'Additional funding for real estate investment',
    reference: 'TXN-2024-005',
    accountFrom: 'Thompson Real Estate Holdings',
    accountTo: 'Thompson Family Trust',
    approvedBy: 'Lisa Anderson',
    notes: 'Additional capital for commercial property acquisition'
  },
  {
    id: 6,
    clientId: 6,
    clientName: 'Lisa Anderson',
    type: 'Distribution',
    amount: 15000,
    status: 'Completed',
    date: '2024-01-10',
    description: 'Monthly distribution to beneficiaries',
    reference: 'TXN-2024-006',
    accountFrom: 'Anderson Consulting Trust',
    accountTo: 'Anderson Family Distribution',
    approvedBy: 'Robert Wilson',
    notes: 'Monthly distribution as per trust agreement'
  },
  {
    id: 7,
    clientId: 7,
    clientName: 'Robert Wilson',
    type: 'Investment',
    amount: 300000,
    status: 'Failed',
    date: '2024-01-09',
    description: 'Investment in private equity fund',
    reference: 'TXN-2024-007',
    accountFrom: 'Wilson Manufacturing Trust',
    accountTo: 'Private Equity Fund Alpha',
    notes: 'Transaction failed due to insufficient documentation'
  },
  {
    id: 8,
    clientId: 8,
    clientName: 'Jennifer Brown',
    type: 'Withdrawal',
    amount: 40000,
    status: 'Completed',
    date: '2024-01-08',
    description: 'Emergency withdrawal for medical expenses',
    reference: 'TXN-2024-008',
    accountFrom: 'Brown Retail Charitable Trust',
    accountTo: 'Brown Family Emergency Fund',
    approvedBy: 'Alex Martinez',
    notes: 'Emergency medical expense withdrawal approved'
  },
  {
    id: 9,
    clientId: 9,
    clientName: 'Alex Martinez',
    type: 'Deposit',
    amount: 80000,
    status: 'Pending',
    date: '2024-01-07',
    description: 'Series A funding deposit',
    reference: 'TXN-2024-009',
    accountFrom: 'TechStartup Inc Operating Account',
    accountTo: 'TechStartup Investment Trust',
    notes: 'Series A funding round proceeds'
  },
  {
    id: 10,
    clientId: 10,
    clientName: 'Maria Garcia',
    type: 'Transfer',
    amount: 150000,
    status: 'Completed',
    date: '2024-01-06',
    description: 'Transfer to international investment account',
    reference: 'TXN-2024-010',
    accountFrom: 'Garcia Family Office Trust',
    accountTo: 'Garcia International Holdings',
    approvedBy: 'James Wilson',
    notes: 'International diversification transfer'
  },
  {
    id: 11,
    clientId: 11,
    clientName: 'James Wilson',
    type: 'Investment',
    amount: 500000,
    status: 'Completed',
    date: '2024-01-05',
    description: 'Investment in sustainable energy fund',
    reference: 'TXN-2024-011',
    accountFrom: 'Wilson Philanthropy Trust',
    accountTo: 'Green Energy Investment Fund',
    approvedBy: 'Sarah Davis',
    notes: 'ESG-focused investment allocation'
  },
  {
    id: 12,
    clientId: 12,
    clientName: 'Sarah Davis',
    type: 'Distribution',
    amount: 30000,
    status: 'Cancelled',
    date: '2024-01-04',
    description: 'Quarterly distribution to beneficiaries',
    reference: 'TXN-2024-012',
    accountFrom: 'Davis Investment Group Trust',
    accountTo: 'Davis Family Distribution',
    notes: 'Distribution cancelled per beneficiary request'
  },
  {
    id: 13,
    clientId: 1,
    clientName: 'John Smith',
    type: 'Investment',
    amount: 35000,
    status: 'Completed',
    date: '2024-01-03',
    description: 'Investment in bond portfolio',
    reference: 'TXN-2024-013',
    accountFrom: 'Smith Family Trust',
    accountTo: 'Conservative Bond Portfolio',
    approvedBy: 'Sarah Wilson',
    notes: 'Conservative investment allocation'
  },
  {
    id: 14,
    clientId: 2,
    clientName: 'Sarah Johnson',
    type: 'Withdrawal',
    amount: 10000,
    status: 'Completed',
    date: '2024-01-02',
    description: 'Educational expense withdrawal',
    reference: 'TXN-2024-014',
    accountFrom: 'TechCorp Charitable Trust',
    accountTo: 'Johnson Education Fund',
    approvedBy: 'Michael Chen',
    notes: 'Educational expense for beneficiary'
  },
  {
    id: 15,
    clientId: 3,
    clientName: 'Michael Chen',
    type: 'Deposit',
    amount: 100000,
    status: 'Pending',
    date: '2024-01-01',
    description: 'Year-end bonus deposit',
    reference: 'TXN-2024-015',
    accountFrom: 'Global Finance Ltd Operating',
    accountTo: 'Global Finance Investment Trust',
    notes: 'Year-end performance bonus allocation'
  }
];

export const TransactionDataService = {
  getTransactions: (): Transaction[] => {
    if (typeof window === 'undefined') {
      return initialTransactions; // Return initial transactions for SSR
    }
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (data) {
        const transactions = JSON.parse(data) as Transaction[];
        // Migrate old string amounts to numeric amounts
        const migratedTransactions = transactions.map(transaction => {
          const originalAmount = transaction.amount;
          const migratedAmount = typeof transaction.amount === 'string' 
            ? parseFloat((transaction.amount as string).replace(/[$,]/g, '')) || 0
            : transaction.amount;
          
          // Debug logging
          if (typeof originalAmount === 'string') {
            console.log(`Migrating amount: "${originalAmount}" -> ${migratedAmount}`);
          }
          
          return {
            ...transaction,
            amount: migratedAmount
          };
        });
        return migratedTransactions;
      }
    } catch (error) {
      console.error("Error reading from localStorage", error);
    }
    // Initialize with mock data if no data in localStorage
    TransactionDataService.saveTransactions(initialTransactions);
    return initialTransactions;
  },

  saveTransactions: (transactions: Transaction[]): void => {
    if (typeof window === 'undefined') {
      return;
    }
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(transactions));
    } catch (error) {
      console.error("Error writing to localStorage", error);
    }
  },

  addTransaction: (newTransaction: Omit<Transaction, 'id'>): Transaction => {
    const transactions = TransactionDataService.getTransactions();
    const newId = transactions.length > 0 ? Math.max(...transactions.map(t => t.id)) + 1 : 1;
    const transactionWithId: Transaction = { ...newTransaction, id: newId };
    transactions.push(transactionWithId);
    TransactionDataService.saveTransactions(transactions);
    return transactionWithId;
  },

  getTransactionById: (id: number): Transaction | undefined => {
    const transactions = TransactionDataService.getTransactions();
    return transactions.find(transaction => transaction.id === id);
  },

  getTransactionsByClientId: (clientId: number): Transaction[] => {
    const transactions = TransactionDataService.getTransactions();
    return transactions.filter(transaction => transaction.clientId === clientId);
  },

  updateTransaction: (id: number, updates: Partial<Transaction>): Transaction | undefined => {
    const transactions = TransactionDataService.getTransactions();
    const transactionIndex = transactions.findIndex(transaction => transaction.id === id);
    if (transactionIndex > -1) {
      transactions[transactionIndex] = { ...transactions[transactionIndex], ...updates };
      TransactionDataService.saveTransactions(transactions);
      return transactions[transactionIndex];
    }
    return undefined;
  },

  deleteTransaction: (id: number): boolean => {
    let transactions = TransactionDataService.getTransactions();
    const initialLength = transactions.length;
    transactions = transactions.filter(transaction => transaction.id !== id);
    if (transactions.length < initialLength) {
      TransactionDataService.saveTransactions(transactions);
      return true;
    }
    return false;
  },

  getTransactionStats: () => {
    const transactions = TransactionDataService.getTransactions();
    const total = transactions.length;
    const completed = transactions.filter(t => t.status === 'Completed').length;
    const pending = transactions.filter(t => t.status === 'Pending').length;
    const failed = transactions.filter(t => t.status === 'Failed').length;
    const cancelled = transactions.filter(t => t.status === 'Cancelled').length;
    
    // Calculate total amounts
    const totalAmount = transactions
      .filter(t => t.status === 'Completed')
      .reduce((sum, t) => sum + t.amount, 0);

    return { 
      total, 
      completed, 
      pending, 
      failed, 
      cancelled, 
      totalAmount 
    };
  },

  resetToMockData: (): Transaction[] => {
    TransactionDataService.saveTransactions(initialTransactions);
    return initialTransactions;
  },

  clearAndReset: (): Transaction[] => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      console.log('Cleared localStorage and reset to initial data');
    }
    TransactionDataService.saveTransactions(initialTransactions);
    return initialTransactions;
  },

  // Temporary debugging function
  debugData: () => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      console.log('localStorage data:', data);
      if (data) {
        const parsed = JSON.parse(data);
        console.log('Parsed data:', parsed);
        console.log('First transaction amount:', parsed[0]?.amount, 'type:', typeof parsed[0]?.amount);
      }
    }
  },

  clearAllData: (): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }
};
