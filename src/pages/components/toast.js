/* eslint-disable no-unused-vars, quotes, react/self-closing-comp */

import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Button,
  SectionTitle,
  Title,
  Link,
  List,
  ListItem,
  Toast,
  Text
} from "@nulogy/components";
import {
  Layout,
  Intro,
  IntroText,
  DocSection,
  PropsTable
} from "../../components";
import { STORYBOOK_COMPONENT_URL } from "../../shared/const";

const ToastExample = () => {
  const [triggered, setTriggered] = useState(false);
  const triggerToast = () => {
    setTriggered(!triggered);
  };
  const onHideHandler = () => {
    setTriggered(false);
  };
  return (
    <>
      <Button onClick={triggerToast}>Trigger Toast</Button>
      <Toast triggered={triggered} onHide={onHideHandler}>
        Toast!
      </Toast>
    </>
  );
};

const propsRows = [
  {
    name: "triggered",
    type: "boolean",
    defaultValue: "false",
    description: "Whether to display to the tooltip or not"
  },
  {
    name: "onShow",
    type: "function",
    description: "callback that is called when the tooltip is shown"
  },
  {
    name: "onHide",
    type: "function",
    description:
      "callback that is called when the tooltip is dismissed or begins to fade out"
  },
  {
    name: "onHidden",
    type: "function",
    description:
      "callback that is called when the tooltip has been completely hidden after the fade out animation is complete"
  },
  {
    name: "showDuration",
    type: "number",
    description: "length of time in ms to display the Toast before hiding it"
  },
  {
    name: "isCloseable",
    type: "boolean",
    description:
      "displays a close button in the Toast when true, and the Toast must then by manually dismissed by clicking the close button"
  }
];

export default () => (
  <Layout>
    <Helmet>
      <title>Toast</title>
    </Helmet>
    <Intro>
      <Title>Toast</Title>
      <IntroText>
        Temporarily displayed messages that provide additional information or
        feedback about a user's action or event. Hovering over a message will
        keep it in view.
      </IntroText>
    </Intro>

    <DocSection>
      <ToastExample />
      <Highlight className="js">
        {`<Toast triggered={triggered} onHide={onHideHandler}>
            Saved
          </Toast>
        `}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Use when</SectionTitle>
      <List>
        <ListItem>
          There are low priority messages to display in response to some event
          or action — i.e. messages that are helpful, although not intrinsic to
          the experience
        </ListItem>
        <ListItem>
          The information contained is very concise and easy to read and
          understand within seconds
        </ListItem>
        <ListItem>
          The message is less than 2 lines long or 150 characters
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Don't use when </SectionTitle>
      <List>
        <ListItem>
          The information contained is vital to completing a task
        </ListItem>
        <ListItem>
          The message is too long to read and understood within seconds (> 150
          characters)
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <Text>
        All props availble on the <Link href="/components/alert">Alert</Link>{" "}
        component are available in addition to the options below.
      </Text>
      <PropsTable propsRows={propsRows} />
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <List>
        <ListItem>
          <Link href="/components/alert">Alert</Link>
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem>
        <Link href={`${STORYBOOK_COMPONENT_URL}toast--toast`}>
          View in Storybook
        </Link>
      </ListItem>
    </DocSection>
  </Layout>
);
