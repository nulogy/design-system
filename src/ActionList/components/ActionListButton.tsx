import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export interface ActionListButtonProps extends DropdownMenu.DropdownMenuTriggerProps {
  renderAsFragment?: boolean;
}

const ActionListButton = React.forwardRef<HTMLButtonElement, ActionListButtonProps>(
  ({ renderAsFragment = false, ...props }, ref) => {
    return <DropdownMenu.Trigger asChild={renderAsFragment} {...props} ref={ref} />;
  }
);

ActionListButton.displayName = "ActionListButton";

export default ActionListButton;
