import type { Question } from '../types';
import { getReviewStatus } from './revision';

export interface DashboardStats {
  total: number;
  dueToday: number;
  completed: number;
  mostPracticedTopic: string;
}

export function computeStats(questions: Question[], currentDay: number): DashboardStats {
  const total = questions.length;
  const completed = questions.filter((q) => q.completed).length;
  const dueToday = questions.filter(
    (q) => !q.completed && q.nextReviewDay <= currentDay
  ).length;

  const topicCounts = questions.reduce<Record<string, number>>((acc, q) => {
    acc[q.topic] = (acc[q.topic] ?? 0) + 1;
    return acc;
  }, {});

  const mostPracticedTopic =
    Object.entries(topicCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—';

  return { total, dueToday, completed, mostPracticedTopic };
}

export function getTopicDistribution(questions: Question[]): { topic: string; count: number }[] {
  const counts = questions.reduce<Record<string, number>>((acc, q) => {
    acc[q.topic] = (acc[q.topic] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .map(([topic, count]) => ({ topic, count }))
    .sort((a, b) => b.count - a.count);
}

export function getDifficultyDistribution(
  questions: Question[]
): { difficulty: string; count: number; fill: string }[] {
  const colors: Record<string, string> = {
    Easy: '#3fb950',
    Medium: '#d29922',
    Hard: '#f85149',
  };

  const counts = questions.reduce<Record<string, number>>((acc, q) => {
    acc[q.difficulty] = (acc[q.difficulty] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts).map(([difficulty, count]) => ({
    difficulty,
    count,
    fill: colors[difficulty] ?? '#58a6ff',
  }));
}

export function getUniqueValues(questions: Question[], field: 'topic' | 'platform' | 'difficulty'): string[] {
  const values = new Set(questions.map((q) => q[field]));
  return Array.from(values).sort();
}
