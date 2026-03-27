interface PageHeaderProps {
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
}

export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="border-b border-border/50 bg-card px-6 py-5 lg:px-8 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-xl font-semibold text-foreground tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
      </div>
      {actions && <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>}
    </div>
  );
}
