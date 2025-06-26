import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export type ActionSubListButtonProps = DropdownMenu.DropdownMenuSubTriggerProps;

function ActionSubListButton({ children, ...props }: ActionSubListButtonProps) {
  return <DropdownMenu.SubTrigger {...props}>{children}</DropdownMenu.SubTrigger>;
}

export default ActionSubListButton;
