import React from "react";
import {
  DropdownMenu,
  DropdownLink,
  DropdownButton,
  DropdownItem,
  DropdownText,
  Button,
} from "../index";

const customColors = {
  color: "white",
  hoverColor: "white",
  bgHoverColor: "black",
};

export default {
  title: "Components/DropdownMenu",
};

export const _DropdownMenu = () => (
  <DropdownMenu openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
    <DropdownLink href="/never_been">Dropdown Link</DropdownLink>
    <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
  </DropdownMenu>
);

_DropdownMenu.story = {
  name: "DropdownMenu",
};

export const WithCustomTrigger = () => (
  <DropdownMenu
    openAriaLabel="open dropdown"
    closeAriaLabel="close dropdown"
    trigger={() => <Button>Custom Trigger</Button>}
  >
    <DropdownLink href="/never_been">Dropdown Link</DropdownLink>
    <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
  </DropdownMenu>
);

WithCustomTrigger.story = {
  name: "with custom trigger",
};

export const WithCustomColors = () => (
  <DropdownMenu
    defaultOpen
    backgroundColor="blackBlue"
    openAriaLabel="open dropdown"
    closeAriaLabel="close dropdown"
  >
    <DropdownLink href="/never_been" {...customColors}>
      Dropdown Link
    </DropdownLink>
    <DropdownButton onClick={() => {}} {...customColors}>
      Dropdown Button
    </DropdownButton>
  </DropdownMenu>
);

WithCustomColors.story = {
  name: "with custom colors",
};

export const WithButtonClosingMenu = () => (
  <DropdownMenu openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
    {({ closeMenu }) => (
      <DropdownButton onClick={closeMenu}>Dropdown Button</DropdownButton>
    )}
  </DropdownMenu>
);

WithButtonClosingMenu.story = {
  name: "with button closing menu",
};

export const WithCustomLink = () => (
  <DropdownMenu
    defaultOpen
    openAriaLabel="open dropdown"
    closeAriaLabel="close dropdown"
  >
    <DropdownItem>
      <a href="/never_been">Custom Link Component</a>
    </DropdownItem>
  </DropdownMenu>
);

export const WithCustomText = () => (
  <DropdownMenu defaultOpen>
    <DropdownText>Custom Text</DropdownText>
  </DropdownMenu>
);

export const SetToDefaultOpen = () => (
  <DropdownMenu
    defaultOpen
    openAriaLabel="open dropdown"
    closeAriaLabel="close dropdown"
  >
    <DropdownLink href="/never_been">Dropdown Link</DropdownLink>
    <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
    <DropdownItem>
      <a href="/never_been" style={{ textDecoration: "none" }}>
        Custom Link Component
      </a>
    </DropdownItem>
    <DropdownText>Custom Text</DropdownText>
  </DropdownMenu>
);

SetToDefaultOpen.story = {
  name: "set to defaultOpen",
};

export const WithVisitedLinks = () => (
  <DropdownMenu
    defaultOpen
    openAriaLabel="open dropdown"
    closeAriaLabel="close dropdown"
  >
    <DropdownLink href="/">Dropdown Link</DropdownLink>
    <DropdownItem>
      <a href="/" style={{ textDecoration: "none" }}>
        Custom Link Component
      </a>
    </DropdownItem>
  </DropdownMenu>
);

export const SetToDisabled = () => (
  <DropdownMenu
    disabled
    openAriaLabel="open dropdown"
    closeAriaLabel="close dropdown"
  >
    <DropdownLink href="/never_been">Dropdown Link</DropdownLink>
    <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
  </DropdownMenu>
);

SetToDisabled.story = {
  name: "Set to disabled",
};
