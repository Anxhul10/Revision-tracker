export type NormalizedDifficulty = 'easy' | 'medium' | 'hard';

/** Map stored values (easy, mid, Medium, etc.) to a canonical level. */
export function normalizeDifficulty(value: string): NormalizedDifficulty | null {
  const key = value.trim().toLowerCase();
  if (key === 'easy' || key === 'e') return 'easy';
  if (key === 'medium' || key === 'mid' || key === 'm') return 'medium';
  if (key === 'hard' || key === 'h') return 'hard';
  return null;
}

export function formatDifficultyLabel(value: string): string {
  const level = normalizeDifficulty(value);
  if (level === 'easy') return 'Easy';
  if (level === 'medium') return 'Medium';
  if (level === 'hard') return 'Hard';
  return value;
}

export function difficultyBadgeClass(value: string): string {
  switch (normalizeDifficulty(value)) {
    case 'easy':
      return 'text-emerald-400 bg-emerald-500/10';
    case 'medium':
      return 'text-amber-400 bg-amber-500/10';
    case 'hard':
      return 'text-red-400 bg-red-500/10';
    default:
      return 'text-gray-400 bg-surface-overlay';
  }
}

export function difficultyChartColor(value: string): string {
  switch (normalizeDifficulty(value)) {
    case 'easy':
      return '#3fb950';
    case 'medium':
      return '#d29922';
    case 'hard':
      return '#f85149';
    default:
      return '#8b949e';
  }
}

/** Group counts by normalized difficulty for charts. */
export function difficultyGroupKey(value: string): string {
  return formatDifficultyLabel(value);
}
