import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Pagination } from ".";

describe("Pagination", () => {
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
        fireEvent.click(container.querySelectorAll("button")[0]);
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
        fireEvent.click(container.querySelectorAll("button")[0]);
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
      const paginationButtons = container.querySelectorAll("button");
      const clickNext = () => {
        fireEvent.click(paginationButtons[paginationButtons.length - 1]);
      };
      clickNext();
      expect(onNextCallback).toHaveBeenCalled();
    });
    // it("onNext: calls next page handler when next button is clicked", () => {
    //   const { container } = render(
    //     <Pagination
    //       currentPage={10}
    //       totalPages={10}
    //       onNext={onNextCallback}
    //       onPrevious={onPreviousCallback}
    //       onSelectPage={onSelectPageCallback}
    //     />
    //   );
    //   const paginationButtons = container.querySelectorAll("button");
    //   const clickNext = () => {
    //     fireEvent.click(paginationButtons[7]);
    //   };
    //   clickNext();
    //   expect(onNextCallback).not.toHaveBeenCalled();
    // });
  });
});
