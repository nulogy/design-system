import { getSubset, omitSubset } from "./subset";
import propTypes from "@styled-system/prop-types";

describe("getSubset", () => {
  const testObject = {
    disabled: true,
    readOnly: false,
    mt: "12px",
    pb: "33px",
    label: "city",
  };
  it("returns the subset of props", () => {
    const propsIWant = {
      mt: "",
      label: "",
      disabled: "",
    };
    const actual = getSubset(testObject, propsIWant);
    const expected = {
      disabled: true,
      mt: "12px",
      label: "city",
    };
    expect(actual).toEqual(expected);
  });
  it("returns the subset of using style-system prop groups", () => {
    const actual = getSubset(testObject, propTypes.space);
    const expected = {
      mt: "12px",
      pb: "33px",
    };
    expect(actual).toEqual(expected);
  });
  it("returns the subset of props even if prop doesn't exist in  object", () => {
    const propsIWant = {
      mt: "",
      label: "",
      disabled: "",
      nonExistent: "",
    };
    const actual = getSubset(testObject, propsIWant);
    const expected = {
      disabled: true,
      mt: "12px",
      label: "city",
    };
    expect(actual).toEqual(expected);
  });
});

describe("omitSubset", () => {
  const testObject = {
    disabled: true,
    readOnly: false,
    mt: "12px",
    pb: "33px",
    label: "city",
  };
  it("returns the subset of props", () => {
    const propsIDontWant = {
      mt: "",
      label: "",
      disabled: "",
    };
    const actual = omitSubset(testObject, propsIDontWant);
    const expected = {
      readOnly: false,
      pb: "33px",
    };
    expect(actual).toEqual(expected);
  });
});
