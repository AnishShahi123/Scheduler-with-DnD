import { DateTime } from "luxon";

export async function getWeekDates(timestamp: number) {
  const currentWeekDates = [];
  const date = DateTime.fromSeconds(timestamp);
  const currentWeekNumber = date.weekNumber;
  const currentWeekYear = date.weekYear;

  const startOfWeek = DateTime.fromObject({
    weekNumber: currentWeekNumber,
    weekYear: currentWeekYear,
  });
  for (let i = 0; i <= 6; i++) {
    currentWeekDates.push(startOfWeek.plus({ days: i }));
  }
  return currentWeekDates;
}
