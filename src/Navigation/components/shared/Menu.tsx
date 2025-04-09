import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import styled from "styled-components";
import { addStyledProps, StyledProps } from "../../../StyledProps";
import { menuStyles } from "../AppSwitcher/parts";

export interface MenuProps extends StyledProps, RadixNavigationMenu.NavigationMenuContentProps {}

const Menu = styled(RadixNavigationMenu.Content).attrs({
  onPointerMove: (event) => event.preventDefault(),
  onPointerLeave: (event) => event.preventDefault(),
})<MenuProps>(
  ({ theme }) => ({
    ...menuStyles,
    position: "absolute",
    top: `calc(100% + ${theme.space.x1})`,
  }),
  addStyledProps
);

export default Menu;
