import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Table } from ".";

describe("Table", () => {
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
