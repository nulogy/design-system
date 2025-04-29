import React from "react";
import * as RadixNavigationMenu from "@radix-ui/react-navigation-menu";
import { MenuItem } from "../../types";

export default function MobileMenuItem({ menuItem }: { menuItem: MenuItem }) {
  if (menuItem.type === "button") {
    if (menuItem.items) {
      return (
        <>
          <p
            style={{
              color: "#6C7784",
              fontFamily: "IBM Plex Sans",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "16px /* 114.286% */",
              margin: 0,
              paddingTop: 8 + 4,
              paddingBottom: 8 + 4,
            }}
          >
            {menuItem.label}
          </p>
          <div style={{ paddingLeft: 16 }}>
            {menuItem.items.map((item) => (
              <MobileMenuItem menuItem={item} key={item.key} />
            ))}
          </div>
        </>
      );
    } else {
      return (
        <RadixNavigationMenu.Trigger
          onPointerMove={(event) => event.preventDefault()}
          onPointerLeave={(event) => event.preventDefault()}
          {...menuItem.props}
          style={{
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
          }}
        >
          {menuItem.label}
        </RadixNavigationMenu.Trigger>
      );
    }
  } else {
    return (
      <RadixNavigationMenu.Link
        {...menuItem.props}
        onPointerMove={(event) => event.preventDefault()}
        onPointerLeave={(event) => event.preventDefault()}
        style={{
          display: "block",
          color: "var(--ui-dark-grey, #434D59)",
          fontFamily: "IBM Plex Sans",
          fontSize: "14px",
          textDecoration: "none",
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "16px /* 114.286% */",
          paddingTop: 8 + 4,
          paddingBottom: 8 + 4,
        }}
      >
        {menuItem.label}
      </RadixNavigationMenu.Link>
    );
  }
}
