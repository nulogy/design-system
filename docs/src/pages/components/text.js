import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box,
  SectionTitle,
  SubsectionTitle,
  Title,
  Link,
  ListItem
} from "@nulogy/components";
import {
  DocText as Text,
  Layout,
  Intro,
  IntroText,
  DocSection,
  PropsTable
} from "../../components";
import { margins } from "../../shared/systemProps";

const propsRows = [
  {
    name: "color",
    type: "String",
    defaultValue: "darkBlue",
    description: "Sets color based on the theme.color object"
  },
  {
    name: "disabled",
    type: "Boolean",
    defaultValue: "false",
    description: "Lightens text to imply that it's disabled"
  },
  {
    name: "fontSize",
    type: "String",
    defaultValue: "16px",
    description: "Sets font size based on the theme.fontSize object"
  },
  {
    name: "fontFamily",
    type: "String",
    defaultValue: "IBM Plex Sans",
    description: "Sets font family based on the theme.fontFamily object"
  },
  {
    name: "inline",
    type: "Boolean",
    defaultValue: "false",
    description: "Displays text inline instead of as a block"
  },
  {
    name: "lineHeight",
    type: "String",
    defaultValue: "1.5",
    description: "Sets line height based on the theme.lineHeight object"
  },
  {
    name: "textAlign",
    type: "String",
    defaultValue: "left",
    description: "Sets text-align to either left, center or right"
  },
  ...margins
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
        <Text textAlign="right">Right-aligned text</Text>
        <Highlight className="js">
          {'<Text textAlign="right">Right-aligned text</Text>'}
        </Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Colour</SubsectionTitle>
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
        <Text inline>Doesn't cause a line break text</Text>
        <Highlight className="js">
          {`<Text inline>Inline text </Text>
<Text inline>Doesn't cause a line break text</Text>`}
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
        <Text fontSize="largest">Text with a custom size</Text>
        <Highlight className="js">
          {'<Text fontSize="large">Large text</Text>'}
        </Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Weight</SubsectionTitle>
        <Text fontWeight="bold">Bold text</Text>
        <Highlight className="js">
          {'<Text fontWeight="bold">Bold text</Text>'}
        </Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Line-height</SubsectionTitle>
        <Text lineHeight={2}>Double-spaced text</Text>
        <Text lineHeight={2}>Double-spaced text</Text>
        <Highlight className="js">
          {`<Text lineHeight={2}>Double-spaced text</Text>
<Text>Double-spaced text</Text>`}
        </Highlight>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Responsive</SectionTitle>
      <Text>
        All Text props can be used responsively by using an object that defines
        small, medium and/or large, based on the{" "}
        <Link href="https://nulogy.design/tokens">theme.breakpoints</Link>{" "}
        object
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
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <ListItem>
        <Link href="/components/headings">Headings</Link>
      </ListItem>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <ListItem>
        <Link href="https://nulogy.design/theme/">NDS theme</Link>
      </ListItem>
      <ListItem>
        <Link href="https://storybook.nulogy.design/?path=/story/textarea--textarea">
          View in Storybook
        </Link>
      </ListItem>
    </DocSection>
  </Layout>
);
