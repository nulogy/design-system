import React, { ReactNode } from "react";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import styled from "styled-components";

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

const Menu = styled("ul")({
  ...menuStyles,
  gap: "16px",
  listStyle: "none",
});

const Link = styled("a")({
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

const Item = React.forwardRef<any, any>(
  (
    { children, ...props }: { children: ReactNode; [key: string]: any },
    forwardedRef
  ) => (
    <li style={{ width: "100%" }}>
      <NavigationMenu.Link asChild>
        <Link {...props} ref={forwardedRef}>
          {children}
        </Link>
      </NavigationMenu.Link>
    </li>
  )
);

const AppSwitcher = Object.assign(
  {},
  {},
  {
    Menu,
    Item,
    Title,
    Description,
  }
);

const Navigation = Object.assign(
  {},
  {},
  {
    AppSwitcher,
  }
);

export default Navigation;
