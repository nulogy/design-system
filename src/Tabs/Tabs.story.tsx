import React from "react";
import { expect, userEvent, within } from "storybook/test";
import { Button } from "../Button";
import { Flex } from "../Flex";
import { TabsProps, TabsState } from "./Tabs";
import { Tab, Tabs } from ".";

class ControlledTabs extends React.Component<TabsProps, TabsState> {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: null,
    };

    this.setSelectedTab = this.setSelectedTab.bind(this);
  }

  setSelectedTab(e, index) {
    this.setState({ selectedIndex: index });
  }

  render() {
    const { selectedIndex } = this.state;
    return (
      <>
        <Tabs onTabClick={this.setSelectedTab} selectedIndex={selectedIndex}>
          <Tab className="Tab1" label="Tab 1">
            Uncontrolled Content: Tab 1
          </Tab>
          <Tab className="Tab2" label="Tab 2">
            Uncontrolled Content: Tab 2
          </Tab>
          <Tab className="Tab3" label="Tab 3">
            Uncontrolled Content: Tab 3
          </Tab>
          <Tab className="Tab4" label="Tab 4">
            Uncontrolled Content: Tab 4
          </Tab>
        </Tabs>
        <div className="ControlledTabContent">Controlled Content: Tab {selectedIndex + 1}</div>
      </>
    );
  }
}

export default {
  title: "Components/Tabs",
};

export const _Tabs = {
  render: () => (
    <Tabs>
      <Tab className="Tab1" label="Tab 1">
        Tab 1 Content
      </Tab>
      <Tab className="Tab2" label="Tab 2">
        Tab 2 Content
      </Tab>
      <Tab className="Tab3" label="Tab 3">
        Tab 3 Content
      </Tab>
      <Tab className="Tab4" label="Tab 4">
        Tab 4 Content
      </Tab>
    </Tabs>
  ),
  name: "Tabs",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("renders tab components", async () => {
      await expect(canvas.getByText("Tab 1")).toBeVisible();
    });
    await step("selects the tab on click", async () => {
      const tab1 = canvas.getByRole("tab", { name: "Tab 1" });
      await expect(tab1).toHaveAttribute("aria-selected", "false");
      await userEvent.click(tab1);
      await expect(tab1).toHaveAttribute("aria-selected", "true");
    });
    await step("displays the tab content on click", async () => {
      await expect(canvas.getByText("Tab 1 Content")).toBeVisible();
    });
    await step("moves to next tab with right arrow key", async () => {
      const tab1 = canvas.getByRole("tab", { name: "Tab 1" });
      tab1.focus();
      await userEvent.keyboard("{ArrowRight}");
      await expect(canvas.getByRole("tab", { name: "Tab 2" })).toHaveFocus();
    });
  },
};

export const WithADefaultSelectedIndex = {
  render: () => (
    <Tabs defaultSelectedIndex={1}>
      <Tab label="Tab 1">Tab 1 Content</Tab>
      <Tab label="Tab 2">Tab 2 Content</Tab>
      <Tab label="Tab 3">Tab 3 Content</Tab>
      <Tab label="Tab 4">Tab 4 Content</Tab>
    </Tabs>
  ),

  name: "with a defaultSelectedIndex",
};

export const WithOtherInteractiveElements = {
  render: () => (
    <Flex gap="x2" alignItems="flex-start" flexDirection="column">
      <Button>Click me</Button>
      <Tabs defaultSelectedIndex={1}>
        <Tab label="Tab 1">Tab 1 Content</Tab>
        <Tab label="Tab 2">Tab 2 Content</Tab>
        <Tab label="Tab 3">Tab 3 Content</Tab>
        <Tab label="Tab 4">Tab 4 Content</Tab>
      </Tabs>
    </Flex>
  ),
  name: "with other interactive elements",
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step("focuses on the default selected tab when tabbing", async () => {
      canvas.getByText("Click me").focus();
      await userEvent.tab();
      await expect(document.activeElement).toHaveTextContent("Tab 2");
    });
  },
};

export const SetToFitted = {
  render: () => (
    <Tabs fitted>
      <Tab label="Tab 1">Tab 1 Content</Tab>
      <Tab label="Tab 2">Tab 2 Content</Tab>
      <Tab label="Tab 3">Tab 3 Content</Tab>
      <Tab label="Tab 4">Tab 4 Content</Tab>
    </Tabs>
  ),

  name: "set to fitted",
};

export const WithAllTabStates = {
  render: () => (
    <div>
      <Tab label="Tab" />
      <Tab label="Tab" selected />
      <Tab label="Tab" disabled />
      <Tab label="Tab" disabled selected />
    </div>
  ),

  name: "with all tab states",
};

export const WithScrollingTabs = {
  render: () => (
    <Tabs className="tab-container">
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
  ),

  name: "with scrolling tabs",
  parameters: { viewport: { defaultViewport: "extraSmall" } },
};

export const Controlled = {
  render: () => <ControlledTabs />,
  name: "controlled",
};

export const WithInputs = {
  render: () => (
    <Tabs>
      <Tab label="Tab 1" className="Tab1">
        <input className="Input1" />
      </Tab>
      <Tab label="Tab 2" className="Tab2">
        <input className="Input2" />
      </Tab>
    </Tabs>
  ),

  name: "with inputs",
};

export const WithContentLoadedOnSelection = {
  render: () => (
    <Tabs renderTabContentOnlyWhenSelected>
      <Tab label="Tab 1" className="Tab1">
        <input className="Input1" />
      </Tab>
      <Tab label="Tab 2" className="Tab2">
        <input className="Input2" />
      </Tab>
    </Tabs>
  ),

  name: "with content loaded on selection",
};
