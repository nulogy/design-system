/* eslint-disable no-unused-vars, quotes, react/self-closing-comp */

import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box,
  Alert,
  IconicButton,
  SectionTitle,
  Title,
  Link,
  List,
  ListItem,
  Table,
  Text
} from "@nulogy/components";
import {
  Layout,
  Intro,
  IntroText,
  DocSection,
  PropsTable
} from "../../components";

const propsRows = [
  {
    name: "columns",
    type: "array",
    defaultValue: "Required",
    description:
      "An array of column objects consisting of a label and dataKey and optionally, align and cellRenderer"
  },
  {
    name: "rows",
    type: "array",
    defaultValue: "Required",
    description:
      "An array of row objects, where the key name matches the dataKey of the column"
  },
  {
    name: "noRowsContent",
    type: "string",
    defaultValue: "No records have been created for this table.",
    description: "What to display when the table has no data"
  },
  {
    name: "keyField",
    type: "string",
    defaultValue: "id",
    description:
      "The name of the key to use as a unique identifier for individual rows"
  },
  {
    name: "hasSelectableRows",
    type: "boolean",
    defaultValue: "false",
    description:
      "Displays a column of checkboxes allowing the user to select rows in the table"
  },
  {
    name: "selectedRows",
    type: "array",
    defaultValue: "empty",
    description:
      "An array of row id's that should be marked as selected in the table"
  },
  {
    name: "onRowSelectionChange",
    type: "function",
    defaultValue: "none",
    description:
      "The function that should be called when a row selection changes. The array of rows currently selected is passed in as an argument."
  }
];

const dateToString = cellData => {
  return new Date(cellData).toDateString();
};

// eslint-disable-next-line react/prop-types
const customCellRenderer = cellData => (
  <>
    <IconicButton icon="delete">{cellData}</IconicButton>
  </>
);

const columns = [
  { label: "Column 1", dataKey: "c1" },
  { label: "Column 2", dataKey: "c2" },
  { label: "Column 3", dataKey: "c3" }
];

const columnsWithFormatter = [
  { label: "Column 1", dataKey: "c1" },
  { label: "Column 2", dataKey: "c2" },
  { label: "Column 3", dataKey: "c3", cellFormatter: dateToString }
];

const columnsWithWidths = [
  { label: "Column 1", dataKey: "c1", width: "30%" },
  { label: "Column 2", dataKey: "c2", width: "60%" },
  { label: "Column 3", dataKey: "c3", width: "10%" }
];

const rows = [
  { c1: "row 1 cell 1", c2: "r1c2", c3: "2019-09-21" },
  { c1: "r2c1", c2: "r2c2", c3: "2019-09-22" }
];

const columnsWithCellRenderer = [
  { label: "Column 1", dataKey: "c1" },
  { label: "Column 2", dataKey: "c2" },
  { label: "Column 3", dataKey: "c3", cellRenderer: customCellRenderer }
];

export default () => (
  <Layout>
    <Helmet>
      <title>Table</title>
    </Helmet>
    <Intro>
      <Title>Table</Title>
      <Box mb="x3">
        <IntroText>
          Tables are used for displaying columns and rows of data.
        </IntroText>
      </Box>
      <Alert>
        This component is in active development and may not be available in the
        latest NDS release. For more information, see #design-system on slack.
      </Alert>
    </Intro>

    <DocSection>
      <Table columns={columns} rows={rows} />
      <Highlight className="js">
        {`import {Table} from "@nulogy/table";

const columns = [
  { label: "Column 1", dataKey: "c1" },
  { label: "Column 2", dataKey: "c2" },
  { label: "Column 3", dataKey: "c3" },
];

const rows = [{ c1: "row 1 cell 1", c2: "r1c2", c3: "2019-09-21" }, { c1: "r2c1", c2: "r2c2", c3: "2019-09-22" }];

<Table columns={columns} rows={rows} />
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>With a cell formatter</SectionTitle>
      <Text>
        Providing a cellFormatter function inside the column data will allow
        formatting of the cell contents.
      </Text>
      <Table columns={columnsWithFormatter} rows={rows} />
      <Highlight className="js">
        {`const dateToString = (cellData) => {
  return new Date(cellData).toDateString();
};

const columnsWithFormatter = [
  { label: "Column 1", dataKey: "c1" },
  { label: "Column 2", dataKey: "c2" },
  { label: "Column 3", dataKey: "c3", cellFormatter: dateToString }
];

const rows = [{ c1: "row 1 cell 1", c2: "r1c2", c3: "2019-09-21" }, { c1: "r2c1", c2: "r2c2", c3: "2019-09-22" }];

<Table columns={columnsWithFormatter} rows={rows} />`}
      </Highlight>
    </DocSection>
    <DocSection>
      <SectionTitle>With a custom component</SectionTitle>
      <Text>
        Providing a cellRenderer function inside the column data will allow
        display of arbitrary cell content. See{" "}
        <Link href="https://storybook.nulogy.design/?path=/story/table--table-with-data">
          Storybook
        </Link>{" "}
        for other examples of implementing different custom components using
        cellRenderer.
      </Text>
      <Table columns={columnsWithCellRenderer} rows={rows} />
      <Highlight className="js">
        {`const customCellRenderer = (cellData) => (
    <IconicButton icon="delete">{cellData}</IconicButton>
);

const columnsWithCellRenderer = [
  { label: "Column 1", dataKey: "c1" },
  { label: "Column 2", dataKey: "c2" },
  { label: "Column 3", dataKey: "c3", cellRenderer: customCellRenderer }
];

const rows = [
  { c1: "row 1 cell 1", c2: "r1c2", c3: "2019-09-21" },
  { c1: "r2c1", c2: "r2c2", c3: "2019-09-22" }
];

<Table columns={columnsWithCellRenderer} rows={rows} />
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>With selectable rows</SectionTitle>
      <Text>
        Setting hasSelectableRows on the Table will add a column of checkboxes
        to the table so that rows can be selected by the user. Using the
        checkbox in the head of the table will toggle the selection of all rows.
      </Text>
      <Text>
        A keyField should be specified to provide unique ids for rows (by
        default the keyField will be "id" and expect a property of id in the row
        objects).
      </Text>
      <Table
        hasSelectableRows
        columns={columns}
        rows={rows}
        keyField="c1"
        onRowSelectionChange={selectedRows => selectedRows}
      />
      <Highlight className="js">
        {`import {Table} from "@nulogy/table";

const columns = [
  { label: "Column 1", dataKey: "c1" },
  { label: "Column 2", dataKey: "c2" },
  { label: "Column 3", dataKey: "c3" },
];

const rows = [{ c1: "row 1 cell 1", c2: "r1c2", c3: "2019-09-21" }, { c1: "r2c1", c2: "r2c2", c3: "2019-09-22" }];

<Table hasSelectableRows columns={columns} rows={rows} keyField="c1" onRowSelectionChange={selectedRows => selectedRows}/>
`}
      </Highlight>
    </DocSection>
    <DocSection>
      <SectionTitle>With custom column widths</SectionTitle>
      <Text>
        A width for a column can be set (as px or %) inside the column data.
      </Text>
      <Table columns={columnsWithWidths} rows={rows} />
      <Highlight className="js">
        {`const columnsWithWidths = [
  { label: "Column 1", dataKey: "c1", width: "30%" },
  { label: "Column 2", dataKey: "c2", width: "60%" },
  { label: "Column 3", dataKey: "c3", width: "10%" }
];

const rows = [{ c1: "row 1 cell 1", c2: "r1c2", c3: "2019-09-21" }, { c1: "r2c1", c2: "r2c2", c3: "2019-09-22" }];

<Table columns={columnsWithWidths} rows={rows} />`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={propsRows} />
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <List>
        <ListItem>
          <Link href="https://storybook.nulogy.design/?path=/story/table--table-with-data">
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
