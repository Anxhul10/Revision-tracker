import type { Question, QuestionFilters } from '../../types';
import { getReviewStatus, sortQuestions } from '../../utils/revision';
import { QuestionRow } from './QuestionRow';

interface QuestionTableProps {
  questions: Question[];
  currentDay: number;
  filters: QuestionFilters;
  onMarkReviewed: (id: string) => void;
}

function filterQuestions(
  questions: Question[],
  filters: QuestionFilters,
  currentDay: number
): Question[] {
  return questions.filter((q) => {
    if (filters.search) {
      const s = filters.search.toLowerCase();
      const haystack = `${q.title} ${q.platform} ${q.topic} ${q.difficulty}`.toLowerCase();
      if (!haystack.includes(s)) return false;
    }
    if (filters.topic && q.topic !== filters.topic) return false;
    if (filters.platform && q.platform !== filters.platform) return false;
    if (filters.difficulty && q.difficulty !== filters.difficulty) return false;
    if (filters.dueTodayOnly) {
      const status = getReviewStatus(q, currentDay);
      if (status !== 'due' && status !== 'overdue') return false;
    }
    return true;
  });
}

export function QuestionTable({
  questions,
  currentDay,
  filters,
  onMarkReviewed,
}: QuestionTableProps) {
  const filtered = filterQuestions(questions, filters, currentDay);
  const sorted = sortQuestions(filtered, currentDay);

  if (sorted.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-surface-border bg-surface-raised/50 px-6 py-16 text-center">
        <p className="text-gray-400">No questions match your filters.</p>
        <p className="mt-1 text-sm text-gray-500">Add one with the + button below.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-surface-border bg-surface-raised">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-surface-border bg-surface-overlay/50">
            <th className="px-4 py-3 font-semibold text-gray-400">Title</th>
            <th className="hidden px-4 py-3 font-semibold text-gray-400 sm:table-cell">Platform</th>
            <th className="hidden px-4 py-3 font-semibold text-gray-400 md:table-cell">Topic</th>
            <th className="px-4 py-3 font-semibold text-gray-400">Difficulty</th>
            <th className="hidden px-4 py-3 font-semibold text-gray-400 lg:table-cell">Solved</th>
            <th className="px-4 py-3 font-semibold text-gray-400">Next Review</th>
            <th className="hidden px-4 py-3 font-semibold text-gray-400 xl:table-cell">Stage</th>
            <th className="px-4 py-3 font-semibold text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((q) => (
            <QuestionRow
              key={q.id}
              question={q}
              currentDay={currentDay}
              onMarkReviewed={onMarkReviewed}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
