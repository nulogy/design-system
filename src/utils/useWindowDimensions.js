import { useState, useEffect } from "react";
import convertPxToNumber from "./convertPxToNumber";
import { useTheme } from "styled-components";

const xlargeBreakpoint = (theme) => convertPxToNumber(theme.breakpoints.extraLarge);
const largeBreakpoint = (theme) => convertPxToNumber(theme.breakpoints.large);
const mediumBreakpoint = (theme) => convertPxToNumber(theme.breakpoints.medium);
const smallBreakpoint = (theme) => convertPxToNumber(theme.breakpoints.small);
const xSmallBreakpoint = (theme) => convertPxToNumber(theme.breakpoints.extraSmall);

export const getWindowDimensionInfo = (width, height, theme) => ({
  width,
  height,
  widthBreakpoints: {
    xlargeBreakpoint: xlargeBreakpoint(theme),
    largeBreakpoint: largeBreakpoint(theme),
    mediumBreakpoint: mediumBreakpoint(theme),
    smallBreakpoint: smallBreakpoint(theme),
    xSmallBreakpoint: xSmallBreakpoint(theme),
    isXlargeScreen: width >= xlargeBreakpoint(theme),
    isLargeScreen: width >= largeBreakpoint(theme) && width < xlargeBreakpoint(theme),
    isMediumScreen: width >= mediumBreakpoint(theme) && width < largeBreakpoint(theme),
    isSmallScreen: width >= smallBreakpoint(theme) && width < mediumBreakpoint(theme),
    isSmallestScreen: width >= xSmallBreakpoint(theme) && width < smallBreakpoint(theme),
    isGreaterThanLargeScreen: width >= largeBreakpoint(theme),
    isGreaterThanMediumScreen: width >= mediumBreakpoint(theme),
    isGreaterThanSmallScreen: width >= smallBreakpoint(theme),
  },
});

const useWindowDimensions = () => {
  const hasWindow = typeof window !== "undefined";
  const theme = useTheme();

  const getWindowDimensions = () => {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;
    return getWindowDimensionInfo(width, height, theme);
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
