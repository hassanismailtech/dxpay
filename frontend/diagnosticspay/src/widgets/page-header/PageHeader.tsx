import { cn } from '@/shared/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function PageHeader({ title, subtitle, className }: PageHeaderProps) {
  return (
    <div className={cn('mb-8', className)}>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
      {subtitle && (
        <p className="text-gray-600 text-sm">{subtitle}</p>
      )}
    </div>
  );
}
