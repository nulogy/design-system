import { useEffect, useState } from "react";

const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const handler = (e) => {
      setMatches(e.matches);
    };

    window.matchMedia(query).addEventListener("change", handler);

    return () => {
      window.removeEventListener("change", handler);
    };
  }, []);

  return matches;
};

export default useMediaQuery;
