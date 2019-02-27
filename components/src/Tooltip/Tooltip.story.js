import React from "react";
import { storiesOf } from "@storybook/react";
import {
  Button, PrimaryButton, Link, Text, Flex,
} from "ComponentsRoot";
import Tooltip from "./Tooltip";

storiesOf("Tooltip", module)
  .add("Tooltip", () => (
    <Flex justifyContent="center" alignItems="center" height="200px">
      <Tooltip
        placement="bottom"
        tooltip="I am a Tooltip!"
      >
        <Button> Button </Button>
      </Tooltip>
    </Flex>
  ))
  .add("with placement", () => (
    <>
      <Flex ml="x4">
        <Tooltip
          placement="top-start"
          tooltip="top-start"
        >
          <Button m="x6"> Hover me </Button>
        </Tooltip>
        <Tooltip
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
          placement="left-start"
          tooltip="left-start"
        >
          <Button m="x6"> Hover me </Button>
        </Tooltip>
        <Tooltip
          placement="left"
          tooltip="left"
        >
          <Button m="x6"> Hover me </Button>
        </Tooltip>
        <Tooltip
          placement="left-end"
          tooltip="left-end"
        >
          <Button m="x6"> Hover me </Button>
        </Tooltip>
      </Flex>
      <Flex ml="x4">
        <Tooltip
          placement="right-start"
          tooltip="right-start"
        >
          <Button m="x6"> Hover me </Button>
        </Tooltip>
        <Tooltip
          placement="right"
          tooltip="right"
        >
          <Button m="x6"> Hover me </Button>
        </Tooltip>
        <Tooltip
          placement="right-end"
          tooltip="right-end"
        >
          <Button m="x6"> Hover me </Button>
        </Tooltip>
      </Flex>
      <Flex ml="x4">
        <Tooltip
          placement="bottom-start"
          tooltip="bottom-start"
        >
          <Button m="x6"> Hover me </Button>
        </Tooltip>
        <Tooltip
          placement="bottom"
          tooltip="bottom"
        >
          <Button m="x6"> Hover me </Button>
        </Tooltip>
        <Tooltip
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
    >
      <Button> Button </Button>
    </Tooltip>
  ))
  .add("with Button passed in", () => (
    <Tooltip
      placement="bottom"
      tooltip={ (<Button href="/"> Button </Button>) }
    >
      <Button> Button </Button>
    </Tooltip>
  ))
  .add("with custom showDelay", () => (
    <Tooltip
      placement="bottom"
      tooltip="Tooltip"
      showDelay="1000"
    >
      <Button> Button </Button>
    </Tooltip>
  ))
  .add("with custom hideDelay", () => (
    <Tooltip
      placement="bottom"
      tooltip="Tooltip"
      hideDelay="1000"
    >
      <Button> Button </Button>
    </Tooltip>
  ))
  .add("TESTING", () => (
    <>
      <Tooltip
        placement="bottom"
        tooltip="I am also a button!"
      >
        <Link href="/"> Link </Link>
      </Tooltip>
      <Tooltip
        placement="bottom"
        tooltip={ (
          <Button>
          I am also a button!
          </Button>
) }
      >
        <PrimaryButton ml="400px"> Button </PrimaryButton>
      </Tooltip>
    </>
  ))
  .add("Tooltip2", () => (
    <Tooltip
      placement="bottom"
      tooltip={ (
        <Tooltip
          placement="right"
          tooltip={ (
            <Tooltip
              placement="bottom"
              tooltip={ (
                <Tooltip
                  placement="bottom"
                  tooltip={ (
                    <Tooltip
                      placement="left"
                      tooltip={ (
                        <Tooltip
                          placement="bottom"
                          tooltip={ (
                            <Tooltip
                              placement="right"
                              tooltip={ (
                                <Tooltip
                                  placement="right"
                                  tooltip={ (<Text inline>Hello</Text>) }
                                >
                                  <Text inline>Hello </Text>
                                </Tooltip>
) }
                            >
                              <Text inline>Hello </Text>
                            </Tooltip>
) }
                        >
                          <Text inline>Hello </Text>
                        </Tooltip>
) }
                    >
                      <Text inline>Hello </Text>
                    </Tooltip>
) }
                >
                  <Text inline>Hello </Text>
                </Tooltip>
) }
            >
              <Text inline>Hello </Text>
            </Tooltip>
) }
        >
          <Text inline>Hello </Text>
        </Tooltip>
        ) }
    >
      <Text inline>Hello </Text>
    </Tooltip>
  ));
