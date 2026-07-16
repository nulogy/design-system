import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import { styled } from "styled-components";
import { addStyledProps, excludeStyledProps, type StyledProps } from "../../../StyledProps";
import { Header } from "./parts/Header";
import Item from "./parts/Item";
import MobileItem from "./parts/MobileItem";

// `styled(RadixNavigationMenu.Sub)` forwards to the DOM, so drop styled-system
// props (applied as styles via addStyledProps) to keep them off the DOM element.
const Container = styled(RadixNavigationMenu.Sub)
  .attrs({
    orientation: "vertical",
  })
  .withConfig({ shouldForwardProp: excludeStyledProps(addStyledProps) })<StyledProps>(addStyledProps);

const UserMenu = {
  Header,
  Container,
  Item,
  MobileItem,
};

export default UserMenu;
