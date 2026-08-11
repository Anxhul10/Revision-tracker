import type { DashboardStats } from '../../utils/stats';

interface StatCardsProps {
  stats: DashboardStats;
}

const cards: {
  key: keyof DashboardStats;
  label: string;
  accent: string;
}[] = [
  { key: 'total', label: 'Total Questions', accent: 'text-accent' },
  { key: 'dueToday', label: 'Due Today', accent: 'text-red-400' },
  { key: 'completed', label: 'Completed', accent: 'text-emerald-400' },
  { key: 'mostPracticedTopic', label: 'Top Topic', accent: 'text-amber-400' },
  { key: 'theory', label: 'Theory', accent: 'text-cyan-400' },
];

export function StatCards({ stats }: StatCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
      {cards.map(({ key, label, accent }) => (
        <div
          key={key}
          className="rounded-xl border border-surface-border bg-surface-raised p-4 transition-colors hover:border-surface-border/80"
        >
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
            {label}
          </p>
          <p className={`mt-2 truncate text-2xl font-bold ${accent}`}>
            {stats[key]}
          </p>
        </div>
      ))}
    </div>
  );
}
