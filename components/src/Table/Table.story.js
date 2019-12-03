/* eslint-disable react/prop-types */
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean, number } from "@storybook/addon-knobs";
import { Table } from ".";
import { Box, DropdownButton, DropdownMenu, Text } from "..";

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
  { date: "Total", expectedQuantity: "18,000 eaches", actualQuantity: "7,725 eaches", id: "f1" },
  { date: "Attainment", expectedQuantity: "", actualQuantity: "41.5%", id: "f2" }
];

storiesOf("Table", module)
  .addDecorator(withKnobs)
  .add("with pagination", () => (
    <Table
      columns={columns}
      rows={rowData}
      rowsPerPage={number("Rows per page", 1)}
      onPageChange={action("page changed")}
    />
  ))
  .add("with everything", () => (
    <Table
      columns={columnsWithEverything}
      rows={rowDataWithEverything}
      footerRows={footerRowData}
      rowsPerPage={number("Rows per page", 5)}
      hasExpandableRows={boolean("Expandable", true)}
      onRowExpansionChange={action("toggled expand")}
      hasSelectableRows={boolean("Selectable", true)}
      onRowSelectionChange={action("row selection changed")}
      onPageChange={action("page changed")}
    />
  ));
