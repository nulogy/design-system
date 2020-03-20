/* eslint-disable no-unused-vars, quotes, react/self-closing-comp */

import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import Highlight from "react-highlight";
import {
  LoadingAnimation,
  Box,
  Flex,
  SectionTitle,
  SubsectionTitle,
  Title,
  Link,
  List,
  ListItem,
  Text
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
    name: "inactive",
    type: "Boolean",
    defaultValue: "false",
    description: "Toggles between active and inactive styles"
  }
];

export default () => (
  <Layout>
    <Helmet>
      <title>Loading Animation</title>
    </Helmet>
    <Intro>
      <Title>Loading Animation</Title>
      <IntroText>
        Loading animation is used to indicate a delay in the system when
        duration can not be estimated.
      </IntroText>
    </Intro>

    <DocSection>
      <Flex justifyContent="center" mt="x4" mb="x8">
        <LoadingAnimation />
      </Flex>
      <Highlight className="js">
        {`import { LoadingAnimation } from "@nulogy/components";

<LoadingAnimation />
`}
      </Highlight>
    </DocSection>

    <DocSection>
      <SectionTitle>Use</SectionTitle>
      <List>
        <ListItem>
          When you want to overlay the entire screen with the animation
        </ListItem>
        <ListItem>
          When you don't know how long it will take for the action to be
          executed
        </ListItem>
        <ListItem>
          When the action will take at least 2 seconds to execute
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>States</SectionTitle>
      <Text mb="x3">
        Loading animation comes in 2 states: <strong>active</strong> and{" "}
        <strong>inactive</strong>.
      </Text>
      <DocSubsection>
        <SubsectionTitle>Active</SubsectionTitle>
        <Text mb="x3">
          Active state is the default state and is used to indicate the loading
          process.
        </Text>
        <Flex justifyContent="center" mt="x2" mb="x4">
          <LoadingAnimation />
        </Flex>
        <Highlight className="js">{`<LoadingAnimation/>`}</Highlight>
      </DocSubsection>
      <DocSubsection>
        <SubsectionTitle>Inactive</SubsectionTitle>
        <Text mb="x3">
          Inactive state is used to indicate loading process that takes longer
          than expected or is not able to complete.
        </Text>
        <Flex justifyContent="center" mt="x2" mb="x4">
          <LoadingAnimation inactive />
        </Flex>
        <Highlight className="js">{`<LoadingAnimation inactive />`}</Highlight>
      </DocSubsection>
    </DocSection>

    <DocSection>
      <SectionTitle>Props</SectionTitle>
      <PropsTable propsRows={propsRows} />
    </DocSection>

    <DocSection>
      <SectionTitle>Related</SectionTitle>
      <List>
        <ListItem>
          <Link href="/patterns/loading">Loading Content</Link>
        </ListItem>
      </List>
    </DocSection>

    <DocSection>
      <SectionTitle>Resources</SectionTitle>
      <List>
        <ListItem>
          <Link href="https://storybook.nulogy.design/?path=/story/loading-animation">
            View in Storybook
          </Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
