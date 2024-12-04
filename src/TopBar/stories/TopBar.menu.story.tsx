import React from "react";
import { TopBar } from "../TopBar";
import { menuItems } from "./fixtures";

export default {
  title: "Components/TopBar/Menu",
  parameters: {
    layout: "fullscreen",
  },
};

export const withDefaultOpenMenu = () => (
  <TopBar.Root>
    <TopBar.BackButton href="#">Cycle counts</TopBar.BackButton>
    <TopBar.PageTitle>Cycle count #3992</TopBar.PageTitle>
    <TopBar.Menu defaultOpened>
      {menuItems.map((props) => (
        <TopBar.MenuItem key={props.title} {...props} />
      ))}
    </TopBar.Menu>
  </TopBar.Root>
);

export const WithOneMenuItem = () => (
  <TopBar.Root>
    <TopBar.BackButton href="#">Cycle counts</TopBar.BackButton>
    <TopBar.PageTitle>Cycle count #3992</TopBar.PageTitle>
    <TopBar.Menu defaultOpened>
      {menuItems.slice(0, 1).map((props) => (
        <TopBar.MenuItem key={props.title} {...props} />
      ))}
    </TopBar.Menu>
  </TopBar.Root>
);

export const WithTwoItems = () => (
  <TopBar.Root>
    <TopBar.BackButton href="#">Cycle counts</TopBar.BackButton>
    <TopBar.PageTitle>Cycle count #3992</TopBar.PageTitle>
    <TopBar.Menu defaultOpened>
      {menuItems.slice(0, 2).map((props) => (
        <TopBar.MenuItem key={props.title} {...props} />
      ))}
    </TopBar.Menu>
  </TopBar.Root>
);

export const WithThreeItems = () => (
  <TopBar.Root>
    <TopBar.BackButton href="#">Cycle counts</TopBar.BackButton>
    <TopBar.PageTitle>Cycle count #3992</TopBar.PageTitle>
    <TopBar.Menu defaultOpened>
      {menuItems.slice(0, 3).map((props) => (
        <TopBar.MenuItem key={props.title} {...props} />
      ))}
    </TopBar.Menu>
  </TopBar.Root>
);
