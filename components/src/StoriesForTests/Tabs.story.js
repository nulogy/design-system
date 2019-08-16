import React from "react";
import { storiesOf } from "@storybook/react";
import { NDSProvider, Tab, Tabs } from "..";

const TestComponent = () => (
  <NDSProvider>
    <Tabs className="TabContainer" tabContentClassName="TabContent">
      <Tab label="Tab 1" className="Tab1">
        Tab 1 Content
      </Tab>
      <Tab label="Tab 2" className="Tab2">
        Tab 2 Content
      </Tab>
      <Tab label="Tab 3" className="Tab3">
        Tab 3 Content
      </Tab>
      <Tab label="Tab 4" className="Tab4">
        Tab 4 Content
      </Tab>
    </Tabs>
  </NDSProvider>
);

const TestComponentScrolling = () => (
  <NDSProvider>
    <div style={{ width: "200px" }}>
      <Tabs className="TabContainer" tabContentClassName="TabContent">
        <Tab label="Tab 1" className="Tab1">
          Tab 1 Content
        </Tab>
        <Tab label="Tab 2" className="Tab2">
          Tab 2 Content
        </Tab>
        <Tab label="Tab 3" className="Tab3">
          Tab 3 Content
        </Tab>
        <Tab label="Tab 4" className="Tab4">
          Tab 4 Content
        </Tab>
        <Tab label="Tab 5" className="Tab4">
          Tab 5 Content
        </Tab>
        <Tab label="Tab 6" className="Tab4">
          Tab 6 Content
        </Tab>
      </Tabs>
    </div>
  </NDSProvider>
);

const TestComponentWithInputs = () => (
  <NDSProvider>
    <Tabs className="TabContainer" tabContentClassName="TabContent">
      <Tab label="Tab 1" className="Tab1">
        <input className="Input1" />
      </Tab>
      <Tab label="Tab 2" className="Tab2">
        <input className="Input2" />
      </Tab>
    </Tabs>
  </NDSProvider>
);

const TestComponentWithInputsNotPersistant = () => (
  <NDSProvider>
    <Tabs renderTabContentOnlyWhenSelected className="TabContainer" tabContentClassName="TabContent">
      <Tab label="Tab 1" className="Tab1">
        <input className="Input1" />
      </Tab>
      <Tab label="Tab 2" className="Tab2">
        <input className="Input2" />
      </Tab>
    </Tabs>
  </NDSProvider>
);

class ControlledTabs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: null
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
          <Tab label="Tab 1">Uncontrolled Content: Tab 1</Tab>
          <Tab label="Tab 2">Uncontrolled Content: Tab 2</Tab>
          <Tab label="Tab 3">Uncontrolled Content: Tab 3</Tab>
          <Tab label="Tab 4">Uncontrolled Content: Tab 4</Tab>
        </Tabs>
        {selectedIndex !== null && <div>Contolled Content: Tab {selectedIndex + 1}</div>}
      </>
    );
  }
}

storiesOf("StoriesForTests/Tabs", module)
  .add("Base", () => <TestComponent />)
  .add("With Input and Persistant Content", () => <TestComponentWithInputs />)
  .add("With Input and Not Persistant Content", () => <TestComponentWithInputsNotPersistant />)
  .add("With Scrolling", () => <TestComponentScrolling />)
  .add("Controlled", () => (
    <NDSProvider>
      <ControlledTabs />
    </NDSProvider>
  ));
