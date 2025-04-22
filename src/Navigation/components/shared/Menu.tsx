import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import styled from "styled-components";
import { addStyledProps, StyledProps } from "../../../StyledProps";

export const menuStyles = {
  display: "flex",
  borderRadius: "8px",
  background: "#FFF",
  boxShadow: "0px 6px 12px 2px rgba(1, 30, 56, 0.15)",
  width: "calc(100vw - (16px * 2))",
  maxWidth: "400px",
  padding: "16px 0px",
  flexDirection: "column",
} as const;

export interface MenuProps extends StyledProps, RadixNavigationMenu.NavigationMenuContentProps {}

const Menu = styled(RadixNavigationMenu.Content).attrs({
  onPointerMove: (event) => event.preventDefault(),
  onPointerLeave: (event) => event.preventDefault(),
})<MenuProps>(
  ({ theme }) => ({
    ...menuStyles,
    top: `calc(100% + ${theme.space.x1})`,
  }),
  addStyledProps
);

export default Menu;
