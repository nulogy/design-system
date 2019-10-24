import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Table } from ".";
import { Box, IconicButton, DropdownButton, DropdownLink, DropdownMenu } from "..";

const dateToString = cellData => {
  return new Date(cellData).toUTCString();
};

// eslint-disable-next-line react/prop-types
const iconicButtonCellRenderer = cellData => <IconicButton icon="delete">{cellData}</IconicButton>;

const dropdownCellRenderer = cellData => (
  <Box textAlign="right">
    <DropdownMenu>
      <DropdownLink href="/">See Date: {cellData}</DropdownLink>
      <DropdownButton onClick={() => {}}>Dropdown 1</DropdownButton>
      <DropdownButton onClick={() => {}}>Dropdown 2</DropdownButton>
      <DropdownButton onClick={() => {}}>Dropdown 3</DropdownButton>
    </DropdownMenu>
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

const getColumnsWithCellRenderer = cellRenderer => [
  { label: "Column 1", dataKey: "c1" },
  { label: "Column 2", dataKey: "c2" },
  { label: "Column 3", dataKey: "c3", cellRenderer }
];

const columnsWithAlignment = [
  { label: "Column 1", dataKey: "c1" },
  { label: "Column 2", dataKey: "c2" },
  { label: "Column 3", dataKey: "c3", align: "right" }
];

const columnsWithWidths = [
  { label: "Column 1", dataKey: "c1", width: "30%" },
  { label: "Column 2", dataKey: "c2", width: "60%" },
  { label: "Column 3", dataKey: "c3", width: "10%" }
];

const columnsWithFormatter = [
  { label: "Column 1", dataKey: "c1" },
  { label: "Column 2", dataKey: "c2" },
  { label: "Column 3", dataKey: "c3", cellFormatter: dateToString }
];

const rowData = [
  { c1: "row 1 cell 1", c2: "r1c2", c3: "2019-09-21", id: "r1" },
  { c1: "r2c1", c2: "r2c2", c3: "2019-09-22", id: "r2" }
];
const lotsOfRows = numRows => {
  const rows = [];

  for (let i = 0; i < numRows; i += 1) {
    const row = {
      id: i,
      c1: `some data ${i}`,
      c2: "some data",
      c3: "some data",
      c4: "some data",
      c5: "some data",
      c6: "some data",
      c7: "some data",
      c8: "some data",
      c9: "some data",
      c10: "some data",
      c11: "some data",
      c12: "some data",
      c13: "some data",
      c14: "some data",
      c15: "some data",
      c16: "some data",
      c17: "some data",
      c18: "some data",
      c19: "some data",
      c20: "some data",
      c21: "some data"
    };

    rows.push(row);
  }

  return rows;
};

const lotsOfColumns = [
  { label: "Column 1", dataKey: "c1" },
  { label: "Column 2", dataKey: "c2" },
  { label: "Column 3", dataKey: "c3" },
  { label: "Column 4", dataKey: "c4" },
  { label: "Column 5", dataKey: "c5" },
  { label: "Column 6", dataKey: "c6" },
  { label: "Column 7", dataKey: "c7" },
  { label: "Column 8", dataKey: "c8" },
  { label: "Column 9", dataKey: "c9" },
  { label: "Column 10", dataKey: "c10" },
  { label: "Column 11", dataKey: "c11" },
  { label: "Column 12", dataKey: "c12" },
  { label: "Column 13", dataKey: "c13" },
  { label: "Column 14", dataKey: "c14" },
  { label: "Column 15", dataKey: "c15" },
  { label: "Column 16", dataKey: "c16" },
  { label: "Column 17", dataKey: "c17" },
  { label: "Column 18", dataKey: "c18" },
  { label: "Column 19", dataKey: "c19" },
  { label: "Column 20", dataKey: "c20" },
  { label: "Column 21", dataKey: "c21" }
];

storiesOf("Table", module)
  .add("Table with data", () => <Table columns={columns} rows={rowData} />)
  .add("Cell alignment", () => <Table columns={columnsWithAlignment} rows={rowData} />)
  .add("with no data", () => <Table columns={columns} rows={[]} />)
  .add("with a cell formatter", () => <Table columns={columnsWithFormatter} rows={rowData} />)
  .add("with a custom component: iconic button", () => (
    <Table columns={getColumnsWithCellRenderer(iconicButtonCellRenderer)} rows={rowData} />
  ))
  .add("with a custom component: dropdown", () => (
    <Table columns={getColumnsWithCellRenderer(dropdownCellRenderer)} rows={rowData} />
  ))
  .add("with wrapping text", () => (
    <Box width={400}>
      <Table columns={columns} rows={rowData} />
    </Box>
  ))
  .add("with selectable rows", () => (
    <Table columns={columns} rows={rowData} hasSelectableRows onRowSelectionChange={action("row selection changed")} />
  ))
  .add("with lots of rows and columns", () => (
    <Table
      columns={lotsOfColumns}
      rows={lotsOfRows(50)}
      hasSelectableRows
      onRowSelectionChange={action("row selection changed")}
    />
  ))
  .add("with preselected rows", () => (
    <Table
      columns={columns}
      rows={rowData}
      hasSelectableRows
      selectedRows={["r2c1"]}
      keyField="c1"
      onRowSelectionChange={action("row selection changed")}
    />
  ))
  .add("with custom column widths", () => <Table columns={columnsWithWidths} rows={rowData} />)
  .add("with pagination", () => (
    <Table
      columns={lotsOfColumns}
      rows={lotsOfRows(120)}
      hasSelectableRows
      rowsPerPage={4}
      onRowSelectionChange={row => console.log(row)}
    />
  ));
