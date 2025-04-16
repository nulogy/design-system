import React from "react";
import {
  Box,
  Flex,
  Heading2,
  Heading3,
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
  FieldLabel,
} from "../../..";
import { editModeRows, defaultRows, defaultColumns, editModeColumns } from "./tableData";

export default {
  title: "Projects/Shop Floor/UoM 1:1 NDS conversion",
  parameters: {
    layout: "fullscreen",
  },
};

export const Default = () => (
  <Box p="x3">
    <Flex justifyContent="space-between" alignItems="center" mb="x4">
      <Heading2 compact>Units of measure</Heading2>
      <QuietButton>Edit</QuietButton>
    </Flex>

    <Heading3 mb="x1">Conversion ratio</Heading3>
    <Box mb="x6">
      <Table rowBorder columns={defaultColumns} rows={defaultRows} rowHovers={true} loading={false} />
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
      <Table rowBorder columns={editModeColumns} rows={editModeRows} rowHovers={false} loading={false} />
      <QuietButton icon="add" mt="x1">
        Add conversion ratio
      </QuietButton>
    </Box>

    <Heading3 mb="x3">Context of use</Heading3>
    <Flex gap="x3" width="100%">
      <Flex gap="x2" flexDirection="column" width="100%">
        <Select
          defaultValue={["eaches"]}
          options={[
            { value: "eaches", label: "Eaches" },
            { value: "cases", label: "Cases" },
            { value: "pallets", label: "Pallets" },
          ]}
          labelText="Default"
        />
        <Select
          defaultValue={["eaches"]}
          options={[
            { value: "eaches", label: "Eaches" },
            { value: "cases", label: "Cases" },
            { value: "pallets", label: "Pallets" },
          ]}
          labelText="Base"
        />
        <Box>
          <FieldLabel
            labelText="Case"
            hint="Base unit of measure is typically the smallest unit of measure for an Item."
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
        <Box>
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
      </Flex>
      <Flex flexDirection="column" gap="x2" width="100%">
        <Select
          defaultValue={["eaches"]}
          options={[
            { value: "eaches", label: "Eaches" },
            { value: "cases", label: "Cases" },
            { value: "pallets", label: "Pallets" },
          ]}
          labelText="Full pallet"
        />
        <Box>
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
        <Box>
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
        <Box>
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
    </Flex>
  </Box>
);
