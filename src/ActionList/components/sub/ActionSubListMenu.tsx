import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styled from "styled-components";

export type ActionSubListMenuProps = DropdownMenu.DropdownMenuSubContentProps;

function ActionSubListMenu({ children, ...props }: ActionSubListMenuProps) {
  return (
    <DropdownMenu.Portal>
      <ActionSubListContent sideOffset={2} alignOffset={-5} {...props}>
        {children}
      </ActionSubListContent>
    </DropdownMenu.Portal>
  );
}

const ActionSubListContent = styled(DropdownMenu.SubContent)(({ theme }) => ({
  minWidth: `calc(${theme.space.x8} * 2)`,
  backgroundColor: "white",
  borderRadius: theme.radii.medium,
  padding: theme.space.half,
  boxShadow: theme.shadows.medium,
}));

export default ActionSubListMenu;
