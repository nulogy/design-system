import { expect } from "vitest";

/**
 * Helper function to check if an element has a specific computed style.
 * @param element - The DOM element to check
 * @param styleString - CSS style string in the format "property: value" (e.g., "opacity: 0", "z-index: 1001")
 * @returns true if the computed style matches, false otherwise
 */
export function hasComputedStyle(
  element: HTMLElement | null,
  styleString: string
): boolean {
  if (!element) {
    return false;
  }

  const [property, value] = styleString.split(":").map((s) => s.trim());
  const computedStyle = window.getComputedStyle(element);
  const actualValue = computedStyle.getPropertyValue(property);

  // Normalize values for comparison
  // Handle numeric values (e.g., "0" vs "0px" for opacity, "1001" vs "1001px" for z-index)
  const normalizedExpected = value.trim();
  const normalizedActual = actualValue.trim();

  // For numeric values, compare as numbers
  const expectedNum = parseFloat(normalizedExpected);
  const actualNum = parseFloat(normalizedActual);

  if (!isNaN(expectedNum) && !isNaN(actualNum)) {
    return expectedNum === actualNum;
  }

  // For non-numeric values, do exact string comparison
  return normalizedExpected === normalizedActual;
}

/**
 * Custom Vitest matcher to check computed styles.
 * Usage: expect(element).toHaveComputedStyle("opacity: 0")
 */
expect.extend({
  toHaveComputedStyle(received: HTMLElement | null, styleString: string) {
    const pass = hasComputedStyle(received, styleString);
    const [property, value] = styleString.split(":").map((s) => s.trim());

    if (pass) {
      return {
        message: () =>
          `expected element not to have computed style ${property}: ${value}`,
        pass: true,
      };
    } else {
      const actualValue = received
        ? window.getComputedStyle(received).getPropertyValue(property)
        : "element is null";
      return {
        message: () =>
          `expected element to have computed style ${property}: ${value}, but got ${actualValue}`,
        pass: false,
      };
    }
  },
});

// Extend Vitest's type definitions
declare module "vitest" {
  interface Assertion {
    toHaveComputedStyle(styleString: string): void;
  }
  interface AsymmetricMatchersContaining {
    toHaveComputedStyle(styleString: string): void;
  }
}

