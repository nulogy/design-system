/* eslint-disable react/prop-types */
import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, boolean, text } from "@storybook/addon-knobs";
import { Table } from ".";

const columns = [
  { label: "Date", dataKey: "date" },
  { label: "Expected Quantity", dataKey: "expectedQuantity" },
  { label: "Actual Quantity", dataKey: "actualQuantity" }
];

const columnsWithWidths = [
  { label: "Date", dataKey: "date" },
  { label: "Expected Quantity", dataKey: "expectedQuantity" },
  { label: "Actual Quantity", dataKey: "actualQuantity" },
  { label: "Note", dataKey: "note", width: "50%" }
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

storiesOf("Table", module)
  .addDecorator(withKnobs)
  .add(" with data", () => (
    <Table
      columns={columns}
      rows={rowData}
      rowHovers={boolean("Show row hovers", true)}
      compact={boolean("Show with compact styling", false)}
    />
  ))
  .add("with no data", () => <Table columns={columns} rows={[]} noRowsContent={text("Custom text", undefined)} />);
// .add("with custom column widths", () => <Table columns={columnsWithWidths} rows={rowDataWithWidths} />);
// .add("with custom no data message", () => <Table columns={columns} rows={[]}/>)
// .add("with compact styling", () => <Table columns={columns} rows={rowData} compact />)
