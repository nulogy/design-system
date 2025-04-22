import React, { ComponentProps } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import styled from "styled-components";
import { Li } from "../../../Primitives";
import Menu from "../shared/Menu";

const List = styled("ul")({
  margin: 0,
  padding: 0,
  gap: "16px",
  listStyle: "none",
});

const A = styled("a")({
  textDecoration: "none",
  width: "100%",
  display: "flex",
  padding: "12px 24px 16px 24px",
  flexDirection: "column",
  alignItems: "flex-start",
  alignSelf: "stretch",
  transition: "background-color 250ms ease",

  "&:hover, &:focus": {
    backgroundColor: "#E1EBFA",
  },
});

const Header = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.space.x1,
}));

const Title = styled("p")({
  color: "#434D59",
  fontFamily: "IBM Plex Sans",
  fontSize: "18px",
  margin: 0,
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "24px",
});

const Description = styled("p")({
  color: "#6C7784",
  margin: 0,
  fontFamily: "IBM Plex Sans",
  fontSize: "12px",
  fontStyle: "normal",
  fontWeight: "400",
  lineHeight: "16px",
});

const Link = React.forwardRef<HTMLAnchorElement, ComponentProps<typeof A>>(({ children, ...props }, forwardedRef) => (
  <NavigationMenu.Link asChild>
    <A {...props} ref={forwardedRef}>
      {children}
    </A>
  </NavigationMenu.Link>
));

const Item = React.forwardRef<HTMLLIElement, ComponentProps<typeof Li>>(({ children, ...props }, forwardedRef) => (
  <Li width="100%" {...props} ref={forwardedRef}>
    {children}
  </Li>
));

const AppSwitcher = {
  Menu,
  List,
  Item,
  Link,
  Header,
  Title,
  Description,
};

export default AppSwitcher;
