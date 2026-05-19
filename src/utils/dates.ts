function parseLocalDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function toIsoDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function todayIso(): string {
  return toIsoDate(new Date());
}

export function addDays(iso: string, days: number): string {
  const date = parseLocalDate(iso);
  date.setDate(date.getDate() + days);
  return toIsoDate(date);
}

/** Calendar date for a given day number (Day 1 = startDate). */
export function dateForDay(startDate: string, day: number): string {
  return addDays(startDate, day - 1);
}

/** Day 1 anchor so that `day` falls on `targetDate`. */
export function startDateForDay(targetDate: string, day: number): string {
  return addDays(targetDate, -(day - 1));
}

export function formatDisplayDate(iso: string): string {
  return parseLocalDate(iso).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/** Default Day 1 when none is stored (Day `currentDay` = today). */
export function inferStartDate(currentDay: number): string {
  return startDateForDay(todayIso(), currentDay);
}
