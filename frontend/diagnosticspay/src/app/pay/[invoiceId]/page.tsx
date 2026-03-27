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
import { AlertCircle, ShieldCheck } from 'lucide-react';

export default function InvoicePage() {
  const params = useParams();
  const invoiceId = params?.invoiceId as string;
  const { invoice, paymentStatus, error, fetchInvoice } = usePaymentStore();

  useEffect(() => {
    if (invoiceId) {
      fetchInvoice(invoiceId);
    }
  }, [invoiceId, fetchInvoice]);

  if (paymentStatus === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !invoice) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#F8FAFC]">
        <EmptyState
          title="Invoice not found"
          description={error || "This invoice doesn't exist or has expired."}
          icon={<AlertCircle className="h-12 w-12 text-red-400" />}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 px-4">
      <div className="max-w-md mx-auto">
        <InvoiceHeader invoiceNumber={invoice.invoice_number} />
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
          <InvoicePatientInfo
            patientName={invoice.patient_name}
            providerName={invoice.provider_name}
            date={invoice.date}
          />
          <InvoiceLineItems tests={invoice.tests} />
          <InvoiceTotals subtotal={invoice.subtotal} total={invoice.total} />
        </div>
        <PayButton invoiceId={invoiceId} amount={invoice.total} className="mb-4" />
        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
          <ShieldCheck className="h-4 w-4" />
          <span>Secured by Interswitch</span>
        </div>
      </div>
    </div>
  );
}
