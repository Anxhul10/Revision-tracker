import { useState, type FormEvent } from 'react';
import type { AddTheoryForm, TheoryRevisionMode } from '../../types';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

type AddTheoryModalForm = Omit<AddTheoryForm, 'loopIntervalDays'> & {
  loopIntervalDays: string;
};

const emptyForm: AddTheoryModalForm = {
  title: '',
  notesLink: '',
  revisionMode: 'normal',
  loopIntervalDays: '2',
};

interface AddTheoryModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (form: AddTheoryForm) => void;
}

export function AddTheoryModal({ open, onClose, onSubmit }: AddTheoryModalProps) {
  const [form, setForm] = useState<AddTheoryModalForm>(emptyForm);
  const loopIntervalDays = Number(form.loopIntervalDays);
  const hasValidLoopInterval =
    form.revisionMode === 'normal' ||
    (/^[1-9]\d*$/.test(form.loopIntervalDays) && Number.isSafeInteger(loopIntervalDays));
  const canSubmit = Boolean(form.title.trim() && form.notesLink.trim() && hasValidLoopInterval);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit({ ...form, loopIntervalDays });
    setForm(emptyForm);
    onClose();
  };

  const inputClass =
    'w-full rounded-lg border border-surface-border bg-surface-overlay px-3 py-2 text-sm text-gray-300 placeholder:text-gray-500 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/50';

  return (
    <Modal open={open} onClose={onClose} title="Add Theory">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-400">Title</label>
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={inputClass}
            placeholder="Graph traversal notes"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-400">Link to notes</label>
          <input
            required
            type="url"
            value={form.notesLink}
            onChange={(e) => setForm({ ...form, notesLink: e.target.value })}
            className={inputClass}
            placeholder="https://..."
          />
        </div>
        <div className="rounded-lg border border-surface-border bg-surface-overlay/40 p-3">
          <p className="mb-2 text-xs font-medium text-gray-400">Revision mode</p>
          <div className="grid grid-cols-2 gap-2">
            {(['normal', 'loop'] as TheoryRevisionMode[]).map((mode) => (
              <label
                key={mode}
                className="flex items-center gap-2 rounded-lg border border-surface-border bg-surface-overlay px-3 py-2 text-sm text-gray-300"
              >
                <input
                  type="radio"
                  checked={form.revisionMode === mode}
                  onChange={() => setForm({ ...form, revisionMode: mode })}
                  className="h-4 w-4 border-surface-border bg-surface-overlay text-accent focus:ring-accent/50"
                />
                {mode === 'normal' ? 'Normal' : 'Loop'}
              </label>
            ))}
          </div>
          {form.revisionMode === 'normal' && (
            <p className="mt-2 text-xs text-gray-500">Reviews on 2, 7, 21, 30, and 60 days.</p>
          )}
          {form.revisionMode === 'loop' && (
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
                onChange={(e) => setForm({ ...form, loopIntervalDays: e.target.value })}
                aria-invalid={!hasValidLoopInterval}
                className={`${inputClass} no-number-spinner`}
                placeholder="2"
              />
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={!canSubmit}>
            Add Theory
          </Button>
        </div>
      </form>
    </Modal>
  );
}
