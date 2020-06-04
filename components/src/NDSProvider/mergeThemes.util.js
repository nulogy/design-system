export const mergeThemes = (theme, customTheme) =>
  Object.keys(theme).reduce((mergedTheme, group) => {
    if (customTheme && mergedTheme[group] && customTheme[group]) {
      return {
        ...mergedTheme,
        [group]: {
          ...mergedTheme[group],
          ...customTheme[group]
        }
      };
    }
    return mergedTheme;
  }, theme);
