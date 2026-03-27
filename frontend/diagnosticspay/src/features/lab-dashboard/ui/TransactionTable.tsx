import { Transaction } from '@/entities/transaction/model/types';
import { TransactionTableRow } from './TransactionTableRow';
import { EmptyState } from '@/shared/ui/EmptyState';
import { FileText } from 'lucide-react';

interface TransactionTableProps {
  transactions: Transaction[];
  expandedTxnId: string | null;
  onToggleExpand: (id: string) => void;
  className?: string;
}

export function TransactionTable({ 
  transactions, 
  expandedTxnId, 
  onToggleExpand, 
  className 
}: TransactionTableProps) {
  if (transactions.length === 0) {
    return (
      <EmptyState
        title="No transactions yet"
        description="Transactions will appear here once payments are processed"
        icon={<FileText className="h-12 w-12 text-gray-400" />}
        className={className}
      />
    );
  }

  return (
    <div className={`bg-white rounded-lg border border-gray-200 ${className}`}>
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Transaction Ledger</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tests
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <TransactionTableRow
                key={transaction.id}
                transaction={transaction}
                isExpanded={expandedTxnId === transaction.id}
                onToggleExpand={() => onToggleExpand(transaction.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
