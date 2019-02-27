import React from "react";
import { storiesOf } from "@storybook/react";
import {
  Button, Link, Flex, Checkbox, Input, Select, Textarea, Toggle, Radio,
} from "ComponentsRoot";
import Tooltip from "./Tooltip";

storiesOf("Tooltip", module)
  .add("Tooltip", () => (
    <Flex justifyContent="center" alignItems="center" height="200px">
      <Tooltip
        placement="bottom"
        tooltip="I am a Tooltip!"
        id="tooltip1"
      >
        <Button> Button </Button>
      </Tooltip>
    </Flex>
  ))
  .add("with placement", () => (
    <>
      <Flex ml="x4">
        <Tooltip
          id="tooltip1"
          placement="top-start"
          tooltip="top-start"
        >
          <Button m="x6"> Hover me </Button>
        </Tooltip>
        <Tooltip
          id="tooltip2"
          placement="top"
          tooltip="top"
        >
          <Button m="x6"> Hover me </Button>
        </Tooltip>
        <Tooltip
          placement="top-end"
          tooltip="top-end"
        >
          <Button m="x6"> Hover me </Button>
        </Tooltip>
      </Flex>
      <Flex ml="x4">
        <Tooltip
          id="tooltip3"
          placement="left-start"
          tooltip="left-start"
        >
          <Button m="x6"> Hover me </Button>
        </Tooltip>
        <Tooltip
          id="tooltip4"
          placement="left"
          tooltip="left"
        >
          <Button m="x6"> Hover me </Button>
        </Tooltip>
        <Tooltip
          id="tooltip5"
          placement="left-end"
          tooltip="left-end"
        >
          <Button m="x6"> Hover me </Button>
        </Tooltip>
      </Flex>
      <Flex ml="x4">
        <Tooltip
          id="tooltip6"
          placement="right-start"
          tooltip="right-start"
        >
          <Button m="x6"> Hover me </Button>
        </Tooltip>
        <Tooltip
          id="tooltip7"
          placement="right"
          tooltip="right"
        >
          <Button m="x6"> Hover me </Button>
        </Tooltip>
        <Tooltip
          id="tooltip8"
          placement="right-end"
          tooltip="right-end"
        >
          <Button m="x6"> Hover me </Button>
        </Tooltip>
      </Flex>
      <Flex ml="x4">
        <Tooltip
          id="tooltip9"
          placement="bottom-start"
          tooltip="bottom-start"
        >
          <Button m="x6"> Hover me </Button>
        </Tooltip>
        <Tooltip
          id="tooltip10"
          placement="bottom"
          tooltip="bottom"
        >
          <Button m="x6"> Hover me </Button>
        </Tooltip>
        <Tooltip
          id="tooltip11"
          placement="bottom-end"
          tooltip="bottom-end"
        >
          <Button m="x6"> Hover me </Button>
        </Tooltip>
      </Flex>

    </>
  ))
  .add("with Link passed in", () => (
    <Tooltip
      placement="bottom"
      tooltip={ (<Link href="/"> Link </Link>) }
      id="tooltip1"
    >
      <Button> Button </Button>
    </Tooltip>
  ))
  .add("with Button passed in", () => (
    <Tooltip
      placement="bottom"
      tooltip={ (<Button href="/"> Button </Button>) }
      id="tooltip1"
    >
      <Button> Button </Button>
    </Tooltip>
  ))
  .add("with custom showDelay", () => (
    <Tooltip
      placement="bottom"
      tooltip="Tooltip"
      showDelay="1000"
      id="tooltip1"
    >
      <Button> Button </Button>
    </Tooltip>
  ))
  .add("with custom hideDelay", () => (
    <Tooltip
      placement="bottom"
      tooltip="Tooltip"
      hideDelay="1000"
      id="tooltip1"
    >
      <Button> Button </Button>
    </Tooltip>
  ))
  .add("with other focusable elements", () => (
    <>
      <Tooltip
        placement="bottom"
        tooltip="Tooltip"
        id="buttonTooltip"
      >
        <Button> Button </Button>
      </Tooltip>
      <Tooltip
        placement="bottom"
        tooltip="Tooltip"
        id="linkTooltip"
      >
        <Link href="/"> Link </Link>
      </Tooltip>
      <Tooltip
        placement="bottom"
        tooltip="Tooltip"
        id="checkboxTooltip"
      >
        <Checkbox labelText="Checkbox" />
      </Tooltip>
      <Tooltip
        placement="bottom"
        tooltip="Tooltip"
        id="radioTooltip"
      >
        <Radio labelText="Checkbox" />
      </Tooltip>
      <Tooltip
        placement="bottom"
        tooltip="Tooltip"
        id="toggleTooltip"
      >
        <Toggle onText="Toggle" offText="Toggle" />
      </Tooltip>
      <Tooltip
        placement="bottom"
        tooltip="Tooltip"
        id="inputTooltip"
      >
        <Input />
      </Tooltip>
      <Tooltip
        placement="bottom"
        tooltip="Tooltip"
        id="selectTooltip"
      >
        <Select />
      </Tooltip>
      <Tooltip
        placement="bottom"
        tooltip="Tooltip"
        id="textareaTooltip"
      >
        <Textarea />
      </Tooltip>
    </>
  ));
