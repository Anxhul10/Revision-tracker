import { useRef } from 'react';
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
  const dateInputRef = useRef<HTMLInputElement>(null);

  const openDatePicker = () => {
    const input = dateInputRef.current;
    if (!input) return;
    if (typeof input.showPicker === 'function') {
      try {
        input.showPicker();
        return;
      } catch {
        // showPicker can throw in unsupported contexts; fall back to click
      }
    }
    input.click();
  };

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
        <div className="relative mt-0.5">
          <button
            type="button"
            onClick={openDatePicker}
            className="rounded px-1 text-xs text-gray-400 transition-colors hover:bg-surface-overlay hover:text-gray-200"
            title="Click to change date"
            aria-label={`Calendar date for Day ${currentDay}: ${formatDisplayDate(currentDate)}`}
          >
            {formatDisplayDate(currentDate)}
          </button>
          <input
            ref={dateInputRef}
            type="date"
            value={currentDate}
            onChange={(e) => {
              if (e.target.value) onDateChange(e.target.value);
            }}
            tabIndex={-1}
            className="sr-only"
            aria-hidden
          />
        </div>
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
