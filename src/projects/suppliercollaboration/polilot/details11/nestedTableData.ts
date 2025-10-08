// Nested table data for each expandable row

export interface NestedTableRow {
  id: string;
  actualProductionRecordNumber: string;
  actualQuantity: string;
  lotCode?: string;
  supplierLotCode?: string;
  expiryDate?: string;
  palletNumber?: string;
  note?: string;
  expandedContent?: () => JSX.Element;
}

export const nestedTableData1: NestedTableRow[] = [
  {
    id: "1-1",
    actualProductionRecordNumber: "001",
    actualQuantity: "3 cases",
    lotCode: "LOT-2025-001A",
    supplierLotCode: "SUP-LOT-001A",
    expiryDate: "2026-Feb-12",
    palletNumber: "PAL-001A",
    note: "First batch with initial quality checks",
    expandedContent: () => (
      <Box style={{ paddingLeft: "298px" }}>
        <Table
          columns={consumptionTableColumns}
          rows={materialsData2}
          keyField="item"
          compact={true}
          rowBorder={true}
          className="subcomponent-consumption-record-table"
        />
      </Box>
    ),
  },
  {
    id: "1-2",
    actualProductionRecordNumber: "002",
    actualQuantity: "5 cases",
    lotCode: "LOT-2025-001B",
    supplierLotCode: "SUP-LOT-001B",
    expiryDate: "2026-Feb-12",
    palletNumber: "PAL-001B",
    note: "Second batch with additional quality control",
    expandedContent: () => (
      <Box style={{ paddingLeft: "298px" }}>
        <Table
          columns={consumptionTableColumns}
          rows={materialsData1}
          keyField="item"
          compact={true}
          rowBorder={true}
          className="subcomponent-consumption-record-table"
        />
      </Box>
    ),
  },
];

export const nestedTableData2: NestedTableRow[] = [
  {
    id: "2-1",
    actualProductionRecordNumber: "001",
    actualQuantity: "12 cases",
    lotCode: "LOT-2025-002",
    supplierLotCode: "SUP-LOT-002",
    expiryDate: "2026-03-15",
    palletNumber: "PAL-002",
    note: "Standard production run completed successfully",
    expandedContent: () => (
      <Box style={{ paddingLeft: "298px" }}>
        <Table
          columns={consumptionTableColumns}
          rows={materialsData1}
          keyField="item"
          compact={true}
          rowBorder={true}
          className="subcomponent-consumption-record-table"
        />
      </Box>
    ),
  },
];

export const nestedTableData3: NestedTableRow[] = [
  {
    id: "3-1",
    actualProductionRecordNumber: "001",
    actualQuantity: "25 cases",
    lotCode: "LOT-2025-003",
    supplierLotCode: "SUP-LOT-003",
    expiryDate: "2026-04-20",
    palletNumber: "PAL-003",
    note: "High volume batch for major customer order",
    expandedContent: () => (
      <Box style={{ paddingLeft: "298px" }}>
        <Table
          columns={consumptionTableColumns}
          rows={materialsData1}
          keyField="item"
          compact={true}
          rowBorder={true}
          className="subcomponent-consumption-record-table"
        />
      </Box>
    ),
  },
];

export const nestedTableData4: NestedTableRow[] = [
  {
    id: "4-1",
    actualProductionRecordNumber: "001",
    actualQuantity: "0 cases",
    lotCode: "LOT-2025-004",
    supplierLotCode: "SUP-LOT-004",
    expiryDate: "2026-08-08",
    palletNumber: "PAL-004",
    note: "Equipment maintenance - no production",
  },
];

export const nestedTableData5: NestedTableRow[] = [
  {
    id: "5-1",
    actualProductionRecordNumber: "001",
    actualQuantity: "8 cases",
    lotCode: "LOT-2025-005A",
    supplierLotCode: "SUP-LOT-005A",
    expiryDate: "2026-05-15",
    palletNumber: "PAL-005A",
    note: "First part of split batch production",
    expandedContent: () => (
      <Box style={{ paddingLeft: "298px" }}>
        <Table
          columns={consumptionTableColumns}
          rows={materialsData5A}
          keyField="item"
          compact={true}
          rowBorder={true}
          className="subcomponent-consumption-record-table"
        />
      </Box>
    ),
  },
  {
    id: "5-2",
    actualProductionRecordNumber: "002",
    actualQuantity: "4 cases",
    lotCode: "LOT-2025-005B",
    supplierLotCode: "SUP-LOT-005B",
    expiryDate: "2026-05-15",
    palletNumber: "PAL-005B",
    note: "Second part of split batch production",
    expandedContent: () => (
      <Box style={{ paddingLeft: "298px" }}>
        <Table
          columns={consumptionTableColumns}
          rows={materialsData5B}
          keyField="item"
          compact={true}
          rowBorder={true}
          className="subcomponent-consumption-record-table"
        />
      </Box>
    ),
  },
];

export const nestedTableData6: NestedTableRow[] = [
  {
    id: "6-1",
    actualProductionRecordNumber: "001",
    actualQuantity: "10 cases",
    lotCode: "LOT-2025-006A",
    supplierLotCode: "SUP-LOT-006A",
    expiryDate: "2026-04-22",
    palletNumber: "PAL-006A",
    note: "First part of partial batch",
    expandedContent: () => (
      <Box style={{ paddingLeft: "298px" }}>
        <Table
          columns={consumptionTableColumns}
          rows={materialsData6A}
          keyField="item"
          compact={true}
          rowBorder={true}
          className="subcomponent-consumption-record-table"
        />
      </Box>
    ),
  },
  {
    id: "6-2",
    actualProductionRecordNumber: "002",
    actualQuantity: "5 cases",
    lotCode: "LOT-2025-006B",
    supplierLotCode: "SUP-LOT-006B",
    expiryDate: "2026-04-22",
    palletNumber: "PAL-006B",
    note: "Second part with quality issues",
    expandedContent: () => (
      <Box style={{ paddingLeft: "298px" }}>
        <Table
          columns={consumptionTableColumns}
          rows={materialsData6B}
          keyField="item"
          compact={true}
          rowBorder={true}
          className="subcomponent-consumption-record-table"
        />
      </Box>
    ),
  },
];

export const nestedTableData7: NestedTableRow[] = [
  {
    id: "7-1",
    actualProductionRecordNumber: "001",
    actualQuantity: "0 cases",
    lotCode: "LOT-2025-007A",
    supplierLotCode: "SUP-LOT-007A",
    expiryDate: "2026-06-10",
    palletNumber: "PAL-007A",
    note: "Production on hold - awaiting materials",
    expandedContent: () => (
      <Box style={{ paddingLeft: "298px" }}>
        <Table
          columns={consumptionTableColumns}
          rows={materialsData7A}
          keyField="item"
          compact={true}
          rowBorder={true}
          className="subcomponent-consumption-record-table"
        />
      </Box>
    ),
  },
];

export const nestedTableData8: NestedTableRow[] = [
  {
    id: "8-1",
    actualProductionRecordNumber: "001",
    actualQuantity: "20 cases",
    lotCode: "LOT-2025-008",
    supplierLotCode: "SUP-LOT-008",
    expiryDate: "2026-01-31",
    palletNumber: "PAL-008",
    note: "Special order for premium customer",
    expandedContent: () => (
      <Box style={{ paddingLeft: "298px" }}>
        <Table
          columns={consumptionTableColumns}
          rows={materialsData1}
          keyField="item"
          compact={true}
          rowBorder={true}
          className="subcomponent-consumption-record-table"
        />
      </Box>
    ),
  },
];
