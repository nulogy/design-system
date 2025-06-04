import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import ActionListLabel from "./ActionListLabel";

export interface ActionListSectionProps extends DropdownMenu.DropdownMenuGroupProps {
  title?: string;
}

const ActionListSection = React.forwardRef<HTMLDivElement, ActionListSectionProps>(
  ({ title, children, ...props }, ref) => {
    return (
      <DropdownMenu.Group {...props} ref={ref}>
        {title && <ActionListLabel>{title}</ActionListLabel>}
        {children}
      </DropdownMenu.Group>
    );
  }
);

ActionListSection.displayName = "ActionListSection";

export default ActionListSection;
