import React from "react";

/** @deprecated The BrandedNavBar component is deprecated. Use the Navigation component instead. */
export type TriggerFunctionProps = {
  size: "small" | "medium";
  isOpen?: boolean;
  closeMenu?: any;
  openMenu?: any;
  defaultRender: () => React.ReactNode;
  layer: number;
};
