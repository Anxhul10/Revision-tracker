import { formatDisplayDate } from '../../utils/dates';
import { Button } from '../ui/Button';

interface DayCounterProps {
  currentDay: number;
  currentDate: string;
  onIncrement: () => void;
  onDecrement: () => void;
  onDateChange: (isoDate: string) => void;
}

export function DayCounter({
  currentDay,
  currentDate,
  onIncrement,
  onDecrement,
  onDateChange,
}: DayCounterProps) {
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
      <div className="min-w-[7.5rem] text-center">
        <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
          Current
        </span>
        <p className="text-xl font-bold text-gray-100">Day {currentDay}</p>
        <p className="mt-0.5 text-xs text-gray-400">{formatDisplayDate(currentDate)}</p>
        <label className="mt-1.5 block">
          <span className="sr-only">Calendar date for Day {currentDay}</span>
          <input
            type="date"
            value={currentDate}
            onChange={(e) => {
              if (e.target.value) onDateChange(e.target.value);
            }}
            className="w-full rounded-md border border-surface-border bg-surface px-1.5 py-0.5 text-xs text-gray-300 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            title="Set the calendar date for the current day"
          />
        </label>
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
