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
    <DropdownMenu>
      <DropdownLink href="/">Dropdown Link</DropdownLink>
      <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
    </DropdownMenu>
  ))
  .add("with custom trigger", () => (
    <DropdownMenu trigger={() => <Button>Custom Trigger</Button>}>
      <DropdownLink href="/">Dropdown Link</DropdownLink>
      <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
    </DropdownMenu>
  ))
  .add("with custom colors", () => (
    <DropdownMenu backgroundColor="blackBlue">
      <DropdownLink href="/" {...customColors}>
        Dropdown Link
      </DropdownLink>
      <DropdownButton onClick={() => {}} {...customColors}>
        Dropdown Button
      </DropdownButton>
    </DropdownMenu>
  ))
  .add("with button closing menu", () => (
    <DropdownMenu>
      {({ closeMenu }) => <DropdownButton onClick={closeMenu}>Dropdown Button</DropdownButton>}
    </DropdownMenu>
  ))
  .add("with custom item", () => (
    <DropdownMenu>
      <DropdownItem>
        <a href="/">Custom Link Component</a>
      </DropdownItem>
    </DropdownMenu>
  ))
  .add("set to defaultOpen", () => (
    <DropdownMenu defaultOpen>
      <DropdownLink href="/">Dropdown Link</DropdownLink>
      <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
      <DropdownItem>
        <a href="/" style={{ textDecoration: "none" }}>
          Custom Link Component
        </a>
      </DropdownItem>
    </DropdownMenu>
  ))
  .add("with scrollable parent as boundaries element", () => (
    <div style={{ maxHeight: "400px", overflow: "auto", marginTop: "150px", border: "2px dashed blue" }}>
      <div style={{ height: "300px", background: "#eee" }}>Section 1</div>
      <DropdownMenu>
        <DropdownLink href="/">Dropdown Link</DropdownLink>
        <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
        <DropdownItem>
          <a href="/" style={{ textDecoration: "none" }}>
            Custom Link Component
          </a>
        </DropdownItem>
      </DropdownMenu>
      <div style={{ height: "300px", background: "#ddd" }}>Section 2</div>
    </div>
  ))
  .add("Set to disabled", () => (
    <DropdownMenu disabled>
      <DropdownLink href="/">Dropdown Link</DropdownLink>
      <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
    </DropdownMenu>
  ));
