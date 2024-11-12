import { desktop as theme } from "../theme/theme";
import { getControlBorderRadius, getMenuBorderRadius, showIndicatorSeparator } from "./customReactSelectStyles";

describe("custom react-select styles", () => {
  describe("showIndicatorSeparator", () => {
    it("should not show the indicator separator when the select has no value", () => {
      const result = showIndicatorSeparator({ hasValue: false, isClearable: true, isMulti: true });

      expect(result).toEqual(false);
    });

    it("should show the indicator separator when the select allows multiple selections", () => {
      const result = showIndicatorSeparator({ hasValue: true, isClearable: false, isMulti: true });

      expect(result).toEqual(true);
    });

    it("should show the indicator separator when the select is clearable", () => {
      const result = showIndicatorSeparator({ hasValue: true, isClearable: false, isMulti: true });

      expect(result).toEqual(true);
    });
  });

  describe("getControlBorderRadius", () => {
    it("doesn't have any top border radius when opening to the top", () => {
      const expected = 0;
      const result = getControlBorderRadius({
        border: "top",
        isMenuOpen: true,
        menuLength: 2,
        menuPlacement: "top",
        theme,
      });

      expect(result).toEqual(expected);
    });

    it("doesn't have any bottom border radius when opening to the bottom", () => {
      const expected = 0;
      const result = getControlBorderRadius({
        border: "bottom",
        isMenuOpen: true,
        menuLength: 2,
        menuPlacement: "bottom",
        theme,
      });

      expect(result).toEqual(expected);
    });

    it("has border radius when empty", () => {
      const expected = theme.radii.medium;
      const results = [];

      results.push(
        getControlBorderRadius({
          border: "bottom",
          isMenuOpen: true,
          menuLength: 0,
          menuPlacement: "bottom",
          theme,
        }),
        getControlBorderRadius({
          border: "top",
          isMenuOpen: true,
          menuLength: 0,
          menuPlacement: "bottom",
          theme,
        }),
        getControlBorderRadius({
          border: "bottom",
          isMenuOpen: true,
          menuLength: 0,
          menuPlacement: "top",
          theme,
        }),
        getControlBorderRadius({
          border: "top",
          isMenuOpen: true,
          menuLength: 0,
          menuPlacement: "top",
          theme,
        })
      );

      for (const result of results) {
        expect(result).toEqual(expected);
      }
    });

    it("has border radius when closed", () => {
      const expected = theme.radii.medium;
      const result = getControlBorderRadius({
        border: "bottom",
        isMenuOpen: false,
        menuLength: 2,
        menuPlacement: "bottom",
        theme,
      });

      expect(result).toEqual(expected);
    });
  });

  describe("getMenuBorderRadius", () => {
    it("should return a visible border radius when the border and menu placement are the same", () => {
      const expected = { style: "solid", radius: theme.radii.medium };

      const result = getMenuBorderRadius({ border: "bottom", menuPlacement: "bottom", theme });

      expect(result.style).toEqual(expected.style);
      expect(result.radius).toEqual(expected.radius);
    });

    it("should return no border when the border and menu placement are opposites", () => {
      const expected = { style: "none", radius: 0 };

      const result = getMenuBorderRadius({ border: "top", menuPlacement: "bottom", theme });

      expect(result.style).toEqual(expected.style);
      expect(result.radius).toEqual(expected.radius);
    });
  });
});
