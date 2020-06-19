/* eslint-disable react/prop-types */
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";
import { Link } from "../Link";
import { PMTable } from ".";
import { Box, Text } from "..";

const columns = [
  { label: "ID", dataKey: "id" },
  { label: "Expected Ship", dataKey: "date" },
  { label: "Customer", dataKey: "customer" },
  { label: "Ship To", dataKey: "shipTo" },
  { label: "Shipped", dataKey: "shipped" },
  { label: "Expected Quantity", dataKey: "expectedQuantity" },
  { label: "Actual Quantity", dataKey: "actualQuantity" },
  { label: "Notes", dataKey: "notes" }
];

const expandedContent = () => (
  <Box py="x1" px="x2">
    <Text fontWeight="bold" color="blackBlue">
      Expands!
    </Text>
  </Box>
);

const rowData = [
  {
    id: "1234454",
    date: "2019-10-01",
    customer: "National Widgets",
    shipTo: "99 Reactor Blvd., Springfield, SI",
    shipped: "No",
    expectedQuantity: "2,025 eaches",
    actualQuantity: "1,800 eaches",
    notes: "--",
    expandedContent
  },
  {
    id: "1234455",
    date: "2019-10-02",
    customer: "National Widgets",
    shipTo: "7 New St., New York, NY",
    shipped: "Yes",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "2,250 eaches",
    notes: "--",
    expandedContent
  },
  {
    id: "1234461",
    date: "2019-10-03",
    customer: "LTS Corp",
    shipTo: "11 Peter St., Toronto, ON",
    shipped: "No",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "1,425 eaches",
    notes: "--",
    expandedContent
  },
  {
    id: "1234424",
    date: "2019-10-04",
    customer: "Neutron",
    shipTo: "5555 Hwy 6., Toronto, ON",
    shipped: "No",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "675 eaches",
    notes: "--",
    expandedContent
  },
  {
    id: "1234453",
    date: "2019-10-07",
    customer: "Scopewise",
    shipTo: "7 New St., New York, NY",
    shipped: "No",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "1,575 eaches",
    notes: "--",
    expandedContent
  },
  {
    id: "1232221",
    date: "2019-10-22",
    customer: "Scopewise",
    shipTo: "871 Husky St., Toronto, ON",
    shipped: "No",
    expectedQuantity: "1,725 eaches",
    actualQuantity: "--",
    notes: "--",
    expandedContent
  },
  {
    id: "1444453",
    date: "2019-10-23",
    customer: "Fresh Farm",
    shipTo: "7 New St., New York, NY",
    shipped: "Yes",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "--",
    notes: "--",
    expandedContent
  },
  {
    id: "1224478",
    date: "2019-10-24",
    customer: "LTS Corp",
    shipTo: "12345 Rodeo Ave., Los Angeles, CA",
    shipped: "No",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "--",
    notes: "--",
    expandedContent
  }
];

const footerRowData = [
  { date: "", expectedQuantity: "18,000 eaches", actualQuantity: "7,725 eaches", id: "Total" },
  { date: "", expectedQuantity: "", actualQuantity: "41.5%", id: "Attainment" }
];

storiesOf("PM/PMTable", module)
  .addDecorator(withKnobs)
  .add("default", () => {
    const columnsWithLinks = columns.map((column, i) => {
      if (i === 0) {
        return {
          ...column,
          cellRenderer: ({ cellData }) => <Link href="/">{cellData}</Link>
        };
      }
      return column;
    });
    return (
      <>
        <PMTable
          columns={columnsWithLinks}
          rows={rowData}
          footerRows={footerRowData}
          hasSelectableRows
          onRowSelectionChange={action("row selection changed")}
          rowsPerPage={2}
          paginationProps={{
            nextLabel: "Next \u2192",
            previousLabel: "\u2190 Previous"
          }}
        />
        <PMTable columns={columnsWithLinks} rows={rowData} footerRows={footerRowData} />
        <PMTable columns={columnsWithLinks} rows={[]} />
      </>
    );
  })
  .add("with expandable rows", () => {
    const columnsWithLinks = columns.map((column, i) => {
      if (i === 0) {
        return {
          ...column,
          cellRenderer: ({ cellData }) => <Link href="/">{cellData}</Link>
        };
      }
      return column;
    });
    return (
      <PMTable
        columns={columnsWithLinks}
        rows={rowData}
        footerRows={footerRowData}
        hasExpandableRows
        rowsPerPage={3}
        paginationProps={{
          nextLabel: "Next \u2192",
          previousLabel: "\u2190 Previous"
        }}
      />
    );
  });
