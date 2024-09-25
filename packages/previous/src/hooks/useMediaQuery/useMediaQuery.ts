import { useEffect, useState } from "react";

function useMediaQuery(query: string): boolean {
  const isUnsupported = typeof window === "undefined" || typeof window.matchMedia === "undefined";

  const getMatches = (query: string): boolean => {
    if (isUnsupported) {
      return false;
    }

    return window.matchMedia(query).matches;
  };

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  function handleChange() {
    setMatches(getMatches(query));
  }

  useEffect(() => {
    if (isUnsupported) return;

    const matchMedia = window.matchMedia(query);

    handleChange();

    matchMedia.addEventListener("change", handleChange);

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;
