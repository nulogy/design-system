/* eslint-disable react/prop-types */
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Table } from ".";
import { Box, DropdownButton, DropdownMenu, Text } from "..";
import { getMockRows, mockColumns, getMockColumns } from "./Table.mock-utils";
import { Button } from "../Button";

const dateToString = ({ cellData }) => {
  return new Date(cellData).toDateString();
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
  { label: "Date", dataKey: "c1" },
  { label: "Expected Quantity", dataKey: "c2" },
  { label: "", dataKey: "c3", cellRenderer: dropdownCellRenderer }
];

const getColumnsWithHeaderFormatter = headerFormatter => [
  { label: "Date", dataKey: "c1" },
  { label: "Expected Quantity", dataKey: "c2" },
  { label: "Actual Quantity", dataKey: "c3" },
  { label: "Add record", dataKey: "c4", headerFormatter }
];

const columnsWithAlignment = [
  { label: "Date", dataKey: "c1" },
  { label: "Expected Eaches", dataKey: "c2" },
  { label: "Actual Eaches", dataKey: "c4" },
  { label: "", dataKey: "c3", align: "right" }
];

const columnsWithWidths = [
  { label: "Date", dataKey: "c1" },
  { label: "Expected Quantity", dataKey: "c2" },
  { label: "Actual Quantity", dataKey: "c3" },
  { label: "Note", dataKey: "c4", width: "50%" }
];

const columnsWithFormatter = [
  { label: "Date", dataKey: "c1", cellFormatter: dateToString },
  { label: "Expected Quantity", dataKey: "c2" },
  { label: "Actual Quantity", dataKey: "c3" }
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
  { c1: "2019-10-01", c2: "2,025 eaches", c3: "1,800 eaches", id: "r1" },
  { c1: "2019-10-02", c2: "2,475 eaches", c3: "2,250 eaches", id: "r2" },
  { c1: "2019-10-03", c2: "2,475 eaches", c3: "1,425 eaches", id: "r3" },
  { c1: "2019-10-04", c2: "2,475 eaches", c3: "675 eaches", id: "r4" },
  { heading: "ABC & XYZ Company", cellRenderer: sectionRow, id: "r5" },
  { c1: "2019-10-22", c2: "1,725 eaches", c3: "-", id: "r6" },
  { c1: "2019-10-23", c2: "2,475 eaches", c3: "-", id: "r7" },
  { c1: "2019-10-24", c2: "2,475 eaches", c3: "-", id: "r8" }
];

const rowDataWithExpandable = [
  { c1: "2019-10-01", c2: "2,025 eaches", c3: "1,800 eaches", id: "r1" },
  { c1: "2019-10-02", c2: "2,475 eaches", c3: "2,250 eaches", id: "r2" },
  { c1: "2019-10-03", c2: "2,475 eaches", c3: "1,425 eaches", id: "r3" },
  { c1: "2019-10-04", c2: "2,475 eaches", c3: "675 eaches", id: "r4", expandedContent },
  { c1: "2019-10-07", c2: "2,475 eaches", c3: "1,575 eaches", id: "r5" },
  { c1: "2019-10-22", c2: "1,725 eaches", c3: "-", id: "r6" },
  { c1: "2019-10-23", c2: "2,475 eaches", c3: "-", id: "r7" },
  { c1: "2019-10-24", c2: "2,475 eaches", c3: "-", id: "r8" }
];

const footerRowData = [
  { c1: "Total", c2: "18,000 eaches", c3: "7,725 eaches", id: "r1" },
  { c1: "Attainment", c2: "", c3: "41.5%", id: "r2" }
];

storiesOf("Table", module)
  .add("Table with data", () => <Table columns={columns} rows={rowData} />)
  .add("without row hovers", () => <Table columns={columns} rows={rowData} rowHovers={false} />)
  .add("with no data", () => <Table columns={columns} rows={[]} />)
  .add("with no data and custom content", () => (
    <Table columns={columns} rows={[]} noRowsContent="No jobs are available" />
  ))

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
      keyField="c1"
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
      <Table columns={columns} rows={rowData} footerRows={footerRowData} />
      <Text mt="x6">Loading state:</Text>
      <Table columns={columns} rows={rowData} footerRows={footerRowData} loading />
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
  .add("loading", () => <Table columns={columns} rows={rowData} loading />);
