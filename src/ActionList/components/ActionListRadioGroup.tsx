import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export type ActionListRadioGroupProps = DropdownMenu.DropdownMenuRadioGroupProps;

function ActionListRadioGroup({ children, ...props }: ActionListRadioGroupProps) {
  return <DropdownMenu.RadioGroup {...props}>{children}</DropdownMenu.RadioGroup>;
}

export default ActionListRadioGroup;
