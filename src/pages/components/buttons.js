import React from "react";
import { Helmet } from "react-helmet";
import {
  Button,
  DangerButton,
  PrimaryButton,
  QuietButton,
  Box,
  Flex,
  SectionTitle,
  SubsectionTitle,
  Title,
  Link,
  List,
  ListItem
} from "@nulogy/components";
import Highlight from "react-highlight";
import {
  DocText as Text,
  Layout,
  Intro,
  IntroText,
  DocSection,
  PropsTable,
  InlineCode
} from "../../components";
import { STORYBOOK_COMPONENT_URL } from "../../shared/const";

const propsRows = [
  {
    name: "size",
    type: "String",
    defaultValue: "medium",
    description: "Accepts small, medium, or large."
  },
  {
    name: "disabled",
    type: "Boolean",
    defaultValue: "false",
    description: "Marks the button as disabled and unable to be activated."
  },
  {
    name: "icon",
    type: "String",
    defaultValue: "null",
    description: "The icon to display. See Icons for all possible options."
  },
  {
    name: "iconSide",
    type: "String",
    defaultValue: "right",
    description: "The side to display the icon."
  },
  {
    name: "fullWidth",
    type: "Boolean",
    defaultValue: "false",
    description: "Makes the button fill the width of its container."
  },
  {
    name: "className",
    type: "String",
    defaultValue: "undefined",
    description: "className passed to the button component."
  },
  {
    name: "asLink",
    type: "Boolean",
    defaultValue: "false",
    description:
      "When set, renders the button as an <a> link instead of a <button>."
  }
];

export default () => (
  <Layout>
    <Helmet>
      <title>Buttons</title>
    </Helmet>
    <Intro>
      <Title>Buttons</Title>
      <IntroText>
        Buttons make common actions immediately detectable and easy to perform.
      </IntroText>
    </Intro>
    <DocSection>
      <Button>Create project</Button>
      <Highlight className="js">
        {`import { Button } from "@nulogy/components";

<Button>Create project</Button>
`}
      </Highlight>
    </DocSection>
    <DocSection>
      <SectionTitle>Types of buttons</SectionTitle>
      <Text>
        There are multiple types of buttons that all accept the same options.
      </Text>

      <Box mb="x6">
        <SubsectionTitle>PrimaryButton</SubsectionTitle>
        <Text>
          Primary Buttons are used for the main action in a particular context.
          There is usually not more than one primary button per screen and not
          all of the screens require a Primary button.
        </Text>
        <PrimaryButton>Create project</PrimaryButton>
        <Highlight className="js">
          {`import { PrimaryButton } from "@nulogy/components";

<PrimaryButton>Create project</PrimaryButton>`}
        </Highlight>
      </Box>

      <Box mb="x6">
        <SubsectionTitle>DangerButton</SubsectionTitle>
        <Text>
          Danger Buttons are used for destructive actions such as deleting. They
          are most likely to appear in confirmation dialogs.
        </Text>
        <DangerButton>Create project</DangerButton>
        <Highlight className="js">
          {`import { DangerButton } from "@nulogy/components";

<DangerButton>Create project</DangerButton>`}
        </Highlight>
      </Box>

      <Box mb="x6">
        <SubsectionTitle>QuietButton</SubsectionTitle>
        <Text>
          Quiet Buttons are used for less important actions such as “Cancel” or
          actions that are not directly related to the context of the page (e.g
          Learn more …). Quiet buttons are often paired with a Primary button.
        </Text>
        <QuietButton>Learn more</QuietButton>
        <Highlight className="js">
          {`import { QuietButton } from "@nulogy/components";

<QuietButton>Create project</QuietButton>`}
        </Highlight>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Text>
        The following variations are available to all button components.
      </Text>
      <Box mb="x6">
        <SubsectionTitle>Small</SubsectionTitle>
        <Button size="small">Read more</Button>
        <Highlight className="js">
          {'<Button size="small">Read more</Button>'}
        </Highlight>
      </Box>

      <Box mb="x6">
        <SubsectionTitle>Medium</SubsectionTitle>
        <Button size="medium">Read more</Button>
        <Highlight className="js">
          {'<Button size="medium">Read more</Button>'}
        </Highlight>
      </Box>

      <Box mb="x6">
        <SubsectionTitle>Large</SubsectionTitle>
        <Button size="large">Read more</Button>
        <Highlight className="js">
          {'<Button size="large">Read more</Button>'}
        </Highlight>
      </Box>

      <Box mb="x6">
        <SubsectionTitle>Full Width</SubsectionTitle>
        <Button fullWidth>Read more</Button>
        <Highlight className="js">
          {"<Button fullWidth>Full Width</Button>"}
        </Highlight>
      </Box>

      <Box mb="x6">
        <SubsectionTitle>With an icon</SubsectionTitle>
        <Button icon="add" iconSide="left">
          Create project
        </Button>
        <Highlight className="js">
          {'<Button icon="add" iconSide="left">Create project</Button>'}
        </Highlight>
      </Box>

      <Box mb="x6">
        <SubsectionTitle>Disabled</SubsectionTitle>
        <Flex justifyContent="space-between" alignItems="center">
          <Button disabled>Create project</Button>
          <PrimaryButton disabled>Create project</PrimaryButton>
          <DangerButton disabled>Delete project</DangerButton>
          <QuietButton disabled>Edit project</QuietButton>
        </Flex>
        <Highlight className="js">
          {"<Button disabled>Create project</Button>"}
        </Highlight>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Content guidelines</SectionTitle>
      <SubsectionTitle>Button labeling</SubsectionTitle>
      <Box mb="x2">
        <List>
          <ListItem>Always lead with an actionable verb.</ListItem>
          <ListItem>
            Whenever possible follow with a clear noun{" "}
            <em>(e.g: Create shipment, Approve delivery).</em>
          </ListItem>
          <ListItem>Always use sentence case.</ListItem>
        </List>
      </Box>

      <SubsectionTitle>Button grouping</SubsectionTitle>
      <List>
        <ListItem>
          Use the <Link href="/components/button-group">Button Group</Link>{" "}
          component to associate a group of buttons together.
        </ListItem>
        <ListItem>
          Order buttons in a group from most important on the left to least
          important on the right.
        </ListItem>
        <ListItem>
          Only have one PrimaryButton or DangerButton on the page at one time.
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={propsRows} />
      <Text mt="x3">
        Button components also has access to <InlineCode>space</InlineCode>{" "}
        style props. See the{" "}
        <Link href="/guides/style-props">style prop documentation</Link> for a
        full list of available props.
      </Text>
    </DocSection>
    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <List>
        <ListItem>
          <Link href={`${STORYBOOK_COMPONENT_URL}buttons--button`}>
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <List>
        <ListItem>
          <Link href="/components/button-group">Button Group</Link>
        </ListItem>
        <ListItem>
          <Link href="/components/iconic-button">Iconic button</Link>
        </ListItem>
        <ListItem>
          <Link href="/components/link">Link</Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
