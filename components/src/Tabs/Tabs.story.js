import React from "react";
import { storiesOf } from "@storybook/react";
import { Tab, Tabs } from ".";

storiesOf("Tabs", module)
  .add("Tabs", () => (
    <Tabs>
      <Tab label="Tab 1">Tab 1 Content</Tab>
      <Tab label="Tab 2">Tab 2 Content</Tab>
      <Tab label="Tab 3">Tab 3 Content</Tab>
      <Tab label="Tab 4">Tab 4 Content</Tab>
    </Tabs>
  ))
  .add("with a defaultSelectedIndex", () => (
    <Tabs defaultSelectedIndex={0}>
      <Tab label="Tab 1">Tab 1 Content</Tab>
      <Tab label="Tab 2">Tab 2 Content</Tab>
      <Tab label="Tab 3">Tab 3 Content</Tab>
      <Tab label="Tab 4">Tab 4 Content</Tab>
    </Tabs>
  ))
  .add("set to fitted", () => (
    <Tabs fitted>
      <Tab label="Tab 1">Tab 1 Content</Tab>
      <Tab label="Tab 2">Tab 2 Content</Tab>
      <Tab label="Tab 3">Tab 3 Content</Tab>
      <Tab label="Tab 4">Tab 4 Content</Tab>
    </Tabs>
  ))
  .add("with all tab states", () => (
    <div>
      <Tab label="Tab" />
      <Tab label="Tab" selected />
      <Tab label="Tab" disabled />
      <Tab label="Tab" disabled selected />
    </div>
  ))
  .add("with many tabs", () => (
    <Tabs>
      <Tab label="Tab 1">Tab 1 Content</Tab>
      <Tab label="Tab 2">Tab 2 Content</Tab>
      <Tab label="Tab 3">Tab 3 Content</Tab>
      <Tab label="Tab 4">Tab 4 Content</Tab>
      <Tab label="Tab 5">Tab 5 Content</Tab>
      <Tab label="Tab 6">Tab 6 Content</Tab>
      <Tab label="Tab 7">Tab 7 Content</Tab>
      <Tab label="Tab 8">Tab 8 Content</Tab>
      <Tab label="Tab 9">Tab 9 Content</Tab>
      <Tab label="Tab 10">Tab 10 Content</Tab>
      <Tab label="Tab 11">Tab 11 Content</Tab>
      <Tab label="Tab 12">Tab 12 Content</Tab>
    </Tabs>
  ))
  .add("TESTING tabs", () => (
    <>
      <button>1</button>
      <Tabs>
        <Tab label="Tab 1">Tab 1 Content</Tab>
        <Tab label="Tab 2">Tab 2 Content</Tab>
        <Tab label="Tab 3">Tab 3 Content</Tab>
        <Tab label="Tab 4">Tab 4 Content</Tab>
        <Tab label="Tab 5">Tab 5 Content</Tab>
        <Tab label="Tab 6">Tab 6 Content</Tab>
        <Tab label="Tab 7">Tab 7 Content</Tab>
        <Tab label="Tab 8">Tab 8 Content</Tab>
        <Tab label="Tab 9">Tab 9 Content</Tab>
        <Tab label="Tab 10">Tab 10 Content</Tab>
        <Tab label="Tab 11">Tab 11 Content</Tab>
        <Tab label="Tab 12">Tab 12 Content</Tab>
      </Tabs>
      <button>2</button>
    </>
  ))
  .add("TESTING container", () => (
    <div style={{ maxWidth: "500px" }}>
      <Tabs>
        <Tab label="Tab 1">Tab 1 Content</Tab>
        <Tab label="Tab 2">Tab 2 Content</Tab>
        <Tab label="Tab 3">Tab 3 Content</Tab>
        <Tab label="Tab 4">Tab 4 Content</Tab>
        <Tab label="Tab 5">Tab 5 Content</Tab>
        <Tab label="Tab 6">Tab 6 Content</Tab>
        <Tab label="Tab 7">Tab 7 Content</Tab>
        <Tab label="Tab 8">Tab 8 Content</Tab>
        <Tab label="Tab 9">Tab 9 Content</Tab>
        <Tab label="Tab 10">Tab 10 Content</Tab>
        <Tab label="Tab 11">Tab 11 Content</Tab>
        <Tab label="Tab 12">Tab 12 Content</Tab>
      </Tabs>
    </div>
  ))
  .add("TESTING persistant tab content", () => (
    <Tabs>
      <Tab label="Tab 1">
        Tab 1 Content
        <input />
      </Tab>
      <Tab label="Tab 2">
        Tab 2 Content
        <input />
      </Tab>
      <Tab label="Tab 3">
        Tab 3 Content
        <input />
      </Tab>
    </Tabs>
  ))
  .add("TESTING re-rending tab content", () => (
    <Tabs renderTabContentOnlyWhenSelected>
      <Tab label="Tab 1">
        Tab 1 Content
        <input />
      </Tab>
      <Tab label="Tab 2">
        Tab 2 Content
        <input />
      </Tab>
      <Tab label="Tab 3">
        Tab 3 Content
        <input />
      </Tab>
    </Tabs>
  ))
  .add("TESTING classNames", () => (
    <Tabs className="tabs-className" tabContentClassName="tab-content-className">
      <Tab className="tab-className" label="Tab 1">
        Tab 1 Content
        <input />
      </Tab>
      <Tab className="tab-className" label="Tab 2">
        Tab 2 Content
        <input />
      </Tab>
      <Tab className="tab-className" label="Tab 3">
        Tab 3 Content
        <input />
      </Tab>
    </Tabs>
  ));
