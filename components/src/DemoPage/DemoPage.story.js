import React from "react";
import { storiesOf } from "@storybook/react";
import { DemoPage } from "../index";

storiesOf("DemoPage", module)
  .add("Demo Page", () => (
    <DemoPage />
  ));
