// Table column configurations

import React from "react";
import { Text, Box, Tooltip } from "../../../index";

// Nested table columns configuration
export const nestedTableColumns = [
  {
    label: "Number",
    dataKey: "actualProductionRecordNumber",
    width: "0px",
    cellRenderer: ({ row }: { row: any }) => (
      <Box py="x0_75" mr="x1" justifyContent="flex-start" ml="-96px">
        <Tooltip tooltip={`Actual production record #${row.actualProductionRecordNumber}`} placement="left">
          <Box
            backgroundColor="lightGrey"
            px="half"
            borderRadius="small"
          >
            <Text
              color="darkGrey"
              fontSize="smaller"
              lineHeight="smallerText"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing=".05em"
            >
              {row.actualProductionRecordNumber}
            </Text>
          </Box>
        </Tooltip>
      </Box>
    ),
  },
  {
    label: "Actual quantity",
    dataKey: "actualQuantity",
    width: "180px",
    cellRenderer: ({ row }: { row: any }) => {
      return (
        <Box py="x0_75" mr="x1">
          <Text>{row.actualQuantity}</Text>
        </Box>
      );
    },
  },
  {
    label: "Lot code",
    dataKey: "lotCode",
    width: "180px",
    cellRenderer: ({ row }: { row: any }) => {
      if (!row.lotCode && !row.supplierLotCode) {
        return null;
      }
      return (
        <Box py="x0_75" gap="x0_25" flexDirection="column">
          <Text fontSize="small" lineHeight="smallTextCompressed">
            {row.lotCode || ""}
          </Text>
          <Text
            fontSize="small"
            lineHeight="smallTextCompressed"
            color="midGrey"
          >
            {row.supplierLotCode || ""}
          </Text>
        </Box>
      );
    },
  },
  {
    label: "Expiry date",
    dataKey: "expiryDate",
    width: "150px",
    cellRenderer: ({ row }: { row: any }) => {
      if (!row.expiryDate) {
        return null;
      }
      return (
        <Box py="x0_75" mr="x1">
          <Text fontSize="small" lineHeight="smallTextCompressed">
            {row.expiryDate}
          </Text>
        </Box>
      );
    },
  },
  {
    label: "Pallet number",
    dataKey: "palletNumber",
    width: "180px",
    cellRenderer: ({ row }: { row: any }) => {
      if (!row.palletNumber) {
        return null;
      }
      return (
        <Box py="x0_75" mr="x1">
          <Text fontSize="small" lineHeight="smallTextCompressed">
            {row.palletNumber}
          </Text>
        </Box>
      );
    },
  },
  {
    label: "Note",
    dataKey: "note",
    width: "auto",
    cellRenderer: ({ row }: { row: any }) => {
      if (!row.note) {
        return null;
      }
      return (
        <Box py="x0_375">
          <Text
            pr="x2"
            py="x1"
            fontSize="small"
            lineHeight="smallTextCompressed"
            maxCharacters={98}
          >
            {row.note}
          </Text>
        </Box>
      );
    },
  },
  {
    label: "",
    dataKey: "spacer",
    width: "48px",
    headerFormatter: () => null,
    cellRenderer: () => null,
  },
];

// Production records columns
export const productionRecordsColumns = [
  {
    label: "Date",
    dataKey: "date",
    width: "120px",
  },
  {
    label: "Expected quantity",
    dataKey: "expectedQuantity",
    width: "150px",
  },
  {
    label: "Actual quantity",
    dataKey: "actualQuantity",
    width: "150px",
  },
  {
    label: "Lot code",
    dataKey: "lotCodeAndExpiry",
    width: "180px",
    cellRenderer: ({ row }: { row: any }) => {
      if (!row.lotCodeAndExpiry) {
        return null;
      }
      return (
        <Box py="x0_75" gap="x0_25" flexDirection="column">
          <Text fontSize="small" lineHeight="smallTextCompressed">
            {row.lotCodeAndExpiry}
          </Text>
          <Text
            fontSize="small"
            lineHeight="smallTextCompressed"
            color="midGrey"
          >
            {row.customerLotCode}
          </Text>
        </Box>
      );
    },
  },
  {
    label: "Expiry date",
    dataKey: "expiryDate",
    width: "150px",
  },
  {
    label: "Pallet number",
    dataKey: "palletNumber",
    width: "180px",
  },
  {
    label: "Note",
    dataKey: "note",
    width: "auto",
    cellRenderer: ({ row }: { row: any }) => {
      if (!row.note) {
        return null;
      }
      return (
        <Box py="x0_375">
          <Text
            pr="x2"
            py="x1"
            fontSize="small"
            lineHeight="smallTextCompressed"
            maxCharacters={98}
          >
            {row.note}
          </Text>
        </Box>
      );
    },
  },
  {
    label: "",
    dataKey: "actions",
    width: "32px",
    headerFormatter: () => null,
    cellRenderer: (props: { row: any }) => {
      return (
        <Box py="x0_75" pr="x1">
          <Text fontSize="small" color="midGrey">
            ⋯
          </Text>
        </Box>
      );
    },
  },
];

// Consumption table columns
export const consumptionTableColumns = [
  {
    label: "#",
    dataKey: "subcomponentConsumptionRecordItem",
    width: "3em",
    cellRenderer: ({ row }: { row: any }) => (
      <Box py="x0_75" mr="x1" pl="half" display="flex" justifyContent="flex-start">
        <Tooltip tooltip={`Subcomponent consumption record #${row.subcomponentConsumptionRecordItem}`} placement="left">
          <Box
            backgroundColor="lightGrey"
            px="half"
            borderRadius="small"
            flexShrink={0}
          >
            <Text
              color="darkGrey"
              fontSize="smaller"
              lineHeight="smallerText"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing=".05em"
              whiteSpace="nowrap"
            >
              {row.subcomponentConsumptionRecordItem}
            </Text>
          </Box>
        </Tooltip>
      </Box>
    ),
  },
  {
    label: "Item",
    dataKey: "item",
    width: "auto",
    headerFormatter: ({ label }: { label: string }) => (
      <Text fontSize="small" lineHeight="smallCompressed" fontWeight="bold">
        {label}
      </Text>
    ),
    cellFormatter: ({ cellData }: { cellData: string }) => (
      <Text fontSize="small" lineHeight="smallCompressed">
        {cellData}
      </Text>
    ),
  },
  {
    label: "Lot code",
    dataKey: "lotCode",
    width: "auto",
    headerFormatter: ({ label }: { label: string }) => (
      <Text fontSize="small" lineHeight="smallCompressed" fontWeight="bold">
        {label}
      </Text>
    ),
    cellFormatter: ({ cellData }: { cellData: string }) => (
      <Text fontSize="small" lineHeight="smallCompressed">
        {cellData}
      </Text>
    ),
  },
  {
    label: "Expiry date",
    dataKey: "expiryDate",
    width: "auto",
    headerFormatter: ({ label }: { label: string }) => (
      <Text fontSize="small" lineHeight="smallCompressed" fontWeight="bold">
        {label}
      </Text>
    ),
    cellFormatter: ({ cellData }: { cellData: string }) => (
      <Text fontSize="small" lineHeight="smallCompressed">
        {cellData}
      </Text>
    ),
  },
  {
    label: "Pallet number",
    dataKey: "palletNumber",
    width: "auto",
    headerFormatter: ({ label }: { label: string }) => (
      <Text fontSize="small" lineHeight="smallCompressed" fontWeight="bold">
        {label}
      </Text>
    ),
    cellFormatter: ({ cellData }: { cellData: string }) => (
      <Text fontSize="small" lineHeight="smallCompressed">
        {cellData}
      </Text>
    ),
  },
  {
    label: "Quantity",
    dataKey: "quantity",
    width: "auto",
    headerFormatter: ({ label }: { label: string }) => (
      <Text fontSize="small" lineHeight="smallCompressed" fontWeight="bold">
        {label}
      </Text>
    ),
    cellFormatter: ({ cellData }: { cellData: string }) => (
      <Text fontSize="small" lineHeight="smallCompressed">
        {cellData}
      </Text>
    ),
  },
  {
    label: "UOM",
    dataKey: "uom",
    width: "auto",
    headerFormatter: ({ label }: { label: string }) => (
      <Text fontSize="small" lineHeight="smallCompressed" fontWeight="bold">
        {label}
      </Text>
    ),
    cellFormatter: ({ cellData }: { cellData: string }) => (
      <Text fontSize="small" lineHeight="smallCompressed">
        {cellData}
      </Text>
    ),
  },
];

// Custom nested table columns for 4th table (Number column first)
export const nestedTableColumns4th = [
  {
    label: "Number",
    dataKey: "actualProductionRecordNumber",
    width: "0px",
    cellRenderer: ({ row }: { row: any }) => (
      <Box py="x0_75" mr="x1" justifyContent="flex-start" ml="-96px">
        <Tooltip tooltip={`Actual production record #${row.actualProductionRecordNumber}`} placement="left">
          <Box
            backgroundColor="lightGrey"
            px="half"
            borderRadius="small"
          >
            <Text
              color="darkGrey"
              fontSize="smaller"
              lineHeight="smallerText"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing=".05em"
            >
              {row.actualProductionRecordNumber}
            </Text>
          </Box>
        </Tooltip>
      </Box>
    ),
  },
  {
    label: "Actual quantity",
    dataKey: "actualQuantity",
    width: "180px",
    cellRenderer: ({ row }: { row: any }) => {
      return (
        <Box py="x0_75" mr="x1">
          <Text>{row.actualQuantity}</Text>
        </Box>
      );
    },
  },
  {
    label: "Lot code",
    dataKey: "lotCode",
    width: "180px",
    cellRenderer: ({ row }: { row: any }) => {
      if (!row.lotCode && !row.supplierLotCode) {
        return null;
      }
      return (
        <Box py="x0_75" gap="x0_25" flexDirection="column">
          <Text fontSize="small" lineHeight="smallTextCompressed">
            {row.lotCode || ""}
          </Text>
          <Text
            fontSize="small"
            lineHeight="smallTextCompressed"
            color="midGrey"
          >
            {row.supplierLotCode || ""}
          </Text>
        </Box>
      );
    },
  },
  {
    label: "Expiry date",
    dataKey: "expiryDate",
    width: "150px",
    cellRenderer: ({ row }: { row: any }) => {
      if (!row.expiryDate) {
        return null;
      }
      return (
        <Box py="x0_75" mr="x1">
          <Text fontSize="small" lineHeight="smallTextCompressed">
            {row.expiryDate}
          </Text>
        </Box>
      );
    },
  },
  {
    label: "Pallet number",
    dataKey: "palletNumber",
    width: "180px",
    cellRenderer: ({ row }: { row: any }) => {
      if (!row.palletNumber) {
        return null;
      }
      return (
        <Box py="x0_75" mr="x1">
          <Text fontSize="small" lineHeight="smallTextCompressed">
            {row.palletNumber}
          </Text>
        </Box>
      );
    },
  },
  {
    label: "Note",
    dataKey: "note",
    width: "auto",
    cellRenderer: ({ row }: { row: any }) => {
      if (!row.note) {
        return null;
      }
      return (
        <Box py="x0_375">
          <Text
            pr="x2"
            py="x1"
            fontSize="small"
            lineHeight="smallTextCompressed"
            maxCharacters={98}
          >
            {row.note}
          </Text>
        </Box>
      );
    },
  },
  {
    label: "",
    dataKey: "spacer",
    width: "48px",
    headerFormatter: () => null,
    cellRenderer: () => null,
  },
];

// Custom nested table columns for 5th, 6th, 7th tables (Number column first)
export const nestedTableColumns567 = [
  {
    label: "Number",
    dataKey: "actualProductionRecordNumber",
    width: "0px",
    cellRenderer: ({ row }: { row: any }) => (
      <Box py="x0_75" mr="x1" justifyContent="flex-start" ml="-96px">
        <Tooltip tooltip={`Actual production record #${row.actualProductionRecordNumber}`} placement="left">
          <Box
            backgroundColor="lightGrey"
            px="half"
            borderRadius="small"
          >
            <Text
              color="darkGrey"
              fontSize="smaller"
              lineHeight="smallerText"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing=".05em"
            >
              {row.actualProductionRecordNumber}
            </Text>
          </Box>
        </Tooltip>
      </Box>
    ),
  },
  {
    label: "Actual quantity",
    dataKey: "actualQuantity",
    width: "180px",
    cellRenderer: ({ row }: { row: any }) => {
      return (
        <Box py="x0_75" mr="x1">
          <Text>{row.actualQuantity}</Text>
        </Box>
      );
    },
  },
  {
    label: "Lot code",
    dataKey: "lotCode",
    width: "180px",
    cellRenderer: ({ row }: { row: any }) => {
      if (!row.lotCode && !row.supplierLotCode) {
        return null;
      }
      return (
        <Box py="x0_75" gap="x0_25" flexDirection="column">
          <Text fontSize="small" lineHeight="smallTextCompressed">
            {row.lotCode || ""}
          </Text>
          <Text
            fontSize="small"
            lineHeight="smallTextCompressed"
            color="midGrey"
          >
            {row.supplierLotCode || ""}
          </Text>
        </Box>
      );
    },
  },
  {
    label: "Expiry date",
    dataKey: "expiryDate",
    width: "150px",
    cellRenderer: ({ row }: { row: any }) => {
      if (!row.expiryDate) {
        return null;
      }
      return (
        <Box py="x0_75" mr="x1">
          <Text fontSize="small" lineHeight="smallTextCompressed">
            {row.expiryDate}
          </Text>
        </Box>
      );
    },
  },
  {
    label: "Pallet number",
    dataKey: "palletNumber",
    width: "180px",
    cellRenderer: ({ row }: { row: any }) => {
      if (!row.palletNumber) {
        return null;
      }
      return (
        <Box py="x0_75" mr="x1">
          <Text fontSize="small" lineHeight="smallTextCompressed">
            {row.palletNumber}
          </Text>
        </Box>
      );
    },
  },
  {
    label: "Note",
    dataKey: "note",
    width: "auto",
    cellRenderer: ({ row }: { row: any }) => {
      if (!row.note) {
        return null;
      }
      return (
        <Box py="x0_375">
          <Text
            pr="x2"
            py="x1"
            fontSize="small"
            lineHeight="smallTextCompressed"
            maxCharacters={98}
          >
            {row.note}
          </Text>
        </Box>
      );
    },
  },
  {
    label: "",
    dataKey: "spacer",
    width: "48px",
    headerFormatter: () => null,
    cellRenderer: () => null,
  },
];
