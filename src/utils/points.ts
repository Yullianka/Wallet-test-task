function getSeasonStart(date: Date): Date {
  const month = date.getMonth();
  const year = date.getFullYear();

  if (month >= 2 && month <= 4)  return new Date(year, 2, 1);  // Spring: Mar 1
  if (month >= 5 && month <= 7)  return new Date(year, 5, 1);  // Summer: Jun 1
  if (month >= 8 && month <= 10) return new Date(year, 8, 1);  // Autumn: Sep 1
  return new Date(month < 2 ? year - 1 : year, 11, 1);         // Winter: Dec 1
}

export function calculateDailyPoints(date: Date): number {
  const seasonStart = getSeasonStart(date);
  const msPerDay = 1000 * 60 * 60 * 24;
  const dayOfSeason = Math.floor((date.getTime() - seasonStart.getTime()) / msPerDay) + 1;

  if (dayOfSeason === 1) return 2;
  if (dayOfSeason === 2) return 3;

  let dayMinus2 = 2;
  let dayMinus1 = 3;
  let today = 0;

  for (let day = 3; day <= dayOfSeason; day++) {
    today = dayMinus2 + dayMinus1 * 0.6;
    dayMinus2 = dayMinus1;
    dayMinus1 = today;
  }

  return Math.round(today);
}

export function formatPoints(points: number): string {
  if (points > 1000) {
    return `${Math.round(points / 1000)}K`;
  }
  return points.toString();
}
