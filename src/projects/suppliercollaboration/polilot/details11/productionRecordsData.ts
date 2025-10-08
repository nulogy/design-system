// Production records data structure

export interface ProductionRecord {
  id: string;
  date: string;
  lotCodeAndExpiry?: string;
  customerLotCode: string;
  supplierLotCode: string;
  expiryDate: string;
  palletNumber: string;
  expectedQuantity: string;
  actualQuantity: string;
  note: string;
  expandedContent?: () => JSX.Element;
}

export const productionRecordsData: ProductionRecord[] = [
  {
    id: "1",
    date: "2025-Feb-12",
    lotCodeAndExpiry: "",
    customerLotCode: "LOT-2025-001",
    supplierLotCode: "SUP-LOT-001",
    expiryDate: "2026-Feb-12",
    palletNumber: "PAL-001",
    expectedQuantity: "18 cases",
    actualQuantity: "8 cases",
    note: "Initial production batch with quality control checks completed",
  },
  {
    id: "2",
    date: "2025-Mar-15",
    lotCodeAndExpiry: "LOT-2025-002",
    customerLotCode: "LOT-2025-002",
    supplierLotCode: "SUP-LOT-002",
    expiryDate: "2026-03-15",
    palletNumber: "PAL-002",
    expectedQuantity: "12 cases",
    actualQuantity: "12 cases",
    note: "Standard production run with normal quality metrics",
  },
  {
    id: "3",
    date: "2025-Apr-20",
    lotCodeAndExpiry: "LOT-2025-003",
    customerLotCode: "LOT-2025-003",
    supplierLotCode: "SUP-LOT-003",
    expiryDate: "2026-04-20",
    palletNumber: "PAL-003",
    expectedQuantity: "25 cases",
    actualQuantity: "25 cases",
    note: "High volume production batch for major customer order",
  },
  {
    id: "4",
    date: "2025-Aug-08",
    customerLotCode: "LOT-2025-004",
    supplierLotCode: "SUP-LOT-004",
    expiryDate: "2026-08-08",
    palletNumber: "PAL-004",
    expectedQuantity: "0 cases",
    actualQuantity: "0 cases",
    note: "Equipment maintenance scheduled, production line optimization in progress",
  },
  {
    id: "5",
    date: "2025-May-15",
    lotCodeAndExpiry: "LOT-2025-005",
    customerLotCode: "LOT-2025-005",
    supplierLotCode: "SUP-LOT-005",
    expiryDate: "2026-05-15",
    palletNumber: "PAL-005",
    expectedQuantity: "12 cases",
    actualQuantity: "12 cases",
    note: "Split batch production - two separate runs for quality control",
  },
  {
    id: "6",
    date: "2025-Apr-22",
    lotCodeAndExpiry: "LOT-2025-006",
    customerLotCode: "LOT-2025-006",
    supplierLotCode: "SUP-LOT-006",
    expiryDate: "2026-04-22",
    palletNumber: "PAL-006",
    expectedQuantity: "15 cases",
    actualQuantity: "15 cases",
    note: "Partial batch with quality issues identified during production",
  },
  {
    id: "7",
    date: "2025-Jun-10",
    lotCodeAndExpiry: "LOT-2025-007",
    customerLotCode: "LOT-2025-007",
    supplierLotCode: "SUP-LOT-007",
    expiryDate: "2026-06-10",
    palletNumber: "PAL-007",
    expectedQuantity: "0 cases",
    actualQuantity: "0 cases",
    note: "Production on hold - awaiting materials",
  },
  {
    id: "8",
    date: "2025-Jan-31",
    lotCodeAndExpiry: "LOT-2025-008",
    customerLotCode: "LOT-2025-008",
    supplierLotCode: "SUP-LOT-008",
    expiryDate: "2026-01-31",
    palletNumber: "PAL-008",
    expectedQuantity: "20 cases",
    actualQuantity: "20 cases",
    note: "Special order for premium customer, expedited processing",
  },
];
