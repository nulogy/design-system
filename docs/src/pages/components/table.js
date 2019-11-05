/* eslint-disable no-unused-vars, quotes, react/self-closing-comp, react/prop-types */

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

const columnKeys = [
  {
    name: "label",
    type: "string",
    defaultValue: "Required",
    description: "The label used in the header of the table column"
  },
  {
    name: "dataKey",
    type: "string",
    defaultValue: "Required",
    description:
      "Unique key for the column, used as the keys to define cell content for the column of each row"
  },
  {
    name: "align",
    type: "string enum ('left', 'right' or 'center')",
    defaultValue: "left",
    description:
      "sets the alignment of the text for the column in the default cell"
  },
  {
    name: "cellFormatter",
    type: "function",
    description:
      "Used to format the table cell. It should return a string or react component."
  },
  {
    name: "cellRenderer",
    type: "function",
    description:
      "Used to override the cell component. No padding or other styles will be added in this case. It should return a react component. "
  },
  {
    name: "headerFormatter",
    type: "function",
    description:
      "Used to format the column's header. It should return a string or react component."
  }
];

const rowKeys = [
  {
    name: "id",
    type: "string",
    description:
      "Unique id for each row, required if another keyField is not passed to the Table"
  }
];

const customCellArgumentKeys = [
  {
    name: "cellData",
    type: "string",
    description: "Text in the current cell, as passed in in the rows object"
  },
  {
    name: "column",
    type: "column",
    description: "The column object the cell belongs to"
  },
  {
    name: "row",
    type: "row",
    description: "The row object the cell belongs to"
  }
];

const headerFormatterArgumentKeys = [
  {
    name: "column",
    type: "column",
    description: "The current column object"
  }
];

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
    name: "loading",
    type: "boolean",
    defaultValue: "false",
    description:
      "A boolean that will show the table body in a loading state when set to true"
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
  },
  {
    name: "rowsPerPage",
    type: "number",
    defaultValue: "none",
    description: "The number of rows to display per page"
  },
  {
    name: "onPageChange",
    type: "function",
    defaultValue: "none",
    description:
      "The function that should be called when a current page changes. The page number that is currently selected is passed in as an argument."
  }
];

const dateToString = ({ cellData }) => {
  return new Date(cellData).toDateString();
};
const customCellRenderer = ({ cellData }) => (
  <>
    <IconicButton icon="delete">{cellData}</IconicButton>
  </>
);

const customHeaderFormatter = ({ label }) => (
  <>
    <IconicButton icon="delete">{label}</IconicButton>
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

const manyRowsForPagination = [
  { c1: "row 1 cell 1", c2: "r1c2", c3: "2019-09-21" },
  { c1: "r2c1", c2: "r2c2", c3: "2019-09-22" },
  { c1: "r3c1", c2: "r3c2", c3: "2019-09-23" },
  { c1: "r4c1", c2: "r4c2", c3: "2019-09-23" },
  { c1: "r5c1", c2: "r5c2", c3: "2019-09-23" },
  { c1: "r6c1", c2: "r6c2", c3: "2019-09-22" },
  { c1: "r7c1", c2: "r7c2", c3: "2019-09-21" },
  { c1: "r8c1", c2: "r8c2", c3: "2019-09-10" },
  { c1: "r9c1", c2: "r9c2", c3: "2019-09-22" }
];
const columnsWithCustomCells = [
  { label: "Column 1", dataKey: "c1" },
  { label: "Date", dataKey: "c3", cellFormatter: dateToString },
  {
    label: "Actions",
    dataKey: "c2",
    headerFormatter: customHeaderFormatter,
    cellRenderer: customCellRenderer
  }
];

const footerRowData = [
  { c1: "Total", c2: "r1c2", c3: "2019-09-21" },
  { c1: "Attainment", c2: "r2c2", c3: "2019-09-22" }
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
        {`import {Table} from "@nulogy/components";

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
      <SectionTitle>With a custom component</SectionTitle>
      <Text>
        A custom component can be implemented using a Formatter or Renderer
        function.
      </Text>
      <Text>
        The props that exist for custom components in cells are CellFormatter
        and CellRenderer. Use CellFormatter to maintain the paddings and styles
        on the cell. For completely custom styles, use the cellRenderer.
      </Text>
      <Text>
        Similarly headers can be customized using the HeaderFormatter function
        props. See{" "}
        <Link href="https://storybook.nulogy.design/?path=/story/table--with-a-cell-formatter">
          Storybook
        </Link>{" "}
        for other examples of implementing different custom components.
      </Text>
      <Table columns={columnsWithCustomCells} rows={rows} />
      <Highlight className="js">
        {`const customCellRenderer = ({cellData}) => (
    <IconicButton icon="delete">{cellData}</IconicButton>
);
const dateToString = ({cellData}) => {
  return new Date(cellData).toDateString();
};

const customHeaderFormatter = ({ label }) => (
  <>
    <IconicButton icon="delete">{label}</IconicButton>
  </>
);

const columnsWithCustomCells = [
  { label: "Column 1", dataKey: "c1" },
  { label: "Date", dataKey: "c3", cellFormatter: dateToString },
  {
    label: "Actions",
    dataKey: "c2",
    headerFormatter: customHeaderFormatter,
    cellRenderer: customCellRenderer
  }
];

const rows = [
  { c1: "row 1 cell 1", c2: "r1c2", c3: "2019-09-21" },
  { c1: "r2c1", c2: "r2c2", c3: "2019-09-22" }
];

<Table columns={columnsWithCustomCells} rows={rows} />
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
      <SectionTitle>With loading state</SectionTitle>
      <Text>
        The table can be set to loading while row data is being fetched. It will
        show rows when the loading prop is set to false.
      </Text>
      <Table loading columns={columns} rows={rows} keyField="c1" />
      <Highlight className="js">
        {`<Table loading hasSelectableRows columns={columns} rows={rows} keyField="c1"/>`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>With footer</SectionTitle>
      <Text>
        A footer can be added to the table by adding an array of rows to the
        footerRows prop.
      </Text>
      <Table columns={columns} rows={rows} footerRows={footerRowData} />
      <Highlight className="js">
        {`import {Table} from "@nulogy/table";

const columns = [
  { label: "Column 1", dataKey: "c1" },
  { label: "Column 2", dataKey: "c2" },
  { label: "Column 3", dataKey: "c3" },
];

const rows = [{ c1: "row 1 cell 1", c2: "r1c2", c3: "2019-09-21" }, { c1: "r2c1", c2: "r2c2", c3: "2019-09-22" }];

const footerRowData = [
  { c1: "Total", c2: "r1c2", c3: "2019-09-21" },
  { c1: "Attainment", c2: "r2c2", c3: "2019-09-22" }
];
<Table columns={columns} rows={rows} footerRows={footerRowData}/>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>With pagination</SectionTitle>
      <Text>
        Setting rowsPerPage on the Table will add a{" "}
        <Link href="https://nulogy.design/components/pagination">
          Pagination
        </Link>{" "}
        component to the table. A maximum of the specified rowsPerPage will be
        shown on each page.
      </Text>
      <Text>
        Providing a function to onPageChange will allow tracking of the current
        page number. It is fired whenever the page changes and takes in the
        current page number as an argument.
      </Text>
      <Table
        columns={columns}
        rows={manyRowsForPagination}
        rowsPerPage={3}
        keyField="c1"
        onPageChange={pageNum => pageNum}
      />
      <Highlight className="js">
        {`import {Table} from "@nulogy/table";

const columns = [
  { label: "Column 1", dataKey: "c1" },
  { label: "Column 2", dataKey: "c2" },
  { label: "Column 3", dataKey: "c3" },
];

const manyRowsForPagination = [
  { c1: "row 1 cell 1", c2: "r1c2", c3: "2019-09-21" },
  { c1: "r2c1", c2: "r2c2", c3: "2019-09-22" },
  { c1: "r3c1", c2: "r3c2", c3: "2019-09-23" },
  { c1: "r4c1", c2: "r4c2", c3: "2019-09-23" },
  { c1: "r5c1", c2: "r5c2", c3: "2019-09-23" },
  { c1: "r6c1", c2: "r6c2", c3: "2019-09-22" },
  { c1: "r7c1", c2: "r7c2", c3: "2019-09-21" },
  { c1: "r8c1", c2: "r8c2", c3: "2019-09-10" },
  { c1: "r9c1", c2: "r9c2", c3: "2019-09-22" }
];

<Table
        columns={columns}
        rows={manyRowsForPagination}
        rowsPerPage={3}
        keyField="c1"
        onPageChange={pageNum => pageNum}
      />
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>With server-side or custom pagination</SectionTitle>
      <Text>
        The{" "}
        <Link href="https://nulogy.design/components/pagination">
          Pagination
        </Link>{" "}
        and Table components can also be used together to support server-side
        pagination or other custom behaviour. An example of such an
        implementation can be found in{" "}
        <Link href="https://storybook.nulogy.design/?path=/story/table--with-server-side-pagination-skipstoryshot">
          Storybook
        </Link>
        .
      </Text>
    </DocSection>

    <DocSection>
      <SectionTitle>Filtering</SectionTitle>
      <Text>
        Filtering can be implemented by passing filtered rows to the rows prop
        of the table. See an example of filtering in
        <Link href="https://storybook.nulogy.design/?path=/story/table--with-filtering-skipstoryshot">
          Storybook
        </Link>
        .
      </Text>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={propsRows} />
    </DocSection>

    <DocSection>
      <SectionTitle>Column Type</SectionTitle>
      <PropsTable propsRows={columnKeys} />
    </DocSection>

    <DocSection>
      <SectionTitle>Row Type</SectionTitle>
      <Text>
        Rows should have keys corresponding to the dataKeys provided in the
        columns. In addition, there are a few extra keys used by the table that
        can be provided to each row
      </Text>
      <PropsTable propsRows={rowKeys} />
    </DocSection>

    <DocSection>
      <SectionTitle>CellRenderer / CellFormatter Argument Type</SectionTitle>
      <Text>
        Use CellFormatter to maintain the styles within the cell while providing
        a custom component or string. Use CellRenderer when using completely
        custom styles.
      </Text>
      <PropsTable propsRows={customCellArgumentKeys} />
    </DocSection>

    <DocSection>
      <SectionTitle>HeaderFormatter Argument Type</SectionTitle>
      <Text>
        Use HeaderFormatter to provide a custom header component. Styles on the
        header cell will be maintained.
      </Text>
      <PropsTable propsRows={headerFormatterArgumentKeys} />
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
