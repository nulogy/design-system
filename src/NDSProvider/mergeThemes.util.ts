import { DefaultNDSThemeType, ThemeType } from "../theme.type";

export const mergeThemes = (
  theme: DefaultNDSThemeType,
  customTheme: ThemeType
): DefaultNDSThemeType =>
  Object.keys(theme).reduce((mergedTheme, group) => {
    if (customTheme && mergedTheme[group] && customTheme[group]) {
      return {
        ...mergedTheme,
        [group]: {
          ...mergedTheme[group],
          ...customTheme[group],
        },
      };
    }
    return mergedTheme;
  }, theme);
