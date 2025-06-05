import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styled from "styled-components";

export interface ActionListItemProps extends DropdownMenu.DropdownMenuItemProps {
  /** If true, wrap children as a Fragment (no extra DOM node) */
  renderAsFragment?: boolean;
  /** If provided, render as an anchor (`<a href="…">`) */
  href?: string;
}

const ActionListItem = React.forwardRef<HTMLDivElement, ActionListItemProps>(
  ({ renderAsFragment, children, ...props }, ref) => {
    if (renderAsFragment) {
      return (
        <DropdownMenuItem asChild {...props} ref={ref}>
          {/* `children` will be rendered without extra wrapper */}
          {children}
        </DropdownMenuItem>
      );
    }

    if ("href" in props) {
      return (
        <DropdownMenuItem asChild {...props} ref={ref}>
          <a href={props.href}>{children}</a>
        </DropdownMenuItem>
      );
    }

    return (
      <DropdownMenuItem {...props} ref={ref}>
        {children}
      </DropdownMenuItem>
    );
  }
);

ActionListItem.displayName = "ActionListItem";

export default ActionListItem;

// Styled Components

export const DropdownMenuItem = styled(DropdownMenu.Item)(({ theme }) => ({
  paddingTop: theme.space.x1,
  paddingBottom: theme.space.x1,
  paddingLeft: theme.space.x1_5,
  paddingRight: theme.space.x1_5,
  fontWeight: theme.fontWeights.medium,
  fontSize: theme.fontSizes.small,
  lineHeight: theme.lineHeights.smallRelaxed,
  whiteSpace: "nowrap",
  transition: "background-color 250ms ease",

  background: "none",
  border: "none",
  color: theme.colors.darkGrey,
  userSelect: "none",
  cursor: "default",
  textAlign: "left",

  outline: "none",
  "&:hover, &:focus": {
    "&:not([data-disabled])": {
      backgroundColor: theme.colors.lightBlue,
      color: theme.colors.darkBlue,
    },
  },

  "&[data-disabled]": {
    opacity: "0.5",
    pointerEvents: "none",
  },

  gridColumn: "1 / -1",
  display: "grid",
  gridTemplateColumns: "auto 1fr 1.5rem 0.5rem auto",
  alignItems: "center",

  "@supports (grid-template-columns: subgrid)": {
    gridTemplateColumns: "subgrid",
  },

  // Other styles

  // group (marker class, no direct CSS)

  // Do we need these?

  // Grid layout

  // // Child icon styles *:data-[slot=icon]:
  // '> [data-slot="icon"]': {
  //   gridColumnStart: "1", // *:data-[slot=icon]:col-start-1
  //   gridRowStart: "1", // *:data-[slot=icon]:row-start-1
  //   marginRight: "0.625rem", // *:data-[slot=icon]:mr-2.5 (2.5 * 0.25rem)
  //   marginLeft: "-0.125rem", // *:data-[slot=icon]:-ml-0.5 (-0.5 * 0.25rem)
  //   width: "1.25rem", // *:data-[slot=icon]:size-5 (5 * 0.25rem)
  //   height: "1.25rem", // *:data-[slot=icon]:size-5
  //   color: "rgb(113 113 122)", // *:data-[slot=icon]:text-zinc-500

  //   // sm: variants for icon
  //   "@media (min-width: 640px)": {
  //     marginRight: "0.5rem", // sm:*:data-[slot=icon]:mr-2 (2 * 0.25rem)
  //     width: "1rem", // sm:*:data-[slot=icon]:size-4 (4 * 0.25rem)
  //     height: "1rem", // sm:*:data-[slot=icon]:size-4
  //   },
  // },

  // // data-focus specific styles for child icon
  // '&[data-focus] > [data-slot="icon"]': {
  //   color: "rgb(255 255 255)", // data-focus:*:data-[slot=icon]:text-white
  // },

  // // dark: variants for child icon
  // '.dark & > [data-slot="icon"]': {
  //   color: "rgb(161 161 170)", // dark:*:data-[slot=icon]:text-zinc-400
  // },
  // '.dark &[data-focus] > [data-slot="icon"]': {
  //   color: "rgb(255 255 255)", // dark:data-focus:*:data-[slot=icon]:text-white
  // },

  // // Child avatar styles *:data-[slot=avatar]:
  // '> [data-slot="avatar"]': {
  //   marginRight: "0.625rem", // *:data-[slot=avatar]:mr-2.5
  //   marginLeft: "-0.25rem", // *:data-[slot=avatar]:-ml-1 (-1 * 0.25rem)
  //   width: "1.5rem", // *:data-[slot=avatar]:size-6 (6 * 0.25rem)
  //   height: "1.5rem", // *:data-[slot=avatar]:size-6

  //   // sm: variants for avatar
  //   "@media (min-width: 640px)": {
  //     marginRight: "0.5rem", // sm:*:data-[slot=avatar]:mr-2
  //     width: "1.25rem", // sm:*:data-[slot=avatar]:size-5
  //     height: "1.25rem", // sm:*:data-[slot=avatar]:size-5
  //   },
  // },
}));
