import { useState, useEffect } from "react";
import Theme from "../theme";
import convertPxToNumber from "./convertPxToNumber";

const xlargeBreakpoint = convertPxToNumber(Theme.breakpoints.extraLarge);
const largeBreakpoint = convertPxToNumber(Theme.breakpoints.large);
const mediumBreakpoint = convertPxToNumber(Theme.breakpoints.medium);
const smallBreakpoint = convertPxToNumber(Theme.breakpoints.small);
const xSmallBreakpoint = convertPxToNumber(Theme.breakpoints.extraSmall);

export const getWindowDimensionInfo = (width, height) => ({
  width,
  height,
  widthBreakpoints: {
    xlargeBreakpoint,
    largeBreakpoint,
    mediumBreakpoint,
    smallBreakpoint,
    xSmallBreakpoint,
    isXlargeScreen: width >= xlargeBreakpoint,
    isLargeScreen: width >= largeBreakpoint && width < xlargeBreakpoint,
    isMediumScreen: width >= mediumBreakpoint && width < largeBreakpoint,
    isSmallScreen: width >= smallBreakpoint && width < mediumBreakpoint,
    isSmallestScreen: width >= xSmallBreakpoint && width < smallBreakpoint,
    isGreaterThanLargeScreen: width >= largeBreakpoint,
    isGreaterThanMediumScreen: width >= mediumBreakpoint,
    isGreaterThanSmallScreen: width >= smallBreakpoint,
  },
});

const useWindowDimensions = () => {
  const hasWindow = typeof window !== "undefined";

  const getWindowDimensions = () => {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return getWindowDimensionInfo(width, height);
  };

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  });

  return windowDimensions;
};

export default useWindowDimensions;
