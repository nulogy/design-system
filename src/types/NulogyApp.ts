export type NulogyAppName =
  | "production-scheduling"
  | "supplier-collaboration"
  | "digital-quality-inspection"
  | "shop-floor"
  | "smart-factory"
  | "connections"
  | "data";

export const APP_ABBREVIATIONS: Record<NulogyAppName, string> = {
  "production-scheduling": "PS",
  "supplier-collaboration": "SC",
  "digital-quality-inspection": "DQI",
  "shop-floor": "SF",
  "smart-factory": "SFac",
  connections: "CN",
  data: "Data",
} as const;

export const APP_DISPLAY_NAMES: Record<NulogyAppName, string> = {
  "production-scheduling": "Production Scheduling",
  "supplier-collaboration": "Supplier Collaboration",
  "digital-quality-inspection": "Digital Quality Inspection",
  "shop-floor": "Shop Floor",
  "smart-factory": "Smart Factory",
  connections: "Connections",
  data: "Data",
} as const;
