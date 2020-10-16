import React from "react";
import { DropdownMenu, DropdownLink, DropdownButton, DropdownItem, Button } from "../index";

const customColors = {
  color: "white",
  hoverColor: "white",
  bgHoverColor: "black"
};

export default {
  title: "Components/DropdownMenu"
};

export const _DropdownMenu = () => (
  <DropdownMenu openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
    <DropdownLink href="/">Dropdown Link</DropdownLink>
    <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
  </DropdownMenu>
);

_DropdownMenu.story = {
  name: "DropdownMenu"
};

export const WithCustomTrigger = () => (
  <DropdownMenu
    openAriaLabel="open dropdown"
    closeAriaLabel="close dropdown"
    trigger={() => <Button>Custom Trigger</Button>}
  >
    <DropdownLink href="/">Dropdown Link</DropdownLink>
    <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
  </DropdownMenu>
);

WithCustomTrigger.story = {
  name: "with custom trigger"
};

export const WithCustomColors = () => (
  <DropdownMenu defaultOpen backgroundColor="blackBlue" openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
    <DropdownLink href="/" {...customColors}>
      Dropdown Link
    </DropdownLink>
    <DropdownButton onClick={() => {}} {...customColors}>
      Dropdown Button
    </DropdownButton>
  </DropdownMenu>
);

WithCustomColors.story = {
  name: "with custom colors"
};

export const WithButtonClosingMenu = () => (
  <DropdownMenu openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
    {({ closeMenu }) => <DropdownButton onClick={closeMenu}>Dropdown Button</DropdownButton>}
  </DropdownMenu>
);

WithButtonClosingMenu.story = {
  name: "with button closing menu"
};

export const WithCustomItem = () => (
  <DropdownMenu openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
    <DropdownItem>
      <a href="/">Custom Link Component</a>
    </DropdownItem>
  </DropdownMenu>
);

WithCustomItem.story = {
  name: "with custom item"
};

export const SetToDefaultOpen = () => (
  <DropdownMenu defaultOpen openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
    <DropdownLink href="/">Dropdown Link</DropdownLink>
    <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
    <DropdownItem>
      <a href="/" style={{ textDecoration: "none" }}>
        Custom Link Component
      </a>
    </DropdownItem>
  </DropdownMenu>
);

SetToDefaultOpen.story = {
  name: "set to defaultOpen"
};

export const SetToDisabled = () => (
  <DropdownMenu disabled openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
    <DropdownLink href="/">Dropdown Link</DropdownLink>
    <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
  </DropdownMenu>
);

SetToDisabled.story = {
  name: "Set to disabled"
};

export const WithSpace = () => (
  <DropdownMenu defaultOpen openAriaLabel="open dropdown" closeAriaLabel="close dropdown" mt="x2" p="x1">
    <DropdownLink href="/">Dropdown Link</DropdownLink>
    <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
    <DropdownItem>
      <a href="/" style={{ textDecoration: "none" }}>
        Custom Link Component
      </a>
    </DropdownItem>
  </DropdownMenu>
);
