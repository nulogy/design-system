import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import styled from "styled-components";
import { Heading4, Text } from "../../../../Type";
import Content from "../../shared/NavigationMenuContent";
import Link from "./Link";
import Item from "./Item";

const List = styled(RadixNavigationMenu.List)(({ theme }) => ({
  margin: 0,
  padding: 0,
  gap: theme.space.x2,
  listStyle: "none",
}));

const Header = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.space.x1,
}));

const Title = styled(Heading4).attrs({
  color: "darkGrey",
  compact: true,
})({});

const Description = styled(Text).attrs({
  color: "midGrey",
  fontSize: "smaller",
})({});

const AppSwitcher = {
  Content,
  List,
  Item,
  Link,
  Header,
  Title,
  Description,
};

export default AppSwitcher;
