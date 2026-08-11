export type RevisionStage = '2d' | '7d' | '21d' | '60d' | 'mastered';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Question {
  id: string;
  title: string;
  link: string;
  platform: string;
  topic: string;
  difficulty: Difficulty;
  solvedDay: number;
  nextReviewDay: number;
  revisionStage: RevisionStage;
  completed: boolean;
  loopEnabled?: boolean;
  loopIntervalDays?: number;
  loopReviewCount?: number;
}

export interface AppState {
  currentDay: number;
  /** ISO date (YYYY-MM-DD) for Day 1. */
  startDate: string;
  questions: Question[];
}

export type ReviewStatus = 'due' | 'overdue' | 'upcoming' | 'completed';

export interface QuestionFilters {
  search: string;
  topic: string;
  platform: string;
  difficulty: string;
  dueTodayOnly: boolean;
}

export interface AddQuestionForm {
  title: string;
  link: string;
  platform: string;
  topic: string;
  difficulty: Difficulty;
  loopEnabled: boolean;
  loopIntervalDays: number;
}
