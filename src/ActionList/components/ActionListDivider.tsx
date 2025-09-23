import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useTheme } from "styled-components";

export type ActionListDividerProps = DropdownMenu.DropdownMenuSeparatorProps;

const ActionListDivider = React.forwardRef<HTMLDivElement, ActionListDividerProps>(({ ...props }, ref) => {
  const theme = useTheme();

  const styles = `
    height: 1px;
    background-color: ${theme.colors.lightGrey};
    margin-top: ${theme.space.x1};
    margin-bottom: ${theme.space.x1};
  `;

  return <DropdownMenu.Separator css={styles} {...props} ref={ref} />;
});

ActionListDivider.displayName = "ActionListDivider";

export default ActionListDivider;
