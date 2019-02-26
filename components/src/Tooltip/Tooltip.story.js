import React from "react";
import { storiesOf } from "@storybook/react";
import {
  Button, PrimaryButton, Input, Link,
} from "ComponentsRoot";
import Tooltip from "./Tooltip";

storiesOf("Tooltip", module)
  .add("Tooltip", () => (
    <>
      <Tooltip
        placement="bottom"
        tooltip={ (
          <Button>
          I am also a button!
          </Button>
) }
      >
        <Link> Link </Link>
      </Tooltip>
      <Tooltip
        placement="bottom"
        tooltip={ (
          <Button>
          I am also a button!
          </Button>
) }
      >
        <Button ml="400px"> Button </Button>
      </Tooltip>
    </>
  ));
