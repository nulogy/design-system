import deepmerge from 'deepmerge';
import type { Theme } from '.';

export function mergeTheme(defaultTheme: Theme, userProvidedTheme: Partial<Theme>): Theme {
  const mergedTheme = deepmerge(defaultTheme, userProvidedTheme);

  return {
    ...mergedTheme,
    breakpoints: buildBreakPoints(mergedTheme.breakpoints),
  };
}

const buildBreakPoints = (breakpointsConfig: Readonly<Theme['breakpoints']>) => ({
  ...breakpointsConfig,

  // We need the map function as a polyfill because the `variant` function
  // from `styled-system` expects the breakpoints
  // to be an array and not an object
  map: (callbackfn: (value: string, index: number, array: string[]) => void) =>
    Object.values(breakpointsConfig).map(callbackfn),
});
