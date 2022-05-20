import { multiply, makeLowerCase } from "../../HelperFunctions.js";

describe("HelperFunctions", () => {
  test("multiply", () => {
    expect(multiply(2, 2)).toBe(4);
  });
  test("makeLowerCase", () => {
    expect(makeLowerCase("Hello")).toBe("hello");
  });
});
