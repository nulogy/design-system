import React from "react";
import { storiesOf } from "@storybook/react";
import { Table } from ".";

const columns = [
  {
    label: "Column 1",
    dataKey: "c1"
  },
  {
    label: "Column 2",
    dataKey: "c2"
  },
  {
    label: "Column 3",
    dataKey: "c3"
  }
];

const rowData = [
  {
    c1: "r1c1",
    c2: "r1c2",
    c3: "r1c3"
  },
  {
    c1: "r2c1",
    c2: "r2c2",
    c3: "r2c3"
  }
];

storiesOf("Table", module)
  .add("Table", () => <Table>Example</Table>)
  .add("Table with data", () => <Table columns={columns} rows={rowData} />);
