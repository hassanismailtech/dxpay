import { Calendar, MapPin } from 'lucide-react';

interface InvoicePatientInfoProps {
  patientName: string;
  providerName: string;
  date: string;
  className?: string;
}

export function InvoicePatientInfo({ 
  patientName, 
  providerName, 
  date, 
  className 
}: InvoicePatientInfoProps) {
  return (
    <div className={`bg-white p-6 rounded-lg border border-gray-200 mb-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Patient</p>
          <p className="font-medium text-gray-900">{patientName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Healthcare Provider</p>
          <p className="font-medium text-gray-900">{providerName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">Date</p>
          <p className="font-medium text-gray-900">{date}</p>
        </div>
      </div>
    </div>
  );
}
