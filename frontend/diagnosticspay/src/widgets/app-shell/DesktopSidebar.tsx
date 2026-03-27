'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/shared/lib/utils';
import {
  Stethoscope,
  LayoutDashboard,
  FlaskConical,
  Activity,
  Receipt,
} from 'lucide-react';

const navItems = [
  { href: '/',          label: 'Doctor Terminal',   icon: Stethoscope,     sublabel: 'Order tests & generate invoices' },
  { href: '/dashboard', label: 'Lab Dashboard',     icon: LayoutDashboard, sublabel: 'Revenue & transaction ledger' },
  { href: '/tech',      label: 'Tech Fulfillment',  icon: FlaskConical,    sublabel: 'Process verified orders' },
];

export function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-[260px] bg-[--color-sidebar,var(--sidebar)] text-sidebar-foreground min-h-screen fixed left-0 top-0 z-30 border-r border-sidebar-border">
      {/* Logo Block */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary shadow-sm shadow-primary/30">
          <Activity className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-semibold text-base tracking-tight text-sidebar-foreground">
            DiagnosticsPay
          </h1>
          <p className="text-[11px] text-sidebar-foreground/50 leading-none mt-0.5">
            Medical Payments Platform
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1">
        {navItems.map(({ href, label, icon: Icon, sublabel }) => {
          const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
              )}
            >
              <Icon className={cn('w-[18px] h-[18px] flex-shrink-0', isActive ? 'text-primary-foreground' : 'text-sidebar-foreground/50 group-hover:text-sidebar-foreground')} />
              <div className="min-w-0">
                <div className="truncate">{label}</div>
                {!isActive && (
                  <div className="text-[10px] text-sidebar-foreground/40 truncate leading-none mt-0.5 group-hover:text-sidebar-foreground/60">
                    {sublabel}
                  </div>
                )}
              </div>
            </Link>
          );
        })}

        {/* Patient Invoice — external-ish, secondary item */}
        <div className="pt-3 mt-3 border-t border-sidebar-border/50">
          <p className="text-[10px] uppercase tracking-wider text-sidebar-foreground/30 px-4 pb-2 font-medium">
            Patient Facing
          </p>
          <Link
            href="/pay/demo"
            className="group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all duration-150"
          >
            <Receipt className="w-[18px] h-[18px] flex-shrink-0 text-sidebar-foreground/30 group-hover:text-sidebar-foreground/70" />
            <div className="min-w-0">
              <div className="truncate">Patient Invoice</div>
              <div className="text-[10px] text-sidebar-foreground/30 truncate leading-none mt-0.5">
                Pay via Interswitch
              </div>
            </div>
          </Link>
        </div>
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-xs font-semibold text-sidebar-foreground/70">
            DR
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-sidebar-foreground/80 truncate">Dr Akinbile · LASUTH</p>
            <p className="text-[10px] text-sidebar-foreground/40 truncate leading-none mt-0.5">
              v1.0.0 · Powered by Interswitch
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
