import React from "react";
import { storiesOf } from "@storybook/react";
import { DemoPage } from "ComponentsRoot";

storiesOf("DemoPage", module)
  .add("Demo Page", () => (
    <DemoPage />
  ));
