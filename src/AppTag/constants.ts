import { NulogyAppName } from "../types/NulogyApp";
import { AppTagType, ColorName } from "./types";

export const APP_ABBREVIATIONS: Record<NulogyAppName, string> = {
  "production-scheduling": "PS",
  "supplier-collaboration": "SC",
  "digital-quality-inspection": "DQI",
  "shop-floor": "SF",
  "smart-factory": "SFac",
  connections: "CN",
};

export const APP_DISPLAY_NAMES: Record<NulogyAppName, string> = {
  "production-scheduling": "Production Scheduling",
  "supplier-collaboration": "Supplier Collaboration",
  "digital-quality-inspection": "Digital Quality Inspection",
  "shop-floor": "Shop Floor",
  "smart-factory": "Smart Factory",
  connections: "Connections",
};

export const appTagColors: Record<AppTagType, { primary: ColorName; secondary: ColorName }> = {
  active: {
    primary: "darkGrey",
    secondary: "lightGrey",
  },
  inactive: {
    primary: "midGrey",
    secondary: "whiteGrey",
  },
  interactive: {
    primary: "blue",
    secondary: "lightBlue",
  },
};
