import React from "react";

export type TriggerFunctionProps = {
  size: "small" | "medium";
  isOpen?: boolean;
  closeMenu?: any;
  openMenu?: any;
  defaultRender: () => React.ReactNode;
  layer: number;
};
