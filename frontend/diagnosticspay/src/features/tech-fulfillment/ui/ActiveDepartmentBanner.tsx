import { Building } from 'lucide-react';

interface ActiveDepartmentBannerProps {
  department: string;
  className?: string;
}

export function ActiveDepartmentBanner({ department, className }: ActiveDepartmentBannerProps) {
  return (
    <div className={`bg-[--brand-dark] text-white px-6 py-4 rounded-lg ${className}`}>
      <div className="flex items-center space-x-3">
        <Building className="h-5 w-5 text-gray-400" />
        <div>
          <p className="text-sm text-gray-400 uppercase tracking-wide">Active Department</p>
          <p className="text-lg font-semibold">{department}</p>
        </div>
      </div>
    </div>
  );
}
