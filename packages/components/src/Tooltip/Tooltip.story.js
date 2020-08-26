import React from "react";
import { storiesOf } from "@storybook/react";
import { Button, Box, Link, Flex, Text, Tooltip } from "../index";

storiesOf("Components/Tooltip", module)
  .add("Tooltip", () => (
    <Flex p="x8">
      <Tooltip tooltip="I am a Tooltip!">
        <Button> Button </Button>
      </Tooltip>
    </Flex>
  ))
  .add("with wrapped text", () => (
    <Flex p="x8">
      <Tooltip
        placement="bottom"
        tooltip="I am a Tooltip! I have very long text, and my default max-width is 24em (based on 14px font-size), which is equal to 336px, or approximately 45 characters."
        defaultOpen
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
        defaultOpen
      >
        <Button> Button </Button>
      </Tooltip>
    </Flex>
  ))
  .add("with placement", () => (
    <>
      <Flex my="x6" mx="x8" justifyContent="space-around">
        <Tooltip placement="top-start" tooltip="top-start" defaultOpen>
          <Button>Tooltip trigger</Button>
        </Tooltip>
        <Tooltip placement="top" tooltip="top" defaultOpen>
          <Button>Tooltip trigger</Button>
        </Tooltip>
        <Tooltip placement="top-end" tooltip="top-end" defaultOpen>
          <Button>Tooltip trigger</Button>
        </Tooltip>
      </Flex>
      <Flex my="x6" mx="x8" justifyContent="space-around">
        <Tooltip placement="left-start" tooltip="left-start" defaultOpen>
          <Button>Tooltip trigger</Button>
        </Tooltip>
        <Tooltip placement="left" tooltip="left" defaultOpen>
          <Button>Tooltip trigger</Button>
        </Tooltip>
        <Tooltip placement="left-end" tooltip="left-end" defaultOpen>
          <Button>Tooltip trigger</Button>
        </Tooltip>
      </Flex>
      <Flex my="x6" mx="x8" justifyContent="space-around">
        <Tooltip placement="right-start" tooltip="right-start" defaultOpen>
          <Button>Tooltip trigger</Button>
        </Tooltip>
        <Tooltip placement="right" tooltip="right" defaultOpen>
          <Button>Tooltip trigger</Button>
        </Tooltip>
        <Tooltip placement="right-end" tooltip="right-end" defaultOpen>
          <Button>Tooltip trigger</Button>
        </Tooltip>
      </Flex>
      <Flex my="x6" mx="x8" justifyContent="space-around">
        <Tooltip placement="bottom-start" tooltip="bottom-start" defaultOpen>
          <Button>Tooltip trigger</Button>
        </Tooltip>
        <Tooltip placement="bottom" tooltip="bottom" defaultOpen>
          <Button>Tooltip trigger</Button>
        </Tooltip>
        <Tooltip placement="bottom-end" tooltip="bottom-end" defaultOpen>
          <Button>Tooltip trigger</Button>
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
      <Tooltip placement="bottom" tooltip="Tooltip">
        <Text mr="x2" inline bg="blue">
          Inline Text
        </Text>
      </Tooltip>
      <Tooltip placement="bottom" tooltip="Tooltip">
        <Box width="200px" bg="blue">
          Box width 200px
        </Box>
      </Tooltip>
      <Tooltip placement="bottom" tooltip="Tooltip">
        <Box bg="blue">Box</Box>
      </Tooltip>
    </>
  ))
  .add("open by default", () => (
    <Tooltip tooltip="I am an open Tooltip!" defaultOpen>
      <Button>Hover me</Button>
    </Tooltip>
  ));
