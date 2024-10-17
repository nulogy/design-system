import { mergeThemes } from "./mergeThemes.util";
import { desktopTheme as NDSTheme } from "../theme";

describe("mergedThemes", () => {
  it("returns the default nds theme if custom theme is undefined", () => {
    const actual = mergeThemes(NDSTheme, undefined);
    const expected = NDSTheme;
    expect(actual).toEqual(expected);
  });
  it("uses the custom theme for properties that are set and uses the default theme for the rest", () => {
    const actual = mergeThemes(NDSTheme, {
      fontSizes: {
        medium: "14px",
        small: "12px",
        smaller: "12px",
      },
    });
    const expected = {
      ...NDSTheme,
      fontSizes: {
        ...NDSTheme.fontSizes,
        medium: "14px",
        small: "12px",
        smaller: "12px",
      },
    };
    expect(actual).toEqual(expected);
    expect(actual.fontSizes.large).toEqual(expected.fontSizes.large);
    expect(actual.colors).toEqual(expected.colors);
  });
  it("uses the custom theme for multiple style groups that are set and uses the default theme for the rest", () => {
    const actual = mergeThemes(NDSTheme, {
      fontSizes: {
        medium: "14px",
        small: "12px",
        smaller: "12px",
      },
      colors: {
        black: "#FFF",
      },
      space: {
        x1: "6px",
      },
    });
    const expected = {
      ...NDSTheme,
      fontSizes: {
        ...NDSTheme.fontSizes,
        medium: "14px",
        small: "12px",
      },
      colors: {
        ...NDSTheme.colors,
        black: "#FFF",
      },
      space: {
        ...NDSTheme.space,
        x1: "6px",
      },
    };
    expect(actual).toEqual(expected);
    expect(actual.fontSizes.large).toEqual(expected.fontSizes.large);
    expect(actual.colors.white).toEqual(expected.colors.white);
  });
});
