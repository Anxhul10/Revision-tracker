import type { AppState } from '../types';
import { inferStartDate, todayIso } from './dates';

const STORAGE_KEY = 'dsa-revision-tracker';

const DEFAULT_STATE: AppState = {
  currentDay: 1,
  startDate: todayIso(),
  questions: [],
  theories: [],
};

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    const parsed = JSON.parse(raw) as AppState;
    const currentDay = parsed.currentDay ?? DEFAULT_STATE.currentDay;
    return {
      currentDay,
      startDate:
        typeof parsed.startDate === 'string'
          ? parsed.startDate
          : inferStartDate(currentDay),
      questions: Array.isArray(parsed.questions) ? parsed.questions : [],
      theories: Array.isArray(parsed.theories) ? parsed.theories : [],
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
  const currentDay = parsed.currentDay;
  return {
    currentDay,
    startDate:
      typeof parsed.startDate === 'string'
        ? parsed.startDate
        : inferStartDate(currentDay),
    questions: parsed.questions,
    theories: Array.isArray(parsed.theories) ? parsed.theories : [],
  };
}
