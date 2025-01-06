import React from "react";
import { fireEvent } from "@testing-library/react";
import { Pagination } from "../Pagination";
import { createMatchMedia } from "../utils/testHelpers/createMatchMedia";
import { renderWithNDSProvider } from "../NDSProvider/renderWithNDSProvider.spec-utils";
import { mountWithNDSProvider } from "../NDSProvider/mountWithNDSProvider.spec-utils";
import { mockColumns, getMockRows, getMockColumns } from "./Table.mock-utils";
import { Table } from ".";

describe("Table", () => {
  describe("row selections", () => {
    describe("onRowSelectionChange:", () => {
      it("returns the selected rows when the selection has changed", () => {
        const columns = [{ label: "Column 1", dataKey: "c1" }];
        const rowData = [{ c1: "r1c1" }, { c1: "r2c1" }];
        const callback = jest.fn();

        const { container } = renderWithNDSProvider(
          <Table columns={columns} rows={rowData} hasSelectableRows keyField="c1" onRowSelectionChange={callback} />
        );

        fireEvent.click(container.querySelectorAll("input")[1]);

        expect(callback).toHaveBeenCalledWith([rowData[0].c1]);
      });

      it("returns an empty array if no rows are selected", () => {
        const columns = [{ label: "Column 1", dataKey: "c1" }];
        const rowData = [{ c1: "r1c1" }, { c1: "r2c1" }];
        const callback = jest.fn();

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
        const callback = jest.fn();

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
        const callback = jest.fn();

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

        const pageChangeCallback = jest.fn();
        const wrapper = mountWithNDSProvider(
          <Table
            columns={mockColumns}
            rows={getMockRows(20)}
            hasSelectableRows
            keyField="c1"
            rowsPerPage={6}
            onPageChange={pageChangeCallback}
          />
        );
        const onClickPage = (pageNum) => {
          wrapper.find("button").at(pageNum).simulate("click");
        };
        expect(pageChangeCallback).not.toHaveBeenCalled();
        onClickPage(3);
        expect(pageChangeCallback).toHaveBeenCalledWith(3);
      });
      it("called when navigating to next page", () => {
        const pageChangeCallback = jest.fn();
        const wrapper = mountWithNDSProvider(
          <Table
            columns={mockColumns}
            rows={getMockRows(20)}
            hasSelectableRows
            keyField="c1"
            rowsPerPage={6}
            onPageChange={pageChangeCallback}
          />
        );
        const paginationButtons = wrapper.find("button");
        const nextButton = paginationButtons.last();
        expect(pageChangeCallback).not.toHaveBeenCalled();
        nextButton.simulate("click");
        expect(pageChangeCallback).toHaveBeenCalledWith(2);
      });
    });

    describe("rowsPerPage", () => {
      it("displays the correct number of rows", () => {
        const pageChangeCallback = jest.fn();
        const ROWS_PER_PAGE = 6;
        const wrapper = mountWithNDSProvider(
          <Table
            columns={mockColumns}
            rows={getMockRows(20)}
            hasSelectableRows
            keyField="c1"
            rowsPerPage={6}
            onPageChange={pageChangeCallback}
          />
        );
        const rows = wrapper.find("tbody tr");
        expect(rows.length).toEqual(ROWS_PER_PAGE);
      });

      it("renders the inner Pagination with correct props", () => {
        const wrapper = mountWithNDSProvider(
          <Table columns={mockColumns} rows={getMockRows(20)} hasSelectableRows keyField="c1" rowsPerPage={6} />
        );
        const pagination = wrapper.find(Pagination);
        expect(pagination.length).toEqual(1);
        expect(pagination.props().totalPages).toEqual(4);
        expect(pagination.props().currentPage).toEqual(1);
      });

      it("does not display pagination when rowsPerPage is falsy", () => {
        const wrapper = mountWithNDSProvider(
          <Table columns={mockColumns} rows={getMockRows(20)} hasSelectableRows keyField="c1" />
        );
        const pagination = wrapper.find(Pagination);
        const rows = wrapper.find("tbody tr");
        expect(pagination.length).toEqual(0);
        expect(rows.length).toEqual(20);
      });
    });
  });

  describe("loading", () => {
    it("shows only loading text when loading", () => {
      const wrapper = mountWithNDSProvider(
        <Table columns={mockColumns} rows={getMockRows(20)} hasSelectableRows loading />
      );
      const rows = wrapper.find("tbody tr");
      const loadingCell = wrapper.find("tbody tr td");
      expect(loadingCell.text()).toEqual("Loading...");
      expect(rows.length).toEqual(1);
    });

    it("shows rows when not loading", () => {
      const rowData = getMockRows(20);
      const wrapper = mountWithNDSProvider(
        <Table columns={mockColumns} rows={rowData} hasSelectableRows loading={false} />
      );
      const rows = wrapper.find("tbody tr");
      const cell = wrapper.find("tbody tr td");
      expect(cell.at(0).text()).not.toEqual("Loading...");
      expect(rows.length).toEqual(20);
    });
  });

  describe("row hovers", () => {
    describe("onRowMouseEnter", () => {
      it("is called with the row when mouse enters a row", () => {
        const columns = [{ label: "Column 1", dataKey: "c1" }];
        const rowData = [{ c1: "r1c1" }, { c1: "r2c1" }];
        const callback = jest.fn();

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
        const callback = jest.fn();

        const { getAllByTestId } = renderWithNDSProvider(
          <Table columns={columns} rows={rowData} keyField="c1" onRowMouseLeave={callback} />
        );

        fireEvent.mouseLeave(getAllByTestId("table-row")[1]);
        expect(callback).toHaveBeenCalled();
      });
    });
  });
});
