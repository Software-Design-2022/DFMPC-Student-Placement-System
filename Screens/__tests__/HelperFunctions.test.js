import { multiply, makeLowerCase, getCurrentDate } from "../../HelperFunctions.js";

describe("HelperFunctions", () => {

  test("makeLowerCase", () => {
    expect(makeLowerCase("Hello")).toBe("hello");
  });
});

describe("HelperFunctions", () => {

  test("getCurrentDate", () => {
    expect(getCurrentDate()).toBe(new Date().getDate() + "-" + new Date().getMonth() + "-" + new Date().getFullYear());
  });
});