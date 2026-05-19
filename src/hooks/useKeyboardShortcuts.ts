import { useEffect } from 'react';

interface ShortcutHandlers {
  onIncrementDay?: () => void;
  onDecrementDay?: () => void;
  onOpenAdd?: () => void;
  onFocusSearch?: () => void;
}

export function useKeyboardShortcuts(handlers: ShortcutHandlers, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable;

      if (e.key === '/' && !isInput) {
        e.preventDefault();
        handlers.onFocusSearch?.();
        return;
      }

      if (isInput) return;

      if (e.key === 'n' && !e.metaKey && !e.ctrlKey) {
        e.preventDefault();
        handlers.onOpenAdd?.();
      }
      if (e.key === ']' || (e.key === '=' && e.shiftKey)) {
        e.preventDefault();
        handlers.onIncrementDay?.();
      }
      if (e.key === '[' || e.key === '-') {
        e.preventDefault();
        handlers.onDecrementDay?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers, enabled]);
}
