import { ThemeContext } from "styled-components";
import React, { useCallback, useEffect, useState } from "react";
import { Breakpoints } from "../../theme";

type Query = keyof Breakpoints | (string & {});

function useMediaQuery(q: Query): boolean {
  const isUnsupported = typeof window === "undefined" || typeof window.matchMedia === "undefined";
  const theme = React.useContext(ThemeContext);
  const query = theme?.breakpoints?.[q] ? `(min-width: ${theme.breakpoints[q]})` : q;

  const getMatches = useCallback(
    (query: string): boolean => {
      if (isUnsupported) {
        return false;
      }

      return window.matchMedia(query).matches;
    },
    [isUnsupported]
  );

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  useEffect(() => {
    if (isUnsupported) return;

    const matchMedia = window.matchMedia(query);

    function handleChange() {
      setMatches(getMatches(query));
    }

    handleChange();

    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [getMatches, isUnsupported, query]);

  return matches;
}

export default useMediaQuery;
