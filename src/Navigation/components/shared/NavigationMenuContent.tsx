import styled from "styled-components";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import { addStyledProps, StyledProps } from "../../../StyledProps";

interface NavigationMenuContentProps extends RadixNavigationMenu.NavigationMenuContentProps, StyledProps {}

const NavigationMenuContent = styled(RadixNavigationMenu.Content).attrs({
  onPointerMove: (event) => event.preventDefault(),
  onPointerLeave: (event) => event.preventDefault(),
})<NavigationMenuContentProps>(
  ({ theme }) => ({
    position: "absolute",
    top: `calc(100% + ${theme.space.x1})`,
  }),
  addStyledProps
);

export default NavigationMenuContent;
