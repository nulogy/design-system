/* eslint-disable no-unused-vars, quotes, react/self-closing-comp */

import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Alert,
  Button,
  Box,
  SectionTitle,
  SubsectionTitle,
  Title,
  Link,
  List,
  ListItem
} from "@nulogy/components";
import {
  DocText as Text,
  Layout,
  Intro,
  IntroText,
  DocSection,
  PropsTable,
  InlineCode
} from "../../components";

const propsRows = [
  {
    name: "isCloseable",
    type: "boolean",
    defaultValue: "false",
    description: "Provides a close icon in the top right corner."
  },
  {
    name: "title",
    type: "string",
    defaultValue: "",
    description: "An optional title to display in bold above the main text."
  },
  {
    name: "type",
    type: "string",
    defaultValue: "informative",
    description:
      "The type of alert. Accepts informative, danger, warning and success."
  },
  {
    name: "className",
    type: "String",
    defaultValue: "undefined",
    description: "className passed to the alert component."
  },
  {
    name: "closeAriaLabel",
    type: "String",
    defaultValue: "close",
    description: "aria label for close button"
  }
];

export default () => (
  <Layout>
    <Helmet>
      <title>Alert</title>
    </Helmet>
    <Intro>
      <Title>Alert</Title>
      <IntroText>
        An alert is a concise, event-driven message that communicates
        information and requires minimal interaction.
      </IntroText>
    </Intro>

    <DocSection>
      <Alert type="danger" title="Important information" isCloseable>
        Details about important information
      </Alert>
      <Highlight className="js">
        {`import {Alert} from "@nulogy/components";

<Alert type="danger" title="Important information" isCloseaeble>
  Details about important information
</Alert>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Use when</SectionTitle>
      <List>
        <ListItem>a user completes a task successfully</ListItem>
        <ListItem>
          to call attention to an error that requires attention
        </ListItem>
        <ListItem> to inform users about upcoming service maintenance</ListItem>
        <ListItem> to warn users about a potential issue</ListItem>
        <ListItem> a form has returned with errors</ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x6">
        <SubsectionTitle>Informative</SubsectionTitle>
        <Text>
          Informative alerts provide a user with general messages and
          non-critical information.
        </Text>
        <Alert>Alert text</Alert>

        <Highlight className="js">{`<Alert type="informative">Text</Alert>`}</Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>Danger</SubsectionTitle>
        <Text>
          Danger alerts inform users about errors that require attention.
        </Text>
        <Alert type="danger">Text</Alert>
        <Highlight className="js">{`<Alert type="danger">Text</Alert>`}</Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>Success</SubsectionTitle>
        <Text>
          Success alerts inform users that an action has been completed
          successfully.
        </Text>
        <Alert type="success">Text</Alert>
        <Highlight className="js">{`<Alert type="success">Text</Alert>`}</Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>Warning</SubsectionTitle>
        <Text>Warning alerts raise caution.</Text>
        <Alert type="warning">Text</Alert>
        <Highlight className="js">{`<Alert type="warning">Text</Alert>`}</Highlight>
      </Box>
      <Box mb="x6">
        <SubsectionTitle>Alert with Link</SubsectionTitle>
        <Text>
          A link may be added to the content of an alert. Within alerts, link
          text is always displayed in black.
        </Text>
        <Alert>
          Alert text with <Link href="/">linked details</Link>.
        </Alert>
        <Highlight className="js">
          {`<Alert>
  Alert text <Link href="/">linked details</Link>.
</Alert>`}
        </Highlight>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={propsRows} />
      <Text mt="x3">
        The Alert component has access to <InlineCode>space</InlineCode> style
        props. See the{" "}
        <Link href="/guides/style-props">style prop documentation</Link> for a
        full list of available props.
      </Text>
    </DocSection>

    <DocSection>
      <SectionTitle>Content guidelines</SectionTitle>
      <Text>
        To provide a more detailed explanation of the message that is being
        communicated, a link to the new screen can be provided in the child
        content using a <Link href="/components/link">Link</Link> component.
      </Text>
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <List>
        <ListItem>
          <Link href="/components/toast">Toast</Link>
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem>
        <Link href="https://storybook.nulogy.design/?path=/story/alert--danger">
          View in Storybook
        </Link>
      </ListItem>
    </DocSection>
  </Layout>
);
