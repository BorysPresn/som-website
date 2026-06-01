const OPEN_AT = 9;
const CLOSE_AT = 18;

const fixedPolishHolidayDates = new Set([
  "01-01",
  "01-06",
  "05-01",
  "05-03",
  "08-15",
  "11-01",
  "11-11",
  "12-25",
  "12-26",
]);

const formatDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const formatMonthDayKey = (date: Date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${month}-${day}`;
};

const addDays = (date: Date, days: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);

// Meeus/Jones/Butcher algorithm for Gregorian Easter Sunday.
const getEasterSunday = (year: number) => {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(year, month - 1, day);
};

const getMovablePolishHolidayKeys = (year: number) => {
  const easterSunday = getEasterSunday(year);

  return new Set([
    formatDateKey(easterSunday),
    formatDateKey(addDays(easterSunday, 1)),
    formatDateKey(addDays(easterSunday, 49)),
    formatDateKey(addDays(easterSunday, 60)),
  ]);
};

export const isPolishPublicHoliday = (date = new Date()) => {
  const fixedHoliday = fixedPolishHolidayDates.has(formatMonthDayKey(date));

  if (fixedHoliday) return true;

  return getMovablePolishHolidayKeys(date.getFullYear()).has(
    formatDateKey(date),
  );
};

export const isBusinessOpen = (date = new Date()) => {
  const day = date.getDay();
  const hour = date.getHours();

  if (isPolishPublicHoliday(date)) return false;
  if (day === 0 || day === 6) return false;
  if (hour < OPEN_AT || hour >= CLOSE_AT) return false;

  return true;
};
