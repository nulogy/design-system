import React from "react";
import { action } from "@storybook/addon-actions";
import { Columns } from "./Table.types";
import { Table } from ".";
import { Text, Link, Flex, Box, TruncatedText, Input, Select, Toggle, IconicButton, Checkbox } from "..";

export default {
  title: "Components/Table/Custom content",
};

export const Inputs = () => (
  <>
    <Text fontSize="smaller" color="midGrey">
      This story demonstrates how to use CellRenderer with various input elements. For more details on selectable rows,
      check out the{" "}
      <Link href="/story/components-table-with-selectable-rows--with-selectable-rows">Selectable rows</Link> story. For
      Action column with IconicButtons and Toggle without label, it is recommended to specify width of the column.
    </Text>
    <Table
      columns={[
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
          cellRenderer: ({ row }) => (
            <Toggle onChange={action("on change")} onText="Active" offText="Inactive" pr="x2" py="x1" />
          ),
        },
        {
          dataKey: "colToggle",
          label: "Toggle",
          width: "48px",
          cellRenderer: ({ row }) => <Toggle onChange={action("on change")} pr="x2" py="x1" />,
        },
        {
          dataKey: "colActions",
          label: "",
          width: "40px",
          cellRenderer: ({ row }) => <IconicButton icon="delete" pr="x2" py="x1" />,
        },
      ]}
      rows={[
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
          colCheckbox: "I acknowlodge",
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
      ]}
    />
  </>
);

Inputs.story = {
  name: "Inputs and actions",
};

export const TextVariants = () => (
  <>
    <Text fontSize="smaller" color="midGrey">
      This story demonstrates some of the most useful text variants and column width configurations. For truncating text
      inside cell make sure to match the width of the cell with maxWidth of truncated text.
    </Text>
    <Table
      columns={[
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
          label: "Multi line",
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
      ]}
      rows={[
        {
          colA: "This is ...",
          colB: "This is a column...",
          colC: "In this case...",
          colD: "This is a row",
          colE: "This is column that will truncate the text if it is too long to fit in the column.",
          colF: "860,934.24",
        },
        {
          colA: "the default width.",
          colB: "that has width specified in an absolute value (200px).",
          colC: "the column width is set in relative value (20%).",
          colD: "This is a row",
          colE: "What is needed here is that the width on cell and maxWIdth on text ...",
          colF: "12.90",
        },
        {
          colA: "that will responds to the width of the table.",
          colB: "The column will maintain the width...",
          colC: "The column..",
          colD: "This is a row",
          colE: "is set",
          colF: "10 000.00",
        },
        {
          colA: "It wraps...",
          colB: "unless the table is squeezed untill all the other columns in the table...",
          colC: "will maintain the relative width ..",
          colD: "This is a row",
          colE: "!",
          colF: "936.221,00",
        },
        {
          colA: "and not truncate",
          colB: "are not able to grow any further",
          colC: "with the witdh ...",
          colD: "This is a row",
          colE: "Make sure that you use absolute values as relative may not ...",
          colF: "18",
        },
        {
          colA: "!",
          colB: "!",
          colC: "of the table.",
          colD: "This is a row",
          colE: "behave as expected",
          colF: "--",
        },
      ]}
    />
  </>
);

TextVariants.story = {
  name: "Text variants",
};

export const States = () => (
  <>
    <Text fontSize="smaller" color="midGrey">
      This story demonstrates how to style cells for particualr row states.
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
          colCheckbox: "I acknowlodge",
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

States.story = {
  name: "Row states",
};
