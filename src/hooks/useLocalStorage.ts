import { useCallback, useEffect, useState } from 'react';
import type { AppState } from '../types';
import { loadState, saveState } from '../utils/storage';

export function useLocalStorage() {
  const [state, setState] = useState<AppState>(() => loadState());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      saveState(state);
    }
  }, [state, hydrated]);

  const updateState = useCallback((updater: (prev: AppState) => AppState) => {
    setState((prev) => updater(prev));
  }, []);

  const replaceState = useCallback((newState: AppState) => {
    setState(newState);
  }, []);

  return { state, updateState, replaceState, hydrated };
}
