import { showIndicatorSeparator } from "./customReactSelectStyles";

describe("custom react-select styles", () => {
  describe("showIndicatorSeparator", () => {
    test.each`
      isMulti  | hasValue | hasDefaultOptions | expected
      ${true}  | ${true}  | ${true}           | ${true}
      ${true}  | ${false} | ${false}          | ${false}
      ${false} | ${true}  | ${false}          | ${false}
      ${false} | ${false} | ${true}           | ${false}
      ${true}  | ${true}  | ${false}          | ${false}
      ${false} | ${true}  | ${true}           | ${false}
      ${true}  | ${false} | ${true}           | ${false}
      ${false} | ${false} | ${false}          | ${false}
    `(
      "returns $expected when isMulti is $isMulti, hasValue is $hasValue, and hasDefaultOptions is $hasDefaultOptions",
      ({ isMulti, hasValue, hasDefaultOptions, expected }) => {
        expect(showIndicatorSeparator({ isMulti, hasValue, hasDefaultOptions })).toBe(expected);
      }
    );
  });
});
