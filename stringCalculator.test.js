const calculator = require("./stringCalculator");

test("should return 0 for an empty string", () => {
  expect(calculator.add("")).toBe(0);
});

test("should return a number when a single number is passed", () => {
  expect(calculator.add("5")).toBe(5);
});

test("should return sum of two comma-separated numbers", () => {
  expect(calculator.add("1,2")).toBe(3);
});

test("should handle multiple numbers", () => {
  expect(calculator.add("1,2,3,4,5")).toBe(15);
});

test("should handle new line as a separator", () => {
  expect(calculator.add("1\n2,3")).toBe(6);
});

test("should handle custom delimiters", () => {
  expect(calculator.add("//;\n1;2")).toBe(3);
  expect(calculator.add("//|\n2|3|5")).toBe(10);
  expect(calculator.add("//-\n4-5-6")).toBe(15);
  expect(calculator.add("//#\n1#2#3#4")).toBe(10);
});

test("should throw an error for negative numbers", () => {
  expect(() => calculator.add("1,-2,3,-4")).toThrow("negative numbers not allowed: -2, -4");
});
