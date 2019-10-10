import React from "react";
import { storiesOf } from "@storybook/react";
import { NDSProvider, Table } from "..";

const columns = [
  { label: "Column 1", dataKey: "c1" },
  { label: "Column 2", dataKey: "c2" },
  { label: "Column 3", dataKey: "c3" },
  { label: "Column 4", dataKey: "c4" },
  { label: "Column 5", dataKey: "c5" },
  { label: "Column 6", dataKey: "c6" }
];

const rowData = [
  { c1: "row 1 cell 1", c2: "r1c2", c3: "2019-09-21", id: "r1" },
  { c1: "r2c1", c2: "r2c2", c3: "2019-09-22", id: "r2" }
];

storiesOf("StoriesForTests/Table", module).add("with preselected rows", () => (
  <Table columns={columns} rows={rowData} hasSelectableRows selectedRows={["r2c1"]} keyField="c1" />
));
