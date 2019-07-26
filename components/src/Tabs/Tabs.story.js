import React from "react";
import { storiesOf } from "@storybook/react";
import { Tab, Tabs } from ".";

storiesOf("Tabs", module)
  .add("Tabs", () => (
    <Tabs>
      <Tab>Tab 1</Tab>
      <Tab>Tab 2</Tab>
      <Tab>Tab 3</Tab>
      <Tab>Tab 4</Tab>
    </Tabs>
  ))
  .add("with a selectedIndex", () => (
    <Tabs selectedIndex={1}>
      <Tab>Tab 1</Tab>
      <Tab>Tab 2</Tab>
      <Tab>Tab 3</Tab>
      <Tab>Tab 4</Tab>
    </Tabs>
  ))
  .add("with all tab states", () => (
    <Tabs>
      <Tab>Tab</Tab>
      <Tab selected>Tab</Tab>
      <Tab disabled>Tab</Tab>
      <Tab disabled selected>
        Tab
      </Tab>
    </Tabs>
  ));
