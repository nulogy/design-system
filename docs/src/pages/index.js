import React from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  PrimaryButton,
  Flex,
  Text,
  Title,
  SectionTitle
} from "@nulogy/components";
import { Intro, IntroText, Layout } from "../components";

const IndexPage = () => (
  <Layout>
    <Helmet>
      <meta
        name="description"
        content="The Nulogy Design System is a collection of Visual Guidelines and UI Components that will allow designers and developers to quickly create consistent experiences for our customers using established best practices."
      />
    </Helmet>
    <Intro>
      <Title>Nulogy Design System</Title>
      <IntroText>
        The Nulogy Design System is a collection of Visual Guidelines and UI
        Components that will allow designers and developers to quickly create
        consistent experiences for our customers using established best
        practices.
      </IntroText>
    </Intro>

    <Flex
      flexDirection={{ extraSmall: "column", small: "row" }}
      mb={{ extraSmall: "x6", medium: 0 }}
    >
      <Box width={{ extraSmall: 1, small: 1 / 2 }} mb="x6">
        <SectionTitle mb="x3">Visual Style</SectionTitle>
        <Text mb="x3">
          Learn about the style that makes up Nulogy applications; including
          logo usage, typography, our colour system, iconography and spacing.
        </Text>
        <PrimaryButton asLink href="/style/colour">
          Use our visual style
        </PrimaryButton>
      </Box>

      <Box width={{ extraSmall: 1, small: 1 / 2 }}>
        <SectionTitle mb="x3">Components</SectionTitle>
        <Text mb="x3">
          Built using React, components are tested interface design patterns
          designed to ensure a consistent experience for our users.
        </Text>
        <PrimaryButton asLink href="components/box">
          Use our components
        </PrimaryButton>
      </Box>
    </Flex>
  </Layout>
);

export default IndexPage;
