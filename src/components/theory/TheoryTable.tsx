import type { TheoryItem } from '../../types';
import { openExternalLink } from '../../utils/openLink';
import { formatTheoryRevision } from '../../utils/theory';
import { Button } from '../ui/Button';

interface TheoryTableProps {
  theories: TheoryItem[];
  currentDay: number;
  onMarkReviewed: (id: string) => void;
}

export function TheoryTable({ theories, currentDay, onMarkReviewed }: TheoryTableProps) {
  const sorted = [...theories].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return a.nextReviewDay - b.nextReviewDay;
  });

  if (sorted.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-surface-border bg-surface-raised/50 px-6 py-10 text-center">
        <p className="text-gray-400">No theory notes added yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-surface-border bg-surface-raised">
      <table className="w-full min-w-[620px] text-left text-sm">
        <thead>
          <tr className="border-b border-surface-border bg-surface-overlay/50">
            <th className="px-4 py-3 font-semibold text-gray-400">Title</th>
            <th className="hidden px-4 py-3 font-semibold text-gray-400 md:table-cell">
              Added
            </th>
            <th className="px-4 py-3 font-semibold text-gray-400">Next Review</th>
            <th className="px-4 py-3 font-semibold text-gray-400">Mode</th>
            <th className="px-4 py-3 font-semibold text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((theory) => {
            const overdue = !theory.completed && theory.nextReviewDay < currentDay;
            return (
              <tr
                key={theory.id}
                className={`border-l-4 border-b border-surface-border transition-colors hover:bg-surface-overlay/30 ${
                  theory.completed
                    ? 'border-l-emerald-500 bg-emerald-500/5'
                    : overdue
                      ? 'border-l-red-500 bg-red-500/5'
                      : theory.nextReviewDay === currentDay
                        ? 'border-l-red-400 bg-red-500/8'
                        : 'border-l-amber-500/70 bg-amber-500/5'
                }`}
              >
                <td className="px-4 py-3">
                  <span className="font-medium text-gray-100">{theory.title}</span>
                  {overdue && (
                    <span className="ml-2 text-xs font-medium text-red-400">
                      ({currentDay - theory.nextReviewDay}d overdue)
                    </span>
                  )}
                </td>
                <td className="hidden px-4 py-3 text-sm text-gray-400 md:table-cell">
                  Day {theory.addedDay}
                </td>
                <td className="px-4 py-3 text-sm text-gray-300">
                  {theory.completed ? '-' : `Day ${theory.nextReviewDay}`}
                </td>
                <td className="px-4 py-3 text-sm text-gray-400">
                  {formatTheoryRevision(theory)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openExternalLink(theory.notesLink)}
                      className="inline-flex items-center rounded-lg border border-surface-border bg-surface-overlay px-2.5 py-1.5 text-xs font-medium text-gray-300 hover:border-accent/50 hover:text-accent transition-colors"
                    >
                      Open
                    </button>
                    {!theory.completed && (
                      <Button variant="success" size="sm" onClick={() => onMarkReviewed(theory.id)}>
                        Reviewed
                      </Button>
                    )}
                    {theory.completed && (
                      <span className="text-xs font-medium text-emerald-400">Mastered</span>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
