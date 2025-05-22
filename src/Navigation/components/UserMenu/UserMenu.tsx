import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import styled from "styled-components";
import { addStyledProps, StyledProps } from "../../../StyledProps";
import { Header } from "./parts/Header";
import Item from "./parts/Item";
import MobileItem from "./parts/MobileItem";

const Container = styled(RadixNavigationMenu.Sub).attrs({
  orientation: "vertical",
})<StyledProps>(addStyledProps);

const UserMenu = {
  Header,
  Container,
  Item,
  MobileItem,
};

export default UserMenu;
