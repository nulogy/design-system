import React from "react";
import { storiesOf } from "@storybook/react";
import { DropdownMenu, DropdownLink, DropdownButton, DropdownItem, Button, Card, Text, Box } from "../index";

const customColors = {
  color: "white",
  hoverColor: "white",
  bgHoverColor: "black"
};
const cards = Array.from({ length: 100 }, (v, k) => k + 1);

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
  .add("Set to disabled", () => (
    <DropdownMenu disabled>
      <DropdownLink href="/">Dropdown Link</DropdownLink>
      <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
    </DropdownMenu>
  ))
  .add("Many dropdowns", () => (
    <>
      {cards.map(i => (
        <Card key={i}>
          <Text>Card {i}</Text>
          <DropdownMenu>
            <DropdownLink href="/">Dropdown Link</DropdownLink>
            <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
          </DropdownMenu>
        </Card>
      ))}
    </>
  ));
