import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
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
import { STORYBOOK_COMPONENT_URL } from "../../shared/const";

const propsRows = [
  {
    name: "disabled",
    type: "Boolean",
    defaultValue: "false",
    description: "Lightens text to imply that it's disabled."
  },
  {
    name: "inline",
    type: "Boolean",
    defaultValue: "false",
    description: "Displays text inline instead of as a block."
  },
  {
    name: "className",
    type: "String",
    defaultValue: "undefined",
    description: "className passed to the text component."
  }
];

export default () => (
  <Layout>
    <Helmet>
      <title>Text</title>
    </Helmet>
    <Intro>
      <Title>Text</Title>
      <IntroText>
        Text allows you to control the font family, size colour, weight,
        line-height and alignment.
      </IntroText>
    </Intro>

    <DocSection>
      <Text>Sample text</Text>
      <Highlight className="js">
        {`import { Text } from "@nulogy/components";

<Text>Sample text</Text>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x4">
        <SubsectionTitle>Alignment</SubsectionTitle>
        <Text textAlign="left" mb="0">
          Left-aligned text
        </Text>
        <Text textAlign="center" mb="0">
          Center-aligned text
        </Text>
        <Text textAlign="right" mb="0">
          Right-aligned text
        </Text>
        <Highlight className="js">
          {`<Text textAlign="left">Left-aligned text</Text>
<Text textAlign="center">Center-aligned text</Text>
<Text textAlign="right">Right-aligned text</Text>`}
        </Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Colour</SubsectionTitle>
        <Text>
          Color can be set to Nulogy using a reference to the{" "}
          <Link href="/theme">theme.colors</Link> object.
        </Text>
        <Text color="blue">Blue text</Text>
        <Highlight className="js">
          {'<Text color="blue">Blue text</Text>'}
        </Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Disabled</SubsectionTitle>
        <Text disabled>Disabled text</Text>
        <Highlight className="js">
          {"<Text disabled>Disabled text</Text>"}
        </Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Inline</SubsectionTitle>
        <Text inline>Inline text </Text>
        <Text inline>Doesn't cause a line break</Text>
        <Highlight className="js">
          {`<Text inline>Inline text </Text>
<Text inline>Doesn't cause a line break</Text>`}
        </Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Monospace</SubsectionTitle>
        <Text fontFamily="mono">Monospace text</Text>
        <Highlight className="js">
          {'<Text fontFamily="mono">Monospace text</Text>'}
        </Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Size</SubsectionTitle>
        <Text>
          Font size can be set using a reference to the{" "}
          <Link href="/theme">theme.fontSizes</Link> object.
        </Text>
        <Text fontSize="smaller" mb="0">
          Smaller text
        </Text>
        <Text fontSize="small" mb="0">
          Small text
        </Text>
        <Text fontSize="medium" mb="0">
          Medium text (default)
        </Text>
        <Text fontSize="large" mb="0">
          Large text
        </Text>
        <Text fontSize="larger" mb="0">
          Larger text
        </Text>
        <Text fontSize="largest" mb="0">
          Largest text
        </Text>

        <Highlight className="js">
          {`<Text fontSize="smaller">Smaller text</Text>
<Text fontSize="small">Small text</Text>
<Text fontSize="medium">Medium text (default)</Text>
<Text fontSize="large">Large</Text>
<Text fontSize="larger">Larger</Text>
<Text fontSize="largest">Largest</Text>`}
        </Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Weight</SubsectionTitle>
        <Text>
          Font weight can be set using a reference to the{" "}
          <Link href="/theme">theme.fontWeights</Link> object.
        </Text>
        <Text fontWeight="light" mb="0">
          Light
        </Text>
        <Text fontWeight="normal" mb="0">
          Normal (default)
        </Text>
        <Text fontWeight="medium" mb="0">
          Medium bold
        </Text>
        <Text fontWeight="bold" mb="0">
          Bold
        </Text>

        <Highlight className="js">
          {`<Text fontWeight="light">Light</Text>
<Text fontWeight="normal">Normal (default)</Text>
<Text fontWeight="medium">Medium bold</Text>
<Text fontWeight="bold">Bold</Text>`}
        </Highlight>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Responsive</SectionTitle>
      <Text>
        All Text props can be used responsively by using an object that defines
        small, medium and/or large, based on the{" "}
        <Link href="/theme">theme.breakpoints</Link> object
      </Text>
      <Text>
        This example displays columns on small screens and rows on large ones.
      </Text>
      <Text color={{ extraSmall: "red", small: "blue", medium: "green" }}>
        Green text on large screens, blue on medium and red on small.
      </Text>
      <Highlight className="js">
        {`<Text color={{ extraSmall: "red", small: "blue", medium: "green"}}>
  Green text on large screens, blue on medium and red on small.
</Text>`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={propsRows} />
      <Text mt="x3">
        Text components have access to <InlineCode>typography</InlineCode>,{" "}
        <InlineCode>colour</InlineCode>, and <InlineCode>space</InlineCode>{" "}
        style props. See the{" "}
        <Link href="/guides/style-props">style prop documentation</Link> for a
        full list of available props.
      </Text>
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <List>
        <ListItem>
          <Link href="/components/headings">Headings</Link>
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <List>
        <ListItem>
          <Link href="/theme/">NDS theme</Link>
        </ListItem>
        <ListItem>
          <Link href={`${STORYBOOK_COMPONENT_URL}text--text`}>
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
