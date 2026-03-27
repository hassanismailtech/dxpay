'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { InvoiceHeader } from '@/features/payment/ui/InvoiceHeader';
import { InvoicePatientInfo } from '@/features/payment/ui/InvoicePatientInfo';
import { InvoiceLineItems } from '@/features/payment/ui/InvoiceLineItems';
import { InvoiceTotals } from '@/features/payment/ui/InvoiceTotals';
import { PayButton } from '@/features/payment/ui/PayButton';
import { usePaymentStore } from '@/features/payment/model/usePaymentStore';
import { LoadingSpinner } from '@/shared/ui/LoadingSpinner';
import { EmptyState } from '@/shared/ui/EmptyState';
import { AlertCircle } from 'lucide-react';

export default function InvoicePage() {
  const params = useParams();
  const invoiceId = params?.invoiceId as string;
  
  const { invoice, paymentStatus, fetchInvoice, error } = usePaymentStore();

  useEffect(() => {
    if (invoiceId) {
      fetchInvoice(invoiceId);
    }
  }, [invoiceId, fetchInvoice]);

  if (paymentStatus === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <EmptyState
          title="Invoice not found"
          description={error || "The invoice you're looking for doesn't exist or has been removed."}
          icon={<AlertCircle className="h-12 w-12 text-red-400" />}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[--surface-subtle] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <InvoiceHeader invoiceNumber={invoice.invoice_number} />
        
        <InvoicePatientInfo
          patientName={invoice.patient_name}
          providerName={invoice.provider_name}
          date={invoice.date}
        />
        
        <InvoiceLineItems tests={invoice.tests} />
        
        <InvoiceTotals
          subtotal={invoice.subtotal}
          total={invoice.total}
        />
        
        <PayButton
          invoiceId={invoiceId}
          amount={invoice.total}
          className="mb-4"
        />
        
        <div className="text-center text-sm text-gray-500">
          <p>Secured by Interswitch</p>
        </div>
      </div>
    </div>
  );
}
