import { format } from "date-fns";

export function getCurrentWeekDate() {
  function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    let yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    let weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return weekNo;
  }

  function formatDatew(date) {
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    return day + "-" + month + "-" + year;
  }

  // Get current date
  let currentDate = new Date();

  // Get current year
  let currentYear = currentDate.getFullYear();

  // Get current week number
  let currentWeekNumber = getWeekNumber(currentDate);

  // Get current day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
  let currentDayOfWeek = currentDate.getDay();

  // Calculate the difference in days to Monday (if today is Monday, the difference is 0)
  let diffToMonday = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek;

  // Calculate the date of Monday by subtracting the difference in days from the current date
  let mondayDate = new Date(currentDate);
  mondayDate.setDate(currentDate.getDate() + diffToMonday);

  // Format the date as yyyy-MM-dd
  let formattedDate = formatDatew(mondayDate);

  return {
    weekNumber: currentWeekNumber,
    year: currentYear,
    date: formattedDate,
  };
}
