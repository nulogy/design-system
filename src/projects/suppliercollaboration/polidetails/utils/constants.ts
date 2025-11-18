// Card configuration constants
export const CARD_CONFIG = {
  WIDTH: 480,
  GAP_WIDTH: 16,
  EFFECTIVE_GAP_WIDTH: 14, // GAP_WIDTH - 2 for border overlap
  BORDER_WIDTH: 2,
} as const;

// Table column configuration
export const TABLE_COLUMNS = [
  {
    label: "",
    dataKey: "rowLabel",
    width: "20%",
  },
  {
    label: "Quantity",
    dataKey: "quantity",
    width: "5%",
  },
  {
    label: "UOM",
    dataKey: "uom",
    width: "10%",
  },
  {
    label: "Due date",
    dataKey: "dueDate",
    width: "10%",
  },
  {
    label: "Unit price",
    dataKey: "unitPrice",
    width: "5%",
  },
  {
    label: "Currency",
    dataKey: "currency",
    width: "10%",
  },
  {
    label: "Reason",
    dataKey: "reason",
    width: "15%",
  },
  {
    label: "Note",
    dataKey: "note",
    width: "25%",
  },
] as const;

// Default form values
export const DEFAULT_FORM_VALUES = {
  QUANTITY: "100",
  UOM: "cases",
  UNIT_PRICE: "2.99",
  CURRENCY: "USD",
  REASON: "Material shortage",
  NOTE: "Initial proposal.",
} as const;

// Status types
export const STATUS_TYPES = {
  AWAITING: "awaiting",
  ACCEPTED: "accepted",
} as const;

// User roles
export const USER_ROLES = {
  SUPPLIER: "supplier",
  CUSTOMER: "customer",
} as const;

// View modes
export const VIEW_MODES = {
  ALL: "all",
  MINIMAL: "minimal",
} as const;

// Card types
export const CARD_TYPES = {
  REGULAR: "regular",
  ACTIVE: "active",
  ACCEPTED: "accepted",
  NEW: "new",
} as const;

// Row types
export const ROW_TYPES = {
  REGULAR: "regular",
  ACTIVE: "active",
  ACCEPTED: "accepted",
} as const;

// CSS class names
export const CSS_CLASSES = {
  TABLE_ROW_REGULAR: "table-row-regular",
  TABLE_ROW_ACTIVE_USER_ACTION: "table-row-active-user-action",
  TABLE_ROW_ACTIVE_USER_WAITING: "table-row-active-user-waiting",
} as const;

// Sample data
export const SAMPLE_DATA = {
  ORIGINAL_REQUEST: {
    quantity: "90",
    uom: "cases",
    dueDate: "2023-12-20",
    unitPrice: "$2.80",
    currency: "USD",
    reason: "Initial order",
    note: "Original customer request",
  },
  SUPPLIER_PROPOSAL_1: {
    quantity: "95",
    uom: "cases",
    dueDate: "2023-12-25",
    unitPrice: "$2.85",
    currency: "USD",
    reason: "Material availability",
    note: "Initial supplier response",
  },
  CUSTOMER_COUNTER_1: {
    quantity: "100",
    uom: "cases",
    dueDate: "2023-12-28",
    unitPrice: "$2.90",
    currency: "USD",
    reason: "Volume discount",
    note: "Requested quantity increase",
  },
  SUPPLIER_PROPOSAL_2: {
    quantity: "100",
    uom: "cases",
    dueDate: "2023-12-30",
    unitPrice: "$2.88",
    currency: "USD",
    reason: "Price negotiation",
    note: "Compromise on pricing",
  },
  CURRENT_PROPOSAL: {
    quantity: "100",
    uom: "cases",
    dueDate: "2024-01-01",
    unitPrice: "$2.99",
    currency: "USD",
    reason: "Material shortage",
    note: "Initial proposal.",
  },
} as const;
