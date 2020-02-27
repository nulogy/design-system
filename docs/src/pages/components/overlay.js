/* eslint-disable no-unused-vars, quotes, react/self-closing-comp */

import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Overlay,
  Box,
  SectionTitle,
  SubsectionTitle,
  Title,
  Link,
  List,
  ListItem,
  Text,
  Card
} from "@nulogy/components";
import {
  Layout,
  Intro,
  IntroText,
  DocSection,
  DocSubsection,
  PropsTable
} from "../../components";

const propsRows = [
  {
    name: "dark",
    type: "Boolean",
    defaultValue: "false",
    description: "Controls the theming"
  }
];

export default () => (
  <Layout>
    <Helmet>
      <title>Overlay</title>
    </Helmet>
    <Intro>
      <Title>Overlay</Title>
      <IntroText>
        Overalay separates foreground with the background content.
      </IntroText>
    </Intro>

    <DocSection>
      <Box width="100%" position="relative">
        <Text>
          Background content sample background content sample background content
          sample background content sample background content sample background
          content sample background content sample background content sample
          background content sample background content sample background content
          sample background content sample background content sample background
          content sample background content sample background content sample
          background content sample background content sample background content
          sample background content sample background content sample background
          content sample background content sample background content sample
          background content sample background content sample background content
          sample background content sample background content sample
        </Text>
        <Overlay position="absolute">
          <Text>Foreground sample content</Text>
        </Overlay>
      </Box>
      <Highlight className="js">
        {`import { Overlay } from "@nulogy/components";
<Text>Background content sample</Text>
<Overlay>
  <Text>Foreground sample content</Text>
</Overlay>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Themes</SectionTitle>
      <Text mb="x3">
        Overlay by default assigns light theme but dark theme is also available.
      </Text>
      <Box width="100%" position="relative">
        <Text p="x3">
          Background content sample background content sample background content
          sample background content sample background content sample background
          content sample background content sample background content sample
          background content sample background content sample background content
          sample background content sample background content sample background
          content sample background content sample background content sample
          background content sample background content sample background content
          sample background content sample background content sample background
          content sample background content sample background content sample
          background content sample
        </Text>
        <Overlay dark position="absolute">
          <Card>
            <Text>Foreground sample content</Text>
          </Card>
        </Overlay>
      </Box>
      <Highlight className="js">
        {`import { Overlay } from "@nulogy/components";
<Text>Background content sample</Text>
<Overlay dark>
  <Card> 
    <Text>Foreground sample content</Text>
  </Card>
</Overlay>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <Text mb="x3">
        In addition to this props listed below the Overlay component accepts{" "}
        <Link href="/components/flex">Flex's</Link> props since it is it's
        extension.
      </Text>
      <PropsTable propsRows={propsRows} />
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <List>
        <ListItem>
          <Link href="/components/modal">Modal</Link>
        </ListItem>
        <ListItem>
          <Link href="/components/loading-animation">LoadingAnimation</Link>
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <List>
        <ListItem>
          <Link href="https://storybook.nulogy.design/?path=/story/overlay">
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
