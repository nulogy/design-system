import React from "react";
import { Box, Table, Flex, Text, Tooltip, TruncatedText } from "../../../..";
import { ColumnType, CellInfoType } from "../../../../Table/Table.types";

// Materials data for consumption reports
export const materialsData1 = [
  {
    subcomponentConsumptionRecordItem: "001",
    item: "Acetaminophen 500mg",
    lotCode: "LOT-ACET-001",
    expiryDate: "2026-03-15",
    palletNumber: "PAL-001",
    quantity: "2.5",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "002",
    item: "Microcrystalline cellulose",
    lotCode: "LOT-MCC-001",
    expiryDate: "2026-04-20",
    palletNumber: "PAL-002",
    quantity: "1.2",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "003",
    item: "Croscarmellose sodium",
    lotCode: "LOT-CCS-001",
    expiryDate: "2026-05-10",
    palletNumber: "PAL-003",
    quantity: "0.3",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "004",
    item: "Magnesium stearate",
    lotCode: "LOT-MS-001",
    expiryDate: "2026-06-15",
    palletNumber: "PAL-004",
    quantity: "0.1",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "005",
    item: "Talc",
    lotCode: "LOT-TALC-001",
    expiryDate: "2026-07-20",
    palletNumber: "PAL-005",
    quantity: "0.05",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "006",
    item: "Colloidal silicon dioxide",
    lotCode: "LOT-CSD-001",
    expiryDate: "2026-08-25",
    palletNumber: "PAL-006",
    quantity: "0.02",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "007",
    item: "Povidone K30",
    lotCode: "LOT-PV-001",
    expiryDate: "2026-09-30",
    palletNumber: "PAL-007",
    quantity: "0.15",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "008",
    item: "Sodium starch glycolate",
    lotCode: "LOT-SSG-001",
    expiryDate: "2026-10-05",
    palletNumber: "PAL-008",
    quantity: "0.08",
    uom: "kg",
  },
];

export const materialsData2 = [
  {
    subcomponentConsumptionRecordItem: "001",
    item: "Ibuprofen 400mg",
    lotCode: "LOT-IBU-001",
    expiryDate: "2026-11-10",
    palletNumber: "PAL-009",
    quantity: "3.0",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "002",
    item: "Lactose monohydrate",
    lotCode: "LOT-LM-001",
    expiryDate: "2026-12-15",
    palletNumber: "PAL-010",
    quantity: "1.8",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "003",
    item: "Pregelatinized starch",
    lotCode: "LOT-PS-001",
    expiryDate: "2027-01-20",
    palletNumber: "PAL-011",
    quantity: "0.4",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "004",
    item: "Stearic acid",
    lotCode: "LOT-SA-001",
    expiryDate: "2027-02-25",
    palletNumber: "PAL-012",
    quantity: "0.12",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "005",
    item: "Hydroxypropyl methylcellulose",
    lotCode: "LOT-HPMC-001",
    expiryDate: "2027-03-30",
    palletNumber: "PAL-013",
    quantity: "0.25",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "006",
    item: "Titanium dioxide",
    lotCode: "LOT-TD-001",
    expiryDate: "2027-04-05",
    palletNumber: "PAL-014",
    quantity: "0.03",
    uom: "kg",
  },
];

export const materialsData5A = [
  {
    subcomponentConsumptionRecordItem: "001",
    item: "Aspirin 325mg",
    lotCode: "LOT-ASP-001",
    expiryDate: "2026-05-15",
    palletNumber: "PAL-015",
    quantity: "4.0",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "002",
    item: "Corn starch",
    lotCode: "LOT-CS-001",
    expiryDate: "2026-06-20",
    palletNumber: "PAL-016",
    quantity: "2.0",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "003",
    item: "Calcium carbonate",
    lotCode: "LOT-CC-001",
    expiryDate: "2026-07-25",
    palletNumber: "PAL-017",
    quantity: "0.5",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "004",
    item: "Carnauba wax",
    lotCode: "LOT-CW-001",
    expiryDate: "2026-08-30",
    palletNumber: "PAL-018",
    quantity: "0.08",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "005",
    item: "FD&C Yellow No. 6",
    lotCode: "LOT-FD6-001",
    expiryDate: "2026-09-05",
    palletNumber: "PAL-019",
    quantity: "0.01",
    uom: "kg",
  },
];

export const materialsData5B = [
  {
    subcomponentConsumptionRecordItem: "001",
    item: "Naproxen sodium 220mg",
    lotCode: "LOT-NAP-001",
    expiryDate: "2026-10-10",
    palletNumber: "PAL-020",
    quantity: "3.5",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "002",
    item: "Dibasic calcium phosphate",
    lotCode: "LOT-DCP-001",
    expiryDate: "2026-11-15",
    palletNumber: "PAL-021",
    quantity: "1.5",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "003",
    item: "Sodium lauryl sulfate",
    lotCode: "LOT-SLS-001",
    expiryDate: "2026-12-20",
    palletNumber: "PAL-022",
    quantity: "0.2",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "004",
    item: "Opadry II",
    lotCode: "LOT-OP2-001",
    expiryDate: "2027-01-25",
    palletNumber: "PAL-023",
    quantity: "0.15",
    uom: "kg",
  },
];

export const materialsData6A = [
  {
    subcomponentConsumptionRecordItem: "001",
    item: "Metformin HCl 500mg",
    lotCode: "LOT-MET-001",
    expiryDate: "2026-08-15",
    palletNumber: "PAL-024",
    quantity: "5.0",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "002",
    item: "Povidone K90",
    lotCode: "LOT-PV90-001",
    expiryDate: "2026-09-20",
    palletNumber: "PAL-025",
    quantity: "0.8",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "003",
    item: "Sodium carboxymethylcellulose",
    lotCode: "LOT-SCMC-001",
    expiryDate: "2026-10-25",
    palletNumber: "PAL-026",
    quantity: "0.3",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "004",
    item: "Polysorbate 80",
    lotCode: "LOT-P80-001",
    expiryDate: "2026-11-30",
    palletNumber: "PAL-027",
    quantity: "0.05",
    uom: "kg",
  },
];

export const materialsData6B = [
  {
    subcomponentConsumptionRecordItem: "001",
    item: "Glipizide 5mg",
    lotCode: "LOT-GLP-001",
    expiryDate: "2026-12-05",
    palletNumber: "PAL-028",
    quantity: "0.5",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "002",
    item: "Lactose anhydrous",
    lotCode: "LOT-LA-001",
    expiryDate: "2027-01-10",
    palletNumber: "PAL-029",
    quantity: "2.2",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "003",
    item: "Croscarmellose sodium",
    lotCode: "LOT-CCS-002",
    expiryDate: "2027-02-15",
    palletNumber: "PAL-030",
    quantity: "0.4",
    uom: "kg",
  },
];

export const materialsData7A = [
  {
    subcomponentConsumptionRecordItem: "001",
    item: "Omeprazole 20mg",
    lotCode: "LOT-OME-001",
    expiryDate: "2026-09-15",
    palletNumber: "PAL-031",
    quantity: "2.0",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "002",
    item: "Mannitol",
    lotCode: "LOT-MAN-001",
    expiryDate: "2026-10-20",
    palletNumber: "PAL-032",
    quantity: "1.5",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "003",
    item: "Hydroxypropyl cellulose",
    lotCode: "LOT-HPC-001",
    expiryDate: "2026-11-25",
    palletNumber: "PAL-033",
    quantity: "0.3",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "004",
    item: "Sodium hydroxide",
    lotCode: "LOT-SH-001",
    expiryDate: "2026-12-30",
    palletNumber: "PAL-034",
    quantity: "0.02",
    uom: "kg",
  },
];

export const materialsData7B = [
  // Base materials (8 items)
  {
    subcomponentConsumptionRecordItem: "001",
    item: "Lansoprazole 30mg",
    lotCode: "LOT-LAN-001",
    expiryDate: "2027-01-05",
    palletNumber: "PAL-035",
    quantity: "1.8",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "002",
    item: "Sucrose",
    lotCode: "LOT-SUC-001",
    expiryDate: "2027-02-10",
    palletNumber: "PAL-036",
    quantity: "1.2",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "003",
    item: "Gelatin",
    lotCode: "LOT-GEL-001",
    expiryDate: "2027-03-15",
    palletNumber: "PAL-037",
    quantity: "0.4",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "004",
    item: "Talc",
    lotCode: "LOT-TALC-002",
    expiryDate: "2027-04-20",
    palletNumber: "PAL-038",
    quantity: "0.06",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "005",
    item: "Titanium dioxide",
    lotCode: "LOT-TD-002",
    expiryDate: "2027-05-25",
    palletNumber: "PAL-039",
    quantity: "0.04",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "006",
    item: "FD&C Blue No. 1",
    lotCode: "LOT-FD1-001",
    expiryDate: "2027-06-30",
    palletNumber: "PAL-040",
    quantity: "0.01",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "007",
    item: "Iron oxide red",
    lotCode: "LOT-IOR-001",
    expiryDate: "2027-07-05",
    palletNumber: "PAL-041",
    quantity: "0.005",
    uom: "kg",
  },
  {
    subcomponentConsumptionRecordItem: "008",
    item: "Iron oxide yellow",
    lotCode: "LOT-IOY-001",
    expiryDate: "2027-08-10",
    palletNumber: "PAL-042",
    quantity: "0.005",
    uom: "kg",
  },
];

// Reusable Consumption Report Component
export const ConsumptionReport = ({
  materials,
  parentData,
}: {
  materials: Array<{
    subcomponentConsumptionRecordItem: string;
    item: string;
    lotCode: string;
    expiryDate: string;
    palletNumber: string;
    quantity: string;
    uom: string;
  }>;
  parentData?: { date: string; actualQuantity: string };
}) => {
  const isEmpty = materials.length === 0;

  const consumptionTableColumns = [
    {
      label: "#",
      dataKey: "subcomponentConsumptionRecordItem",
      width: "3em",
      cellRenderer: ({ row }: { row: any }) => (
        <Flex py="x0_75" mr="x1" pl="half" display="flex" justifyContent="flex-start">
          <Tooltip
            tooltip={`Subcomponent consumption record #${row.subcomponentConsumptionRecordItem}`}
            placement="left"
          >
            <Flex backgroundColor="lightGrey" px="half" borderRadius="small" flexShrink={0}>
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
            </Flex>
          </Tooltip>
        </Flex>
      ),
    },
    {
      label: "Item",
      dataKey: "item",
      width: "auto",
      headerFormatter: (column: ColumnType<unknown>) => (
        <Text fontSize="small" lineHeight="smallCompressed" fontWeight="bold">
          {column.label}
        </Text>
      ),
      cellFormatter: (cell: CellInfoType<unknown>) => (
        <Text fontSize="small" lineHeight="smallCompressed">
          {cell.cellData}
        </Text>
      ),
    },
    {
      label: "Lot Code",
      dataKey: "lotCode",
      width: "auto",
      headerFormatter: (column: ColumnType<unknown>) => (
        <Text fontSize="small" lineHeight="smallCompressed" fontWeight="bold">
          {column.label}
        </Text>
      ),
      cellFormatter: (cell: CellInfoType<unknown>) => (
        <Text fontSize="small" lineHeight="smallCompressed">
          {cell.cellData}
        </Text>
      ),
    },
    {
      label: "Expiry Date",
      dataKey: "expiryDate",
      width: "auto",
      headerFormatter: (column: ColumnType<unknown>) => (
        <Text fontSize="small" lineHeight="smallCompressed" fontWeight="bold">
          {column.label}
        </Text>
      ),
      cellFormatter: (cell: CellInfoType<unknown>) => (
        <Text fontSize="small" lineHeight="smallCompressed">
          {cell.cellData}
        </Text>
      ),
    },
    {
      label: "Pallet Number",
      dataKey: "palletNumber",
      width: "auto",
      headerFormatter: (column: ColumnType<unknown>) => (
        <Text fontSize="small" lineHeight="smallCompressed" fontWeight="bold">
          {column.label}
        </Text>
      ),
      cellFormatter: (cell: CellInfoType<unknown>) => (
        <Text fontSize="small" lineHeight="smallCompressed">
          {cell.cellData}
        </Text>
      ),
    },
    {
      label: "Quantity",
      dataKey: "quantity",
      width: "auto",
      headerFormatter: (column: ColumnType<unknown>) => (
        <Text fontSize="small" lineHeight="smallCompressed" fontWeight="bold">
          {column.label}
        </Text>
      ),
      cellFormatter: (cell: CellInfoType<unknown>) => (
        <Text fontSize="small" lineHeight="smallCompressed">
          {cell.cellData}
        </Text>
      ),
    },
    {
      label: "UoM",
      dataKey: "uom",
      width: "auto",
      headerFormatter: (column: ColumnType<unknown>) => (
        <Text fontSize="small" lineHeight="smallCompressed" fontWeight="bold">
          {column.label}
        </Text>
      ),
      cellFormatter: (cell: CellInfoType<unknown>) => (
        <Text fontSize="small" lineHeight="smallCompressed">
          {cell.cellData}
        </Text>
      ),
    },
  ];

  return (
    <Box pt="x2" pb="x1">
      <Flex backgroundColor="whiteGrey" px="x2" py="x1" mb="x1" borderRadius="small">
        <Text fontSize="small" fontWeight="bold" lineHeight="smallCompact">
          Subcomponent consumption{" "}
          <Text as="span" color="midGrey" mx="x1">
            &bull;
          </Text>{" "}
          <Text as="span" color="midGrey" fontSize="small" lineHeight="smallCompact" fontWeight="normal">
            BOM revision 2.1
          </Text>
        </Text>
      </Flex>
      {isEmpty ? (
        <Box py="x4" textAlign="center">
          <Text color="midGrey" fontSize="small">
            No consumption data available
          </Text>
        </Box>
      ) : (
        <Box mx="x1">
          <Table
            columns={consumptionTableColumns as any}
            rows={materials}
            keyField="item"
            compact={true}
            rowBorder={true}
            className="subcomponent-consumption-record-table"
          />
        </Box>
      )}
    </Box>
  );
};

// Nested table data for each expandable row
export const nestedTableData1 = [
  {
    id: "1-1",
    actualProductionRecordNumber: "01",
    actualQuantity: "5 cases",
    lotCode: "LOT-2025-001",
    supplierLotCode: "SUP-LOT-001",
    expiryDate: "2026-Feb-12",
    palletNumber: "PAL-001",
    note: "Initial production batch with quality control checks completed",
    expandedContent: () => (
      <ConsumptionReport materials={materialsData1} parentData={{ date: "2025-Feb-12", actualQuantity: "5 cases" }} />
    ),
  },
  {
    id: "1-2",
    actualProductionRecordNumber: "002",
    actualQuantity: "3 cases",
    lotCode: "LOT-2025-001",
    supplierLotCode: "SUP-LOT-001",
    expiryDate: "2026-Feb-12",
    palletNumber: "PAL-001",
    note: "Additional batch from same production run",
    expandedContent: () => (
      <ConsumptionReport materials={materialsData2} parentData={{ date: "2025-Feb-12", actualQuantity: "5 cases" }} />
    ),
  },
  {
    id: "1-3",
    actualProductionRecordNumber: "0003",
    actualQuantity: "0 cases",
    lotCode: "LOT-2025-001",
    supplierLotCode: "SUP-LOT-001",
    expiryDate: "2026-Feb-12",
    palletNumber: "PAL-001",
    note: "Final batch completion",
    expandedContent: () => (
      <ConsumptionReport materials={materialsData1} parentData={{ date: "2025-Feb-12", actualQuantity: "3 cases" }} />
    ),
  },
];

export const nestedTableData2 = [
  {
    id: "2-1",
    actualProductionRecordNumber: "001",
    actualQuantity: "12 cases",
    lotCode: "LOT-2025-002",
    supplierLotCode: "SUP-LOT-002",
    expiryDate: "2026-03-15",
    palletNumber: "PAL-002",
    note: "Standard production run with normal quality metrics",
    expandedContent: () => (
      <ConsumptionReport materials={materialsData1} parentData={{ date: "2025-Mar-15", actualQuantity: "12 cases" }} />
    ),
  },
];

export const nestedTableData3 = [
  {
    id: "3-1",
    actualProductionRecordNumber: "001",
    actualQuantity: "25 cases",
    lotCode: "LOT-2025-003",
    supplierLotCode: "SUP-LOT-003",
    expiryDate: "2026-04-15",
    palletNumber: "PAL-003",
    note: "Third production run with minor adjustments",
    expandedContent: () => (
      <ConsumptionReport materials={materialsData1} parentData={{ date: "2025-Apr-20", actualQuantity: "25 cases" }} />
    ),
  },
];

export const nestedTableData4 = [
  {
    id: "4-1",
    actualProductionRecordNumber: "001",
    actualQuantity: "0 cases",
    lotCode: "LOT-2025-004",
    supplierLotCode: "SUP-LOT-004",
    expiryDate: "2026-08-08",
    palletNumber: "PAL-004",
    note: "Fourth production run with no actual quantity produced",
    expandedContent: () => (
      <ConsumptionReport materials={[]} parentData={{ date: "2025-Aug-08", actualQuantity: "0 cases" }} />
    ),
  },
];

export const nestedTableData5 = [
  {
    id: "5-1",
    actualProductionRecordNumber: "01",
    actualQuantity: "8 cases",
    lotCode: "LOT-2025-005",
    supplierLotCode: "SUP-LOT-005",
    expiryDate: "2026-09-15",
    palletNumber: "PAL-005",
    note: "Fifth production run with full quantity produced",
    expandedContent: () => (
      <ConsumptionReport materials={materialsData5A} parentData={{ date: "2025-May-15", actualQuantity: "8 cases" }} />
    ),
  },
  {
    id: "5-2",
    actualProductionRecordNumber: "002",
    actualQuantity: "4 cases",
    lotCode: "LOT-2025-005",
    supplierLotCode: "SUP-LOT-005",
    expiryDate: "2026-09-15",
    palletNumber: "PAL-005",
    note: "Additional batch from same production run",
    expandedContent: () => (
      <ConsumptionReport materials={materialsData5B} parentData={{ date: "2025-May-15", actualQuantity: "4 cases" }} />
    ),
  },
];

export const nestedTableData6 = [
  {
    id: "6-1",
    actualProductionRecordNumber: "01",
    actualQuantity: "10 cases",
    lotCode: "LOT-2025-006",
    supplierLotCode: "SUP-LOT-006",
    expiryDate: "2026-10-20",
    palletNumber: "PAL-006A",
    note: "Sixth production run with full quantity produced",
    expandedContent: () => (
      <ConsumptionReport materials={materialsData6A} parentData={{ date: "2025-Apr-22", actualQuantity: "10 cases" }} />
    ),
  },
  {
    id: "6-2",
    actualProductionRecordNumber: "002",
    actualQuantity: "0 cases",
    lotCode: "LOT-2025-006",
    supplierLotCode: "SUP-LOT-006",
    expiryDate: "2026-10-20",
    palletNumber: "PAL-006B",
    note: "Partial batch with quality issues",
    expandedContent: () => <ConsumptionReport materials={materialsData6B} />,
  },
];

export const nestedTableData7 = [
  {
    id: "7-1",
    actualProductionRecordNumber: "01",
    actualQuantity: "0 cases",
    lotCode: "LOT-2025-007",
    supplierLotCode: "SUP-LOT-007",
    expiryDate: "2026-11-25",
    palletNumber: "PAL-007A",
    note: "Production on hold - awaiting materials",
    expandedContent: () => <ConsumptionReport materials={materialsData7A} />,
  },
  {
    id: "7-2",
    actualProductionRecordNumber: "002",
    actualQuantity: "0 cases",
    lotCode: "LOT-2025-007",
    supplierLotCode: "SUP-LOT-007",
    expiryDate: "2026-11-25",
    palletNumber: "PAL-007B",
    note: "Production delayed due to equipment maintenance",
    expandedContent: () => <ConsumptionReport materials={materialsData7B} />,
  },
];

export const nestedTableData8 = [
  {
    id: "8-1",
    actualProductionRecordNumber: "001",
    actualQuantity: "5 cases",
    lotCode: "LOT-2025-008",
    supplierLotCode: "SUP-LOT-008",
    expiryDate: "2026-12-30",
    palletNumber: "PAL-008",
    note: "Special order for premium customer, expedited processing",
    expandedContent: () => <ConsumptionReport materials={materialsData1} />,
  },
];
