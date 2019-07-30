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
      <Tab>Tab 5</Tab>
      <Tab>Tab 6</Tab>
      <Tab>Tab 7</Tab>
      <Tab>Tab 8</Tab>
      <Tab>Tab 9</Tab>
      <Tab>Tab 10</Tab>
      <Tab>Tab 11</Tab>
      <Tab>Tab 12</Tab>
    </Tabs>
  ))
  .add("set to fitted", () => (
    <Tabs fitted>
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
    <div>
      <Tab>Tab</Tab>
      <Tab selected>Tab</Tab>
      <Tab disabled>Tab</Tab>
      <Tab disabled selected>
        Tab
      </Tab>
    </div>
  ));
