import React from "react";
import { storiesOf } from "@storybook/react";
import { Table } from ".";
import { Box } from "..";

const dateToString = ({ rowData, dataKey }) => {
  const cellContent = rowData[dataKey];
  return new Date(cellContent).toDateString();
};

// eslint-disable-next-line react/prop-types
const customCellRenderer = ({ cellData }) => (
  <Box bg="blue" color="white" p="x1" display="inline-block" title={cellData}>
    <span role="img" aria-label="star">
      ⭐
    </span>
    {cellData}
    <span role="img" aria-label="star">
      ⭐
    </span>
  </Box>
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
  .add("truncated", () => (
    <Box width={400}>
      <Table columns={columns} rows={rowData} />
    </Box>
  ));
