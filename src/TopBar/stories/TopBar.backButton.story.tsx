import React from "react";
import { ReactRouterLink } from "react-router-dom";
import { TopBar } from "../TopBar";
import { menuItems } from "./fixtures";

export default {
  title: "Components/TopBar/BackButton",
  parameters: {
    layout: "fullscreen",
  },
};

export const WithACustomMaxWidth = () => (
  <TopBar.Root>
    <TopBar.BackButton
      maxWidth={{
        small: "10ch",
        medium: "8ch",
        large: "12ch",
        extraLarge: "16ch",
      }}
    >
      Cycle counts
    </TopBar.BackButton>
    <TopBar.PageTitle>Cycle count #3992</TopBar.PageTitle>
    <TopBar.Menu>
      {menuItems.map((props) => (
        <TopBar.MenuItem key={props.title} {...props} />
      ))}
    </TopBar.Menu>
  </TopBar.Root>
);

export const WithARouterLink = () => (
  <TopBar.Root>
    <TopBar.BackButton as={ReactRouterLink} to="#">
      Cycle counts
    </TopBar.BackButton>
    <TopBar.PageTitle>Cycle count #3992</TopBar.PageTitle>
    <TopBar.Menu>
      {menuItems.map((props) => (
        <TopBar.MenuItem key={props.title} {...props} />
      ))}
    </TopBar.Menu>
  </TopBar.Root>
);
