import { errorToString } from "./string.helper";

describe("errorToString", () => {

  it("should return error when type of string", () => {
    expect(errorToString("unexpected error")).toEqual("unexpected error");
  });

  it("should return errorMessage when present in error", () => {
    expect(errorToString({
      error: {
        errorMessage: "unexpected error"
      }
    })).toEqual("unexpected error");
  });

  it("should return error when present in error", () => {
    expect(errorToString({
      error: "unexpected error"
    })).toEqual("unexpected error");
  });

  it("should return message when present in error", () => {
    expect(errorToString({
      message: "unexpected error"
    })).toEqual("unexpected error");
  });

  it("should return stringified error in all other cases", () => {
    expect(errorToString({
      customError: "unexpected error"
    })).toEqual("{\"customError\":\"unexpected error\"}");
  });
});