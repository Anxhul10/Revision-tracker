import { Button } from '../ui/Button';

interface DayCounterProps {
  currentDay: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function DayCounter({ currentDay, onIncrement, onDecrement }: DayCounterProps) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-surface-border bg-surface-raised px-3 py-2 shadow-sm">
      <Button
        variant="ghost"
        size="sm"
        onClick={onDecrement}
        aria-label="Decrease day"
        title="Decrease day ([)"
      >
        −
      </Button>
      <div className="min-w-[5.5rem] text-center">
        <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
          Current
        </span>
        <p className="text-xl font-bold text-gray-100">Day {currentDay}</p>
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={onIncrement}
        aria-label="Increase day"
        title="Increase day (])"
      >
        +
      </Button>
    </div>
  );
}
