import type { Question, RevisionStage, ReviewStatus } from '../types';

export const REVISION_INTERVALS: Record<Exclude<RevisionStage, 'mastered'>, number> = {
  '2d': 2,
  '7d': 7,
  '21d': 21,
  '60d': 60,
};

const STAGE_ORDER: RevisionStage[] = ['2d', '7d', '21d', '60d', 'mastered'];

export function getNextStage(current: RevisionStage): RevisionStage {
  const idx = STAGE_ORDER.indexOf(current);
  if (idx === -1 || idx >= STAGE_ORDER.length - 1) return 'mastered';
  return STAGE_ORDER[idx + 1];
}

export function getIntervalForStage(stage: RevisionStage): number {
  if (stage === 'mastered') return 0;
  return REVISION_INTERVALS[stage];
}

export function createQuestionFromForm(
  form: Omit<Question, 'id' | 'solvedDay' | 'nextReviewDay' | 'revisionStage' | 'completed'> & {
    solvedDay: number;
  }
): Omit<Question, 'id'> {
  return {
    ...form,
    solvedDay: form.solvedDay,
    nextReviewDay: form.solvedDay + REVISION_INTERVALS['2d'],
    revisionStage: '2d',
    completed: false,
  };
}

export function markReviewed(question: Question, currentDay: number): Question {
  if (question.completed) return question;

  const nextStage = getNextStage(question.revisionStage);

  if (nextStage === 'mastered') {
    return {
      ...question,
      revisionStage: 'mastered',
      completed: true,
      nextReviewDay: currentDay,
    };
  }

  const interval = getIntervalForStage(nextStage);
  return {
    ...question,
    revisionStage: nextStage,
    nextReviewDay: currentDay + interval,
    completed: false,
  };
}

export function getReviewStatus(
  question: Question,
  currentDay: number
): ReviewStatus {
  if (question.completed) return 'completed';
  if (question.nextReviewDay < currentDay) return 'overdue';
  if (question.nextReviewDay === currentDay) return 'due';
  return 'upcoming';
}

export function sortQuestions(questions: Question[], currentDay: number): Question[] {
  return [...questions].sort((a, b) => {
    const statusOrder = (q: Question) => {
      const status = getReviewStatus(q, currentDay);
      const map: Record<ReviewStatus, number> = {
        overdue: 0,
        due: 1,
        upcoming: 2,
        completed: 3,
      };
      return map[status];
    };

    const statusDiff = statusOrder(a) - statusOrder(b);
    if (statusDiff !== 0) return statusDiff;
    return a.nextReviewDay - b.nextReviewDay;
  });
}

export function formatRevisionStage(stage: RevisionStage): string {
  if (stage === 'mastered') return 'Mastered';
  return stage;
}
