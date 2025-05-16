import styled from "styled-components";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import { addStyledProps, StyledProps } from "../../../StyledProps";
import { NAVIGATION_MENU_CONTENT_WIDTH_MAX_WIDTH_PX } from "./constants";
import { disableMenuToggleOnHover } from "./disableMenuToggleOnHover";

export interface NavigationMenuContentProps extends RadixNavigationMenu.NavigationMenuContentProps, StyledProps {}

const NavigationMenuContent = styled(RadixNavigationMenu.Content).attrs(
  disableMenuToggleOnHover
)<NavigationMenuContentProps>(
  ({ theme }) => ({
    position: "absolute",
    top: `calc(100% + ${theme.space.x1})`,
    display: "flex",
    flexDirection: "column",
    borderRadius: theme.radii.large,
    background: theme.colors.white,
    boxShadow: theme.shadows.large,
    width: `calc(100vw - (${theme.space.x4}))`,
    maxWidth: NAVIGATION_MENU_CONTENT_WIDTH_MAX_WIDTH_PX,
    paddingTop: theme.space.x2,
    paddingBottom: theme.space.x2,
    paddingLeft: theme.space.none,
    paddingRight: theme.space.none,
  }),
  addStyledProps
);

export default NavigationMenuContent;
