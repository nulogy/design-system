/* eslint-disable no-unused-vars, quotes, react/self-closing-comp */

import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  SectionTitle,
  Title,
  Link,
  List,
  ListItem,
  Table
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
    type: "object",
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

const columns = [
  { label: "Column 1", dataKey: "c1" },
  { label: "Column 2", dataKey: "c2" },
  { label: "Column 3", dataKey: "c3" }
];

const rowData = [
  { c1: "r1c1", c2: "r1c2", c3: "r1c3" },
  { c1: "r2c1", c2: "r2c2", c3: "r2c3" }
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
      <Table columns={columns} rows={rowData} />
      <Highlight className="js">
        {`import {Table} from "@nulogy/table";

const columns = [
  { label: "Column 1", dataKey: "c1" },
  { label: "Column 2", dataKey: "c2" },
  { label: "Column 3", dataKey: "c3" },
];

const rows = [
  { c1: "r1c1", c2: "r1c2", c3: "r1c3" },
  { c1: "r2c1", c2: "r2c2", c3: "r2c3" }
];

<Table columns={columns} rows={rows} />
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
