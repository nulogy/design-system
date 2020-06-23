import React from "react";
import { storiesOf } from "@storybook/react";
import { DropdownMenu, DropdownLink, DropdownButton, DropdownItem, Button } from "../index";

const customColors = {
  color: "white",
  hoverColor: "white",
  bgHoverColor: "black"
};

storiesOf("DropdownMenu", module)
  .add("DropdownMenu", () => (
    <DropdownMenu openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
      <DropdownLink href="/">Dropdown Link</DropdownLink>
      <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
    </DropdownMenu>
  ))
  .add("with custom trigger", () => (
    <DropdownMenu
      openAriaLabel="open dropdown"
      closeAriaLabel="close dropdown"
      trigger={() => <Button>Custom Trigger</Button>}
    >
      <DropdownLink href="/">Dropdown Link</DropdownLink>
      <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
    </DropdownMenu>
  ))
  .add("with custom colors", () => (
    <DropdownMenu defaultOpen backgroundColor="blackBlue" openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
      <DropdownLink href="/" {...customColors}>
        Dropdown Link
      </DropdownLink>
      <DropdownButton onClick={() => {}} {...customColors}>
        Dropdown Button
      </DropdownButton>
    </DropdownMenu>
  ))
  .add("with button closing menu", () => (
    <DropdownMenu openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
      {({ closeMenu }) => <DropdownButton onClick={closeMenu}>Dropdown Button</DropdownButton>}
    </DropdownMenu>
  ))
  .add("with custom item", () => (
    <DropdownMenu openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
      <DropdownItem>
        <a href="/">Custom Link Component</a>
      </DropdownItem>
    </DropdownMenu>
  ))
  .add("set to defaultOpen", () => (
    <DropdownMenu defaultOpen openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
      <DropdownLink href="/">Dropdown Link</DropdownLink>
      <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
      <DropdownItem>
        <a href="/" style={{ textDecoration: "none" }}>
          Custom Link Component
        </a>
      </DropdownItem>
    </DropdownMenu>
  ))
  .add("Set to disabled", () => (
    <DropdownMenu disabled openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
      <DropdownLink href="/">Dropdown Link</DropdownLink>
      <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
    </DropdownMenu>
  ));
