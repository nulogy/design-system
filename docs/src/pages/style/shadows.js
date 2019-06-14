import React from "react";
import { Helmet } from "react-helmet";
import { Box, ListItem, Link, SectionTitle, Title } from "@nulogy/components";
import { Layout, Intro, IntroText, DocSection } from "../../components";

export default () => (
  <Layout>
    <Helmet>
      <title>Shadows</title>
    </Helmet>
    <Intro>
      <Title>Shadows</Title>
      <IntroText>
        There are three shadows available to provide depth to an interface.
      </IntroText>
    </Intro>

    <DocSection>
      <Box bg="lightGrey" p="x6">
        <Box p="x2" bg="white" boxShadow="small" mb="x2">
          Small
        </Box>
        <Box py="x4" px="x2" bg="white" boxShadow="medium" mb="x2">
          Medium
        </Box>
        <Box py="x8" px="x2" bg="white" boxShadow="large">
          Large
        </Box>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Related links</SectionTitle>
      <ListItem>
        <Link href="/components/box">Box component</Link>
      </ListItem>
      <ListItem>
        <Link href="https://nulogy.design/theme/">NDS theme</Link>
      </ListItem>
    </DocSection>
  </Layout>
);
