import React from "react";
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
        <div className="ControlledTabContent">
          Controlled Content: Tab {selectedIndex + 1}
        </div>
      </>
    );
  }
}

export default {
  title: "Components/Tabs",
};

export const _Tabs = () => (
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
);

export const WithADefaultSelectedIndex = () => (
  <Tabs defaultSelectedIndex={0}>
    <Tab label="Tab 1">Tab 1 Content</Tab>
    <Tab label="Tab 2">Tab 2 Content</Tab>
    <Tab label="Tab 3">Tab 3 Content</Tab>
    <Tab label="Tab 4">Tab 4 Content</Tab>
  </Tabs>
);

WithADefaultSelectedIndex.story = {
  name: "with a defaultSelectedIndex",
};

export const SetToFitted = () => (
  <Tabs fitted>
    <Tab label="Tab 1">Tab 1 Content</Tab>
    <Tab label="Tab 2">Tab 2 Content</Tab>
    <Tab label="Tab 3">Tab 3 Content</Tab>
    <Tab label="Tab 4">Tab 4 Content</Tab>
  </Tabs>
);

SetToFitted.story = {
  name: "set to fitted",
};

export const WithAllTabStates = () => (
  <div>
    <Tab label="Tab" />
    <Tab label="Tab" selected />
    <Tab label="Tab" disabled />
    <Tab label="Tab" disabled selected />
  </div>
);

WithAllTabStates.story = {
  name: "with all tab states",
};

export const WithScrollingTabs = () => (
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
);

WithScrollingTabs.story = {
  name: "with scrolling tabs",
  parameters: { viewport: { defaultViewport: "extraSmall" } },
};

export const Controlled = () => <ControlledTabs />;

Controlled.story = {
  name: "controlled",
};

export const WithInputs = () => (
  <Tabs>
    <Tab label="Tab 1" className="Tab1">
      <input className="Input1" />
    </Tab>
    <Tab label="Tab 2" className="Tab2">
      <input className="Input2" />
    </Tab>
  </Tabs>
);

WithInputs.story = {
  name: "with inputs",
};

export const WithContentLoadedOnSelection = () => (
  <Tabs renderTabContentOnlyWhenSelected>
    <Tab label="Tab 1" className="Tab1">
      <input className="Input1" />
    </Tab>
    <Tab label="Tab 2" className="Tab2">
      <input className="Input2" />
    </Tab>
  </Tabs>
);

WithContentLoadedOnSelection.story = {
  name: "with content loaded on selection",
};

export const WithConditionallyRenderedTabs = () => (
  <Tabs>
    {true && (
      <Tab label="Tab 1" className="Tab1">
        <input className="Input1" />
      </Tab>
    )}

    {false && (
      <Tab label="Tab 2" className="Tab2">
        <input className="Input2" />
      </Tab>
    )}
  </Tabs>
);

WithConditionallyRenderedTabs.story = {
  name: "With conditionally rendered Tabs",
};
