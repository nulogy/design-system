import React from "react";
import { Link, BrowserRouter } from "react-router-dom";
import { TopBar } from "../TopBar";
import { menuItems } from "./fixtures";

export default {
  title: "Components/TopBar/BackLink",
  parameters: {
    layout: "fullscreen",
  },
};

export const WithNoLabel = () => (
  <TopBar.Root>
    <TopBar.BackLink href="/cycle-counts" />
    <TopBar.PageTitle>Cycle count #3992</TopBar.PageTitle>
    <TopBar.Menu>
      {menuItems.map((props) => (
        <TopBar.MenuItem key={props.title} {...props} />
      ))}
    </TopBar.Menu>
  </TopBar.Root>
);

export const WithACustomMaxWidth = () => (
  <TopBar.Root>
    <TopBar.BackLink
      href="/cycle-counts"
      maxWidth={{
        small: "10ch",
        medium: "8ch",
        large: "12ch",
        extraLarge: "16ch",
      }}
    >
      Cycle counts
    </TopBar.BackLink>
    <TopBar.PageTitle>Cycle count #3992</TopBar.PageTitle>
    <TopBar.Menu>
      {menuItems.map((props) => (
        <TopBar.MenuItem key={props.title} {...props} />
      ))}
    </TopBar.Menu>
  </TopBar.Root>
);

export const WithARouterLink = () => (
  <BrowserRouter>
    <TopBar.Root>
      <TopBar.BackLink as={Link} to="/cycle-counts">
        Cycle counts
      </TopBar.BackLink>
      <TopBar.PageTitle>Cycle count #3992</TopBar.PageTitle>
      <TopBar.Menu>
        {menuItems.map((props) => (
          <TopBar.MenuItem key={props.title} {...props} />
        ))}
      </TopBar.Menu>
    </TopBar.Root>
  </BrowserRouter>
);
