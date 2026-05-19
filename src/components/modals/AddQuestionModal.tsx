import { useState, type FormEvent } from 'react';
import type { AddQuestionForm, Difficulty } from '../../types';
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

const emptyForm: AddQuestionForm = {
  title: '',
  link: '',
  platform: 'LeetCode',
  topic: 'Arrays',
  difficulty: 'Medium',
};

interface AddQuestionModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (form: AddQuestionForm) => void;
}

export function AddQuestionModal({ open, onClose, onSubmit }: AddQuestionModalProps) {
  const [form, setForm] = useState<AddQuestionForm>(emptyForm);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.link.trim()) return;
    onSubmit(form);
    setForm(emptyForm);
    onClose();
  };

  const inputClass =
    'w-full rounded-lg border border-surface-border bg-surface-overlay px-3 py-2 text-sm text-gray-200 placeholder:text-gray-500 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50';

  return (
    <Modal open={open} onClose={onClose} title="Add Question">
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
              className={inputClass}
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
              className={inputClass}
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
              className={inputClass}
            >
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Add Question
          </Button>
        </div>
      </form>
    </Modal>
  );
}
