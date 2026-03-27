'use client';

import { cn } from '@/shared/lib/utils';
import { 
  Stethoscope, 
  LayoutGrid, 
  FlaskConical, 
  Receipt 
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Doctor', href: '/', icon: Stethoscope },
  { name: 'Lab', href: '/dashboard', icon: LayoutGrid },
  { name: 'Tech', href: '/tech', icon: FlaskConical },
  { name: 'Patient', href: '/pay/demo', icon: Receipt },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-4 gap-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center py-2 px-1 text-xs transition-colors',
                isActive
                  ? 'text-[--brand-primary]'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              <item.icon 
                className={cn(
                  'h-5 w-5 mb-1',
                  isActive ? 'text-[--brand-primary]' : 'text-gray-400'
                )} 
              />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
