import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export type ActionListLabelProps = DropdownMenu.DropdownMenuLabelProps;

export default function ActionListLabel(props: ActionListLabelProps) {
  return <DropdownMenu.Label {...props} />;
}
