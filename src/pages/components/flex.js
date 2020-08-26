import React from "react";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  Box,
  Flex,
  SectionTitle,
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
  PropsTable
} from "../../components";
import { STORYBOOK_COMPONENT_URL } from "../../shared/const";

const propsRows = [
  {
    name: "alignItems",
    type: "String",
    defaultValue: "stretch",
    description:
      "Sets align-items. Accepts flex-start, flex-end, center, or stretch."
  },
  {
    name: "flexDirection",
    type: "String",
    defaultValue: "row",
    description:
      "Set the flex-direction. Accepts row, column, row-reverse or column-reverse"
  },
  {
    name: "flexWrap",
    type: "String",
    defaultValue: "nowrap",
    description: "Set the flex-wrap. Accepts no-wrap, wrap, or wrap-reverse"
  },
  {
    name: "justifyContent",
    type: "String",
    defaultValue: "flex-start",
    description:
      "Sets justify-content. Accepts flex-start, flex-end, center, space-around, or space-evenly"
  },
  {
    name: "className",
    type: "String",
    defaultValue: "undefined",
    description: "className passed to the flex component."
  }
];

export default () => (
  <Layout>
    <Helmet>
      <title>Flex</title>
    </Helmet>
    <Intro>
      <Title>Flex</Title>
      <IntroText>
        A wrapper component that extends <Link href="/components/Box">Box</Link>{" "}
        to create layouts using Flexbox.
      </IntroText>
    </Intro>

    <DocSection>
      <Flex bg="lightBlue">
        <Box width={1 / 2} p="x3" m="x3" bg="blackBlue" />
        <Box width={1 / 2} p="x3" m="x3" bg="darkBlue" />
      </Flex>

      <Highlight className="js">
        {`import {Box, Flex} from "@nulogy/components";

<Flex bg="lightBlue">
  <Box width={1/2} p="x3" m="x3" bg="blackBlue"></Box>
  <Box width={1/2} p="x3" m="x3" bg="darkBlue"></Box>
</Flex>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Responsive</SectionTitle>
      <Text>
        Like Box, all props can be used responsively by using an object that
        defines small, medium and/or large, based on the{" "}
        <Link href="/theme">theme.breakpoints</Link> object
      </Text>
      <Text>
        This example displays columns on small screens and rows on large ones.
      </Text>
      <Flex
        bg="lightBlue"
        flexDirection={{ extraSmall: "column", medium: "row" }}
      >
        <Box width={1 / 2} p="x3" m="x3" bg="blackBlue" />
        <Box width={1 / 2} p="x3" m="x3" bg="darkBlue" />
      </Flex>

      <Highlight className="js">
        {`<Flex bg="lightBlue" flexDirection={{extraSmall: "column", medium: "row"}}>
  <Box width={1/2} p="x3" m="x3" bg="blackBlue"></Box>
  <Box width={1/2} p="x3" m="x3" bg="darkBlue"></Box>
</Flex>
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <Text>
        Because Flex is an extension of <Link href="/components/box">Box</Link>{" "}
        it accepts all the same props but adds the following:
      </Text>
      <PropsTable propsRows={propsRows} />
    </DocSection>

    <DocSection>
      <SectionTitle>Related components</SectionTitle>
      <List>
        <ListItem>
          <Link href="/components/box">Box</Link>
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
          <Link href={`${STORYBOOK_COMPONENT_URL}flex--flex`}>
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
