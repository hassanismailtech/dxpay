'use client';

import { EmptyState } from '@/shared/ui/EmptyState';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/shared/ui/button';

export default function TechError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-6">
      <div className="text-center">
        <EmptyState
          title="Tech Fulfillment Error"
          description={error.message || "Failed to load orders. Please try again."}
          icon={<AlertTriangle className="h-12 w-12 text-red-400" />}
        />
        <Button onClick={reset} className="mt-4">
          Try again
        </Button>
      </div>
    </div>
  );
}
