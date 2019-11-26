/* eslint-disable react/prop-types */
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Table } from ".";
import { Box, DropdownButton, DropdownMenu, Text } from "..";
import { getMockRows, mockColumns, getMockColumns } from "./Table.mock-utils";
import { Button } from "../Button";

const dateToString = ({ cellData }) => {
  return new Date(cellData)
    .toUTCString()
    .split(" ")
    .splice(0, 4)
    .join(" ");
};

const sectionRow = ({ cellData }) => (
  <Box bg="lightBlue" py="x1" px="x2">
    <Text fontWeight="bold" color="blackBlue">
      {cellData}
    </Text>
  </Box>
);

const expandedContent = () => (
  <Box bg="lightBlue" py="x1" px="x2">
    <Text fontWeight="bold" color="blackBlue">
      Expands!
    </Text>
  </Box>
);

const buttonRenderer = ({ label }) => <Button onClick={action("button clicked")}>{label}</Button>;

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

const columnsWithAlignment = [
  { label: "Date", dataKey: "date" },
  { label: "Expected Eaches", dataKey: "expectedQuantity" },
  { label: "Actual Eaches", dataKey: "actualQuantity", align: "right" }
];

const columnsWithWidths = [
  { label: "Date", dataKey: "date" },
  { label: "Expected Quantity", dataKey: "expectedQuantity" },
  { label: "Actual Quantity", dataKey: "actualQuantity" },
  { label: "Note", dataKey: "note", width: "50%" }
];

const columnsWithFormatter = [
  { label: "Date", dataKey: "date", cellFormatter: dateToString },
  { label: "Expected Quantity", dataKey: "expectedQuantity" },
  { label: "Actual Quantity", dataKey: "actualQuantity" }
];

const columnsWithEverything = [
  { label: "Date", dataKey: "date", cellFormatter: dateToString, width: "15%" },
  { label: "Expected Quantity", dataKey: "expectedQuantity", width: "20%" },
  { label: "Actual Quantity", dataKey: "actualQuantity", width: "20%" },
  { label: "Note", dataKey: "note", width: "45%" },
  { label: "", dataKey: "actions", width: "5%", cellRenderer: dropdownCellRenderer }
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

const rowDataWithExpandable = [
  { date: "2019-10-01", expectedQuantity: "2,025 eaches", actualQuantity: "1,800 eaches", id: "r1" },
  { date: "2019-10-02", expectedQuantity: "2,475 eaches", actualQuantity: "2,250 eaches", id: "r2" },
  { date: "2019-10-03", expectedQuantity: "2,475 eaches", actualQuantity: "1,425 eaches", id: "r3" },
  { date: "2019-10-04", expectedQuantity: "2,475 eaches", actualQuantity: "675 eaches", id: "r4", expandedContent },
  { date: "2019-10-07", expectedQuantity: "2,475 eaches", actualQuantity: "1,575 eaches", id: "r5" },
  { date: "2019-10-22", expectedQuantity: "1,725 eaches", actualQuantity: "-", id: "r6" },
  { date: "2019-10-23", expectedQuantity: "2,475 eaches", actualQuantity: "-", id: "r7" },
  { date: "2019-10-24", expectedQuantity: "2,475 eaches", actualQuantity: "-", id: "r8" }
];

const rowDataWithEverything = [
  { heading: "ABC & XYZ Company", cellRenderer: sectionRow, id: "r1" },
  { date: "2019-10-01", expectedQuantity: "2,025 eaches", actualQuantity: "1,800 eaches", id: "r2", expandedContent },
  { date: "2019-10-02", expectedQuantity: "2,475 eaches", actualQuantity: "2,250 eaches", id: "r3" },
  { date: "2019-10-03", expectedQuantity: "2,475 eaches", actualQuantity: "1,425 eaches", id: "r4" },
  {
    date: "2019-10-04",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "675 eaches",
    note: "1c Other Plant-related issue, equipment issues",
    id: "r5"
  },
  { date: "2019-10-07", expectedQuantity: "2,475 eaches", actualQuantity: "1,575 eaches", id: "r6" },
  { date: "2019-10-22", expectedQuantity: "1,725 eaches", actualQuantity: "-", id: "r7" },
  { heading: "And Another Company", cellRenderer: sectionRow, id: "r8" },
  { date: "2019-10-23", expectedQuantity: "2,475 eaches", actualQuantity: "-", id: "r9", expandedContent },
  { date: "2019-10-24", expectedQuantity: "2,475 eaches", actualQuantity: "-", id: "r10" }
];

const footerRowData = [
  { date: "Total", expectedQuantity: "18,000 eaches", actualQuantity: "7,725 eaches" },
  { date: "Attainment", expectedQuantity: "", actualQuantity: "41.5%" }
];

storiesOf("Table", module)
  .add("Table with data", () => <Table columns={columns} rows={rowData} />)
  .add("without row hovers", () => <Table columns={columns} rows={rowData} rowHovers={false} />)
  .add("with no data", () => <Table columns={columns} rows={[]} />)
  .add("with no data and custom content", () => (
    <Table columns={columns} rows={[]} noRowsContent="No jobs are available" />
  ))
  .add("with compact styling", () => <Table columns={columns} rows={rowData} compact />)
  .add("with custom column widths", () => <Table columns={columnsWithWidths} rows={rowDataWithWidths} />)
  .add("with full width section", () => <Table columns={columns} rows={rowDataWithSections} />)
  .add("with a custom cell component", () => (
    <Table columns={getColumnsWithCellRenderer(dropdownCellRenderer)} rows={rowData} />
  ))
  .add("With cell alignment", () => <Table columns={columnsWithAlignment} rows={rowData} />)
  .add("with a cell formatter", () => <Table columns={columnsWithFormatter} rows={rowData} />)
  .add("with a custom column label component", () => (
    <Table columns={getColumnsWithHeaderFormatter(buttonRenderer)} rows={rowData} />
  ))
  .add("with selectable rows", () => (
    <Table columns={columns} rows={rowData} hasSelectableRows onRowSelectionChange={action("row selection changed")} />
  ))
  .add("with preselected rows", () => (
    <Table
      columns={columns}
      rows={rowData}
      hasSelectableRows
      selectedRows={["2019-10-01"]}
      keyField="date"
      onRowSelectionChange={action("row selection changed")}
    />
  ))
  .add("with pagination", () => (
    <Table
      columns={columns}
      rows={rowData}
      rowsPerPage={1}
      onRowSelectionChange={action("row selection changed")}
      onPageChange={action("page changed")}
    />
  ))
  .add("with pagination and selectable rows", () => (
    <Table
      columns={columns}
      rows={rowData}
      hasSelectableRows
      rowsPerPage={4}
      onRowSelectionChange={action("row selection changed")}
      onPageChange={action("page changed")}
    />
  ))
  .add("with a footer", () => (
    <>
      <Table columns={columns} keyField="date" rows={rowData} footerRows={footerRowData} />
      <Text mt="x6">Loading state:</Text>
      <Table columns={columns} keyField="date" rows={rowData} footerRows={footerRowData} loading />
    </>
  ))
  .add("with lots of rows and columns", () => (
    <Table
      columns={mockColumns}
      rows={getMockRows(50)}
      hasSelectableRows
      onRowSelectionChange={action("row selection changed")}
    />
  ))
  .add("with expandable rows", () => (
    <Table
      columns={columns}
      rows={rowDataWithExpandable}
      hasExpandableRows
      onRowExpansionChange={action("toggled expand")}
    />
  ))
  .add("with selectable and expandable rows", () => (
    <Table
      columns={getMockColumns(3)}
      rows={rowDataWithExpandable}
      hasExpandableRows
      hasSelectableRows
      onRowSelectionChange={action("row selection changed")}
      onRowExpansionChange={action("toggled expand")}
    />
  ))
  .add("loading", () => <Table columns={columns} rows={rowData} loading />)
  .add("with everything", () => (
    <Table
      columns={columnsWithEverything}
      rows={rowDataWithEverything}
      footerRows={footerRowData}
      rowsPerPage={5}
      hasExpandableRows
      onRowExpansionChange={action("toggled expand")}
      hasSelectableRows
      onRowSelectionChange={action("row selection changed")}
      onPageChange={action("page changed")}
    />
  ));
