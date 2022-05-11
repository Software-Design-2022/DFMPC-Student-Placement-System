const world = require("./world");

test("tests 2 is even", () => {
  expect(world(2)).toBe("Hello Even World");
});

test("tests 3 is odd", () => {
  expect(world(3)).toBe("Hello Odd World");
});
