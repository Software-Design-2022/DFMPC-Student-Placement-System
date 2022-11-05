import { multiply, makeLowerCase, getCurrentDate, difference } from "../../functions.js";


const date = new Date();
const date2 = new Date("2020-12-31");
describe("HelperFunctions", () => {

  test("makeLowerCase", () => {
    expect(makeLowerCase("Hello")).toBe("hello");
  });
  test("multiply", () => {
    expect(multiply(2, 3)).toBe(6);
  });
});

describe("HelperFunctions", () => {

  test("getCurrentDate", () => {
    expect(getCurrentDate()).toBe(new Date().getDate() + "-" + new Date().getMonth() + "-" + new Date().getFullYear());
  });

  test("difference", () => {
    expect(difference(date2)).toBe(Math.ceil((date2 - date) / (1000 * 3600 * 24)));
  });
});