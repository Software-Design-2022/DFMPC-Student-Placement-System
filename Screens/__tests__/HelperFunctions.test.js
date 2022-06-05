import { multiply, makeLowerCase } from "../../HelperFunctions.js";

describe("HelperFunctions", () => {
  test("makeLowerCase", () => {
    expect(makeLowerCase("Hello")).toBe("hello");
  });
});
