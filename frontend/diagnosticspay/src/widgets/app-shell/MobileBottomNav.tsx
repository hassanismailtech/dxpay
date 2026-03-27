'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import { Stethoscope, LayoutDashboard, FlaskConical, Receipt } from 'lucide-react';

const navItems = [
  { href: '/',          label: 'Doctor',  icon: Stethoscope },
  { href: '/dashboard', label: 'Lab',     icon: LayoutDashboard },
  { href: '/tech',      label: 'Tech',    icon: FlaskConical },
  { href: '/pay/demo',  label: 'Invoice', icon: Receipt },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  // Don't show on patient invoice pages (they get a clean layout)
  if (pathname.startsWith('/pay/')) return null;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-area-pb">
      <ul className="flex justify-around py-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={cn(
                  'flex flex-col items-center gap-1 py-2 transition-colors duration-150',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <div className={cn(
                  'relative p-1.5 rounded-xl transition-all duration-150',
                  isActive && 'bg-primary/10'
                )}>
                  <Icon className="w-5 h-5" />
                  {isActive && (
                    <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-primary rounded-full" />
                  )}
                </div>
                <span className={cn(
                  'text-[10px] font-medium leading-none',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}>
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
