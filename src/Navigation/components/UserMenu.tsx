import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import styled from "styled-components";
import React from "react";
import { UserMenuInfo, UserMenuItem } from "../types";
import Menu from "./shared/Menu";

export const HorizontalDivider = styled("span")({
  display: "inline-block",
  height: 1,
  width: "100%",
  backgroundColor: "#E4E7EB",
  marginTop: 24,
  marginBottom: 24,
});

export const UserMenuItems = ({ items }: { items: UserMenuItem[] }) => {
  const renderItem = (item: UserMenuItem) => {
    const key = item.key ?? item.label;

    if (item.type === "render") {
      return <RadixNavigationMenu.Item key={key}>{item.render()}</RadixNavigationMenu.Item>;
    }

    if (item.type === "link") {
      // Destructure onSelect out, as its type conflicts with Radix's Link
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { onSelect, ...restLinkProps } = item.props || {};
      return (
        <RadixNavigationMenu.Item value={item.label} key={key}>
          <RadixNavigationMenu.Link
            {...restLinkProps}
            style={
              {
                display: "block",
                color: "var(--ui-dark-grey, #434D59)",
                fontFamily: "IBM Plex Sans",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "16px /* 114.286% */",
                paddingTop: 8 + 4,
                paddingBottom: 8 + 4,
                textDecoration: "none",
              } as React.CSSProperties
            }
          >
            {item.label}
          </RadixNavigationMenu.Link>
        </RadixNavigationMenu.Item>
      );
    }

    if (item.type === "button") {
      // Destructure onSelect out for button trigger as well, just in case
      // Radix Trigger might have a similar type conflict for onSelect
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { onSelect, ...restButtonProps } = item.props || {};
      const triggerStyle: React.CSSProperties = {
        background: "none",
        border: "none",
        outline: "none",
        userSelect: "none",
        display: "block",
        color: "var(--ui-dark-grey, #434D59)",
        fontFamily: "IBM Plex Sans",
        fontSize: "14px",
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "16px /* 114.286% */",
        padding: 0,
        paddingTop: 8 + 4,
        paddingBottom: 8 + 4,
        textAlign: "left",
        width: "100%",
      };

      if (item.items && item.items.length > 0) {
        return (
          <RadixNavigationMenu.Item value={item.label} key={key}>
            <RadixNavigationMenu.Trigger {...restButtonProps} style={triggerStyle}>
              {item.label}
            </RadixNavigationMenu.Trigger>
            <RadixNavigationMenu.Content>
              <RadixNavigationMenu.Sub orientation="vertical">
                <RadixNavigationMenu.List style={{ listStyle: "none", padding: "0" }}>
                  <UserMenuItems items={item.items} />
                </RadixNavigationMenu.List>
              </RadixNavigationMenu.Sub>
            </RadixNavigationMenu.Content>
          </RadixNavigationMenu.Item>
        );
      } else {
        return (
          <RadixNavigationMenu.Item value={item.label} key={key}>
            <RadixNavigationMenu.Trigger {...restButtonProps} style={triggerStyle}>
              {item.label}
            </RadixNavigationMenu.Trigger>
          </RadixNavigationMenu.Item>
        );
      }
    }

    return null;
  };

  return <>{items.map(renderItem)}</>;
};

export const Header = ({ title, subtitle1, subtitle2 }: UserMenuInfo) => {
  return (
    <div
      style={{
        padding: "0 24px",
        display: "flex",
        height: "104px",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        alignSelf: "stretch",
        backgroundColor: "#F0F2F5",
      }}
    >
      <p
        style={{
          color: "#434D59",
          textAlign: "center",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: 600,
          lineHeight: "24px",
          margin: 0,
        }}
      >
        {title}
      </p>
      <p
        style={{
          color: "#434D59",
          textAlign: "center",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "24px",
          margin: 0,
        }}
      >
        {subtitle1}
      </p>
      <p
        style={{
          color: "#434D59",
          textAlign: "center",
          fontSize: "14px",
          fontStyle: "normal",
          fontWeight: 400,
          lineHeight: "24px",
          margin: 0,
        }}
      >
        {subtitle2}
      </p>
    </div>
  );
};

export const Content = styled("div")({
  padding: 16,
});

const Root = styled(Menu)({
  padding: 0,
  overflow: "hidden",
});

export const UserMenu = {
  Root,
  Content,
  Header,
  items: [
    {
      label: "This is another submenu",
      type: "link",
      menuItemProps: {
        href: "/go-to-something-else",
      },
    },
  ],
  UserMenuItems,
};

export default UserMenu;
