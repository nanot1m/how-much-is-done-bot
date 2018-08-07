const { createProgressFormatter } = require("./progress-format");

describe("testFormatter", () => {
  const testFormatter = createProgressFormatter({
    doneChar: "x",
    endChar: "|",
    startChar: "|",
    leftChar: "-",
    width: 12
  });

  const testCases = [
    [0, "|----------|"],
    [10, "|x---------|"],
    [15, "|x---------|"],
    [25, "|xx--------|"],
    [37, "|xxx-------|"],
    [49, "|xxxx------|"],
    [100, "|xxxxxxxxxx|"]
  ];

  testCases.forEach(([input, expected]) => {
    test(`format ${input} is ${expected}`, () => {
      expect(testFormatter(input)).toBe(expected);
    });
  });

  test("throws if less then 0", () => {
    expect(() => testFormatter(-1)).toThrowError();
  });

  test("throws if less greater 100", () => {
    expect(() => testFormatter(101)).toThrowError();
  });

  test("throws if not number", () => {
    expect(() => testFormatter("99")).toThrowError();
  });
});
