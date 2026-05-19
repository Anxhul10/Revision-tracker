import { DayCounter } from './DayCounter';

interface HeaderProps {
  currentDay: number;
  currentDate: string;
  onIncrementDay: () => void;
  onDecrementDay: () => void;
  onDateChange: (isoDate: string) => void;
}

export function Header({
  currentDay,
  currentDate,
  onIncrementDay,
  onDecrementDay,
  onDateChange,
}: HeaderProps) {
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
        currentDate={currentDate}
        onIncrement={onIncrementDay}
        onDecrement={onDecrementDay}
        onDateChange={onDateChange}
      />
    </header>
  );
}
