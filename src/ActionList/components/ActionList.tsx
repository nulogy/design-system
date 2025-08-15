import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export type ActionListProps = DropdownMenu.DropdownMenuProps;

export default function ActionList(props: ActionListProps) {
  return <DropdownMenu.Root {...props} />;
}
