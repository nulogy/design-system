import { useEffect } from "react";
// import useAutoClickElement from "./useAutoClickElement";

interface UseConditionalAutoClickProps {
  /**
   * CSS selector for the element to click
   */
  selector: string;
  /**
   * Query parameter to check for in the URL
   * @default "autoClick"
   */
  queryParam?: string;
  /**
   * If true, auto-clicks when the parameter is absent instead of present
   * @default false
   */
  invert?: boolean;
  /**
   * Delay in milliseconds before attempting to click the element
   * @default 100
   */
  delay?: number;
  /**
   * Whether to log the action to the console
   * @default true
   */
  logging?: boolean;
  /**
   * Callback to execute when the element is found and clicked
   */
  onSuccess?: () => void;
  /**
   * Callback to execute when the element is not found
   */
  onNotFound?: () => void;
  /**
   * Callback to execute when an error occurs
   */
  onError?: (error: Error) => void;
}

/**
 * Hook that conditionally auto-clicks an element based on URL query parameters.
 * Useful for preventing double-clicks during automated testing.
 *
 * @example
 * // Only auto-click when NOT in Cypress testing
 * useConditionalAutoClick({
 *   selector: 'button[aria-label="Menu"]',
 *   queryParam: "cypressTest",
 *   invert: true
 * });
 */
export default function useConditionalAutoClick({
  selector,
  queryParam = "autoClick",
  invert = false,
  delay = 100,
  logging = true,
  onSuccess,
  onNotFound,
  onError,
}: UseConditionalAutoClickProps): void {
  // Check if the condition is met
  const urlParams = new URLSearchParams(window.location.search);
  const paramExists = urlParams.has(queryParam);

  // Only auto-click if (param exists and not inverted) OR (param doesn't exist and inverted)
  const shouldAutoClick = (paramExists && !invert) || (!paramExists && invert);

  useEffect(() => {
    if (!shouldAutoClick) return;

    const timeoutId = setTimeout(() => {
      try {
        const element = document.querySelector(selector) as HTMLElement;
        if (element) {
          if (logging) {
            console.log(`Clicking element matching selector: ${selector}`);
          }
          element.click();
          onSuccess?.();
        } else {
          if (logging) {
            console.warn(`Element with selector "${selector}" not found`);
          }
          onNotFound?.();
        }
      } catch (error) {
        if (logging) {
          console.error(`Error clicking element with selector "${selector}":`, error);
        }
        onError?.(error instanceof Error ? error : new Error(String(error)));
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [selector, delay, logging, onSuccess, onNotFound, onError, shouldAutoClick]);
}
