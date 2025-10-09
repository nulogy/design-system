import React from "react";
import { Box, Text } from "../../../..";

// Production records data - basic data without expandedContent functions
export const productionRecordsData = [
  {
    id: "1",
    date: "2025-Feb-12",
    lotCodeAndExpiry: "",
    customerLotCode: "",
    supplierLotCode: "",
    expiryDate: "",
    palletNumber: "",
    expectedQuantity: "8 cases",
    actualQuantity: "8 cases",
    note: "",
  },
  {
    id: "2",
    date: "2025-Mar-15",
    lotCodeAndExpiry: "",
    customerLotCode: "",
    supplierLotCode: "",
    expiryDate: "",
    palletNumber: "",
    expectedQuantity: "12 cases",
    actualQuantity: "12 cases",
    note: "",
  },
  {
    id: "3",
    date: "2025-Apr-20",
    lotCodeAndExpiry: "",
    customerLotCode: "",
    supplierLotCode: "",
    expiryDate: "",
    palletNumber: "",
    expectedQuantity: "25 cases",
    actualQuantity: "25 cases",
    note: "",
  },
  {
    id: "4",
    date: "2025-Aug-08",
    lotCodeAndExpiry: "",
    customerLotCode: "",
    supplierLotCode: "",
    expiryDate: "",
    palletNumber: "",
    expectedQuantity: "0 cases",
    actualQuantity: "0 cases",
    note: "",
  },
  {
    id: "5",
    date: "2025-May-15",
    lotCodeAndExpiry: "",
    customerLotCode: "",
    supplierLotCode: "",
    expiryDate: "",
    palletNumber: "",
    expectedQuantity: "12 cases",
    actualQuantity: "12 cases",
    note: "",
  },
  {
    id: "6",
    date: "2025-Apr-22",
    lotCodeAndExpiry: "",
    customerLotCode: "",
    supplierLotCode: "",
    expiryDate: "",
    palletNumber: "",
    expectedQuantity: "23 cases",
    actualQuantity: "23 cases",
    note: "",
  },
  {
    id: "7",
    date: "2025-May-10",
    lotCodeAndExpiry: "",
    customerLotCode: "",
    supplierLotCode: "",
    expiryDate: "",
    palletNumber: "",
    expectedQuantity: "0 cases",
    actualQuantity: "0 cases",
    note: "",
  },
  {
    id: "8",
    date: "2025-Jun-05",
    lotCodeAndExpiry: "",
    customerLotCode: "",
    supplierLotCode: "",
    expiryDate: "",
    palletNumber: "",
    expectedQuantity: "15 cases",
    actualQuantity: "15 cases",
    note: "",
  },
];

// Production records columns configuration
export const productionRecordsColumns = [
  {
    label: "Date",
    dataKey: "date",
    width: "120px",
    minWidth: "120px",
  },
  {
    label: "Expected quantity",
    dataKey: "expectedQuantity",
    width: "180px",
    minWidth: "180px",
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
    label: "Pallet number",
    dataKey: "palletNumber",
    width: "180px",
    cellRenderer: ({ row }: { row: any }) => (
      <Box py="x0_75" mr="x1" pl="half">
        <Text fontSize="small" lineHeight="smallCompressed">
          {row.palletNumber}
        </Text>
      </Box>
    ),
  },
  {
    label: "Lot code",
    dataKey: "customerLotCode",
    width: "180px",
    headerFormatter: () => (
      <Box pt="x1_25" pb="x0_75">
        <Text>Lot code</Text>
        <Text fontSize="small" lineHeight="smallTextCompressed" color="midGrey">
          Customer's / Supplier's
        </Text>
      </Box>
    ),
    cellRenderer: ({ row }: { row: any }) => {
      // Always show blank for parent table rows since detailed info is in nested tables
      return null;
    },
  },
  {
    label: "Expiry date",
    dataKey: "expiryDate",
    width: "150px",
    cellRenderer: ({ row }: { row: any }) => (
      <Box py="x0_75" mr="x1" pl="half">
        <Text fontSize="small" lineHeight="smallCompressed">
          {row.expiryDate}
        </Text>
      </Box>
    ),
  },
  {
    label: "Note",
    dataKey: "note",
    width: "auto",
    cellRenderer: ({ row }: { row: any }) => (
      <Box py="x0_75" mr="x1" pl="half">
        <Text fontSize="small" lineHeight="smallCompressed">
          {row.note}
        </Text>
      </Box>
    ),
  },
  {
    label: "",
    dataKey: "actions",
    width: "32px",
    pr: "x1",
    headerFormatter: () => null,
  },
];
