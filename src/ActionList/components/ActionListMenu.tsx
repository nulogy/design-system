import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import styled, { useTheme } from "styled-components";

export type ActionListMenuProps = DropdownMenu.DropdownMenuContentProps & {
  showArrow?: boolean;
};

const ActionListMenu = React.forwardRef<HTMLDivElement, ActionListMenuProps>(
  ({ children, showArrow = false, ...props }, ref) => {
    const theme = useTheme();

    return (
      <DropdownMenu.Portal>
        <DropdownMenuContent sideOffset={5} {...props} ref={ref}>
          {children}
          {showArrow && (
            <DropdownMenu.Arrow
              css={`
                fill: ${theme.colors.white};
              `}
            />
          )}
        </DropdownMenuContent>
      </DropdownMenu.Portal>
    );
  }
);

ActionListMenu.displayName = "ActionListMenu";

export default ActionListMenu;

// Styled Components

export const DropdownMenuContent = styled(DropdownMenu.Content)(({ theme }) => ({
  paddingTop: theme.space.x1,
  paddingBottom: theme.space.x1,
  paddingRight: 0,
  paddingLeft: 0,
  // width: "max-content",
  // display: "flex",
  // flexDirection: "column",
  // alignItems: "stretch",
  background: theme.colors.white,
  color: theme.colors.darkGrey,
  borderRadius: theme.radii.large,
  boxShadow: theme.shadows.medium,

  // Other styles

  // CSS Custom Properties defined at the component level
  "--anchor-gap": theme.space.x1,
  "--anchor-padding": theme.space.half,

  // Data attribute selectors for custom properties
  '&[data-anchor~="end"]': {
    "--anchor-offset": "6px",
  },
  '&[data-anchor~="start"]': {
    "--anchor-offset": "-6px",
  },

  // Responsive data attribute selectors for custom properties
  "@media (min-width: 640px)": {
    '&[data-anchor~="end"]': {
      "--anchor-offset": "4px",
    },
    '&[data-anchor~="start"]': {
      "--anchor-offset": "-4px",
    },
  },

  isolation: "isolate",
  width: "max-content",
  // outline outline-transparent: sets up a transparent outline, likely 2px by default in TW
  // This prepares for focus states.
  outlineWidth: "2px", // Assuming a default width for 'outline' before color
  outlineStyle: "solid",
  outlineColor: "transparent",

  "&:focus": {
    outline: "2px solid transparent",
    outlineOffset: "2px",
  },

  overflowY: "auto",
  backgroundColor: theme.colors.white,

  // @supports query for subgrid
  "@supports (grid-template-columns: subgrid)": {
    display: "grid",
    gridTemplateColumns: "auto 1fr 1.5rem 0.5rem auto",
  },
}));
