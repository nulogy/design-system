/* eslint-disable no-unused-vars, quotes, react/self-closing-comp */

import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Button,
  Box,
  DropdownMenu,
  DropdownItem,
  DropdownButton,
  DropdownLink,
  SectionTitle,
  SubsectionTitle,
  Title,
  Link,
  Text,
  List,
  ListItem
} from "@nulogy/components";
import {
  Layout,
  Intro,
  IntroText,
  DocSection,
  PropsTable
} from "../../components";
import { STORYBOOK_COMPONENT_URL } from "../../shared/const";

const propsRows = [
  {
    name: "trigger",
    type: "Function",
    defaultValue: '() => <IconicButton icon="more"/>',
    description:
      "Function that returns a button component that will be used as the trigger."
  },
  {
    name: "disabled",
    type: "Boolean",
    defaultValue: "false",
    description: "Marks the button as disabled and unable to be activated."
  },
  {
    name: "backgroundColor",
    type: "String",
    defaultValue: "whiteGrey",
    description: "Background color of the menu container."
  },
  {
    name: "showArrow",
    type: "Bool",
    defaultValue: "true",
    description: "Determines if the arrow is shown on the menu container."
  },
  {
    name: "placement",
    type: "String",
    defaultValue: "bottom-start",
    description:
      "One of top, bottom, left, or right with optional -start or -end appended to place the menu container relative to the trigger."
  },
  {
    name: "showDelay",
    type: "Number",
    defaultValue: "100",
    description: "Buffer delay time to show the dropdown menu when opening."
  },
  {
    name: "hideDelay",
    type: "Number",
    defaultValue: "200",
    description: "Buffer delay time to hide the dropdown menu when closing."
  },
  {
    name: "defaultOpen",
    type: "Bool",
    defaultValue: "false",
    description: "State of the dropdown menu when mounted."
  },
  {
    name: "className",
    type: "String",
    defaultValue: "undefined",
    description: "className passed to the dropdown menu container."
  },
  {
    name: "boundariesElement",
    type: "String<'viewport' | 'scrollParent'> | HTMLElement",
    defaultValue: "undefined",
    description:
      "The element which will define the boundaries of the dropdown position. The opened dropdown will never be placed outside of the defined boundaries"
  },
  {
    name: "openAriaLabel",
    type: "String",
    defaultValue: "open",
    description: "aria label when the dropdown is closed"
  },
  {
    name: "openAriaLabel",
    type: "String",
    defaultValue: "open",
    description: "aria label when the dropdown is closed"
  }
];

const customColors = {
  color: "white",
  hoverColor: "white",
  bgHoverColor: "black"
};

export default () => (
  <Layout>
    <Helmet>
      <title>Dropdown Menu</title>
    </Helmet>
    <Intro>
      <Title>Dropdown Menu</Title>
      <IntroText>
        Dropdown Menus are used to collapse a group of associated actions
        together.
      </IntroText>
    </Intro>

    <DocSection>
      <DropdownMenu>
        <DropdownLink href="/">Dropdown Link</DropdownLink>
        <DropdownButton>Dropdown Button</DropdownButton>
      </DropdownMenu>
      <Highlight className="js">
        {`import { DropdownMenu, DropdownLink, DropdownButton } from "@nulogy/components";

<DropdownMenu>
  <DropdownLink href="/">Dropdown Link</DropdownLink>
  <DropdownButton>Dropdown Button</DropdownButton>
</DropdownMenu>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x6">
        <SubsectionTitle>Custom Trigger</SubsectionTitle>
        <DropdownMenu trigger={() => <Button>Custom Trigger</Button>}>
          <DropdownLink href="/">Dropdown Link</DropdownLink>
          <DropdownButton>Dropdown Button</DropdownButton>
        </DropdownMenu>
        <Highlight className="js">
          {`<DropdownMenu trigger={() => <Button>Custom Trigger</Button>}>
  <DropdownLink href="/">Dropdown Link</DropdownLink>
  <DropdownButton>Dropdown Button</DropdownButton>
</DropdownMenu>
`}
        </Highlight>
      </Box>

      <Box mb="x6">
        <SubsectionTitle>Custom Colors</SubsectionTitle>
        <DropdownMenu backgroundColor="blackBlue">
          <DropdownLink href="/" {...customColors}>
            Dropdown Link
          </DropdownLink>
          <DropdownButton {...customColors}>Dropdown Button</DropdownButton>
        </DropdownMenu>
        <Highlight className="js">
          {`const customColors = {
  color: "white",
  hoverColor: "white",
  bgHoverColor: "black"
};

<DropdownMenu backgroundColor="blackBlue">
  <DropdownLink href="/" {...customColors}>Dropdown Link</DropdownLink>
  <DropdownButton {...customColors}>Dropdown Button</DropdownButton>
</DropdownMenu>
`}
        </Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>Disabled</SubsectionTitle>
        <DropdownMenu disabled>
          <DropdownLink href="/">Dropdown Link</DropdownLink>
          <DropdownButton>Dropdown Button</DropdownButton>
        </DropdownMenu>
        <Highlight className="js">
          {`<DropdownMenu disabled>
  <DropdownLink href="/">Dropdown Link</DropdownLink>
  <DropdownButton>Dropdown Button</DropdownButton>
</DropdownMenu>
`}
        </Highlight>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Using DropdownItem</SectionTitle>
      <Text mb="x2">
        Using the Dropdown Link and DropdownButton components with the
        DropdownMenu are recommended as they provide the correct link and button
        styles for the dropdown. However, wrapping another component with
        DropdownItem will also apply correct styling for the DropdownMenu.
      </Text>
      <DropdownMenu>
        <DropdownItem>
          <a href="/" style={{ textDecoration: "none" }}>
            Custom Link Component
          </a>
        </DropdownItem>
      </DropdownMenu>
      <Highlight className="js">
        {`<DropdownMenu>
  <DropdownItem>
    <a href="/" style={{textDecoration:"none"}}>Custom Link Component</a>
  </DropdownItem>
</DropdownMenu>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Closing the DropdownMenu</SectionTitle>
      <Text mb="x2">
        The DropdownMenu is currently to be used as an uncontrolled component.
        However, the component does come with hooks to use to close the menu
        when elements within the menu are clicked. Use the closeMenu function
        provided by the DropdownMenu component via the{" "}
        <Link href="https://reactjs.org/docs/render-props.html">
          render props
        </Link>{" "}
        React pattern as shown below. Note: event must be passed in to
        closeMenu.
      </Text>
      <DropdownMenu>
        {({ closeMenu }) => (
          <DropdownButton
            onClick={e => {
              closeMenu(e);
            }}
          >
            Dropdown Button
          </DropdownButton>
        )}
      </DropdownMenu>
      <Highlight className="js">
        {`<DropdownMenu>
  {({ closeMenu }) => (
    <DropdownButton onClick={(e)=>{closeMenu(e)}}>Dropdown Button</DropdownButton>
  )}
</DropdownMenu>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={propsRows} />
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <List>
        <ListItem>
          <Link href="/components/buttons">Buttons</Link>
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <List>
        <ListItem>
          <Link href={`${STORYBOOK_COMPONENT_URL}dropdownmenu--dropdownmenu`}>
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
