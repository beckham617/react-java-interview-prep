export type Transaction = {
  id: number;
  clientId: number;
  clientName: string;
  type: 'Deposit' | 'Withdrawal' | 'Transfer' | 'Investment' | 'Distribution';
  amount: string;
  status: 'Pending' | 'Completed' | 'Failed' | 'Cancelled';
  date: string;
  description: string;
  reference: string;
  accountFrom?: string;
  accountTo?: string;
  approvedBy?: string;
  notes?: string;
};
