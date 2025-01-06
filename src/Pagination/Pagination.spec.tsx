import React from "react";
import { fireEvent } from "@testing-library/react";
import { renderWithNDSProvider } from "../NDSProvider/renderWithNDSProvider.spec-utils";
import { getPageItemsToDisplay } from "./Pagination";
import { Pagination } from ".";

describe("Pagination", () => {
  describe("pagination range", () => {
    it("returns an array of page numbers without truncation when there are less than maxVisible pages", () => {
      expect(getPageItemsToDisplay({ totalPages: 6, currentPage: 2 })).toEqual([1, 2, 3, 4, 5, 6]);

      expect(getPageItemsToDisplay({ totalPages: 1, currentPage: 1 })).toEqual([1]);

      expect(getPageItemsToDisplay({ totalPages: 5, currentPage: 1 })).toEqual([1, 2, 3, 4, 5]);
    });

    it("respects custom maxVisible value", () => {
      expect(getPageItemsToDisplay({ totalPages: 10, currentPage: 5, maxVisible: 3 })).toEqual([1, "...", 5, 10]);
      expect(getPageItemsToDisplay({ totalPages: 10, currentPage: 1, maxVisible: 1 })).toEqual([
        1,
        "...",
        5,
        "...",
        10,
      ]);
    });

    it("returns an array of page numbers with truncation at the beginning when current page is 5 pages from the end", () => {
      expect(getPageItemsToDisplay({ totalPages: 12, currentPage: 10 })).toEqual([1, "...", 8, 9, 10, 11, 12]);

      expect(getPageItemsToDisplay({ totalPages: 20, currentPage: 20 })).toEqual([1, "...", 16, 17, 18, 19, 20]);

      expect(getPageItemsToDisplay({ totalPages: 12, currentPage: 8 })).toEqual([1, "...", 7, 8, 9, 10, "...", 12]);
    });

    it("returns an array of page numbers with truncation at the end when current page is 5 pages from the beginning", () => {
      expect(getPageItemsToDisplay({ totalPages: 15, currentPage: 1 })).toEqual([1, 2, 3, 4, 5, "...", 15]);

      expect(getPageItemsToDisplay({ totalPages: 7, currentPage: 5 })).toEqual([1, 2, 3, 4, 5, "...", 7]);

      expect(getPageItemsToDisplay({ totalPages: 8, currentPage: 2 })).toEqual([1, 2, 3, 4, 5, "...", 8]);
    });

    it("returns an array of page numbers with truncation at both sides when in the middle", () => {
      expect(getPageItemsToDisplay({ totalPages: 15, currentPage: 6 })).toEqual([1, "...", 5, 6, 7, 8, "...", 15]);

      expect(getPageItemsToDisplay({ totalPages: 15, currentPage: 10 })).toEqual([1, "...", 9, 10, 11, 12, "...", 15]);
    });
  });
  describe("callbacks", () => {
    const onSelectPageCallback = jest.fn();
    const onNextCallback = jest.fn();
    const onPreviousCallback = jest.fn();

    it("onSelectPage: returns current page when a page is selected", () => {
      const { getAllByLabelText } = renderWithNDSProvider(
        <Pagination
          currentPage={1}
          totalPages={5}
          onNext={onNextCallback}
          onPrevious={onPreviousCallback}
          onSelectPage={onSelectPageCallback}
        />
      );
      const clickPage = (pageNum: number) => {
        fireEvent.click(getAllByLabelText("Go to page {{count}}")[pageNum]);
      };
      clickPage(2);
      expect(onSelectPageCallback).toHaveBeenCalledWith(4);
      clickPage(3);
      expect(onSelectPageCallback).toHaveBeenCalledWith(5);
    });
    it("onPrevious: prev button is disabled when current page is 1", () => {
      const { getByLabelText } = renderWithNDSProvider(
        <Pagination
          currentPage={1}
          totalPages={5}
          onNext={onNextCallback}
          onPrevious={onPreviousCallback}
          onSelectPage={onSelectPageCallback}
        />
      );
      const clickPrevious = () => {
        const PreviousButton = getByLabelText("Go to previous results");
        fireEvent.click(PreviousButton);
      };
      clickPrevious();
      expect(onPreviousCallback).not.toHaveBeenCalled();
    });
    it("onPrevious: calls previous page handler when previous button is clicked", () => {
      const { getByLabelText } = renderWithNDSProvider(
        <Pagination
          currentPage={2}
          totalPages={5}
          onNext={onNextCallback}
          onPrevious={onPreviousCallback}
          onSelectPage={onSelectPageCallback}
        />
      );
      const clickPrevious = () => {
        const PreviousButton = getByLabelText("Go to previous results");
        fireEvent.click(PreviousButton);
      };
      clickPrevious();
      expect(onPreviousCallback).toHaveBeenCalled();
    });
    it("onNext: calls next page handler when next button is clicked", () => {
      const { getByLabelText } = renderWithNDSProvider(
        <Pagination
          currentPage={1}
          totalPages={5}
          onNext={onNextCallback}
          onPrevious={onPreviousCallback}
          onSelectPage={onSelectPageCallback}
        />
      );
      const NextButton = getByLabelText("Go to next results");

      fireEvent.click(NextButton);
      expect(onNextCallback).toHaveBeenCalled();
    });
  });
});
