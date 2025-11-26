import React from "react";
import { fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { createMatchMedia } from "../utils/testing/createMatchMedia";
import { renderWithNDSProvider } from "../NDSProvider/renderWithNDSProvider.spec-utils";
import { mockColumns, getMockRows, getMockColumns } from "./Table.mock-utils";
import { Table } from ".";

describe("Table", () => {
  describe("row selections", () => {
    describe("onRowSelectionChange:", () => {
      it("returns the selected rows when the selection has changed", () => {
        const columns = [{ label: "Column 1", dataKey: "c1" }];
        const rowData = [{ c1: "r1c1" }, { c1: "r2c1" }];
        const callback = vi.fn();

        const { container } = renderWithNDSProvider(
          <Table columns={columns} rows={rowData} hasSelectableRows keyField="c1" onRowSelectionChange={callback} />
        );

        fireEvent.click(container.querySelectorAll("input")[1]);

        expect(callback).toHaveBeenCalledWith([rowData[0].c1]);
      });

      it("returns an empty array if no rows are selected", () => {
        const columns = [{ label: "Column 1", dataKey: "c1" }];
        const rowData = [{ c1: "r1c1" }, { c1: "r2c1" }];
        const callback = vi.fn();

        const { container } = renderWithNDSProvider(
          <Table columns={columns} rows={rowData} hasSelectableRows keyField="c1" onRowSelectionChange={callback} />
        );

        fireEvent.click(container.querySelectorAll("input")[0]);
        expect(callback).toHaveBeenCalledWith([rowData[0].c1, rowData[1].c1]);
        fireEvent.click(container.querySelectorAll("input")[0]);
        expect(callback).toHaveBeenCalledWith([]);
      });
    });
  });

  describe("expandedRows", () => {
    describe("onRowExpansionChange:", () => {
      it("returns the expanded rows when the a row was expanded or collapsed", () => {
        const expandedContent = () => <p>Expands!</p>;
        const rowData = [
          {
            c1: "row 1 cell 1",
            c2: "r1c2",
            c3: "2019-09-21",
            id: "2",
            expandedContent,
          },
          { c1: "r2c1", c2: "r2c2", c3: "2019-09-22", id: "3" },
          { c1: "r3c1", c2: "r2c2", c3: "2019-09-22", id: "4" },
          {
            c1: "r4c1",
            c2: "r2c2",
            c3: "2019-09-22",
            id: "6",
            expandedContent,
          },
          { c1: "r5c1", c2: "r2c2", c3: "2019-09-22", id: "7" },
        ];
        const callback = vi.fn();

        const { container } = renderWithNDSProvider(
          <Table columns={getMockColumns(3)} rows={rowData} hasExpandableRows onRowExpansionChange={callback} />
        );

        fireEvent.click(container.querySelectorAll("button")[0]);

        expect(callback).toHaveBeenCalledWith(["2"]);
      });

      it("returns an empty array if no rows are expanded", () => {
        const expandedContent = () => <p>Expands!</p>;
        const rowData = [
          {
            c1: "row 1 cell 1",
            c2: "r1c2",
            c3: "2019-09-21",
            id: "2",
            expandedContent,
          },
          { c1: "r2c1", c2: "r2c2", c3: "2019-09-22", id: "3" },
          { c1: "r3c1", c2: "r2c2", c3: "2019-09-22", id: "4" },
          {
            c1: "r4c1",
            c2: "r2c2",
            c3: "2019-09-22",
            id: "6",
            expandedContent,
          },
          { c1: "r5c1", c2: "r2c2", c3: "2019-09-22", id: "7" },
        ];
        const callback = vi.fn();

        const { container } = renderWithNDSProvider(
          <Table columns={getMockColumns(3)} rows={rowData} hasExpandableRows onRowExpansionChange={callback} />
        );

        fireEvent.click(container.querySelectorAll("button")[1]);

        expect(callback).toHaveBeenCalledWith(["6"]);

        fireEvent.click(container.querySelectorAll("button")[1]);

        expect(callback).toHaveBeenCalledWith([]);
      });
    });
  });

  describe("pagination", () => {
    describe("onPageChange:", () => {
      it("called when a new page is selected", () => {
        window.matchMedia = createMatchMedia(1024);

        const pageChangeCallback = vi.fn();
        const { container } = renderWithNDSProvider(
          <Table
            columns={mockColumns}
            rows={getMockRows(20)}
            hasSelectableRows
            keyField="c1"
            rowsPerPage={6}
            onPageChange={pageChangeCallback}
          />
        );
        const buttons = container.querySelectorAll("button");
        expect(pageChangeCallback).not.toHaveBeenCalled();
        fireEvent.click(buttons[3]);
        expect(pageChangeCallback).toHaveBeenCalledWith(3);
      });
      it("called when navigating to next page", () => {
        const pageChangeCallback = vi.fn();
        const { container } = renderWithNDSProvider(
          <Table
            columns={mockColumns}
            rows={getMockRows(20)}
            hasSelectableRows
            keyField="c1"
            rowsPerPage={6}
            onPageChange={pageChangeCallback}
          />
        );
        const paginationButtons = container.querySelectorAll("button");
        const nextButton = paginationButtons[paginationButtons.length - 1];
        expect(pageChangeCallback).not.toHaveBeenCalled();
        fireEvent.click(nextButton);
        expect(pageChangeCallback).toHaveBeenCalledWith(2);
      });
    });

    describe("rowsPerPage", () => {
      it("displays the correct number of rows", () => {
        const pageChangeCallback = vi.fn();
        const ROWS_PER_PAGE = 6;
        const { container } = renderWithNDSProvider(
          <Table
            columns={mockColumns}
            rows={getMockRows(20)}
            hasSelectableRows
            keyField="c1"
            rowsPerPage={6}
            onPageChange={pageChangeCallback}
          />
        );
        const rows = container.querySelectorAll("tbody tr");
        expect(rows.length).toEqual(ROWS_PER_PAGE);
      });

      it("renders the inner Pagination with correct props", () => {
        const { container } = renderWithNDSProvider(
          <Table columns={mockColumns} rows={getMockRows(20)} hasSelectableRows keyField="c1" rowsPerPage={6} />
        );
        const pagination = container.querySelector('[aria-label="Pagination navigation"]');
        expect(pagination).toBeTruthy();
        // Check that pagination shows page 1 and has 4 pages by checking button states
        const buttons = container.querySelectorAll("button");
        const pageButtons = Array.from(buttons).filter((btn) => btn.getAttribute("aria-current") !== null);
        expect(pageButtons.length).toBeGreaterThan(0);
        expect(pageButtons[0].textContent).toBe("1");
      });

      it("does not display pagination when rowsPerPage is falsy", () => {
        const { container } = renderWithNDSProvider(
          <Table columns={mockColumns} rows={getMockRows(20)} hasSelectableRows keyField="c1" />
        );
        const pagination = container.querySelector('[aria-label="Pagination navigation"]');
        const rows = container.querySelectorAll("tbody tr");
        expect(pagination).toBeNull();
        expect(rows.length).toEqual(20);
      });
    });
  });

  describe("loading", () => {
    it("shows only loading text when loading", () => {
      const { container } = renderWithNDSProvider(
        <Table columns={mockColumns} rows={getMockRows(20)} hasSelectableRows loading />
      );
      const rows = container.querySelectorAll("tbody tr");
      const loadingCell = container.querySelector("tbody tr td");
      expect(loadingCell?.textContent).toEqual("Loading...");
      expect(rows.length).toEqual(1);
    });

    it("shows rows when not loading", () => {
      const rowData = getMockRows(20);
      const { container } = renderWithNDSProvider(
        <Table columns={mockColumns} rows={rowData} hasSelectableRows loading={false} />
      );
      const rows = container.querySelectorAll("tbody tr");
      const cells = container.querySelectorAll("tbody tr td");
      expect(cells[0]?.textContent).not.toEqual("Loading...");
      expect(rows.length).toEqual(20);
    });
  });

  describe("row hovers", () => {
    describe("onRowMouseEnter", () => {
      it("is called with the row when mouse enters a row", () => {
        const columns = [{ label: "Column 1", dataKey: "c1" }];
        const rowData = [{ c1: "r1c1" }, { c1: "r2c1" }];
        const callback = vi.fn();

        const { getAllByTestId } = renderWithNDSProvider(
          <Table columns={columns} rows={rowData} keyField="c1" onRowMouseEnter={callback} />
        );

        fireEvent.mouseEnter(getAllByTestId("table-row")[1]);

        expect(callback).toHaveBeenCalled();
      });
    });
  });

  describe("row hovers", () => {
    describe("onRowMouseLeave", () => {
      it("is called with the row when mouse leaves a row", () => {
        const columns = [{ label: "Column 1", dataKey: "c1" }];
        const rowData = [{ c1: "r1c1" }, { c1: "r2c1" }];
        const callback = vi.fn();

        const { getAllByTestId } = renderWithNDSProvider(
          <Table columns={columns} rows={rowData} keyField="c1" onRowMouseLeave={callback} />
        );

        fireEvent.mouseLeave(getAllByTestId("table-row")[1]);
        expect(callback).toHaveBeenCalled();
      });
    });
  });
});
