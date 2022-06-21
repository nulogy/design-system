import React from "react";

export type TriggerFunctionProps = {
  mode: "mobile" | "desktop";
  isOpen?: boolean;
  closeMenu?: any;
  openMenu?: any;
  defaultRender: () => React.ReactNode;
};
