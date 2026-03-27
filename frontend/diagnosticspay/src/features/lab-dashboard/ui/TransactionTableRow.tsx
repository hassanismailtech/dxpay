'use client';

import { Transaction } from '@/entities/transaction/model/types';
import { StatusBadge } from '@/shared/ui/StatusBadge';
import { CurrencyAmount } from '@/shared/ui/CurrencyAmount';
import { formatDateTime } from '@/shared/lib/utils';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { SplitEngineExpander } from './SplitEngineExpander';

interface TransactionTableRowProps {
  transaction: Transaction;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export function TransactionTableRow({ 
  transaction, 
  isExpanded, 
  onToggleExpand 
}: TransactionTableRowProps) {
  const hasSplits = transaction.splits && transaction.splits.length > 0;

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {transaction.id}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {transaction.patient_name}
        </td>
        <td className="px-6 py-4 text-sm text-gray-900">
          <div className="max-w-xs truncate">
            {transaction.tests.join(', ')}
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          <CurrencyAmount amount={transaction.amount} />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          <StatusBadge status={transaction.status} />
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {formatDateTime(transaction.time)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          {hasSplits && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleExpand}
              className="text-gray-600 hover:text-gray-900"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          )}
        </td>
      </tr>
      
      {isExpanded && hasSplits && (
        <tr>
          <td colSpan={7} className="px-6 py-0">
            <SplitEngineExpander splits={transaction.splits!} />
          </td>
        </tr>
      )}
    </>
  );
}
