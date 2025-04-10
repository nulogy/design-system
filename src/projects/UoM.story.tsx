import React from "react";
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
} from "../index";
import { Columns } from "../Table/Table.types";
import styled from "styled-components";
import { border, minWidth, width } from "styled-system";

export default {
  title: "Projects/UoM",
};

// Table columns for units of measure
const unitsColumns: Columns<{}> = [
  { label: "eaches", dataKey: "fromUnit" },
  { label: "ea", dataKey: "toUnit" },
  { label: "", dataKey: "factor" },
  { label: "", dataKey: "rounding" },
  { label: "", dataKey: "precision" },
  { label: "", dataKey: "direction" },
  { label: "", dataKey: "status" },
  { label: "", dataKey: "lastUpdated" },
  { label: "", dataKey: "actions" },
  { label: "", dataKey: "conversion" },
];

const unitsRowData = [
  {
    fromUnit: "cases",
    toUnit: "1",
    factor: "cs",
    rounding: "=",
    precision: "1",
    direction: "ea",
    status: "=",
    lastUpdated: "1",
    actions: "ea",
    conversion: "",
    id: "r1",
  },
  {
    fromUnit: "pallets",
    toUnit: "1",
    factor: "pl",
    rounding: "=",
    precision: "1",
    direction: "cs",
    status: "=",
    lastUpdated: "1",
    actions: "ea",
    conversion: "",
    id: "r2",
  },
];

const RatioTable = styled(Table)`
  > tbody > tr {
    border-bottom: 1px solid;
    border-color: ${({ theme }) => theme.colors.lightGrey};
    border-collapse: collapse;

    vertical-align: top; /* Not storybook supported */
  }

  td, th{
    //padding: ${({ theme }) => theme.space.x2} ${({ theme }) => theme.space.x1};
    //vertical-align: top;
    //text-overflow: ellipsis;
  }

  td:has(.customCell){
    //padding: ${({ theme }) => theme.space.x1};
  }

  //td:nth-child(1), th:nth-child(1) {padding-left: ${({ theme }) => theme.space.x1};

  tr.inactive td {
    //color: ${({ theme }) => theme.colors.grey};
  }
`;

export const Default = () => (
  <Box p="x3" style={{ border: "dotted 1px violet" }}>
    <Flex justifyContent="space-between" alignItems="center" mb="x4">
      <Heading2 mb="0">Units of measure</Heading2>
      <QuietButton variant="desktop">Edit</QuietButton>
    </Flex>

    <Heading3 mb="x1">Conversion ratio</Heading3>
    <Box mb="x6">
      <RatioTable
        columns={[
          { dataKey: "fromUnit", width: "auto", label: "eaches" },
          { dataKey: "toUnit", width: "auto", label: "", align: "right" },
          { dataKey: "factor", width: "auto", label: "ea" },
          { dataKey: "rounding", width: "auto", label: "", align: "center" },
          { dataKey: "precision", width: "auto", label: "", align: "right" },
          { dataKey: "direction", width: "auto", label: "" },
          { dataKey: "status", width: "auto", label: "", align: "center" },
          { dataKey: "lastUpdated", width: "auto", label: "", align: "right" },
          { dataKey: "actions", width: "auto", label: "" },
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
  <Box p="x3" style={{ border: "dotted 1px violet" }}>
    <Flex justifyContent="space-between" alignItems="center" mb="x4">
      <Heading2 mb="0">Units of measure</Heading2>
      <Flex gap="x1">
        <PrimaryButton variant="desktop">Save</PrimaryButton>
        <QuietButton variant="desktop">Cancel</QuietButton>
      </Flex>
    </Flex>

    <Heading3 mb="x1">Conversion ratio</Heading3>
    <Box mb="x6">
      <RatioTable
        columns={[
          {
            dataKey: "fromUnit",
            width: "auto",
            label: "eaches",
            cellRenderer: ({ row }) =>
              row.state == "edit" ? (
                <Box py="x1" pl="x2">
                  <Input inputWidth="100%" value="{row.fromUnit}" />
                </Box>
              ) : row.state == "inactive" ? (
                  <Text color="grey" py="x2" pl="x2">{row.fromUnit}</Text>
              ) : (
                <Text py="x2" pl="x2">{row.fromUnit}</Text>
              ),
          },
          {
            dataKey: "toUnit",
            width: "auto",
            label: "",
            cellRenderer: ({ row }) =>
              row.state == "inactive" ? (
                <TruncatedText
                  maxWidth={{ extraSmall: "2.75em", small: "5.75em", medium: "100%" }}
                  fullWidth
                  textAlign={"right"}
                  color="grey"
                  pr="x2" py="x2"
                >
                  {row.toUnit}
                </TruncatedText>
              ) : (
                <TruncatedText
                  maxWidth={{ extraSmall: "2.75em", small: "5.75em", medium: "100%" }}
                  fullWidth
                  textAlign={"right"}
                  pr="x2" py="x2"
                >
                  {row.toUnit}
                </TruncatedText>
              ),
          },
          {
            dataKey: "factor",
            width: "auto",
            label: "ea",
            cellRenderer: ({ row }) =>
              row.state == "inactive" ? (
                <TruncatedText
                  maxWidth={{ extraSmall: "2.75em", small: "5.75em", medium: "100%" }}
                  fullWidth
                  color="grey"
                  pr="x2" py="x2"
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
            width: "auto",
            label: "",
            cellRenderer: ({ row }) =>
              row.state == "inactive" ? (
                <Text color="grey" textAlign="center" pr="x2" py="x2">
                  {row.rounding}
                </Text>
              ) : (
                <Text textAlign="center" pr="x2" py="x2">{row.rounding}</Text>
              ),
          },
          {
            dataKey: "precision",
            width: "auto",
            label: "",
            metadata: { className: "metadata" },
            cellRenderer: ({ row }) =>
              row.state != "error" ? (
                <Flex
                  width="auto"
                 
                  gap="x1"
                  flexWrap={{ extraSmall: "wrap", medium: "nowrap" }}
                  pr="x2" py="x1"
                >
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
                <Flex
                  width="auto"
                 
                  gap="x1"
                  flexWrap={{ extraSmall: "wrap", medium: "nowrap" }}
                  pr="x2" py="x1"
                >
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
            width: "auto",
            label: "",
            cellRenderer: ({ row }) =>
              row.state == "inactive" ? (
                <Text color="grey" textAlign="center" pr="x2" py="x2">
                  {row.status}
                </Text>
              ) : (
                <Text textAlign="center" pr="x2" py="x2"> {row.status}</Text>
              ),
          },
          {
            dataKey: "lastUpdated",
            width: "auto",
            label: "",
            cellRenderer: ({ row }) =>
              row.state == "inactive" ? (
                <TruncatedText
                  maxWidth={{ extraSmall: "2.75em", small: "5.75em", medium: "100%" }}
                  fullWidth
                  color="grey"
                  textAlign={"right"}
                  pr="x2" py="x2"
                >
                  {row.lastUpdated}
                </TruncatedText>
              ) : (
                <TruncatedText
                  maxWidth={{ extraSmall: "2.75em", small: "5.75em", medium: "100%" }}
                  fullWidth
                  textAlign={"right"}
                  pr="x2" py="x2"
                >
                  {row.lastUpdated}
                </TruncatedText>
              ),
          },
          {
            dataKey: "actions",
            width: "auto",
            label: "",
            cellRenderer: ({ row }) =>
              row.state == "inactive" ? (
                <TruncatedText
                  maxWidth={{ extraSmall: "2.75em", small: "5.75em", medium: "100%" }}
                  fullWidth
                  color="grey"
                  pr="x2" py="x2"
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
              row.state == "edit" ? <IconicButton className="customCell" icon="delete" pr="x2" py="x1_5" /> : null,
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
            state: "edit",
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
            fromUnit: "eaches",
            toUnit: "9999999999999999",
            factor: "eaaaaa",
            rounding: "=",
            precision: "9999999999999999",
            direction: "csssss",
            status: "=",
            lastUpdated: "999999999999999",
            actions: "eaaaaaa",
            inactive: false,
          },
        ]}
        rowHovers={false}
        loading={false}
      />
      <QuietButton variant="desktop" icon="add" mt="x1">
        Add conversion ratio
      </QuietButton>
    </Box>

    <Heading3 mb="x1">Context of use</Heading3>
    <DescriptionList columns={2} density="relaxed">
      <DescriptionGroup>
        <DescriptionTerm>
          <Flex alignItems="center">Default</Flex>
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

      <DescriptionGroup>
        <DescriptionTerm>
          <Flex alignItems="center">
            Base
            <Tooltip tooltip="Base unit ..." placement="top">
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

      <DescriptionGroup>
        <DescriptionTerm>
          <Flex alignItems="center">Case</Flex>
        </DescriptionTerm>
        <Box>
          <Select
            options={[
              { value: "eaches", label: "eaches" },
              { value: "cases", label: "cases" },
              { value: "pallets", label: "pallets" },
            ]}
            value="cases"
          />
        </Box>
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

      <DescriptionGroup>
        <DescriptionTerm>
          <Flex alignItems="center">Full pallet</Flex>
        </DescriptionTerm>
        <Box>
          <Select
            options={[
              { value: "eaches", label: "eaches" },
              { value: "cases", label: "cases" },
              { value: "pallets", label: "pallets" },
            ]}
            value="pallets"
          />
        </Box>
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

      <DescriptionGroup>
        <DescriptionTerm>
          <Flex alignItems="center">
            Accounting
            <Tooltip tooltip="Accounting unit ..." placement="top">
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
