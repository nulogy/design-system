import React from "react";
import { action } from "@storybook/addon-actions";
import { Input } from "../../Input";
import { Columns } from "../Table.types";
import { Table } from "..";
import { Box } from "../../Box";
import { Text } from "../../Type";
import { Flex } from "../../Flex";
import { Link } from "../../Link";
import { Select } from "../../Select";
import { Checkbox } from "../../Checkbox";
import { Toggle } from "../../Toggle";
import { IconicButton } from "../../Button";
import { TruncatedText } from "../../TruncatedText";

export default {
  title: "Components/Table/Custom Content",
};

const columns: Columns<{ helpText: string }> = [
  {
    dataKey: "label",
    label: "Label",
  },
  {
    dataKey: "colInput",
    label: "Input",
    cellRenderer: ({ row }) => (
      <Box py="x1" pr="x2" minWidth="8em" width="100%">
        <Input placeholder={row.colInput} />
      </Box>
    ),
  },
  {
    dataKey: "colSelect",
    label: "Select",
    width: "100px",
    cellRenderer: ({ row }) => (
      <Box py="x1" pr="x2" minWidth="8em" width="100%" maxWidth="16em">
        <Select
          options={[
            { value: "kg", label: "kg" },
            { value: "lb", label: "lb" },
            { value: "oz", label: "oz" },
          ]}
          value={row.colSelect}
        />
      </Box>
    ),
  },
  {
    dataKey: "colCheckbox",
    label: "Checkbox",
    cellRenderer: ({ row }) => (
      <Box py="x1" pr="x2" minWidth="8em">
        <Checkbox id="checkbox" labelText={row.colCheckbox} />
      </Box>
    ),
  },
  {
    dataKey: "colToggleWithLabel",
    label: "Toggle with label",
    cellRenderer: () => <Toggle onChange={action("on change")} onText="Active" offText="Inactive" pr="x2" py="x1" />,
  },
  {
    dataKey: "colToggle",
    label: "Toggle",
    width: "48px",
    cellRenderer: () => <Toggle onChange={action("on change")} pr="x2" py="x1" />,
  },
  {
    dataKey: "colActions",
    label: "",
    width: "40px",
    cellRenderer: () => <IconicButton icon="delete" pr="x2" py="x1" />,
  },
];

const rows = [
  {
    label: "Example Row 1",
    colInput: "456",
    colSelect: "kg",
    colCheckbox: "I agree",
    colToggleWithLabel: true,
  },
  {
    label: "Example Row 2",
    colInput: "789",
    colSelect: "kg",
    colCheckbox: "I acknowledge",
    colToggleWithLabel: true,
  },
  {
    label: "Example Row 3",
    colInput: "101",
    colSelect: "oz",
    colCheckbox: "Ok",
    colToggleWithLabel: false,
  },
  {
    label: "Example Row 4",
    colInput: "112",
    colSelect: "kg",
    colCheckbox: "I read",
    colToggleWithLabel: true,
  },
];

export const Inputs = () => {
  return (
    <>
      <Text fontSize="smaller" color="midGrey">
        This story demonstrates how to use CellRenderer with various input elements. For more details on selectable
        rows, check out the{" "}
        <Link href="/?path=/story/components-table-with-selectable-rows--with-selectable-rows">Selectable rows</Link>{" "}
        story. For the Action column with IconicButtons and Toggles without labels, it is recommended to specify the
        column width.
      </Text>
      <Table rowHovers={false} columns={columns} rows={rows} />
    </>
  );
};

const textColumns: Columns<{ helpText: string }> = [
  {
    dataKey: "colA",
    label: "Auto width",
  },
  {
    dataKey: "colB",
    label: "Absolute width",
    width: "200px",
  },
  {
    dataKey: "colC",
    label: "Relative width",
    width: "20%",
  },
  {
    dataKey: "colD",
    label: "Multi-line",
    metadata: { helpText: "2 rows" },
    headerFormatter: ({ label, metadata }) => (
      <Flex flexDirection="column">
        <Text>{label}</Text>
        <Text fontSize="small" fontWeight="base" color="midGrey">
          {metadata.helpText}
        </Text>
      </Flex>
    ),
    cellRenderer: ({ row }) => (
      <Flex flexDirection="column" py="x2" pr="x2" gap="x0_25">
        <Text>{row.colD}</Text>
        <Text fontSize="small" color="midGrey">
          {row.colD}
        </Text>
      </Flex>
    ),
  },
  {
    dataKey: "colE",
    label: "Truncated text",
    width: "200px",
    cellRenderer: ({ row }) => (
      <TruncatedText fullWidth pr="x2" py="x2" maxWidth="200px">
        {row.colE}
      </TruncatedText>
    ),
  },
  {
    dataKey: "colF",
    label: "Numerical",
    align: "right",
  },
];

const textRows = [
  {
    colA: "This is ...",
    colB: "This is a column...",
    colC: "In this case...",
    colD: "This is a row",
    colE: "This is a column that will truncate the text if it is too long to fit in the column.",
    colF: "860,934.24",
  },
  {
    colA: "the default width.",
    colB: "that has width specified as an absolute value (200px).",
    colC: "the column width is set as a relative value (20%).",
    colD: "This is a row",
    colE: "What is needed here is that the width on the cell and maxWidth on text ...",
    colF: "12.90",
  },
  {
    colA: "that will respond to the width of the table.",
    colB: "The column will maintain the width...",
    colC: "The column...",
    colD: "This is a row",
    colE: "is set",
    colF: "10 000.00",
  },
  {
    colA: "It wraps...",
    colB: "unless the table is squeezed until all the other columns in the table...",
    colC: "will maintain the relative width...",
    colD: "This is a row",
    colE: "!",
    colF: "936.221,00",
  },
  {
    colA: "and does not truncate",
    colB: "are not able to grow any further",
    colC: "with the width...",
    colD: "This is a row",
    colE: "Make sure that you use absolute values, as relative may not...",
    colF: "18",
  },
  {
    colA: "!",
    colB: "!",
    colC: "of the table.",
    colD: "This is a row",
    colE: "behaves as expected",
    colF: "--",
  },
];

export const TextVariants = () => (
  <>
    <Text fontSize="smaller" color="midGrey">
      This story demonstrates some of the most useful text variants and column width configurations. To truncate text
      inside a cell, make sure to match the cell&apos;s width with the maxWidth of the truncated text.
    </Text>
    <Table columns={textColumns} rows={textRows} />
  </>
);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const States = () => (
  <>
    <Text fontSize="smaller" color="midGrey">
      This story demonstrates how to style cells for particular row states.
    </Text>
    <Table
      columns={[
        {
          dataKey: "label",
          label: "Label",
          cellRenderer: ({ row }) =>
            row.state === "disabled" ? (
              <Box p="x2" color="midGrey">
                {row.label}
              </Box>
            ) : row.state === "error" ? (
              <Box p="x2" color="red">
                {row.label}
              </Box>
            ) : (
              <Box p="x2">{row.label}</Box>
            ),
        },

        {
          dataKey: "colInput",
          label: "Input",
          cellRenderer: ({ row }) =>
            row.state === "disabled" ? (
              <Box py="x1" pr="x2" minWidth="8em" width="100%">
                <Input disabled placeholder={row.colInput} />
              </Box>
            ) : row.state === "error" ? (
              <Box py="x1" pr="x2" minWidth="8em" width="100%">
                <Input errorMessage="Invalid value, try again." placeholder={row.colInput} />
              </Box>
            ) : (
              <Box py="x1" pr="x2" minWidth="8em" width="100%">
                <Input placeholder={row.colInput} />
              </Box>
            ),
        },

        {
          dataKey: "colSelect",
          label: "Select",
          width: "100px",
          cellRenderer: ({ row }) =>
            row.state === "disabled" ? (
              <Box py="x1" pr="x2" minWidth="8em" width="100%" maxWidth="16em">
                <Select
                  disabled
                  options={[
                    { value: "kg", label: "kg" },
                    { value: "lb", label: "lb" },
                    { value: "oz", label: "oz" },
                  ]}
                  value={row.colSelect}
                />
              </Box>
            ) : row.state === "error" ? (
              <Box py="x1" pr="x2" minWidth="8em" width="100%" maxWidth="16em">
                <Select
                  errorMessage="Invalid value"
                  options={[
                    { value: "kg", label: "kg" },
                    { value: "lb", label: "lb" },
                    { value: "oz", label: "oz" },
                  ]}
                  value={row.colSelect}
                />
              </Box>
            ) : (
              <Box py="x1" pr="x2" minWidth="8em" width="100%" maxWidth="16em">
                <Select
                  options={[
                    { value: "kg", label: "kg" },
                    { value: "lb", label: "lb" },
                    { value: "oz", label: "oz" },
                  ]}
                  value={row.colSelect}
                />
              </Box>
            ),
        },
        {
          dataKey: "colCheckbox",
          label: "Checkbox",
          cellRenderer: ({ row }) =>
            row.state === "disabled" ? (
              <Box py="x1" pr="x2" minWidth="8em">
                <Checkbox disabled id="checkbox" labelText={row.colCheckbox} />
              </Box>
            ) : row.state === "error" ? (
              <Box py="x1" pr="x2" minWidth="8em">
                <Checkbox error id="checkbox" labelText={row.colCheckbox} />
              </Box>
            ) : (
              <Box py="x1" pr="x2" minWidth="8em">
                <Checkbox id="checkbox" labelText={row.colCheckbox} />
              </Box>
            ),
        },
        {
          dataKey: "colToggleWithLabel",
          label: "Toggle with label",
          cellRenderer: ({ row }) =>
            row.state === "disabled" ? (
              <Toggle disabled onChange={action("on change")} onText="Active" offText="Inactive" pr="x2" py="x1" />
            ) : (
              <Toggle onChange={action("on change")} onText="Active" offText="Inactive" pr="x2" py="x1" />
            ),
        },
        {
          dataKey: "colToggle",
          label: "Toggle",
          width: "48px",
          cellRenderer: ({ row }) =>
            row.state === "disabled" ? (
              <Toggle disabled onChange={action("on change")} pr="x2" py="x1" />
            ) : (
              <Toggle onChange={action("on change")} pr="x2" py="x1" />
            ),
        },
        {
          dataKey: "colActions",
          label: "",
          width: "40px",
          cellRenderer: ({ row }) =>
            row.state === "disabled" ? (
              <IconicButton disabled icon="delete" pr="x2" py="x1" />
            ) : (
              <IconicButton icon="delete" pr="x2" py="x1" />
            ),
        },
      ]}
      rows={[
        {
          label: "Active (default) state",
          colInput: "456",
          colSelect: "kg",
          colCheckbox: "I agree",
          colToggleWithLabel: true,
        },
        {
          label: "Inactive (disabled) state",
          state: "disabled",
          colInput: "789",
          colSelect: "kg",
          colCheckbox: "I acknowledge",
          colToggleWithLabel: true,
        },
        {
          label: "Error state",
          state: "error",
          colInput: "101",
          colSelect: "oz",
          colCheckbox: "Ok",
          colToggleWithLabel: false,
        },
      ]}
    />
  </>
);
