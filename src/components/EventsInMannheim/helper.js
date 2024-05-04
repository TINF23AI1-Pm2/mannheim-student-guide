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
