import React from "react";
import styled from "styled-components";
import {
  Box,
  Flex,
  Heading2,
  Heading3,
  Text,
  Icon,
  QuietButton,
  PrimaryButton,
  Table,
  DescriptionList,
  DescriptionGroup,
  DescriptionTerm,
  DescriptionDetails,
  Tooltip,
  Select,
  Input,
  Toggle,
  IconicButton,
  TruncatedText,
  FieldLabel,
} from "../index";

export default {
  title: "Projects/Shop Floor/UoM 1:1 NDS conversion",
  parameters: {
    layout: "fullscreen",
  },
};

const RatioTable = styled(Table)`
  > tbody > tr {
    border-bottom: 1px solid;
    border-color: ${({ theme }) => theme.colors.lightGrey};

    vertical-align: top;
  }
`;

export const Default = () => (
  <Box p="x3">
    <Flex justifyContent="space-between" alignItems="center" mb="x4">
      <Heading2 compact>Units of measure</Heading2>
      <QuietButton>Edit</QuietButton>
    </Flex>

    <Heading3 mb="x1">Conversion ratio</Heading3>
    <Box mb="x6">
      <RatioTable
        columns={[
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
        ]}
        rows={[
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
        ]}
        rowHovers={true}
        loading={false}
      />
    </Box>

    <Heading3 mb="x1">Context of use</Heading3>
    <DescriptionList columns={2}>
      <DescriptionGroup>
        <DescriptionTerm>
          <Flex alignItems="center">Default</Flex>
        </DescriptionTerm>
        <DescriptionDetails>eaches</DescriptionDetails>
      </DescriptionGroup>

      <DescriptionGroup>
        <DescriptionTerm>
          <Flex alignItems="center">
            Base
            <Tooltip tooltip="Base unit ..." placement="top">
              <Icon icon="info" size="x3" pl="half" />
            </Tooltip>
          </Flex>
        </DescriptionTerm>
        <DescriptionDetails>eaches</DescriptionDetails>
      </DescriptionGroup>

      <DescriptionGroup>
        <DescriptionTerm>
          <Flex alignItems="center">Case</Flex>
        </DescriptionTerm>
        <DescriptionDetails>cases</DescriptionDetails>
      </DescriptionGroup>

      <DescriptionGroup>
        <DescriptionTerm>
          <Flex alignItems="center">
            Receiving
            <Tooltip tooltip="Receiving unit ..." placement="top">
              <Icon icon="info" size="x3" pl="half" />
            </Tooltip>
          </Flex>
        </DescriptionTerm>
        <DescriptionDetails>eaches</DescriptionDetails>
      </DescriptionGroup>

      <DescriptionGroup>
        <DescriptionTerm>
          <Flex alignItems="center">Full pallet</Flex>
        </DescriptionTerm>
        <DescriptionDetails>pallets</DescriptionDetails>
      </DescriptionGroup>

      <DescriptionGroup>
        <DescriptionTerm>
          <Flex alignItems="center">
            Reconciliation
            <Tooltip tooltip="Reconciliation  ..." placement="top">
              <Icon icon="info" size="x3" pl="half" />
            </Tooltip>
          </Flex>
        </DescriptionTerm>
        <DescriptionDetails>eaches</DescriptionDetails>
      </DescriptionGroup>

      <DescriptionGroup>
        <DescriptionTerm>
          <Flex alignItems="center">
            Accounting
            <Tooltip tooltip="Accounting unit ..." placement="top">
              <Icon icon="info" size="x3" pl="half" />
            </Tooltip>
          </Flex>
        </DescriptionTerm>
        <DescriptionDetails>eaches</DescriptionDetails>
      </DescriptionGroup>

      <DescriptionGroup>
        <DescriptionTerm>
          <Flex alignItems="center">
            Smart factory
            <Tooltip tooltip="Smart Factory unit .." placement="top">
              <Icon icon="info" size="x3" pl="half" />
            </Tooltip>
          </Flex>
        </DescriptionTerm>
        <DescriptionDetails>eaches</DescriptionDetails>
      </DescriptionGroup>
    </DescriptionList>
  </Box>
);

export const EditAndError = () => (
  <Box p="x3">
    <Flex justifyContent="space-between" alignItems="center" mb="x4">
      <Heading2 compact>Units of measure</Heading2>
      <Flex gap="x1">
        <PrimaryButton>Save</PrimaryButton>
        <QuietButton>Cancel</QuietButton>
      </Flex>
    </Flex>

    <Heading3 mb="x1">Conversion ratio</Heading3>
    <Box mb="x6">
      <RatioTable
        columns={[
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
                <TruncatedText
                  width="100%"
                  maxWidth={{ extraSmall: "10em", small: "12.5em", medium: "100%" }}
                  fullWidth
                  p="x2"
                >
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
                <TruncatedText
                  maxWidth={{ extraSmall: "2.75em", small: "5.75em", medium: "100%" }}
                  fullWidth
                  pr="x2"
                  py="x2"
                >
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
            metadata: { className: "metadata" },
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
                <TruncatedText
                  maxWidth={{ extraSmall: "2.75em", small: "5.75em", medium: "100%" }}
                  fullWidth
                  pr="x2"
                  py="x2"
                >
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
        ]}
        rows={[
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
        ]}
        rowHovers={false}
        loading={false}
      />
      <QuietButton icon="add" mt="x1">
        Add conversion ratio
      </QuietButton>
    </Box>

    <Heading3 mb="x3">Context of use</Heading3>
    <Flex rowGap="x2" columnGap="x3" flexDirection="row" flexWrap="wrap">
      <Select
        width="48%"
        defaultValue={["eaches"]}
        options={[
          { value: "eaches", label: "Eaches" },
          { value: "cases", label: "Cases" },
          { value: "pallets", label: "Pallets" },
        ]}
        labelText="Default"
      />
      <Select
        width="48%"
        defaultValue={["eaches"]}
        options={[
          { value: "eaches", label: "Eaches" },
          { value: "cases", label: "Cases" },
          { value: "pallets", label: "Pallets" },
        ]}
        labelText="Base"
      />
      <Box width="48%">
        <FieldLabel labelText="Case" hint="Base unit of measure is typically the smallest unit of measure for an Item.">
          <Select
            defaultValue={["eaches"]}
            options={[
              { value: "eaches", label: "Eaches" },
              { value: "cases", label: "Cases" },
              { value: "pallets", label: "Pallets" },
            ]}
          />
        </FieldLabel>
      </Box>
      <Box width="48%">
        <FieldLabel
          labelText="Receiving"
          hint="Receiving unit of measure will be used when creating receipts in mobile. It is also the default unit of measure used on Receipts, Receive Orders and Planned Receipts."
        >
          <Select
            defaultValue={["eaches"]}
            options={[
              { value: "eaches", label: "Eaches" },
              { value: "cases", label: "Cases" },
              { value: "pallets", label: "Pallets" },
            ]}
          />
        </FieldLabel>
      </Box>
      <Select
        width="48%"
        defaultValue={["eaches"]}
        options={[
          { value: "eaches", label: "Eaches" },
          { value: "cases", label: "Cases" },
          { value: "pallets", label: "Pallets" },
        ]}
        labelText="Full pallet"
      />
      <Box width="48%">
        <FieldLabel
          labelText="Reconciliation"
          hint="Reconciliation unit of measure will be the default unit of measure for physical counts and be displayed on the 'Compare and Reconcile' page when completing job reconciliation."
        >
          <Select
            defaultValue={["eaches"]}
            options={[
              { value: "eaches", label: "Eaches" },
              { value: "cases", label: "Cases" },
              { value: "pallets", label: "Pallets" },
            ]}
          />
        </FieldLabel>
      </Box>
      <Box width="48%">
        <FieldLabel
          labelText="Accounting"
          hint="Accounting unit of measure will be used when synchronizing inventory in the accounting integration."
        >
          <Select
            defaultValue={["eaches"]}
            options={[
              { value: "eaches", label: "Eaches" },
              { value: "cases", label: "Cases" },
              { value: "pallets", label: "Pallets" },
            ]}
          />
        </FieldLabel>
      </Box>
      <Box width="48%">
        <FieldLabel
          labelText="Smart Factory"
          hint="Smart Factory unit of measure will be used for integrations with Smart Factory."
        >
          <Select
            defaultValue={["eaches"]}
            options={[
              { value: "eaches", label: "Eaches" },
              { value: "cases", label: "Cases" },
              { value: "pallets", label: "Pallets" },
            ]}
          />
        </FieldLabel>
      </Box>
    </Flex>

    <DescriptionList columns={2} density="relaxed">
      <DescriptionGroup>
        <DescriptionTerm>
          <Flex alignItems="center">
            Smart factory
            <Tooltip tooltip="Smart Factory unit .." placement="top">
              <Icon icon="info" size="x3" pl="half" />
            </Tooltip>
          </Flex>
        </DescriptionTerm>
        <Box>
          <Select
            options={[
              { value: "eaches", label: "eaches" },
              { value: "cases", label: "cases" },
              { value: "pallets", label: "pallets" },
            ]}
            value="eaches"
          />
        </Box>
      </DescriptionGroup>
    </DescriptionList>
  </Box>
);
