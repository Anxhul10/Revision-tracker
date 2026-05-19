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
}

export interface AppState {
  currentDay: number;
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
}
