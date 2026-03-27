'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/widgets/page-header/PageHeader';
import { QuickAddGrid } from '@/features/order-management/ui/QuickAddGrid';
import { TestSearchBar } from '@/features/order-management/ui/TestSearchBar';
import { TestCatalogTabs } from '@/features/order-management/ui/TestCatalogTabs';
import { TestCatalogList } from '@/features/order-management/ui/TestCatalogList';
import { OrderSummary } from '@/features/order-management/ui/OrderSummary';
import { useOrderStore } from '@/features/order-management/model/useOrderStore';
import { orderApi } from '@/features/order-management/api/orderApi';
import { DiagnosticTest, TestCategory } from '@/entities/test/model/types';
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';
import { EmptyState } from '@/shared/ui/EmptyState';
import { AlertCircle } from 'lucide-react';
import { useIsMobile } from '@/shared/hooks/useMediaQuery';

export function DoctorTerminalPage() {
  const isMobile = useIsMobile();
  const { paymentLink, reset } = useOrderStore();
  
  const [tests, setTests] = useState<DiagnosticTest[]>([]);
  const [filteredTests, setFilteredTests] = useState<DiagnosticTest[]>([]);
  const [activeCategory, setActiveCategory] = useState<TestCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTests();
  }, []);

  useEffect(() => {
    filterTests();
  }, [tests, activeCategory, searchQuery]);

  const fetchTests = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedTests = await orderApi.fetchTests();
      setTests(fetchedTests);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch tests');
    } finally {
      setIsLoading(false);
    }
  };

  const filterTests = () => {
    let filtered = tests;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(test => test.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(test =>
        test.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredTests(filtered);
  };

  const handleAddTest = (test: DiagnosticTest) => {
    // If payment link exists, reset the order first
    if (paymentLink) {
      reset();
    }
    // Add the test (handled by the store)
  };

  // Redirect to payment if payment link exists
  useEffect(() => {
    if (paymentLink) {
      window.location.href = paymentLink;
    }
  }, [paymentLink]);

  if (isLoading && tests.length === 0) {
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
          title="Error loading tests"
          description={error}
          icon={<AlertCircle className="h-12 w-12 text-red-400" />}
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      <PageHeader 
        title="Doctor's Order Terminal" 
        subtitle="Select diagnostic tests for patient and generate payment link" 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left/Top: Test Selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Add Grid */}
          <QuickAddGrid 
            tests={tests} 
            onAddTest={handleAddTest}
          />

          {/* Search and Filters */}
          <div className="space-y-4">
            <TestSearchBar onSearch={setSearchQuery} />
            <TestCatalogTabs 
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          {/* Test Catalog */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Available Tests ({filteredTests.length})
            </h3>
            {filteredTests.length === 0 ? (
              <EmptyState
                title="No tests found"
                description="Try adjusting your search or filters"
              />
            ) : (
              <TestCatalogList tests={filteredTests} />
            )}
          </div>
        </div>

        {/* Right/Bottom: Order Summary */}
        <div className={isMobile ? 'order-first' : ''}>
          <div className={isMobile ? 'mb-6' : 'sticky top-6'}>
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
