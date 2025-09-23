import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import ActionListLabel from "./ActionListLabel";

export interface ActionListGroupProps extends DropdownMenu.DropdownMenuGroupProps {
  title?: string;
}

const ActionListGroup = React.forwardRef<HTMLDivElement, ActionListGroupProps>(({ title, children, ...props }, ref) => {
  return (
    <DropdownMenu.Group {...props} ref={ref}>
      {title && <ActionListLabel>{title}</ActionListLabel>}
      {children}
    </DropdownMenu.Group>
  );
});

ActionListGroup.displayName = "ActionListSection";

export default ActionListGroup;
