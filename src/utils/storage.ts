import type { AppState } from '../types';

const STORAGE_KEY = 'dsa-revision-tracker';

const DEFAULT_STATE: AppState = {
  currentDay: 1,
  questions: [],
};

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    const parsed = JSON.parse(raw) as AppState;
    return {
      currentDay: parsed.currentDay ?? DEFAULT_STATE.currentDay,
      questions: Array.isArray(parsed.questions) ? parsed.questions : [],
    };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

export function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function exportState(state: AppState): string {
  return JSON.stringify(state, null, 2);
}

export function importState(json: string): AppState {
  const parsed = JSON.parse(json) as AppState;
  if (typeof parsed.currentDay !== 'number' || !Array.isArray(parsed.questions)) {
    throw new Error('Invalid backup format');
  }
  return parsed;
}
