import { describe, it, expect } from "vitest";
import { getPageItemsToDisplay } from "./lib";

describe("getPageItemsToDisplay", () => {
  it("returns an array of page numbers without truncation when there are less than maxVisiblePages default value", () => {
    expect(getPageItemsToDisplay({ totalPages: 6, currentPage: 2 })).toEqual([1, 2, 3, 4, 5, 6]);

    expect(getPageItemsToDisplay({ totalPages: 1, currentPage: 1 })).toEqual([1]);

    expect(getPageItemsToDisplay({ totalPages: 5, currentPage: 1 })).toEqual([1, 2, 3, 4, 5]);
  });

  it("respects custom maxVisiblePages value", () => {
    expect(getPageItemsToDisplay({ totalPages: 10, currentPage: 5, maxVisiblePages: 3 })).toEqual([
      1,
      "...",
      5,
      "...",
      10,
    ]);
  });

  it("always shows the page before and after the current page when the page is not the first or the last", () => {
    expect(getPageItemsToDisplay({ totalPages: 12, currentPage: 10 })).toEqual([1, "...", 8, 9, 10, 11, 12]);

    expect(getPageItemsToDisplay({ totalPages: 20, currentPage: 20 })).toEqual([1, "...", 16, 17, 18, 19, 20]);

    expect(getPageItemsToDisplay({ totalPages: 12, currentPage: 8 })).toEqual([1, "...", 7, 8, 9, 10, "...", 12]);

    expect(getPageItemsToDisplay({ totalPages: 15, currentPage: 1 })).toEqual([1, 2, 3, 4, 5, "...", 15]);

    expect(getPageItemsToDisplay({ totalPages: 7, currentPage: 5 })).toEqual([1, "...", 3, 4, 5, 6, 7]);

    expect(getPageItemsToDisplay({ totalPages: 8, currentPage: 2 })).toEqual([1, 2, 3, 4, 5, "...", 8]);
  });

  it("returns an array of page numbers with truncation at both sides when in the middle", () => {
    expect(getPageItemsToDisplay({ totalPages: 15, currentPage: 6 })).toEqual([1, "...", 5, 6, 7, 8, "...", 15]);

    expect(getPageItemsToDisplay({ totalPages: 15, currentPage: 10 })).toEqual([1, "...", 9, 10, 11, 12, "...", 15]);
  });
});
