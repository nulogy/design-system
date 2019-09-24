/* eslint-disable no-unused-vars, quotes, react/self-closing-comp */

import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box,
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
    name: "column",
    type: "array",
    defaultValue: "Required",
    description: "An array of column objects consisting of a label and dataKey"
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
  }
];

const dateToString = ({ rowData, dataKey }) => {
  const cellContent = rowData[dataKey];
  return new Date(cellContent).toDateString();
};

// eslint-disable-next-line react/prop-types
const customCellRenderer = ({ cellData }) => (
  <Box bg="blue" color="white" p="x1" display="inline-block" title={cellData}>
    <span role="img" aria-label="star">
      ⭐
    </span>
    {cellData}
    <span role="img" aria-label="star">
      ⭐
    </span>
  </Box>
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
      <IntroText>
        Tables are used for displaying columns and rows of data.
      </IntroText>
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
        {`const dateToString = ({ rows, dataKey }) => {
  const cellContent = rows[dataKey];
  return new Date(cellContent).toDateString();
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
        display of arbitrary cell content.
      </Text>
      <Table columns={columnsWithCellRenderer} rows={rows} />
      <Highlight className="js">
        {`const customCellRenderer = ({ cellData }) => (
  <Box bg="blue" color="white" p="x1" display="inline-block" title={cellData}>
    <span role="img" aria-label="star">
      ⭐
    </span>
    {cellData}
    <span role="img" aria-label="star">
      ⭐
    </span>
  </Box>
);

const columnsWithCellRenderer = [
  { label: "Column 1", dataKey: "c1" },
  { label: "Column 2", dataKey: "c2" },
  { label: "Column 3", dataKey: "c3", cellRenderer: customCellRenderer }
];

const rows = [
  { c1: "r1c1", c2: "r1c2", c3: "r1c3" },
  { c1: "r2c1", c2: "r2c2", c3: "r2c3" }
];

<Table columns={columnsWithCellRenderer} rows={rows} />
`}
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
