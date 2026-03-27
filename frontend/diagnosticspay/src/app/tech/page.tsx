'use client';

import { PageHeader } from '@/widgets/page-header/PageHeader';
import { ActiveDepartmentBanner } from '@/features/tech-fulfillment/ui/ActiveDepartmentBanner';
import { DepartmentFilterTabs } from '@/features/tech-fulfillment/ui/DepartmentFilterTabs';
import { OrdersTableDesktop } from '@/features/tech-fulfillment/ui/OrdersTableDesktop';
import { useFulfillmentStore } from '@/features/tech-fulfillment/model/useFulfillmentStore';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';
import { EmptyState } from '@/shared/ui/EmptyState';
import { AlertCircle, Search } from 'lucide-react';
import { Input } from '@/shared/ui/input';

const departments = [
  { id: 'hematology', name: 'Hematology' },
  { id: 'mri', name: 'MRI Suite' },
  { id: 'imaging', name: 'Imaging' },
];

const departmentNames = {
  hematology: 'Hematology Lab',
  mri: 'MRI Suite',
  imaging: 'Imaging Department',
};

export default function TechFulfillmentPage() {
  const {
    orders,
    activeDepartment,
    activeFilter,
    searchQuery,
    isLoading,
    error,
    setDepartment,
    setFilter,
    setSearch,
    startTest,
    markSample,
    completeOrder
  } = useFulfillmentStore();

  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearch(localSearchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [localSearchQuery, setSearch]);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = !localSearchQuery || 
      order.id.toLowerCase().includes(localSearchQuery.toLowerCase()) ||
      order.patient_name.toLowerCase().includes(localSearchQuery.toLowerCase());
    
    const matchesFilter = activeFilter === 'queue' 
      ? ['paid', 'ready_to_process', 'sample_collected', 'processing'].includes(order.status)
      : ['completed'].includes(order.status);

    return matchesSearch && matchesFilter;
  });

  if (isLoading && orders.length === 0) {
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
          title="Error loading orders"
          description={error}
          icon={<AlertCircle className="h-12 w-12 text-red-400" />}
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      <PageHeader 
        title="Technician Fulfillment" 
        subtitle="Process verified orders and manage test queue" 
      />
      
      <ActiveDepartmentBanner 
        department={departmentNames[activeDepartment as keyof typeof departmentNames]} 
        className="mb-6"
      />

      <div className="mb-6">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by Order ID or Patient Name..."
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <DepartmentFilterTabs
          departments={departments}
          activeDepartment={activeDepartment}
          onDepartmentChange={(dept) => setDepartment(dept as 'hematology' | 'mri' | 'imaging')}
          activeFilter={activeFilter}
          onFilterChange={setFilter}
        />
      </div>
      
      <OrdersTableDesktop
        orders={filteredOrders}
        onStartTest={startTest}
        onMarkSample={markSample}
        onCompleteOrder={completeOrder}
      />
    </div>
  );
}
