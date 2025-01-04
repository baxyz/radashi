import { isDefinedAndNotNull, returnOrThrowError } from "./function.helper";

describe("returnOrThrowError", () => {
  [
    { label: "string", value: "a string" },
    { label: "empty string", value: "" },
    { label: "number", value: 42 },
    { label: "zero", value: 0 },
    { label: "true", value: true },
    { label: "false", value: false },
  ].forEach(({ label, value }) => {
    it(`should return ${ label }`, () => {
      expect(returnOrThrowError(value, "an non-expected value")).toEqual(value);
    });
  });

  [
    { label: "undefined", value: undefined },
    { label: "null", value: null },
  ].forEach(({ label, value }) => {
    it(`should return error when ${ label }`, () => {
      const error = `an ${ label } value`;
      expect(() => returnOrThrowError(value, error)).toThrow(new Error(error));
    });
  });
});

describe("isDefinedAndNotNull", () => {
  it ("should return true when value is defined", () => {
    expect(isDefinedAndNotNull("a string")).toBeTruthy();
    expect(isDefinedAndNotNull("")).toBeTruthy();
    expect(isDefinedAndNotNull(0)).toBeTruthy();
    expect(isDefinedAndNotNull(0.5)).toBeTruthy();
    expect(isDefinedAndNotNull(true)).toBeTruthy();
    expect(isDefinedAndNotNull(false)).toBeTruthy();
    expect(isDefinedAndNotNull({})).toBeTruthy();
  });

  it ("should return false when value is undefined or null", () => {
    expect(isDefinedAndNotNull(undefined)).toBeFalsy();
    expect(isDefinedAndNotNull(null)).toBeFalsy();
  });
});
