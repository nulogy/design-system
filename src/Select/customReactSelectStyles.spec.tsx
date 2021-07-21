import { showDropdownIndicator } from "./customReactSelectStyles";

describe("custom react-select styles", () => {
  describe("showDropdownIndicator", () => {
    test.each`
      isMulti  | hasValue | isAsync  | expected
      ${true}  | ${false} | ${false} | ${false}
      ${false} | ${true}  | ${false} | ${false}
      ${false} | ${false} | ${true}  | ${false}
      ${true}  | ${true}  | ${false} | ${true}
      ${false} | ${true}  | ${true}  | ${false}
      ${true}  | ${false} | ${true}  | ${false}
      ${true}  | ${true}  | ${true}  | ${false}
      ${false} | ${false} | ${false} | ${false}
    `(
      "returns $expected when isMulti is $isMulti, hasValue is $hasValue, and isAsync is $isAsync",
      ({ isMulti, hasValue, isAsync, expected }) => {
        expect(showDropdownIndicator({ isMulti, hasValue, isAsync })).toBe(
          expected
        );
      }
    );
  });
});
