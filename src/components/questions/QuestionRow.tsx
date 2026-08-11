import type { Question } from '../../types';
import { difficultyBadgeClass, formatDifficultyLabel } from '../../utils/difficulty';
import { openExternalLink } from '../../utils/openLink';
import { formatQuestionRevision, getReviewStatus } from '../../utils/revision';
import { Button } from '../ui/Button';

interface QuestionRowProps {
  question: Question;
  currentDay: number;
  onMarkReviewed: (id: string) => void;
  onEdit: (id: string) => void;
}

const statusStyles = {
  overdue: 'border-l-red-500 bg-red-500/5',
  due: 'border-l-red-400 bg-red-500/8',
  upcoming: 'border-l-amber-500/70 bg-amber-500/5',
  completed: 'border-l-emerald-500 bg-emerald-500/5',
};

export function QuestionRow({
  question,
  currentDay,
  onMarkReviewed,
  onEdit,
}: QuestionRowProps) {
  const status = getReviewStatus(question, currentDay);
  const rowClass = statusStyles[status];

  return (
    <tr className={`border-l-4 border-b border-surface-border transition-colors hover:bg-surface-overlay/30 ${rowClass}`}>
      <td className="px-4 py-3">
        <span className="font-medium text-gray-100">{question.title}</span>
        {status === 'overdue' && (
          <span className="ml-2 text-xs font-medium text-red-400">
            ({currentDay - question.nextReviewDay}d overdue)
          </span>
        )}
      </td>
      <td className="hidden px-4 py-3 text-sm text-gray-400 sm:table-cell">{question.platform}</td>
      <td className="hidden px-4 py-3 text-sm text-gray-400 md:table-cell">{question.topic}</td>
      <td className="px-4 py-3">
        <span
          className={`inline-block rounded-md px-2 py-0.5 text-xs font-medium ${difficultyBadgeClass(question.difficulty)}`}
        >
          {formatDifficultyLabel(question.difficulty)}
        </span>
      </td>
      <td className="hidden px-4 py-3 text-sm text-gray-400 lg:table-cell">Day {question.solvedDay}</td>
      <td className="px-4 py-3 text-sm text-gray-300">
        {question.completed ? '—' : `Day ${question.nextReviewDay}`}
      </td>
      <td className="hidden px-4 py-3 text-sm text-gray-400 xl:table-cell">
        {formatQuestionRevision(question)}
      </td>
      <td className="px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => openExternalLink(question.link)}
            className="inline-flex items-center rounded-lg border border-surface-border bg-surface-overlay px-2.5 py-1.5 text-xs font-medium text-gray-300 hover:border-accent/50 hover:text-accent transition-colors"
          >
            Open
          </button>
          <Button variant="secondary" size="sm" onClick={() => onEdit(question.id)}>
            Edit
          </Button>
          {!question.completed && (
            <Button
              variant="success"
              size="sm"
              onClick={() => onMarkReviewed(question.id)}
            >
              Reviewed
            </Button>
          )}
          {question.completed && (
            <span className="text-xs font-medium text-emerald-400">Mastered</span>
          )}
        </div>
      </td>
    </tr>
  );
}
