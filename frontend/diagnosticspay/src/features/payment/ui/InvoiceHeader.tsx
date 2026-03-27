interface InvoiceHeaderProps {
  invoiceNumber: string;
  className?: string;
}

export function InvoiceHeader({ invoiceNumber, className }: InvoiceHeaderProps) {
  return (
    <div className={`text-center mb-8 ${className}`}>
      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-[--brand-primary] rounded-lg">
            <span className="text-white font-bold text-lg">DP</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">DiagnosticsPay</h1>
            <p className="text-sm text-gray-500">Medical Payments</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 px-4 py-2 rounded-lg inline-block">
        <p className="text-sm font-medium text-gray-600">Invoice Number</p>
        <p className="text-lg font-bold text-gray-900">{invoiceNumber}</p>
      </div>
    </div>
  );
}
