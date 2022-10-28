/**
 * @module Functions - The Global Functions Component
 * @description This hold the global functions for the app. *
 */

/**
 * A date object.
 * @typedef {Object} Date
 */
/**
 * @param {number} a - first number
 * @param {number} b - second number
 * @returns Multiplication of a and b
 */
export const multiply = (a, b) => {
  return a * b;
};

/**
 * Converts a string to lowercase.
 * @param {number} string - string to be converted to lowercase
 * @returns string in lowercase
 */
export const makeLowerCase = (string) => {
  return string.toLowerCase();
};

/**
 * Gets the current date.
 * @returns {string} - returns a string representation of the current date formatted "DD-MM-YYYY"
 * @example returns "01-01-2021"
 */
export function getCurrentDate() {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();

  return day + "-" + month + "-" + year;
}
/**
 * Gets difference between now and the date passed in.
 * @param {Date} start - date to be compared to now
 * @returns {number} - returns a number representing the difference between now and the date passed in.
 */
export function difference(start) {
  let date = new Date();
  let date2 = new Date(start);
  let diff = Math.ceil((date2 - date) / (1000 * 3600 * 24));
  return diff;
}
