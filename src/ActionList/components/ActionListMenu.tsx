import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useTheme } from "styled-components";

export type ActionListMenuProps = DropdownMenu.DropdownMenuContentProps;

const ActionListMenu = React.forwardRef<HTMLDivElement, ActionListMenuProps>(({ children, ...props }, ref) => {
  const theme = useTheme();

  const styles = `
    minWidth: 300px;
    background: ${theme.colors.white};
    color: ${theme.colors.darkGrey};
    border-radius: ${theme.radii.medium};
    box-shadow: ${theme.shadows.medium};
    padding-right: ${theme.space.x2};
    padding-left: ${theme.space.x2};
    padding-top: ${theme.space.x2};
    padding-bottom: ${theme.space.x2};

    animation-duration: 400ms;
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;
  `;

  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content css={styles} sideOffset={5} {...props} ref={ref}>
        {children}
        <DropdownMenu.Arrow
          css={`
            fill: ${theme.colors.white};
          `}
        />
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
});

ActionListMenu.displayName = "ActionListMenu";

export default ActionListMenu;
