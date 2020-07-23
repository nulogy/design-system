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

const propsRows = [
  {
    name: "order",
    type: "number",
    defaultValue: "",
    description: "Sets the order to be used with Flex component"
  },
  {
    name: "className",
    type: "String",
    defaultValue: "undefined",
    description: "className passed to the box component."
  }
];

export default () => (
  <Layout>
    <Helmet>
      <title>Box</title>
    </Helmet>
    <Intro>
      <Title>Box</Title>
      <IntroText>
        A layout component for controlling width, margin, padding, colour and
        shadows.
      </IntroText>
    </Intro>

    <DocSection>
      <Box bg="darkBlue" color="white" p="x3">
        Box
      </Box>
      <Highlight className="js">
        {`import { Box } from "@nulogy/components";

<Box bg="darkBlue" color="white" p="x3">Box</Box>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Variations</SectionTitle>
      <Box mb="x4">
        <SubsectionTitle>Width</SubsectionTitle>
        <Text>Width can be set using a fraction or string.</Text>
        <Box bg="lightBlue" p="x3" width={1 / 2}>
          Half
        </Box>
        <Box bg="lightBlue" p="x3" width="200px">
          200px
        </Box>
        <Highlight className="js">
          {`<Box width={1/2}>Half</Box>
<Box width="200px">200px</Box>`}
        </Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Text Color</SubsectionTitle>
        <Text>
          Color can be set using a reference to the{" "}
          <Link href="/theme">theme.colors</Link> object.
        </Text>
        <Box color="blue">blue</Box>
        <Highlight className="js">{'<Box color="blue">blue</Box>'}</Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Background Color</SubsectionTitle>
        <Text>
          Color can be set using a reference to the{" "}
          <Link href="/theme">theme.colors</Link> object.
        </Text>
        <Box bg="lightBlue">lightBlue</Box>
        <Highlight className="js">
          {'<Box bg="lightBlue">lightBlue</Box>'}
        </Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Margins</SubsectionTitle>
        <Text>
          Margins can be set using a reference to the{" "}
          <Link href="/theme">theme.space</Link> object.
        </Text>
        <Box bg="lightBlue" m="x3">
          x3 (24px)
        </Box>
        <Highlight className="js">{'<Box m="x3">x3</Box'}</Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Padding</SubsectionTitle>
        <Text>
          Padding can be set using a reference to the{" "}
          <Link href="/theme">theme.space</Link> object.
        </Text>
        <Box bg="lightBlue" p="x3">
          x3 (24px)
        </Box>
        <Highlight className="js">{'<Box p="x3">x3</Box'}</Highlight>
      </Box>
      <Box mb="x4">
        <SubsectionTitle>Shadows</SubsectionTitle>
        <Text>
          There are three shadows that can be set using a reference to the{" "}
          <Link href="/theme">theme.shadows</Link> object.
        </Text>
        <Box p="x3" boxShadow="large">
          large shadow
        </Box>
        <Highlight className="js">
          {'<Box p="x3" boxShadow="large">large shadow</Box>'}
        </Highlight>
      </Box>
      <Box mb="x4">
        <SectionTitle>Responsive</SectionTitle>
        <Text>
          All Box props can be used responsively by using an object that defines
          small, medium and/or large, based on the{" "}
          <Link href="/theme">theme.breakpoints</Link> object
        </Text>
        <Box color={{ extraSmall: "red", small: "blue", medium: "green" }}>
          Green text on large screens, blue on medium and red on small.
        </Box>
        <Highlight className="js">
          {`<Box color={{ extraSmall: "red", small: "blue", medium: "green"}}>
  Green text on large screens, blue on medium and red on small.
</Box>`}
        </Highlight>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={propsRows} />
      <Text mt="x3">
        The Box component has access to <InlineCode>space</InlineCode>,{" "}
        <InlineCode>colour</InlineCode>, <InlineCode>layout</InlineCode>,{" "}
        <InlineCode>border</InlineCode>, <InlineCode>boxShadow</InlineCode>,{" "}
        <InlineCode>textAlign</InlineCode>, and{" "}
        <InlineCode>position</InlineCode> style props. See the{" "}
        <Link href="/guides/style-props">style prop documentation</Link> for a
        full list of available props.
      </Text>
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <List>
        <ListItem>
          <Link href="/components/flex">Flex</Link>
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
          <Link href="https://storybook.nulogy.design/?path=/story/box--box">
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
