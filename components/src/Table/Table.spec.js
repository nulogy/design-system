import React from "react";
import { mount } from "enzyme";
import { render, fireEvent } from "@testing-library/react";

import { Pagination } from "../Pagination";
import { Table } from ".";
import { mockColumns, getMockRows } from "./Table.mock-utils";

describe("Table", () => {
  describe("row selections", () => {
    describe("onRowSelectionChange:", () => {
      it("returns the selected rows when the selection has changed", () => {
        const columns = [{ label: "Column 1", dataKey: "c1" }];
        const rowData = [{ c1: "r1c1" }, { c1: "r2c1" }];
        const callback = jest.fn();

        const { container } = render(
          <Table columns={columns} rows={rowData} hasSelectableRows keyField="c1" onRowSelectionChange={callback} />
        );

        fireEvent.click(container.querySelectorAll("input")[1]);

        expect(callback).toHaveBeenCalledWith([rowData[0].c1]);
      });
      it("returns an empty array if no rows are selected", () => {
        const columns = [{ label: "Column 1", dataKey: "c1" }];
        const rowData = [{ c1: "r1c1" }, { c1: "r2c1" }];
        const callback = jest.fn();

        const { container } = render(
          <Table columns={columns} rows={rowData} hasSelectableRows keyField="c1" onRowSelectionChange={callback} />
        );

        fireEvent.click(container.querySelectorAll("input")[0]);
        expect(callback).toHaveBeenCalledWith([rowData[0].c1, rowData[1].c1]);
        fireEvent.click(container.querySelectorAll("input")[0]);
        expect(callback).toHaveBeenCalledWith([]);
      });
    });
  });
  describe("pagination", () => {
    describe("onPageChange:", () => {
      it("called when a new page is selected", () => {
        const pageChangeCallback = jest.fn();
        const wrapper = mount(
          <Table
            columns={mockColumns}
            rows={getMockRows(20)}
            hasSelectableRows
            keyField="c1"
            rowsPerPage={6}
            onPageChange={pageChangeCallback}
          />
        );
        const onClickPage = pageNum => {
          wrapper
            .find("button")
            .at(pageNum)
            .simulate("click");
        };
        expect(pageChangeCallback).not.toHaveBeenCalled();
        onClickPage(3);
        expect(pageChangeCallback).toHaveBeenCalledWith(3);
      });
      it("called when navigating to next page", () => {
        const pageChangeCallback = jest.fn();
        const wrapper = mount(
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
        const wrapper = mount(
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
        const wrapper = mount(
          <Table columns={mockColumns} rows={getMockRows(20)} hasSelectableRows keyField="c1" rowsPerPage={6} />
        );
        const pagination = wrapper.find(Pagination);
        expect(pagination.length).toEqual(1);
        expect(pagination.props().totalPages).toEqual(4);
        expect(pagination.props().currentPage).toEqual(1);
      });
      it("does not display pagination when rowsPerPage is falsy", () => {
        const wrapper = mount(<Table columns={mockColumns} rows={getMockRows(20)} hasSelectableRows keyField="c1" />);
        const pagination = wrapper.find(Pagination);
        const rows = wrapper.find("tbody tr");
        expect(pagination.length).toEqual(0);
        expect(rows.length).toEqual(20);
      });
    });
  });
});
