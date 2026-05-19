export function StatusLegend() {
  const items = [
    { label: 'Due / Overdue', className: 'border-l-red-400 bg-red-500/10' },
    { label: 'Upcoming', className: 'border-l-amber-500/70 bg-amber-500/10' },
    { label: 'Mastered', className: 'border-l-emerald-500 bg-emerald-500/10' },
  ];

  return (
    <div className="flex flex-wrap gap-3 text-xs text-gray-500">
      {items.map(({ label, className }) => (
        <span key={label} className="flex items-center gap-2">
          <span className={`h-3 w-1 rounded-full border-l-4 ${className}`} />
          {label}
        </span>
      ))}
    </div>
  );
}
