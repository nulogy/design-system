import React from "react";
import { storiesOf } from "@storybook/react";
import {
  Button, Link, Flex, Input, Select, Textarea, Text, Box, Tooltip,
} from "ComponentsRoot";

const selectOptions = [
  { value: "accepted", label: "Accepted" },
  { value: "assigned", label: "Assigned to a line" },
  { value: "hold", label: "On hold" },
  { value: "rejected", label: "Rejected" },
  { value: "open", label: "Open" },
  { value: "progress", label: "In progress" },
  { value: "quarantine", label: "In quarantine" },
];

const Trigger = () => (
  <Flex width="128px" height="128px" justifyContent="center" alignItems="center" bg="lightBlue" style={ { border: "2px dashed darkBlue" } }>
    Hover me
  </Flex>
);


storiesOf("Tooltip", module)
  .add("Tooltip", () => (
    <Flex p="x8">
      <Tooltip
        placement="bottom"
        tooltip="I am a Tooltip!"
        id="tooltip1"
      >
        <Button> Button </Button>
      </Tooltip>
    </Flex>
  ))
  .add("with custom maxWidth", () => (
    <Flex p="x8">
      <Tooltip
        placement="bottom"
        tooltip="I am a Tooltip! I have very long text, but I have a smaller maxWidth prop that causes me to wrap frequently."
        id="tooltip1"
        maxWidth="128px"
      >
        <Button> Button </Button>
      </Tooltip>
    </Flex>
  ))
  .add("with placement", () => (
    <>
      <Flex my="x6" mx="x8" justifyContent="space-around">
        <Tooltip
          id="tooltip1"
          placement="top-start"
          tooltip="top-start"
        >
          <Trigger />
        </Tooltip>
        <Tooltip
          id="tooltip2"
          placement="top"
          tooltip="top"
        >
          <Trigger />
        </Tooltip>
        <Tooltip
          id="tooltip3"
          placement="top-end"
          tooltip="top-end"
        >
          <Trigger />
        </Tooltip>
      </Flex>
      <Flex my="x6" mx="x8" justifyContent="space-around">
        <Tooltip
          id="tooltip4"
          placement="left-start"
          tooltip="left-start"
        >
          <Trigger />
        </Tooltip>
        <Tooltip
          id="tooltip5"
          placement="left"
          tooltip="left"
        >
          <Trigger />
        </Tooltip>
        <Tooltip
          id="tooltip6"
          placement="left-end"
          tooltip="left-end"
        >
          <Trigger />
        </Tooltip>
      </Flex>
      <Flex my="x6" mx="x8" justifyContent="space-around">
        <Tooltip
          id="tooltip7"
          placement="right-start"
          tooltip="right-start"
        >
          <Trigger />
        </Tooltip>
        <Tooltip
          id="tooltip8"
          placement="right"
          tooltip="right"
        >
          <Trigger />
        </Tooltip>
        <Tooltip
          id="tooltip9"
          placement="right-end"
          tooltip="right-end"
        >
          <Trigger />
        </Tooltip>
      </Flex>
      <Flex my="x6" mx="x8" justifyContent="space-around">
        <Tooltip
          id="tooltip10"
          placement="bottom-start"
          tooltip="bottom-start"
        >
          <Trigger />
        </Tooltip>
        <Tooltip
          id="tooltip11"
          placement="bottom"
          tooltip="bottom"
        >
          <Trigger />
        </Tooltip>
        <Tooltip
          id="tooltip12"
          placement="bottom-end"
          tooltip="bottom-end"
        >
          <Trigger />
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
        fullWidth
        placement="bottom"
        tooltip="Tooltip"
        id="inputTooltip"
      >
        <Input />
      </Tooltip>
      <Tooltip
        fullWidth
        placement="bottom"
        tooltip="Tooltip"
        id="selectTooltip"
      >
        <Select options={ selectOptions } />
      </Tooltip>
      <Tooltip
        fullWidth
        placement="bottom"
        tooltip="Tooltip"
        id="textareaTooltip"
      >
        <Textarea />
      </Tooltip>
      <Tooltip
        fullWidth
        placement="bottom"
        tooltip="Tooltip"
        id="textTooltip"
      >
        <Text inline>Text</Text>
      </Tooltip>
      <Tooltip
        fullWidth
        placement="bottom"
        tooltip="Tooltip"
        id="boxTooltip"
      >
        <Box width="100px" bg="blue">Text</Box>
      </Tooltip>
      <Tooltip
        placement="bottom"
        tooltip="Tooltip"
        id="textTooltip"
      >
        <Text inline>Text</Text>
      </Tooltip>
      <Tooltip
        placement="bottom"
        tooltip="Tooltip"
        id="boxTooltip"
      >
        <Box width="100px" bg="blue">Text</Box>
      </Tooltip>
    </>
  ));
