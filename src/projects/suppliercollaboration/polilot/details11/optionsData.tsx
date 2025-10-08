// Simple options data for dropdowns and selects

export const uomOptions = [
  { label: "Cases (cs)", value: "cs" },
  { label: "Pieces (pcs)", value: "pcs" },
  { label: "Kilograms (kg)", value: "kg" },
  { label: "Pounds (lbs)", value: "lbs" },
  { label: "Meters (m)", value: "m" },
  { label: "Feet (ft)", value: "ft" },
];

export const unitOptions = [
  { label: "kg", value: "kg" },
  { label: "g", value: "g" },
  { label: "mg", value: "mg" },
  { label: "lbs", value: "lbs" },
  { label: "oz", value: "oz" },
  { label: "ml", value: "ml" },
  { label: "l", value: "l" },
];

export const detailsData = {
  poNumber: "PO-2025-001",
  customerPoLineItem: "PLI-001",
  supplierPoLineItem: "SPLI-001",
  createdOn: "2025-Jan-15",
  supplier: "Global Manufacturing Co.",
  customerItemCode: "ITEM-001 – Premium Packaging Solution",
  supplierItemCode: "GMC-001",
  priority: "2 - Medium",
  itemOrderType: "Standard",
  customerLotCode: "LOT-2025-001",
  supplierLotCode: "GMC-LOT-001",
  expiryDate: "2026-01-15",
  bomRevision: "Rev 1.2 – 2025-Jan-10",
  productionStartDate: "2025-Feb-01",
  shipTo: "Global Manufacturing Co. Distribution Center",
  needByDate: "2025-Feb-15",
};

export const userState = { role: "supplier" };

export const collaborationState = {
  status: "awaiting",
  activeCardAuthorRole: "customer",
};

export const acceptedItems = { request: false, proposal: false };

export const poStatus = "On time";

export const editFormData = {
  supplierPOLineItemNumber: "SPLI-001",
  bomRevision: "Rev 1.2 – 2025-Jan-10",
  needByDate: new Date("2025-02-15"),
  carryOverSentTo: "",
};

export const productionRecord = {
  date: "",
  uom: "",
  expectedQuantity: "",
  actualQuantity: "",
  lotCode: "",
  supplierLotCode: "",
  expiryDate: "",
  palletNumber: "",
  producedQuantity: "",
  note: "",
};

export const fieldConfig = {
  lotCodeRequired: true,
  palletNumberRequired: true,
  expiryDateRequired: true,
  sanofiRequired: true,
};
