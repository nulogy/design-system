import React from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  List,
  ListItem,
  Link,
  SectionTitle,
  Title,
  Text,
  theme
} from "@nulogy/components";
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
          <Text fontWeight="bold">Small</Text>
          <Text fontFamily="mono" fontSize="smaller">
            {theme.shadows.small}
          </Text>
        </Box>
        <Box py="x4" px="x2" bg="white" boxShadow="medium" mb="x2">
          <Text fontWeight="bold">Medium</Text>
          <Text fontFamily="mono" fontSize="smaller">
            {theme.shadows.medium}
          </Text>
        </Box>
        <Box py="x8" px="x2" bg="white" boxShadow="large">
          <Text fontWeight="bold">Large</Text>
          <Text fontFamily="mono" fontSize="smaller">
            {theme.shadows.large}
          </Text>
        </Box>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>States</SectionTitle>
      <Box p="x2" bg="white" boxShadow="focus" mb="x2" borderRadius="medium">
        <Text fontWeight="bold">Focus</Text>
        <Text fontFamily="mono" fontSize="smaller">
          {theme.shadows.focus}
        </Text>
      </Box>
      <Box p="x2" bg="white" boxShadow="error" mb="x2" borderRadius="medium">
        <Text fontWeight="bold">Error</Text>
        <Text fontFamily="mono" fontSize="smaller">
          {theme.shadows.error}
        </Text>
      </Box>
    </DocSection>

    <DocSection>
      <SectionTitle>Usage</SectionTitle>
      <Text>
        Shadows can be added to the{" "}
        <Link href="/components/box">Box component</Link> using the
        <Text inline fontFamily="mono">
          boxShadow
        </Text>{" "}
        prop. Focus and Error states come built-in to inputs already, and all of
        our shadow values are stored in the <Link href="/theme/">theme</Link>{" "}
        for referencing anywhere else.
      </Text>
    </DocSection>

    <DocSection>
      <SectionTitle>Related links</SectionTitle>
      <List>
        <ListItem>
          <Link href="/components/box">Box component</Link>
        </ListItem>
        <ListItem>
          <Link href="/theme/">NDS theme</Link>
        </ListItem>
      </List>
    </DocSection>
  </Layout>
);
