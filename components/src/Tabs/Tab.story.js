import React from "react";
import { storiesOf } from "@storybook/react";
import { Tab } from ".";

storiesOf("Tabs", module).add("Tab", () => (
  <>
    <Tab>Tab</Tab>
    <Tab selected>Tab</Tab>
    <Tab disabled>Tab</Tab>
    <Tab disabled selected>
      Tab
    </Tab>
  </>
));
