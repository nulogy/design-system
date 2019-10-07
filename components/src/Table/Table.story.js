import React from "react";
import { storiesOf } from "@storybook/react";
import { Table } from ".";
import { Box, IconicButton } from "..";

const dateToString = cellData => {
  return new Date(cellData).toUTCString();
};

// eslint-disable-next-line react/prop-types
const customCellRenderer = cellData => (
  <>
    <IconicButton icon="delete">{cellData}</IconicButton>
  </>
);

const columns = [
  { label: "Column 1", dataKey: "c1" },
  { label: "Column 2", dataKey: "c2" },
  { label: "Column 3", dataKey: "c3" },
  { label: "Column 4", dataKey: "c4" },
  { label: "Column 5", dataKey: "c5" },
  { label: "Column 6", dataKey: "c6" }
];

const columnsWithCellRenderer = [
  { label: "Column 1", dataKey: "c1" },
  { label: "Column 2", dataKey: "c2" },
  { label: "Column 3", dataKey: "c3", cellRenderer: customCellRenderer }
];

const columnsWithAlignment = [
  { label: "Column 1", dataKey: "c1" },
  { label: "Column 2", dataKey: "c2" },
  { label: "Column 3", dataKey: "c3", align: "right" }
];

const columnsWithFormatter = [
  { label: "Column 1", dataKey: "c1" },
  { label: "Column 2", dataKey: "c2" },
  { label: "Column 3", dataKey: "c3", cellFormatter: dateToString }
];

const rowData = [{ c1: "row 1 cell 1", c2: "r1c2", c3: "2019-09-21" }, { c1: "r2c1", c2: "r2c2", c3: "2019-09-22" }];

storiesOf("Table", module)
  .add("Table with data", () => <Table columns={columns} rows={rowData} />)
  .add("Cell alignment", () => <Table columns={columnsWithAlignment} rows={rowData} />)
  .add("with no data", () => <Table columns={columns} rows={[]} />)
  .add("with a cell formatter", () => <Table columns={columnsWithFormatter} rows={rowData} />)
  .add("with a custom component", () => <Table columns={columnsWithCellRenderer} rows={rowData} />)
  .add("with wrapping text", () => (
    <Box width={400}>
      <Table columns={columns} rows={rowData} />
    </Box>
  ))
  .add("with selectable rows", () => <Table columns={columns} rows={rowData} hasSelectableRows />);
