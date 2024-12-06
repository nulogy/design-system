import React from "react";
import { Link, BrowserRouter } from "react-router-dom";
import { TopBar } from "../TopBar";
import { legacy as theme } from "../../theme/theme";
import numberFromDimension from "../../utils/numberFromDimension";
import { menuItems } from "./fixtures";

export default {
  parameters: {
    layout: "fullscreen",
    chromatic: {
      delay: 1000,
      modes: {
        locale: "en",
        desktopScale: "standard",
        theme: "touch",
        viewports: [theme.breakpoints.small, theme.breakpoints.medium, theme.breakpoints.large].map(
          numberFromDimension
        ),
      },
    },
  },
  title: "Components/TopBar/Menu",
};

export const withDefaultOpenMenu = () => (
  <TopBar.Root>
    <TopBar.BackLink href="#">Cycle counts</TopBar.BackLink>
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
    <TopBar.BackLink href="#">Cycle counts</TopBar.BackLink>
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
    <TopBar.BackLink href="#">Cycle counts</TopBar.BackLink>
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
    <TopBar.BackLink href="#">Cycle counts</TopBar.BackLink>
    <TopBar.PageTitle>Cycle count #3992</TopBar.PageTitle>
    <TopBar.Menu defaultOpened>
      {menuItems.slice(0, 3).map((props) => (
        <TopBar.MenuItem key={props.title} {...props} />
      ))}
    </TopBar.Menu>
  </TopBar.Root>
);

export const WithRouterLinks = () => (
  <TopBar.Root>
    <TopBar.BackLink href="#">Cycle counts</TopBar.BackLink>
    <TopBar.PageTitle>Cycle count #3992</TopBar.PageTitle>
    <TopBar.Menu defaultOpened>
      <BrowserRouter>
        {[{ ...menuItems[0], as: Link, to: "/home" }].map((props) => (
          <TopBar.MenuItem key={props.title} {...props} />
        ))}
      </BrowserRouter>
    </TopBar.Menu>
  </TopBar.Root>
);
