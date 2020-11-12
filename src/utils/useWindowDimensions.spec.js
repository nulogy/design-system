import React from "react";
import { fireEvent, render } from "@testing-library/react";
import useWindowDimensions, { getWindowDimensionInfo } from "./useWindowDimensions";
import { act } from "react-dom/test-utils";

// simulate window resize 
const  fireResize = (width, height) => {
  act(() => {
    // Change the viewport to 500px.
    window.innerWidth = width;
    window.innerHeight = height;
  })
  fireEvent(window, new Event('resize'));
};

const ComponentUsingDimensions = () => {
  const dimensions = useWindowDimensions();
  return <span>{JSON.stringify(dimensions)}</span>;
};

describe("updates dimensions on resize", () => {
  it("returns the new dimension info", () => {
    const { container } = render(<ComponentUsingDimensions />)
    const span = container.firstChild;
    const width = 1024;
    const height = 768;
    const dimensionsInfo = {
      width,
      height,
      widthBreakpoints: {
        xlargeBreakpoint: 1920,
        largeBreakpoint: 1360,
        mediumBreakpoint: 1024,
        smallBreakpoint: 768,
        xSmallBreakpoint: 0,
        isXlargeScreen: false,
        isLargeScreen: false,
        isMediumScreen: true,
        isSmallScreen: false,
        isSmallestScreen: false,
        isGreaterThanLargeScreen: false,
        isGreaterThanMediumScreen: true,
        isGreaterThanSmallScreen: true,
      },
    };
    expect(span.textContent).toBe(JSON.stringify(dimensionsInfo));
    const newWidth = 600;
    fireResize(newWidth, height);
    const newDimensionsInfo = {
      width: newWidth,
      height,
      widthBreakpoints: {
        xlargeBreakpoint: 1920,
        largeBreakpoint: 1360,
        mediumBreakpoint: 1024,
        smallBreakpoint: 768,
        xSmallBreakpoint: 0,
        isXlargeScreen: false,
        isLargeScreen: false,
        isMediumScreen: false,
        isSmallScreen: false,
        isSmallestScreen: true,
        isGreaterThanLargeScreen: false,
        isGreaterThanMediumScreen: false,
        isGreaterThanSmallScreen: false,
      },
    };
    expect(span.textContent).toBe(JSON.stringify(newDimensionsInfo));
  });
});

describe("getWindowDimensionInfo", () => {
  it("returns the correct dimension info when within medium breakpoint", () => {
    const width = 1300;
    const height = 900;
    const actual = getWindowDimensionInfo(width, height);
    const expected = {
      width,
      height,
      widthBreakpoints: {
        xlargeBreakpoint: 1920,
        largeBreakpoint: 1360,
        mediumBreakpoint: 1024,
        smallBreakpoint: 768,
        xSmallBreakpoint: 0,
        isXlargeScreen: false,
        isLargeScreen: false,
        isMediumScreen: true,
        isSmallScreen: false,
        isSmallestScreen: false,
        isGreaterThanLargeScreen: false,
        isGreaterThanMediumScreen: true,
        isGreaterThanSmallScreen: true,
      },
    };
    expect(actual).toEqual(expected);
  });
  it("returns the correct dimension info when within large breakpoint", () => {
    const width = 1575;
    const height = 900;
    const actual = getWindowDimensionInfo(width, height);
    const expected = {
      width,
      height,
      widthBreakpoints: {
        xlargeBreakpoint: 1920,
        largeBreakpoint: 1360,
        mediumBreakpoint: 1024,
        smallBreakpoint: 768,
        xSmallBreakpoint: 0,
        isXlargeScreen: false,
        isLargeScreen: true,
        isMediumScreen: false,
        isSmallScreen: false,
        isSmallestScreen: false,
        isGreaterThanLargeScreen: true,
        isGreaterThanMediumScreen: true,
        isGreaterThanSmallScreen: true,
      },
    };
    expect(actual).toEqual(expected);
  });
  it("returns the correct dimension info when within xlarge breakpoint", () => {
    const width = 2575;
    const height = 1900;
    const actual = getWindowDimensionInfo(width, height);
    const expected = {
      width,
      height,
      widthBreakpoints: {
        xlargeBreakpoint: 1920,
        largeBreakpoint: 1360,
        mediumBreakpoint: 1024,
        smallBreakpoint: 768,
        xSmallBreakpoint: 0,
        isXlargeScreen: true,
        isLargeScreen: false,
        isMediumScreen: false,
        isSmallScreen: false,
        isSmallestScreen: false,
        isGreaterThanLargeScreen: true,
        isGreaterThanMediumScreen: true,
        isGreaterThanSmallScreen: true,
      },
    };
    expect(actual).toEqual(expected);
  });
  it("returns the correct dimension info when within small breakpoint", () => {
    const width = 900;
    const height = 800;
    const actual = getWindowDimensionInfo(width, height);
    const expected = {
      width,
      height,
      widthBreakpoints: {
        xlargeBreakpoint: 1920,
        largeBreakpoint: 1360,
        mediumBreakpoint: 1024,
        smallBreakpoint: 768,
        xSmallBreakpoint: 0,
        isXlargeScreen: false,
        isLargeScreen: false,
        isMediumScreen: false,
        isSmallScreen: true,
        isSmallestScreen: false,
        isGreaterThanLargeScreen: false,
        isGreaterThanMediumScreen: false,
        isGreaterThanSmallScreen: true,
      },
    };
    expect(actual).toEqual(expected);
  });
  it("returns the correct dimension info when on breakpoint", () => {
    const width = 768;
    const height = 800;
    const actual = getWindowDimensionInfo(width, height);
    const expected = {
      width,
      height,
      widthBreakpoints: {
        xlargeBreakpoint: 1920,
        largeBreakpoint: 1360,
        mediumBreakpoint: 1024,
        smallBreakpoint: 768,
        xSmallBreakpoint: 0,
        isXlargeScreen: false,
        isLargeScreen: false,
        isMediumScreen: false,
        isSmallScreen: true,
        isSmallestScreen: false,
        isGreaterThanLargeScreen: false,
        isGreaterThanMediumScreen: false,
        isGreaterThanSmallScreen: true,
      },
    };
    expect(actual).toEqual(expected);
  });
  it("returns the correct dimension info when within xsmall breakpoint", () => {
    const width = 600;
    const height = 800;
    const actual = getWindowDimensionInfo(width, height);
    const expected = {
      width,
      height,
      widthBreakpoints: {
        xlargeBreakpoint: 1920,
        largeBreakpoint: 1360,
        mediumBreakpoint: 1024,
        smallBreakpoint: 768,
        xSmallBreakpoint: 0,
        isXlargeScreen: false,
        isLargeScreen: false,
        isMediumScreen: false,
        isSmallScreen: false,
        isSmallestScreen: true,
        isGreaterThanLargeScreen: false,
        isGreaterThanMediumScreen: false,
        isGreaterThanSmallScreen: false,
      },
    };
    expect(actual).toEqual(expected);
  });
});
