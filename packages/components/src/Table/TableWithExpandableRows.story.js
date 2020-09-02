/* eslint-disable react/prop-types */
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Table } from ".";
import { Box, Text } from "..";

const columns = [
  { label: "Date", dataKey: "date" },
  { label: "Expected Quantity", dataKey: "expectedQuantity" },
  { label: "Actual Quantity", dataKey: "actualQuantity" }
];

const expandedContent = () => (
  <Box bg="lightBlue" py="x1" px="x2">
    <Text fontWeight="bold" color="blackBlue">
      Expands!
    </Text>
  </Box>
);

const rowDataWithExpandable = [
  { date: "2019-10-01", expectedQuantity: "2,025 eaches", actualQuantity: "1,800 eaches", id: "r1" },
  { date: "2019-10-02", expectedQuantity: "2,475 eaches", actualQuantity: "2,250 eaches", id: "r2", expandedContent },
  { date: "2019-10-03", expectedQuantity: "2,475 eaches", actualQuantity: "1,425 eaches", id: "r3" },
  { date: "2019-10-04", expectedQuantity: "2,475 eaches", actualQuantity: "675 eaches", id: "r4", expandedContent },
  { date: "2019-10-07", expectedQuantity: "2,475 eaches", actualQuantity: "1,575 eaches", id: "r5" },
  { date: "2019-10-22", expectedQuantity: "1,725 eaches", actualQuantity: "-", id: "r6", expandedContent },
  { date: "2019-10-23", expectedQuantity: "2,475 eaches", actualQuantity: "-", id: "r7" },
  { date: "2019-10-24", expectedQuantity: "2,475 eaches", actualQuantity: "-", id: "r8" }
];

storiesOf("Components/Table/with expandable rows", module)
  .add("with expandable rows", () => (
    <Table
      columns={columns}
      rows={rowDataWithExpandable}
      hasExpandableRows
      onRowExpansionChange={action("toggled expand")}
    />
  ))
  .add("with rows expanded by default", () => (
    <Table
      columns={columns}
      rows={rowDataWithExpandable}
      hasExpandableRows
      expandedRows={["2019-10-04", "2019-10-22"]}
      keyField="date"
      onRowSelectionChange={action("row selection changed")}
    />
  ));
