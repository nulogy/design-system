import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Pagination } from ".";
import { getPageItemstoDisplay } from "./Pagination";

describe("Pagination", () => {
  describe("truncation", () => {
    it("it returns an array of page numbers without truncation when there are less than 6 pages", () => {
      expect(getPageItemstoDisplay(6, 2)).toEqual([1, 2, 3, 4, 5, 6]);
      expect(getPageItemstoDisplay(1, 1)).toEqual([1]);
      expect(getPageItemstoDisplay(5, 1)).toEqual([1, 2, 3, 4, 5]);
    });
    it("it returns an array of page numbers with truncation at the beginning when current page is 5 pages from the end", () => {
      expect(getPageItemstoDisplay(12, 10)).toEqual([1, "...", 8, 9, 10, 11, 12]);
      expect(getPageItemstoDisplay(20, 20)).toEqual([1, "...", 16, 17, 18, 19, 20]);
      expect(getPageItemstoDisplay(12, 8)).toEqual([1, "...", 8, 9, 10, 11, 12]);
    });
    it("it returns an array of page numbers with truncation at the end when current page is 5 pages from the beginning", () => {
      expect(getPageItemstoDisplay(15, 1)).toEqual([1, 2, 3, 4, 5, "...", 15]);
      expect(getPageItemstoDisplay(7, 5)).toEqual([1, 2, 3, 4, 5, "...", 7]);
      expect(getPageItemstoDisplay(8, 2)).toEqual([1, 2, 3, 4, 5, "...", 8]);
    });
    it("it returns an array of page numbers with truncation at the both sides is in the middle", () => {
      expect(getPageItemstoDisplay(15, 6)).toEqual([1, "...", 5, 6, 7, 8, "...", 15]);
      expect(getPageItemstoDisplay(15, 10)).toEqual([1, "...", 9, 10, 11, 12, "...", 15]);
    });
  });
  describe("callbacks", () => {
    const onSelectPageCallback = jest.fn();
    const onNextCallback = jest.fn();
    const onPreviousCallback = jest.fn();

    it("onSelectPage: returns current page when a page is selected", () => {
      const { container } = render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onNext={onNextCallback}
          onPrevious={onPreviousCallback}
          onSelectPage={onSelectPageCallback}
        />
      );
      const clickPage = pageNum => {
        fireEvent.click(container.querySelectorAll("button")[pageNum]);
      };
      clickPage(2);
      expect(onSelectPageCallback).toHaveBeenCalledWith(2);
      clickPage(3);
      expect(onSelectPageCallback).toHaveBeenCalledWith(3);
    });
    it("onPrevious: prev button is disabled when current page is 1", () => {
      const { container } = render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onNext={onNextCallback}
          onPrevious={onPreviousCallback}
          onSelectPage={onSelectPageCallback}
        />
      );
      const clickPrevious = () => {
        fireEvent.click(container.querySelectorAll("[aria-label='Go to previous results']"));
      };
      clickPrevious();
      expect(onPreviousCallback).not.toHaveBeenCalled();
    });
    it("onPrevious: calls previous page handler when previous button is clicked", () => {
      const { container } = render(
        <Pagination
          currentPage={2}
          totalPages={5}
          onNext={onNextCallback}
          onPrevious={onPreviousCallback}
          onSelectPage={onSelectPageCallback}
        />
      );
      const clickPrevious = () => {
        fireEvent.click(container.querySelectorAll("[aria-label='Go to previous results']"));
      };
      clickPrevious();
      expect(onPreviousCallback).toHaveBeenCalled();
    });
    it("onNext: calls next page handler when next button is clicked", () => {
      const { container } = render(
        <Pagination
          currentPage={1}
          totalPages={5}
          onNext={onNextCallback}
          onPrevious={onPreviousCallback}
          onSelectPage={onSelectPageCallback}
        />
      );
      const paginationButtons = container.querySelectorAll("[aria-label='Go to next results']");
      const clickNext = () => {
        fireEvent.click(paginationButtons[paginationButtons.length - 1]);
      };
      clickNext();
      expect(onNextCallback).toHaveBeenCalled();
    });
  });
});
