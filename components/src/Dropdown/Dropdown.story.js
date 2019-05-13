import React from "react";
import { storiesOf } from "@storybook/react";
import Dropdown from "./Dropdown";
import DropdownLink from "./DropdownLink";
import DropdownButton from "./DropdownButton";
import { Button } from "../Button";

const customColors = {
  color: "white",
  hoverColor: "white",
  bgHoverColor: "black"
};

storiesOf("Dropdown", module)
  .add("Dropdown", () => (
    <Dropdown>
      <DropdownLink href="/">Dropdown Link</DropdownLink>
      <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
    </Dropdown>
  ))
  .add("with custom trigger", () => (
    <Dropdown trigger={() => <Button>Custom Trigger</Button>}>
      <DropdownLink href="/">Dropdown Link</DropdownLink>
      <DropdownButton onClick={() => {}}>Dropdown Button</DropdownButton>
    </Dropdown>
  ))
  .add("with custom colors", () => (
    <Dropdown backgroundColor="blackBlue">
      <DropdownLink href="/" {...customColors}>
        Dropdown Link
      </DropdownLink>
      <DropdownButton onClick={() => {}} {...customColors}>
        Dropdown Button
      </DropdownButton>
    </Dropdown>
  ));
