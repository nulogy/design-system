/* eslint-disable react/prop-types */
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Table } from ".";
import { Box, IconicButton, DropdownButton, DropdownLink, DropdownMenu, Text } from "..";
import { getMockRows, mockColumns, getMockColumns } from "./Table.mock-utils";
import { Button } from "../Button";

const dateToString = ({ cellData }) => {
  return new Date(cellData).toUTCString();
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

const iconicButtonCellRenderer = ({ cellData }) => <IconicButton icon="delete">{cellData}</IconicButton>;

const buttonRenderer = ({ label }) => <Button onClick={action("button clicked")}>{label}</Button>;

const dropdownCellRenderer = ({ cellData }) => (
  <Box textAlign="right" px="x1">
    <DropdownMenu>
      <DropdownLink href="/">See Date: {cellData}</DropdownLink>
      <DropdownButton onClick={() => {}}>Dropdown 1</DropdownButton>
      <DropdownButton onClick={() => {}}>Dropdown 2</DropdownButton>
      <DropdownButton onClick={() => {}}>Dropdown 3</DropdownButton>
    </DropdownMenu>
  </Box>
);

const columns = [
  { label: "Date", dataKey: "c1" },
  { label: "Expected Quantity", dataKey: "c2" },
  { label: "Actual Quantity", dataKey: "c3" }
];

const getColumnsWithCellRenderer = cellRenderer => [
  { label: "Column 1", dataKey: "c1" },
  { label: "Column 2", dataKey: "c2" },
  { label: "Column 3", dataKey: "c3", cellRenderer }
];

const getColumnsWithheaderFormatter = headerFormatter => [
  { label: "Column 1", dataKey: "c1" },
  { label: "Column 2", dataKey: "c2" },
  { label: "Column 3", dataKey: "c3", headerFormatter }
const getColumnsWithHeaderFormatter = headerFormatter => [
  { label: "Date", dataKey: "c1" },
  { label: "Expected Quantity", dataKey: "c2" },
  { label: "Expected Quantity", dataKey: "c3" },
  { label: "Add record", dataKey: "c4", headerFormatter }
];

const columnsWithAlignment = [
  { label: "Column 1", dataKey: "c1" },
  { label: "Column 2", dataKey: "c2" },
  { label: "Column 3", dataKey: "c3", align: "right" }
];

const columnsWithWidths = [
  { label: "Date", dataKey: "c1" },
  { label: "Expected Quantity", dataKey: "c2" },
  { label: "Actual Quantity", dataKey: "c3" },
  { label: "Note", dataKey: "c4", width: "50%" }
];

const columnsWithFormatter = [
  { label: "Column 1", dataKey: "c1" },
  { label: "Column 2", dataKey: "c2" },
  { label: "Column 3", dataKey: "c3", cellFormatter: dateToString }
];

const rowData = [
  { c1: "2019-10-01", c2: "2,025 eaches", c3: "1,800 eaches", id: "r1" },
  { c1: "2019-10-02", c2: "2,475 eaches", c3: "2,250 eaches", id: "r2" },
  { c1: "2019-10-03", c2: "2,475 eaches", c3: "1,425 eaches", id: "r3" },
  { c1: "2019-10-04", c2: "2,475 eaches", c3: "675 eaches", id: "r4" },
  { c1: "2019-10-07", c2: "2,475 eaches", c3: "1,575 eaches", id: "r5" },
  { c1: "2019-10-22", c2: "1,725 eaches", c3: "-", id: "r6" },
  { c1: "2019-10-23", c2: "2,475 eaches", c3: "-", id: "r7" },
  { c1: "2019-10-24", c2: "2,475 eaches", c3: "-", id: "r8" }
];
const rowDataWithWidths = [
  { c1: "2019-10-01", c2: "2,025 eaches", c3: "1,800 eaches", id: "r1" },
  { c1: "2019-10-02", c2: "2,475 eaches", c3: "2,250 eaches", id: "r2" },
  { c1: "2019-10-03", c2: "2,475 eaches", c3: "1,425 eaches", id: "r3" },
  {
    c1: "2019-10-04",
    c2: "2,475 eaches",
    c3: "675 eaches",
    c4: "1c Other Plant-related issue, equipment issues",
    id: "r4"
  },
  { c1: "2019-10-07", c2: "2,475 eaches", c3: "1,575 eaches", id: "r5" },
  { c1: "2019-10-22", c2: "1,725 eaches", c3: "-", id: "r6" },
  { c1: "2019-10-23", c2: "2,475 eaches", c3: "-", id: "r7" },
  { c1: "2019-10-24", c2: "2,475 eaches", c3: "-", id: "r8" }
];

const rowDataWithSections = [
  { heading: "section 1", id: "1" },
  { c1: "row 1 cell 1", c2: "r1c2", c3: "2019-09-21", id: "2" },
  { c1: "r2c1", c2: "r2c2", c3: "2019-09-22", id: "3" },
  { c1: "r3c1", c2: "r2c2", c3: "2019-09-22", id: "4" },
  { heading: "section 2", cellRenderer: sectionRow, id: "5" },
  { c1: "r4c1", c2: "r2c2", c3: "2019-09-22", id: "6" },
  { c1: "r5c1", c2: "r2c2", c3: "2019-09-22", id: "7" }
];

const rowDataWithExpandable = [
  {
    c1: "row 1 cell 1",
    c2: "r1c2",
    c3: "2019-09-21",
    id: "2",
    expandedContent
  },
  { c1: "r2c1", c2: "r2c2", c3: "2019-09-22", id: "3" },
  { c1: "r3c1", c2: "r2c2", c3: "2019-09-22", id: "4" },
  { c1: "r4c1", c2: "r2c2", c3: "2019-09-22", id: "6", expandedContent },
  { c1: "r5c1", c2: "r2c2", c3: "2019-09-22", id: "7" }
];

const footerRowData = [
  { c1: "Total", c2: "r1c2", c3: "2019-09-21", id: "r1" },
  { c1: "Attainment", c2: "r2c2", c3: "2019-09-22", id: "r2" }
];

storiesOf("Table", module)
  .add("Table with data", () => <Table columns={columns} rows={rowData} />)
  .add("Table without row hovers", () => <Table columns={columns} rows={rowData} rowHovers={false} />)
  .add("Cell alignment", () => <Table columns={columnsWithAlignment} rows={rowData} />)
  .add("with no data", () => <Table columns={columns} rows={[]} />)
  .add("loading", () => <Table columns={columns} rows={rowData} loading />)
  .add("with a cell formatter", () => <Table columns={columnsWithFormatter} rows={rowData} />)
  .add("with a custom table cell component: dropdown", () => (
    <Table columns={getColumnsWithCellRenderer(dropdownCellRenderer)} rows={rowData} />
  ))
  .add("with a custom column label component: button", () => (
    <Table columns={getColumnsWithHeaderFormatter(buttonRenderer)} rows={rowData} />
  ))
  .add("with selectable rows", () => (
    <Table columns={columns} rows={rowData} hasSelectableRows onRowSelectionChange={action("row selection changed")} />
  ))
  .add("with lots of rows and columns", () => (
    <Table
      columns={mockColumns}
      rows={getMockRows(50)}
      hasSelectableRows
      onRowSelectionChange={action("row selection changed")}
    />
  ))
  .add("with preselected rows", () => (
    <Table
      columns={columns}
      rows={rowData}
      hasSelectableRows
      selectedRows={["2019-10-01"]}
      keyField="c1"
      onRowSelectionChange={action("row selection changed")}
    />
  ))
  .add("with custom column widths", () => <Table columns={columnsWithWidths} rows={rowDataWithWidths} />)
  .add("with a footer", () => (
    <>
      <Table columns={columns} rows={rowData} footerRows={footerRowData} />
      <Text mt="x6">Loading state:</Text>
      <Table columns={columns} rows={rowData} footerRows={footerRowData} loading />
    </>
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
  .add("with full width section", () => <Table columns={getMockColumns(3)} rows={rowDataWithSections} />)
  .add("with expandable rows", () => (
    <Table
      columns={getMockColumns(3)}
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
  ));
