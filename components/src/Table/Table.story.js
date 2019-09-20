import React from "react";
import { storiesOf } from "@storybook/react";
import { Table } from ".";
import { Box } from "..";

const columns = [
  { label: "Column 1", dataKey: "c1" },
  { label: "Column 2", dataKey: "c2" },
  { label: "Column 3", dataKey: "c3" },
  { label: "Column 4", dataKey: "c4" },
  { label: "Column 5", dataKey: "c5" },
  { label: "Column 6", dataKey: "c6" }
];

const columnsWithAlignment = [
  { label: "Column 1", dataKey: "c1" },
  { label: "Column 2", dataKey: "c2" },
  { label: "Column 3", dataKey: "c3", align: "right" }
];

const rowData = [{ c1: "row 1 cell 1", c2: "r1c2", c3: "r1c3" }, { c1: "r2c1", c2: "r2c2", c3: "r2c3" }];

const generateLotsOfRows = () => {
  const rows = [];
  for (let i = 0; i < 10000; i += 1) {
    rows.push({ c1: `r${i}c1`, c2: `r${i}c2`, c3: `r${i}c3`, c4: `r${i}c4`, c5: `r${i}c5`, c6: `r${i}c6` });
  }

  return rows;
};

storiesOf("Table", module)
  .add("Table with data", () => <Table columns={columns} rows={rowData} />)
  .add("Cell alignment", () => <Table columns={columnsWithAlignment} rows={rowData} />)
  .add("with a lot of data", () => <Table columns={columns} rows={generateLotsOfRows()} />)
  .add("with no data", () => <Table columns={columns} rows={[]} />)
  .add("truncated", () => (
    <Box width={400}>
      <Table columns={columns} rows={rowData} />
    </Box>
  ));
