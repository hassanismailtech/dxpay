import { Transaction } from '@/entities/transaction/model/types';
import { TransactionTableRow } from './TransactionTableRow';
import { EmptyState } from '@/shared/ui/EmptyState';
import { FileText } from 'lucide-react';

interface TransactionTableProps {
  transactions?: Transaction[];
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
  // Fallback to Figma mock data if real data is empty
  const mockTransactions: Transaction[] = [
    {
      id: 'TXN-001',
      patient_name: 'Adebayo Ogundimu',
      tests: ['Full Blood Count', 'Malaria Parasite'],
      amount: 12000,
      status: 'Paid',
      time: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      splits: [
        { provider: 'Lab Services', amount: 9600, type: 'lab' },
        { provider: 'Imaging', amount: 0, type: 'imaging' },
        { provider: 'Admin Fee (20%)', amount: 2400, type: 'admin' },
      ],
    },
    {
      id: 'TXN-002',
      patient_name: 'Fatima Ibrahim',
      tests: ['Chest X-Ray', 'Liver Function Test'],
      amount: 27000,
      status: 'Paid',
      time: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      splits: [
        { provider: 'Lab Services', amount: 12000, type: 'lab' },
        { provider: 'Imaging (X-Ray)', amount: 9600, type: 'imaging' },
        { provider: 'Admin Fee (20%)', amount: 5400, type: 'admin' },
      ],
    },
    {
      id: 'TXN-003',
      patient_name: 'Chukwuemeka Eze',
      tests: ['Abdominal Ultrasound', 'Renal Function Test'],
      amount: 37000,
      status: 'Awaiting',
      time: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
      splits: [
        { provider: 'Lab Services', amount: 10000, type: 'lab' },
        { provider: 'Imaging (Ultrasound)', amount: 19600, type: 'imaging' },
        { provider: 'Admin Fee (20%)', amount: 7400, type: 'admin' },
      ],
    },
    {
      id: 'TXN-004',
      patient_name: 'Ngozi Okonkwo',
      tests: ['Lipid Profile', 'Fasting Blood Sugar', 'HbA1c'],
      amount: 20000,
      status: 'Paid',
      time: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      splits: [
        { provider: 'Lab Services', amount: 16000, type: 'lab' },
        { provider: 'Admin Fee (20%)', amount: 4000, type: 'admin' },
      ],
    },
    {
      id: 'TXN-005',
      patient_name: 'Oluwaseun Adeleke',
      tests: ['MRI Scan'],
      amount: 120000,
      status: 'Processing',
      time: new Date(Date.now() - 1000 * 60 * 150).toISOString(),
      splits: [
        { provider: 'Imaging (MRI)', amount: 96000, type: 'imaging' },
        { provider: 'Admin Fee (20%)', amount: 24000, type: 'admin' },
      ],
    },
    {
      id: 'TXN-006',
      patient_name: 'Amina Bello',
      tests: ['Blood Group & Rhesus', 'Genotype'],
      amount: 8000,
      status: 'Paid',
      time: new Date(Date.now() - 1000 * 60 * 200).toISOString(),
      splits: [
        { provider: 'Lab Services', amount: 6400, type: 'lab' },
        { provider: 'Admin Fee (20%)', amount: 1600, type: 'admin' },
      ],
    },
  ];
  
  const displayTransactions = transactions && transactions.length > 0 ? transactions : mockTransactions;
  
  if (!displayTransactions || displayTransactions.length === 0) {
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
            {displayTransactions.map((transaction) => (
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
