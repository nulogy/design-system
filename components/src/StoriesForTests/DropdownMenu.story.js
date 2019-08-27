import React from "react";
import { storiesOf } from "@storybook/react";
import { DropdownMenu, DropdownLink, Button } from "..";

storiesOf("StoriesForTests/DropdownMenu", module)
  .add("Base", () => (
    <DropdownMenu>
      <DropdownLink href="/">Dropdown Link</DropdownLink>
    </DropdownMenu>
  ))
  .add("Custom trigger", () => (
    <DropdownMenu trigger={() => <Button className="customtrigger">Custom Trigger</Button>}>
      <DropdownLink href="/">Dropdown Link</DropdownLink>
    </DropdownMenu>
  ));
