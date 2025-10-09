import React from "react";
import { ConsumptionReport, EmptyConsumptionReport } from "./components";
import { materialsData1, materialsData2, materialsData5A, materialsData5B, materialsData6A, materialsData6B, materialsData7A } from "./materialsData";

// Function to create nested table data with consumption table columns
export const createNestedTableData = (consumptionTableColumns: any) => {
  const nestedTableData1 = [
  {
    id: "1-1",
    actualQuantity: "0 cases",
    actualProductionRecordNumber: "001",
    lotCode: "LOT-2025-001",
    supplierLotCode: "SUP-LOT-001",
    expiryDate: "2026-Feb-12",
    palletNumber: "PAL-001",
    note: "Production details for this lot - additional information about the manufacturing process, quality checks, and any special handling requirements",
      expandedContent: () => (
        <ConsumptionReport consumptionTableColumns={consumptionTableColumns} materials={[]} parentData={{ date: "2025-Feb-12", actualQuantity: "0 cases" }} />
      ),
  },
  {
    id: "1-2",
    actualQuantity: "5 cases",
    actualProductionRecordNumber: "002",
    lotCode: "LOT-2025-001A",
    supplierLotCode: "SUP-LOT-001A",
    expiryDate: "2026-Feb-12",
    palletNumber: "PAL-001A",
    note: "Additional batch from same production run",
    expandedContent: () => (
      <ConsumptionReport consumptionTableColumns={consumptionTableColumns} materials={materialsData2} parentData={{ date: "2025-Feb-12", actualQuantity: "5 cases" }} />
    ),
  },
  {
    id: "1-3",
    actualQuantity: "3 cases",
    actualProductionRecordNumber: "003",
    lotCode: "LOT-2025-001B",
    supplierLotCode: "SUP-LOT-001B",
    expiryDate: "2026-Feb-12",
    palletNumber: "PAL-001B",
    note: "Final batch completion",
    expandedContent: () => (
      <ConsumptionReport consumptionTableColumns={consumptionTableColumns} materials={materialsData1} parentData={{ date: "2025-Feb-12", actualQuantity: "3 cases" }} />
    ),
  },
  ];

  const nestedTableData2 = [
  {
    id: "2-1",
    actualQuantity: "12 cases",
    actualProductionRecordNumber: "001",
    lotCode: "LOT-2025-002",
    supplierLotCode: "SUP-LOT-002",
    expiryDate: "2026-03-15",
    palletNumber: "PAL-002",
    note: "Standard production run with normal quality metrics",
    expandedContent: () => (
      <ConsumptionReport
        consumptionTableColumns={consumptionTableColumns}
        materials={materialsData1}
        parentData={{ date: "2025-Mar-15", actualQuantity: "12 cases" }}
      />
    ),
  },
  ];

  const nestedTableData3 = [
  {
    id: "3-1",
    actualQuantity: "25 cases",
    actualProductionRecordNumber: "001",
    lotCode: "LOT-2025-003",
    supplierLotCode: "SUP-LOT-003",
    expiryDate: "2026-04-20",
    palletNumber: "PAL-003",
    note: "High volume production batch for major customer order",
    expandedContent: () => (
      <ConsumptionReport
        consumptionTableColumns={consumptionTableColumns}
        materials={materialsData1}
        parentData={{ date: "2025-Apr-20", actualQuantity: "25 cases" }}
      />
    ),
  },
  ];

  const nestedTableData4 = [
  {
    id: "4-1",
    actualQuantity: "0 cases",
    actualProductionRecordNumber: "001",
    lotCode: "LOT-2025-004",
    supplierLotCode: "SUP-LOT-004",
    expiryDate: "2026-08-08",
    palletNumber: "PAL-004",
    note: "Equipment maintenance scheduled, production line optimization in progress",
    expandedContent: () => (
      <ConsumptionReport consumptionTableColumns={consumptionTableColumns} materials={[]} parentData={{ date: "2025-Aug-08", actualQuantity: "0 cases" }} />
    ),
  },
  ];

  const nestedTableData5 = [
  {
    id: "5-1",
    actualQuantity: "8 cases",
    actualProductionRecordNumber: "Output #001",
    lotCode: "LOT-2025-005A",
    supplierLotCode: "SUP-LOT-005A",
    expiryDate: "2026-03-15",
    palletNumber: "PAL-005A",
    note: "First batch from production run",
    expandedContent: () => (
      <ConsumptionReport
        consumptionTableColumns={consumptionTableColumns}
        materials={materialsData5A}
        parentData={{ date: "2025-May-15", actualQuantity: "8 cases" }}
      />
    ),
  },
  {
    id: "5-2",
    actualQuantity: "4 cases",
    actualProductionRecordNumber: "Output #002",
    lotCode: "LOT-2025-005B",
    supplierLotCode: "SUP-LOT-005B",
    expiryDate: "2026-03-15",
    palletNumber: "PAL-005B",
    note: "Second batch completion",
    expandedContent: () => (
      <ConsumptionReport
        consumptionTableColumns={consumptionTableColumns}
        materials={materialsData5B}
        parentData={{ date: "2025-May-15", actualQuantity: "4 cases" }}
      />
    ),
  },
  ];

  const nestedTableData6 = [
  {
    id: "6-1",
    actualQuantity: "15 cases",
    actualProductionRecordNumber: "Actual production record #001",
    lotCode: "LOT-2025-006A",
    supplierLotCode: "SUP-LOT-006A",
    expiryDate: "2026-04-22",
    palletNumber: "PAL-006A",
    note: "Quality approved batch",
    expandedContent: () => (
      <ConsumptionReport
        consumptionTableColumns={consumptionTableColumns}
        materials={materialsData6A}
        parentData={{ date: "2025-Apr-22", actualQuantity: "10 cases" }}
      />
    ),
  },
  {
    id: "6-2",
    actualQuantity: "8 cases",
    actualProductionRecordNumber: "Actual production record #002",
    lotCode: "LOT-2025-006B",
    supplierLotCode: "SUP-LOT-006B",
    expiryDate: "2026-04-22",
    palletNumber: "PAL-006B",
    note: "Partial batch with quality issues",
    expandedContent: () => <ConsumptionReport consumptionTableColumns={consumptionTableColumns} materials={materialsData6B} />,
  },
  ];

  const nestedTableData7 = [
  {
    id: "7-1",
    actualQuantity: "0 cases",
    actualProductionRecordNumber: "001",
    lotCode: "LOT-2025-007A",
    supplierLotCode: "SUP-LOT-007A",
    expiryDate: "2026-05-10",
    palletNumber: "PAL-007A",
    note: "Production on hold - awaiting materials",
    expandedContent: () => <ConsumptionReport materials={materialsData7A} consumptionTableColumns={consumptionTableColumns} />,
  },
  {
    id: "7-2",
    actualQuantity: "0 cases",
    actualProductionRecordNumber: "002",
    lotCode: "LOT-2025-007B",
    supplierLotCode: "SUP-LOT-007B",
    expiryDate: "2026-05-10",
    palletNumber: "PAL-007B",
    note: "Delayed batch - material shortage",
    expandedContent: () => <EmptyConsumptionReport />,
  },
  ];

  const nestedTableData8 = [
  {
    id: "8-1",
    actualQuantity: "15 cases",
    lotCode: "LOT-2025-008",
    supplierLotCode: "SUP-LOT-008",
    expiryDate: "2026-06-05",
    palletNumber: "PAL-008",
    note: "Special order for premium customer, expedited processing",
    expandedContent: () => <ConsumptionReport materials={materialsData1} consumptionTableColumns={consumptionTableColumns} />,
  },
  ];

  return {
    nestedTableData1,
    nestedTableData2,
    nestedTableData3,
    nestedTableData4,
    nestedTableData5,
    nestedTableData6,
    nestedTableData7,
    nestedTableData8,
  };
};
