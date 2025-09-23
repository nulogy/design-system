import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export type ActionSubListProps = DropdownMenu.DropdownMenuSubProps;

function ActionSubList({ children, ...props }: ActionSubListProps) {
  return <DropdownMenu.Sub {...props}>{children}</DropdownMenu.Sub>;
}

export default ActionSubList;
