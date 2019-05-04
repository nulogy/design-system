import React from "react";
import { storiesOf } from "@storybook/react";
import Button from "../Button/Button";
import { Link } from "../Link";
import { Flex } from "../Flex";
import { Box } from "../Box";
import { Input } from "../Input";
import { Select } from "../Select";
import { Textarea } from "../Textarea";
import { Text } from "../Type";
import { Tooltip } from ".";

const selectOptions = [
  { value: "accepted", label: "Accepted" },
  { value: "assigned", label: "Assigned to a line" },
  { value: "hold", label: "On hold" },
  { value: "rejected", label: "Rejected" },
  { value: "open", label: "Open" },
  { value: "progress", label: "In progress" },
  { value: "quarantine", label: "In quarantine" }
];

const Trigger = () => (
  <Flex
    width="128px"
    height="128px"
    justifyContent="center"
    alignItems="center"
    bg="lightBlue"
    style={{ border: "2px dashed darkBlue" }}
  >
    Hover me
  </Flex>
);

storiesOf("Tooltip", module)
  .add("Tooltip", () => (
    <Flex p="x8">
      <Tooltip placement="bottom" tooltip="I am a Tooltip!">
        <Button> Button </Button>
      </Tooltip>
    </Flex>
  ))
  .add("with wrapped text", () => (
    <Flex p="x8">
      <Tooltip
        placement="bottom"
        tooltip="I am a Tooltip! I have very long text, and my default max-width is 24em (based on 14px font-size), which is equal to 336px, or approximately 45 characters."
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
        maxWidth="128px"
      >
        <Button> Button </Button>
      </Tooltip>
    </Flex>
  ))
  .add("with placement", () => (
    <>
      <Flex my="x6" mx="x8" justifyContent="space-around">
        <Tooltip placement="top-start" tooltip="top-start">
          <Trigger />
        </Tooltip>
        <Tooltip placement="top" tooltip="top">
          <Trigger />
        </Tooltip>
        <Tooltip placement="top-end" tooltip="top-end">
          <Trigger />
        </Tooltip>
      </Flex>
      <Flex my="x6" mx="x8" justifyContent="space-around">
        <Tooltip placement="left-start" tooltip="left-start">
          <Trigger />
        </Tooltip>
        <Tooltip placement="left" tooltip="left">
          <Trigger />
        </Tooltip>
        <Tooltip placement="left-end" tooltip="left-end">
          <Trigger />
        </Tooltip>
      </Flex>
      <Flex my="x6" mx="x8" justifyContent="space-around">
        <Tooltip placement="right-start" tooltip="right-start">
          <Trigger />
        </Tooltip>
        <Tooltip placement="right" tooltip="right">
          <Trigger />
        </Tooltip>
        <Tooltip placement="right-end" tooltip="right-end">
          <Trigger />
        </Tooltip>
      </Flex>
      <Flex my="x6" mx="x8" justifyContent="space-around">
        <Tooltip placement="bottom-start" tooltip="bottom-start">
          <Trigger />
        </Tooltip>
        <Tooltip placement="bottom" tooltip="bottom">
          <Trigger />
        </Tooltip>
        <Tooltip placement="bottom-end" tooltip="bottom-end">
          <Trigger />
        </Tooltip>
      </Flex>
    </>
  ))
  .add("with Link passed in", () => (
    <Tooltip placement="bottom" tooltip={<Link href="/"> Link </Link>}>
      <Button> Button </Button>
    </Tooltip>
  ))
  .add("with Button passed in", () => (
    <Tooltip placement="bottom" tooltip={<Button href="/"> Button </Button>}>
      <Button> Button </Button>
    </Tooltip>
  ))
  .add("with custom showDelay", () => (
    <Tooltip placement="bottom" tooltip="Tooltip" showDelay="1000">
      <Button> Button </Button>
    </Tooltip>
  ))
  .add("with custom hideDelay", () => (
    <Tooltip placement="bottom" tooltip="Tooltip" hideDelay="1000">
      <Button> Button </Button>
    </Tooltip>
  ))
  .add("with other focusable elements", () => (
    <>
      <Tooltip placement="bottom" tooltip="Tooltip">
        <Button> Button </Button>
      </Tooltip>
      <Tooltip placement="bottom" tooltip="Tooltip">
        <Link href="/"> Link </Link>
      </Tooltip>
      <Tooltip fullWidth placement="bottom" tooltip="Tooltip">
        <Input id="tooltip-input" />
      </Tooltip>
      <Tooltip fullWidth placement="bottom" tooltip="Tooltip">
        <Select id="tooltip-select" options={selectOptions} />
      </Tooltip>
      <Tooltip fullWidth placement="bottom" tooltip="Tooltip">
        <Textarea id="tooltip-textarea" />
      </Tooltip>
      <Tooltip fullWidth placement="bottom" tooltip="Tooltip">
        <Text inline>Text</Text>
      </Tooltip>
      <Tooltip fullWidth placement="bottom" tooltip="Tooltip">
        <Box width="100px" bg="blue">
          Text
        </Box>
      </Tooltip>
      <Tooltip placement="bottom" tooltip="Tooltip">
        <Text inline>Text</Text>
      </Tooltip>
      <Tooltip placement="bottom" tooltip="Tooltip">
        <Box width="100px" bg="blue">
          Text
        </Box>
      </Tooltip>
    </>
  ));
