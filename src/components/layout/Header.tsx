import { DayCounter } from './DayCounter';

interface HeaderProps {
  currentDay: number;
  onIncrementDay: () => void;
  onDecrementDay: () => void;
}

export function Header({ currentDay, onIncrementDay, onDecrementDay }: HeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-100">
          DSA Revision Tracker
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Spaced repetition for coding interview prep
        </p>
      </div>
      <DayCounter
        currentDay={currentDay}
        onIncrement={onIncrementDay}
        onDecrement={onDecrementDay}
      />
    </header>
  );
}
