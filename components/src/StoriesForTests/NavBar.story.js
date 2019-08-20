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
        name: "Menu 2-1",
        items: [
          { name: "Menu 2-1-1", href: "/" },
          {
            name: "Menu 2-1-2",
            items: [{ name: "Menu 2-1-2-1", href: "/" }, { name: "Menu 2-1-2-2", href: "/" }]
          }
        ]
      },
      {
        name: "Menu 2-2",
        items: [{ name: "Menu 2-2-1", href: "/" }]
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

const customPrimaryMenu = [
  {
    name: "Text"
  },
  {
    name: "Link",
    href: "/"
  },
  {
    name: "Custom",
    render: () => <span>Custom</span>
  },
  {
    name: "Button",
    items: [
      {
        name: "Submenu Text"
      },
      {
        name: "Submenu Link",
        href: "/"
      },
      {
        name: "Submenu Custom",
        render: () => <span>Submenu Custom</span>
      },
      {
        name: "Submenu Button",
        items: [
          {
            name: "Nested Submenu Text"
          }
        ]
      }
    ]
  }
];

const customSecondaryMenu = [
  {
    name: "Text 2"
  },
  {
    name: "Link 2",
    href: "/"
  },
  {
    name: "Custom 2",
    render: () => <span>Custom 2</span>
  },
  {
    name: "Button 2",
    items: [
      {
        name: "Submenu Text 2"
      },
      {
        name: "Submenu Link 2",
        href: "/"
      },
      {
        name: "Submenu Custom 2",
        render: () => <span>Submenu Custom 2</span>
      },
      {
        name: "Submenu Button 2",
        items: [
          {
            name: "Nested Submenu Text 2"
          }
        ]
      }
    ]
  }
];

const search = {
  onSubmit: () => {}
};

storiesOf("StoriesForTests/NavBar", module)
  .add("Base", () => <NavBar menuData={{ primaryMenu, secondaryMenu, search }} />)
  .add("Custom Render Components", () => (
    <NavBar defaultOpen menuData={{ primaryMenu: customPrimaryMenu, secondaryMenu: customSecondaryMenu }} />
  ));
