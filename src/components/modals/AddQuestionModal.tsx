import { useEffect, useState, type FormEvent } from 'react';
import type { AddQuestionForm, Difficulty, Question } from '../../types';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

const PLATFORMS = ['LeetCode', 'Codeforces', 'CodeChef', 'HackerRank', 'GFG', 'Other'];
const TOPICS = [
  'Arrays',
  'Strings',
  'Linked List',
  'Trees',
  'Graphs',
  'DP',
  'Greedy',
  'Binary Search',
  'Stack/Queue',
  'Heap',
  'Backtracking',
  'Math',
  'Other',
];
const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard'];

type AddQuestionModalForm = Omit<AddQuestionForm, 'loopIntervalDays'> & {
  loopIntervalDays: string;
};

const emptyForm: AddQuestionModalForm = {
  title: '',
  link: '',
  platform: 'LeetCode',
  topic: 'Arrays',
  difficulty: 'Medium',
  loopEnabled: false,
  loopIntervalDays: '2',
};

interface AddQuestionModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (form: AddQuestionForm) => void;
  question?: Question | null;
  onDelete?: (id: string) => void;
}

function formFromQuestion(question: Question | null | undefined): AddQuestionModalForm {
  if (!question) return emptyForm;
  return {
    title: question.title,
    link: question.link,
    platform: question.platform,
    topic: question.topic,
    difficulty: question.difficulty,
    loopEnabled: Boolean(question.loopEnabled),
    loopIntervalDays: String(question.loopIntervalDays ?? 2),
  };
}

export function AddQuestionModal({
  open,
  onClose,
  onSubmit,
  question,
  onDelete,
}: AddQuestionModalProps) {
  const [form, setForm] = useState<AddQuestionModalForm>(emptyForm);
  const isEditing = Boolean(question);

  useEffect(() => {
    if (open) setForm(formFromQuestion(question));
  }, [open, question]);

  const loopIntervalDays = Number(form.loopIntervalDays);
  const hasValidLoopInterval =
    !form.loopEnabled ||
    (/^[1-9]\d*$/.test(form.loopIntervalDays) && Number.isSafeInteger(loopIntervalDays));
  const canSubmit = Boolean(form.title.trim() && form.link.trim() && hasValidLoopInterval);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit({ ...form, loopIntervalDays });
    onClose();
  };

  const handleDelete = () => {
    if (!question || !onDelete) return;
    const confirmed = window.confirm(`Delete "${question.title}"?`);
    if (!confirmed) return;
    onDelete(question.id);
    onClose();
  };

  const inputClass =
    'w-full rounded-lg border border-surface-border bg-surface-overlay px-3 py-2 text-sm text-gray-300 placeholder:text-gray-500 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50';
  const selectClass = `app-select ${inputClass}`;

  return (
    <Modal open={open} onClose={onClose} title={isEditing ? 'Edit Question' : 'Add Question'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-400">Title</label>
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={inputClass}
            placeholder="Two Sum"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-400">Link</label>
          <input
            required
            type="url"
            value={form.link}
            onChange={(e) => setForm({ ...form, link: e.target.value })}
            className={inputClass}
            placeholder="https://leetcode.com/problems/two-sum/"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-400">Platform</label>
            <select
              value={form.platform}
              onChange={(e) => setForm({ ...form, platform: e.target.value })}
              className={selectClass}
            >
              {PLATFORMS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-400">Topic</label>
            <select
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
              className={selectClass}
            >
              {TOPICS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-gray-400">Difficulty</label>
            <select
              value={form.difficulty}
              onChange={(e) =>
                setForm({ ...form, difficulty: e.target.value as Difficulty })
              }
              className={selectClass}
            >
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="rounded-lg border border-surface-border bg-surface-overlay/40 p-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.loopEnabled}
              onChange={(e) => setForm({ ...form, loopEnabled: e.target.checked })}
              className="h-4 w-4 rounded border-surface-border bg-surface-overlay text-accent focus:ring-accent/50"
            />
            <span className="text-sm font-medium text-gray-300">Loop review schedule</span>
          </label>
          {form.loopEnabled && (
            <div className="mt-3">
              <label className="mb-1.5 block text-xs font-medium text-gray-400">
                Review every days
              </label>
              <input
                required
                type="text"
                inputMode="numeric"
                pattern="[1-9][0-9]*"
                value={form.loopIntervalDays}
                onChange={(e) =>
                  setForm({
                    ...form,
                    loopIntervalDays: e.target.value,
                  })
                }
                aria-invalid={!hasValidLoopInterval}
                className={`${inputClass} no-number-spinner`}
                placeholder="2"
              />
              <p className="mt-1 text-xs text-gray-500">
                After each review, the next review is scheduled this many days later.
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:items-center sm:justify-between">
          {isEditing && (
            <Button variant="danger" onClick={handleDelete} type="button">
              Delete
            </Button>
          )}
          <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={!canSubmit}>
            {isEditing ? 'Save Changes' : 'Add Question'}
          </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
