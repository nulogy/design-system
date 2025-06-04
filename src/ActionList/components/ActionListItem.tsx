import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { css, useTheme } from "styled-components";

interface ActionListItemProps extends DropdownMenu.DropdownMenuItemProps {
  /** If true, wrap children as a Fragment (no extra DOM node) */
  renderAsFragment?: boolean;
  /** If provided, render as an anchor (`<a href="…">`) */
  href?: string;
}

const ActionListItem = React.forwardRef<HTMLDivElement, ActionListItemProps>(
  ({ renderAsFragment, children, ...rest }, ref) => {
    const theme = useTheme();
    const styles = css`
      // background-color: ${theme.colors.red};
    `;

    if (renderAsFragment) {
      return (
        <DropdownMenu.Item asChild css={styles} {...rest} ref={ref}>
          {/* `children` will be rendered without extra wrapper */}
          {children}
        </DropdownMenu.Item>
      );
    }

    if ("href" in rest) {
      return (
        <DropdownMenu.Item asChild css={styles} {...rest} ref={ref}>
          <a href={rest.href}>{children}</a>
        </DropdownMenu.Item>
      );
    }

    return (
      <DropdownMenu.Item css={styles} {...rest} ref={ref}>
        {children}
      </DropdownMenu.Item>
    );
  }
);

ActionListItem.displayName = "ActionListItem";

export default ActionListItem;
