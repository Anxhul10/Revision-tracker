import { forwardRef } from 'react';
import type { QuestionFilters as Filters } from '../../types';

interface QuestionFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  topics: string[];
  platforms: string[];
  difficulties: string[];
}

export const QuestionFiltersBar = forwardRef<HTMLInputElement, QuestionFiltersProps>(
  function QuestionFiltersBar(
    { filters, onChange, topics, platforms, difficulties },
    ref
  ) {
    const update = (partial: Partial<Filters>) => onChange({ ...filters, ...partial });

    const selectClass =
      'rounded-lg border border-surface-border bg-surface-overlay px-3 py-2 text-sm text-gray-200 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50 transition-colors';

    return (
      <div className="flex flex-col gap-3">
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={ref}
            type="search"
            placeholder="Search questions… (press /)"
            value={filters.search}
            onChange={(e) => update({ search: e.target.value })}
            className="w-full rounded-lg border border-surface-border bg-surface-overlay py-2.5 pl-10 pr-4 text-sm text-gray-200 placeholder:text-gray-500 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filters.topic}
            onChange={(e) => update({ topic: e.target.value })}
            className={selectClass}
            aria-label="Filter by topic"
          >
            <option value="">All topics</option>
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <select
            value={filters.platform}
            onChange={(e) => update({ platform: e.target.value })}
            className={selectClass}
            aria-label="Filter by platform"
          >
            <option value="">All platforms</option>
            {platforms.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <select
            value={filters.difficulty}
            onChange={(e) => update({ difficulty: e.target.value })}
            className={selectClass}
            aria-label="Filter by difficulty"
          >
            <option value="">All difficulties</option>
            {difficulties.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-surface-border bg-surface-overlay px-3 py-2 text-sm text-gray-300 hover:bg-surface-overlay/80 transition-colors">
            <input
              type="checkbox"
              checked={filters.dueTodayOnly}
              onChange={(e) => update({ dueTodayOnly: e.target.checked })}
              className="rounded border-surface-border bg-surface text-accent focus:ring-accent/50"
            />
            Due today only
          </label>
        </div>
      </div>
    );
  }
);
