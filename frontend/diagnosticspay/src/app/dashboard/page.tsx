'use client';

import { PageHeader } from '@/widgets/page-header/PageHeader';
import { RevenueStatCards } from '@/features/lab-dashboard/ui/RevenueStatCards';
import { TransactionTable } from '@/features/lab-dashboard/ui/TransactionTable';
import { useDashboardStore } from '@/features/lab-dashboard/model/useDashboardStore';
import { useEffect } from 'react';
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';
import { EmptyState } from '@/shared/ui/EmptyState';
import { AlertCircle } from 'lucide-react';

export default function LabDashboardPage() {
  const { stats, transactions, expandedTxnId, isLoading, error, fetchData, toggleExpand } = useDashboardStore();

  useEffect(() => {
    // Fetch data for provider ID 1 (LASUTH)
    fetchData(1);
  }, [fetchData]);

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <EmptyState
          title="Error loading dashboard"
          description={error}
          icon={<AlertCircle className="h-12 w-12 text-red-400" />}
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      <PageHeader 
        title="Lab Dashboard" 
        subtitle="Financial overview and transaction ledger" 
      />
      
      {stats && (
        <RevenueStatCards
          totalRevenue={stats.totalRevenue}
          settledSplits={stats.settledSplits}
          activeOrders={stats.activeOrders}
          className="mb-8"
        />
      )}
      
      <TransactionTable
        transactions={transactions}
        expandedTxnId={expandedTxnId}
        onToggleExpand={toggleExpand}
      />
    </div>
  );
}
