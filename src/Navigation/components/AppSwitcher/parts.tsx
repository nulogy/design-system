import React, { ComponentProps } from "react";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import styled from "styled-components";
import { Li } from "../../../Primitives";
import { Heading4, Text } from "../../../Type";
import Content from "../shared/NavigationMenuContent";

const List = styled.ul(({ theme }) => ({
  margin: 0,
  padding: 0,
  gap: theme.space.x2,
  listStyle: "none",
}));

const A = styled("a")(({ theme }) => ({
  textDecoration: "none",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  alignSelf: "stretch",
  paddingTop: theme.space.x1_5,
  paddingRight: theme.space.x3,
  paddingBottom: theme.space.x2,
  paddingLeft: theme.space.x3,
  transition: "background-color 250ms ease",

  "&:hover, &:focus": {
    backgroundColor: theme.colors.lightBlue,
  },
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

const Link = React.forwardRef<HTMLAnchorElement, ComponentProps<typeof A>>(({ children, ...props }, forwardedRef) => (
  <RadixNavigationMenu.Link asChild>
    <A {...props} ref={forwardedRef}>
      {children}
    </A>
  </RadixNavigationMenu.Link>
));

const Item = React.forwardRef<HTMLLIElement, ComponentProps<typeof Li>>(({ children, ...props }, forwardedRef) => (
  <Li width="100%" {...props} ref={forwardedRef}>
    {children}
  </Li>
));

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
