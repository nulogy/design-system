import React from "react";
import { boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Box, DropdownButton, DropdownMenu, Button, Text, Flex } from "../..";
import { getMockRows, mockColumns } from "../Table.mock-utils";
import { Columns } from "../Table.types";
import { Table } from "..";

const dateToString = ({ cellData }) => {
  return new Date(cellData).toUTCString().split(" ").splice(0, 4).join(" ");
};

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

const columns: Columns<{}> = [
  { label: "Date", dataKey: "date" },
  { label: "Expected Quantity", dataKey: "expectedQuantity" },
  { label: "Actual Quantity", dataKey: "actualQuantity", align: "right" },
];

const columnsWithWidths = [
  { label: "Date", dataKey: "date" },
  { label: "Expected Quantity", dataKey: "expectedQuantity" },
  { label: "Actual Quantity", dataKey: "actualQuantity" },
  { label: "Note", dataKey: "note", width: "50%" },
];

const rowData = [
  {
    date: "2019-10-01",
    expectedQuantity: "2,025 eaches",
    actualQuantity: "1,800 eaches",
    id: "r1",
  },
  {
    date: "2019-10-02",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "2,250 eaches",
    id: "r2",
  },
  {
    date: "2019-10-03",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "1,425 eaches",
    id: "r3",
  },
  {
    date: "2019-10-04",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "675 eaches",
    id: "r4",
  },
  {
    date: "2019-10-07",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "1,575 eaches",
    id: "r5",
  },
  {
    date: "2019-10-22",
    expectedQuantity: "1,725 eaches",
    actualQuantity: "-",
    id: "r7",
  },
  {
    date: "2019-10-23",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "-",
    id: "r8",
  },
  {
    date: "2019-10-24",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "-",
    id: "r9",
  },
];

const compactRowData = [
  {
    date: "2019-10-01",
    expectedQuantity: "2,025 eaches",
    actualQuantity: "1,800 eaches",
    id: "r1",
  },
  {
    date: "2019-10-02",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "2,250 eaches",
    id: "r2",
  },
  {
    date: "2019-10-03",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "1,425 eaches",
    id: "r3",
  },
  {
    date: "2019-10-04",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "675 eaches",
    id: "r4",
  },
  {
    date: "2019-10-07",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "1,575 eaches",
    id: "r5",
  },
];

const rowDataWithWidths = [
  {
    date: "2019-10-01",
    expectedQuantity: "2,025 eaches",
    actualQuantity: "1,800 eaches",
    id: "r1",
  },
  {
    date: "2019-10-02",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "2,250 eaches",
    id: "r2",
  },
  {
    date: "2019-10-03",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "1,425 eaches",
    id: "r3",
  },
  {
    date: "2019-10-04",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "675 eaches",
    note: "1c Other Plant-related issue, equipment issues",
    id: "r4",
  },
  {
    date: "2019-10-07",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "1,575 eaches",
    id: "r5",
  },
  {
    date: "2019-10-22",
    expectedQuantity: "1,725 eaches",
    actualQuantity: "-",
    id: "r6",
  },
  {
    date: "2019-10-23",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "-",
    id: "r7",
  },
  {
    date: "2019-10-24",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "-",
    id: "r8",
  },
];

const columnsWithFormatter = [
  { label: "Date", dataKey: "date", cellFormatter: dateToString },
  { label: "Expected Quantity", dataKey: "expectedQuantity" },
  { label: "Actual Quantity", dataKey: "actualQuantity" },
];

const columnsWithAlignment: Columns<{}> = [
  { label: "Date", dataKey: "date" },
  { label: "Expected Eaches", dataKey: "expectedQuantity" },
  { label: "Actual Eaches", dataKey: "actualQuantity", align: "right" },
];

const getColumnsWithCellRenderer = (cellRenderer) => [
  { label: "Date", dataKey: "date" },
  { label: "Expected Quantity", dataKey: "expectedQuantity" },
  { label: "", dataKey: "actualQuantity", cellRenderer },
];

const footerRowData = [
  {
    date: "Total",
    expectedQuantity: "18,000 eaches",
    actualQuantity: "7,725 eaches",
    id: "f1",
  },
  {
    date: "Attainment",
    expectedQuantity: "",
    actualQuantity: "41.5%",
    id: "f2",
  },
];

const rowDataWithSections = [
  {
    date: "2019-10-01",
    expectedQuantity: "2,025 eaches",
    actualQuantity: "1,800 eaches",
    id: "r1",
  },
  {
    date: "2019-10-02",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "2,250 eaches",
    id: "r2",
  },
  {
    date: "2019-10-03",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "1,425 eaches",
    id: "r3",
  },
  {
    date: "2019-10-04",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "675 eaches",
    id: "r4",
  },
  { heading: "ABC & XYZ Company", cellRenderer: sectionRow, id: "r5" },
  {
    date: "2019-10-22",
    expectedQuantity: "1,725 eaches",
    actualQuantity: "-",
    id: "r6",
  },
  {
    date: "2019-10-23",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "-",
    id: "r7",
  },
  {
    date: "2019-10-24",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "-",
    id: "r8",
  },
];

export default {
  title: "Components/Table/Base",
};

export const WithData = () => (
  <Table
    columns={columns}
    rows={rowData}
    rowHovers={boolean("Show row hovers", true)}
    compact={boolean("Show with compact styling", false)}
    loading={boolean("Show loading state", false)}
    className="Table"
  />
);

export const WithNoData = () => (
  <Table
    columns={columns}
    rows={[]}
    noRowsContent={text("Custom text", undefined)}
    loading={boolean("Show loading state", false)}
  />
);

export const WithStickyHeader = () => (
  <Box mt="x4">
    <Table
      columns={columns}
      rows={rowData}
      rowHovers={boolean("Show row hovers", true)}
      compact={boolean("Show with compact styling", false)}
      loading={boolean("Show loading state", false)}
      className="Table"
      stickyHeader
    />
  </Box>
);

export const WithLotsOfRowsAndColumns = () => (
  <Table
    columns={mockColumns}
    rows={getMockRows(50)}
    hasSelectableRows
    onRowSelectionChange={action("row selection changed")}
    loading={boolean("Show loading state", false)}
  />
);

export const WithCustomColumnWidths = () => <Table columns={columnsWithWidths} rows={rowDataWithWidths} />;

export const WithACustomCellComponent = () => (
  <Table columns={getColumnsWithCellRenderer(dropdownCellRenderer)} rows={rowData} />
);

export const WithCellAlignment = () => <Table columns={columnsWithAlignment} rows={rowData} />;

export const WithACellFormatter = () => <Table columns={columnsWithFormatter} rows={rowData} />;

export const WithACustomColumnLabelComponent = () => (
  <Table
    columns={[
      { label: "Date", dataKey: "date" },
      { label: "Expected Quantity", dataKey: "expectedQuantity" },
      { label: "Actual Quantity", dataKey: "actualQuantity" },
      {
        label: "Add record",
        dataKey: "c4",
        headerFormatter: ({ label }) => <Button onClick={action("button clicked")}>{label}</Button>,
      },
    ]}
    rows={rowData}
  />
);

export const WithMetadata = () => (
  <Table
    columns={[
      { label: "Date", dataKey: "date" },
      { label: "Expected Quantity", dataKey: "expectedQuantity" },
      { label: "Actual Quantity", dataKey: "actualQuantity" },
      {
        label: "Add record",
        dataKey: "c4",
        metadata: { helpText: "Allows adding a new record" },
        headerFormatter: ({ label, metadata }) => (
          <Flex flexDirection="column">
            <Text>{label}</Text>
            <Text fontSize="small" fontWeight="base" color="midGrey">
              {metadata.helpText}
            </Text>
          </Flex>
        ),
      },
    ]}
    rows={rowData}
  />
);

export const WithFullWidthSection = () => <Table columns={columns} rows={rowDataWithSections} />;

export const WithAFooter = () => (
  <>
    <Table
      columns={columns}
      keyField="date"
      rows={rowData}
      footerRows={footerRowData}
      loading={boolean("Show loading state", false)}
    />
    <Table
      compact
      columns={columns}
      keyField="date"
      rows={compactRowData}
      footerRows={footerRowData}
      loading={boolean("Show loading state", false)}
    />
  </>
);

export const WithRowBorder = () => (
  <Table
    rowBorder={boolean("Show row border", true)}
    columns={columns}
    rows={rowData}
    rowHovers={boolean("Show row hovers", true)}
    compact={boolean("Show with compact styling", false)}
    loading={boolean("Show loading state", false)}
    className="Table"
  />
);

export const WithVerticalAlignment = () => (
  <Table
    rowBorder={boolean("Show row border", true)}
    columns={[
      { label: "Description", dataKey: "description", width: "50%" },
      { label: "Expected Quantity", dataKey: "expectedQuantity" },
      { label: "Actual Quantity", dataKey: "actualQuantity" },
    ]}
    rows={[
      {
        description:
          "This whole row is top aligned. lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing",
        expectedQuantity: "2,025 eaches",
        verticalAlign: "top",
        actualQuantity: "1,800 eaches",
        id: "r1",
      },
      {
        description:
          "This whole row is middle aligned. lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing",
        expectedQuantity: "2,475 eaches",
        verticalAlign: "middle",
        actualQuantity: "2,250 eaches",
        id: "r2",
      },
      {
        description:
          "This whole row is bottom aligned. lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing elit lorem ipsum dolor sit amet consectetur adipiscing",
        expectedQuantity: "2,475 eaches",
        verticalAlign: "bottom",
        actualQuantity: "1,425 eaches",
        id: "r3",
      },
    ]}
    rowHovers={boolean("Show row hovers", true)}
    compact={boolean("Show with compact styling", false)}
    loading={boolean("Show loading state", false)}
  />
);
