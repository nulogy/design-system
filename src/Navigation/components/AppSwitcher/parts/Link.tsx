import React, { ComponentProps } from "react";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import { styled } from "styled-components";

type LinkProps = ComponentProps<typeof A>;

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(({ children, ...props }, forwardedRef) => (
  <RadixNavigationMenu.Link asChild>
    <A {...props} ref={forwardedRef}>
      {children}
    </A>
  </RadixNavigationMenu.Link>
));

Link.displayName = "Link";

export default Link;

export const A = styled("a")(({ theme }) => ({
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
    outline: "none",
  },
}));
