/* eslint-disable react/prop-types */
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";
import { Link } from "../Link";
import { PMTable } from ".";

const columns = [
  { label: "Date", dataKey: "date" },
  { label: "Expected Quantity", dataKey: "expectedQuantity" },
  { label: "Actual Quantity", dataKey: "actualQuantity" }
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

const footerRowData = [
  { date: "Total", expectedQuantity: "18,000 eaches", actualQuantity: "7,725 eaches", id: "f1" },
  { date: "Attainment", expectedQuantity: "", actualQuantity: "41.5%", id: "f2" }
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
        />
        <PMTable columns={columnsWithLinks} rows={rowData} footerRows={footerRowData} />
        <PMTable columns={columnsWithLinks} rows={[]} />
      </>
    );
  });
