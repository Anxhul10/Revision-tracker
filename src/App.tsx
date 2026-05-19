import { useCallback, useMemo, useRef, useState } from 'react';
import { BackupControls } from './components/backup/BackupControls';
import { FloatingAddButton } from './components/FloatingAddButton';
import { KeyboardHints } from './components/KeyboardHints';
import { Header } from './components/layout/Header';
import { AddQuestionModal } from './components/modals/AddQuestionModal';
import { QuestionFiltersBar } from './components/questions/QuestionFilters';
import { QuestionTable } from './components/questions/QuestionTable';
import { StatusLegend } from './components/questions/StatusLegend';
import { ChartsSection } from './components/stats/ChartsSection';
import { StatCards } from './components/stats/StatCards';
import { ToastProvider, useToast } from './context/ToastContext';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { AddQuestionForm, Question, QuestionFilters } from './types';
import { markReviewed } from './utils/revision';
import { exportBackupToFile, importBackupFromFile } from './utils/backupFile';
import { exportState, importState } from './utils/storage';
import { dateForDay, formatDisplayDate, startDateForDay } from './utils/dates';
import { computeStats, getUniqueValues } from './utils/stats';

const defaultFilters: QuestionFilters = {
  search: '',
  topic: '',
  platform: '',
  difficulty: '',
  dueTodayOnly: false,
};

function AppContent() {
  const { state, updateState, replaceState } = useLocalStorage();
  const { showToast } = useToast();
  const [filters, setFilters] = useState<QuestionFilters>(defaultFilters);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const { currentDay, startDate, questions } = state;

  const currentDate = useMemo(
    () => dateForDay(startDate, currentDay),
    [startDate, currentDay]
  );

  const stats = useMemo(
    () => computeStats(questions, currentDay),
    [questions, currentDay]
  );

  const topics = useMemo(() => getUniqueValues(questions, 'topic'), [questions]);
  const platforms = useMemo(() => getUniqueValues(questions, 'platform'), [questions]);
  const difficulties = useMemo(
    () => getUniqueValues(questions, 'difficulty'),
    [questions]
  );

  const incrementDay = useCallback(() => {
    updateState((s) => ({ ...s, currentDay: s.currentDay + 1 }));
    showToast(`Advanced to Day ${currentDay + 1}`, 'info');
  }, [updateState, currentDay, showToast]);

  const decrementDay = useCallback(() => {
    updateState((s) => ({
      ...s,
      currentDay: Math.max(1, s.currentDay - 1),
    }));
  }, [updateState]);

  const handleDateChange = useCallback(
    (isoDate: string) => {
      updateState((s) => ({
        ...s,
        startDate: startDateForDay(isoDate, s.currentDay),
      }));
      showToast(`Current day set to ${formatDisplayDate(isoDate)}`, 'info');
    },
    [updateState, showToast]
  );

  const handleAddQuestion = useCallback(
    (form: AddQuestionForm) => {
      const newQuestion: Question = {
        id: crypto.randomUUID(),
        title: form.title.trim(),
        link: form.link.trim(),
        platform: form.platform,
        topic: form.topic,
        difficulty: form.difficulty,
        solvedDay: currentDay,
        nextReviewDay: currentDay + 2,
        revisionStage: '2d',
        completed: false,
      };
      updateState((s) => ({
        ...s,
        questions: [...s.questions, newQuestion],
      }));
      showToast(`Added "${newQuestion.title}" — review on Day ${currentDay + 2}`, 'success');
    },
    [currentDay, updateState, showToast]
  );

  const handleMarkReviewed = useCallback(
    (id: string) => {
      updateState((s) => {
        const q = s.questions.find((x) => x.id === id);
        if (!q) return s;
        const updated = markReviewed(q, s.currentDay);
        const message = updated.completed
          ? `"${updated.title}" mastered!`
          : `"${updated.title}" → next review Day ${updated.nextReviewDay} (${updated.revisionStage})`;
        showToast(message, updated.completed ? 'success' : 'info');
        return {
          ...s,
          questions: s.questions.map((x) => (x.id === id ? updated : x)),
        };
      });
    },
    [updateState, showToast]
  );

  const handleExport = useCallback(async () => {
    const json = exportState(state);
    const defaultName = `dsa-revision-backup-day-${currentDay}.json`;
    try {
      const saved = await exportBackupToFile(json, defaultName);
      if (saved) showToast('Backup exported', 'success');
    } catch {
      showToast('Export failed', 'error');
    }
  }, [state, currentDay, showToast]);

  const handleImport = useCallback(async () => {
    try {
      const content = await importBackupFromFile();
      if (!content) return;

      const imported = importState(content);
      replaceState(imported);
      showToast(`Imported ${imported.questions.length} questions`, 'success');
    } catch {
      showToast('Invalid backup file', 'error');
    }
  }, [replaceState, showToast]);

  useKeyboardShortcuts({
    onIncrementDay: incrementDay,
    onDecrementDay: decrementDay,
    onOpenAdd: () => setAddModalOpen(true),
    onFocusSearch: () => searchRef.current?.focus(),
  });

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <Header
        currentDay={currentDay}
        currentDate={currentDate}
        onIncrementDay={incrementDay}
        onDecrementDay={decrementDay}
        onDateChange={handleDateChange}
      />

      <section className="mt-8 space-y-6 animate-fade-in">
        <StatCards stats={stats} />
        <ChartsSection questions={questions} />

        <div className="rounded-xl border border-surface-border bg-surface-raised p-5">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-gray-100">Questions</h2>
            <BackupControls onExport={handleExport} onImport={handleImport} />
          </div>

          <QuestionFiltersBar
            ref={searchRef}
            filters={filters}
            onChange={setFilters}
            topics={topics}
            platforms={platforms}
            difficulties={difficulties}
          />

          <StatusLegend />

          <div className="mt-4">
            <QuestionTable
              questions={questions}
              currentDay={currentDay}
              filters={filters}
              onMarkReviewed={handleMarkReviewed}
            />
          </div>
        </div>

        <KeyboardHints />
      </section>

      <FloatingAddButton onClick={() => setAddModalOpen(true)} />
      <AddQuestionModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={handleAddQuestion}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
