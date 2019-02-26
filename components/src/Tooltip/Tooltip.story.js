import React from "react";
import { storiesOf } from "@storybook/react";
import {
  Button, PrimaryButton, Link, Text,
} from "ComponentsRoot";
import Tooltip from "./Tooltip";

storiesOf("Tooltip", module)
  .add("Tooltip", () => (
    <>
      <Tooltip
        placement="bottom"
        tooltip={ (
         
          "I am also a button!"
        
) }
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
