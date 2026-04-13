import { useEffect } from "react";

interface ConditionConfig {
  /**
   * Query parameter to check for in the URL
   * @default "autoClick"
   */
  queryParam?: string;
  /**
   * When to trigger the auto-click
   * @default "present"
   */
  when?: "present" | "absent";
}

interface UseConditionalAutoClickProps {
  /**
   * CSS selector for the element to click
   */
  selector: string;
  /**
   * Condition configuration for when to auto-click
   */
  condition?: ConditionConfig;
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
 *   condition: {
 *     queryParam: "cypressTest",
 *     when: "absent"
 *   }
 * });
 */
export default function useConditionalAutoClick({
  selector,
  condition = {},
  delay = 100,
  logging = true,
  onSuccess,
  onNotFound,
  onError,
}: UseConditionalAutoClickProps): void {
  const { queryParam = "autoClick", when = "present" } = condition;

  // Check if the condition is met
  const urlParams = new URLSearchParams(window.location.search);
  const paramExists = urlParams.has(queryParam);
  // Auto-click when param exists and when="present", or when param doesn't exist and when="absent"
  const shouldAutoClick = (paramExists && when === "present") || (!paramExists && when === "absent");

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
