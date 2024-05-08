/**
 * HELPER FUNCTIONS
 */

/**
 * Removes Whitespaces from at the beginning
 * and the end of the string
 * @param {String} inputString
 * @returns {String}
 */
export function trimWhitespace(inputString) {
  const trimmedString = inputString.replace(/^\s+|\s+$/g, "");
  return trimmedString;
}

/**
 * Parse a standard js date object
 * to the german standard notation
 * @param {Date} date
 */
export function formatDateDE(date) {
  const day = date.getDate();
  const dayString = day < 10 ? `0${day}` : day;
  /** The months start counting by 0 so we have to add 1 */
  const month = date.getMonth() + 1;
  const monthString = month < 10 ? `0${month}` : month;
  const year = date.getFullYear();
  return `${dayString}.${monthString}.${year}`;
}

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

/**
 * Returns a String name for the month of the given date
 * @param {Date} date
 * @returns {String}
 */
export function getMonthDisplay(date) {
  return months[date.getMonth()];
}

/**
 * Parsing a date string in a german format to
 * a js date object
 * @param {String} dateString
 * @returns {Date}
 */
export function parseToDate(dateString) {
  const parts = dateString.split(".");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  const dateObject = new Date(year, month, day);
  return dateObject;
}
