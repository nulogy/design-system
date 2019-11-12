import React from "react";
import { storiesOf } from "@storybook/react";
import { Table, Box, Text } from "..";
import { getMockRows, mockColumns } from "../Table/Table.mock-utils";

const columns = [
  { label: "Column 1", dataKey: "c1" },
  { label: "Column 2", dataKey: "c2" },
  { label: "Column 3", dataKey: "c3" },
  { label: "Column 4", dataKey: "c4" },
  { label: "Column 5", dataKey: "c5" },
  { label: "Column 6", dataKey: "c6" }
];

const rowData = [
  { c1: "row 1 cell 1", c2: "r1c2", c3: "2019-09-21", id: "r1" },
  { c1: "r2c1", c2: "r2c2", c3: "2019-09-22", id: "r2" }
];

const expandedContent = () => (
  <Box bg="lightBlue" py="x1" px="x2">
    <Text fontWeight="bold" color="blackBlue">
      Expands!
    </Text>
  </Box>
);

const rowDataWithExpandedContent = [
  { c1: "row 1 cell 1", c2: "r1c2", c3: "2019-09-21", id: "r1" },
  { c1: "r2c1", c2: "r2c2", c3: "2019-09-22", id: "r2", expandedContent },
  { c1: "row 3 cell 1", c2: "r3c2", c3: "2019-09-21", id: "r3" }
];

storiesOf("StoriesForTests/Table", module)
  .add("with selected rows with defaults", () => (
    <Table columns={columns} rows={rowData} hasSelectableRows selectedRows={["r2c1"]} keyField="c1" />
  ))
  .add("with selected rows", () => <Table columns={columns} rows={rowData} hasSelectableRows keyField="c1" />)
  .add("with pagination", () => <Table columns={mockColumns} rows={getMockRows(23)} rowsPerPage={4} keyField="c1" />)
  .add("with pagination and selectable rows", () => (
    <Table
      columns={mockColumns}
      rows={getMockRows(56)}
      rowsPerPage={5}
      hasSelectableRows
      selectedRows={["r2c1"]}
      keyField="c1"
    />
  ))
  .add("with expandable and selectable rows with defaults", () => (
    <Table
      columns={columns}
      rows={rowDataWithExpandedContent}
      hasSelectableRows
      hasExpandableRows
      expandedRows={["r2c1"]}
      selectedRows={["r2c1"]}
      keyField="c1"
    />
  ))
  .add("with expandable rows with defaults", () => (
    <Table
      columns={columns}
      rows={rowDataWithExpandedContent}
      hasExpandableRows
      expandedRows={["r2c1"]}
      keyField="c1"
    />
  ));
