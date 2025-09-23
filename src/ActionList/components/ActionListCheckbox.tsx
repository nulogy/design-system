import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Icon } from "../../Icon";

export type ActionListCheckboxProps = DropdownMenu.DropdownMenuCheckboxItemProps;

const ActionListCheckbox = React.forwardRef<HTMLDivElement, ActionListCheckboxProps>(({ children, ...props }, ref) => {
  return (
    <DropdownMenu.CheckboxItem {...props} ref={ref}>
      <DropdownMenu.ItemIndicator className="DropdownMenuItemIndicator">
        <Icon icon="check" />
      </DropdownMenu.ItemIndicator>
      {children}
    </DropdownMenu.CheckboxItem>
  );
});

ActionListCheckbox.displayName = "ActionListCheckbox";

export default ActionListCheckbox;
