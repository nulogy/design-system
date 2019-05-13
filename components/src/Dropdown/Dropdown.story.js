import React from "react";
import { storiesOf } from "@storybook/react";
import Dropdown from "./Dropdown";
import DropdownLink from "./DropdownLink";
import DropdownButton from "./DropdownButton";

storiesOf("Dropdown", module)
  .add("Dropdown 1", () => (
    <Dropdown>
      <DropdownLink href="/"> Dropdown Link </DropdownLink>
      <DropdownButton onClick={() => {}}> Dropdown Button </DropdownButton>
    </Dropdown>
  ))
  .add("Dropdown 2", () => <div />);
