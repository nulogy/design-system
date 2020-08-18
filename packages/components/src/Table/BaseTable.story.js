/* eslint-disable react/prop-types */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Table } from ".";
import { Box, DropdownButton, DropdownMenu, Button, Text } from "..";
import { getMockRows, mockColumns } from "./Table.mock-utils";

const dateToString = ({ cellData }) => {
  return new Date(cellData)
    .toUTCString()
    .split(" ")
    .splice(0, 4)
    .join(" ");
};

const buttonRenderer = ({ label }) => <Button onClick={action("button clicked")}>{label}</Button>;

const sectionRow = ({ cellData }) => (
  <Box bg="lightBlue" py="x1" px="x2">
    <Text fontWeight="bold" color="blackBlue">
      {cellData}
    </Text>
  </Box>
);

const dropdownCellRenderer = ({ cellData }) => (
  <Box textAlign="right" pr="x3">
    <DropdownMenu>
      <DropdownButton onClick={action(cellData)}>Edit</DropdownButton>
      <DropdownButton onClick={action(cellData)}>Delete</DropdownButton>
    </DropdownMenu>
  </Box>
);

const columns = [
  { label: "Date", dataKey: "date" },
  { label: "Expected Quantity", dataKey: "expectedQuantity" },
  { label: "Actual Quantity", dataKey: "actualQuantity" }
];

const columnsWithWidths = [
  { label: "Date", dataKey: "date" },
  { label: "Expected Quantity", dataKey: "expectedQuantity" },
  { label: "Actual Quantity", dataKey: "actualQuantity" },
  { label: "Note", dataKey: "note", width: "50%" }
];
const rowData = [
  { date: "2019-10-01", expectedQuantity: "2,025 eaches", actualQuantity: "1,800 eaches", id: "r1" },
  { date: "2019-10-02", expectedQuantity: "2,475 eaches", actualQuantity: "2,250 eaches", id: "r2" },
  { date: "2019-10-03", expectedQuantity: "2,475 eaches", actualQuantity: "1,425 eaches", id: "r3" },
  { date: "2019-10-04", expectedQuantity: "2,475 eaches", actualQuantity: "675 eaches", id: "r4" },
  { date: "2019-10-07", expectedQuantity: "2,475 eaches", actualQuantity: "1,575 eaches", id: "r5" },
  { date: "2019-10-22", expectedQuantity: "1,725 eaches", actualQuantity: "-", id: "r7" },
  { date: "2019-10-23", expectedQuantity: "2,475 eaches", actualQuantity: "-", id: "r8" },
  { date: "2019-10-24", expectedQuantity: "2,475 eaches", actualQuantity: "-", id: "r9" }
];
const rowDataWithWidths = [
  { date: "2019-10-01", expectedQuantity: "2,025 eaches", actualQuantity: "1,800 eaches", id: "r1" },
  { date: "2019-10-02", expectedQuantity: "2,475 eaches", actualQuantity: "2,250 eaches", id: "r2" },
  { date: "2019-10-03", expectedQuantity: "2,475 eaches", actualQuantity: "1,425 eaches", id: "r3" },
  {
    date: "2019-10-04",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "675 eaches",
    note: "1c Other Plant-related issue, equipment issues",
    id: "r4"
  },
  { date: "2019-10-07", expectedQuantity: "2,475 eaches", actualQuantity: "1,575 eaches", id: "r5" },
  { date: "2019-10-22", expectedQuantity: "1,725 eaches", actualQuantity: "-", id: "r6" },
  { date: "2019-10-23", expectedQuantity: "2,475 eaches", actualQuantity: "-", id: "r7" },
  { date: "2019-10-24", expectedQuantity: "2,475 eaches", actualQuantity: "-", id: "r8" }
];

const columnsWithFormatter = [
  { label: "Date", dataKey: "date", cellFormatter: dateToString },
  { label: "Expected Quantity", dataKey: "expectedQuantity" },
  { label: "Actual Quantity", dataKey: "actualQuantity" }
];

const columnsWithAlignment = [
  { label: "Date", dataKey: "date" },
  { label: "Expected Eaches", dataKey: "expectedQuantity" },
  { label: "Actual Eaches", dataKey: "actualQuantity", align: "right" }
];

const getColumnsWithCellRenderer = cellRenderer => [
  { label: "Date", dataKey: "date" },
  { label: "Expected Quantity", dataKey: "expectedQuantity" },
  { label: "", dataKey: "actualQuantity", cellRenderer }
];

const getColumnsWithHeaderFormatter = headerFormatter => [
  { label: "Date", dataKey: "date" },
  { label: "Expected Quantity", dataKey: "expectedQuantity" },
  { label: "Actual Quantity", dataKey: "actualQuantity" },
  { label: "Add record", dataKey: "c4", headerFormatter }
];

const footerRowData = [
  { date: "Total", expectedQuantity: "18,000 eaches", actualQuantity: "7,725 eaches", id: "f1" },
  { date: "Attainment", expectedQuantity: "", actualQuantity: "41.5%", id: "f2" }
];

const rowDataWithSections = [
  { date: "2019-10-01", expectedQuantity: "2,025 eaches", actualQuantity: "1,800 eaches", id: "r1" },
  { date: "2019-10-02", expectedQuantity: "2,475 eaches", actualQuantity: "2,250 eaches", id: "r2" },
  { date: "2019-10-03", expectedQuantity: "2,475 eaches", actualQuantity: "1,425 eaches", id: "r3" },
  { date: "2019-10-04", expectedQuantity: "2,475 eaches", actualQuantity: "675 eaches", id: "r4" },
  { heading: "ABC & XYZ Company", cellRenderer: sectionRow, id: "r5" },
  { date: "2019-10-22", expectedQuantity: "1,725 eaches", actualQuantity: "-", id: "r6" },
  { date: "2019-10-23", expectedQuantity: "2,475 eaches", actualQuantity: "-", id: "r7" },
  { date: "2019-10-24", expectedQuantity: "2,475 eaches", actualQuantity: "-", id: "r8" }
];

storiesOf("Table", module)
  .addDecorator(withKnobs)
  .add(" with data", () => (
    <Table
      columns={columns}
      rows={rowData}
      rowHovers={boolean("Show row hovers", true)}
      compact={boolean("Show with compact styling", false)}
      loading={boolean("Show loading state", false)}
      className="Table"
    />
  ))
  .add("with no data", () => (
    <Table
      columns={columns}
      rows={[]}
      noRowsContent={text("Custom text", undefined)}
      loading={boolean("Show loading state", false)}
    />
  ))
  .add("with sticky header", () => (
    <Box mt="x4">
      <Table
        columns={columns}
        rows={rowData}
        rowHovers={boolean("Show row hovers", true)}
        compact={boolean("Show with compact styling", false)}
        loading={boolean("Show loading state", false)}
        className="Table"
        sticky
      />
    </Box>
  ))
  .add("with lots of rows and columns", () => (
    <Table
      columns={mockColumns}
      rows={getMockRows(50)}
      hasSelectableRows
      onRowSelectionChange={action("row selection changed")}
      loading={boolean("Show loading state", false)}
    />
  ))
  .add("with custom column widths", () => <Table columns={columnsWithWidths} rows={rowDataWithWidths} />)
  .add("with a custom cell component", () => (
    <Table columns={getColumnsWithCellRenderer(dropdownCellRenderer)} rows={rowData} />
  ))
  .add("with cell alignment", () => <Table columns={columnsWithAlignment} rows={rowData} />)
  .add("with a cell formatter", () => <Table columns={columnsWithFormatter} rows={rowData} />)
  .add("with a custom column label component", () => (
    <Table columns={getColumnsWithHeaderFormatter(buttonRenderer)} rows={rowData} />
  ))
  .add("with full width section", () => <Table columns={columns} rows={rowDataWithSections} />)
  .add("with a footer", () => (
    <Table
      columns={columns}
      keyField="date"
      rows={rowData}
      footerRows={footerRowData}
      loading={boolean("Show loading state", false)}
    />
  ));
