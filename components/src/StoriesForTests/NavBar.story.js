import React from "react";
import styled from "styled-components";
import { storiesOf } from "@storybook/react";
import { NavBar as NDSNavBar } from "..";

const ResetStorybookView = styled.div({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh"
});

const NavBar = props => (
  <ResetStorybookView>
    <NDSNavBar {...props} />
  </ResetStorybookView>
);

const primaryMenu = [
  {
    name: "Menu 1",
    items: [{ name: "Menu 1-1", href: "/" }, { name: "Menu 1-2", href: "/" }]
  },
  {
    name: "Menu 2",
    items: [
      {
        name: "SubMenu 1",
        items: [
          { name: "SubMenu 1-1", href: "/" },
          {
            name: "SubSubMenu 1",
            items: [{ name: "SubSubMenu 1-1", href: "/" }, { name: "SubSubMenu 1-2", href: "/" }]
          }
        ]
      }
    ]
  }
];

const secondaryMenu = [
  {
    name: "Menu 3",
    items: [{ name: "Menu 3-1", href: "/" }, { name: "Menu 3-2", href: "/" }, { name: "Menu 3-3", href: "/" }]
  },
  {
    name: "Menu 4",
    items: [{ name: "Menu 4-1", href: "/" }, { name: "Menu 4-2", href: "/" }]
  }
];

const search = {
  onSubmit: () => {}
};

storiesOf("zzzStoriesForTests", module).add("NavBar", () => (
  <NavBar menuData={{ primaryMenu, secondaryMenu, search }} />
));
