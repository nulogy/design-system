import { useEffect, useState } from "react";

/**
 * useUrlProps is a hook that reads URL search parameters and returns them as an object.
 * It is meant to be used in Storybook stories to allow for easy URL-based configuration from Cypress specs.
 *
 */
export function useUrlProps<T extends Record<string, unknown>>(defaultProps?: T): T {
  const [props, setProps] = useState<T>(defaultProps || ({} as T));

  useEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const encodedArgs = searchParams.get("args");

      if (encodedArgs) {
        const decodedProps = JSON.parse(decodeURIComponent(encodedArgs));
        setProps((prev) => ({ ...prev, ...decodedProps }));
      }
    } catch (error) {
      console.warn("Failed to parse URL props:", error);
    }
  }, []);

  return props;
}
