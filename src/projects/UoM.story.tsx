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
  IconicButton
} from "../index";
import { Columns } from "../Table/Table.types";
import styled from "styled-components";
import { minWidth, width } from "styled-system";

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
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
  > tbody > tr {
    border-bottom: 1px solid;
    border-color: ${({ theme }) => theme.colors.lightGrey};
    border-collapse: collapse;
  }

  td, th {
    white-space: nowrap;
    padding: ${({ theme }) => theme.space.x2} ${({ theme }) => theme.space.x2};
    vertical-align: top;
    text-overflow: ellipsis!important;
  }

  td:has(.has-renderer) {
    padding: ${({ theme }) => theme.space.x1};
  }
    
  tr.inactive td {
    color: ${({ theme }) => theme.colors.grey};
  }
`;

export const Default = () => (
  <Box p="x3" style={{ border: "dotted 1px violet" }} >
    <Flex justifyContent="space-between" alignItems="center" mb="x4">
    <Heading2 mb="0">Units of measure</Heading2>
      <QuietButton variant="desktop">Edit</QuietButton>
    </Flex>

    <Heading3 mb="x1">Conversion ratio</Heading3>
    <Box mb="x6">
        <RatioTable
          columns={[
            { dataKey: "fromUnit", width: "21%", label: "eaches" },
            { dataKey: "toUnit", width: "6%", label: "", align: "right" },
            { dataKey: "factor", width: "3%", label: "ea" },
            { dataKey: "rounding", width: "3%", label: "" },
            { dataKey: "precision", width: "3%", label: "" },
            { dataKey: "direction", width: "3%", label: "" },
            { dataKey: "status", width: "3%", label: "" },
            { dataKey: "lastUpdated", width: "6%", label: "", align: "right" },
            { dataKey: "actions", width: "3%", label: "" },
            { dataKey: "conversion", width: "49%", label: "" }
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
              conversion: ""
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
              conversion: ""
            }
          ]}
          rowHovers={true}
          loading={false}
        />
    </Box>

    <Heading3 mb="x1">Context of use</Heading3>
    <DescriptionList columns={2}>
      <DescriptionGroup>
        <DescriptionTerm>
          <Flex alignItems="center">
            Default
          </Flex>
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
          <Flex alignItems="center">
            Case
          </Flex>
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
          <Flex alignItems="center">
            Full pallet
          </Flex>
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
  <Box p="x3" style={{ border: "dotted 1px violet" }} >
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
            { dataKey: "fromUnit", width: "21%", label: "eaches",
              cellRenderer: ({ row }) => row.state=="edit" ? (
                <Flex width="100%" pr="x2" className="has-renderer" justifyContent={"flex-end"}>
                  <Input
                  inputWidth="100%"
                  value="pallets" />
                </Flex>
              ) : (
                row.fromUnit
              )
             },
            {
              dataKey: "toUnit",
              width: "6%", 
              label: "",
              align: "right",
              cellRenderer: ({ row }) => row.state=="inactive" ? (
                  <Text textAlign={"right"} color="grey">{row.toUnit}</Text>
              ) : (
                <Text textAlign={"right"}>
                  {row.toUnit}
                </Text>
              )
            },
            { dataKey: "factor", width: "3%", label: "ea", cellRenderer: ({ row }) => row.state=="inactive" ? (

                <Text color="grey">{row.factor}</Text>

            ) : (
              
                row.factor
              
            ) },
            { dataKey: "rounding", width: "3%", label: "", cellRenderer: ({ row }) => row.state=="inactive" ? (

              <Text color="grey">{row.rounding}</Text>

          ) : (
            
              row.rounding
            
          )  },
            { 
              dataKey: "precision",
              width: "16%",
              label: "",
              cellRenderer: ({ row }) => row.state!="error" ? (
                <Box width="100%" className={`has-renderer`} >
                  <Input
                    value={row.precision}
                    inputWidth="100%"
                    disabled={row.inactive}
                  />
                </Box>
              ) : (
                <Box width="100%" className={`has-renderer`} >
                  <Input
                    value={row.precision}
                    inputWidth="100%"
                    disabled={row.inactive}
                    errorMessage="This field is required."
                  />
                </Box>
              )
            },
            { 
              dataKey: "direction",
              width: "13%",
              label: "",
              cellRenderer: ({ row }) => (
                <Box width="100%" className={`has-renderer`} >
                  <Select
                    options={[
                      { value: "ea", label: "ea" },
                      { value: "cs", label: "cs" },
                      { value: "pl", label: "pl" }
                    ]}
                    value="ea"
                    disabled={row.inactive}
                  />
                </Box>
              )
            },
            { dataKey: "status", width: "3%", label: "", cellRenderer: ({ row }) => row.state=="inactive" ? (

              <Text color="grey">{row.status}</Text>

          ) : (
            
              row.status
            
          )  },
            { dataKey: "lastUpdated", width: "6%", label: "", align: "right", cellRenderer: ({ row }) => row.state=="inactive" ? (
              <Text textAlign={"right"} color="grey">{row.lastUpdated}</Text>
          ) : (
            <Text textAlign={"right"}>
              {row.lastUpdated}
            </Text>
          ) },
            { dataKey: "actions", width: "3%", label: "", cellRenderer: ({ row }) => row.state=="inactive" ? (

              <Text color="grey">{row.actions}</Text>

          ) : (
            
              row.actions
            
          )  },
            { dataKey: "conversion", width: "3%", label: "" },
            { 
              dataKey: "active",
              width: "20%",
              label: "",
              cellRenderer: ({ row }) => (
                <Flex width="100%" justifyContent="flex-end" className={`has-renderer`} >
                  <Box minWidth="8em">
                    <Toggle p="0"
                      toggled={row.inactive === false}
                      onText="Active"
                      offText="Inactive"
                    />
                  </Box>
                </Flex>
                )            },
            { 
              dataKey: "delete",
              width: "3%",
              label: "",
              cellRenderer: ({ row }) => row.state=="edit" ? (
                <Flex width="100%" py="half" pr="x2" className="has-renderer" justifyContent={"flex-end"}>
                  <IconicButton icon="delete" p="0" />
                </Flex>
              ) : null
            }
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
              inactive: false
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
              inactive: true
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
              inactive: false
            },
            {
              state: "error",
              fromUnit: "eaches",
              toUnit: "1",
              factor: "ea",
              rounding: "=",
              precision: "3",
              direction: "cs",
              status: "=",
              lastUpdated: "1",
              actions: "ea",
              inactive: false
            }

          ]}
          rowHovers={false}
          loading={false}
        />
        <QuietButton variant="desktop" icon="add" mt="x1">Add conversion ratio</QuietButton>
    </Box>

    <Heading3 mb="x1">Context of use</Heading3>
    <DescriptionList columns={2} density="relaxed">
      <DescriptionGroup>
        <DescriptionTerm>
          <Flex alignItems="center">
            Default
          </Flex>
        </DescriptionTerm>
        <Box>
          <Select
            options={[
              { value: "eaches", label: "eaches" },
              { value: "cases", label: "cases" },
              { value: "pallets", label: "pallets" }
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
              { value: "pallets", label: "pallets" }
            ]}
            value="eaches"
          />
        </Box>
      </DescriptionGroup>

      <DescriptionGroup>
        <DescriptionTerm>
          <Flex alignItems="center">
            Case
          </Flex>
        </DescriptionTerm>
        <Box>
          <Select
            options={[
              { value: "eaches", label: "eaches" },
              { value: "cases", label: "cases" },
              { value: "pallets", label: "pallets" }
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
              { value: "pallets", label: "pallets" }
            ]}
            value="eaches"
          />
        </Box>
      </DescriptionGroup>

      <DescriptionGroup>
        <DescriptionTerm>
          <Flex alignItems="center">
            Full pallet
          </Flex>
        </DescriptionTerm>
        <Box>
          <Select
            options={[
              { value: "eaches", label: "eaches" },
              { value: "cases", label: "cases" },
              { value: "pallets", label: "pallets" }
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
              { value: "pallets", label: "pallets" }
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
              { value: "pallets", label: "pallets" }
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
              { value: "pallets", label: "pallets" }
            ]}
            value="eaches"
          />
        </Box>
      </DescriptionGroup>
    </DescriptionList>
  </Box>
); 