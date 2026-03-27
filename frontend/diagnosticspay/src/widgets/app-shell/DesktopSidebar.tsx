'use client';

import { cn } from '@/shared/lib/utils';
import { 
  Stethoscope, 
  LayoutGrid, 
  FlaskConical, 
  Receipt, 
  User,
  HeartPulse
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Doctor Terminal', href: '/', icon: Stethoscope },
  { name: 'Lab Dashboard', href: '/dashboard', icon: LayoutGrid },
  { name: 'Tech Fulfillment', href: '/tech', icon: FlaskConical },
  { name: 'Patient Invoice', href: '/pay/demo', icon: Receipt },
];

export function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col bg-[--brand-dark] text-white">
      <div className="flex flex-col grow">
        {/* Logo and Title */}
        <div className="flex items-center px-6 py-8 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-[--brand-primary] rounded-lg">
              <HeartPulse className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold">DiagnosticsPay</h1>
              <p className="text-xs text-gray-400">Medical Payments</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-[--brand-primary] text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="border-t border-gray-700 px-6 py-4">
          <div className="flex items-center space-x-3">
            <div className="shrink-0">
              <User className="h-8 w-8 bg-gray-600 rounded-full p-1" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                Dr. Akinbile
              </p>
              <p className="text-xs text-gray-400 truncate">LASUTH</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-xs text-gray-400">v1.0.0 DP</p>
            <p className="text-xs text-gray-400">Powered by Interswitch</p>
          </div>
        </div>
      </div>
    </div>
  );
}
