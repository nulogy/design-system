import React from "react";
import {
  Box, Flex, Link, Text, Title, SectionTitle,
} from "@nulogy/components";
import { Intro, Layout } from "../components";

const IndexPage = () => (
  <Layout>
    <Box
      bg="whiteGrey" p="x6" borderRadius={ 1 }
      mb="x8"
    >
      <Title mb="x2">Nulogy Design System</Title>
      <Intro>The Nulogy Design System is a collection of Visual Guidelines and UI Components that will allow designers and developers to quickly create consistent experiences for our customers using established best practices.</Intro>
    </Box>

    <Flex>
      <Box
        width="50%" boxShadow={ 0 } mb="x3"
        pr="x3"
      >
        <SectionTitle mb="x3">Visual Style</SectionTitle>
        <Text mb="x3">Learn about the style that makes up Nulogy applications; including logo usage, typography, our colour system, iconography and spacing.</Text>
        <Link href="/style/colour">Learn how to design for Nulogy</Link>
      </Box>

      <Box
        width="50%" boxShadow={ 1 } mb="x3"
        pl="x3"
      >
        <SectionTitle mb="x3">Components</SectionTitle>
        <Text mb="x3">Built using React, components are tested interface design patterns designed to ensure a consistent experience for our users.</Text>
        <Link href="components/buttons">Use our components</Link>
      </Box>
    </Flex>
  </Layout>
);

export default IndexPage;
