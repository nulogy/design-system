import React from "react";
import { Input, Box, TruncatedText, Text, Flex, Toggle, IconicButton, Select } from "../../..";
import type { Columns } from "../../../Table/Table.types";

export const defaultRows = [
  {
    fromUnit: "cases",
    toUnit: "1",
    factor: "cs",
    rounding: "=",
    precision: "10",
    direction: "ea",
    status: "=",
    lastUpdated: "--",
    actions: "ea",
    conversion: "",
  },
  {
    fromUnit: "pallets",
    toUnit: "1",
    factor: "pl",
    rounding: "=",
    precision: "10",
    direction: "cs",
    status: "=",
    lastUpdated: "100",
    actions: "ea",
    conversion: "",
  },
];

export const defaultColumns: Columns<{}> = [
  { dataKey: "fromUnit", label: "eaches" },
  { dataKey: "toUnit", label: "", align: "right" },
  { dataKey: "factor", label: "ea" },
  { dataKey: "rounding", label: "", align: "center" },
  { dataKey: "precision", label: "", align: "right" },
  { dataKey: "direction", label: "" },
  { dataKey: "status", label: "", align: "center" },
  { dataKey: "lastUpdated", label: "", align: "right" },
  { dataKey: "actions", label: "" },
  { dataKey: "conversion", width: "50%", label: "" },
];

export const editModeRows = [
  {
    state: "active",
    fromUnit: "cases",
    toUnit: "1",
    factor: "cs",
    rounding: "=",
    precision: "1",
    direction: "ea",
    status: "=",
    lastUpdated: "10",
    actions: "ea",
    inactive: false,
  },
  {
    state: "inactive",
    fromUnit: "pallets",
    toUnit: "1",
    factor: "pl",
    rounding: "=",
    precision: "2",
    direction: "cs",
    status: "=",
    lastUpdated: "100",
    actions: "ea",
    inactive: true,
  },
  {
    state: "add",
    fromUnit: "eaches",
    toUnit: "1",
    factor: "ea",
    rounding: "=",
    precision: "3",
    direction: "cs",
    status: "=",
    lastUpdated: "1",
    actions: "ea",
    inactive: false,
  },
  {
    state: "error",
    fromUnit: "eaches eache eaches eaches",
    toUnit: "1000000000",
    factor: "mmm",
    rounding: "=",
    precision: "1000000000",
    direction: "csssss",
    status: "=",
    lastUpdated: "1000000000",
    actions: "mmm",
    inactive: false,
  },
];

export const editModeColumns: Columns<{}> = [
  {
    dataKey: "fromUnit",
    label: "eaches",
    cellRenderer: ({ row }) =>
      row.state == "add" ? (
        <Box
          py="x1"
          px="x2"
          width="100%"
          minWidth="8em"
          maxWidth={{ extraSmall: "10em", small: "12.5em", medium: "100%" }}
        >
          <Input inputWidth="100%" value={row.fromUnit} />
        </Box>
      ) : row.state == "inactive" ? (
        <TruncatedText
          width="100%"
          maxWidth={{ extraSmall: "10em", small: "12.5em", medium: "100%" }}
          fullWidth
          color="grey"
          p="x2"
        >
          {row.fromUnit}
        </TruncatedText>
      ) : (
        <TruncatedText width="100%" maxWidth={{ extraSmall: "10em", small: "12.5em", medium: "100%" }} fullWidth p="x2">
          {row.fromUnit}
        </TruncatedText>
      ),
  },
  {
    dataKey: "toUnit",
    label: "",
    cellRenderer: ({ row }) =>
      row.state == "inactive" ? (
        <TruncatedText
          maxWidth={{ extraSmall: "2.75em", small: "5.75em", medium: "100%" }}
          fullWidth
          textAlign="right"
          color="grey"
          pr="x2"
          py="x2"
        >
          {row.toUnit}
        </TruncatedText>
      ) : (
        <TruncatedText
          maxWidth={{ extraSmall: "2.75em", small: "5.75em", medium: "100%" }}
          fullWidth
          textAlign="right"
          pr="x2"
          py="x2"
        >
          {row.toUnit}
        </TruncatedText>
      ),
  },
  {
    dataKey: "factor",

    label: "ea",
    cellRenderer: ({ row }) =>
      row.state == "inactive" ? (
        <TruncatedText
          maxWidth={{ extraSmall: "2.75em", small: "5.75em", medium: "100%" }}
          fullWidth
          color="grey"
          pr="x2"
          py="x2"
        >
          {row.factor}
        </TruncatedText>
      ) : (
        <TruncatedText maxWidth={{ extraSmall: "2.75em", small: "5.75em", medium: "100%" }} fullWidth pr="x2" py="x2">
          {row.factor}
        </TruncatedText>
      ),
  },
  {
    dataKey: "rounding",

    label: "",
    cellRenderer: ({ row }) =>
      row.state == "inactive" ? (
        <Text color="grey" textAlign="center" pr="x2" py="x2">
          {row.rounding}
        </Text>
      ) : (
        <Text textAlign="center" pr="x2" py="x2">
          {row.rounding}
        </Text>
      ),
  },
  {
    dataKey: "precision",
    label: "",
    cellRenderer: ({ row }) =>
      row.state != "error" ? (
        <Flex width="auto" gap="x1" flexWrap={{ extraSmall: "wrap", medium: "nowrap" }} pr="x2" py="x1">
          <Box width={{ extraSmall: "100%", medium: "62%" }} minWidth="5em">
            <Input value={row.precision} inputWidth="100%" disabled={row.inactive} />
          </Box>
          <Box width={{ extraSmall: "100%", medium: "38%" }} minWidth="5em">
            <Select
              width="100%"
              options={[
                { value: "ea", label: "ea" },
                { value: "cs", label: "cs" },
                { value: "pl", label: "pl" },
              ]}
              value="ea"
              disabled={row.inactive}
            />
          </Box>
        </Flex>
      ) : (
        <Flex width="auto" gap="x1" flexWrap={{ extraSmall: "wrap", medium: "nowrap" }} pr="x2" py="x1">
          <Box width={{ extraSmall: "100%", medium: "62%" }} minWidth="5em">
            <Input
              value={row.precision}
              inputWidth="100%"
              disabled={row.inactive}
              errorMessage="This field is required."
            />
          </Box>
          <Box width={{ extraSmall: "100%", medium: "38%" }} minWidth="5em">
            <Select
              width="100%"
              options={[
                { value: "ea", label: "ea" },
                { value: "cs", label: "cs" },
                { value: "pl", label: "pl" },
              ]}
              value="ea"
              disabled={row.inactive}
            />
          </Box>
        </Flex>
      ),
  },
  {
    dataKey: "status",

    label: "",
    cellRenderer: ({ row }) =>
      row.state == "inactive" ? (
        <Text color="grey" textAlign="center" pr="x2" py="x2">
          {row.status}
        </Text>
      ) : (
        <Text textAlign="center" pr="x2" py="x2">
          {" "}
          {row.status}
        </Text>
      ),
  },
  {
    dataKey: "lastUpdated",

    label: "",
    cellRenderer: ({ row }) =>
      row.state == "inactive" ? (
        <TruncatedText
          maxWidth={{ extraSmall: "2.75em", small: "5.75em", medium: "100%" }}
          fullWidth
          color="grey"
          textAlign="right"
          pr="x2"
          py="x2"
        >
          {row.lastUpdated}
        </TruncatedText>
      ) : (
        <TruncatedText
          maxWidth={{ extraSmall: "2.75em", small: "5.75em", medium: "100%" }}
          fullWidth
          textAlign="right"
          pr="x2"
          py="x2"
        >
          {row.lastUpdated}
        </TruncatedText>
      ),
  },
  {
    dataKey: "actions",

    label: "",
    cellRenderer: ({ row }) =>
      row.state == "inactive" ? (
        <TruncatedText
          maxWidth={{ extraSmall: "2.75em", small: "5.75em", medium: "100%" }}
          fullWidth
          color="grey"
          pr="x2"
          py="x2"
        >
          {row.actions}
        </TruncatedText>
      ) : (
        <TruncatedText maxWidth={{ extraSmall: "2.75em", small: "5.75em", medium: "100%" }} fullWidth pr="x2" py="x2">
          {row.actions}
        </TruncatedText>
      ),
  },
  {
    dataKey: "active",
    width: "48px",
    label: "Active",
    cellRenderer: ({ row }) => <Toggle pr="x2" py="x1" toggled={row.inactive === false} />,
  },
  {
    dataKey: "delete",
    width: "40px",
    label: "",
    cellRenderer: ({ row }) =>
      row.state == "add" ? <IconicButton className="customCell" icon="delete" pr="x2" py="x1_5" /> : null,
  },
];
