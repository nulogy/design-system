import mediaQuery from "css-mediaquery";

/**
 * Creates a mock implementation of the `window.matchMedia` function.
 * This is useful for changing the width of the viewport in tests without
 * needing to manipulate the actual browser environment.
 *
 */
export const createMatchMedia =
  (width: number) =>
  (query: string): MediaQueryList => ({
    matches: mediaQuery.match(query, { width }),
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
    media: query,
    onchange: null,
  });
