import type { AddTheoryForm, TheoryItem, TheoryRevisionStage } from '../types';

const THEORY_INTERVALS: Record<Exclude<TheoryRevisionStage, 'mastered'>, number> = {
  '2d': 2,
  '7d': 7,
  '21d': 21,
  '30d': 30,
  '60d': 60,
};

const THEORY_STAGE_ORDER: TheoryRevisionStage[] = [
  '2d',
  '7d',
  '21d',
  '30d',
  '60d',
  'mastered',
];

export function createTheoryFromForm(form: AddTheoryForm, currentDay: number): TheoryItem {
  const loopIntervalDays = Math.max(1, Math.floor(form.loopIntervalDays));
  const firstReviewGap = form.revisionMode === 'loop' ? loopIntervalDays : THEORY_INTERVALS['2d'];

  return {
    id: crypto.randomUUID(),
    title: form.title.trim(),
    notesLink: form.notesLink.trim(),
    addedDay: currentDay,
    nextReviewDay: currentDay + firstReviewGap,
    revisionMode: form.revisionMode,
    revisionStage: '2d',
    completed: false,
    loopIntervalDays: form.revisionMode === 'loop' ? loopIntervalDays : undefined,
    loopReviewCount: form.revisionMode === 'loop' ? 0 : undefined,
  };
}

export function markTheoryReviewed(theory: TheoryItem, currentDay: number): TheoryItem {
  if (theory.completed) return theory;

  if (theory.revisionMode === 'loop') {
    const loopIntervalDays = Math.max(1, theory.loopIntervalDays ?? THEORY_INTERVALS['2d']);
    const reviewedDay = Math.max(currentDay, theory.nextReviewDay);
    return {
      ...theory,
      loopIntervalDays,
      loopReviewCount: Math.max(0, theory.loopReviewCount ?? 0) + 1,
      nextReviewDay: reviewedDay + loopIntervalDays,
      completed: false,
    };
  }

  const stageIndex = THEORY_STAGE_ORDER.indexOf(theory.revisionStage);
  const nextStage =
    stageIndex === -1 || stageIndex >= THEORY_STAGE_ORDER.length - 1
      ? 'mastered'
      : THEORY_STAGE_ORDER[stageIndex + 1];

  if (nextStage === 'mastered') {
    return {
      ...theory,
      revisionStage: 'mastered',
      completed: true,
      nextReviewDay: currentDay,
    };
  }

  return {
    ...theory,
    revisionStage: nextStage,
    nextReviewDay: currentDay + THEORY_INTERVALS[nextStage],
    completed: false,
  };
}

export function formatTheoryRevision(theory: TheoryItem): string {
  if (theory.completed) return 'Mastered';
  if (theory.revisionMode === 'loop') {
    return `Loop ${Math.max(1, theory.loopIntervalDays ?? THEORY_INTERVALS['2d'])}d`;
  }
  return theory.revisionStage;
}
