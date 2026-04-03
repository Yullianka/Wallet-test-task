export function calculateDailyPoints(date: Date): number {
  
  const month = date.getMonth();
  const year = date.getFullYear();
  let seasonStartMonth: number;
  let seasonStartYear = year;

  if (month >= 2 && month <= 4) {
    seasonStartMonth = 2;
  } else if (month >= 5 && month <= 7) {
    seasonStartMonth = 5;
  } else if (month >= 8 && month <= 10) {
    seasonStartMonth = 8;
  } else {
    seasonStartMonth = 11;
    if (month < 2) {
      seasonStartYear -= 1;
    }
  }

  const seasonStartDate = new Date(seasonStartYear, seasonStartMonth, 1);
  const diffTime = Math.abs(date.getTime() - seasonStartDate.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

  if (diffDays === 1) return 2;
  if (diffDays === 2) return 3;

  let prevPrev = 2;
  let prev = 3;
  let current = 0;

  for (let i = 3; i <= diffDays; i++) {
    current = prevPrev + (prev * 0.6);
    prevPrev = prev;
    prev = current;
  }

  return Math.round(current);
}

export function formatPoints(points: number): string {
  if (points > 1000) {
    return Math.round(points / 1000) + 'K';
  }
  return points.toString();
}
