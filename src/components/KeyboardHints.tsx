export function KeyboardHints() {
  return (
    <p className="text-xs text-gray-600">
      Shortcuts: <kbd className="rounded border border-surface-border bg-surface-overlay px-1">/</kbd> search ·{' '}
      <kbd className="rounded border border-surface-border bg-surface-overlay px-1">n</kbd> add ·{' '}
      <kbd className="rounded border border-surface-border bg-surface-overlay px-1">]</kbd> /{' '}
      <kbd className="rounded border border-surface-border bg-surface-overlay px-1">[</kbd> day ±
    </p>
  );
}
