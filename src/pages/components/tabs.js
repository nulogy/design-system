/* eslint-disable no-unused-vars, quotes, react/self-closing-comp */

import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Button,
  Box,
  SectionTitle,
  SubsectionTitle,
  Title,
  Link,
  List,
  ListItem,
  Text,
  Tabs,
  Tab
} from "@nulogy/components";
import {
  Layout,
  Intro,
  IntroText,
  DocSection,
  PropsTable
} from "../../components";

const propsRows = [
  {
    name: "defaultSelectedIndex",
    type: "Number",
    defaultValue: "null",
    description: "Index of the tab that is selected when rendered."
  },
  {
    name: "fitted",
    type: "Boolean",
    defaultValue: "false",
    description:
      "Sets the tab components to equally take up the width of the tabs container."
  },
  {
    name: "renderTabContentOnlyWhenSelected",
    type: "Boolean",
    defaultValue: "false",
    description:
      "Causes hidden tab content to only be rendered when the tab is selected."
  },
  {
    name: "selectedIndex",
    type: "Number",
    defaultValue: "undefined",
    description: "Index of selected tab if controlling the tabs component."
  },
  {
    name: "onTabClick",
    type: "Function",
    defaultValue: "undefined",
    description:
      "On click function passed to each tab component used when controlling the tabs component. Runs with arguments onClick(event, index)."
  },
  {
    name: "className",
    type: "String",
    defaultValue: "null",
    description: "className passed to the Tabs component"
  },
  {
    name: "tabContentClassName",
    type: "string",
    defaultValue: "null",
    description: "className passed to the tab content container"
  },
  {
    name: "tabContentClassName",
    type: "string",
    defaultValue: "null",
    description: "className passed to the tab content container"
  },
  {
    name: "ariaLabelLeft",
    type: "string",
    defaultValue: "null",
    description: "aria label on the left arrow button when tabs are scrollable"
  },
  {
    name: "ariaLabelRight",
    type: "string",
    defaultValue: "null",
    description: "aria label on the right arrow button when tabs are scrollable"
  }
];

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
        {selectedIndex !== null && (
          <div>Controlled Content: Tab {selectedIndex + 1}</div>
        )}
      </>
    );
  }
}

export default () => (
  <Layout>
    <Helmet>
      <title>Tabs</title>
    </Helmet>
    <Intro>
      <Title>Tabs</Title>
      <IntroText>For navigating between sections of related content.</IntroText>
    </Intro>

    <DocSection>
      <Box height="64px">
        <Tabs>
          <Tab label="Tab 1">Tab 1 Content</Tab>
          <Tab label="Tab 2">Tab 2 Content</Tab>
          <Tab label="Tab 3">Tab 3 Content</Tab>
          <Tab label="Tab 4">Tab 4 Content</Tab>
        </Tabs>
      </Box>
      <Highlight className="js">
        {`import { Tab, Tabs } from "@nulogy/components";

<Tabs>
  <Tab label="Tab 1">Tab 1 Content</Tab>
  <Tab label="Tab 2">Tab 2 Content</Tab>
  <Tab label="Tab 3">Tab 3 Content</Tab>
  <Tab label="Tab 4">Tab 4 Content</Tab>
</Tabs>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x6">
        <SubsectionTitle>Fitted</SubsectionTitle>
        <Box height="64px">
          <Tabs fitted>
            <Tab label="Tab 1">Tab 1 Content</Tab>
            <Tab label="Tab 2">Tab 2 Content</Tab>
            <Tab label="Tab 3">Tab 3 Content</Tab>
            <Tab label="Tab 4">Tab 4 Content</Tab>
          </Tabs>
        </Box>
        <Highlight className="js">
          {`import { Tab, Tabs } from "@nulogy/components";

<Tabs fitted>
  <Tab label="Tab 1">Tab 1 Content</Tab>
  <Tab label="Tab 2">Tab 2 Content</Tab>
  <Tab label="Tab 3">Tab 3 Content</Tab>
  <Tab label="Tab 4">Tab 4 Content</Tab>
</Tabs>
`}
        </Highlight>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>As a controlled component</SectionTitle>
      <Text mb="x2">
        If custom behaviour is needed for the Tabs component, using the
        onTabClick and selectedIndex props allows for a controlled use of Tabs.
        onTabClick will be passed into all provided Tab components, and runs
        with arguments onClick(event, index). onClick can still be individually
        applied to each Tab component optionally as well.
      </Text>
      <Box mb="x6">
        <Box mb="x2" height="96px">
          <ControlledTabs />
        </Box>
        <Highlight className="js">
          {`import { Tab, Tabs } from "@nulogy/components";

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
        {selectedIndex !== null && <div>Controlled Content: Tab {selectedIndex + 1}</div>}
      </>
    );
  }
}
`}
        </Highlight>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Responsive information</SectionTitle>
      <Text mb="x3">
        When the width of the individual Tab components exceed the total width
        of the Tabs component, scrolling becomes enabled and buttons are placed
        on the edges to make it easier to scroll to off-screen Tabs on mobile
        devices.
      </Text>
      <Box height="64px">
        <Tabs>
          <Tab label="Tab 1">Tab 1 Content</Tab>
          <Tab label="Tab 2">Tab 2 Content</Tab>
          <Tab label="Tab 3">Tab 3 Content</Tab>
          <Tab label="Tab 4">Tab 4 Content</Tab>
          <Tab label="Tab 5">Tab 1 Content</Tab>
          <Tab label="Tab 6">Tab 2 Content</Tab>
          <Tab label="Tab 7">Tab 3 Content</Tab>
          <Tab label="Tab 8">Tab 4 Content</Tab>
          <Tab label="Tab 9">Tab 1 Content</Tab>
          <Tab label="Tab 10">Tab 2 Content</Tab>
          <Tab label="Tab 11">Tab 3 Content</Tab>
          <Tab label="Tab 12">Tab 4 Content</Tab>
        </Tabs>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={propsRows} />
    </DocSection>

    <DocSection>
      <SectionTitle>Content guidelines</SectionTitle>
      <Box mb="x2">
        <List>
          <ListItem>
            Only group together content that is related under a set of tabs
          </ListItem>
          <ListItem>
            Keep tab labels short, general context for the group of tabs should
            be given already on the page
          </ListItem>
          <ListItem>Do not use tabs as primary navigation</ListItem>
          <ListItem>
            Do not require users to jump between tabs rapidly to complete a
            task.
          </ListItem>
        </List>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <List>
        <ListItem>
          <Link href="https://storybook.nulogy.design/?path=/story/tabs--tabs">
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
