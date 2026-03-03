import React from "react";
import {
  DropdownMenu,
  DropdownLink,
  DropdownButton,
  DropdownItem,
  DropdownText,
  Button,
  Flex,
  Text,
  Icon,
} from "../index";

const customColors = {
  color: "white",
  hoverColor: "white",
  bgHoverColor: "black",
};

export default {
  title: "Components/DropdownMenu",
  chromatic: {
    diffThreshold: 0.4,
  },
};

export const _DropdownMenu = {
  render: () => (
    <DropdownMenu openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
      <DropdownLink href="/never_been">Dropdown Link</DropdownLink>
      <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
    </DropdownMenu>
  ),

  name: "DropdownMenu",
};

export const WithCustomTrigger = {
  render: () => (
    <DropdownMenu
      openAriaLabel="open dropdown"
      closeAriaLabel="close dropdown"
      trigger={() => <Button>Custom Trigger</Button>}
    >
      <DropdownLink href="/never_been">Dropdown Link</DropdownLink>
      <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
    </DropdownMenu>
  ),

  name: "with custom trigger",
};

export const WithCustomColors = {
  render: () => (
    <DropdownMenu defaultOpen backgroundColor="blackBlue" openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
      <DropdownLink href="/never_been" {...customColors}>
        Dropdown Link
      </DropdownLink>
      <DropdownButton onClick={() => {}} {...customColors}>
        Dropdown Button
      </DropdownButton>
    </DropdownMenu>
  ),

  name: "with custom colors",
};

export const WithButtonClosingMenu = {
  render: () => (
    <DropdownMenu openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
      {({ closeMenu }) => <DropdownButton onClick={closeMenu}>Dropdown Button</DropdownButton>}
    </DropdownMenu>
  ),

  name: "with button closing menu",
};

export const WithCustomLink = () => (
  <DropdownMenu defaultOpen openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
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

export const SetToDefaultOpen = {
  render: () => (
    <DropdownMenu defaultOpen openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
      <DropdownLink href="/never_been">Dropdown Link</DropdownLink>
      <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
      <DropdownItem>
        <a href="/never_been" style={{ textDecoration: "none" }}>
          Custom Link Component
        </a>
      </DropdownItem>
      <DropdownText>Custom Text</DropdownText>
    </DropdownMenu>
  ),

  name: "set to defaultOpen",
};

export const WithSubmenu = {
  render: () => (
    <DropdownMenu openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
      <DropdownLink href="/never_been">Dropdown Link</DropdownLink>
      <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
      <DropdownMenu
        trigger={() => (
          <DropdownButton>
            <Flex justifyContent="space-between">
              <Text>Submenu</Text>
              <Icon icon="rightArrow" title="right arrow" />
            </Flex>
          </DropdownButton>
        )}
        placement="left-start"
        showArrow={false}
        openOnHover
        openAriaLabel="open sub dropdown"
        closeAriaLabel="close sub dropdown"
      >
        <DropdownButton onClick={() => {}}>Inner Dropdown Button</DropdownButton>
        <DropdownText> Inner Custom Text</DropdownText>
      </DropdownMenu>
    </DropdownMenu>
  ),

  name: "with submenu",
};

export const WithVisitedLinks = () => (
  <DropdownMenu defaultOpen openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
    <DropdownLink href="/">Dropdown Link</DropdownLink>
    <DropdownItem>
      <a href="/" style={{ textDecoration: "none" }}>
        Custom Link Component
      </a>
    </DropdownItem>
  </DropdownMenu>
);

export const SetToDisabled = {
  render: () => (
    <DropdownMenu disabled openAriaLabel="open dropdown" closeAriaLabel="close dropdown">
      <DropdownLink href="/never_been">Dropdown Link</DropdownLink>
      <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
    </DropdownMenu>
  ),

  name: "Set to disabled",
};

export const WithConditionallyRenderedMenuItems = () => {
  const showItemB = false;
  const showItemC = true;
  return (
    <DropdownMenu>
      <DropdownButton onClick={() => {}}>Item A</DropdownButton>
      {showItemB && <DropdownButton onClick={() => {}}>Conditional Item B</DropdownButton>}
      {showItemC && <DropdownButton onClick={() => {}}>Conditional Item C</DropdownButton>}
    </DropdownMenu>
  );
};

export const WithRenderProps = {
  render: () => (
    <DropdownMenu>
      {({ closeMenu, openMenu }) => (
        <>
          <DropdownButton onClick={(e) => closeMenu(e)}>Close menu</DropdownButton>
          <DropdownButton onClick={(e) => openMenu(e)}>Open menu</DropdownButton>
        </>
      )}
    </DropdownMenu>
  ),

  name: "With render props",
};
