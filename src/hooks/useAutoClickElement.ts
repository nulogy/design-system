import { useEffect } from "react";

interface UseAutoClickElementOptions {
  /**
   * The CSS selector for the element to click
   */
  selector: string;

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
 * A hook that automatically clicks on an element once it's available in the DOM
 *
 * @example
 * // Click on the app switcher once the component mounts
 * useAutoClickElement({ selector: 'button[aria-label="App Switcher"]' });
 *
 * @example
 * // Click with a longer delay and custom callbacks
 * useAutoClickElement({
 *   selector: '.custom-dropdown-trigger',
 *   delay: 500,
 *   onSuccess: () => console.log('Dropdown opened!'),
 *   onNotFound: () => console.warn('Could not find dropdown trigger')
 * });
 */
export function useAutoClickElement({
  selector,
  delay = 1000,
  logging = true,
  onSuccess,
  onNotFound,
  onError,
}: UseAutoClickElementOptions): void {
  useEffect(() => {
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
  }, [selector, delay, logging, onSuccess, onNotFound, onError]);
}

export default useAutoClickElement;
