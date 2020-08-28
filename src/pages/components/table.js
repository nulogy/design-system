/* eslint-disable no-unused-vars, quotes, react/self-closing-comp, react/prop-types */

import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box,
  IconicButton,
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
  PropsTable,
  InlineCode,
  DocText as Text
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
      "Used to format the table cells in the column. It should return a string or react component."
  },
  {
    name: "cellRenderer",
    type: "function",
    description:
      "Used to override the cell component in the column. No padding or other styles will be added in this case. It should return a react component."
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
  },
  {
    name: "heading",
    type: "string",
    description:
      "Creates a heading out of the row that spans the full-width of the table"
  },
  {
    name: "cellRenderer",
    type: "function",
    description:
      "Used to override the cell component in the row. No padding or other styles will be added in this case. It should return a react component."
  },
  {
    name: "expandAriaLabel",
    type: "string",
    default: "expand",
    description:
      "When hasExpandableRows is true, replaces the aria-label for the expand button"
  },
  {
    name: "collapseAriaLabel",
    type: "string",
    default: "expand",
    description:
      "When hasExpandableRows is true, replaces the aria-label for the collapse button"
  },
  {
    name: "selectAriaLabel",
    type: "string",
    default: "select",
    description:
      "When hasSelectableRows is true, replaces the aria-label for the unchecked checkbox"
  },
  {
    name: "deselectAriaLabel",
    type: "string",
    default: "deselect",
    description:
      "When hasSelectableRows is true, replaces the aria-label for the checked checkbox"
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
    name: "stickyHeader",
    type: "boolean",
    defaultValue: "false",
    description:
      "Sets the table header to sticky. NOTE: the vertical position of the sticky header is aligned to the top of the Table. If there is padding on an element wrapping the Table you will see that the header is offset according to the top padding."
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
    description: "An array of row id's that are marked as selected in the table"
  },
  {
    name: "onRowSelectionChange",
    type: "function",
    defaultValue: "none",
    description:
      "The function that should be called when a row selection changes. The array of rows currently selected is passed in as an argument."
  },
  {
    name: "expandedRows",
    type: "array",
    defaultValue: "empty",
    description: "An array of row id's that are expanded in the table"
  },
  {
    name: "onRowExpansionChange",
    type: "function",
    defaultValue: "none",
    description:
      "The function that should be called when a row is expanded or collapsed. The array of rows currently expanded is passed in as an argument."
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
  },
  {
    name: "rowHovers",
    type: "boolean",
    defaultValue: "true",
    description:
      "Whether or not to show a light grey background on a row when hovering it"
  },
  {
    name: "compact",
    type: "boolean",
    defaultValue: "false",
    description: "Whether or not to display the table in compact mode"
  },
  {
    name: "selectAllLabel",
    type: "string",
    default: "select all",
    description:
      "When hasSelectableRows is true, replaces the aria-label for the unchecked select all checkbox"
  },
  {
    name: "deselectAriaLabel",
    type: "string",
    default: "Deselect all",
    description:
      "When hasSelectableRows is true, replaces the aria-label for the checked select all checkbox"
  }
];

const expandedContent = () => (
  <Box bg="lightBlue" py="x1" px="x2">
    <Text mb={0} fontWeight="bold" color="blackBlue">
      Expands!
    </Text>
  </Box>
);

const dateToString = ({ cellData }) => {
  return new Date(cellData).toDateString();
};
const customCellRenderer = () => (
  <>
    <IconicButton icon="delete">Remove</IconicButton>
  </>
);

const customHeaderFormatter = ({ label }) => (
  <>
    <IconicButton icon="delete">{label}</IconicButton>
  </>
);

const columns = [
  { label: "Date", dataKey: "date" },
  { label: "Expected Quantity", dataKey: "expectedQuantity" },
  { label: "Actual Quantity", dataKey: "actualQuantity" }
];

const columnsWithWidths = [
  { label: "Date", dataKey: "date", width: "40%" },
  { label: "Expected Quantity", dataKey: "expectedQuantity" },
  { label: "Actual Quantity", dataKey: "actualQuantity" }
];

const rows = [
  {
    date: "2019-10-01",
    expectedQuantity: "2,025 eaches",
    actualQuantity: "1,800 eaches",
    id: "r1"
  },
  {
    date: "2019-10-02",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "2,250 eaches",
    id: "r2"
  },
  {
    date: "2019-10-03",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "1,425 eaches",
    id: "r3"
  },
  {
    date: "2019-10-04",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "675 eaches",
    id: "r4"
  },
  {
    date: "2019-10-07",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "1,575 eaches",
    id: "r5"
  },
  {
    date: "2019-10-22",
    expectedQuantity: "1,725 eaches",
    actualQuantity: "-",
    id: "r6"
  },
  {
    date: "2019-10-23",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "-",
    id: "r7"
  },
  {
    date: "2019-10-24",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "-",
    id: "r8"
  }
];

const rowDataWithExpandedContent = [
  {
    date: "2019-10-01",
    expectedQuantity: "2,025 eaches",
    actualQuantity: "1,800 eaches",
    id: "r1"
  },
  {
    date: "2019-10-02",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "2,250 eaches",
    id: "r2",
    expandedContent
  },
  {
    date: "2019-10-03",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "1,425 eaches",
    id: "r3"
  },
  {
    date: "2019-10-04",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "675 eaches",
    id: "r4"
  },
  {
    date: "2019-10-07",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "1,575 eaches",
    id: "r5"
  },
  {
    date: "2019-10-22",
    expectedQuantity: "1,725 eaches",
    actualQuantity: "-",
    id: "r6"
  },
  {
    date: "2019-10-23",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "-",
    id: "r7"
  },
  {
    date: "2019-10-24",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "-",
    id: "r8"
  }
];

const getMockColumns = n =>
  Array.from({ length: n }, (_, i) => i + 1).map(item => ({
    label: `Column ${item}`,
    dataKey: `c${item}`
  }));

const columnsWithCustomCells = [
  { label: "Date", dataKey: "date", cellFormatter: dateToString },
  { label: "Expected Quantity", dataKey: "expectedQuantity" },
  { label: "Actual Quantity", dataKey: "actualQuantity" },
  {
    label: "Remove all",
    dataKey: "actions",
    headerFormatter: customHeaderFormatter,
    cellRenderer: customCellRenderer
  }
];

const footerRowData = [
  {
    date: "Total",
    expectedQuantity: "18,000 eaches",
    actualQuantity: "7,725 eaches",
    id: "r1"
  },
  {
    date: "Attainment",
    expectedQuantity: "",
    actualQuantity: "41.5%",
    id: "r2"
  }
];

export default () => (
  <Layout propsTable={<PropsTable propsRows={propsRows} />}>
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
    </Intro>

    <DocSection>
      <Table columns={columns} rows={rows} keyField="date" />
      <Highlight className="js">
        {`import {Table} from "@nulogy/components";

const columns = [
  { label: "Date", dataKey: "date" },
  { label: "Expected Quantity", dataKey: "expectedQuantity" },
  { label: "Actual Quantity", dataKey: "actualQuantity" }
];

const rows = [
  {
    date: "2019-10-01",
    expectedQuantity: "2,025 eaches",
    actualQuantity: "1,800 eaches",
    id: "r1"
  },
  {
    date: "2019-10-02",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "2,250 eaches",
    id: "r2"
  },
  {
    date: "2019-10-03",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "1,425 eaches",
    id: "r3"
  },
  ...
  {
    date: "2019-10-24",
    expectedQuantity: "2,475 eaches",
    actualQuantity: "-",
    id: "r8"
  }
];

<Table columns={columns} rows={rows} keyField="date"/>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Customizing cell display</SectionTitle>
      <Text>
        A custom component can be implemented using a{" "}
        <InlineCode>CellFormatter</InlineCode> (to maintain the existing cell
        styles) or <InlineCode>CellRenderer</InlineCode> (for completely custom
        styles).
      </Text>
      <Text>
        Similarly headers can be customized using the{" "}
        <InlineCode>HeaderFormatter</InlineCode> function props. See{" "}
        <Link href="https://storybook.nulogy.design/?path=/story/table--with-a-cell-formatter">
          Storybook
        </Link>{" "}
        for other examples of implementing different custom components.
      </Text>
      <Table columns={columnsWithCustomCells} rows={rows} keyField="date" />
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
  { label: "Date", dataKey: "date", cellFormatter: dateToString },
  { label: "Expected Quantity", dataKey: "expectedQuantity",},
  { label: "Actual Quantity", dataKey: "actualQuantity",},
  {
    label: "Remove all",
    dataKey: "actions",
    headerFormatter: customHeaderFormatter,
    cellRenderer: customCellRenderer
  }
];

<Table columns={columnsWithCustomCells} rows={rows} />
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Selectable rows</SectionTitle>
      <Text>
        Setting <InlineCode>hasSelectableRows</InlineCode> on the Table will add
        a column of checkboxes to the table so that rows can be selected by the
        user. Using the checkbox in the head of the table will toggle the
        selection of all rows.
      </Text>
      <Text>
        A <InlineCode>keyField</InlineCode> should be specified to provide
        unique <InlineCode>id</InlineCode>s for rows (by default the keyField
        will be "id" and expect a property of id in the row objects).
      </Text>
      <Table
        hasSelectableRows
        columns={columns}
        rows={rows}
        keyField="date"
        onRowSelectionChange={selectedRows => selectedRows}
      />
      <Highlight className="js">
        {`<Table
  columns={columns}
  rows={rows}
  keyField="date"
  HasSelectableRows
  onRowSelectionChange={selectedRows => selectedRows}
/>
`}
      </Highlight>
    </DocSection>
    <DocSection>
      <SectionTitle>Column widths</SectionTitle>
      <Text>
        A width for a column can be set (as actual size or percentage) inside
        the column data.
      </Text>
      <Table columns={columnsWithWidths} rows={rows} />
      <Highlight className="js">
        {`const columnsWithWidths = [
  { label: "Date", dataKey: "date", width: "40%" },
  { label: "Expected Quantity", dataKey: "expectedQuantity" },
  { label: "Actual Quantity", dataKey: "actualQuantity" }
];

<Table columns={columnsWithWidths} rows={rows} />`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Loading state</SectionTitle>
      <Text>
        The table can be set to loading while row data is being fetched. It will
        show rows when the <InlineCode>loading</InlineCode> prop is set to
        false.
      </Text>
      <Table loading columns={columns} rows={rows} />
      <Highlight className="js">
        {`<Table loading columns={columns} rows={rows} />`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Compact Styling</SectionTitle>
      <Text>
        The table can be set to use compact styling which decreases the paddings
        when the <InlineCode>compact</InlineCode> prop is set to true.
      </Text>
      <Table columns={columns} rows={rows} compact />
      <Highlight className="js">
        {`<Table columns={columns} rows={rows} compact />`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Sticky Header</SectionTitle>
      <Text>
        The table header can remain fixed to the top of the table when scrolling
        by setting the prop stickyHeader to true.
      </Text>
      <Table columns={columns} rows={rows} stickyHeader />
      <Highlight className="js">
        {`<Table columns={columns} rows={rows} stickyHeader />`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Footer</SectionTitle>
      <Text>
        A footer can be added to the table by adding an array of rows to the{" "}
        <InlineCode>footerRows</InlineCode> prop.
      </Text>
      <Table columns={columns} rows={rows} footerRows={footerRowData} />
      <Highlight className="js">
        {`import {Table} from "@nulogy/table";

const footerRows = [
  { date: "Total", expectedQuantity: "18,000 eaches", actualQuantity: "7,725 eaches" },
  { date: "Attainment", expectedQuantity: "", actualQuantity: "	41.5%" }
];

<Table columns={columns} rows={rows} footerRows={footerRows} />
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Pagination</SectionTitle>
      <Text>
        Setting <InlineCode>rowsPerPage</InlineCode> on the Table will add a{" "}
        <Link href="https://nulogy.design/components/pagination">
          Pagination
        </Link>{" "}
        component to the table. A maximum of the specified{" "}
        <InlineCode>rowsPerPage</InlineCode> will be shown on each page.
      </Text>
      <Text>
        Providing a function to <InlineCode>onPageChange</InlineCode> will allow
        tracking of the current page number. It is fired whenever the page
        changes and takes in the current page number as an argument.
      </Text>
      <Table
        columns={columns}
        rows={rows}
        rowsPerPage={3}
        keyField="date"
        onPageChange={pageNum => pageNum}
      />
      <Highlight className="js">
        {`<Table
  columns={columns}
  rows={rows}
  rowsPerPage={3}
  onPageChange={pageNum => pageNum}
/>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Headings</SectionTitle>
      <Text>
        Headings that span the full width of a row can be added within the
        table's rows. To add a heading add a row with a key of{" "}
        <InlineCode>heading</InlineCode> The appearance of the heading can be
        customized by adding a <InlineCode>cellRenderer</InlineCode> to the row.
        See an example in{" "}
        <Link href="https://storybook.nulogy.design/?path=/story/table--with-full-width-section">
          Storybook
        </Link>
        .
      </Text>
    </DocSection>

    <DocSection>
      <SectionTitle>Expandable rows</SectionTitle>
      <Text>
        Setting <InlineCode>hasExpandableRows</InlineCode> and providing{" "}
        <InlineCode>expandedContent</InlineCode> on a row will add a button that
        can be used to expand and collapse content.
        <InlineCode>expandedContent</InlineCode> should return a React node that
        should be rendered when the row is expanded.
      </Text>
      <Text>
        A <InlineCode>keyField</InlineCode> should be specified to provide
        unique ids for rows (by default the keyField will be "id" and expect a
        property of id in the row objects).
      </Text>
      <Table
        columns={columns}
        rows={rowDataWithExpandedContent}
        hasExpandableRows
        onRowExpansionChange={() => {}}
      />

      <Highlight className="js">
        {`<Table
  columns={columns}
  rows={rowDataWithExpandedContent}
  hasExpandableRows
  onRowExpansionChange={() => {}}
/>
`}
      </Highlight>
    </DocSection>
    <DocSection />

    <DocSection>
      <SectionTitle>Server-side or custom pagination</SectionTitle>
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
      <SectionTitle>Sorting</SectionTitle>
      <Text>
        Sorting can be implemented using the headerFormatter to pass a{" "}
        <Link href="https://storybook.nulogy.design/?path=/story/table-headers--sorting-header">
          SortingHeader
        </Link>{" "}
        component or another custom header to the column that should be
        sortable. See an example of the complete implementation with table in
        <Link href="https://storybook.nulogy.design/?path=/story/table--with-sorting">
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
