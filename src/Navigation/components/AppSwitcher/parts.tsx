import React, { ComponentProps } from "react";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import styled from "styled-components";
// Removed Li import as we use RadixNavigationMenu.Item now
import { Heading4, Text } from "../../../Type";
import Content from "../shared/NavigationMenuContent";

/* ---------------------------------------------------------------------
 * Radix expects the structure: Root ▷ List …  This List is used inside
 * <NavigationMenu.Sub> in NulogyAppSwitcher, so it **must** be a
 * real <NavigationMenu.List> element, not a plain <ul>.
 * Items within this list should be <NavigationMenu.Item>.
 * -------------------------------------------------------------------*/

const List = styled(RadixNavigationMenu.List)(({ theme }) => ({
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
    outline: "none", // Add focus style consistency
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

type LinkProps = ComponentProps<typeof A>;

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(({ children, ...props }, forwardedRef) => (
  <RadixNavigationMenu.Link asChild>
    <A {...props} ref={forwardedRef}>
      {children}
    </A>
  </RadixNavigationMenu.Link>
));

Link.displayName = "Link";

const FullWidthItem = styled(RadixNavigationMenu.Item)({
  width: "100%",
});

type ItemProps = ComponentProps<typeof FullWidthItem>;

const Item = React.forwardRef<HTMLLIElement, ItemProps>(({ children, ...props }, forwardedRef) => (
  <FullWidthItem {...props} ref={forwardedRef}>
    {children}
  </FullWidthItem>
));

Item.displayName = "Item";

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
